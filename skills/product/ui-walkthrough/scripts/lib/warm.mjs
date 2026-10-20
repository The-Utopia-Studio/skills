// warm: open every page the tour will visit once, so dev servers compile
// routes now instead of on camera.

import fs from 'node:fs'
import path from 'node:path'
import { paths } from './config.mjs'
import { ensureChromium, loadPlaywright } from './deps.mjs'
import { readJson, webUrl } from './util.mjs'

export async function warm(config, pr) {
	const p = paths(config, pr)
	const tour = readJson(path.join(p.work, 'tour.json'), { clips: [] })
	const urls = new Set()
	for (const clip of tour.clips) {
		const base = clip.baseUrl || (clip.side === 'before' ? tour.beforeUrl : null) || tour.baseUrl
		const lists = [
			[clip.setup, clip.setupBaseUrl || base],
			[clip.steps, base],
			[clip.teardown, clip.teardownBaseUrl || base],
		]
		for (const [steps, from] of lists) for (const s of steps || []) if (s.goto) urls.add(webUrl(new URL(s.goto, from)))
	}
	if (!urls.size) return
	const session = tour.storageState ? path.resolve(p.work, tour.storageState) : p.session
	const playwright = loadPlaywright(config)
	await ensureChromium(playwright)
	const browser = await playwright.pw.chromium.launch()
	const context = await browser.newContext({ storageState: fs.existsSync(session) ? session : undefined })
	const queue = [...urls]
	await Promise.all(
		Array.from({ length: Math.min(3, queue.length) }, async () => {
			const page = await context.newPage()
			while (queue.length) {
				const url = queue.shift()
				const started = Date.now()
				try {
					await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 300_000 })
					console.log(`   ${((Date.now() - started) / 1000).toFixed(1).padStart(5)}s  ${url}`)
				} catch (error) {
					console.log(`   failed  ${url}: ${error.message.split('\n')[0]}`)
				}
			}
		})
	)
	await browser.close()
}
