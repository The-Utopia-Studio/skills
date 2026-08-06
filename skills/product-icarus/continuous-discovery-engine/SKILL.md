---
name: continuous-discovery-engine
description: Stands up ONE living opportunity tree fed by three live inputs and keeps it current after launch. Fires when a fellow says "set up discovery", "continuous discovery", "opportunity tree", "keep learning after launch", or "discovery after launch". Returns an opportunity tree (outcome → opportunities → solutions → tests) wired to customer interviews, production traces, and eval telemetry — each feed stamped with its evidence rung, its cadence, and a named synthesis owner. NOT for scoring one signal's rung (use evidence-ladder), picking which probe tests one question (use probe-matrix), or running a single customer interview (use tacit-knowledge-interview).
type: interactive
supersedes: skills/discovery/opportunity-solution-tree
---

## What it does

Turns discovery from a one-time drawing into a running loop. It builds one opportunity tree (outcome → opportunities → solutions → tests) and wires it to three live inputs — customer interviews, production traces, eval telemetry — so the tree updates on a cadence instead of aging on a wall. Each node carries a provenance stamp (which feed touched it, at what evidence rung, on what date). A named human owns synthesis: the machine surfaces candidate tree edits, the human promotes, parks, or discards them. The output is the wired tree plus the loop that keeps it alive, not a static poster.

## The Icarus reframe

The generic Opportunity Solution Tree is a poster — drawn once, pinned up, stale the moment the market moves. The Icarus engine feeds one living tree from three live inputs sitting at different rungs of the evidence ladder — customer interviews (verbal, 0.3), production traces (behaviour, 0.7, and nearly free once you have shipped), and eval telemetry (the product grading its own quality before a customer complains) — with a named human owning synthesis: the machine surfaces candidate edits, the human decides. The inversion that matters is that shipping makes discovery cheaper, not finished — every production trace is a fresh interview you never had to schedule (see the forthcoming `trace-to-interview`), so the fastest route to a 0.7-backed tree is to launch, not to run more interviews.

## When to use / When NOT

Use it when you have a scoped product (shipped, in pilot, or about to ship) and you want discovery to keep running, not end. Use it to stand up the tree, wire the feeds, name the synthesis owner, and set the cadence.

Do not use it for:

| If the fellow wants… | Use instead | Why not this skill |
|---|---|---|
| To score one signal's evidence rung ("what rung is 'they said they'd buy it'?") | `evidence-ladder` | That grades a single signal; this wires many signals into a tree over time. |
| To pick the cheapest honest test for one question | `probe-matrix` | That routes one question to one probe; this decides which node needs a probe, then hands off to it. |
| To run or prep a single customer interview | `tacit-knowledge-interview` | That is one interview; this consumes interview output as one of three feeds. |
| A first-contact teardown of a raw, unscoped idea | `concept-council` | That runs before any product exists; this runs on a scoped or shipped one. |
| The old static outcome→opportunity→solution→experiment drawing | (this skill supersedes it) | `opportunity-solution-tree` draws once; this keeps it alive. Route here. |

## Method

Fill `template.md` as you go. Do not stop at the tree — a tree with no wired feed, no owner, and no cadence is the old poster, and this skill has failed if that is what it returns.

### Step 1 — Set the outcome

One measurable metric, with a current baseline and a target. Not "improve UX." If the fellow gives a vague outcome, name it as unmeasurable and ask for the number before proceeding.

| Field | Fill |
|---|---|
| Outcome metric | [e.g. renewal rate, unplanned-incident count, task-success rate] |
| Baseline (today) | [number + [Fact]/[Assumption]] |
| Target | [number + by when] |

### Step 2 — Inventory the feeds (be honest about what is dark)

Mark each of the three feeds live or dark. Do not pretend a dark feed exists. Pre-launch, feeds 2 and 3 are usually dark — the tree's evidence ceiling is then 0.3 (verbal), and you must say so.

| Feed | Live / dark | Native evidence rung | Why it is dark (if dark) |
|---|---|---|---|
| Customer interviews | | verbal 0.3 → behaviour 0.7 if you watch them work | |
| Production traces | | behaviour 0.7 (money 1.0 if the trace is a spend event) | not shipped yet? |
| Eval telemetry | | quality signal, artefact/behaviour | no evals wired yet? |

If only one feed is live: run on that one feed. State the ceiling. Then name the single thinnest slice to ship that lights up the other two feeds — because shipping, not more interviews, is the cheapest path to 0.7. Never fabricate a trace or an eval number to fill a dark feed.

### Step 3 — Wire each live feed

For every live feed, fill: what it contributes to the tree, its cadence, and the named human who owns turning its raw signal into tree edits.

| Feed | What it contributes | Cadence | Synthesis owner (a name, not a role) |
|---|---|---|---|
| Interviews | new opportunities, the "why", tacit judgment calls | e.g. 3 rolling / week | |
| Production traces | where users actually struggle, retry, drop, work around, export | continuous, triaged weekly | |
| Eval telemetry | where the product's own quality fails before anyone complains | per-release + on-alert | |

### Step 4 — Build the tree, stamp every node

Outcome → opportunities → solutions → tests. Each opportunity and solution carries a provenance stamp: which feed surfaced it, its current evidence rung, the date it was last touched.

