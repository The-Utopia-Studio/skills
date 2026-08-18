---
name: explicit-vs-tacit-capture
description: Split a body of expertise into the tell-able procedures (explicit) and the show-only judgment (tacit), and flag the tacit half as the defensible product. Fires when a fellow says "what's teachable vs judgment", "codify the expertise", "split explicit from tacit", "which part of our know-how is defensible", "what can we write down vs what's in their head", or "turn our expertise into a product spec". Returns an Explicit/Tacit Ledger: every piece of know-how classified by one test — could a stranger execute it from the words alone? — with the tacit rows scored on the evidence ladder and the moat named. NOT for running the live watch session that observes an unobserved judgment (use tacit-knowledge-interview), NOT for sorting data sources by whether a model can already reach them (use yoda-data-sourcing), NOT for turning captured expertise into a labelled dataset and golden cases (use dataset-builder).
type: generator
supersedes: none
---

## What it does

Takes a body of expertise the fellow already holds — an SOP, a field manual, a scoring rubric, a transcript of an expert talking through past calls, a stream of operator corrections, or a completed tacit-knowledge capture — and runs one test on every piece of it: could a competent stranger execute this from the written words alone, with no judgment, and get the expert's result? Everything that passes is the explicit half. Everything that fails is the tacit half. The output is an Explicit/Tacit Ledger that files each item on one side or the other, splits the rules that hide a judgment inside them, scores every tacit row on the evidence ladder, and names the tacit column as the defensible product. The explicit column is real and useful and worth nothing as a moat, because a model plus your published SOP already reproduces it.

## The Icarus reframe

A manual is what a competitor can buy; the expert's judgment is what they cannot. Most "codify the expertise" projects write down everything the expert can say and then ship the commodity, because everything say-able is copy-able. This skill inverts that: it treats say-able as the disqualifier. Run the tell-a-stranger test on each piece of know-how — everything that executes identically from the words is the explicit half, and a foundation model with your SOP already has it. What fails the test is the tacit half, the calls cued by something perceptible that no rule captures, and that half is the entire moat. Filing a judgment call as an explicit step is the one fatal error, because it buries the defensible product inside the commodity and no one notices it is gone.

## When to use / When NOT

Use it when a fellow has expertise material in hand and needs to know which part is the product. The differentiator is the phrasing: "codify", "what's teachable vs judgment", "split explicit from tacit", "which part of our know-how is defensible", "what can we document vs what's in their head". It works on material you already have or a workflow you can describe in detail; it does not require live observation.

Do not use it for:

| If the fellow wants… | Use instead | Why not this skill |
|---|---|---|
| To sit with an expert and watch the call live to observe an unobserved judgment | `tacit-knowledge-interview` | That runs the watch-30 / replay-20 / edge-cases-10 session to create judgment data by observation; this classifies material you already hold. When this skill marks a tacit row a placeholder (0.1), that skill is how you capture it. |
| To sort candidate data sources by whether a model can already reach them | `yoda-data-sourcing` | That bands data sources R/G/P by reachability; this bands expertise E/T by tell-ability. Tacit judgment is one YODA seam, but the axis is different. |
| To turn captured expertise into a labelled dataset and 20 golden cases | `dataset-builder` | That builds the eval set from captured material; this runs first and decides which expertise is the defensible tacit half worth building a dataset around. |
| To separate a customer's job from the solution they asked for | `jobs-to-be-done` | That separates job from solution on the demand side; this separates procedure from judgment on the expertise side. Absorbed, not the same call. |

If the input names only a domain ("we're experts in X") with no material and no specific expert decision, it is not ready. Say so and ask the one unblocking question (Method step 1). Invent no procedures and no judgment.

## Method

Fill `template.md` as you go. Six steps. The whole method is a classifier plus an honesty check on whether each tacit claim is real.

### Step 1 — Gather the material, name the decision

Name the recurring decision this expertise produces, and confirm you have material to split. Acceptable material: an SOP / manual / checklist, a rubric, a transcript of the expert reasoning through real past cases, a log of corrections, or a completed `tacit-knowledge-interview` capture. If the fellow can only name a domain with no material and no specific decision an expert makes better than a new hire, stop. Ask: *name one recurring decision your expert gets right that a new hire gets wrong, and show me the material — the SOP, the notes, a transcript — or say there is none.* Do not invent the procedure to fill the gap.

