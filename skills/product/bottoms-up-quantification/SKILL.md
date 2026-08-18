---
name: bottoms-up-quantification
description: Builds the magnitude of an opportunity from the smallest countable units up, with every multiplier and its source shown in the open, and permits a top-down TAM only at the end as a labelled sanity check. Fires on "size this bottom-up", "build the number", "don't give me a TAM", "how big is this really, show me the arithmetic", "what's the total from the units up", or when a fellow has a per-unit value and wants a total market magnitude they can defend line by line. Outputs a filled bottom-up size model: atom + reachable population + frequency + value-per-event + capture, each rung ladder-weighted, weakest rung caps confidence, plus a TAM reconciliation band. NOT for the per-unit prize ratio of one unit (use physics-floor-gap — run it first), NOT for the 8-dimension problem gate (use problem-quality-scorecard), NOT for scoring the whole idea (use so-what-stress-test).
type: generator
supersedes: none
---
# Bottoms-Up Quantification

## What it does
Answers one question and shows its working: how big is the whole thing, built from the smallest unit you can actually count? It stacks a short multiplier chain — reachable population × frequency × value captured per event × capture fraction — where every rung is an atom you could in principle enumerate and check, every rung carries a source and an evidence-ladder weight, and the arithmetic sits on the page line by line. The output is a filled bottom-up size model ([template.md](template.md)) with two confidence bands: one from the weakest rung, one from reconciling the bottom-up total against a top-down TAM computed last and labelled a sanity check. The number is a wish until every rung is countable.

## The Icarus reframe
A generic prompt sizes a market top-down: pick a big industry figure, multiply by a penetration you invented, present the product. That number is unfalsifiable — you cannot point at a rung and disprove it — and it flatters everything. Icarus builds the number the other way: start from one countable atom, stack only multipliers you could enumerate, and leave the arithmetic exposed so any rung can be challenged. The top-down TAM is allowed exactly once, at the very end, as a sanity check — because two independent methods that agree within an order of magnitude triangulate, and two that disagree by more than ten times tell you one of them is fabricated. Leading with the TAM is the failure the whole skill exists to prevent.

## When to use / When NOT
Use it when you have an atom (a countable unit of value) and want a total magnitude you can walk through line by line and defend.

| Situation | Use this? | Go to |
|---|---|---|
| "Size this bottom-up / build the number / don't give me a TAM" | Yes | bottoms-up-quantification |
| "How big is the whole opportunity, and show me the arithmetic?" | Yes | bottoms-up-quantification |
| "Is one unit even worth building for — what's the per-unit prize?" | No | `physics-floor-gap` (run it first) |
| "Score my problem across all 8 dimensions." | No | `problem-quality-scorecard` |
| "Is the whole idea any good? Stress-test the concept." | No | `so-what-stress-test` |
| "Which wedge should we attack first?" | No | `wedge-five-questions` |

`physics-floor-gap` and this skill are a pair, not rivals. `physics-floor-gap` sizes the prize of ONE unit — the ratio of what one unit costs today to its physics floor — and tells you whether a single unit is worth automating. This skill sizes the TOTAL across all units, and reuses that per-unit prize as one rung (value captured per event must sit inside the gap). Run `physics-floor-gap` first: if one unit is not worth it, there is nothing to add up. If the fellow wants the per-unit gap, name `physics-floor-gap` and stop.

## Method
Fill the sheet in [template.md](template.md). Do not narrate the number into being; build it rung by rung. Every rung carries a tag — `[Fact]` (enumerable list or money moved), `[Assumption]` (stated, defensible estimate), `[Hypothesis]` (a guess flagged for evidence) — and an evidence-ladder weight.

**Step 1 — Name the atom.**
The smallest countable unit of value: one permit reviewed, one report, one plant shift, one invoice reconciled. It should be the same unit `physics-floor-gap` scored. If the fellow cannot name it, stop and ask for it. Do not invent one.

