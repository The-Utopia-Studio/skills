# A video for every merged PR (GitHub Actions)

`examples/github-action.yml` films every merged PR that touched the UI and comments on the PR with a link:

```
PR merged ─▶ checkout, install, ffmpeg, Chromium
          ─▶ prepare · serve · auth            (plain steps)
          ─▶ Claude plans: narration, tour,     (claude-code-action)
             slides, publish note — or skip.txt
          ─▶ make                               (plain step, 15–25 min)
          ─▶ publish: release asset + PR comment
```

Claude only plans. Recording and rendering run as ordinary steps, because they take longer than an agent's command timeout and need no judgement.

## One-time setup

1. **Commit `ui-walkthrough.config.json`** with an `auth` section (below) and a `notes` file.
2. **Create a test user** your app knows, with access to the screens you want filmed. Seed or keep test data it can see.
3. **Add repository secrets:**

	| Secret | What |
	|---|---|
	| `ANTHROPIC_API_KEY` | For the planning step (or `claude_code_oauth_token`; see the [action's docs](https://github.com/anthropics/claude-code-action)) |
	| `DEEPGRAM_API_KEY` | Optional: the Deepgram voice. Without it, videos use the free Kokoro voice. |
	| `UI_WALK_APP_ENV` | The whole env file your dev server needs, pointing at a **development** backend |
	| whatever `auth` needs | e.g. `UI_WALK_CLERK_SECRET_KEY` (development instance) |

	And a variable `UI_WALK_TEST_EMAIL` (or put the address in the config).
4. **Copy the workflow** to `.github/workflows/ui-walkthrough.yml`. Set the branch, `paths`, install command and env file location for your repo.

## `auth`: signing in without a person

```json
"auth": { "provider": "clerk", "emailEnv": "UI_WALK_TEST_EMAIL" }
```

**Clerk** (development instances only, `sk_test_` / `pk_test_` keys): `uiw auth` looks up the test user with the Backend API, mints a one-time sign-in token, and opens your sign-in page with it, plus a Clerk testing token so bot protection lets the browser through. No password is stored anywhere. Reads `CLERK_SECRET_KEY` and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (rename with `secretKeyEnv` / `publishableKeyEnv`).

**Anything else:**

```json
"auth": { "command": "node scripts/walkthrough-sign-in.mjs" }
```

Your script signs in however your app allows for a test user (a test-only login route, a seeded password from secrets, a magic link read from a test inbox) and writes a Playwright `storageState` JSON to `$UI_WALK_SESSION`. `$UI_WALK_BASE_URL` is the app's address.

## Where the video goes

`uiw publish` uploads `pr-<n>-walkthrough.mp4` to one pre-release (tag `ui-walkthrough-videos`; change with `"publish": { "release": "…" }`) and comments on the PR:

> ### What changed in the app
> **Watch the 2:16 walkthrough** · 1080p · 13.8 MB
>
> *(Claude's note: what it covers, what it left out, which test records it used)*
>
> **On screen**: the slide titles

In a private repository, release assets are only visible to people with access to the repo. Re-running replaces the asset and edits the same comment. When Claude decides there is nothing to film, it writes `skip.txt` and the comment says why.

## Re-running

**Actions → UI walkthrough video → Run workflow**, with the PR number. Clips, voice lines and transcripts are not cached between runs (each run starts clean), so a re-run films everything again.

## Cost and time

On `ubuntu-latest`, roughly 20–35 minutes per PR: install 2–5, prepare 1–3, planning 5–10, recording 5–8, render 5–8. Planning is the only Claude usage, and runs on Sonnet (`--model sonnet` in the workflow; the skill asks for Sonnet too). The voice costs a few cents.

## Safety

- **Development data only:** the env file and auth must point at a development backend, never production.
- **One run at a time, none dropped:** the `queue` job waits for every earlier run of the workflow, so videos never film the same test data together, and PRs that merge while a video is being made wait their turn. It checks every unfinished run, however many there are, and a run still waiting after five hours queues a fresh run for its PR instead of being skipped (this is why the workflow needs `actions: write`). On top of the queue, the video job has its own concurrency lock, so two videos can never film at once even if a run skips the queue (for example an old run re-run from the Actions tab). (A single shared `concurrency` group would keep only one waiting run and silently drop the rest.)
- **A locked-down planner:** the Claude step reads PR text and app pages, which anyone opening a PR can influence. So it gets no secrets in its environment, can write only the PR's plan folder, can run only the `uiw` CLI (`uiw changes`, `uiw inspect` and `uiw check-tour` to plan and check), and can't read env files, the saved sign-in or other processes. The repo's env file is deleted once the servers have started. Tour pages must be `http(s)` and slide media must be plain file names in the PR's folder.
- **Pinned actions:** every action is pinned to a full commit SHA, so the code trusted with your keys changes only when you change the workflow.
- **Undo steps:** clips that change data undo it in `teardown`, which runs even when filming fails. Check the run log for `TEARDOWN FAILED`.
- **Not reviewed:** no person sees the video before it is posted, and the comment says so.
