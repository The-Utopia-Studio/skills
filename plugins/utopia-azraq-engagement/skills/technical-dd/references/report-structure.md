# Technical DD Report Structure — Detailed Specification

This document specifies what goes into each section of the Technical DD report. Every section exists for a reason. If materials are thin for a section, mark it as "Insufficient Data — [what's missing]" rather than skipping it.

---

## 1. Cover Page

Branded cover with:
- Report title: "TECHNICAL DUE DILIGENCE"
- Company name
- One-line company description
- Assessment type: e.g. "Pre-Series A Technical Assessment"
- Prepared for: The Studio — Utopia Capital (or override)
- Date
- Classification: "Strictly Confidential"
- Studio logo

---

## 2. Technical Summary

This is NOT an investment recommendation. It's a technical assessment summary.

Include:
- **Technical Assessment Box**: A colored callout with the overall technical assessment. Use one of:
  - **STRONG** — Technology is well-built, defensible, and scalable
  - **ADEQUATE** — Technology works but has notable gaps or risks
  - **WEAK** — Significant technical concerns that affect the investment thesis
  - **INSUFFICIENT DATA** — Cannot assess; critical materials missing
  
  Include a one-line rationale and the key terms (stage, raise, valuation).

- **Summary narrative**: 2-3 paragraphs covering:
  - What the technology does and what's credible about it
  - The fundamental technical concerns
  - How this technical picture affects the broader investment thesis (without making the investment call)

- **Materials disclaimer**: Explicitly list what was provided vs. what was missing. Always flag gaps — e.g. "Critical materials not available: technical architecture documentation, codebase access, engineering team interviews."

- **Key Technical Metrics table**: 6-10 rows covering metrics like:
  - Tech stack maturity
  - AI/ML evidence level
  - Patents / IP filings
  - Engineering team size
  - Deployment count
  - Uptime / reliability metrics (if available)
  - Code quality indicators (if available)
  - Security certifications

---

## 3. Company Overview

Keep this brief — it's context-setting, not the analysis. The deal team's Investment Memo covers this in depth.

- **Founding & corporate structure**: who, when, where — one paragraph
- **Product suite**: module-by-module table with function, status, and strategic context. Include the product expansion logic if visible (does each module create data/dependency for the next?)
- **Company timeline**: year-by-year milestones (founding through current raise)
- **Current deployments / customer base**: table with client name, location, status, deployment context. Assess concentration and tier distribution.

---

## 4. Technical Architecture Assessment

- **Technology stack table**: Layer-by-layer breakdown:
  - Frontend
  - Backend / API
  - Infrastructure / Cloud
  - Data layer
  - AI/ML (if applicable)
  - DevOps / CI/CD
  - Monitoring / Observability
  
  Each row includes: Technology, Evidence Level (Evidenced / Claimed / Unsubstantiated), and Notes.

- **Architecture patterns**: Monolith vs. microservices vs. serverless? Event-driven? Message queues? API gateway? Assess whether the architecture matches the company's scale and ambitions.

- **Infrastructure & deployment model**: Cloud provider(s), containerization, orchestration, multi-tenancy approach, data residency considerations.

- **Technical differentiation assessment**: Is this a commodity stack anyone could replicate, or is there genuine technical depth? Be specific about what's standard vs. what's novel.

---

## 5. AI/ML Capabilities Assessment

This section exists because most companies overstate AI capabilities. Be rigorous.

- **Claims inventory**: List every AI/ML claim from the marketing materials.
- **Evidence assessment for each claim**: What evidence exists? Rate each.
- **Model deep-dive** (if data available):
  - Model architecture and training methodology
  - Training data: volume, quality, sourcing, labeling approach
  - Performance metrics: accuracy, F1, precision/recall, latency
  - Validation approach: cross-validation, holdout sets, A/B testing
  - Drift monitoring and retraining procedures
  - Comparison against baselines or industry benchmarks
- **The critical question**: Is it real ML, or could a well-tuned rules engine or statistical regression produce similar outputs?
- **AI team composition**: Who built the models? Dedicated data scientists or full-stack developers doing ML on the side?

If no AI/ML is claimed, replace this section with a brief note and skip to the next.

---

## 6. Code Quality & Engineering Practices

Often unassessable without codebase access. If no access was provided, state this clearly and list what you'd look for in a Phase 2 review.

Assess (where evidence exists):
- CI/CD pipeline maturity
- Testing practices: unit, integration, e2e, coverage targets
- Code review process
- Documentation quality
- Release cadence and versioning
- Incident response procedures
- On-call and monitoring setup
- Engineering culture signals (blog posts, open-source contributions, conference talks)

---

## 7. Security & Compliance

- **Data handling**: What data does the platform process? PII? Financial? Health? How is it stored, transmitted, encrypted?
- **Compliance posture**: SOC 2, ISO 27001, GDPR, HIPAA, industry-specific certifications. Which are achieved vs. in-progress vs. not started?
- **Vulnerability management**: Penetration testing, bug bounties, dependency scanning
- **Access controls**: RBAC, MFA, audit logging
- **Regulatory landscape**: What regulations apply to their customers? Does the product help or hinder compliance?

If limited data, list what a Phase 2 security review should cover.

---

## 8. Scalability Assessment

