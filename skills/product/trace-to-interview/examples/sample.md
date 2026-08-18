# Worked example — Azraq post-launch data-centre risk product

Fellow: **Azraq** (data-centre / infrastructure risk). The product ships operators a live risk feed: it raises alerts (cooling, power-feed, network) and generates the quarterly site risk report. All numbers are illustrative test fixtures, not client data.

**Fellow's ask:** "We've been live 9 weeks. Mine the logs — what are operators actually telling us? Don't give me a dashboard."

## Set definition
- **One trace =** one operator session (login → logout), plus every alert-interaction and report-action inside it.
- **Window:** 9 weeks, weeks 1–9 post-launch.  ·  **Volume:** 2,140 sessions, **31 distinct operators** across 12 sites.  `[Fact]`
- **Source:** product event log + agent run archive.  `[Fact]`
- **Active segment:** 31 operators active in window (the whole pilot cohort).

The instinct was a funnel — alert open-rate, dwell, report accept-rate. That returns metrics. Regrouped by behaviour, three interviews fall out.

---

## Interview cards

### Card 1 — Cooling alerts dismissed in under 5 seconds

| Field | Fill |
|---|---|
| **Observed behaviour** | Operators dismiss ~80% of cooling alerts in < 5s without opening detail; median time-to-dismiss 3.1s.  `[Fact]` |
| **Behaviour rung** | 0.7 (behaviour observed) |
| **Distinct users** | 27 of 31 active (87%) → **pattern** |
| **Discovery question it answers** | Which alert class do operators treat as noise, and why? |
| **Inferred JTBD / desired outcome** | "Tell me about risks I'd act on; don't make me triage false alarms." Cooling alerts are firing on normal thermal cycling.  `[Hypothesis]` |
| **Satisfaction signal** | Dissatisfied on the cooling-alert sub-job — the alert costs attention and returns nothing. |
| **Other honest reading** | Could be alert-fatigue from *volume* rather than *class* — operators tuning out everything. Tested below. |
| **Confirm-the-why probe** | Pull the 5 cooling alerts that were *not* dismissed fast; if those coincide with real thermal events, the class is mostly noise (a threshold problem), not blanket fatigue. Cheap, from existing logs. → `probe-matrix` |
| **Interview it replaced** | A scheduled "why do you ignore cooling alerts?" session ≈ recruit 3 operators + £120 incentive + 45-min call + synthesis, ~1.5 wk lead, returns verbal 0.3. The trace already answered it at 0.7 for the triage minutes. |
| **Proposed tree edit** | New opportunity: "cooling-alert precision" under the "operators act on our alerts" outcome, rung 0.7. |

### Card 2 — Power-feed alerts always opened, then exported

| Field | Fill |
|---|---|
| **Observed behaviour** | 100% of power-feed alerts opened; 73% exported to PDF/CSV within the session; export always precedes logout.  `[Fact]` |
| **Behaviour rung** | 0.7 |
| **Distinct users** | 29 of 31 (94%) → **pattern** |
| **Discovery question it answers** | What does the operator do with a power-feed alert *after* our product, and what job do we not finish? |
| **Inferred JTBD / desired outcome** | "This is the alert I escalate. I take it to the incident bridge / facilities ticket." The export is the seam to the next job.  `[Hypothesis]` |
| **Satisfaction signal** | Served on detection, unfinished on escalation — they leave our product to act. |
| **Other honest reading** | Export could be archival/compliance, not escalation. Distinguished by the probe. |
| **Confirm-the-why probe** | Watch 3 exports end-to-end (screen-share) or check whether an incident ticket follows each export within an hour. → `probe-matrix` |
| **Interview it replaced** | "Walk me through what happens after a power-feed alert" ≈ 2 hr effort + incentive + 1–2 wk lead, verbal 0.3. Trace: 0.7, free. |
| **Proposed tree edit** | New solution under "reduce time-to-escalation": one-click escalation to the incident bridge, seeded by the export behaviour. Rung 0.7. |

### Card 3 — Risk report accepted unedited at 94% (the trap)

| Field | Fill |
|---|---|
| **Observed behaviour** | 94% of generated quarterly reports accepted with zero edits before sign-off; median review dwell 40s on a 6-page report.  `[Fact]` |
| **Behaviour rung** | 0.7 on the *behaviour* (they accepted). **Not** 0.7 on "the product is trusted." |
| **Distinct users** | 22 of 31 (the report-signers) → pattern-sized, but see reading |
| **Discovery question it answers** | Did the report earn trust, or did signers stop checking? |
| **Inferred JTBD / desired outcome** | Ambiguous — the whole point of the card. |
| **Satisfaction signal** | Unknown until disambiguated. **The flattering read ("they trust it") is refused.** |
| **Other honest reading** | 40s dwell on 6 pages is too fast to have *read* it. Equally consistent with rubber-stamping / compliance theatre / stakes feeling low. Accept-unedited is the ambiguous row in the decoder. |
| **Confirm-the-why probe** | Inject one known material error into a small sample of reports and measure catch-rate; and check whether any accepted report was silently corrected downstream. If errors sail through, acceptance ≠ trust. → `probe-matrix` |
| **Interview it replaced** | Doesn't replace one — it *generates* the probe that a survey ("do you trust the report?") could never answer honestly, because people over-report trust. |
| **Proposed tree edit** | No tree edit yet. Held as **candidate**: the why-rung is 0.1 until the error-injection probe lands. Promoting it now would be the accept-as-trust lie. |

---

## Roll-up

| Card | Pattern | Distinct users | Behaviour rung | Why-rung now | Routed as | Probe named? |
|---|---|---|---|---|---|---|
| 1 | Cooling alerts = noise | 27/31 (87%) | 0.7 | 0.3 (Assumption) | feed-2 signal → CDE | yes |
| 2 | Power-feed export = escalation seam | 29/31 (94%) | 0.7 | 0.3 (Assumption) | feed-2 signal → CDE | yes |
| 3 | Report accept-unedited (ambiguous) | 22/31 | 0.7 | 0.1 (unconfirmed) | held as candidate | yes |

- **Findings routed:** Cards 1 and 2 → `continuous-discovery-engine` feed 2 at behaviour 0.7. This is the same loop turn that skill's example consumes: the trace evidence (dismiss cooling in <5s; always open + export power-feed) kills a planned "unified alert digest" solution and promotes "cooling-alert precision" + "one-click escalation."
- **Candidate held:** Card 3 — accept-unedited pending the error-injection probe. Not promoted; the ambiguity is named, not resolved by flattery.
- **Anecdotes parked (N=1):** none this window.
- **Scheduled-interview cost replaced:** ≈ £240 in incentives + ~3 weeks of lead time for Cards 1–2 alone — and at a *higher* rung (0.7 vs 0.3) than the interviews would have returned. That is discovery getting cheaper and truer as usage accrues.

**Hand-off:** two feed-2 signals to `continuous-discovery-engine` (rung 0.7, weighted by distinct operators); three probes to `probe-matrix`; one candidate (Card 3) explicitly un-promoted until its why is confirmed.
