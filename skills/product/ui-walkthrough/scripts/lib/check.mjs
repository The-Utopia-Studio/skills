// check: what to look at before handing the video over — a contact sheet of
// 8 frames, the caption words that differ from the script (misheard names to
// fix with captionFixes), and recordings that had to play at the fastest
// speed allowed. Every caption line is still written to captions.txt.

import fs from 'node:fs'
import path from 'node:path'
import { paths } from './config.mjs'
import { hasAudioStream, mediaDuration, readJson, run } from './util.mjs'

const NUMBER_WORDS = new Set(
	('zero oh one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen ' +
		'eighteen nineteen twenty thirty forty fifty sixty seventy eighty ninety hundred thousand million point and percent')
		.split(' ')
)

// Words with their spelling kept for display, and a plain form to compare.
function words(text) {
	return String(text || '')
		.split(/[\s\-–—/]+/)
		.map((shown) => ({ shown: shown.replace(/^[^\w]+|[^\w%]+$/g, ''), plain: shown.toLowerCase().replace(/[^a-z0-9%]/g, '') }))
		.filter((w) => w.plain)
}

// Numbers said in words and written as digits ("one twenty two" / "122") are the same thing.
const sameNumber = (said, heard) =>
	said.length > 0 && heard.length > 0 && said.every((w) => NUMBER_WORDS.has(w.plain)) && heard.every((w) => /^[\d.,%]+$/.test(w.plain))

// Where the captions differ from the script: [{ said, heard }], in order.
export function captionDiffs(script, captions) {
	const a = words(script)
	const b = words(captions)
	// Longest common subsequence of the plain words.
	const L = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0))
	for (let i = a.length - 1; i >= 0; i--) {
		for (let j = b.length - 1; j >= 0; j--) L[i][j] = a[i].plain === b[j].plain ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1])
	}
	const diffs = []
	let said = []
	let heard = []
	const flush = () => {
		if ((said.length || heard.length) && !sameNumber(said, heard)) {
			diffs.push({ said: said.map((w) => w.shown).join(' '), heard: heard.map((w) => w.shown).join(' ') })
		}
		said = []
		heard = []
	}
	let i = 0
	let j = 0
	while (i < a.length || j < b.length) {
		if (i < a.length && j < b.length && a[i].plain === b[j].plain) {
			flush()
			i++
			j++
		} else if (j < b.length && (i === a.length || L[i][j + 1] >= L[i + 1][j])) heard.push(b[j++])
		else said.push(a[i++])
	}
	flush()
	return diffs
}

// 8 frames spread over the video, 4 by 2, as dir/sheet.png.
export function contactSheet(file, dir) {
	const seconds = mediaDuration(file)
	const frames = Array.from({ length: 8 }, (_, k) => {
		const f = path.join(dir, `frame-${k}.png`)
		run('ffmpeg', ['-y', '-v', 'error', '-ss', ((seconds * (k + 0.5)) / 8).toFixed(2), '-i', file, '-frames:v', '1', '-vf', 'scale=640:-1', f])
		return f
	})
	const sheet = path.join(dir, 'sheet.png')
	run('ffmpeg', ['-y', '-v', 'error', ...frames.flatMap((f) => ['-i', f]), '-filter_complex', '[0][1][2][3]hstack=4[a];[4][5][6][7]hstack=4[b];[a][b]vstack', sheet])
	return sheet
}

export function check(config, pr, video) {
	const p = paths(config, pr)
	const file = video || path.join(p.out, `pr-${pr}-walkthrough.mp4`)
	if (!fs.existsSync(file)) throw new Error(`No video at ${file}; run make first.`)
	const dir = path.join(p.work, 'check')
	fs.rmSync(dir, { recursive: true, force: true })
	fs.mkdirSync(dir, { recursive: true })
	const seconds = mediaDuration(file)
	const sheet = contactSheet(file, dir)
	const page = path.join(p.work, 'render', 'index.html')
	const lines = fs.existsSync(page)
		? [...fs.readFileSync(page, 'utf8').matchAll(/class="clip caption"[^>]*>([^<]*)</g)].map((m) => m[1].replace(/&amp;/g, '&'))
		: []
	const captionsFile = path.relative(config.root, path.join(dir, 'captions.txt'))
	fs.writeFileSync(path.join(dir, 'captions.txt'), lines.join('\n') + '\n')
	console.log(`   ${seconds.toFixed(0)}s, ${hasAudioStream(file) ? 'with sound' : 'NO SOUND'}`)
	console.log(`   frames:   ${path.relative(config.root, sheet)}`)

	const report = readJson(path.join(p.work, 'render', 'report.json'), null)
	if (!report) return console.log(`   captions: ${captionsFile} (${lines.length} lines)`)
	const differ = report.heard.flatMap((h) => (h.script ? captionDiffs(h.script, h.captions).map((d) => ({ slide: h.slide, ...d })) : []))
	const unscripted = report.heard.filter((h) => !h.script).length
	const note = unscripted ? `; ${unscripted} slide(s) had no script line to compare, see ${captionsFile}` : ''
	if (!differ.length) console.log(`   captions: all ${lines.length} lines match the script${note}`)
	else {
		console.log(`   captions that differ from the script (all ${lines.length} lines: ${captionsFile}${note}):`)
		for (const d of differ) console.log(`     slide ${d.slide}: script "${d.said}", captions "${d.heard}"`)
		console.log('   Fix misheard words with "captionFixes" in manifest.json and run make again: voice and recordings are reused.')
	}
	for (const f of report.tooFast) {
		console.log(`   too fast: ${f.name} (slide ${f.slide}) plays at ${f.speed.toFixed(1)}x, the fastest allowed, and still runs ${f.over.toFixed(1)}s past its narration. Cut pauses or steps in its tour, or split it.`)
	}
}