```
Outcome
  └─ Opportunity  [feed] [rung] [date]
       ├─ Solution  [feed] [rung] [date]
       │    └─ Test → hand off to probe-matrix
       └─ Solution  ...
```

An opportunity with no feed and no rung is a belief, not a finding. Tag it `[Hypothesis]` and mark it un-provenanced.

### Step 5 — Rank solutions with the evidence-weighted POC score

Absorb the OST score (feasibility, impact, reach) and then let the evidence ladder decide. This is the beat over the static tree: a slick solution to an opportunity backed only by opinion loses to a modest solution to an opportunity proven by production traces.

| Field | Band |
|---|---|
| Feasibility (F) | 1 = months, 5 = days |
| Impact (I) | 1 = barely moves the outcome, 5 = major shift |
| Reach (R) | 1 = a handful of the segment, 5 = most of it |
| Raw = F + I + R | max 15 |
| Rung = evidence rung of the parent opportunity | 0.1 opinion / 0.3 verbal / 0.5 artefact / 0.7 behaviour / 1.0 money |
| **Weighted POC = Raw × Rung** | rank on this |

Worked contrast: a raw-14 solution on an opinion-only opportunity (0.1) scores 1.4; a raw-9 solution on a trace-backed opportunity (0.7) scores 6.3 and wins. Shipping pushes opportunities to 0.7, which mechanically promotes their solutions. That is launch-makes-discovery-cheaper made numeric.

### Step 6 — Set the synthesis cadence (the loop)

The machine surfaces; the human decides. Write the ritual, the stale rule, and the change-log location.

1. Each cadence, every live feed drops its raw signal since last cycle.
2. Each signal is scored on the evidence ladder and mapped to a tree action: new opportunity, new solution, raise/lower a rung, or kill a node.
3. The named owner promotes, parks, or discards each candidate. The tree never edits itself.
4. Re-run Step 5. Re-pick the POC if the ranking changed. Log what changed and why.
5. **Stale rule:** any node untouched by any feed for N cycles (default 2) is flagged as a belief, then re-probed or pruned.

### Step 7 — Demonstrate one turn of the loop

Take one real signal from a live feed and update the tree in front of the fellow: show the node it lands on, the rung it moves, the solution it promotes or kills, the re-picked POC. A tree that cannot show one loop turn is still a poster.

## Evidence standard

Every node's strength equals the highest rung of signal supporting it: money 1.0 > behaviour 0.7 > artefact 0.5 > verbal 0.3 > opinion 0.1. Production traces are the cheapest route to 0.7, which is exactly why launch lowers the cost of discovery. Done means: one measurable outcome; opportunities each provenance-stamped with a feed and rung; solutions ranked by the evidence-weighted POC score; the live feeds wired (or the dark ones honestly marked, with the ceiling stated); a named synthesis owner; a written cadence; and one demonstrated loop turn. Kill line: a static one-shot tree with no live-input loop, no synthesis owner, or no cadence fails, however handsome the tree looks.

## Gotchas

- **Poster relapse.** Drawing the tree and never wiring a feed returns the old OST under a new name. If no feed is live and none is scheduled to go live, you have not run this skill — you have drawn a picture. Name it.
- **Machine-decides drift.** Letting an LLM auto-edit the tree from traces removes the human judgment that makes synthesis worth anything. The machine surfaces candidates; a named person decides. If nobody's name is on synthesis, the tree rots into noise.
- **Trace worship.** One production trace is not a finding — a spike can be a single power user. Score the trace at behaviour 0.7 but weight it by how many distinct users produced it. A 0.7 signal from one user is weaker than a 0.3 pattern across forty.
- **Interview-only inflation (pre-launch).** A tree built only on interviews sits at 0.3. Treating it as validated is the classic pre-launch lie. State the ceiling and let it push you to ship, not to schedule more interviews.
- **Eval telemetry mistaken for demand.** A green eval means the product does the task, not that anyone wants it. Eval telemetry guards quality; it does not prove an opportunity. Never let a passing eval promote a solution up the tree on its own.
- **Stale branches read as live.** A branch no feed has touched in two cycles is a belief wearing a finding's clothes. Flag it, re-probe it, or prune it — do not let it keep ranking as if fresh.

## Examples

See `examples/sample.md` for a full run on a post-launch Azraq data-centre risk product: three live feeds wired to one tree, the evidence-weighted POC ranking, and one loop turn where a production trace (operators dismiss 80% of cooling alerts in under 5s but always open and export power-feed alerts) kills a planned solution and promotes another — the tree updating in front of you.

## Related skills

- **Supersedes `opportunity-solution-tree`** and beats it head-to-head: that skill produces a static outcome→opportunity→solution→experiment drawing you make once. This one wires the same tree to three live inputs, stamps every node with provenance and an evidence rung, names a human synthesis owner, and runs on a cadence — so shipping makes discovery cheaper rather than declaring it finished. The three-live-input loop, the human-owned synthesis, and the launch-lowers-cost inversion are why it wins; the old skill has none of them.
- Consumes `tacit-knowledge-interview` output as feed 1 and `evidence-ladder` as the scoring spine for every node and the POC weight.
- Hands each leaf test to `probe-matrix`, which routes it to the cheapest honest probe; the probe result flows back as a signal on the next cadence.
- Runs after `concept-council`, `problem-statement`, and `beachhead-segment` have scoped the product — this keeps discovery running once there is something to ship.
