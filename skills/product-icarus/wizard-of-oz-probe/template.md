# Wizard-of-Oz Probe — setup + read-out

One-day window. Fill this in as you run. One output faked, 3–8 operators, one usage claim.

```
Progress:
- [ ] Claim written (would-they-use-it-if-it-worked only)
- [ ] Curtain designed (user sees vs wizard does; opaque)
- [ ] Fidelity contract set BEFORE running (latency + quality)
- [ ] 3–8 real operators recruited, real task, real stakes
- [ ] Run window logged per interaction (action recorded)
- [ ] Read-out written, including "does NOT prove" block
```

## 1. The claim
**Claim** `[Hypothesis]`: [e.g., "An ops manager would submit the auto-generated PO if it arrived within the hour."]
**Type check**: usage / would-they-act ☐
If the claim is about feasibility / cost / scale → STOP. Wrong probe. Return to `probe-matrix`.

## 2. The curtain

| The user sees (interface) | The wizard does (hidden) |
|---|---|
| [e.g., email to intake@… ] | [reads email, builds PO by hand, sends back] |

Opaque? The user cannot tell a human is behind it: yes ☐ no ☐ (if no, redesign)

**Safety caveat — what the wizard must NOT do.** If the faked output touches anything physical or hazardous (a live setpoint, a control loop, a gas or fire alarm, a dosing rate, a real spend), state the hard limits before running. The wizard delivers a recommendation, never an action on live equipment.

| The wizard must NOT | Because (the hazard) |
|---|---|
| [e.g., change a live setpoint / silence a real gas alarm / commit a real order] | [what goes wrong if it does] |

## 3. Fidelity contract — SET BEFORE RUNNING

| Contract term | Target | Actual (fill after) |
|---|---|---|
| Latency (match real system) | [e.g., ≤ 60 min] | |
| Quality band (match real system) | [e.g., "no worse than v1 parser"] | |

If the wizard beats these, discount the result — you tested a product you can't ship.

## 4. Operators (3–8)
| # | Role / segment | Real task on their data? | Real decision attached? |
|---|---|---|---|
| 1 | | yes ☐ no ☐ | |
| 2 | | yes ☐ no ☐ | |
| 3 | | yes ☐ no ☐ | |

Under 3 = anecdote. Over 8 in a day = contract breaks.

## 5. Run log — per interaction
| # | Task | Wizard min | Wizard errors | User ACTION (used / ignored / paid) |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

## 6. Read-out

**Usage:** [X] of [N] operators acted on the output. Money moved? [Y/N — who, how much]
**Evidence-ladder score:**
- Acted on output → **0.7 (behaviour observed)** `[Fact]`
- Paid / pre-paid → **1.0 (money moved)** `[Fact]`
- "Said they liked it" → **0.1 (opinion)** — do not upgrade

**Feasibility hypotheses (from wizard effort — NOT cost facts):**
- Wizard averaged [X] min/task `[Hypothesis]` → hand to `agent-concierge-probe` to get real cost-per-task.
- Hardest step for the wizard: [ ] `[Hypothesis]` → the likely automation bottleneck.

**What this does NOT prove** (mandatory — the WoZ lies about these):
- Feasibility — a human held it constant; we have not shown the system can do it.
- Unit cost — wizard minutes are not machine cost.
- Scale — a person cannot serve N× operators; this says nothing about throughput.

**Next probe** (from `probe-matrix`):
- Need real cost-per-task / automation frontier → `agent-concierge-probe`.
- Need willingness to pay with the founder doing the full real workflow → `concierge-probe`.
