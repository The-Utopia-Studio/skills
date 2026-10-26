// record: one sharp MP4 per tour clip, filmed from the running app.
//
// - `setup` steps run off camera; `steps` are filmed, paced, with a cursor.
// - Frames come from Chrome's screencast at 2x device pixels (2560×1440 for a
//   1280×720 viewport). Each frame is held until the next repaint and the
//   sequence is encoded once at 30 fps. Playwright's own recordVideo is 1x,
//   low-bitrate VP8 and blurs text.
// - `teardown` puts back what a clip changed, off camera, even if it failed.
// - Unchanged clips are reused; clips that change data record one at a time,
//   after the others, so nothing else films their temporary state.
// - `dryRun` (check-tour) runs the same setup, steps and teardown fast and
//   without the camera, and on a failed step prints what the page offers.

import crypto from 'node:crypto'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { paths } from './config.mjs'
import { ensureChromium, loadPlaywright } from './deps.mjs'
import { printTargets, snapshot } from './inspect.mjs'
import { CURSOR_SCRIPT, stepRunner } from './steps.mjs'
import { mediaDuration, readJson, run, sleep, writeJson } from './util.mjs'

const SCALE = 2

function screencast(page, dir, size) {
	return page.context().newCDPSession(page).then(async (cdp) => {
		const frames = []
		let writes = Promise.resolve()
		cdp.on('Page.screencastFrame', ({ data, sessionId }) => {
			const file = path.join(dir, `${String(frames.length).padStart(6, '0')}.jpg`)
			frames.push({ file, at: Date.now() / 1000 })
			writes = writes.then(() => fs.promises.writeFile(file, Buffer.from(data, 'base64')))
			cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {})
		})
		await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 95, maxWidth: size.width, maxHeight: size.height, everyNthFrame: 1 })
		return async () => {
			await cdp.send('Page.stopScreencast').catch(() => {})
			await writes
			await cdp.detach().catch(() => {})
			return { frames, end: Date.now() / 1000 }
		}
	})
}

// Variable-rate frames → constant 30 fps H.264, each frame shown until the next.
function encode(frames, start, end, out, dir) {
	if (!frames.length) throw new Error('No frames were captured')
	const lines = []
	frames.forEach((frame, k) => {
		const from = k === 0 ? Math.min(start, frame.at) : frame.at
		const to = k + 1 < frames.length ? frames[k + 1].at : end
		lines.push(`file '${frame.file}'`, `duration ${Math.max(0.001, to - from).toFixed(4)}`)
	})
	lines.push(`file '${frames.at(-1).file}'`)
	const list = path.join(dir, 'frames.txt')
	fs.writeFileSync(list, lines.join('\n') + '\n')
	run('ffmpeg', [
		'-y', '-f', 'concat', '-safe', '0', '-i', list,
		'-vf', 'fps=30,scale=trunc(iw/2)*2:trunc(ih/2)*2,format=yuv420p',
		'-c:v', 'libx264', '-preset', 'slow', '-crf', '12', '-tune', 'stillimage', '-an', '-movflags', '+faststart', out,
	])
}

// Runs steps in order; a failure says which step it was.
async function runAll(runner, steps = [], baseUrl, part) {
	for (const [k, step] of steps.entries()) {
		try {
			await runner(step, baseUrl)
		} catch (error) {
			error.step = `${part} step ${k + 1} ${JSON.stringify(step)}`
			throw error
		}
	}
}

