# Worked example — Azraq (post-launch data-centre risk product)

**Fellow input:** "We shipped the Azraq risk product to four data-centre operators three months ago. Set up continuous discovery so we keep learning instead of guessing. Here's what we have: interviews with two ops leads, usage logs from the product, and the risk model's eval dashboard."

All numbers below are illustrative test-fixture values, tagged. Nothing here is real client data.

---

## 0. Outcome

| Field | Fill |
|---|---|
| Outcome metric | Seat renewal rate at first 12-month term |
| Baseline (today) | 3 of 4 pilot operators signalled intent to renew `[Assumption]` — not yet contractual |
| Target | 4 of 4 renew + 1 expand to a second site by Q2 |

---

## 1. Feed inventory

| Feed | Live / dark | Native evidence rung | If dark, why |
|---|---|---|---|
| Customer interviews | live | verbal 0.3 → 0.7 if watched | — |
| Production traces | live | behaviour 0.7 | — |
| Eval telemetry | live | quality signal | — |

**Feeds live:** 3. **Evidence ceiling:** 0.7 (behaviour, from traces). This is a post-launch tree — its whole advantage over a pre-launch interview-only tree is that traces sit at 0.7 for free.

---

## 2. Feed wiring

| Feed | What it contributes | Cadence | Synthesis owner |
|---|---|---|---|
| Interviews | why operators trust or ignore alerts; the judgment calls behind a dismiss | 2 rolling / week | Dana (fellow) |
| Production traces | which reports open, which alerts get acted on vs. dismissed, what gets exported | continuous, triaged Thursday | Dana + Priya (eng) |
| Eval telemetry | risk-model precision/recall, false-alert rate, cost per report | per-release + on-alert | Dana + Sam (eval owner) |

---

## 3. The tree (before this week's loop turn)

```
Outcome: seat renewal 3/4 → 4/4 + 1 expand
  └─ Opportunity A: operators can't tell which alerts are worth acting on   [interviews] [0.3] [wk 6]
       ├─ Solution A1: add more cooling-anomaly alert types                 [interviews] [0.3] [wk 6]
       ├─ Solution A2: confidence score on every alert                       [interviews] [0.3] [wk 8]
       └─ Solution A3: one-tap "why did you dismiss this?" capture           [traces]     [0.7] [wk 10]
  └─ Opportunity B: risk reports don't survive the operator's own tooling   [traces]     [0.7] [wk 9]
       ├─ Solution B1: native export to the operator's incident system       [traces]     [0.7] [wk 9]
       └─ Solution B2: power-feed deep-dive report                           [interviews] [0.3] [wk 7]
```

Un-provenanced nodes: none this cycle.

---

## 4. Evidence-weighted POC ranking (before the loop turn)

| Solution | F | I | R | Raw | Parent rung | Weighted | Rank |
|---|---|---|---|---|---|---|---|
| A1 more cooling alert types | 4 | 3 | 3 | 10 | 0.3 | 3.0 | 3 |
| A2 confidence score | 3 | 4 | 4 | 11 | 0.3 | 3.3 | 2 |
| B1 native export | 3 | 4 | 4 | 11 | 0.7 | 7.7 | 1 |
| B2 power-feed deep-dive | 4 | 3 | 3 | 10 | 0.3 | 3.0 | 4 |

**Selected POC (before):** B1 native export — a trace-backed opportunity (0.7) lifts a middling raw score above the interview-only ideas. Launch already did the ranking work.

---

## 5. Synthesis cadence

| Field | Fill |
|---|---|
| Cadence | Weekly, Thursday 30 min |
| Named synthesis owner | Dana |
| Where signal lands | interviews in the notes doc; traces in the Thursday trace triage; eval in the release dashboard |
| Decision at synthesis | Dana promotes / parks / discards each candidate — no auto-edits |
| Stale rule | node untouched by any feed for 2 cycles → flag → re-probe or prune |
| Change-log location | tree change-log, one line per accepted edit |

---

## 6. One demonstrated loop turn (this Thursday)

| Field | Fill |
|---|---|
| Signal | Across 3 operators, cooling-anomaly alerts are dismissed in under 5 seconds 80% of the time `[Fact — trace]`; power-feed alerts are opened 100% of the time and exported in 60% `[Fact — trace]`. Eval confirms cooling false-alert rate at 34% `[Fact — eval]`. One ops lead in interview: "cooling alerts cry wolf, power-feed is the one I actually can't afford to miss" `[Fact — verbal]`. |
| Feed + rung | traces (0.7) + eval (quality) + one interview (0.3), converging |
| Node it lands on | Opportunity A and Solution A1 |
| Tree action | Kill A1 (more cooling alerts) — traces show operators already ignore the cooling alerts they have. Raise Opportunity A's rung to 0.7 (now trace-backed, not just interview). Promote B2 (power-feed deep-dive) with a new trace stamp because the export behaviour and the interview both point at power-feed. |
| Solution promoted or killed | **Killed:** A1. **Promoted:** B2 (re-stamped [traces][0.7][this wk]). |
| POC re-picked? | Re-rank below. |
| Logged | "wk 12: killed A1 (cooling alerts dismissed 80% <5s); promoted B2 power-feed to 0.7 on export behaviour + interview." |

### Re-ranked after the turn

| Solution | F | I | R | Raw | Parent rung | Weighted | Rank |
|---|---|---|---|---|---|---|---|
| B1 native export | 3 | 4 | 4 | 11 | 0.7 | 7.7 | 1 |
| B2 power-feed deep-dive | 4 | 4 | 4 | 12 | 0.7 | 8.4 | **new #1** |
| A2 confidence score | 3 | 4 | 4 | 11 | 0.3 | 3.3 | 3 |
| A1 more cooling alert types | — | — | — | — | — | killed | — |

**Selected POC (after):** B2 power-feed deep-dive — the trace turn moved its parent to 0.7 and its raw ticked up as the interview clarified reach, overtaking B1. The confidence-score idea (A2) stays parked at 0.3 until a feed touches it; if two cycles pass untouched, the stale rule flags it.

---

## 7. One-line handoff

> Tree live on renewal, fed by 3 feeds, Dana owns synthesis every Thursday. Current POC: B2 power-feed deep-dive. Next loop turn: next Thursday — watch whether killing cooling alerts changes dismiss behaviour on the alerts that remain.

---

## Why this beats a static OST

A static tree drawn at week 6 would still list "add more cooling-anomaly alerts" as a live solution, because interviews at 0.3 said operators wanted clarity. The loop killed it with a 0.7 trace three months later — for free, because Azraq had shipped. The static tree would have shipped the wrong feature; the engine let the product's own behaviour retire it.
