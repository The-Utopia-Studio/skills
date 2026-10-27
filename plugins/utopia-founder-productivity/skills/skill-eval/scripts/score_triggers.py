#!/usr/bin/env python3
"""Gate 2 scoring: per-skill trigger recall, false fires and collisions from a trigger-test run.

Reads the JSON written by scripts/trigger-test.mjs (--output or --json): a list of rows with
expected, group, prompt, runs, hits, errors and fired ({skill_or_none: count}).

Usage:
  score_triggers.py RESULTS.json [--json] [--min-recall 0.8] [--max-false 1]
  score_triggers.py --self-test
Exit code: 1 if any skill misses a bar, else 0.
"""
import json, sys
from collections import defaultdict


def bare(name):
    return name.split(":")[-1] if name else name


def score(rows):
    stats = defaultdict(lambda: {"runs": 0, "hits": 0, "prompts": 0, "stable": 0, "false_fires": 0, "stolen_by": defaultdict(int), "unscored": 0})
    for r in rows:
        alts = [bare(a) for a in str(r.get("expected", "")).split("|") if a]
        primary = alts[0] if alts else "none"
        scored = int(r.get("runs", 0)) - int(r.get("errors", 0))
        s = stats[primary]
        s["prompts"] += 1
        if scored <= 0:
            s["unscored"] += 1
            continue
        s["runs"] += scored
        s["hits"] += int(r.get("hits", 0))
        s["stable"] += int(r.get("hits", 0)) == scored
        for fired, n in (r.get("fired") or {}).items():
            if fired.startswith("error:"):
                continue
            f = None if fired == "none" else bare(fired)
            ok = (f is None and "none" in alts) or (f is not None and f in alts)
            if ok:
                continue
            if f is not None:
                stats[f]["false_fires"] += n  # it fired where another skill (or none) was expected
            s["stolen_by"][f or "no skill"] += n
    out = []
    for skill, s in stats.items():
        out.append({
            "skill": skill,
            "prompts": s["prompts"],
            "runs": s["runs"],
            "recall": round(s["hits"] / s["runs"], 3) if s["runs"] else None,
            "stable_prompts": s["stable"],
            "false_fires": s["false_fires"],
            "stolen_by": dict(sorted(s["stolen_by"].items(), key=lambda kv: -kv[1])),
            "unscored_prompts": s["unscored"],
        })
    return sorted(out, key=lambda x: (x["recall"] is None, x["recall"] if x["recall"] is not None else 0, x["skill"]))


def main(argv):
    if argv[:1] == ["--self-test"]:
        return self_test()
    if not argv or argv[0].startswith("--"):
        print(__doc__)
        return 2
    opt = lambda k, d: float(argv[argv.index(k) + 1]) if k in argv else d
    min_recall, max_false = opt("--min-recall", 0.8), opt("--max-false", 1)
    rows = json.load(open(argv[0], encoding="utf-8"))
    if isinstance(rows, dict):  # tolerate {"rows": [...]} wrappers
        rows = rows.get("rows") or rows.get("results") or []
    res = score(rows)
    bad = []
    for x in res:
        if x["skill"] == "none":
            x["pass"] = x["recall"] is None or x["recall"] >= min_recall
        else:
            x["pass"] = x["recall"] is not None and x["recall"] >= min_recall and x["false_fires"] <= max_false
        if not x["pass"]:
            bad.append(x["skill"])
    if "--json" in argv:
        print(json.dumps(res, indent=2))
    else:
        print(f"| Skill | Prompts | Runs | Recall | Stable | False fires | Stolen by | Pass |")
        print("|---|---:|---:|---:|---:|---:|---|---|")
        for x in res:
            rec = "n/a" if x["recall"] is None else f"{x['recall']:.2f}"
            stolen = ", ".join(f"{k} ×{v}" for k, v in list(x["stolen_by"].items())[:3]) or "-"
            unscored = f" (+{x['unscored_prompts']} unscored)" if x["unscored_prompts"] else ""
            label = "none (should not fire)" if x["skill"] == "none" else x["skill"]
            print(f"| {label} | {x['prompts']}{unscored} | {x['runs']} | {rec} | {x['stable_prompts']}/{x['prompts'] - x['unscored_prompts']} | {x['false_fires']} | {stolen} | {'yes' if x['pass'] else 'NO'} |")
        print(f"\nBars: recall ≥ {min_recall}, false fires ≤ {int(max_false)}. {len(bad)} of {len(res)} miss a bar.")
    return 1 if bad else 0


def self_test():
    rows = [
        {"expected": "cold-email", "runs": 3, "hits": 3, "errors": 0, "fired": {"utopia-gtm:cold-email": 3}},
        {"expected": "cold-email", "runs": 3, "hits": 1, "errors": 0, "fired": {"utopia-gtm:cold-email": 1, "utopia-gtm:ai-sdr": 2}},
        {"expected": "ai-sdr", "runs": 3, "hits": 2, "errors": 0, "fired": {"ai-sdr": 2, "cold-email": 1}},
        {"expected": "none", "runs": 2, "hits": 2, "errors": 0, "fired": {"none": 2}},
        {"expected": "pricing-strategy|value-based-pricing", "runs": 2, "hits": 2, "errors": 0, "fired": {"value-based-pricing": 2}},
        {"expected": "railway", "runs": 1, "hits": 0, "errors": 1, "fired": {"error: limit": 1}},
    ]
    by = {x["skill"]: x for x in score(rows)}
    assert by["cold-email"]["recall"] == round(4 / 6, 3), by["cold-email"]
    assert by["cold-email"]["false_fires"] == 1 and by["ai-sdr"]["false_fires"] == 2, by
    assert by["cold-email"]["stolen_by"] == {"ai-sdr": 2}, by["cold-email"]
    assert by["cold-email"]["stable_prompts"] == 1
    assert by["pricing-strategy"]["recall"] == 1.0 and "value-based-pricing" not in by
    assert by["railway"]["recall"] is None and by["railway"]["unscored_prompts"] == 1
    assert by["none"]["recall"] == 1.0
    print("self-test passed")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
