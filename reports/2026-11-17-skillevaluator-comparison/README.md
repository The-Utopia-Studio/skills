# SkillEvaluator versus Utopia's three evaluation tiers

Compared on 17 November 2026.

**Recommendation: retain Utopia's three-tier policy and selectively add NVIDIA checks.** Our routing tier answers an important question NVIDIA's deduplication tier does not. NVIDIA offers substantially broader validation and a stronger live-evaluation evidence system. Replacing our gate outright would also weaken our current policy of requiring output evidence for high-risk changes unless we explicitly preserve that requirement.

## Sources and scope

- Utopia checkout: `7f1ab3f342df3e17c7a0e25afd3f2d5f2f0cffae`.
- NVIDIA source cloned to `/tmp/utopia-skill-evaluator-20261117`; commit [d2cb13880d575f2bb1da04577438731af6871fb0](https://github.com/NVIDIA/SkillEvaluator/tree/d2cb13880d575f2bb1da04577438731af6871fb0).
- Compared executable Utopia gate/harness code, configuration, CI, committed evidence, and NVIDIA's source and documentation.
- This is an implementation and evidence comparison. No new model evaluations, embedding calls, external scanner runs, or NVIDIA benchmark runs were performed. No evaluator was installed into our packs.
- NVIDIA is Apache-2.0 and describes its support level as experimental.

## Tier mapping

| Area | Utopia implementation | NVIDIA implementation | Assessment |
| --- | --- | --- | --- |
| Tier 1: validation | Frontmatter/name checks, referenced paths, Python/JS/shell syntax, credential and personal-path patterns. Changed packed skills are checked; new entries require 3+ output cases, risk, and 8 positive/8 negative routing prompts. Global listing budget: 109,000 characters. | Schema and quality checks, security scanners, PII, licensing, code integrity, Unicode, dependency checks, harness compatibility, optional model rubric/security review. | NVIDIA has broader safety and portability coverage. Keep our marketplace-specific budget, naming and admission rules. |
| Tier 2 | Live Claude selection: recall >= 0.8, <= 1 false fire, <= 1 neighbour steal, >= 3 runs per prompt. Up to 8 neighbours selected using description word overlap, references and submodules. | Embedding-based repetition detection within a skill and similarity across skills. Within-skill candidates receive chat-model verification. Cross-skill comparison requires a catalog. | Different questions. Similarity can improve candidate selection for our routing tests; it cannot establish actual routing accuracy. |
| Tier 3 | Claude with/without skill, outcome assertions judged by a model, >= 3 trials, mean with-skill score >= 0.8, positive aggregate lift, no case with a worse mean, >= 80% of cases passing the threshold in every trial. Required for relevant high-risk changes. | Real agent trials through Harbor, paired arms, Claude Code/Codex/OpenCode, activation evidence, task and security grading, custom graders, retained trajectories, resource metrics and statistical summaries. | NVIDIA provides a stronger execution and evidence foundation, especially for skills that need tools or scripts. Preserve our domain assertions and admission thresholds. |
| CI policy | CI blocks on Tier 1/budget and missing, stale or failing Tier 2/3 reports when required. Model runs happen before CI; reports are committed. | At this commit, the all-tier onboarding CI makes Tier 1 required and Tiers 2/3 advisory. Combined CLI validation blocks on Tier 2 by default; Tier 3 needs `--block-on-agent-eval` to gate. | Keep our high-risk gating policy explicitly. Do not infer blocking behavior from the tier names. |

NVIDIA references: [validation](https://github.com/NVIDIA/SkillEvaluator/blob/d2cb13880d575f2bb1da04577438731af6871fb0/docs/tier1-validation.mdx), [deduplication](https://github.com/NVIDIA/SkillEvaluator/blob/d2cb13880d575f2bb1da04577438731af6871fb0/docs/tier2-deduplication.mdx), [live evaluation](https://github.com/NVIDIA/SkillEvaluator/blob/d2cb13880d575f2bb1da04577438731af6871fb0/docs/tier3-live-evaluation.mdx).

Utopia sources: [gate](../../scripts/skill_gate.py), [runner](../../scripts/eval-skill.mjs), [thresholds](../../scripts/skill-gate.config.json), [static checks](../../skills/founder-productivity/skill-eval/scripts/static_check.py), [CI](../../.github/workflows/ci.yml).

## Implemented versus evaluated

Inventory is restricted to the 254 skill names in `packs.config.json`, excluding generated plugin copies.

| Evidence in canonical packed skills | Count |
| --- | ---: |
| Output case files (`evals/evals.json`) | 36 |
| Per-skill routing prompt files (`evals/triggers.tsv`) | 1 |
| Routing reports | 1 |
| Output reports | 1 |
| Gate waivers | 0 |
| Centrally designated high-risk skills | 15 |

- `skill-eval` routing: recall 1.0, zero false fires/steals, 3 runs per prompt; current routing hash matches.
- `draft-nda` output: 1.000 with skill versus 0.836 without, lift +0.164; 3 cases x 3 trials per arm, all cases stable; current output hash matches.
- Historical catalog-wide routing evidence exists in [the October routing review](../2026-10-26-skill-routing/README.md). Its Claude native invocation and Codex catalog-classification experiments are explicitly different protocols. They should not be pooled, and do not supply current per-skill Tier 3 evidence.
- The gate is incremental. A clean run against HEAD checks zero changed packed skills; it does not certify all 254 skills or require legacy entries to backfill evidence.

These counts describe saved evidence, not claims that other skills were never tested.

## Findings in our current implementation

### 1. Report acceptance is a freshness check, not verification of the evaluation

`report_problem()` checks the expected content hash and a truthy `pass` value. It does not validate report identity/schema, recalculate thresholds, require trial rows, check coverage, or authenticate the producer. The gate self-test deliberately accepts a minimal object containing only `pass: true` and the matching hash.

Although the runner comment says “signed reports,” there is no cryptographic signature. A report hash is useful for detecting skill changes, but is not attestation that a run occurred.

**Change:** validate a versioned report schema and recalculate the decision from complete trial evidence. Require exact case/condition/trial coverage, finite bounded scores, and the expected skill identity.

### 2. High-risk metadata is only read for new entries

`risk` starts as null and is assigned from `evals/evals.json` only inside `if is_new`. Subsequent changes to a skill marked `risk: high` will not require output evidence unless its name is also in `high_risk_skills`.

**Change:** read risk for every changed packed skill, validate it, and combine it with the central list. Keep Tier 3 mandatory for high-risk changes.

### 3. Evidence identity omits important experiment inputs

Routing hashes cover only the target name, description and local trigger file. They omit neighbour/catalog descriptions, central prompts, model, thresholds and harness version. Output hashes cover the target's files but omit harness/configuration and other loaded skills. Resume caches use these same hashes, so changing a model or evaluation policy can reuse older trials.

**Change:** use an experiment digest covering target files, fixtures, exact prompts, catalog/companions, resolved model and CLI versions, harness revision and scoring policy. Invalidate caches when any relevant identity changes.

### 4. Tier 3 currently measures a broader intervention than one isolated skill

The treatment loads all local plugin packs and explicitly prefixes “Use the <skill> skill for this.” The baseline disables Skill access and omits that prefix. Output parsing retains the final reply rather than activation traces. Consequently, the score does not establish that the target actually activated or isolate its contribution from other available skills and the explicit instruction.

Bash, web and delegation tools are disabled, which also prevents realistic execution of script-, research- and workflow-heavy skills.

**Change:** separate forced-use capability from implicit discovery. Stage the target and declared companions, retain actual activation evidence, and run tool-dependent cases in an appropriate isolated environment. Keep identical task requests across the paired arms when measuring natural activation.

### 5. Judge results and artifacts need stronger retention

The judge's assertion array is not checked against a fixed set of assertion IDs/counts before pass values are counted. Duplicate or missing verdicts can distort the score. Every output trial uses a model judge; existing helper unit tests do not serve as per-case deterministic graders here.

The report drops assertion evidence quotes, deletes temporary task outputs, and removes the cache after a pass. Files above 40 KB are represented only by metadata; collected file text is truncated to 60 KB. This limits verification of spreadsheets, PDFs, decks and larger outputs.

**Change:** validate one verdict per authored assertion; keep raw outputs, judge evidence and artifact digests. Use deterministic numeric/schema/file checks where possible and an explicit unknown/incomplete state where evidence is insufficient.

### 6. Documentation overstates one threshold

The README says “better than no skill on every case.” The runner permits ties per case, requires no lower per-case means, and requires positive aggregate lift. Decide whether ties are acceptable and align the documentation.

## What to selectively adopt

1. **First, fix our evidence gate.** Address risk persistence, schema/recomputed decisions, experiment identity and retained evidence before expanding expensive runs.
2. **Extend our Tier 1 with NVIDIA checks.** Pilot harness compatibility and scanner coverage on a small reviewed set; retain Utopia-specific static rules and listing budget. Missing scanner evidence must remain incomplete.
3. **Add overlap analysis within our Tier 2 workflow.** Use catalog similarity as an advisory maintenance signal and to nominate difficult neighbours. Continue real positive/negative/competition routing trials, including a separate realistic description-budget run alongside the current 300,000-character diagnostic.
4. **Pilot NVIDIA Tier 3 for selected high-risk skills.** Start with `draft-nda` to compare against saved evidence, a numeric skill such as `dcf-model` for deterministic grading, and `outreach-execution` with mocked destinations for workflow/tool evidence.
5. **Expand evidence coverage by risk.** Author representative fixtures and negative cases, then backfill the central high-risk list. Do not treat automatically generated starter cases as adequate release evidence.

The basic `skill_name` / `evals` / `prompt` / `expected_output` / `assertions` shape is shared with NVIDIA reference datasets, so our cases are useful migration inputs. Native configuration, explicit activation expectations, fixtures, grader setup and validation still need review; existing reports are not drop-in NVIDIA reports.

## Metrics to preserve and add

Keep our all-trials stability metric: at least 80% of cases must meet the 0.8 threshold on every trial. With only 3 cases, that effectively requires all 3 cases to be stable.

NVIDIA's pass@k counts a case successful if **any** attempt passes. That is useful for retry success but is different from our every-trial reliability requirement. Report both separately.

Add paired-case uncertainty intervals, observed activation, per-case regressions, cost/tokens/time, and explicit incomplete/incomparable results. NVIDIA implements paired bootstrap lift intervals and Wilson pass-rate intervals. Its defaults and composite dimensions are conventions, and its documentation explicitly says there is no published human inter-rater agreement study; adopting the framework does not validate our domain rubrics automatically.

References: [metrics definitions and limitations](https://github.com/NVIDIA/SkillEvaluator/blob/d2cb13880d575f2bb1da04577438731af6871fb0/docs/metrics-reference.mdx), [statistics implementation](https://github.com/NVIDIA/SkillEvaluator/blob/d2cb13880d575f2bb1da04577438731af6871fb0/src/skillevaluator/tier3/harbor/stats.py).

## Verification performed

- Utopia gate self-test: passed.
- Existing routing harness and skill helper tests: 23 passed.
- `skill_gate.py check --base HEAD`: passed; zero changed packed skills.
- Listing budget: 106,967 / 109,000 characters.
- Both saved per-skill reports match current target hashes.
- Ceramic doctor: passed.
- Application code, evaluation policy, packs and workflows were not changed.
