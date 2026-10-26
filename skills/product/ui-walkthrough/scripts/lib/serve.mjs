// serve: start (or stop) the before and after dev servers in the background,
// for terminals and CI. In Claude Code desktop, prefer preview_start with the
// launch.json entries `prepare` wrote.

import { spawn } from 'node:child_process'
import fs from 'node:fs'
import net from 'node:net'
import path from 'node:path'
import { paths } from './config.mjs'
import { devCommand } from './prepare.mjs'
import { readJson, sleep, writeJson } from './util.mjs'

function portOpen(port) {
	return new Promise((resolve) => {
		const socket = net.connect({ port, host: '127.0.0.1' })
		socket.once('connect', () => (socket.destroy(), resolve(true)))
		socket.once('error', () => resolve(false))
	})
}

export async function waitForPort(port, seconds = 300) {
	const deadline = Date.now() + seconds * 1000
	while (Date.now() < deadline) {
		if (await portOpen(port)) return true
		await sleep(1)
	}
	return false
}

export async function serve(config, pr, { stop = false } = {}) {
	const p = paths(config, pr)
	const pidFile = path.join(p.work, 'servers.json')
	const running = readJson(pidFile, {})
	if (stop) {
		for (const [side, pid] of Object.entries(running)) {
			try {
				process.kill(-pid, 'SIGTERM')
				console.log(`   stopped ${side} (pid ${pid})`)
			} catch {}
		}
		fs.rmSync(pidFile, { force: true })
		return
	}
	for (const side of ['before', 'after']) {
		const port = config.ports[side]
		if (await portOpen(port)) {
			console.log(`   ${side}: something is already listening on :${port}, using it`)
			continue
		}
		if (!fs.existsSync(p.copy(side))) throw new Error(`No ${side} copy; run prepare ${pr} first.`)
		const log = fs.openSync(path.join(p.work, `server-${side}.log`), 'a')
		const child = spawn('sh', ['-c', devCommand(config, side, p.copy(side))], {
			detached: true,
			stdio: ['ignore', log, log],
			env: { ...process.env, PORT: String(port) },
		})
		child.unref()
		running[side] = child.pid
		console.log(`   ${side}: starting on :${port} (log: ${path.relative(config.root, path.join(p.work, `server-${side}.log`))})`)
	}
	writeJson(pidFile, running)
	for (const side of ['before', 'after']) {
		if (!(await waitForPort(config.ports[side]))) throw new Error(`${side} server did not open :${config.ports[side]}; see its log.`)
	}
	console.log('   both servers are up')
}
