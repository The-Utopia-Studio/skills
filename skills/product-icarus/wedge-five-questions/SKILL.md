---
name: wedge-five-questions
description: Pressure-test ONE proposed wedge against five pass/fail thresholds (standalone value, forced cadence, travel, structural expansion, scoreable adoption) and return a 5-row verdict that calls it a real wedge only on 5/5. Fires on "is this a wedge", "is my wedge sharp enough", "what's my wedge", "the smallest thing that forces adoption", "will this actually get adopted". Not for defensibility over years (use moat-design-canvas), not for scoring the whole idea across eight dimensions (use problem-quality-scorecard), not for the one-glance so-what gut check (use so-what-stress-test).
type: generator
supersedes: none
---

## What it does

Takes one proposed wedge and forces a binary verdict: real wedge, or a feature in a wedge costume. It runs the wedge through five thresholds, each with a hard pass bar, each demanding observed behaviour or money over opinion. The output is a 5-row table (question, threshold, evidence, pass/fail) and one overall verdict. The verdict is `AND` across all five: 4/5 is not "almost a wedge," it is a NO. For every failing row the skill names the single change that would flip it. This compresses the decision "should I build this first?" into evidence a fellow can hold up in a room.

## The Icarus reframe

A wedge is not the small first feature; it is the smallest thing whose adoption and spread are forced by the user's own workflow rather than by you. This skill refuses the usual soft "wedge score" and runs a hard `AND` across five thresholds — standalone value, forced cadence, travel, structural expansion, scoreable adoption — so passing four and failing one still returns NO, because a wedge that needs your reminders to get used or your pitch to spread is a feature in a wedge costume. Every threshold must clear on observed behaviour or money moved; a threshold argued from opinion is scored as failed.

## When to use / When NOT

Use when a fellow has one concrete candidate for the first thing to build and wants to know if it will pull its own adoption. Trigger phrases: "is this a wedge", "is my wedge sharp enough", "what's my wedge", "the smallest thing that forces adoption", "will this actually get adopted".

Do not use when:

| Request | Belongs to |
|---|---|
| "How do we stay defensible over three years / build the moat" | `moat-design-canvas` (sibling in this section; defensibility over time, not first-adoption). Reference it, do not rebuild it here. |
| "Score the whole idea across its dimensions" | `problem-quality-scorecard` (8 dimensions; wedge sharpness is only one). This skill zooms all the way into the wedge with five distinct thresholds. |
| "Give me the one-glance so-what" | `so-what-stress-test` (its Q3 asks "what's the wedge?" at a glance). This is the deep test that Q3 hands off to. |

Also do not use it to invent a wedge from nothing. If no candidate exists, the input is not ready; say so and ask for the one-sentence wedge (see Method step 1).

## Method

Fill in `template.md`. Five steps.

### Step 1 — State the wedge in one sentence

Force this shape: **who** uses it, on **what recurring trigger**, to get **one output**. If the fellow cannot write it in one sentence, that is the first failure. Name it and ask for the sentence. Do not invent the missing pieces.

Good: "Every Monday a regional planner uploads last week's CSV and gets a ranked list of the 20 SKUs most likely to stock out this week."
Not yet a wedge sentence: "An AI copilot for planners." (No trigger, no single output. That is an engine, not a wedge.)

### Step 2 — Run the five thresholds

Each threshold is pass/fail. The pass bar is baked in below. A row is not a matter of degree; it clears the bar or it does not.

