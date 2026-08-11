# Significance / adoption report (TUS-2604)

**This is a baseline snapshot, not a trend.** `CONTRIBUTING.md`'s graduation rule ("used 5+ times in real work") needs sustained usage data to verify — a mature trend needs weeks-to-months of real fellow activity, not what a 2-week sprint can produce. What follows is the reporting *pipeline* plus what it says on the day this was run, not a verdict on any skill's real-world value yet.

## The actual current number: zero

`scripts/build-adoption-report.mjs` queries the shared usage-server (`hooks/usage-server/`, `TUS-2594`) first, falling back to the local `~/.claude/skill-usage.log` JSONL file. Run for real against this machine:

```
$ node scripts/build-adoption-report.mjs
{
  "totalEvents": 0,
  "uniqueSkillsUsed": 0,
  "uniqueUsers": 0,
  "zeroUsage30dCount": 302,
  "zeroUsage60dCount": 302,
  ...
}
```

**Why it's zero:** the usage-server exists and is tested (`TUS-2594`), but it was never actually deployed to Railway or pointed at by real fellows' `SKILL_USAGE_ENDPOINT` — that step explicitly needs your Railway account/CLI login, which isn't something this session had access to. No local log exists either, since nothing has invoked the `PreToolUse` hook on this machine. There is currently **no usage data anywhere**, shared or local.

## The pipeline works — verified with synthetic events

To confirm the tool itself is correct (not just correctly reporting zero), ran it against a temporary local instance of the usage-server seeded with 5 synthetic events (3x `cold-email` by `kp`, 1x `cold-email` + 1x `technical-dd` by `am`), then deleted that instance and its data:

```json
{
  "totalEvents": 5,
  "uniqueSkillsUsed": 2,
  "uniqueUsers": 2,
  "topSkills": [
    { "name": "cold-email", "count": 4, "module": "gtm" },
    { "name": "technical-dd", "count": 1, "module": "investments" }
  ],
  "countByModule": { "gtm": 4, "investments": 1 },
  "countByUser": { "am": 2, "kp": 3 },
  "zeroUsage30dCount": 300,
  "zeroUsage60dCount": 300
}
```

Top skills, per-module breakdown, per-user breakdown, and 30/60-day zero-usage detection all compute correctly. This synthetic data was not persisted anywhere real — it lived only in a `/tmp` SQLite file, deleted immediately after this test.

## What "done" actually requires from here

1. **Deploy `hooks/usage-server/` to Railway** (needs your account — see `hooks/README.md`).
2. **Get fellows pointed at it** — set `SKILL_USAGE_ENDPOINT` in their `~/.claude/settings.json` hook env (see `hooks/README.md`'s updated setup flow).
3. **Re-run `node scripts/build-adoption-report.mjs`** once real events exist. With `SKILL_USAGE_ENDPOINT` set, it queries the shared store; unset, it falls back to whatever local log exists.

Once step 2 has run for even a few days, re-running the same command this report used will show real top-skills/zero-usage/per-module numbers instead of the all-zero baseline above — that's the acceptance bar this issue asks for (a report that *can be generated on demand*), which is met; the report simply has nothing to report on yet because the upstream data pipeline (`TUS-2594`) hasn't been switched on in the real world.
