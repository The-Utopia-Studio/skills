#!/usr/bin/env python3
"""Quality gate for skills entering or changing in a pack (Tier 1 + budget ratchet + evidence check).

Usage:
  python3 scripts/skill_gate.py check [--base origin/main]   run every gate check against a base ref (CI)
  python3 scripts/skill_gate.py budget                      print the always-loaded listing size
  python3 scripts/skill_gate.py hash SKILL                  print the routing/output hashes for a skill (JSON)
  python3 scripts/skill_gate.py --self-test

What `check` enforces (details in README, "Adding a skill: the quality gate"):
  Tier 1  changed skills pass static_check; folder names are unique; descriptions fit the limit and say
          when to use the skill; a skill new to a pack ships evals/evals.json (>= 3 cases, a risk level)
          and evals/triggers.tsv (>= 8 should-fire and >= 8 near-miss prompts).
  Budget  the listing of every packed name + description stays under max_listing_chars.
  Tier 2  a skill that is new to a pack, or whose name/description/triggers changed, has a passing
          evals/routing-report.json whose hash matches the current files (written by `npm run eval:skill`).
  Tier 3  a new high-risk skill, or any change to an existing high-risk skill, has a passing
          evals/output-report.json whose hash matches (written by `npm run eval:skill -- --output-quality`).
  A reviewed exception can be recorded in <skill>/evals/gate-waiver.md; it is accepted and printed loudly.
Exit code 1 if anything fails.
"""
import hashlib, json, os, re, subprocess, sys, tempfile

ROOT = os.path.realpath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, os.path.join(ROOT, "skills/founder-productivity/skill-eval/scripts"))
from static_check import check_skill, parse_frontmatter  # noqa: E402

REPORTS = ("evals/routing-report.json", "evals/output-report.json")


def git(*args, check=True):
    r = subprocess.run(["git", *args], cwd=ROOT, capture_output=True, text=True)
    if check and r.returncode:
        raise SystemExit(f"git {' '.join(args)} failed: {r.stderr.strip()}")
    return r.stdout


def config():
    return json.load(open(os.path.join(ROOT, "scripts/skill-gate.config.json")))


def skill_dirs(root=ROOT):
    """name -> folder for every SKILL.md under skills/ (sandbox included, for collision checks)."""
    out = {}
    for base, dirs, files in os.walk(os.path.join(root, "skills")):
        dirs[:] = sorted(d for d in dirs if d not in ("node_modules", ".git", "__pycache__"))
        if "SKILL.md" in files:
            out.setdefault(os.path.basename(base), []).append(os.path.relpath(base, root))
            dirs[:] = []
    return out


def packed(cfg_text):
    cfg = json.loads(cfg_text)
    return {s: p["name"] for p in cfg["packs"] for s in p["skills"]}


def frontmatter(path):
    fm, _ = parse_frontmatter(open(path, encoding="utf-8", errors="replace").read())
    return fm or {}


def frontmatter_at(ref, relpath):
    r = subprocess.run(["git", "show", f"{ref}:{relpath}"], cwd=ROOT, capture_output=True, text=True)
    if r.returncode:
        return None
    fm, _ = parse_frontmatter(r.stdout)
    return fm or {}


def read(path):
    try:
        return open(path, encoding="utf-8").read()
    except FileNotFoundError:
        return ""


def hashes(skill_dir):
    """routing_hash covers what routing depends on; output_hash covers every file except the reports."""
    full = os.path.join(ROOT, skill_dir)
    fm = frontmatter(os.path.join(full, "SKILL.md"))
    routing = hashlib.sha256("\n".join([fm.get("name", ""), fm.get("description", ""),
                                        read(os.path.join(full, "evals/triggers.tsv"))]).encode()).hexdigest()
    h = hashlib.sha256()
    for base, dirs, files in os.walk(full):
        dirs[:] = sorted(d for d in dirs if d not in ("__pycache__", "node_modules"))
        for f in sorted(files):
            rel = os.path.relpath(os.path.join(base, f), full)
            if rel in REPORTS or rel == "evals/gate-waiver.md" or f.endswith(".pyc"):
                continue
            h.update(rel.encode() + b"\0" + open(os.path.join(base, f), "rb").read() + b"\0")
    return {"routing_hash": routing, "output_hash": h.hexdigest()}


