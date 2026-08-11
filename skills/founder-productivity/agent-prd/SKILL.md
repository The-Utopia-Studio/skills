---
name: agent-prd
description: Interview the user and produce an Agent PRD — the planning document that must exist before any agent code is written. Use when the user wants to build, scope, spec, or plan a new agent, generator, critic, pipeline stage, harness, or autonomous system; when they say "new agent", "agent PRD", "spec this agent", "plan this agent", "I want to build an agent that...", or ask what questions they should answer before starting. Also use when an existing agent is being rebuilt or a stage is being added to a pipeline. Do not use for writing agent implementation code — this skill produces a document only. For a general product PRD that isn't agent-specific, use create-prd instead.
---

# Agent PRD

## What this skill does

Products get a PRD before anyone writes code. Agents almost never do, which is why
they get rebuilt three times. This skill fixes that: it runs a structured interview
and produces a single markdown document — the **Agent PRD** — that defines what the
agent is, how it will be judged, how it loops, what it remembers, and what will
break it.

**The output is a document. Not code, not a scaffold, not a repo.** If the user asks
you to start implementing during the interview, finish the PRD first and say why.

The PRD exists to make three things true before the first commit:

1. Success is defined in terms something can check, not in terms of vibes.
2. The loop has a stop condition that is not just a step ceiling.
3. Nothing important lives only in a context window or only in a process that can die.

---

## Output contract

This skill produces **two** documents, in order:

1. `<agent-slug>-PRD.md` — what the agent is and how it will be judged. Always.
2. `<agent-slug>-WORKORDERS.md` — how it gets built, as sequenced tasks with
   acceptance tests. Only after the PRD clears its hard gates.

Never produce work orders from an incomplete PRD. Tasks built on undefined success
criteria are the exact failure this skill exists to prevent — they look like progress
and cannot be verified. If the hard gates are unmet, say which ones and offer to
finish them instead.

Detect the environment and deliver accordingly.

**If you can write files** (Claude Code, Cursor, Codex CLI, any agentic IDE):
write to `docs/agents/<agent-slug>-PRD.md`. Create the directory if needed. Tell the
user the path. Do not also paste the whole document into chat.

**If you cannot write files** (web chat, mobile, plain API): output the complete
document in one fenced markdown block so it can be copied in a single action. Do not
split it across messages. Do not summarise it and offer to expand.

**Either way:** the document must be complete and standalone. Someone who was not in
the interview should be able to build from it. No "TBD" without an owner and a date
in the Open Questions section.

**Filename slug:** lowercase, hyphenated, from the agent's job — `website-generator`,
`design-critic`, `icp-simulator`. Not `agent`, not `new-agent`.

---

## How to run the interview

This is the part that determines whether the PRD is any good.

### Pacing

- Work through the gates **in order**. Each one depends on the last.
- Ask **3–5 questions at a time.** Never dump a whole gate's worth of questions at once, and never ask forty questions in one message.
- After each gate, give a **two-line summary of what you recorded** and confirm before moving on.
- Expect 20–40 minutes. Say so up front. If the user wants a fast pass, run Gates 1, 2, 4 and 5 only, and mark the rest as Open Questions in the PRD — but tell them what they are deferring.

### Interrogation standards

**Reject vague answers.** Do not accept them politely and move on. Name the problem
and offer two or three concrete alternatives to choose between. An agent with a vague
input hallucinates; an agent with a vague output is unverifiable.

Answers to push back on, every time:

| They say | The problem | What to do |
|---|---|---|
| "Various context" / "the relevant data" | Undefined input | Ask for the exact object or file, with a field list |
| "A good website" / "a useful summary" | Unverifiable output | Ask what a reviewer would check, then turn each check into a criterion |
| "It should keep trying until it works" | No exit condition | Ask what happens on attempt four, and who gets told |
| "It'll remember the context" | Undefined memory | Walk them through the four memory tiers in Appendix B |
| "We'll know it's good when we see it" | No eval | Ask for the last three things they rejected and why — those are the first eval tasks |
| "Just use the best model" | No baseline | Fine, but record which one and that it is the baseline to beat |

**Infer before you ask.** If you have repo access, read first: existing schema, prior
agent files, `AGENTS.md` or `CLAUDE.md`, package manifests, environment variable
names. Then ask the user to confirm or correct what you found. Do not make them type
what you could have read.

**"I don't know" is a legitimate answer** and it is the most useful signal in the
interview. It means that item is design work, not documentation. Record it in Open
Questions with an owner and a date. Never invent an answer to keep the flow moving,
and never quietly drop the question.

**Keep a running draft.** After each gate, hold the accumulated answers so a
long session can be resumed. If the user comes back later, restate what is captured
and resume at the next gate.

### The strategy-doc failure mode — read this before starting

The most likely way this interview fails is not that it stalls. It is that it goes
brilliantly through Gates 0–2, produces genuinely exciting strategy, and then quietly
skips Gates 3, 5, 8 and 9 because those are boring and the document already *feels*
finished. The result is a beautiful positioning document with no loop, no exit
conditions, no event schema, no tools inventory and no validator — which cannot be
built from.

Discovery gates (0, 1, 2, 4, 7) are the enjoyable half. Engineering gates
(3, 5, 6, 8, 9) are the half that determines whether the thing ships.

So:

- **After Gate 2, announce the transition explicitly.** Say that the strategy half is
  done and the engineering half is starting, and that it is shorter but less fun. Naming
  it prevents drifting past it.
- **Never offer to write the PRD before Gate 9**, even if the user says there is enough
  to go on. If they insist, write it with the unmet engineering gates listed at the top
  of Open Questions as blocking, and say plainly that it is not yet buildable.
- **Do not let strategy depth substitute for engineering depth.** A twelve-criterion
  evaluation rubric with no thresholds is not an evaluation design. A beautiful
  architecture diagram is not an event schema. Weights without bars, and boxes without
  save points, are the two most common versions of this.
