# Configure walkthrough-video for an app

Everything app-specific lives in two places in the app's own repo: `walkthrough-video.config.json` at the root, and the flow files you write. The skill's scripts stay untouched.

## 1. The config file

Copy [`walkthrough-video.config.example.json`](../walkthrough-video.config.example.json) to the app's repo root as `walkthrough-video.config.json`, and add `.walkthrough-video/` to `.gitignore` (takes, frames and the signed-in Chrome profile go there).

| Key | Default | What it is |
|---|---|---|
| `baseUrl` | `http://localhost:3000` | Where the demo copy of the app runs. |
| `startPath` | `/` | First page, when a flow has no `prepare`. |
| `signInPath` | `/sign-in` | Where `signin.mjs` opens Chrome. |
| `authPaths` | `["/sign-in", "/sign-up", "sso-callback"]` | Paths that still count as "signing in". `signin.mjs` waits until the browser is on the app's host and off all of these. |
| `app` | `.` | Folder with the app's `package.json` and `.env.local`; Playwright is resolved from here (a monorepo's root `node_modules` works too). |
| `viewport` | `1420×799` | CSS size the page lays out at. Keep 16:9. |
| `output` | `1920×1080 @ 30` | Video size and frame rate. Chrome renders at `output.width / viewport.width` device pixels, so frames need no enlarging. |
| `zoom` | `1` | Camera zoom on form fields. `1` shows the screen exactly as a user sees it; `1.3` eases in on each field. A flow can override it. |
| `brand` | neutral | `name` (used by the template's cards), `background`, `text`, `muted`, `accent`: title cards, click ripple, sample documents and padding. Use the app's own palette. |
| `voice.deepgram` | `aura-2-thalia-en` | Any Deepgram Aura-2 voice. |
| `workDir` | `.walkthrough-video` | Where takes and the Chrome profile go. |

If the repo already has `ui-walkthrough.config.json`, its `signInPath`, `app`, `accent`, `brand` (as `brand.name`) and `voice.deepgram` are used, so PR videos and tours share one voice. Keys in `walkthrough-video.config.json` win. Only Deepgram is supported for narration here; ui-walkthrough's free Kokoro voice is not.

The Deepgram key is read from `DEEPGRAM_API_KEY` in the environment, then from `<app>/.env.local`, then the repo root's `.env.local`. The person adds it themselves.

## 2. A safe copy to record in

The video is public in all but name, so it must never show real people, real accounts or production data. What has worked:

1. **A throwaway worktree**: `git worktree add --detach <scratch>/wt origin/<branch>`, install, and copy the env file minus anything that points at production services (database, analytics, CRM, email, payments).
2. **An empty local backend**, started from the worktree. Many hosted backends have a local or anonymous dev mode; use it.
3. **A demo flag** (e.g. `DEMO_MODE=on`, and a public twin for the browser) that stubs every check the flow would make against an outside service: file storage accepts the upload and returns a fake link, "have you joined Slack?" returns yes, document verification passes. Apply the stubs with a small patch script run against the worktree only, never committed to the app.
4. **A seed function** that turns the one signed-in user into a fresh fake user (name, company, role), so the take starts exactly where a new user would.
5. **Snapshot and restore**: export the seeded backend once, and restore it before every take and every dry run.
6. **Mid-take events**: if a step waits on something the user does elsewhere (accepting an invite, paying), have the scene call a backend function that records it, instead of filming another app.

## 3. The flow

Copy [`flows/template.mjs`](../flows/template.mjs) to e.g. `walkthroughs/<name>.mjs` in the app's repo. The default export gets `{ config, env, see, button, link, action }` and returns `{ scenes, prepare?, zoom? }`.

```bash
node <skill>/scripts/signin.mjs                                  # once; the person signs in
DRY=1 node <skill>/scripts/record.mjs walkthroughs/<name>.mjs    # rehearse until DRY RUN OK
node <skill>/scripts/record.mjs walkthroughs/<name>.mjs          # the take
node <skill>/scripts/reassemble.mjs .walkthrough-video/take-<name>   # re-render only
```

Environment: `DRY=1`, `MAX_SCENES=n`, `ZOOM`, `OUT_DIR`, `OUTPUT`, `PROFILE`, `CONFIG` (path to a config file), plus anything your flow reads from `env`.

## 4. Installing the result

Put the MP4 and its `.en.vtt` where the app serves media, and a poster frame (`ffmpeg -ss 3 -i out.mp4 -frames:v 1 poster.jpg`). Load captions with `<track kind="captions" srclang="en" default>`. Then stop the servers and remove the worktree and `.walkthrough-video/chrome-profile`.
