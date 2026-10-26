// compose: manifest.json + recordings + narration → one HyperFrames page
// (index.html) that plays the whole video at 1920×1080.
//
// Slide types: intro, clip, compare, list, text, image, outro
// (format: references/manifest.md). Each slide lasts as long as its
// narration; a recording longer than that is sped up to fit (up to maxSpeed),
// and one shorter holds its last frame.

import fs from 'node:fs'
import path from 'node:path'
import { mediaDuration, run, videoSize } from './util.mjs'

const W = 1920
const H = 1080
// Space for recordings, between the slide title and the captions.
const STAGE = { top: 150, bottom: 940, width: 1840, gap: 32, bar: 44, label: 56 }
// How long a slide with no narration lasts, unless it sets durationInSeconds.
export const DEFAULT_SECONDS = { intro: 4, text: 4, list: 5, image: 4, outro: 3 }

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

function videosOf(slide) {
	if (slide.type === 'clip') return [slide.src]
	if (slide.type === 'compare') return [slide.before, slide.after]
	return []
}

// --- Timing and video preparation --------------------------------------------

function narrationSeconds(assets, slide) {
	const file = slide.audio && path.join(assets, slide.audio)
	return file && fs.existsSync(file) ? mediaDuration(file) + 0.25 : 0
}

function fitSpeed(length, target, maxSpeed, enabled) {
	if (!enabled || !target || length <= target + 0.3) return 1
	return Math.min(maxSpeed, length / target)
}

// Crop to what changed, shrink to the size it is shown at, speed up to fit
// the narration, hold the last frame to the end of the slide, and put a
// keyframe every second so HyperFrames can seek without freezing.
function prepareVideo(file, { crop, speed, seconds, viewportWidth }) {
	const filters = []
	if (crop) {
		const k = videoSize(file).width / viewportWidth
		const even = (n) => Math.round((n * k) / 2) * 2
		filters.push(`crop=${even(crop.width)}:${even(crop.height)}:${even(crop.x)}:${even(crop.y)}`)
	}
	filters.push(`scale='min(${STAGE.width},iw)':-2:flags=lanczos`)
	if (speed > 1.001) filters.push(`setpts=PTS/${speed.toFixed(4)}`)
	filters.push('fps=30')
	const shown = mediaDuration(file) / speed
	if (shown < seconds - 0.05) filters.push(`tpad=stop_mode=clone:stop_duration=${(seconds - shown + 0.1).toFixed(2)}`)
	const tmp = file.replace(/\.mp4$/, '.prepared.mp4')
	run('ffmpeg', [
		'-y', '-i', file, '-vf', filters.join(','),
		'-c:v', 'libx264', '-preset', 'slow', '-crf', '14', '-tune', 'stillimage', '-g', '30', '-keyint_min', '30',
		'-pix_fmt', 'yuv420p', '-an', tmp,
	])
	fs.renameSync(tmp, file)
}

// Where each recording sits: side by side, or stacked (Before above After)
// when the recordings are wide and short.
function layoutFrames(slide, count, aspect) {
	const height = STAGE.bottom - STAGE.top
	const stacked = count > 1 && (slide.layout === 'stack' || (slide.layout !== 'side' && aspect > 2.2))
	if (stacked) {
		const gap = 16
		const h = Math.min((height - count * STAGE.bar - (count - 1) * (gap + STAGE.label)) / count, STAGE.width / aspect)
		const w = h * aspect
		const used = count * (STAGE.bar + h) + (count - 1) * (gap + STAGE.label)
		let top = STAGE.top + STAGE.bar + (height - used) / 2
		return Array.from({ length: count }, () => {
			const box = { left: Math.round((W - w) / 2), top: Math.round(top), width: Math.round(w), height: Math.round(h) }
			top += h + gap + STAGE.label + STAGE.bar
			return box
		})
	}
	const maxW = (STAGE.width - STAGE.gap * (count - 1)) / count
	const h = Math.min(height - STAGE.bar, maxW / aspect)
	const w = h * aspect
	const left = (W - (w * count + STAGE.gap * (count - 1))) / 2
	const top = STAGE.top + STAGE.bar + (height - STAGE.bar - h) / 2
	return Array.from({ length: count }, (_, n) => ({
		left: Math.round(left + n * (w + STAGE.gap)), top: Math.round(top), width: Math.round(w), height: Math.round(h),
	}))
}

