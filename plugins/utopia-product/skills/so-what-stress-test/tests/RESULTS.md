# Eval log — so-what-stress-test

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision

MUST fire (5):
1. "Is this worth doing? Can you poke holes in it?"
2. "Pressure-test this idea for me across the board."
3. "So what — why does anyone care that we solve this?"
4. "Stress test my idea before I put more time in."
5. "Give me the fast go/no-go on this concept: who pays, what's the moat, what kills it?"

MUST NOT fire (3, name the sibling each belongs to):
1. "Score this problem on all 8 dimensions and give me the numeric gate." → belongs to `problem-quality-scorecard`
2. "Run the five-lens council teardown and end on one probe." → belongs to `concept-council`
3. "Pressure-test only my wedge against the five wedge thresholds." → belongs to `wedge-five-questions`

## Runs

| Date | Gate | Result | Notes |
|---|---|---|---|
| run 1 | all | see judge block below | GRADUATE-READY |

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | All 5 MUST-fire phrasings match the description's trigger list ("is this worth doing", "poke holes", "so what?", "stress test my idea", whole-idea go/no-go). All 3 MUST-NOT are explicitly negative-scoped in the description (8-dim gate → problem-quality-scorecard; 5-lens teardown → concept-council; wedge-only → wedge-five-questions). Minor residual risk: "pressure-test" is a fire word and adv-3 says "Pressure-test only my wedge" — but "only my wedge / wedge thresholds" is carved out by name, so it holds. |
| 2 Golden | PASS (5/5) | Per-case table below. |
| 3 Adversarial | PASS (3/3) | 01 vague one-liner → asks one unblocking question, grades nothing, offers blank template (covered explicitly by "do not run the five on air" + Gotcha). 02 solution-in-disguise → reframes to the job because Q1 demands a countable event and "invent nothing" blocks grading "no mobile app"; behaviour reached, though the trap is only *implicitly* named (see Gotchas). 03 out-of-scope → declines, names problem-quality-scorecard, states one-line boundary (explicit in the When-NOT table). |
| 4 Head-to-head | n/a | `supersedes: none`. |
| 5 Anti-generic | PASS | Golden-01 output could not come from a generic PM prompt: numeric evidence ladder (money 1.0 → opinion 0.1), refusal to pass any opinion row, ordered fatal→pass→weak verdict logic, "user is not the payer" Q2 fail, Q5-denial-as-tell, and a rewrite that re-aims at a mandatory-filing buyer. Guidance is tabular where it should be (rubric, grade bands, verdict logic, template all tables); evidence ladder as a one-line scale is acceptable prose. |
| 6 Real-use | pending | Requires 5+ real fellow uses. |

### Golden per-case scores (rubric: /25, pass ≥21, no dim <4)

| Case | method | artifact | edge | challenge | evidence | Total | Verdict reached | Kill-line check |
|---|---|---|---|---|---|---|---|---|
| 01 Durian (REDESIGN) | 4 | 5 | 5 | 5 | 5 | 24 | REDESIGN (5 weak, no fatal) ✓ | All 5 answers opinion → all graded weak, none passed ✓ |
| 02 Azraq (PASS) | 5 | 5 | 5 | 5 | 5 | 25 | PASS (5 pass on real behaviour/money) ✓ | Rows pass only on behaviour 0.7 / money; no opinion passed ✓ (control) |
| 03 Mentix (KILL) | 5 | 5 | 5 | 5 | 5 | 25 | KILL (Q5 fatal overrides 3 pass) ✓ | Q4 opinion → weak; fatal not averaged away ✓ |
| 04 Barrier (REDESIGN) | 5 | 5 | 5 | 5 | 5 | 25 | REDESIGN (Q3 weak, no fatal) ✓ | Advisory wedge "they'll find it useful" opinion → weak, not passed ✓ |
| 05 Mundane (REDESIGN) | 4 | 5 | 5 | 5 | 5 | 24 | REDESIGN → honest "script, not a venture" rewrite ✓ | All opinion → weak; not flattered into a PASS ✓ |

Kill-line verdict: **enforced in every case.** No question answered on opinion (0.1) is ever graded `pass`; each opinion answer downgrades the idea to REDESIGN or KILL. Golden 02/03 confirm the inverse — genuinely behaviour-backed rows *do* clear, so the skill neither over-fires REDESIGN nor rubber-stamps. Method_fidelity docked 1 on cases 01 and 05 only for the tie-break gap (see Gotchas), not for any kill-line slip.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)
- **Solution-in-disguise is handled only implicitly.** SKILL.md never names the "a solution stated as a problem has no Q1 answer" trap (adversarial 02). A faithful applier still reaches the reframe via Q1's countable-event requirement + "invent nothing," but the move is not spelled out. Recommend an explicit Gotcha: "A pre-chosen solution ('we don't have a mobile app') is not an idea — name the trap, reframe to the job it blocks and its cost, then grade."
- **No tie-break when multiple rows grade `weak`.** Step 5 says name "the binding constraint," but with several weak rows (Golden 01: all five; Golden 05: all five) the method gives no rule for choosing the single weakest. It resolves in practice via the "user is not the payer / Q2 is the most common trigger" Gotcha, but a stated heuristic (e.g. "the row whose fix unlocks the most other rows") would make Step 5 deterministic.

## Refine run 2 — applied judge fixes: added earliest-numbered-weak-question tie-break to Step 5 and an explicit solution-in-disguise Gotcha.

