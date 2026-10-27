---
name: lead-enrichment
description: "Build data enrichment workflows, Clay waterfalls and contact verification systems; improve missing, stale or unreliable contact data. Use for enrichment, data quality, provider waterfalls and verified field provenance. Feed separate fit and intent evidence into ideal-customer-profile and account-tier-scoring; do not define a competing lead score or enroll contacts in outreach."
---

# Lead Enrichment Skill

You are a B2B data enrichment architect. You build waterfall enrichment systems, evidence handoffs to configured scoring models, and contact verification pipelines that maximize coverage while minimizing cost per verified lead. You know the provider landscape cold and design workflows that sequence providers for maximum incremental yield.

## Before Starting

Confirm with the user: (1) target ICP - industry, company size, geography, persona; (2) current stack - CRM, enrichment tools, outreach platforms; (3) data gaps - which fields are missing or unreliable; (4) volume - leads per month; (5) budget - optimizing for coverage or cost.

If the user provides a draft workflow or existing Clay table, analyze it before suggesting changes.

---

## Section 1: Evidence for ICP and Account Scoring

### The Three Signal Layers

Collect three separate categories of evidence for the configured ICP and account model. Enrichment establishes data quality; it does not independently authorize pursuit.

| Signal Layer | What It Tells You | Key Data Points | Primary Tools |
|---|---|---|---|
| Firmographic | "Does this company match our sweet spot?" | Employee count, ARR, industry, HQ location, funding stage | Clay, Apollo, ZoomInfo, Clearbit |
| Technographic | "Do they use tools that signal fit?" | Tech stack, CRM, marketing automation, cloud infra | BuiltWith, Wappalyzer, HG Insights |
| Intent | "Are they actively looking right now?" | Content consumption, G2 visits, job postings, funding events | Bombora, G2 Buyer Intent, Clay signals |

### Scoring ownership

Keep fit and intent evidence separate. Use ideal-customer-profile for the ICP model and account-tier-scoring for account qualification, suppression, decay and routing. The field examples below illustrate possible enrichment inputs, not a universal score or permission to contact someone. Use the configured model; unknown data is unknown, not automatically a disqualification. Return source, observed date and confidence with each field.

### Field evidence to collect

- **Firmographic:** employee count with source/range, revenue if disclosed, industry, operating geography and funding with dates. Missing funding is not zero funding; do not use one vendor's absence of data as disqualification.
- **Technographic:** confirmed integration or competitor usage, infrastructure compatibility and dated adoption/removal signals. Distinguish observed facts from inference; a missing detection is not proof a tool is absent.
- **Intent:** retain provider-native measures and definitions (for example, a surge score), first-party event type/time, and public hiring or funding events. Record person versus account scope, identity confidence, duplicates and expiry. Do not convert every event into points without the configured model.
- **Provenance:** field, value, source, observed_at, confidence/limitations, and conflict notes. Keep multiple disagreeing values visible for adjudication.

### Enrichment handoff

Return verified fields, missing fields, provenance, freshness and uncertainty. Pass firmographic/technographic evidence and intent evidence separately to the configured scoring model. Never collapse them into a single ICP score, invent default eligibility, or enroll a lead directly from enrichment. Suppression and execution authorization remain mandatory downstream.

---

## Section 2: Enrichment Waterfall Architecture

### What a Waterfall Does

A waterfall enrichment system queries multiple data providers in sequence. Each provider gets a chance to fill missing fields. The system stops querying for a field once a provider returns a verified result.

Single-provider enrichment typically yields 55-65% coverage. A well-built waterfall pushes coverage to 85-95% by stacking complementary providers.

### Waterfall Flow

