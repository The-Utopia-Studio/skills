# Trace-Interview Log

Read production traces as interviews that already happened. One card per **behaviour pattern**, not per event. Every card must recover a **discovery question** — a card with a number but no question is an auto-fail. Keep two rungs separate: what the user *did* (behaviour, ≥ 0.7) and what you think it *means* (inference, ≤ 0.3 until a probe lands).

## Set definition (state and date it)
- **One trace =** [one session / one task attempt / one agent run / one document produced]
- **Window:** [from → to]  ·  **Volume:** [N traces, M distinct users]  `[Fact]`
- **Source of traces:** [event log / agent run archive / product analytics export]  `[Fact]`
- **Active segment size (for weighting):** [M distinct users active in window — state the number; if the input does not give it, write **"active segment unknown"** and do not compute a %]  `[Fact]`

---

## Decoder reference (map the signature before writing the card)

| Trace signature | What the user is saying `[Hypothesis]` | Discovery question |
|---|---|---|
| Retry / re-run same input, reworded | "that wasn't what I meant" | Where does the product misread intent? |
| Edit-before-accept (measure tweak-time) | "close, but wrong *here*" | Which part of the output is not trusted? |
| Accept unedited | trust — **or** stopped checking (ambiguous) | Where did we earn trust — or lose attention? |
| Abandon mid-flow | "you lost me here" | Where is the drop cliff? |
| Export then leave | "I'll finish this elsewhere" | What job do we not finish? |
| Paste into another tool | "doesn't fit my next step" | What is the seam to the adjacent job? |
| Override a default repeatedly | "your default is wrong for me" | Which assumption is miscalibrated? |
| Long dwell then no action | stuck — **or** reading (ambiguous) | needs a probe before it counts |

---

## Interview cards (repeat the block per pattern)

### Card [n] — [short name of the pattern]

| Field | Fill |
|---|---|
| **Observed behaviour** (what the trace literally shows) | [e.g. "re-ran the same permit check 3×, rewording inputs, before it passed"]  `[Fact]` |
| **Behaviour rung** | 0.7 behaviour / 1.0 if the trace is a spend event |
| **Distinct users producing it** | [N of M active = __%] → anecdote (1) / candidate (2–4 or <5%) / pattern (≥5 and ≥~15%) |
| **Discovery question it answers** | [the recovered question — this is the finding] |
| **Inferred JTBD / desired outcome** | [the job behind the behaviour]  `[Hypothesis]` |
| **Satisfaction signal the trace implies** | [dissatisfied / partially served / served — and on which sub-job] |
| **The other honest reading (if ambiguous)** | [second interpretation, or "none — behaviour is unambiguous"] |
| **Confirm-the-why probe** | [smallest observation that moves the why from `[Hypothesis]` toward 0.7 — inject a known error / watch 3 sessions / interview 5 who did it] → hand to `probe-matrix` |
| **Interview it replaced** | scheduled version ≈ [recruit + incentive + 45-min session + synthesis, ~£__ + ~[1–2] wk lead], returns verbal 0.3 · this trace: already happened, 0.7, cost = triage minutes |
| **Proposed tree edit** | [new opportunity / new solution / raise-lower a rung / kill a node] → route to `continuous-discovery-engine` feed 2 |

_(duplicate the card block for each pattern)_

---

## Roll-up

| Card | Pattern | Distinct users | Behaviour rung | Why-rung (now) | Routed as | Probe named? |
|---|---|---|---|---|---|---|
| 1 |  |  | 0.7 |  | feed-2 signal |  |
| 2 |  |  |  |  |  |  |
| … |  |  |  |  |  |  |

- **Cards that are findings (pattern-strength met, question recovered):** ____
- **Cards held as candidates (N too low or why unconfirmed):** ____ → probes queued
- **Anecdotes named and parked (N=1):** ____
- **Total scheduled-interview cost these traces replaced:** ≈ £____ and ~__ weeks of lead time — the flywheel number.

## Self-check before handing off
- [ ] Every card recovers a discovery question, not just a metric.
- [ ] Behaviour rung and why-rung are separate on every card; no interpretation stamped at 0.7.
- [ ] Every ambiguous signature names both readings and a probe.
- [ ] Every card states distinct-user count; no N=1 promoted to a finding.
- [ ] Active-segment denominator is stated, or explicitly flagged "unknown" — no % computed on a missing denominator.
- [ ] Each finding routed to `continuous-discovery-engine`; each unconfirmed why routed to `probe-matrix`.
- [ ] Nothing invented — no pattern claimed that the pasted traces do not show.
