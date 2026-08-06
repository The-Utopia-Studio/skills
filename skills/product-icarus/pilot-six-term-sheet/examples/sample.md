# Worked example — Mentix's first paid pilot

Mentix builds an AI copilot for factory managers. Their first target workflow is shift-start downtime triage: at the start of every shift, a line manager has to work out why the line stopped overnight and what to fix first. This is a test fixture: numbers are illustrative, not real client data.

## Input the fellow brought

"A plant loved the demo and wants to try the copilot on their bottleneck line. I want to run a free 8-week POC to earn the reference, then we'll figure out pricing once we've proven the value. How do I write this up?"

Stated facts:
- Named customer: one mid-size auto-parts plant. [Fact]
- One workflow: shift-start downtime triage on Line 3 (their bottleneck). [Fact]
- Signal so far: they loved the demo. [Fact — but this is opinion-grade, 0.1]
- The plant runs on an MES that timestamps every line stop and shift handover. [Fact]

## The challenge, before the sheet

Two things are wrong with the input, and they are the exact two terms fellows skip:

- **"Free POC."** A free pilot selects for a buyer who never had budget. "Loved the demo" is a 0.1 opinion; running it free proves nothing above 0.3. The pilot exists to move this to money-moved 1.0. Price it.
- **"Figure out pricing later."** Deferred conversion converts nothing. The plant that will buy will price production now, because that price is how the plant manager justifies the spend to finance. Deferral is the answer, not a step.

Everything else is fillable. Here is the sheet after the upgrade.

## Six-term sheet

### 1. Scope
- One workflow: shift-start downtime triage on **Line 3 only**, three shifts/day.
- OUT of scope: all other lines, maintenance scheduling, ERP/CMMS writeback, quality inspection.
- Window: 8 weeks, hard end date fixed at signing.

### 2. Price (paid or prepaid)
- **$24,000 prepaid** for the 8-week window, invoiced and collected before kickoff. [Assumption until the invoice clears; becomes Fact on collection]
- Ladder: money moved **1.0** on collection. Clears term 2.
- (First draft was $0. The upgrade is the difference between a favour and a pilot.)

### 3. Data-rights clause
- Workflow exhaust: the copilot's downtime-cause labels **plus the line manager's corrections** to them each shift. This is the compounding asset — every correction sharpens the model on this plant's failure modes.
- Compounds with use: yes — correction volume rises with shifts run.
- Signed at pilot #1: **yes**. Clause language routed to `data-rights-clause` (section 06); not drafted here.
- Counsel flag: if the plant is a GCC-based or government-linked operator, data residency and government-entity data handling may bind — mark `[Assumption]`, confirm with counsel. Do not assert legal specifics.

### 4. Success metrics

| Metric | Baseline | Pass bar | Measured from |
|---|---|---|---|
| Mean shift-start triage time, Line 3 | 35 min [Fact, from MES] | ≤ 20 min over the final 4 weeks | Plant's own MES timestamps (both sides see them) |

Agreed in writing before kickoff. Behaviour observed 0.7 once running.

### 5. Kill criteria
- Check-point: end of week 4.
- Either side walks if copilot suggestions are accepted on **< 30% of shifts**, OR triage time shows **no measurable movement** by week 4.
- Who can pull the plug: plant operations lead or Mentix, at the week-4 review.

### 6. Conversion terms priced NOW
- Production: **subscription at $6,000 / line / month**, one basis (per-line — the workflow is always-on and line-scoped).
- Conversion trigger: if week-8 mean triage time hits **≤ 20 min**, the plant converts Line 3 and adds **≥ 2 further lines within 60 days** at that rate.
- Signed at pilot signing, dated at the pilot start. Not "TBD."

## Completeness verdict

| Term | Clears its bar? |
|---|---|
| 1 Scope | YES — one line, OUT-list, 8-week hard end |
| 2 Price | YES — $24k prepaid, money moved 1.0 |
| 3 Data-rights clause | YES — exhaust named, compounds, signed at #1 |
| 4 Success metrics | YES — 35→≤20 min, MES-measured, pre-agreed |
| 5 Kill criteria | YES — <30% acceptance / no movement, week-4, both sides |
| 6 Conversion priced now | YES — $6k/line/mo, trigger + signature today |

**Score: 6 / 6 — REAL PILOT.**

## The two terms that made it real

The first draft scored 4/6: scope, data-rights, metrics and kill criteria were all fillable from the start. It failed on term 2 (free) and term 6 (deferred) — and 4/6 is NOT A PILOT, it is a free POC.

The upgrade was not rhetorical. Term 2 went from $0 to $24k prepaid — money moved, the only 1.0 signal the pilot can produce. Term 6 went from "TBD" to a signed $6k/line/month with a metric-gated trigger — a booked commitment for the next stage. Those are the two terms fellows skip, and they are the two that separate a pilot from a free favour. A plant that will not prepay $24k or sign a production price today is not a buyer; better to learn that before the 8 weeks than after.
