// Run: node --test skills/ui-walkthrough/scripts/test/
import assert from 'node:assert/strict'
import test from 'node:test'
import { routeOf, visibleText } from '../lib/changes.mjs'
import { captionDiffs } from '../lib/check.mjs'
import { tooFast } from '../lib/compose.mjs'
import { targetsOf } from '../lib/inspect.mjs'
import { checkPlan } from '../lib/plan-check.mjs'

// Playwright's aria snapshot of a small page.
const TREE = `- banner:
  - navigation "Main":
    - link "People":
      - /url: /people
- main:
  - heading "People" [level=1]
  - paragraph: Some "quoted" text
  - button "Save"
  - button "Save draft"
  - button "Invite" [disabled]
  - button
  - checkbox "Active" [checked]
  - text: Search
  - searchbox "Search"
  - list:
    - listitem:
      - button "Edit"
    - listitem:
      - button "Edit"
  - dialog "Confirm":
    - button "OK"
  - table "Fellows":
    - rowgroup:
      - row "x":
        - cell "x"`

test('targets keep controls, headings and their landmarks, and drop text', () => {
	const rows = targetsOf(TREE)
	assert.deepEqual(rows, [
		'banner:',
		'  navigation "Main":',
		'    link "People"  → /people',
		'main:',
		'  heading "People"  [level=1]',
		'  button "Save"  needs exact: true',
		'  button "Save draft"',
		'  button "Invite"  [disabled]',
		'  checkbox "Active"  [checked]',
		'  searchbox "Search"',
		'  button "Edit"  nth 0 of 2',
		'  button "Edit"  nth 1 of 2',
		'  dialog "Confirm":',
		'    button "OK"',
		'  table "Fellows":',
		'(1 button without a name: target by label, text, testId or selector)',
	])
})

test('targets read escaped quotes in names', () => {
	assert.deepEqual(targetsOf('- button "Say \\"hi\\""'), ['button "Say \\"hi\\""'])
})

test('visible text: JSX text, text props and sentence strings', () => {
	assert.deepEqual(visibleText('<Button>Bypass onboarding</Button>'), ['Bypass onboarding'])
	assert.deepEqual(visibleText('  aria-label="Close dialog"'), ['Close dialog'])
	assert.deepEqual(visibleText("  title: 'Stipends & Compute',"), ['Stipends & Compute'])
	assert.deepEqual(visibleText('            Continue onboarding to unlock Home'), ['Continue onboarding to unlock Home'])
	assert.deepEqual(visibleText('  const empty = `No fellows match ${query}`'), ['No fellows match …'])
})

test('visible text skips class lists, imports, paths and code', () => {
	assert.deepEqual(visibleText('<div className="flex items-center gap-2 md:grid">'), [])
	assert.deepEqual(visibleText("import { Button } from '@/components/ui/button'"), [])
	assert.deepEqual(visibleText("  router.push('/fellow/library')"), [])
	assert.deepEqual(visibleText('  const isOpen = useState(false);'), [])
	assert.deepEqual(visibleText('  if (status === "paused") return null'), [])
})

test('routes from Next.js, pages and SvelteKit files', () => {
	assert.equal(routeOf('apps/web/app/fellow/library/[slug]/page.tsx', 'apps/web'), '/fellow/library/[slug]')
	assert.equal(routeOf('apps/web/app/(admin)/admin/page.tsx', 'apps/web'), '/admin')
	assert.equal(routeOf('apps/web/app/page.tsx', 'apps/web'), '/')
	assert.equal(routeOf('apps/web/app/admin/layout.tsx', 'apps/web'), '/admin/* (layout)')
	assert.equal(routeOf('src/pages/settings/index.tsx'), '/settings')
	assert.equal(routeOf('src/pages/_app.tsx'), null)
	assert.equal(routeOf('src/routes/(app)/team/+page.svelte'), '/team')
	assert.equal(routeOf('apps/web/components/fellow/fellow-library-home.tsx', 'apps/web'), null)
	assert.equal(routeOf('packages/ui/app/page.tsx', 'apps/web'), null)
})

// --- check-plan, caption differences, recordings at full speed ---------------