- **If the user is visibly enjoying the strategy phase, say so and hold the line
  anyway.** "This is the strongest part of the doc — and it is the part that will get
  rebuilt if we don't pin down what closes the loop."

**Do not write implementation code during the interview.** Pseudocode for a schema or
an exit condition is fine when it clarifies a question. A working function is not.

---

## Gate 0 — Triage

Two answers here change every question that follows. Get them first.

**Ask:**

1. In one sentence, what job does this agent do?
2. Roughly how long does one run take, and does it need to survive a crash or a
   restart partway through?
3. Is the output something code can check (tests pass, endpoint returns 200, schema
   validates), something only judgement can assess (design, tone, strategy), or both?
4. Is this a new agent, a rebuild, or a stage added to an existing pipeline?

**Then classify and say the classification out loud so it can be corrected:**

**Complexity tier**
- **Tier A** — one job, under roughly ten steps, completes inside a single request. A framework loop is fine. Do not build a harness.
- **Tier B** — multi-stage, human gates, minutes to hours, must survive restarts. Own the loop; put it on a durable event log.
- **Tier C** — quality is subjective and must measurably improve over time. Requires Tier B plus an eval suite before anything else.

**Topology** — pick the simplest that fits:
- **Single loop** — one agent, one context, tools in a cycle. The right answer most of the time.
- **Pipeline / staged** — fixed sequence, deterministic transitions, human gates.
- **Orchestrator–worker** — lead agent delegates to subagents with their own context windows. Only for breadth-first work where total information exceeds one window. Costs 3–10× a single agent.
- **Parallel fan-out** — independent chunks or racing candidates, merged at the end.
- **Graph / node** — typed state, conditional edges, checkpoints, cycles. Only when there are genuinely multiple specialised roles, real branching on content, and state outliving a run.

**Push back if they reach for multi-agent or graph orchestration by default.** Ask
what specifically fails with one agent in a loop. If the answer is "it feels like it
should be several agents", record Single loop and revisit later. Multi-agent is
documented as *less effective* for tightly interdependent work — anything where the
outputs must cohere with each other rather than merely be collected.

### Implementation surface

**Ask this before anything else in the interview, because it can end the interview.**

Most "I want to build an agent" requests are misclassified one or two rungs too high.
Work down the ladder and stop at the first rung that does the job:

| Rung | What it is | Build time | Right when |
|---|---|---|---|
| **1. A skill** | A markdown file of instructions, invoked in chat | Hours | The work is a repeatable procedure a person triggers |
| **2. A project** | Instructions plus reference files, shared with a team | Hours | Same, plus shared context and consistency across people |
| **3. Managed agent surface** | Chat plus connectors plus scheduled runs — no code | Days | It must run on a cadence, read and write real systems, and a person reviews output |
| **4. Coded agent** | Own loop, durable execution, event log, eval suite | Weeks | Output feeds another system automatically, or volume/reliability demands are real |

**Ask:**

1. Does a person trigger each run, or must it fire on its own?
2. Does it only need to *read* other systems, or also *write* to them?
3. Does its output go to a human who reviews it, or straight into another system?
4. How many runs per week?
5. What does "I can't set it up" currently mean in practice — you can't scope it, you
   can't get it access, or the output isn't reliable enough to trust?

**The two questions that genuinely push work from days to weeks** are unattended
scheduling and write access. Reading is nearly free. Writing is where auth,
permissions and idempotency live, and it is usually most of the build.

**If rung 3 or below fits, say so plainly and stop.** Do not produce a full engineering
PRD for something that is a skill plus a scheduled task. Produce a short version:
Gates 0, 1, 2 and 8, plus a setup checklist. Tell the user which gates you are skipping
and why. Volunteering that someone needs less than they asked for is the most valuable
thing this skill can do.

**Verify capability before designing around it.** For any managed surface, confirm what
the connectors actually do — specifically whether each one can *write* as well as read —
before the design assumes it. A design that assumes write access it does not have fails
at the last step, after all the work.

**Record:** tier, topology, implementation surface, one-sentence job, and the reason for
each choice.

---

## Gate 1 — The job

**Ask:**

1. What is the single input? Name the exact object, file, or record, and list its
   required fields.
2. What is the single output? Name the exact artifact — a JSON shape, N files, a
   score, a verdict, a document.
3. Name at least three things this agent explicitly does **not** do.
4. What happens downstream if it gets this wrong — and how bad is that? Wasted tokens
   and a retry, a broken build, a founder seeing something embarrassing, or actual
   harm?
5. **If a human has to act on the output — what happens on the next run if they
   didn't?** Does the agent re-propose the same thing as if it were new?

**Reject if:** the input or output cannot be described without the words "context",
"relevant", "appropriate", or "etc."

**Why 3 matters:** the out-of-scope list becomes the forbid list in the system prompt
and is the main defence against scope creep in the output. "Not an APM, not a log
aggregator, not a Datadog replacement" is a good one.

**Why 4 matters:** severity sets how strict validation has to be. Do not let someone
build lightweight validation around a high-severity failure mode.

**Why 5 matters:** this is where idempotency lives when the durability gate is skipped.
Any design where the agent proposes and a human applies has a gap between the two, and
the agent's deduplication usually checks the *destination* — which the human hasn't
updated yet. Two skipped cycles and the same items arrive three times, and the person
reconciles by hand. The fix is usually cheap: have the agent read its own prior output
and say "previously proposed on <date>, not yet applied" rather than re-proposing.

**Record:** input contract, output contract, non-goals, failure severity, behaviour on
unacted output.

---

## Gate 2 — Success and the first ten eval tasks

**This is the gate people skip and the one that pays for the whole document.** Do not
let it be deferred. Without it, every later section is unverifiable opinion.

**Ask:**

