# Bottom-Up Size Model — worksheet

Build up, never down. Show every line. The TAM goes LAST and is labelled a sanity check.
A total that leads with a TAM, or hides a rung of the arithmetic, is an auto-fail.
Tag every rung `[Fact]` / `[Assumption]` / `[Hypothesis]` and give it an evidence-ladder weight.

## Shared block (state and date it)
- Currency / FX: __________  `[Assumption]`
- Date, and who this number is for: __________
- Horizon for the capture rung: [e.g. 3 years]

---

## 1. The atom
- **Atom:** one _____ (the smallest countable unit of value — e.g. one permit reviewed)
- Same unit `physics-floor-gap` scored? [y / n] — if you have not run `physics-floor-gap` on this atom, do that first. If one unit is not worth it, there is nothing to add up.

## 2. The multiplier chain
Fill every rung. Population must be enumerable in principle (a list you could produce); a market-report headline is 0.1, not a fact.

| Rung | Value | Source | Ladder weight | Tag |
|---|---|---|---|---|
| **Population** (reachable, enumerable) | | | | |
| **Frequency** (events / atom / yr) | | | | |
| **Value captured / event** (≤ `physics-floor-gap` gap) | | | | |
| **Capture fraction** (realistic share, over horizon) | | | | |

Ladder: money moved 1.0 · behaviour 0.7 · artefact shown 0.5 · verbal 0.3 · opinion / uncheckable aggregate 0.1.

## 3. The arithmetic (in the open)
- Reachable event volume = Population × Frequency = ______ /yr
- Reachable revenue = × Value/event = £______ /yr
- Capturable revenue = × Capture fraction = £______ /yr

## 4. Confidence band (weakest rung caps it)
Confidence = the MINIMUM ladder weight across the rungs, never the average.

| Weakest rung weight | Band | Read |
|---|---|---|
| ≥ 0.7 | Grounded | Plan against it |
| 0.5 | Provisional | Direction only, not spend |
| 0.3 | Thin | One rung needs a real count |
| ≤ 0.1 | Fiction | A wish — name the rung and how to count it |

- Weakest rung of reachable revenue: ______ at weight ______ → band: ______
- Weakest rung of capturable revenue: ______ at weight ______ → band: ______
- If Fiction: the cheapest count that fixes it is: ______________

## 5. TAM sanity check — LAST, labelled
- Top-down number, computed a different way: £______
- Method: [industry figure × penetration] OR [total units × price]
- Its ladder weight (a headline aggregate is 0.1): ______
- No top-down anchor available? Do not invent one: write **"no top-down anchor supplied — band deferred"**, name the cheapest anchor to fetch, and skip §6.

## 6. Reconciliation band
- Ratio = bottom-up ÷ top-down = £______ ÷ £______ = ______×

| Ratio | Band | Read |
|---|---|---|
| 0.3× – 3× | Triangulated | Two methods agree within an order of magnitude |
| 3× – 10× | Divergent | Find the rung / TAM assumption that explains the gap |
| > 10× or < 0.1× | Broken | One method is fabricated — do not report until reconciled |

- This lands at ______× → band: ______
- If Divergent / Broken: the broken rung or mis-scoped TAM assumption is: ______________
- Do NOT split the difference between a built number and an invented one.

## 7. What would change the number
- The one count that moves the weakest rung up the ladder: ______________
- Next model release / new price / signed pilot that revises a rung: ______________
