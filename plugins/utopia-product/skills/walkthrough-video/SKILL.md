---
name: walkthrough-video
description: Use when asked to make, redo or update a narrated demo, tutorial, onboarding or help video that tours a flow of a running web app, e.g. "record a video of signup through to the first project" or "make a help video for onboarding". Drives real Chrome with Playwright and outputs a 1080p MP4 with a smooth cursor, real typing and scrolling, eased zooms on form fields, title cards, an AI voiceover (Deepgram) and WebVTT captions. Not for videos of what a pull request changed or before/after comparisons; use ui-walkthrough for those.
---

# Walkthrough video

Records a real screen tour, not a slideshow. Playwright drives headless Chrome, every painted frame is captured over CDP at output resolution, and ffmpeg renders a 1920×1080, 30 fps H.264 file with the narration laid on scene by scene, eased camera zooms, fades and a caption file.

**This skill or ui-walkthrough?** ui-walkthrough films a merged PR before and after, for reviewers. This skill films one flow, told to the person who will use it: a new customer, a fellow, a support reader. If the request names a PR, a diff or "what changed", use ui-walkthrough.

## What you need

- The app running locally, Node 20+, Google Chrome, ffmpeg 6+ (`ffmpeg`, `ffprobe` on PATH), and `playwright` installed in the app (`npm i -D playwright`; it uses the installed Chrome).
- A `walkthrough-video.config.json` at the app's repo root: base URL, sign-in path, brand colours, voice. See [references/configure.md](references/configure.md). A repo that already has `ui-walkthrough.config.json` reuses its sign-in path, accent and Deepgram voice.
- `DEEPGRAM_API_KEY` in the environment or the app's `.env.local`. The person adds it themselves. Never ask for the key in chat, never print it. The default voice is Thalia (`aura-2-thalia-en`).

## The workflow

1. **Make a safe copy of the app.** Never record against real data or a real account: the video will be shown to people outside the team. Use a throwaway worktree with its own empty local backend, a seeded fake user, and external integrations (storage, Slack, payments, email) stubbed behind a demo flag. Snapshot the seeded state so every take starts from the same place. Patterns in [references/configure.md](references/configure.md#a-safe-copy-to-record-in).
2. **Sign in once, by the person.** `node <skill>/scripts/signin.mjs` opens real Chrome on the sign-in page and waits with no timeout until they are back on the app. Never type credentials for them. SSO works.
3. **Write the flow.** Copy [flows/template.mjs](flows/template.mjs) into the app's repo and write the scenes. Write all the narration first and read it aloud; then write the actions.
4. **Rehearse.** Restore the snapshot, then `DRY=1 node <skill>/scripts/record.mjs <flow.mjs>`. It runs every scene silently with no capture and stops at the first failure with `dry-fail.png`. Fix and repeat until it prints `DRY RUN OK`. `MAX_SCENES=3` records a short real test.
5. **Record.** Restore the snapshot again, then run without `DRY`. Output goes to `.walkthrough-video/<flow>.mp4` plus `<flow>.en.vtt`; the take folder keeps `session.json` so `scripts/reassemble.mjs <take dir>` re-renders camera, audio and captions without re-recording.
6. **Check it** (below), then put the MP4, VTT and a poster frame wherever the app serves help videos.

Fake documents for upload steps: `node <skill>/scripts/make-samples.mjs <dir> [docs.json]` renders images stamped "SAMPLE — NOT A REAL DOCUMENT".

## Writing the scenes

A flow returns `{ scenes, prepare? }`. A scene is `{ say, act, gap? }` and lasts as long as the longer of its narration and its actions, so narration and screen never drift apart.

Judgment that makes the difference:

- **One idea per scene, one or two sentences.** At Thalia's pace that is 4–10 seconds. A scene with three instructions in it means the viewer loses the cursor; split it.
- **Say the next action in the UI's own words.** "Select Agree and continue", with the label exactly as it appears. The viewer is matching your words to the screen.
- **Say what the screen can't.** Why a step exists, what happens next, what not to do ("please don't book travel yourself before it's approved"). Don't read out the values being typed.
- **Length.** One feature: 45–90 s. A full onboarding: 4–6 minutes, about 25–30 scenes. Past 6 minutes, split it into chapters.
- **Open and close on a title card** (`h.card`, `h.uncard`) in the app's own font. The first scene's narration plays over the card, then it fades to the app.
- **Fake data must look fake and plausible.** `example.com` emails, 555 phone numbers, an obviously invented person and company. Never a teammate's or customer's real name, email or account number.

Helpers on `h`: `click`, `type` (human-paced), `fill`, `select`, `upload`, `hover`, `reveal` (smooth scroll an element into view), `scrollBy` / `scrollTop` (let the viewer read a page), `card` / `uncard` (with optional looping `media`), `focus` / `wide` (manual camera), `sleep`, and `page` for anything Playwright can do. Form controls get an automatic zoom centred on the form column; buttons and links zoom back out. Flows also receive `see`, `button`, `link` and `action` locator helpers.

Use `action(page, "Open")` for in-page links and buttons: it anchors the name, so it won't also match the sidebar's "Open menu" the way `getByRole({ name: "Open" })` does.

## What good looks like

- `ffprobe -count_frames` shows 1920×1080, frame count within 1% of 30 × duration, and the audio stream the same length as the video (±0.2 s).
- A contact sheet (`ffmpeg -i out.mp4 -vf "fps=1/6,scale=480:-1,tile=4x6" sheet%d.jpg`) shows every scene on the right page, with no frame of a loading spinner, error toast or dev overlay. Look at it, don't assume.
- Full-resolution frames around every submit show no red validation text (a sign a click raced the form).
- Text is sharp at 100% zoom on a laptop screen; the cursor glides and never teleports; every zoom keeps the whole field row in frame.
- Captions line up with the voice within a sentence.

## Gotchas

- **Never let the recorded page open a tab.** An external link opened a tab, which shrank the headless viewport from 799 to 712 CSS px mid-take; the shorter frames were stretched to 1080 and everything after looked distorted. The overlay now blocks new tabs and `window.open`, the recorder refuses a take whose frame size changes, and assembly only scales uniformly.
- **Capture at output resolution** with Chrome's `--force-device-scale-factor=<outWidth/width>`. Playwright's `deviceScaleFactor` never reaches the CDP screencast, which then sends CSS-sized frames (1420×799) that must be enlarged and look soft. Check one captured frame's pixel size before a full take.
- **Keep the viewport at 1420×799** (16:9, under 800 tall) unless the app needs otherwise. Apps often switch layout at `max-height: 800px`; record the layout a laptop user actually sees.
- **Never feed `zoompan` variable-frame-rate input**: it drops and miscounts frames. Assembly renders a constant-rate master first, then zooms.
- `scale` with per-frame size feeding `crop` gives wrong framing. ffmpeg 7 removed `-filter_complex_script`; the graph is passed inline.
- **Always restore the snapshot before a take, dry runs included.** A second run against a half-finished account skips steps and the narration no longer matches.
- Dev overlays (Next.js's `nextjs-portal`) are hidden by the overlay; hide any other dev badge or cookie banner in `prepare`, choosing the least-tracking option.

## Examples

- [flows/template.mjs](flows/template.mjs): a four-scene "create your first project" tour to copy and rewrite.
- [examples/utopiaos-fellow-onboarding/](examples/utopiaos-fellow-onboarding/): the full UtopiaOS fellow onboarding tour, consent to home, 30 scenes: forms, uploads, a backend event faked mid-take, looping title-card media, and the demo setup behind it.
