# Eval log — moat-design-canvas

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision

MUST fire (5):
1. "What's the moat here / design the moat."
2. "How is this defensible?"
3. "Will this compound over time?"
4. "Will competitors just copy this?"
5. "How do we stay defensible as competitors show up?"

MUST NOT fire (3, name the sibling each belongs to):
1. "Is this a wedge / will anyone adopt it / is my wedge sharp enough?" → belongs to `wedge-five-questions` (adoption now, not defensibility over time; run it first)
2. "What exact data-rights clause do we sign at the pilot / who owns the data / does it hold in the UAE?" → belongs to `data-rights-clause` (drafts the clause; this only names the data-advantage gate)
3. "Score the whole idea across all its dimensions." → belongs to `problem-quality-scorecard` (defensibility is one dimension of many)

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| (pending judge) | | | |

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | Description names all 5 fire phrasings verbatim ("what's the moat", "how is this defensible", "will this compound", "will competitors just copy this", "how do we stay defensible as they show up"). All 3 must-not are explicitly excluded with the named sibling: adoption→`wedge-five-questions`, clause/UAE→`data-rights-clause`, whole-idea→`problem-quality-scorecard`. Clean separation, no over-fire. |
| 2 Golden | PASS (5/5) | Per-case totals below. Every case ≥21 and no dimension <4. |
| 3 Adversarial | PASS (3/3) | 01 vague one-liner → Gate 0 stop + route to `wedge-five-questions`, asks for validated wedge + compounding asset, no fabrication (ask-the-one-question). 02 moat-as-adjective → Gotchas + veto right-column reject "more accurate/better", unlimited-resources test named (reframe-and-name-the-trap). 03 clause/UAE → When-NOT table + Gotcha route to `data-rights-clause`, no statute invented (decline-and-name-the-sibling). |
| 4 Head-to-head | n/a | `supersedes: none`. |
| 5 Anti-generic | PASS | Golden 01 output turns on the incumbent-veto + unlimited-resources test, the 5-rung evidence ladder applied to gate clearance, `[Fact]/[Assumption]/[Hypothesis]` tagging, and the "unsigned data advantage is a race, not a moat" routing. A generic VRIO/Porter's prompt yields adjectives, not dated gates with numeric monthly falsifiers. Guidance is already tabular (gate table, veto taxonomy, falsifier table, evidence ladder, kill line); template mirrors it. No prose-that-should-be-table. |
| 6 Real-use | pending | Requires 5+ real fellow uses. |

### Gate 2 — per-case scores (method / artifact / proprietary / challenge / evidence)

| Case | m_fid | artifact | prop_edge | challenge | evidence | Total | Pass |
|---|---|---|---|---|---|---|---|
| 01 Azraq (full pass, Gate 4 blocked) | 5 | 5 | 5 | 5 | 5 | 25 | PASS |
| 02 Mentix (org-incentive veto) | 5 | 5 | 5 | 4 | 5 | 24 | PASS |
| 03 Barrier (kill-line refusal) | 5 | 5 | 5 | 5 | 5 | 25 | PASS |
| 04 Durian (multi-fix → NO MOAT as drafted) | 5 | 5 | 5 | 5 | 5 | 25 | PASS |
| 05 Mentix mundane (modest but real) | 5 | 5 | 5 | 4 | 5 | 24 | PASS |

Special-check confirmed on every golden: four DATED gates (wedge→usage→lock-in→data advantage); a structural incumbent-veto sentence rooted in the incumbent's structure (DCIM isolation contracts / MES field-engineer comp / CMMS single-taxonomy model), never the fellow's speed/UX; three monthly falsifiers with observable + threshold + date. Head starts (accuracy lead, "nicer app", "first", "slow and enterprise-y") are explicitly called NOT a moat via the unlimited-resources test and the kill line (golden 03/04, adversarial 02).

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)
- Minor (not a gate failure): Golden 05's required "modest / do not inflate" honest-sizing is emergent from the evidence discipline (n=1 flag, `[Hypothesis]` on the unrenewed plant, assumption tags) rather than a named method step. The method reliably prevents inflation, but there is no explicit "state the moat's honest size" instruction. Consider a one-line Step-5 note: "name the moat's honest size — a small moat named accurately beats a big moat imagined." Nothing in the current method blocks the correct output; this is a robustness nudge only.
- Challenge dimension runs slightly lighter on genuinely strong inputs (02, 05) because there is less to push back on — still ≥4 via forced `[Assumption]` tagging on incumbent internals + three live falsifiers. No fix needed; noted for calibration.

## Refine run 2 — applied judge fixes: added a one-line Step-5 "size it honestly" nudge — do not inflate the trajectory; a modest but real moat with dated gates beats an ambitious one built on unfalsifiable claims.
