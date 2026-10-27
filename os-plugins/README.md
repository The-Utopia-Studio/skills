# UtopiaOS plugins for Claude Code

Two plugins that let work a fellow approves with Cobi in UtopiaOS reach their Claude Code with no check-in to type.

| Plugin | What it does | Install |
|---|---|---|
| `utopia-os` | When a session starts, Claude sees the approved work and does it on the fellow's first message | `/plugin install utopia-os@skills` |
| `utopia-os-channel` | Pilot: new approved work arrives in an open session by itself. Uses Claude Code channels (research preview) | `/plugin install utopia-os-channel@skills`, then start Claude with `claude --dangerously-load-development-channels plugin:utopia-os-channel@skills` |

Both need UtopiaOS connected to Claude Code from the AI tools page in UtopiaOS, and reuse that connection. Each folder's README has the details.

**Don't edit these folders here.** The source of truth is `plugins/` in The-Utopia-Studio/utopiaos, where they're tested (`apps/web/lib/claude-plugins.test.ts`). Copy changes over from there. They live outside `plugins/` because `build-packs.sh` regenerates that folder, and they're listed under `externalPlugins` in `packs.config.json`.
