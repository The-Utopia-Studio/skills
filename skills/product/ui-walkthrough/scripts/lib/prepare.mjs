// prepare: copies of the app just before and just after a merged PR, ready
// to run side by side, plus starter files for the agent to fill in.

import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { excludeFromGit, paths } from './config.mjs'
import { readJson, run, runLoud, writeJson } from './util.mjs'

const quote = (s) => `'${String(s).replace(/'/g, `'\\''`)}'`

const UI_FILE = /\.(tsx|jsx|vue|svelte|astro|html|css|scss|less|mdx)$/
const NOT_UI = /(\.test\.|\.spec\.|__tests__|\/_generated\/|\.stories\.)/

function cloneTree(from, to) {
	if (!fs.existsSync(from) || fs.existsSync(to)) return
	fs.mkdirSync(path.dirname(to), { recursive: true })
	// Copy-on-write clones (APFS on macOS, reflinks on btrfs/xfs): a whole
	// node_modules for almost no disk. Falls back to a normal copy elsewhere.
	const args = process.platform === 'darwin' ? ['-Rc', from, to] : ['-R', '--reflink=auto', from, to]
	if (spawnSync('cp', args).status !== 0) spawnSync('cp', ['-R', from, to])
}

// Every node_modules folder in the checkout (root and workspaces), without
// descending into node_modules themselves.
function nodeModulesDirs(root) {
	const found = []
	const walk = (dir, depth) => {
		if (depth > 4) return
		for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
			if (!entry.isDirectory() || entry.name.startsWith('.')) continue
			const full = path.join(dir, entry.name)
			if (entry.name === 'node_modules') found.push(path.relative(root, full))
			else walk(full, depth + 1)
		}
	}
	walk(root, 0)
	return found
}

const LOCKFILES = ['pnpm-lock.yaml', 'package-lock.json', 'yarn.lock', 'bun.lockb', 'bun.lock']

function lockfileMatches(root, rev) {
	for (const lock of LOCKFILES) {
		if (!fs.existsSync(path.join(root, lock))) continue
		const r = spawnSync('git', ['-C', root, 'diff', '--quiet', rev, '--', lock])
		return r.status === 0
	}
	return true
}

function exportSide(config, dest, rev) {
	if (fs.existsSync(path.join(dest, '.ui-walkthrough-ready'))) return 'reused'
	fs.rmSync(dest, { recursive: true, force: true })
	fs.mkdirSync(dest, { recursive: true })
	// Streamed through a pipe, so even a large repo is never held in memory.
	const exported = spawnSync('bash', ['-c', `set -o pipefail; git -C ${quote(config.root)} archive --format=tar ${quote(rev)} | tar -x -C ${quote(dest)}`], {
		stdio: ['ignore', 'ignore', 'pipe'],
	})
	if (exported.status !== 0) throw new Error(`Exporting ${rev} failed: ${exported.stderr}`)

	const install = config.install === 'install' || (config.install === 'auto' && !lockfileMatches(config.root, rev))
	if (install) {
		console.log(`   Installing dependencies in ${dest} (${config.installCommand})...`)
		runLoud('sh', ['-c', config.installCommand], { cwd: dest })
	} else {
		for (const rel of nodeModulesDirs(config.root)) {
			if (fs.existsSync(path.join(dest, path.dirname(rel)))) cloneTree(path.join(config.root, rel), path.join(dest, rel))
		}
	}
	for (const rel of config.copy) {
		const from = path.join(config.root, rel)
		if (fs.existsSync(from)) {
			fs.mkdirSync(path.dirname(path.join(dest, rel)), { recursive: true })
			fs.copyFileSync(from, path.join(dest, rel))
		} else {
			console.log(`   ! ${rel} is listed in "copy" but does not exist`)
		}
	}
	fs.writeFileSync(path.join(dest, '.ui-walkthrough-ready'), `${rev}\n`)
	return install ? 'installed' : 'cloned'
}

export function devCommand(config, side, dir) {
	const port = config.ports[side]
	return `cd ${JSON.stringify(path.join(dir, config.app))} && PORT=${port} exec ${config.dev.replaceAll('{port}', String(port))}`
}

// Claude Code desktop starts dev servers from .claude/launch.json
// (preview_start); other setups can use `serve`.
function writeLaunchEntries(config, dirs) {
	const file = path.join(config.root, '.claude', 'launch.json')
	if (!fs.existsSync(path.dirname(file))) return false
	const launch = readJson(file, { version: '0.0.1', configurations: [] })
	for (const side of ['before', 'after']) {
		const name = `ui-walkthrough-${side}`
		launch.configurations = (launch.configurations || []).filter((c) => c.name !== name)
		launch.configurations.push({ name, runtimeExecutable: 'sh', runtimeArgs: ['-c', devCommand(config, side, dirs[side])], port: config.ports[side] })
	}
	fs.writeFileSync(file, JSON.stringify(launch, null, 2) + '\n')
	return true
}

export function prepare(config, pr) {
	const p = paths(config, pr)
	const info = JSON.parse(
		run('gh', ['pr', 'view', String(pr), '--json', 'number,title,body,state,mergedAt,mergeCommit,baseRefName,url,files'], { cwd: config.root })
	)
	if (info.state !== 'MERGED' || !info.mergeCommit?.oid) throw new Error(`PR #${pr} is not merged yet (state: ${info.state}).`)
	spawnSync('git', ['-C', config.root, 'fetch', '--quiet', 'origin', info.baseRefName], { stdio: 'inherit' })
	const after = info.mergeCommit.oid
	// The first parent is the base branch as it was just before the merge,
	// whether the PR was merged, squashed or rebased.
	const before = run('git', ['-C', config.root, 'rev-parse', `${after}^1`])

	excludeFromGit(config.root)
	const dirs = { before: p.copy('before'), after: p.copy('after') }
	for (const side of ['before', 'after']) {
		const how = exportSide(config, dirs[side], side === 'before' ? before : after)
		console.log(`   ${side}: ${(side === 'before' ? before : after).slice(0, 7)} → ${dirs[side]} (${how})`)
	}
	const launch = writeLaunchEntries(config, dirs)

	const uiFiles = info.files.map((f) => f.path).filter((f) => UI_FILE.test(f) && !NOT_UI.test(f))
	writeJson(path.join(p.work, 'pr.json'), {
		number: pr, title: info.title, url: info.url, mergedAt: info.mergedAt, before, after,
		uiFiles, allFiles: info.files.map((f) => f.path), body: info.body,
	})
	const merged = new Date(info.mergedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
	const starters = {
		'narration.json': { slides: [] },
		'tour.json': {
			baseUrl: `http://localhost:${config.ports.after}`,
			beforeUrl: `http://localhost:${config.ports.before}`,
			cacheKey: `${before.slice(0, 12)}..${after.slice(0, 12)}`,
			clips: [],
		},
		'manifest.json': {
			pr,
			slides: [
				{ type: 'intro', title: info.title, date: `Merged ${merged}`, audio: 'audio-00.wav' },
				{ type: 'outro' },
			],
			captionFixes: {},
		},
	}
	for (const [name, value] of Object.entries(starters)) {
		if (!fs.existsSync(path.join(p.work, name))) writeJson(path.join(p.work, name), value)
	}

	console.log(`
PR #${pr}: ${info.title}
  before → http://localhost:${config.ports.before}    after → http://localhost:${config.ports.after}
  ${uiFiles.length} UI file(s) changed (see ${path.relative(config.root, path.join(p.work, 'pr.json'))})

Next:
  1. Start both servers: ${launch ? 'preview_start "ui-walkthrough-before" and "ui-walkthrough-after", or ' : ''}ui-walkthrough serve ${pr}
  2. Sign in once if needed: ui-walkthrough sign-in ${pr}
  3. Fill in narration.json, tour.json and manifest.json in ${path.relative(config.root, p.work)}/
  4. ui-walkthrough make ${pr} --preview, then ui-walkthrough make ${pr}`)
}
