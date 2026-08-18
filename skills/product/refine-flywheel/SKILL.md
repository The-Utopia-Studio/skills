---
name: refine-flywheel
description: Stands up the post-launch loop for a shipped AI product — ship behind sign-off → observe tweak-time (how much the customer edits before accepting) → learn by re-running the WHOLE eval set on every model release → refine by promoting autonomy only as a scored eval result, never by feel. Fires on "what happens after launch", "improve the product", "set up the loop", "a new model dropped, should we upgrade", "can we raise the autonomy / drop the sign-off yet". Returns a filled flywheel cadence doc. NOT for which metrics/North Star/retention to track (use metrics-that-matter), NOT for turning one trace into a discovery interview (use trace-to-interview), NOT for writing the eval set or autonomy ladder in the first place (use eval-first-spec — this re-runs what that created).
type: generator
supersedes: none
---

## What it does

Turns a shipped product into a loop that compounds. It takes a v1 that is live behind a human sign-off gate and stands up four stations: ship (the current autonomy level and its gate), observe (instrument tweak-time — the edit distance between what the system proposed and what the human committed), learn (re-run the entire golden set from `eval-first-spec` on every model release and on a fixed floor cadence), and refine (move autonomy up or down strictly on the scored eval result). The artefact is the filled `template.md`: a cadence doc that names what runs, how often, who owns it, and the exact numbers that move autonomy. A loop that raises autonomy on a hunch is not this skill; it is the failure this skill exists to stop.

## The Icarus reframe

The generic post-launch loop is build-measure-learn with an engagement dashboard: usage goes up and to the right, everyone nods, nothing about the product's trustworthiness is known. Icarus replaces the vanity metric with **tweak-time** — a behaviour signal (0.7 on the ladder), read from production traces, that measures how much a customer edits an output before accepting it; tweak-time falling to zero is the product earning the right to act. It replaces "ship it and move on" with a standing regression harness: a new model release is a **regression risk until the eval set re-scores it**, not a free upgrade, so the whole golden set re-runs before any model change reaches production. And it replaces the autonomy promotion-by-confidence with a **ratchet driven by evidence in both directions** — the L0–L4 level from `eval-first-spec` climbs one rung only when the eval re-run passes that rung's derived failure rates over N real cycles, and drops when a model release regresses them. Tweak-time nominates; the eval confirms; feelings never vote.

## When to use / When NOT

Use it once a product is shipped or in a paid pilot, behind a sign-off gate, WITH an eval set and an autonomy ladder already produced by `eval-first-spec`. Trigger phrases: "what happens after launch", "improve the product", "set up the loop", "a new model came out — should we upgrade", "can we raise the autonomy level / drop the sign-off yet".

Hard precondition: no eval set, no flywheel. The learn station has nothing to re-run without the 20-case golden set, and the refine station has no ladder to climb without the L0–L4 levels. If those do not exist, stop and route to `eval-first-spec`. Do not invent an eval set here.

Do not use it for:

| Request | Belongs to |
|---|---|
| "Which metrics / what's our North Star / does retention flatten / cost-per-outcome dashboard" | `metrics-that-matter` (08, sibling). It picks the metric set; this builds the ship→observe→learn→refine cadence and the autonomy ratchet. This skill *reads* tweak-time and cost-per-outcome; that skill decides the wider scorecard. Route metric selection there. |
| "Turn these production traces into interviews / what unmet need do the logs reveal" | `trace-to-interview` (08, sibling). It mines the qualitative discovery question from one trace; this reads traces as a quantitative behaviour signal (tweak-time) and as the eval-regression check. Same raw feed, different question. |
| "Write the golden cases / set the autonomy level / define what working means" | `eval-first-spec` (07). It *creates* the eval set and ladder before build; this *re-runs* them after launch. If there is no eval set, you are here too early. |
| "Keep the opportunity tree alive / set up continuous discovery" | `continuous-discovery-engine` (02). That is the discovery-side loop; this is the delivery/quality-side loop. They run beside each other (dual-track) and share the trace feed; neither owns the other. |

## Method

Fill in `template.md`. Check the precondition, then the four stations, then the compounding check and the kill line.

### Station 0 — Precondition gate

Before anything, confirm three things exist. If any is missing, the flywheel cannot turn; name the gap and route.

