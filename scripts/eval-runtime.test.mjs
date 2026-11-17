import test from 'node:test';
import assert from 'node:assert/strict';
import { chmodSync, cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { activation, environmentHash, judgeVerdicts } from './eval-runtime.mjs';
import { nvidiaCommands, NVIDIA_REVISION } from './eval-inspect.mjs';

const verdict = (id, value = 'pass') => ({ id, verdict: value, evidence: 'observed result' });
test('judge requires exactly one known verdict per assertion', () => {
  const c = { assertions: ['a', 'b'] };
  assert.equal(judgeVerdicts(c, JSON.stringify({ assertions: [verdict(1), verdict(2)] })).score, 1);
  for (const values of [[verdict(1)], [verdict(1), verdict(1)], [verdict(1), verdict(2, 'unknown')], [{ id: 1, verdict: 'pass' }, verdict(2)]]) {
    assert.throws(() => judgeVerdicts(c, JSON.stringify({ assertions: values })));
  }
});
test('activation requires a successful matching Skill tool result', () => {
  const call = { type: 'assistant', message: { content: [{ type: 'tool_use', id: '1', name: 'Skill', input: { skill: 'pack:example' } }] } };
  const result = { type: 'user', message: { content: [{ type: 'tool_result', tool_use_id: '1' }] } };
  assert.equal(activation([call], 'example'), 'unknown');
  assert.equal(activation([call, result], 'example'), 'invoked');
  assert.equal(activation([{ type: 'result', is_error: false, result: 'used example' }], 'example'), 'not_invoked');
});
test('NVIDIA commands pin source and only include embeddings when requested', () => {
  const basic = nvidiaCommands('/target', '/catalog', '/output', false);
  assert.equal(basic.length, 2);
  assert(basic.every(c => c.some(a => a.includes(NVIDIA_REVISION))));
  assert(basic[0].includes('harness-check'));
  const overlap = nvidiaCommands('/target', '/catalog', '/output', true);
  assert.equal(overlap.length, 3);
  assert(overlap[2].includes('similarity-check'));
  assert(overlap[2].some(a => a.includes('[tier2]')));
});

function fixture(mode = 'success') {
  const root = mkdtempSync(join(tmpdir(), 'eval-runner-test-'));
  mkdirSync(join(root, 'scripts')); mkdirSync(join(root, 'bin'));
  for (const name of ['skill_gate.py', 'skill_evidence.py', 'skill_checks.py', 'eval-skill.mjs', 'eval-runtime.mjs', 'trigger-test.mjs']) cpSync(resolve('scripts', name), join(root, 'scripts', name));
  const staticPath = 'skills/founder-productivity/skill-eval/scripts';
  mkdirSync(join(root, staticPath), { recursive: true });
  cpSync(resolve(staticPath, 'static_check.py'), join(root, staticPath, 'static_check.py'));
  const skill = join(root, 'skills/example'); mkdirSync(join(skill, 'evals'), { recursive: true });
  writeFileSync(join(skill, 'SKILL.md'), '---\nname: example\ndescription: Use when example tasks need evaluation.\n---\n# Example\n');
  writeFileSync(join(root, 'packs.config.json'), JSON.stringify({ packs: [{ name: 'test-pack', skills: ['example'] }] }));
  cpSync(resolve('scripts/skill-gate.config.json'), join(root, 'scripts/skill-gate.config.json'));
  writeFileSync(join(root, 'scripts/trigger-prompts.tsv'), 'example\ttest\tpositive central\n');
  writeFileSync(join(skill, 'evals/triggers.tsv'), Array.from({ length: 16 }, (_, i) => `${i < 8 ? 'example' : 'none'}\ttest\t${i < 8 ? 'positive' : 'negative'} ${i}\n`).join(''));
  writeFileSync(join(skill, 'evals/evals.json'), JSON.stringify({ skill_name: 'example', risk: 'high', evals: Array.from({ length: 3 }, (_, i) => ({ prompt: `task ${i}`, expected_output: 'answer', assertions: ['a', 'b'] })) }));
  const executable = join(root, 'bin/claude');
  writeFileSync(executable, `#!/usr/bin/env node
const fs = require('node:fs');
if (process.argv.includes('--version')) { console.log('fixture-cli'); process.exit(0); }
let prompt = ''; process.stdin.on('data', c => prompt += c); process.stdin.on('end', () => {
 const args = process.argv.slice(2); const mode = ${JSON.stringify(mode)};
 fs.appendFileSync(${JSON.stringify(join(root, 'calls.jsonl'))}, JSON.stringify({prompt, args, cwd:process.cwd(), config:process.env.CLAUDE_CONFIG_DIR})+'\\n');
 const judge = prompt.startsWith('Grade the outcome');
 const treatment = args.includes('--plugin-dir');
 const emit = x => console.log(JSON.stringify(x));
 if (!judge && treatment && !prompt.startsWith('negative') && mode !== 'activation-missing') {
  emit({type:'assistant',message:{model:mode === 'wrong-model' ? 'wrong' : 'fixture-model',content:[{type:'tool_use',id:'1',name:'Skill',input:{skill:'test-pack:example'}}]}});
  emit({type:'user',message:{content:[{type:'tool_result',tool_use_id:'1',content:'loaded'}]}});
 }
 const text = judge ? JSON.stringify({assertions:[{id:1,verdict:'pass',evidence:'a'},{id:mode === 'bad-judge' ? 1 : 2,verdict:prompt.includes('baseline answer') ? 'fail' : 'pass',evidence:'b'}]}) : treatment ? 'skilled answer' : 'baseline answer';
 emit({type:'assistant',message:{model:'fixture-model',content:[{type:'text',text}]}});
 emit({type:'result',is_error:false,result:text});
});
`);
  chmodSync(executable, 0o755);
  return { root, skill, run(extra) { return spawnSync(process.execPath, [join(root, 'scripts/eval-skill.mjs'), 'example', '--model', 'fixture-model', '-j', '2', ...extra], { cwd: root, encoding: 'utf8', timeout: 30000, env: { ...process.env, PATH: `${join(root, 'bin')}:${process.env.PATH}` } }); } };
}
test('output runner produces evidence CI accepts and keeps identical paired tasks', () => {
  const f = fixture();
  try {
    const result = f.run(['--output-quality']); assert.equal(result.status, 0, result.stderr + result.stdout);
    const report = JSON.parse(readFileSync(join(f.skill, 'evals/output-report.json')));
    assert.equal(report.status, 'pass'); assert.equal(report.evidence.length, 18); assert.equal(report.results.stable_cases, 1);
    const calls = readFileSync(join(f.root, 'calls.jsonl'), 'utf8').trim().split('\n').map(JSON.parse);
    const taskCalls = calls.filter(c => !c.prompt.startsWith('Grade the outcome'));
    assert.equal(taskCalls.length, 18); assert(taskCalls.every(c => /^task [0-2]$/.test(c.prompt)));
    assert(taskCalls.every(c => !existsSync(c.config)));
    assert(taskCalls.every(c => c.args.includes('--setting-sources')));
    assert(taskCalls.every(c => !c.cwd.startsWith(f.root)));
    const verified = spawnSync('python3', ['-c', 'import sys; sys.path.insert(0, "scripts"); import skill_gate; problem = skill_gate.report_problem(sys.argv[1], "output-report.json"); print(problem); sys.exit(bool(problem))', f.skill], { cwd: f.root, encoding: 'utf8' });
    assert.equal(verified.status, 0, verified.stdout + verified.stderr);
    assert.equal(taskCalls.filter(c => c.args.includes('--plugin-dir')).length, 9);
  } finally { rmSync(f.root, { recursive: true, force: true }); }
});
test('routing keeps all positive/negative runs and existing routing thresholds', () => {
  const f = fixture();
  try {
    const result = f.run([]); assert.equal(result.status, 0, result.stderr + result.stdout);
    const report = JSON.parse(readFileSync(join(f.skill, 'evals/routing-report.json')));
    assert.equal(report.results.recall, 1); assert.equal(report.evidence.length, 16);
    assert(report.evidence.every(r => r.runs === 3));
  } finally { rmSync(f.root, { recursive: true, force: true }); }
});
test('bad judge results remain incomplete and cannot pass', () => {
  const f = fixture('bad-judge');
  try {
    const result = f.run(['--output-quality']); assert.equal(result.status, 1);
    const report = JSON.parse(readFileSync(join(f.skill, 'evals/output-report.json')));
    assert.equal(report.status, 'incomplete'); assert.equal(report.pass, false);
  } finally { rmSync(f.root, { recursive: true, force: true }); }
});