1. Describe one run that would count as clearly good. Be specific enough that two
   people would independently agree it passed.
2. Describe one that would clearly fail, and name the exact failure signature.
3. What are the last three outputs you rejected from something similar, and why?
4. What is the single input that stresses this agent hardest? (The awkward archetype,
   the sparse brief, the edge-case tenant.)

**Then build the task bank with them.** Aim for ten now, twenty within the week.
Sources, in order of value:

- Bugs already fixed in the predecessor system. Each one is a regression test.
- The manual checks they already run before calling something done.
- Support or Slack complaints, if the thing has users.
- Cases where the behaviour should **not** fire. One-sided evals produce one-sided
  agents — if you only test that it searches when it should, you get something that
  searches for everything.

**For each task capture:**

```
id:        short-slug
input:     the exact input, or a path to it
expect:    what a pass looks like, concretely
graders:   deterministic | model-rubric | human
severity:  blocker | major | minor
```

**Then split the graders:**

- **Deterministic** — build succeeds, types check, schema validates, required routes exist, a specific value appears in the output, no banned import present. Free, fast, objective. Use wherever it is possible at all.
- **Model rubric** — for subjective dimensions. One judge per dimension, not one judge scoring everything. Needs calibration against a human.
- **Human** — occasional spot checks to calibrate the model graders. Name the person.

**Say this explicitly if they resist:** twenty to fifty tasks drawn from real failures
is a strong start — hundreds are not needed. Early on each change has a large,
obvious effect, so small samples are enough to see it. And evals get harder to write
the longer you wait: right now the requirements translate directly into test cases;
later you are reverse-engineering criteria from a live system.

**Record:** ten or more eval tasks with graders, the stress input, and the definition
of a pass.

---

## Gate 3 — The loop

**Ask:**

1. Which loop pattern is this? (Offer the options in Appendix B.)
2. What closes the loop — what specific condition means "done"?
3. What is the ceiling: steps, tokens, wall-clock, cost per run?
4. What happens when the ceiling is hit before "done"? Who is told, and what state is
   the artifact left in?
5. If scores stop improving but nothing has failed, what then?

**The hard rule to enforce here:** a healthy loop needs **at least one verifiable or
threshold condition, plus at least one budget or stall condition.** Four kinds exist:

- **Verifiable** — a test passes, the build succeeds. Cheapest and most trustworthy.
- **Threshold** — every graded criterion clears its bar. For subjective work.
- **Budget** — step, token, or time ceiling. A safety net, not a success condition.
- **Stall** — no improvement across N rounds; stop and escalate rather than spend more.

**Reject "cap it at N rounds then accept the best attempt."** That is a timeout
wearing a success condition's clothes. `maxSteps` in an SDK is the same thing: a
runaway guard, not a definition of done.

**Also ask, if the loop iterates on quality:** should the generator be allowed to
*abandon* its current direction and try something different, or only refine? For
subjective work, instruct it to decide after each evaluation — refine if scores are
trending, pivot if they are not.

**Record:** loop pattern, exit conditions (all applicable kinds), budgets, escalation
path, pivot policy.

---

## Gate 4 — Evaluation design

Skip only if every grader in Gate 2 is deterministic.

**Ask:**

1. What are the three to five criteria the output is graded on?
2. Which of those is the model already good at by default, and which is it bad at?
3. What is the hard threshold for each — the score below which the round fails?
4. Does the evaluator look at the **rendered artifact** or at the code that produced
   it?
5. Who calibrates the evaluator, and against what examples?

**Enforce these:**

**The generator never grades itself.** Agents confidently praise their own mediocre
work, worst of all on subjective tasks where no test exists. A skeptical standalone
evaluator is far more tractable to tune than a self-critical generator. If the design
has one agent doing both, flag it as a defect in the PRD.

**Weight the criteria toward what the model is bad at.** Competence dimensions —
technical correctness, basic craft — tend to come free. The failure mode is usually
blandness or genericness, so weight the criteria that catch it.

**Give the evaluator eyes.** If the artifact is visual or interactive, the evaluator
must navigate the real thing — a deployed URL, a running app — not read the source.
Bugs that survive review are almost always ones nobody actually looked at.

**Calibrate with few-shot examples and score breakdowns**, or scores will drift
between runs and diverge from the user's taste.

**Record:** criteria with weights and thresholds, evaluator access method, calibration
examples and owner.

---

## Gate 5 — State, durability and human gates

Skip for Tier A. Mandatory for Tier B and C.

**Ask:**

1. What is the event schema? What gets appended, and when?
2. Where is the artifact saved, and at what point in the run?
3. What happens if the process dies at each stage — can it resume, or does it restart?
4. Which steps are automatic and which require a person?
5. What is the timeout budget, step by step, with a worst-case total?
6. Does any step mutate an earlier record?

**Enforce these:**

**Save before the expensive step, not after.** If the artifact is written after the
critic runs, a critic failure or a timeout destroys the work. Save immediately after
validation; everything downstream is optional because the artifact already exists.

**Resume, do not restart.** The loop should read the last event and continue. This is
only possible if the durable log lives outside the process running the loop — which is
also what makes crash recovery, eval transcripts, and observability free.

**Humans are high-latency tools.** A review gate is a structured tool call that
suspends the loop, not a special case in the orchestrator. Ask specifically whether
the pause must happen *between tool selection and tool invocation* — that is the
granularity approval actually needs, and most orchestrators cannot do it.

**Never mutate a prior attempt's record.** A retry creates a new row pointing back at
the old one.

**Steps must be idempotent.** A durable engine will retry them. Ask what happens if
step 4 runs twice — if the answer is "it pushes to GitHub twice", that is a bug
waiting for a bad network day.

**Every state transition needs a matching exit in both the success path and the catch
path**, or runs get stuck in "running" forever.

