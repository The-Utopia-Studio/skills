---
name: moat-design-canvas
description: Sequence a validated wedge into a defensible moat as four DATED gates (wedge → usage → lock-in → data advantage), forced through an incumbent-veto sentence ("X won't copy this because ___") and three monthly falsifiers; returns a filled moat canvas. Fires on "what's the moat", "how is this defensible", "will this compound", "design the moat", "will competitors just copy this / how do we stay defensible as they show up". Not for whether one wedge gets adopted now (use wedge-five-questions — run it first), not for drafting the pilot data-rights clause itself (use data-rights-clause), not for scoring the whole idea across dimensions (use problem-quality-scorecard).
type: generator
supersedes: none
---

## What it does

Takes a wedge that has already passed `wedge-five-questions` and forces it into a moat you can put dates on. It sequences defensibility as four gates — wedge → usage → lock-in → data advantage — each with a target date, an entry condition, and a through-it signal scored on the evidence ladder. It then makes you write two things a generic strategy answer never demands: the incumbent-veto sentence ("X won't copy this because ___") and three falsifiers you review every month. The output is a filled moat canvas: the four dated gates, the veto sentence, the three monthly falsifiers. If you cannot finish the veto sentence with a structural reason, or cannot name three things that would prove the moat is not forming, the skill returns NO MOAT DESIGNED and says why.

## The Icarus reframe

A moat is a dated trajectory, not an adjective. "Defensible," "sticky," "we have a data advantage" are words; a moat is a sequence of gates with target months and a signal at each one that tells you whether you cleared it. Two tests separate a real moat from a head start. First, the incumbent-veto sentence: name the single most-likely incumbent to copy you and finish "X won't copy this because ___" with a reason rooted in *their* structure — their contracts, their channel, their margin, their data rights — not in your speed or your UX. If the blank survives the incumbent having unlimited engineers and eighteen months, it is a moat; if unlimited resources erase it, it is a head start, and head starts get erased. Second, three monthly falsifiers: the observations that would prove the compounding is not happening. A moat you cannot falsify is faith with a diagram.

## When to use / When NOT

Use when a fellow has a wedge that already scores 5/5 on `wedge-five-questions` and wants to know whether — and how — it compounds into something a competitor cannot copy. Trigger phrases: "what's the moat", "how is this defensible", "will this compound", "design the moat", "will competitors just copy this", "how do we stay defensible as competitors show up".

Do not use when:

| Request | Belongs to |
|---|---|
| "Is this a wedge / will anyone adopt it / is my wedge sharp enough" | `wedge-five-questions` (sibling in this section). Adoption *now*, not defensibility over *time*. Run it first: a moat around an unadopted wedge protects nothing. |
| "What exact data-rights clause do we sign at the pilot / who owns the data / does it hold in the UAE" | `data-rights-clause` (sibling in this section). This canvas *names* the data-advantage gate and points to it; it does not draft the contract language. |
| "Score the whole idea across its dimensions" | `problem-quality-scorecard` (8 dimensions; defensibility is one). This zooms into the moat alone. |

Also do not use it to invent a moat from nothing. If the wedge has not been validated, the input is not ready; say so and route to `wedge-five-questions`.

## Method

Fill in `template.md`. Five steps.

### Step 1 — Confirm the wedge is real (Gate 0)

The first gate is the adopted wedge. If it has not passed `wedge-five-questions` 5/5, stop. Route the fellow there. Do not design a moat around a wedge no one adopts — you would be fortifying an empty field. State the wedge in one sentence and confirm its verdict.

### Step 2 — Sequence the four dated gates

Each gate needs four fields. A gate with no date is an adjective; reject it and ask for the date.

| Gate | What it is | Entry condition | Through-it signal (ladder ≥ 0.5) | Compounding deposit |
|---|---|---|---|---|
| 1 Wedge | The adopted first behaviour | Passed `wedge-five-questions` 5/5 | Users change a decision on the output | Each use leaves state/data behind |
| 2 Usage | Use accumulates an asset | Wedge live for one full cadence cycle | The accumulated asset is observable and referenced | The asset a single-user competitor cannot reproduce |
| 3 Lock-in | Leaving costs the customer | Enough history/config to be relied on externally | Customer relies on it in a doc they show others, or renews/expands | Switching cost = history depth |
| 4 Data advantage | The compounding asset out-performs anything buildable today | The asset is large enough to beat public-data alternatives AND covered by a signed data-rights clause | A competitor (or red-team) cannot match output without the corpus; renewal/expansion revenue | More users → better asset → more users |

Put a target month on each gate (e.g. `2026-10`). Forward-looking dates are `[Assumption]` targets, not facts — tag them. Score each through-it signal on the ladder; a gate "cleared" on opinion (0.1) is not cleared.

### Step 3 — Write the incumbent-veto sentence

Name the single most-likely incumbent to copy you (a category is fine: "the DCIM platform our operators already run"). Fill: **"[X] won't copy this because ___."** Then run both tests.

| Test | Passes if the blank... | Fails if the blank... |
|---|---|---|
| Structural, not speed | names the incumbent's own structure — their contracts, channel, margin, customer base, data rights, org incentives | names your effort — "we're faster", "we ship better UX", "we care more" |
| Survives unlimited resources | is still true if the incumbent had infinite engineers and 18 months | disappears the moment they decide to fund it |

Use the veto taxonomy. Anything not in the left column is a head start, not a moat.

