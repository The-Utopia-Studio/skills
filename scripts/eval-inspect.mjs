#!/usr/bin/env node
// Selective NVIDIA integration; optional dependency, no automatic live agent runs.
import { spawnSync } from 'node:child_process';
import { chmodSync, cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

export const NVIDIA_REVISION = 'd2cb13880d575f2bb1da04577438731af6871fb0';
export function nvidiaCommands(target, catalogRoot, output, overlap) {
  const prefix = ['--python', '3.13', '--from', `skillevaluator${overlap ? '[tier2]' : ''} @ git+https://github.com/NVIDIA/SkillEvaluator.git@${NVIDIA_REVISION}`, 'skillevaluator'];
  return [
    [...prefix, 'harness-check', target, '--harness', 'codex,claude-code', '--json', join(output, 'harness.json')],
    [...prefix, 'quality-check', target, '-r', 'json', '-o', join(output, 'quality')],
    ...(overlap ? [[...prefix, 'similarity-check', catalogRoot, '-r', 'json', '-o', join(output, 'overlap')]] : []),
  ];
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const args = process.argv.slice(2), skill = args[0];
  if (!skill || skill.startsWith('-') || args.slice(1).some(a => !['--nvidia', '--overlap'].includes(a))) throw new Error('usage: npm run eval:inspect -- <skill> [--nvidia] [--overlap]');
  const info = spawnSync('python3', ['-I', join(root, 'scripts/skill_gate.py'), 'inspect', skill], { encoding: 'utf8', cwd: root });
  if (info.status !== 0) { console.error(info.stderr || info.stdout); process.exit(1); }
  const local = JSON.parse(info.stdout);
  console.log(JSON.stringify({ skill: local.skill, issues: local.issues, packed_skills: Object.keys(local.catalog).length }, null, 2));
  if (local.issues.length) process.exit(1);
  if (args.includes('--nvidia') || args.includes('--overlap')) {
    const output = join(root, '.skill-eval-runs', skill, 'nvidia', new Date().toISOString().replaceAll(':', '-'));
    mkdirSync(output, { recursive: true });
    chmodSync(join(root, '.skill-eval-runs'), 0o700);
    const catalog = mkdtempSync(join(tmpdir(), 'skill-overlap-'));
    const checks = [];
    try {
      if (args.includes('--overlap')) {
        for (const [name, path] of Object.entries(local.catalog)) {
          mkdirSync(join(catalog, name));
          cpSync(join(root, path, 'SKILL.md'), join(catalog, name, 'SKILL.md'));
        }
      }
      for (const command of nvidiaCommands(join(root, local.path), catalog, output, args.includes('--overlap'))) {
        const result = spawnSync('uvx', command, { cwd: root, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
        const check = { command, exit_code: result.status, status: result.error ? 'incomplete' : result.status === 0 ? 'completed' : 'failed_or_incomplete' };
        checks.push(check);
        writeFileSync(join(output, `check-${checks.length}.log`), `${result.stdout || ''}\n${result.stderr || result.error?.message || ''}`);
        if (result.error) break;
      }
    } finally { rmSync(catalog, { recursive: true, force: true }); }
    writeFileSync(join(output, 'summary.json'), JSON.stringify({ revision: NVIDIA_REVISION, checks }, null, 2));
    console.log(`NVIDIA evidence: ${output}`);
    if (checks.some(c => c.status !== 'completed')) process.exitCode = 1;
  }
}
