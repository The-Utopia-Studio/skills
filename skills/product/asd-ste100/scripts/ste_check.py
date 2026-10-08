#!/usr/bin/env python3
"""Mechanical ASD-STE100 checker.

Catches the rule violations a machine can see: sentence length, banned punctuation,
verb forms and tenses, passive voice, contractions, Latin abbreviations, gendered
pronouns, paragraph length, and words that are not in the STE dictionary.

It does NOT decide whether an unapproved word is a legitimate technical noun or
technical verb (rules 1.5 / 1.12) — that is your judgment call. Unknown words are
reported so you make that call deliberately.

Usage:
    python3 ste_check.py FILE [FILE ...] [--mode procedure|descriptive|auto]
                              [--quiet] [--json]

Reads the two reference files next to this script (../references/).
"""

import argparse
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REFS = os.path.join(os.path.dirname(HERE), "references")

POS_TAGS = "n|v|adj|adv|prep|conj|con|art|pron|int|TN|TV"

# -- Rule data that is small enough to keep inline -----------------------------

CONTRACTIONS = re.compile(
    r"\b(?:can't|cannot've|won't|don't|doesn't|didn't|isn't|aren't|wasn't|weren't|"
    r"hasn't|haven't|hadn't|shouldn't|wouldn't|couldn't|mustn't|it's|that's|there's|"
    r"we'll|you'll|they'll|we're|you're|they're|I'm|I've|we've|you've|they've)\b",
    re.I,
)
LATIN = re.compile(r"\b(?:e\.g\.|i\.e\.|etc\.|et al\.|viz\.|cf\.|N\.B\.)", re.I)
GENDERED = re.compile(r"\b(?:he|she|him|her|his|hers|himself|herself)\b", re.I)
PERFECT = re.compile(
    r"\b(?:has|have|had)\s+(?:been\s+)?\w+(?:ed|en)\b|\bhas\s+to\b|\bhave\s+to\b", re.I
)
CONTINUOUS = re.compile(r"\b(?:is|are|was|were|be|been|being)\s+\w+ing\b", re.I)
PASSIVE = re.compile(
    r"\b(?:is|are|was|were|be|been|being)\s+(?:not\s+)?(?:\w+ly\s+)?"
    r"(\w{3,}(?:ed|en))\b(?!\s+(?:to|that)\b)", re.I
)
MODAL_STACK = re.compile(r"\b(?:should|would|could|might|may|shall|ought)\b", re.I)
ING = re.compile(r"\b(\w{4,}ing)\b", re.I)
PHRASALS = [
    "carry out", "set up", "put out", "take off", "turn on", "turn off", "shut down",
    "shut off", "break down", "check out", "fill up", "look for", "look at", "find out",
    "make up", "pick up", "go through", "bring about", "hold on", "come off",
]
# -ing words that are legitimate (approved adverbs/adjectives, common technical nouns)
ING_OK = {
    "during", "according", "bearing", "bushing", "casing", "ceiling", "coating",
    "covering", "cowling", "fairing", "fitting", "grating", "housing", "landing",
    "lightning", "lining", "mounting", "opening", "packing", "piping", "rigging",
    "ring", "seating", "sling", "spring", "string", "thing", "training", "tubing",
    "warning", "wiring", "operating", "working", "following", "remaining", "engineering",
    "something", "nothing", "everything", "wing", "swing", "testing", "setting",
}

UNIT = r"(?:mm|cm|m|km|in|ft|yd|mil|g|kg|lb|oz|N|kN|Nm|kPa|MPa|psi|bar|V|A|mA|W|kW|Hz|kHz|" \
       r"°C|°F|K|s|sec|min|h|hr|l|L|ml|gal|rpm|%)"

SEVERITY_ORDER = {"error": 0, "warning": 1, "note": 2}

# Words the vocabulary check never flags: numbers written out, units of measurement,
# and single letters (rule 8.6 counts these as one word each; rule 1.5 category 9).
NUMBER_WORDS = {
    "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
    "seventeen", "eighteen", "nineteen", "twenty", "thirty", "forty", "fifty",
    "sixty", "seventy", "eighty", "ninety", "hundred", "thousand", "million",
    "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth",
    "ninth", "tenth",
}
UNIT_WORDS = {
    "mm", "cm", "km", "ft", "yd", "mil", "kg", "lb", "oz", "kn", "nm", "kpa", "mpa",
    "psi", "bar", "ma", "kw", "hz", "khz", "mhz", "rpm", "ml", "gal", "sec", "min",
    "hr", "deg", "vdc", "vac", "amp", "amps", "volt", "volts", "liter", "liters",
    "meter", "meters", "inch", "inches", "degree", "degrees", "celsius", "fahrenheit",
}

