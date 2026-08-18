# Workflow + Fleet Map — Barrier Intelligence: alert-rule build fleet

**Fellow:** Barrier Intelligence · **Date:** 2026-07-22 · **Stage:** build-craft

Illustrative fixtures. Numbers are plausible, not real client data.

## Step 0 — Fleet-or-solo gate

| Test | Question | Yes / No | Note |
|---|---|---|---|
| Parallelism | ≥2 sub-tasks that could run at once? | yes | log-mining across 4 rigs runs in parallel; permit-data pull is independent |
| Role conflict | Must one agent produce and judge the same artefact? | yes | a safety alert-rule cannot be graded by the agent that wrote it |
| Context depth | Does the job overrun one context? | yes | 4 rigs × ~9 months of shift logs + permit history exceeds one window |

**Verdict:** fleet warranted — all three tests are yes. This is not solo work; do not route
to `agent-design`.

## A. The workflow job (one sentence)

> Turn Barrier's rig field logs and permit data into a set of gas-safety alert rules that
> fire before an incident, each rule falsified against known past incidents. `[Fact]` on the
> two inputs — both are exhaust Barrier already collects.

One workflow, one artefact class (validated alert rules). Not two products.

## B. The multi-step workflow

| # | Step | Input | Owner agent | Output artefact | Gate to next step |
|---|---|---|---|---|---|
| 1 | Mine near-miss patterns | Shift logs, permit records | Researcher | Sourced pattern set | every pattern cites a log line |
| 2 | Quantify base rates | Pattern set | Analyst | Incident base-rate model | arithmetic shown, per rig |
| 3 | Sketch the alert card | Top-3 patterns | Prototyper | Paper alert card | a field supervisor can read it in 10s |
| 4 | Write the alert-rule spec | Base rates + card | Drafter | Alert-rule spec vs template | template complete |
| 5 | Falsify each rule | Rule spec | Critic | Pass / defect list | verdict cites a known incident |

## C. The fleet

| Agent | Cognitive mode | Used? | Spawn trigger (observable) | Done condition | Hands off to |
|---|---|---|---|---|---|
| Researcher | Gather + source | yes | a daily log/permit batch lands, OR a draft rule holds an unsourced `[Assumption]` | pattern cited to a log line, or claim demoted | Analyst |
| Analyst | Structure + quantify | yes | Researcher emits a pattern set with no base rate | base rate built per rig, arithmetic shown | Drafter |
| Prototyper | Make tangible | yes | a top-3 pattern has no field-facing artefact | a paper alert card exists | Critic / supervisor |
| Drafter | Compose | yes | base rates + card ready, no rule spec yet | spec complete against the alert-rule template | Critic |
| Critic | Falsify | yes | a rule spec reaches "template complete" | verdict: pass, or defects each tied to a known incident | Drafter (loop) / safety lead |

No archetype is unused here — a safety-critical build needs all five. In a lighter workflow
the prototyper or researcher would be marked "n/a — not needed".

## D. Spawn-trigger wiring

| Trigger event | Condition / threshold | Agent spawned | Done signal | Rung |
|---|---|---|---|---|
| Daily log/permit batch lands | batch > 0 rows | Researcher | patterns extracted or "none new" logged | artefact 0.5 `[Fact]` |
| Draft rule holds unsourced `[Assumption]` | any such tag present | Researcher | tag sourced to a log line or demoted | artefact 0.5 `[Fact]` |
| Pattern set has no base rate | any pattern without a number | Analyst | base rate built, arithmetic shown | artefact 0.5 `[Fact]` |
| Rule spec reaches "template complete" | all template rows filled | Critic | verdict returned with incident citations | behaviour 0.7 `[Assumption]` |
| Critic returns defects | defect list non-empty | Drafter | defects cleared or escalated | behaviour 0.7 `[Assumption]` |

**Loop exits:** critic → drafter loop runs max 3 iterations; a rule still failing on iteration
3 escalates to the human safety lead, it does not auto-ship. `[Fact]` on the rule; the "3" is
an `[Assumption]` to be tuned once the fleet has run.

Every trigger clears 0.5 — each points at an artefact state (a batch, a tag, a missing number,
a completed template, a non-empty defect list). None is a mood.

## E. Surface assignment

| Step | Surface | Why this surface |
|---|---|---|
| 1 Mine patterns | Think — Claude.ai | divergent reading of unstructured logs; no tools needed |
| 2 Quantify base rates | Think — Claude.ai | framing + arithmetic, reviewed before it touches code |
| 3 Sketch alert card | Build — Claude Code | rendered against the repo's card component; route craft to `impeccable` |
| 4 Write rule spec | Build — Claude Code | touches the rules file and the eval harness; deterministic |
| 5 Falsify rules | Build — Claude Code | runs the spec against the golden incident set (the eval-first-spec cases) |
| Daily log fan-out + fleet monitor | Admin — Cowork | scheduled 06:00 pull across 4 rigs, parallel dispatch, watch the running loop |

The surprise for Barrier: they planned to run the whole build inside one Claude Code session.
Mining unstructured logs is divergent Think work that Claude Code over-tools; the daily
4-rig fan-out is scheduled Admin work Cowork does natively. Moving those two off Claude Code
cut the build to the parts that actually need a repo.

## F. Critic-independence check

> The critic is a separate agent from the drafter, with its own trigger (a completed spec) and
> its own bar (each defect cited to a known incident). Confirmed independent. A safety product
> whose rules are graded by the agent that wrote them has no guardrail.

## Kill line — self-check

- [x] Fleet warranted — Step 0 has three hard yeses (parallelism, role conflict, depth).
- [x] Every agent used has an observable spawn trigger; the trigger column has no vibes entries.
- [x] Every trigger clears 0.5 — each points at an artefact state.
- [x] Critic is a distinct agent from the drafter (Section F).
- [x] The critic → drafter loop names an exit: max 3, then escalate to the safety lead.
- [x] Every step in B emits an artefact and gates the next.
- [x] Every step has a surface chosen by mode, not habit — two moved off Claude Code.
- [x] Empirical claims tagged; the loop count and the base-rate numbers are `[Assumption]`,
      the two inputs and the incident set are `[Fact]` from Barrier's own data. No number invented.
