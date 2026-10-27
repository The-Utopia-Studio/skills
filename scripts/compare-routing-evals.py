#!/usr/bin/env python3
"""Refresh separate provider scores and a prompt-aligned combined report."""
import argparse
import csv
import json
from pathlib import Path
import subprocess


def scored(row):
    return row and row["runs"] - row["errors"] == 1


def summarize(rows):
    evaluated = [r for r in rows if scored(r)]
    return {"total": len(rows), "scored": len(evaluated),
            "correct": sum(r["hits"] for r in evaluated),
            "errors": sum(r["status"] == "ERROR" for r in rows),
            "pending": sum(r["status"] == "PENDING" for r in rows)}


def outcome(before, after):
    if not scored(before) or not scored(after):
        return "unscored"
    if after["hits"] > before["hits"]:
        return "fixed"
    if after["hits"] < before["hits"]:
        return "regressed"
    return "unchanged-hit" if after["hits"] else "unchanged-miss"


def percent(hits, count):
    return f"{100 * hits / count:.1f}%" if count else "n/a"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--report", type=Path, default=Path("reports/2026-10-26-skill-routing"))
    args = parser.parse_args()
    data = {}
    summary = {}
    for provider, directory in (("claude", args.report), ("codex", args.report / "codex")):
        data[provider] = {}
        summary[provider] = {}
        for build in ("before", "after"):
            source = directory / f"routing-{build}.json"
            rows = json.loads(source.read_text()) if source.exists() else [
                dict(zip(("expected", "group", "prompt"), line.split("\t")),
                     runs=0, errors=0, hits=0, fired={}, status="PENDING")
                for line in (args.report / f"prompts-{build}.tsv").read_text().splitlines()
                if line.strip() and not line.startswith("#")]
            assert len({r["prompt"] for r in rows}) == len(rows)
            assert all(r["runs"] - r["errors"] in (0, 1) for r in rows)
            data[provider][build] = {r["prompt"]: r for r in rows}
            summary[provider][build] = summarize(rows)
            if source.exists():
                result = subprocess.run(["python3", "skills/founder-productivity/skill-eval/scripts/score_triggers.py",
                                         str(source), "--json"], text=True, capture_output=True)
                assert result.returncode in (0, 1), result.stderr
                json.loads(result.stdout)
                (directory / f"scores-{build}.json").write_text(result.stdout)
        before, after = data[provider]["before"], data[provider]["after"]
        if before and after:
            assert before.keys() == after.keys(), f"Prompt sets differ for {provider}"
        pairs = [(r, after[p]) for p, r in before.items() if scored(r) and scored(after.get(p))]
        summary[provider]["paired"] = {
            "scored": len(pairs), "correct_before": sum(x["hits"] for x, y in pairs),
            "correct_after": sum(y["hits"] for x, y in pairs),
            "fixed": sum(outcome(x, y) == "fixed" for x, y in pairs),
            "regressed": sum(outcome(x, y) == "regressed" for x, y in pairs)}
    all_prompts = list(data["claude"]["before"])
    for build in data["codex"].values():
        if build:
            assert set(build) == set(all_prompts), "Provider prompt sets differ"
    joined = []
    for prompt in all_prompts:
        row = {"prompt": prompt}
        for provider, builds in data.items():
            for build, rows in builds.items():
                source = rows.get(prompt)
                row[f"{provider}_{build}_expected"] = source["expected"] if source else ""
                row[f"{provider}_{build}_hit"] = source["hits"] if scored(source) else ""
                row[f"{provider}_{build}_status"] = source["status"] if source else "PENDING"
            row[f"{provider}_change"] = outcome(builds["before"].get(prompt), builds["after"].get(prompt))
        joined.append(row)
    common = [r for r in joined if r["claude_change"] != "unscored" and r["codex_change"] != "unscored"]
    summary["cross_provider"] = {
        "complete_in_all_four_runs": len(common),
        "fixed_in_both": sum(r["claude_change"] == r["codex_change"] == "fixed" for r in common),
        "regressed_in_both": sum(r["claude_change"] == r["codex_change"] == "regressed" for r in common),
        "opposite_changes": sum({r["claude_change"], r["codex_change"]} == {"fixed", "regressed"} for r in common)}
    (args.report / "combined-routing-summary.json").write_text(json.dumps(summary, indent=2) + "\n")
    with (args.report / "combined-routing-prompts.csv").open("w", newline="") as stream:
        writer = csv.DictWriter(stream, fieldnames=list(joined[0]), lineterminator="\n")
        writer.writeheader()
        writer.writerows(joined)
    lines = ["# Claude and Codex routing evaluation", "",
             "Claude measures native skill invocation under its default description budget. Codex measures explicit selection from the full catalog using `gpt-6-astra`, medium reasoning. These are different protocols: keep provider rates separate; do not pool them.", "",
             "Each prompt has one observation per build. These runs measure routing only, not output quality or stability. The prompts were already used in the routing work, so this is not a held-out generalization test.", "",
             "| Provider | Build | Scored | Correct | Rate | Errors | Pending |",
             "|---|---|---:|---:|---:|---:|---:|"]
    for provider in data:
        for build in ("before", "after"):
            s = summary[provider][build]
            lines.append(f"| {provider} | {build} | {s['scored']} | {s['correct']} | {percent(s['correct'], s['scored'])} | {s['errors']} | {s['pending']} |")
    lines += ["", "Overall rates above may cover different prompt subsets. Use the paired comparisons below.", "",
              "| Provider | Paired prompts | Before | After | Fixed | Regressed |",
              "|---|---:|---:|---:|---:|---:|"]
    for provider in data:
        s = summary[provider]["paired"]
        lines.append(f"| {provider} | {s['scored']} | {percent(s['correct_before'], s['scored'])} | {percent(s['correct_after'], s['scored'])} | {s['fixed']} | {s['regressed']} |")
    cross = summary["cross_provider"]
    lines += ["", f"Across the {cross['complete_in_all_four_runs']} prompts scored in all four runs: {cross['fixed_in_both']} fixed in both providers, {cross['regressed_in_both']} regressed in both, and {cross['opposite_changes']} changed in opposite directions.", "",
              "[Prompt-level comparison](combined-routing-prompts.csv) · [Machine-readable summary](combined-routing-summary.json)", "",
              "Regenerate after either provider resumes:", "", "```sh", "python3 scripts/compare-routing-evals.py", "```", "",
              "Codex checkpoint metadata records model, reasoning effort, CLI version, catalog/prompt/harness hashes and skill isolation settings. Installed skills, plugins from user config, hooks, shell, browser, computer-use and app tools are excluded. The runner rejects tool/error events and invalid choices, and stops on infrastructure errors. No expected answers are supplied to the model.", ""]
    (args.report / "COMBINED.md").write_text("\n".join(lines))
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
