---
name: defuddle-web-extract
description: >-
  Extracts the clean readable text of a web page or article as markdown with the Defuddle CLI,
  stripping navigation, ads and clutter; preferred over WebFetch for standard pages. Use when the
  user gives an article, blog, docs or report URL and asks to read it, pull or quote the text,
  summarize or analyze it. Not for broad recent-sentiment research across social sources (use
  last30days).
---

# Defuddle

Use Defuddle CLI to extract clean readable content from web pages. Prefer over WebFetch for standard web pages — it removes navigation, ads, and clutter, reducing token usage.

If not installed: `npm install -g defuddle`

## Usage

Always use `--md` for markdown output:

```bash
defuddle parse <url> --md
```

Save to file:

```bash
defuddle parse <url> --md -o content.md
```

Extract specific metadata:

```bash
defuddle parse <url> -p title
defuddle parse <url> -p description
defuddle parse <url> -p domain
```

## Output formats

| Flag | Format |
|------|--------|
| `--md` | Markdown (default choice) |
| `--json` | JSON with both HTML and markdown |
| (none) | HTML |
| `-p <name>` | Specific metadata property |