def listing_chars(cfg_text, dirs):
    total = 0
    for name in packed(cfg_text):
        fm = frontmatter(os.path.join(ROOT, dirs[name][0], "SKILL.md"))
        total += len(fm.get("name", name)) + len(fm.get("description", "")) + 4
    return total


def trigger_counts(path, name):
    pos = neg = 0
    for line in read(path).splitlines():
        if not line.strip() or line.startswith("#"):
            continue
        cols = line.split("\t")
        if len(cols) < 3 or not cols[2].strip():
            continue
        alts = [a.split(":")[-1] for a in cols[0].split("|")]
        if name in alts:
            pos += 1
        else:
            neg += 1
    return pos, neg


def run_check(base):
    cfg = config()
    errors, warnings, notes = [], [], []
    head_cfg = open(os.path.join(ROOT, "packs.config.json")).read()
    base_cfg = git("show", f"{base}:packs.config.json", check=False) or '{"packs": []}'
    head_packed, base_packed = packed(head_cfg), packed(base_cfg)
    dirs = skill_dirs()

    # Folder names must be unique: build-packs.sh maps skills by folder name, so a duplicate silently wins.
    for name, where in dirs.items():
        if len(where) > 1:
            errors.append(f"duplicate skill folder name '{name}': {', '.join(where)}")
    for name in head_packed:
        if name not in dirs:
            errors.append(f"packs.config.json lists '{name}' but no skills/**/{name}/SKILL.md exists")
    for name in cfg["high_risk_skills"]:
        if name not in head_packed:
            warnings.append(f"skill-gate.config.json lists high-risk skill '{name}', which is not packed")

    # Which packed skills changed against the base (committed and uncommitted)?
    changed_files = set(git("diff", "--name-only", base, "--", "skills").split())
    changed_files |= set(git("ls-files", "--others", "--exclude-standard", "skills").split())
    changed = set()
    for f in changed_files:
        for name, where in dirs.items():
            if name in head_packed and any(f == w or f.startswith(w + "/") for w in where):
                changed.add(name)
    new = {n for n in head_packed if n not in base_packed}
    changed |= new

    for name in sorted(changed):
        d = dirs[name][0]
        full = os.path.join(ROOT, d)
        waiver = read(os.path.join(full, "evals/gate-waiver.md")).strip()
        res = check_skill(full)
        for i in res["issues"]:
            if i["level"] == "error":
                errors.append(f"{name}: static {i['code']}: {i['message']}")
        fm = frontmatter(os.path.join(full, "SKILL.md"))
        old = frontmatter_at(base, f"{d}/SKILL.md")
        desc = fm.get("description", "")
        desc_changed = old is None or old.get("description") != desc or old.get("name") != fm.get("name")
        triggers_changed = any(f == f"{d}/evals/triggers.tsv" for f in changed_files)
        is_new = name in new
        if desc_changed or is_new:
            if len(desc) > cfg["description_max_chars"]:
                errors.append(f"{name}: description is {len(desc)} chars (gate max {cfg['description_max_chars']})")
            if not re.search(r"\buse (it |this )?(when|whenever|for|if|only when)\b", desc, re.I):
                errors.append(f"{name}: description needs a 'Use when ...' clause")

        risk = None
        if is_new:
            evals_path = os.path.join(full, "evals/evals.json")
            try:
                ev = json.load(open(evals_path))
                cases = ev.get("evals") or []
                if len(cases) < cfg["new_skill"]["min_output_cases"]:
                    errors.append(f"{name}: evals/evals.json has {len(cases)} cases (new skills need {cfg['new_skill']['min_output_cases']})")
                risk = ev.get("risk")
                if risk not in ("normal", "high"):
                    errors.append(f"{name}: evals/evals.json must set \"risk\": \"normal\" or \"high\"")
            except FileNotFoundError:
                errors.append(f"{name}: new skill has no evals/evals.json")
            except json.JSONDecodeError as e:
                errors.append(f"{name}: evals/evals.json is invalid JSON ({e})")
            pos, neg = trigger_counts(os.path.join(full, "evals/triggers.tsv"), name)
            need = cfg["new_skill"]
            if pos < need["min_trigger_positives"] or neg < need["min_trigger_negatives"]:
                errors.append(f"{name}: evals/triggers.tsv has {pos} should-fire and {neg} near-miss prompts "
                              f"(new skills need {need['min_trigger_positives']} and {need['min_trigger_negatives']})")

        h = hashes(d)
        # Tier 2 evidence: routing report for new skills and any name/description/trigger change.
        if is_new or desc_changed or triggers_changed:
            problem = report_problem(full, "routing-report.json", "routing_hash", h["routing_hash"])
            if problem:
                (warnings if waiver else errors).append(f"{name}: {problem} (run: npm run eval:skill -- {name})")
        # Tier 3 evidence: output report for new high-risk skills and any change to a listed high-risk skill.
        high = name in cfg["high_risk_skills"] or risk == "high"
        if high and (is_new or name in changed):
            problem = report_problem(full, "output-report.json", "output_hash", h["output_hash"])
            if problem:
                (warnings if waiver else errors).append(f"{name}: high-risk skill, {problem} (run: npm run eval:skill -- {name} --output-quality)")
        if waiver:
            notes.append(f"WAIVER for {name}: {waiver.splitlines()[0][:200]}")

    total = listing_chars(head_cfg, dirs)
    base_total = None
    if cfg["max_listing_chars"] and total > cfg["max_listing_chars"]:
        errors.append(f"skill listing is {total:,} chars, over the budget of {cfg['max_listing_chars']:,}. "
                      "Shorten descriptions, retire a skill, or raise max_listing_chars in scripts/skill-gate.config.json and say why in the PR")
    print(f"skill gate vs {base}: {len(changed)} changed packed skill(s), {len(new)} new to a pack; "
          f"listing {total:,}/{cfg['max_listing_chars']:,} chars")
    for n in sorted(changed):
        print(f"  checked {n}{' (new)' if n in new else ''}")
    for n in notes:
        print("  " + n)
    for w in warnings:
        print("  warn  " + w)
    for e in errors:
        print("  ERROR " + e)
    print("skill gate passed" if not errors else f"skill gate failed: {len(errors)} error(s)")
    return 1 if errors else 0