IRREGULAR = {
    "be": "is are was were been am", "do": "does did done", "have": "has had",
    "go": "goes went gone", "get": "gets got gotten", "make": "makes made",
    "put": "puts", "set": "sets", "take": "takes took taken", "come": "comes came",
    "give": "gives gave given", "hold": "holds held", "keep": "keeps kept",
    "leave": "leaves left", "let": "lets", "read": "reads", "see": "sees saw seen",
    "send": "sends sent", "speak": "speaks spoke spoken", "stand": "stands stood",
    "tell": "tells told", "think": "thinks thought", "write": "writes wrote written",
    "break": "breaks broke broken", "bring": "brings brought", "build": "builds built",
    "burn": "burns burnt", "buy": "buys bought", "catch": "catches caught",
    "choose": "chooses chose chosen", "cut": "cuts", "feel": "feels felt",
    "find": "finds found", "fit": "fits", "hear": "hears heard", "hit": "hits",
    "know": "knows knew known", "lose": "loses lost", "mean": "means meant",
    "meet": "meets met", "pay": "pays paid", "run": "runs ran", "say": "says said",
    "sell": "sells sold", "shake": "shakes shook shaken", "show": "shows showed shown",
    "shut": "shuts", "sit": "sits sat", "spill": "spills spilt", "split": "splits",
    "spread": "spreads", "strike": "strikes struck", "teach": "teaches taught",
    "tear": "tears tore torn", "wear": "wears wore worn", "wind": "winds wound",
    "freeze": "freezes froze frozen", "blow": "blows blew blown",
    "draw": "draws drew drawn", "drive": "drives drove driven",
    "fall": "falls fell fallen", "fly": "flies flew flown", "grow": "grows grew grown",
    "throw": "throws threw thrown", "light": "lights lit", "bend": "bends bent",
    "bleed": "bleeds bled", "feed": "feeds fed", "hang": "hangs hung",
    "lay": "lays laid", "slide": "slides slid", "stick": "sticks stuck",
    "swing": "swings swung", "wake": "wakes woke", "smell": "smells smelled",
    "spin": "spins spun", "stow": "stows stowed", "swell": "swells swollen",
}


def inflections(word, tags):
    """Regular and irregular forms of an approved headword."""
    out = {word}
    if word in IRREGULAR:
        out.update(IRREGULAR[word].split())
    if {"v", "n", "TN"} & tags:
        if word.endswith(("s", "x", "z", "ch", "sh")):
            out.add(word + "es")
        elif word.endswith("y") and len(word) > 2 and word[-2] not in "aeiou":
            out.update({word[:-1] + "ies"})
        else:
            out.add(word + "s")
    if "v" in tags and word not in IRREGULAR:
        if word.endswith("e"):
            out.add(word + "d")
        elif word.endswith("y") and len(word) > 2 and word[-2] not in "aeiou":
            out.add(word[:-1] + "ied")
        else:
            out.add(word + "ed")
            if len(word) > 2 and word[-1] not in "aeiouywx" and word[-2] in "aeiou" \
                    and word[-3] not in "aeiou":
                out.add(word + word[-1] + "ed")
    return out


# -- Dictionary loading -------------------------------------------------------

def load_approved():
    """word -> set of approved parts of speech, from references/approved-words.md."""
    path = os.path.join(REFS, "approved-words.md")
    approved = {}
    pos_map = {
        "Verbs": "v", "Nouns": "n", "Adjectives": "adj", "Adverbs": "adv",
        "Prepositions": "prep", "Conjunctions": "conj", "Pronouns": "pron",
        "Articles": "art", "Technical nouns": "TN", "Interjections": "int",
    }
    current = None
    with open(path, encoding="utf-8") as fh:
        for line in fh:
            m = re.match(r"^## (.+?) \(\d+\)\s*$", line)
            if m:
                current = pos_map.get(m.group(1).strip())
                continue
            if current and line.strip() and not line.startswith(("#", ">")):
                for w in line.split(","):
                    w = w.strip()
                    if w and re.match(r"^[A-Z][A-Z0-9 …'’\-\./]*$", w):
                        approved.setdefault(w.lower(), set()).add(current)
    for word, tags in list(approved.items()):
        for form in inflections(word, tags):
            approved.setdefault(form, set()).update(tags)
    for w in NUMBER_WORDS | UNIT_WORDS:
        approved.setdefault(w, set()).add("n")
    return approved


