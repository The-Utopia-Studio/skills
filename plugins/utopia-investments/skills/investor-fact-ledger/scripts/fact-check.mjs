#!/usr/bin/env node
/**
 * fact-check — keep every investor-facing surface telling the same story.
 *
 *   node fact-check.mjs [path/to/facts.json]            report drift
 *   node fact-check.mjs [path/to/facts.json] --check    same, exit 1 on failure (CI)
 *
 * Paths inside facts.json are resolved relative to the directory that holds it,
 * unless "root" is set (relative to facts.json). Three things are verified:
 *
 *   1. required   every fact appears on each surface that should carry it
 *   2. retired    no superseded value survives anywhere in scanGlobs
 *   3. published  each published copy still matches its source
 *
 * Retired values are the ones that bite: a figure updated on the deck but left
 * on the memo reads as a contradiction to anyone holding both.
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve, relative, isAbsolute } from 'node:path';

const args = process.argv.slice(2);
const CHECK = args.includes('--check');
const ledgerArg = args.find((a) => !a.startsWith('--')) ?? 'facts.json';
const LEDGER = resolve(process.cwd(), ledgerArg);

if (!existsSync(LEDGER)) {
  console.error(`fact-check: no ledger at ${LEDGER}`);
  console.error('Pass the path to facts.json, or run from the directory holding it.');
  process.exit(2);
}

const facts = JSON.parse(readFileSync(LEDGER, 'utf8'));
const ROOT = resolve(dirname(LEDGER), facts.root ?? '.');
const abs = (p) => (isAbsolute(p) ? p : join(ROOT, p));
const read = (p) => (existsSync(abs(p)) ? readFileSync(abs(p), 'utf8') : null);

const tty = process.stdout.isTTY;
const c = {
  r: (s) => (tty ? `\x1b[31m${s}\x1b[0m` : s),
  g: (s) => (tty ? `\x1b[32m${s}\x1b[0m` : s),
  y: (s) => (tty ? `\x1b[33m${s}\x1b[0m` : s),
  dim: (s) => (tty ? `\x1b[2m${s}\x1b[0m` : s),
  b: (s) => (tty ? `\x1b[1m${s}\x1b[0m` : s),
};

/** Expand the two glob shapes worth supporting: `dir/*.ext` and `dir/<star>/name.ext`. */
function expand(pattern) {
  const star = pattern.indexOf('*');
  if (star === -1) return existsSync(abs(pattern)) ? [pattern] : [];
  const head = pattern.slice(0, star).replace(/\/$/, '');
  const tail = pattern.slice(star + 1);
  const base = abs(head || '.');
  if (!existsSync(base)) return [];
  const out = [];
  for (const entry of readdirSync(base)) {
    const candidate = join(base, entry);
    if (tail.startsWith('/')) {
      if (statSync(candidate).isDirectory()) {
        const nested = join(candidate, tail.slice(1));
        if (existsSync(nested)) out.push(relative(ROOT, nested));
      }
    } else if (statSync(candidate).isFile() && entry.endsWith(tail)) {
      out.push(relative(ROOT, candidate));
    }
  }
  return out;
}

// A fact's value is one string, or the list of forms it may legitimately take:
// a memo table prints "470.5" where a slide prints "$470.5M".
const forms = (f) => (Array.isArray(f.value) ? f.value : [f.value]);

const problems = [];

// ── 1. required facts, per surface ────────────────────────────────────────
console.log(c.b('\n  Required facts'));
const surfaceText = {};
for (const [key, path] of Object.entries(facts.surfaces ?? {})) {
  const body = read(path);
  if (body === null) {
    problems.push(`surface missing: ${path}`);
    console.log(`    ${c.r('FAIL')}  ${key} ${c.dim(`(${path} not found)`)}`);
    continue;
  }
  surfaceText[key] = body;
}

for (const [key, body] of Object.entries(surfaceText)) {
  const missing = (facts.facts ?? [])
    .filter((f) => (f.on || []).includes(key))
    .filter((f) => !forms(f).some((v) => body.includes(v)));
  if (missing.length) {
    problems.push(`${key}: missing ${missing.map((m) => forms(m)[0]).join(', ')}`);
    console.log(`    ${c.r('FAIL')}  ${key}`);
    for (const m of missing) {
      console.log(`            ${c.r('missing')} ${c.b(forms(m)[0])}  ${c.dim(m.note || '')}`);
    }
  } else {
    console.log(`    ${c.g('pass')}  ${key}`);
  }
}

const declared = new Set(Object.keys(facts.surfaces ?? {}));
for (const f of facts.facts ?? []) {
  for (const s of f.on || []) {
    if (!declared.has(s)) problems.push(`fact "${f.id}" targets unknown surface "${s}"`);
  }
}

// ── 2. retired values, anywhere ───────────────────────────────────────────
console.log(c.b('\n  Retired values'));
const scanned = new Set([
  ...Object.values(facts.surfaces ?? {}),
  ...(facts.scanGlobs ?? []).flatMap(expand),
]);

let retiredHits = 0;
for (const item of facts.retired ?? []) {
  const hits = [];
  for (const path of scanned) {
    const body = read(path);
    if (!body || !body.includes(item.value)) continue;
    // Some retired values legitimately survive inside an explicit negation:
    // "previously valued at $20M". `unless` is the phrase that precedes the
    // value; only occurrences in that context are excused, never all of them.
    if (item.unless) {
      const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const window = item.window ?? 40;
      const excused = new RegExp(`${esc(item.unless)}[\\s\\S]{0,${window}}?${esc(item.value)}`, 'g');
      if (!body.replace(excused, '').includes(item.value)) continue;
    }
    hits.push(path);
  }
  if (hits.length) {
    retiredHits += hits.length;
    problems.push(`retired "${item.value}" still in ${hits.length} file(s)`);
    console.log(`    ${c.r('FAIL')}  ${c.b(item.value)} ${c.dim('->')} ${item.now ?? '(no replacement noted)'}`);
    if (item.why) console.log(`            ${c.dim(item.why)}`);
    for (const h of hits.slice(0, 6)) console.log(`            ${c.y(h)}`);
    if (hits.length > 6) console.log(`            ${c.dim(`+${hits.length - 6} more`)}`);
  }
}
if (!retiredHits) {
  console.log(`    ${c.g('pass')}  ${(facts.retired ?? []).length} retired values, none present`);
}

// ── 3. published copies match source ──────────────────────────────────────
if (facts.published && Object.keys(facts.published).length) {
  console.log(c.b('\n  Published copies'));
  for (const [src, dst] of Object.entries(facts.published)) {
    const a = read(src);
    const b = read(dst);
    if (a === null || b === null) {
      problems.push(`publish pair missing: ${src} / ${dst}`);
      console.log(`    ${c.r('FAIL')}  ${dst} ${c.dim('(file not found)')}`);
    } else if (a !== b) {
      problems.push(`${dst} is stale — re-run your publish step`);
      console.log(`    ${c.r('FAIL')}  ${dst} ${c.dim('differs from')} ${src}`);
    } else {
      console.log(`    ${c.g('pass')}  ${dst}`);
    }
  }
}

// ── verdict ───────────────────────────────────────────────────────────────
if (problems.length) {
  console.log(c.r(`\n  ${problems.length} problem${problems.length > 1 ? 's' : ''}.`));
  console.log(c.dim('  Update facts.json first if a number genuinely changed,'));
  console.log(c.dim('  then bring the surfaces to match and re-run.\n'));
  process.exit(CHECK ? 1 : 0);
}
console.log(c.g('\n  Every surface is in sync.\n'));
