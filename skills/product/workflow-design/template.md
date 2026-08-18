# Workflow + Fleet Map — <product / workflow name>

**Fellow:** <name> · **Date:** <date> · **Stage:** build-craft

## Step 0 — Fleet-or-solo gate

A fleet is warranted only if at least one test is a hard yes. Answer before designing.

| Test | Question | Yes / No | Note |
|---|---|---|---|
| Parallelism | ≥2 sub-tasks that could run at once with no shared state? | <yes/no> | <what runs in parallel> |
| Role conflict | Must one agent both produce and judge the same artefact? | <yes/no> | <drafter vs critic?> |
| Context depth | Does the whole job overrun one agent's usable context/memory? | <yes/no> | <where it breaks> |

**Verdict:** <fleet warranted / SOLO — route to `agent-design` and stop>.
If all three are no, do not continue. One agent is the correct design.

## A. The workflow job (one sentence)

> <what the fleet turns into what artefact, for whom> `[Fact/Assumption/Hypothesis]`

If it needs "and" three times, it is more than one workflow. Split it or pick one.

## B. The multi-step workflow

Ordered or branched. Every step emits an artefact and gates the next. A step with no output
artefact is a meeting, not a step.

| # | Step | Input | Owner agent | Output artefact | Gate to next step |
|---|---|---|---|---|---|
| 1 | <e.g. gather field evidence> | <raw logs> | Researcher | <sourced fact set> | <every claim sourced or demoted> |
| 2 | <quantify> | <fact set> | Analyst | <base-rate model> | <arithmetic shown> |
| 3 | <make tangible> | <concept> | Prototyper | <paper/clickable artefact> | <a stranger can react to it> |
| 4 | <compose> | <decision + model> | Drafter | <spec against template> | <template complete> |
| 5 | <falsify> | <draft> | Critic | <pass / defect list> | <verdict cites evidence> |

## C. The fleet

The five archetypes are a menu. Mark unused ones "n/a — not needed, why". Each is a cognitive
mode, not a topic.

| Agent | Cognitive mode | Used? | Spawn trigger (observable) | Done condition | Hands off to |
|---|---|---|---|---|---|
| Researcher | Gather + source | <yes/n·a> | <claim tagged `[Assumption]` with no source> | <sourced or demoted> | Analyst |
| Analyst | Structure + quantify | <yes/n·a> | <facts need a number/decision> | <arithmetic shown> | Drafter / Critic |
| Prototyper | Make tangible | <yes/n·a> | <concept needs a thing to react to> | <artefact exists> | Critic / user |
| Drafter | Compose | <yes/n·a> | <decision/spec must become an artefact> | <complete vs template> | Critic |
| Critic | Falsify | <yes/n·a> | <artefact crosses review threshold> | <pass or named defects> | Drafter (loop) / human |

## D. Spawn-trigger wiring

Every trigger = observable EVENT + CONDITION + DONE signal. Score each on the ladder. A vibes
trigger is 0.1 and fails. Every loop needs an exit.

| Trigger event | Condition / threshold | Agent spawned | Done signal | Rung (0.1–1.0) |
|---|---|---|---|---|
| <new field log lands> | <daily batch > 0 rows> | Researcher | <patterns extracted or none found> | <artefact 0.5 `[Fact]`> |
| <draft holds unsourced `[Assumption]`> | <any such tag present> | Researcher | <tag sourced or demoted> | <artefact 0.5> |
| <draft reaches "complete vs template"> | <all template rows filled> | Critic | <verdict returned> | <artefact 0.5> |
| <critic returns defects> | <defect list non-empty> | Drafter | <defects cleared or escalated> | <behaviour 0.7> |

**Loop exits:** <critic → drafter loop: max <N> iterations, then escalate to human>.

Ladder: money 1.0 · behaviour 0.7 · artefact 0.5 · verbal 0.3 · opinion 0.1.
Bar: every trigger must clear **0.5** — pointable to an artefact state. Any 0.1 trigger
("when it feels stuck") is a KILL until rewritten as an observable condition.

## E. Surface assignment

Pick the surface by the mode of the step, not by habit. Wrong surface is the commonest waste.

| Step | Surface | Why this surface |
|---|---|---|
| <1 gather> | Think — Claude.ai | <divergent, no-tools reasoning> |
| <2 quantify> | Think — Claude.ai | <framing / arithmetic> |
| <3 prototype> | Build — Claude Code | <repo-grounded, tooled> |
| <4 draft spec> | Build — Claude Code | <touches files, deterministic> |
| <daily log fan-out> | Admin — Cowork | <scheduled, parallel dispatch, monitored> |

Rule: Think = diverge/explore; Build = deterministic/tooled/repo; Admin = schedule/fan-out/
monitor the running fleet.

## F. Critic-independence check

> The critic is a separate agent from the drafter. Confirm: <yes — critic is a distinct agent
> with its own trigger>. If the same agent drafts and critiques, the critic does not exist.

## Kill line — self-check before returning

- [ ] A fleet is actually warranted (Step 0 has ≥1 hard yes). If not, this is a SOLO design —
      route to `agent-design`, do not ship a fleet. A single-agent job dressed as a fleet is a KILL.
- [ ] Conversely, if Step 0 has ≥1 hard yes but the design still runs on one agent, the fleet is
      under-built — a lone agent doing fleet-sized work is a KILL. Build out the fleet here; do not
      cram fleet-sized work into a single `agent-design` spec.
- [ ] Every fleet agent used has a spawn trigger that reads as an observable if-condition. No
      blank or vibes triggers. A trigger with no observable event is a KILL.
- [ ] Every spawn trigger clears 0.5 on the ladder (pointable to an artefact state).
- [ ] The critic is a different agent from the drafter (Section F).
- [ ] Every loop names an exit (max iterations or escalate-to-human).
- [ ] Every step in B emits an artefact and gates the next.
- [ ] Every step in E has a surface, chosen by mode not habit.
- [ ] Every empirical claim (volume, cadence, cost) is tagged `[Fact]`/`[Assumption]`/
      `[Hypothesis]`. No number invented that the fellow did not provide.
