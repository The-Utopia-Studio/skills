#!/usr/bin/env node
// ui-walkthrough: narrated before/after videos of what a merged PR changed
// in a web app's UI. Run inside the repository whose PRs you are filming.
//
//   cli.mjs init [--voice free|deepgram] [--deepgram-voice thalia]   starter config; asks which voice
//   cli.mjs doctor                   tools, config and which voice will be used
//   cli.mjs prepare <pr>             before/after copies of the app + starter files
//   cli.mjs serve <pr> [--stop]      start (or stop) both dev servers
//   cli.mjs sign-in <pr>             the person signs in once; the session is saved
//   cli.mjs auth <pr>                sign the test user in without a person (CI; config "auth")
//   cli.mjs make <pr> [--preview] [--force] [--workers N] [--parallel N]
//                                    check plan → voice → warm pages → record → render → check
//   cli.mjs voice|warm|record|render|check <pr>   one stage at a time
//   cli.mjs changes <pr>             text the PR added or removed, and the pages each file is on
//   cli.mjs inspect <pr> [path] [--side before] [--full]   what a page offers to click + screenshot
//   cli.mjs check-tour <pr> [clip…]  run the tour's steps fast, no camera; failures say why
//   cli.mjs check-plan <pr>          narration, tour and slides checked against each other
//   cli.mjs publish <pr> [--none "why"] [--dry-run]  upload the video, comment on the PR
//   cli.mjs voices [--deepgram] [--text "..."]   the same line in every voice, to pick one
//   cli.mjs clean <pr>               delete the before/after copies
//   cli.mjs reel list                merged PRs that have a published video, newest first
//   cli.mjs reel scan [pr…] [--last N] [--since YYYY-MM-DD] [--name reel-name]
//                                    published PR videos → slides, transcripts, contact sheets, reel.json
//   cli.mjs reel make [--name reel-name] [--preview] [--max 180]
//                                    the chosen slides + title cards → one video of 3 minutes at most
//
// Docs: SKILL.md and references/ next to this folder.

import fs from 'node:fs'
import path from 'node:path'
import { CONFIG_FILE, DEFAULTS, loadConfig, paths, repoRoot } from './lib/config.mjs'
import { autoSignIn } from './lib/auth.mjs'
import { changes } from './lib/changes.mjs'
import { check } from './lib/check.mjs'
import { inspect } from './lib/inspect.mjs'
import { planCheck } from './lib/plan-check.mjs'
import { prepare } from './lib/prepare.mjs'
import { publish } from './lib/publish.mjs'
import { MAX_SECONDS, reelList, reelMake, reelScan } from './lib/reel.mjs'
import { record } from './lib/record.mjs'
import { render } from './lib/render.mjs'
import { serve } from './lib/serve.mjs'
import { signIn } from './lib/signin.mjs'
import { requireTools, stage, writeJson } from './lib/util.mjs'
import { voice, voices } from './lib/voice.mjs'
import { warm } from './lib/warm.mjs'

const [command, ...rest] = process.argv.slice(2)
const flag = (name) => rest.includes(name)
const option = (name) => {
	const k = rest.indexOf(name)
	return k >= 0 ? rest[k + 1] : undefined
}
const VALUED = ['--parallel', '--workers', '--file', '--none', '--text', '--voice', '--deepgram-voice', '--side', '--last', '--since', '--name', '--max']
const positional = rest.filter((a, k) => !a.startsWith('--') && !VALUED.includes(rest[k - 1]))
const pr = Number((positional[0] || '').replace('#', ''))
// Anything after the PR number names clips to record again.
const clipIds = positional.slice(1)

function usage(code = 1) {
	// The comment block at the top of this file is the help text.
	const lines = fs.readFileSync(new URL(import.meta.url), 'utf8').split('\n').slice(1)
	const header = lines.slice(0, lines.findIndex((l) => !l.startsWith('//')))
	console.log(header.map((l) => l.replace(/^\/\/ ?/, '')).join('\n'))
	process.exit(code)
}

// "orion" or "aura-2-orion-en" → "aura-2-orion-en".
function deepgramName(name) {
	return /^aura-/.test(name) ? name : `aura-2-${name.toLowerCase()}-en`
}

// A few Deepgram voices to offer, Thalia (the default) first.
const DEEPGRAM_PICKS = [
	['thalia', 'warm, clear female (default)'],
	['andromeda', 'bright female'],
	['helena', 'calm female'],
	['apollo', 'friendly male'],
	['orion', 'steady male'],
	['zeus', 'deep male'],
]

