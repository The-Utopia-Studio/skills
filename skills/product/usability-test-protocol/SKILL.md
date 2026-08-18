---
name: usability-test-protocol
description: Run a moderated usability session on a working prototype and return findings tied to the screen, not the user. Fires when a fellow says "run a usability test", "watch a user try it", "usability protocol", "can a first-time user complete X", or "see where they get stuck". Product runs, Engineering watches muted, Design notes; the task is framed as a goal not an instruction, the user is kept in user mode (no leading, no explaining, no "do you like it"), and every finding is scored on observed task success (behaviour 0.7), never stated preference (opinion 0.1). Output is a Usability Findings sheet — each defect tied to a step, counted across users, severity by frequency × blocking. NOT for building the prototype (use `first-mocks`; this tests what that builds), NOT for shadowing an expert to capture their judgment (use `tacit-knowledge-interview`; that mines expertise, this tests your design), and NOT for testing demand or willingness to pay (a user can complete every task and still never want it — route to `wizard-of-oz-probe` / `concierge-probe`).
type: interactive
supersedes: none
---

## What it does

Compresses "does the design actually work" into a watched session with real target users. You write each task as a goal in the user's world, hand over the prototype, and go silent while they attempt it. Three people run it: Product moderates, Engineering (the builder) watches muted, Design scribes. The output is a Usability Findings sheet — every defect attributed to the step it happened on, counted across users, ranked by frequency × task-blocking. It scores on what the user did (completed / needed a nudge / failed), not on what they said they liked. It refuses to report preference as a finding, because a usability session cannot honestly observe it.

## The Icarus reframe

Generic usability testing recruits five users, gives them tasks, and notes where they struggle. That much Claude already knows. The Icarus edits are three. First, the builder does not run the session — Engineering watches muted, because the person who placed the button cannot resist explaining it, and one explanation contaminates every task after. Product runs (no ego in the pixels); the builder feels the wall directly instead of discounting it in a report. Second, the finding attaches to the prototype, not the person: "3 of 5 clicked Reports first" is a design fact (behaviour, 0.7), not three confused users. If a target-segment user cannot complete it, the prototype failed — never the user. Third, the session tests observed task success and quarantines opinion. "Do you like it" buys a 0.1 you will be tempted to report; the protocol bans the question and scores completion instead. A user who says "I love this" and fails the task has failed it.

## When to use / When NOT

Use it when you have a working prototype (clickable mock, v1, or the live product), a real target user, and the question is "can they do the job with this." Use it after `first-mocks` has produced something clickable and before you commit build effort to a flow you have not watched anyone use.

Do not use it for:

| If the fellow wants… | Use instead | Why not this skill |
|---|---|---|
| To build the clickable prototype itself | `first-mocks` | That produces the artefact; this runs a session on the artefact it produced. Same afternoon, opposite job. |
| To shadow an expert and extract the judgment they can't articulate | `tacit-knowledge-interview` | That watches an expert do *their* real work to mine *their* expertise; this watches a target user attempt *your* task on *your* prototype to test *your* design. Same verb "watch", opposite object. |
| To test a workflow on paper before it's clickable | `paper-sketch-probe` | That reads legibility and decision-location off a sketch; this measures task completion on a working prototype. |
| To learn if anyone wants it, or would pay | `wizard-of-oz-probe` / `concierge-probe` | A user can complete every task cleanly and still never want the product. Usability says nothing about demand. |
| To route UI craft, visual polish, or interaction design | `impeccable` / `design` | Those improve the prototype; this measures whether the current one works. Do not restate them. |
| To score one signal on the ladder | `evidence-ladder` | That grades a claim; this produces the findings (and uses the ladder to weigh each). |

## Method

Fill `template.md` as you run. The session produces behaviour (0.7 — what they did) plus talk (0.1 — what they said). The scribe's discipline is keeping the two in separate columns and never promoting the second.

### Step 0 — Confirm you can actually run it

You need three things or you have no test. Name them or stop:

| Precondition | Bar | If missing |
|---|---|---|
| A working prototype | Clickable — a mock, v1, or live product they can attempt a task on | No clickable thing → route to `first-mocks` first |
| A real target user | In the segment, not a colleague or founder friend — they read your intent, not the screen | No real user → recruit one; a colleague's run is worth 0.1 |
| A task that is a goal | An outcome in the user's world, never a UI instruction | Only an instruction → rewrite it (Step 2) |

If any is missing, ask the one unblocking question (see Gotchas) and stop. Never fabricate a run log for a session you did not hold.

