#!/usr/bin/env bash
# Render investor HTML documents to A4 PDFs with headless Chrome.
#
#   ./render-pdf.sh                        # every .html in this directory
#   ./render-pdf.sh deal-sheet memorandum  # named documents, no extension
#
# Output: <name>.pdf beside the source. Backgrounds on, no browser header,
# fonts given time to land.
set -euo pipefail
cd "$(dirname "$0")"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || CHROME="/Applications/Chromium.app/Contents/MacOS/Chromium"
[ -x "$CHROME" ] || CHROME="$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)"

if [ ! -x "${CHROME:-}" ]; then
  echo "Chrome/Chromium not found."
  echo "Open each .html in a browser and use Print > Save as PDF with:"
  echo "  A4 portrait · Margins: None · Background graphics: ON"
  exit 1
fi

docs=("$@")
if [ ${#docs[@]} -eq 0 ]; then
  for f in *.html; do [ -e "$f" ] || continue; docs+=("${f%.html}"); done
fi
[ ${#docs[@]} -gt 0 ] || { echo "No .html documents here."; exit 1; }

for name in "${docs[@]}"; do
  name="${name%.html}"
  [ -f "$name.html" ] || { echo "skip $name.html (not found)"; continue; }
  "$CHROME" --headless --disable-gpu --no-pdf-header-footer \
    --virtual-time-budget=10000 \
    --print-to-pdf="$PWD/$name.pdf" \
    "file://$PWD/$name.html" 2>/dev/null
  printf 'wrote %s.pdf (%s)\n' "$name" "$(du -h "$name.pdf" | cut -f1 | tr -d ' ')"
done
