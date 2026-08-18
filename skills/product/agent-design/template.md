# Agent Spec — v1

Fill every part. Order is deliberate: least-owned to most-owned. An agent spec ships only with a memory layer whose stores each have a load trigger AND a writer, at least one store that accrues from the agent's own runs, a named compounding mechanism, and an eval routed to `eval-first-spec`. Anything less is a chatbot with tools; report the gap.

---

## Part 1 — Role: one owned decision

> At [TRIGGER], the agent decides [THE ONE DECISION] for [WHO], at autonomy [L0–L4].

**Role line:** _[write it — one decision, not "assistant/copilot for X"]_

**Autonomy level:** _[L0 / L1 / L2 / L3 / L4]_ — carried from `eval-first-spec`, not chosen here. _[Fact/Assumption]_

If you cannot name a single decision, stop. "An agent for X" is an engine, not a role. Name what is missing and go get it. Do not invent it. (Voice / phrasing of the output → `agent-persona-builder`, not this spec.)

---

## Part 2 — Tools: the commodity shell

The fewest tools that deliver the role. Every tool must be exercised by ≥1 eval case, or cut it.

| Tool | Its one job | Blast radius | Guardrail before it fires | Exercised by eval case(s) |
|---|---|---|---|---|
| _[name]_ | _[job]_ | _[Read / Write-reversible / Write-irreversible]_ | _[check, or "none — read-only"]_ | _[case #s]_ |
|  |  |  |  |  |
|  |  |  |  |  |
|  |  |  |  |  |

**Tool checks:**
- No tool's blast radius exceeds the autonomy level (at L1, no tool that *commits*): _[Yes / No — list any]_
- Every tool is called by ≥1 eval case: _[Yes / No — cut the unused]_
- High-blast tools routed to `guardrail-design`: _[Yes / N-a]_

---

## Part 3 — Memory layer: the part you own

Fill every column. A store with no load trigger never loads; a store with no writer stays empty; neither compounds.

| Store | Holds (for THIS agent) | Written by | Load trigger | Source |
|---|---|---|---|---|
| **CLAUDE.md** | _[system facts, org map, standing rules, thresholds]_ | Human, curated | At birth, every run | _[Fact/Assumption]_ |
| **skills** | _[tell-able procedures it invokes]_ | Explicit capture (`explicit-vs-tacit-capture`) | Registered at birth; invoked on demand | _[Fact/Assumption]_ |
| **lessons.md** | _[what corrections/failures get logged]_ | Agent/operator, at correction time | At birth, every run | _[Fact/Assumption]_ |
| **trace archive** | _[input · output · human edit · outcome, per run]_ | System, automatically | Sampled to eval + discovery | _[Fact/Assumption/Hypothesis]_ |

### Ownership test (why this layer is the moat)

| Part | Who owns it | Copyable? |
|---|---|---|
| Base model | Rented from a lab | Yes — improves for everyone at once |
| Tools | Commodity APIs | Yes |
| Role / prompt | One screenshot | Yes |
| **Memory layer** | Your traces + your corrections | **No — path-dependent, unique to you** |

### Compounding mechanism (the load-bearing line)

> The [store] entry "[the correction / trace]" logged at [when] turns [which eval behaviour] from [worse] to [better] on the [next] re-run.

**Named mechanism:** _[write the concrete run that got better because of what memory captured]_

If you cannot name one, the memory layer is a filing cabinet. Say so, and state what would have to be written and loaded for it to compound.

---

## Part 4 — Eval: what it gates

The agent's scoreable contract lives in `eval-first-spec` (job line + 20 golden cases + autonomy + cost-per-outcome). Do not restate it here. Point at it and record what it gates.

| Field | Value |
|---|---|
| Eval location | _[link / status: exists · to-be-built via `eval-first-spec`]_ |
| Autonomy level (carried) | _[L0–L4]_ |
| Cost-per-outcome (carried) | _[$ to the cent]_ _[Fact/Assumption]_ |
| Golden cases drawn from | _[the trace archive above — cite it]_ |

**The eval gates:**
- Model swap → new model ships only if it holds the eval. _[stated? Yes/No]_
- Autonomy promotion → level rises only on a measured pass rate over N cycles. _[N = ?]_
- Compounding proof → the eval reads whether run N beat run N−1 after memory was written. _[Yes/No]_

If the eval does not exist yet, the agent is not ready to build. Route to `eval-first-spec` first.

---

## Kill-line check

- [ ] Role is ONE owned decision (not "assistant for X") with an autonomy level
- [ ] Tools are minimal; each exercised by ≥1 eval case; none exceed the autonomy level
- [ ] Memory layer has all four stores, each with a load trigger AND a writer
- [ ] At least one store (lessons.md or trace archive) accrues from the agent's OWN runs
- [ ] The compounding mechanism is named concretely
- [ ] The eval exists (routed to `eval-first-spec`) and gates model-swap + autonomy + compounding

Any box unchecked = not an agent spec yet. State exactly which, and the smallest next step to fill it. If the memory layer cannot compound (a stateless reformatter, no corrections worth logging), say so: this is a skill or a prompt, not an agent.
