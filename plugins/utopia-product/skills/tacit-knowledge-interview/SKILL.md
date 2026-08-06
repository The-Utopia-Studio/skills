---
name: tacit-knowledge-interview
description: Shadow an expert doing real work and extract the judgment calls they make without noticing. Fires when a fellow says "interview an expert", "capture how they decide", "watch them work", "shadow an operator", "capture the judgment", or "encode when they override the rule". Runs a watch-30 / replay-20 / edge-cases-10 session and returns a Tacit-Knowledge Capture: the explicit procedure split from the tacit judgment, each fork tagged with the cue read and the exception that overrides it. NOT for scripting a Mom-Test customer discovery interview (use interview-script), planning discovery interviews about a problem or churn (use discovery-interview-prep), or condensing a transcript you already have (use summarize-interview).
type: interactive
supersedes: none
---

## What it does

Takes an expert who does a task better than they can explain it and returns the part they cannot explain: the forks where they chose without a written rule and never noticed choosing. It splits the session into watch-30 / replay-20 / edge-cases-10 — shadow the real task silently, then replay it fork by fork, then chase the exceptions. The output is a Tacit-Knowledge Capture that separates the explicit procedure (the SOP a competitor can already read) from the tacit judgment ledger (each fork with the cue the expert read and the exception that overrides the rule). It weighs what you watched over what they told you.

## The Icarus reframe

Most interviews capture what an expert can tell you — the procedure, the SOP, the rules a competitor already has. The value is in what they can only show you: the forks where they chose without a written rule and never noticed choosing. So do not ask, watch. Split the session watch-30 / replay-20 / edge-cases-10 — shadow the real task for 30 minutes without interrupting, replay for 20 asking "you did X there, why, and do you always?" at each fork you logged, then spend 10 on the edge cases that break the rule. Return the explicit procedure separated from the tacit judgment, each fork tagged with the cue read and the exception that overrides it. The tacit half is the product; the explicit half a competitor can already buy. If the capture is the manual reformatted, it failed.

## When to use / When NOT

Use it when you can watch a real expert do a real task and you need their judgment encoded — for a copilot, an automation, an onboarding, or a data product that must make the call the way they do. Use it when the SOP is written but the results still depend on who is holding the wheel.

Do not use it for:

| If the fellow wants… | Use instead | Why not this skill |
|---|---|---|
| A Mom-Test script to learn a customer's problem or JTBD | `interview-script` | That prepares questions to validate a problem; this shadows an expert doing work to extract judgment. |
| To plan/prep discovery interviews about churn or a new idea | `discovery-interview-prep` | That picks a goal, segment, and methodology for problem discovery; this needs live observation of a task, not a plan. |
| To condense an interview transcript already recorded | `summarize-interview` | That extracts signal from words you have; this creates new signal by watching behaviour you have not yet observed. |
| To score a single signal on the evidence ladder | `evidence-ladder` | That grades one claim; this produces the capture (and uses the ladder to weigh each fork). |
| To find data a model cannot already reach | `yoda-data-sourcing` | That locates proprietary data; this creates judgment data by observation. Related, not the same. |

## Method

Fill `template.md` as you go. The watch phase produces behaviour (0.7); the replay phase produces narration (0.3 at best) that must be anchored to something you saw. Never invent a fork you did not observe.

### Step 0 — Confirm you can watch the real task

You cannot capture tacit knowledge from a conference room. If the only access is the expert describing their work over a call, you get the explicit half and nothing else — say so and stop. This skill requires watching the real task live, or a recording of it being done for real (not a talk-through). Name the task in one line: who, doing what, where the outcome depends on a call they make. If the input names no watchable task, ask the one unblocking question (see Gotchas) and stop.

### Step 1 — Watch 30: shadow silently

Watch the real task. Do not interrupt. Do not ask "why" yet — a question turns behaviour into narration and destroys the 0.7. Log every **fork**: a moment where the written procedure does not fully specify what to do, or where two competent experts might act differently. Timestamp each one. Record only what you can see, not what you infer.

A fork looks like one of these:

| Fork signal | What you log |
|---|---|
| They deviate from the stated SOP | The step skipped, added, or reordered |
| They act before the system tells them to | What they saw coming that the system had not flagged |
| They override or dismiss a signal the system raised | The alarm/alert ignored, and what they did instead |
| They pause, then choose | The hesitation and the branch taken |
| They do something "extra" not in any step | The unlisted action |
| Their pace changes | Where they slowed down or sped up |

If you logged zero forks, you either watched a demo (observer effect — see Gotchas) or the task has no judgment in it. Both are findings.

### Step 2 — Replay 20: "you did X there — why? always?"

Walk back through **your log**, not their memory. At each logged fork, ask the three-part probe, anchored to the specific observed moment:

1. Cue: "You did X at 14:12 — what did you notice that told you to?"
2. Rule: "Is that always the move, or does it depend on something?"
3. Exception: "When would you do the opposite?"

Never ask "how do you decide in general" — a generalisation is an opinion (0.1). Every question points at a thing you watched them do. If they answer with "experience", "gut", or "you just know", that is a non-cue; push for the perceptible thing (a sound, a rate-of-change, a number, a colour, a face).

### Step 3 — Edge-cases 10: the exceptions that break the rule

Spend the last 10 minutes where the rule flips. "Tell me about the last time the alarm was right and ignoring it would have been the wrong call — and the last time the alarm was wrong and you were right to override it." Chase the war stories: the near-miss, the time the rule failed, the thing they now check because it once bit them. A rule with no exception is just the SOP — the tacit judgment lives in the exception.

