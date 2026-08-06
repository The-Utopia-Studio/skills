# Continuous Discovery Engine — Living Opportunity Tree + Feed Loop

Fill top to bottom. One measurable outcome. Every node stamped with feed + rung + date. Three feeds wired or honestly marked dark. One named synthesis owner. One cadence. One demonstrated loop turn. Tag every claim `[Fact]` / `[Assumption]` / `[Hypothesis]`.

---

## 0. Outcome

| Field | Fill |
|---|---|
| Outcome metric | [one measurable metric — not "improve UX"] |
| Baseline (today) | [number + [Fact]/[Assumption]] |
| Target | [number + by when] |

> If the outcome has no number, stop here and ask for it.

---

## 1. Feed inventory (be honest about what is dark)

| Feed | Live / dark | Native evidence rung | If dark, why |
|---|---|---|---|
| Customer interviews | | verbal 0.3 → behaviour 0.7 if watched | |
| Production traces | | behaviour 0.7 (money 1.0 if a spend event) | [not shipped?] |
| Eval telemetry | | quality signal | [no evals wired?] |

**Feeds live:** [count]. **Evidence ceiling until more feeds go live:** [highest live rung].
**If only one feed is live:** thinnest slice to ship that lights up the others → [what to ship]. Do not fabricate a trace or eval to fill a dark feed.

---

## 2. Feed wiring (per live feed)

| Feed | What it contributes | Cadence | Synthesis owner (a name) |
|---|---|---|---|
| Interviews | new opportunities, the "why", judgment calls | [e.g. 3/week] | |
| Production traces | where users struggle, retry, drop, work around, export | [continuous, triaged weekly] | |
| Eval telemetry | where product quality fails before a complaint | [per-release + on-alert] | |

---

## 3. The tree (stamp every node: [feed] [rung] [date])

```
Outcome: [metric]
  └─ Opportunity A  [feed] [rung] [date]
       ├─ Solution A1  [feed] [rung] [date]
       │    └─ Test → probe-matrix: [which probe]
       ├─ Solution A2  [feed] [rung] [date]
       └─ Solution A3  [feed] [rung] [date]
  └─ Opportunity B  [feed] [rung] [date]
       ├─ Solution B1 ...
       └─ Solution B2 ...
```

Un-provenanced nodes (no feed, no rung): [list — these are beliefs, tag [Hypothesis], schedule to test or prune].

---

## 4. Evidence-weighted POC ranking

`Raw = F + I + R` (max 15). `Rung` = evidence rung of the parent opportunity. **`Weighted = Raw × Rung`.** Rank on Weighted.

| Solution | F (1–5) | I (1–5) | R (1–5) | Raw | Parent rung | Weighted | Rank |
|---|---|---|---|---|---|---|---|
| [A1] | | | | | | | |
| [A2] | | | | | | | |
| [B1] | | | | | | | |

- **Feasibility:** 1 = months, 5 = days.
- **Impact:** 1 = barely moves the outcome, 5 = major shift.
- **Reach:** 1 = a handful of the segment, 5 = most of it.
- **Rung:** 0.1 opinion / 0.3 verbal / 0.5 artefact / 0.7 behaviour / 1.0 money.

**Selected POC:** [highest Weighted]. **Why it beat the runner-up:** [rung did the work, or raw did].

---

## 5. Synthesis cadence (the loop — machine surfaces, human decides)

| Field | Fill |
|---|---|
| Cadence | [e.g. weekly, Thursday] |
| Named synthesis owner | [a person] |
| Where signal lands | [interviews / traces / eval drop location] |
| Decision at synthesis | promote / park / discard each candidate — human, never auto |
| Stale rule | any node untouched by any feed for [N=2] cycles → flag → re-probe or prune |
| Change-log location | [where "what changed and why" is written each cycle] |

---

## 6. One demonstrated loop turn

| Field | Fill |
|---|---|
| Signal | [one real signal from a live feed] |
| Feed + rung | [which feed, what rung] |
| Distinct users / N | [how many distinct users produced it — one loud trace ≠ a finding; a 0.7 from one user is weaker than a 0.3 across forty] |
| Node it lands on | [opportunity / solution] |
| Tree action | [new node / raise rung / lower rung / kill] |
| Solution promoted or killed | [name it] |
| POC re-picked? | [yes → new POC / no] |
| Logged | [one line for the change-log] |

> Pre-launch, interviews are the only live feed: a loop turn can be interview → interview at 0.3. That is a real loop (low-rung, but running), not a missing one — do not leave section 6 blank for want of a trace.

---

## 7. One-line handoff

> Tree live on [outcome], fed by [N] feeds, [owner] owns synthesis every [cadence]. Current POC: [solution]. Next loop turn: [date].