POS_WORD = {"n": "a noun", "v": "a verb", "adj": "an adjective", "adv": "an adverb",
            "prep": "a preposition", "conj": "a conjunction", "con": "a conjunction",
            "art": "an article", "pron": "a pronoun", "int": "an interjection"}


def load_replacements():
    """not-approved word -> [(part of speech, alternatives)], from replacements.md."""
    path = os.path.join(REFS, "replacements.md")
    out = {}
    row = re.compile(r"^\|\s*(.+?)\s*\((" + POS_TAGS + r")\)\s*\|\s*(.+?)\s*\|\s*$")
    with open(path, encoding="utf-8") as fh:
        for line in fh:
            m = row.match(line)
            if m:
                out.setdefault(m.group(1).strip().lower(), []).append(
                    (m.group(2), m.group(3))
                )
    return out


def phrase_message(word, entries):
    bits = []
    for pos, alts in entries:
        bits.append(f"as {POS_WORD.get(pos, pos)} → {alts}")
    return f'"{word}" is not approved ' + "; ".join(bits)


# -- Text segmentation --------------------------------------------------------

def split_paragraphs(text):
    paras, buf, start = [], [], 1
    line_no = 0
    for line_no, line in enumerate(text.split("\n"), 1):
        if line.strip():
            if not buf:
                start = line_no
            buf.append(line)
        elif buf:
            paras.append((start, " ".join(buf)))
            buf = []
    if buf:
        paras.append((start, " ".join(buf)))
    return paras


def split_sentences(para):
    """Rule 8.4: a colon ends a sentence, like a period."""
    parts = re.split(r"(?<=[.!?:])\s+", para)
    return [p.strip() for p in parts if p.strip()]


def count_words(sentence):
    """STE word count: rules 8.5, 8.6, 8.7."""
    s = sentence
    s = re.sub(r"\([^)]*\)", " PAREN ", s)                      # 8.5 parentheses = 1 word
    s = re.sub(r"[\"“][^\"”]*[\"”]", " QUOTE ", s)              # 8.6 quoted text = 1 word
    s = re.sub(r"\b\d[\d,.]*\s*" + UNIT + r"\b", " NUMUNIT ", s)  # 8.6 number + unit = 1
    s = re.sub(r"\b\d[\d,.]*\b", " NUM ", s)                     # 8.6 numbers = 1
    tokens = re.findall(r"[A-Za-z][A-Za-z0-9’'\-\./]*", s)       # 8.7 hyphenated = 1
    return len([t for t in tokens if t.strip("-.'’/")])


def is_instruction(sentence):
    """Imperative-looking: starts with a bare verb, or 'If …, VERB'."""
    s = re.sub(r"^\s*\(?\d+[\.\)]?\s*", "", sentence).strip()
    s = re.split(r",\s*", s)[-1] if re.match(r"^(if|when|before|after)\b", s, re.I) else s
    first = re.findall(r"[A-Za-z’'\-]+", s)
    return bool(first) and first[0].lower() not in {
        "the", "a", "an", "this", "these", "it", "there", "you", "we", "they", "all", "each"
    }


# -- Checks -------------------------------------------------------------------

