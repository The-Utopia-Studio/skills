# Worked example — Barrier Intelligence's field-log data

Barrier Intelligence builds gas-safety software for oil and gas crews. This is a test fixture: numbers are illustrative, not real client data.

## Input the fellow brought

"Our moat is data. We've scraped every public gas-safety standard and we track industry incident news daily — nobody has a cleaner safety dataset. Plus we've got field logs coming off the rigs. What data do we actually own?"

Available material, as stated:
- A scraped, cleaned corpus of public gas-safety standards and regulator bulletins. [Fact]
- A daily-updated feed of industry incident news. [Fact]
- Field logs: crew-written near-miss and incident write-ups from 4 rigs, 6 weeks. Barrier holds the exports. [Fact]
- Crews run a shared WhatsApp thread and, lately, ChatGPT sessions to talk through what a reading means before logging it. One supervisor forwarded Barrier a screenshot batch. [Fact]
- Each rig files a hot-work / gas permit with the regulator before high-risk jobs. Barrier has pulled 40 of these PDFs via records request. [Fact]
- The gas detectors stream raw sensor telemetry to the detector vendor's cloud. Barrier sees dashboards, not the raw feed. [Fact]

## 1. The workflow this data comes off

**Recurring task:** a crew takes a gas reading, decides whether it is safe to proceed, and logs the call.
**Byproduct it leaves:** the write-up, the thread where they argued it out, the permit that authorised the job, the raw sensor stream behind the reading.

The fellow led with the two datasets they are proudest of. Both are the wrong place to look.

## 2. Candidates, seeded from the six seams

| Seam | Found |
|---|---|
| 1 Shadow AI threads | Crew WhatsApp + ChatGPT sessions interpreting readings before logging |
| 2 Workflow exhaust | The field-log write-ups (and the reasoning in them) |
| 3 Operational & sensor logs | Raw detector telemetry — held by the vendor |
| 4 Permits, filings & records | Hot-work / gas permits filed with the regulator |
| 5 Tacit judgment | The "is this safe to proceed?" call — partly captured in the threads, mostly in supervisors' heads |
| 6 Transaction ledger | None relevant at this stage |

Plus the two the fellow brought: the public standards corpus and the incident-news feed.

## 3–5. The corpus map

| # | Candidate source | Signal it holds | Band | Access path + data-rights note | Compounds with use? | Evidence it's real (ladder + tag) | Moat seed? |
|---|---|---|---|---|---|---|---|
| 1 | Scraped public gas-safety standards | What the rules say | **R** | Anyone can scrape it; a model already knows most of it | N | Corpus in hand, but reachable by all — artefact 0.5 [Fact] | **No** — commodity |
| 2 | Industry incident-news feed | What went public about past incidents | **R** | Public news; a model can summarise the same | N | Feed running — behaviour 0.7 [Fact], but reachable | **No** — commodity |
| 3 | Crew shadow threads (WhatsApp + ChatGPT) | How crews actually reason from a reading to a go/no-go call, including the wrong turns | **P** | Held in private accounts; one supervisor forwarded a batch. Needs a consent/data-rights basis to use at scale → `data-rights-clause` | Y — every shift adds more | Hold one screenshot batch — artefact 0.5 [Fact]; scale is [Hypothesis] | **Yes** (seed) |
| 4 | Field-log write-ups | The decision + its stated reason, per real event | **P** | Barrier already holds the exports | Y — grows with every logged call | Already ingested, 4 rigs / 6 wks — behaviour 0.7 [Fact] | **Yes** (seed) |
| 5 | Hot-work / gas permits | What high-risk jobs were authorised, when, under what conditions | **G** | Records request to the regulator; 40 PDFs pulled | N (static filings) | 40 PDFs in hand — artefact 0.5 [Fact] | No — gated, fast-mover edge |
| 6 | Raw detector telemetry | The signal behind the reading, before human interpretation | **P** | Vendor-owned; Barrier sees dashboards only. Unreachable without a signed clause → `data-rights-clause` | Y (if obtained) | No access today — [Assumption] it is gettable | Not yet — P you don't hold |

## 6. Verdict

**Moat seed, ranked by compounding:**
1. Field-log write-ups (row 4) — proprietary, already held and ingested, grows with every logged call. The strongest seed because it compounds and Barrier already has it.
2. Crew shadow threads (row 3) — proprietary and compounding, but usable at scale only once a consent/data-rights basis is in place. Highest-signal source (it shows the reasoning, not just the outcome); blocked on rights.

**Gated, fast-mover play:** the permits (row 5). A competitor can file the same request, so this is a speed and coverage edge, not a moat — worth pulling first and continuously, not worth calling defensible.

**Rejected as model-reachable:** the public standards corpus (row 1) and the incident-news feed (row 2). These are the two the fellow was proudest of. A model already reaches both and can hand a competitor the same corpus for free. They are commodity input, not moat.

**Blocked on rights:** the raw detector telemetry (row 6) is genuinely unreachable by a model — but it is the vendor's moat, not Barrier's, until a clause changes that.

## 7. Next step

- Rows 3 and 6 go to `data-rights-clause` (section 06): the shadow threads need a consent basis, the telemetry needs a vendor clause. Do not draft either here.
- The supervisors' unwritten "safe to proceed?" judgment (seam 5) is only partly in the threads. To capture the rest, run `tacit-knowledge-interview`.
- Field logs (row 4) are both the moat seed and the eval set: a model cannot narrate Barrier's own crews' calls from training, so they are the only data that can measure whether Barrier's alerts match what experienced crews actually decide.

## The correction this skill forced

The fellow arrived believing the moat was the two datasets they had built on purpose (standards + news). Both are R — the model already has them. The moat was in the exhaust they nearly overlooked: the field logs they already hold and the shadow threads they had barely started collecting. YODA moved the attention from the reachable pile they were proud of to the trapped pile that is actually theirs.