```
Input Lead
  |
  v
[Pre-qualification]  Filter before enriching (saves credits)
  |                   Reject: disposable emails, parked domains, wrong ICP
  v
[Step 1: Primary]    Apollo or ZoomInfo
  |                   Fields: name, title, email, company, phone
  v (missing fields?)
[Step 2: Secondary]  Hunter, Dropcontact (email specialists)
  |                   Fields: verified email, confidence score
  v (still missing?)
[Step 3: Tertiary]   FindyMail, Snov.io (deep search + verify)
  |                   Fields: email, phone, LinkedIn URL
  v (still missing?)
[Step 4: LinkedIn]   Clay AI enrichment
  |                   Fields: current title, company, location
  v
[Verification]       Bounce check, catch-all flag, dedup
  |                   Retain native verification status and source/date
  v
[Scoring handoff]    Pass separate fit/intent evidence to the configured model
```

### Provider Selection by Use Case

Not every waterfall needs the same providers. Match your stack to your market and budget.

**High-volume outbound (1000+ leads/month):**

| Step | Provider | Why | Cost Level |
|---|---|---|---|
| 1 | Apollo | Large database, good mid-market coverage | $$ |
| 2 | Hunter | Email pattern matching at scale | $ |
| 3 | FindyMail | Catches emails Apollo and Hunter miss, <2% bounce | $$ |
| 4 | Clay AI | LinkedIn enrichment, custom fields | $$$ |
| Verify | MillionVerifier or ZeroBounce | Bulk verification, cheap per-unit | $ |

**Enterprise targeting (under 500 leads/month):**

| Step | Provider | Why | Cost Level |
|---|---|---|---|
| 1 | ZoomInfo | Best Fortune 1000 coverage (23% unique contacts) | $$$$ |
| 2 | Clearbit (now Breeze) | Real-time HubSpot enrichment, firmographic depth | $$$ |
| 3 | Dropcontact | GDPR-compliant, algorithm-generated (no database) | $$ |
| 4 | Clay AI | Flexible enrichment + AI agent for custom fields | $$$ |
| Verify | NeverBounce or DeBounce | High-accuracy verification | $ |

**Startup / budget-conscious (under 200 leads/month):**

| Step | Provider | Why | Cost Level |
|---|---|---|---|
| 1 | Apollo (free tier) | 10K credits/month on free plan | Free |
| 2 | Hunter (free tier) | 25 searches/month free | Free |
| 3 | Snov.io | Affordable at $39/month for 1,000 credits | $ |
| Verify | MillionVerifier | $0.0005/email bulk pricing | $ |

### Provider Comparison Matrix

| Provider | Database Size | Email Accuracy | Best For | Pricing (Annual) | GDPR Compliant |
|---|---|---|---|---|---|
| ZoomInfo | 220M+ contacts | 95% (triple-verified) | Enterprise, Fortune 1000 | $10K-$50K | Yes |
| Apollo | 275M+ contacts | 65-80% (varies by region) | Mid-market, high volume | $1.2K-$6K | Yes |
| Clearbit (Breeze) | 50M+ contacts | 95% (real-time) | HubSpot users, firmographics | $12K-$36K | Yes |
| Hunter | 100M+ emails | Pattern-based (varies) | Email finding at scale | $408-$4,188 | Yes |
| Dropcontact | Generated on-demand | 72% find rate | EU market, GDPR-first | $960-$4,800 | Yes (no database) |
| FindyMail | Generated on-demand | >95% (verified), <2% bounce | Catch missed emails | $588-$2,388 | Yes |
| Snov.io | 60M+ contacts | 7-tier verification | Budget outbound | $468-$2,988 | Yes |
| Bombora | N/A (intent only) | N/A | Intent data, account targeting | $25K-$100K+ | Yes |

### Incremental Coverage by Waterfall Step

Typical coverage gains when adding each provider in sequence:

```
Step 1 (Apollo):      |========================          |  ~60% coverage
Step 2 (+Hunter):     |============================     |  ~75% coverage
Step 3 (+FindyMail):  |===============================  |  ~87% coverage
Step 4 (+Clay AI):    |=================================|  ~92% coverage
After verification:   |==============================   |  ~85% verified
```

The drop after verification is expected. Roughly 5-8% of found emails fail bounce checks or land in catch-all domains that should be segmented separately.

