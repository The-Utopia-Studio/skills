#!/usr/bin/env python3
"""Package completed Codex results for transfer to another agent/provider."""
import argparse
import csv
import hashlib
import json
from pathlib import Path
import zipfile


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--report", type=Path, default=Path("reports/2026-10-26-skill-routing"))
    args = parser.parse_args()
    directory = args.report / "codex"
    runs = {build: json.loads((directory / f"routing-{build}.json").read_text())
            for build in ("before", "after")}
    assert all(len(rows) == 337 and all(r["runs"] == 1 and r["errors"] == 0 for r in rows)
               for rows in runs.values()), "Export requires both complete 337-prompt runs"
    before = {r["prompt"]: r for r in runs["before"]}
    assert len(before) == 337 and set(before) == {r["prompt"] for r in runs["after"]}
    pairs = []
    for after in runs["after"]:
        old = before[after["prompt"]]
        pairs.append({"prompt": after["prompt"], "expected_before": old["expected"],
                      "expected_after": after["expected"], "group_before": old["group"],
                      "group_after": after["group"], "selected_before": next(iter(old["fired"])),
                      "selected_after": next(iter(after["fired"])),
                      "hit_before": old["hits"], "hit_after": after["hits"],
                      "change": "fixed" if after["hits"] > old["hits"] else "regressed"
                      if after["hits"] < old["hits"] else "unchanged-hit" if after["hits"] else "unchanged-miss"})
    summary = {"protocol": "codex-full-catalog-selection-v1", "paired_prompts": len(pairs),
               "correct_before": sum(r["hit_before"] for r in pairs),
               "correct_after": sum(r["hit_after"] for r in pairs),
               "fixed": sum(r["change"] == "fixed" for r in pairs),
               "regressed": sum(r["change"] == "regressed" for r in pairs)}
    (directory / "paired-comparison.json").write_text(json.dumps({"summary": summary, "pairs": pairs}, indent=2) + "\n")
    with (directory / "paired-comparison.csv").open("w", newline="") as stream:
        writer = csv.DictWriter(stream, fieldnames=list(pairs[0]), lineterminator="\n")
        writer.writeheader()
        writer.writerows(pairs)
    n = len(pairs)
    ceiling = ("The baseline is already at 100% on this suite. This test can expose regressions, "
               "but cannot demonstrate an accuracy gain; harder held-out near-miss requests "
               "and native invocation tests are needed to discriminate further."
               if summary["correct_before"] == n else "")
    changes = "\n\n".join(
        f"- **{r['change']} — expected `{r['expected_after']}`**\n"
        f"  - Request: {r['prompt']}\n"
        f"  - Before: `{r['selected_before']}`; after: `{r['selected_after']}`."
        for r in pairs if r["change"] in ("fixed", "regressed")) or "No changed hit/miss outcomes."
    handoff = f"""# Codex routing evaluation — handoff to Claude

Both runs are complete: {n} matched prompts, one scored observation per build, no infrastructure errors in the final checkpoints.

| Build | Correct | Scored | Accuracy |
|---|---:|---:|---:|
| Before | {summary['correct_before']} | {n} | {summary['correct_before'] / n:.1%} |
| After | {summary['correct_after']} | {n} | {summary['correct_after'] / n:.1%} |

Paired changes: {summary['fixed']} fixes and {summary['regressed']} regressions.

{ceiling}

## Changed outcomes to review

{changes}

Treat these as single-observation findings. Review the expected label and neighboring skill boundaries before changing descriptions; do not rerun only the misses to replace these observations.

## What was measured

Codex CLI, gpt-6-astra, medium reasoning. Each request ran in a fresh session with the complete catalog of skill names and descriptions, a structured choice of one pack-qualified skill or none, and no expected answer. Installed skills and tools were excluded. Two sessions ran concurrently; the baseline finished before the updated build began. The baseline uses commit 325292b's plugin build. Exact catalog snapshots and metadata hashes are included.

This is explicit full-catalog selection, NOT native skill invocation. Claude's existing evaluation uses native invocation with its default description budget. Do not pool accuracy rates across these different protocols, and do not describe a Codex selection as proof that a skill would be invoked or produce good work. One observation per condition does not measure stability. These are existing suite prompts, not a held-out set.

## Files

- `routing-before.json`, `routing-after.json`: raw scored rows in the existing trigger-test format, with usage and duration observations.
- `scores-before.json`, `scores-after.json`: existing score_triggers.py output.
- `paired-comparison.csv`, `paired-comparison.json`: prompt-aligned Codex results, including fixed/regressed labels.
- `catalog-before.json`, `catalog-after.json`: the exact full catalogs supplied to Codex.
- `routing-before.meta.json`, `routing-after.meta.json`: model, effort, CLI version, protocol and input fingerprints.
- `prompts-before.tsv`, `prompts-after.tsv`: the exact evaluation requests and expected routes.
- `scripts/`: runner, tests, scorer and comparison/export helpers from the repository.
- `SHA256SUMS`: checksums for all other archive members.

## Instructions for Claude when your runs finish

1. Score your own before/after checkpoints with the existing trigger scorer.
2. Join the four runs by exact `prompt` text. Expected skill names and groups can change across builds, so do not use them as the join key. Validate uniqueness and identical prompt sets first.
3. Show separate Claude and Codex before/after tables. For each provider, compare only prompts scored in both of its runs; exclude infrastructure errors and pending rows.
4. On prompts scored in all four runs, count fixes/regressions shared by both providers and changes in opposite directions. Keep provider and protocol labels in every result.
5. Preserve these Codex results as a completed, separate experiment. Do not append Claude observations to the Codex checkpoints or rerun them with a different model under the same metadata.

If using the original repository layout, place this bundle's Codex data under `reports/2026-10-26-skill-routing/codex/`, retain Claude checkpoints in the parent directory, and run `python3 scripts/compare-routing-evals.py` from the repository root. The standalone CSV and JSON can also be joined without the repository.
"""
    (directory / "HANDOFF.md").write_text(handoff)
    files = {path.name: path.read_bytes() for path in directory.iterdir()
             if path.is_file() and (path.suffix in (".json", ".csv") or path.name == "HANDOFF.md")}
    for build in ("before", "after"):
        path = args.report / f"prompts-{build}.tsv"
        files[path.name] = path.read_bytes()
    for name in ("codex-routing-eval.py", "codex-routing-eval.test.py",
                 "compare-routing-evals.py", "export-codex-routing-eval.py"):
        files[f"scripts/{name}"] = (Path("scripts") / name).read_bytes()
    files["scripts/score_triggers.py"] = Path("skills/founder-productivity/skill-eval/scripts/score_triggers.py").read_bytes()
    files["SHA256SUMS"] = "".join(f"{hashlib.sha256(content).hexdigest()}  {name}\n"
                                  for name, content in sorted(files.items())).encode()
    archive = args.report / "codex-routing-evaluation.zip"
    with zipfile.ZipFile(archive, "w", zipfile.ZIP_DEFLATED) as output:
        for name, content in sorted(files.items()):
            output.writestr(name, content)
    with zipfile.ZipFile(archive) as check:
        assert check.testzip() is None
        for line in check.read("SHA256SUMS").decode().splitlines():
            expected, name = line.split("  ", 1)
            assert hashlib.sha256(check.read(name)).hexdigest() == expected
    print(json.dumps(summary, indent=2))
    print(archive)


if __name__ == "__main__":
    main()