### Step 2 — List every piece of know-how, one per row

Pull each discrete item out of the material. Seed from where expertise hides so you do not stop at the obvious steps:

| Seam | What to pull |
|---|---|
| Stated steps | Each numbered step of the procedure |
| Thresholds | Every number, limit, or cutoff ("if > 20, stop") |
| Checks | Every "verify / confirm / inspect" instruction |
| Escalations | Every "if unsure, escalate / flag / ask" |
| Overrides | Every place the expert deviated from the rule in the transcript |
| "It depends" moments | Every hedge — "usually", "unless", "you have to look at" |

One row per item. Do not classify yet.

### Step 3 — Run the tell-a-stranger test on every item

The one test: could a competent stranger execute this item identically from the written words alone, with no judgment, and reach the expert's result?

| Result of the test | Class | Meaning |
|---|---|---|
| Yes — the words fully specify it | **E — explicit** | Tell-able. A competitor can read it. Commodity. |
| No — correct execution needs a perceptible cue no rule captures | **T — tacit** | Show-only. Learned by doing. The moat. |
| It reads like a rule but the expert sometimes overrides it | **split** | Not a class — an instruction. See below. |

The trap is the third row. A rule that looks explicit ("escalate if the reading looks off", "use the appropriate threshold", "assess overall posture") hides a judgment inside it. Do not file the whole item as E. **Split it into two rows**: the rule that survives (E) and the override cue (T). Item 3 becomes 3a (rule, E) and 3b (override cue, T). Never leave the override folded inside an E row — that is the one fatal error this skill exists to prevent. Probe each stated rule with "and when do you not?" until you know whether a T half falls out.

### Step 4 — For each T row, surface the cue and the condition

A tacit row is only captured when you can name the perceptible thing the expert reads and the condition that flips the rule. Fill both:

- Cue: the observable signal — a trend, a rate of change, a number, a face, a sound, a "this looks off". Not "experience".
- Condition: the "it depends" — when the rule applies and when it flips.

If the expert can only say "you just know", "gut", or "a feel for it", that is a non-cue. The row is a **placeholder**: you have located the judgment but not captured it. Mark it, and route it to `tacit-knowledge-interview` to observe — do not invent a cue to fill the cell.

### Step 5 — Score each T row on the evidence ladder

Tag whether the judgment was seen, shown, or merely said:

| Rung | Weight | What counts here |
|---|---|---|
| Money moved | 1.0 | The call demonstrably changed a financial outcome (a refusal that prevented a costed incident, a pricing call that won/lost a named deal) |
| Behaviour observed | 0.7 | You have the override in a record — a logged correction, a transcript of the expert doing it, a marked-up case |
| Artefact shown | 0.5 | A thing that carries the judgment — a cheat-sheet, an annotated form, a decision the expert wrote down |
| Verbal commitment | 0.3 | The expert recited the rule but you have not seen it applied |
| Opinion | 0.1 | A generalisation — "you develop a feel for it". A non-cue. |

**The 0.5/0.7 line on written records:** a document that *records a past decision already made* (a filed report, a sign-off, notes written after the call) is an artefact (0.5) — it narrates the judgment after the fact. *Observing the decision made live*, or a contemporaneous log of the override as it happens, is behaviour (0.7). Recording a decision is not the same as observing one; a write-up of what the expert *would* do is not behaviour at all.

A T row counts as a **captured moat piece** only at **≥ 0.5** (observed, or shown in an artefact). Below that it is a placeholder — real judgment, located but not yet captured. **Captured requires both gates: a named cue and condition (Step 4) *and* ≥ 0.5 evidence (Step 5).** If they disagree — a named cue resting on only 0.1 opinion, or ≥ 0.5 evidence whose cue is still "you just know" — the row is not a moat piece; it is a tacit placeholder, routed to `tacit-knowledge-interview` to observe the missing cue or lift the evidence. Tag every claim `[Fact]` / `[Assumption]` / `[Hypothesis]`.

### Step 6 — Flag the moat, assemble the ledger

Fill the ledger in `template.md`. Then write the verdict:

