---
name: product-frame-stack
description: >-
  Walks one validated problem up a load-bearing stack — validated problem → vision
  → strategy → product vision → North Star → OKRs → dual-track roadmap — and BLOCKS
  any layer from resting on an unvalidated problem below it. Fires on "frame the
  business", "vision to roadmap", "what's the strategy", "turn this validated problem
  into a roadmap", "give me the vision, North Star and OKRs". Output is a filled frame
  stack where every layer inherits the problem's evidence rung and every roadmap item
  ladders to a North Star. NOT the go/no-go that validates the problem in the first
  place (use problem-quality-scorecard / so-what-stress-test — this consumes their
  verdict), NOT the desirable/feasible/viable score (four-lenses-test), NOT the
  post-launch metric-tree and retention check (metrics-that-matter).
type: generator
supersedes: none
---
# Product Frame Stack

## What it does
Turns a *validated* problem into the full strategic frame in one pass: vision, strategy, product vision, North Star, OKRs, and a dual-track roadmap. It treats these seven layers as a load-bearing stack, not a flat canvas. The problem sits at the bottom and carries an evidence rung; every layer above inherits that rung as a confidence ceiling. If the problem has not cleared the Icarus gate, the stack does not get built — the skill stops at the floor and routes the fellow back to the gate. The output is a filled frame stack ([template.md](template.md)) in which no roadmap item exists without a North Star to move, and no layer claims more certainty than the problem underneath it.

## The Icarus reframe
A business-model or recommendation canvas lays the boxes flat: fill vision, strategy, metrics, roadmap side by side, each on whatever evidence you happen to have, and you get a "recommendation" even if every box rests on opinion. Icarus refuses the flat canvas. The layers are stacked and structural. Two rules make them load-bearing. First, the **gate**: nothing enters the stack until the problem has passed `problem-quality-scorecard` (≥32/40) or `so-what-stress-test` (PASS) — an unvalidated problem is a cracked foundation and the stack refuses to be poured on it. A PASS resting on behaviour or money (0.7+) unlocks a full-confidence stack; a *soft* PASS resting only on an artefact or a verbal "yes" (0.5/0.3) still enters, but the whole stack is stamped `[Assumption]` and the roadmap is labelled a bet, not a committed plan (this is the Layer-0 floor, below). Second, the **ceiling**: the whole stack is stamped with the problem's evidence rung, so a roadmap resting on a `[Assumption]`-grade problem is itself a bet, tagged as one, never a committed plan. The North Star is the joint between strategy and delivery, and it is mandatory: a roadmap with no North Star, or a roadmap item that ladders to nothing, is an auto-fail. Dual-track runs the whole height — discovery beside delivery at every horizon — because launch is when discovery gets cheap, not when it ends.

## When to use / When NOT
Use it when a fellow holds ONE problem that has already cleared the gate and needs the strategy frame built on top of it, end to end.

| Situation | Use this? | Go to |
|---|---|---|
| "Frame the business — vision to roadmap." | Yes | product-frame-stack |
| "We passed the problem gate. What's the strategy and roadmap?" | Yes | product-frame-stack |
| "Give me the vision, North Star, and OKRs for this." | Yes | product-frame-stack |
| "Score this problem across the eight dimensions — go or no-go?" | No | `problem-quality-scorecard` (the gate this consumes) |
| "Is this desirable / feasible / viable — should we build it?" | No | `four-lenses-test` |
| "What metrics matter after launch? Is retention flattening?" | No | `metrics-that-matter` |
| "What should we actually build — invent the solution?" | No | `invent-by-hand` |
| "State this as the one decision it changes." | No | `product-as-decision` |

This skill builds the frame; it does not validate the problem, score the four lenses, invent the solution, or run the post-launch metric tree. It absorbs the generic `business-model` and `recommendation-canvas` and beats them (see Related skills), so it does not route there.

If the fellow hands a problem with no gate verdict, do not build the stack. Ask the one unblocking question — has this cleared `problem-quality-scorecard` or `so-what-stress-test`, and on what evidence? — or route there. Invent no vision, no metric, no roadmap to fill the gap.

## Method
Fill the stack in [template.md](template.md), bottom to top. Do not narrate; fill the layers. Tag every empirical claim `[Fact]` (priced artefact or observed behaviour), `[Assumption]` (a stated, defensible estimate), `[Hypothesis]` (a directional or not-yet-observed claim). Vision, strategy, and product vision are claims about the future, so they are `[Hypothesis]` by nature — their *plausibility*, not their tag, is what inherits the ceiling.

Copy this checklist:

