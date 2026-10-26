// reel: several published walkthrough videos → one short video, 3 minutes
// at most, made of the slides worth keeping from each.
//
//   scan  find the PRs whose videos are on the release (publish.mjs puts them
//         there), download them, cut each into its slides, transcribe them,
//         and write sources.json, one contact sheet per video, and a starter
//         reel.json.
//   make  voice and render the reel's own title cards, then join cards and
//         chosen slides into .ui-walkthrough/out/<name>.mp4.
//
// Slides are found from the chapters render.mjs writes into each video. Videos
// made before chapters existed are cut where the picture goes blank: every
// slide fades out while the next fades in, so the frame at a cut is almost
// empty paper.

import fs from 'node:fs'
import path from 'node:path'
import { contactSheet } from './check.mjs'
import { DEFAULT_SECONDS as SILENT_SECONDS } from './compose.mjs'
import { renderManifest, transcribe } from './render.mjs'
import { voiceFolder } from './voice.mjs'
import { hasAudioStream, mediaDuration, plainName, readJson, run, writeJson } from './util.mjs'

const ASSET = /^pr-(\d+)-walkthrough\.mp4$/
const MARKER = '<!-- ui-walkthrough -->'
export const MAX_SECONDS = 180
// Shown when a reel leaves out a PR's own title slide.
const SECTION_SECONDS = 3

const gh = (args, cwd) => run('gh', args, { cwd })

export function reelPaths(config, name) {
	const home = path.join(config.root, '.ui-walkthrough')
	const dir = path.join(home, 'reel', plainName(name))
	return {
		dir,
		sources: path.join(home, 'reel', '.videos'),
		transcripts: path.join(home, 'reel', '.transcripts'),
		sheets: path.join(dir, 'sheets'),
		cards: path.join(dir, 'cards'),
		out: path.join(home, 'out'),
	}
}

export const clock = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

const day = (iso) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })

// "6–8 October 2026", "30 September – 2 October 2026", or one day.
export function dateRange(isos) {
	const dates = isos.filter(Boolean).map((d) => new Date(d)).sort((a, b) => a - b)
	if (!dates.length) return ''
	const [first, last] = [dates[0], dates.at(-1)]
	const a = day(first)
	const b = day(last)
	if (a === b) return a
	if (first.getUTCFullYear() === last.getUTCFullYear() && first.getUTCMonth() === last.getUTCMonth()) return `${first.getUTCDate()}–${b}`
	if (first.getUTCFullYear() === last.getUTCFullYear()) return `${a.replace(/ \d{4}$/, '')} – ${b}`
	return `${a} – ${b}`
}

// --- Cutting a finished video into its slides -----------------------------------

// Cuts from brightness samples [{ t, y }] (the picture without the progress
// bar, captions and footer): moments brighter than `threshold` that are a
// peak, at least `dip` brighter than something within `window` seconds (a
// fade), and not at the very start or end.
export function cutsFromBrightness(samples, { threshold = 232, dip = 2, window = 0.6, edge = 0.5 } = {}) {
	const end = samples.at(-1)?.t ?? 0
	const cuts = []
	for (let k = 0; k < samples.length; k++) {
		const { t, y } = samples[k]
		if (y < threshold || t < edge || t > end - edge) continue
		let peak = true
		let low = y
		for (let j = k - 1; j >= 0 && samples[j].t >= t - window; j--) {
			if (samples[j].y >= y) peak = false
			low = Math.min(low, samples[j].y)
		}
		for (let j = k + 1; j < samples.length && samples[j].t <= t + window; j++) {
			if (samples[j].y > y) peak = false
			low = Math.min(low, samples[j].y)
		}
		if (peak && y - low >= dip && (!cuts.length || t - cuts.at(-1) > window)) cuts.push(t)
	}
	return cuts
}

