// publish: put the finished video where the team will see it.
//
// Uploads the MP4 as an asset on one GitHub release (default tag
// "ui-walkthrough-videos", a pre-release, so it never becomes "latest") and
// writes a comment on the PR linking to it. In a private repository the
// asset is only reachable by people with access to the repo. Running it
// again replaces the asset and edits the same comment instead of adding one.
//
// `--none "<reason>"` posts (or updates) the comment to say why there is no
// video, e.g. the PR changed nothing a user would see.

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { paths } from './config.mjs'
import { mediaDuration, readJson, run } from './util.mjs'

const MARKER = '<!-- ui-walkthrough -->'

const gh = (args, cwd) => run('gh', args, { cwd })

function minutes(seconds) {
	const s = Math.round(seconds)
	return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

function upsertComment(root, repo, pr, body) {
	// One id per line across every page of comments.
	const ids = gh(['api', '--paginate', `repos/${repo}/issues/${pr}/comments`, '--jq', `.[] | select(.body | contains("${MARKER}")) | .id`], root)
	const existing = ids.split('\n').filter(Boolean)[0]
	const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'uiw-comment-')), 'body.json')
	fs.writeFileSync(file, JSON.stringify({ body }))
	const url = existing
		? JSON.parse(gh(['api', '-X', 'PATCH', `repos/${repo}/issues/comments/${existing}`, '--input', file], root)).html_url
		: JSON.parse(gh(['api', '-X', 'POST', `repos/${repo}/issues/${pr}/comments`, '--input', file], root)).html_url
	fs.rmSync(path.dirname(file), { recursive: true, force: true })
	return { url, edited: Boolean(existing) }
}

export function publish(config, pr, { none, dryRun = false } = {}) {
	const p = paths(config, pr)
	const repo = gh(['repo', 'view', '--json', 'nameWithOwner', '--jq', '.nameWithOwner'], config.root)
	const unattended = process.env.UI_WALK_UNATTENDED === '1'
	const run = process.env.GITHUB_RUN_ID ? ` ([run](${process.env.GITHUB_SERVER_URL}/${repo}/actions/runs/${process.env.GITHUB_RUN_ID}))` : ''
	const footer = `<sub>Made ${unattended ? 'automatically ' : ''}by [PRview](https://github.com/The-Utopia-Studio/ui-walkthrough) from the app just before and just after this merge${run}.${unattended ? ' Not reviewed by a person.' : ''}</sub>`

	if (none) {
		if (dryRun) return console.log(`   Would comment on ${repo}#${pr}:\n\n${MARKER}\n**No walkthrough video for this PR.** ${none}\n\n${footer}`)
		const { url } = upsertComment(config.root, repo, pr, `${MARKER}\n**No walkthrough video for this PR.** ${none}\n\n${footer}`)
		console.log(`   Commented: ${url}`)
		return
	}

	const video = path.join(p.out, `pr-${pr}-walkthrough.mp4`)
	if (!fs.existsSync(video)) throw new Error(`No video at ${video}; run make first.`)
	const tag = config.publish?.release || 'ui-walkthrough-videos'
	const link = `https://github.com/${repo}/releases/download/${tag}/${path.basename(video)}`
	const body = commentBody(config, pr, p, video, link, footer)
	if (dryRun) {
		console.log(`   Would upload ${path.relative(config.root, video)} to the "${tag}" release of ${repo}`)
		console.log(`   Would comment on ${repo}#${pr}:\n\n${body}`)
		return
	}
	try {
		gh(['release', 'view', tag], config.root)
	} catch {
		gh(['release', 'create', tag, '--prerelease', '--title', 'UI walkthrough videos', '--notes', 'Narrated before/after videos of merged pull requests, made by ui-walkthrough. One asset per PR.'], config.root)
	}
	gh(['release', 'upload', tag, `${video}#PR ${pr} walkthrough`, '--clobber'], config.root)
	const { url, edited } = upsertComment(config.root, repo, pr, body)
	console.log(`   Video: ${link}`)
	console.log(`   ${edited ? 'Updated' : 'Posted'} comment: ${url}`)
}

function commentBody(config, pr, p, video, link, footer) {
	const manifest = readJson(path.join(p.work, 'manifest.json'), { slides: [] })
	const covered = manifest.slides
		.filter((s) => ['clip', 'compare', 'image', 'list'].includes(s.type) && s.title)
		.map((s) => `- ${s.title}${s.type === 'compare' ? ' (before / after)' : ''}`)
	// The agent can leave a short note (what it covers, what it left out, which test records it used).
	const notesFile = path.join(p.work, 'publish.md')
	const notes = fs.existsSync(notesFile) ? fs.readFileSync(notesFile, 'utf8').trim() : ''
	const size = (fs.statSync(video).size / 1e6).toFixed(1)
	return [
		MARKER,
		`### What changed in the app`,
		`**[Watch the ${minutes(mediaDuration(video))} walkthrough](${link})** · 1080p · ${size} MB`,
		'',
		notes,
		'',
		covered.length ? `**On screen**\n${covered.join('\n')}` : '',
		'',
		footer,
	].filter((line, k, all) => line !== '' || all[k - 1] !== '').join('\n')
}
