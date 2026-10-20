// auth: sign a test user in without a person, for unattended runs (CI).
//
// Configured by "auth" in ui-walkthrough.config.json:
//
//   { "provider": "clerk", "email": "test@example.com" }
//     Clerk development instances only. Uses the Backend API (CLERK_SECRET_KEY)
//     to mint a one-time sign-in token for that existing user and opens the
//     app's sign-in page with it, plus a Clerk testing token so bot
//     protection lets the browser through. No password is involved.
//     "email" may instead be an env variable name: "emailEnv": "UI_WALK_TEST_EMAIL".
//
//   { "command": "node scripts/my-sign-in.mjs" }
//     Any other auth: your script signs in however your app allows and
//     writes a Playwright storageState JSON to $UI_WALK_SESSION. It gets the
//     app address in $UI_WALK_BASE_URL.

import path from 'node:path'
import { paths } from './config.mjs'
import { ensureChromium, loadPlaywright } from './deps.mjs'
import { saveSession, waitUntilSignedIn } from './signin.mjs'
import { envFromFiles, runLoud } from './util.mjs'

const CLERK_API = 'https://api.clerk.com/v1'

async function clerk(secret, method, route, body) {
	const res = await fetch(`${CLERK_API}${route}`, {
		method,
		headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' },
		body: body ? JSON.stringify(body) : undefined,
	})
	if (!res.ok) throw new Error(`Clerk ${method} ${route.split('?')[0]}: ${res.status} ${(await res.text()).slice(0, 200)}`)
	return res.json()
}

// pk_test_<base64 of "your-app.clerk.accounts.dev$">
function frontendApiHost(publishableKey) {
	const host = Buffer.from(publishableKey.replace(/^pk_(test|live)_/, ''), 'base64').toString('utf8').replace(/\$$/, '')
	if (!host.includes('.')) throw new Error('Could not read the Clerk frontend API host from the publishable key')
	return host
}

async function clerkSignIn(config, auth, out, baseUrl) {
	const secret = envFromFiles(config, auth.secretKeyEnv || 'CLERK_SECRET_KEY')
	const publishable = envFromFiles(config, auth.publishableKeyEnv || 'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY')
	const email = auth.email || envFromFiles(config, auth.emailEnv || 'UI_WALK_TEST_EMAIL')
	if (!secret || !publishable || !email) throw new Error('Clerk auth needs CLERK_SECRET_KEY, NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and the test user\'s email.')
	if (!secret.startsWith('sk_test_') || !publishable.startsWith('pk_test_')) {
		throw new Error('Clerk auth only runs against a development instance (sk_test_ / pk_test_ keys), never production.')
	}
	const [user] = await clerk(secret, 'GET', `/users?email_address=${encodeURIComponent(email)}&limit=1`)
	if (!user) throw new Error(`No Clerk user with the address ${email} on this instance. Create the test user first.`)
	const { token: ticket } = await clerk(secret, 'POST', '/sign_in_tokens', { user_id: user.id, expires_in_seconds: 300 })
	const { token: testing } = await clerk(secret, 'POST', '/testing_tokens')
	const fapi = frontendApiHost(publishable)

	const playwright = loadPlaywright(config)
	await ensureChromium(playwright)
	const browser = await playwright.pw.chromium.launch()
	try {
		const context = await browser.newContext()
		// What @clerk/testing does: tag every call to Clerk's frontend API with
		// the testing token so bot protection lets it through.
		await context.route(
			(url) => url.hostname === fapi,
			(route) => {
				const url = new URL(route.request().url())
				url.searchParams.set('__clerk_testing_token', testing)
				route.continue({ url: url.toString() })
			}
		)
		const page = await context.newPage()
		const target = new URL(config.signInPath, baseUrl)
		target.searchParams.set('__clerk_ticket', ticket)
		await page.goto(target.toString(), { timeout: 300_000 })
		await waitUntilSignedIn(page, context, config, baseUrl, 2)
		await saveSession(context, out)
	} finally {
		await browser.close()
	}
}

export async function autoSignIn(config, pr) {
	const auth = config.auth
	if (!auth) throw new Error('No "auth" in ui-walkthrough.config.json; unattended runs need one (see references/ci.md).')
	const out = paths(config, pr).session
	const baseUrl = `http://localhost:${config.ports.after}`
	if (auth.command) {
		runLoud('sh', ['-c', auth.command], { cwd: config.root, env: { ...process.env, UI_WALK_SESSION: out, UI_WALK_BASE_URL: baseUrl } })
	} else if (auth.provider === 'clerk') {
		await clerkSignIn(config, auth, out, baseUrl)
	} else {
		throw new Error(`Unknown auth provider "${auth.provider}"`)
	}
	console.log(`   Signed in; session saved to ${path.relative(config.root, out)}`)
}
