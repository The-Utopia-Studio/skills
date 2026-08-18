# Probe Selection + Plan — Barrier Intelligence (worked)

**Fellow / venture:** Barrier Intelligence (oil & gas safety)
**Date:** 2026-07-20

> All numbers here are synthetic, domain-plausible test fixtures — not real client
> data. They show the mechanic, not a finding.

**Fellow's ask:** "What's the cheapest way to test whether operators trust the gas
alert? I was going to mock up the alert screen on paper and walk three operators
through it."

## Step 1 — The ONE question

**The question:** Will control-room operators trust the gas-leak alert enough to
act on it during a live shift?

**Why this one first:** `[Assumption]` If operators do not act on the alert, every
downstream claim (accuracy, coverage, pricing) is moot. Probability-wrong is high
(alerting tools get ignored) and cost-if-wrong is a shipped product nobody uses.
This is the riskiest unknown.

**Is it a solution-in-disguise?** No — it names an unknown (trust/adoption), not a
feature to validate.

## Step 2 — Learning target

Target **E — Trust & adoption.** Trust is not comprehension and not demand; it is
behaviour under real stakes, over time. Rung the answer needs: behaviour (0.7).

**Current rung of the claim today:** opinion (0.1) — `[Assumption]` the fellow
believes operators will trust it; no operator has yet acted on a real alert.

## Step 3 — Kill check

**Proposed probe:** paper mock-up of the alert screen, walk operators through it.

| Question | Answer |
|---|---|
| Does paper appear in the "lies about" column for target E? | **Yes → KILL** |
| What exactly does it lie about here? | Trust. A paper walkthrough has no stakes: nothing happens if the operator ignores the mock alert, so any "yes, I'd trust this" is a verbal reaction (0.3), not trust behaviour (0.7). Paper tops out at a comprehension read. |
| Rung it tops out at vs rung the question needs | 0.5 (comprehension) / 0.3 (verbal) vs 0.7 (behaviour under stakes) |

**Kill verdict:** The paper probe is killed. It would answer "can an operator read
the screen," which is a real question (target A) but not the one asked. Walking
three operators through a mock and hearing "yeah, I'd trust that" would produce a
false green light on trust.

## Step 4 — Chosen probe

**Probe:** concierge (founder stands behind the alert on a live shift), scaling to
a field pilot if it holds.

**Why it is honest about THIS question:** In a concierge run the founder pushes a
real gas-indicator alert to the operator during an actual 12-hour shift and the
operator either acts on it or does not — real stakes, observed behaviour (0.7),
which is the rung trust needs. Nothing else in the four probes reaches it: paper and
Wizard-of-Oz both simulate the stakes away, and agent-concierge puts a human buffer
between the alert and the operator, hiding adoption.

**What it will STILL lie about (mandatory):** scale and self-serve UX. With the
founder hand-delivering alerts to one operator, this says nothing about whether the
system works unattended across a fleet, or whether operators would trust an alert
with no human behind it. Those are later, separate questions.

**Cost + timebox:** founder time — sit shifts alongside one operator for 5 shifts.

## Step 5 — Pre-registered pass/fail read-out

| | |
|---|---|
| **Metric (behaviour):** | Operator acts on the alert (acknowledges + checks the flagged permit/sensor) within 10 minutes, unprompted by the founder |
| **Pass threshold:** | Acts on ≥ 8 of the last 10 real alerts across the 5 shifts |
| **Fail threshold:** | Acts on ≤ 4 of 10, or only acts when the founder points at the screen |
| **Sample / timebox:** | 1 operator, 5 live shifts, ~10 real alerts |
| **A pass moves the claim to rung:** | behaviour observed (0.7) `[Fact]` — from opinion (0.1) today |

Set before the first shift. If the operator acts only when nudged, that is a fail
even if they say they trust it — the words are 0.3, the goalpost is 0.7.

## Step 6 — Route to runbook

**Hand off to:** `concierge-probe` for the how-to (how the founder shadows the
shift, delivers alerts without leading the operator, and logs the act/ignore
behaviour without contaminating it).

**One honest caveat carried forward:** a concierge pass proves operators trust *an
alert a founder stands behind*. Trust in an unattended system is target E again, at
the field-pilot stage — do not let this read-out claim it.
