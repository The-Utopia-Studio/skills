// check-plan: narration.json, tour.json and manifest.json checked against
// each other in a second, before make spends minutes on voice and
// recording. Errors stop make; warnings are printed and make goes on.

import fs from 'node:fs'
import path from 'node:path'
import { paths } from './config.mjs'
import { readJson } from './util.mjs'

const NEEDS = {
	intro: ['title'],
	compare: ['before', 'after'],
	clip: ['src'],
	list: ['title', 'items'],
	text: ['title'],
	image: ['src'],
	outro: [],
}
const VIDEO_KEYS = ['src', 'before', 'after']

// Pure, so it can be tested: { errors, warnings } for the three plan files.
// `exists(name)` says whether a file is already in the PR's folder.
export function checkPlan({ narration, tour, manifest, viewport = { width: 1280, height: 720 }, exists = () => false }) {
	const errors = []
	const warnings = []
	const lines = narration?.slides || []
	const clips = tour?.clips || []
	const slides = manifest?.slides || []
	if (!slides.length) errors.push('manifest.json has no slides')
	lines.forEach((line, k) => {
		if (typeof line !== 'string' || !line.trim()) errors.push(`narration line ${k} is empty`)
	})

	const byId = new Map()
	clips.forEach((clip, k) => {
		if (!clip.id) return errors.push(`tour clip ${k + 1} has no id`)
		if (byId.has(clip.id)) errors.push(`tour has two clips called ${clip.id}`)
		byId.set(clip.id, clip)
	})

	const usedAudio = new Map()
	const usedClips = new Set()
	slides.forEach((slide, k) => {
		const where = `slide ${k + 1} (${slide.type || 'no type'})`
		if (!NEEDS[slide.type]) return errors.push(`${where}: unknown type; use ${Object.keys(NEEDS).join(', ')}`)
		for (const field of NEEDS[slide.type]) if (slide[field] === undefined || slide[field] === '') errors.push(`${where}: needs "${field}"`)
		if (slide.type === 'list' && slide.items !== undefined && !Array.isArray(slide.items)) errors.push(`${where}: "items" is a list of strings`)

		if (slide.audio) {
			const m = String(slide.audio).match(/^audio-(\d+)\.wav$/)
			if (!m) {
				if (!exists(slide.audio)) errors.push(`${where}: ${slide.audio} is not in the PR's folder; narration audio is audio-NN.wav, after its line`)
			}
			else if (Number(m[1]) >= lines.length) errors.push(`${where}: ${slide.audio} needs narration line ${Number(m[1])}, but narration.json has ${lines.length} line${lines.length === 1 ? '' : 's'}`)
			if (usedAudio.has(slide.audio)) warnings.push(`${where}: ${slide.audio} is also on slide ${usedAudio.get(slide.audio)}, so it plays twice`)
			else usedAudio.set(slide.audio, k + 1)
		}

		for (const key of VIDEO_KEYS) {
			const name = slide[key]
			if (!name || slide.type === 'image') continue
			const id = String(name).replace(/\.mp4$/, '')
			usedClips.add(id)
			if (!byId.has(id) && !exists(name)) errors.push(`${where}: ${name} is not a clip in tour.json`)
		}
		if (slide.type === 'image' && slide.src && !exists(slide.src)) errors.push(`${where}: image ${slide.src} is not in the PR's folder`)

		if (slide.type === 'compare' && slide.before && slide.after) {
			const before = byId.get(String(slide.before).replace(/\.mp4$/, ''))
			const after = byId.get(String(slide.after).replace(/\.mp4$/, ''))
			if (slide.before === slide.after) errors.push(`${where}: before and after are the same recording`)
			if (before && before.side !== 'before') errors.push(`${where}: ${before.id} is shown as Before but films the new version; give it "side": "before"`)
			if (after && after.side === 'before') errors.push(`${where}: ${after.id} is shown as After but films the old version`)
			if (before && after && JSON.stringify(before.steps || []) !== JSON.stringify(after.steps || [])) {
				warnings.push(`${where}: ${before.id} and ${after.id} take different steps, so the two sides won't move together (fine if the screens differ on purpose)`)
			}
		}

		const crop = slide.crop
		if (crop) {
			if (crop.x + crop.width > viewport.width + 1 || crop.y + crop.height > viewport.height + 1) {
				warnings.push(`${where}: crop runs past the ${viewport.width}×${viewport.height} recording`)
			}
		}
	})

	lines.forEach((_, k) => {
		const name = `audio-${String(k).padStart(2, '0')}.wav`
		if (!usedAudio.has(name)) warnings.push(`narration line ${k} is on no slide (${name}), so it is voiced but never heard`)
	})
	for (const id of byId.keys()) if (!usedClips.has(id)) warnings.push(`tour clip ${id} is on no slide, so it is filmed but never shown`)
	return { errors, warnings }
}

export function planCheck(config, pr) {
	const p = paths(config, pr)
	const read = (name) => readJson(path.join(p.work, name), null)
	const narration = read('narration.json')
	const tour = read('tour.json')
	const manifest = read('manifest.json')
	const { errors, warnings } = checkPlan({
		narration,
		tour,
		manifest,
		viewport: tour?.viewport || config.viewport,
		exists: (name) => fs.existsSync(path.join(p.work, path.basename(String(name)))),
	})
	for (const w of warnings) console.log(`   warning: ${w}`)
	for (const e of errors) console.error(`   ✘ ${e}`)
	if (errors.length) throw new Error(`${errors.length} problem${errors.length > 1 ? 's' : ''} in the plan. Fix them and run check-plan ${pr} again.`)
	console.log(`   plan ok: ${manifest.slides.length} slides, ${tour?.clips?.length || 0} clips, ${narration?.slides?.length || 0} narration lines`)
}
