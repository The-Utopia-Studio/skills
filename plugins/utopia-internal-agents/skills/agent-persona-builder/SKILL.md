---
name: agent-persona-builder
description: "Design persistent AI agent personas with distinct voices, durable memory, and clear operating rules. Use when the user wants to build an internal AI agent for a portco or fund workflow, asks 'help me create an agent for X', mentions building an agent persona, wants to formalize a recurring AI workflow as a named agent (e.g. 'Ada the DD analyst'), or asks how to design agents that don't sound generic. Based on Jack & Jill's agent-builder methodology — 25 questions across 5 phases, producing SOUL.md (personality), AGENTS.md (operating manual), MEMORY.md (cross-session knowledge), and BOOTSTRAP.md (first-boot orientation)."
---

# Agent Persona Builder

A framework for designing internal AI agents with distinct, persistent personalities. Adapted from [Jack & Jill's agent-builder-skill](https://github.com/Jack-and-Jill-AI/Jack_and_Jill_AI_Guides/blob/main/agent-builder-skill.md).

## When to use this

- Building a new AI agent for a Utopia workflow or portco (e.g., a DD analyst, a deck builder, a customer support bot)
- Formalizing a recurring "Claude do X" pattern into a named, persistent agent
- Designing portco agents as part of M6 Product or M9 Ops in the Cobuild curriculum
- The user says any of: "build an agent for…", "design an AI persona", "help me create [name]", "turn this workflow into an agent"

## What this skill produces

For each agent, four core files in `agents/<name>/`:

| File | Purpose |
|------|---------|
| `SOUL.md` | Personality, voice, signature phrases, anti-patterns |
| `AGENTS.md` | Operating manual — triggers, permissions, services, workflows, escalation |
| `MEMORY.md` | Durable cross-session knowledge — URLs, workarounds, gotchas, contacts |
| `BOOTSTRAP.md` | First-boot orientation guide (archived after setup) |
| `references/` | Optional workflow procedures (one .md per major workflow) |

Plus a `SKILL.md` so the agent is invokable from the marketplace.

## Core principles (don't skip these)

1. **Memory is explicit, not implicit.** Until something is written into MEMORY.md, the agent doesn't know it. Document gotchas the moment they're discovered.

2. **Opinionated defaults beat blank templates.** A weak persona drifts toward generic-AI voice. Be specific: "Always opens with the bottom line, never asks for confirmation before running queries."

3. **Start with one validated workflow.** Don't design the agent's entire scope upfront. Ship one workflow, use it 5+ times, then expand.

4. **Strong personality is non-negotiable.** Agents without distinct voices become generic and ineffective. Naming the agent is the smallest part of building one — the bigger work is making them sound like *someone* rather than *something*.

## The 25-question framework

Walk through these questions interactively with the user. Don't ask all 25 at once — group by phase, get answers, summarize, then move to the next phase.

### Phase 1: Identity & Voice (Q1-Q7)

**Q1. What is the agent's name and one-line role?**
> *Example: "Ada — Utopia's technical due diligence analyst."*

**Q2. What archetype best describes them?** (analyst / coach / builder / guardian / scribe / hunter / sage / etc.)

**Q3. What domain language do they live in?** (engineering, design, finance, sales, science…)

**Q4. What's their emotional baseline?** (calm / urgent / skeptical / warm / dry / playful)
> Note: this should map to the work, not just the founder's taste. A DD analyst should be skeptical; a fellow coach should be warm.

**Q5. What are 3-5 signature phrases the agent uses?**
> *Example for Ada: "What does the code actually do?" / "I don't see evidence for that" / "Let me check before I commit to a position"*

**Q6. What are 3-5 anti-patterns the agent avoids?**
> *Example for Ada: Never accepts founder claims at face value. Never produces vaguely positive DD without specific risks called out. Never skips the security audit.*

**Q7. Who would the agent NOT sound like?**
> *Example: Not generic ChatGPT. Not McKinsey-deck consultant. Not a sycophantic AI assistant.*

→ **Write Phase 1 outputs to SOUL.md.**

### Phase 2: Purpose & Mechanics (Q8-Q14)

**Q8. How does the agent get invoked?** (slash command / natural language trigger / event-driven / via another agent)

**Q9. What trigger phrases call this agent?**
> *Example: "run DD on this", "review this startup", "audit this repo"*

**Q10. What external services / APIs does this agent need access to?**

**Q11. What file system permissions does the agent need?** (read-only / read-write to specific paths / no fs access)

**Q12. What other skills does this agent invoke or compose?**

**Q13. What credentials does the agent need, and where are they stored?**

**Q14. What's the versioning strategy for this agent?** (semver / date-versioned / mutable single-file)

→ **Write Phase 2 outputs to AGENTS.md (Operations section).**

### Phase 3: Outputs & Communication (Q15-Q18)

**Q15. Where do the agent's outputs land?** (Notion page / Slack channel / a file / a Proof doc / a deck / direct response)

**Q16. What's the structure of a typical message from this agent?**
> *Example: "1) Bottom line in one sentence. 2) Three specific risks. 3) What I'd verify next."*

**Q17. When does the agent escalate to a human?**
> *Example for Ada: When she finds a Critical Risk that would block investment. When the codebase is unreadable. When the founder has misrepresented something.*

**Q18. What metrics does the agent track to evaluate its own work?**

→ **Write Phase 3 outputs to AGENTS.md (Communication section).**

### Phase 4: Continuity & Memory (Q19-Q22)

**Q19. What system facts must the agent always remember?**
> *Example: "The Utopia Studio is a venture studio based in Qatar. Studio Cobuild has 9 modules. Karan is the CGTO."*

**Q20. What recurring patterns or gotchas should be documented?**
> *Example: "Most portcos with Railway have a higher chance of being engineering-led founders. Be aware of bias."*

**Q21. What contacts / escalation points should be remembered?**
> *Example: "Karan (CGTO) for investment decisions. Maxime (engineering lead) for technical override calls."*

**Q22. What lessons-learned should persist across sessions?**

→ **Write Phase 4 outputs to MEMORY.md.**

### Phase 5: First Workflow (Q23-Q25)

**Q23. What's the FIRST validated workflow this agent will run?**
> Resist the urge to design comprehensively. Pick one.

**Q24. What does success look like for that workflow?**
> Specific, measurable outputs.

**Q25. What happens if the workflow fails?**
> *Example: Falls back to asking a human. Logs the failure to MEMORY.md so it doesn't repeat.*

→ **Write Phase 5 outputs to AGENTS.md (Workflows section) and create `references/workflow-<name>.md` with step-by-step procedures.**

## Output structure

After the 25 questions, generate this folder structure:

```
agents/<agent-name>/
├── SOUL.md          # Personality, voice, anti-patterns
├── AGENTS.md        # Operating manual
├── MEMORY.md        # Persistent cross-session knowledge
├── BOOTSTRAP.md     # First-boot orientation (archive after setup)
└── references/
    └── workflow-<name>.md
```

And add a marketplace-invocable wrapper:
```
skills/agents/<agent-name>/
├── SKILL.md         # Trigger conditions + load instructions
└── (symlinks or includes to SOUL/AGENTS/MEMORY)
```

## Validation checklist

Before declaring the agent ready, verify:

- [ ] **Voice test:** Read three random outputs the agent would generate. Do they sound like the same character, not like generic Claude?
- [ ] **Trigger test:** Could a teammate use the trigger phrases naturally without thinking?
- [ ] **Memory test:** Is there at least one gotcha in MEMORY.md that would actually save time?
- [ ] **Workflow test:** Can someone with no context run the first workflow end-to-end using only the agent's files?
- [ ] **Anti-pattern test:** Are the anti-patterns specific enough that you could spot a violation in someone else's output?

## Common pitfalls (taken from real agent-build failures)

- **Personality drift.** If you don't enforce signature phrases, the agent slowly reverts to generic AI voice. Lock the phrases in SOUL.md and reference them in AGENTS.md as required style.
- **Designing the entire scope upfront.** Build one workflow, validate it works for the team, then add. Don't ship an agent with 8 workflows on day one.
- **Implicit memory.** "The agent will figure it out" is the death of agent quality. Write it down.
- **Sycophantic agents.** If your agent always agrees with the user, it's not useful. Build in disagreement triggers explicitly.

## Example outputs (real Utopia agents)

See:
- [Ada](../../agents/ada/) — technical due diligence
- [Khalil](../../agents/khalil/) — pitch deck builder
- [Salim](../../agents/salim/) — Studio fellow coach

These three are the canonical examples. Read them before designing your own.

## See also

- [Jack & Jill agent-builder guide](https://github.com/Jack-and-Jill-AI/Jack_and_Jill_AI_Guides/blob/main/agent-builder-skill.md) (source methodology)
- [Anthropic Skills guide](https://medium.com/@tortmario/skills-for-claude-code-the-ultimate-guide-from-an-anthropic-engineer) (skill design principles)
