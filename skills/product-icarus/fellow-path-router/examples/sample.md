# Sample — Fellow Path Router on Mentix

## Input

Fellow (Mentix): "I've got real traction — an AI copilot for factory managers, live at two
plants, managers open it most shifts. I think I'm past the early stages. Which stages apply
to me, and what can I skip?"

Volunteered detail: the "AI" is a GPT wrapper over public manuals plus the plant's own SOP
PDFs; no proprietary dataset yet; no pricing (both plants are unpaid design partners);
retention not measured.

---

## 0. Situation in one line + highest evidence rung

> Mentix has a live factory-manager copilot used most shifts at two design-partner plants,
> but it is a generic wrapper with no proprietary data and no paid contract.

- Highest rung shown: **behaviour 0.7** — managers open it most shifts `[Assumption]` (self-
  reported by the fellow, not yet logged).
- Moat rung: **0.3** — "we'll accumulate plant data over time" is a plan `[Hypothesis]`.
- Money rung: **0** — both plants are unpaid.

---

## 1. Classification

> Type **B — traction, no moat**.

- Rung that set the type: behaviour on usage clears the demand bar (0.7); the moat is still a
  plan (0.3), so the compounding-asset bar for Type C is not met.
- Claimed vs graded: **claimed "past the early stages" (implying C); graded B.** Down-grade
  reason — no flattening-retention evidence and no accruing proprietary corpus. Usage is also
  self-reported, not logged, so even the 0.7 needs a one-week log check to become `[Fact]`.
  If that check fails and usage is really occasional, Mentix falls to Type A.

---

## 2. Stage ledger (Type B)

| Section | Verb | Why (one line) | Tripwire (subtracts only) |
|---|---|---|---|
| 00 concept-council | SUBTRACT | The concept survived contact — two plants use it. | Pivoting to a new problem → re-enter at 00. |
| 01 first-principles-problem | TRIM | Traction answers "is it real"; re-run only `product-as-decision` to state the exact decision compressed (read three dashboards → ask once). | — |
| 02 customer-discovery | TRIM | Mine the two live plants via `trace-to-interview`; don't cold-start new interviews. | — |
| 03 yoda-your-own-data | **KEEP** | The missing moat piece: turn plant SOPs and shift logs into a labelled corpus a competitor can't reproduce. | — |
| 04 probes | KEEP | Probe the moat wedge (will a plant hand over its incident logs?), not the next feature. | — |
| 05 frame | SUBTRACT `first-mocks`, KEEP `usability-test-protocol` | Live product — no mocks needed; still watch managers use it. | first-mocks re-adds only for a genuinely new surface. |
| 06 invent-wedge-moat | **KEEP** | The whole point for this type — `wedge-five-questions`, `moat-design-canvas`, `data-rights-clause`. | — |
| 07 commit-build-v1 | KEEP | `eval-first-spec` + `guardrail-design` + `value-based-pricing` — price the outcome, convert a design partner to paid. | — |
| 08 refine-flywheel | TRIM | Start the retention-flattening check now; the full loop waits until there is paid usage to measure. | — |

---

## 3. Dominant risk

> Type B dies from **commoditisation**. A GPT wrapper over public manuals is copyable in a
> weekend; the only thing that can't be copied is the plant-specific corpus and the tacit
> judgment inside it. Every week spent adding copilot features is a week the moat does not
> compound.

---

## 4. think : build : test ratio

> **4 : 2 : 4**

- Think covers: 03 YODA + 06 invent-wedge-moat — pointed at the moat, not the problem.
- Build covers: 07 commit-build-v1 — **cap of 2**; more build needs a probe at 0.7 first.
- Test covers: 04 probes (data-rights wedge) + 05 usability + 08 retention check.
- Why this split: the risk is commoditisation, so think goes to the moat and build is held at
  2 to stop feature-shipping from starving it. Test is high (4) because the moat hypothesis —
  "a plant will hand over its logs and pay for the version trained on them" — is unproven and
  is the single claim that decides whether Mentix is a venture or a wrapper.

---

## 5. Entry point + first artefact

- Open first: **03 `yoda-your-own-data`** (`explicit-vs-tacit-capture`), then **06
  `invent-wedge-moat`**.
- First artefact to produce: an explicit/tacit ledger for one plant's shift-decision workflow
  + a moat-design canvas naming the compounding asset.
- Next gate: one design partner agrees in writing to a data-rights clause (behaviour 0.7 →
  toward money 1.0 when they pay for the trained version). Until that clears, build stays at 2.

---

## 6. Kill-line self-check

- [x] Ledger and ratio differ from Type A (which would KEEP 00/01 and run 6:1:3) and Type C
  (which would LEAP to 08 and run 2:4:4).
- [x] Ratio rationale ties every number to commoditisation.
- [x] Type graded to the highest evidenced rung (behaviour 0.7), down-graded from the claimed C.
- [x] Every SUBTRACT carries a tripwire.
- [x] Nothing invented — usage is flagged self-reported, moat flagged as a plan, no plant or
  number treated as `[Fact]`.

---

## Why a generic prompt would miss this

A default onboarding prompt would take "I have traction, I'm past the early stages" at face
value and route Mentix to launch-and-scale advice. The router refuses the claim: behaviour
0.7 on unlogged usage plus a 0.3 moat plan is Type B, not C, and the build cap of 2 is the
exact instruction that stops Mentix from shipping its way into a commodity. The proprietary
move is grading the type on the evidence ladder and deriving the ratio from the type's one
lethal risk.
