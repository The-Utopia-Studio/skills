# Concierge Probe — log + WTP score

Fill this during the run, not after. The exceptions column is the deliverable.

## 0. Scope (set before you start)

| Field | Value |
|---|---|
| Customer (named, real) | |
| Outcome they get | |
| "Done" they will accept | |
| Price | |
| Payment mechanism (invoice / Stripe / PO) | |
| Date price was set (must be before delivery) | |

## 1. Concierge log

One row per step. Log exceptions even when you fixed them in your head.

| # | Step (by hand) | Minutes | Who touched it | Exception (anything off the happy path) |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| … | | | | |

Total founder minutes: __
Distinct exceptions logged: __  (run until ≥3, or the customer decides)

## 2. WTP score

Score the strongest signal that actually happened.

| Signal you actually got | Rung | Score | Got it? |
|---|---|---|---|
| Invoice paid / charge cleared | money moved | 1.0 | |
| Customer used the delivered outcome in real work | behaviour | 0.7 | |
| Signed LOI / PO / written commitment | artefact | 0.5 | |
| "Yes, I'd pay for that" | verbal | 0.3 | |
| "Sounds useful" | opinion | 0.1 | |

WTP score: __  (single number = the highest rung that actually happened)
Evidence for that rung: __  (invoice #, the thing they did, the words they said)

## 3. Read-out (honesty contract)

**Honest about — state these:**
- WTP: [Fact] we reached rung __ because __
- Real workflow: [Fact] the exceptions that would break automation are __

**Must NOT claim — leave these out or tag as untested:**
- Scale: [Hypothesis, not tested] n=1 by hand says nothing about many.
- Self-serve UX: [Hypothesis, not tested] the founder was the interface.

## 4. Decision

| WTP score | Band | Next move |
|---|---|---|
| ≥0.7 | real pull | proceed to cost/feasibility probe (`agent-concierge-probe`); scale still unproven |
| 0.3–0.5 | soft | do not build; re-run with money on the line |
| ≤0.1 | none | kill or reframe |

Decision: __
What would move the WTP score up one rung: __