const PLAN = () => ({
	narration: { slides: ['Hello.', 'The list moved.', 'That is all.'] },
	tour: {
		clips: [
			{ id: 'before-01', side: 'before', steps: [{ goto: '/a' }] },
			{ id: 'after-01', steps: [{ goto: '/a' }] },
		],
	},
	manifest: {
		slides: [
			{ type: 'intro', title: 'T', audio: 'audio-00.wav' },
			{ type: 'compare', before: 'before-01.mp4', after: 'after-01.mp4', audio: 'audio-01.wav' },
			{ type: 'text', title: 'Done', audio: 'audio-02.wav' },
			{ type: 'outro' },
		],
	},
})

test('a consistent plan passes', () => {
	assert.deepEqual(checkPlan(PLAN()), { errors: [], warnings: [] })
})

test('plan errors: missing narration line, unknown clip, wrong side, unknown type', () => {
	const plan = PLAN()
	plan.manifest.slides[2].audio = 'audio-05.wav'
	plan.manifest.slides.push({ type: 'clip', src: 'after-09.mp4' }, { type: 'video', src: 'x' })
	delete plan.tour.clips[0].side
	const { errors } = checkPlan(plan)
	assert.equal(errors.length, 4, errors.join('\n'))
	assert.match(errors.join('\n'), /audio-05\.wav needs narration line 5/)
	assert.match(errors.join('\n'), /after-09\.mp4 is not a clip/)
	assert.match(errors.join('\n'), /before-01 is shown as Before but films the new version/)
	assert.match(errors.join('\n'), /unknown type/)
})

test('plan warnings: unheard line, unshown clip, pair with different steps, crop past the edge', () => {
	const plan = PLAN()
	plan.narration.slides.push('Never used.')
	plan.tour.clips.push({ id: 'after-02', steps: [] })
	plan.tour.clips[1].steps.push({ wait: 1 })
	plan.manifest.slides[1].crop = { x: 900, y: 0, width: 600, height: 300 }
	const { errors, warnings } = checkPlan(plan)
	assert.deepEqual(errors, [])
	assert.equal(warnings.length, 4, warnings.join('\n'))
})

test('files already in the folder count as recordings and audio', () => {
	const plan = PLAN()
	plan.manifest.slides.push({ type: 'clip', src: 'screen.mp4', audio: 'intro.wav' }, { type: 'image', src: 'shot.png' })
	const exists = (name) => ['screen.mp4', 'intro.wav', 'shot.png'].includes(name)
	assert.deepEqual(checkPlan({ ...plan, exists }).errors, [])
})

test('caption differences: only the misheard words', () => {
	assert.deepEqual(captionDiffs('Prices are in Qatari riyals now.', 'Prices are in Qatari reels now.'), [{ said: 'riyals', heard: 'reels' }])
	assert.deepEqual(captionDiffs('Welcome to UtopiaOS.', 'Welcome to Utopia OS.'), [{ said: 'UtopiaOS', heard: 'Utopia OS' }])
	assert.deepEqual(captionDiffs("The fellow's read-only view, at last!", 'The fellows read only view at last'), [])
})

test('numbers said in words match digits in captions', () => {
	assert.deepEqual(captionDiffs('This is PR one twenty two.', 'This is PR 122.'), [])
	assert.deepEqual(captionDiffs('Fifty percent off.', 'Fifty % off.'), [])
})

test('too fast: recordings at the limit that still run long', () => {
	const timeline = [
		{ index: 0, voice: 4, videos: [{ name: 'a.mp4', length: 6, wanted: 6 / 4.25, speed: 6 / 4.25 }] },
		{ index: 1, voice: 4, videos: [{ name: 'b.mp4', length: 12, wanted: 12 / 4.25, speed: 1.8 }] },
	]
	const fast = tooFast(timeline, 1.8)
	assert.equal(fast.length, 1)
	assert.equal(fast[0].name, 'b.mp4')
	assert.equal(fast[0].slide, 2)
	assert.ok(Math.abs(fast[0].over - (12 / 1.8 - 4.25)) < 1e-9)
})
