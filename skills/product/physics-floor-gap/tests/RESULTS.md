# Eval log — physics-floor-gap

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision
MUST fire (5):
1. "Is this a big enough problem to build for?"
2. "How big is the prize per report?"
3. "Size the opportunity from first principles."
4. "What's the physics floor for this work?"
5. "Is the gap big enough — what does one unit cost today vs what it should cost?"

MUST NOT fire (3, name the sibling each belongs to):
1. "What's the TAM for data-centre risk software?" → belongs to `bottoms-up-quantification`
2. "Score my problem across all 8 dimensions — is it a good problem?" → belongs to `problem-quality-scorecard`
3. "Is the whole idea any good? Stress-test the concept." → belongs to `so-what-stress-test`

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| (pending judge) | | | |

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | Description enumerates all 5 must-fire phrasings verbatim and explicitly routes all 3 must-not-fire to siblings (TAM→bottoms-up-quantification, 8-dim→problem-quality-scorecard, whole-idea→so-what-stress-test). Clean scope boundary. |
| 2 Golden | PASS (5/5) | Re-did floor arithmetic each case; all internally consistent, band matches ratio, A+B both shown, tags present. Per-case table below. |
| 3 Adversarial | PASS (3/3) | 01 asks for the one number (unit + current cost/unit), invents nothing. 02 names wrapper trap, reframes to the decision, refuses "ugly" as unit. 03 declines TAM, names bottoms-up-quantification, no market number. |
| 4 Head-to-head | n/a | supersedes: none |
| 5 Anti-generic | PASS | Golden 01 output could NOT come from a generic PM prompt: physics floor (token cost + irreducible judgment minutes), gap-ratio band with a >100× suspicion trap, evidence-ladder weighting, [Fact]/[Assumption]/[Hypothesis] tags. Bands/ladder/when-not are tables, method is stepwise, template is a fill-in sheet — no guidance mis-cast as prose. |
| 6 Real-use | pending | Requires 5+ real fellow uses. |

### Gate 2 per-case scores (rubric: /25, pass ≥21 AND no dim <4)
| Case | method | artifact | proprietary | challenge | evidence | Total | Pass |
|---|---|---|---|---|---|---|---|
| 01 Azraq → BUILD (22.6×) | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |
| 02 Mentix → WALK (6.9×) | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |
| 03 Barrier → STOP (228.6×) | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |
| 04 Durian → THIN (11.25×) | 5 | 5 | 5 | 4 | 5 | 24 | ✓ |
| 05 SEO → BUILD (29.6×) | 5 | 5 | 5 | 4 | 5 | 24 | ✓ |

No auto_fail triggered in any case: floor-side figures are stated `[Assumption]`s (token math + minutes shown), not fabricated facts; current-cost numbers come from the input; weak pitches (02 copilot, 03 £35 floor) are challenged not flattered; scope respected; output is a first-principles sheet, not boilerplate. Kill line satisfied everywhere — every verdict shows A-line and B-line.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)
- **FX rounding is loose in the worked example.** examples/sample.md carries A from "~$3" to "£2.50", but $3 ÷ 1.25 = £2.40, not £2.50. Trivial (does not move 22.6×), but the sheet preaches showing the arithmetic, so the one hand-worked example should reconcile its own FX line. Consider £2.40 or state the rounding.
- **Golden 04 sits one estimate away from flipping bands.** Durian's THIN verdict depends on A ≈ £0.10 and correct amortisation (floor £0.40 → 11.25×). If A is estimated at ~£0.20 the floor is £0.50 and the gap drops to 9.0× → WALK. This is arguably the skill working as designed (dated, re-run, "what would change the verdict"), but a boundary case that sensitive is worth an explicit note in the case so a fellow does not read 11.3× as durable.

## Refine run 2 — applied judge fixes: reconciled the example's FX line (A = $3 ÷ 1.25 = £2.40, floor £42.40) and added a borderline-band-ratio Gotcha.
