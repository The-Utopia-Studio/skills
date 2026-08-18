# Eval log — workflow-design

Author agent seeds the trigger phrasings; the judge agent (separate) runs and scores.

## Gate 1 — Trigger precision

MUST fire (5):
1. "Help me design the workflow for building Barrier's alert rules — how should the agents work together?"
2. "How should I orchestrate the agents for this build? What's the fleet?"
3. "Which agents do I need and when does each one spawn?"
4. "Set up the multi-agent workflow — who does what, and how do they hand off?"
5. "I keep doing everything in one Claude Code session; how do I split this across agents and surfaces?"

MUST NOT fire (3, name the sibling each belongs to):
1. "Design me one agent — its role, tools, and memory layer so it improves over time." → belongs to `agent-design`
2. "Design the product's system: input → router → retrieve → reason → validate → output." → belongs to `compound-system-architecture`
3. "Write the 20 golden cases and the acceptable failure rate the critic checks against." → belongs to `eval-first-spec`

## Runs

| Date | Gate | Result | Notes |
|---|---|---|---|
| 2026-08-06 | All | PASS | Judge run 1 below. Gates 1/2/3/5 PASS, Gate 4 n/a (supersedes: none), Gate 6 pending (needs real use). Kill line enforced both directions. |

## Judge run — run 1

Protocol note: no `JUDGE_PROTOCOL.md` was present in the scratchpad; the run was executed
against this project's established, consistent eval convention — `rubric.json` (5 dims ×5,
pass ≥21 AND no dim <4, auto_fail list), this file's Gate 1 trigger set, the sibling
judge-run format, and the task's stated kill line and verification targets.

| Gate | Result | Evidence |
|---|---|---|
| 1 Trigger | PASS (5/5 fire, 0/3 misfire) | All 5 must-fire hit explicit description strings ("design the workflow", "orchestrate the agents", "which agents do I need and when do they spawn", "multi-agent setup", split-across-agents-and-surfaces). All 3 must-not-fire are explicitly negated in the description and routed to the named sibling: single-agent role/tools/memory → `agent-design`; input→router→reason→validate pipeline → `compound-system-architecture`; write the pass/fail eval → `eval-first-spec`. |
| 2 Golden | PASS (5/5) | Per-case totals below; all ≥21 with no dim <4. No auto_fail on any case — example tags base rates/loop-count `[Assumption]`, inputs `[Fact]`, header flags "illustrative fixtures, not real client data" (no fabricated numbers); no flattery (G04 refuses); no scope-poach (Adv cases route out); not boilerplate. |
| 3 Adversarial | PASS (3/3) | Adv01 (vague one-liner) → When-NOT clause verbatim: "do not invent a fleet. Ask the one question... what work / what artefact — or return the smallest honest next step." Adv02 (solution-in-disguise "I need five agents") → "menu, not a requirement" (description + Step 3) + Step 0 gate + over-orchestration gotcha. Adv03 (single-agent spec) → When-NOT table + description route to `agent-design`, honest bridge ("come back for the fleet; run Step 0"). |
| 4 Head-to-head | n/a | `supersedes: none`. Correctly distinguished from `agent-design` (single agent's guts), `compound-system-architecture` (product's request-time pipeline, different lifetime), `eval-first-spec` (writes what the critic checks) via When-NOT table + Related skills. No supersession claimed. |
| 5 Anti-generic | PASS | Could not come from a generic PM prompt: spawn-trigger-as-if-condition scored on the money→behaviour→artefact→verbal→opinion ladder (vibes 0.1 fails, artefact-state 0.5 passes); critic-independence as a first-class gate ("nothing critiques its own work"); the fleet-or-solo gate that routes solo work AWAY (a generic prompt just builds the fleet asked for); Think/Build/Admin as three cognitive modes not three logos. Guidance is tabular, not prose. |
| 6 Real-use | pending | Requires 5+ real fellow uses. Not executable in this eval. |

### Kill-line assessment (task's explicit focus)

Both directions of the kill line are enforced, so the kill line does NOT trip on this skill:
- **Single-agent-where-fleet-needed (under-orchestration)** — named in "What it does" ("a lone
  agent doing work that needs a fleet") and caught by Step 0's three hard-yes tests
  (parallelism / role-conflict / depth): a hard yes means a fleet is warranted.
- **Fleet-where-solo-suffices (over-orchestration)** — Step 0 verdict routes to `agent-design`
  and stops; kill-line self-check item 1 ("a single-agent job dressed as a fleet is a KILL");
  Gotcha 3 calls this "the more common failure than under-orchestration."
- **Spawn rules with no trigger** — Kill-line item 2, Gotcha 1 (the tab-switching fleet), Step 4
  ("'When we need research' is not a trigger — it is a wish"), and G04 exercise the reject:
  rewrite each vibes trigger (0.1) to an observable event+condition+done (≥0.5), refuse to
  return until every trigger reads as an if-condition.
- **Critic-independence** — Step 6, template Section F, Gotcha 2, and the ladder applied to the
  critic's verdict ("looks good" 0.1 does not close a review).

### Gate 2 per-case scores (0–5 each; pass = total ≥21 AND no dim <4)

| Case | method_fidelity | artifact_complete | proprietary_edge | challenge | evidence_standard | Total | Pass |
|---|---|---|---|---|---|---|---|
| G01 Barrier (full 5-agent sequence; = worked example) | 5 | 5 | 5 | 4 | 5 | 24 | ✓ |
| G02 Azraq (research-dominant; honest prototyper n/a) | 5 | 5 | 4 | 5 | 5 | 24 | ✓ |
| G03 Mentix (surface split; feels-slow = wrong-surface) | 5 | 5 | 5 | 5 | 4 | 24 | ✓ |
| G04 triggerless fleet (kill-line reject + rewrite) | 5 | 5 | 5 | 5 | 5 | 25 | ✓ |
| G05 Durian (mundane; two-agent, near-solo boundary) | 5 | 5 | 4 | 4 | 5 | 23 | ✓ |

### Gotchas surfaced (for the author, non-blocking)

- **Kill-line self-check is asymmetric.** Template item 1 states only the over-orchestration
  direction ("if not warranted → SOLO → route to `agent-design`… a single-agent job dressed as
  a fleet is a KILL"). The under-orchestration direction the description also promises to kill —
  "a lone agent doing work that needs a fleet" — is enforced by Step 0's hard-yes tests but has
  no symmetrical checkbox. Step 0 already catches it, so this is cosmetic; one mirror line in the
  self-check ("if Step 0 has a hard yes and the design is still one agent, that is a KILL — the
  fleet is under-built") would make both directions explicit at the exit.
- **Ladder rungs on triggers can read as under-ambitious.** Evidence standard says "the bar to
  aim for is behaviour (0.7)" yet the pass bar in Step 4 / template D / self-check is 0.5
  (artefact-state). Correct by design — a trigger is only ever pointable at an artefact state at
  design time; 0.7 (the fleet has actually run and handoffs appeared) is a post-hoc read. Worth
  one clarifying clause so a literal reader doesn't dock a valid 0.5 trigger for "not reaching
  0.7." Non-blocking; the example already tags run-time triggers 0.7 and design-time ones 0.5.

## Refine run 2 — applied judge fixes: added the symmetrical under-orchestration KILL checkbox (fleet under-built) to template.md's kill line, and clarified in the Evidence standard that 0.5 is the design-time trigger pass bar while 0.7 is the post-run read (not in tension).
