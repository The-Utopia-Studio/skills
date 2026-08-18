---
name: concierge-probe
description: Runbook for delivering a product outcome by hand, as the founder, to ONE real customer — to test willingness to pay and the real workflow including the exceptions that break automation. Fires on "do it by hand first", "concierge test", "concierge MVP", "deliver it manually", "founder-delivered version before we automate". Output: a concierge log plus a willingness-to-pay signal scored on the evidence ladder (money charged 1.0 beats a verbal yes 0.3). Not probe-matrix (that picks which probe); not agent-concierge-probe (an agent, not the founder, runs the task, and it measures cost not WTP); not wizard-of-oz-probe (fakes the interface to test would-they-use-it, not whether they pay).
type: generator
supersedes: none
---

# Concierge Probe

## What it does
You deliver the outcome by hand — no product, no automation — to one paying customer, and log what really happens. It forces two facts a demo cannot give you: whether the customer will actually pay, and what the real workflow is once the exceptions show up. Output is a concierge log plus one willingness-to-pay (WTP) score on the evidence ladder. It compresses the "should we build this" decision into "did someone pay for the hand-made version, and what broke."

## The Icarus reframe
A generic concierge MVP asks "can we deliver value manually?" and stops at a warm quote. This runbook makes the price the experiment: you set the number and the payment mechanism *before* you deliver, so the result lands on the evidence ladder as money moved (1.0) or it does not. And it treats the exceptions as the deliverable — the permit that was missing, the night-shift gap, the customer who wanted it in a different format — because those are the parts that will break the automation you were about to write. The probe is honest about WTP and the real workflow. It lies about scale and self-serve UX, and it says so in every read-out.

## When to use / When NOT
Use it when you know the outcome a customer wants and you can produce it by hand for one of them, and you need to learn whether they pay and what the workflow really is.

Do not use it when:
- You have not decided which probe to run — that is `probe-matrix` (the router).
- You want an agent, not yourself, to run the task and price it — that is `agent-concierge-probe`.
- You want to test whether people would use a slick interface if it worked, without doing the work by hand — that is `wizard-of-oz-probe` (it fakes the interface; it lies about unit cost and WTP).
- You are still scoring whether the problem is worth solving at all — that is a problem-scoring skill, not a probe.

## Method
Follow the runbook. Fill `template.md` as you go.

**Step 1 — Scope to one.** One customer, one outcome, one definition of done.

| Field | Fill |
|---|---|
| Customer (named, real) | |
| Outcome they get | |
| "Done" they will accept | |
| Price + mechanism, set now | |

If you cannot name the customer or the price, stop. You are not ready to probe.

**Step 2 — Set the price before you deliver.** Decide the number and how money moves (invoice, Stripe link, PO) *now*. You cannot reach 1.0 on the ladder unless money actually clears. Charging is the test; asking "would you pay?" is not.

**Step 3 — Deliver by hand, log everything.** In the concierge log, record each step: minutes spent, who touched it, and every exception — anything that was not in the happy path. The exceptions column is the point of the run. Rule: run until you hit **at least 3 distinct exceptions** or the customer accepts/declines, whichever comes first. One clean happy-path delivery is a demo, not a concierge run.

**Step 4 — Score WTP on the evidence ladder.** Score the strongest signal that actually happened, not the one you hoped for.

| Signal you actually got | Rung | Score |
|---|---|---|
| Invoice paid / charge cleared | money moved | 1.0 |
| Customer used the delivered outcome in their real work | behaviour | 0.7 |
| Signed LOI / PO / written commitment | artefact | 0.5 |
| "Yes, I'd pay for that" | verbal | 0.3 |
| "Sounds useful" | opinion | 0.1 |

A verbal yes is 0.3 even when enthusiastic. Money is 1.0 only when it clears, not when it is promised. Scoring a verbal yes as paid WTP is the kill line.

**Step 5 — Read out against the honesty contract.**

| Honest about | Must NOT claim |
|---|---|
| WTP, at the rung you actually reached | Scale — n=1 by hand says nothing about 100 |
| The real workflow, including the exceptions | Self-serve UX — you were the interface |

Decision bands: **≥0.7** (paid or used) = real pull, move to the next probe question (cost/feasibility → `agent-concierge-probe`; scale still unproven). **0.3–0.5** = soft; do not build; re-run with money on the line. **≤0.1** = kill or reframe.

## Evidence standard
Done means: one named customer, one delivered outcome, a completed concierge log with the exceptions column populated, and a single WTP score with the signal that earned it. Behaviour and money outrank opinion — a paid invoice [Fact] beats a warm "we'd love this" [Opinion, 0.1] every time. Tag every claim in the read-out `[Fact]`, `[Assumption]`, or `[Hypothesis]`. The workflow you logged is `[Fact]`; that it generalises to other customers is `[Hypothesis]`, and this probe does not test it.

## Gotchas
- **Hiding behind a fake UI.** If you do the work by hand but *hide* the human — the customer thinks they are using a finished product — that is a Wizard-of-Oz probe, not concierge. Concierge is overt: the customer knows the founder is delivering it by hand. The moment you fake the interface you are testing would-they-use-it, not will-they-pay; route to `wizard-of-oz-probe`.
- **Smuggling in a pre-chosen solution.** "Let's run a concierge test of the dashboard" tests a feature you already decided to build, not whether the customer's outcome is worth paying for. Reframe to the outcome being delivered — what the customer actually wants done — and hand-deliver *that*. If the probe is scoped to your feature rather than their outcome, you are validating the build, not the demand.
- **Free pilots.** If you waive the fee "to get started," you have converted a 1.0 test into a 0.1 opinion. No price, no WTP signal.
- **You solve the exceptions silently.** The founder patches the missing permit in their head and never logs it. Then automation ships without that path and dies. Log the patch even when it took two minutes.
- **Concluding scale.** "The operator loved it, so 100 operators will pay" is the kill line. One hand-made delivery cannot support a scale or self-serve claim. Say what it can support and stop.
- **Counting your own enthusiasm as demand.** You enjoyed delivering it; that is not the customer paying. Only the ladder score counts.

## Examples
See `examples/sample.md` — Barrier Intelligence hand-delivers a morning gas-safety alert to one rig operator, charges per site, and scores WTP on the ladder while logging the permit and night-shift exceptions that would have broken the automated version.

## Related skills
- `../probe-matrix` — the router that sends you here; run it first if you are unsure this is the right probe.
- `../agent-concierge-probe` — the next probe once WTP is real: hand the workflow you logged to an agent and price it.
- `../wizard-of-oz-probe` — use instead when the question is "would they use it if it worked," not "will they pay."
- `../../02-customer-discovery/evidence-ladder` — owns the rungs this skill scores against.
- Supersedes nothing. It absorbs the concierge idea from generic pretotyping and beats it by making the price the experiment and the exceptions the deliverable.
