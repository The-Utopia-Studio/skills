---
name: product-truth-guardrail
description: "Use before writing a pilot proposal, investor deck, customer-facing architecture doc, technical positioning, or scientific/technical paper for a product still in active development — anywhere claims need to stay strictly bounded to what's actually been demonstrated. Also use when the user says things like \"don't overclaim,\" \"what can we actually say,\" \"is this validated or just proposed,\" \"separate tested from proposed,\" \"claims register,\" \"before this goes to [a customer/investor/technical reviewer],\" or asks to audit existing product materials for contradictions or overclaiming. Creates and maintains `.agents/product-truth.md` — a project-local document (never committed to a shared, forkable, or publicly-reviewed repository) capturing what's CURRENT / DEMONSTRATED, PILOT / TO VALIDATE, PROPOSED, VALIDATION REQUIRED, or FUTURE / NOT PROMISED — and requires every downstream artifact (sales material, technical docs, customer proposals, papers) to be checked against it before generation, not written from memory or optimism. Not a QA or testing tool; it doesn't validate claims itself, it stops unvalidated claims from being stated as validated."
metadata:
  version: 1.0.0
---

# Product Truth Guardrail

Early-stage, deep-tech, or technically complex products accumulate claims faster than they accumulate evidence: a demo becomes "tested," a proposed architecture becomes "the architecture," a script's own success message becomes "attack detected." Each overstatement feels small in the moment. Compounded across a pilot proposal, a sales deck, and a technical paper, they produce a story that falls apart under a technical reviewer's first question. This skill exists to catch that drift before it happens — not to fix it after a customer, investor, or reviewer has already seen it.

## The document this skill manages

`.agents/product-truth.md`, in the user's own project. **Never inside a shared, forkable, or publicly-reviewed repository** — if the product's code lives in a multi-tenant marketplace, an open-source repo, or anywhere with external reviewers, product-specific claims and unresolved internal decisions don't belong there. A generic pattern (this skill) can live in a shared location; the product-specific content it manages cannot.

## When NOT to use

- The product is already shipped, in production, with real usage data — this skill is for the gap between "we built something" and "we can prove what it does," not a permanent claims-tracking system for a mature product.
- As a substitute for actual QA, testing, or validation. This skill stops unvalidated claims from being *stated* as validated. It does not validate anything itself.

## Workflow

### Step 1 — Check for an existing document

Look for `.agents/product-truth.md`. If it exists, read it in full before doing anything else in this session that touches the product.

**If it exists:** summarize its current claims register and unresolved decisions back to the user, then proceed to whatever task prompted this skill — informed by, and bounded by, what's recorded.

