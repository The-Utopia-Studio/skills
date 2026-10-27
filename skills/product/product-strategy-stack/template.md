# Product Frame Stack — fill-in

One validated problem → the whole frame. Fill bottom to top. Tag every claim `[Fact]` / `[Assumption]` / `[Hypothesis]`.
Two auto-fails: (a) any layer built on a problem the gate did not pass; (b) a roadmap with no North Star, or a roadmap item that ladders to nothing.

---

## Layer 0 — Gate check (the floor) — DO THIS FIRST

- **Problem, one sentence (a pain, not a feature):** [__________]
- **Gate cleared?**
  - [ ] `problem-quality-scorecard` — score: ___/40 (PASS ≥32)
  - [ ] `so-what-stress-test` — verdict: [PASS / REDESIGN / KILL]
  - [ ] Neither — **STOP** (see verdict table)
- **Problem's best evidence:** [money · behaviour · artefact · verbal · opinion] → ladder rung ___ `[Fact | Assumption]`

| Problem status | Rung | Verdict |
|---|---|---|
| PASS on money/behaviour | 1.0 / 0.7 | BUILD — ceiling = this rung |
| PASS on artefact/verbal | 0.5 / 0.3 | BUILD — stamp whole stack `[Assumption]`; roadmap = a bet; name the test to lift it |
| REDESIGN / not-ready / opinion | 0.1 | **BLOCK** — return the cheapest test; no stack |
| Never gated | none | **BLOCK** — route to problem-quality-scorecard / so-what-stress-test |

- **Verdict:** [BUILD @ rung ___ / BLOCK — reason + route]
- If BLOCK → stop here. Do not fill any layer below.

---

## Layer 1 — Vision
> The customer's world once this problem is gone at scale (3–5 yrs). No product nouns, no features. An outcome for the target.

- [__________]  `[Hypothesis]`

## Layer 2 — Strategy (the one hard choice)
- **Beachhead (one named who, not "the market"):** [__________]
- **Wedge (narrow slice where you're unambiguously best):** [__________]  → soft? hand to `wedge-five-questions`
- **Won't-do (what a generic team would chase and you refuse):** [__________]
- **Does the wedge pay?** price of the metric ___ − cost to serve one unit ___ = [pays / does not pay]  `[Fact | Assumption]`
  - If it does not pay at the wedge → the strategy is unviable; stop and reframe.

## Layer 3 — Product vision
> What the product IS when the strategy is executed: the decision it compresses, at scale, for the beachhead. Reuse `product-as-decision` if a compressed-decision statement exists. Not a feature list.

- [__________]  `[Hypothesis]`

## Layer 4 — North Star (mandatory)
- **The metric (one, leading, per-unit value, tied to the compressed decision):** [__________]
- Bar check — all four:
  - [ ] Single (one number, not a dashboard)
  - [ ] Leading, not lagging (ban revenue / total-users-ever here)
  - [ ] Per-unit value delivered (not a usage-volume vanity count)
  - [ ] Measured now, OR `[Hypothesis]` + instrumentation named: [__________]
- **Guardrail metric (so the North Star can't be gamed):** [__________ must not degrade below ___]

## Layer 5 — OKRs
- **Objective (straight from strategy):** [__________]
- **KR1 (outcome — behaviour/money/North-Star move, NOT a shipped thing):** [__________]  `[Fact | Assumption | Hypothesis]`
- **KR2 (outcome):** [__________]
- **KR3 (outcome, optional):** [__________]
- Check: at least one KR moves the North Star directly → [which: ___]

## Layer 6 — Roadmap (dual-track — delivery beside discovery)

| Horizon | Delivery track — an OUTCOME (North-Star / KR move), never a dated feature | Discovery track — the riskiest open question this horizon must retire |
|---|---|---|
| **Now** | [__________] | [__________] |
| **Next** | [__________] (conditional on Now's learning) | [__________] |
| **Later** | [__________] (opens the moat) | [__________] |

- Ladder check: every delivery item moves the North Star? [yes / the orphan is: ___ → cut or park with reason]

---

## Propagation check (evidence ceiling)
- Problem rung = ___ (Layer 0). No layer above may be tagged higher.
- **Whole stack stamped at:** [`[Fact]` if 0.7+ / `[Assumption]` if 0.3–0.5 / blocked if 0.1]

## Kill-line self-check (both must pass)
- [ ] No layer rests on a problem the gate did not pass. (else: void → BLOCK)
- [ ] A North Star exists AND every roadmap item ladders to it. (else: fix before returning)

## What would change this frame
- [the probe that would lift the problem's rung and de-bet the roadmap / the discovery answer that redirects the Next horizon / the wedge test that revises the strategy]