export async function record(config, pr, { only = [], force = false, parallel, dryRun = false } = {}) {
	const p = paths(config, pr)
	const tour = readJson(path.join(p.work, 'tour.json'), null)
	if (!tour?.clips?.length) throw new Error(`No clips in ${path.join(p.work, 'tour.json')}`)
	const viewport = tour.viewport || config.viewport
	const size = { width: viewport.width * SCALE, height: viewport.height * SCALE }
	const session = tour.storageState ? path.resolve(p.work, tour.storageState) : p.session
	const playwright = loadPlaywright(config)
	await ensureChromium(playwright)
	// Headless Chrome's screencast ignores the context's device scale; this flag
	// makes it send full-density frames.
	const browser = await playwright.pw.chromium.launch({ headless: tour.headless ?? true, args: [`--force-device-scale-factor=${SCALE}`] })

	const urlFor = (clip, which = 'baseUrl') =>
		clip[which] || (clip.side === 'before' ? tour.beforeUrl : null) || clip.baseUrl || tour.baseUrl
	const newContext = (withSession) =>
		browser.newContext({
			viewport,
			deviceScaleFactor: SCALE,
			storageState: withSession && fs.existsSync(session) ? session : undefined,
		})

	async function film(clip) {
		const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'uiw-frames-'))
		const context = await newContext(true)
		if (!dryRun) await context.addInitScript(CURSOR_SCRIPT)
		const page = await context.newPage()
		// A dev server compiles each route on first load, which can take minutes.
		page.setDefaultNavigationTimeout(300_000)
		try {
			const setup = stepRunner(page, { live: false, viewport })
			await runAll(setup, clip.setup, urlFor(clip, 'setupBaseUrl'), 'setup')
			await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {})
			if (dryRun) {
				await runAll(setup, clip.steps, urlFor(clip), 'filmed')
				return null
			}
			await sleep(clip.settle ?? 1.2)

			const stop = await screencast(page, dir, size)
			const start = Date.now() / 1000
			const live = stepRunner(page, { live: true, viewport, pause: tour.pause ?? 0.8 })
			await sleep(0.4)
			await runAll(live, clip.steps, urlFor(clip), 'filmed')
			await sleep(Math.max(clip.hold ?? 0.8, (clip.minDuration ?? 0) - (Date.now() / 1000 - start)))
			const { frames, end } = await stop()
			const out = path.join(p.work, `${clip.id}.mp4`)
			encode(frames, start, end, out, dir)
			return mediaDuration(out)
		} catch (error) {
			const base = path.join(p.work, `${clip.id}-error`)
			const where = error.step ? `${error.step}: ` : ''
			let rows = null
			try {
				rows = (await snapshot(page, base)).rows
			} catch {
				await page.screenshot({ path: `${base}.png` }).catch(() => {})
			}
			const failure = new Error(`${where}${error.message.split('\n')[0]} (screenshot: ${path.relative(config.root, `${base}.png`)})`)
			failure.page = { url: page.url(), rows, tree: `${base}.txt` }
			throw failure
		} finally {
			await context.close().catch(() => {})
			fs.rmSync(dir, { recursive: true, force: true })
		}
	}

	async function teardown(clip) {
		if (!clip.teardown?.length) return
		const context = await newContext(true)
		const page = await context.newPage()
		page.setDefaultNavigationTimeout(300_000)
		try {
			const steps = stepRunner(page, { live: false, viewport })
			await runAll(steps, clip.teardown, urlFor(clip, 'teardownBaseUrl'), 'teardown')
		} finally {
			await context.close()
		}
	}

	const cacheFile = path.join(p.work, '.clips-cache.json')
	const cache = readJson(cacheFile, {})
	const lengths = readJson(path.join(p.work, 'clips.json'), {})
	const keyOf = (clip) =>
		crypto.createHash('sha256').update(JSON.stringify({ clip, viewport, SCALE, base: tour.baseUrl, before: tour.beforeUrl, key: tour.cacheKey ?? null })).digest('hex').slice(0, 16)
	const changesData = (clip) => Boolean(clip.teardown?.length || clip.changes)

	const wanted = tour.clips.filter((c) => !only.length || only.includes(c.id))
	const todo = dryRun ? wanted : wanted.filter((clip) => {
		const fresh = cache[clip.id] === keyOf(clip) && fs.existsSync(path.join(p.work, `${clip.id}.mp4`))
		if (fresh && !force && !only.length) console.log(`   ${clip.id}: unchanged, reused`)
		return !fresh || force || only.length
	})

	let failed = 0
	async function one(clip) {
		try {
			const seconds = await film(clip)
			if (dryRun) return console.log(`   ${clip.id}: ok`)
			lengths[`${clip.id}.mp4`] = Math.round(seconds * 100) / 100
			cache[clip.id] = keyOf(clip)
			console.log(`   ${clip.id}: ${seconds.toFixed(1)}s`)
		} catch (error) {
			failed++
			delete cache[clip.id]
			console.error(`   ${clip.id}: FAILED, ${error.message}`)
			// What the page offers now, so the step can be fixed without a screenshot.
			if (dryRun && error.page?.rows) {
				console.error(`   on ${error.page.url}:`)
				printTargets(error.page.rows.map((r) => `     ${r}`), error.page.tree, config.root)
			}
		} finally {
			try {
				await teardown(clip)
			} catch (error) {
				failed++
				console.error(`   ${clip.id}: TEARDOWN FAILED, ${error.step ? `${error.step}: ` : ''}${error.message.split('\n')[0]}. Put its changes back by hand.`)
			}
		}
	}

	// One at a time by default: on an 8 GB laptop with two dev servers up,
	// three at once made each clip run up to 2.5x slower on camera and saved
	// no time overall. More can help on a bigger machine.
	const width = Math.max(1, parallel || tour.parallel || 1)
	const shared = todo.filter((c) => !changesData(c))
	await Promise.all(Array.from({ length: Math.min(width, shared.length) }, async () => { while (shared.length) await one(shared.shift()) }))
	for (const clip of todo.filter(changesData)) await one(clip)
	await browser.close()

	if (dryRun) {
		if (failed) throw new Error(`${failed} clip(s) failed. Fix their steps and run check-tour again with those clip ids.`)
		return
	}
	writeJson(path.join(p.work, 'clips.json'), lengths)
	writeJson(cacheFile, cache)
	if (failed) throw new Error(`${failed} clip(s) failed. Fix their steps and run record again with those clip ids.`)
}
