# Worked example — Barrier Intelligence permit-hazard reviewer agent

Barrier Intelligence builds gas-safety software for oil & gas fields. This specs the single agent behind its first workflow: reviewing a permit-to-work against live gas readings and field logs. It picks up after `eval-first-spec` set the autonomy level (L1) and cost-per-outcome. This is a test fixture — numbers are illustrative, not real client data. Every claim is tagged `[Fact]` (measured on real traces / logs), `[Assumption]` (projected), or `[Hypothesis]` (unbuilt).

## Input the fellow brought

"We've run permit reviews by hand alongside the safety officer on Rig 7 for six weeks — every permit, the gas grid readings, the officer's decision, and what actually happened are logged. We want to turn this into an agent. What does it need to be built from?"

Artefacts on the table:
- Six weeks of hand-run reviews: permit input, gas-grid readings, officer decision, outcome — all in the event stream. [Fact]
- The `eval-first-spec` job line + 20 golden cases (drawn from those six weeks), autonomy **L1**, cost-per-outcome **$1.20/permit**. [Fact]
- Because the workflow was run by hand first, the trace archive already has real runs — it is not a hope. [Fact]

---

## Part 1 — Role: one owned decision

> At each permit request on Rig 7, the agent decides **hold-or-proceed on the gas hazard** and drafts the reason for the duty safety officer — autonomy **L1**, the officer commits every one. [Fact, carried from `eval-first-spec`]

Not "an AI copilot for safety officers." One decision: hold or proceed. The officer still commits — that is what L1 means, and it is why no tool below can clear a permit on its own. How the draft is *worded* is `agent-persona-builder`'s job; not designed here.

---

## Part 2 — Tools: the commodity shell

| Tool | Its one job | Blast radius | Guardrail | Exercised by eval case(s) |
|---|---|---|---|---|
| `read_gas_grid` | Pull current sensor readings for the permit's zone | Read | none — read-only | 1, 3, 7, 14, 17 |
| `read_field_logs` | Pull recent field + drain logs for the zone and adjacent zones | Read | none — read-only | 8, 12, 17 |
| `draft_recommendation` | Write a hold/proceed draft + reason to the permit board | Write-reversible (draft, uncommitted) | L1 sign-off: officer commits; nothing auto-posts | 1–20 |
| `escalate` | Flag to the duty safety officer | Write-reversible | fires on low confidence OR any zone with an override in lessons.md | 15, 16, 17, 18 |

**Tool checks:**
- No tool commits a permit. There is deliberately **no** `commit_permit` tool — at L1 that is the human's, and a tool that could auto-clear a hot-work permit exceeds the autonomy level. [Fact]
- Every tool is called by ≥1 eval case. `read_field_logs` earns its place on the adjacent-zone cases; without those it would be cut.
- `draft_recommendation` and `escalate` are Write-reversible; their guardrails route to `guardrail-design`. [Assumption]

The tool section is short on purpose. These four are commodity; a competitor could wire them in an afternoon. The value is Part 3.

---

## Part 3 — Memory layer: the part you own

| Store | Holds (for this agent) | Written by | Load trigger | Source |
|---|---|---|---|---|
| **CLAUDE.md** | Rig 7 zone map; H2S / LEL thresholds per zone; permit taxonomy (hot-work, confined-space, cold-work); duty-officer escalation contact | Human, curated | At birth, every run | [Fact] |
| **skills** | `permit-hazard-classify` (tell-able rule set), `gas-threshold-lookup` | Explicit capture (`explicit-vs-tacit-capture`) | Registered at birth; invoked per permit | [Fact] |
| **lessons.md** | One entry each time the officer **overrides** the draft: what the agent missed and the rule that prevents it | Officer/operator, at override time | At birth, every run | [Fact] |
| **trace archive** | Every review: permit input, gas readings, draft, officer decision, actual outcome | System, automatically | Sampled into the eval + `trace-to-interview` | [Fact — six weeks already logged] |

### Ownership test

| Part | Who owns it | Copyable? |
|---|---|---|
| Base model | Rented from a lab | Yes — a rival rents the same one |
| The four tools | Commodity APIs | Yes — an afternoon |
| Role / prompt | One screenshot | Yes |
| **Memory layer** | Rig 7's own overrides + traces | **No — this rig's exhaust, unique to Barrier** |

The model that reads gas readings improves for every safety-software vendor at once. Rig 7's lessons.md — the specific ways *this field's* geometry fools a sensor grid — improves only for Barrier. That is the moat (argued fully in `moat-design-canvas`).

### Compounding mechanism (named)

> The lessons.md entry logged in **week 2** — *"agent cleared a hot-work permit in Zone 4 on in-zone sensors reading clean; officer held it because an adjacent drain had trapped H2S the grid does not cover. Rule: cross-check adjacent-zone drain logs, not just in-zone sensors"* — turns **golden case #17** (the trapped-adjacent-gas adversarial case) from **fail to pass** on the **week-3 re-run**. [Fact]

That is compounding: a real override, written the moment it happened, loaded at birth, moved a scored case. Six weeks in, lessons.md has 4 such entries and the trace archive has ~90 runs. Run 90 is measurably sharper than run 1 *because of* what those entries added — not because the model changed.

---

## Part 4 — Eval: what it gates

| Field | Value |
|---|---|
| Eval location | `eval-first-spec` spec, 20 golden cases drawn from the trace archive [Fact] |
| Autonomy level (carried) | L1 [Fact] |
| Cost-per-outcome (carried) | $1.20/permit [Assumption, from spec] |
| Golden cases drawn from | the six weeks of hand-run traces above |

**The eval gates:**
- Model swap → a new model ships only if it holds the eval; the **Miss** rate (cost of one miss ≈ a fatality) must not regress, whatever the headline benchmark says. [Fact — this is why the eval exists]
- Autonomy promotion → L1 → L2 only if Miss ≤ its derived rate over N real permits (N and the rate come from `eval-first-spec`, not invented here).
- Compounding proof → the eval is what showed case #17 flip from fail to pass after the week-2 lesson. Without it, "the agent seems better now" would be opinion (0.1).

The eval is not restated here. It is `eval-first-spec`'s artefact; this spec points at it and carries its numbers.

---

## Kill-line check

- [x] Role is one owned decision (hold/proceed) with autonomy L1
- [x] Four tools, each exercised by ≥1 eval case, none exceed L1 (no commit tool)
- [x] Memory layer has all four stores, each with a load trigger AND a writer
- [x] lessons.md and the trace archive accrue from the agent's own Rig 7 runs
- [x] Compounding mechanism named (week-2 Zone-4 override → case #17 fail→pass)
- [x] Eval exists (`eval-first-spec`) and gates model-swap, autonomy, and compounding

Ships. Had Barrier arrived before running the workflow by hand, the trace archive would be `[Hypothesis]` and the honest answer would have been: "run it manually for a few weeks to seed real traces, then design the agent" — not this spec.

## What a generic prompt would have gotten wrong here

It would have written a longer tool list (adding a `commit_permit` tool that violates L1), designed a "personality," and described the memory as "the agent remembers past permits" with no store, no writer, no load trigger, and no named run that got better. This spec inverted that: four tools and no commit, no persona, and a memory layer whose one logged override is traced to a specific scored case flipping — the only part Barrier owns, and the only part that compounds.
