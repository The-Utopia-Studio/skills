---
name: interview-script
description: "Writes the actual words you say in the room — a Mom-Test interview script with warm-up, JTBD core exploration, probing techniques, wrap-up, and a note-taking template. Fires on \"write the interview script\", \"what questions should I ask\", \"give me an interview guide for X\", \"I keep getting compliments instead of answers\". Every question is past-tense and behavioural; the script never pitches. Do NOT fire when the fellow has not yet decided who to interview, how many, or by what method (use `discovery-interview-prep` — that is the research design, and this script is worthless without it); when the expert cannot articulate the judgment and must be watched working instead (use `tacit-knowledge-interview`); or when the interview already happened and a transcript needs synthesising (use `summarize-interview`)."
---

## Customer Interview Script

Create a structured interview script that surfaces real insights, not just opinions. Follows "The Mom Test" principles — ask about their life, not your idea.

## Route first

| If the fellow needs | Use |
|---|---|
| Who to interview, how many, which method — the research design | `discovery-interview-prep` (run it **before** this skill) |
| The questions to ask in the room | **this skill** |
| A transcript turned into structured findings | `summarize-interview` |
| To capture judgment an expert cannot put into words | `tacit-knowledge-interview` (watch-30 / replay-20 / edges-10) |
| Behaviour that is already in the product's logs | `trace-to-interview` |
| The whole discovery cycle facilitated | `discovery-process` |

A script without a research design behind it is a list of good questions
pointed at the wrong people. If the fellow cannot say who they are interviewing
and what decision the research unblocks, say so and route to
`discovery-interview-prep` first — do not fill the gap by assuming a segment.

### Domain Context

Customer interviews are one source in **Stage 1 (Explore)** of continuous discovery. Other sources: stakeholder interviews, usage analytics, data analytics, surveys, market trends, SEO/SEM analysis. The PM needs direct access to users, stakeholders, engineers, and designers — "without proxies." The **Product Trio** (PM + Designer + Engineer — Teresa Torres) should work together on discovery, not just the PM alone.

### Context

You are preparing a customer interview script for research on **$ARGUMENTS**.

If the user provides files (personas, hypothesis lists, product briefs, or previous interview notes), read them first.

### Instructions

1. **Clarify research objectives**:
   - What specific questions does the team need answered?
   - What decisions will this research inform?
   - What assumptions need validation?

2. **Create the interview script** with these sections:

   ### Opening (2-3 min)
   - Introduce yourself and the purpose (learning, not selling)
   - Set expectations: "There are no right or wrong answers. We're here to learn from your experience."
   - Ask permission to record (if applicable)
   - Confirm time available

   ### Warm-Up: Context & Background (5 min)
   - "Tell me about your role and what a typical day/week looks like."
   - "How long have you been doing [activity related to the product area]?"
   - Goal: Build rapport and understand their context

   ### Core Exploration: Jobs to Be Done (15-20 min)

   **Current situation and behavior** (past tense, specific instances):
   - "Walk me through the last time you [did the thing we're exploring]. What happened?"
   - "What tools or methods did you use?"
   - "How long did it take? Who else was involved?"

   **Pain points and frustrations** (observe, don't lead):
   - "What was the hardest part about that?"
   - "If you could wave a magic wand, what would change?"
   - "What have you tried to solve this? What happened?"

   **Desired outcomes** (their words, not yours):
   - "What does 'good' look like for you in this area?"
   - "How would you know if this was working well?"

   **Willingness to pay / priority** (skin in the game):
   - "How much time/money do you currently spend on this?"
   - "Have you looked for a better solution? What did you find?"
   - "What would you give up to have this solved?"

   ### Probing Techniques
   Use these when you hit an interesting thread:
   - **"Tell me more about that"** — opens up any topic
   - **"Why?"** (asked gently, 2-3 times) — gets to root causes
   - **"Can you give me a specific example?"** — moves from opinions to facts
   - **"What happened next?"** — follows the story
   - **"How did that make you feel?"** — captures emotional intensity

   ### The Mom Test Rules
   - Ask about **their life**, not your idea
   - Ask about **the past**, not the future ("Would you use X?" is useless)
   - **Talk less, listen more** — aim for 80/20 split
   - **Never pitch** during the interview
   - Look for **strong emotions** — they signal real pain or delight
   - **Compliments are noise** — "That sounds cool!" tells you nothing

   ### Wrap-Up (3-5 min)
   - "Is there anything I didn't ask that you think is important?"
   - "Who else should I talk to about this?"
   - Thank them for their time
   - Share next steps (if any)

3. **Customize the script**: Adapt questions to the specific product area, persona, and research objectives. Add or remove sections based on the interview length available.

4. **Include a note-taking template**:
   ```
   Participant: [Name / ID]
   Date: [Date]
   Key Jobs: [What they're trying to accomplish]
   Current Solution: [What they use today]
   Biggest Pain: [Their #1 frustration]
   Desired Outcome: [What success looks like]
   Willingness to Pay: [How much they invest / would invest]
   Surprise Finding: [Something unexpected]
   Follow-up: [Next steps]
   ```

Save as markdown. Include both the script and the note-taking template.

## What good looks like

A script is good when a stranger could run it and the transcript would still be
usable — and when it is impossible to answer politely without giving you
something.

- **Every core question is past-tense and about a specific instance.** "Walk me
  through the last time you did X" is a good question. "Would you use a tool
  that did X?" is not a question, it is a pitch with a question mark. If a
  question could be answered "yes, that sounds useful", cut it.
- **The script names what would disconfirm the team's belief.** Write the
  hypothesis at the top and, under it, the answer that would kill it. A script
  that cannot come back negative is a script designed to be passed.
- **Willingness-to-pay is asked about the past, not the future.** "How much do
  you spend on this today" and "what have you already tried and dropped" are
  behavioural. "Would you pay $X" is opinion — worth roughly nothing.
- **80/20 is written in as a structural constraint,** not a hope: the questions
  are short enough that the interviewer's total speaking time is visibly small.

## Gotchas

- **Producing a script when the fellow has no research design.** The most
  common failure. Five brilliant questions asked of the wrong five people
  produce confident garbage. Check who and how many first; route to
  `discovery-interview-prep` if the answer is not there.
- **Compliments get recorded as findings.** "That sounds really useful" is
  noise, and it feels like signal because it feels good. Build the note-taking
  template so there is nowhere to write a compliment down — every field asks
  for a behaviour, a number, or a specific past event.
- **The script drifts into solution validation mid-interview.** Once you
  describe the thing you are building, the rest of the transcript is
  contaminated. If the fellow's real goal is reaction to a prototype, that is
  `usability-test-protocol`, not this.
- **Do not invent the persona or the product area.** If `$ARGUMENTS` is thin,
  ask for the segment and the one decision the research informs. A script
  written against an imagined persona will be run against real people.
- **Recruiting is out of scope here and it is usually the binding
  constraint.** A perfect script and no access to users is still zero
  interviews — that constraint belongs to `discovery-interview-prep`.

---

*Adapted from [productcompass.pm](https://www.productcompass.pm/p/interviewing-customers-the-ultimate)
(Paweł Huryn), interview script structure; Mom-Test principles from Rob
Fitzpatrick, *The Mom Test* (2013). Routing table, disconfirmation requirement
and gotchas added by the studio.*

---

### Further Reading

- [User Interviews: The Ultimate Guide to Research Interviews](https://www.productcompass.pm/p/interviewing-customers-the-ultimate)
- [Continuous Product Discovery Masterclass (CPDM)](https://www.productcompass.pm/p/cpdm) (video course)
