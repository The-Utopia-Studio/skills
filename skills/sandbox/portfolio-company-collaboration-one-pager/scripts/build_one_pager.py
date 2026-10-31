#!/usr/bin/env python3
"""Render a branded collaboration one-pager (A4, single page) from two JSON files.

Usage:
    python3 build_one_pager.py brand.json content.json -o Company_x_Partner_One_Pager.pdf --png preview.png

brand.json   the company's own brand: colours, fonts, logo (see SKILL.md)
content.json the one-pager content for one target partner (see SKILL.md)

Renders with headless Chromium (Python Playwright). Exits with code 2 if the
content does not fit on one A4 page and prints each section's height so you know
what to cut. Fix overflow by cutting words, never by shrinking fonts.
"""
import argparse
import base64
import colorsys
import html
import json
import mimetypes
import sys
from pathlib import Path

A4_W_PX, A4_H_PX = 794, 1123


# ---------- helpers ----------
def esc(s):
    return html.escape(str(s or ""), quote=True)


def hex_rgb(h):
    h = h.lstrip("#")
    if len(h) == 3:
        h = "".join(ch * 2 for ch in h)
    return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))


def rgb_hex(rgb):
    return "#" + "".join(f"{round(max(0, min(1, v)) * 255):02X}" for v in rgb)


def mix(a, b, t):
    """t=0 -> a, t=1 -> b"""
    ra, rb = hex_rgb(a), hex_rgb(b)
    return rgb_hex(tuple(x + (y - x) * t for x, y in zip(ra, rb)))


def luminance(h):
    def ch(c):
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = (ch(c) for c in hex_rgb(h))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(a, b):
    la, lb = sorted((luminance(a), luminance(b)), reverse=True)
    return (la + 0.05) / (lb + 0.05)


def darken_until(color, bg, target):
    """Darken colour (keeping hue) until it reaches the contrast target against bg."""
    r, g, b = hex_rgb(color)
    h, l, s = colorsys.rgb_to_hls(r, g, b)
    while contrast(rgb_hex(colorsys.hls_to_rgb(h, l, s)), bg) < target and l > 0.05:
        l -= 0.02
    return rgb_hex(colorsys.hls_to_rgb(h, l, s))


def data_uri(path, base):
    p = Path(path)
    if not p.is_absolute():
        p = (base / p).resolve()
    if not p.exists():
        print(f"WARNING: file not found: {p}", file=sys.stderr)
        return None
    mime = mimetypes.guess_type(p.name)[0] or "application/octet-stream"
    if p.suffix.lower() == ".svg":
        mime = "image/svg+xml"
    return f"data:{mime};base64,{base64.b64encode(p.read_bytes()).decode()}"


