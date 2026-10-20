// The step language a tour is written in, and the on-screen cursor, click
// ripple and highlight box that make a headless recording readable.
// Format: references/tour.md.

import { sleep, webUrl } from './util.mjs'

// Headless Chrome draws no pointer, so the page draws one. Its position
// survives full page loads through sessionStorage.
export const CURSOR_SCRIPT = `
(() => {
	if (window.__uiwCursor) return
	window.__uiwCursor = true
	const put = (el, x, y) => { el.style.transform = 'translate(' + x + 'px,' + y + 'px)' }
	const mount = () => {
		const dot = document.createElement('div')
		Object.assign(dot.style, {
			position: 'fixed', left: '-11px', top: '-11px', width: '22px', height: '22px', borderRadius: '50%',
			background: 'rgba(250, 204, 21, 0.6)', border: '2px solid rgba(24, 24, 27, 0.85)',
			boxShadow: '0 1px 5px rgba(0,0,0,0.25)', pointerEvents: 'none', zIndex: '2147483647',
		})
		const last = JSON.parse(sessionStorage.getItem('__uiwCursor') || 'null')
		if (last) put(dot, last.x, last.y)
		document.documentElement.appendChild(dot)
		addEventListener('mousemove', (e) => {
			put(dot, e.clientX, e.clientY)
			sessionStorage.setItem('__uiwCursor', JSON.stringify({ x: e.clientX, y: e.clientY }))
		}, true)
		addEventListener('mousedown', (e) => {
			const ring = document.createElement('div')
			Object.assign(ring.style, {
				position: 'fixed', left: e.clientX - 24 + 'px', top: e.clientY - 24 + 'px', width: '48px', height: '48px',
				borderRadius: '50%', border: '3px solid rgba(250, 204, 21, 0.95)', pointerEvents: 'none',
				zIndex: '2147483646', transform: 'scale(0.4)', transition: 'transform 450ms ease-out, opacity 450ms ease-out',
			})
			document.documentElement.appendChild(ring)
			requestAnimationFrame(() => { ring.style.transform = 'scale(1.4)'; ring.style.opacity = '0' })
			setTimeout(() => ring.remove(), 600)
		}, true)
	}
	if (document.documentElement) mount()
	else addEventListener('DOMContentLoaded', mount)
})()
`

// "/text/i" in a tour means a regular expression.
export function matcher(value) {
	if (typeof value === 'string' && value.length > 2 && value.startsWith('/') && value.lastIndexOf('/') > 0) {
		const end = value.lastIndexOf('/')
		return new RegExp(value.slice(1, end), value.slice(end + 1))
	}
	return value
}

// A target is a Playwright selector string or one of
// { role, name } | { text } | { label } | { placeholder } | { testId } | { selector },
// optionally with exact, nth and within (another target to search inside).
export function locate(scope, target) {
	if (typeof target === 'string') return scope.locator(target).first()
	const base = target.within ? locate(scope, target.within) : scope
	let loc
	if (target.role) loc = base.getByRole(target.role, { ...(target.name !== undefined && { name: matcher(target.name) }), ...(target.exact !== undefined && { exact: target.exact }) })
	else if (target.text !== undefined) loc = base.getByText(matcher(target.text), { exact: target.exact })
	else if (target.label !== undefined) loc = base.getByLabel(matcher(target.label), { exact: target.exact })
	else if (target.placeholder !== undefined) loc = base.getByPlaceholder(matcher(target.placeholder))
	else if (target.testId !== undefined) loc = base.getByTestId(target.testId)
	else if (target.selector) loc = base.locator(target.selector)
	else throw new Error(`Cannot find an element from ${JSON.stringify(target)}`)
	return target.nth !== undefined ? loc.nth(target.nth) : loc.first()
}

const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2)

