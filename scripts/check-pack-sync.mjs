#!/usr/bin/env node
// Verify plugins/ matches skills/ without running build-packs.sh.
//
//   node scripts/check-pack-sync.mjs
//
// build-packs.sh needs bash 4+ (declare -A). macOS ships bash 3.2, so on a stock
// Mac the build script cannot run at all and `plugins/` cannot be regenerated
// locally. This checker answers the question the build script would ("is the
// generated tree in sync?") using only node, so a contributor can verify a PR
// without installing a newer bash.
//
// Exits non-zero on: duplicate skill basenames, a packed skill with no source,
// a packed skill missing from plugins/, content drift, or an extra directory in
// plugins/ that no pack lists.

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(root);

const cfg = JSON.parse(readFileSync('packs.config.json', 'utf8'));

// Resolve skill name -> source dir, keyed by basename exactly as build-packs.sh does.
const srcOf = new Map();
const dupes = [];
(function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const p = join(dir, e.name);
    if (existsSync(join(p, 'SKILL.md'))) {
      if (srcOf.has(e.name)) dupes.push(`${e.name}: ${srcOf.get(e.name)} vs ${p}`);
      srcOf.set(e.name, p);
    }
    walk(p);
  }
})('skills');

const problems = [];
if (dupes.length) problems.push(...dupes.map(d => `DUPLICATE BASENAME  ${d}`));

for (const pack of cfg.packs) {
  const pd = join('plugins', pack.name, 'skills');
  const packed = new Set(pack.skills);
  for (const s of packed) {
    const src = srcOf.get(s);
    if (!src) { problems.push(`NO SOURCE           ${pack.name}/${s}`); continue; }
    const dst = join(pd, s);
    if (!existsSync(dst)) { problems.push(`NOT IN PLUGINS      ${pack.name}/${s}`); continue; }
    try {
      execFileSync('diff', ['-rq', src, dst], { stdio: 'pipe' });
    } catch (e) {
      const first = String(e.stdout || '').trim().split('\n')[0] || 'content differs';
      problems.push(`DRIFT               ${pack.name}/${s}: ${first}`);
    }
  }
  if (existsSync(pd)) {
    for (const d of readdirSync(pd)) {
      if (!packed.has(d)) problems.push(`EXTRA IN PLUGINS    ${pack.name}/${d}`);
    }
  }
}

console.log(`Resolved ${srcOf.size} skills across ${cfg.packs.length} packs.`);
if (problems.length) {
  console.error(`\n${problems.length} problem(s):`);
  for (const p of problems) console.error('  ' + p);
  console.error('\nRun ./build-packs.sh (needs bash 4+) to regenerate plugins/.');
  process.exit(1);
}
console.log('✓ plugins/ is in sync with skills/');
