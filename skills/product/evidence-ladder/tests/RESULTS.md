# Eval log — evidence-ladder

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision

MUST fire (5):
1. "How strong is this signal?"
2. "Score the interview — did I actually validate anything?"
3. "Did they actually validate it, or did they just say nice things?"
4. "Weight this evidence for me — three LOIs and forty sign-ups."
5. "Is this real validation or just enthusiasm?"

MUST NOT fire (3, name the sibling each belongs to):
1. "Score this problem 1-5 and tell me if I should build it / go or no-go." → belongs to `problem-quality-scorecard`
2. "Which test should I run to check this / how do I probe this?" → belongs to `probe-matrix`
3. "Summarize this customer interview into JTBD and action items." → belongs to `summarize-interview`

## Kill-line check (auto-fail if violated)

- Any run that scores an opinion above 0.1 fails outright. Golden 05 and Golden 02
  are the primary traps (enthusiasm and a reaction-to-mockup must land at 0.1).

## Runs

| Date | Gate | Result | Notes |
|---|---|---|---|
| run 1 | all | see block below | judge (separate agent) |

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | Description names all 5 must-fire phrasings verbatim ("how strong is this signal", "score the interview", "did they actually validate", "weight this evidence", "is this real validation"). All 3 must-not-fire are explicitly excluded in-description ("NOT a build gate → problem-quality-scorecard", "NOT a picker for which test → probe-matrix", "NOT a transcript summary → summarize-interview"). "Score this problem 1-5" shares the "score" token but is routed away by the explicit build-gate exclusion. |
| 2 Golden | PASS (5/5) | Applied Method to each input; per-case totals below. |
| 3 Adversarial | PASS (3/3) | 01 empty pile: applying Step 1 (one placed signal per row) forces a request for the pile + no headline — no fabrication. 02 "need a mobile app": "When NOT" table routes to `problem-statement`; feature-request weighs as Opinion 0.1, trap named. 03 go/no-go + which-test: both siblings named (`problem-quality-scorecard`, `probe-matrix`), in-scope service offered. No fabrication, flattery, or scope-poaching. |
| 4 Head-to-head | n-a | `supersedes: none`. |
| 5 Anti-generic | PASS | Golden 01: a generic PM prompt would call "three warm buyers" promising and stop there. It would not fix the signal at 0.3 on a five-rung ladder, state the anti-stacking rule, refuse to round "buyers" up to money, prescribe "skip the middle rungs, go straight to cash", or replace the average with a coverage tally. Reframe is load-bearing, not decoration. All lookup guidance (ladder, impostor downgrades, probe map) is tabular; prose is reserved for rationale. |
| 6 Real-use | pending | requires 5+ real fellow uses |

### Gate 2 per-case scores (MF / AC / PE / CH / ES, total /25; pass ≥21 & no dim <4)

| Case | MF | AC | PE | CH | ES | Total | Pass |
|---|---|---|---|---|---|---|---|
| G01 Durian — 3 "they'd buy it" | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |
| G02 Barrier — mixed 4-signal pile | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |
| G03 Mentix — single self-report quote | 5 | 5 | 4 | 4 | 5 | 23 | ✓ |
| G04 Azraq — 3 signed LOIs / $600k | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |
| G05 Mentix — mockup "4 of 5 loved it" | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |

- **Anti-stacking check:** PASS. G01 (3 verbal yeses → 0.3, not 0.9) and G04 (3 LOIs → 0.3) both hold the rung flat; Step 3 + reframe ("fifty people saying yes is still 0.3") enforce it.
- **Kill-line check:** PASS. G05 lands the mockup reaction + "would roll it out" prediction at Opinion 0.1; enthusiasm ("4 of 5") does not lift. No opinion scored above 0.1 in any case. G02 supervisors' praise also correctly at 0.1.
- **Rung-crispness check:** mostly PASS. The "Counts only when" + impostor columns let two readers place the common cases identically. Softest boundary is Artefact-shown 0.5 vs Behaviour-observed 0.7 (a permit log they *use* is 0.5, but using it is arguably behaviour) — resolved in practice by "shown vs observed live/logs", but see gotcha.
- No `auto_fail` triggered in any case (no fabricated numbers/quotes, no flattery, no out-of-scope firing, no boilerplate).

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)

- **Empty-pile behaviour is implied, not stated.** Adversarial 01 (no signals) is handled correctly only because Step 1 requires a placed signal per row. The SKILL never says explicitly "if the pile is empty, ask for signals and emit no headline weight." A one-line instruction in Method (or a Gotcha) would harden this against a run that invents example rows.
- **Artefact-shown (0.5) vs Behaviour-observed (0.7) edge.** A thing they *use* (e.g. the permit log) is 0.5, yet "use" reads like behaviour. The distinction that decides it is *shown-static* (0.5) vs *observed-in-use / you hold the logs* (0.7). It works in the example but is the one rung boundary where two readers could diverge; a sharpening sentence would remove the last ambiguity.
- (Both are refinements, not defects — no gate failed on them.)

## Refine run 2 — applied judge fixes: empty pile → ask for signals + emit no headline (no fabrication); sharpened Artefact-0.5 vs Behaviour-0.7 (a log actively used in the workflow is 0.7).
