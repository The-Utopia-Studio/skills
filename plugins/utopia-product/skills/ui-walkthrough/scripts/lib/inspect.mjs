// inspect: what a page offers to click, from the before or after server,
// signed in. This is how the planning step checks tour targets without
// running scripts of its own.
//
// It prints a short list of targets (headings, controls, links, and the
// landmarks and dialogs they sit in) and saves the full accessibility tree
// and a screenshot of the first screen under inspect/. The short list keeps
// planning cheap; grep the tree file for anything else (text, rows, cells).

import fs from 'node:fs'
import path from 'node:path'
import { paths } from './config.mjs'
import { ensureChromium, loadPlaywright } from './deps.mjs'

const FULL_LIMIT = 15_000
const ROW_LIMIT = 150

const CONTROLS = new Set([
	'button', 'link', 'textbox', 'searchbox', 'checkbox', 'radio', 'switch', 'combobox', 'listbox', 'slider', 'spinbutton',
	'tab', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'treeitem', 'heading',
])
const CONTAINERS = new Set([
	'banner', 'navigation', 'main', 'complementary', 'contentinfo', 'region', 'form', 'search', 'dialog', 'alertdialog',
	'menu', 'menubar', 'tablist', 'table', 'grid', 'alert', 'status',
])

// One line of Playwright's aria snapshot: `- role "name" [attrs]` or `- role /regex/`.
function parseLine(line) {
	const m = line.match(/^(\s*)- ([a-z]+)(?: ("(?:[^"\\]|\\.)*"|\/(?:[^/\\]|\\.)*\/[a-z]*))?((?: \[[^\]]*\])*):?(?: (.*))?$/)
	if (!m) return null
	let name = m[3]
	if (name?.startsWith('"')) {
		try {
			name = JSON.parse(name)
		} catch {
			name = name.slice(1, -1)
		}
	}
	return { indent: m[1].length, role: m[2], name, attrs: (m[4] || '').trim() }
}

const show = (s) => (s === undefined ? '' : s.startsWith('/') ? ` ${s}` : ` ${JSON.stringify(s)}`)

// The aria snapshot cut down to what a tour targets, with a note where a
// target as written would match more than one element.
export function targetsOf(tree) {
	const lines = tree.split('\n')
	const items = []
	const stack = []
	lines.forEach((line, k) => {
		const node = parseLine(line)
		if (!node) return
		while (stack.length && stack.at(-1) >= node.indent) stack.pop()
		const depth = stack.length
		if (CONTAINERS.has(node.role)) {
			stack.push(node.indent)
			items.push({ kind: 'container', depth, ...node })
		} else if (CONTROLS.has(node.role)) {
			// A link's address is on the next line, one level in.
			const next = lines[k + 1]?.match(/^\s*- \/url: (.*)$/)
			items.push({ kind: 'control', depth, ...node, url: next?.[1] })
		}
	})

	// Drop unnamed containers with nothing kept inside them.
	const kept = items.filter((item, k) => {
		if (item.kind === 'control' || item.name) return true
		const inside = items.slice(k + 1)
		const end = inside.findIndex((i) => i.depth <= item.depth)
		return (end < 0 ? inside : inside.slice(0, end)).some((i) => i.kind === 'control')
	})

	const named = kept.filter((i) => i.kind === 'control' && i.name !== undefined)
	const total = (i) => named.filter((c) => c.role === i.role && c.name === i.name).length
	// Playwright matches names by substring unless exact is set.
	const wider = (i) =>
		i.name && named.some((c) => c.role === i.role && c.name !== i.name && c.name.toLowerCase().includes(i.name.toLowerCase()))

	const seen = new Map()
	const unnamed = new Map()
	const rows = []
	for (const item of kept) {
		const pad = '  '.repeat(item.depth)
		if (item.kind === 'container') {
			rows.push(`${pad}${item.role}${show(item.name)}:`)
			continue
		}
		if (item.name === undefined) {
			unnamed.set(item.role, (unnamed.get(item.role) || 0) + 1)
			continue
		}
		const key = `${item.role}\u0000${item.name}`
		const nth = seen.get(key) || 0
		seen.set(key, nth + 1)
		const notes = []
		if (item.attrs) notes.push(item.attrs)
		if (total(item) > 1) notes.push(`nth ${nth} of ${total(item)}`)
		if (nth === 0 && wider(item)) notes.push('needs exact: true')
		if (item.url) notes.push(`→ ${item.url}`)
		rows.push(`${pad}${item.role}${show(item.name)}${notes.length ? `  ${notes.join('  ')}` : ''}`)
	}
	for (const [role, n] of unnamed) rows.push(`(${n} ${role}${n > 1 ? 's' : ''} without a name: target by label, text, testId or selector)`)
	return rows
}

export function printTargets(rows, treeFile, root) {
	console.log((rows.length > ROW_LIMIT ? rows.slice(0, ROW_LIMIT) : rows).join('\n'))
	if (rows.length > ROW_LIMIT) console.log(`… ${rows.length - ROW_LIMIT} more; grep ${path.relative(root, treeFile)}`)
}

// Saves the tree and a screenshot of the page as it is now; returns the targets.
export async function snapshot(page, base, { fullPage = false } = {}) {
	await page.screenshot({ path: `${base}.png`, fullPage }).catch(() => {})
	const tree = await page.locator('body').ariaSnapshot({ timeout: 10_000 })
	fs.writeFileSync(`${base}.txt`, tree + '\n')
	return { tree, rows: targetsOf(tree) }
}

export async function inspect(config, pr, target = '/', { side = 'after', full = false } = {}) {
	if (!['before', 'after'].includes(side)) throw new Error('--side is "before" or "after"')
	const p = paths(config, pr)
	const origins = Object.fromEntries(['before', 'after'].map((s) => [s, `http://localhost:${config.ports[s]}`]))
	const url = new URL(target, origins[side])
	if (!Object.values(origins).includes(url.origin)) throw new Error(`Only pages on ${Object.values(origins).join(' or ')} can be inspected.`)

	const playwright = loadPlaywright(config)
	await ensureChromium(playwright)
	const browser = await playwright.pw.chromium.launch()
	try {
		const context = await browser.newContext({
			viewport: config.viewport,
			storageState: fs.existsSync(p.session) ? p.session : undefined,
		})
		const page = await context.newPage()
		await page.goto(url.toString(), { waitUntil: 'domcontentloaded', timeout: 300_000 })
		await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {})
		const dir = path.join(p.work, 'inspect')
		fs.mkdirSync(dir, { recursive: true })
		const base = path.join(dir, `${side}-${url.pathname.replace(/[^\w-]+/g, '_').replace(/^_|_$/g, '') || 'home'}`)
		// The first screen is what a clip opens on; --full shows the whole page.
		const { tree, rows } = await snapshot(page, base, { fullPage: full })
		console.log(`   ${page.url()}  (${await page.title()})`)
		console.log(`   screenshot: ${path.relative(config.root, `${base}.png`)}${full ? ' (whole page)' : ' (first screen)'}`)
		console.log(`   full tree:  ${path.relative(config.root, `${base}.txt`)}\n`)
		if (full) console.log(tree.length > FULL_LIMIT ? `${tree.slice(0, FULL_LIMIT)}\n… (${tree.length - FULL_LIMIT} more characters)` : tree)
		else printTargets(rows, `${base}.txt`, config.root)
	} finally {
		await browser.close()
	}
}
