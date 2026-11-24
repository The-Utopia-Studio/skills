---
name: utopia-coding
description: >
  Use before any git push, when opening or updating a pull request, when fixing
  CI failures or Greptile review comments, and when planning fixes after a test
  round, in any Utopia Studio repo deployed with Vercel previews. Batches fixes
  into one push per PR per CI cycle and groups related work into fewer,
  slightly bigger PRs, so each change costs one preview build and one review.
  Not for reviewing code itself (use greptile-review-loop).
---

# Utopia coding: one push per PR per CI cycle

## What it does

This skill tells Claude to batch fixes into one push per PR per CI cycle,
rather than pushing each fix as soon as it's ready, and to group related work
into fewer, slightly bigger pull requests. It speeds up big builds, keeps
Vercel build time within its monthly allowance, and brings Greptile costs
down, since every push costs a build and usually a review.

## One push per PR per CI cycle

This is the main rule. A cycle is one round of feedback on a pull request: a
CI run, a Greptile review, or a test round. Don't push a fix as soon as it's
ready. Collect everything that cycle found, fix all of it, check it locally,
and push once.

- Don't push while CI is still running on your last push. Wait for it to
  finish, so its failures go into the same next push.
- Don't push each review comment's fix on its own. Answer them all in one push.
- Expect Greptile to find something on each review. Fix everything it raised
  in the same push, then check the rest of the change for the same kind of
  problem before pushing, so the next review has less to find.
- Merge the base branch into yours only when you need to (a conflict, or just
  before merging), and do it in the same push as your fixes.
- Greptile reviews once per cycle, after CI is green, never in parallel with
  CI. Where a bot already asks Greptile once CI passes (Ship Bar in utopiaos),
  don't also ask by hand: that pays for two reviews of the same push.

Commit locally as often as you like. Commits are free; pushes are not.

An early push is fine when it unblocks someone else (a broken build others are
waiting on, a fix a tester needs now), or when the person you're working with
asks for it. Say why when you do.

### Why it matters

Every push to a branch with an open pull request starts a Vercel preview
build, a full CI run, and usually another Greptile review. Those are what we
pay for, and they are where most of the time goes. On a big build the waiting
is on checks, not on writing code: CI takes 30 to 40 minutes after every push,
a Playwright round 30 to 45 minutes, and each Greptile review usually finds
one or two real issues that need another push. Every push you avoid saves
roughly half an hour, as well as the build and the review.

### Quick check before every push

1. Is everything from this cycle fixed, not just the first thing?
2. Did the type check, lint and tests pass locally?
3. Is CI finished on the last push?
4. Could this go in a pull request that's already open in this area?

If any answer is no, wait and keep working locally.

## Check locally before the first push

Never push to find out whether CI passes. Before the first push, run what CI
runs, locally:

- the type check (`pnpm typecheck`, or `tsc --noEmit` for each project)
- lint with zero warnings on the files you touched
- the unit tests (`vitest run`), the whole suite for anything shared
- any repo-specific check CI enforces (generated inventories, route lists)

If something fails, fix it and run the checks again. Only push when they pass.

## Group work into pull requests

One pull request should hold one piece of work as a reviewer would read it,
not one fix. Fixes from the same test round, the same review, or the same area
of the app go together on one branch. A pull request that is a little bigger
but tells one story is better than five small ones that each need their own
build and review.

Keep it readable all the same. If a change touches two unrelated areas, or
grows past what someone could review in one sitting (roughly 800 changed lines,
not counting generated files), split it by area, not by fix.

When several small branches touch the same part of the app, merge them into
one integration branch and open one pull request for it, rather than taking
each through its own build and review.

Small follow-ups (a copy change, a doc, a skill, a test) ride along with the
next real pull request in that area instead of getting one of their own.

## Big builds

For a build that spans many pull requests (a redesign, a release), plan for
the waiting from the start.

- **Open the staging pull request as a draft early.** CI and Greptile then
  surface conflicts with staging while there is still time to fix them, rather
  than at the end. This saved one to two hours on the UtopiaOS v3 redesign. A
  draft still builds on every push, so push to it rarely: only when a batch of
  work has landed in its branch.
- **Let the person review on localhost while you build.** They look at each
  page as it takes shape and give feedback straight away. It adds a little
  time per page but catches problems before they cost a push, a build and a
  review.
- **Group tasks for parallel agents by area.** Give each agent a set of
  related fixes in one part of the app, so their work lands in one pull
  request, not several. Keep to what the machine can take (two agents at a
  time on a laptop). Each agent commits locally, and one of them gathers the
  work, checks it, and pushes once.
- **Watch for the shared dev backend.** Where each pull request's preview
  build deploys to the same dev Convex, a test run can fail against another
  branch's backend. Before treating a failure as a code problem, check that no
  other preview build has just deployed, re-sync the backend if one has, and
  run the test again.

## Before re-running anything

Read the failing check's log first. A build that failed for a reason outside
the code (a timeout, a service blip, another branch overwriting the shared dev
backend) needs one re-run, not a new commit. A check that already fails on the
base branch and that your change doesn't touch gets a note in the pull request,
not a fix pushed in a hurry.

## What good looks like

- A pull request goes through two or three pushes from opening to merge: the
  first push, one batch of review fixes, and sometimes a base-branch merge in
  the same push as a last fix. Five or more pushes on one PR is a sign fixes
  went out one at a time.
- Every push answers everything open at that moment: all failing checks, all
  unresolved review comments, all test-round findings for that area.
- Nothing is pushed while CI is still running on the previous push, unless it
  unblocks someone and the reason is stated.
- A day of fixes after a test round lands as one pull request per area of the
  app, not one per finding.

## Gotchas

- **Fixing the first comment and pushing.** Claude tends to push as soon as one
  fix passes locally. Read the whole review, and the latest CI results, before
  changing anything.
- **Merging the base branch "to stay current".** Each merge is a push and a
  build. Merge only for a conflict or just before merging the pull request.
- **Assuming a draft pull request skips builds.** It doesn't; Vercel builds
  drafts on every push.
- **Treating a failure caused by the shared dev backend as a code bug.** It
  leads to a fix nobody needed and another push. Check what else deployed
  first.
- **Several agents pushing to the same pull request.** Each push restarts CI
  and the review. Gather their work into one push.
- **Asking Greptile by hand where a bot already does.** Two reviews of the
  same push, both paid for.

## Example

A pull request's CI finishes with the type check failing, and Greptile's review
leaves four comments: a saved answer overwritten on Back, a Continue button
that drops unsaved edits, a silent failed check, and a placeholder name that
vanishes after saving.

Without this skill: five pushes, one per fix. Each starts a preview build and
a 30 to 40 minute CI run, and each green run asks Greptile again, so the PR
gets three or four extra reviews and takes most of a day.

With it: Claude reads all four comments and the CI log, fixes the type error
and all four comments, adds a test for each, runs the type check, lint and
test suite locally, and pushes once with a commit message that names all five
fixes. One build, one CI run, one re-review, which scores 5/5, and the pull
request merges about an hour later.
