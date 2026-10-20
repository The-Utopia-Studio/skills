// Playwright, from the repo being filmed when it already has it, otherwise
// installed once into a cache folder (never into the user's repo).

import fs from 'node:fs'
import { createRequire } from 'node:module'
import os from 'node:os'
import path from 'node:path'
import { runLoud } from './util.mjs'

const PLAYWRIGHT_VERSION = '1.56.1'
const NAMES = ['playwright', '@playwright/test']

function cacheDir() {
	const base =
		process.env.UI_WALK_CACHE ||
		process.env.CLAUDE_PLUGIN_DATA ||
		path.join(process.env.XDG_CACHE_HOME || path.join(os.homedir(), '.cache'), 'ui-walkthrough')
	return path.join(base, 'deps')
}

// Returns { pw, cli } for the first Playwright found from this package.json.
function find(fromPackageJson) {
	if (!fs.existsSync(fromPackageJson)) return null
	const require = createRequire(fromPackageJson)
	for (const name of NAMES) {
		try {
			const pw = require(name)
			// cli.js is not in the package's "exports", but package.json is.
			if (pw?.chromium) return { pw, cli: path.join(path.dirname(require.resolve(`${name}/package.json`)), 'cli.js') }
		} catch {}
	}
	return null
}

export function loadPlaywright(config) {
	for (const pkg of [path.join(config.root, config.app, 'package.json'), path.join(config.root, 'package.json')]) {
		const found = find(pkg)
		if (found) return found
	}
	const dir = cacheDir()
	const pkg = path.join(dir, 'package.json')
	let found = find(pkg)
	if (!found) {
		console.log(`   Installing Playwright ${PLAYWRIGHT_VERSION} into ${dir} (first run only)...`)
		fs.mkdirSync(dir, { recursive: true })
		if (!fs.existsSync(pkg)) fs.writeFileSync(pkg, JSON.stringify({ name: 'ui-walkthrough-deps', private: true }) + '\n')
		runLoud('npm', ['install', '--no-audit', '--no-fund', '--prefix', dir, `playwright@${PLAYWRIGHT_VERSION}`])
		found = find(pkg)
		if (!found) throw new Error(`Could not load Playwright from ${dir}`)
	}
	return found
}

// Download the Chromium build that this Playwright expects, if it is missing.
export async function ensureChromium({ pw, cli }) {
	try {
		const browser = await pw.chromium.launch()
		await browser.close()
	} catch (error) {
		if (!/Executable doesn't exist|playwright install/i.test(error.message)) throw error
		console.log('   Downloading Chromium for Playwright (first run only)...')
		runLoud(process.execPath, [cli, 'install', 'chromium'])
	}
}

const KOKORO_VERSION = '1.2.1'
const KOKORO_MODEL = 'onnx-community/Kokoro-82M-v1.0-ONNX'
let kokoro

// Kokoro (Apache-2.0), a small open voice model that runs in Node: no key, no
// Python. The package is installed into the cache folder and the model
// (~90 MB) downloaded on first use; after that it works offline.
export async function loadKokoro() {
	if (kokoro) return kokoro
	const dir = cacheDir()
	const pkg = path.join(dir, 'package.json')
	const resolve = () => {
		try {
			return createRequire(pkg).resolve('kokoro-js')
		} catch {
			return null
		}
	}
	if (!fs.existsSync(pkg) || !resolve()) {
		console.log(`   Installing the Kokoro voice into ${dir} (first run only)...`)
		fs.mkdirSync(dir, { recursive: true })
		if (!fs.existsSync(pkg)) fs.writeFileSync(pkg, JSON.stringify({ name: 'ui-walkthrough-deps', private: true }) + '\n')
		runLoud('npm', ['install', '--no-audit', '--no-fund', '--prefix', dir, `kokoro-js@${KOKORO_VERSION}`])
	}
	const { KokoroTTS } = await import(resolve())
	kokoro = await KokoroTTS.from_pretrained(KOKORO_MODEL, { dtype: 'q8', device: 'cpu' })
	return kokoro
}