// Recordings that play at the fastest speed allowed and still run past their
// narration: the hardest to follow, and the slide waits for them.
export function tooFast(timeline, maxSpeed = 1.8) {
	return timeline.flatMap((t) =>
		t.videos
			.filter((v) => v.speed >= maxSpeed - 0.001 && v.wanted > maxSpeed + 0.01)
			.map((v) => ({ slide: t.index + 1, name: v.name, speed: v.speed, over: v.length / v.speed - (t.voice + 0.25) }))
	)
}

export function plan(manifest, assets, { viewportWidth = 1280 } = {}) {
	const maxSpeed = manifest.maxSpeed ?? 1.8
	let cursor = 0
	return manifest.slides.map((slide, index) => {
		const voice = narrationSeconds(assets, slide)
		const target = Math.max(voice, slide.durationInSeconds || 0)
		const videos = videosOf(slide).map((name) => {
			const file = path.join(assets, name)
			if (!fs.existsSync(file)) throw new Error(`Slide ${index + 1}: recording ${name} not found`)
			const length = mediaDuration(file)
			// wanted: how fast it would have to play to fit its narration.
			return { name, file, length, wanted: target ? length / target : 1, speed: fitSpeed(length, target, maxSpeed, slide.speed !== false) }
		})
		const longest = Math.max(0, ...videos.map((v) => v.length / v.speed + 0.1))
		const seconds = Math.round(Math.max(target, longest, voice || slide.durationInSeconds ? 0 : DEFAULT_SECONDS[slide.type] || 4) * 100) / 100
		for (const v of videos) prepareVideo(v.file, { crop: slide.crop, speed: v.speed, seconds, viewportWidth })
		const size = videos.length ? videoSize(videos[0].file) : null
		const frames = size ? layoutFrames(slide, videos.length, size.width / size.height) : []
		const entry = { slide, index, start: cursor, seconds, voice: voice ? Math.min(voice - 0.25, seconds) : 0, videos, frames }
		cursor += seconds
		return entry
	})
}

// --- Captions -------------------------------------------------------------------

// Whisper words → short caption lines: break at sentence ends, pauses over
// half a second, or about 42 characters (52 to finish a sentence or clause).
// Fixes every video needs, before the manifest's own captionFixes.
export const COMMON_FIXES = { 'Poll Request': 'Pull request', 'Poll request': 'Pull request', 'poll request': 'pull request' }
export function captionLines(words, offset, fixes = {}) {
	const lines = []
	let current = []
	const flush = () => {
		if (!current.length) return
		let text = current.map((w) => w.text.trim()).join(' ')
		for (const [from, to] of Object.entries({ ...COMMON_FIXES, ...fixes })) text = text.split(from).join(to)
		const start = current[0].start
		const end = Math.max(current.at(-1).end, start + 0.5)
		lines.push({ text, start: offset + start, seconds: end - start })
		current = []
	}
	for (const [k, word] of words.entries()) {
		const prev = current.at(-1)
		const length = current.reduce((n, w) => n + w.text.length + 1, 0)
		// The end of a sentence or clause (this word or the next) may run the
		// line a little long rather than leave a word or two on their own.
		const endsSoon = /[.?!,]$/.test(word.text) || /[.?!]$/.test(words[k + 1]?.text ?? '')
		const limit = endsSoon ? 52 : 42
		if (prev && (word.start - prev.end > 0.5 || length + word.text.length > limit || /[.?!]$/.test(prev.text))) flush()
		current.push(word)
	}
	flush()
	// Never overlap the next line.
	for (let k = 0; k + 1 < lines.length; k++) lines[k].seconds = Math.min(lines[k].seconds, lines[k + 1].start - lines[k].start - 0.02)
	return lines
}

// --- HTML -----------------------------------------------------------------------

function windowFrame(box, label, url) {
	const top = box.top - STAGE.bar
	const tag = label
		? `<div class="tag ${/^before$/i.test(label) ? 'tag-before' : 'tag-after'}" style="left:${box.left}px;width:${box.width}px;top:${top - STAGE.label}px"><span>${esc(label)}</span></div>`
		: ''
	return `${tag}<div class="window" style="left:${box.left}px;top:${top}px;width:${box.width}px;height:${box.height + STAGE.bar}px"><div class="chrome"><i></i><i></i><i></i>${url ? `<b>${esc(url)}</b>` : ''}</div></div>`
}

