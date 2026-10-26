// Run: node --test skills/ui-walkthrough/scripts/test/
import assert from 'node:assert/strict'
import test from 'node:test'
import { captionLines, html } from '../lib/compose.mjs'
import { DEFAULTS } from '../lib/config.mjs'
import { matcher } from '../lib/steps.mjs'

const words = (text, gap = 0.1) => {
	let t = 0
	return text.split(' ').map((w) => {
		const word = { text: w, start: t, end: t + 0.3 }
		t += 0.3 + gap
		return word
	})
}

test('captions break at sentence ends', () => {
	const lines = captionLines(words('Home changed too. The resources now sit in a row.'), 0)
	assert.deepEqual(lines.map((l) => l.text), ['Home changed too.', 'The resources now sit in a row.'])
})

test('captions break before about 42 characters', () => {
	const lines = captionLines(words('one two three four five six seven eight nine ten eleven twelve thirteen'), 0)
	for (const line of lines) assert.ok(line.text.length <= 42, line.text)
	assert.ok(lines.length >= 2)
})

test('captions break on a long pause and never overlap', () => {
	const lines = captionLines(words('first part second part', 0.8), 10)
	assert.ok(lines.length >= 2)
	assert.equal(lines[0].start, 10)
	for (let k = 0; k + 1 < lines.length; k++) assert.ok(lines[k].start + lines[k].seconds <= lines[k + 1].start)
})

test('caption fixes replace misheard words', () => {
	const [line] = captionLines(words('Welcome to Utopia OS'), 0, { 'Utopia OS': 'UtopiaOS' })
	assert.equal(line.text, 'Welcome to UtopiaOS')
})

test('html escapes text and includes every slide', () => {
	const timeline = [
		{ slide: { type: 'intro', title: '<b>Bold</b> & co' }, index: 0, start: 0, seconds: 4, voice: 0, videos: [], frames: [] },
		{ slide: { type: 'list', title: 'Also', items: ['One', 'Two'] }, index: 1, start: 4, seconds: 5, voice: 0, videos: [], frames: [] },
		{ slide: { type: 'outro' }, index: 2, start: 9, seconds: 3, voice: 0, videos: [], frames: [] },
	]
	const page = html(timeline, { pr: 7, brand: 'Acme', repoLabel: 'acme / web' })
	assert.match(page, /&lt;b&gt;Bold&lt;\/b&gt; &amp; co/)
	assert.match(page, /data-duration="12.000"/)
	assert.equal((page.match(/class="clip scene/g) || []).length, 3)
})

test('unknown slide types are rejected', () => {
	const timeline = [{ slide: { type: 'diff' }, index: 0, start: 0, seconds: 1, voice: 0, videos: [], frames: [] }]
	assert.throws(() => html(timeline, { pr: 1, brand: 'x', repoLabel: 'x' }), /unknown type "diff"/)
})

test('"/…/flags" targets are regular expressions', () => {
	assert.ok(matcher('/^save/i') instanceof RegExp)
	assert.equal(matcher('Save'), 'Save')
})

test('defaults keep recordings at 1280×720', () => {
	assert.deepEqual(DEFAULTS.viewport, { width: 1280, height: 720 })
})

test('a sentence ending never sits alone on a line', () => {
	const lines = captionLines(words("Here's what pull request 122 changed in UtopiaOS."), 0)
	assert.equal(lines.length, 1)
})

test('common mishearings are fixed', () => {
	const [line] = captionLines(words('Poll Request 7'), 0)
	assert.equal(line.text, 'Pull request 7')
})

test('a name whisper splits in two still stays with its sentence', () => {
	const lines = captionLines(words("Here's what Poll Request 122 changed in Utopia OS."), 0, { 'Utopia OS': 'UtopiaOS' })
	assert.deepEqual(lines.map((l) => l.text), ["Here's what Pull request 122 changed in UtopiaOS."])
})

test('Clerk auth refuses production keys and needs a test user', async () => {
	const { autoSignIn } = await import('../lib/auth.mjs')
	const base = { root: process.cwd(), app: '.', ports: { after: 3402 }, signInPath: '/sign-in' }
	process.env.CLERK_SECRET_KEY = 'sk_live_x'
	process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 'pk_live_eA=='
	process.env.UI_WALK_TEST_EMAIL = 'test@example.com'
	await assert.rejects(autoSignIn({ ...base, auth: { provider: 'clerk' } }, 1), /development instance/)
	delete process.env.UI_WALK_TEST_EMAIL
	process.env.CLERK_SECRET_KEY = 'sk_test_x'
	await assert.rejects(autoSignIn({ ...base, auth: { provider: 'clerk' } }, 1), /needs CLERK_SECRET_KEY/)
	await assert.rejects(autoSignIn({ ...base }, 1), /No "auth"/)
})
