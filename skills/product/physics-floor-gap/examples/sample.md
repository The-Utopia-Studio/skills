# Worked example — Azraq static data-centre risk report

Fellow: **Azraq** (data-centre / infrastructure risk). All numbers illustrative test fixtures, not client data.

**Fellow's question:** "Our analysts produce a static risk report per operator site. Is automating it a big enough problem to build a product around?"

## Shared assumption block
- 2026 inference: ~$5 / 1M input, ~$15 / 1M output  `[Assumption]`
- FX: £1 = $1.25  `[Assumption]`
- Floor computed against: a 2026 frontier long-context model  `[Assumption]`

---

## 1. Unit of work
- **Unit:** one static site risk report (uptime/incident history + data-rights position for one operator site).
- **Frequency:** ~40 operator sites, refreshed quarterly = **160 reports/year**  `[Assumption]`

## 2. Floor part A — token/compute cost of the automatable portion
Automatable: ingest incident logs, uptime data, permit/rights records; draft the standard sections; format.
- Tokens: ~300k input (logs + templates) + ~15k output.
- Cost: 300k × $5/1M = $1.50; 15k × $15/1M = $0.225; + retrieval/embeddings + one reasoning pass ≈ **~$3** → **A = $3 ÷ 1.25 = £2.40**  `[Assumption]`

## 3. Floor part B — irreducible human judgment
The part that carries liability: a senior analyst deciding which risks are *material for this operator* given the commercial relationship and the data-rights nuance, and signing it.
- Minutes: **20 min** of senior judgment per report  `[Assumption]`
- Loaded rate: **£120/hr** (specialist, fully loaded)  `[Assumption]`
- **B = 20 ÷ 60 × £120 = £40.00**  `[Assumption]`

## 4. Floor
- **Floor = A + B = £2.40 + £40.00 = £42.40**

## 5. Current priced practice
- Observed workflow: **1 analyst-day per report**  `[Fact]` (observed workflow, ladder weight 0.7)
- Loaded: 8 hr × £120/hr  `[Assumption]`
- **Current = £960 per report**
- Source: timed workflow (behaviour, 0.7) × assumed loaded rate. Above the 0.1 opinion floor → input is ready.

## 6. Gap ratio
- **Gap = £960 ÷ £42.40 = 22.6×**

## 7. Band verdict

| Gap ratio | Band | Verdict |
|---|---|---|
| < 10× | No room | Walk away |
| 10–20× | Thin | Marginal |
| **20–100×** | **Real prize** | **Build** |
| > 100× | Suspicious | Stop |

- **22.6× → band: Real prize → verdict: BUILD.**
- Why it holds: judgment (£40) dominates the floor, but 20 min of it does not come close to a full analyst-day of priced practice. The room is real.
- What would change the verdict: if the true irreducible judgment is closer to 2 hours (£240 → floor £242.40 → 4.0×), this collapses to *walk away*. The whole verdict rests on the 20-minute claim — Azraq's next job is to time that judgment step on a real report, not assume it.
