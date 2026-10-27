# utopia-os (Claude Code plugin)

When a Claude Code session starts, this plugin asks UtopiaOS for the work you approved with Cobi (installing a skill, a setup check, adding your venture to AGENTS.md) and puts it in front of Claude. Whatever your first message is, Claude starts by doing that work. There's no check-in to type.

- Needs UtopiaOS connected to Claude Code from the AI tools page (`/fellow/connect`). The plugin reuses that connection: it reads the "utopia" server's address and token from Claude Code's own settings, and never stores or sends them anywhere else.
- Claude does work you approved in UtopiaOS without asking again. Its own permission prompts (for example before running a command) still apply. It asks first about anything the studio queued.
- If UtopiaOS can't be reached, the session starts as normal.

Install: `/plugin marketplace add The-Utopia-Studio/skills` (once), then `/plugin install utopia-os@skills`, then start a new session.

Source of truth: `plugins/utopia-os` in the UtopiaOS repo. `apps/web/lib/claude-plugins.test.ts` tests it.
