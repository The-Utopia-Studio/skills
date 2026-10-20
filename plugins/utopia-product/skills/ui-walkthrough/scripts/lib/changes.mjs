// changes: a first look at what a PR changed on screen, without opening
// every file. For each UI file: the pages it likely shows up on, the
// user-facing text it added or removed, and how many other lines changed
// (layout, styling or logic, which still need the file read).

import path from 'node:path'
import { paths } from './config.mjs'
import { readJson, run } from './util.mjs'

const STYLE_FILE = /\.(css|scss|less)$/
const ROUTE_FILE = /(^|\/)(src\/)?(app|pages|routes)\//
const MAX_DEPTH = 6

// Props and keys that usually hold words a user reads.
const TEXT_KEYS =
	'aria-label|title|placeholder|alt|label|heading|subheading|description|helperText|hint|tooltip|message|text|cta|caption|subtitle|kicker|eyebrow|empty\\w*'
const KEYED = new RegExp(`(?:^|[\\s{,(])(?:${TEXT_KEYS})\\s*[:=]\\s*\\{?\\s*(["'\`])((?:(?!\\1)[^\\\\]|\\\\.)+?)\\1`, 'g')
const JSX_TEXT = />([^<>{}]*[A-Za-z][^<>{}]*)</g
const LITERAL = /(["'`])((?:(?!\1)[^\\]|\\.)+?)\1/g
const CODE_LINE = /^\s*(import|export|const|let|var|return|if|else|for|while|switch|case|function|type|interface|await|throw|\/\/|\*|\/\*)\b/

// Utility-class lists, paths, identifiers and the like are not words on screen.
function looksLikeWords(s) {
	const t = s.trim()
	if (t.length < 2 || !/[A-Za-z]/.test(t)) return false
	if (/^(\.{0,2}\/|@|#|https?:|mailto:|data:)/.test(t)) return false
	const tokens = t.split(/\s+/)
	if (tokens.every((w) => /^[a-z0-9:_\-[\]/.%#!()&>*=]+$/.test(w)) && tokens.some((w) => /[-:[]/.test(w))) return false
	if (tokens.length === 1 && !/^[A-Z][a-z]/.test(t) && !/[.!?]$/.test(t)) return false
	if (/^[\w.]+\(.*\)$/.test(t) || /[;{}]$/.test(t)) return false
	if (/&&|\|\||[!=]==?|=>|\?\.|\binstanceof\b|\btypeof\b|^\W*[:?]\s/.test(t)) return false
	return true
}

// The words a person would read in one changed line.
export function visibleText(line) {
	const found = new Set()
	const add = (s) => {
		const t = s.replace(/\$\{[^}]*\}/g, '…').replace(/\s+/g, ' ').trim()
		if (looksLikeWords(t)) found.add(t)
	}
	for (const m of line.matchAll(KEYED)) add(m[2])
	for (const m of line.matchAll(JSX_TEXT)) add(m[1])
	const bare = line.trim()
	// A line of plain text inside JSX: no code punctuation at all.
	if (!CODE_LINE.test(line) && /^[A-Za-z0-9"'“‘(][^<>{}=;]*$/.test(bare) && /\s/.test(bare) && !/^\w+\(|^[\w-]+\s*:|,$/.test(bare)) add(bare)
	if (!CODE_LINE.test(line) || /\breturn\b|\bconst\b/.test(line)) {
		for (const m of line.matchAll(LITERAL)) if (/\s/.test(m[2]) && /^[A-Z0-9“"'(]/.test(m[2].trim())) add(m[2])
	}
	return [...found]
}

// app/(admin)/people/[id]/page.tsx → /people/[id]; null when not a route file.
export function routeOf(file, app = '.') {
	const rel = app === '.' ? file : path.relative(app, file)
	if (rel.startsWith('..')) return null
	let m = rel.match(/^(?:src\/)?app\/(.*?)\/?(page|layout)\.[jt]sx?$|^(?:src\/)?app\/(page|layout)\.[jt]sx?$/)
	if (m) {
		const segments = (m[1] || '').split('/').filter((s) => s && !/^\(.*\)$/.test(s) && !s.startsWith('@'))
		const route = '/' + segments.join('/')
		return (m[2] || m[3]) === 'layout' ? `${route === '/' ? '' : route}/* (layout)` : route
	}
	m = rel.match(/^(?:src\/)?pages\/(.*)\.(?:[jt]sx?|mdx|vue|astro)$/)
	if (m && !/^(_app|_document|_error|api\/)/.test(m[1])) return '/' + m[1].replace(/(^|\/)index$/, '').replace(/^\/$/, '')
	m = rel.match(/^(?:src\/)?routes\/(.*?)\/?\+(page|layout)\.svelte$/)
	if (m) return '/' + m[1].split('/').filter((s) => s && !/^\(.*\)$/.test(s)).join('/')
	return null
}

const SOURCE = ['ts', 'tsx', 'js', 'jsx', 'mjs', 'vue', 'svelte', 'astro', 'mdx']

// The last part of an import path or a file, as imports name it:
// "@/components/ui/button" and "components/ui/button.tsx" → "button".
const moduleName = (spec) => {
	const parsed = path.parse(spec.replace(/\.(m?[jt]sx?|vue|svelte|astro|mdx)$/, ''))
	return parsed.name === 'index' ? path.basename(parsed.dir) : parsed.name
}

// Every import in the app at `sha`, read once: module name → importing files.
// Matching by name, not resolved path, so a file can pick up an importer of
// another file with the same name; the routes are a likely list.
function importIndex(config, sha) {
	const prefix = config.app === '.' ? '' : `${config.app}/`
	let out = ''
	try {
		out = run('git', [
			'-C', config.root, 'grep', '-I', '-o', '-E', `(from|import\\(|require\\() *['"][^'"]+['"]`, sha, '--',
			...SOURCE.map((ext) => `${prefix}*.${ext}`),
		])
	} catch {
		return new Map()
	}
	const index = new Map()
	for (const line of out.split('\n')) {
		const m = line.slice(sha.length + 1).match(/^(.*?):(?:from|import\(|require\() *['"]([^'"]+)['"]$/)
		if (!m || /\.(test|spec|stories)\./.test(m[1]) || !/^[.@~/]|^[a-z]+\//.test(m[2])) continue
		const name = moduleName(m[2])
		if (!index.has(name)) index.set(name, new Set())
		index.get(name).add(m[1])
	}
	return index
}

// Routes a file shows up on, following importers a few levels up.
function routesFor(config, index, file) {
	const own = routeOf(file, config.app)
	if (own) return [own]
	const routes = new Set()
	let level = [file]
	const visited = new Set(level)
	for (let depth = 0; depth < MAX_DEPTH && level.length; depth++) {
		const next = []
		for (const f of level) {
			for (const importer of index.get(moduleName(f)) || []) {
				if (visited.has(importer)) continue
				visited.add(importer)
				const route = routeOf(importer, config.app)
				if (route) routes.add(route)
				else next.push(importer)
			}
		}
		level = next
	}
	// A layout covers every page under it.
	const layouts = [...routes].filter((r) => r.endsWith('/* (layout)')).map((r) => r.slice(0, -'/* (layout)'.length))
	const covered = (r) => layouts.some((l) => !r.startsWith(`${l}/* (layout)`) && (r === (l || '/') || r.startsWith(`${l}/`)))
	return [...routes].filter((r) => !covered(r)).sort()
}

export function changes(config, pr) {
	const p = paths(config, pr)
	const info = readJson(path.join(p.work, 'pr.json'), null)
	if (!info) throw new Error(`Run prepare ${pr} first.`)
	console.log(`PR #${pr}: ${info.title}`)
	console.log('"other lines" changed layout, styling or logic: read that file only if it could change the screen.\n')
	if (!info.uiFiles.length) console.log('No UI files changed.')
	const indexes = {}
	const indexAt = (sha) => (indexes[sha] ||= importIndex(config, sha))

	for (const file of info.uiFiles) {
		const diff = run('git', ['-C', config.root, 'diff', '-U0', '--no-color', info.before, info.after, '--', file])
		const removed = []
		const added = []
		for (const line of diff.split('\n')) {
			if (/^(\+\+\+|---) /.test(line)) continue
			if (line.startsWith('-')) removed.push(line.slice(1))
			else if (line.startsWith('+')) added.push(line.slice(1))
		}
		if (!removed.length && !added.length) continue
		const status = !removed.length && added.length ? 'new' : removed.length && !added.length ? 'deleted' : 'changed'
		console.log(`${file}  (${status}, +${added.length} -${removed.length})`)
		const routes = routesFor(config, indexAt(status === 'deleted' ? info.before : info.after), file)
		const many = routes.length > 8 ? ` and ${routes.length - 8} more` : ''
		console.log(`  on: ${routes.length ? routes.slice(0, 8).join(', ') + many : 'no page found (shared component, or not used yet)'}`)
		if (STYLE_FILE.test(file)) {
			console.log('  styling only: compare the pages to see it\n')
			continue
		}
		const before = removed.map(visibleText)
		const after = added.map(visibleText)
		const was = new Set(before.flat())
		const now = new Set(after.flat())
		for (const t of was) if (!now.has(t)) console.log(`  - ${JSON.stringify(t)}`)
		for (const t of now) if (!was.has(t)) console.log(`  + ${JSON.stringify(t)}`)
		const other = before.filter((t) => !t.length).length + after.filter((t) => !t.length).length
		if (other) console.log(`  ${other} other line${other > 1 ? 's' : ''}`)
		console.log('')
	}
	const rest = (info.allFiles || info.uiFiles).length - info.uiFiles.length
	if (rest) console.log(`Also ${rest} non-UI file${rest > 1 ? 's' : ''} changed (see allFiles in pr.json): check them for behaviour a user would notice.`)
}
