---
name: wizard-of-oz-probe
description: Fires when a fellow wants a human to run the machine behind the curtain for a day to test usage — "fake the backend", "wizard of oz", "woz test", "human behind the curtain", "have a person answer the requests and see if they act on it". Output is a WoZ setup plus a result read-out that reports usage behaviour and an explicit "what this does NOT prove" section for feasibility, unit cost, and scale. NOT for choosing which probe to run (that is `probe-matrix`), NOT for testing whether a workflow reads on paper (that is `paper-sketch-probe`), and NOT for finding real cost-per-task (that is `agent-concierge-probe`).
type: generator
supersedes: none
---
# Wizard-of-Oz Probe

## What it does
Compresses a "would they actually use this if it worked" question into a one-day test. A human sits behind an opaque interface and delivers the output the real system would, at the same speed and quality the real system would hit. You put a real task with real stakes in front of 3–8 operators and log what they do with the output. The output is the WoZ setup plus a read-out that reports usage behaviour and refuses to report feasibility, unit cost, or scale — because the human held all three constant on purpose.

## The Icarus reframe
A generic WoZ "tests whether users accept an automated experience." This probe does one exact thing: it isolates the usage variable by removing feasibility. A human guarantees the output is right, so the only thing left to observe is whether people use it. That is precisely why the probe lies about feasibility, unit cost, and scale — you deleted those variables to get a clean read on usage. Two disciplines make it honest. First, a fidelity contract: the wizard must match the real system's latency and quality band, or you are testing a better product than you can ship. Second, the wizard's own effort per task is logged as a feasibility hypothesis to hand to the next probe, never as a cost fact.

## When to use / When NOT
Use it when the claim is "would they use it if it worked," and you can fake the output convincingly for a day.

| Use when the claim is | Do NOT use — route to |
|---|---|
| "Would they use the output if it arrived reliably" | — |
| "Would they act on / return for / pay for the output" | — |
| "Can an operator follow the workflow on the screens" | `paper-sketch-probe` |
| "What is our real cost per task" | `agent-concierge-probe` (honest to the cent) |
| "Can we technically build the model" | a spike, not a probe — WoZ assumes it works |
| "Which probe answers my question at all" | `probe-matrix` |

This is not `probe-matrix` — that picks the probe. This runs one specific probe once the choice is made.

## Method
One-day window. Fill in `template.md` as you run.

1. **Write the one claim.** Frame it as "would [operator] use [output] if it worked reliably," tagged `[Hypothesis]`. If the claim contains feasibility, cost, or scale, stop — WoZ lies about those. Return to `probe-matrix`. If the input is too vague to name the operator, the output, or the decision, ask the ONE unblocking question first — *what output would arrive, to whom, and what decision hangs on it?* — and stop until you have it. Do not invent an operator or a task to proceed.
2. **Design the curtain.** Split what the user sees (the thinnest interface: an email address, a form, a Slack DM, a single frame) from what the wizard does. The user must not be able to tell a human is behind it.
3. **Set the fidelity contract — before running.** Decide the two numbers the wizard must hold:

   | Contract term | Set to | Why |
   |---|---|---|
   | Latency target | The window the real system would answer in | A superhuman-fast wizard tests a product you cannot ship |
   | Quality band | The quality the real system would realistically hit | A superhuman-good wizard inflates usage |
4. **Recruit real operators, 3–8, target segment.** Give each a real task on their own data with a real decision attached.

   | Operators | Reading |
   |---|---|
   | Under 3 | Anecdote, not signal |
   | 3–8 | Right size for one day |
   | Over 8 in a day | The wizard cannot hold the fidelity contract |
5. **Run the window. Log every interaction:** task, wizard minutes, wizard errors, and the user's ACTION (used the output / ignored it / paid).
6. **Write the read-out.** Usage behaviour with its ladder score, the feasibility hypotheses the wizard's effort generated, and the mandatory "what this does NOT prove" block for feasibility, cost, and scale.

## Evidence standard
On the ladder — money moved 1.0, behaviour observed 0.7, artefact shown 0.5, verbal commitment 0.3, opinion 0.1 — a WoZ earns behaviour (0.7) when the operator acts on the output, and money (1.0) when you put a real charge behind the curtain and they pay. It is honest about would-they-use-it-if-it-worked. It cannot earn a feasibility or unit-cost number: the human holds those constant, so any cost or feasibility figure from a WoZ run is fabricated. Wizard minutes-per-task are logged as a `[Hypothesis]` for the next probe, not as a cost `[Fact]`. Done means you can state whether they used it, with the action logged, and you have written the "does not prove" section. "They said they loved it" stays at 0.1.

## Gotchas
- The superhuman wizard. The human answers faster and cleaner than any real system could, usage looks great, and it collapses at launch. Hold the latency and quality contract you set in step 3.
- Reading wizard minutes as unit cost. A person is not the machine. That number is a feasibility hypothesis for `agent-concierge-probe`, not a cost you can price against.
- No real stakes. A hypothetical task drops you back to opinion (0.1). Use the operator's real data and a real decision.
- Testing feasibility by accident. If you catch yourself asking "can we even do this," that is a spike, not a WoZ. WoZ assumes it works.
- A leaky curtain. The moment the operator senses a human, they perform for you. Keep it opaque during the run; debrief only after.

Kill line (auto-fail): the read-out claims the WoZ proved feasibility, unit economics, or that it will scale.

## Examples
[examples/sample.md](examples/sample.md) — Durian Labs runs a one-day WoZ of its vendor-email-to-purchase-order workflow; four of six operators act on the hand-made PO and one pre-pays, while the "7 minutes per PO" figure is held as a feasibility hypothesis, not a cost.

## Related skills
- `probe-matrix` — the router that should have sent you here; go back if your claim is about cost, feasibility, or legibility.
- `paper-sketch-probe` — the cheaper rung below when the claim is whether the workflow reads.
- `agent-concierge-probe` — the next rung up; hand it the wizard's effort log to get real cost-per-task.
- `concierge-probe` — when the founder must do the real workflow by hand, exceptions and all, to learn willingness to pay.
- `evidence-ladder` — the scoring ladder this read-out uses.
Supersedes nothing. It absorbs the WoZ rung of `skills/discovery/prototyping-pretotyping` and sharpens it: that skill tests "user perception"; this one isolates usage by holding feasibility constant, and names cost and scale as lies rather than results. It **narrows** that one rung — `probe-matrix` is what supersedes `prototyping-pretotyping`, so this skill's `supersedes: none` is correct.