**Map the worst case.** Sum the step estimates at the 95th percentile, not the median
— model latency can be three times its median. If the worst case approaches the
platform ceiling, the run must be split across invocations.

**Record:** event schema, save points, resume behaviour per stage, timeout table with
worst case, auto vs human map, idempotency notes.

---

## Gate 6 — Context and authority

**Ask:**

1. What is preloaded into every call, and what is pulled on demand via tools?
2. For each significant decision the agent makes, what is the single source of truth,
   and what is the fallback if it is absent?
3. Where in the prompt could the agent read an example and treat it as an instruction?
4. What is the context budget, and what is the assembled size at the largest
   realistic input?
5. What is available but must be excluded?

**Build the authority table with them.** One row per decision type:

| Decision | Source of truth | Fallback if absent |
|---|---|---|
| e.g. fonts | brief.visualSystem.typography | archetype default table |

**Then hunt authority gaps.** Every concrete example, table, or named value placed
after a "use the source of truth" rule is a place the model may confirm the example
instead of reading the source. Each fallback block must be gated in the prompt:

```
Only if [source field] is absent, use the following.
If [source field] is present, use it exactly. These fill gaps; they do not override.
Priority: [source 1] → [source 2] → these rules → defaults.
```

**Enforce the preload/pull split.** Preload only the small invariant core. Everything
else — skills, reference docs, brand material, prior artifacts — should be a tool
call. Context is a finite attention budget, and recall degrades measurably as the
window fills. Anything held across every iteration of a loop is paid for on every
iteration.

**Verify sources are actually populated.** Do not assume a field has a value because
the schema says it should. Ask for a validation step that checks critical fields are
present, non-empty, not truncated, and not sentinel values before the run starts, and
that asserts the value actually landed in the assembled prompt.

**Record:** authority table, identified gaps and their gating text, context budget
table, exclusion list, pre-run field validation.

---

## Gate 7 — Memory

Walk the four tiers explicitly. Most memory problems are category errors — four
different things called "memory", stuffed into one store, and injected into every
prompt.

**Ask, per tier:**

1. **Working context** — what is assembled per call? (Curated, never accumulated.)
2. **Episodic** — what does the event log record, and who reads it back?
3. **Semantic** — what durable facts and decisions persist, scoped to what tenant?
4. **Procedural** — what learned how-to persists: patterns that worked, banned
   phrasings, composition plans?

**Then:**

5. What must the agent **not** remember? (Raw transcripts, superseded versions, prior
   prompt revisions, anything that creates contradictions.)
6. How does something enter semantic memory — only from human decisions, or also from
   the agent's own outcomes?
7. How does memory get read: retrieved by relevance, or injected wholesale?
8. What happens when two entries contradict each other?

**Enforce these:**

**Retrieve, do not inject.** Give each stage a search tool over memory rather than
preloading all of it, with a fixed token allowance filled by relevance. If the
allowance overflows, the ranking is wrong — do not raise the ceiling.

**Append only, with provenance.** Never rewrite or delete. Corrections supersede. Each
entry carries source, timestamp, and what it affects. An agent-inferred entry must
never outrank a human decision.

**Write the diff before applying a human edit**, so a later regeneration cannot
silently revert it.

**Capture failures, not only successes.** A memory layer that records only what worked
cannot stop the agent repeating a mistake, and knowing what to abandon is most of the
value.

**Structured entries, not prose blobs.** Prose cannot be deduplicated, superseded, or
audited. If memory is refined over time, refinement must emit small identified deltas
merged deterministically — never a full rewrite of the whole blob, which erodes detail
run over run.

**Never compress the playbook to save tokens.** Shrinking retained content is how
domain insight gets lost. Retrieve less; do not compress what you keep.

**Every memory table keys off the tenant id, indexed.** Never a freeform name string.

**Record:** the four tiers with store, lifetime and read path for each; write rules;
exclusion list; contradiction policy.

---

## Gate 8 — Tools and integrations

**Ask:**

1. List every tool the agent can call, with one line on what each does.
2. For each pair that seems close: could a competent engineer say with certainty which
   one applies in a given situation?
3. What external APIs are involved, and what are their rate limits and failure modes?
4. What secrets are needed, and where do they live?
5. What does the agent read from and write to — repos, buckets, databases?
6. What happens when a credential is missing or expired?
7. **What scheduling, trigger and approval primitives does the target platform actually
   offer** — and does this design assume any that don't exist?

**Enforce these:**

**Verify primitives, don't assume them.** This is the most common cause of a plan that
survives review and fails on the day someone builds it. Check the real options before
the design depends on them:

- **Cadences.** Platforms offer a fixed menu — typically hourly, daily, weekly, weekdays,
  manual. Fortnightly, monthly, quarterly and "N days before X" usually are *not* on it.
  A design specifying an unavailable cadence needs the workaround written down: run at
  the nearest available frequency and have the prompt check the date and exit early,
  anchored to a fixed reference date so it doesn't drift.
- **Triggers.** Most connectors have no event triggers at all — nothing fires when a row
  changes or a file lands. If the design says "when X happens", confirm that's possible
  or convert it to a poll.
- **Write access per connector, not per product.** A connector that reads a system does
  not necessarily write to it, and the gap is rarely documented where you'd look. Check
  the specific operation the design needs — append a row, update a cell, send as this
  identity — not just whether the integration exists.
- **Approval mechanisms.** If a human gate is in the design, find the actual mechanism.
  Some platforms have one built in; on others it means a person triggers the next step.
- **Identity.** Which account does this run as, and does everything it needs live on that
  account? Notes, recordings and files are often scoped to the user who created them, not
  the workspace — which can change *who* invokes a job, not just how.

**Fewer tools, unambiguously scoped.** Bloated tool sets with overlapping purposes are
one of the most common failure modes. If a human cannot definitively pick the right
tool, the agent cannot either. Merge or rename.