# ---------- brand ----------
def resolve_brand(b, base):
    col = b.get("colors", {})
    dark = col.get("dark", "#1F2933")
    accent = col.get("accent", "#2F6FED")
    text = col.get("text", dark)
    light = col.get("light", mix(dark, "#FFFFFF", 0.93))
    bg = "#FFFFFF"

    if contrast(text, bg) < 7:
        print("WARNING: body text colour is low-contrast on white; using a darker shade.", file=sys.stderr)
        text = darken_until(text, bg, 7)
    accent_text = accent if contrast(accent, bg) >= 4.5 else darken_until(accent, bg, 4.5)
    # Header: dark field by default; text on it must read.
    header_style = b.get("header_style", "dark")
    if header_style == "accent":
        hdr_bg = accent
    elif header_style == "light":
        hdr_bg = light
    else:
        hdr_bg = dark
    hdr_fg = "#FFFFFF" if contrast("#FFFFFF", hdr_bg) >= contrast(text, hdr_bg) else text
    hdr_accent = accent if contrast(accent, hdr_bg) >= 3 else hdr_fg
    hdr_muted = mix(hdr_fg, hdr_bg, 0.25)

    # Fonts
    f = b.get("fonts", {})
    family = f.get("family", "")
    faces = []
    weights = {"regular": 400, "medium": 500, "bold": 700}
    for key, w in weights.items():
        path = (f.get("files") or {}).get(key)
        if path:
            uri = data_uri(path, base)
            if uri:
                fmt = {"ttf": "truetype", "otf": "opentype", "woff": "woff", "woff2": "woff2"}.get(
                    Path(path).suffix.lower().lstrip("."), "truetype")
                faces.append(f"@font-face{{font-family:'BrandFont';font-weight:{w};"
                             f"src:url({uri}) format('{fmt}');}}")
    stack = ["'BrandFont'"] if faces else []
    if family:
        stack.append(f"'{family}'")
    stack += ["'Helvetica Neue'", "Arial", "sans-serif"]
    if not faces:
        print(f"NOTE: no font files supplied; using {family or 'Helvetica/Arial'} if installed, "
              "else Arial. Supply font files in brand.json for an exact match.", file=sys.stderr)

    radius = int(b.get("corner_radius", 0))
    logo = data_uri(b["logo_on_dark"] if header_style != "light" and b.get("logo_on_dark") else
                    b.get("logo", ""), base) if (b.get("logo") or b.get("logo_on_dark")) else None
    return dict(dark=dark, accent=accent, accent_text=accent_text, text=text, light=light,
                tint=mix(accent, "#FFFFFF", 0.82), hair=mix(text, "#FFFFFF", 0.86),
                muted=mix(text, "#FFFFFF", 0.42), hdr_bg=hdr_bg, hdr_fg=hdr_fg,
                hdr_accent=hdr_accent, hdr_muted=hdr_muted, faces="\n".join(faces),
                stack=", ".join(stack), radius=radius, logo=logo,
                headline_case=b.get("headline_case", "uppercase"),
                name=b.get("company_name", "Our company"),
                short=b.get("short_name") or b.get("company_name", "We"),
                tagline=b.get("tagline", ""),
                backed_by=b.get("backed_by_line", ""))


# ---------- page ----------
def section_head(num, title):
    return f'<div class="sh"><span class="num">{esc(num)}</span><span class="st">{esc(title)}</span></div>'