- The **tacit column** (captured T rows, ≥ 0.5) is the defensible product. Name the one load-bearing tacit judgment — the call whose transfer moves the most value, the one a new hire or a naive automation gets wrong today.
- The **explicit column** is commodity. State plainly: a model plus your published SOP reproduces this. Automate it, document it for onboarding, do not defend it or price on it.
- The **placeholders** (T rows below 0.5) are the capture backlog. Route each to `tacit-knowledge-interview`.

**Kill line.** If any judgment call sits in the explicit column — an override left folded inside an E row, an "escalate if it looks off" filed as a tell-able step — the split failed. If the output does not flag the tacit half as the moat — treats E and T as equally valuable, or calls the documented SOP the product — it failed. Both are the same mistake: the commodity has swallowed the moat.

## Evidence standard

Behaviour beats narration. A judgment you can see in a record (an override in a correction log, a refusal in a transcript) outranks a rule the expert recited, and both outrank "you get a feel for it". The bar this skill enforces: a T row is a captured moat piece only when scored ≥ 0.5. A tacit claim resting on 0.1 opinion is not the moat yet — it is a pointer to where the moat is, and a task for `tacit-knowledge-interview` to run. Never upgrade a row on the expert's confidence; upgrade it only on a record. Tag every empirical claim `[Fact]` / `[Assumption]` / `[Hypothesis]`. The ledger is done when every item is classed E or T, every pseudo-explicit rule has been split, every captured T row has a perceptible cue and a named condition scored ≥ 0.5, and the verdict names the moat and the commodity distinctly.

## Gotchas

The fat-SOP illusion. A fellow says "it's all documented, there's no judgment left". A long SOP feels explicit, but the judgment did not vanish — it hid inside soft steps: "verify it looks correct", "use the appropriate threshold", "escalate if needed", "assess overall posture". Each of those is a tacit call wearing a rule's clothes. Split every soft step; the buried T half is usually the whole moat.

The reverse illusion: everything called tacit. Some fellows flatter their own expertise and mark everything "it's all judgment, you can't write it down". Often half of it is a plain checklist a stranger executes fine. Run the test honestly both ways — an over-claimed tacit column is as wrong as an over-claimed explicit one, and it hides that most of the work is cheap to automate.

Placeholder mistaken for capture. A T row with a named judgment but only a "you just know" cue is not captured — it is a 0.1 placeholder. Writing "expert intuition" in the cue cell does not make it a moat piece. It stays below the bar until observed. Do not let a confident expert talk a placeholder up the ladder.

Solution in disguise: "we just need to write the SOP." Documenting the procedure captures the explicit half by definition — the tell-able part a competitor can already read. It cannot hold the judgment. If the fellow frames the job as "document everything", name the trap: that ships the commodity and leaves the moat uncaptured. The product is the part that resists the document.

## Examples

See `examples/sample.md` for a full run on Azraq's data-centre risk assessor: the written scoring rubric splits out as the explicit half (a model with the rubric reproduces it), the "which incident patterns predict an outage and when to override the score" judgment surfaces as the tacit moat, two rows resting on "you get a feel for it" are marked placeholders and routed to `tacit-knowledge-interview`, and the load-bearing judgment becomes the one thing the risk product must encode.

## Related skills

- `tacit-knowledge-interview` (section 02, shipped) — the live watch session that observes an unobserved judgment. This skill classifies material you already have and marks which T rows are captured (≥ 0.5) versus placeholders; that skill converts a placeholder into an observed 0.7. Run this to find the moat and the gaps; run that to close the gaps.
- `yoda-data-sourcing` (section 03, shipped) — sorts data sources by model-reachability. A captured tacit column is a P-band moat seed in YODA's map; this skill produces it, that skill places it among the fellow's other proprietary signal.
- `dataset-builder` (section 03) — turns captured expertise into a labelled dataset and golden cases. This runs before it: the tacit column is what a dataset should be built around; the explicit column is not worth labelling.
- `jobs-to-be-done` (`discovery/jobs-to-be-done`) — absorbed, not superseded. JTBD's core discipline is refusing to confuse the job with the solution; this borrows that separation muscle and JTBD's "ask why until the surface statement breaks" to surface the cue hiding inside a stated rule, then inverts the frame from demand-side (customer's job) to supply-side (expert's judgment). Supersedes: none.