Scale the session to the flow. Run at the weight of what you are testing — a 3-screen settings change is not a 5-segment study. One real user is a flag; a second turns any wall into a `[Fact]`. Don't force the full ceremony on a trivial flow; the discipline is behaviour-over-opinion, not the head-count.

### Step 1 — Assign the three roles

One prototype, one user at a time, three people running it.

| Role | Who | Job | Forbidden |
|---|---|---|---|
| Runner | Product | Sets the scene, hands over, stays silent, uses only the recovery script | Leading, explaining, defending, soliciting opinion |
| Watcher | Engineering (the builder) | Watches muted; logs where a build assumption broke | Speaking. If the builder speaks, the Runner ends the task |
| Scribe | Design | Logs observed behaviour against the step it happened on | Writing interpretation ("confused") instead of behaviour ("clicked Reports, then Back") |

If the team is too small to split roles, the builder may run it but narrates nothing and follows the recovery script literally. The builder's silence is the instrument.

### Step 2 — Write each task as a goal, not an instruction

A task names an outcome the user wants. It never names a button, screen, or menu — that would be handing over the answer.

| Instruction (banned) | Goal (correct) |
|---|---|
| "Click the Settings icon, then Notifications." | "You keep getting paged at 2am. Stop that." |
| "Open the alert and press Acknowledge." | "An alert just came in for Line 3. Deal with it." |
| "Go to Reports and export the incident log." | "The auditor wants last quarter's incidents. Get them to her." |

If a task contains a UI noun, rewrite it. Testing "click submit" tests obedience, not usability.

### Step 3 — Run silent, log behaviour

Set the scene, hand over, stop talking. For each task, the scribe logs:

| Field | What to record |
|---|---|
| Outcome | Unaided success / aided success / fail (see scale below) |
| Path | The steps they actually took, in order — including wrong turns and backtracks |
| First move | Where they went first (reveals their mental model vs. yours) |
| Time / errors | Rough time on task; number of wrong actions before the right one |
| Talk | Anything they said — logged in a separate column, weighted 0.1, never a finding on its own |

Task-success scale:

| Outcome | Meaning | Counts as |
|---|---|---|
| Unaided success | Completed the goal with zero facilitator input | Success — behaviour, **0.7** |
| Aided success | Completed only after a nudge | Partial — the nudge IS the finding; log the exact words you had to say |
| Fail | Gave up, timed out, or completed wrong without noticing | Fail — the strongest finding; silent-wrong is worse than a visible give-up |

### Step 4 — Keep them in user mode

The moment the user stops attempting and starts designing, explaining, or rating, they have left user mode and the data stops. These five moves each contaminate the session:

| Banned move | What it sounds like | Why it kills the finding |
|---|---|---|
| Leading | "Did you see the button top-right?" | You just answered the task; every step after is compromised |
| Explaining | "That's because you have to save first" | They now know the design's logic; no longer a first-timer |
| Defending | "Most people find that fine" | Turns the session into an argument; kills honesty |
| Soliciting opinion | "Do you like it?" | Buys a 0.1 you will be tempted to report as a finding |
| Rescuing | "Here, let me just…" | You learn they can do it when *you* do it — not the question |

The Runner's whole script when the user is stuck is two lines:

1. "What would you do next?" — redirects to behaviour, surfaces their model.
2. "Talk me through what you're looking for." — surfaces the missing information scent.

If they are fully blocked: "Let's stop there and move on." Log it a Fail. Do not nudge them to success — a nudged success hides the defect.

### Step 5 — Attribute and rank the findings

Every finding attaches to a step and is counted across users. A wall hit by ≥2 of 5 target users is a design fact `[Fact]` (0.7). A wall hit by 1 is a flag `[Hypothesis]` until a second user confirms it.

| Users who hit it (of 5) | Task-blocking? | Severity | Action |
|---|---|---|---|
| 3+ | yes | Critical | Fix before you test again |
| 3+ | no | Major | Fix this cycle |
| 2 | yes | Major | Fix this cycle |
| 2 | no | Minor | Backlog |
| 1 | yes | Flag | Watch — not yet a fact; needs a 2nd hit |
| 1 | no | Note | Log, don't act |

On sample size: 5 per segment is the working number, because a wall hit by 2 of 5 is already a fact and a 6th user rarely changes which walls are Critical. More users of the *same* segment buys confidence you don't need; more *segments* buys coverage you probably do. Spend the budget on segments, not on the sixth user.

### Step 6 — Write the read-out

Report three things: task success per task (unaided / aided / fail counts), the Critical and Major findings each tied to a step, and the mandatory "what this does NOT tell you" block (demand, preference, feel). Then the single next step: the one Critical finding to fix before the next session.

