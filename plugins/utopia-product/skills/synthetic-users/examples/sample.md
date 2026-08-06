# Worked example — Mentix's copilot positioning

Mentix builds an AI copilot for factory managers. This is a test fixture: numbers and quotes are illustrative, not real client data.

## Input the fellow brought

"We're about to book six plant-manager interviews to test our positioning. Before we spend that, dry-run the message on a synthetic panel. The message is: *'Mentix tells you which alarm to trust, so you never shut the line down for a false alarm again.'* We've got the data — pull a panel and see if it lands."

Corpus on the table (from earlier YODA + tacit work):
- Field-log write-ups from 3 plants, 5 weeks: what managers did when an alarm fired and what happened after. [Fact]
- Shadow threads: the WhatsApp group where shift managers argue about whether an alarm is real before acting. [Fact]
- A `tacit-knowledge-interview` capture of one supervisor's "mute the vibration alarm and keep the line running" judgment — cued by the alarm's *rise rate*, not its level, and with a hard exception: they never override any alarm within an hour of a bearing change. [Fact]

## 0. Corpus check

Real corpus present: field logs, shadow threads, one tacit capture. Panel can be grounded. Proceed.

## 1. Target and kill question

**Pre-testing:** Message.
**The message:** "Mentix tells you which alarm to trust, so you never shut the line down for a false alarm again."
**Kill question:** *A synthetic "no" here would revise the message if a grounded manager can't say back what it does, or reads "trust which alarm" as conflicting with how they already decide.*

## 2. The panel (4, each grounded in a different slice)

| | Who | Grounded in | On record | Known gap |
|---|---|---|---|---|
| A | New shift manager | Field logs — the write-ups where newer managers over-trusted the alarm and stopped the line | Stops the line on most alarms; high false-shutdown rate | Corpus shows what they did, not how they'd read new copy |
| B | Experienced shift manager | Shadow threads — the arguments about whether an alarm is real | Argues it out on WhatsApp before acting; slow to trust an alarm | Their WTP; their boss's view |
| C | Plant supervisor (the judgment holder) | The tacit capture — rise-rate cue + never-override-within-an-hour-of-a-bearing-change exception | Overrides alarms by reading rise rate; has a hard exception around bearing changes | Whether they'd accept a tool making that call |
| D | Plant ops director (economic buyer) | Field logs — the downtime-cost lines after each false shutdown | Cares about line-hours lost to false shutdowns | Procurement process; budget — corpus is silent |

## 3. Pre-test transcript — kill signals only

| Panellist | Response (short) | Signal type | Kept or discarded |
|---|---|---|---|
| A | "Yes! That would save me constantly. I'd use it every shift." | enthusiasm | **Discarded** |
| B | "Sounds useful, I'd try it." | enthusiasm | **Discarded** |
| C | "Trust *which* alarm? It depends on the rise rate, and right after a bearing change I don't trust any of them. If this thing tells me to trust an alarm I'd normally override, I'd ignore it." | confusion + workaround | **Kept** |
| D | "How much line-time does it actually save, in hours? I'd need that number." | flat-ask (not enthusiasm, not a yes) | **Kept** |

## 4. Lie ledger

| Response | Lie that could corrupt it | Transfers to a real user? | Basis |
|---|---|---|---|
| A "I'd use it every shift" | over-agree + never-no-show | No | [Hypothesis] |
| B "I'd try it" | over-agree | No | [Hypothesis] |
| C "trust which alarm? depends on rise rate; conflicts with my override rule" | over-informed (C knows the tacit rule cleanly because the capture is in the grounding) — but the *conflict* is real corpus behaviour | Often — comprehension + a recorded workaround both transfer | [Hypothesis] worth a real check |
| D "give me the hours saved" | over-rationalise (a real director might not ask so tidily) | Direction-only — that the number matters transfers; that they'd ask it this cleanly does not | [Hypothesis] |

The two enthusiastic panellists produced nothing. That is expected, and it is why the run is not a validation.

## 5. Verdict — REVISE, then PROMOTE

**REVISE.** Panellist C, the one grounded in the tacit capture, is the signal. The message says "trust which alarm to trust" as if trust is the manager's problem. For the experienced judgment holder, trust is not scalar — it is a rise-rate read with a hard exception. A copilot that tells them to *trust* an alarm they'd override reads as a tool that doesn't know their rule. The message frames Mentix as overriding the manager's judgment, when the corpus says the value is in *confirming the rise-rate read faster*, not replacing it.

Proposed revision: "Mentix reads the alarm's rise rate the way your best supervisor does — so the line stays up when it should, and stops when it must." Re-run the panel on the revised copy (cheap).

**Then PROMOTE.** The rise-rate-vs-level distinction and the bearing-change exception are exactly what a real interview must probe. Book the six interviews via `interview-script`, but now with a sharper question: does the manager experience the copilot as confirming their read or overriding it? That is the load-bearing question the synthetic screen surfaced — and it would have been invisible if the fellow had read the two "I'd use it every shift" responses as a green light.

## 6. Honesty check

- [x] Every panellist grounded in a named slice
- [x] Every kept response carries a lie tag + transfer call
- [x] Positive signal discarded, not counted
- [x] Verdict is revise → promote
- [x] "Validated" appears nowhere near a synthetic result

## The correction this skill forced

The fellow wanted a green light before spending on six interviews. Two synthetic managers gave an emphatic one, and a generic "role-play a persona" run would have reported "the panel loved it — go." This skill discarded both, because a synthetic yes is over-agree plus never-pay stacked on nothing. The single useful output came from the panellist grounded in the tacit capture: the message collides with how the real judgment is made. The interviews still happen — but now they test the right thing, and the money spent on them buys an answer instead of confirming a machine's flattery.
