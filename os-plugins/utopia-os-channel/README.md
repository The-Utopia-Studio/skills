# utopia-os-channel (pilot)

Work you approve with Cobi reaches your **open** Claude Code session by itself: Claude starts on it with nothing typed.

This uses Claude Code [channels](https://code.claude.com/docs/en/channels), a research preview:

- Start Claude with `claude --dangerously-load-development-channels plugin:utopia-os-channel@skills`. During the preview, a channel that isn't on Anthropic's allowlist only loads with this flag, and Claude Code shows a warning dialog first. A shell alias saves typing it.
- Channels need a claude.ai login or a Console API key. Team and Enterprise organisations must switch channels on (Organization settings > Claude Code > Channels).
- Events only reach an open session. Work approved while Claude is closed is picked up by the `utopia-os` plugin's session-start hook, so install both.

How it works: a small local process asks UtopiaOS every 30 seconds for new approved work, using the connection you already gave Claude Code. It backs off when UtopiaOS can't be reached, and stops if the token is refused. It never listens on a port.

Source of truth: `plugins/utopia-os-channel` in the UtopiaOS repo. `apps/web/lib/claude-plugins.test.ts` tests it.
