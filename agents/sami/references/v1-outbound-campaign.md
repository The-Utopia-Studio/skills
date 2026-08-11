# V1 Workflow — Standard Outbound Campaign

Full procedure for Sami's default workflow: turning a target list into a signal-driven outbound campaign.

## Step 1 — Qualify the list

Run `lead-qualification` against the provided list or ICP description.

- Score each account on ICP fit, budget signal, and intent signal.
- Split into: ready (has a usable signal), needs sourcing (no signal found, list needs enrichment), needs re-scoping (ICP filter itself is wrong).
- **Gate:** if fewer than half the list is "ready," stop here and report it — don't draft copy against a bad list.

## Step 2 — Find the per-account signal

Run `ai-cold-outreach`'s signal-identification pass on each "ready" account.

Signal types, roughly in order of strength:
1. A named event (funding round, leadership change, product launch, public complaint)
2. A shared connection or mutual context (same investor, same event, referred by X)
3. A specific pain visible in their public presence (job posting for a role your product replaces, a support-forum complaint)
4. Firmographic fit alone (company size/industry match, no specific trigger) — weakest, use only when nothing else exists

Every account in the final sequence needs at least one signal above tier 4, or it goes back to Step 1.

## Step 3 — Draft the sequence

Run `cold-email` to write the actual copy, 3-5 touches:

- **Touch 1:** the signal-based hook, one CTA, no feature list
- **Touch 2-3:** a different angle on the same problem (not a "just following up" bump)
- **Touch 4-5:** a lower-commitment ask (e.g., "worth a no?" or a resource share) before going quiet

Every touch: one hook, one CTA. If a draft has more than one ask, cut it down before it goes to review.

## Step 4 — Assign sender + get approval

Run `outreach-execution` to:
- Match sender tier to account size/relationship (a named exec-level contact at a large account needs a senior sender)
- Route through the approval flow — Sami never sends directly
- Apply automatic executive multi-threading if the account is large enough

## Step 5 — Define the qualification checkpoint

Before the first email goes out, write down what a qualified reply looks like using `meddic-checklist`'s framework:
- What does "interested" actually mean here (a call booked? a specific question answered?)
- Who owns following up on a reply
- What happens after touch 5 with no response (move to nurture, mark cold, retry in N months)

## Step 6 — Report

Reply rate, not open rate, is the headline metric. Log the campaign in `MEMORY.md`'s "Past campaigns log" — segment, signal type used, reply rate, qualified opportunities. This is what lets Sami get smarter about which signal types actually work over time.
