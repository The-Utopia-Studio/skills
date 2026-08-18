---
name: physics-floor-gap
description: Sizes the per-unit prize of a piece of work from first principles by comparing what it is priced at today against its theoretical floor once AI does the automatable part. Fires on "is this a big enough problem", "how big is the prize", "size the opportunity from first principles", "what's the physics floor", "is the gap big enough", or when a fellow has a unit of work and its current per-unit cost and wants a build/walk verdict. Outputs a filled floor/gap calc sheet: token-cost line + judgment-minutes line + current priced number + gap ratio + band verdict, every number tagged [Fact]/[Assumption]/[Hypothesis]. NOT for total market size (use bottoms-up-quantification), NOT for the 8-dimension problem gate (use problem-quality-scorecard), NOT for scoring the whole idea (use so-what-stress-test).
type: generator
supersedes: none
---
# Physics Floor Gap

## What it does
Answers one question and refuses the rest: is the per-unit prize big enough to bother? It computes the theoretical floor of what one unit of the work should cost once AI does the automatable part — (2026 token/compute cost) + (the irreducible human-judgment minutes priced at loaded labour) — and divides today's priced practice by that floor. The output is a gap ratio and a band verdict on a fill-in calc sheet ([template.md](template.md)). It is a first-principles size test on the unit, not a TAM, not a scorecard, not a vibe check. The floor drops with every model release, so the calc is dated and meant to be re-run.

## The Icarus reframe
A generic prompt sizes an opportunity by market: users × price = TAM. That number is unfalsifiable and flatters everything. Icarus sizes it by physics instead: strip the work down to the compute cost of the automatable part plus the genuine minutes of human judgment that cannot be removed, and that sum is the floor the price must eventually fall toward. The prize is not the market — it is the gap between what the work is priced at today and that floor. A gap so large it looks free (>100×) is not a jackpot; it is a signal you have mis-priced the judgment or missed the constraint that has kept everyone else out, and the skill makes you stop and find it.

## When to use / When NOT
Use it when you have a specific unit of work and a real number for what that unit costs today, and you want to know if the per-unit prize justifies building.

| Situation | Use this? | Go to |
|---|---|---|
| "Is this a big enough problem to build for?" (have unit + cost) | Yes | physics-floor-gap |
| "How big is the prize per report / per permit / per invoice?" | Yes | physics-floor-gap |
| "What's the total market / TAM / how many customers × price?" | No | `bottoms-up-quantification` |
| "Is this a good problem across all 8 dimensions?" | No | `problem-quality-scorecard` |
| "Is the whole idea any good? Stress-test the concept." | No | `so-what-stress-test` |
| "Which wedge should we attack first?" | No | `wedge-five-questions` |

This skill scores exactly one thing: the per-unit gap. It does not rank problems, size markets, or judge the concept. If the fellow wants those, name the sibling and stop.

## Method
Work the sheet in [template.md](template.md). Do not narrate; fill the lines. Every number carries a tag: `[Fact]` (from a priced artefact or observed behaviour), `[Assumption]` (a stated, defensible estimate), `[Hypothesis]` (a guess, flagged as needing evidence).

**Step 1 — Name the unit and its frequency.**
One report? One permit review? One invoice reconciled? State it, and how often it happens. If the fellow cannot name the unit, stop and ask for it. Do not invent one.

**Step 2 — Floor part A: token/compute cost of the automatable portion.**
What does one unit cost in 2026 inference to do the part a model can do (retrieval, drafting, matching, formatting)? State the token assumption. Default assumption block: ~$5 / 1M input tokens, ~$15 / 1M output tokens; FX ~£1 = $1.25. Tag `[Assumption]` and date it.

**Step 3 — Floor part B: irreducible human-judgment minutes × loaded labour.**
Which minutes cannot be removed — the call a human must stake their name on, the exception only a person can adjudicate? Count only those minutes. Multiply by the loaded rate (salary + overhead + benefits, not base salary). If judgment is exception-based, amortise it across the unit. Be honest: over-counting B hides a dead idea; under-counting B manufactures a fake prize.