const SLIDES = {
	intro: ({ slide }, ctx) => `
		<div class="hero">
			<div class="kicker"><span class="pill">What changed</span>${esc(ctx.repoLabel)} · ${esc(slide.ref ?? ctx.ref)}</div>
			<h1>${esc(slide.title)}</h1>
			${slide.subtitle ? `<p class="sub">${esc(slide.subtitle)}</p>` : ''}
			${slide.date ? `<p class="meta">${esc(slide.date)}</p>` : ''}
		</div>`,
	text: ({ slide }) => `
		<div class="hero">
			<h1 class="smaller">${esc(slide.title)}</h1>
			${slide.subtitle ? `<p class="sub">${esc(slide.subtitle)}</p>` : ''}
		</div>`,
	list: ({ slide }) => `
		<div class="listing">
			<h2>${esc(slide.title)}</h2>
			<ol>${(slide.items || []).map((item) => `<li>${esc(item)}</li>`).join('')}</ol>
		</div>`,
	image: ({ slide }) => `
		${slide.title ? `<div class="heading">${esc(slide.title)}</div>` : ''}
		<img class="still" src="assets/${esc(slide.src)}" alt="">`,
	clip: ({ slide, frames }) => `
		${slide.title ? `<div class="heading">${esc(slide.title)}</div>` : ''}
		${windowFrame(frames[0], slide.label ?? 'After', slide.url)}`,
	compare: ({ slide, frames }) => `
		${slide.title ? `<div class="heading">${esc(slide.title)}</div>` : ''}
		${windowFrame(frames[0], 'Before', slide.url)}
		${windowFrame(frames[1], 'After', slide.url)}`,
	outro: (_, ctx) => `<div class="hero centred"><div class="brand-big">${esc(ctx.brand)}</div><p class="meta">What changed · ${esc(ctx.ref)}</p></div>`,
}

