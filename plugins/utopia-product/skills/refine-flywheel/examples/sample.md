# Worked example — Mentix post-launch flywheel (shift-handover machine-risk digest)

Mentix builds industrial AI for factory operations. This picks up exactly where `eval-first-spec` shipped Mentix v1: the shift-handover digest, at autonomy **L1 (Drafts)**, with a 20-case golden set and a cost-per-outcome of **$3.55/shift** checked against ~$900 value. This is a test fixture — numbers are illustrative, not real client data. Every rate is tagged `[Fact]` (measured on real traces / the real golden set) or `[Assumption]` (projected).

## Input the fellow brought

"The digest has been live on 3 lines for 10 weeks. Supervisors seem happy. The team wants to let it auto-post to the handover board without a supervisor sign-off, and there's a new model release out this week. What's the loop, and can we raise the autonomy?"

Artefacts on the table:
- The 20-case golden set from `eval-first-spec`, still runnable. [Fact]
- Every digest export and the supervisor's committed version are in the event stream (so edit distance is computable per digest). [Fact]
- 10 weeks of digests across 3 lines. [Fact]
- `eval-first-spec` set the L1→L2 gate at **Miss ≤ 3% over 40 real shifts**. [Fact]

---

## Station 0 — Precondition gate

| Precondition | Present? |
|---|---|
| Golden set (20 cases) | Yes [Fact] |
| Autonomy level L1 + per-mode acceptable rates | Yes [Fact] |
| Live behind a sign-off gate (supervisor commits every digest) | Yes [Fact] |

Gate passes. The flywheel can turn. (Had the golden set not existed, the correct answer would have been one line: "go run `eval-first-spec` first — there is nothing to re-run." Not a filled doc.)

---

## Station 1 — Ship

| Field | Value |
|---|---|
| Current autonomy | L1 Drafts — system proposes the ranked ≤5 list, supervisor commits it |
| Sign-off gate | Outgoing supervisor reads and commits the digest at handover |
| Outcome unit | One shift-handover digest delivered and read |
| Baseline cost-per-outcome | $3.55/shift [Assumption, from spec] |

---

## Station 2 — Observe (tweak-time)

Edit distance between the drafted digest and the version the supervisor committed, from the event stream.

| Metric | Week 1–2 | Week 9–10 | Trend | Source |
|---|---|---|---|---|
| Clean-accept rate (zero edits) | 41% | 78% | rising | [Fact, traces] |
| Median edit fraction | 22% | 6% | falling | [Fact, traces] |

Reading: clean-accept is now **> 70% and sustained** → this **nominates** an L1→L2 level-up. It does not grant it.

**Systematic edit found:** in weeks 1–4, supervisors kept re-ordering the list to push a specific slow-degrading conveyor down when it had just been serviced. That recurring edit was a missing input (last-service date), now added — which is why clean-accept climbed. The edit was a feature, not noise. [Fact]

---

## Station 3 — Learn (re-run the WHOLE eval set)

A new model dropped this week — a mandatory full re-run **before** it touches production. All 20 cases re-scored on the new model.

### Eval ledger

| Date | Model / change | Miss | False alarm | Confidently wrong | Silent failure | Aggregate pass | Action |
|---|---|---|---|---|---|---|---|
| Wk 0 | Baseline (shipped model) | 2.5% | 8% | 4% | 0% | 18/20 | shipped [Fact] |
| Wk 10 | New model release | **6%** | 5% | 3% | 0% | **19/20** | **HOLD — do not ship to prod** [Fact] |

The new model scores **higher in aggregate** (19/20 vs 18/20) but the **Miss rate more than doubled to 6%**, above the L1→L2 gate of 3% and worse on the mode that costs $8,000 per event. The regression rule fires: a safety-relevant Miss regression blocks the release even though the overall number improved. Keep the shipped model in production; do not promote the new one on its headline score. [Fact]

This is the whole point of the station. Without re-running all 20 cases, "the new model is obviously better" (true in aggregate) would have shipped a product that misses more real stops.

---

## Station 4 — Refine (autonomy by eval, never by feel)

The fellow asked for two moves. Both are decided by the eval, not the mood.

| Ask | Decision | Why |
|---|---|---|
| Skip to auto-post (L1 → drop sign-off) | **Refused** | That is L1 → L3 (informs-with-review to acts-autonomously) in one jump. The ladder is climbed one rung at a time. And "supervisors seem happy" is 0.1 opinion; it cannot move autonomy. |
| Promote L1 → L2 | **Granted, but on the current model only** | Tweak-time nominated it (78% clean-accept sustained), AND the shipped model's re-run holds Miss at 2.5% ≤ 3% over 44 real shifts — clearing the derived gate. The scored eval grants it, not the tweak-time number. |

Because the new model failed its re-run, L2 runs on the **existing** model. If the new model is later fixed and re-scored under 3% Miss, it becomes eligible; until then it is unknown, not better.

Guard checked: the > 70% clean-accept did not come from emptier digests — the must-refuse and adversarial golden cases still pass, so the rising acceptance is trust, not hedging. [Fact]

---

## Compounding check

| Question | Answer |
|---|---|
| Is cost-per-outcome falling? | $3.55 → **$2.90/shift** [Assumption] |
| What drove it? | L2 batch-approval cuts supervisor review from ~3 min to ~1.5 min per digest; C_human falls. |
| Flywheel or loop? | Flywheel — the turn lowered cost-per-outcome and freed margin. Had cost stayed at $3.55 while "usage grew", it would be a loop, and the doc would say so. |

---

## What a generic prompt would have gotten wrong here

It would have shipped the new model on its higher aggregate score (missing the doubled Miss rate), granted the auto-post because "supervisors seem happy", and reported "engagement up" as success. This doc did the opposite on all three: re-ran the whole set and held the model on a single safety-mode regression, refused the rung-skip and required the scored eval, and proved the loop compounds with a cost-per-outcome that actually fell.
