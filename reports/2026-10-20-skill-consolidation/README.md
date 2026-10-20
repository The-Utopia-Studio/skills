# Skill consolidation and routing evaluation

Date: 20 October 2026. Status: consolidation implemented; routing evaluation incomplete because Claude usage is exhausted. This is not a certification of functional reliability.

## Marketplace result

The four production packs contain **254 skills**, down from 357 (103 fewer, 28.9%). There are 104 retired entries and one new consolidated entry, `railway`.

| Pack | Before | After |
|---|---:|---:|
| GTM | 86 | 55 |
| Product | 174 | 129 |
| Investments | 66 | 43 |
| Founder Productivity | 31 | 27 |

The complete migration record is [retire-map.tsv](retire-map.tsv): each retired name maps to its successor, `SANDBOX` means retained but unpacked, and `-` means removed without a successor. Canonical skills, copied plugin artifacts, cross-references, agent references, and generated catalog counts were updated together.

Major consolidations include cold outbound writing into `cold-email`; qualification into `account-tier-scoring`; retention and expansion into `expansion-retention`; PRDs into `prd-development`; pricing into `pricing-strategy`; Railway tasks into `railway`; valuation into `dcf-model` and `comps-analysis`; and slide/banner design into `ckm-design`. Supporting templates and reference material were moved into the surviving skills. Specialized capital-markets skills and other non-core material were moved to the sandbox rather than shipped in every installation.

## Recorded routing results

These are first **Skill tool invocation** tests using `claude -p`, an empty working directory, local plugin builds, disabled hooks/MCP and restricted tools. They do not execute the full workflow or assess output quality. The CLI default model was used; its precise resolved version was not preserved in the original results.

| Run | Description budget | Correct / scored | Hit rate | Routing misses | Unscored |
|---|---|---:|---:|---:|---:|
| 1 | Default, before description retuning | 176 / 302 | 58.3% | 126 | 30 |
| 2 | Default, after retuning | 153 / 251 | 61.0% | 98 | 81 |
| 3 | `SLASH_COMMAND_TOOL_CHAR_BUDGET=300000` | 79 / 83 | 95.2% | 4 | 249 |

Raw evidence is retained in `run1.json`, `run2.json`, `run3.json` and their logs. The original harness labeled both actual infrastructure errors and never-started cases `ERROR`; use `runs` to distinguish them. Run 3 has 6 attempted errors and 243 never-started cases. All 83 scored cases in run 3 belong to the build group; discovery, GTM and investments were not evaluated with the raised budget. Do not extrapolate 95.2% to the entire marketplace.

On cases scored in both first runs, the earlier comparison recorded 13 fixes and 10 regressions. The earlier session also reported 18/20 selected no-skill misses passing with a raised budget, but no dedicated raw result file was preserved for that probe. It is supporting context, not the primary evidence here.

The raised-budget results support description visibility as a significant routing factor in this installation. They do not establish that every skill is good or that description tuning is unnecessary. The environment included third-party plugins and loose skills; bare-name matching accepts an unprefixed skill or any namespace with the same suffix. The earlier inspection reported 67 loose names overlapping the packs. Those personal files were left unchanged, and these runs therefore do not isolate the packaged implementations.

### Four scored run-3 misses

| Expected | First skill observed |
|---|---|
| `code-structure` | `compound-engineering:ce-brainstorm` |
| `layout` | No skill |
| `ckm-design` | `utopia-gtm:efecto-social-media` |
| `critique` | No skill |

Exact prompts are in [misses.tsv](misses.tsv). No additional tuning was made from these single observations.

## Continuation and validation

A one-prompt authenticated continuation probe still returned a session-limit error; see `resume-probe.json`. No new live scores were obtained. The sandboxed probe could not access the login; the authenticated probe confirmed the real usage blocker.

The repository now ships 334 prompt rows: the original 332 plus two negative controls. The harness saves atomic checkpoints with `--output`, resumes scored observations with `--resume`, retries infrastructure failures, distinguishes pending/incomplete cases, and stops scheduling on usage or authentication errors. It also drains child stderr and handles process-launch failures. Three offline regression tests passed for limit handling, resume behavior and invalid run counts.

Completed checks: marketplace validation (254 skills), pack rebuild, generated-doc sync, and Ceramic doctor. The builder requires Bash 4+; this Mac's default Bash is too old, so the installed Homebrew Bash was used via `PATH=/opt/homebrew/bin:$PATH`. The existing `validate:drift` command compares against Git HEAD, so it reports all uncommitted work as drift; the CI-equivalent generated-file comparison should be checked after committing.

Resume the 249 unscored cases plus the two new controls after Claude usage resets:

```sh
SLASH_COMMAND_TOOL_CHAR_BUDGET=300000 node scripts/trigger-test.mjs \
  --plugins plugins --runs 1 -j 2 --json \
  --resume reports/2026-10-20-skill-consolidation/run3.json \
  --output /tmp/utopia-routing-resumed.json
```

Repeat the four known misses five times to assess stability:

```sh
SLASH_COMMAND_TOOL_CHAR_BUDGET=300000 node scripts/trigger-test.mjs \
  --plugins plugins --file reports/2026-10-20-skill-consolidation/misses.tsv \
  --runs 5 -j 2 --json --output /tmp/utopia-routing-misses-5x.json
```

Use the same model, budget, plugin build and personal-skill environment when resuming. Checkpoints match exact expected skill, group and prompt; they do not fingerprint the environment. If any of those conditions change, start a new run. For strict pack attribution, use qualified expected names and a controlled installation. After routing is complete, exercise representative workflows and assess their artifacts before claiming functional reliability across all 254 skills.