- **Current scale**: Users, transactions, data volume, request rates (if known)
- **Architecture scalability**: Can the system scale horizontally? Vertically? What are the bottlenecks?
- **Database scalability**: Sharding strategy, read replicas, caching layers
- **Cost of scaling**: Does scaling 10x require proportional infrastructure spend, or is there leverage?
- **Multi-tenancy**: How are customer environments isolated? Can they support enterprise customers with specific requirements?
- **Geographic distribution**: CDN, edge computing, regional deployments

---

## 9. Technical Debt & Maintenance

- **Legacy systems**: Any inherited or outdated components?
- **Dependency risks**: Reliance on deprecated libraries, single-vendor lock-in, open-source license risks
- **Upgrade cycles**: How current is the stack? Are they on recent versions of key dependencies?
- **Refactoring needs**: Any acknowledged areas of technical debt? Evidence from job postings, blog posts, or documentation
- **Migration risks**: Anything that would be painful to change (database, cloud provider, core framework)

---

## 10. Technical Team Assessment

- **Team composition table**: Name, role, background, relevance to the company's technical claims
- **Key engineering hires**: Recent additions and what they signal
- **Gap analysis**: Missing roles that undermine the technical thesis. A company claiming "AI-driven" with no CTO, VP Engineering, or data science leadership is a red flag. A company with an ambitious roadmap and a 3-person engineering team is a red flag.
- **Hiring velocity and open roles**: What are they hiring for? Does it match their stated priorities?
- **Team technical depth vs. claims**: Can this team actually build what they say they're building?

---

## 11. Technical Moat & IP

- **Defensibility assessment table**: Rate each moat type with evidence and durability estimate:
  - Proprietary technology
  - Patents / IP filings
  - Trade secrets
  - Proprietary data / data network effects
  - Integration complexity (switching costs)
  - Regulatory barriers
  - First-mover technical advantage

- **IP & patent position**: Number of patents, status (filed/granted/provisional), trade secret strategy, open-source vs. proprietary. Zero patents after 3+ years for a tech company is a flag.

- **Time-to-replicate estimate**: How long and how much for a well-funded competitor to build equivalent capability? Be specific about what's hard to replicate vs. what's commodity.

- **Data moat analysis**: Does the product generate proprietary data that improves over time? Is there a compounding advantage from more customers/usage?

---

## 12. Roadmap Feasibility

- **Roadmap table**: Target date, module/feature, status (in market / in development / planned)
- **Feasibility assessment**: Timeline vs. team size vs. funding allocation. Flag overambitious roadmaps.
- **Dependency chains**: Which roadmap items depend on others? What's the critical path?
- **Resource allocation**: What % of the raise goes to product development? Is it enough for the stated roadmap?
- **Track record**: Has the team delivered on previous roadmap commitments?

---

## 13. Technical Risk Register

**Severity definitions:**
- **CRITICAL**: Deal-affecting if not resolved. Unsubstantiated core technical claims, no IP, fundamental architecture flaws.
- **HIGH**: Significant concern that affects the technical thesis. Scalability constraints, security gaps, key person dependency.
- **MEDIUM**: Manageable but needs monitoring. Execution risk, integration complexity, technical debt.
- **LOW**: Minor or favorable. Market-validated technology choices, strong engineering culture signals.

**Format:**
- Critical risks get individual callout boxes with description and mitigation status
- High risks go in a table: Risk, Severity, Description, Mitigation
- Medium and Low risks: same table format

**The specificity standard**: Risks must be specific, not generic.
- BAD: "Security vulnerability"
- GOOD: "No SOC 2 certification despite processing airline operational data across 8 airports; customer contracts may require this for enterprise expansion"

---

## 14. Evidence Quality Audit

Table format with columns:
- **Claim**: The specific technical claim from company materials
- **Evidence Status**: SUPPORTED / PARTIAL / CLAIMED / UNSUPPORTED (see evidence-framework.md)
- **Notes**: What evidence exists or is missing

This section builds credibility for the entire report. It demonstrates intellectual honesty and gives readers a clear view of where the company's technical narrative is solid vs. aspirational.

---

## 15. What Must Be True

For the technology to support the investment thesis, what technical assumptions must hold?

Table format:
- **Assumption**: What must be true technically
- **Current Evidence**: AGAINST / INSUFFICIENT / MIXED / SUPPORTED
- **Concrete Test**: How to verify this assumption

These are generated from the analysis — never generic. Each assumption should trace back to a specific finding in the report.

Examples of good assumptions:
- "The AI/ML models provide measurable accuracy improvement over rules-based approaches"
- "The platform can deploy at a new site in <3 months without heavy customization"
- "The architecture can support 10x current load without fundamental redesign"

---

## 16. Dispositive Technical Questions

10-15 questions designed to resolve the most critical technical unknowns identified in the analysis. Organized by priority: Critical / High / Medium.

Each question includes:
- **GREEN flag**: What a good answer looks like (specific)
- **RED flag**: What a bad answer looks like (specific)

These should resolve the specific unknowns identified in this TDD, not be generic due diligence questions.

Example:
> **Q: What specific ML models are deployed in production? What are their accuracy metrics?**
> GREEN: Published validation studies, >85% accuracy on predictions, clear methodology.
> RED: Vague answers, "proprietary algorithms," no metrics, outsourced ML.
