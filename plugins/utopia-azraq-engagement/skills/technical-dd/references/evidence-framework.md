# Evidence Framework

**Shared reference for The Studio's DD process.** This framework is used by both the Technical DD and Investment Memo skills to ensure consistent evidence assessment across workstreams.

---

## Evidence Hierarchy

Rate every claim against this four-level scale. The rating reflects the quality of evidence available to the assessor — not whether the claim is true or false.

| Rating | Definition | Typical Indicators |
|--------|-----------|-------------------|
| **SUPPORTED** | Multiple independent data points confirm the claim | Third-party validation, customer deployments as evidence, published benchmarks, audited metrics, independent testing results |
| **PARTIAL** | Some evidence exists but gaps remain or sources are unverified | Company-provided metrics without independent verification, single data point, evidence covers part of the claim but not all of it |
| **CLAIMED** | Company states it but no independent verification available | Marketing materials, pitch deck assertions, verbal claims in meetings, self-reported metrics without audit trail |
| **UNSUPPORTED** | Claim is made in marketing but contradicted by evidence or completely unsubstantiated | Claim contradicts available data, no evidence of any kind, marketing language with no backing, claims that don't survive basic scrutiny |

### How to Apply Ratings

1. **Start with the claim as stated in company materials.** Quote or paraphrase it precisely.
2. **Inventory all available evidence** — both from uploaded materials and from domain knowledge.
3. **Assess the evidence quality**, not just quantity. One strong third-party validation beats five self-reported metrics.
4. **Assign the rating conservatively.** When in doubt between two levels, pick the lower one. It's better to upgrade later than to give false confidence.
5. **Document the gap.** For anything below SUPPORTED, note specifically what evidence would be needed to upgrade the rating.

### Common Pitfalls

- **Don't conflate plausibility with evidence.** A claim can be perfectly plausible but still CLAIMED if no evidence is provided. "We use microservices" is plausible for any modern startup, but without architecture documentation it's still CLAIMED.
- **Don't double-count.** If the same data point appears in the pitch deck and the corporate profile, it's still one data point from one source (the company).
- **Customer deployments are evidence, not proof.** A live deployment proves the product works to some degree, but doesn't validate specific performance claims, accuracy metrics, or scalability assertions.
- **Absence of evidence is not evidence of absence, but it is a data point.** If a company has operated for 5+ years and has zero patents, that's worth noting even if they might have a trade secret strategy they haven't disclosed.

---

## Risk Severity Definitions

| Severity | Definition | Typical Examples |
|----------|-----------|-----------------|
| **CRITICAL** | Deal-affecting if not resolved | Unsubstantiated core claims, no IP after years of operation, fundamental architecture flaws, missing key technical leadership |
| **HIGH** | Significant concern that affects terms or thesis | Scalability constraints, security gaps, competitive vulnerability from specific named competitors, key person dependency, customer concentration |
| **MEDIUM** | Manageable but needs monitoring | Execution risk, integration complexity, technical debt, long sales cycles, dependency on specific vendors |
| **LOW** | Minor, favorable, or neutral | Market-validated technology choices, geographic diversification, strong hiring signals |

### The Specificity Standard

Every risk must be specific. This is non-negotiable.

**Generic (BAD):**
- "Competitive vulnerability"
- "Security risk"
- "Technical debt"
- "Key person dependency"

**Specific (GOOD):**
- "SITA has 100x resources and already claims full CDM stakeholder coverage, directly challenging EMMA's differentiation in the Tier 2/3 segment"
- "No SOC 2 certification despite processing airline operational data; enterprise customers in regulated markets will require this"
- "NodeJS monolith with no test coverage mentioned; migrating to microservices while maintaining 8 live deployments creates significant execution risk"
- "CTO role is unfilled; the CEO and two full-stack developers are responsible for all ML development, creating bus factor risk on core technical claims"

---

## Assessment Standards

### Tone and Voice

- **Direct and analytical.** No hedging: "it could potentially be argued that..." is banned.
- **Specific over generic.** Name competitors, cite numbers, reference specific materials.
- **Intellectually honest.** If you don't have data, say so. Don't extrapolate.
- **Investor-grade.** This goes to investment committees and co-investors. It must withstand scrutiny.
- **Balanced.** Acknowledge genuine strengths before flagging weaknesses. Accurate assessment, not prosecution.

### Dealing with Insufficient Data

When materials are thin for a given area:

1. **State explicitly what's missing.** "No architecture documentation was provided."
2. **Assess what you can** from indirect evidence (job postings, blog posts, tech stack mentions in marketing materials, open-source contributions).
3. **Flag what a deeper review would require.** "A Phase 2 technical review should include: codebase access, engineering team interviews, and infrastructure audit."
4. **Don't fill gaps with speculation.** It's better to have a clear "INSUFFICIENT DATA" than a confident-sounding assessment built on guesses.

### Valuation Benchmarking (Technical Lens)

The TDD doesn't make valuation calls — that's for the Investment Memo. But the TDD should note when technical reality doesn't match the implied valuation narrative:

- A company raising at "AI platform multiples" but with no evidence of proprietary ML
- A company priced as SaaS but with a services-heavy delivery model
- A company claiming technical differentiation but using a commodity stack with no IP

Note these observations for the deal team without making the valuation judgment.