**If it doesn't exist:** first read [`references/template.md`](references/template.md) in full — it defines the exact section structure and canonical status vocabulary both paths below must produce. Do not draft from memory of this skill's description; use the template itself. Then offer to draft one. Two paths:
1. **Auto-draft from available material** (recommended when there's existing code, docs, test results, or prior conversation to draw from): read what's available, draft a first pass following `references/template.md`'s section structure, then interview the user on gaps and corrections — never invent a claim's status; if evidence for a claim isn't visible in what you read, ask, don't assume.
2. **Start from scratch**, section by section, conversationally, filling in `references/template.md` directly rather than reinventing its structure.

### Step 2 — The sections every product-truth document needs

1. **Product identity** — a one-sentence and a one-paragraph description.
2. **Core problem** the product addresses.
3. **Product boundary** — what it is, and what it explicitly is not or never does. If the product is one of several related offerings, state plainly that it's independent and must not be merged with, described as part of, or scored/correlated alongside the others in any generated content.
4. **Current capabilities** — CURRENT / DEMONSTRATED only. Be strict here: "we ran this once, informally" and "this is production-validated" are different claims: label accordingly.
5. **Tested implementation/architecture**, if applicable — what was actually run, and an explicit "proves / does not prove" split for each test. A test proving a data-transport path works is not evidence the analysis at the other end works — call out exactly what a given test does and doesn't establish, don't let a single successful run cover a broader claim.
6. **Proposed/future architecture**, if applicable — clearly and permanently labeled, never merged into the tested-architecture section even in later revisions.
7. **Claims register** — a table: claim / status / evidence / safe external wording. This is the section every other artifact gets checked against.
8. **Forbidden claims** — an explicit list of things that must not be said because no evidence exists yet (validated accuracy or performance figures, production-readiness, attribution/intent-style claims if relevant to the domain, anything the team has been tempted to say but can't support).
9. **Methodology/technical references** — pointers to underlying docs, code, or other skills, with an explicit note on how mature each is and whether they've been reconciled with each other. If two technical descriptions of "how the product works" exist and disagree, record that disagreement here rather than picking one silently.
10. **Known unresolved decisions** — listed explicitly, each with what would need to be true to resolve it. Don't let a task "helpfully" resolve one of these on its own initiative.
11. **External positioning** — problem statement and value proposition, kept consistent with the claims register (i.e., positioning language should never claim more than the register supports).
12. **Content-generation rules** — the four rules below, included verbatim, every time.

### Step 3 — The four anti-drift rules (always included verbatim, never softened)

1. **Never convert "tested" into "validated production capability."** A demonstration of one thing is not evidence of a stronger, related claim — tested data-collection is not validated detection; a working prototype is not a production system.
2. **Proposed architecture must never be presented as deployed architecture**, in any document, for any audience, including internal ones.
3. **Simulated, synthetic, or self-reported test results must never be presented as validated real-world performance.** A script's own log or console output is not independent evidence — check it against what the code actually does before repeating its claim.
4. **Methodology or design documentation must not be described as live, running system behavior** until that mapping is explicitly confirmed and recorded in the claims register.

### Step 4 — Before generating any downstream artifact

Before drafting sales material, technical documentation, a customer proposal, an investor deck, or a scientific/technical paper for this product: read `.agents/product-truth.md` in full. Do not state anything above the status recorded in its claims register. If the task needs a claim the document doesn't cover, stop and ask the user — do not infer a status or round PROPOSED up to CURRENT because the surrounding content reads better that way.

### Step 5 — Keeping it current

When new evidence changes a claim's status — something moves from PROPOSED to CURRENT because it was actually built and tested — update the document and log the change with a date in a provenance section. Don't silently overwrite the old status; keep enough history that someone can see when and why a claim changed, the same way the claims register itself should be traceable to evidence, not assertion.

## Gotchas

Anticipated, not yet observed in real use — replace with real ones as this skill is used:

- This skill is easiest to invoke at the *start* of a task. If it's invoked partway through — after some overclaiming language has already been drafted — it still needs to intervene on what's already written, not just gate what comes next.
- A user under deadline pressure may push back on a `VALIDATION REQUIRED` label reading as too cautious for a sales-facing document. Hold the line — the label describes reality; the sales writing can be confident *about what's actually true* without inflating the status.
- When a product has multiple competing technical descriptions of how it works (different authors, different documents, different levels of rigor), the instinct is to reconcile them into one clean story. Resist that here — record the disagreement in Section 9 explicitly rather than silently picking the more impressive-sounding one.
- The document can go stale if nothing prompts a revisit. Encourage checking the "last updated" date against recent product changes whenever this skill is invoked, not just when someone remembers to update it.

## What good looks like

**Mediocre:** a positioning doc that says "production-ready" or "validated" because that's what reads well in a deck, with no claims register backing it up, and no distinction between what was tested and what's proposed.

**Strong:** every claim in customer-facing material traces to a specific row in the claims register; "proposed" architecture is visually and textually distinct from "tested" architecture everywhere it appears, including in slide decks; unresolved decisions are named rather than smoothed over; and a technical reviewer reading the claims register and the customer deck side by side finds no claim in the deck that the register doesn't support.
