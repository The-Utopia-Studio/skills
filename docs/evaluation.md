# Skill evaluation implementation

The three tiers remain static validation, live routing, and paired output quality with repeated-run stability. No NVIDIA skill library or live-agent framework is installed into Utopia's packs.

## Release criteria

- Tier 2: at least eight positive and eight negative prompts; at least three observations per prompt; recall at least 0.8; at most one false fire and one neighbour steal. Neighbours come from catalog word overlap, explicit references and GTM submodules, capped at eight. Reports retain exact prompts and fired counts.
- Tier 3: at least three cases and three trials per arm; with-skill mean at least 0.8; aggregate lift strictly above zero; no case mean below baseline; at least 80% of cases meet the score threshold in **every** trial. Ties per case are allowed. With three cases, all three must be stable.
- Missing trials, failed activation, model mismatches, unknown verdicts, malformed judge replies and unavailable evidence produce `incomplete`, never a pass.
- These requirements apply incrementally when the gate requires a report. They do not certify legacy skills without evidence. Existing explicit gate waivers remain visible exceptions; this change does not remove that policy.

## Evidence contract

`scripts/skill_evidence.py` owns planning, schema validation, scoring and report acceptance. Both the runner and CI call it. Reports contain a schema version, target identity, runtime identity, experiment digest and observations. CI recalculates metrics and pass/fail status, rather than trusting the supplied `pass` flag or rounded summary values.

Routing identity covers the target routing fields, the full packed name/description catalog, selected prompts and neighbours, pack assignment, evaluation code, configuration, model, CLI version, attempt count and provider-environment digest. Output identity covers all target files except generated reports and waivers, case fixtures, the target-only protocol and the same execution/scoring identities. Relevant input changes invalidate checkpoints and reports. A final identity check rejects changes made while a run is executing.

The runner stages canonical skills into a temporary plugin directory, rather than trusting generated plugin copies. Working directories and CLI configuration live outside the checkout to avoid ancestor project instructions and personal plugins. Output treatment and baseline receive the same prompt. Treatment activation requires a matching Skill call and successful tool result; copied text claiming skill use is insufficient. Output traces and judge traces must name the exact requested model. An incomplete trace cannot prove absence of activation.

Claude output tools are restricted to local reading/writing/editing; shell, web and delegation are unavailable. This is a constrained local text evaluator, not a general execution sandbox. Skills that require scripts, web research or binary artifacts need a separate trusted runtime/grader before their capability can be certified. The evaluator fails explicitly when it cannot inspect an artifact, instead of grading a filename as though it had seen its contents.

Raw task directories, model/judge traces and outputs are retained privately under `.skill-eval-runs/<skill>/<experiment>/`. Reports include the observations needed to recompute the decision. These reports are reviewable local evidence, not signed attestations; someone with write access can fabricate evidence. No historical report is rewritten to imply it passed the new contract.

## Selective NVIDIA integration

The optional adapter pins [NVIDIA SkillEvaluator](https://github.com/NVIDIA/SkillEvaluator/tree/d2cb13880d575f2bb1da04577438731af6871fb0) at commit `d2cb13880d575f2bb1da04577438731af6871fb0` (Apache-2.0). It invokes the upstream CLI through an isolated `uvx` installation; it does not vendor NVIDIA implementation code.

```sh
# Our checks only; no downloads or inference
npm run eval:inspect -- skill-eval

# Upstream static quality and Codex/Claude compatibility; no inference
npm run eval:inspect -- skill-eval --nvidia

# Additionally compare the canonical packed catalog using embeddings
npm run eval:inspect -- skill-eval --overlap
```

The embedding command snapshots packed skills only, excluding duplicate generated plugins and sandbox skills. Credentials and provider settings follow upstream configuration. It retains native reports and command logs; absent tools, missing credentials or incomplete checks cannot be labeled successful. These optional findings do not override our release criteria or automatically change routing neighbours. A static compatibility result describes upstream loader profiles; it does not prove native invocation in our installed environment.

The local Unicode and escaping-symlink checks were inspired by NVIDIA's Unicode/code-integrity coverage. Ordinary Arabic text and shaping characters are allowed; bidirectional override/isolate controls and selected hidden formatting controls are flagged for explicit removal/review.

Paired output reports add a deterministic, case-level descriptive bootstrap interval (2,000 resamples, seed 0, 95% percentile interval). It is diagnostic only. This smaller implementation is not NVIDIA's expanded-tail interval, and a tiny case set cannot establish generalization or judge calibration. We retain our every-trial stability measure; upstream `pass@k` counts success on any attempt and is not a replacement for it.

We intentionally do not add NVIDIA's full Tier 3 runtime, automatic dataset generation, model rubric scoring or broad scanner downloads to CI. Those would introduce new infrastructure or subjective release policy beyond the checks selected here.

## Verification

`npm run test:eval` exercises temporary-repository admission checks, report tampering, stale experiment identities, high-risk persistence, routing counters, incomplete/duplicate trials, assertions, activation and mocked end-to-end CLI runs. CI also retains the existing routing harness and skill helper tests. Model inference and embedding calls are never part of these offline tests.
