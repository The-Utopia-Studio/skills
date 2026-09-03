---
name: summarize-interview
description: "Turns one human interview transcript into a structured summary — background, current solution, what they like, what is broken, key insights, dated action items with owners — organised by job-to-be-done and satisfaction. Fires on \"summarise this interview\", \"here is the transcript from the call\", \"process these interview notes\", \"what did we learn from that customer call\". Requires a real transcript as input. Do NOT fire when there is no transcript and the fellow wants the questions written (use `interview-script`); when the \"interview\" is production behaviour rather than a recorded conversation (use `trace-to-interview` — that recovers the question users answered by acting); when several interviews must be synthesised into one opportunity tree rather than summarised one by one (use `continuous-discovery-engine`); or when the transcript is an expert being shadowed at work (use `tacit-knowledge-interview`)."
---

## Summarize Customer Interview

Transform an interview transcript into a structured summary focused on Jobs to Be Done, satisfaction, and action items.

## Route first

| If the fellow has | Use |
|---|---|
| One recorded human interview transcript | **this skill** |
| No transcript yet — needs the questions | `interview-script` |
| No plan yet — needs who and how many | `discovery-interview-prep` |
| Production logs instead of a conversation | `trace-to-interview` |
| Six summaries and needs one synthesis across them | `continuous-discovery-engine` |
| A shadowing session with an expert | `tacit-knowledge-interview` |

**One transcript in, one summary out.** This skill deliberately does not
synthesise across interviews — that is where patterns get asserted from two
data points. Six summaries are the input to synthesis, not the output of this
skill.

### Context

You are summarizing a customer interview for the product discovery of **$ARGUMENTS**.

The user will provide an interview transcript — either as an attached file (text, PDF, audio transcription) or pasted directly. Read any attached files first.

### Instructions

1. **Read the full transcript** carefully before summarizing.

2. **Fill in the summary template** below. Use "-" if information is unavailable. Replace numeric values with qualitative descriptions if needed (e.g., "not satisfied").

3. **Use clear, simple language** — a primary school graduate should be able to understand the summary.

### Output Template

```
**Date**: [Date and time of the interview]
**Participants**: [Full names and roles]
**Background**: [Background information about the customer]

**Current Solution**: [What solution they currently use]

**What They Like About Current Solution**:
- [Job to be done, desired outcome, importance, and satisfaction level]

**Problems With Current Solution**:
- [Job to be done, desired outcome, importance, and satisfaction level]

**Key Insights**:
- [Unexpected findings or notable quotes]

**Action Items**:
- [Date, Owner, Action — e.g., "2025-01-15, Paweł Huryn, Follow up with customer about pricing"]
```

Save the summary as a markdown document in the user's workspace.

## What good looks like

The summary is good when someone who was not on the call can act on it, and
cannot mistake what the customer said for what you concluded.

- **Every line under "Problems" and "What They Like" traces to something the
  customer actually said.** Quote or near-quote, in their words. If a line is
  your inference, mark it as yours — `[inference]`. The single most damaging
  failure of this skill is a paraphrase that hardens into a finding.
- **Importance and satisfaction are the customer's ratings, not yours.** If
  they did not rate it, write `-` and say it was not asked. Do not infer a
  satisfaction score from tone.
- **Action items are dated and owned.** An action item without a date and a
  named owner is a note, not an action. If the transcript names no owner, the
  owner is whoever is running the discovery — say so explicitly.
- **"Key Insights" holds surprises, not summary.** If a line could have been
  written before the call, it is not an insight. The test: did it change
  anyone's mind?
- **Willingness-to-pay evidence is graded by what it is.** Money already spent
  outranks a stated budget, which outranks "we would probably pay for that".
  Record which one you actually got.

## Gotchas

- **Filling the template with plausible content when the transcript is thin or
  missing.** If the fellow pastes half a call, summarise half a call and name
  what is missing. The instruction to use `-` for unavailable information is
  load-bearing — an invented "Current Solution" line is indistinguishable from
  a real one three weeks later.
- **Compliments recorded as satisfaction.** "This sounds great" is not
  satisfaction with their current solution; it is a reaction to you. It belongs
  nowhere in this template.
- **Silently synthesising across several transcripts.** If the fellow pastes
  three interviews, produce three summaries, not one merged one. Merging hides
  which customer said what, and that is the only thing that makes the summaries
  worth keeping.
- **The example owner name is a placeholder.** The template's example action
  item names a real person from the upstream source. Replace it with someone
  from the fellow's team; never leave it in the output.
- **Anonymisation is not automatic.** Transcripts carry named individuals and
  named accounts. If the summary will be shared beyond the team that ran the
  call, ask whether to use participant IDs before writing full names.

---

*Adapted from [productcompass.pm](https://www.productcompass.pm/p/interviewing-customers-the-ultimate)
(Paweł Huryn), interview summary template. Routing table, evidence-grading and
gotchas added by the studio.*

---

### Further Reading

- [User Interviews: The Ultimate Guide to Research Interviews](https://www.productcompass.pm/p/interviewing-customers-the-ultimate)
- [Continuous Product Discovery Masterclass (CPDM)](https://www.productcompass.pm/p/cpdm) (video course)