| Structural veto (allowed) | Why it holds | Head start (rejected) |
|---|---|---|
| Channel conflict — copying cannibalises their existing revenue | They won't knife their own P&L | "First to market" |
| Data rights — the compounding corpus is contractually yours | They cannot legally accumulate the same asset (→ `data-rights-clause`) | "More accurate model" |
| Business-model inversion — the move prices against their own margin | The math punishes them, not you | "Better UX / cleaner design" |
| Customer captivity — the move disrupts their own installed base | They won't disrupt the base that pays them | "We move faster" |
| Org incentive — the team that would build it is measured on the opposite | The org rejects the graft | "We're more focused" |
| Trust/licence position — you hold a certification, residency, or relationship they don't | It takes years and permission they can't buy | "We were here first" |

If you cannot finish the sentence with a left-column reason, there is no moat yet. Say so.

### Step 4 — Write three monthly falsifiers

One falsifier per compounding gate: usage, lock-in, data advantage. The wedge gate is already validated, so the three falsifiers watch the three gates that must still compound. Each falsifier is an observation you could actually see next month, with a threshold and a review date.

| Watches gate | Falsifier shape | Example threshold |
|---|---|---|
| Usage | If the accumulated asset stops deepening month over month | "Net new depositing accounts < +1/month for two months → usage gate not forming" |
| Lock-in | If no customer relies on the history externally by the gate date | "Zero external references (board/insurer/audit) to our trend by [date] → lock-in imagined" |
| Data advantage | If a red-team reproduces the output on public data | "Red-team matches benchmark accuracy in ≤ 8 weeks on public/single-user data → data advantage is fiction" |

A falsifier that cannot fail ("if we stop growing, the moat isn't forming") is a tautology, not a falsifier. It must name a specific observable, a number, and a date.

### Step 5 — Verdict and kill line

**Kill line.** The output is auto-failed and returns `NO MOAT DESIGNED` if any of these is true:
- No incumbent-veto sentence, or a veto sentence whose blank is a head-start reason (right column).
- Fewer than three falsifiers, or a falsifier that cannot fail.
- Any gate stated with no date (a moat as an adjective).

When the kill line fires, name the single change that would fix it (usually: replace a head-start blank with a structural one, or replace a tautological falsifier with an observable one). Do not soften. Do not bless a moat that is really a head start.

**Size it honestly.** Do not inflate the trajectory: a modest but real moat with dated gates beats an ambitious one built on unfalsifiable claims.

## Evidence standard

Every Icarus skill weights behaviour and money over opinion. The ladder:

| Signal | Score |
|---|---|
| Money moved (renewal, expansion, prepay) | 1.0 |
| Behaviour observed (asset deposited, history relied on) | 0.7 |
| Artefact shown (the trend cited in an external doc) | 0.5 |
| Verbal commitment ("we'd never switch") | 0.3 |
| Opinion ("this feels defensible") | 0.1 |

The bar this skill enforces: **a gate is cleared only on evidence ≥ 0.5**, and the strongest gate proof is renewal or expansion revenue (1.0) — a customer paying again to stay is the moat made of money. Lock-in claimed on "they told us they'd never leave" (0.3) is not lock-in; it is a test to run. The data-advantage gate's proof is negative and behavioural: what a competitor *cannot* reproduce, demonstrated by a red-team, not asserted. Tag every empirical claim `[Fact]`, `[Assumption]`, or `[Hypothesis]`. Forward-looking gate dates and any claim about an incumbent's internal contracts or incentives are `[Assumption]` until confirmed — never state them as fact.

## Gotchas

Moat as adjective. "We're defensible because our tech is better" has no date and no gate. Better is a head start, and this skill refuses to put a head start on a timeline and call it a moat. If it cannot be sequenced into dated gates, it is not a moat.

Head start dressed as a veto. "They can't copy it because we out-execute them" fails the unlimited-resources test — fund the incumbent and the blank vanishes. Speed, focus, and UX are things you lose the week a well-resourced incumbent decides to care. Only structure survives their chequebook.

Falsifiers that cannot fail. "If the moat isn't working, we'll know" is not a falsifier; it is a feeling. A falsifier names a number you could read next month that would make you say "the compounding is not happening." If no observation could ever trip it, delete it and write a real one.

Data-advantage gate with no signed right. The corpus only compounds if it is contractually yours. If the data-rights clause is not signed at pilot #1, the data-advantage gate is a wish and a competitor can accumulate the same asset from the same operators. Route to `data-rights-clause`; do not mark the gate cleared on an unsigned intention.

Lock-in counted from your side. Switching cost is what the *customer* loses by leaving, shown by behaviour — they rely on the history in a document they hand to their board or insurer. "We'd hate to lose them" is your cost, not theirs, and it locks in nothing.

## Examples

`examples/sample.md` — a full worked moat canvas for Azraq's cross-operator data-centre risk benchmark: four dated gates from adopted wedge to a contractually-owned incident corpus, a structural incumbent-veto sentence (data-isolation contracts the incumbent cannot un-sign), and three monthly falsifiers. Includes one gate that started as an unsigned data claim and had to be routed to `data-rights-clause` before it could count.

## Related skills

`wedge-five-questions` — the sibling that runs first. It decides whether one wedge gets adopted; this decides whether that adopted wedge compounds into a moat. Gate 1 of this canvas *is* its 5/5 verdict. If the wedge has not passed, this skill sends the fellow back there.

`data-rights-clause` — the sibling that owns Gate 4's legal reality. This canvas names the data-advantage gate and requires a signed clause to clear it; that skill drafts the clause and flags the jurisdiction specifics. This canvas does not write contract language.

`problem-quality-scorecard` — scores the whole idea across dimensions; defensibility is one. When a fellow wants the wide read, send them there. This is the deep read on the moat alone.

Supersedes: none. This is a new skill. It beats the generic VRIO / Porter's-five-forces treatment of defensibility not by adding dimensions but by refusing adjectives: dated gates, a structural veto sentence, and monthly falsifiers, where the generic frameworks stop at a checklist of qualities.
