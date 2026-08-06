# So-What Stress Test — Azraq incident-risk subscription

**Fellow:** Azraq · **Date:** 2026-07-20 · **Idea:** A subscription that scores each
data-centre's incident risk from its uptime and maintenance logs, sold to the operators
who run the halls.

Illustrative fixtures. Numbers are plausible, not real client data.

## The five questions

| # | Question | Required evidence type | Fellow's answer | Rung | Grade |
|---|---|---|---|---|---|
| 1 | So what? | Money/hours saved per event | A Tier-III hall's unplanned outage runs ~$9k/minute in SLA credits; two operators already pay a consultant ~$40k/yr for the same manual risk read. `[Fact]` on the consultant spend; `[Assumption]` on the per-minute figure | behaviour 0.7 | pass |
| 2 | Who pays? | Budget-holder + budget line | The VP of Critical Facilities signs from the reliability/opex line, not IT. One VP already renewed the consultant contract twice. `[Fact]` | behaviour 0.7 | pass |
| 3 | What's the wedge? | Smallest forced action + cost of not adopting | Operators must file an incident root-cause pack to their insurer after every outage; Azraq auto-drafts that pack, so skipping Azraq means writing it by hand under deadline. One design-partner hall runs it live for insurer filings. `[Fact]` | behaviour 0.7 | pass |
| 4 | What's the moat? | Compounding asset + proof it started | Every filing adds a labelled incident to a cross-operator dataset no single operator can assemble alone; the risk score sharpens with each hall added. 60 labelled incidents in from three halls. `[Fact]` | behaviour 0.7 | pass |
| 5 | What kills it? | Killer + early signal + mitigation | Insurers could demand the raw logs directly and cut Azraq out. Early signal: a broker asking for log access in renewal terms. Mitigation: Azraq holds the data-rights position with operators, so the labelled dataset stays contractually theirs to license. `[Assumption]` on the mitigation holding | behaviour 0.7 | pass |

Ladder: money 1.0 · behaviour 0.7 · artefact 0.5 · verbal 0.3 · opinion 0.1. Pass bar
Q1–Q4 is ≥ 0.7.

## Verdict

> **Verdict: PASS**
> One line why: every question clears on observed behaviour — real consultant spend, a
> named budget-holder who renews, a live wedge tied to a mandatory insurer filing, and a
> dataset already compounding.

**Weakest question:** Q1 — the per-minute outage cost is still an `[Assumption]`; the
consultant spend is the `[Fact]` carrying it. Move Q1 to money (1.0) by getting one
signed subscription at the consultant's price point.

## Rewrite

Not required — PASS.

## Kill note

Not required — PASS.

## Self-check before returning (the kill line)

- [x] No question graded `pass` on opinion. Q1's pass rests on the `[Fact]` consultant
      spend, not the assumed per-minute figure.
- [x] Every number came from Azraq's input. Nothing invented.
- [x] Every answer tagged.
- [x] N/A — not a Redesign.
- [x] N/A — not a Kill.
- [x] Verdict reached by ordered logic: no fatal, all five pass → PASS.

## What this looks like next to opinion answers

For contrast, the version that would have failed:

| # | Opinion answer (would grade weak) | Why it fails |
|---|---|---|
| 1 | "Downtime is really expensive for these operators." | No magnitude, no one spending today. Opinion 0.1. |
| 2 | "Data-centre operators will pay for this." | Names a market, not a budget-holder. Opinion 0.1. |
| 4 | "We'll build up a data moat over time." | A plan, not an accruing asset. Opinion 0.1. |

Any one of these caps the idea at REDESIGN. Azraq's PASS is earned only because each
row was moved off opinion and onto observed behaviour.