| # | Question | Hard pass threshold | The row auto-fails if |
|---|---|---|---|
| 1 | Standalone value | Delivers the full job **alone in the first cycle**, with nothing else built and no integration live. | First-cycle value depends on a second thing you have not built (pipeline, integration, a later feature). |
| 2 | Forced cadence | Its use is pulled by a **recurring event already in the user's calendar/workflow** (shift start, weekly review, month-end, incident). | Its use depends on *your* reminders, nudges, or emails. If you are the trigger, it fails. |
| 3 | Travel | Its output reaches **≥2 non-users per cadence cycle** (the workflow's own cycle — weekly, month-end, per-shift) as a normal part of the workflow, so it spreads without selling. | The output is seen only by the user, or only by other users. Non-users must be counted. |
| 4 | Structural expansion | Using it **creates a new unmet need the wedge itself cannot satisfy** and your next build does. | The "next thing" is a nice-to-have upsell, not a need the wedge structurally opens. |
| 5 | Scoreable adoption | Adoption is measurable with **one number you already collect** (no new instrumentation). | The metric requires new tracking, or is a vanity count that rises without real adoption. |

### Step 3 — Attach evidence to every row and score it

One cited piece of evidence per row, tagged with its ladder score (see Evidence standard). A row passes only if its evidence scores **≥ 0.5**. Verbal commitment (0.3) and opinion (0.1) cannot pass a row. Questions 3 and 5 (travel, adoption) must be observable, not asserted: someone actually forwarded the output; the number actually exists in your data today. Q4 passes on the **structural gap the wedge creates** — a fact about the workflow that the wedge itself cannot satisfy — not on a user's verbal request for the next feature (a 0.3 ask does not clear the bar).

### Step 4 — Compute the verdict (binary AND)

Real wedge **only if 5/5**. Any fail returns: *not a wedge — a feature in a wedge costume.* Do not average. Do not round up.

### Step 5 — For each fail, name the one change

Write the smallest change that would flip the failing row to pass. If Q2 fails because you are the reminder, the change is "bind it to a trigger the user already keeps." Do not soften the verdict; describe the fix.

**Kill line.** If this skill ever labels something a wedge while any one of the five thresholds is failing, the output is auto-failed. 5/5 is the only path to "real wedge."

## Evidence standard

Every Icarus skill weights behaviour and money over opinion. The ladder:

| Signal | Score |
|---|---|
| Money moved | 1.0 |
| Behaviour observed | 0.7 |
| Artefact shown | 0.5 |
| Verbal commitment | 0.3 |
| Opinion | 0.1 |

A probe's job is to move a claim up this ladder. The bar this skill enforces: **a row passes only on evidence ≥ 0.5** (money, behaviour, or a shown artefact). A row "passed" on "they said they'd use it" (0.3) or "it seems useful" (0.1) is a fail, no matter how confident the fellow sounds. Travel and adoption cannot be scored on intent; they are behaviours you either observed or did not. Tag each empirical claim `[Fact]`, `[Assumption]`, or `[Hypothesis]`. If a row's whole case is `[Assumption]`, it has not passed; it has a test to run first.

## Gotchas

Forced cadence versus a habit you hope to build. If the thing only gets used when you send a Monday reminder, you are the cadence, and Q2 fails. Real cadence is a trigger the user keeps whether you exist or not.

Travel counted among users. Output seen by teammates who also use the tool does not spread the wedge; it decorates it. Q3 counts non-users only. A digest read by two other licence-holders is zero travel.

Adoption metrics that need new instrumentation. "We'll track weekly actives" fails Q5's "already collect" unless you already collect it. If reading the number requires shipping tracking first, the metric is a promise, not a measure.

Expansion mistaken for upsell. "They could also buy our dashboard" is a cross-sell. Q4 passes only when using the wedge produces an unmet need the wedge cannot answer and the next build must — the order list has to go somewhere; the alert has to reach the crew. If the next thing is optional, it is not structural expansion.

Standalone value smuggling in dependencies. "It's valuable once the ERP is connected" fails Q1. Week-1 value must exist with nothing else built. If the value arrives in month two, so does the wedge.

## Examples

`examples/sample.md` — a full worked wedge test on Durian Labs' first workflow (the weekly stockout digest), scored 5/5, with one row that started as opinion and had to be upgraded to observed behaviour before it could pass.

## Related skills

`moat-design-canvas` — the sibling in this section. It handles defensibility once you are adopted; this handles whether you get adopted at all. Run this first, that second.

`problem-quality-scorecard` — scores the whole idea across eight dimensions; wedge sharpness is one of them. When a fellow wants the wide read, send them there. When they want the deep read on the wedge alone, use this.

`so-what-stress-test` — its Q3 asks "what's the wedge?" at a glance and moves on. This skill is where that glance becomes a five-threshold verdict.

Supersedes: none. This is a new skill; there is no prior wedge test in the pack to beat.
