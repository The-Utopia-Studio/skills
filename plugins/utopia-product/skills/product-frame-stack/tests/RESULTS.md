# Eval log — product-frame-stack

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision
MUST fire (5):
1. "Frame the business — vision to roadmap."
2. "What's our strategy?"
3. "We passed the problem gate — now what's the frame?"
4. "Give me the vision, North Star, and OKRs for this."
5. "Turn this validated problem into a roadmap."

MUST NOT fire (3, name the sibling each belongs to):
1. "Score this problem across the eight dimensions — go or no-go?" → belongs to `problem-quality-scorecard`
2. "Should we build this — is it desirable, feasible, viable?" → belongs to `four-lenses-test`
3. "What metrics matter after launch — is retention flattening?" → belongs to `metrics-that-matter`

## Runs
| Date | Gate | Result | Notes |
|---|---|---|---|
| run 1 | all | GRADUATE-READY | see judge run below |

## Judge run — run 1
| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | Description names all 5 fire phrasings verbatim/near-verbatim ("frame the business", "what's the strategy", "vision to roadmap", "give me the vision, North Star and OKRs", "turn this validated problem into a roadmap"). Explicit negative scoping — "NOT the go/no-go … (problem-quality-scorecard)", "NOT the desirable/feasible/viable score (four-lenses-test)", "NOT the post-launch metric-tree … (metrics-that-matter)" — cleanly repels all 3 must-not-fire siblings. |
| 2 Golden | PASS (5/5) | per-case table below |
| 3 Adversarial | PASS (3/3) | 01 vague one-liner → asks the one unblocking question (which validated problem + gate status + evidence), invents nothing (When-NOT §). 02 solution-in-disguise → names the trap ("mobile app" is an artefact, not a choice; Gotcha "Strategy that is really a solution"), reframes Layer 2 to beachhead+wedge+won't-do, and re-runs Layer 0 on the unverified "validated fine" (demands verdict+rung). 03 out-of-scope score request → declines, routes to problem-quality-scorecard (+ so-what-stress-test), emits no /40. No fabrication, no flattery, no scope-poach. |
| 4 Head-to-head | n/a | `supersedes: none`. Absorbs business-model / recommendation-canvas but they live outside the module; Gate 4 not applicable. |
| 5 Anti-generic | PASS | Golden-01 output could not come from a generic PM prompt: the Layer-0 gate that BLOCKS, the evidence-rung ceiling stamped across every layer (0.7 → whole stack `[Assumption]`/`[Hypothesis]`), the single move that lifts the floor to 1.0, the two kill-lines, dual-track roadmap with the moat on the Later discovery track, and the false-clear guardrail are all load-bearing, not decoration. Core decision logic (Layer-0 verdict, roadmap, North-Star bar) is tabular/checklist, not prose. |
| 6 Real-use | pending | requires 5+ real fellow uses |

### Golden per-case scores (rubric: /25, pass ≥21 AND no dim <4)
| Case | method_fidelity | artifact_complete | proprietary_edge | challenge | evidence_standard | Total | Verdict |
|---|---|---|---|---|---|---|---|
| 01 Barrier (seed, 0.7 ceiling) | 5 | 5 | 5 | 4 | 5 | 24 | PASS |
| 02 Azraq (soft PASS → whole stack `[Assumption]`) | 5 | 5 | 5 | 5 | 5 | 25 | PASS |
| 03 Mentix (rejects lagging MRR North Star + output KRs) | 5 | 5 | 5 | 5 | 5 | 25 | PASS |
| 04 BLOCK (ungated → STOP at Layer 0) | 5 | 5 | 5 | 5 | 5 | 25 | PASS |
| 05 Durian (roadmap with no North Star → blocked) | 5 | 4 | 5 | 5 | 5 | 24 | PASS |

Kill-line verification (the skill's reason to exist):
- **Unvalidated problem passing down to strategy/roadmap:** DEFENDED. Golden 04 (opinion 0.1, never gated) → BLOCK, no layer built, routes to gate + names cheapest unblock. Adversarial 01/02 (no floor / "validated fine" unverified) → asks for the gate rung, builds nothing. Layer-0 table + kill-line #1 + Gotcha "Building on an ungated problem" all enforce this.
- **Roadmap with no North Star:** DEFENDED. Golden 05 → kill-line #2 fires, roadmap blocked until a leading per-unit North Star + guardrail is named; handed feature-list rewritten as outcomes.
- **Evidence rung caps every layer above:** VERIFIED. Goldens 01 (0.7 → nothing tagged `[Fact]` above the floor) and 02 (0.5 → whole stack `[Assumption]`, roadmap named a bet, cheapest-test-to-lift-the-floor on the Now discovery track). No auto_fail triggered on any case; unit-economics uses bracketed `[illustrative]` placeholders tagged `[Assumption]` rather than fabricating a number.

### Gotchas surfaced (for the author to fold into SKILL.md ## Gotchas)
- **Gate-bar wording vs. Layer-0 row 2 tension (minor).** The Icarus-reframe sentence says a problem enters the stack only after passing the gate "on behaviour-or-money evidence" (implying 0.7+), but the Layer-0 table row 2 admits a PASS resting only on artefact/verbal (0.5/0.3) and builds a `[Assumption]`-stamped stack (this is exactly Golden 02). Operational behaviour is unambiguous (table + Golden 02 govern), but the prose could be read as contradicting the table. Reconcile: a soft PASS on artefact/verbal still enters, but only as a labelled bet.
- **"Does the wedge pay?" on an internal-efficiency wedge (minor).** For value that is labour saved rather than a sale price (Golden 05: ~90 min/week hand-tagging, no external revenue), the "price the metric − cost to serve one unit" line is awkward — a fellow could be tempted to either fabricate a revenue/cash-flow story (auto_fail) or skip the check. The disciplined move (state time-value plainly, tag `[Assumption]`, invent no cash-flow) works, but the method doesn't spell out how the viability line applies when the wedge's payoff is time saved, not money charged.

## Refine run 2 — applied judge fixes: reconciled the reframe prose with the Layer-0 table (soft PASS on artefact/verbal enters but stamps the whole stack `[Assumption]`/bet), and extended "does the wedge pay?" to internal-efficiency wedges (measure cost/time saved per unit, tag `[Assumption]`, don't fabricate revenue, don't skip the check).
