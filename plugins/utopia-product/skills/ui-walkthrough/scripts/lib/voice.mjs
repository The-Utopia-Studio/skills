// voice: narration.json → audio-NN.wav (48 kHz mono), one clip per slide.
//
// "auto" (the default) uses Deepgram when a key is set, otherwise Kokoro:
//   deepgram  DEEPGRAM_API_KEY      voice: config.voice.deepgram, else DEEPGRAM_TTS_MODEL, else Thalia
//   kokoro    local, no key, no setup (downloads once)   voice: config.voice.kokoro, default am_echo
// Also available by name:
//   openai    OPENAI_API_KEY        gpt-4o-mini-tts, voice from config.voice.openai
//   say       macOS built-in        robotic
// Keys come from the environment or the repo's .env / .env.local files and are
// only ever sent to their own provider. Lines whose text and voice are
// unchanged keep last run's clip.

import crypto from 'node:crypto'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { paths } from './config.mjs'
import { loadKokoro } from './deps.mjs'
import { envFromFiles, has, mediaDuration, readJson, run, writeJson } from './util.mjs'

function toWav48k(input, output) {
	run('ffmpeg', ['-y', '-i', input, '-ac', '1', '-ar', '48000', '-c:a', 'pcm_s16le', output])
}

// Strip silence at both ends, keeping a short natural edge.
function trim(file) {
	const tmp = `${file}.trim.wav`
	const edge = (keep) => `silenceremove=start_periods=1:start_silence=${keep}:start_threshold=-45dB`
	run('ffmpeg', ['-y', '-i', file, '-af', `${edge(0.08)},areverse,${edge(0.15)},areverse`, '-c:a', 'pcm_s16le', tmp])
	fs.renameSync(tmp, file)
}

const PROVIDERS = {
	async deepgram({ text, key, voice, out }) {
		const url = `https://api.deepgram.com/v1/speak?model=${encodeURIComponent(voice)}&encoding=linear16&sample_rate=48000&container=wav`
		const res = await fetch(url, {
			method: 'POST',
			headers: { Authorization: `Token ${key}`, 'Content-Type': 'application/json' },
			body: JSON.stringify({ text }),
		})
		if (!res.ok) throw new Error(`Deepgram ${res.status}: ${(await res.text()).slice(0, 200)}`)
		const raw = `${out}.raw.wav`
		fs.writeFileSync(raw, Buffer.from(await res.arrayBuffer()))
		toWav48k(raw, out)
		fs.rmSync(raw)
	},
	async openai({ text, key, voice, style, out }) {
		const res = await fetch('https://api.openai.com/v1/audio/speech', {
			method: 'POST',
			headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
			body: JSON.stringify({ model: 'gpt-4o-mini-tts', voice, input: text, instructions: style, response_format: 'wav' }),
		})
		if (!res.ok) throw new Error(`OpenAI ${res.status}: ${(await res.text()).slice(0, 200)}`)
		const raw = `${out}.raw.wav`
		fs.writeFileSync(raw, Buffer.from(await res.arrayBuffer()))
		toWav48k(raw, out)
		fs.rmSync(raw)
	},
	async kokoro({ text, voice, out }) {
		const tts = await loadKokoro()
		const raw = `${out}.raw.wav`
		await (await tts.generate(text, { voice })).save(raw)
		toWav48k(raw, out)
		fs.rmSync(raw)
	},
	async say({ text, voice, out }) {
		const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'uiw-tts-'))
		try {
			run('say', ['-v', voice, '-r', '185', '-o', path.join(dir, 'line.aiff'), text])
			toWav48k(path.join(dir, 'line.aiff'), out)
		} finally {
			fs.rmSync(dir, { recursive: true, force: true })
		}
	},
}

export function pickProvider(config) {
	const wanted = config.voice.provider
	const keys = { deepgram: envFromFiles(config, 'DEEPGRAM_API_KEY'), openai: envFromFiles(config, 'OPENAI_API_KEY') }
	const usable = {
		deepgram: Boolean(keys.deepgram),
		openai: Boolean(keys.openai),
		kokoro: true,
		say: process.platform === 'darwin' && has('say'),
	}
	const order = wanted === 'auto' ? ['deepgram', 'kokoro'] : [wanted]
	const name = order.find((n) => usable[n])
	if (!name) {
		throw new Error(
			wanted === 'deepgram'
				? 'The config asks for the Deepgram voice but no DEEPGRAM_API_KEY was found. Add DEEPGRAM_API_KEY=<your key> (and optionally DEEPGRAM_TTS_MODEL=aura-2-thalia-en) to .env.local, or set "voice": { "provider": "kokoro" } in ui-walkthrough.config.json for the free voice.'
				: `Voice provider "${wanted}" is not available (missing key or tool).`
		)
	}
	// For Deepgram: the repo's config (or this video's narration.json) wins,
	// then DEEPGRAM_TTS_MODEL from the environment, then Thalia.
	const voice =
		name === 'deepgram'
			? config.voice.deepgram || envFromFiles(config, 'DEEPGRAM_TTS_MODEL') || 'aura-2-thalia-en'
			: config.voice[name]
	return { name, key: keys[name] ?? null, voice }
}

export async function voice(config, pr) {
	return voiceFolder(config, paths(config, pr).work)
}