**Tool output must be token-efficient.** A tool that returns a 40KB blob poisons the
context for every subsequent turn.

**Errors get compacted back into context**, not thrown into a crash. The agent should
see a summarised failure and be able to self-heal.

**Cap fan-out in code, not in a prompt.** No recursive spawning, a bounded branch
count, and a per-run cost ceiling enforced by the orchestrator. Asking a model nicely
not to spawn subagents is not a control.

**Record:** tool inventory, ambiguity resolutions, rate limits, secret locations,
credential failure behaviour, fan-out and cost caps, and the platform-primitive
verification with any workarounds it forced.

---

## Gate 9 — Guardrails and known killers

**Ask:**

1. What patterns in the output break the build or the deploy?
2. What are the five most likely hallucinations for this specific task?
3. What is the cost of catching each class of issue late rather than early?
4. What must never be written or modified by this agent?
5. Is there a tenancy boundary, and how is it enforced?

**Build the validator checklist.** Every entry must be a specific string or structural
check, never a guideline:

```
CHECK:  the exact pattern to look for
IN:     which files or fields
THROW:  the exact error message
```

**The error message is part of the fix.** "Invalid file" tells the model nothing and
produces the same mistake three times. "Invalid Hero.tsx: ref callback returns a
value. Change `ref={(el) => el && (x = el)}` to `ref={(el) => { if (el) x = el; }}`"
tells it exactly what to do.

**Deterministic before judgement, always.** Structural and syntactic checks belong in
the validator, which is free. Design, brand, and content checks belong in the
evaluator, which is not. Never mix them: a validator doing taste is brittle, and an
evaluator doing syntax is expensive.

**Record:** validator checklist with actionable messages, hallucination watch list,
protected files, tenancy enforcement, escalation cost table.

---

## Hard gates before the PRD is written

Do not produce the document until all of these are true. If one cannot be satisfied,
write the PRD anyway but put the unmet gate at the very top of Open Questions,
flagged as blocking.

- [ ] Input and output are each described in one unambiguous sentence with concrete fields
- [ ] At least three non-goals are listed
- [ ] At least ten eval tasks exist, each with a grader type
- [ ] At least one grader is deterministic
- [ ] The loop has a verifiable or threshold exit condition, not only a ceiling
- [ ] A budget or stall condition exists, with a named escalation path
- [ ] For Tier B/C: the durable state store is named and the resume behaviour is defined per stage
- [ ] For Tier B/C: the save point is before the most expensive step
- [ ] Every decision type has a named source of truth
- [ ] All four memory tiers are addressed, even if the answer is "not used"
- [ ] The generator and the evaluator are separate
- [ ] Every "I don't know" is in Open Questions with an owner

---

## The Agent PRD template

Produce exactly this structure. Keep the section numbers. Omit a section only if the
tier makes it genuinely inapplicable, and say so rather than deleting it.

````markdown
# Agent PRD — <Agent Name>

**Status:** Draft | Approved
**Tier:** A | B | C
**Topology:** single loop | pipeline | orchestrator–worker | parallel fan-out | graph
**Owner:**
**Date:**
**Supersedes:**

---

## 1. Job

**One sentence:**

**Input:** <exact object, with required fields>

**Output:** <exact artifact — shape, count, format>

**Non-goals:**
- <not this>
- <not this>
- <not this>

**Failure severity:** <wasted tokens | broken build | user-visible embarrassment | harm>
and what that implies for validation strictness.

---

## 2. Success and evals

**A good run looks like:** <specific enough for two people to agree>

**A failed run looks like:** <exact failure signature>

**Stress input:** <the hardest realistic case>

### Task bank

| id | input | expect | graders | severity |
|---|---|---|---|---|
| | | | | |

### Graders

**Deterministic:** <list of mechanical checks>
**Model rubric:** <dimensions, one judge each>
**Human:** <who, how often, on what>

**Where the suite runs:** <script, CI, on every change to what>

---

## 3. Loop

**Pattern:** <tool loop | plan-execute-verify | generator–evaluator | contract-first | reflexion | fan-out/fan-in | jury | human-gated | outer optimisation>

**Exit conditions:**
- Verifiable: <or "none — subjective task">
- Threshold: <criteria and bars>
- Budget: <steps / tokens / wall-clock / cost>
- Stall: <no improvement across N rounds → action>

**On ceiling hit:** <who is told, what state the artifact is in>

**Pivot policy:** <may the generator abandon a direction, or only refine>

---

## 4. Evaluation design

| Criterion | Weight | Threshold | Graded by |
|---|---|---|---|
| | | | |

**Evaluator access:** <deployed URL / rendered artifact / source — and why>
**Calibration:** <few-shot examples, who owns them>
**Separation:** confirm the generator does not grade its own output.

---

## 5. State and durability

**Event schema:** <fields appended, and when>
**Durable store:** <named>
**Save point:** <exactly where, and why it is before the expensive step>

### Timeout budget

| Step | p50 | p95 | Notes |
|---|---|---|---|
| | | | |

**Worst case total:** <and whether it fits the platform ceiling>

### Recovery

| Stage | If it dies here | Resume or restart |
|---|---|---|
| | | |

### Auto vs human

**Automatic:** <steps>
**Human gate:** <steps, and the pause mechanism>

**Idempotency:** <which steps are retried, and what makes them safe>

---

## 6. Context and authority

### Authority table

| Decision | Source of truth | Fallback if absent |
|---|---|---|
| | | |

**Authority gaps and their gating text:** <each example block that needs an "only if absent" prefix>

### Context budget

| Item | Size | Preloaded or pulled | Priority |
|---|---|---|---|
| | | | |

**Assembled total at largest realistic input:** <vs the ceiling>

**Excluded despite being available:** <and why>

**Pre-run field validation:** <which fields are checked for empty / truncated / sentinel, and the assertion that the value reached the prompt>

---

## 7. Memory

