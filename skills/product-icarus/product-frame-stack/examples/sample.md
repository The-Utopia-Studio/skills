# Worked example — Barrier Intelligence, hot-work permit safety

Fellow: **Barrier Intelligence** (oil & gas safety). All numbers are illustrative test fixtures, not client data.

**What arrives:** the hot-work-permit problem has already cleared `problem-quality-scorecard` at **34/40**, resting on behaviour-grade evidence (permit logs + timed reviews from two beachhead rigs, ladder 0.7). A compressed-decision statement from `product-as-decision` also exists: *a permit officer decides whether a hot-work permit is safe to sign, in ~5 min against verified hazard controls instead of ~40 min re-reading isolation certs and gas logs.* This skill builds the frame on that floor.

---

## Layer 0 — Gate check (the floor)
- **Problem:** on offshore rigs, permit officers approve hot-work permits without a reliable check that every gas/isolation control is verified, so unsafe permits reach sign-off. `[Fact]` (permit logs)
- **Gate cleared?** `problem-quality-scorecard` = **34/40** (PASS ≥32).
- **Problem's best evidence:** behaviour — permit logs + timed reviews on two rigs → rung **0.7** `[Fact]`.
- **Verdict:** **BUILD @ rung 0.7.** Ceiling for the whole stack is `[Fact]`/`[Hypothesis]` for observed/future claims; nothing above gets tagged higher than the problem.

## Layer 1 — Vision
> On every rig we serve, no hot-work job starts on a permit whose hazard controls were not verified — the "cleared but unsafe" permit stops existing.  `[Hypothesis]`

(Outcome for the rig, not "a great safety copilot". Product noun struck.)

## Layer 2 — Strategy
- **Beachhead:** the two offshore drilling rigs already running Barrier's pilot under one operator's HSE lead — not "offshore oil & gas".
- **Wedge:** hot-work permits specifically (the highest-consequence, most-checked permit class), not all permit-to-work at once.
- **Won't-do:** we refuse to build the general permit-to-work platform (cold work, working-at-height, confined space) until hot-work retention is proven. A generic team would chase permit breadth first; we refuse it.
- **Does the wedge pay?** price per rig ≈ [illustrative $X/rig-month] − cost to serve one rig (hosting + hazard-model upkeep + support) ≈ [$Y] → **pays** at 2 rigs if [X > Y].  `[Assumption]` — grounded in the pilot's stated pricing, not yet an invoice, so flagged.

## Layer 3 — Product vision
> Barrier is the safety check a permit officer runs before signing a hot-work permit: it verifies every required gas and isolation control against live rig data and flags any unverified hazard before sign-off, compressing the officer's ~40-min manual cross-check to ~5 min while catching the controls a tired reader misses.  `[Hypothesis]`

(The decision compressed, at scale for the beachhead — reused from `product-as-decision`, not a feature list.)

## Layer 4 — North Star
- **The metric:** **verified hot-work permits per rig-week** — permits the tool checked control-by-control and the officer then signed.
- Bar check: single ✓ · leading (predicts the rig keeps trusting and using it) ✓ · per-unit value (each is one safely-enabled job) ✓ · measurable from the permit system now ✓.
- **Guardrail:** **false-clear rate must stay at 0** — a permit the tool cleared that later proved to have an unverified control. Without this guard, the North Star could be gamed by rubber-stamping; the guard makes "more verified permits" mean "more genuinely safe permits".  `[Hypothesis]` until the first month of data.

## Layer 5 — OKRs
- **Objective:** make Barrier the default safety check for hot-work permits on both beachhead rigs.
- **KR1 (moves North Star):** verified hot-work permits/rig-week rises from [pilot baseline] to [target] across both rigs.  `[Hypothesis]`
- **KR2 (behaviour):** officers accept the tool's hazard flags without override on ≥[X]% of permits (a trust/tweak-time proxy).  `[Hypothesis]`
- **KR3 (money):** both pilot rigs convert to a paid contract at [illustrative value].  `[Hypothesis]`
- Guard held: false-clear rate = 0 (KR2/KR3 are void if the guard breaks).
- At least one KR moves the North Star directly → KR1. ✓ None is a shipped-feature output.

## Layer 6 — Roadmap (dual-track)

| Horizon | Delivery track (outcome) | Discovery track (riskiest open question) |
|---|---|---|
| **Now** | Get verified permits/rig-week to target on rigs A & B; hold false-clear at 0. | Is officer *trust* the binding constraint, or gas-sensor *data quality*? (Watch overrides vs. sensor gaps.) |
| **Next** | Expand to a second high-consequence permit class **only if** the hot-work North Star flattens up (retention proven). | Does the hazard model transfer, or is a new permit class a new corpus to label? |
| **Later** | A cross-rig, multi-operator data-rights position (the moat). | Will operators grant cross-rig data rights? If not, the moat closes and Later is void. |

- Ladder check: every delivery item moves verified-permits/rig-week or protects the guard. No orphan. ✓

---

## Propagation check (evidence ceiling)
- Problem rung = **0.7** (behaviour). Vision/strategy/product-vision are future claims → `[Hypothesis]` by nature, plausible at the 0.7 floor. OKR targets and the North Star are `[Hypothesis]` until the first month instruments them. Nothing is tagged `[Fact]` above the problem.
- **Whole stack stamped at: 0.7 — a real, behaviour-backed frame, not yet a money-backed one.** The single move that lifts it: KR3 (a signed paid contract) converts the floor to 1.0.

## Kill-line self-check
- [x] No layer rests on an ungated problem — the problem cleared at 34/40.
- [x] A North Star exists (verified permits/rig-week) and every roadmap item ladders to it or its guard.

## What would change this frame
- The whole strategy assumes hot-work is the right wedge. If Now-horizon discovery shows officers override flags because the sensor data is unreliable, the binding constraint is data quality, not the model — and the Next horizon should retire that before any expansion. And if operators will not grant cross-rig data rights, the Later moat closes; the frame would then need a different defensibility than data.
