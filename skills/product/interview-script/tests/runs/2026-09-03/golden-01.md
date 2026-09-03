<!-- RUN OUTPUT. skill=interview-script case=golden/01 date=2026-09-03
     Prompt: ./scripts/eval-run.sh interview-script golden/01
     Runner given SKILL.md + the case Input only. Not shown: expected shape, auto-fail list, rubric. -->

# Interview script — why the handover digest gets edited before posting

**Segment:** 6 shift supervisors, pilot site · **Method:** JTBD · **Length:** 30 min · **Date:** next Tuesday

## Before you go in

**Hypothesis:** supervisors edit the digest because its machine ranking is wrong.

**The answer that would kill it:** the edits are *additions* — context the digest
could not have known (a machine just back from service, a stand-in operator, a
job that got re-sequenced upstream). If that is what we hear, the digest's
ranking is fine and the problem is missing input data. Different product, same
symptom.

Listen for which one it is. Do not resolve it in the room.

**Speaking budget:** 30 minutes, target under 6 of them yours. Every question
below is one sentence for that reason.

---

## Opening (2 min)

- "I'm on the team that builds the handover digest. I'm here to learn how you
  actually run a handover — not to show you anything or get feedback on a design."
- "There are no right answers. If the digest is annoying, that's the most useful
  thing you can tell me."
- "Can I record this? It stays with the team." *(if no — take notes, don't push)*
- "Do you still have the full 30 minutes?"

## Warm-up (4 min)

- "Tell me about your shift — when do you come on, and what's the first thing you do?"
- "How long have you been running handovers here?"
- "Who's on the other end of the handover you write?"

## Core: the last handover (16 min)

**The specific instance — start here and stay in it.**

- "Walk me through the last handover you posted. What did you do first?"
- "You pulled up the digest — what did it say?"
- "What did you change before you posted it?"
- "Take me through each change. Why that one?"
- "Was that a change you make most shifts, or was that shift unusual?"

**The edits (this is the whole interview — do not rush it)**

- "Of the things you changed, which one do you change most often?"
- "The last time you *didn't* change something you'd normally change — what happened?"
- "Has a handover ever gone out with something you'd have changed? What happened next?"

**What they know that the digest doesn't**

- "When you reordered those machines, what were you going on?"
- "Where did that information come from — a person, a screen, a piece of paper?"
- "Is that written down anywhere?"

**Cost — asked about time already spent**

- "How long does the editing take you on a normal shift?"
- "What are you doing during that time that you'd otherwise be doing?"
- "Have you built anything of your own to help with this — a list, a note, a
  spreadsheet?" *(if yes: "Can I see it?" — this is the single most valuable
  artefact in the room)*

## Probing (use inside the section above, not as a section)

- "Tell me more about that."
- "Why?" *(gently, up to three times)*
- "Can you give me a specific example?"
- "What happened next?"

## Wrap-up (3 min)

- "Is there anything I didn't ask that I should have?"
- "Who else here should I talk to about this?"
- "Thank you — that was genuinely useful."

**Do not** describe what the team is planning to build, even if asked. If asked:
"I'd rather not bias you — can I come back and show you once we've talked to
everyone?"

---

## Note-taking template

```
Participant: [ID — not name]
Date / shift: [ ]
Years running handovers: [ ]

LAST HANDOVER — what they did, in order:
  1. [ ]
  2. [ ]

EDITS MADE (one row per edit):
  What changed | Why | Every shift or unusual? | Info source
  [ ] | [ ] | [ ] | [ ]

MOST FREQUENT EDIT: [ ]
TIME SPENT EDITING (their number): [ ]
DISPLACED WORK (what the editing costs them): [ ]
OWN WORKAROUND (list / note / spreadsheet — got a copy?): [ ]
INFO THE DIGEST LACKS (specific, not "context"): [ ]
A TIME IT WENT OUT UNEDITED — what happened: [ ]

WHICH HYPOTHESIS: ranking-wrong / data-missing / both / neither
EVIDENCE FOR THAT (quote): [ ]

QUESTIONS THEY ASKED ME: [ ]
NEXT PERSON THEY NAMED: [ ]
```

Fill the template in the room. Every field asks for an action, a number, a
source, or a quote — if you find yourself with nothing to write, ask a follow-up
rather than writing an impression.

---

## One design note, outside this skill's scope

All 6 supervisors are at one pilot site, so anything found here is that site's
handover culture until it replicates. That is a sampling caveat and it belongs in
the research plan — `discovery-interview-prep`, not this script.
