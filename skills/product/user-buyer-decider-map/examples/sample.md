# Worked example — Barrier Intelligence, offshore gas-safety alerts

Fellow: **Barrier Intelligence** (oil & gas safety — gas-safety alerts, field logs from rigs, permit data). All numbers and titles are illustrative test fixtures, not client data.

**Fellow's pitch:** "The rigs love our gas-safety alerts — the control-room operators can't work without them. We just need to sell it to the operator." One "customer," one motion. This skill splits it into four people plus the face that kills the deal.

## 0. The situation, as the fellow said it
> "The rigs love our gas-safety alerts — the control-room operators can't work without them. We just need to sell it to the operator."

## 1. The four roles — one title each
| Role | Title (one) | Reachable in N steps | Test it passes | Rung it exists |
|---|---|---|---|---|
| User | Control-room operator / authorised gas tester (issues hot-work permits) | 1 (already in pilot conversations) | Would notice within a shift if the alerts vanished | Behaviour 0.7 — observed using the tool on shift `[Fact]` |
| Buyer | Asset HSE Manager (Health, Safety & Environment) | 2 (via the champion) | Owns the process-safety monitoring line | Artefact 0.5 — last year's PO for a comparable monitor shown `[Fact]` |
| Decision-maker | Offshore Installation Manager (OIM) | 3 | Legally accountable for the installation; holds veto on anything touching permit-to-work | Verbal 0.3 — named by the champion, not yet met `[Assumption]` |
| Champion | Field safety lead who was on shift during the near-miss | 1 | Has already walked it to the HSE Manager unprompted | Behaviour 0.7 — made the internal intro `[Fact]` |

The fellow's "operator" is the **User**, not the buyer. Loving the alerts is evidence about the wrong person for the purchase.

## 2. Budget — buyer only
- **Buyer's line item:** process-safety monitoring (opex)  ·  **size:** ~$250k/yr, illustrative  ·  **rung:** artefact 0.5 (last year's PO for a comparable tool)  `[Assumption]`
- User, decision-maker, champion: **no budget** (correct).
- Rung is 0.5, not 0.1 → this is a real buyer with a verifiable line. To lift to 1.0: redirect an actual invoice, not just point at last year's PO.

## 3. Why-now — one per role
| Role | Why-now | Rung | Tag |
|---|---|---|---|
| User | A near-miss last quarter the manual cross-check missed | Artefact 0.5 — incident report exists | `[Fact]` |
| Buyer | Safety-case revision deadline forces a monitoring spend this budget year | Artefact 0.5 — regulator directive with a dated effective date | `[Fact]` |
| Decision-maker | Personally liable under the revised safety case; wants defensible evidence of controls | Verbal 0.3 | `[Assumption]` |
| Champion | Was on shift for the near-miss; wants a system that would have caught it | Behaviour 0.7 — already pushing internally | `[Fact]` |

Every role has a dated or observed why-now. This is why the map holds rather than stalls.

## 4. The fifth face — who loses if this ships
- **Title:** the veteran authorised gas tester whose judgment the alert logic is codifying.
- **What they lose:** authority — a system that second-guesses a call they have owned for twenty years.
- **How they block:** silent non-adoption on their shifts, and a quiet word to the OIM that "the black box misses things a good tester wouldn't." This, not budget, is the real adoption risk. The champion neutralises it by co-designing the alert thresholds with the veteran named on the credit.

## 5. Collapse check
- Any two roles the same person? No. The fellow tried to collapse User and Buyer ("sell it to the operator") — that is the **ERROR** case: the operator feels the pain and cannot sign a PO. Split confirmed: User = operator, Buyer = HSE Manager.

## 6. Path to yes
> Field safety lead (champion) → HSE Manager (budget: process-safety line) → OIM (signature), with the veteran gas tester neutralised at the threshold-design step, before the OIM meeting.
- Champion exists and has already taken the first step. Path has a first step.

## 7. Buyer-clarity feed → problem-quality-scorecard
> Buyer: Asset HSE Manager, reachable in 2 steps (via champion), budget line "process-safety monitoring" on rung 0.5, HAS bought a comparable (last year's PO).
- Suggested buyer-clarity score: **4** (named, reachable, budget on artefact rung, bought comparables). Not 5 — the spend is a shown PO, not yet a redirected live invoice.

## 8. Verdict
- **MAP HOLDS.** Four distinct roles, buyer budget + why-now on artefact rung, champion active, fifth face named.
- Binding watch-item: the OIM's personal liability caps how autonomous the alert system may become — a finding for `guardrail-design`, not a hole in this map. The adoption risk is the veteran, not the money.

## 9. What would change this map
- The buyer sits at 0.5 (a shown PO), not 1.0 (a redirected invoice). Barrier's next move: get the HSE Manager to name the incumbent spend they would redirect, and confirm the safety-case deadline date in writing. If the deadline slips or the "$250k line" turns out to be a wish rather than a line item, the buyer drops to verbal and the verdict falls to THIN MAP — so verify the line before pricing the pilot.
