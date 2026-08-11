# State of the marketplace — sprint closing snapshot (TUS-2605)

Closing deliverable for the "Utopia Skills — Quality, Significance & Agent-Native Upgrade" sprint. Written so whoever picks up the next phase doesn't have to re-derive context — links to the detailed docs each section summarizes.

## 1. Skill counts and versions by module

| Module | Skills | Pack version | Changed this sprint? |
|---|---|---|---|
| `utopia-gtm` | 84 (was 83) | 2.2.0 (was 2.1.0) | +1 — `sami` persona added (`TUS-2600`) |
| `utopia-product` | 128 | 2.0.0 | No count change |
| `utopia-investments` | 60 | 2.0.0 | No count change |
| `utopia-founder-productivity` | 30 | 2.0.0 | No count change |
| **Total** | **302** (was 301) | — | — |

**Schema migration** (`TUS-2596`): all 302 `SKILL.md` files now follow one canonical frontmatter shape — `name`/`description` required, `version`/`license`/`author` nested under `metadata`, `user-invocable`/`argument-hint` stay top-level. 19 frontmatter `name`/folder mismatches (the `railway-*`/`ckm-*` families) fixed as part of this. Documented in `CONTRIBUTING.md`.

**Dedup audit** (`TUS-2598`): decision list covering 36 skills across 12 groups exists in `DEDUP_AUDIT.md` — 5 confirmed merges, several "keep separate, fix naming" calls, 2 flagged for deeper human review. **Not yet executed** — the audit is a decision list, not a merge PR. The skill count above (302) does not yet reflect any of those 5 planned merges; executing them would bring the corpus down to ~297.

## 2. Coverage against `GUIDE.md`'s "Known gaps to fill"

Checked directly against the current corpus (not assumed) — none of these were in this sprint's scope, and none got incidentally covered:

| Gap | Status | Evidence |
|---|---|---|
| MENA/GCC jurisdiction-aware legal/cap-table skill | **Still open** | No skill mentions MENA/GCC jurisdiction beyond `epc-search` (patent law, unrelated) |
| Agentic customer-ops NPS skill | **Still open** | NPS appears as a passing metric in 16 skills (`voice-of-customer`, `sentiment-feedback-loop`, `customer-research`, etc.) but no dedicated agentic NPS/customer-ops skill exists |
| Product verification beyond `evidence-driven-testing` | **Still open** | Only `evidence-driven-testing` and passing mentions in `ada`/`funding-digest`/`pitch-deck` — no new coverage added |

All three remain accurate open gaps for whoever scopes the next sprint.

## 3. Usage data

**Zero real data exists.** Full detail in `ADOPTION_REPORT.md`. The reporting pipeline (`scripts/build-adoption-report.mjs`, `TUS-2604`) is built and verified correct against synthetic events, but the shared usage-server (`hooks/usage-server/`, `TUS-2594`) was never deployed to Railway — that step needs your Railway account, which this session didn't have access to. This is explicitly a baseline snapshot of the *pipeline*, not adoption data, per that issue's own acceptance criteria.

## 4. Punch list — what's left

**Blocked on you, not on more engineering time:**
- [ ] **Rotate the exposed GitHub token** in this repo's `origin` remote (`.git/config`) — flagged mid-session, still unrotated as of this report. Treat as urgent; it currently has push access to the org repo.
- [ ] **Deploy `hooks/usage-server/` to Railway** and point real fellows' `SKILL_USAGE_ENDPOINT` at it (`TUS-2594`, `hooks/README.md` has the setup flow) — unblocks real numbers in `ADOPTION_REPORT.md`.
- [ ] **Push `week1/foundation` and `week2/agent-native`** (11 commits total, nothing pushed yet) and open PRs — everything below is sitting in local commits only.

**Real remaining work, explicitly logged rather than silently dropped:**
- [ ] **Execute the 5 confirmed dedup merges** from `DEDUP_AUDIT.md` (`cold-outreach`→`ai-cold-outreach`, `design-critique`→`critique`, `expansion-plays`→`expansion-playbook`, `user-stories`→`user-story`, `create-prd`→`prd-development`). Descriptions already cross-reference correctly either way, but the actual folder removal + pack.config.json cleanup hasn't happened.
- [ ] **2 dedup pairs flagged for deeper human read**, not resolved by audit alone: `polish`/`ui-polish`, `dcf-model`/`intrinsic-valuation-dcf` (see `DEDUP_AUDIT.md`'s "Needs a deeper human read" section).
- [ ] **Quality rewrite backlog**: `QUALITY_AUDIT.md` ranks the weakest ~60 skills (score 0-1 out of 4 on the CONTRIBUTING.md proxy checklist) — 16 at score 0/4 are the highest-priority. This sprint fixed every skill's trigger-condition *phrasing* (`TUS-2599`) but did not add missing "what good looks like" / gotchas / worked-example sections, which is separate, larger work.
- [ ] **Full 302-skill description rewrite**: `TUS-2599` covered the 36 dedup-named skills plus the 34 (now 0) CI-flagged ones — not a pass over every already-CI-passing description against `CONTRIBUTING.md`'s fuller bar (concrete output shape, explicit alternatives for skills that don't have a literal duplicate).
- [ ] **Cursor/Codex per-module install**: no equivalent to Claude Code's `/plugin install utopia-gtm@skills` exists for `npx skills add` users — that's a third-party CLI limitation (see `INSTALL_FLOW_TEST.md`), not something this repo can fix alone.
- [ ] **Two install-flow legs untimed by a human**: Claude Code's interactive `/plugin` prompt UX and Claude.ai's actual upload click — both need a real person with a real account (`INSTALL_FLOW_TEST.md`).
- [ ] **Self-serve `.skill` downloads cover only the 6 flagship skills**, by deliberate decision (`TUS-2603`) — revisit if `ADOPTION_REPORT.md` data eventually shows real Claude.ai-only demand for specific non-flagship skills.

## 5. What shipped, for reference

Week 1 (`week1/foundation`, 5 commits): usage-server + hook (`TUS-2594`), CI validation (`TUS-2595`), canonical schema + migration (`TUS-2596`), dedup audit (`TUS-2598`), quality audit (`TUS-2597`).

Week 2 (`week2/agent-native`, 6 commits): description rewrites (`TUS-2599`), Sami persona (`TUS-2600`), machine-readable skill index (`TUS-2601`), searchable skill browser (`TUS-2606`), Claude.ai distribution decision + flagship `.skill` downloads (`TUS-2603`), install-flow test (`TUS-2602`).

All 11 Linear issues except the two closing-report issues (`TUS-2604`, `TUS-2605`, this document) are in **In Review** — implementation complete, sitting in local commits, not yet pushed/merged. `TUS-2607` (accidental duplicate of `TUS-2594`) is **Canceled**.