```
Product Frame Stack progress:
- [ ] Layer 0: Gate check — is the problem validated, and at what rung? (BLOCK if not)
- [ ] Layer 1: Vision
- [ ] Layer 2: Strategy (beachhead · wedge · won't-do · does-the-wedge-pay)
- [ ] Layer 3: Product vision
- [ ] Layer 4: North Star (one leading value metric + one guardrail)
- [ ] Layer 5: OKRs (objective + 2–3 outcome KRs that move the North Star)
- [ ] Layer 6: Roadmap — delivery outcomes beside discovery questions (Now/Next/Later)
- [ ] Check: evidence-ceiling propagation (no layer tagged above the problem's rung)
- [ ] Check: run the two kill-lines before returning
```

**Layer 0 — Gate check (the floor). Apply this first, in order:**

| Problem status coming in | Evidence rung | Stack verdict |
|---|---|---|
| PASS `problem-quality-scorecard` (≥32) or `so-what-stress-test` (PASS), resting on money/behaviour | 1.0 / 0.7 | BUILD. Ceiling = that rung. |
| PASS, but resting only on an artefact or a verbal "yes" | 0.5 / 0.3 | BUILD, and stamp the whole stack `[Assumption]`: the roadmap is a bet, labelled as one. Name the test that would lift it. |
| REDESIGN, not-ready-to-score, or opinion-only (0.1) | 0.1 | **BLOCK.** No stack. Return the cheapest test that would clear the gate. |
| Never gated | none | **BLOCK.** Route to `problem-quality-scorecard` / `so-what-stress-test` first. |

A BLOCK ends the run. Do not build a vision on a problem the gate has not passed — that is the skill's first auto-fail.

**Layer 1 — Vision.** The world once this problem is gone at scale, in the customer's terms, 3–5 years out. Ban product nouns and feature-talk (see Gotchas). One or two sentences. It describes an outcome for the target, not a thing you shipped.

**Layer 2 — Strategy.** The one hard choice, in three lines plus a viability check:
- **Beachhead:** the single segment you win first (one named who, not "the market").
- **Wedge:** the narrow first slice where you can be unambiguously best (hand off to `wedge-five-questions` if this is soft).
- **Won't-do:** at least one thing a generic team would chase that you are deliberately refusing. A strategy with no refusal is a wish list.
- **Does the wedge pay?** One line of unit economics — price the metric against the cost to serve one unit. This is the one bone worth keeping from a business-model canvas: revenue minus cost-to-serve at the wedge, not a nine-box tour. When the wedge's payoff is internal efficiency, not a sale — labour or time saved rather than revenue charged — measure value as the cost or time saved per unit against the cost to serve it, tagged `[Assumption]`. Do not fabricate a revenue or cash-flow story to force the line, and do not skip the check: an efficiency wedge that saves less than it costs to serve is as unviable as one that sells below cost. If it does not pay at the wedge, the strategy is unviable and the stack stops here.

**Layer 3 — Product vision.** What the product IS when the strategy is executed: the decision it compresses, at scale, for the beachhead. Reuse the compressed-decision statement from `product-as-decision` if one exists. Still not a feature list — the decision plus its compression.

**Layer 4 — North Star.** ONE metric. Quality bar, all four required:
- **Single.** One number, not a dashboard.
- **Leading, not lagging.** It predicts retained value. Revenue and total-users-ever are lagging; ban them here.
- **Per-unit value.** Value delivered per customer or per use, tied to the compressed decision — not a usage-volume vanity count.
- **Measured, or `[Hypothesis]` with the instrumentation named.** If you cannot yet count it, say what you will instrument to count it.
- **Plus one guardrail metric** so the North Star cannot be gamed (e.g. a value metric guarded by a quality/error metric that must not degrade). A North Star with no guardrail invites rubber-stamping.

**Layer 5 — OKRs.** One Objective drawn straight from the strategy. Two or three Key Results, each an **outcome** (a move in behaviour, money, or the North Star), never an **output** (a thing shipped). "Ship the flagging feature" is not a KR; "officers accept the flag without override on ≥X% of permits" is. At least one KR must move the North Star directly.

**Layer 6 — Roadmap (dual-track).** Now / Next / Later, and each horizon has two tracks side by side:

| Horizon | Delivery track (an outcome) | Discovery track (the riskiest open question) |
|---|---|---|
| Now | the North-Star or KR move you are delivering | what must be learned before the *Next* item is safe to build |
| Next | the next outcome, conditional on Now's learning | the assumption that gates it |
| Later | the outcome that opens the moat | the question whose answer would kill or confirm it |

No dated feature lists. Every delivery item must ladder to the North Star; an item that moves nothing gets cut or explicitly parked with the reason. The discovery track is not optional garnish — it is where the next horizon's risk gets retired.

