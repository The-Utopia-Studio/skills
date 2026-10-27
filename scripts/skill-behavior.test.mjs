import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const factChecker = resolve('skills/investments/investor-fact-ledger/scripts/fact-check.mjs');
const bidHelper = resolve('skills/investments/auction-first-price-shading/scripts/uniform_bid.py');
function ledgerRun(ledger, files = { 'memo.html': '<p>Raise $6M</p>' }) {
  const dir = mkdtempSync(join(tmpdir(), 'skill-ledger-'));
  try {
    writeFileSync(join(dir, 'facts.json'), JSON.stringify(ledger));
    for (const [name, text] of Object.entries(files)) writeFileSync(join(dir, name), text);
    return spawnSync(process.execPath, [factChecker, join(dir, 'facts.json'), '--check'], { encoding: 'utf8' });
  } finally { rmSync(dir, { recursive: true, force: true }); }
}
const valid = () => ({ surfaces: { memo: 'memo.html' }, facts: [{ id: 'raise', value: ['$6M', '$6.0M'], on: ['memo'] }] });
for (const [name, data] of [
  ['empty ledger', {}],
  ['empty required value', { surfaces:{memo:'memo.html'}, facts:[{id:'raise',value:'',on:['memo']}] }],
  ['fact with no target', { surfaces:{memo:'memo.html'}, facts:[{id:'raise',value:'$6M',on:[]}] }],
]) test(`fact checker rejects ${name}`, () => assert.equal(ledgerRun(data).status, 2));

test('fact checker accepts alternative forms and rejects missing facts', () => {
  assert.equal(ledgerRun(valid(), {'memo.html':'Raise $6.0M'}).status, 0);
  assert.equal(ledgerRun(valid(), {'memo.html':'Raise amount not given'}).status, 1);
});
test('retired phrase exemption does not hide a second bare occurrence', () => {
  const ledger = {...valid(), retired:[{value:'$5M', unless:'previously raised', window:10}]};
  assert.equal(ledgerRun(ledger, {'memo.html':'Raise $6M; previously raised $5M'}).status, 0);
  assert.equal(ledgerRun(ledger, {'memo.html':'Raise $6M; previously raised $5M; current raise $5M'}).status, 1);
});
test('published drift and unknown target surfaces fail', () => {
  assert.equal(ledgerRun({...valid(),published:{'memo.html':'published.html'}}, {'memo.html':'$6M','published.html':'$5M'}).status, 1);
  const ledger=valid();ledger.facts[0].on=['unknown'];assert.equal(ledgerRun(ledger).status,1);
});
test('unsupported recursive globs fail instead of silently passing', () => {
  assert.equal(ledgerRun({...valid(),scanGlobs:['public/**/*.html']}).status, 2);
});
for (const { n, value, reserve, expected } of [
  {n:2,value:100,reserve:0,expected:50},
  {n:5,value:100,reserve:0,expected:80},
  {n:20,value:100,reserve:0,expected:95},
  {n:2,value:100,reserve:80,expected:82},
  {n:1,value:100,reserve:80,expected:80},
  {n:2,value:50,reserve:80,expected:null},
  {n:2,value:0,reserve:0,expected:0},
]) test(`auction benchmark v=${value} N=${n} reserve=${reserve}`, () => {
  const r=spawnSync('python3',[bidHelper,'--value',String(value),'--bidders',String(n),'--reserve',String(reserve)],{encoding:'utf8'});
  assert.equal(r.status,0,r.stderr);assert.equal(JSON.parse(r.stdout).benchmark_bid,expected);
});
test('auction helper rejects invalid estimates instead of clamping', () => {
  for (const [value,n] of [['NaN','2'],['-1','2'],['100','0'],['100','2.5']]) {
    assert.notEqual(spawnSync('python3',[bidHelper,'--value',value,'--bidders',n]).status,0);
  }
});

const marketHelper = resolve('skills/founder-productivity/market-sizing/scripts/market-sizing.py');
function marketRun(args) { return spawnSync('python3', [marketHelper, ...args], { encoding: 'utf8' }); }
test('market sizing computes nested shares and preserves small percentages', () => {
  const standard = marketRun(['--population','1000','--arpu','120','--sam-share','30%','--som-share','10%']);
  assert.equal(standard.status, 0); assert.match(standard.stdout, /\$3,600/);
  const tiny = marketRun(['--tam','1000000','--sam-share','.001','--som-share','.1']);
  assert.equal(tiny.status, 0); assert.match(tiny.stdout, /0\.1%/); assert.match(tiny.stdout, /\$100 \|/);
});
for (const [name, args] of [
  ['negative population', ['--population','-100','--arpu','100','--sam-share','.5','--som-share','.1']],
  ['nonfinite TAM', ['--tam','nan','--sam-share','.5','--som-share','.1']],
  ['nonfinite share', ['--tam','10000','--sam-share','nan','--som-share','.1']],
  ['overflow', ['--population','1e308','--arpu','1e308','--sam-share','.5','--som-share','.1']],
]) test(`market sizing rejects ${name}`, () => assert.notEqual(marketRun(args).status, 0));
