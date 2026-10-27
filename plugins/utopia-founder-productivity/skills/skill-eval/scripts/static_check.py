#!/usr/bin/env python3
"""Gate 1 static checks for Claude skills. Standard library only.

Usage:
  static_check.py SKILL_DIR [SKILL_DIR ...]   check specific skill folders
  static_check.py --all ROOT                  check every folder under ROOT that has a SKILL.md
  add --json for machine-readable output; --self-test runs the built-in checks of this script.
Exit code: 1 if any skill has an error, else 0. See references/static-checks.md for each rule.
"""
import json, os, py_compile, re, shutil, subprocess, sys, tempfile

NAME_RE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")
RESERVED = ("anthropic", "claude")
# Paths a skill tells Claude to create in the user's project, placeholders and URLs aren't expected to exist.
SKIP_PATH = re.compile(r"^(https?:|mailto:|#|/|~|\$|<|\{|output|outputs/|\./output)")
PATH_HINT = re.compile(r"^(\./|\.\./|references?/|scripts?/|assets?/|resources?/|templates?/|examples?/|evals?/|agents?/)")
SECRET_RE = re.compile(r"(sk-[A-Za-z0-9]{20,}|sk-ant-[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9]{30,}|AKIA[0-9A-Z]{16}|xox[bpas]-[A-Za-z0-9-]{20,}|-----BEGIN [A-Z ]*PRIVATE KEY-----)")
PERSONAL_PATH_RE = re.compile(r"(/Users/(?!<|\{|(?:you|USER|username|name)/)[A-Za-z0-9._-]+/|/home/(?!<|\{|(?:user|USER)/)[A-Za-z0-9._-]+/|C:\\Users\\[A-Za-z0-9._-]+\\)")
SANDBOX_PATH_RE = re.compile(r"/mnt/(skills|user-data)/")
EMAIL_RE = re.compile(r"\b[A-Za-z0-9._%+-]+@(gmail|yahoo|hotmail|outlook|icloud)\.com\b")
TIME_RE = re.compile(r"\b(before|after|until|as of) (January|February|March|April|May|June|July|August|September|October|November|December) 20\d\d\b")
FIRST_PERSON_RE = re.compile(r"^\s*(I can|I will|I'll|You can|You should|This skill lets you)\b", re.I)
TEXT_EXT = (".md", ".txt", ".py", ".js", ".mjs", ".cjs", ".ts", ".sh", ".json", ".yaml", ".yml", ".html", ".css", ".toml")


def parse_frontmatter(text):
    """Return (dict, body) for a ---\\n...\\n--- block. Handles plain, quoted and >- / | block scalars."""
    if not text.startswith("---"):
        return None, text
    end = text.find("\n---", 3)
    if end == -1:
        return None, text
    block, body = text[3:end].strip("\n"), text[end + 4:].lstrip("\n")
    data, key, buf, style = {}, None, [], None

    def flush():
        if key is None:
            return
        if style is None:
            data[key] = " ".join(buf).strip()
        else:
            data[key] = (" " if style.startswith(">") else "\n").join(s.strip() for s in buf).strip()

    for line in block.split("\n"):
        m = re.match(r"^([A-Za-z_][\w-]*):\s*(.*)$", line)
        if m and not line.startswith((" ", "\t")):
            flush()
            key, val = m.group(1), m.group(2).strip()
            buf, style = [], None
            if val in (">", ">-", "|", "|-", ">+", "|+"):
                style = val
            elif val:
                if len(val) > 1 and val[0] == val[-1] and val[0] in "\"'":
                    val = val[1:-1].replace('\\"', '"') if val[0] == '"' else val[1:-1].replace("''", "'")
                buf = [val]
        elif key is not None:
            buf.append(line)
    flush()
    return data, body


def rel_paths(text):
    found = set(re.findall(r"\]\(([^)\s]+)\)", text))
    found |= {p for p in re.findall(r"`([^`\s]+)`", text) if PATH_HINT.match(p)}
    out = set()
    for p in found:
        p = p.split("#")[0].strip()
        # "./x" usually names a file in the user's project, and [x] is a placeholder; neither should exist in the skill.
        if not p or SKIP_PATH.match(p) or p.startswith("./") or any(c in p for c in "*<{["):
            continue
        if not re.search(r"\.[A-Za-z0-9]{1,5}$|/$", p):  # must look like a file or a folder
            continue
        out.add(p)
    return out


