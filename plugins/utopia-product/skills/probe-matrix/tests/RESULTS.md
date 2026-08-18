# Eval log — probe-matrix

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision

MUST fire (5):
1. "What's the cheapest way to test whether operators trust the alert?"
2. "Which experiment should I run to learn if they'll pay?"
3. "Which probe fits this question?"
4. "How do I validate this cheaply before building?"
5. "What's the cheapest way to learn whether plant managers would use the copilot?"

MUST NOT fire (3, name the sibling each belongs to):
1. "Is this problem good enough to build?" → belongs to `problem-quality-scorecard` (the build/no-build gate on the problem, not a probe choice)
2. "Walk me through actually setting up the concierge probe — tooling and scripts." → belongs to `concierge-probe` (the runbook; probe-matrix selects, it does not operate)
3. "What evidence rung does 'they said they'd buy it' sit on?" → belongs to `evidence-ladder` (scores a signal already in hand)

## Skill-specific kill line (judge enforces)

Auto-fail this skill if the output:
- recommends, endorses, or fails to kill a probe that lies about the stated learning
  target (e.g. paper/landing for trust, Wizard-of-Oz for feasibility/unit cost,
  agent-concierge for trust/adoption), OR
- pre-registers a read-out that lands on verbal or opinion evidence for a target that
  needs behaviour or money (e.g. "operators said they trust it" as a trust read-out),
  OR
- launders target F (feasibility/scale) into a cheap probe instead of stating that no
  cheap probe is honest about it.

## Head-to-head vs prototyping-pretotyping

This skill is scored against `prototyping-pretotyping` on the same inputs. It must
win on **proprietary_edge** and **challenge**.

Why it wins:
- **Honesty contract, not a fidelity ladder.** The old skill ranks probes L0–L4 by
  how much you build and lists methods by assumption type. It never states what a
  method *cannot honestly tell you*. probe-matrix carries the fixed contract — what
  each probe is honest about and what it lies about — tied to the top evidence rung
  each probe can produce.
- **It refuses.** The old skill's behaviour-over-opinion line is a guardrail
  (a reminder). probe-matrix has a kill line: on a target a probe lies about, it
  kills that probe and names the honest one. The old skill will happily route a paper
  prototype at demand (its Demand-assumption row lists fake-door/paper) or a landing
  page at a value prop, with no warning that those lie about trust.
- **Concrete divergence — the trust case (Golden 01).** On "test whether operators
  trust the alert," prototyping-pretotyping routes to a paper/clickable prototype
  (workflow fidelity) or a fake-door (demand), both of which lie about trust.
  probe-matrix kills those, reroutes to concierge/field, and pre-registers a
  behaviour read-out. Expect proprietary_edge and challenge to come back markedly
  higher for probe-matrix on all trust/feasibility/cost inputs, where the honesty
  contract does work the fidelity ladder structurally cannot.
- **Absorbed its bones.** Riskiest-assumption-first (Step 1), set-criteria-before-
  testing (Step 5), behaviour over opinion (throughout) are kept and sharpened, then
  beaten with the contract + kill line.

Expected margin: proprietary_edge and challenge both higher for probe-matrix,
widest on Golden 01 (trust) and Golden 04 (cost), where a fidelity-only skill has no
way to warn the probe lies about the target.

## Runs

| Date | Gate | Result | Notes |
|---|---|---|---|
| run 1 | all | GRADUATE-READY | see judge run below |

## Judge run — run 1

