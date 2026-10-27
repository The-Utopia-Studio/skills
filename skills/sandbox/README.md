# Sandbox

A staging area for experimental skills that aren't ready for the official [packs](../../packs.config.json) yet.

## Why a sandbox?

From the [Anthropic Skills guide](https://medium.com/@tortmario/skills-for-claude-code-the-ultimate-guide-from-an-anthropic-engineer) — it's easy to create duplicate or low-quality skills. A sandbox lets you:

- Try ideas before committing to them
- Share a skill with the team to get feedback
- Iterate in public without bloating everyone's context

## How it works

1. **Propose:** Drop your new skill in this folder as `skills/sandbox/<skill-name>/SKILL.md`
2. **Share:** Open a PR or post the link in Slack so others can try it
3. **Graduate:** When it's battle-tested and useful, move it to the right category (e.g. `skills/design/`) and add it to a pack in [`packs.config.json`](../../packs.config.json)

See [`CONTRIBUTING.md`](../../CONTRIBUTING.md) for the full curation process.

## Installing sandbox skills

Sandbox skills are **not** in any pack — they don't auto-install. To try one:

```bash
# Copy to your Claude Code skills dir
cp -r skills/sandbox/<skill-name> ~/.claude/skills/
```

Or symlink via skillshare.

## Retired from packs (2026-10 consolidation)

These were removed from the packs because they don't work without a paid data feed or local setup that most users won't have, or because they're too niche for founders, fellows and the fund. They're kept here unchanged so anyone who needs one can copy it in.

| Skill | Why it left the packs |
|-------|-----------------------|
| `bond-futures-basis`, `bond-relative-value`, `fixed-income-portfolio`, `fx-carry-trade`, `macro-rates-monitor`, `option-vol-analysis`, `swap-curve-strategy`, `equity-research` | Every step needs LSEG/Refinitiv MCP tools; no fallback. Rates, FX and public-equity desk work. |
| `earnings-preview-single` | Kensho / S&P Global MCP only, with web search explicitly forbidden. |
| `earnings-analysis`, `initiating-coverage`, `capital-structure-optimizer`, `lbo-model` | Public-markets / PE buyout work; `lbo-model` also needs an example workbook that was never in the repo. |
| `huggingface-paper-publisher` | Publishing research papers on the HF Hub; little use for founders, fellows or the fund. |
| `sketch-prompt` | Needs a local ComfyUI + Flux install at hard-coded personal paths. |
| `kmjp-social` | Personal ghost-writer for one person, tied to their local files. |
| `executive-onboarding-playbook`, `review-resume`, `sql-queries` | Career/hiring or generic tasks Claude does well without a skill. |