| Tier | What it holds | Store | Lifetime | Read path |
|---|---|---|---|---|
| Working context | | — | one call | assembled per call |
| Episodic | | | | |
| Semantic | | | | |
| Procedural | | | | |

**Write rules:** <append-only, provenance, diff-before-edit, failures captured>
**Contradiction policy:** <how resolved, and whether the conflict is surfaced>
**Never remembered:** <list>
**Tenancy:** <key, index, enforcement>

---

## 8. Tools and integrations

| Tool | Does | Returns | Notes |
|---|---|---|---|
| | | | |

**Ambiguity check:** <any pair a human could confuse, and how it was resolved>
**External APIs:** <rate limits, failure modes>
**Secrets:** <what, where — and confirmation they are not in the wrong place>
**Credential failure behaviour:**
**Fan-out and cost caps:** <enforced where>

---

## 9. Guardrails

### Validator checklist

```
CHECK:
IN:
THROW:
```

**Hallucination watch list:** <five most likely for this task>
**Protected paths:** <never written or modified by this agent>
**Escalation cost:** validator free → evaluator $X → build failure Y min → production ∞

---

## 10. Build order

**Before any code:** <eval tasks written, schema defined, criteria written>
**First milestone:** <baseline with no scaffolding, and the number it must beat>
**Then:** <ordered, each item verifiable>
**Observability from commit one:** <tracing tool, what is logged>
**Done means:** <the specific condition>

---

## 11. Open questions

| # | Question | Why it matters | Owner | By |
|---|---|---|---|---|
| | | | | |

**Blocking:** <any question that must be answered before starting>

---

## 12. Decisions and rationale

| Decision | Chosen | Alternatives considered | Why |
|---|---|---|---|
| Tier | | | |
| Topology | | | |
| Loop pattern | | | |
| Memory store | | | |

*Each scaffold component in this design encodes an assumption about what the model
cannot do on its own. Record the assumption so it can be retested when the model
changes.*
````

---

## Part two — Work orders

Produce this **only after the PRD clears its hard gates.** Confirm with the user that
the PRD is approved before starting.

**Work orders are required at every rung, including rung 1 and 2.** Do not skip them
because the build has no code. A setup checklist is not work orders — checklists list
prerequisites (get access, chase the account, confirm the format), and the actual
construction ends up compressed into a single line like "create the three jobs". That
line is the entire build, and it has no sequence and no acceptance test. If you find
yourself deciding the checklist covers it, that is the signal to write the orders.

What changes by rung is the *shape*, not the discipline:

| Rung | Orders look like | Still required |
|---|---|---|
| 1–2 (skill, project) | Write the instructions, assemble reference files, test on real cases | One concern each, acceptance test each |
| 3 (managed surface) | Configure connectors, write prompts, hand-run, then schedule | Same |
| 4 (coded) | Contracts, baseline, durability, evaluator, memory | Same |

### Refusal rule

If a gate is unmet, do not write work orders. Say which gate, why it blocks, and offer
to close it. Specifically:

| Missing | Why work orders are impossible |
|---|---|
| Eval tasks | No acceptance tests, so no work order can be verified |
| Exit conditions | The loop milestone has no definition of done |
| Event schema / save points | The durability milestone cannot be specified |
| Thresholds on criteria | The evaluator milestone has no pass bar |
| Tool inventory | Integration orders cannot be scoped or sequenced |

Note that a rung-3 PRD legitimately skips several of those gates. Skipped gates remove
the *milestones that depended on them* — they do not remove the requirement for orders.

### Two rules that make work orders useful rather than decorative

**1. Every work order carries a runnable acceptance test.** No test, no work order.
"Set up the research engine" is not a task. "Research engine returns at least twenty
deduplicated signals for the sparse-input stress case, each with a source URL — test at
`evals/research.test.ts`" is a task. The test comes from the PRD's task bank, so if a
work order has no test, either the bank is thin or the order is not real work.

For non-coded rungs, the test is an observable outcome rather than a command — "the
pasted row lands in the correct cells with no rearranging", "fire on demand and the mail
arrives at every address on the list". **"It's configured" is not an acceptance test.**

**2. Milestones enforce the build order, they do not restate the product roadmap.**
A product roadmap is ordered by feature value. A build order is ordered by what makes
the next step verifiable. These are different sequences and conflating them is why
scaffolding gets built before there is any way to tell whether it helps.

### Milestone spine — coded builds (rung 4)

Adapt the contents, keep the sequence and the exits.

| # | Milestone | Exit condition |
|---|---|---|
| **M0** | Contracts and evals | The suite runs and **fails honestly**. Input/output types exist. Event schema defined. |
| **M1** | Naked baseline | One model call, minimal prompt, no scaffolding, best model. A recorded score everything later must beat. |
| **M2** | Durability | Process killed mid-run; it resumes rather than restarting. Artifact survives. |
| **M3** | Evaluator | Agrees with a human on 8 of 10 graded samples. Thresholds enforced; no unconditional pass. |
| **M4** | Memory | Tiers live, retrieval budgeted, tenancy tested adversarially. |
| **M5** | Learning loop | Outcomes feed the playbook. Only after M0–M4 hold. |

Tier A stops at M1. Tier B runs M0–M4. Only Tier C reaches M5.

**M0 and M1 are the two people skip and the two that matter most.** M0 is skipped
because writing tests before code feels backwards. M1 is skipped because it feels like
throwaway work — but without a naked baseline, nobody can ever say whether the prompt
scaffolding, the retrieval layer or the critic earned its place, and every one of them
becomes permanent by default.

### Milestone spine — skills, projects and managed surfaces (rungs 1–3)