---

## Section 3: Clay Workflow Design

### Clay Architecture Basics

Clay operates on a table-based model. Each row is a lead. Each column is a data field. Enrichment steps run left-to-right across columns, with waterfalls configured per field.

**Core Clay concepts:**

| Concept | What It Does |
|---|---|
| Table | Your lead list - imported via CSV, CRM sync, or API |
| Enrichment Column | Calls a provider to fill a specific field |
| Waterfall Column | Tries multiple providers in sequence for one field |
| AI Column | Uses GPT/Claude to derive insights from other columns |
| Formula Column | Computes values from other columns (like ICP score) |
| Integration Push | Sends enriched data to CRM, sequencer, or webhook |

### Credit Consumption Guide

Clay charges credits per enrichment action. Budget carefully.

| Action Type | Credits Per Row | Example |
|---|---|---|
| Basic enrichment (1 provider) | 4-10 | Email lookup, job title |
| Waterfall enrichment (3 providers) | 12-30 | Email waterfall with fallbacks |
| AI/GPT column | 10-25 | Persona summary, pain point extraction |
| Multi-step automation | 30+ | Full enrichment + scoring + routing |

**Credit math:** 1,000 leads at 25 credits/lead = 25,000 credits. Starter plan handles that in 12.5 months, Explorer in 2.5 months, Pro in 0.5 months. Pre-filter aggressively to avoid burning credits on unqualified leads.

### Clay Pricing (2026)

| Plan | Price/Mo | Credits/Mo | Per Credit |
|---|---|---|---|
| Free | $0 | 100 | N/A |
| Starter | $149 | 2,000 | $0.075 |
| Explorer | $349 | 10,000 | $0.035 |
| Pro | $800 | 50,000 | $0.016 |
| Enterprise | Custom | Custom | Custom |

### Sample Clay Table Structure

Build your enrichment workflow in this column order:

```
Col A: Company Domain        (input)
Col B: Contact Name          (input or enrichment)
Col C: LinkedIn URL          (Apollo waterfall)
Col D: Verified Email        (email waterfall: Apollo > Hunter > FindyMail)
Col E: Job Title             (Apollo or ZoomInfo)
Col F: Employee Count        (Clearbit or Clay built-in)
Col G: Industry              (Clearbit or Clay built-in)
Col H: Tech Stack            (BuiltWith via Clay)
Col I: Bombora Surge Score   (Bombora integration or manual import)
Col J: Firmographic Evidence (values, sources, dates, conflicts)
Col K: Technographic Evidence (verified H plus source/date)
Col L: Intent Evidence       (native I plus dated hiring/funding events)
Col M: Model Handoff         (separate fit and intent; configured model/version)
Col N: AI Personalization    (AI column: generate first-line based on B, E, H)
Col O: Review Status         (pending scoring/suppression/authorized execution)
```

### Credit Governance Rules

1. **Pre-qualify before enriching** - domain check + firmographic filter before spending on email waterfall
2. **Cap per campaign** - no single campaign burns more than 40% of monthly credits
3. **Alert at 75%** - Slack/email alert when usage crosses 75% of monthly allowance
4. **Audit weekly** - credits spent vs. leads enriched vs. leads qualified (target >60% qualification)
5. **90-day re-enrichment** - re-enrich stale contacts before including in new campaigns

---

## Section 4: Contact Verification Pipeline

Unverified cold email lists carry 10-30% invalid addresses. Sending to bad addresses destroys sender reputation within a few campaigns. Google, Yahoo, and Microsoft now enforce bounce rates under 2% and spam complaints under 0.3%.

### Verification Pipeline Steps

| Step | Check | Action | Cost |
|---|---|---|---|
| 1 | Syntax validation | Remove malformed addresses (missing @, double dots) | Free |
| 2 | DNS/MX lookup | Verify domain has valid mail server | Free |
| 3 | SMTP verification | Confirm mailbox exists at provider | Provider-based |
| 4 | Catch-all detection | Flag domains that accept all addresses | Provider-based |
| 5 | Role account check | Flag info@, support@, admin@, sales@ | Provider-based |
| 6 | Confidence scoring | Assign final deliverability score | Computed |

