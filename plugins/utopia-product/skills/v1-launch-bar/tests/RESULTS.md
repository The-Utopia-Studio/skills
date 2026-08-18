# Eval log — v1-launch-bar

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision

MUST fire (5):
1. "Are we ready to launch?"
2. "Is v1 good enough to ship?"
3. "Run it against the launch bar."
4. "Give me the go/no-go on v1."
5. "Should we ship this pilot?"

MUST NOT fire (3, name the sibling each belongs to):
1. "How do we keep improving the product month over month / what's the cadence / run the loop" → belongs to `refine-flywheel` (08)
2. "How should we price the pilot / what are the terms / set the commercial success metric" → belongs to `pilot-six-term-sheet` (07)
3. "Define what working means / write the golden set / what's the cost-per-outcome" → belongs to `eval-first-spec` (07)

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| run 1 | all | GRADUATE-READY | see judge run below |

## Judge run — run 1

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | All 5 must-fire phrasings are verbatim trigger phrases in the description ("are we ready to launch", "is v1 good enough", "launch bar", "go/no-go on v1", "should we ship this pilot"). All 3 must-not-fire are explicitly carved out with their sibling: ongoing loop/cadence → refine-flywheel; price/terms/success metric → pilot-six-term-sheet; define working / golden set / cost → eval-first-spec. |
| 2 Golden | PASS (5/5) | Per-case totals below. |
| 3 Adversarial | PASS (3/3) | 01 vague one-liner → Step 0 preconditions + "Do not invent readiness / never fabricate a stranger session" produce ask-for-the-running-v1 + outcome unit, no verdict. 02 solution-in-disguise → "Feature-completeness is not a gate here" + "static tool that demos beautifully" gotcha reframes wizard/polish to the two tests and flags Gate B untouched; routes UI craft to usability-test-protocol. 03 out-of-scope → When-NOT row 1 + Step 4 boundary decline-and-route to refine-flywheel by name, no cadence produced. No fabrication, no flattery, no poaching in any. |
| 4 Head-to-head | n-a | frontmatter `supersedes: none`. |
| 5 Anti-generic | PASS | Golden-01 faithful output turns on moves a generic PM prompt cannot supply: the ≤60s recorded true-stranger test with disqualification rules, the learn-from-corrections mechanism as a HARD gate (B1–B4 wired + B3 proven-once on tape + B5 numeric delta) before launch, the evidence ladder with a 0.7 floor, the "95% static-tool death shape" reframe, and two hard non-averaged gates. Generic prompt yields a feature/QA readiness checklist, not "NO-GO unless the corrections loop is proven once on tape." Guidance is properly tabular (Step 0, Gate A metrics, B1–B5, decision, ladder) and mirrored in template.md — not prose-smuggled. |
| 6 Real-use | pending | Requires 5+ real fellow uses; not executable here. |

### Gate 2 per-case scores (rubric: /25, pass ≥21 AND no dim <4)

| Case | method_fidelity | artifact_complete | proprietary_edge | challenge | evidence_standard | Total | Verdict |
|---|---|---|---|---|---|---|---|
| 01 Mentix clean-GO | 5 | 5 | 5 | 5 | 5 | 25 | PASS |
| 02 Barrier gas-safety | 5 | 5 | 5 | 4 | 5 | 24 | PASS |
| 03 Durian mundane draft | 5 | 5 | 5 | 5 | 5 | 25 | PASS |
| 04 Gate A fail / B strong | 5 | 5 | 5 | 5 | 5 | 25 | PASS |
| 05 "everyone loves it" | 5 | 5 | 5 | 5 | 5 | 25 | PASS |

Notes on the hard cases:
- **01**: Method correctly refuses to declare GO on an input that carries B1 + eval + running v1 but NO recorded stranger sessions and no B3/B4/B5 — it names the bar and the missing recordings rather than fabricating them (auto-fail avoided). "Clean GO" is the reachable path, not a licence to invent.
- **02**: The one soft spot. The autonomy-safety trap (confirmations must NOT auto-tighten thresholds / silently raise autonomy on an L0 safety product) is *catchable* from Step 4 ("promotes autonomy by eval result") but is not spotlighted as an in-Method rule or Gotcha, and `guardrail-design` (a real 07 sibling) is never named in the routing. Challenge scored 4, not 5, on that reliance on applier inference. Still passes.
- **04 / 05**: Step 3's explicit "Do not average… both are hard" and the Gotchas ("friendly stranger", "static tool that demos beautifully") produce the NO-GO cleanly; the ≤60s hard bar rejects the 90s run and disqualifies briefed viewers as opinion (0.1).

Kill-line check: NOT tripped. Both gates are hard (Gate A recorded ≥2/3 strangers ≤60s unaided; Gate B kill-rule = B1–B4 present + B5 numeric or NO-GO, with B3 proven-once on tape — a proven mechanism, not a promise). No pass on opinion (0.7 floor), no averaging. Does not poach `refine-flywheel`: Step 4 hands the *running* of the mechanism over; this skill wires + proves it once.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)
- **Corrections must not raise autonomy (safety).** The skill has no explicit Method rule or Gotcha that learning-from-corrections must NOT silently promote autonomy — critical for L0 safety products (Golden 02). It is only inferable from Step 4. Add a one-line rule/gotcha and name `guardrail-design` (07 sibling, exists, currently unreferenced) alongside `refine-flywheel` for autonomy promotion.
- **Adversarial-01 "one question" risk.** Step 0 lists three preconditions; nothing tells the applier to LEAD with the single unblocking ask (point me at the running v1 + the one outcome a stranger must reach). A lazy applier could dump all three at once — the exact adversarial-01 fail condition. Consider flagging the single lead question in-Method.
- **Sandbox/non-sandbox split (orchestrator sanity-check, not a scoring defect).** This skill lives under `skills/sandbox/product-icarus/…` and routes to `eval-first-spec` / `pilot-six-term-sheet` / `usability-test-protocol` that live in the NON-sandbox `skills/product-icarus/…` tree, while `refine-flywheel` is under `skills/sandbox/…/08-…`. All referenced skills exist by name, so routing is not broken, but confirm the intended home tree before graduation.

## Refine run 2 — applied judge fixes: added a Gotcha that the corrections loop must not silently raise autonomy (route to guardrail-design/refine-flywheel, no auto-promote), and a Step 0 rule to lead vague inputs with the single unblocking question.