| # | Milestone | Exit condition |
|---|---|---|
| **S0** | Unblock | Every input the build needs exists and is reachable from the account that will run it. |
| **S1** | Dry run | Each job has been run **by hand** and produced output worth automating. |
| **S2** | Schedule and wire | Jobs run unattended and report every time, including clean runs. |
| **S3** | Supervised cycle and handover | One full cycle with no intervention, and the owner can change it unaided. |

**S1 is the equivalent of M1 and gets skipped for the same reason** — hand-running feels
like a rehearsal rather than work. But scheduling an unproven prompt just delivers
mediocre output on a cadence, and the longer the interval the longer that takes to
surface. At fortnightly, two months.

**S3 is the milestone nobody writes down.** If the person who will own the process cannot
edit the prompt, change the criteria, pause a job, or interpret a failure report without
the builder, then the handover did not happen and the builder is now permanent
infrastructure. This needs its own order with its own acceptance test — *the owner makes
a real change unaided* — not a line in a summary.

**Unattended jobs need an unconditional report.** Silence on success is how scheduled
work dies: a broken schedule goes unnoticed until someone happens to need the output, and
a zero-result run is indistinguishable from a run that never fired. One line per run
costs nothing.

### Work order format

Each order is one session, one concern. If it cannot be described in one sentence, it
is too large — split it.

```markdown
### WO-<n> · <short title>

**Milestone:** M<n>
**PRD section:** §<n> <name>
**Depends on:** WO-<n>, WO-<n>
**Size:** one session | half day | full day

**Do:** <one sentence, imperative>

**Scope:**
- <specific, checkable>
- <specific, checkable>

**Out of scope:** <what a keen agent might do and must not>

**Acceptance test:**
```
<command to run, or the exact check>
Expected: <observable result>
```

**Files touched:** <paths, or "new">
**Do not touch:** <protected paths from PRD §9>
```

### Sequencing rules

- **Dependencies are explicit.** Any order that can start immediately is marked so; the
  rest name what they wait on.
- **One concern per order.** Multi-concern sessions produce interleaved changes that are
  hard to review, hard to revert, and tend to introduce new bugs while fixing old ones.
- **Every order ends in a commit** with a one-line description. If the change cannot be
  described in one line, the scope was too large.
- **Types clean before commit.** Whatever the local equivalent is — run it, and make it
  part of the acceptance test rather than a hope.
- **Protected paths carry forward** from PRD §9 into every order's "do not touch".
- **Order within a milestone by what unblocks the most**, not by what is most
  interesting.
- **If someone other than the builder will own this**, the final order is that person
  making a real change unaided. Not a walkthrough, not documentation — a change.

### WORKORDERS.md template

````markdown
# Work Orders — <Agent Name>

**PRD:** `<path>` (approved <date>)
**Tier:** A | B | C
**Surface:** skill | project | managed | coded

## Ready now

<WO ids with no unmet dependencies>

## Blocked

| WO | Waiting on |
|---|---|

## Milestones

*Use the M-spine for coded builds, the S-spine for skills, projects and managed surfaces.*

### M0 — Contracts and evals
**Exit:** the eval suite runs and fails honestly.

<work orders>

### M1 — Naked baseline
**Exit:** <recorded baseline score> — the number scaffolding must beat.

<work orders>

<...M2–M5, or S0–S3, as applicable...>

## Deferred

| Item | Why deferred | Revisit when |
|---|---|---|

## Standing rules for every session

- Read the PRD and any repo rules file first
- One concern per session
- Acceptance test passes before the order is closed
- Commit with a one-line description (coded builds)
- Do not touch: <protected paths>
- <any invariant from the PRD that must hold on every order — e.g. never writes to X, field Y always blank>
````

---

## Worked fragment

The fidelity to aim for. This is Gate 2 and Gate 3 for a design critic, abbreviated.

> **Input:** `{ deployUrl: string, brief: FinalBrief, archetype: Archetype }` — brief
> must contain non-empty `visualSystem.palette` and `visualSystem.typography`.
>
> **Output:** `{ verdict: "pass" | "fail", scores: Record<Criterion, number>,
> findings: Finding[] }` where every `fail` carries at least one finding with a file
> or selector reference.
>
> **Non-goals:** does not fix anything, does not touch the repo, does not judge copy
> accuracy against the PRD.
>
> **Failure severity:** a false pass reaches a founder. Strict.
>
> **Task bank (extract):**
>
> | id | input | expect | graders | severity |
> |---|---|---|---|---|
> | about-page-mockups | Grove deploy, CONSUMER_HEALTH | fails with a finding naming the mockup component on /about | deterministic + rubric | blocker |
> | archetype-sameness | Grove and Meridian deploys | flags structural similarity above threshold | rubric | blocker |
> | clean-pass | reference site known good | passes with no blocker findings | deterministic | major |
> | palette-drift | brief palette vs rendered CSS | fails when hero background is not in the brief palette | deterministic | major |
>
> **Loop:** generator–evaluator. Exit on **threshold** — all four criteria at or above
> bar. **Budget** — 3 rounds or $2.00. **Stall** — if the aggregate score moves less
> than 3 points between rounds, stop and escalate to the design lead with the best
> attempt attached. No unconditional accept.

---

## Appendix A — Traps that produced this document

Each of these cost real sessions. Ask about them by name when the design gets close.

1. **Prompts inlined or compiled at build time.** Edits to the prompt file had no
   effect at runtime because the loader returned stale bundled strings. Three runs
   went out with the wrong rules. → Read prompt content at runtime, or assert a
   content hash so staleness is loud.

2. **Truncated source fields.** A palette field contained `"primary:"` — a broken YAML
   fragment — for three consecutive runs, so the agent silently invented its own
   palette each time. → Validate critical fields are non-empty and non-truncated
   before the run.

3. **Authority gaps.** A fallback font table sat after a "use the brief's fonts" rule.
   The model read the table and confirmed the wrong font instead of copying from the
   brief. → Gate every fallback with "only if absent".

