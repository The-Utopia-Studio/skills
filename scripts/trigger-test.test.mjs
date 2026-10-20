import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, readFileSync, chmodSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const harness = resolve('scripts/trigger-test.mjs');
function fixture(mode) {
  const dir = mkdtempSync(join(tmpdir(), 'routing-fixture-'));
  const executable = join(dir, 'claude');
  writeFileSync(executable, `#!/usr/bin/env node
process.stdin.resume();
process.stdin.on('end', () => {
 const mode = ${JSON.stringify(mode)};
 const event = mode === 'limit' ? {type:'result',is_error:true,result:'Usage limit reached'} : {type:'assistant',message:{content:[{type:'tool_use',name:'Skill',input:{skill:'utopia-product:example'}}]}};
 console.log(JSON.stringify(event));
});
`);
  chmodSync(executable, 0o755);
  const file = join(dir, 'prompts.tsv');
  const output = join(dir, 'results.json');
  writeFileSync(file, 'example\tbuild\tExample request\nexample\tbuild\tSecond request\n');
  return { dir, file, output, run(extra = []) {
    return spawnSync(process.execPath, [harness, '--file', file, '--output', output, '-j', '1', ...extra], {
      env: { ...process.env, PATH: `${dir}:${process.env.PATH}` }, encoding: 'utf8', timeout: 10000,
    });
  }};
}
test('usage limits checkpoint the error and preserve unattempted cases as pending', () => {
  const f = fixture('limit');
  assert.equal(f.run().status, 1);
  const result = JSON.parse(readFileSync(f.output));
  assert.deepEqual(result.map(x => x.status), ['ERROR', 'PENDING']);
  assert.equal(result[0].hits, 0);
});
test('resume skips scored cases and retries infrastructure failures', () => {
  const f = fixture('success');
  writeFileSync(f.output, JSON.stringify([
    { expected:'example',group:'build',prompt:'Example request',runs:1,hits:1,errors:0,fired:{'utopia-product:example':1} },
    { expected:'example',group:'build',prompt:'Second request',runs:1,hits:0,errors:1,fired:{'error: timeout':1} },
  ]));
  assert.equal(f.run(['--resume', f.output]).status, 0);
  const result = JSON.parse(readFileSync(f.output));
  assert.deepEqual(result.map(x => [x.runs,x.hits,x.errors]), [[1,1,0],[1,1,0]]);
});
test('invalid concurrency fails before running a prompt', () => {
  const f = fixture('success');
  assert.equal(f.run(['--runs', '0']).status, 1);
});
