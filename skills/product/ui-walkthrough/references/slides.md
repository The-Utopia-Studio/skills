# `manifest.json`: the slides

```json
{
	"pr": 122,
	"captionFixes": { "Acme OS": "AcmeOS", "one twenty two": "122" },
	"slides": [
		{ "type": "intro", "title": "Hide reports from one user", "date": "Merged 5 October 2026", "audio": "audio-00.wav" },
		{
			"type": "compare",
			"title": "Admin: the user's permissions",
			"url": "localhost / admin / users / test-user",
			"before": "before-01.mp4",
			"after": "after-01.mp4",
			"crop": { "x": 28, "y": 0, "width": 760, "height": 720 },
			"audio": "audio-01.wav"
		},
		{ "type": "clip", "title": "User: Reports is gone", "src": "after-05.mp4", "audio": "audio-02.wav" },
		{ "type": "list", "title": "Also in this PR", "items": ["Exports respect the setting", "Old links show not found"], "audio": "audio-03.wav" },
		{ "type": "text", "title": "Reports, per user", "subtitle": "Settings → Users → Permissions", "audio": "audio-04.wav" },
		{ "type": "outro" }
	]
}
```

`audio-NN.wav` is line NN of `narration.json` (counting from 00). Slides without `audio` are silent.

## Slide types

| Type | Fields | Shows |
|---|---|---|
| `intro` | `title`, `subtitle?`, `date?` | Title card with the repo and PR number |
| `compare` | `before`, `after`, `title?`, `url?`, `crop?`, `layout?` | Two recordings with Before and After labels above them |
| `clip` | `src`, `title?`, `label?` (default "After"; `""` for none), `url?`, `crop?` | One recording in a browser window |
| `list` | `title`, `items` | Numbered points: what couldn't be filmed, side effects |
| `text` | `title`, `subtitle?` | A statement, e.g. the summary |
| `image` | `src`, `title?` | A still image (a screenshot from somewhere you couldn't film) |
| `outro` | — | Brand name |

Every slide also takes `audio`, `durationInSeconds` (a minimum; usually leave it out) and `speed: false` (never speed this slide's recordings up).

## Timing

- A slide lasts as long as its narration (+0.25 s), or its `durationInSeconds`, whichever is longer. Silent slides default to 3–5 s, or last exactly their `durationInSeconds` when it is set.
- A recording longer than that is **sped up to fit**, up to `maxSpeed` (top level, default 1.8). Past that, the slide grows instead, and the check names the recording as too fast. Both sides of a `compare` are fitted separately, so they end together.
- A recording shorter than its slide holds its last frame.

## Framing

- `url` is shown in the window's address bar. Keep it short.
- `crop` (`x`, `y`, `width`, `height`, in the tour's CSS pixels) zooms in on part of a recording, applied to both sides of a comparison. Make sure it keeps the controls the narration talks about.
- `layout` (`compare`): `"side"` or `"stack"` (Before above After). By default, crops wider than about 2:1 stack and everything else sits side by side.

## Captions

Captions come from transcribing the narration locally with whisper. It spells names by ear: after a render, the check prints the caption words that differ from `narration.json` (numbers said in words and shown as digits count as the same). Add `captionFixes` (plain text replacements, applied in order) for the misheard ones. `check/captions.txt` has every line.

## Branding

`brand`, `repoLabel` and `accent` come from `ui-walkthrough.config.json` and can be overridden here for one video.
