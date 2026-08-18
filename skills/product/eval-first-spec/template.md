# Eval-First Spec — v1

Fill every part. A spec ships only with 20+ correctly composed golden cases (≥14 `[Fact]`, full failure-mode coverage) AND a cost-per-outcome number to the cent checked against value. Anything less is not a spec; report the gap.

---

## Part 1 — The job line

> [WHO] gets [WHAT SINGLE OUTPUT], on [WHAT RECURRING TRIGGER], judged pass if [OBSERVABLE PASS CONDITION].

**Job line:** _[write it — the judged-by clause is not optional]_

If you cannot complete the judged-by clause, stop. Nothing downstream can be scored. Name what is missing (single output? trigger? a checkable pass condition?) and go get it. Do not invent it.

**Outcome unit** (one completed instance of this job): _[e.g. "one shift-handover digest delivered and read"]_

---

## Part 2 — The 20 golden cases

One real input + one binary pass condition per row. Tag source `[Fact]` (real observed input) or `[Assumption]` (constructed). Composition floors: Typical ≥6 · Edge ≥7 · Adversarial ≥4 · Must-refuse ≥3. Reality floor: ≥14 `[Fact]`. Coverage: every Part-3 failure mode reachable by ≥1 case.

| # | Band | Input (cite the artefact it came from) | Pass condition (binary, checkable) | Source | Failure mode it can hit |
|---|---|---|---|---|---|
| 1 | Typical | _[real input]_ | _[what makes the output PASS]_ | _[Fact/Assumption]_ | _[mode]_ |
| 2 | Typical |  |  |  |  |
| 3 | Typical |  |  |  |  |
| 4 | Typical |  |  |  |  |
| 5 | Typical |  |  |  |  |
| 6 | Typical |  |  |  |  |
| 7 | Edge |  |  |  |  |
| 8 | Edge |  |  |  |  |
| 9 | Edge |  |  |  |  |
| 10 | Edge |  |  |  |  |
| 11 | Edge |  |  |  |  |
| 12 | Edge |  |  |  |  |
| 13 | Edge |  |  |  |  |
| 14 | Adversarial |  |  |  |  |
| 15 | Adversarial |  |  |  |  |
| 16 | Adversarial |  |  |  |  |
| 17 | Adversarial |  |  |  |  |
| 18 | Must-refuse |  |  |  |  |
| 19 | Must-refuse |  |  |  |  |
| 20 | Must-refuse |  |  |  |  |

**Set checks:**
- Real (`[Fact]`) count: _[n]_ / 20 — must be ≥ 14.
- Every failure mode has ≥ 1 case: _[Yes / No — list any uncovered mode]_
- Band floors met (6/7/4/3): _[Yes / No]_

---

## Part 3 — Autonomy level + failure taxonomy + derived rates

**Chosen level:** _[L0 / L1 / L2 / L3 / L4]_ — the lowest that still delivers the job line.

**Why not lower / not higher:** _[one line each]_

**Failure taxonomy for this product** (adapt the modes; delete any that cannot occur here):

| Mode | What it looks like here | cost_of_one_failure | tolerable_cost_per_cycle | acceptable_rate ≤ ratio |
|---|---|---|---|---|
| Miss |  | _[$ or severity]_ | _[$]_ | _[= tolerable ÷ cost]_ |
| False alarm |  |  |  |  |
| Confidently wrong |  |  |  |  |
| Wrong format |  |  |  |  |
| Too slow / too dear |  |  |  |  |
| Silent failure |  |  |  |  |

Rates are **derived**, not chosen: `acceptable_rate(mode) ≤ tolerable_cost_per_cycle(mode) ÷ cost_of_one_failure(mode)`. If you cannot state cost_of_one_failure, you cannot state the rate.

**Gate to earn the next level:** _[e.g. "Miss rate ≤ 3% measured over 40 real shifts before moving L1 → L2"]_

---

## Part 4 — Cost-per-outcome budget

> cost_per_outcome = (C_attempt × A) + C_human + C_remediation

| Term | Value | Source |
|---|---|---|
| C_attempt (model + infra, one attempt) | _[$]_ | _[Fact/Assumption]_ |
| A (mean attempts per outcome, retries in) | _[n]_ | _[Fact/Assumption]_ |
| C_human (reviewer min × loaded rate, at this autonomy) | _[$]_ | _[Fact/Assumption]_ |
| C_remediation (Σ accepted_rate × cost_of_one_failure, surviving to prod) | _[$]_ | _[Fact/Assumption]_ |
| **cost_per_outcome** | **_[$ to the cent]_** |  |

**Economic gate:**
- value_per_outcome: _[$ — what one outcome is worth to the customer]_ _[Fact/Assumption]_
- cost_per_outcome _[<]_ value_per_outcome? **_[PASS / FAIL]_**
- Margin: _[value ÷ cost, e.g. "≈2,200×" or "1.4×, thin"]_

If FAIL: the spec fails here. Lower the human cost (raise autonomy only if earned), cut retries, or the wedge is not economic. Do not proceed on eval scores alone.

---

## Kill-line check

- [ ] 20+ golden cases, composed to the floors, ≥14 `[Fact]`, all modes covered
- [ ] Job line has a checkable judged-by clause
- [ ] Autonomy level chosen with derived (not vibes) failure rates
- [ ] cost_per_outcome stated to the cent and checked against value_per_outcome

Any box unchecked = not a spec yet. State exactly which, and the smallest next step to fill it.