**Propagation check.** No layer may be tagged above the problem's rung from Layer 0. If the problem is `[Assumption]`, the roadmap is `[Assumption]`. Stamp the whole stack with the ceiling rung and say so in one line.

**Kill-lines (run both before returning):**
1. Does any layer rest on a problem the gate did not pass? If yes, the stack is void — return the BLOCK.
2. Is there a North Star, and does every roadmap item ladder to it? If no North Star, or an orphan roadmap item, fix it before returning.

## Evidence standard
Money moved 1.0 → behaviour observed 0.7 → artefact shown 0.5 → verbal commitment 0.3 → opinion 0.1. The gate bar is 0.7: the *problem* must rest on behaviour or money to unlock a full-confidence stack. A problem passed on an artefact or a verbal "yes" still builds a stack, but the entire stack is stamped `[Assumption]` and the roadmap is named a bet, not a plan. The North Star must be a measurable leading metric or an explicit `[Hypothesis]` with named instrumentation — never a lagging revenue figure dressed as a North Star. OKR key results are outcomes (behaviour/money/North-Star movement), so an output masquerading as a KR ("shipped X") caps that KR at opinion and does not count. Tag every empirical claim. The confidence ceiling is structural: promoting any layer above the problem's rung is the inflation this standard exists to catch.

## Gotchas
- **Building on an ungated problem.** The most common failure: a fellow arrives excited with a problem and wants the whole frame, but the problem never cleared `problem-quality-scorecard` or `so-what-stress-test`. Every layer you build is then a hypothesis stacked on a hypothesis. Stop at Layer 0 and route to the gate. A beautiful roadmap on an unvalidated problem is the auto-fail, not the deliverable.
- **Strategy that is really a solution.** "Our strategy is to build a mobile app / an AI platform" names an artefact, not a choice. Strategy is beachhead + wedge + what you refuse. If the "strategy" line has no refusal and no beachhead, it is a solution in disguise — reframe it, do not fill the box.
- **Lagging North Star.** Revenue, total signups, and cumulative-users-ever feel like North Stars and are all lagging. They tell you the past, not whether value is landing now. Pick the leading per-unit value metric, and guard it so it cannot be gamed.
- **Roadmap as a dated feature list.** Now/Next/Later of shipped features is a Gantt chart, not a frame. The roadmap tracks outcomes (North-Star / KR moves) beside the discovery questions that gate them. An item that ladders to no North Star is cut.
- **Ceiling inflation.** A `[Fact]`-tagged roadmap on an `[Assumption]`-tagged problem is the tell. The stack cannot be more certain than its floor. If you catch a higher tag above a lower one, the higher one is wrong.
- **Vision as a product spec.** "A world with a great copilot for every plant manager" describes your product, not the customer's world. The vision is the outcome once the problem is gone; strike the product noun.

## Examples
[examples/sample.md](examples/sample.md) — Barrier Intelligence, worked end to end: a hot-work-permit safety problem that cleared `problem-quality-scorecard` at 34/40 (behaviour-grade, 0.7) built into the full stack — vision, beachhead strategy with a won't-do and a unit-economics check, product vision, a leading North Star (verified hot-work permits per rig-week) guarded by a zero-false-clear metric, outcome OKRs, and a dual-track Now/Next/Later roadmap where the moat question sits on the Later discovery track. Every layer stamped at the 0.7 ceiling.

## Related skills
Absorbs `concept/business-model` and `concept/recommendation-canvas`. The business-model canvas lays nine operational boxes flat with no vision, no trade-off, no metric, and no validation gate — its own documentation admits these gaps. The recommendation canvas adds outcomes, a solution hypothesis, and success metrics, but stays a flat ten-box fill you complete once for exec sign-off; it never blocks, so every box can rest on opinion and still yield a "recommendation". This skill keeps their useful bones — the business-outcome-beside-customer-outcome pairing, the "solution is a hypothesis" spine, the revenue-minus-cost viability check — and rebuilds them as a *stack with a gate and a ceiling*: an unvalidated problem cannot pass to strategy, and no layer outranks the evidence below it. `supersedes: none`: both canvases live outside this module; this replaces their role inside Icarus without deleting them.

Consumes: `problem-quality-scorecard` and `so-what-stress-test` — their PASS verdict and evidence rung are this skill's Layer 0 input; without one, it blocks.

Composes with: `product-as-decision` (its compressed decision feeds the product-vision layer), `wedge-five-questions` (run it when the strategy's wedge is soft), `four-lenses-test` (the desirable/feasible/viable score that can run beside this frame), `metrics-that-matter` (the post-launch metric tree and retention-flattening check that deepens the North Star this skill names).
