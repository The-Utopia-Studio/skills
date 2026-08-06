---
name: current-state-map
description: Maps a workflow exactly as it happens today and puts a sourced price on every step — touch time, handoffs, delay, and failure/rework — then totals it into the current priced practice per unit. Fires on "how is this done today", "map the workflow", "what does it cost now", "walk the as-is process and price it", "where does the time and money go in this workflow". Outputs a filled priced step ledger: per-step cost + cited source + evidence-ladder weight + the four hidden-cost lines + grand total per unit + the step that holds the most cost, every number tagged [Fact]/[Assumption]/[Hypothesis]. NOT the theoretical floor or the build/walk gap verdict (use physics-floor-gap — this builds the current-cost side that skill divides against), NOT the primitive job with tool and role names stripped (use job-in-primitives), NOT total market size (use bottoms-up-quantification), NOT qualitative problem-space framing / HMW (use problem-framing-canvas).
type: generator
supersedes: none
---
# Current State Map

## What it does
Turns "how is this done today?" into an invoice. It walks the workflow as it actually happens — one row per step — and puts a sourced price on each: touch labour, the handoff tax between steps, the cost of delay, and the cost of failure and rework. The lines total into the current priced practice per unit ([template.md](template.md)), and the map names the single step that holds the most money. That total is the number `physics-floor-gap` divides against the theoretical floor. This is not a swim-lane diagram and not a problem-space frame. It is a priced ledger of today's work, sourced to artefacts, tagged on the evidence ladder.

## The Icarus reframe
A generic workflow map is a swim-lane: boxes and arrows that show what happens and price nothing. When it does price, it prices only the touch labour you can see — the minutes a person spends hands-on — and misses the three costs that usually dominate: the handoff tax in the seams, the delay while the clock runs, and the failure tail when a bad output escapes. Icarus refuses an unpriced box. Every step carries a number, and every number cites the artefact it came from — a timesheet, an invoice, a ticket log, one timed run — or it is marked an opinion and the map is declared not ready. The reframe of MITRE's "who benefits when the problem exists?" is blunt here: the beneficiary of the status quo is the priced line item automation deletes, and the map shows you exactly which one.

## When to use / When NOT
Use it when you have a real workflow that happens today and you want to know what one pass through it actually costs, step by step, with the money sourced.

