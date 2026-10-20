# Worked example: UtopiaOS fellow onboarding

The fellow help video in UtopiaOS: a new fellow from the consent screen to their home, about six minutes in 30 scenes. It is the flow this skill was built on, kept here to show a long tour end to end. [`flow.mjs`](flow.mjs) is the real flow, with every typed value replaced by obviously fake data.

UtopiaOS is a Next.js app with a Convex backend and Clerk sign-in. Its repo is private, so the demo patch script it uses is not copied here; the steps below describe what it does, so the same pattern can be applied to another app.

## Config

UtopiaOS already has a `ui-walkthrough.config.json` (app folder `apps/web`, sign-in path, accent `#a3361f`, voice `aura-2-thalia-en`), so the only extra file is a small `walkthrough-video.config.json`:

```json
{
  "baseUrl": "http://localhost:3271",
  "brand": { "name": "Utopia Studio", "background": "#ebe4d8", "text": "#2f2724", "muted": "#6b605a", "accent": "#8a3a24" }
}
```

## The demo copy

1. `git worktree add --detach <scratch>/wt origin/staging`, then `pnpm install`.
2. Copy `apps/web/.env.local` without the backend, analytics and integration keys (`CONVEX_*`, `POSTHOG*`, `COMPOSIO*`); keep `DEEPGRAM_API_KEY` for the voice and add `NEXT_PUBLIC_DEMO_MODE=on`.
3. Apply the demo patches to the worktree (in the UtopiaOS repo, `.claude/skills/walkthrough-video/scripts/apply-demo-patches.py`). Behind `DEMO_MODE` they: accept document uploads without Google Drive, skip the Drive and Composio checks on the form, mark documents verified, skip the live Slack check, take the fellow's display name from `DEMO_FELLOW_NAME`, and add a `demoSeed` module with `seed` (turns the signed-in user into a fresh onboarding fellow with a fake venture) and `slackJoined` (records a Slack join mid-take).
4. Start an anonymous local Convex backend with Node 20–24 (`"use node"` actions need it): `CONVEX_AGENT_MODE=anonymous npx convex dev --typecheck disable`. Set `CLERK_JWT_ISSUER_DOMAIN` to the dev Clerk instance, `DEMO_MODE on`, and `DEMO_FELLOW_NAME "Jordan Sample"` with `npx convex env set`.
5. Start Next on the port in the config: `PORT=3271 node scripts/dev.mjs` from `apps/web`, in the background.

## Sign in, seed, snapshot

```bash
node <skill>/scripts/signin.mjs        # the person signs in; Google SSO works
npx convex run demoSeed:seed '{"name":"Jordan Sample","venture":"Northwind Health"}'
npx convex export --path <scratch>/fresh-fellow.zip
```

Before every take, dry runs included: `npx convex import --replace-all -y <scratch>/fresh-fellow.zip`.

## Record

```bash
node <skill>/scripts/make-samples.mjs <scratch>/samples
cd <scratch>/wt/apps/web
WEB_DIR=$PWD SAMPLES=<scratch>/samples DRY=1 node <skill>/scripts/record.mjs <skill>/examples/utopiaos-fellow-onboarding/flow.mjs
WEB_DIR=$PWD SAMPLES=<scratch>/samples node <skill>/scripts/record.mjs <skill>/examples/utopiaos-fellow-onboarding/flow.mjs
```

## What this flow shows

- **Long forms**: `h.type` for anything a person types, `h.fill` for dates, `h.select` for dropdowns; `sectionNext` targets the last "Next" on the page because the footer has one too.
- **Uploads** with clearly fake sample documents, then `h.reveal` on the uploaded file name so the viewer sees it landed.
- **A step that happens in another app** (joining Slack) faked with a backend call mid-scene, so the page moves on by itself as it would for a real fellow.
- **Title cards with looping media** the app already serves; the take stops if the media fails to load rather than recording an empty card.
- **Reading pages**: `h.scrollBy` with a long duration on the home and consent pages, so the viewer can read along.

## Where the result goes

`apps/web/public/assets/library/onboarding-demo.{mp4,en.vtt}` plus `onboarding-demo-poster.jpg`, used by the onboarding guide page, the guide dialog and the workspace-step help. Afterwards, stop both servers and `git worktree remove --force <scratch>/wt`.