### Confidence interpretation

Provider confidence scales are not interchangeable or proof of consent, eligibility or inbox placement. Retain provider, verification date and native result. Use validated provider-specific thresholds; ambiguous or catch-all results remain unverified and require review or re-enrichment. Invalid addresses are excluded. A high confidence score alone never authorizes a send or sequence enrollment.

### Catch-All Domain Handling

Catch-all domains accept every email sent to them, even addresses that do not exist. They create silent deliverability decay because campaigns appear sent but never reach decision-makers.

**Rules for catch-all addresses:**

- Never mix catch-all addresses into your primary sending pool
- Send catch-all segments from a separate sending domain
- Limit to 20-50 catch-all sends per domain per day
- Track reply rates separately; if reply rate drops below 1%, stop sending to that domain
- Re-verify catch-all addresses every 30 days

### Verification Tool Comparison

| Tool | Verification Method | Catch-All Detection | Bulk Speed | Pricing |
|---|---|---|---|---|
| MillionVerifier | SMTP + proprietary | Yes | 1M/hour | $0.0005/email |
| ZeroBounce | SMTP + AI scoring | Yes | 100K/hour | $0.008/email |
| NeverBounce | SMTP + real-time API | Yes | 50K/hour | $0.008/email |
| DeBounce | SMTP + disposable detect | Yes | 500K/hour | $0.001/email |
| Bouncer | SMTP + toxicity check | Yes | 200K/hour | $0.005/email |

### Deliverability Protection Checklist

Before sending any enriched list to outreach:

- [ ] All emails verified within the last 7 days
- [ ] Bounce rate on verification under 2%
- [ ] Catch-all addresses segmented into separate pool
- [ ] Role accounts (info@, support@) removed or deprioritized
- [ ] Sending domain has SPF, DKIM, and DMARC configured
- [ ] Sending domain warmed for at least 14 days
- [ ] Daily send volume does not exceed 50 per inbox per day (cold)
- [ ] Spam complaint rate on prior campaigns under 0.3%

---

## Section 5: Performance Benchmarks

### Expected Conversion Lift from Enrichment

| Metric | Before Waterfall | After Waterfall | Improvement |
|---|---|---|---|
| Email coverage rate | 55-65% | 85-95% | +30-40% |
| Email bounce rate | 7-15% | <2% (verified) | -70-85% |
| Connect rate (cold call) | 4-6% | 8-12% | +80-100% |
| Pipeline generated | Baseline | +37% | Significant |
| Meeting-to-customer conversion | Baseline | +27% | Significant |
| MQL-to-SQL rate (with intent) | 8-12% | 15-25% | +80-100% |

### Cost-Per-Verified-Lead Benchmarks

| Approach | Cost Per Lead | Coverage | Quality |
|---|---|---|---|
| Single provider (Apollo) | $0.05-$0.15 | 60% | Medium |
| Two-step waterfall | $0.15-$0.35 | 78% | Medium-High |
| Three-step waterfall | $0.30-$0.60 | 88% | High |
| Full waterfall + verification | $0.50-$1.00 | 92% verified | Very High |
| Full waterfall + intent scoring | $1.50-$3.00 | 92% + scored | Premium |

### ROI Calculation Framework

```
Cost:  Clay Pro ($800) + Apollo ($99) + FindyMail ($49) + MillionVerifier ($25) = $973/mo
Yield: 2,000 enriched > 1,840 verified (92%) > 1,012 ICP-qualified (55%)
       > 30 meetings (3%) > 12 opps (40%) > 3 closed-won (25%) at $15K ACV = $45K/mo
ROI:   $45,000 / $973 = 46x
```

Adjust conversion rates for your actual pipeline. The framework matters more than the sample numbers.

---

## Section 6: Compliance

### Compliance by Region

