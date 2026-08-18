# Eval log — explicit-vs-tacit-capture

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision

MUST fire (5):
1. "What's teachable here versus judgment?"
2. "Help me codify our expert's expertise."
3. "Split the explicit from the tacit in our know-how."
4. "Which part of our expertise is actually defensible?"
5. "What can we write down versus what's only in their head?"

MUST NOT fire (3, name the sibling each belongs to):
1. "Set me up to sit with the expert and watch her make the call live." → belongs to `tacit-knowledge-interview`
2. "Which of our data sources can a competitor's model already reach?" → belongs to `yoda-data-sourcing`
3. "Turn the captured expertise into a labelled dataset and golden cases." → belongs to `dataset-builder`

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| (pending judge) | | | |

---

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | All 5 must-fire phrasings are near-verbatim in the `description` trigger list ("what's teachable vs judgment", "codify the expertise", "split explicit from tacit", "which part of our know-how is defensible", "what can we write down vs what's in their head"). All 3 must-not are covered by explicit NOT-clauses naming the correct sibling: live-watch→`tacit-knowledge-interview`, data-source reachability→`yoda-data-sourcing`, labelled dataset→`dataset-builder`. |
| 2 Golden | PASS (5/5) | Per-case totals below. |
| 3 Adversarial | PASS (3/3) | 01 vague one-liner: Method step 1 + template §0 force the ONE unblocking question, invent-nothing rule holds. 02 solution-in-disguise: Gotchas "we just need to write the SOP" names the trap (documenting = capturing the commodity) and reframes. 03 out-of-scope: description NOT-clause + When-NOT table decline and name `tacit-knowledge-interview`, confirm the row is a placeholder, do not design the watch session. No fabrication, no flattery, no scope-poach. |
| 4 Head-to-head | n/a | `supersedes: none`. |
| 5 Anti-generic | PASS | Golden 01 output reclassifies the artefact the fellow is proudest of (the rubric) as the commodity and names the buried clustering-override as the moat — driven by the evidence ladder (1.0/0.7/0.5/0.3/0.1), the ≥0.5 captured bar, and the pseudo-explicit split rule. A generic PM prompt produces none of these; the reframe is load-bearing, not decoration. No guidance that should be tabular is buried in prose (classifier, seams, ladder, ledger are all tables). |
| 6 Real-use | pending | requires 5+ real fellow uses |

### Gate 2 per-case scores (rubric: /25, pass ≥21, no dim <4)

| Case | method_fidelity | artifact_complete | proprietary_edge | challenge | evidence_standard | Total | Pass |
|---|---|---|---|---|---|---|---|
| 01 Azraq risk assessor | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |
| 02 Barrier permit sign-off | 5 | 5 | 5 | 4 | 4 | 23 | ✓ |
| 03 Mentix copilot (captured tacit) | 5 | 5 | 5 | 4 | 5 | 24 | ✓ |
| 04 Durian triage (mundane) | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |
| 05 Barrier field manual (kill-inverse) | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |

Kill line checked on every case: **no judgment call filed in the explicit column**. Golden 01 splits the "sanity-check" step into 3a(E)/3b(T); Golden 05 splits the four soft steps ("consistent/concerning/appropriate/off") instead of accepting them as explicit; Golden 04 refuses to manufacture tacit forks for a genuinely thin-moat task. The tacit half is named as the moat in all five verdicts. No auto_fail triggered (no fabricated numbers beyond the fixtures' own material; challenges rather than flatters; stays in scope).

Verified structural claims: (a) the **pseudo-explicit split rule** is real and load-bearing — Method step 3 + template §2 force any overridden rule into two rows (rule=E, override cue=T), demonstrated in the example and tested by Goldens 01/02/05. (b) **No poach of `tacit-knowledge-interview`** — placeholders (<0.5) are routed there, and the live watch is explicitly declined (adversarial 03). (c) **No poach of `yoda-data-sourcing`** — When-NOT table states the axis difference plainly (E/T tell-ability vs R/G/P reachability).

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)
- **0.5 vs 0.7 boundary for written past-decision records is fuzzy.** Golden 02's refusal notes ("a decision the expert wrote down") satisfy BOTH artefact-shown (0.5) and behaviour-observed (0.7 "a marked-up case / logged correction") on the ladder. The golden itself hedges "artefact 0.5 / behaviour-adjacent". It clears the ≥0.5 bar either way so no verdict changes, but it affects moat-piece **ranking**. Consider one line disambiguating a written decision log from a live-observed correction.
- **"Captured" has two gates that can disagree (Step 4 named-cue vs Step 5 ≥0.5 evidence).** Golden 03's correction log gives behaviour 0.7 (Step 5 met) because the override is logged, but the log records the *decision* (operator waited), not necessarily a *named perceptible cue* (Step 4). The skill treats the row as captured. Worth clarifying: an observed override with an un-verbalized cue is a captured moat piece on evidence, but `dataset-builder` will still need the cue extracted — i.e. "behaviour observed" ≠ "cue named". Minor, non-blocking.

## Refine run 2 — applied judge fixes: added a Step 5 line disambiguating the 0.5 rung (artefact — a recorded past decision) from the 0.7 rung (behaviour — the decision observed live); reconciled the two "captured" gates so a row is a moat piece only when BOTH the named cue (Step 4) and ≥0.5 evidence (Step 5) hold, otherwise it is a placeholder routed to tacit-knowledge-interview.
