// Where things live, and the per-repo settings from ui-walkthrough.config.json.
//
// The tool runs from inside the repo whose PRs it films. Everything it writes
// goes under <repo>/.ui-walkthrough/ (kept out of git through
// .git/info/exclude), except the before/after copies of the app, which go to
// UI_WALK_HOME or the OS temp folder.

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import url from 'node:url'
import { run, readJson } from './util.mjs'

export const SKILL_DIR = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..', '..')

export const CONFIG_FILE = 'ui-walkthrough.config.json'

export const DEFAULTS = {
	// Folder of the web app, relative to the repo root ("." for a single app).
	app: '.',
	// Starts the dev server. {port} is replaced; PORT is also set in its env.
	dev: 'npm run dev -- --port {port}',
	// "clone" reuses this checkout's node_modules (copy-on-write, near-instant),
	// "install" runs installCommand in each copy, "auto" clones and falls back
	// to installing when the lockfile differs from this checkout's.
	install: 'auto',
	installCommand: 'npm ci',
	// Files to copy into each copy (env files are not in git), relative to the root.
	copy: [],
	ports: { before: 3401, after: 3402 },
	// Where the person signs in, and how to tell they have.
	signInPath: '/sign-in',
	signedInCookie: null,
	viewport: { width: 1280, height: 720 },
	brand: null,
	repoLabel: null,
	accent: '#2563eb',
	voice: { provider: 'auto', deepgram: null, kokoro: 'am_echo', openai: 'alloy', say: 'Samantha' },
	// Markdown with this repo's own rules for the agent (test accounts, data
	// that must not be touched, banners to dismiss).
	notes: null,
}

export function repoRoot(cwd = process.cwd()) {
	try {
		return run('git', ['-C', cwd, 'rev-parse', '--show-toplevel'])
	} catch {
		throw new Error('Run this inside the git repository whose PRs you want to film.')
	}
}

export function loadConfig(root = repoRoot()) {
	const file = path.join(root, CONFIG_FILE)
	const own = readJson(file, {})
	const config = { ...DEFAULTS, ...own, ports: { ...DEFAULTS.ports, ...own.ports }, voice: { ...DEFAULTS.voice, ...own.voice } }
	config.viewport = { ...DEFAULTS.viewport, ...own.viewport }
	config.root = root
	config.file = fs.existsSync(file) ? file : null
	if (!config.brand) config.brand = path.basename(root)
	if (!config.repoLabel) {
		try {
			const remote = run('git', ['-C', root, 'remote', 'get-url', 'origin'])
			config.repoLabel = remote.replace(/^.*[:/]([^/]+\/[^/]+?)(\.git)?$/, '$1').replace('/', ' / ')
		} catch {
			config.repoLabel = config.brand
		}
	}
	return config
}

export function paths(config, pr) {
	const home = path.join(config.root, '.ui-walkthrough')
	const copies = path.join(process.env.UI_WALK_HOME || path.join(os.tmpdir(), 'ui-walkthrough'), path.basename(config.root), `pr-${pr}`)
	return {
		home,
		work: path.join(home, `pr-${pr}`),
		out: path.join(home, 'out'),
		auth: path.join(home, 'auth'),
		session: path.join(home, 'auth', 'session.json'),
		copies,
		copy: (side) => path.join(copies, side),
	}
}

// Keep .ui-walkthrough/ (sessions, recordings, videos) out of git without
// editing the repo's .gitignore.
export function excludeFromGit(root) {
	const gitDir = run('git', ['-C', root, 'rev-parse', '--git-common-dir'])
	const file = path.resolve(root, gitDir, 'info', 'exclude')
	fs.mkdirSync(path.dirname(file), { recursive: true })
	const current = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : ''
	if (!current.split('\n').includes('.ui-walkthrough/')) {
		fs.appendFileSync(file, `${current.endsWith('\n') || !current ? '' : '\n'}# ui-walkthrough: sessions, recordings, videos\n.ui-walkthrough/\n`)
	}
}