def check_text(text, approved, replacements, mode="auto"):
    findings = []
    multiword = [(k, v) for k, v in replacements.items() if " " in k]

    def add(line, severity, rule, message, excerpt=""):
        findings.append({
            "line": line, "severity": severity, "rule": rule,
            "message": message, "excerpt": excerpt[:110],
        })

    for start_line, para in split_paragraphs(text):
        sentences = split_sentences(para)

        if len(sentences) > 6:
            add(start_line, "warning", "6.6",
                f"Paragraph has {len(sentences)} sentences (maximum 6).")

        for sent in sentences:
            imperative = is_instruction(sent)
            if mode == "procedure":
                limit, limit_rule = 20, "5.1"
            elif mode == "descriptive":
                limit, limit_rule = 25, "6.3"
            else:
                limit, limit_rule = (20, "5.1") if imperative else (25, "6.3")

            n = count_words(sent)
            if n > limit:
                add(start_line, "error", limit_rule,
                    f"Sentence is {n} words (maximum {limit}).", sent)

            if ";" in sent:
                add(start_line, "error", "8.1", "Semicolon is not permitted.", sent)

            for m in CONTRACTIONS.finditer(sent):
                add(start_line, "error", "4.2",
                    f'Contraction "{m.group(0)}" — write it in full.', sent)

            for m in LATIN.finditer(sent):
                add(start_line, "warning", "GR-6",
                    f'Latin abbreviation "{m.group(0)}" — use English words.', sent)

            for m in GENDERED.finditer(sent):
                add(start_line, "error", "GR-7",
                    f'Gender-specific pronoun "{m.group(0)}" is not permitted.', sent)

            if PERFECT.search(sent):
                add(start_line, "error", "3.4",
                    "Perfect tense or auxiliary construction — use a simple tense.", sent)

            if CONTINUOUS.search(sent):
                add(start_line, "error", "3.2",
                    "Continuous tense is not permitted — use a simple tense.", sent)

            for m in MODAL_STACK.finditer(sent):
                if m.group(0).lower() not in replacements:
                    add(start_line, "error", "1.1",
                        f'"{m.group(0)}" is not approved — use MUST or CAN.', sent)

            pm = PASSIVE.search(sent)
            if pm and not CONTINUOUS.search(sent):
                sev = "error" if imperative else "warning"
                add(start_line, sev, "3.6",
                    "Passive voice — use the active voice "
                    "(descriptive text may use it only when the agent is unknown).", sent)

            for m in ING.finditer(sent):
                w = m.group(1).lower()
                if w not in ING_OK and w not in approved:
                    add(start_line, "warning", "3.5",
                        f'"-ing" form "{m.group(1)}" is permitted only as (part of) a '
                        "technical noun.", sent)

            low = " " + re.sub(r"[^a-z\s]", " ", sent.lower()) + " "
            for expr, entries in multiword:
                if f" {expr} " in low:
                    add(start_line, "error", "1.1", phrase_message(expr, entries), sent)
            for ph in PHRASALS:
                if f" {ph} " in low:
                    add(start_line, "warning", "9.3",
                        f'Phrasal verb "{ph}" is not permitted.', sent)

            # vocabulary (rule 1.1)
            for token in re.findall(r"[A-Za-z][A-Za-z’'\-]*", sent):
                w = token.lower().strip("-'’")
                if len(w) < 2 or w.isupper():
                    continue
                if w in approved:
                    continue
                if w in replacements:
                    trap = re.compile(rf"\b{re.escape(w)}\s*\(({POS_TAGS})\)", re.I)
                    same = [trap.search(a).group(0) for _, a in replacements[w]
                            if trap.search(a)]
                    if same:
                        add(start_line, "warning", "1.2",
                            f'"{token}" is approved only as {same[0]} — make sure that you '
                            "do not use it as another part of speech.", sent)
                    else:
                        add(start_line, "error", "1.1",
                            phrase_message(token, replacements[w]), sent)
                elif token[0].isupper() and token != sent.split()[0].strip("(\"“"):
                    continue  # proper noun / technical noun, category 11
                else:
                    add(start_line, "note", "1.1/1.5",
                        f'"{token}" is not in the dictionary — use it only if it is a '
                        "technical noun or technical verb.", sent)

    seen, unique = set(), []
    for f in findings:
        key = (f["line"], f["rule"], f["message"])
        if key not in seen:
            seen.add(key)
            unique.append(f)
    unique.sort(key=lambda f: (f["line"], SEVERITY_ORDER[f["severity"]]))
    return unique


def main():
    ap = argparse.ArgumentParser(description="Mechanical ASD-STE100 checker.")
    ap.add_argument("files", nargs="+")
    ap.add_argument("--mode", choices=["procedure", "descriptive", "auto"], default="auto",
                    help="Sentence-length limit: 20 words (procedure) or 25 (descriptive).")
    ap.add_argument("--quiet", action="store_true", help="Hide 'note' level findings.")
    ap.add_argument("--json", action="store_true", dest="as_json")
    args = ap.parse_args()

    approved = load_approved()
    replacements = load_replacements()
    total = 0
    report = {}

    for path in args.files:
        with open(path, encoding="utf-8") as fh:
            text = fh.read()
        findings = check_text(text, approved, replacements, args.mode)
        if args.quiet:
            findings = [f for f in findings if f["severity"] != "note"]
        report[path] = findings
        total += sum(1 for f in findings if f["severity"] != "note")

    if args.as_json:
        print(json.dumps(report, indent=2))
        return 1 if total else 0

    for path, findings in report.items():
        print(f"\n=== {path} — {len(findings)} findings")
        for f in findings:
            print(f"  L{f['line']:>4}  [{f['severity']:<7}] rule {f['rule']:<8} {f['message']}")
            if f["excerpt"]:
                print(f"         ↳ {f['excerpt']}")
    print(f"\n{total} findings above 'note' level.")
    return 1 if total else 0


if __name__ == "__main__":
    sys.exit(main())
