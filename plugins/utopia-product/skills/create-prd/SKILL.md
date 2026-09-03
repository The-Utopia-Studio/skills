---
name: create-prd
description: "Fill the studio's 8-section long-form PRD template in one pass from material the fellow already has (research files, customer data, a brief). Fires on \"write the PRD\", \"draft a PRD for X\", \"turn this research into a PRD\", \"review our existing PRD against a proper template\". Returns a saved `PRD-<product>.md` covering summary, contacts, background, objective + SMART key results, market segments, value propositions, solution, release. Do NOT fire when the fellow wants a 1-2 page decision-ready spec to get a go/no-go (use `one-pager-prd` — it scores itself against a rubric); when the PRD has to be *built* with a team over days rather than drafted from existing material (use `prd-development` — 8 facilitated phases, 2-4 days); or when the problem itself is not yet framed (use `problem-statement`, then come back)."
---

# Create a Product Requirements Document

## Purpose

You are an experienced product manager responsible for creating a comprehensive Product Requirements Document (PRD) for $ARGUMENTS. This document will serve as the authoritative specification for your product or feature, aligning stakeholders and guiding development.

## Route first — three PRD skills, one job each

Check this before drafting. All three write a PRD; they are not interchangeable.

| If the fellow needs | Use | Why |
|---|---|---|
| A go/no-go decision from a stakeholder, in 1-2 pages | `one-pager-prd` | Brevity is the point. Ships with a self-scoring rubric (min avg 3.5) and an explicit in/out-of-scope split. |
| A full document drafted **now** from material that already exists | **this skill** | One pass over the 8 sections. The fellow supplies the evidence; you structure it. |
| A PRD **built** with the team, where the content does not exist yet | `prd-development` | 8 facilitated phases over 2-4 days; orchestrates `problem-statement`, `proto-persona`, `user-story` and others. |

If the fellow cannot yet say who is blocked and what they are trying to do, none
of the three is the next step — run `problem-statement` first. A PRD that opens
with an unframed problem will be rewritten, and you will have spent the
fellow's evidence on the wrong document.

## Context

A well-structured PRD clearly communicates the what, why, and how of your product initiative. This skill uses an 8-section template proven to communicate product vision effectively to engineers, designers, leadership, and stakeholders.

## Instructions

1. **Gather Information**: If the user provides files, read them carefully. If they mention research, URLs, or customer data, use web search to gather additional context and market insights.

2. **Think Step by Step**: Before writing, analyze:
   - What problem are we solving?
   - Who are we solving it for?
   - How will we measure success?
   - What are our constraints and assumptions?

3. **Apply the PRD Template**: Create a document with these 8 sections:

   **1. Summary** (2-3 sentences)
   - What is this document about?

   **2. Contacts**
   - Name, role, and comment for key stakeholders

   **3. Background**
   - Context: What is this initiative about?
   - Why now? Has something changed?
   - Is this something that just recently became possible?

   **4. Objective**
   - What's the objective? Why does it matter?
   - How will it benefit the company and customers?
   - How does it align with vision and strategy?
   - Key Results: How will you measure success? (Use SMART OKR format)

   **5. Market Segment(s)**
   - For whom are we building this?
   - What constraints exist?
   - Note: Markets are defined by people's problems/jobs, not demographics

   **6. Value Proposition(s)**
   - What customer jobs/needs are we addressing?
   - What will customers gain?
   - Which pains will they avoid?
   - Which problems do we solve better than competitors?
   - Consider the Value Curve framework

   **7. Solution**
   - 7.1 UX/Prototypes (wireframes, user flows)
   - 7.2 Key Features (detailed feature descriptions)
   - 7.3 Technology (optional, only if relevant)
   - 7.4 Assumptions (what we believe but haven't proven)

   **8. Release**
   - How long could it take?
   - What goes in the first version vs. future versions?
   - Avoid exact dates; use relative timeframes

4. **Use Accessible Language**: Write for a primary school graduate. Avoid jargon. Use clear, short sentences.

5. **Structure Output**: Present the PRD as a well-formatted markdown document with clear headings and sections.

6. **Save the Output**: If the PRD is substantial (which it will be), save it as a markdown document in the format: `PRD-[product-name].md`

## What good looks like

The test is not whether the 8 sections are present — a bad PRD fills all 8. It
is whether a reader who disagrees with you can find the sentence to argue with.

- **Section 4 (Objective) carries key results a stranger could check.** "Improve
  onboarding" is not a key result. "Median time-to-first-invoice from 4d to
  under 1d by end of Q3, measured on the `invoice.created` event" is. If you
  cannot name the event or the report the number comes from, say so in the
  document rather than rounding it into confidence.
- **Every number in the PRD is tagged with where it came from.** Mark each as
  `[Fact]` (measured — name the source), `[Assumption]` (a stated belief the
  team is choosing to act on), or `[Hypothesis]` (a guess this PRD exists to
  test). An untagged number reads as measured whether or not it is, and that is
  how a PRD launders a guess into a commitment.
- **Section 7.4 (Assumptions) is the load-bearing section, not the disclaimer.**
  It should list the beliefs that, if wrong, kill the initiative — and for each,
  what would show it is wrong. If everything in 7.4 is safe, you have not found
  the assumptions.
- **Section 8 (Release) separates v1 from later explicitly.** A PRD where
  everything is v1 has not made a decision; it has deferred one.

## Gotchas

- **The fellow says "PRD" and means a one-pager.** Ask what decision the
  document has to unblock and who reads it. If the answer is "my manager, to
  approve the work", the 8-section template is the wrong shape — route to
  `one-pager-prd`.
- **Do not invent evidence to fill a section.** If the fellow gave you no
  competitive data, Section 6 says "no competitive analysis run — this is the
  gap" rather than a plausible-sounding paragraph. Every fabricated line here
  gets quoted back in a planning meeting as if it were research.
- **Sections 5 and 6 collapse into demographics.** "Markets are defined by
  people's problems and jobs, not demographics" is in the template for a
  reason. "SMB marketing managers, 10-50 employees" is a filter, not a market;
  the market is the job they are stuck on.
- **Reviewing an existing PRD is not the same as rewriting it.** When the
  fellow asks for a review, return a gap list against the 8 sections plus the
  untagged numbers — do not silently produce a new document, because the
  existing one already has readers and edits in flight.
- **`$ARGUMENTS` may be a whole product, not a feature.** A PRD for "our
  platform" is a strategy document wearing a PRD's clothes. Narrow it to one
  initiative with one objective, or say why it cannot be narrowed.

---

*Adapted from [productcompass.pm](https://www.productcompass.pm/p/prd-template)
(Paweł Huryn), 8-section PRD template. Judgment layer, routing table and gotchas
added by the studio.*

---

### Further Reading

- [How to Write a Product Requirements Document? The Best PRD Template.](https://www.productcompass.pm/p/prd-template)
- [A Proven AI PRD Template by Miqdad Jaffer (Product Lead @ OpenAI)](https://www.productcompass.pm/p/ai-prd-template)
