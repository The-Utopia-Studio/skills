// render: manifest.json → .ui-walkthrough/out/pr-<n>-walkthrough.mp4, with a
// chapter per slide.
//
// 1. Copy the manifest's recordings, images and narration into a fresh
//    render folder (the originals are never modified).
// 2. Transcribe each narration clip with whisper (local, via HyperFrames),
//    cached by the clip's contents, for caption timing.
// 3. Prepare the recordings and lay out the page (compose.mjs).
// 4. Render it with HyperFrames, then encode the final MP4 once.

import { spawn } from 'node:child_process'
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { paths } from './config.mjs'
import { captionLines, html, plan, tooFast } from './compose.mjs'
import { HYPERFRAMES, HYPERFRAMES_ENV } from './hyperframes.mjs'
import { freeGigabytes, hasAudioStream, mediaDuration, plainName, readJson, run, sleep, writeJson } from './util.mjs'

const hf = (args, cwd) => run('npx', ['--yes', HYPERFRAMES, ...args], { cwd, env: { ...process.env, ...HYPERFRAMES_ENV } })

function referenced(manifest) {
	const files = new Set()
	for (const s of manifest.slides) for (const key of ['audio', 'src', 'before', 'after']) if (s[key]) files.add(s[key])
	return [...files]
}

export function transcribe(dir, assets, name, cacheDir) {
	const file = path.join(assets, name)
	const digest = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').slice(0, 16)
	const cached = path.join(cacheDir, `${digest}.json`)
	if (!fs.existsSync(cached)) {
		for (const leftover of [path.join(assets, 'transcript.json'), path.join(dir, 'transcript.json')]) fs.rmSync(leftover, { force: true })
		hf(['transcribe', path.join('assets', name), '--json'], dir)
		// Depending on the HyperFrames version it lands next to the audio or in the project folder.
		const written = [path.join(assets, 'transcript.json'), path.join(dir, 'transcript.json')].find((f) => fs.existsSync(f))
		if (!written) throw new Error(`whisper wrote no transcript for ${name}`)
		fs.mkdirSync(cacheDir, { recursive: true })
		fs.renameSync(written, cached)
	}
	return JSON.parse(fs.readFileSync(cached, 'utf8'))
}

// Wait for HyperFrames to finish. It can linger after writing the file, so
// a complete MP4 (with audio when there is narration) that has stopped
// growing for 10 seconds also counts as done.
async function waitForRender(child, output, needsAudio) {
	let exited = null
	child.once('exit', (code) => (exited = code ?? 1))
	let lastSize = -1
	let stableFor = 0
	while (exited === null) {
		await sleep(2)
		if (!fs.existsSync(output)) continue
		const size = fs.statSync(output).size
		stableFor = size === lastSize ? stableFor + 2 : 0
		lastSize = size
		if (stableFor >= 10) {
			try {
				if (mediaDuration(output) > 0 && (!needsAudio || hasAudioStream(output))) {
					try { process.kill(-child.pid, 'SIGTERM') } catch {}
					return 0
				}
			} catch {}
		}
	}
	return exited
}

export async function render(config, pr, { preview = false, workers } = {}) {
	const p = paths(config, pr)
	const manifest = readJson(path.join(p.work, 'manifest.json'), null)
	if (!manifest?.slides?.length) throw new Error(`No slides in ${path.join(p.work, 'manifest.json')}`)
	const output = path.join(p.out, preview ? `pr-${pr}-preview.mp4` : `pr-${pr}-walkthrough.mp4`)
	const { output: done } = await renderManifest(config, { work: p.work, manifest, id: `pr-${pr}`, ref: `#${pr}`, output, preview, workers })
	return done
}

