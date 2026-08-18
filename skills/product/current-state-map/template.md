# Current State Map — priced step ledger

Fill every row. Every priced line needs a **cost**, a **cited source**, and a **tag** `[Fact]`/`[Assumption]`/`[Hypothesis]`. A blank cost, or a price citing no artefact, is an auto-fail. Do not price the future-with-your-product; price today's actual practice.

## Shared assumption block (state and date it)
- Loaded rate(s) used: £____/hr for [role]  `[Assumption | Fact]`  (loaded = salary + overhead + benefits, not base)
- FX if needed: ~£1 = $____  `[Assumption]`
- Date this map was priced / artefacts pulled: __________

---

## 1. Unit and trigger
- **Unit:** one [_____ — e.g. one site risk report]
- **Trigger:** [what kicks off one pass]
- **Frequency:** [___ / period]  `[Fact | Assumption]`

## 2–3. As-is step ledger (walk it in order; price the touch labour)

| # | Step (as it actually happens) | Actor / role | Artefact in→out | Touch min | Loaded £/min | Cost £ | Source (cited) | Ladder | Tag |
|---|---|---|---|---|---|---|---|---|---|
| 1 |  |  |  |  |  |  |  |  |  |
| 2 |  |  |  |  |  |  |  |  |  |
| 3 |  |  |  |  |  |  |  |  |  |
| … |  |  |  |  |  |  |  |  |  |

- **Touch-labour subtotal = £______**

## 4. Handoff tax
- Handoffs counted (work passing between people/systems): ____
- Coordination cost each (wait for the right person, context reload, re-explain): ____ min × £__/min
- **Handoff subtotal = £______**  · Source: __________ · `[tag]`

## 5. Delay (price only if the clock costs money)
- Elapsed time per unit: ____  vs touch time: ____ (state the gap)
- Does the wait cost money? [carrying cost / SLA penalty / idle asset day-rate / decaying decision / churn] — or **£0, because ______**
- **Delay subtotal = £______**  · Source: __________ · `[tag]`

## 6. Failure and rework
- **Rework loop:** P(bounce) ____% × redo cost £____ = **£______**  · Source: __________ · `[tag]`
- **Escaped failure:** P(bad output reaches customer) ____% × cost of that failure £____ = **£______**  · Source: __________ · `[tag]`
- If a tail cannot be sourced: tag `[Hypothesis]`, and name the two numbers that would price it: [historical failure rate] · [£ cost per failure]. Do not invent them.

## 7. Total — current priced practice per unit
- **Total = touch £____ + handoff £____ + delay £____ + failure £____ = £______ per unit**
- This is the number `physics-floor-gap` divides against the floor.

## 8. Cost concentration
- Steps ranked by cost (highest first): 1) ____ £____  2) ____ £____  3) ____ £____
- **Dominant step: ____ ( __% of total )** → the step the product attacks first.
- Foreshadow for the floor: automatable part (→ floor A) = ____ ; irreducible judgment (→ floor B) = ____

## 9. Map-readiness verdict

| Condition | Verdict |
|---|---|
| Every step priced; dominant line at ladder ≥ 0.7 | READY — hand to `physics-floor-gap` |
| Dominant line (> 40% of total) at ladder ≤ 0.3 | NOT READY — source it first |
| Any step blank | AUTO-FAIL |
| Any price cites no artefact | that cell = opinion (0.1) |
| Unpriced `[Hypothesis]` tail could plausibly exceed the priced total (*dominant-suspect*) | NOT READY — price the tail (rate × £) before trusting the total |
| Unpriced `[Hypothesis]` tail sits outside a valid holding total, can't exceed it (*upside-risk*) | READY — total holds; flag the tail to price before scaling |

- **This map is: ______** (READY / NOT READY)
- If NOT READY: the line to source first is ____; cheapest artefact to get it: [pull one timesheet week / time one run / export the ticket log].
- What would change the total: [a timed run revises step X / the failure tail gets priced / a handoff is removed].
