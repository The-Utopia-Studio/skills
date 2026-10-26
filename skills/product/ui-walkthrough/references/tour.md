# `tour.json`: what to film

`prepare` writes a starter with the server addresses filled in. You add the clips.

```json
{
	"baseUrl": "http://localhost:3402",
	"beforeUrl": "http://localhost:3401",
	"cacheKey": "9f96c86a1b2c..47f5cc7d8e9f",
	"clips": [
		{
			"id": "before-01",
			"side": "before",
			"setup": [
				{ "goto": "/settings/team" },
				{ "click": { "role": "button", "name": "Accept necessary" }, "optional": true },
				{ "waitFor": { "role": "heading", "name": "Team" } }
			],
			"steps": [
				{ "scrollTo": { "text": "Permissions" } },
				{ "highlight": { "role": "table" }, "for": 3 },
				{ "hover": { "role": "checkbox", "nth": 1 }, "pause": 2 }
			]
		},
		{ "id": "after-01", "setup": ["…same as before-01…"], "steps": ["…same as before-01…"] }
	]
}
```

## Top level

| Field | Default | Meaning |
|---|---|---|
| `baseUrl` | after server | Where clips are filmed unless they say otherwise |
| `beforeUrl` | before server | Used by clips with `"side": "before"` |
| `cacheKey` | the PR's commits | Part of each clip's cache key, so one PR never reuses another's clips |
| `storageState` | `.ui-walkthrough/auth/session.json` | Session file, relative to this tour file, if you keep several (one per role) |
| `viewport` | config's (1280×720) | Browser size |
| `pause` | 0.8 | Seconds after each filmed step |
| `parallel` | 1 | Look-only clips filmed at once. Keep 1 on a laptop: three at once made each clip up to 2.5x slower on camera and saved no time. |
| `headless` | true | `false` to watch it film |

## Clip

| Field | Meaning |
|---|---|
| `id` | File name, `<id>.mp4`. Pair them as `before-NN` / `after-NN`. |
| `side` | `"before"` films the old version (`beforeUrl`). |
| `baseUrl` | Film against another address. `setupBaseUrl` / `teardownBaseUrl` do the same for those parts. |
| `setup` | Steps run fast, off camera: open the page, dismiss banners, scroll into place, and any state change the clip should open on. |
| `steps` | What the viewer sees, paced, with a drawn cursor and click ripples. |
| `teardown` | Steps that undo what `setup` or `steps` changed. They run off camera in a fresh session after filming, **even if the clip failed**. A failed teardown is reported loudly: fix the data by hand. |
| `changes` | `true` for a clip that changes data and undoes it on camera. Like clips with `teardown`, it is filmed alone, after the look-only clips, so no other clip films the temporary state. |
| `minDuration` | Hold the last frame until the clip is at least this long. Usually unnecessary: slides fit narration. |
| `settle` | Seconds to wait after setup (default 1.2) |
| `hold` | Seconds to hold at the end (default 0.8) |

## Steps

Every step takes `pause` (seconds after it), `timeout` (seconds to wait for its target) and `optional: true` (ignore failure, e.g. a banner that may not show).

| Step | Does |
|---|---|
| `{ "goto": "/path" }` | Load a page (relative to the clip's server; only http and https pages) |
| `{ "waitFor": target }`, `{ "waitForHidden": target }` | Wait for an element to appear or go away (e.g. a loading line) |
| `{ "click": target }` | Glide the cursor there, ripple, click |
| `{ "hover": target }` | Glide the cursor there |
| `{ "scrollTo": target }` | Smooth-scroll the element to the middle of the screen |
| `{ "scroll": 300 }` | Smooth-scroll the page (or its scrolling panel) by pixels; negative goes up |
| `{ "highlight": target, "for": 2 }` | Yellow box round the element, rest of the page dimmed slightly |
| `{ "ensure": target, "on": false }` | Set a switch or checkbox: clicks only if needed, waits until it changed. Prefer it to `click` for toggles. |
| `{ "select": target, "option": "Monthly" }` | Choose an option (native `<select>` or a listbox) |
| `{ "type": "text", "into": target }` | Type visibly. Only into fields that are never submitted. |
| `{ "press": "Escape" }` | Press a key |
| `{ "wait": 1.5 }` | Pause |

## Targets

Prefer what a person sees: role and name, label, text.

```json
{ "role": "switch", "name": "Email notifications" }
{ "role": "button", "name": "/^save/i" }
{ "label": "Currency" }
{ "text": "3 members", "exact": true }
{ "testId": "billing-card" }
{ "selector": "li:has-text(\"Invoices\"):not(:has(li))" }
{ "role": "button", "name": "Edit", "within": { "selector": "section.profile" } }
```

`"/…/flags"` is a regular expression. Without `nth`, the first match is used. `:has-text` matches the outermost element first; add `:not(:has(li))` (or similar) for the innermost.

## Example: a change in one place, seen in another

An admin hides an item; the end user no longer sees it. Film the user's page first (look-only clip), then:

```json
{
	"id": "after-05",
	"setup": [
		{ "goto": "/admin/users/test-user" },
		{ "ensure": { "role": "switch", "name": "Show Reports" }, "on": false },
		{ "goto": "/reports/q3" },
		{ "goto": "/home" }
	],
	"steps": [
		{ "scrollTo": { "text": "Your tools" } },
		{ "goto": "/reports/q3", "pause": 2.5 }
	],
	"teardown": [
		{ "goto": "/admin/users/test-user" },
		{ "ensure": { "role": "switch", "name": "Show Reports" }, "on": true }
	]
}
```

The `goto` to `/reports/q3` in `setup` is there to compile that page off camera, so the filmed visit loads at once.

## Tips

- **Inspect before writing.** `uiw inspect <n> <path>` lists each control as `role "name"`, which is `{ "role": "…", "name": "…" }` in a tour. `nth 1 of 2` means add `"nth": 1` (or use `within`); `needs exact: true` means another control's name contains this one, so add `"exact": true`.
- **Check before filming.** `uiw check-tour <n> [clip ids]` runs the tour fast without the camera, teardown included, and shows what the page offered when a step failed.
- **Same steps for a pair.** A before and after clip in one comparison should do the same things, so both sides move together.
- **Things re-mount.** After hiding and showing something, folds and accordions may close again: open them again.
- **Long clips get sped up** to fit their narration (up to 1.8x). Past that, cut `pause`s or split the clip.