// Chapters, one per slide ("compare|Admin: the user's permissions"), so a
// finished video can be cut at its slides later (reel.mjs) without guessing.
export function chapters(timeline) {
	const escape = (text) => String(text).replace(/[=;#\\\n]/g, (c) => (c === '\n' ? ' ' : `\\${c}`))
	return [
		';FFMETADATA1',
		...timeline.map((t) =>
			['[CHAPTER]', 'TIMEBASE=1/1000', `START=${Math.round(t.start * 1000)}`, `END=${Math.round((t.start + t.seconds) * 1000)}`, `title=${escape(`${t.slide.type}|${t.slide.title || ''}`)}`].join('\n')
		),
	].join('\n') + '\n'
}

// Render any manifest whose files sit in `work`: a PR's video, or the title
// cards of a reel. `ref`, `footer` and `progress` go to the page (compose.mjs).
// Returns the MP4 and the timeline (where each slide starts, how long it lasts).
export async function renderManifest(config, { work, manifest, id, ref, footer, progress = true, output, preview = false, workers = Number(process.env.HYPERFRAMES_WORKERS) || 3 }) {
	if (freeGigabytes(work) < 1.5) throw new Error(`Less than 1.5 GB free at ${work}; a render needs about that much.`)

	const dir = path.join(work, 'render')
	const assets = path.join(dir, 'assets')
	fs.rmSync(assets, { recursive: true, force: true })
	fs.mkdirSync(assets, { recursive: true })
	for (const name of referenced(manifest)) {
		const from = path.join(work, plainName(name))
		if (!fs.existsSync(from)) throw new Error(`${name} is in the manifest but not in ${work}`)
		fs.copyFileSync(from, path.join(assets, name))
	}
	writeJson(path.join(dir, 'meta.json'), { id, name: path.basename(output, '.mp4') })

	const timeline = plan(manifest, assets, { viewportWidth: config.viewport.width })
	const captions = []
	// What each slide says in the script and in its captions, and the
	// recordings that had to play at the fastest speed allowed, for check.
	const script = readJson(path.join(work, 'narration.json'), { slides: [] }).slides
	const heard = []
	for (const t of timeline) {
		if (!t.slide.audio) continue
		const words = transcribe(dir, assets, t.slide.audio, path.join(work, '.transcripts'))
		const lines = captionLines(words, t.start, manifest.captionFixes || {})
		captions.push(...lines)
		const line = Number((t.slide.audio.match(/^audio-(\d+)\.wav$/) || [])[1])
		heard.push({ slide: t.index + 1, script: Number.isInteger(line) ? script[line] ?? null : null, captions: lines.map((l) => l.text).join(' ') })
	}
	writeJson(path.join(dir, 'report.json'), { heard, tooFast: tooFast(timeline, manifest.maxSpeed ?? 1.8), maxSpeed: manifest.maxSpeed ?? 1.8 })
	fs.writeFileSync(
		path.join(dir, 'index.html'),
		html(timeline, { ref, footer, progress, brand: manifest.brand || config.brand, repoLabel: manifest.repoLabel || config.repoLabel, accent: manifest.accent || config.accent, captions })
	)
	const total = timeline.reduce((n, t) => n + t.seconds, 0)
	console.log(`   ${timeline.length} slides, ${total.toFixed(0)}s, ${captions.length} caption lines`)

	const renders = path.join(dir, 'renders')
	const framesCache = path.join(dir, 'frames-cache')
	fs.rmSync(renders, { recursive: true, force: true })
	fs.mkdirSync(renders, { recursive: true })
	const raw = path.join(renders, 'raw.mp4')
	const log = path.join(dir, 'hyperframes.log')
	const quality = preview ? ['-q', 'draft', '--fps', '15'] : ['-q', 'delivery']
	const child = spawn(
		'npx',
		['--yes', HYPERFRAMES, 'render', ...quality, '--workers', String(workers), '--video-frame-format', process.env.UI_WALK_FRAME_FORMAT || 'jpg', '--frames-cache-dir', framesCache, '-o', raw],
		{ cwd: dir, detached: true, stdio: ['ignore', fs.openSync(log, 'w'), fs.openSync(log, 'a')], env: { ...process.env, ...HYPERFRAMES_ENV } }
	)
	const needsAudio = timeline.some((t) => t.slide.audio)
	const code = await waitForRender(child, raw, needsAudio)
	fs.rmSync(framesCache, { recursive: true, force: true })
	if (code !== 0 || !fs.existsSync(raw)) {
		const tail = fs.readFileSync(log, 'utf8').split('\n').filter((l) => !/Streaming frame/.test(l)).slice(-12).join('\n')
		throw new Error(`HyperFrames failed (log: ${path.relative(config.root, log)}):\n${tail}`)
	}

	fs.mkdirSync(path.dirname(output), { recursive: true })
	const metadata = path.join(renders, 'chapters.txt')
	fs.writeFileSync(metadata, chapters(timeline))
	const video = preview
		? ['-vf', 'scale=1280:720:flags=lanczos,fps=30,format=yuv420p', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '23']
		: ['-vf', 'fps=30,format=yuv420p', '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-tune', 'stillimage']
	run('ffmpeg', ['-y', '-i', raw, '-f', 'ffmetadata', '-i', metadata, '-map', '0', '-map_chapters', '1', ...video, '-c:a', 'aac', '-b:a', '160k', '-ar', '48000', '-movflags', '+faststart', output])
	fs.rmSync(renders, { recursive: true, force: true })
	if (needsAudio && !hasAudioStream(output)) throw new Error(`${output} came out without sound although the slides have narration.`)
	const mb = fs.statSync(output).size / 1e6
	console.log(`   ${path.relative(config.root, output)}: ${mediaDuration(output).toFixed(0)}s, ${mb.toFixed(1)} MB, ${preview ? '1280×720 preview' : '1920×1080'}`)
	return { output, timeline }
}