function brightness(file) {
	// Leave out the progress bar (top) and the captions and footer (bottom).
	const out = run('ffmpeg', ['-v', 'error', '-i', file, '-an', '-vf', 'crop=iw:ih*0.80:0:ih*0.02,scale=192:-2,signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=-', '-f', 'null', '-'])
	const samples = []
	let t = null
	for (const line of out.split('\n')) {
		const time = line.match(/pts_time:([\d.]+)/)
		if (time) t = Number(time[1])
		const y = line.match(/YAVG=([\d.]+)/)
		if (y && t !== null) samples.push({ t, y: Number(y[1]) })
	}
	return samples
}

function chaptersOf(file) {
	const json = JSON.parse(run('ffprobe', ['-v', 'error', '-show_chapters', '-of', 'json', file]))
	return (json.chapters || []).map((c) => {
		const [type, ...title] = String(c.tags?.title || '').split('|')
		return { start: Number(c.start_time), end: Number(c.end_time), kind: type || 'slide', title: title.join('|') }
	})
}

// One finished video's slides, [{ id, start, end, seconds, kind, title }],
// and whether they came from its chapters.
export function slidesOf(file) {
	const seconds = mediaDuration(file)
	let slides = chaptersOf(file)
	const fromChapters = slides.length > 0
	if (!fromChapters) {
		// The blank frame can fall a frame after the next slide's narration
		// starts; the line before ended a quarter second earlier, so cut early.
		const bounds = [0, ...cutsFromBrightness(brightness(file)).map((t) => t - 0.04), seconds]
		slides = bounds.slice(0, -1).map((start, k) => ({ start, end: bounds[k + 1], kind: 'slide', title: '' }))
	}
	slides = slides.map((s, id) => ({ id, ...s, end: Math.min(s.end, seconds), seconds: Math.round((Math.min(s.end, seconds) - s.start) * 100) / 100 }))
	return { slides, fromChapters }
}

// Without chapters: the first slide is the PR's title card, and a short
// silent last slide is its outro.
function guessKinds(slides) {
	if (slides.some((s) => s.kind !== 'slide')) return
	if (slides.length > 1) slides[0].kind = 'intro'
	const last = slides.at(-1)
	if (slides.length > 2 && last.seconds < 4.5 && !last.text) last.kind = 'outro'
}

// --- GitHub ------------------------------------------------------------------------