def report_problem(full, fname, key, expected):
    path = os.path.join(full, "evals", fname)
    try:
        rep = json.load(open(path))
    except FileNotFoundError:
        return f"missing evals/{fname}"
    except json.JSONDecodeError:
        return f"evals/{fname} is invalid JSON"
    if rep.get(key) != expected:
        return f"evals/{fname} is stale (the skill changed after it was written)"
    if not rep.get("pass"):
        return f"evals/{fname} records a failing result"
    return None


def self_test():
    """Builds a throwaway git repo with one packed skill, then adds a new one and checks the gate's verdicts."""
    import shutil
    src = ROOT
    with tempfile.TemporaryDirectory() as td:
        repo = os.path.join(td, "repo")
        os.makedirs(os.path.join(repo, "scripts"))
        os.makedirs(os.path.join(repo, "skills/founder-productivity"))
        shutil.copy(os.path.join(src, "scripts/skill_gate.py"), os.path.join(repo, "scripts/"))
        shutil.copytree(os.path.join(src, "skills/founder-productivity/skill-eval"), os.path.join(repo, "skills/founder-productivity/skill-eval"))
        cfg = config(); cfg["high_risk_skills"] = []; cfg["max_listing_chars"] = 100000
        json.dump(cfg, open(os.path.join(repo, "scripts/skill-gate.config.json"), "w"))
        packs = {"packs": [{"name": "utopia-founder-productivity", "skills": ["skill-eval"]}]}
        json.dump(packs, open(os.path.join(repo, "packs.config.json"), "w"))
        run = lambda *a: subprocess.run(["git", *a], cwd=repo, capture_output=True, text=True, check=True)
        run("init", "-q"); run("-c", "user.email=t@t", "-c", "user.name=t", "add", "-A")
        run("-c", "user.email=t@t", "-c", "user.name=t", "commit", "-qm", "base")
        # Add a new skill with nothing but a SKILL.md: every evidence check must fail.
        nd = os.path.join(repo, "skills/founder-productivity/board-update")
        os.makedirs(nd)
        open(os.path.join(nd, "SKILL.md"), "w").write(
            "---\nname: board-update\ndescription: >-\n  Formats monthly board updates from a metrics sheet into the studio template with charts and risks.\n"
            "  Use when the user asks for a board update or investor update from their numbers.\n---\n# Board update\n")
        packs["packs"][0]["skills"].append("board-update")
        json.dump(packs, open(os.path.join(repo, "packs.config.json"), "w"))
        gate = lambda: subprocess.run([sys.executable, "-I", os.path.join(repo, "scripts/skill_gate.py"), "check", "--base", "HEAD"],
                                      cwd=repo, capture_output=True, text=True)
        r = gate()
        assert r.returncode == 1, r.stdout
        for want in ("no evals/evals.json", "triggers.tsv has 0", "missing evals/routing-report.json"):
            assert want in r.stdout, (want, r.stdout)
        # Supply evals, triggers and a matching passing report: the gate must pass.
        os.makedirs(os.path.join(nd, "evals"))
        json.dump({"skill_name": "board-update", "risk": "normal", "evals": [
            {"prompt": f"p{i}", "expected_output": "x", "assertions": ["a"]} for i in range(3)]}, open(os.path.join(nd, "evals/evals.json"), "w"))
        rows = [f"board-update\tboard-update\tshould fire {i}" for i in range(8)] + [f"none\tboard-update\tnear miss {i}" for i in range(8)]
        open(os.path.join(nd, "evals/triggers.tsv"), "w").write("\n".join(rows) + "\n")
        sys.path.insert(0, os.path.join(repo, "scripts"))
        out = subprocess.run([sys.executable, "-I", os.path.join(repo, "scripts/skill_gate.py"), "hash", "board-update"], cwd=repo, capture_output=True, text=True, check=True)
        h = json.loads(out.stdout)
        json.dump({"pass": True, "routing_hash": h["routing_hash"]}, open(os.path.join(nd, "evals/routing-report.json"), "w"))
        r = gate()
        assert r.returncode == 0, r.stdout
        # Editing the description afterwards makes the report stale.
        t = open(os.path.join(nd, "SKILL.md")).read().replace("monthly", "quarterly")
        open(os.path.join(nd, "SKILL.md"), "w").write(t)
        r = gate()
        assert r.returncode == 1 and "is stale" in r.stdout, r.stdout
        # Over-budget listing fails.
        cfg["max_listing_chars"] = 50
        json.dump(cfg, open(os.path.join(repo, "scripts/skill-gate.config.json"), "w"))
        r = gate()
        assert "over the budget" in r.stdout, r.stdout
    print("self-test passed")
    return 0


def main(argv):
    if argv[:1] == ["--self-test"]:
        return self_test()
    if argv[:1] == ["check"]:
        base = argv[argv.index("--base") + 1] if "--base" in argv else "origin/main"
        return run_check(base)
    if argv[:1] == ["budget"]:
        cfg = config()
        total = listing_chars(open(os.path.join(ROOT, "packs.config.json")).read(), skill_dirs())
        print(json.dumps({"listing_chars": total, "max_listing_chars": cfg["max_listing_chars"], "approx_tokens": total // 4}))
        return 0
    if argv[:1] == ["hash"] and len(argv) == 2:
        dirs = skill_dirs()
        if argv[1] not in dirs:
            print(f"unknown skill {argv[1]}", file=sys.stderr)
            return 2
        print(json.dumps({"skill": argv[1], "path": dirs[argv[1]][0], **hashes(dirs[argv[1]][0])}))
        return 0
    print(__doc__)
    return 2


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
