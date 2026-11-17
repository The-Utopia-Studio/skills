// Isolated Claude execution and retained stream evidence. No model calls at import time.
import { createHash } from 'node:crypto';
import { spawn } from 'node:child_process';
import { chmodSync, copyFileSync, existsSync, mkdtempSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { join } from 'node:path';

export function environmentHash() {
  const values = Object.entries(process.env).filter(([k]) => /^(ANTHROPIC_|CLAUDE_|AWS_|AZURE_|GOOGLE_|VERTEX_)/.test(k) && !/KEY|TOKEN|SECRET|PASSWORD|CREDENTIAL/.test(k)).sort(([a], [b]) => a.localeCompare(b));
  return createHash('sha256').update(JSON.stringify(values)).digest('hex');
}

export function isolatedConfig() {
  const dir = mkdtempSync(join(tmpdir(), 'skill-eval-config-'));
  chmodSync(dir, 0o700);
  // Preserve CLI login without importing personal skills, plugins, hooks or settings.
  const credentials = join(process.env.CLAUDE_CONFIG_DIR || join(homedir(), '.claude'), '.credentials.json');
  if (existsSync(credentials)) {
    copyFileSync(credentials, join(dir, '.credentials.json'));
    chmodSync(join(dir, '.credentials.json'), 0o600);
  }
  return dir;
}

export function runClaude(prompt, { cwd, configDir, model, plugin, judge = false, timeoutMs = 600000 }) {
  return new Promise((resolve) => {
    const args = ['-p', '--output-format', 'stream-json', '--verbose', '--no-session-persistence',
      '--strict-mcp-config', '--setting-sources', '', '--settings', JSON.stringify({ disableAllHooks: true, enabledPlugins: {} }),
      '--model', model, '--effort', 'high', '--tools', judge ? '' : 'Read,Write,Edit,Glob,Grep,Skill',
      ...(!plugin ? ['--disable-slash-commands'] : ['--plugin-dir', plugin]),
      ...(judge ? [] : ['--permission-mode', 'acceptEdits'])];
    const child = spawn('claude', args, { cwd, env: { ...process.env, CLAUDE_CONFIG_DIR: configDir,
      SLASH_COMMAND_TOOL_CHAR_BUDGET: '300000' }, stdio: ['pipe', 'pipe', 'pipe'] });
    let output = '', finished = false;
    const end = (result) => { if (!finished) { finished = true; clearTimeout(timer); child.kill(); resolve(result); } };
    const timer = setTimeout(() => end({ error: 'timeout', trace: [] }), timeoutMs);
    child.stdout.on('data', c => {
      output += c;
      if (output.length > 16 * 1024 * 1024) end({ error: 'trace exceeds 16 MiB', trace: [] });
    });
    child.stderr.resume();
    child.stdin.on('error', () => {});
    child.on('error', e => end({ error: e.message, trace: [] }));
    child.on('close', code => {
      try {
        const trace = output.trim().split('\n').filter(Boolean).map(line => JSON.parse(line));
        const result = trace.findLast(e => e.type === 'result');
        if (code !== 0 || !result || result.is_error) return end({ error: String(result?.result || 'CLI failed or missing terminal result'), trace });
        const models = trace.filter(e => e.type === 'assistant').map(e => e.message?.model).filter(Boolean);
        if (!models.length || models.some(m => m !== model)) return end({ error: 'actual model differs from requested pinned model', trace });
        end({ text: result.result || '', trace, usage: result.usage || null, cost_usd: result.total_cost_usd ?? null });
      } catch { end({ error: 'invalid CLI stream', trace: [] }); }
    });
    child.stdin.end(prompt);
  });
}

export function judgeVerdicts(caseData, text) {
  const parsed = JSON.parse(text);
  const verdicts = parsed.assertions;
  if (!Array.isArray(verdicts) || verdicts.length !== caseData.assertions.length) throw new Error('missing assertion verdicts');
  const ids = new Set();
  for (const v of verdicts) {
    if (!Number.isInteger(v.id) || v.id < 1 || v.id > verdicts.length || ids.has(v.id) ||
      !['pass', 'fail', 'unknown'].includes(v.verdict) || typeof v.evidence !== 'string' || !v.evidence.trim()) throw new Error('invalid or duplicate assertion verdict');
    ids.add(v.id);
  }
  if (verdicts.some(v => v.verdict === 'unknown')) throw new Error('unknown assertion evidence');
  return { verdicts, score: verdicts.filter(v => v.verdict === 'pass').length / verdicts.length };
}

export function activation(trace, skill) {
  const calls = new Set(), successes = new Set();
  let terminal = false;
  for (const event of trace) {
    if (event.type === 'result' && !event.is_error) terminal = true;
    for (const part of event.message?.content || []) {
      if (part.type === 'tool_use' && part.name === 'Skill' && typeof part.input?.skill === 'string' && part.input.skill.split(':').pop() === skill) calls.add(part.id);
      if (part.type === 'tool_result' && !part.is_error) successes.add(part.tool_use_id);
    }
  }
  if ([...calls].some(id => id && successes.has(id))) return 'invoked';
  return terminal && !calls.size ? 'not_invoked' : 'unknown';
}