// The notes publish.mjs wrote on the PR: { notes, onScreen, none }.
function commentOf(root, repo, pr) {
	const bodies = gh(['api', '--paginate', `repos/${repo}/issues/${pr}/comments`, '--jq', `.[] | select(.body | contains("${MARKER}")) | .body | @json`], root)
		.split('\n')
		.filter(Boolean)
		.map((line) => JSON.parse(line))
	const body = bodies.at(-1)
	if (!body) return {}
	const none = body.match(/\*\*No walkthrough video for this PR\.\*\*\s*([^\n]*)/)
	if (none) return { none: none[1].replace(/^No walkthrough video for this PR:?\s*/i, '').trim() }
	const lines = body.split('\n')
	const at = lines.findIndex((l) => /^\*\*On screen\*\*/.test(l))
	const onScreen = at >= 0 ? lines.slice(at + 1).filter((l) => /^- /.test(l)).map((l) => l.slice(2)) : []
	const notes = lines
		.slice(0, at >= 0 ? at : undefined)
		.filter((l) => l !== MARKER && !/^###|^\*\*\[Watch|^<sub>/.test(l))
		.join('\n')
		.trim()
	return { notes, onScreen }
}

function mergedPrs(root, { since, numbers }) {
	const fields = 'number,title,mergedAt,url'
	if (numbers?.length) return numbers.map((n) => JSON.parse(gh(['pr', 'view', String(n), '--json', fields], root)))
	const search = since ? ['--search', `merged:>=${since}`] : []
	return JSON.parse(gh(['pr', 'list', '--state', 'merged', '--limit', '200', '--json', fields, ...search], root))
}

function download(root, tag, asset, dir) {
	fs.mkdirSync(dir, { recursive: true })
	const file = path.join(dir, asset.name)
	const stamp = path.join(dir, `${asset.name}.json`)
	const known = readJson(stamp, null)
	if (fs.existsSync(file) && known?.updatedAt === asset.updatedAt && fs.statSync(file).size === asset.size) return file
	gh(['release', 'download', tag, '--pattern', asset.name, '--dir', dir, '--clobber'], root)
	writeJson(stamp, { updatedAt: asset.updatedAt, size: asset.size })
	return file
}

// --- list ---------------------------------------------------------------------------

// The merged PRs that have a published video, newest first, so the person can choose.
export function reelList(config) {
	const root = config.root
	const tag = config.publish?.release || 'ui-walkthrough-videos'
	let assets
	try {
		assets = JSON.parse(gh(['release', 'view', tag, '--json', 'assets'], root)).assets
	} catch {
		return console.log(`   No "${tag}" release yet: no walkthrough videos have been published.`)
	}
	const numbers = new Set(assets.filter((a) => ASSET.test(a.name)).map((a) => Number(a.name.match(ASSET)[1])))
	const prs = mergedPrs(root, {}).filter((p) => p.mergedAt && numbers.has(p.number))
	prs.sort((a, b) => new Date(b.mergedAt) - new Date(a.mergedAt))
	console.log(`   ${prs.length} merged PR(s) with a published video, newest first:`)
	for (const p of prs) console.log(`     #${p.number}  ${day(p.mergedAt)}  ${p.title}`)
}

// --- scan ---------------------------------------------------------------------------

export async function reelScan(config, { name, prs = [], last, since }) {
	const rp = reelPaths(config, name)
	const root = config.root
	const repo = gh(['repo', 'view', '--json', 'nameWithOwner', '--jq', '.nameWithOwner'], root)
	const tag = config.publish?.release || 'ui-walkthrough-videos'
	let assets
	try {
		assets = JSON.parse(gh(['release', 'view', tag, '--json', 'assets'], root)).assets
	} catch {
		throw new Error(`No "${tag}" release in ${repo}: no walkthrough videos have been published yet (publish puts them there).`)
	}
	const videos = new Map(assets.filter((a) => ASSET.test(a.name)).map((a) => [Number(a.name.match(ASSET)[1]), a]))
	console.log(`   ${videos.size} published walkthrough video(s) in ${repo}, release "${tag}"`)

	// Which PRs: the ones named, else every merged PR with a video since a
	// date, else the `last` most recently merged (5 by default).
	const merged = mergedPrs(root, { since, numbers: prs }).filter((p) => p.mergedAt)
	merged.sort((a, b) => new Date(a.mergedAt) - new Date(b.mergedAt))
	let chosen = merged.filter((p) => videos.has(p.number))
	if (!prs.length && (last || !since)) chosen = chosen.slice(-(last || 5))
	if (!chosen.length) throw new Error(prs.length ? `None of ${prs.map((n) => `#${n}`).join(', ')} has a published video.` : 'No merged PR in that range has a published video.')

	// Merged PRs in the same span with no video, for an "Also merged" slide.
	const from = new Date(chosen[0].mergedAt)
	const others = (prs.length ? merged : merged.filter((p) => new Date(p.mergedAt) >= from)).filter((p) => !videos.has(p.number))

	fs.mkdirSync(rp.sheets, { recursive: true })
	const sources = []
	for (const pr of chosen) {
		const file = download(root, tag, videos.get(pr.number), rp.sources)
		const { slides, fromChapters } = slidesOf(file)
		// Whisper words for the whole video, cached by the file's contents.
		const work = path.join(rp.sources, `.pr-${pr.number}`)
		const wav = path.join(work, 'assets', 'voice.wav')
		fs.mkdirSync(path.dirname(wav), { recursive: true })
		run('ffmpeg', ['-y', '-v', 'error', '-i', file, '-vn', '-ac', '1', '-ar', '16000', wav])
		const words = transcribe(work, path.join(work, 'assets'), 'voice.wav', rp.transcripts)
		fs.rmSync(work, { recursive: true, force: true })
		for (const s of slides) {
			// Whisper starts a word early, swallowing the pause before it; its ends are close.
			s.text = words.filter((w) => w.end - 0.05 >= s.start && w.end - 0.05 < s.end).map((w) => w.text.trim()).join(' ')
		}
		guessKinds(slides)
		// One frame per slide, 60% of the way in, numbered left to right.
		const frames = path.join(rp.sheets, `.pr-${pr.number}`)
		fs.rmSync(frames, { recursive: true, force: true })
		fs.mkdirSync(frames, { recursive: true })
		for (const s of slides) {
			run('ffmpeg', ['-y', '-v', 'error', '-ss', (s.start + s.seconds * 0.6).toFixed(2), '-i', file, '-frames:v', '1', '-vf', 'scale=480:-2', path.join(frames, `${String(s.id).padStart(2, '0')}.png`)])
		}
		const cols = Math.min(4, slides.length)
		const sheet = path.join(rp.sheets, `pr-${pr.number}.png`)
		run('ffmpeg', ['-y', '-v', 'error', '-framerate', '1', '-i', path.join(frames, '%02d.png'), '-vf', `tile=${cols}x${Math.ceil(slides.length / cols)}:padding=8:margin=8:color=0x9ca3af`, '-frames:v', '1', sheet])
		fs.rmSync(frames, { recursive: true, force: true })
		sources.push({ ...pr, ...commentOf(root, repo, pr.number), file: path.relative(root, file), seconds: mediaDuration(file), sheet: path.relative(root, sheet), chapters: fromChapters, slides })
	}
	const withReasons = others.slice(0, 15).map((p) => ({ ...p, reason: commentOf(root, repo, p.number).none || null }))
	writeJson(path.join(rp.dir, 'sources.json'), { repo, tag, videos: sources, others: withReasons })

	const reelFile = path.join(rp.dir, 'reel.json')
	if (!fs.existsSync(reelFile)) writeJson(reelFile, starter(config, sources))
	report(config, rp, sources, withReasons, readJson(reelFile))
}

function starter(config, sources) {
	return {
		title: `What changed in ${config.brand}`,
		subtitle: '',
		date: dateRange(sources.map((s) => s.mergedAt)),
		intro: `Here's what changed in ${config.brand}, in ${sources.length} short walkthrough${sources.length === 1 ? '' : 's'}.`,
		parts: sources.map((s) => ({ pr: s.number, slides: s.slides.filter((x) => x.kind !== 'outro').map((x) => x.id) })),
		also: null,
		outro: true,
	}
}

function report(config, rp, sources, others, reel) {
	const rel = (f) => path.relative(config.root, f)
	for (const s of sources) {
		console.log(`\n   #${s.number} ${s.title}`)
		console.log(`   merged ${day(s.mergedAt)} · ${clock(s.seconds)} · ${s.chapters ? 'chapters' : 'cut where the picture goes blank'} · sheet ${s.sheet}`)
		if (s.notes) console.log(`   notes: ${s.notes.replace(/\s+/g, ' ').slice(0, 280)}${s.notes.length > 280 ? '…' : ''}`)
		if (s.onScreen?.length) console.log(`   on screen: ${s.onScreen.join(' | ')}`)
		for (const x of s.slides) {
			const said = x.text ? `"${x.text.slice(0, 110)}${x.text.length > 110 ? '…' : ''}"` : '(silent)'
			console.log(`     ${String(x.id).padStart(2)}  ${clock(x.start)}–${clock(x.end)}  ${x.seconds.toFixed(1).padStart(5)}s  ${x.kind.padEnd(7)} ${x.title ? `${x.title}: ` : ''}${said}`)
		}
	}
	if (others.length) {
		console.log('\n   Merged in the same span, no video:')
		for (const o of others) console.log(`     #${o.number} ${o.title}${o.reason ? ` (${o.reason.slice(0, 120)}${o.reason.length > 120 ? '…' : ''})` : ''}`)
	}
	const chosen = estimate(sources, reel)
	console.log(`\n   Wrote ${rel(path.join(rp.dir, 'sources.json'))} and ${rel(path.join(rp.dir, 'reel.json'))}`)
	console.log(`   reel.json as it stands: about ${chosen.toFixed(0)}s with title cards (limit ${MAX_SECONDS}s)${chosen > MAX_SECONDS ? ': choose fewer slides' : ''}`)
}

// --- make ---------------------------------------------------------------------------

// Seconds of the chosen slides plus a rough allowance for the reel's own cards
// (before they are voiced).
export function estimate(sources, reel) {
	const { items } = planReel(sources, reel, { strict: false })
	const cards = items.filter((i) => i.card)
	const words = (t) => (t ? t.split(/\s+/).length : 0)
	return (
		items.filter((i) => !i.card).reduce((n, i) => n + i.seconds, 0) +
		cards.reduce((n, c) => n + (c.slide.durationInSeconds || (c.narration ? words(c.narration) / 2.6 + 0.6 : SILENT_SECONDS[c.slide.type] || 4)), 0)
	)
}

// reel.json + sources.json → the reel in order: title cards (to render) and
// slides (cut from the PR videos). Throws on anything that can't be made.
export function planReel(sources, reel, { strict = true } = {}) {
	const problems = []
	const items = []
	const byPr = new Map(sources.map((s) => [s.number, s]))
	if (!reel?.parts?.length) problems.push('reel.json has no "parts"')
	if (strict && !String(reel?.intro ?? '').trim()) problems.push('reel.json needs an "intro" line for the narrator')
	items.push({ card: true, slide: { type: 'intro', title: reel?.title || 'What changed', subtitle: reel?.subtitle || undefined, date: reel?.date || undefined }, narration: reel?.intro })
	const seen = new Set()
	for (const part of reel?.parts || []) {
		const source = byPr.get(part.pr)
		if (!source) {
			problems.push(`PR #${part.pr} is not in sources.json (scan it first)`)
			continue
		}
		if (seen.has(part.pr)) problems.push(`PR #${part.pr} appears twice`)
		seen.add(part.pr)
		const ids = part.slides || []
		if (!ids.length) problems.push(`PR #${part.pr}: no slides chosen`)
		const chosen = ids.map((id) => source.slides.find((s) => s.id === id))
		ids.forEach((id, k) => !chosen[k] && problems.push(`PR #${part.pr}: there is no slide ${id} (it has 0–${source.slides.length - 1})`))
		if (new Set(ids).size !== ids.length) problems.push(`PR #${part.pr}: a slide is chosen twice`)
		// Without its own title slide, a PR gets a short silent card naming it.
		if (part.card !== false && !chosen.some((s) => s?.kind === 'intro')) {
			items.push({ card: true, pr: part.pr, slide: { type: 'intro', title: part.title || source.title, ref: `#${part.pr}`, date: `Merged ${day(source.mergedAt)}`, durationInSeconds: SECTION_SECONDS } })
		}
		for (const s of chosen.filter(Boolean)) items.push({ pr: part.pr, file: source.file, start: s.start, seconds: s.seconds, kind: s.kind, id: s.id })
	}
	if (reel?.also?.items?.length) {
		items.push({ card: true, slide: { type: 'list', title: reel.also.title || 'Also merged', items: reel.also.items }, narration: reel.also.narration })
	}
	if (reel?.outro !== false) items.push({ card: true, slide: { type: 'outro' } })
	if (strict && problems.length) throw new Error(`reel.json:\n     - ${problems.join('\n     - ')}`)
	return { items, problems }
}

export async function reelMake(config, { name, preview = false, max = MAX_SECONDS, workers }) {
	const rp = reelPaths(config, name)
	const sourcesFile = path.join(rp.dir, 'sources.json')
	const reelFile = path.join(rp.dir, 'reel.json')
	if (!fs.existsSync(sourcesFile)) throw new Error(`No ${path.relative(config.root, sourcesFile)}; run reel scan first.`)
	const { videos } = readJson(sourcesFile)
	const reel = readJson(reelFile, null)
	if (!reel) throw new Error(`No ${path.relative(config.root, reelFile)}`)
	const { items } = planReel(videos, reel)
	for (const v of videos) if (!fs.existsSync(path.join(config.root, v.file))) throw new Error(`${v.file} is missing; run reel scan again.`)
	const slidesSeconds = items.filter((i) => !i.card).reduce((n, i) => n + i.seconds, 0)
	if (slidesSeconds > max) throw new Error(`The chosen slides alone run ${slidesSeconds.toFixed(0)}s, over the ${max}s limit. ${breakdown(items)}`)

	// The reel's own cards: voiced, then rendered together as one short video.
	const cards = items.filter((i) => i.card)
	fs.mkdirSync(rp.cards, { recursive: true })
	const lines = []
	for (const c of cards) {
		if (!String(c.narration ?? '').trim()) continue
		c.slide.audio = `audio-${String(lines.length).padStart(2, '0')}.wav`
		lines.push(c.narration.trim())
	}
	if (lines.length) {
		writeJson(path.join(rp.cards, 'narration.json'), { slides: lines })
		await voiceFolder(config, rp.cards)
	}
	// Check the length before rendering: card lengths are known once voiced.
	const voiced = cards.map((c) => {
		const audio = c.slide.audio ? mediaDuration(path.join(rp.cards, c.slide.audio)) + 0.25 : 0
		return Math.max(audio, c.slide.durationInSeconds || 0, audio || c.slide.durationInSeconds ? 0 : SILENT_SECONDS[c.slide.type] || 4)
	})
	const projected = slidesSeconds + voiced.reduce((a, b) => a + b, 0)
	if (projected > max + 0.5) throw new Error(`The reel would run ${projected.toFixed(0)}s, over the ${max}s limit. ${breakdown(items, voiced)}`)

	const prs = [...new Set(items.filter((i) => i.pr).map((i) => i.pr))]
	const ref = prs.map((n) => `#${n}`).join(' · ')
	const { output: cardsVideo, timeline } = await renderManifest(config, {
		work: rp.cards,
		manifest: { slides: cards.map((c) => c.slide), captionFixes: reel.captionFixes || {} },
		id: `reel-${name}`,
		ref,
		footer: `${prs.length === 1 ? 'PR' : 'PRs'} ${ref}`,
		progress: false,
		output: path.join(rp.cards, 'cards.mp4'),
		preview,
		workers,
	})
	cards.forEach((c, k) => Object.assign(c, { file: path.relative(config.root, cardsVideo), start: timeline[k].start, seconds: timeline[k].seconds }))

	const output = path.join(rp.out, preview ? `${name}-preview.mp4` : `${name}.mp4`)
	join(config, items, output, { preview, accent: reel.accent || config.accent })
	const seconds = mediaDuration(output)
	const check = path.join(rp.dir, 'check')
	fs.rmSync(check, { recursive: true, force: true })
	fs.mkdirSync(check, { recursive: true })
	const sheet = contactSheet(output, check)
	console.log(`   ${path.relative(config.root, output)}: ${clock(seconds)}, ${(fs.statSync(output).size / 1e6).toFixed(1)} MB, ${hasAudioStream(output) ? 'with sound' : 'NO SOUND'}`)
	console.log(`   frames: ${path.relative(config.root, sheet)}`)
	if (seconds > max + 0.5) throw new Error(`${output} runs ${seconds.toFixed(0)}s, over the ${max}s limit.`)
	return output
}

function breakdown(items, voiced = []) {
	let k = 0
	const parts = []
	for (const i of items) {
		const seconds = i.card ? voiced[k++] : i.seconds
		if (i.card) parts.push(`${i.pr ? `#${i.pr} card` : i.slide.type} ${seconds ? seconds.toFixed(0) + 's' : ''}`.trim())
		else parts.push(`#${i.pr} slide ${i.id} ${i.seconds.toFixed(0)}s`)
	}
	return `Drop slides in reel.json (the slide summary or text slides go first): ${parts.join(', ')}.`
}

// Cut every piece out of its video and join them, with one progress bar for
// the whole reel (each PR video's own bar is painted over) and a chapter per PR.
function join(config, items, output, { preview, accent = '#2563eb' }) {
	const total = items.reduce((n, i) => n + i.seconds, 0)
	const inputs = []
	const filters = []
	items.forEach((item, k) => {
		const file = path.join(config.root, item.file)
		inputs.push('-ss', item.start.toFixed(3), '-t', item.seconds.toFixed(3), '-i', file)
		const d = item.seconds.toFixed(3)
		filters.push(`[${k}:v]scale=1920:1080:flags=lanczos,fps=30,format=yuv420p,setsar=1,tpad=stop_mode=clone:stop_duration=1,trim=duration=${d},setpts=PTS-STARTPTS[v${k}]`)
		filters.push(
			hasAudioStream(file)
				? `[${k}:a]aresample=48000,aformat=sample_fmts=fltp:channel_layouts=stereo,apad,atrim=duration=${d},asetpts=PTS-STARTPTS,afade=t=in:d=0.03,afade=t=out:st=${Math.max(0, item.seconds - 0.05).toFixed(3)}:d=0.05[a${k}]`
				: `anullsrc=r=48000:cl=stereo,atrim=duration=${d},aformat=sample_fmts=fltp:channel_layouts=stereo[a${k}]`
		)
	})
	filters.push(`${items.map((_, k) => `[v${k}][a${k}]`).join('')}concat=n=${items.length}:v=1:a=1[joined][a]`)
	filters.push(`color=c=${accent}:s=1920x6:r=30:d=${total.toFixed(3)}[bar]`)
	filters.push(`[joined]drawbox=x=0:y=0:w=iw:h=6:color=white:t=fill[plain]`)
	filters.push(`[plain][bar]overlay=x='-w+w*t/${total.toFixed(3)}':y=0:eof_action=pass${preview ? ',scale=1280:720:flags=lanczos' : ''}[v]`)

	// A chapter per PR (the reel's own cards are their own chapters).
	const marks = []
	let at = 0
	for (const i of items) {
		const title = i.card && !i.pr ? (i.slide.type === 'intro' ? 'Intro' : i.slide.type === 'list' ? i.slide.title || 'Also merged' : 'End') : `PR #${i.pr}`
		if (marks.at(-1)?.title === title) marks.at(-1).end = at + i.seconds
		else marks.push({ title, start: at, end: at + i.seconds })
		at += i.seconds
	}
	const metadata = path.join(path.dirname(output), `.${path.basename(output)}.chapters.txt`)
	fs.mkdirSync(path.dirname(output), { recursive: true })
	fs.writeFileSync(metadata, [';FFMETADATA1', ...marks.map((m) => `[CHAPTER]\nTIMEBASE=1/1000\nSTART=${Math.round(m.start * 1000)}\nEND=${Math.round(m.end * 1000)}\ntitle=${m.title.replace(/[=;#\\]/g, '\\$&')}`)].join('\n') + '\n')
	const video = preview ? ['-c:v', 'libx264', '-preset', 'veryfast', '-crf', '23'] : ['-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-tune', 'stillimage']
	const meta = items.length
	run('ffmpeg', [
		'-y', '-v', 'error', ...inputs, '-f', 'ffmetadata', '-i', metadata,
		'-filter_complex', filters.join(';'), '-map', '[v]', '-map', '[a]', '-map_chapters', String(meta),
		...video, '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-ar', '48000', '-movflags', '+faststart', output,
	])
	fs.rmSync(metadata, { force: true })
}