// Ask in a terminal; default to the free voice when nobody can answer.
async function askVoice() {
	if (!process.stdin.isTTY) return { choice: 'free' }
	const { createInterface } = await import('node:readline/promises')
	const rl = createInterface({ input: process.stdin, output: process.stdout })
	console.log('Which voice should narrate the videos?')
	console.log('  1. Free voice (Kokoro am_echo): no setup, runs on this machine')
	console.log('  2. Deepgram Aura-2: most natural, needs DEEPGRAM_API_KEY in .env.local')
	const answer = (await rl.question('Choose 1 or 2 [1]: ')).trim()
	if (answer !== '2') {
		rl.close()
		return { choice: 'free' }
	}
	console.log('Which Deepgram voice?')
	DEEPGRAM_PICKS.forEach(([name, what], k) => console.log(`  ${k + 1}. ${name[0].toUpperCase() + name.slice(1)}: ${what}`))
	console.log('  Or type any Aura-2 voice name (hear them all later with: voices --deepgram)')
	const pick = (await rl.question('Choose [1, Thalia]: ')).trim()
	rl.close()
	const numbered = DEEPGRAM_PICKS[Number(pick) - 1]
	return { choice: 'deepgram', deepgram: numbered ? numbered[0] : pick || 'thalia' }
}

// What will be used, and what is missing. Never prints a key.
async function doctor() {
	const { has, envFromFiles } = await import('./lib/util.mjs')
	const { pickProvider } = await import('./lib/voice.mjs')
	const ok = (good, text) => console.log(`  ${good ? '✔' : '✘'} ${text}`)
	for (const tool of ['git', 'node', 'ffmpeg', 'ffprobe', 'gh']) ok(has(tool), tool)
	let config
	try {
		config = loadConfig()
		ok(Boolean(config.file), config.file ? `${CONFIG_FILE} found` : `no ${CONFIG_FILE} yet (run init)`)
	} catch (error) {
		return ok(false, error.message)
	}
	const key = envFromFiles(config, 'DEEPGRAM_API_KEY')
	ok(true, `DEEPGRAM_API_KEY ${key ? 'found' : 'not set'}`)
	try {
		const voice = pickProvider(config)
		ok(true, `videos will be narrated by ${voice.name === 'kokoro' ? 'the free Kokoro voice' : voice.name} (${voice.voice})`)
	} catch (error) {
		ok(false, error.message)
	}
}

// reel scan|make: several published videos → one short one (lib/reel.mjs).
async function reel() {
	const [action, ...numbers] = positional
	requireTools('git', 'ffmpeg', 'ffprobe', 'gh')
	const config = loadConfig()
	if (action === 'list') return stage('Reel list', () => reelList(config))
	const since = option('--since')
	if (since && !/^\d{4}-\d{2}-\d{2}$/.test(since)) throw new Error('--since is a date: YYYY-MM-DD')
	const name = option('--name') || (action === 'scan' ? `reel-${new Date().toISOString().slice(0, 10)}` : latestReel(config))
	if (action === 'scan') {
		const prs = numbers.map((n) => Number(n.replace('#', '')))
		if (prs.some((n) => !Number.isInteger(n) || n <= 0)) throw new Error('PR numbers only, e.g. reel scan 142 143')
		const last = option('--last') ? Number(option('--last')) : undefined
		if (last !== undefined && !(last > 0)) throw new Error('--last is a number of videos')
		return stage(`Reel scan (${name})`, () => reelScan(config, { name, prs, last, since }))
	}
	if (action === 'make') {
		const max = Number(option('--max') || MAX_SECONDS)
		if (!(max > 0) || max > MAX_SECONDS) throw new Error(`--max is at most ${MAX_SECONDS} seconds`)
		const started = Date.now()
		const output = await stage(`Reel make (${name})`, () => reelMake(config, { name, preview: flag('--preview'), max, workers: Number(option('--workers')) || undefined }))
		return console.log(`\nDone in ${((Date.now() - started) / 60000).toFixed(1)} min → ${path.relative(process.cwd(), output)}`)
	}
	usage()
}

// The reel scanned most recently, when make is not given --name.
function latestReel(config) {
	const dir = path.join(config.root, '.ui-walkthrough', 'reel')
	const found = fs.existsSync(dir)
		? fs.readdirSync(dir).filter((n) => !n.startsWith('.') && fs.existsSync(path.join(dir, n, 'reel.json'))).sort((a, b) => fs.statSync(path.join(dir, b, 'reel.json')).mtimeMs - fs.statSync(path.join(dir, a, 'reel.json')).mtimeMs)
		: []
	if (!found.length) throw new Error('No reel yet: run reel scan first.')
	return found[0]
}