// Runs steps on a page. live: paced for the camera; otherwise as fast as possible.
export function stepRunner(page, { live, viewport, pause = 0.8 }) {
	const mouse = { x: viewport.width / 2, y: viewport.height / 2 }

	async function moveTo(x, y) {
		if (live) {
			const from = { ...mouse }
			const frames = Math.max(12, Math.min(45, Math.round(Math.hypot(x - from.x, y - from.y) / 18)))
			for (let k = 1; k <= frames; k++) {
				const t = easeInOut(k / frames)
				await page.mouse.move(from.x + (x - from.x) * t, from.y + (y - from.y) * t)
				await sleep(0.012)
			}
		} else {
			await page.mouse.move(x, y)
		}
		Object.assign(mouse, { x, y })
	}

	async function pointAt(loc, timeout = 20) {
		await loc.waitFor({ state: 'visible', timeout: timeout * 1000 })
		await loc.scrollIntoViewIfNeeded()
		const box = await loc.boundingBox()
		if (!box) throw new Error('The element is not on screen')
		await moveTo(box.x + box.width / 2, box.y + box.height / 2)
	}

	async function press() {
		if (live) await sleep(0.25)
		await page.mouse.down()
		await page.mouse.up()
	}

	async function highlight(loc, seconds) {
		await loc.waitFor({ state: 'visible', timeout: 20_000 })
		await loc.evaluate((el, ms) => {
			const r = el.getBoundingClientRect()
			const box = document.createElement('div')
			Object.assign(box.style, {
				position: 'fixed', left: r.left - 6 + 'px', top: r.top - 6 + 'px', width: r.width + 12 + 'px', height: r.height + 12 + 'px',
				borderRadius: '10px', border: '3px solid #facc15', boxShadow: '0 0 0 4000px rgba(24,24,27,0.16)',
				pointerEvents: 'none', zIndex: '2147483645', opacity: '0', transition: 'opacity 250ms',
			})
			document.documentElement.appendChild(box)
			requestAnimationFrame(() => (box.style.opacity = '1'))
			setTimeout(() => { box.style.opacity = '0'; setTimeout(() => box.remove(), 300) }, ms)
		}, seconds * 1000)
		await sleep(seconds + 0.3)
	}

	const isOn = (loc) =>
		loc.evaluate((el) => el.getAttribute('aria-checked') === 'true' || el.getAttribute('aria-pressed') === 'true' || el.checked === true)

	const actions = {
		goto: (s, base) => page.goto(webUrl(new URL(s.goto, base)), { waitUntil: 'domcontentloaded' }),
		waitFor: (s) => locate(page, s.waitFor).waitFor({ state: 'visible', timeout: (s.timeout ?? 30) * 1000 }),
		waitForHidden: (s) => locate(page, s.waitForHidden).waitFor({ state: 'hidden', timeout: (s.timeout ?? 30) * 1000 }),
		click: async (s) => (await pointAt(locate(page, s.click), s.timeout), press()),
		hover: (s) => pointAt(locate(page, s.hover), s.timeout),
		scrollTo: async (s) => {
			const loc = locate(page, s.scrollTo)
			await loc.waitFor({ state: 'attached', timeout: 20_000 })
			await loc.evaluate((el, smooth) => el.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant', block: 'center' }), live)
			await sleep(live ? 1 : 0.3)
		},
		scroll: async (s) => {
			// The page itself, or the first inner panel that scrolls.
			await page.evaluate((dy) => {
				const doc = document.scrollingElement
				const panel = [...document.querySelectorAll('main, [data-scroll], body *')].find(
					(n) => n.scrollHeight > n.clientHeight + 40 && /(auto|scroll)/.test(getComputedStyle(n).overflowY)
				)
				const target = doc && doc.scrollHeight > doc.clientHeight + 40 ? window : panel || window
				target.scrollBy({ top: dy, behavior: 'smooth' })
			}, s.scroll)
			await sleep(live ? 1 : 0.3)
		},
		highlight: (s) => highlight(locate(page, s.highlight), s.for ?? 1.5),
		type: async (s) => {
			const loc = locate(page, s.into)
			await pointAt(loc, s.timeout)
			await loc.click()
			await loc.pressSequentially(s.type, { delay: live ? 55 : 0 })
		},
		ensure: async (s) => {
			const loc = locate(page, s.ensure)
			await loc.waitFor({ state: 'visible', timeout: (s.timeout ?? 20) * 1000 })
			const want = s.on !== false
			if ((await isOn(loc)) === want) return
			await pointAt(loc, s.timeout)
			await press()
			const deadline = Date.now() + 15_000
			while ((await isOn(loc)) !== want) {
				if (Date.now() > deadline) throw new Error(`The switch did not turn ${want ? 'on' : 'off'}`)
				await sleep(0.2)
			}
		},
		select: async (s) => {
			const loc = locate(page, s.select)
			await pointAt(loc, s.timeout)
			if (await loc.evaluate((el) => el.tagName === 'SELECT')) {
				await loc.selectOption({ label: s.option }).catch(() => loc.selectOption(s.option))
				return
			}
			await press()
			if (live) await sleep(0.6)
			await pointAt(page.getByRole('option', { name: matcher(s.option) }).first())
			await press()
		},
		press: (s) => page.keyboard.press(s.press),
		wait: (s) => sleep(s.wait),
	}

	return async function run(step, baseUrl) {
		// An optional step (a banner that may not appear) never fails the clip.
		if (step.optional) {
			try {
				await run({ ...step, optional: false, timeout: step.timeout ?? 4 }, baseUrl)
			} catch {}
			return
		}
		const kind = Object.keys(actions).find((k) => step[k] !== undefined)
		if (!kind) throw new Error(`Unknown step ${JSON.stringify(step)}`)
		await actions[kind](step, baseUrl)
		const after = step.pause ?? (live && kind !== 'wait' ? pause : 0)
		if (after) await sleep(after)
	}
}