| Situation | Use this? | Go to |
|---|---|---|
| "How is this done today? Map it and price every step." | Yes | current-state-map |
| "What does one pass through this workflow cost us now?" | Yes | current-state-map |
| "Where does the time and money go in this process?" | Yes | current-state-map |
| "What should this cost / is the gap big enough to build?" | No | `physics-floor-gap` (feed it this map's total) |
| "Strip this job to its primitive — information, decisions, liability." | No | `job-in-primitives` |
| "What's the TAM / total market for this?" | No | `bottoms-up-quantification` |
| "Frame the problem space — biases, who's affected, How Might We." | No | `problem-framing-canvas` |

This skill prices today's workflow and stops. It does not compute a floor, a gap, or a market. If the fellow wants those, name the sibling and hand off.

## Method
Work the ledger in [template.md](template.md). Do not narrate the process; fill the rows. Every number carries a tag: `[Fact]` (from a cited priced artefact or a directly observed run), `[Assumption]` (a stated, defensible estimate), `[Hypothesis]` (a guess flagged as needing evidence). Every number carries a source cell.

**Step 1 — Name the unit and its trigger.** One pass through the workflow that produces one output (one report, one permit, one reconciled invoice) and what kicks it off. State frequency. If the fellow cannot name a discrete unit, stop and ask for it. Invent nothing.

**Step 2 — Walk the as-is steps in order.** How the work *actually* happens, not the written SOP and not the future with your product in it. One row per step: actor/role, the artefact it consumes or produces, and touch minutes.

**Step 3 — Price touch labour.** Touch minutes × loaded rate (salary + overhead + benefits, not base). Cite the source of the minutes in each row.

**Step 4 — Add the handoff tax.** Count every handoff — work passing between people or systems. Each one costs coordination: waiting for the right person, reloading context, re-explaining. Price it. The cost of a workflow often lives in the seams, not the steps.

**Step 5 — Price delay separately from labour.** Elapsed time is not touch time. Idle waiting costs money only if the clock costs money — carrying cost, an SLA penalty, a rig standing idle, a decision that decays, a customer who churns. If delay is free, write £0 and say why. Never inflate free waiting into a fake cost.

**Step 6 — Price failure and rework.** Two lines. (a) Rework loop = P(bounce) × cost of redo. (b) Escaped failure = P(bad output reaches the customer) × cost of that failure. A rare, expensive tail can dominate the whole map. If you cannot source it, tag it `[Hypothesis]` and flag it. Do not drop it to keep the map tidy, and do not invent a number to fill it.

**Step 7 — Total = touch + handoff + delay + failure.** This is the current priced practice per unit. It is the number `physics-floor-gap` divides against the floor.

**Step 8 — Cost concentration.** Rank the steps by cost. Name the single step that holds the most. That is where the product must bite first, and it foreshadows the automatable part (floor part A) and the irreducible judgment (floor part B) the next skill will separate.

**Step 9 — Map-readiness verdict.** The total is only as trustworthy as the evidence under its biggest cost line. Apply the gate.

| Condition | Verdict |
|---|---|
| Every step priced; the dominant cost line sits at ladder ≥ 0.7 | READY — the total is trustworthy; hand to `physics-floor-gap` |
| The dominant cost line (> 40% of total) sits at ladder ≤ 0.3 | NOT READY — source that line first; name the cheapest artefact, then re-total |
| Any step has a blank cost | AUTO-FAIL — an unpriced step is not a map |
| Any price cites no artefact | that cell is an opinion (0.1); if it is the dominant line → NOT READY |
| Unpriced `[Hypothesis]` tail whose plausible magnitude could exceed the priced total — *dominant-suspect* | NOT READY — an unpriced line that could be the biggest one means the total may be the small half; price the tail (failure rate × £/failure) before trusting the figure |
| Unpriced `[Hypothesis]` tail that sits outside an otherwise-sourced holding total and cannot plausibly exceed it — *upside-risk* | READY — the total holds; carry the tail flagged as an upside-risk number to price before scaling |

**Kill line: an unpriced step, or a price with no cited source, fails the map.** The priced ledger is the product. A swim-lane with no money on it, or numbers invented rather than sourced from the fellow's artefacts, is not this skill's output.

## Evidence standard
The prices are where fellows guess. Each must sit on money or behaviour, not opinion. Weight every line by the evidence ladder.

| Source for a priced line | Ladder weight |
|---|---|
| Invoice / rate card / timesheet with £ against the step (money moved) | 1.0 |
| A directly timed run or a ticket/system log (behaviour observed) | 0.7 |
| A process doc or template that implies the step but not its cost (artefact shown) | 0.5 |
| "The team says it's about a day" (verbal commitment) | 0.3 |
| The fellow's opinion of what it costs | 0.1 |

A confident aggregate — "it takes two weeks and costs a fortune" — is a 0.1 opinion, not a total. The skill decomposes it into steps and demands a source per step; it never accepts the lump sum and never floors it downstream. The dominant cost line sets the map's confidence: a £/unit total whose biggest term is a guess is a hypothesis wearing a decimal point. When a line is weak, name the cheapest artefact that lifts it: pull one timesheet week, time one run with a stopwatch, export one month of the ticket log.

## Gotchas
- **Conflating elapsed time with touch time.** "It takes two weeks" prices nothing — six of those days may be idle waiting that costs £0, and the touch labour may be six hours. Separate the clock from the labour or the total is fiction.
- **Pricing the official SOP, not the real practice.** The documented process and the actual one diverge. The cost hides in the undocumented chases, reworks, and Slack messages. Map what happens, not what is written down.
- **Dropping the failure tail because it is hard to source.** A rare, expensive failure — a missed gas leak, a line stoppage, a mispriced SLA — can exceed all the touch labour combined. Tag it `[Hypothesis]`, name the two numbers that would price it, and flag it. Never drop it; never invent it.
- **Counting only the people you can see.** The handoff tax and the delay cost are invisible on a swim-lane and often beat the touch labour. A map that prices only the obvious steps understates the prize and points the product at the wrong step.
- **A tidy total hiding a guessed dominant line.** A per-unit number feels solid the moment it has a decimal point. If its largest term rests on a 0.1 opinion, the concentration gate must catch it and hold the verdict at NOT READY.

## Examples
- [examples/sample.md](examples/sample.md) — Azraq's static site risk report, decomposed and priced: five touch steps + rework loop + handoff tax reconcile to the £960 analyst-day, delay priced at £0 (and why), the failure tail flagged `[Hypothesis]`, drafting named as the dominant £300 line. Feeds `physics-floor-gap` directly.

## Related skills
- `physics-floor-gap` — divides this map's total (the current cost) against the theoretical floor to return the build/walk gap verdict. Run this first; it produces the number that skill needs. This skill never computes a floor or a gap.
- `job-in-primitives` — strips the same job to information moved / decisions made / liability transferred, with tool and role names deleted. The opposite move: this map keeps every tool, role, and handoff visible because that is where the cost sits.
- `product-as-decision` — names the one decision the workflow exists to make easier; this prices the whole workflow around it.
- `bottoms-up-quantification` — multiplies the per-unit cost across units to size the market; this builds the per-unit cost it multiplies.
- `problem-framing-canvas` — the qualitative problem-space frame (biases, who is affected, How Might We). Supersedes nothing: this absorbs its "map how it actually happens" and "who benefits from the status quo" moves and reforges them as a priced ledger, where the beneficiary of the status quo is the line item automation deletes.