4. **Saving after the expensive step.** The artifact was written after the critic ran;
   a timeout killed the action first. No artifact, no deploy, generation wasted. →
   Save straight after validation.

5. **Unawaited async calls.** A missing `await` on a mutation left a dangling promise
   and timed out the whole run. → Await everything.

6. **Non-critical work blocking the critical path.** A scheduled embedding job threw
   inside the save path and took the save down with it. → Wrap non-essential work in
   try/catch; it must never block persistence.

7. **A recompile step skipped on the retry path.** The brief was not recompiled after
   a brand direction changed, so the generator used the previous approval's fonts. →
   Every path that changes an upstream artifact must trigger the recompile.

8. **Section ordering in the prompt.** Route requirements loaded after the archetype
   pack, so the model had already committed to a layout before reading what each page
   needed. → Source of truth first, requirements before vocabulary.

9. **Generic validator messages.** "Invalid file" produced the same mistake on three
   retries. → Say what to fix and how.

10. **No version control until week three.** No rollback, no diff, no recovery from a
    bad session. → `git init` before the first line of code; commit after every
    session.

11. **A round cap standing in for a quality gate.** "Two revise rounds then accept
    best effort" means the loop always passes eventually. → Pair every budget with a
    real success condition.

12. **The generator grading itself.** Self-assessment reliably skews positive, badly
    so on subjective work. → Separate the evaluator, and tune it to be skeptical.

---

## Appendix B — Reference tables for the interview

Read these to the user when they need the options.

### Complexity tiers

| | Tier A | Tier B | Tier C |
|---|---|---|---|
| Shape | One job, <10 steps, one request | Multi-stage, human gates, minutes–hours | Subjective quality, must improve over time |
| Loop | Framework loop fine | Own the loop, single-step over a durable log | Generator/evaluator plus an outer optimisation loop |
| Durability | Not needed | Required | Required, plus held-in/held-out splits |
| Memory | Message array plus a managed tool | All four tiers | Add reflection over the playbook |
| Evaluation | Spot checks plus tracing | 20–50 task suite in CI | The suite is the optimisation target |
| Do not | Build a harness | Let a framework hide control flow | Start here |

### Topologies

| Shape | Good for | Fails at | Cost |
|---|---|---|---|
| Single loop | Almost everything | Work exceeding one context window that cannot be chunked | Baseline |
| Pipeline / staged | Stable order, auditability, human gates | Revisiting an earlier stage, branching on content | Baseline |
| Orchestrator–worker | Breadth-first, many independent paths | Tightly interdependent work, coherence across outputs | 3–10× single agent |
| Parallel fan-out | Independent chunks, racing candidates | Chunk B depending on chunk A | Linear in branches |
| Graph / node | Real branching, several specialists, cross-session state | Simple tasks — the structure becomes maintenance | Baseline plus orchestration |

*A loop is already a graph — one whose path returns to an earlier node. A loop is one
node; a graph is several. The question is how many nodes the problem actually has.
Usually one. What the graph framing is right about — typed state instead of a loose
dictionary, explicit conditional edges instead of transitions buried in code,
persistent checkpoints — can all be had inside a single-agent loop.*

### Loop patterns

| Pattern | What closes it | Reach for it when |
|---|---|---|
| Tool loop (ReAct) | Model stops calling tools, or a step ceiling | Default, Tier A |
| Plan–execute–verify | Every planned item verified | Knowable shape; model under-scopes |
| Self-critique | Agent declares itself satisfied | Cheap polish only — weakest pattern |
| Generator–evaluator | All criteria clear thresholds | Subjective quality, unreliable self-assessment |
| Contract-first | The agreed contract is satisfied | High-level spec needing testable claims |
| Reflexion | Success, or the lesson stops changing | Failures are informative and recoverable |
| Fan-out / fan-in | All branches returned and merged | Independent chunks, racing approaches |
| Jury | Consensus or threshold | Grading only, never generation |
| Human-gated | Human responds; loop resumes from the log | Irreversible or taste-dependent decisions |
| Outer optimisation | No regression on held-in **and** held-out | Tier C only, once evals exist |

### Memory tiers

| Tier | Holds | Lifetime | Read path |
|---|---|---|---|
| Working context | Current window | One call | Assembled per call, never accumulated |
| Episodic | Full-fidelity event log | Forever, per run | Positional slices on demand |
| Semantic | Durable facts and decisions | Forever, per tenant | Retrieved by relevance, tenant-scoped |
| Procedural | Learned how-to | Forever, per system | Pulled by name, small always-on core |

### Exit conditions

| Kind | Example | Role |
|---|---|---|
| Verifiable | Tests pass, build succeeds, 200 response | Best. Use wherever it exists |
| Threshold | Every criterion at or above bar | Necessary for subjective work |
| Budget | Step, token, time, or cost ceiling | Safety net, never a success condition |
| Stall | No improvement across N rounds | Stop and escalate rather than spend |

---

## Closing behaviour

After delivering the PRD:

1. State where it is (path) or that it is above (chat).
2. List the blocking open questions in one short block — no more than five lines.
3. **Report the gate result honestly.** If engineering gates were skipped, say the
   document is a strategy doc rather than a buildable spec, and name what is missing.
   A PRD that reads well and cannot be built from is worse than an obviously unfinished
   one, because nobody goes back to it.
4. Offer work orders **only if** the hard gates are met. If not, offer to close the gaps
   instead. **Do not decline work orders on the grounds that the build has no code** —
   rungs 1–3 use the S-spine. If the PRD's own setup checklist is being treated as the
   work orders, check whether the actual construction has collapsed into one line. It
   usually has.
5. Do not begin implementing. If asked to, confirm the PRD is approved first.

After delivering work orders:

1. State the path, the ready-now orders, and the first one to pick up.
2. Restate the M1 baseline number that later scaffolding has to beat.
3. Stop. Do not begin executing the first order unless asked.