// ref names what the video is about ("#122", or several PRs in a reel), on
// title cards and the outro; footer is the text at the bottom right.
export function html(timeline, { pr, ref = `#${pr}`, footer = `PR ${ref}`, progress = true, brand, repoLabel, accent = '#2563eb', captions = [] }) {
	const total = timeline.reduce((n, t) => n + t.seconds, 0)
	const ctx = { ref, brand, repoLabel }
	const scenes = []
	const media = []
	const tweens = []
	for (const t of timeline) {
		const render = SLIDES[t.slide.type]
		if (!render) throw new Error(`Slide ${t.index + 1}: unknown type "${t.slide.type}"`)
		const id = `s${t.index}`
		const plain = ['intro', 'text', 'list', 'outro'].includes(t.slide.type)
		scenes.push(`<section id="${id}" class="clip scene ${plain ? 'plain' : 'stage'}" data-start="${t.start}" data-duration="${t.seconds}" data-track-index="1">${render(t, ctx)}</section>`)
		const fadeIn = t.index === 0 ? 0 : 0.35
		const ids = [id]
		t.videos.forEach((v, n) => {
			const box = t.frames[n]
			const vid = `${id}v${n}`
			ids.push(vid)
			media.push(`<video id="${vid}" class="clip shot" data-start="${t.start}" data-duration="${t.seconds}" data-track-index="${2 + n}" muted playsinline src="assets/${esc(v.name)}" style="left:${box.left}px;top:${box.top}px;width:${box.width}px;height:${box.height}px"></video>`)
		})
		if (t.slide.audio && t.voice) {
			media.push(`<audio class="clip" data-start="${t.start}" data-duration="${t.voice.toFixed(3)}" data-track-index="20" data-volume="1" src="assets/${esc(t.slide.audio)}"></audio>`)
		}
		for (const target of ids) {
			if (fadeIn) tweens.push(`tl.fromTo("#${target}",{opacity:0},{opacity:1,duration:${fadeIn},ease:"power1.out"},${t.start});`)
			else tweens.push(`tl.set("#${target}",{opacity:1},0);`)
			tweens.push(`tl.to("#${target}",{opacity:0,duration:0.35,ease:"power1.in"},${(t.start + t.seconds - 0.35).toFixed(3)});`)
		}
	}
	const captionHtml = captions
		.map((c, k) => `<div class="clip caption" data-start="${c.start.toFixed(3)}" data-duration="${Math.max(0.2, c.seconds).toFixed(3)}" data-track-index="${30 + (k % 3)}">${esc(c.text)}</div>`)
		.join('\n')

	return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=${W}, height=${H}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<style>
:root { --ink: #111827; --muted: #6b7280; --line: #e5e7eb; --paper: #ffffff; --wash: #f3f4f6; --accent: ${esc(accent)}; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: ${W}px; height: ${H}px; overflow: hidden; background: var(--paper); color: var(--ink); font-family: "Inter", sans-serif; -webkit-font-smoothing: antialiased; }
.scene { position: absolute; inset: 0; opacity: 0; }
.scene.plain { background: var(--paper); }
.scene.stage { background: var(--wash); }
.hero { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; padding: 0 170px; }
.hero.centred { align-items: center; text-align: center; }
.kicker { display: flex; align-items: center; gap: 18px; font-size: 24px; color: var(--muted); margin-bottom: 44px; }
.pill { font-size: 18px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--accent); border: 1.5px solid var(--accent); border-radius: 999px; padding: 6px 16px; }
h1 { font-size: 112px; line-height: 1.04; letter-spacing: -0.035em; font-weight: 700; max-width: 1580px; }
h1.smaller { font-size: 92px; }
.sub { margin-top: 40px; font-size: 36px; line-height: 1.4; color: #374151; max-width: 1450px; }
.meta { margin-top: 56px; font-family: "JetBrains Mono", monospace; font-size: 22px; color: var(--muted); letter-spacing: 0.04em; }
.listing { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; padding: 0 240px; gap: 56px; }
.listing h2 { font-size: 72px; letter-spacing: -0.025em; font-weight: 600; }
.listing ol { list-style: none; counter-reset: n; display: flex; flex-direction: column; gap: 30px; }
.listing li { counter-increment: n; font-size: 44px; line-height: 1.3; display: flex; gap: 28px; }
.listing li::before { content: counter(n); flex: 0 0 64px; height: 64px; border-radius: 50%; background: var(--accent); color: #fff; font-size: 30px; font-weight: 600; display: flex; align-items: center; justify-content: center; }
.heading { position: absolute; top: 24px; left: 0; right: 0; text-align: center; font-size: 28px; font-weight: 600; color: #374151; }
.window { position: absolute; background: #fff; border: 1px solid #d1d5db; border-radius: 14px; overflow: hidden; box-shadow: 0 18px 50px rgba(17, 24, 39, 0.12); }
.chrome { height: ${STAGE.bar}px; display: flex; align-items: center; gap: 8px; padding: 0 18px; background: #f9fafb; border-bottom: 1px solid var(--line); }
.chrome i { width: 12px; height: 12px; border-radius: 50%; background: #d1d5db; }
.chrome b { margin-left: 16px; font: 500 16px "JetBrains Mono", monospace; color: var(--muted); background: #f3f4f6; border-radius: 8px; padding: 4px 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 70%; }
.tag { position: absolute; height: 44px; display: flex; align-items: center; justify-content: center; }
.tag span { font-size: 22px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; padding: 7px 18px; border-radius: 8px; }
.tag-before span { background: #e5e7eb; color: #374151; }
.tag-after span { background: var(--accent); color: #fff; }
.shot { position: absolute; object-fit: cover; opacity: 0; z-index: 5; background: #fff; }
.still { position: absolute; left: 140px; right: 140px; top: 130px; bottom: 150px; width: calc(100% - 280px); height: calc(100% - 280px); object-fit: contain; }
.brand-big { font-size: 140px; font-weight: 700; letter-spacing: -0.04em; }
.caption { position: absolute; bottom: 34px; left: 50%; transform: translateX(-50%); width: max-content; max-width: 1400px; z-index: 20;
	background: rgba(17, 24, 39, 0.92); color: #fde047; font-size: 42px; font-weight: 700; line-height: 1.18; letter-spacing: -0.01em;
	padding: 12px 26px; border-radius: 12px; text-align: center; }
.footer { position: absolute; left: 80px; right: 80px; bottom: 44px; display: flex; justify-content: space-between; z-index: 10;
	font: 500 18px "JetBrains Mono", monospace; color: #9ca3af; }
.footer strong { font-family: "Inter", sans-serif; font-weight: 700; color: var(--ink); }
.progress { position: absolute; left: 0; top: 0; height: 6px; width: ${W}px; background: var(--accent); transform-origin: 0 50%; transform: scaleX(0); z-index: 30; }
</style>
</head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-duration="${total.toFixed(3)}" data-width="${W}" data-height="${H}">
${scenes.join('\n')}
${media.join('\n')}
<div class="clip footer" data-start="0" data-duration="${total.toFixed(3)}" data-track-index="40"><strong>${esc(brand)}</strong><span>${esc(footer)}</span></div>
${progress ? `<div class="clip progress" id="progress" data-start="0" data-duration="${total.toFixed(3)}" data-track-index="41"></div>` : ''}
${captionHtml}
</div>
<script>
window.__timelines = window.__timelines || {};
const tl = gsap.timeline({ paused: true });
${tweens.join('\n')}
${progress ? `tl.fromTo("#progress", { scaleX: 0 }, { scaleX: 1, duration: ${total.toFixed(3)}, ease: "none" }, 0);` : ''}
window.__timelines["main"] = tl;
</script>
</body>
</html>
`
}