**Step 4 — Floor = A + B.** Show both lines. Never collapse them into one number.

**Step 5 — Current priced practice.**
What does one unit cost today? Loaded labour × observed time, or the price actually paid. This number must come from a priced artefact or an observed workflow — see Evidence standard. Tag its source.

**Step 6 — Gap ratio = Current ÷ Floor.** Show the division.

**Step 7 — Band verdict.**

| Gap ratio | Band | Verdict |
|---|---|---|
| < 10× | No room | Walk away. The floor is too close to today's cost; automating it barely moves anything. |
| 10–20× | Thin | Marginal. Only worth it if you can stack volume or move upmarket where the loaded rate is higher. |
| 20–100× | Real prize | Build. Genuine room between price and floor. |
| > 100× | Suspicious | Stop. A gap this large usually means B is under-counted or a non-token constraint (regulation, liability, accreditation, distribution) explains why no one has done it. Find it before you believe the number. |

**Kill line: a verdict without the A-line and B-line shown is an auto-fail.** The arithmetic is the product. No floor arithmetic, no verdict.

## Evidence standard
The current-practice number (Step 5) is where fellows lie to themselves. It must sit on behaviour or money, not opinion. Weight signals by the evidence ladder:

| Signal for the current-cost number | Ladder weight |
|---|---|
| An invoice / quote / rate card for the work (money moved) | 1.0 |
| An observed workflow timed directly (behaviour observed) | 0.7 |
| A priced artefact shown but not yet transacted | 0.5 |
| Someone said "it takes about a day" (verbal commitment) | 0.3 |
| The fellow's opinion of what it costs | 0.1 |

If the only input is an opinion (0.1), the skill declares the input **not ready** and names the cheapest way to get the real number: pull one invoice, or time one unit of the workflow end to end. It does not floor an opinion and dress it as a result. Floor-side numbers (A and B) may be `[Assumption]`, but they must state the token math and the minutes, so a reader can challenge them.

## Gotchas
- **Under-counting judgment to manufacture a prize.** The commonest failure. If B is set near zero, almost anything clears 100×. When the ratio exceeds 100×, the skill assumes B is wrong before it assumes the prize is real.
- **The wrapper trap.** Pricing the artefact (the report, the deck) instead of the decision the artefact drives. If the work exists to support a judgment call, floor the judgment, not the prose.
- **A big ratio that is really a moat.** A 200× gap in a regulated field is not free money — it is often the reason incumbents charge what they do (a signed, liable, accredited human). The floor model misses this; the >100× band exists to force the check.
- **Stale floor.** The floor drops on every model release. A calc from an older model is out of date; re-run it and re-read the band.
- **Opinion dressed as a fact.** "It costs us a day" is 0.3 at best. Do not promote it to `[Fact]` because it is convenient.
- **A ratio near a band boundary is fragile.** A gap sitting just over a band edge (e.g. ~11× just past the 10× WALK line) can flip bands on one estimate. State the ratio's sensitivity to the biggest assumption — recompute the band with that assumption moved by a plausible amount — and do not read a borderline ratio as a durable verdict.

## Examples
- [examples/sample.md](examples/sample.md) — Azraq's static data-centre risk report, worked end to end: an analyst-day (£960) against a £42.50 floor, gap 22.6×, band "build".

## Related skills
- `bottoms-up-quantification` — builds total market size from units; this builds the per-unit prize. Use that after this clears, not instead of it.
- `problem-quality-scorecard` — the 8-dimension problem gate; size is one input to it, not the whole thing.
- `so-what-stress-test` — scores the whole concept; this scores only the unit economics of the work.
- Supersedes nothing. It is the first-principles size primitive the others draw on.
