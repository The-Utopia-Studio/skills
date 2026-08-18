# Worked example — Azraq's cross-operator data-centre risk benchmark

Azraq builds infrastructure-risk products for data-centre operators. This is a test fixture: numbers and dates are illustrative, not real client data. "Now" is 2026-07.

## Input the fellow brought

"Our wedge passed the five questions. Every month-end a data-centre operator uploads their incident-and-uptime logs and gets a risk report ranking their sites against an anonymised peer benchmark. Everyone tells me the peer data is our moat. Is it, and how do I make it real?"

Evidence on the table:
- Wedge scored 5/5 on `wedge-five-questions` (month-end trigger, single output: benchmarked risk report). [Fact]
- 4 operators have run the report at two month-ends; 3 changed a maintenance-scheduling decision on it. [Fact]
- The benchmark today spans those 4 operators' anonymised incident histories. [Fact]
- Pilot #1 contracts do NOT yet contain a data-rights clause; Azraq is using the incident data on a handshake. [Fact]
- Operators already run a large third-party DCIM/monitoring platform whose contracts promise single-tenant data isolation. [Assumption — confirm the incumbent's terms]

## Gate 0 — The validated wedge

Every month-end, a data-centre operator uploads incident-and-uptime logs and gets a risk report ranking their sites against an anonymised peer benchmark. Verdict from `wedge-five-questions`: **REAL WEDGE 5/5.** [Fact] Proceed.

## 1. The four dated gates

| Gate | Target date | Entry condition | Through-it signal | Compounding deposit |
|---|---|---|---|---|
| 1 Wedge | 2026-07 [Fact] | Passed 5/5 | 3 of 4 operators changed a maintenance decision on the report. Behaviour 0.7 [Fact] | Each run leaves that operator's incident history in Azraq |
| 2 Usage | 2026-10 [Assumption] | Wedge live one full month-end cycle | Cross-operator benchmark is live and referenced in the report each operator reads. Behaviour 0.7 [Hypothesis — needs 2+ more operators] | Peer benchmark exists only because multiple operators deposit; a single-operator rival cannot build it |
| 3 Lock-in | 2027-03 [Assumption] | Enough risk-trend history to be relied on externally | An operator cites its Azraq risk-trend in an insurer submission or board pack. Artefact 0.5 [Hypothesis] | Switching cost = quarters of trend history + the peer baseline you lose on exit |
| 4 Data advantage | 2027-09 [Assumption] | Corpus beats public-data alternatives AND covered by a signed data-rights clause | A red-team cannot match benchmark risk-ranking accuracy on public/single-operator data; renewal or expansion revenue. Money 1.0 target [Hypothesis] | More operators → sharper benchmark → more operators (flywheel) |

Note on Gate 4: it currently **cannot clear** — the data-rights clause is unsigned (see §5). The corpus is not yet contractually Azraq's, so a competitor could accumulate the same asset from the same operators. Routed to `data-rights-clause`.

## 2. The incumbent-veto sentence

**Most-likely incumbent to copy (X):** the third-party DCIM / monitoring platform Azraq's operators already run.

> **The DCIM incumbent won't copy the cross-operator risk benchmark because their existing contracts promise single-tenant data isolation, and asking their customers for cross-operator pooling rights would breach the very isolation guarantee they sell on.** [Assumption — confirm the incumbent's contract terms]

| Test | Pass bar | Result |
|---|---|---|
| Structural, not speed | Names the incumbent's own structure | PASS — it names their data-isolation contracts and their trust proposition, not Azraq's effort |
| Survives unlimited resources | True even with infinite engineers and 18 months | PASS — engineering cannot un-sign the isolation contracts; pooling would reprice their whole trust promise |

**Veto category:** Data rights + channel conflict. The corpus Azraq can pool is the corpus the incumbent contractually cannot. This is exactly why Gate 4's signed clause matters: the veto only holds if Azraq's own right to pool is real (→ `data-rights-clause`).

## 3. Three monthly falsifiers

| # | Watches | Falsifier | Cadence | If it trips |
|---|---|---|---|---|
| 1 | Usage | Net new depositing operators < +1/month, OR median per-operator incident-months stops rising, for two consecutive months | Monthly | The benchmark is not compounding; usage gate not forming |
| 2 | Lock-in | Zero operators have referenced their Azraq risk-trend in an external document (insurer / board / audit) by 2027-03 | Monthly | Switching cost is imagined; lock-in gate failing |
| 3 | Data advantage | An internal red-team reproduces the benchmark's risk-ranking accuracy within 8 weeks using only public and single-operator data | Quarterly red-team | The corpus is not yet the moat; data-advantage gate is fiction |

## 4. Verdict

Kill line check: veto sentence present and structural (PASS); three falsifiers, all able to fail (PASS); every gate dated (PASS).

**Verdict: MOAT DESIGNED — with one gate blocked.** The trajectory is real and dated, the veto is structural, the falsifiers are live. Gate 4 is designed but cannot clear until the data-rights clause is signed.

## 5. The gate that started as an unsigned claim

Gate 4's first draft read: "our incident corpus is our data advantage." On the ladder that was opinion (0.1) — worse, it was a claim to an asset Azraq did not have the right to keep. The through-it signal (a red-team failing to reproduce the benchmark) is meaningless if the operators can hand the same incident logs to a second vendor tomorrow.

The fix was not rhetorical. The corpus becomes a moat only when the right to pool it is signed at pilot #1, not bolted on later. That is a different skill: routed to `data-rights-clause` to draft the clause and flag the GCC/MENA jurisdiction specifics for counsel. Until it is signed, Gate 4 stays open and the incumbent-veto sentence rests on an `[Assumption]`, because Azraq's own pooling right — the thing the incumbent cannot match — is not yet real either.

The lesson the skill enforces: a data advantage you have not signed for is not a moat gate. It is a race, and everyone with the same customers is in it.

## 6. Next step

- Put the three falsifiers on a monthly review starting now. The moat is a claim Azraq checks, not a slide it shows once.
- Sign the data-rights clause at pilot #1 (`data-rights-clause`). Gate 4 cannot clear without it, and the whole veto sentence depends on it.
- Re-confirm the incumbent's isolation-contract `[Assumption]` with counsel before repeating the veto sentence to investors as fact.