Judge did not author this skill. Gate 4 REQUIRED (supersedes prototyping-pretotyping).

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | All 5 MUST-fire match explicit triggers ("cheapest way to learn X", "which experiment", "which probe", "how do I validate this"). All 3 MUST-NOT-fire are explicitly excluded in the description's NOT-clauses (problem-quality-scorecard / runbooks / evidence-ladder) and match no fire trigger. |
| 2 Golden | PASS (5/5) | per-case totals below; every case maps target→honest probe, names what the probe still lies about, pre-registers a behaviour/money read-out; no fabrication. |
| 3 Adversarial | PASS (3/3) | 01 asks the ONE question + offers A–F menu, invents nothing (Step 1 rejects too-broad); 02 names the solution-in-disguise trap, refuses to route, reframes to the job, cites problem-statement; 03 declines the how-to, names wizard-of-oz-probe, hands off. No fabrication / flattery / scope-poaching. |
| 4 Head-to-head | PASS (new wins all 3) | totals below — new beats old on TOTAL and on proprietary_edge + challenge on every input. |
| 5 Anti-generic | PASS | Golden 01 output kills the proposed probe, ties honesty to a fixed evidence-rung ceiling (0.3/0.5/0.7), and names what concierge still lies about — a generic PM prompt could not produce the rung ladder or the refusal. Guidance is properly tabularised (honesty contract, target map, read-out all tables). |
| 6 Real-use | pending | requires 5+ real fellow uses — not executable here. |

### Gate 2 — per-case scores (rubric: /25, pass ≥21, no dim <4)

| Case | method_fidelity | artifact_complete | proprietary_edge | challenge | evidence_standard | Total | Pass |
|---|---|---|---|---|---|---|---|
| G01 trust (KILL paper→concierge) | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |
| G02 pull (Wizard-of-Oz) | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |
| G03 pay & workflow (concierge) | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |
| G04 automation & cost (agent-concierge) | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |
| G05 legibility (paper — mundane) | 5 | 5 | 5 | 4 | 5 | 24 | ✓ |

No auto_fail triggered on any case (no invented findings; pre-registered thresholds are criteria, not fabrications; no flattery; no scope-poach; not boilerplate).

### Special check — honesty contract + REFUSAL

PASS. On G01 the fellow proposes a paper probe for "do operators trust the alert." Step 4 kills it (paper tops out at comprehension 0.5 / verbal 0.3; trust needs behaviour-under-stakes 0.7), names exactly what it lies about, and reroutes to concierge/field with a behaviour read-out that explicitly rejects "operators said they trust it" (0.3). The kill line ("recommends a probe that lies about the thing being tested") is NOT triggered — the skill does the opposite. No golden endorses a lying probe.

### Gate 4 — head-to-head vs prototyping-pretotyping (scored on probe-matrix's rubric)

| Input | probe-matrix total | old total | proprietary_edge (new vs old) | challenge (new vs old) |
|---|---|---|---|---|
| G01 trust | 25 | ~10 | 5 vs 1 | 5 vs 2 |
| G03 pay & workflow | 25 | ~10 | 5 vs 1 | 5 vs 2 |
| G04 automation & cost | 25 | ~10 | 5 vs 1 | 5 vs 2 |

Why old scores low: the fidelity ladder routes by how-much-you-build and has no honesty contract or refusal. On trust it routes paper/clickable (Workflow row) or a fake-door (Demand row) — both lie about trust, no warning. On pay it routes a landing-page price test (measures click-intent, not real money; misses the reconciliation exceptions). On cost it offers "manual concierge first" — which tells you nothing about *agent* cost (the exact gotcha probe-matrix names). Its "observe behavior not opinions" guardrail is a reminder, never a refusal. New wins on TOTAL and on both required dimensions on all three, widest on trust and cost as predicted.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)

- **Fire-then-clarify on vague input is by design but worth flagging.** The trigger "how do I test this cheaply" fires on genuinely under-specified inputs (Adversarial 01). The skill self-corrects via Step 1 (reject too-broad, ask the ONE question), which is correct — but the description could note that a fired-but-unroutable input must exit to the ONE-question ask, not a probe. Low severity; behaviour is already correct.
- **Target F routes the fellow out of the skill.** When the ONE question is genuinely feasibility/scale, none of the four probes is honest and the skill correctly says so and names a build track. This is honest, not a defect, but means an F-only fellow gets no in-skill instrument. Consider a one-line pointer to where the build-track decision lives.
- **Mundane case (G05) is the thinnest on `challenge`.** With no weak input to kill, the skill's value is restraint (don't over-escalate) — the existing "Don't over-escalate the mundane" gotcha covers it, but a rigid judge can dock `challenge` by a point. Already handled; noted for awareness.

## Refine run 2 — applied judge fixes: added Gotcha that the mundane/obvious probe pick still owes an explicit "what it lies about" line (thinnest-challenge guard).