// Voice the narration.json in any folder (a PR's, or a reel's title cards).
export async function voiceFolder(config, work) {
	const narration = readJson(path.join(work, 'narration.json'), null)
	if (!narration?.slides?.length) throw new Error(`No narration in ${path.join(work, 'narration.json')}`)
	const style = narration.style || 'Calm, friendly and steady, like a teammate showing a colleague what changed in the app.'
	const provider = pickProvider({ ...config, voice: { ...config.voice, ...(narration.voice || {}) } })
	console.log(`   voice: ${provider.name} (${provider.voice})`)

	const cacheFile = path.join(work, '.voice-cache.json')
	const cache = readJson(cacheFile, {})
	const lengths = {}
	for (const [k, text] of narration.slides.entries()) {
		const name = `audio-${String(k).padStart(2, '0')}.wav`
		const out = path.join(work, name)
		const key = crypto.createHash('sha256').update(JSON.stringify([provider.name, provider.voice, style, text])).digest('hex').slice(0, 16)
		if (cache[name] === key && fs.existsSync(out)) {
			lengths[name] = mediaDuration(out)
			console.log(`   ${name}: unchanged (${lengths[name].toFixed(1)}s)`)
			continue
		}
		const words = text.split(/\s+/).length
		let lastError
		for (let attempt = 0; attempt < 3; attempt++) {
			try {
				await PROVIDERS[provider.name]({ text, key: provider.key, voice: provider.voice, style, out })
				trim(out)
				const seconds = mediaDuration(out)
				// A clip far too short or long for its words is a bad generation.
				if (seconds < 0.3 || seconds > words * 1.2 + 6) throw new Error(`${seconds.toFixed(1)}s for ${words} words`)
				lengths[name] = seconds
				cache[name] = key
				console.log(`   ${name}: ${seconds.toFixed(1)}s`)
				lastError = null
				break
			} catch (error) {
				lastError = error
			}
		}
		if (lastError) throw new Error(`${name}: ${lastError.message}`)
	}
	writeJson(cacheFile, cache)
	writeJson(path.join(work, 'durations.json'), lengths)
	const total = Object.values(lengths).reduce((a, b) => a + b, 0)
	console.log(`   ${narration.slides.length} lines, ${total.toFixed(0)}s of narration`)
}

// --- Auditioning voices ---------------------------------------------------------

// Kokoro v1.0's English voices: a = American, b = British; f = female, m = male.
export const KOKORO_VOICES = [
	'af_heart', 'af_alloy', 'af_aoede', 'af_bella', 'af_jessica', 'af_kore', 'af_nicole', 'af_nova', 'af_river', 'af_sarah', 'af_sky',
	'am_adam', 'am_echo', 'am_eric', 'am_fenrir', 'am_liam', 'am_michael', 'am_onyx', 'am_puck', 'am_santa',
	'bf_alice', 'bf_emma', 'bf_isabella', 'bf_lily', 'bm_daniel', 'bm_fable', 'bm_george', 'bm_lewis',
]

// Deepgram Aura-2 English voices (each is aura-2-<name>-en). Thalia, the
// default, comes first.
export const DEEPGRAM_VOICES = [
	'thalia', 'amalthea', 'andromeda', 'apollo', 'arcas', 'aries', 'asteria', 'athena', 'atlas', 'aurora', 'callista', 'cora', 'cordelia',
	'delia', 'draco', 'electra', 'harmonia', 'helena', 'hera', 'hermes', 'hyperion', 'iris', 'janus', 'juno', 'jupiter', 'luna',
	'mars', 'minerva', 'neptune', 'odysseus', 'ophelia', 'orion', 'orpheus', 'pandora', 'phoebe', 'pluto', 'saturn', 'selene',
	'theia', 'vesta', 'zeus',
].map((name) => `aura-2-${name}-en`)

// voices: the same line in many voices, as MP3s in .ui-walkthrough/voice-samples/<provider>/,
// so you can listen and set voice.kokoro / voice.deepgram in the config.
export async function voices(config, { provider = 'kokoro', text, only } = {}) {
	const line = text || "Here's what changed in this pull request. The settings page now groups options by team, and saving takes one click."
	const list = only?.length ? only : provider === 'deepgram' ? DEEPGRAM_VOICES : KOKORO_VOICES
	const key = provider === 'deepgram' ? envFromFiles(config, 'DEEPGRAM_API_KEY') : null
	if (provider === 'deepgram' && !key) throw new Error('Deepgram samples need DEEPGRAM_API_KEY.')
	if (!PROVIDERS[provider]) throw new Error(`Unknown provider "${provider}"`)
	const dir = path.join(config.root, '.ui-walkthrough', 'voice-samples', provider)
	fs.mkdirSync(dir, { recursive: true })
	let made = 0
	for (const voice of list) {
		const wav = path.join(dir, `${voice}.wav`)
		try {
			await PROVIDERS[provider]({ text: line, key, voice, style: '', out: wav })
			run('ffmpeg', ['-y', '-v', 'error', '-i', wav, '-b:a', '128k', wav.replace(/\.wav$/, '.mp3')])
			fs.rmSync(wav)
			made++
			console.log(`   ${voice}`)
		} catch (error) {
			fs.rmSync(wav, { force: true })
			console.log(`   ${voice}: skipped (${error.message.slice(0, 80)})`)
		}
	}
	console.log(`   ${made} samples in ${path.relative(config.root, dir)}/`)
	return dir
}