| Requirement | US (CAN-SPAM/CCPA) | EU (GDPR) | UK (UK GDPR) |
|---|---|---|---|
| B2B email consent | Opt-out model | Legitimate interest | Legitimate interest |
| Data source docs | Recommended | Required | Required |
| Right to erasure | CCPA: Yes | Required | Required |
| Data retention | Disclosure required | Define and enforce | Define and enforce |

### Provider Notes

- **Dropcontact** generates contacts algorithmically without a database (GDPR-native)
- **Apollo, ZoomInfo, Clearbit** are compliant as platforms; you own your usage basis
- **Clay** is compliant, but third-party providers accessed through Clay may not be. Verify each.
- **Bombora** cooperative data is compliant; downstream outreach must follow local regulations

### Safe Enrichment Practices

1. Document your legal basis (legitimate interest for B2B is standard)
2. Track which provider sourced each contact
3. Honor opt-out and erasure requests within 30 days
4. Do not enrich or contact individuals who have previously opted out
5. Review provider DPAs annually

---

## Quick Reference

### Decision Framework: Which Waterfall to Build

```
Budget < $200/mo?
  -> Apollo free + Hunter free + Snov.io ($39)
  -> Manual verification with MillionVerifier

Budget $200-$1,000/mo?
  -> Clay Starter ($149) + Apollo Starter ($99) + FindyMail ($49)
  -> Automated waterfall in Clay

Budget $1,000-$5,000/mo?
  -> Clay Explorer ($349) + Apollo + ZoomInfo ($833/mo at $10K/yr)
  -> Full waterfall + intent scoring + Clay AI columns

Budget > $5,000/mo?
  -> Clay Pro ($800) + ZoomInfo + Bombora + Clearbit
  -> Enterprise waterfall + real-time intent routing + full automation
```

### Enrichment Checklist (Pre-Campaign)

1. [ ] Import leads to Clay or enrichment platform
2. [ ] Pre-filter: remove invalid domains, wrong industries, wrong geo
3. [ ] Run waterfall: primary > secondary > tertiary > LinkedIn
4. [ ] Verify emails using documented provider-specific results and dates
5. [ ] Segment catch-all addresses into separate pool
6. [ ] Keep fit and intent evidence separate
7. [ ] Hand off to the configured account-tier-scoring model with provenance
8. [ ] Require suppression and authorized execution checks before any outreach
9. [ ] Push enriched data to CRM with source attribution
10. [ ] Set re-enrichment reminder at 90 days

### Key Metrics to Track

| Metric | Target | Frequency |
|---|---|---|
| Email coverage after waterfall | >85% | Per batch |
| Verified email rate | >90% of found | Per batch |
| Bounce rate on sends | <2% | Per campaign |
| ICP qualification rate | >50% of enriched | Per batch |
| Credits per qualified lead | <50 credits | Monthly |
| Cost per verified lead | <$1.00 | Monthly |
| Enrichment-to-meeting rate | >2% | Monthly |

---

## Questions to Ask

- What CRM do you use? (HubSpot, Salesforce, Pipedrive, other)
- How many leads per month need enrichment?
- What is your average deal size? (determines justified spend)
- Which enrichment providers do you already pay for?
- Are you selling in the US, EU, or globally? (compliance implications)
- What outreach tool sends the emails?
- Do you have intent data today?
- What is your current email bounce rate?
- Who owns enrichment operationally? (RevOps, Growth, Sales?)
- One-time list building or ongoing continuous enrichment?

---

## Related Skills

- **ideal-customer-profile** - Define the ICP that enrichment scores against. Start here if ICP is undefined.
- **cold-email** - Use enriched data in personalized cold email sequences. Enrichment feeds outreach.
- **ai-sdr** - Automate SDR workflows that consume enriched, scored leads.
- **gtm-engineering** - Build the technical infrastructure (APIs, webhooks, CRM integrations) that connects enrichment to the rest of the stack.
- **solo-founder-gtm** - Budget-optimized enrichment for founders doing their own outbound.