### Step 4 — Separate the two halves

Fill the capture. Left side: the explicit procedure (the steps they would write in a manual). Right side: the tacit judgment ledger. Then run the **strike-the-SOP test** — cross out every ledger row that is already in the written procedure. What survives is the capture's value. If nothing survives, you captured the manual and must go back to Step 3.

### Step 5 — Score each fork

For every surviving fork:

| Field | Bar it must clear |
|---|---|
| Observed? | Did you see it in watch-30 (behaviour 0.7) or only hear it in replay (verbal 0.3)? Mark it. |
| Cue | A perceptible thing, not "experience". If they cannot name it, re-probe or drop the row. |
| Exception | When the rule flips. A fork with no exception is probably a generalisation. |
| Basis | `[Fact]` if you observed it, `[Assumption]` if inherited, `[Hypothesis]` if described-but-unseen. |

A fork described in replay but never seen in the watch is `[Hypothesis]` until observed, no matter how confident the expert sounds. Behaviour beats narration.

### Step 6 — Name the load-bearing judgment

Pick the one fork that, if transferred, would move the most value — the call a new hire or an automation gets wrong today. State it as one line: "The product must encode **[when they do X instead of the SOP]**, cued by **[the cue]**, except **[the exception]**." That single row is the brief for whatever gets built. Everything else is context.

## Evidence standard

Watch beats words. An override you saw (behaviour, 0.7) outranks a rule they recited (verbal, 0.3), and both outrank a generalisation about how they "usually" work (opinion, 0.1). The full ladder still applies:

| Rung | Weight | What counts here |
|---|---|---|
| Money moved | 1.0 | cash or budget changed hands — rare in a shadow session |
| Behaviour observed | 0.7 | a fork you saw in watch-30: the override, the deviation, the unlisted action |
| Artefact shown | 0.5 | a thing they use in the task — the log, the cheat-sheet, the marked-up screen |
| Verbal commitment | 0.3 | a rule they recited in replay, anchored to a moment you watched |
| Opinion | 0.1 | a generalisation about how they "usually" work — "gut", "experience" |

The capture is done when the judgment ledger holds at least one fork you **observed**, each surviving fork has a perceptible cue and a named exception, and at least one row survives the strike-the-SOP test. Kill line: a capture that lists only the explicit procedure — every ledger row already in the manual, or the whole output a reformatted SOP — has failed, because it missed the judgment calls that are the entire point.

## Gotchas

- **The expert recites the manual.** Ask "why" and they narrate the SOP: "there's a procedure for that." The tacit fork hides behind it. Dig with the last-time move: "Tell me about the last time you did NOT follow the procedure," or "When do you and [colleague] disagree on this call?" The deviation is the data. If they insist they always follow it exactly, watch a longer shift or a busier one — the exception appears under load.
- **"Experience" and "gut" are non-answers.** They score 0.1. They mean the expert has not yet surfaced the cue, not that no cue exists. Keep pushing for the perceptible signal until they name something you could have seen or heard too. If they truly cannot, that fork stays `[Hypothesis]` and needs re-observation, not a made-up cue.
- **The replay answer can contradict the watch.** People tell a tidy story about how they decide that is not what they did. When the narration and the observation disagree, trust the watch and log the gap — the mismatch is often the most valuable finding.
- **Observer effect: they perform the SOP because you are there.** A watched expert follows the book. Counter it: watch long enough that they forget you, watch routine work rather than a set-piece, or use a recording of an ordinary shift. Zero forks in 30 minutes usually means you saw a performance.
- **Interrupting the watch.** A "why" during watch-30 converts a 0.7 behaviour into a 0.3 story and biases everything after it. Silence is the instrument. Save every question for replay.
- **Solution in disguise: "we just need documentation."** Writing an SOP captures the explicit half by definition — it cannot hold the forks. If the fellow frames the job as "write the docs", name the trap: documentation transfers the procedure, not the judgment. Reframe to the call being made badly today, then watch it.
- **A described session is not a watched one.** If the input hands you a scenario, a pre-watch brief, or a golden example instead of a task you actually observed, you have no watch-30 log. Never fabricate a filled observation log to match it. Mark every fork `[Hypothesis]`, and for each name the cue you would watch for to confirm it — the capture stays honest about what it has not yet seen.

## Examples

See `examples/sample.md` for a full run on a Mentix plant supervisor: 30 minutes of silent shadowing logs the moment they mute a vibration alarm and keep the line running, replay surfaces the cue (the alarm's rise rate, not its level) and the exception (they never override it within an hour of a bearing change), and the load-bearing judgment — when to trust the alarm versus the ear — becomes the one thing the copilot must encode.

## Related skills

- Uses `evidence-ladder` to weigh each fork (observed 0.7 vs recited 0.3); it does not replace it.
- Feeds `concept-council` and the probe skills: a captured judgment is often the load-bearing assumption a probe then tests at scale, and the "when they override" fork is exactly what a Mentix-style copilot must get right.
- Distinct from `yoda-data-sourcing`: that finds proprietary data a model cannot reach; this creates judgment data that exists nowhere until you observe it.
- Absorbs the bones of `interview-script` and `discovery-interview-prep` — Mom-Test discipline (past behaviour over hypotheticals, anchor to specific instances, never pitch) — but inverts the method: those ask a customer about a problem; this watches an expert do a task and treats the words as secondary to the behaviour. It supersedes neither; use them for problem discovery, use this for judgment capture.
