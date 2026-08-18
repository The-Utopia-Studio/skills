# Eval log — dataset-builder

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision

MUST fire (5):
1. "Let's build our own dataset from the field logs."
2. "Create golden cases for our eval."
3. "Label this / label our field data so we can test the model."
4. "Turn these logs into a test set the model hasn't seen."
5. "Make the seed of our eval suite from our own data."

MUST NOT fire (3, name the sibling each belongs to):
1. "Which of our candidate data sources are actually proprietary / where's our moat data?" → belongs to `yoda-data-sourcing` (section 03)
2. "Compose my 20 cases into the eval bands, pick the autonomy level, and set the cost-per-outcome budget." → belongs to `eval-first-spec` (section 07)
3. "Which of the expert's knowledge is teachable procedure vs show-only judgment?" → belongs to `explicit-vs-tacit-capture` (section 03)

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| (pending judge) | | | |

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | All 5 must-fire phrasings map to literal trigger strings in the description ("make our own dataset", "create golden cases", "label this", "turn our field logs into a test set the model hasn't seen", "seed the eval suite"). All 3 must-not are named as explicit exclusions in the description with the correct sibling (yoda-data-sourcing / eval-first-spec / explicit-vs-tacit-capture). |
| 2 Golden | PASS (5/5) | Per-case totals below. Every case ≥ 21, no dimension < 4, no auto_fail triggered. |
| 3 Adversarial | PASS (3/3) | 01 vague → asks the one unblocking question (which artefacts / which yoda row / what settles the label) + routes to yoda; no invented ledger. 02 solution-in-disguise → refuses model-labelling-at-volume, names mirror-not-a-test + volume-wrong-axis, reframes to outcome-labelled real cases. 03 out-of-scope → declines composition, names eval-first-spec (section 07), stays in lane (confirm 4 gates) then hands off. No fabrication, flattery, or scope-poaching. |
| 4 Head-to-head | n/a | `supersedes: none`. |
| 5 Anti-generic | PASS | Golden-01 output is unreproducible by a generic PM prompt: the load-bearing engine is the YODA unreachability test (input-leak/label-leak) aimed at the eval set, the evidence ladder scoring the *label* (money 1.0 / behaviour 0.7 / artefact 0.5 / verbal 0.3 / opinion 0.1), and the four gates. A generic prompt would accept the public predictive-maintenance set to "bulk it up" and treat 50 engineer notes as labels — the exact two moves this skill refuses. Structural guidance (gates, ladder, ledger, leak checks) is tabular, not prose. |
| 6 Real-use | pending | Requires 5+ real fellow uses. |

### Golden per-case scores (dimensions: method_fidelity / artifact_complete / proprietary_edge / challenge / evidence_standard)

| Case | MF | AC | PE | CH | ES | Total | Pass |
|---|---|---|---|---|---|---|---|
| 01 Mentix seed | 5 | 5 | 5 | 5 | 5 | 25 | Y |
| 02 Azraq short-of-20 | 5 | 5 | 5 | 5 | 5 | 25 | Y |
| 03 Barrier inter-rater | 5 | 5 | 5 | 5 | 5 | 25 | Y |
| 04 Durian mundane | 5 | 5 | 5 | 5 | 5 | 25 | Y |
| 05 kill-line inverse | 5 | 4 | 5 | 5 | 5 | 24 | Y |

Notes: 05 artifact_complete = 4 — the honest output is a whole-set refusal + route-back-to-yoda with no filled ledger (correct behaviour), so the rubric's "fully filled ledger with numbers/citations" only partly applies. Kill line honoured in BOTH directions: ≥20 floor enforced without padding (02 lands at 14 and names it the finding), and reproducible/opinion sets rejected (05 discards 5,000 public rows; opinion labels scored 0.1 and held). Poaching check clean: starts from yoda P rows without re-sourcing; stops at the labelled seed and explicitly refuses to compose bands/autonomy/cost (eval-first-spec's job).

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)
- **No explicit N=0 / whole-input-reproducible slot in the template.** template.md §6 handles "If N < 20" but there is no clean path for the Golden-05 case where the entire input is model-reachable and *nothing* is golden. It is covered implicitly by §1 "stop" + §7 "Discarded", but a fellow filling the template has no obvious place to record "0 golden — route the whole set back to yoda-data-sourcing." Consider an explicit "If N = 0 (whole input reproducible): the finding is there is nothing to test against yet — go source workflow-trapped data" line.
- **"Reachable?" column header reads inverted.** The ledger column is labelled "Reachable?" but a good (unreachable) case is recorded as "clear / clear". A fellow skimming could read "clear" as "reachable = clear/yes". The prose under the table disambiguates, but the header phrasing (e.g. "Leak checks (input / label)") would remove the double-negative.

Both are minor readability/completeness nits, not correctness defects; neither blocks graduation.

## Refine run 2 — applied judge fixes: added a template §6 "If N = 0" slot (whole input model-reachable → no golden cases, dataset rejected, route back to yoda-data-sourcing); renamed the ledger "Reachable?" column to "Leak checks (input / label)" across SKILL.md, template.md, and examples/sample.md to remove the inverted-polarity double-negative.
