# Eval log — user-buyer-decider-map

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision
MUST fire (5):
1. "Who's the actual buyer here?"
2. "Who decides whether this gets bought?"
3. "Map the stakeholders / the buying committee for this account."
4. "The user loves it — but who signs the cheque?"
5. "Who's our champion, and who can quietly veto us?"

MUST NOT fire (3, name the sibling each belongs to):
1. "Score this problem across the eight dimensions — go or no-go?" → belongs to `problem-quality-scorecard`
2. "Which unmet need should we build for first — must-have vs nice-to-have?" → belongs to `unserved-needs-finder`
3. "Simulate a user and dry-run the pitch before real interviews." → belongs to `synthetic-users`

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| run 1 | all | GRADUATE-READY | see judge run below |

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | Description carries the exact fire phrases ("who's the actual buyer", "who decides", "map the stakeholders/buying committee", "the user loves it but who signs the cheque", "who's our champion and who can veto us") and explicit "NOT" exclusions naming problem-quality-scorecard, unserved-needs-finder, proto-persona, synthetic-users. All 3 must-not phrasings are individually excluded. |
| 2 Golden | PASS (5/5) | per-case totals below |
| 3 Adversarial | PASS (3/3) | 01 vague one-liner → resolves to the User-anchor question (Step 1 "who feels the pain daily"), no fabricated roles/verdict; 02 pre-chosen buyer → "highest title assumed buyer" gotcha + Step 2 budget-line trace + collapse check reframe to line-item+why-now; 03 Kano ranking → explicit out-of-scope exclusion, points to unserved-needs-finder, produces no ranking. |
| 4 Head-to-head | n-a | frontmatter `supersedes: none` |
| 5 Anti-generic | PASS | Golden-01 output could NOT come from a generic PM prompt: the dual evidence ladder on budget AND why-now (money 1.0 → opinion 0.1), the required fifth face (who loses if it ships), [Fact]/[Assumption]/[Hypothesis] tags, and the capped buyer-clarity feed into problem-quality-scorecard are all load-bearing. Guidance that should be tabular (roles, why-now, evidence ladder, verdict) is tabular; prose is confined to rationale. |
| 6 Real-use | pending | requires 5+ real fellow uses |

### Gate 2 — per-case scores (rubric: /25, pass ≥21 AND no dim <4)
| Case | method | artifact | edge | challenge | evidence | Total | Pass |
|---|---|---|---|---|---|---|---|
| 01 Barrier (seed) | 5 | 5 | 5 | 5 | 5 | 25 | ✅ |
| 02 Mentix (collapse error) | 5 | 4 | 5 | 5 | 5 | 24 | ✅ |
| 03 Azraq (kill line) | 5 | 4 | 5 | 5 | 5 | 24 | ✅ |
| 04 Durian (hidden DM) | 5 | 4 | 5 | 5 | 5 | 24 | ✅ |
| 05 Physio (correct collapse) | 5 | 5 | 4 | 5 | 5 | 24 | ✅ |

Notes: artifact scored 4 (not 5) on 02/03/04 because the correct output leaves cells legitimately UNFOUND / to-verify (a buyer or veto role that does not yet exist in the input) — completeness done right, not a gap. Edge scored 4 on 05 because a generic prompt could also collapse the map; the proprietary value there is the *subtraction discipline* (delete roles above a sole trader, name the soft fifth face), which the skill supplies. No auto_fail triggered on any case: illustrative figures (e.g. Golden-01 $250k) are explicitly flagged illustrative and tagged, which the goldens' own auto-fail wording permits.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)
- **Empty-input path is implicit, not stated.** Adversarial 01 ("who should I sell my thing to?") is handled correctly only via the skill's general anti-fabrication stance + the User-row test. SKILL.md has no explicit "if there is no product/pain/account, ask the single anchoring question (what is the one pain, who feels it daily?) and emit no map" instruction. It survives, but a weaker fellow could try to fill the template from nothing. Consider one explicit line in Method or Gotchas.
- **"Absorbs" vs `supersedes: none` terminology.** Related says the skill "Absorbs proto-persona and ideal-customer-profile" while frontmatter declares `supersedes: none`. The prose explains the choice (those skills live outside the module / serve B2C), so this is deliberate, not a bug — but the two words could read as contradictory to a fast reader. Not blocking.

## Refine run 2 — applied judge fixes: added Method Step 0 (no product/pain in the input → ask the one anchoring question "what is the one pain, and who feels it daily?", emit no map, invent no stakeholders), closing the implicit empty-input path surfaced in run 1.
