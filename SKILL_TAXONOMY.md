# Skill Taxonomy

All skills in this repo map to **four modules**. Skills that blur modules confuse both Claude and users — pick one.

| Module | Folder | Pack | Count | Put here when… |
|--------|--------|------|------|----------------|
| **GTM** | `skills/gtm/` | `utopia-gtm` | 86 | Sales, marketing, growth, retention, distribution |
| **Product** | `skills/product/` | `utopia-product` | 173 | Discovery, PRDs, design, build, deploy, product metrics |
| **Investments** | `skills/investments/` | `utopia-investments` | 60 | DD, modeling, valuation, fundraising, markets, quant |
| **Founder Productivity** | `skills/founder-productivity/` | `utopia-founder-productivity` | 31 | Doesn't fit the three above |

**Total: 350 skills** (plus `skills/sandbox/` for experiments).

## GTM

Seven sub-modules inside `skills/gtm/<nn>-<id>/<skill>/`. Pack: `utopia-gtm`.

| # | Sub-module | Folder | Put here when… |
|---|------------|--------|----------------|
| 01 | Growth Strategy | `01-growth-strategy/` | Positioning, ICP, flywheels, GTM plan, company MOC |
| 02 | Marketing & Comms | `02-marketing-comms/` | Narrative, content, social, paid, CRO, launch comms |
| 03 | Sales Enablement | `03-sales-enablement/` | Collateral, discovery, qualification, deal process |
| 04 | Customer Success | `04-customer-success/` | Retention, expansion, renewals, sentiment |
| 05 | BD & Partnerships | `05-bd-partnerships/` | Outbound, signals, account tiers, partners |
| 06 | GTM Engineering | `06-gtm-engineering/` | RevOps, metrics, automation, agent autonomy |
| 07 | IP Commercialisation | `07-ip-commercialisation/` | Patent / commercial pathways (operator-led today) |

Examples: `growth-strategy`, `cold-email`, `sales-enablement`, `churn-prevention`, `account-tier-scoring`, `earned-autonomy`.

## Product

Discovery → concept → design → build → deploy → measure.

Examples: `jobs-to-be-done`, `create-prd`, `impeccable`, `railway-deploy`, `deploy-to-vercel`, `evidence-driven-testing`, `north-star-metric`.

## Investments

Funds work and fundraising: technical DD, IB modeling, capital markets, decks, quant pricing, IP diligence.

Examples: `technical-dd`, `pitch-deck`, `dcf-model`, `comps-analysis`, `bayesian-reasoning-calibration`, `ada`, `khalil`.

Also includes `pitch-deck-web` (interactive deck site builder) alongside `pitch-deck` (PPTX).

## Founder Productivity

Catch-all for operator tools that aren't GTM, Product, or Investments:

- Onboarding frameworks (TAM/SAM/SOM, SWOT, stakeholder maps)
- Legal / hiring docs (NDA, privacy policy, resume)
- Knowledge management (Obsidian, Proof, last30days)
- Agents & meta (`salim`, `agent-prd`, `agent-persona-builder`, `find-skills`)

## Decision rule

```
Sales / growth / distribution?     → GTM
Building or designing the product? → Product
Capital, DD, or fundraising?       → Investments
None of the above?                 → Founder Productivity
```

See [`packs.config.json`](./packs.config.json) for the exact skill list in each pack.
