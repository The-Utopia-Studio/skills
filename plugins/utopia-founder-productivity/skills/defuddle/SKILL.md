---
name: defuddle
description: >-
  Fetch and extract the clean readable text of a web page or article as markdown with the Defuddle
  CLI, stripping navigation, ads and clutter. Use whenever the user gives a URL of an article, blog
  post, documentation page or report and asks to read it, pull out or quote the text, summarize it, or
  analyze it; prefer it over WebFetch for standard web pages. Do NOT use for URLs ending in .md
  (already markdown, use WebFetch) or for broad multi-source research on a topic (use last30days).
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
