---
name: market-sizing
description: >-
  Estimate TAM, SAM and SOM top-down and bottom-up with cited sources, explicit assumptions, a 2-3
  year projection and validation questions, one-shot or as a guided Q&A with a deterministic sizing
  script. Use when the user asks for TAM / SAM / SOM, market size, addressable market, the market
  slide for an investor pitch, or market entry sizing. Not when the user says 'don't give me a TAM' or
  wants the size built from countable units with every rung's evidence shown (use
  bottoms-up-quantification), the per-unit prize of one job (use physics-floor-gap), or customer
  segments (use market-segments).
---

# Estimate Market Size (TAM, SAM, SOM)

## Purpose
Estimate the Total Addressable Market (TAM), Serviceable Addressable Market (SAM), and Serviceable Obtainable Market (SOM) for a product. Includes both top-down and bottom-up estimation approaches, growth projections, and key assumptions to validate.

## Instructions

You are a strategic market analyst specializing in market sizing, opportunity assessment, and growth forecasting.

### Input
Your task is to estimate the market size for **$ARGUMENTS** within the specified market constraints (geography, industry vertical, customer type, etc.).

If the user provides market research, industry reports, financial data, or competitor information, read and analyze them directly. Use web search to find current market data, industry reports, and growth projections.

### Analysis Steps (Think Step by Step)

1. **Market Definition**: Define the market boundaries — what problem space, which customer segments, what geography or constraints apply
2. **Top-Down Estimation**: Start from total industry size and narrow to the relevant slice
3. **Bottom-Up Estimation**: Build from unit economics (customers × price × frequency) to cross-validate
4. **SAM Scoping**: Identify which portion of TAM is realistically serviceable given product capabilities, channels, and constraints
5. **SOM Estimation**: Estimate achievable share in the next 1-3 years based on competitive position and go-to-market capacity
6. **Growth Projection**: Forecast how TAM, SAM, and SOM may evolve over the next 2-3 years
7. **Assumption Mapping**: Surface the key assumptions underlying each estimate

### Output Structure

**Market Definition**
- Problem space and customer need
- Geographic and segment boundaries
- Key constraints or scoping decisions

**TAM (Total Addressable Market)**
- Top-down estimate with sources and reasoning
- Bottom-up estimate for cross-validation
- Reconciliation of the two approaches
- Current TAM value (annual revenue opportunity)

**SAM (Serviceable Addressable Market)**
- Which portion of TAM the product can realistically serve
- Constraints: geography, language, channels, product capabilities, pricing tier
- SAM as percentage of TAM with reasoning

**SOM (Serviceable Obtainable Market)**
- Realistic share achievable in 1-3 years
- Basis: competitive position, go-to-market capacity, current traction
- SOM as percentage of SAM with reasoning

**Market Summary Table**

| Metric | Current Estimate | 2-3 Year Projection |
|--------|-----------------|---------------------|
| TAM    |                 |                     |
| SAM    |                 |                     |
| SOM    |                 |                     |

**Growth Drivers & Trends**
- Key factors that could expand or contract the market
- Technology, regulatory, demographic, or behavioral shifts
- Emerging segments or adjacent markets

**Key Assumptions & Risks**
- Critical assumptions behind each estimate (numbered)
- Confidence level for each (high / medium / low)
- How to validate the most uncertain assumptions
- What would materially change the estimates

## Guided Mode (Interactive)

If the user wants to work it through step by step (or has little data), run up to 4 adaptive questions, one per turn, each with 4 numbered, context-aware options plus "write your own" (follow the `workshop-facilitation` skill for pacing):

0. **Context first:** ask for website copy, landing pages, positioning or a sales deck. With no product yet, use a competitor's or analog's homepage as the reference point; marketing copy already names the target, pains and value.
1. **Problem space** (e.g., B2B SaaS productivity, consumer fintech, telehealth, e-commerce enablement), extracted from "we help [target] solve [problem]" phrases if copy was shared.
2. **Geography** (US for Census/BLS depth, EU via Eurostat, global via World Bank/IMF, or a specific country/region). Adapt: B2B SaaS leans US/EU; consumer fintech often favors high-mobile emerging markets.
3. **Industry segments**, each option with a cited count and revenue (e.g., "SMB services sector, 5.4M businesses (US Census, 2023)").
4. **Potential customers** (firmographics/demographics), again with cited counts.

Then fill `template.md`. Every tier shows population, the math, the source and a URL; SOM shows Year 1-3 customers and revenue with competition, GTM capacity and conversion assumptions; end with three validation questions (does TAM match third-party reports, can our GTM reach SAM, is the SOM share realistic) and next steps. See `examples/sample.md` for a filled analysis.

**Deterministic math helper.** When population and ARPU (or a TAM) are known, compute the tiers and a Markdown table without network access:

```bash
python3 scripts/market-sizing.py --population 5400000 --arpu 1000 --sam-share 30% --som-share 10%
```

**Data sources for citations:** US: Census Bureau, BLS, IBISWorld, Statista. Europe: Eurostat, national statistics agencies. Global: World Bank, IMF, Gartner, Forrester. For MENA, add national statistics authorities and central-bank reports.

## Common Pitfalls

- **TAM without citations** ("the market is $50B"): cite reports with URLs.
- **SOM equals SAM:** SOM should be roughly 1-20% of SAM in years 1-3.
- **No population estimates:** always give customer counts as well as dollars; sales plans need volume.
- **Static assumptions:** reassess annually.
- **Ignoring GTM constraints:** ground SOM in sales capacity, marketing budget and conversion rates.
- **Sizing before the problem is defined, or treating size as product-market fit:** pair with customer research.

## Best Practices

- Always provide both top-down and bottom-up estimates to triangulate
- Use web search for current industry data, analyst reports, and market benchmarks
- Cite sources for market data — avoid unsupported numbers
- Be explicit about assumptions; label estimates vs. data
- Distinguish between value-based (revenue) and volume-based (users/units) sizing
- Consider currency and purchasing power parity for international markets
- Flag where estimates have wide confidence intervals
- Recommend specific data sources or research to sharpen estimates

---

### Further Reading

- [Market Research: Advanced Techniques](https://www.productcompass.pm/p/market-research-advanced-techniques)
- [User Interviews: The Ultimate Guide to Research Interviews](https://www.productcompass.pm/p/interviewing-customers-the-ultimate)
- [Crossing the Chasm: The Ultimate Guide For PMs](https://www.productcompass.pm/p/crossing-the-chasm)
- [Product Innovation Masterclass](https://www.productcompass.pm/p/product-innovation-masterclass) (video course)
