# Timed install-flow test across the 4 supported clients (TUS-2602)

Method: actually ran what's runnable from a fresh, non-interactive environment (Cursor/Codex's `npx skills add` path, and structural validation of Claude Code's `/plugin` inputs); documented what genuinely requires a human with a real account (Claude Code's interactive `/plugin` UX, Claude.ai's upload UI). No fabricated numbers for the legs I couldn't personally click through — see the honesty caveats in each section.

## 1. Cursor / Codex — `npx skills add` (actually run, twice)

**Result: 25s, zero errors, zero warnings, fully non-interactive.**

```
npx skills add The-Utopia-Studio/skills
```

- Ran twice in fresh temp directories, `time`-measured: 24.6s and 25.0s.
- The tool printed `Agent detected — installing non-interactively` and skipped straight to installing — **this is a real caveat, not a clean result**: it detected the agent-shaped environment I ran it from and auto-skipped whatever confirmation prompt a real human would hit in an interactive terminal. The ~25s reflects the fast/scripted path; a first-time human's actual time includes however long they spend reading/answering that prompt, which I can't measure from here. Worth a real fellow timing this once.
- Dominant cost is the `Cloning repository…` spinner (a fresh full clone every run, no cache) — that's `npx skills add`'s own design (third-party tool, not this repo's to fix), not a bug.
- Output: symlinks `SKILL.md` for Claude Code, copies "universal" format for Codex/Cursor/GitHub Copilot/Amp/Antigravity/+12 more, into `.agents/skills/`.

**Real friction found and fixed:** `INSTALL.md`'s "Using Cursor instead?" section only showed the install-everything command — no mention that `--skill <name>` exists for a narrower install, and no warning that `--skill a,b` (comma-separated) silently fails ("No matching skills found for: a,b") where repeating the flag (`--skill a --skill b`) works. Verified both behaviors directly:

```
$ npx skills add The-Utopia-Studio/skills --skill cold-email,pitch-deck
■  No matching skills found for: cold-email,pitch-deck
   (dumps the full 301-skill list)

$ npx skills add The-Utopia-Studio/skills --skill cold-email --skill pitch-deck
✓ ./.agents/skills/cold-email
✓ ./.agents/skills/pitch-deck
```

Fixed in `INSTALL.md` — added the working syntax and a link to the new skill browser (`TUS-2606`) to find exact names.

**Structural gap this surfaces, not fixed here:** there's no per-module shorthand for Cursor/Codex the way Claude Code has `/plugin install utopia-gtm@skills` — wanting "just the GTM pack" today means listing all 84 GTM skill names by hand. That's a `npx skills add` tool limitation (third-party), not something `INSTALL.md` wording can paper over. Worth flagging to whoever maintains that CLI if module-scoped installs matter enough.

## 2. Claude Code — `/plugin marketplace add` + `/plugin install`

**Not run interactively** — `/plugin` is a Claude Code chat command, not a shell command, and I don't have an authenticated interactive Claude Code session to drive from this environment. What I verified instead is everything that determines whether the flow *would* succeed mechanically:

- `.claude-plugin/marketplace.json` — valid JSON, 4 plugins listed.
- Each `plugins/<pack>/.claude-plugin/plugin.json` — valid JSON.
- Each pack's `skills/` directory is non-empty and matches its expected count (gtm 84, product 128, investments 60, founder-productivity 30 — 302 total).
- `scripts/validate-skills.mjs` (CI, `TUS-2595`) re-verifies all of this plus pack-integrity on every PR, so this isn't just a point-in-time check — it can't silently drift back to broken.

This is the same proof-by-construction most of this sprint's CI work already provides; there's nothing left to test here that CI doesn't already cover continuously. What CI *can't* tell you is the actual interactive UX (does the confirmation prompt read clearly, how long does a human take to answer it) — that needs a real Claude Code session, same caveat as the Cursor path above.

## 3. Claude.ai web / desktop — self-serve `.skill` upload (`TUS-2603`)

**Not run interactively** — uploading to Settings → Capabilities → Skills requires a real, logged-in Claude.ai account, which isn't something to drive autonomously from here. What I verified instead:

- All 6 flagship `.skill` download links on the docs site resolve with HTTP 200 (`fetch` test against a local preview server).
- Each `.skill` file is a valid zip with `SKILL.md` at the zip root (`unzip -l`), matching the shape `FELLOWS.md` already describes Karan manually producing today.
- Build is deterministic — identical md5 across two successive `build-packs.sh` runs — so CI's drift check can safely track these files without false positives.

Expected flow per `FELLOWS.md`/`INSTALL.md` (`TUS-2603`): visit the docs site → click the flagship's `.skill for Claude.ai` link (instant download, verified above) → Settings → Capabilities → Skills → upload. The one step I genuinely can't time is the upload UI itself — that's real Claude.ai product surface, not this repo's code, and needs a logged-in human.

For anything outside the 6 flagships, the documented path is still DM Karan (decision made in `TUS-2603` — self-serve for flagships only, not the full 302-skill corpus, given the ~34MB binary-artifact cost of zipping everything).

## Summary

| Client | Timed? | Result | Friction found | Fixed? |
|---|---|---|---|---|
| Cursor/Codex (`npx skills add`) | Yes, actually run twice | 25s, 0 errors | No `--skill` docs; comma-syntax silently fails; no per-module shorthand | Docs fixed; CLI limitation flagged, not ours to fix |
| Claude Code (`/plugin`) | Structurally verified, not interactively run | All inputs valid, CI-enforced continuously | None found beyond what CI already catches | N/A |
| Claude.ai web/desktop | Partially — download verified, upload not | Download path works, zip format correct | (Addressed in `TUS-2603`: buried FAQ, "web" undercounting desktop) | Already fixed in `TUS-2603` |
| — | — | — | — | — |

**Honest scope limit:** two of the four legs (Claude Code's interactive prompt UX, Claude.ai's actual upload button) need a real human with a real account to time — I can verify every mechanical thing that determines success, but not the lived first-time experience of a prompt or a click I can't legally/practically drive myself. Recommend a real fellow spend 5 minutes on those two specifically if a truer stopwatch number matters.
