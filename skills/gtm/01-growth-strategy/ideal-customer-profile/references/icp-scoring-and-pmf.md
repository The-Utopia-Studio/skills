# ICP Scoring Model and PMF Revalidation

Folded in from the retired positioning-icp skill. Use after the ICP is defined, to turn it into a fit-and-intent scoring model and to revalidate it quarterly. Enrichment waterfalls that feed these scores live in lead-enrichment.

### ICP Scoring Model

Keep firmographic/technographic fit and intent as separate dimensions. Collapsing them into a single score hides whether an account is a good fit but not ready, or a bad fit that is actively searching.

**Fit Score (0-100)**

```
Fit Score = (Firmographic Match * 0.4) + (Technographic Match * 0.35) + (Behavioral Fit * 0.25)
```

| Component | Weight | Scoring Criteria |
|---|---|---|
| Firmographic Match | 40% | Industry vertical (25pts), employee range (25pts), revenue range (25pts), geography (15pts), funding stage (10pts) |
| Technographic Match | 35% | Uses complementary tools (30pts), has API/integration infrastructure (25pts), cloud-native stack (25pts), data maturity (20pts) |
| Behavioral Fit | 25% | Historical deal velocity (30pts), expansion rate (30pts), retention rate (25pts), NPS/satisfaction (15pts) |

**Intent Score (0-100)**

```
Intent Score = (Third-Party Intent * 0.35) + (First-Party Signals * 0.40) + (Trigger Events * 0.25)
```

| Component | Weight | Scoring Criteria |
|---|---|---|
| Third-Party Intent | 35% | Bombora topic surges (30pts), G2 category research (30pts), competitor page visits (20pts), review site activity (20pts) |
| First-Party Signals | 40% | Website visits to pricing/demo pages (30pts), content downloads (20pts), email engagement (25pts), product signup/trial (25pts) |
| Trigger Events | 25% | New funding round (30pts), key hire in target dept (25pts), tech stack change (25pts), competitor churn signal (20pts) |

### ICP Prioritization Matrix

```
                    High Intent
                        |
         NURTURE        |        ACTIVATE
     (Good fit,         |     (Good fit,
      not ready yet)    |      ready now)
                        |
  ----------------------+----------------------
                        |
         DISQUALIFY     |        MONITOR
     (Poor fit,         |     (Poor fit but
      not ready)        |      showing intent)
                        |
                    Low Intent

         Low Fit                    High Fit
```

- **ACTIVATE (High Fit + High Intent)**: Route to sales immediately. These accounts match your ICP and are actively looking. Target response time: under 4 hours.
- **NURTURE (High Fit + Low Intent)**: Enroll in targeted content sequences. They will convert when a trigger event hits.
- **MONITOR (Low Fit + High Intent)**: Watch for ICP drift. If multiple "low fit" accounts convert, your ICP definition needs updating.
- **DISQUALIFY (Low Fit + Low Intent)**: Do not spend resources. Revisit only during quarterly ICP refresh.

### ICP Definition Workflow

1. **Export your best 20-50 customers** by NRR, deal velocity, or LTV
2. **Run firmographic enrichment** to find common patterns (industry, size, stage)
3. **Run technographic enrichment** to find stack commonalities
4. **Analyze intent signals** that preceded closed-won deals
5. **Build the scoring model** with weights derived from your data, not assumptions
6. **Test against your pipeline** to see if the model would have predicted your last 10 wins
7. **Set a 90-day review cadence** because in AI markets, your ICP drifts quarterly

## 6. Perishable PMF: Quarterly Revalidation

### Why AI PMF Expires

In AI markets, PMF is not a milestone you reach and keep. Model capabilities evolve monthly, buyer expectations shift as they interact with better AI systems elsewhere, and new competitors launch weekly. Companies that validated PMF six months ago may already be losing it.

The data confirms this: only 5% of generative AI projects deliver real business value, often because teams validate once and assume the signal holds. Continuous revalidation is the fix.

### The 90-Day PMF Revalidation Cadence

Run this cycle every quarter. Each component takes 1-2 weeks. Total cycle: 4-6 weeks, leaving buffer before the next one starts.

| Week | Action | Method | Output |
|---|---|---|---|
| 1 | Sean Ellis Survey | Survey active users: "How disappointed would you be without this product?" | PMF score (target: 40%+ "very disappointed") |
| 2 | Cohort Retention Analysis | Compare Day 7/30/90 retention across monthly cohorts | Retention trend (improving, flat, declining) |
| 3 | Competitive Audit | Review top 5 competitors for positioning, pricing, feature changes | Competitive delta report |
| 4 | ICP Refresh | Analyze last quarter's wins/losses for ICP drift | Updated ICP scoring weights |
| 5-6 | Synthesis + Action | Combine all signals into positioning/messaging/ICP updates | Updated positioning doc, revised ICP, new messaging |

### Sean Ellis Score Benchmarks for AI Products

| Score | Interpretation | Action |
|---|---|---|
| Below 20% | No PMF. The product is not solving a real problem yet. | Pivot or narrow the ICP dramatically. |
| 20-30% | Weak signal. Some users get value, most do not. | Identify the segment where score is highest and focus there. |
| 30-40% | Approaching PMF. Close but the wedge needs sharpening. | Double down on the highest-scoring use case. |
| 40-50% | PMF achieved. Growth investments are justified. | Scale the sales motion, expand the team. |
| 50-60% | Strong PMF. Best-in-class for early stage. | Optimize unit economics, begin adjacent expansion. |
| 60%+ | Exceptional. Rare even among successful companies. | Defend the position, expand the category. |

### PMF Decay Warning Signs

| Signal | What It Means | Response |
|---|---|---|
| Sean Ellis score drops 5+ points quarter-over-quarter | Core value perception weakening | Re-interview churned users, check competitor launches |
| Day-30 retention drops below previous cohort | New users getting less value | Audit onboarding flow, check if ICP shifted |
| Win rate declining while pipeline grows | Positioning attracting wrong audience | Tighten ICP definition, update qualification criteria |
| Sales cycle lengthening | Buyer confidence dropping or competition increasing | Update proof vectors, add new case studies |
| NPS drops while usage stays flat | Users staying out of switching cost, not satisfaction | Urgent: interview detractors, ship fixes |
