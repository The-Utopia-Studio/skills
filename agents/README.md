# Utopia Internal Agents

Named, persistent AI agents with distinct personalities, durable cross-session memory, and clear operating rules. Methodology adapted from [Jack & Jill's agent-builder framework](https://github.com/Jack-and-Jill-AI/Jack_and_Jill_AI_Guides/blob/main/agent-builder-skill.md).

## Why agents (instead of just skills)?

Skills are utility-shaped — anyone can call them. But that asks the user to remember which skill applies when. Agents wrap related skills in a **persona** with a name, a voice, and a memory.

The cognitive ask is smaller:
- *"What skill do I use for technical due diligence?"* → confusing
- *"Run DD as Ada"* → obvious

Personas also give Claude a clearer trigger pattern and a consistent voice across sessions. Without explicit personality enforcement, AI output drifts toward generic-Claude voice.

## The three Utopia agents

| Agent | Role | When to call |
|-------|------|-------------|
| **[Ada](./ada/)** | Technical due diligence analyst | "Run DD on [company]", "Audit this repo", "Is this technically sound?" |
| **[Khalil](./khalil/)** | Pitch deck builder | "Build a deck", "Turn these notes into slides", "Investor presentation" |
| **[Salim](./salim/)** | Studio fellow coach | "I'm stuck", "What should I do next?", "Review my [discovery work]" |

## How they work

Each agent has four canonical files:

| File | Purpose |
|------|---------|
| `SOUL.md` | Personality, voice, signature phrases, anti-patterns. Non-negotiable. |
| `AGENTS.md` | Operating manual — triggers, permissions, skills they compose, escalation. |
| `MEMORY.md` | Persistent cross-session knowledge. Until something is here, the agent doesn't know it. |
| `BOOTSTRAP.md` | First-boot orientation guide. Archived after initial setup. |
| `references/` | Workflow procedures (one .md per major workflow). |

Plus a **deployable copy** at `skills/agents/<name>/SKILL.md` that makes the agent invokable from the Utopia marketplace.

## Installing the agents

```
/plugin marketplace add The-Utopia-Studio/skills
/plugin install utopia-internal-agents@skills
```

That installs all four: `agent-persona-builder`, `ada`, `khalil`, `salim`.

## Using an agent

Just say the trigger phrase. Claude will identify the right agent and load their SOUL/AGENTS/MEMORY files automatically:

- "Run DD on this GitHub repo: [URL]" → Ada activates
- "Build me a syndication deck from these Granola notes" → Khalil activates
- "I'm in M2 and I think I'm stuck on JTBD" → Salim activates

You can also call them by name: *"Ada, run DD on this."*

## Designing your own agent

Use the **[`agent-persona-builder`](../skills/meta/agent-persona-builder/SKILL.md)** skill. It walks you through 25 questions across 5 phases (Identity & Voice → Purpose & Mechanics → Outputs & Communication → Continuity & Memory → First Workflow) and produces the four canonical files.

Trigger it by saying: *"Help me design an agent for [role]."*

## Where agents differ from skills

| | Skills | Agents |
|---|--------|--------|
| Shape | Utility / workflow | Persona with voice |
| Invocation | By name or trigger description | By name or natural language ("Ada, run DD") |
| Memory | Stateless | Persistent across sessions (MEMORY.md) |
| Voice | Inherits Claude's default voice | Distinct, opinionated voice locked in SOUL.md |
| Use case | "I need X done" | "I need someone who does X, consistently" |

Agents compose skills — they're not a replacement.

## Roadmap

Built so far:
- ✅ **Ada** — DD analyst
- ✅ **Khalil** — pitch deck builder
- ✅ **Salim** — fellow coach

Potential future agents (build only when needed):
- **Maya** — Azraq engine reviewer (IP defensibility + risk modeling)
- **Iman** — LP relations agent (quarterly updates, LP comms)
- **Rana** — portco success coach (post-investment quarterly check-ins)

The principle: don't build an agent until you have a workflow you've done 5+ times manually. Otherwise it's premature persona-engineering.

## Methodology

These agents follow the [Jack & Jill agent-builder methodology](https://github.com/Jack-and-Jill-AI/Jack_and_Jill_AI_Guides/blob/main/agent-builder-skill.md) — 25 questions across 5 phases, four canonical files, opinionated defaults instead of blank templates.

Key principles:

1. **Memory is explicit, not implicit.** Document every gotcha to MEMORY.md the moment it's discovered.
2. **Opinionated defaults beat blank templates.** Generic personas drift toward generic-Claude voice.
3. **Start with one validated workflow.** Don't design the agent's full scope upfront.
4. **Strong personality is non-negotiable.** Without distinct voice, agents become generic.

## See also

- [`agent-persona-builder` skill](../skills/meta/agent-persona-builder/SKILL.md) — design new agents
- [Source methodology](https://github.com/Jack-and-Jill-AI/Jack_and_Jill_AI_Guides/blob/main/agent-builder-skill.md)
- [Anthropic Skills guide](https://medium.com/@tortmario/skills-for-claude-code-the-ultimate-guide-from-an-anthropic-engineer)