def check_skill(skill_dir):
    issues = []
    add = lambda level, code, msg: issues.append({"level": level, "code": code, "message": msg})
    path = os.path.join(skill_dir, "SKILL.md")
    folder = os.path.basename(os.path.realpath(skill_dir))
    if not os.path.isfile(path):
        add("error", "no-skill-md", "SKILL.md not found")
        return {"skill": folder, "path": skill_dir, "issues": issues}
    text = open(path, encoding="utf-8", errors="replace").read()
    fm, body = parse_frontmatter(text)
    if fm is None:
        add("error", "frontmatter", "No parseable --- frontmatter block at the top of SKILL.md")
        fm = {}
    name, desc = fm.get("name", ""), fm.get("description", "")
    if not name:
        add("error", "name-missing", "Frontmatter has no name")
    else:
        if len(name) > 64 or not NAME_RE.match(name):
            add("error", "name-format", f"name '{name}' must be 1-64 chars of lowercase letters, digits and hyphens")
        if any(r in name for r in RESERVED):
            add("error", "name-reserved", f"name '{name}' contains a reserved word ({', '.join(RESERVED)})")
        if name != folder:
            add("error", "name-folder", f"name '{name}' does not match folder '{folder}'")
    if not desc:
        add("error", "description-missing", "Frontmatter has no description")
    else:
        if len(desc) > 1024:
            add("error", "description-length", f"description is {len(desc)} chars (max 1024)")
        elif len(desc) < 200:
            add("warning", "description-short", f"description is only {len(desc)} chars; add 'Use when ...' triggers")
        if FIRST_PERSON_RE.search(desc):
            add("warning", "description-voice", "description uses first/second person; write in third person")
        if not re.search(r"\b(use (it |this )?(when|whenever|for|if)|fires? (on|when)|triggers? (on|when))\b", desc, re.I):
            add("warning", "description-when", "description has no 'Use when ...' clause")
    for field in ("name", "description"):
        if re.search(r"<[A-Za-z/][^>]*>", fm.get(field, "")):
            add("error", "xml-in-frontmatter", f"{field} contains an XML/HTML tag")
    lines = body.count("\n") + 1
    if lines > 500:
        add("warning", "body-length", f"SKILL.md body is {lines} lines (keep under 500; move detail to references/)")
    if TIME_RE.search(body):
        add("warning", "time-sensitive", f"time-sensitive phrasing: '{TIME_RE.search(body).group(0)}'")

    # Paths referenced from SKILL.md, and one level of nesting from the files it references.
    referenced = set()
    for p in sorted(rel_paths(body)):
        if "\\" in p:
            add("error", "windows-path", f"backslash path '{p}'; use forward slashes")
            continue
        target = os.path.normpath(os.path.join(skill_dir, p))
        if not os.path.exists(target):
            if p.endswith("/"):
                add("warning", "missing-folder", f"SKILL.md mentions folder '{p}', which does not exist (fine if Claude creates it)")
            else:
                add("error", "missing-path", f"SKILL.md mentions '{p}', which does not exist")
        elif os.path.isfile(target) and target.endswith(".md"):
            referenced.add(target)
    for ref in sorted(referenced):
        rtext = open(ref, encoding="utf-8", errors="replace").read()
        rname = os.path.relpath(ref, skill_dir)
        for p in sorted(rel_paths(rtext)):
            t = os.path.normpath(os.path.join(os.path.dirname(ref), p))
            t2 = os.path.normpath(os.path.join(skill_dir, p))
            if not os.path.exists(t) and not os.path.exists(t2):
                if p.endswith("/"):
                    add("warning", "missing-folder", f"{rname} mentions folder '{p}', which does not exist (fine if Claude creates it)")
                else:
                    add("error", "missing-path", f"{rname} mentions '{p}', which does not exist")
            elif t.endswith(".md") and os.path.exists(t) and t not in referenced and os.path.realpath(t) != os.path.realpath(path):
                add("warning", "nested-reference", f"{rname} links to {os.path.relpath(t, skill_dir)}; link it directly from SKILL.md")
        if rtext.count("\n") > 100 and not re.search(r"^#+\s*(contents|table of contents)\b", rtext[:3000], re.I | re.M):
            add("warning", "no-toc", f"{rname} is over 100 lines without a Contents list near the top")

    # Every file in the folder: script syntax, secrets, personal and sandbox paths.
    node = shutil.which("node")
    for root, dirs, files in os.walk(skill_dir):
        dirs[:] = [d for d in dirs if d not in ("node_modules", "__pycache__", ".git")]
        for f in files:
            fp = os.path.join(root, f)
            rp = os.path.relpath(fp, skill_dir)
            if f.endswith(".py"):
                try:
                    with tempfile.TemporaryDirectory() as td:
                        py_compile.compile(fp, cfile=os.path.join(td, "x.pyc"), doraise=True)
                except py_compile.PyCompileError as e:
                    add("error", "script-syntax", f"{rp}: {str(e).splitlines()[-1][:160]}")
            elif f.endswith((".js", ".mjs", ".cjs")) and node:
                r = subprocess.run([node, "--check", fp], capture_output=True, text=True)
                if r.returncode:
                    add("error", "script-syntax", f"{rp}: {(r.stderr.strip().splitlines() or ['syntax error'])[-1][:160]}")
            elif f.endswith(".sh"):
                r = subprocess.run(["bash", "-n", fp], capture_output=True, text=True)
                if r.returncode:
                    add("error", "script-syntax", f"{rp}: {r.stderr.strip()[:160]}")
            if not f.endswith(TEXT_EXT) or os.path.getsize(fp) > 2_000_000:
                continue
            t = open(fp, encoding="utf-8", errors="replace").read()
            if SECRET_RE.search(t):
                add("error", "secret", f"{rp}: looks like a credential ({SECRET_RE.search(t).group(0)[:12]}...)")
            m = PERSONAL_PATH_RE.search(t)
            if m:
                add("error", "personal-path", f"{rp}: hard-coded personal path '{m.group(0)}'")
            if SANDBOX_PATH_RE.search(t):
                add("warning", "sandbox-path", f"{rp}: claude.ai-only path '{SANDBOX_PATH_RE.search(t).group(0)}'")
            if EMAIL_RE.search(t):
                add("warning", "personal-email", f"{rp}: personal email address")
    return {"skill": name or folder, "path": skill_dir, "issues": issues}