**Step 2 — Reachable population.**
How many atoms exist in the zone you can actually touch through your wedge and channel — not the whole world (that is the TAM's job). The population must be enumerable in principle: a registry, a customer list, a set of installations you could list. A market-report headline ("50,000 facilities") is not countable and scores 0.1, not a fact. Source it and weight it.

**Step 3 — Frequency.**
Events per atom per year. Source it (a timed workflow, an operator's own volume, a rate card), do not assume a round number because it is tidy.

**Step 4 — Value captured per event.**
What YOU capture per event — your price or your take — not the full cost of the work. It must sit inside the `physics-floor-gap` gap: you cannot capture more value than you create. Pricing the whole workflow instead of the slice you charge for inflates the total by the gap ratio. Source it.

**Step 5 — Capture fraction.**
The realistic share of the reachable population you win, over a stated horizon. Early on this is the softest rung; state it as `[Hypothesis]` and say what would move it.

**Step 6 — The arithmetic, in the open.**
- Reachable event volume = Population × Frequency
- Reachable revenue = × Value captured per event
- Capturable revenue = × Capture fraction

Show all three lines. A total with the chain collapsed into one number is an auto-fail.

**Step 7 — Confidence band (the weakest rung caps it).**
Confidence is the MINIMUM ladder weight across the rungs, never the average. Four solid rungs and one opinion rung make an opinion-grade number.

| Weakest rung weight | Confidence band | Read |
|---|---|---|
| ≥ 0.7 | Grounded | Every rung on behaviour or money. Plan against it. |
| 0.5 | Provisional | Best rung is an artefact shown, not transacted. Good for direction, not for committing spend. |
| 0.3 | Thin | Rests on a verbal claim. One rung needs a real count before you build on it. |
| ≤ 0.1 | Fiction | A rung is opinion or an uncheckable aggregate. Not a size estimate — a wish. Name the rung and the cheapest way to count it. |

Report the confidence of reachable revenue and of capturable revenue separately; the capture rung usually drags the capturable number a band lower.

**Step 8 — TAM sanity check. LAST. Labelled.**
Only now compute a top-down number, a different way (industry figure × penetration, or total units × price). Weight it honestly: a headline market-report aggregate is 0.1, because you cannot enumerate what is inside it. If the input supplies no top-down anchor — no industry figure and no independent way to compute one — do not invent a TAM to complete the band: state **"no top-down anchor supplied — reconciliation band deferred"**, name the cheapest anchor to fetch, and report only the bottom-up confidence band. Minting a figure to fill the band reintroduces the fabricated top-down number the skill exists to prevent.

**Step 9 — Reconciliation band.**

| Bottom-up ÷ top-down | Band | Read |
|---|---|---|
| 0.3× – 3× | Triangulated | Two independent methods agree within an order of magnitude. Strongest signal you have. |
| 3× – 10× | Divergent | Off by up to an order of magnitude. Find the rung or the TAM assumption that explains it before trusting either. |
| > 10× or < 0.1× | Broken | The methods disagree by more than ten times. One is fabricated. Do not report a total until reconciled. |

When Divergent or Broken, hunt the broken rung. Do not split the difference between a built number and an invented one.

**Kill line: a total that leads with the TAM, or hides a rung of the arithmetic, is an auto-fail.** The exposed chain is the product.

## Evidence standard
Each rung is weighed on the evidence ladder: money moved **1.0** → behaviour observed **0.7** → artefact shown **0.5** → verbal commitment **0.3** → opinion **0.1**. The confidence of the whole number is the weakest rung, so the ladder is applied per rung, not once.

Population and value are where fellows inflate. A population counts as `[Fact]` only if it is enumerable — a list you could produce. "The report says the market is 50,000 sites" is an uncheckable aggregate: 0.1, no matter how authoritative the source looks. A signed customer list or a public asset registry you can walk is 0.5–0.7. If the only population input is a market-report headline, the model declares the number **Fiction** and names the cheapest enumerable substitute: pull the registry, list the accounts, count one region by hand. The skill never dresses a top-down aggregate as a bottom-up fact.

## Gotchas
- **Leading with the TAM.** The number one failure and the kill line. If the first figure on the page is a top-down market number, the model is top-down wearing a bottom-up costume. The TAM comes last, labelled a sanity check, and only after the chain is built.
- **Padding the chain.** Adding rungs — extra segments, geographies, upsells — inflates the total and hides where it is soft. Fewer rungs, each countable, beats a long chain of guesses. Every rung you add is a rung someone can disprove.
- **Averaging confidence instead of taking the minimum.** Four grounded rungs and one opinion rung is an opinion-grade number. The weakest link caps it; do not report the average and call it strong.
- **A headline count as population.** A market-report figure feels like data but you cannot enumerate it. It is 0.1. Get a list you could actually produce.
- **Sizing on the whole-workflow value, not the captured slice.** Multiplying by the full per-unit cost of the work rather than the price you can charge inflates the total by the gap ratio. Value captured per event must sit inside the `physics-floor-gap` gap.
- **Ignoring the reconciliation.** Computing the TAM sanity check, seeing a 40× divergence, and reporting the bottom-up total anyway because it "feels right." A Broken band means stop and find the fabricated method.

## Examples
- [examples/sample.md](examples/sample.md) — Barrier Intelligence's per-permit gas-safety review, sized bottom-up: 300 installations × 300 reviews/yr × £15 → £1.35M reachable revenue, weakest rung Thin, capture rung Fiction, and a top-down £2.1B TAM that reconciles Broken (0.013×) because it bundles hardware and consultancy the per-permit slice never touches. All numbers illustrative.

## Related skills
- `physics-floor-gap` — sizes the per-unit prize (one unit's gap ratio); this stacks across all units into a total and reuses that gap as the value rung. Run it first; if one unit fails, there is nothing to add up.
- `problem-quality-scorecard` — the 8-dimension problem gate; size is one input to it, not the whole thing.
- `so-what-stress-test` — scores the whole concept; this scores only the magnitude.
- `evidence-ladder` — the shared money-over-opinion ranking this skill applies per rung.
- Supersedes nothing. It absorbs no prior skill; it is the bottom-up sizing primitive the pack was missing.