| Precondition | If missing |
|---|---|
| A golden set (the 20+ pass/fail cases from `eval-first-spec`) | Route to `eval-first-spec`. There is nothing to re-run. Stop. |
| A chosen autonomy level L0–L4 with per-mode acceptable rates | Route to `eval-first-spec`. There is no ladder to climb. Stop. |
| The product is live behind a human sign-off gate | If it ships with no sign-off, that is a `guardrail-design` gap, not a flywheel. |

### Station 1 — Ship (behind sign-off)

State the starting position, not the destination. Record the current autonomy level (usually L1 Drafts or L2 Acts-on-approval — the level `eval-first-spec` shipped) and the sign-off gate: every output is reviewed and committed by a named human before it acts. The flywheel's whole job is to earn the right to loosen this gate, one measured rung at a time. Autonomy starts low on purpose.

### Station 2 — Observe (tweak-time)

Instrument one behaviour: **tweak-time** — how much the human edits the system's proposed output before accepting it. Read it from the production trace, not a survey. Track three numbers per output type:

- clean-accept rate: share of outputs committed with **zero** edits `[Fact, from traces]`
- median edit fraction: how much of the accepted output was changed
- the trend over weeks: falling, flat, or rising

Read the bands like this:

| Clean-accept rate | Trend | Reading and action |
|---|---|---|
| any | falling over weeks | The product is regressing or drifting. Freeze autonomy, run the learn station now, find the cause before anything else. |
| < 30% | flat | Still a draft tool. Hold autonomy. Cluster the edits — a systematic edit is a missing feature or a wrong default, not noise. |
| 30–70% | rising | Earning trust. Hold the level. Watch which failure modes sit behind the remaining edits. |
| > 70% | sustained over the level's N cycles | **Nominates** a level-up. It does not grant one. Carry the nomination to Station 4; the eval decides. |

Tweak-time is a nomination, never a promotion. Everything else (retention, cost-per-outcome, North Star) is `metrics-that-matter`'s scorecard — reference it, do not rebuild it here.

### Station 3 — Learn (re-run the WHOLE eval set)

This is the station the kill line guards. Re-run every golden case, not a sample, on any of these triggers:

| Trigger | Why it is mandatory |
|---|---|
| Any model version change (provider release, model swap) | A new model can silently regress a case that passed last week. "Obviously better" is not a measurement. Re-run **before** it reaches production. |
| Any change to the core prompt / system message | Same input, changed reasoning, unknown result. |
| Any change to retrieval or the corpus | The evidence the model reasons over moved. |
| A fixed floor cadence (monthly) with no change at all | Catches drift, data-distribution shift, and provider-side silent updates. |

On each re-run, log to a standing eval ledger and compare per-mode pass rates against two baselines: the last run, and `eval-first-spec`'s derived `acceptable_rate(mode)`.

| Date | Model / change | Miss | False alarm | Confidently wrong | ... | Δ vs last | Action |
|---|---|---|---|---|---|---|---|
| _[date]_ | _[what changed]_ | _[rate]_ | _[rate]_ | _[rate]_ | | _[better/worse]_ | _[ship / hold / demote]_ |

The regression rule overrides aggregate improvement: a regression on any safety-critical mode (a Miss in gas safety, a Confidently-wrong in a decision that moves money) blocks the release or demotes autonomy **even if the overall pass rate went up**. Net-better does not buy a safety regression.

### Station 4 — Refine (promote autonomy by eval, never by feel)

Move autonomy along the `eval-first-spec` ladder using the scored eval, gated by tweak-time. One rung at a time; no skipping.

| Condition | Autonomy action |
|---|---|
| Tweak-time nominates (>70% clean-accept sustained N cycles) AND an eval re-run **at the next level's** acceptable rates passes over N real cycles, no safety-mode regression | Promote one rung |
| Eval re-run holds the current level's rates | Hold |
| Eval re-run regresses below the current level's `acceptable_rate` (common after a model release) | Demote / re-gate behind sign-off until a passing re-run |
| Tweak-time nominates but no eval was re-run at the next level | **Hold.** The nomination is 0.7 evidence for a hypothesis; the promotion needs the scored eval. Feel is not a vote. |

N is the same "gate to earn the next level" that `eval-first-spec` Part 3 already set (e.g. Miss ≤ 3% over 40 real shifts). Do not re-derive it; carry it forward.

### Compounding check and kill line

