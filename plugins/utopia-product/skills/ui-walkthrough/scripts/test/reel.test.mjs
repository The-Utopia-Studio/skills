// Run: node --test skills/ui-walkthrough/scripts/test/
import assert from 'node:assert/strict'
import test from 'node:test'
import { chapters } from '../lib/render.mjs'
import { cutsFromBrightness, dateRange, estimate, planReel } from '../lib/reel.mjs'

// 30 fps brightness: content at 220, a fade to blank paper (234) at each cut.
const samples = (seconds, cuts, { content = 220 } = {}) =>
	Array.from({ length: Math.round(seconds * 30) }, (_, k) => {
		const t = k / 30
		const near = Math.min(...cuts.map((c) => Math.abs(t - c)))
		return { t, y: near < 0.35 ? 234 - (near / 0.35) * (234 - content) : content }
	})

test('cuts are found where the picture fades to blank', () => {
	const cuts = cutsFromBrightness(samples(60, [10.5, 25, 41.2]))
	assert.deepEqual(cuts.map((c) => Math.round(c * 10) / 10), [10.5, 25, 41.2])
})

test('a slide that is plain white all along is not a cut', () => {
	const flat = Array.from({ length: 300 }, (_, k) => ({ t: k / 30, y: 233 }))
	assert.deepEqual(cutsFromBrightness(flat), [])
})

test('nothing is cut at the very start or end', () => {
	assert.deepEqual(cutsFromBrightness(samples(20, [0.1, 19.9])), [])
})

test('date ranges read naturally', () => {
	assert.equal(dateRange(['2026-10-08T10:00:00Z']), '8 October 2026')
	assert.equal(dateRange(['2026-10-08T10:00:00Z', '2026-10-06T10:00:00Z']), '6–8 October 2026')
	assert.equal(dateRange(['2026-09-30T10:00:00Z', '2026-10-02T10:00:00Z']), '30 September – 2 October 2026')
})

const sources = [
	{
		number: 7,
		title: 'Settings by team',
		mergedAt: '2026-10-08T10:00:00Z',
		file: 'a.mp4',
		slides: [
			{ id: 0, start: 0, seconds: 6, kind: 'intro' },
			{ id: 1, start: 6, seconds: 20, kind: 'slide' },
			{ id: 2, start: 26, seconds: 3, kind: 'outro' },
		],
	},
	{ number: 9, title: 'Faster search', mergedAt: '2026-10-08T12:00:00Z', file: 'b.mp4', slides: [{ id: 0, start: 0, seconds: 5, kind: 'intro' }, { id: 1, start: 5, seconds: 30, kind: 'slide' }] },
]

test('a reel plan keeps the order and names a PR whose title slide was left out', () => {
	const { items } = planReel(sources, { intro: 'Hello.', parts: [{ pr: 9, slides: [1] }, { pr: 7, slides: [0, 1] }] })
	assert.deepEqual(
		items.map((i) => (i.card ? `card:${i.slide.type}${i.pr ? `#${i.pr}` : ''}` : `#${i.pr}/${i.id}`)),
		['card:intro', 'card:intro#9', '#9/1', '#7/0', '#7/1', 'card:outro']
	)
})

test('a reel plan reports every mistake at once', () => {
	assert.throws(
		() => planReel(sources, { parts: [{ pr: 7, slides: [5] }, { pr: 8, slides: [0] }] }),
		(error) => /intro/.test(error.message) && /no slide 5/.test(error.message) && /#8 is not in sources/.test(error.message)
	)
})

test('the estimate counts chosen slides and cards', () => {
	const seconds = estimate(sources, { intro: 'One two three four five.', parts: [{ pr: 7, slides: [0, 1] }], outro: false })
	assert.ok(seconds > 26 && seconds < 30, String(seconds))
})

test('chapters escape what ffmetadata treats as special', () => {
	const text = chapters([{ start: 0, seconds: 2.5, slide: { type: 'compare', title: 'A=B; #1' } }])
	assert.match(text, /START=0\nEND=2500\ntitle=compare\|A\\=B\\; \\#1/)
})
