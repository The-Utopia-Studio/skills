---
name: pilot-six-term-sheet
description: Turn a would-be pilot into a six-term paid-pilot sheet — scope, price (paid or prepaid), the signed data-rights clause, success metrics, kill criteria, and conversion terms priced now — and refuse to call anything a pilot unless all six terms are non-empty. Fires on "pilot terms", "structure the deal", "paid pilot", "pilot term sheet", "structure the pilot so it isn't a free trial". Not for brainstorming or validating which revenue model to bet on (that is `monetization-strategy`, exploratory; this commits one basis to price the conversion term now), not for drafting the data-rights legal language (that is `data-rights-clause`, section 06; this carries the clause as term 3 and routes there), not for testing whether the thing will get adopted at all (that is `wedge-five-questions`).
type: generator
supersedes: none
---

## What it does

Takes a fellow's proposed pilot and forces a binary check: a real paid pilot, or unpaid work with a slide deck. It fills a six-term sheet — scope, price, the data-rights clause, success metrics, kill criteria, conversion terms priced now — where every term must be non-empty. The output is the filled sheet plus a 6/6 completeness verdict. The verdict is `AND` across all six: 5/6 is not "almost a pilot," it is NOT A PILOT, and the skill names the empty term. Two terms carry money signals and get a hard bar (price must move, conversion must be a signed number today); the other four must be concrete, dated, and agreed before work starts. This compresses "how do I structure this deal?" into a contract a fellow can sign in a room.

## The Icarus reframe

A pilot is not a free trial and not a demo. It is a priced contract with six terms, and money moving is the only 1.0 on the evidence ladder — the whole reason a pilot exists is to move a claim to the top of that ladder, which a free pilot cannot do. The two terms a fellow will try to skip — a price and a production price agreed today — are the exact two that separate a pilot from a free favour: a free pilot selects for the buyer who never had budget, and "we'll price production after we see results" converts nothing and signals they will not buy. If either is empty, this is not a pilot; call it what it is (a demo, a free POC, a favour) and stop.

## When to use / When NOT

Use when a fellow has one named customer who wants to try the product and needs the deal structured so it produces a real buying signal, not a reference. Trigger phrases: "pilot terms", "structure the deal", "paid pilot", "pilot term sheet", "structure the pilot so it isn't a free trial".

Do not use when:

| Request | Belongs to |
|---|---|
| "Brainstorm 3–5 revenue models for the product and validate willingness to pay" | `monetization-strategy` (exploratory: which model to bet on, tested cheaply). This skill does the opposite — it commits to ONE pricing basis so the conversion term is a signed number today. |
| "Draft the actual data-rights legal clause / the language we put in the contract" | `data-rights-clause` (section 06, forthcoming). This skill carries that clause as term 3 and routes there; it does not write legal language. |
| "Is this even the right first thing to build / will it get adopted?" | `wedge-five-questions` (section 06). A pilot around a non-wedge is a priced dead end. Confirm the wedge first. |

Also do not use it to invent a pilot from nothing. If there is no named customer and no single workflow, the input is not ready; say so and ask for those two things (see Method step 1). Do not fabricate a customer, a number, or a metric to fill the sheet.

## Method

Fill in `template.md`. Six terms, then a completeness verdict.

### Step 1 — Confirm there is a pilot to structure

You need two facts before the sheet is worth filling: a **named customer** and **one workflow** the pilot covers. If either is missing, stop and ask for it. Do not invent them. If the fellow wants the pilot to be free, this is not the skill — a deliberately free demo is a demo; route it out and say why.

Two exits, do not confuse them. If the fellow is asking to **structure a paid deal**, run the six-term binary (Step 2) — an empty term returns NOT-A-PILOT *with the fix*, inside the sheet, so they leave with the deal repaired. If they are describing a **free demo / POC with no intent to charge anyone**, bounce it up front: name it a demo and stop; do not run the binary on something that was never a pilot. Rule of thumb: intent-to-charge → run the binary; no-intent-to-charge → bounce and name it.

### Step 2 — Fill the six terms

Every term must be non-empty. The bar for each:

| # | Term | What it fixes | Non-empty bar (empty = auto-fail the sheet) |
|---|---|---|---|
| 1 | Scope | one workflow, bounded, dated | Names the single workflow, what is explicitly OUT of scope, and a hard start + end date. "Pilot the platform" with no end date is not a scope. |
| 2 | Price (paid or prepaid) | money moves | A currency figure > 0, on a named basis, that moves before or during the pilot — not after, not only-if-it-works. See the price ladder in Step 3. |
| 3 | Data-rights clause | the right to use the workflow exhaust | Names the exhaust the pilot generates, that it compounds with use, and that the clause is signed at pilot #1. Route the actual language to `data-rights-clause` (section 06); do not draft it here. |
| 4 | Success metrics | the pre-agreed pass bar | ≥1 metric with a number and a baseline, measured from data both sides can see, agreed in writing before the pilot starts. |
| 5 | Kill criteria | the walk-away, both sides | The condition(s), a check-point date, and who can pull the plug. Must include a number and a date. |
| 6 | Conversion terms priced NOW | the production price, agreed today | A production figure + basis + the trigger that flips pilot → production, with a signature line dated at pilot signing. "TBD after results" fails this term. |

### Step 3 — Price it against the price ladder (term 2)

A price is not any mention of money; it is money that moves regardless of outcome. Score the proposed price:

| Price form | Ladder | Clears term 2? |
|---|---|---|
| Prepaid in full before kickoff | money moved 1.0 | Yes — strongest |
| Invoiced and collected on a milestone during the pilot | money moved 1.0 | Yes |
| Signed PO / committed spend on net terms, not yet collected | committed, artefact 0.5 | Yes, only if the PO is signed |
| "Pay if it works" — success-contingent, no floor | verbal 0.3 | No — a bet you fund, not a price |
| Free / in-kind / testimonial / logo / exposure | opinion 0.1 | No — not a pilot |

A success-contingent number with no floor fails term 2. The fix is a floor fee that moves regardless, with any outcome bonus stacked on top — never outcome-only.

### Step 4 — Price the conversion NOW (term 6), commit one basis

Conversion is priced at pilot signing, on ONE basis. Pick one; name the reason:

| Basis | Convert on | Fits |
|---|---|---|
| Per-seat / per-user | number of users | team-adopted copilots |
| Per-unit of work (usage) | volume: runs, lines, tickets, permits | variable-volume workflows |
| Per-outcome | the result delivered (incident avoided, hour saved) | when the outcome is cleanly attributable |
| Subscription per site / line / asset | a fixed recurring unit | stable, always-on workflows |
| Transaction fee | % of value flowing through | marketplace / flow products |

Reframe boundary: `monetization-strategy` explores which of these to bet on and tests willingness to pay. This skill does the opposite — it commits to one basis so the conversion price is a signed number today, not an open question. Term 6 also names the **conversion trigger**: which success metric (term 4), at what threshold, flips pilot into production. Without a trigger, "conversion" is a hope.

### Step 5 — Compute the verdict (binary AND across six)

Real pilot **only if 6/6**. Any empty term returns: *not a pilot.* Name the empty term(s) and what they make it instead (a demo, a free POC, unpaid consulting). Do not soften. Do not average.

**Kill line.** If this skill labels something a pilot while any of the six terms is empty, or price is 0 / success-contingent-only, or conversion is deferred, the output is auto-failed. 6/6 with a moving price and a signed conversion is the only path to "real pilot."

## Evidence standard

Every Icarus skill weights behaviour and money over opinion. The ladder:

| Signal | Score |
|---|---|
| Money moved | 1.0 |
| Behaviour observed | 0.7 |
| Artefact shown | 0.5 |
| Verbal commitment | 0.3 |
| Opinion | 0.1 |

The pilot is the instrument that moves a claim to 1.0. A "successful" free pilot proves nothing above 0.3 — they used it and said nice things — because no money changed hands. So the two money terms carry the bar: term 2 (price) must clear money-moved 1.0, or committed 0.5 with a signed PO; term 6 (conversion) must be a signed production price, which is a booked 1.0 commitment for the next stage. A letter of intent, a testimonial, a logo, or "budget next quarter" are 0.3 or below and do not clear either term. Tag each empirical claim `[Fact]`, `[Assumption]`, or `[Hypothesis]`. A term whose whole case is `[Assumption]` (e.g. "they'll probably sign the PO") is not filled; it is a thing to go get signed before the pilot starts.

## Gotchas

The success-contingent "price." "They'll pay $80k if incidents drop 20%" reads like a price but is a bet the fellow funds — if it misses, the vendor ate the cost of the pilot and the buyer risked nothing. It is 0.3, not 1.0, and it fails term 2. A real price has a floor that moves regardless of outcome; put the outcome bonus on top of the floor, never in place of it.

Conversion deferred to "after we prove value." This is term 6 left empty, dressed as reasonable. The buyer with real intent will price production at pilot signing because the pilot is how they justify the spend internally; the buyer who insists on deciding later is telling you they have not decided to buy. Price it now or read the deferral as the answer.

The free pilot for the marquee logo. A big-name customer tempts a fellow to waive price "for the reference." A free pilot selects for the buyer who never had budget, and the reference is worth less than the signal that they would not pay. If they genuinely cannot pay cash, take prepaid credit or a signed conversion price — never zero. Zero is not a discount; it is the absence of the signal the pilot exists to produce.

Data-rights left for the production contract. "We'll sort out data rights when we do the real deal" loses the moat seed: the workflow exhaust generated during the pilot is the compounding asset, and the clause signs at pilot #1 or the right is gone (route to `data-rights-clause`). Term 3 is not bolt-on-able later.

Unbounded scope becomes free consulting. "Pilot the whole platform" with no end date and no OUT-of-scope list has no pass bar; it drifts into months of unpaid customization. Term 1 must name what is out and a hard end date, or the pilot funds the customer, not the other way round.

## Examples

`examples/sample.md` — a full six-term sheet for Mentix's first paid pilot (factory-manager copilot on one plant line), including the fellow's first draft (a free 8-week POC with pricing "TBD") and the two-term upgrade that turns it into a real pilot. Numbers are illustrative test fixtures.

## Related skills

`monetization-strategy` (concept) — the skill this one absorbs and reframes. It brainstorms and validates which revenue model to bet on across the product; this skill commits to one basis so the conversion term is a signed number at pilot signing. Send a fellow there when the pricing model itself is still open; use this when it is time to write the deal.

`data-rights-clause` (section 06, forthcoming) — owns term 3's legal language. This skill flags that the clause must be signed at pilot #1 and routes there; it does not draft the clause.

`wedge-five-questions` (section 06) — confirms the thing being piloted is a real wedge. Run that first; a priced pilot around a non-wedge is a well-structured dead end.

Supersedes: none. This is a new skill; there is no prior pilot-structuring skill in the pack to beat.