def build_html(B, c):
    p = c["partner"]
    partner = p.get("short_name") or p["name"]
    me = B["short"]

    logo_html = f'<img class="clogo" src="{B["logo"]}" alt="{esc(B["name"])}">' if B["logo"] else \
        f'<div class="cname">{esc(B["name"])}</div>'
    header = f"""
<header class="hdr">
  <div class="hdr-top">{logo_html}<div class="meta">{esc(c.get('location', ''))}{' · ' if c.get('location') and c.get('date') else ''}{esc(c.get('date', ''))}</div></div>
  <div class="eyebrow">{esc(c.get('doc_label', 'Collaboration one-pager'))}</div>
  <h1>{esc(me)} <span class="x">×</span> {esc(partner)}</h1>
  <div class="sub">{esc(c.get('subtitle', ''))}</div>
</header>"""

    r = c["rationale"]
    prios = "".join(f'<li><b>{esc(x["title"])}.</b> {esc(x["detail"])}</li>' for x in r["their_priorities"])
    rationale = f"""
<section>
  {section_head('01', 'Strategic rationale')}
  <div class="cols2">
    <div><div class="lbl">Why we are doing this</div><p class="lead">{esc(r['why'])}</p></div>
    <div class="prio"><div class="lbl">Our read of {esc(partner)}'s priorities</div><ul class="tight">{prios}</ul></div>
  </div>
</section>"""

    cards = ""
    for letter, tp in zip("ABC", c["touchpoints"][:3]):
        items = "".join(
            f'<li><b>{esc(i["title"])}</b>'
            + (f' <span class="what">{esc(i["label"])}</span>' if i.get("label") else "")
            + ('<br>' if i.get("label") else ". ")
            + f'{esc(i["text"])}'
            + (f' <span class="impact">{esc(i["tag"])}</span>' if i.get("tag") else "")
            + "</li>"
            for i in tp["items"]
        )
        cards += (f'<div class="card"><div class="cn">{letter}</div><div class="ct">{esc(tp["title"])}</div>'
                  f'<p class="cl">{esc(tp.get("intro", ""))}</p><ul>{items}</ul></div>')
    touch = f"""
<section>
  {section_head('02', '3 key collaboration touch points')}
  <div class="cols3">{cards}</div>
</section>"""

    s = c["success"]
    def col(items):
        return "".join(f'<li><b>{esc(i["commitment"])}.</b> {esc(i["detail"])}</li>' for i in items)
    success = f"""
<section>
  {section_head('03', 'What success looks like')}
  <div class="cols2">
    <div class="sbox"><div class="sl">{esc(me)}'s investment</div><ul>{col(s['ours'])}</ul></div>
    <div class="sbox alt"><div class="sl">{esc(partner)}'s investment</div><ul>{col(s['theirs'])}</ul></div>
  </div>
  {f'<p class="outcome">{esc(s["outcome"])}</p>' if s.get('outcome') else ''}
</section>"""

    steps = "".join(
        f'<div class="step"><div class="sn">{i + 1:02d}</div><div class="stt">{esc(x["step"])}</div>'
        f'<div class="std">{esc(x.get("detail", ""))}</div>'
        + (f'<div class="when">{esc(x["when"])}</div>' if x.get("when") else "") + "</div>"
        for i, x in enumerate(c["next_steps"]))
    nxt = f'<section>{section_head("04", "Next steps")}<div class="steps">{steps}</div></section>'

    ct = c.get("contact", {})
    line1 = " · ".join(v for v in (ct.get("name"), ct.get("role")) if v)
    line2 = " · ".join(v for v in (ct.get("email"), ct.get("phone"), ct.get("web")) if v)
    left = f'<div class="fname">{esc(B["name"])}</div>' + (f'<div>{esc(B["tagline"])}</div>' if B["tagline"] else "")
    backed = f'<div class="backed">{esc(B["backed_by"])}</div>' if B["backed_by"] else ""
    footer = f"""
<footer class="ftr">
  <div class="fl">{left}</div>
  <div class="fc">{esc(line1)}<br>{esc(line2)}</div>
  <div class="conf">{backed}{esc(c.get('confidentiality', 'Confidential · prepared for ' + partner))}</div>
</footer>"""

    R = B["radius"]
    css = f"""
{B['faces']}
@page {{ size: A4; margin: 0; }}
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
html, body {{ width: {A4_W_PX}px; background: #fff; }}
body {{ font-family: {B['stack']}; font-weight: 400; color: {B['text']}; font-size: 8.6pt; line-height: 1.38;
  -webkit-print-color-adjust: exact; print-color-adjust: exact; }}
#page {{ width: {A4_W_PX}px; min-height: {A4_H_PX}px; display: flex; flex-direction: column; }}
b {{ font-weight: 600; }}
.hdr {{ background: {B['hdr_bg']}; color: {B['hdr_fg']}; padding: 18px 36px 18px; }}
.hdr-top {{ display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }}
.clogo {{ max-height: 26px; max-width: 170px; object-fit: contain; display: block; }}
.cname {{ font-weight: 700; font-size: 11pt; letter-spacing: .02em; }}
.meta {{ font-size: 7pt; letter-spacing: .12em; text-transform: uppercase; color: {B['hdr_muted']}; font-weight: 500; }}
.eyebrow {{ font-weight: 600; font-size: 7pt; letter-spacing: .16em; text-transform: uppercase; color: {B['hdr_accent']}; margin-bottom: 6px; }}
h1 {{ font-weight: 700; font-size: 24pt; line-height: 1.02; letter-spacing: .01em; text-transform: {B['headline_case']}; }}
h1 .x {{ color: {B['hdr_accent']}; font-weight: 400; padding: 0 2px; }}
.sub {{ margin-top: 8px; font-size: 9.2pt; color: {B['hdr_muted']}; max-width: 560px; }}
main {{ padding: 14px 36px 6px; flex: 1; display: flex; flex-direction: column; gap: 9px; }}
.sh {{ display: flex; align-items: baseline; gap: 8px; border-bottom: 1.5px solid {B['accent']}; padding-bottom: 3px; margin-bottom: 7px; }}
.num {{ color: {B['accent_text']}; font-weight: 700; font-size: 10pt; }}
.st {{ font-weight: 700; font-size: 10pt; letter-spacing: .04em; text-transform: uppercase; }}
.lbl {{ font-weight: 600; font-size: 6.8pt; letter-spacing: .14em; text-transform: uppercase; color: {B['muted']}; margin-bottom: 4px; }}
.cols2 {{ display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }}
.cols3 {{ display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }}
.lead {{ font-size: 8.9pt; line-height: 1.4; }}
.prio {{ background: {B['light']}; padding: 8px 10px; border-radius: {R}px; }}
ul {{ list-style: none; }}
li {{ position: relative; padding-left: 10px; margin-bottom: 4px; }}
li::before {{ content: ''; position: absolute; left: 0; top: .55em; width: 4px; height: 4px; background: {B['accent']}; border-radius: {min(R, 2)}px; }}
ul.tight li {{ margin-bottom: 3px; }}
.card {{ border: 1px solid {B['hair']}; border-top: 3px solid {B['dark']}; padding: 9px 10px 6px; border-radius: {R}px; }}
.cn {{ color: {B['accent_text']}; font-weight: 700; font-size: 15pt; line-height: 1; }}
.ct {{ font-weight: 700; font-size: 8.4pt; text-transform: uppercase; letter-spacing: .03em; margin: 4px 0; }}
.cl {{ font-size: 8pt; color: {B['muted']}; margin-bottom: 5px; }}
.card li {{ font-size: 8pt; }}
.impact {{ display: inline-block; margin-top: 1px; background: {B['tint']}; color: {B['accent_text']}; font-weight: 600; font-size: 7.4pt; padding: 0 4px; border-radius: {min(R, 3)}px; }}
.what {{ color: {B['muted']}; font-size: 7.4pt; }}
.sbox {{ border-left: 3px solid {B['accent']}; background: {B['light']}; padding: 7px 12px 4px; border-radius: {R}px; }}
.sbox.alt {{ border-left-color: {B['dark']}; background: #fff; border-top: 1px solid {B['hair']}; border-right: 1px solid {B['hair']}; border-bottom: 1px solid {B['hair']}; }}
.sl {{ font-weight: 700; font-size: 8.2pt; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 5px; }}
.outcome {{ margin-top: 6px; font-size: 8.4pt; font-weight: 600; }}
.steps {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(0, 1fr)); gap: 10px; }}
.step {{ border-top: 1px solid {B['hair']}; padding-top: 6px; }}
.sn {{ color: {B['accent_text']}; font-weight: 700; font-size: 12pt; line-height: 1; }}
.stt {{ font-weight: 700; font-size: 8.4pt; text-transform: uppercase; letter-spacing: .03em; margin: 4px 0 2px; }}
.std {{ font-size: 8pt; }}
.when {{ font-weight: 600; font-size: 6.8pt; letter-spacing: .12em; text-transform: uppercase; color: {B['accent_text']}; margin-top: 3px; }}
.ftr {{ margin: 0 36px; padding: 8px 0 16px; border-top: 1px solid {B['hair']}; display: flex; justify-content: space-between; align-items: flex-end; gap: 12px; font-size: 7pt; color: {B['muted']}; }}
.fl, .conf {{ flex: 1; }}
.fname {{ font-weight: 700; color: {B['text']}; font-size: 7.6pt; }}
.fc {{ text-align: center; flex: 1.4; }}
.conf {{ text-align: right; letter-spacing: .08em; text-transform: uppercase; font-weight: 500; font-size: 6.4pt; }}
.backed {{ text-transform: none; letter-spacing: 0; font-size: 7pt; color: {B['text']}; margin-bottom: 2px; }}
"""
    return (f"<!doctype html><html><head><meta charset='utf-8'><title>{esc(me)} x {esc(partner)}</title>"
            f"<style>{css}</style></head><body><div id='page'>{header}<main>"
            f"{rationale}{touch}{success}{nxt}</main>{footer}</div></body></html>")