A loop is only a flywheel if each turn lowers `cost_per_outcome` (from `eval-first-spec` Part 4) — fewer human review minutes as autonomy rises, or fewer retries as quality rises — freeing margin for the next discovery cycle. If cost-per-outcome is flat turn over turn while usage climbs, it is a loop spinning in place. Name it.

**Kill line.** The cadence doc ships only if (1) the learn station re-runs the whole eval set on every model release, and (2) every autonomy change is tied to a scored eval result. A loop that promotes autonomy by feel, or that upgrades a model with no re-run, is auto-fail. Report the gap; do not dress a vanity loop as a flywheel.

## Evidence standard

This skill weights behaviour and money over opinion. The ladder: money moved 1.0 → behaviour observed 0.7 → artefact shown 0.5 → verbal commitment 0.3 → opinion 0.1.

| Signal in this loop | Rung | Use |
|---|---|---|
| Cost-per-outcome fell / customer expanded spend | 0.7–1.0 | Proves the flywheel compounds. |
| Tweak-time (clean-accept rate from traces) | 0.7 | Nominates an autonomy level-up. Never grants it. |
| Eval re-run pass rate on the real golden set | 0.5–0.7 | The only signal that moves autonomy. |
| "The team feels it's ready" / "users like it" | 0.1 | Cannot move autonomy. Named as opinion, parked. |

An autonomy promotion must rest on the scored eval (≥ 0.5). No promotion is ever justified by the 0.1 "feels reliable now." Tag every rate `[Fact]` (measured on real traces or the real golden set) or `[Assumption]` (projected until a real re-run confirms it).

## Gotchas

Promoting on tweak-time alone. A 90% clean-accept rate feels like proof, but it is a proxy. Until the golden set is re-scored at the higher level's acceptable rates, the level is not earned. Tweak-time nominates; the eval confirms. Skipping the eval is promoting by feel with a number attached.

Treating a model upgrade as a free win. Skipping the re-run because the new model is "obviously better" is the exact failure the kill line names. A silent regression on one mode can outweigh every aggregate gain, and you will not see it without re-running all 20 cases. Newer is unknown, not better, until scored.

Tweak-time survivorship at higher autonomy. You only observe edits on outputs a human reviewed. At L3+ the un-reviewed outputs generate no tweak-time signal — so the metric blinds you exactly where cost-of-error is highest. Above L2, supplement tweak-time with the flagged-exception review rate and periodic audits; do not trust the clean-accept rate alone.

Clean-accept gamed by emptier output. If the model learns to hedge — vaguer, safer outputs a human cannot disagree with — tweak-time falls for the wrong reason. Guard: the golden set's must-refuse and adversarial bands must still pass. A rising clean-accept rate with a falling golden pass rate is drift, not trust.

Vanity loop. Usage up, edits still 100%, is a product people are forced to use, not one they trust. If tweak-time and cost-per-outcome are flat, "engagement is growing" is noise.

## Examples

`examples/sample.md` — the post-launch flywheel for Mentix's shift-handover machine-risk digest, picking up exactly where `eval-first-spec` shipped it at L1: tweak-time instrumented on the digests (clean-accept climbing 41% → 78%), a model-release re-run that regresses the Miss rate and correctly holds autonomy despite a higher aggregate score, and an L1→L2 promotion granted only after the re-scored eval clears the derived gate — with cost-per-outcome falling $3.55 → $2.90/shift as the compounding proof.

## Related skills

`eval-first-spec` (07) — creates the golden set and the L0–L4 ladder that this skill re-runs and climbs. Upstream, once, before build. If it has not run, this skill has no inputs. They are two ends of one asset: that skill writes the eval, this one keeps it alive.

`metrics-that-matter` (08, sibling) — owns the metric scorecard (AARRR, the retention curve that must flatten, the North Star, cost-per-outcome to the cent). This skill consumes cost-per-outcome and tweak-time; it does not choose the scorecard. Reference it for retention and North Star; do not restate the M9 retention pack.

`trace-to-interview` (08, sibling) — turns one production trace into a discovery interview. Same raw feed as this skill's observe station, opposite question: it asks "what unmet need does this trace reveal", this asks "is the product earning autonomy". Route the qualitative discovery question there.

`continuous-discovery-engine` (02) — the discovery-side loop (the living opportunity tree). This is the delivery-side loop. They run dual-track and share the trace feed; keep the boundary.

Supersedes: none. New skill; no prior post-launch flywheel exists in the pack to replace.