def find_skills(root):
    for r, dirs, files in os.walk(root):
        dirs[:] = sorted(d for d in dirs if d not in ("node_modules", ".git", "__pycache__"))
        if "SKILL.md" in files:
            yield r
            dirs[:] = []  # a skill's own subfolders are not separate skills


def report(results, as_json):
    errors = sum(1 for r in results for i in r["issues"] if i["level"] == "error")
    warns = sum(1 for r in results for i in r["issues"] if i["level"] == "warning")
    if as_json:
        print(json.dumps({"skills": len(results), "errors": errors, "warnings": warns, "results": results}, indent=2))
    else:
        for r in results:
            if r["issues"]:
                print(f"\n{r['skill']}  ({r['path']})")
                for i in r["issues"]:
                    print(f"  {'ERROR' if i['level'] == 'error' else 'warn '} {i['code']}: {i['message']}")
        failing = sum(1 for r in results if any(i["level"] == "error" for i in r["issues"]))
        print(f"\n{len(results)} skills checked: {failing} with errors, {errors} errors, {warns} warnings")
    return 1 if errors else 0


def self_test():
    with tempfile.TemporaryDirectory() as td:
        good = os.path.join(td, "good-skill")
        os.makedirs(os.path.join(good, "references"))
        open(os.path.join(good, "references", "guide.md"), "w").write("# Guide\nDetails.\n")
        open(os.path.join(good, "SKILL.md"), "w").write(
            "---\nname: good-skill\ndescription: >-\n  Formats quarterly board updates from raw metrics into the studio template with charts and a risks section.\n"
            "  Use when the user asks for a board update, investor update or monthly report from a metrics sheet.\n---\n"
            "# Good\nSee [the guide](references/guide.md).\n")
        bad = os.path.join(td, "bad-skill")
        os.makedirs(os.path.join(bad, "scripts"))
        open(os.path.join(bad, "scripts", "x.py"), "w").write("def broken(:\n")
        open(os.path.join(bad, "SKILL.md"), "w").write(
            "---\nname: Bad_Skill\ndescription: I can help\n---\nRead `references/missing.md` and " + "/Users/" + "someone/notes/x.md\n")
        g, b = check_skill(good), check_skill(bad)
        assert not g["issues"], g["issues"]
        codes = {i["code"] for i in b["issues"]}
        for want in ("name-format", "name-folder", "description-short", "description-voice", "missing-path", "script-syntax", "personal-path"):
            assert want in codes, (want, codes)
        assert PERSONAL_PATH_RE.search("/Users/" + "youssef/notes") and not PERSONAL_PATH_RE.search("/Users/" + "you/notes")
        fm, _ = parse_frontmatter('---\nname: q\ndescription: "Quoted: with colon"\n---\nbody')
        assert fm["description"] == "Quoted: with colon", fm
    print("self-test passed")
    return 0


def main(argv):
    as_json = "--json" in argv
    args = [a for a in argv if a != "--json"]
    if args[:1] == ["--self-test"]:
        return self_test()
    if args[:1] == ["--all"] and len(args) == 2:
        dirs = list(find_skills(args[1]))
    elif args and not args[0].startswith("--"):
        dirs = args
    else:
        print(__doc__)
        return 2
    if not dirs:
        print("No SKILL.md found.")
        return 2
    return report([check_skill(d) for d in dirs], as_json)


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
