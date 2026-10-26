// sign-in: open a real browser window on the app's sign-in page, let the
// person sign in themselves, and save the session for recording.
//
// The tool never sees or types a password. The saved file holds live session
// cookies, so it is written with mode 600 under .ui-walkthrough/auth/.
// For unattended runs (CI), see auth.mjs.

import fs from 'node:fs'
import path from 'node:path'
import { paths } from './config.mjs'
import { loadPlaywright, ensureChromium } from './deps.mjs'
import { sleep } from './util.mjs'

// Done when the browser is back on the app, away from any sign-in page, for
// 3 seconds in a row (and holds the configured cookie, if any).
export async function waitUntilSignedIn(page, context, config, baseUrl, minutes = 10) {
	const origin = new URL(baseUrl).origin
	const signInPath = config.signInPath.replace(/\/$/, '')
	let settled = 0
	const deadline = Date.now() + minutes * 60_000
	while (Date.now() < deadline) {
		const current = new URL(page.url())
		const onApp = current.origin === origin && !current.pathname.startsWith(signInPath) && !/sign-?up|login|auth/i.test(current.pathname)
		const cookieOk = !config.signedInCookie || (await context.cookies(origin)).some((c) => c.name === config.signedInCookie)
		settled = onApp && cookieOk ? settled + 1 : 0
		if (settled >= 3) return
		await sleep(1)
	}
	throw new Error(`Not signed in after ${minutes} minute(s); the page is ${page.url()}`)
}

export async function saveSession(context, out) {
	fs.mkdirSync(path.dirname(out), { recursive: true })
	await context.storageState({ path: out })
	fs.chmodSync(out, 0o600)
}

export async function signIn(config, pr, { file } = {}) {
	const out = path.resolve(file || paths(config, pr).session)
	const baseUrl = `http://localhost:${config.ports.after}`
	const playwright = loadPlaywright(config)
	await ensureChromium(playwright)
	const browser = await playwright.pw.chromium.launch({ headless: false })
	try {
		const context = await browser.newContext({ viewport: { width: 1280, height: 860 } })
		const page = await context.newPage()
		await page.goto(new URL(config.signInPath, baseUrl).toString(), { timeout: 300_000 })
		console.log('   Sign in in the browser window that opened. Waiting up to 10 minutes...')
		await waitUntilSignedIn(page, context, config, baseUrl)
		await saveSession(context, out)
		console.log(`   Saved the session to ${path.relative(config.root, out)}`)
	} finally {
		await browser.close()
	}
}
