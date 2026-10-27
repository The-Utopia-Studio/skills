# Flywheel Cadence Doc — <product name>

The post-launch loop for a shipped AI product. Fill every station. This doc ships only if (1) the learn station re-runs the WHOLE eval set on every model release, and (2) every autonomy change is tied to a scored eval result. Anything less is a vanity loop; report the gap.

Tag every rate `[Fact]` (measured on real traces or the real golden set) or `[Assumption]` (projected until a real re-run confirms it).

---

## Station 0 — Precondition gate

The flywheel cannot turn without these. If any is missing, stop and route.

| Precondition | Present? | If missing |
|---|---|---|
| Golden set (20+ pass/fail cases from `eval-first-spec`) | _[Yes / No]_ | Route to `eval-first-spec`. Nothing to re-run. |
| Chosen autonomy level L0–L4 + per-mode acceptable rates | _[Yes / No]_ | Route to `eval-first-spec`. No ladder to climb. |
| Product is live behind a human sign-off gate | _[Yes / No]_ | Ships with no sign-off = a `guardrail-design` gap. |

If any cell is No, do not fill the rest. State the gap and the route.

---

## Station 1 — Ship (behind sign-off)

| Field | Value |
|---|---|
| Current autonomy level | _[L0 / L1 / L2 / L3 / L4 — the level `eval-first-spec` shipped]_ |
| The sign-off gate | _[who reviews and commits every output before it acts]_ |
| Outcome unit | _[one completed instance of the job line, from `eval-first-spec`]_ |
| Baseline cost-per-outcome | _[$ from `eval-first-spec` Part 4]_ |

This is the starting position. The loop's job is to earn a looser gate one measured rung at a time.

---

## Station 2 — Observe (tweak-time)

Instrument the edit distance between what the system proposed and what the human committed. Read from the production trace, not a survey.

| Metric | Now | Trend (weeks) | Source |
|---|---|---|---|
| Clean-accept rate (committed with **zero** edits) | _[%]_ | _[falling / flat / rising]_ | _[Fact / Assumption]_ |
| Median edit fraction | _[%]_ | _[…]_ | _[…]_ |

Read the band:

| Clean-accept | Trend | Action |
|---|---|---|
| any | falling | Freeze autonomy. Run Station 3 now. Find the cause first. |
| < 30% | flat | Draft tool. Hold. Cluster the edits → a systematic edit is a missing feature, not noise. |
| 30–70% | rising | Earning trust. Hold. Watch the modes behind the edits. |
| > 70% | sustained over N cycles | **Nominates** a level-up → carry to Station 4. Does not grant it. |

**Systematic edit found (if any):** _[the recurring change humans make = the next feature or default]_

Retention, North Star, and the rest of the scorecard belong to `metrics-that-matter`. Do not rebuild them here.

---

## Station 3 — Learn (re-run the WHOLE eval set)

Re-run **every** golden case (not a sample) on each trigger. This station is mandatory; skipping it is the kill line.

| Trigger | Covered by our cadence? |
|---|---|
| Any model version change — re-run **before** production | _[Yes / No]_ |
| Any core prompt / system-message change | _[Yes / No]_ |
| Any retrieval / corpus change | _[Yes / No]_ |
| Monthly floor cadence with no change (drift catch) | _[Yes / No]_ |

### Eval ledger (append one row per re-run)

> The five mode columns below are illustrative — relabel them to *this product's* failure modes from `eval-first-spec`. They are not canonical.

| Date | Model / change | Miss | False alarm | Confidently wrong | Wrong format | Silent failure | Δ vs last | Action |
|---|---|---|---|---|---|---|---|---|
| _[date]_ | _[baseline]_ | _[rate]_ | _[rate]_ | _[rate]_ | _[rate]_ | _[rate]_ | — | shipped |
| _[date]_ | _[what changed]_ |  |  |  |  |  | _[better/worse]_ | _[ship / hold / demote]_ |

**Regression rule:** a regression on any safety-critical mode blocks the release or demotes autonomy **even if the aggregate pass rate rose**. Net-better does not buy a safety regression. Name the safety-critical mode(s) for this product: _[…]_

---

## Station 4 — Refine (autonomy by eval, never by feel)

Move one rung at a time along the `eval-first-spec` ladder. No skipping.

| Condition | Action | This cycle |
|---|---|---|
| Tweak-time nominates AND eval re-run **at next level** passes its acceptable rates over N cycles, no safety-mode regression | Promote one rung | _[…]_ |
| Eval holds current level's rates | Hold | _[…]_ |
| Eval regresses below current level's `acceptable_rate` | Demote / re-gate behind sign-off | _[…]_ |
| Tweak-time nominates but no eval re-run at next level | **Hold** — not earned | _[…]_ |

| Field | Value |
|---|---|
| Gate to earn the next level (N) | _[carry from `eval-first-spec` Part 3, e.g. "Miss ≤ 3% over 40 real shifts"]_ |
| Decision this cycle | _[Promote L_ → L_ / Hold / Demote L_ → L_]_ |
| Evidence it rests on | _[the scored eval re-run — NOT "feels ready"]_ |

---

## Cadence table (who runs what, how often)

| Ritual | Frequency | Owner (named human) |
|---|---|---|
| Read tweak-time trend | _[weekly]_ | _[name]_ |
| Full eval re-run | _[every model/prompt/corpus change + monthly floor]_ | _[name]_ |
| Autonomy decision | _[per re-run]_ | _[name]_ |
| Cost-per-outcome check | _[monthly]_ | _[name]_ |

---

## Compounding check

| Question | Answer |
|---|---|
| Is cost-per-outcome falling turn over turn? | _[$ last → $ now — if flat, it is a loop, not a flywheel]_ |
| What drove the fall? | _[fewer human minutes as autonomy rose / fewer retries as quality rose]_ |
| If flat: name it | _[a loop spinning in place — the honest finding]_ |

---

## Kill-line self-check

- [ ] Learn station re-runs the WHOLE eval set on every model release (not a sample, not skipped).
- [ ] Every autonomy change traces to a scored eval result, not a feeling.
- [ ] Tweak-time only nominated a level-up; the eval granted it.
- [ ] Safety-mode regression rule overrides aggregate improvement.

If any box is unchecked, this is not a flywheel. Report the gap; do not ship it as done.
