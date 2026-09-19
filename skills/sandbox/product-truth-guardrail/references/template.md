# [Product Name] Product Truth v[N]

**Status:** project-local source of truth. Not committed to any shared/marketplace repository.
**Owner:** [name/email]
**Last updated:** [date]
**Purpose:** the reference every task related to this product — product development, pilot design, architecture, GTM, sales enablement, customer proposals, technical documentation, scientific/technical paper preparation — must consult before generating content, and must not exceed.

This document records what is known, what is proposed, and what remains explicitly unresolved. Its job is to keep those three categories separate, not to resolve them all.

---

## 1. Product Identity

**One-sentence description:** [...]

**One-paragraph description:** [...]

## 2. Core Problem

[The specific problem this product addresses, stated plainly.]

## 3. Product Boundary

[What the product is. If it's one of several related offerings, state independence explicitly: "must never be merged with, described as part of, or scored/correlated alongside [other product]."]

**[Product] never:**
- [explicit list of things it does not do / will not claim — packet-content inspection, identity evaluation, whatever is domain-relevant]

## 4. Current Capabilities — CURRENT / DEMONSTRATED

- [Only what has actually been built and run. Be strict.]

## 5. Tested Implementation / Architecture

```
[diagram or description of what was actually tested]
```

**Proves:** [exactly what this test establishes]

**Does not prove:** [what it doesn't establish — be explicit about the gap between what ran and what's being claimed]

## 6. Proposed / Future Architecture — PROPOSED

```
[diagram or description]
```

Not deployed. [What this represents and what would need to happen to validate it.]

## 7. Claims Register

| Claim | Status | Evidence | Safe external wording |
|---|---|---|---|
| [claim] | one of: CURRENT / DEMONSTRATED &#124; PILOT / TO VALIDATE &#124; PROPOSED &#124; VALIDATION REQUIRED &#124; FUTURE / NOT PROMISED | [what supports this status] | [exact wording safe to use externally] |

## 8. Forbidden Claims

- [Things that must not be said because no evidence exists yet]

## 9. Methodology / Technical References

- [Pointers to underlying docs, code, or skills, each with a maturity/reconciliation note. If two descriptions of "how it works" disagree, record the disagreement here rather than picking one.]

## 10. Known Unresolved Decisions

1. [Decision] — [what would need to be true to resolve it] — [who needs to decide]

## 11. External Positioning

**Problem statement:** [...]

**Value proposition:** [...]

## 12. Content-Generation Rules

Any task producing content about this product — sales material, technical documentation, customer proposals, scientific-paper drafts, GTM material — must consult this document first and must not state anything above the status recorded in Section 7. Four rules apply unconditionally:

1. Never convert "tested" into "validated production capability."
2. Proposed architecture must never be presented as deployed architecture.
3. Simulated or self-reported test results must never be presented as validated real-world performance.
4. Methodology or design documentation must not be described as live system behavior until confirmed.

## 13. Provenance / Disposition Log

- **[date]:** [what changed and why — status updates, artifact dispositions, document creation]
