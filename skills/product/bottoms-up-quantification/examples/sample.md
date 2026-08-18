# Worked example — Barrier Intelligence, per-permit gas-safety review

Fellow: **Barrier Intelligence** (oil & gas safety). All numbers illustrative test fixtures, not client data.

**Fellow's question:** "We alert on gas-safety risk in permit-to-work reviews. Don't hand me a TAM — build the number bottom-up so I can defend it to the investor line by line."

Prerequisite: `physics-floor-gap` was run first on one permit review — current ~£180/review vs floor ~£12, gap ~15×. One unit clears, so there is something to add up. The value rung below must sit inside that gap.

## Shared block
- Currency: GBP; FX £1 = $1.25  `[Assumption]`
- For: seed investor deck, 2026; horizon 3 years

---

## 1. The atom
- **Atom:** one permit-to-work (PTW) reviewed for gas-safety risk before a hot-work job.
- Same unit `physics-floor-gap` scored? **Yes.**

## 2. The multiplier chain

| Rung | Value | Source | Ladder weight | Tag |
|---|---|---|---|---|
| Population (reachable) | 300 offshore/onshore installations in the North Sea beachhead | public offshore-asset registry — an enumerable list | 0.5 | `[Assumption]` |
| Frequency | 300 gas-hazardous permit reviews / installation / yr | one operator ops-lead's verbal volume estimate | 0.3 | `[Assumption]` |
| Value captured / event | £15 / reviewed permit (inside the ~£168 gap) | pilot price sheet shown to one operator, not transacted | 0.5 | `[Assumption]` |
| Capture fraction (3 yr) | 20% of the reachable population | no signed operators yet — a guess | 0.1 | `[Hypothesis]` |

## 3. The arithmetic (in the open)
- Reachable event volume = 300 installations × 300 reviews = **90,000 reviews/yr**
- Reachable revenue = 90,000 × £15 = **£1,350,000/yr**
- Capturable revenue = £1,350,000 × 20% = **£270,000/yr**

## 4. Confidence band (weakest rung caps it)
- Reachable revenue rungs: Population 0.5, Frequency 0.3, Value 0.5 → minimum **0.3 → Thin.** Frequency is the soft link: the whole £1.35M rests on one person's guess at permit volume.
- Capturable revenue adds Capture 0.1 → minimum **0.1 → Fiction.** The £270k is a wish until one operator signs.
- Cheapest fix: time real permit volumes at one installation for a month (moves Frequency 0.3 → 0.7), and convert one pilot to paid (moves Capture 0.1 → 1.0).

## 5. TAM sanity check — LAST, labelled
- Top-down: global offshore safety software market ≈ **£2.1B**  `[Assumption]`, weight **0.1** (uncheckable aggregate).
- Method: industry report headline × Barrier's beachhead share of global assets (~5%) = **£105M**.

## 6. Reconciliation band
- Ratio = bottom-up reachable revenue ÷ top-down slice = £1.35M ÷ £105M = **0.013×**
- **< 0.1× → Broken.** The two methods disagree by ~78×.
- The mis-scoped assumption: the £2.1B market bundles sensors, hardware, consultancy, and full-workflow licences — Barrier's per-permit slice is a thin cut of that spend, so the top-down slice is inflated for this atom. The bottom-up structure holds; the top-down is the fabricated one here.
- Do NOT average £1.35M and £105M into a "£50M" story. Report the built number, flag it Thin, and fix Frequency and Capture before the deck.

## 7. What would change the number
- One month of timed permit volumes at a real installation revises Frequency and the whole £1.35M.
- One signed, paying operator moves Capture off Fiction and turns the £270k from wish into forecast.
- A next model release drops the physics floor, widens the gap, and lets the £15 value rung rise.

## Read
The honest headline is not "£2.1B market." It is: "£1.35M/yr of reachable per-permit revenue we can name installation by installation, confidence Thin on one volume estimate, and £270k capturable that is still a wish until an operator pays." That sentence is defensible line by line. The TAM slide is not.
