# Static checks

What `scripts/static_check.py` checks, why it matters, and how to fix each finding. **Errors** block a Ship verdict. **Warnings** go in the report and are fixed at the author's discretion.

## Contents
- Frontmatter
- Body and structure
- Paths and references
- Scripts
- Portability and safety
- Checks the script can't do

## Frontmatter

| Check | Level | Why | Fix |
|---|---|---|---|
| Frontmatter block present and parseable | error | Without it the skill never loads | Start the file with `---`, `name:`, `description:`, `---` |
| `name` is 1–64 chars, lowercase letters, digits and hyphens only | error | Platform rule; other names are rejected or mangled | Rename (also rename the folder) |
| `name` contains no reserved word (`anthropic`, `claude`) | error | Platform rule | Rename |
| `name` matches the folder name | error | Packs and invocations use the folder name; a mismatch routes to the wrong name | Make them identical |
| `description` present and non-empty | error | It's the only thing Claude reads when choosing a skill | Write what it does and when to use it |
| `description` at most 1024 chars | error | Platform limit; longer text is cut | Trim trigger lists, merge near-synonyms |
| `description` under 200 chars | warning | Usually too thin to route well among hundreds of skills | Add "Use when …" triggers in the user's own words |
| Description written in first or second person ("I can", "you can") | warning | The description is injected into the system prompt; mixed voice hurts discovery | Rewrite in third person: "Analyzes …" |
| Description has no "when" clause | warning | Claude needs triggers, not just a summary | Add "Use when the user asks / mentions …" |
| No XML tags in name or description | error | Platform rule | Remove `<...>` |

## Body and structure

| Check | Level | Why | Fix |
|---|---|---|---|
| Body under 500 lines | warning | Every loaded line competes for context | Move detail into `references/` |
| Reference files over 100 lines have a contents list near the top | warning | Claude may preview with partial reads and miss sections | Add a `## Contents` list |
| Time-sensitive phrasing ("before August 2025", "as of this year") | warning | Goes stale silently | Move to an "Old patterns" section or remove |

## Paths and references

| Check | Level | Why | Fix |
|---|---|---|---|
| Every relative path in a markdown link or backticks resolves inside the skill folder | error | Claude follows it and finds nothing | Fix the path or delete the mention |
| Referenced files link onward to more reference files (nesting deeper than one level) | warning | Claude may only partially read nested files | Link every reference directly from SKILL.md |
| Windows-style backslash paths | error | Break on macOS and Linux | Use forward slashes |

Paths the skill tells Claude to *create* in the user's project are expected not to exist. The checker skips paths starting with `./` (the user's working folder), placeholders in `<…>`, `{…}` or `[…]`, globs and URLs, and only warns about missing folders. It reads every other relative path as a file inside the skill. Review the remaining errors by hand: a path that really names another skill's file should name the skill instead ("see the cohort-diagnostics reference in saas-revenue-growth-metrics").

## Scripts

| Check | Level | Why | Fix |
|---|---|---|---|
| Python files compile (`py_compile`) | error | A syntax error fails on first use | Fix the syntax |
| `.js`/`.mjs`/`.cjs` files pass `node --check` (if Node is installed) | error | Same | Fix the syntax |
| Shell scripts pass `bash -n` | error | Same | Fix the syntax |

Syntax checks don't prove a script works. Gate 3 tasks should exercise each script the skill relies on at least once.

## Portability and safety

| Check | Level | Why | Fix |
|---|---|---|---|
| Hard-coded personal paths (`/Users/<name>/`, `/home/<name>/`, `C:\Users\<name>\`) | error | Breaks for everyone else and leaks who wrote it | Use paths relative to the skill or ask the user |
| Sandbox-only paths (under `/mnt/`: the skills and user-data folders) | warning | Only exist in claude.ai's sandbox; fail in Claude Code | Refer to the installed skill by name, write to the working folder |
| Likely secrets (API key patterns, private keys, bearer tokens) | error | Credentials must never ship in a skill | Remove and rotate the secret |
| Personal email addresses in skill files | warning | Usually a leftover from the author's own setup | Replace with a role or placeholder |

## Checks the script can't do

Do these by reading the skill:

- Instructions that conflict with each other, or with a neighbouring skill the user also has installed.
- Instructions that tell Claude to take live external actions (send, post, pay, deploy) without an explicit confirmation step.
- Dependencies on MCP servers or paid data sources with no fallback. Note them; they decide whether the skill is usable for most people.
- Whether the description over-claims (lists triggers that belong to another skill). This shows up as false fires in Gate 2.
