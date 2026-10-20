// Small helpers shared by every stage: running commands, probing media,
// timing stages, reading JSON.

import { execFileSync, spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

export function run(cmd, args, opts = {}) {
	return execFileSync(cmd, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 1 << 28, ...opts }).trim()
}

export function runLoud(cmd, args, opts = {}) {
	const r = spawnSync(cmd, args, { stdio: 'inherit', ...opts })
	if (r.status !== 0) throw new Error(`${path.basename(cmd)} ${args.slice(0, 2).join(' ')} exited with ${r.status}`)
}

export function has(cmd) {
	return spawnSync(process.platform === 'win32' ? 'where' : 'which', [cmd], { stdio: 'ignore' }).status === 0
}

export function mediaDuration(file) {
	return Number(run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file]))
}

export function videoSize(file) {
	const [width, height] = run('ffprobe', [
		'-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', file,
	]).split(',').map(Number)
	return { width, height }
}

export function hasAudioStream(file) {
	return run('ffprobe', ['-v', 'error', '-select_streams', 'a', '-show_entries', 'stream=index', '-of', 'csv=p=0', file]) !== ''
}

export function readJson(file, fallback) {
	return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : fallback
}

export function writeJson(file, value) {
	fs.mkdirSync(path.dirname(file), { recursive: true })
	fs.writeFileSync(file, JSON.stringify(value, null, '\t') + '\n')
}

export const sleep = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000))

export async function stage(label, fn) {
	const started = Date.now()
	console.log(`\n── ${label}`)
	const value = await fn()
	console.log(`   ${label} took ${((Date.now() - started) / 1000).toFixed(0)}s`)
	return value
}

export function freeGigabytes(dir) {
	const columns = run('df', ['-k', dir]).split('\n').pop().trim().split(/\s+/)
	return Number(columns[3]) / 1024 / 1024
}

export function requireTools(...tools) {
	const missing = tools.filter((t) => !has(t))
	if (missing.length) throw new Error(`Missing ${missing.join(', ')}. Install ${missing.includes('ffmpeg') ? 'ffmpeg (brew install ffmpeg / apt install ffmpeg)' : missing.join(', ')} and retry.`)
}

// A setting from the environment, else from the repo's .env / .env.local
// files (root and app folder). Values are returned, never logged.
// Tours and manifests are plain data: pages must be web pages, and media
// must be plain file names in the PR's work folder.
export function webUrl(url) {
	const parsed = new URL(url)
	if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error(`Not a web page: ${parsed.protocol}// URLs are not allowed`)
	return parsed.toString()
}

export function plainName(name) {
	if (typeof name !== 'string' || !/^[\w][\w.-]*$/.test(name)) throw new Error(`"${name}" must be a file name in the PR's folder, with no path`)
	return name
}

export function envFromFiles(config, name) {
	if (process.env[name]) return process.env[name]
	const files = ['.env', '.env.local', path.join(config.app, '.env'), path.join(config.app, '.env.local')]
	for (const rel of files) {
		const file = path.join(config.root, rel)
		if (!fs.existsSync(file)) continue
		for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
			const m = line.match(new RegExp(`^\\s*(?:export\\s+)?${name}\\s*=\\s*(.*)\\s*$`))
			if (m && m[1]) return m[1].replace(/^(['"])(.*)\1$/, '$2')
		}
	}
	return null
}