def lint(c):
    blob = json.dumps(c, ensure_ascii=False)
    if "—" in blob or "–" in blob:
        print("WARNING: content contains long dashes (— or –). Rewrite with a full stop, comma or colon.",
              file=sys.stderr)
    def strings(o):
        if isinstance(o, str):
            yield o
        elif isinstance(o, dict):
            for v in o.values():
                yield from strings(v)
        elif isinstance(o, list):
            for v in o:
                yield from strings(v)
    if any("[" in s or "]" in s for s in strings(c)):
        print("WARNING: content contains [brackets]. Check for unfilled placeholders before sending.",
              file=sys.stderr)
    if len(c.get("touchpoints", [])) != 3:
        print("WARNING: expected exactly 3 touch points.", file=sys.stderr)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("brand")
    ap.add_argument("content")
    ap.add_argument("-o", "--out", required=True)
    ap.add_argument("--html")
    ap.add_argument("--png")
    a = ap.parse_args()

    brand_path = Path(a.brand).resolve()
    B = resolve_brand(json.loads(brand_path.read_text()), brand_path.parent)
    c = json.loads(Path(a.content).read_text())
    lint(c)
    doc = build_html(B, c)
    if a.html:
        Path(a.html).write_text(doc)

    from playwright.sync_api import sync_playwright
    with sync_playwright() as pw:
        b = pw.chromium.launch()
        pg = b.new_page(viewport={"width": A4_W_PX, "height": A4_H_PX})
        pg.set_content(doc, wait_until="load")
        pg.evaluate("document.fonts.ready")
        h = pg.evaluate("document.getElementById('page').scrollHeight")
        sizes = pg.evaluate("Array.from(document.querySelectorAll('main > section')).map(s => "
                            "[s.querySelector('.st').textContent, Math.round(s.getBoundingClientRect().height)])")
        if h > A4_H_PX + 1:
            if a.png:
                pg.screenshot(path=a.png, full_page=True)
                print(f"Full-length preview: {a.png}", file=sys.stderr)
            b.close()
            print(f"OVERFLOW: {h}px tall vs {A4_H_PX}px page ({h - A4_H_PX}px over).", file=sys.stderr)
            for t, sh in sorted(sizes, key=lambda x: -x[1]):
                print(f"  {sh:4d}px  {t}", file=sys.stderr)
            print("Cut words, starting with the tallest section. Do not shrink fonts.", file=sys.stderr)
            sys.exit(2)
        slack = int(pg.evaluate("document.querySelector('main').getBoundingClientRect().bottom - "
                                "document.querySelector('main > section:last-child').getBoundingClientRect().bottom"))
        if a.png:
            pg.screenshot(path=a.png)
        pg.pdf(path=a.out, format="A4", print_background=True,
               margin={"top": "0", "right": "0", "bottom": "0", "left": "0"})
        b.close()
    print(f"OK: {a.out} (one page, {slack}px spare)")
    if slack > 160:
        print("NOTE: plenty of space left. Fine if the content is complete; never pad with filler.", file=sys.stderr)


if __name__ == "__main__":
    main()
