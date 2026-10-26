# Trigger evals (Gate 2)

Does Claude pick this skill for the requests it's meant for, and leave it alone for the rest? Treat it as a classification test on the routing decision.

## Contents
- How Claude chooses a skill
- Writing the trigger set
- File format
- Running it
- Reading the results
- Fixing a description without overfitting

## How Claude chooses a skill

At the start of a session Claude sees a list of every installed skill's name and description, and decides from that list alone whether to open one. Two consequences:

- **The description is the trigger.** The body of SKILL.md plays no part in routing.
- **The list has a size budget.** With hundreds of skills installed, descriptions past the budget are dropped and only names remain, so Claude routes on the name. In Claude Code the budget can be raised with `SLASH_COMMAND_TOOL_CHAR_BUDGET` (we used 300000). Always record which setting a run used.

Claude also skips skills for tasks it can do in one step on its own. A one-line request ("summarize this paragraph") may never trigger a skill however good the description is. Trigger prompts must be substantial enough that a skill would genuinely help.

## Writing the trigger set

**8–10 should-trigger requests.** Cover:
- different phrasings of the core job: formal, casual, typos, lowercase
- requests that never name the skill or its jargon but clearly need it
- the less common things the skill does (secondary modes, absorbed skills' jobs)
- requests where a neighbouring skill also fits but this one should win

**8–10 should-not-trigger near misses.** The valuable negatives share keywords with the skill but need something else:
- an adjacent job that belongs to a named neighbour (state which skill should win)
- the same words in a different context ("pitch" a deck vs "pitch" a cold email)
- a request Claude should just answer directly

Avoid easy negatives ("what is 17 × 23?") except for one or two controls; they test nothing.

**Make every prompt self-contained.** If the task needs data, paste a short sample inline. A prompt that says "this attached file" when nothing is attached makes Claude ask for the file instead of choosing a skill, which shows up as a false miss.

## File format

The Utopia repo harness (`<repo>/scripts/trigger-test.mjs`) reads TSV with three columns, `expected<TAB>group<TAB>prompt`:

```
cold-email	cold-email	Write a 3-email cold sequence to the CFO of a 200-person logistics firm about AP automation. Keep it under 90 words each.
cold-email	cold-email	can u draft a first outreach to a VP sales i found on linkedin, they just raised a series B
ai-sdr	cold-email	How many sending domains and mailboxes do we need to send 5,000 cold emails a month safely?
none	cold-email	Fix the typos in this email to my landlord: ...
```

- `expected` is the skill that should fire: a bare name, a pack-qualified name (`utopia-gtm:cold-email`), alternatives joined with `|`, or `none`.
- `group` names the suite. Use the skill under test, so every row for one skill's set shares a group.
- For a near miss, put the skill that *should* win in `expected`, not `none`. That way one run measures both skills.

## Running it

Run each request at least 3 times. Use 5 before a release.

```bash
SLASH_COMMAND_TOOL_CHAR_BUDGET=300000 node scripts/trigger-test.mjs \
  --plugins plugins --file cold-email.tsv --runs 3 -j 4 --output cold-email.json
```

The harness gives every run a fresh, empty working folder. It turns off hooks and MCP servers, blocks tools that have side effects or touch files, and stops at the first Skill call. With `--plugins`, it loads the local build and disables the installed copies, so you test the version you just edited. It checkpoints after every result: resume with `--resume <file>` after a usage limit, using the same model, budget and plugins.

Outside this repo, Anthropic's skill-creator has an equivalent (`<skill-creator>/scripts/run_eval.py` with `--runs-per-query`), which reads a JSON list of `{"query", "should_trigger"}`.

## Reading the results

```bash
python3 <skill-dir>/scripts/score_triggers.py cold-email.json
```

For each expected skill this gives:

| Metric | Meaning | Bar |
|---|---|---|
| Recall | share of runs that fired the right skill when it should have | at least 0.8 |
| False fires | runs where this skill fired on a request meant for something else | at most 1 |
| Stolen by | which skills took its requests, and how often | names your merge or boundary candidates |
| Stable | requests that passed every run (pass^k) | flag those that didn't |

Interpreting misses:
- **Fired nothing** on a clear request: description too vague, too narrow, or not visible (compare with the default budget).
- **A neighbour fired**: boundaries overlap. Sharpen both descriptions with "Not for X (use Y)", or merge the skills if they do the same job.
- **Fires on near misses**: description over-claims. Remove borrowed triggers.
- **Different result on each run**: the request sits on a boundary. Decide which skill owns it and say so in both descriptions.

## Fixing a description without overfitting

Rules for the rewrite (from Anthropic's authoring guide and skill-creator):
- Third person, starting with what it does: "Drafts B2B cold emails…", not "I can help you…".
- Then "Use when…", naming the situations and the words users actually type, not internal jargon.
- One "Not for … (use X)" line for each neighbour it collides with.
- Generalise from the failures to the underlying intent. Don't paste the failing prompts into the description.
- Stay under 1024 characters. A long description costs context in every session and still gets cut when the budget runs out.

Guard against overfitting. Hold back about 40% of the trigger set, tune on the rest, and keep the description that scores best on the held-back part. skill-creator's `run_loop.py --holdout 0.4` does this automatically. After any change, re-run the whole set, because sharpening one skill can steal requests from another.
