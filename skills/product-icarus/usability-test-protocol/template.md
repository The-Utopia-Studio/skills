# Usability Test Protocol — runbook + findings sheet

One prototype, one user at a time, three roles. Fill this in as you run. Behaviour goes in the log; talk goes in the quarantine.

```
Progress:
- [ ] Preconditions met (clickable prototype · real target user · task is a goal)
- [ ] Three roles assigned (Product runs · Engineering watches muted · Design scribes)
- [ ] Every task written as a goal, not a UI instruction
- [ ] Session run silent; behaviour logged, talk quarantined
- [ ] Findings attributed to steps, counted across users, severity assigned
- [ ] Read-out written, including "does NOT tell you" block
```

## 0. Preconditions
| Precondition | Present? | Note |
|---|---|---|
| Working prototype (clickable mock / v1 / live) | yes ☐ no ☐ | if no → `first-mocks` first |
| Real target user (segment, not a colleague) | yes ☐ no ☐ | if no → recruit; a colleague's run is 0.1 |
| Task is a goal, not an instruction | yes ☐ no ☐ | if no → rewrite in §2 |

If any box is "no" and cannot be fixed now → STOP. Do not fabricate a run.

## 1. Roles
| Role | Person | Rule |
|---|---|---|
| Runner (Product) | [ ] | Sets scene, hands over, silent, recovery script only |
| Watcher (Engineering / builder) | [ ] | Muted. If they speak, Runner ends the task |
| Scribe (Design) | [ ] | Logs behaviour against the step, not interpretation |

Small team? The builder may run it, narrating nothing.

## 2. Tasks as goals
One outcome per task, in the user's world. No button, screen, or menu names.

| # | Task (goal, in the user's words) | What "done" looks like | UI-noun check |
|---|---|---|---|
| 1 | | | clean ☐ (rewrite if it names a screen) |
| 2 | | | clean ☐ |
| 3 | | | clean ☐ |

## 3. Run log — silent, one row per user per task
Say nothing but the recovery script. Log the path they took, not the path you designed.

| User | Seg | Task | Outcome (unaided / aided / fail) | First move | Path taken (incl. wrong turns) | Time / errors | TALK (0.1 — quarantine) |
|---|---|---|---|---|---|---|---|
| U1 | | 1 | | | | | |
| U1 | | 2 | | | | | |
| U2 | | 1 | | | | | |
| U2 | | 2 | | | | | |
| U3 | | 1 | | | | | |
| ... | | | | | | | |

Outcome scale: **unaided success** = zero facilitator input (0.7) · **aided success** = completed only after a nudge (log the exact words) · **fail** = gave up, timed out, or completed wrong without noticing (strongest finding).

## 4. In-user-mode guardrail
Tick if you caught yourself doing any of these — each contaminates the run:
- [ ] Leading ("did you see the button top-right?")
- [ ] Explaining ("that's because you have to save first")
- [ ] Defending ("most people find that fine")
- [ ] Soliciting opinion ("do you like it?")
- [ ] Rescuing ("here, let me just…")

Recovery script (the ONLY things the Runner says when they're stuck):
1. "What would you do next?"
2. "Talk me through what you're looking for."
3. Fully blocked → "Let's stop there and move on." → log a Fail. Do NOT nudge to success.

## 5. Findings — attributed and ranked
One row per defect, tied to the step it happened on. A wall hit by ≥2 of 5 = `[Fact]`; hit by 1 = `[Hypothesis]` (flag).

| Finding (what broke) | Step / screen | Users hit (/5) | Task-blocking? | Severity | Basis |
|---|---|---|---|---|---|
| | | | y / n | | [Fact] / [Hypothesis] |
| | | | | | |

Severity map: 3+ & blocking = **Critical** · 3+ not blocking or 2 & blocking = **Major** · 2 not blocking = **Minor** · 1 & blocking = **Flag** · 1 not blocking = **Note**.

## 6. Opinion quarantine (0.1 — not findings)
Everything the users *said* about liking / disliking / wanting. Capped at 0.1. Do not promote to §5.

| User | What they said | Why it stays 0.1 |
|---|---|---|
| | | stated preference, not observed task success |

## 7. Read-out

**Task success:** Task 1 — [x] unaided / [y] aided / [z] fail of [N]. Task 2 — … (repeat per task)
**Critical findings:** [step → what broke → users hit] `[Fact]`
**Major findings:** [step → what broke → users hit]
**Flags (1 hit, watch):** [step → what broke] `[Hypothesis]` — needs a 2nd user to become a fact

**What this does NOT tell you** (mandatory):
- Demand — a user can complete every task and still never want the product. Not observable here. Route to `wizard-of-oz-probe` / `concierge-probe`.
- Preference — any "I like it" is opinion, **0.1**, quarantined in §6. Not a finding.
- Feel over time — one session at a desk is not the product at 2am mid-incident.

**Next step:** the ONE Critical finding to fix before the next session → [ ]. Re-test the same task after the fix.