async function main() {
	if (!command || command === 'help' || command === '--help') usage(0)
	if (command === 'init') {
		const file = path.join(repoRoot(), CONFIG_FILE)
		if (fs.existsSync(file)) return console.log(`${CONFIG_FILE} already exists`)
		const asked = option('--voice') ? null : await askVoice()
		const choice = option('--voice') || asked.choice
		const provider = { free: 'kokoro', kokoro: 'kokoro', deepgram: 'deepgram' }[choice]
		if (!provider) throw new Error('--voice is "free" or "deepgram"')
		const { voice: v, ...rest } = DEFAULTS
		// Deepgram: Thalia unless they picked another (--deepgram-voice, or the prompt).
		const deepgramVoice = deepgramName(option('--deepgram-voice') || asked?.deepgram || 'thalia')
		const voice = provider === 'deepgram' ? { provider, deepgram: deepgramVoice } : { provider, kokoro: v.kokoro }
		writeJson(file, { ...rest, brand: path.basename(repoRoot()), voice })
		console.log(`Wrote ${CONFIG_FILE}. Set "app", "dev" and "copy" for your repo (see references/config.md).`)
		console.log(
			provider === 'deepgram'
				? `Voice: Deepgram (${deepgramVoice}). Add DEEPGRAM_API_KEY=<your key> to .env.local. To use another Deepgram voice, change voice.deepgram in ${CONFIG_FILE} (hear them all with: voices --deepgram). Check with: doctor`
				: `Voice: free Kokoro (${v.kokoro}), no setup. Hear the others with: voices`
		)
		return
	}
	if (command === 'doctor') return doctor()
	if (command === 'reel') return reel()
	if (command === 'voices') {
		requireTools('ffmpeg')
		return stage('Voices', () => voices(loadConfig(), { provider: flag('--deepgram') ? 'deepgram' : 'kokoro', text: option('--text'), only: positional }))
	}
	if (!pr) usage()
	requireTools('git', 'ffmpeg', 'ffprobe')
	const config = loadConfig()
	switch (command) {
		case 'prepare':
			requireTools('gh')
			return stage('Prepare', () => prepare(config, pr))
		case 'serve':
			return stage(flag('--stop') ? 'Stop servers' : 'Start servers', () => serve(config, pr, { stop: flag('--stop') }))
		case 'sign-in':
			return stage('Sign in', () => signIn(config, pr, { file: option('--file') }))
		case 'auth':
			return stage('Sign in (unattended)', () => autoSignIn(config, pr))
		case 'changes':
			return changes(config, pr)
		case 'inspect':
			return stage('Inspect', () => inspect(config, pr, clipIds[0], { side: option('--side') || 'after', full: flag('--full') }))
		case 'check-plan':
			return stage('Check plan', () => planCheck(config, pr))
		case 'check-tour':
			return stage('Check tour', () => record(config, pr, { only: clipIds, dryRun: true }))
		case 'publish':
			requireTools('gh')
			return stage('Publish', () => publish(config, pr, { none: option('--none'), dryRun: flag('--dry-run') }))
		case 'voice':
			return stage('Voice', () => voice(config, pr))
		case 'warm':
			return stage('Warm pages', () => warm(config, pr))
		case 'record':
			return stage('Record', () => record(config, pr, { only: clipIds, force: flag('--force'), parallel: Number(option('--parallel')) || undefined }))
		case 'render':
			return stage('Render', () => render(config, pr, { preview: flag('--preview'), workers: Number(option('--workers')) || undefined }))
		case 'check':
			return stage('Check', () => check(config, pr, flag('--preview') ? path.join(paths(config, pr).out, `pr-${pr}-preview.mp4`) : undefined))
		case 'make': {
			const started = Date.now()
			await stage('Check plan', () => planCheck(config, pr))
			await stage('Voice', () => voice(config, pr))
			if (!flag('--no-warm')) await stage('Warm pages', () => warm(config, pr))
			await stage('Record', () => record(config, pr, { force: flag('--force'), parallel: Number(option('--parallel')) || undefined }))
			const output = await stage('Render', () => render(config, pr, { preview: flag('--preview'), workers: Number(option('--workers')) || undefined }))
			await stage('Check', () => check(config, pr, output))
			return console.log(`\nDone in ${((Date.now() - started) / 60000).toFixed(1)} min → ${path.relative(process.cwd(), output)}`)
		}
		case 'clean': {
			const dir = paths(config, pr).copies
			// Only ever the copies this tool made for this PR.
			if (!fs.existsSync(path.join(dir, 'after', '.ui-walkthrough-ready')) && !fs.existsSync(path.join(dir, 'before', '.ui-walkthrough-ready'))) {
				return console.log(`Nothing of ours to delete at ${dir}`)
			}
			fs.rmSync(dir, { recursive: true, force: true })
			return console.log(`Deleted ${dir}. Stop the servers if they are still running (serve ${pr} --stop).`)
		}
		default:
			usage()
	}
}

main().catch((error) => {
	console.error(`\nError: ${error.message}`)
	process.exit(1)
})
