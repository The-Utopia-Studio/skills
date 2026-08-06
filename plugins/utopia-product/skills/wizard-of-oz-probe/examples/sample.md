# Sample — Durian Labs runs a wizard-of-oz probe

**Fellow:** Durian Labs (early workflow product). First workflow: turn a messy vendor email into a structured purchase order (PO).
**Illustrative fixture. Numbers are plausible, not real client data.**

Durian has not built the parser. Before writing any extraction code, it tests one thing: would an ops manager actually submit the PO if it came back fast and correct.

## 1. The claim
`[Hypothesis]` An ops manager would submit the auto-generated PO into their system if it arrived within the hour and was correct.
Type: usage / would-they-act. Passes the check — no feasibility/cost/scale words.

## 2. The curtain

| The user sees | The wizard does |
|---|---|
| Forward the vendor email to intake@durianlabs.co | A Durian founder reads it, builds the structured PO by hand, emails it back |

Opaque: yes. Users were told "our system turns your email into a PO," not that a human types it.

## 3. Fidelity contract (set before running)

| Contract term | Target | Actual |
|---|---|---|
| Latency | ≤ 60 min (what a real parser + queue would hit) | 41 min avg |
| Quality band | No worse than a plausible v1 parser: standard fields, flag ambiguous lines rather than guess | Held — wizard flagged 3 ambiguous lines instead of inventing values |

## 4. Operators
Six ops managers at SMB distributors, recruited from Durian's waitlist. Each forwarded a real vendor email from their own inbox with a real PO they needed to raise.

## 5. Run log

| # | Task | Wizard min | Errors | User action |
|---|---|---|---|---|
| 1 | 12-line grocery PO | 6 | 0 | Submitted the PO |
| 2 | Ambiguous unit-of-measure email | 9 | 1 (wrong UoM) | Fixed the line, then submitted |
| 3 | Multi-vendor forward | 11 | 0 | Ignored — said "I'd rather do these two myself" |
| 4 | Standard restock | 5 | 0 | Submitted, then asked "can I get this daily?" and pre-paid one month |
| 5 | PDF-attachment email | 8 | 0 | Submitted |
| 6 | Short one-item email | 4 | 0 | Ignored — "faster to type it myself for one line" |

## 6. Read-out

**Usage:** 4 of 6 acted on the output (submitted the PO). Money moved: yes — operator 4 pre-paid one month.
**Evidence-ladder score:**
- Used the output → **0.7 (behaviour observed)** `[Fact]` for 4/6.
- Operator 4 pre-paid → **1.0 (money moved)** `[Fact]`, single data point.
- General "this is handy" comments → **0.1 (opinion)**, not upgraded.

**Feasibility hypotheses (NOT cost facts):**
- Wizard averaged 7.2 min/PO `[Hypothesis]` — hand to `agent-concierge-probe` to get real cost-per-PO.
- Hardest step was ambiguous units of measure (the one wizard error) `[Hypothesis]` — likely the automation bottleneck.
- Single-line and multi-vendor emails were both ignored — the wedge may be mid-size single-vendor POs `[Hypothesis]`.

**What this does NOT prove:**
- Feasibility — a founder read every email; Durian has not shown a parser can extract these fields. `[Assumption]`
- Unit cost — 7.2 wizard minutes is not machine cost, and says nothing about API or infra spend.
- Scale — one founder handled six POs in a day. Throughput at 600 is untested.

**Next probe (from `probe-matrix`):** the open question is now cost and automation frontier → `agent-concierge-probe`, seeded with the 7.2-min hypothesis and the units-of-measure bottleneck.