## Evidence standard

Behaviour beats talk. A task the user completed unaided (0.7) outranks anything they said about liking it (0.1), and a wall you watched them hit (0.7) outranks their theory about why they hit it (0.1). Money rarely moves in a usability session, so 0.7 is the honest ceiling here — and that is the point: the protocol observes task success, not demand.

| Rung | Weight | What counts here |
|---|---|---|
| Money moved | 1.0 | not observable in a usability session |
| Behaviour observed | 0.7 | task completed / failed; the wall they hit; the wrong first click |
| Artefact shown | 0.5 | a real thing they brought to the task — their own file, their cheat-sheet |
| Verbal commitment | 0.3 | "I'd use this for X" — anchored to the task, still not a finding on its own |
| Opinion | 0.1 | "I like it" / "the blue is nice" — quarantined, never promoted |

The findings sheet is done when every Critical/Major finding is tied to a specific step, backed by ≥2 users' observed behaviour (or 1 user plus a task-blocking failure, marked a flag not a fact), and every stated preference sits in the opinion quarantine at 0.1. Kill line: the session leads or coaches the user (any banned facilitator move), or the read-out reports "users liked it / didn't like it" as the finding instead of observed task success.

## Gotchas

- **The builder cannot stay quiet.** Engineering watches *because* they will want to explain the thing they built. The first "oh, that's because you have to…" tells the user the answer, and every task after it is a compromised first-timer run. That is exactly why Product runs and Engineering is muted. If the builder must run it on a small team, they narrate nothing and read the recovery script literally.
- **Leading by relief.** When the user struggles, the instinct is to rescue: "try the top-right." That single nudge destroys the finding — you have learned they can do it *when told*, which is not the question. Sit in the silence. The struggle is the data.
- **Opinion smuggled in as a finding.** "Users said the blue button was confusing" is opinion (0.1) dressed as fact. The fact is: 3 of 5 clicked the wrong element first. Report the behaviour; the user's theory about why is 0.1 and stays in the quarantine.
- **Testing the person, not the prototype.** "This user just wasn't very technical" blames the user for a design defect. If a real target-segment user cannot complete the task, the prototype failed. Recruiting the actual segment removes this dodge — a colleague lets you blame the person.
- **The task is really an instruction.** "Click submit" is the answer, not a task. If the task names a button, screen, or menu, you are testing obedience. Rewrite it as a goal in the user's world before you hand over.
- **Chasing a preference verdict.** "Do they prefer version A or B" is not a usability question; a user can prefer the one they complete slower. If the fellow wants preference, that is opinion — hold the line at 0.1, and if they want demand, name the wrong probe (`wizard-of-oz-probe`).
- **The confirmation test in disguise.** A session designed to *confirm* the design works — or one whose tasks only route through the happy path and never let the user fail — is not a usability test; it hunts for support, not for where the design breaks. "Run a test to confirm we need [tooltips / X]" is a pre-chosen fix stated as a problem. Reframe: observe WHERE users get lost, and write every task so a real failure is possible; the pre-chosen fix is one hypothesis among the label, the flow order, and the information scent.

## Examples

See `examples/sample.md` for a full run on a Mentix factory-copilot mock: the task is framed as a goal ("an alert came in for Line 3 — deal with it"), Product runs while the engineer who built the acknowledge flow watches muted, and the findings sheet shows 4 of 5 managers clicking the trend chart before the Acknowledge button (a Critical mis-attribution tied to one step), while the two "I really like this" comments stay quarantined at 0.1 and never reach the findings.

## Related skills

- Composes with `first-mocks`: that skill produces the clickable prototype in an afternoon; this skill runs the watched session on it. Run them back to back — build, then test what you built.
- Distinct from `tacit-knowledge-interview`: both watch a person in silence, but that one shadows an *expert* doing *their* real work to extract judgment they cannot articulate (the output is a judgment ledger, and there may be no prototype at all); this one watches a *target user* attempt *your* task on *your* prototype to find where the design breaks (the output is findings tied to screens). Watching to learn *from* the person versus watching to test the *artefact*.
- Uses `evidence-ladder` to weigh each observation (task success 0.7 vs. stated preference 0.1); it does not replace it.
- Hands off to `impeccable` / `design` for the craft fixes a finding calls for — it locates the defect, those repair it. It does not restate them.
- Supersedes nothing. It absorbs no generic usability guide; the moderated-observation discipline (goal-not-instruction tasks, muted builder, behaviour-over-opinion scoring) is the proprietary edit.
