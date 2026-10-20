# `ui-walkthrough.config.json`

One file at the repo root tells the tool how to run your app. `uiw init` writes a starter. Every field is optional.

```json
{
	"app": "apps/web",
	"dev": "pnpm dev --port {port}",
	"install": "auto",
	"installCommand": "pnpm install --frozen-lockfile",
	"copy": ["apps/web/.env.local"],
	"ports": { "before": 3401, "after": 3402 },
	"signInPath": "/sign-in",
	"signedInCookie": "__session",
	"viewport": { "width": 1280, "height": 720 },
	"brand": "Acme",
	"repoLabel": "acme / web",
	"accent": "#a3361f",
	"voice": { "provider": "auto", "deepgram": "aura-2-thalia-en" },
	"notes": "docs/ui-walkthrough-notes.md"
}
```

| Field | Default | Meaning |
|---|---|---|
| `app` | `"."` | Folder of the web app, relative to the repo root. The dev command runs there. |
| `dev` | `"npm run dev -- --port {port}"` | Starts the dev server. `{port}` is replaced and `PORT` is also set. It must only serve the app: nothing that deploys, migrates or syncs a shared backend. |
| `install` | `"auto"` | `"clone"`: copy-on-write clone this checkout's `node_modules` (near-instant, no extra disk on APFS/btrfs/xfs). `"install"`: run `installCommand` in each copy. `"auto"`: clone, unless the commit's lockfile differs from this checkout's. |
| `installCommand` | `"npm ci"` | Used when installing. |
| `copy` | `[]` | Files that aren't in git but the app needs (env files), relative to the root. |
| `ports` | `3401` / `3402` | Ports for the before and after servers. |
| `signInPath` | `"/sign-in"` | Where `uiw sign-in` opens. Sign-in is done when the browser is back on the app, away from this path, for 3 seconds. |
| `signedInCookie` | none | Also wait for this cookie (e.g. Clerk's `__session`, NextAuth's `next-auth.session-token`). |
| `viewport` | 1280×720 | Browser size. Keep 1280×720: it fills a 1080p frame with readable text, and frames are captured at 2x. |
| `brand` | repo folder name | Name on the title card, footer and outro. |
| `repoLabel` | from `origin` | Shown on the title card, e.g. `acme / web`. |
| `accent` | `#2563eb` | Colour of the After label, list numbers and progress bar. |
| `voice` | auto | See below. |
| `notes` | none | A Markdown file of this repo's own rules for the agent. Start from `notes-template.md`. |
| `auth` | none | How unattended runs sign the test user in: `{ "provider": "clerk", "emailEnv": "UI_WALK_TEST_EMAIL" }` or `{ "command": "…" }`. See `ci.md`. |
| `publish` | `{ "release": "ui-walkthrough-videos" }` | The GitHub release that holds the videos. |

`manifest.json` can override `brand`, `repoLabel` and `accent` for one video.

## Voice

`uiw init` asks which voice to use (or takes `--voice free|deepgram`) and writes it here; `uiw doctor` shows which voice will be used and whether its key was found.

`voice.provider` is `auto`, `deepgram`, `kokoro`, `openai` or `say`. **`auto` uses Deepgram when `DEEPGRAM_API_KEY` is set, and Kokoro otherwise**, so a voice works with no setup at all.

| Provider | Needs | Voice setting | Notes |
|---|---|---|---|
| `deepgram` | `DEEPGRAM_API_KEY` | `voice.deepgram` in the config (`uiw init` writes Thalia, `aura-2-thalia-en`, unless you pick another), else `DEEPGRAM_TTS_MODEL`, else Thalia | The most natural. A few cents a video. Others: Andromeda, Helena, Apollo, Orion, Zeus, … (`uiw voices --deepgram`). |
| `kokoro` | Nothing. The first run downloads the voice (~90 MB, plus ~300 MB of runtime) into the cache folder. | `voice.kokoro` (default `am_echo`) | Free, local, offline after the first run. Other voices: `af_heart`, `af_sarah`, `am_michael`, `am_onyx`, `bm_george`, … |
| `openai` | `OPENAI_API_KEY` | `voice.openai` (default `alloy`), model `gpt-4o-mini-tts` | Follows `narration.json` `style`. Only when chosen by name. |
| `say` | macOS | `voice.say` (default `Samantha`) | Robotic. Only when chosen by name. |

Keys are read from the environment, then `.env` / `.env.local` at the root and in `app`. They go only to their own provider and never onto a command line. `narration.json` can carry a `voice` object to override these for one video.

### Choosing a voice

`uiw voices` says the same line in all 28 Kokoro English voices and saves them as MP3s in `.ui-walkthrough/voice-samples/kokoro/` (about 4 minutes). `uiw voices --deepgram` does the same for Deepgram's Aura-2 voices (needs the key). `--text "..."` uses your own line, and voice names after the command limit it to those. Then set `voice.kokoro` or `voice.deepgram` in the config.

## Environment variables

| Variable | Meaning |
|---|---|
| `UI_WALK_HOME` | Where before/after copies go (default: OS temp folder). |
| `UI_WALK_CACHE` | Where Playwright is installed if the repo has none (default: the plugin data folder, else `~/.cache/ui-walkthrough`). |
| `HYPERFRAMES_WORKERS` | Render workers (default 3: fastest on an 8 GB laptop; more ran out of memory). |
