"""Versioned evaluation plans and evidence validation shared by runner and CI.

NVIDIA SkillEvaluator informed incomplete states and paired-case intervals;
our routing bars and every-trial stability policy remain authoritative.
"""
import hashlib
import json
import math
from pathlib import Path
import random

SCHEMA = 2
ROOT = Path(__file__).resolve().parent.parent


def digest(value):
    return hashlib.sha256(json.dumps(value, sort_keys=True, ensure_ascii=False,
                                     allow_nan=False).encode()).hexdigest()


def integer(value, minimum=0):
    return type(value) is int and value >= minimum


def require(condition, message):
    if not condition:
        raise ValueError(message)


def rows(text):
    result = []
    for line in text.splitlines():
        if not line.strip() or line.startswith('#'):
            continue
        cols = line.split('\t')
        require(len(cols) == 3 and all(c.strip() for c in cols), 'invalid trigger TSV row')
        result.append(dict(expected=cols[0], group=cols[1], prompt=cols[2]))
    return result


def alternatives(expected):
    return [s.split(':')[-1] for s in expected.split('|')]


def routing_plan(skill, full, catalog, packs, central):
    own = rows((full / 'evals/triggers.tsv').read_text()) if (full / 'evals/triggers.tsv').exists() else []
    positives = [r for r in (own or central) if skill in alternatives(r['expected'])]
    negatives = [r for r in own if skill not in alternatives(r['expected'])]
    mine = catalog[skill]['description']
    import re
    words = lambda t: set(re.findall('[a-z]{4,}', t.lower()))
    w = words(mine)
    scores = {}
    for name, item in catalog.items():
        if name == skill:
            continue
        other = words(item['description'])
        scores[name] = len(w & other) / (len(w | other) or 1)
        if name in mine or skill in item['description']:
            scores[name] += 1
    pack = next(p for p in packs if skill in p['skills'])
    for sub in pack.get('submodules', []):
        if skill in sub['skills']:
            for name in sub['skills']:
                if name != skill:
                    scores[name] = scores.get(name, 0) + .5
    near = sorted(scores, key=lambda n: (-scores[n], n))[:8]
    neighbours = [r for r in central if alternatives(r['expected'])[0] in near]
    plan = [{**r, 'group': g} for group, g in [(positives, 'positive'), (negatives, 'negative'), (neighbours, 'neighbour')] for r in group]
    require(bool(positives), 'no positive routing prompts')
    require(len({(r['expected'], r['group'], r['prompt']) for r in plan}) == len(plan), 'duplicate routing prompts')
    return plan, near


def dataset(full, skill):
    ev = json.loads((full / 'evals/evals.json').read_text())
    require(isinstance(ev, dict), 'evals.json must be an object')
    require(ev.get('skill_name') == skill, 'evals.json skill_name mismatch')
    cases = ev.get('evals')
    require(isinstance(cases, list) and len(cases) >= 3, 'at least 3 output cases required')
    for c in cases:
        require(isinstance(c, dict), 'invalid output case')
        for key in ('prompt', 'expected_output'):
            require(isinstance(c.get(key), str) and bool(c[key].strip()), f'missing {key}')
        assertions = c.get('assertions')
        require(isinstance(assertions, list) and len(assertions) > 0 and
                all(isinstance(a, str) and a.strip() for a in assertions) and
                len(set(assertions)) == len(assertions), 'assertions must be nonempty unique strings')
        files = c.get('files', [])
        require(isinstance(files, list), 'files must be a list')
        for f in files:
            require(isinstance(f, str) and not Path(f).is_absolute() and
                    (full / f).resolve().is_relative_to(full.resolve()) and
                    (full / f).is_file(), 'missing or escaping fixture')
    return ev


def experiment(root, skill, kind, runtime):
    # Import lazily to avoid a cycle with the gate entry point.
    import skill_gate as gate
    root = Path(root)
    require(kind in ('routing', 'output'), 'invalid report kind')
    require(isinstance(runtime, dict) and set(runtime) == {'model', 'cli_version', 'attempts', 'description_budget', 'environment_hash'}, 'invalid runtime identity')
    require(all(isinstance(runtime[k], str) and runtime[k].strip() for k in ('model', 'cli_version')), 'explicit model and CLI version required')
    require(integer(runtime['attempts'], 1) and runtime['attempts'] <= 100, 'attempts must be a positive integer')
    require(isinstance(runtime['environment_hash'], str) and len(runtime['environment_hash']) == 64, 'environment identity required')
    require(runtime['description_budget'] == 300000, 'unsupported description budget')
    dirs = gate.skill_dirs(str(root))
    packs = json.loads((root / 'packs.config.json').read_text())['packs']
    pack = next((p for p in packs if skill in p['skills']), None)
    require(pack is not None and len(dirs.get(skill, [])) == 1, 'unknown or ambiguous packed skill')
    require(all(len(dirs.get(n, [])) == 1 for p in packs for n in p['skills']), 'catalog contains missing or ambiguous skills')
    full = root / dirs[skill][0]
    from skill_checks import check_integrity
    require(not check_integrity(full), 'skill integrity checks failed; run eval:inspect')
    catalog = {n: gate.frontmatter(str(root / dirs[n][0] / 'SKILL.md')) for p in packs for n in p['skills']}
    h = gate.hashes(dirs[skill][0])
    code = {p: hashlib.sha256((root / p).read_bytes()).hexdigest() for p in (
        'scripts/skill_evidence.py', 'scripts/skill_gate.py', 'scripts/skill_checks.py', 'scripts/eval-skill.mjs',
        'scripts/eval-runtime.mjs', 'scripts/trigger-test.mjs', 'scripts/skill-gate.config.json')}
    context = dict(schema_version=SCHEMA, skill=skill, pack=pack['name'], kind=kind,
                   runtime=runtime, code=code, target_hash=h[kind + '_hash'])
    if kind == 'routing':
        plan, near = routing_plan(skill, full, catalog, packs, rows((root / 'scripts/trigger-prompts.tsv').read_text()))
        context.update(catalog=catalog, plan=plan, neighbours=near)
    else:
        context['cases'] = dataset(full, skill)['evals']
        context['protocol'] = 'target-only-identical-prompt-observed-activation-v2'
    return context


def assertion_score(case, verdicts):
    require(isinstance(verdicts, list) and len(verdicts) == len(case['assertions']), 'incomplete assertion verdicts')
    require(all(isinstance(v, dict) and integer(v.get('id'), 1) for v in verdicts), 'invalid assertion ID')
    require({v['id'] for v in verdicts} == set(range(1, len(verdicts) + 1)), 'duplicate or missing assertion IDs')
    for v in verdicts:
        require(v.get('verdict') in ('pass', 'fail', 'unknown'), 'invalid assertion verdict')
        require(isinstance(v.get('evidence'), str) and bool(v['evidence'].strip()), 'assertion evidence required')
    require(all(v['verdict'] != 'unknown' for v in verdicts), 'unknown assertion evidence')
    return sum(v['verdict'] == 'pass' for v in verdicts) / len(verdicts)


def paired_interval(differences):
    # Descriptive case-level percentile bootstrap, never a release gate.
    if len(differences) < 2:
        return None
    rng = random.Random(0)
    n = len(differences)
    means = sorted(sum(rng.choices(differences, k=n)) / n for _ in range(2000))
    return dict(method='paired-case-percentile-bootstrap', confidence=.95, resamples=2000,
                seed=0, low=means[49], high=means[1949],
                interpretation='descriptive; small case sets have limited precision')


def assess(context, evidence, cfg):
    require(isinstance(evidence, list), 'evidence must be an array')
    n = context['runtime']['attempts']
    failures = []
    if context['kind'] == 'routing':
        require(len(evidence) == len(context['plan']), 'missing or extra routing rows')
        keys = lambda r: (r['expected'], r['group'], r['prompt'])
        require(all(isinstance(r, dict) for r in evidence), 'invalid routing row')
        require(sorted(keys(r) for r in evidence) == sorted(keys(r) for r in context['plan']), 'routing plan mismatch')
        hit = total = false = steals = 0
        for row in evidence:
            require(integer(row.get('runs')) and integer(row.get('errors')) and integer(row.get('hits')), 'invalid routing counters')
            require(row['runs'] == n and row['errors'] == 0, 'incomplete routing trials')
            fired = row.get('fired')
            require(isinstance(fired, dict) and all(isinstance(k, str) and integer(v, 1) and not k.startswith('error:') for k, v in fired.items()) and sum(fired.values()) == n, 'invalid fired counts')
            expected = row['expected'].split('|')
            matches = lambda k: any(k == a or (':' not in a and k.endswith(':' + a)) for a in expected)
            require(row['hits'] == sum(v for k, v in fired.items() if matches(k)), 'routing hits disagree with observations')
            count = sum(v for k, v in fired.items() if k.split(':')[-1] == context['skill'])
            if row['group'] == 'positive':
                hit += row['hits']; total += n
            elif row['group'] == 'negative':
                false += count
            else:
                steals += count
        require(sum(r['group'] == 'positive' for r in context['plan']) >= cfg['new_skill']['min_trigger_positives'] and sum(r['group'] == 'negative' for r in context['plan']) >= cfg['new_skill']['min_trigger_negatives'], 'insufficient positive/negative routing coverage')
        b = cfg['routing_bars']
        recall = hit / total
        if n < b['min_runs']: failures.append('too few routing runs')
        if recall < b['min_recall']: failures.append('routing recall below bar')
        if false > b['max_false_fires']: failures.append('too many false fires')
        if steals > b['max_neighbour_steals']: failures.append('too many neighbour steals')
        return dict(recall=recall, false_fires=false, neighbour_steals=steals, unscored_runs=0), failures
    cases = context['cases']
    require(len(evidence) == len(cases) * 2 * n, 'incomplete output trial coverage')
    seen = set(); scores = {}
    for row in evidence:
        require(isinstance(row, dict), 'invalid output trial')
        ci, condition, trial = row.get('case'), row.get('condition'), row.get('trial')
        require(integer(ci) and ci < len(cases) and integer(trial) and trial < n and condition in ('with_skill', 'without_skill'), 'invalid trial identity')
        key = (ci, condition, trial)
        require(key not in seen, 'duplicate output trial'); seen.add(key)
        require(not row.get('error'), 'incomplete output trial')
        require(row.get('activation') == ('invoked' if condition == 'with_skill' else 'not_invoked'), 'missing or mismatched activation evidence')
        require(isinstance(row.get('output'), str) and isinstance(row.get('trace'), list), 'missing retained output/trace')
        # Recompute activation from retained events; a copied text claim cannot prove use.
        require(observed_activation(row['trace'], context['skill']) == row['activation'], 'activation disagrees with trace')
        require(trace_output(row['trace'], context['runtime']['model']) == row['output'], 'output disagrees with retained trace')
        judge_output = json.loads(trace_output(row.get('judge_trace'), context['runtime']['model']))
        require(isinstance(judge_output, dict) and judge_output.get('assertions') == row.get('verdicts'), 'verdicts disagree with judge trace')
        score = assertion_score(cases[ci], row.get('verdicts'))
        require(type(row.get('score')) in (int, float) and math.isfinite(row['score']) and abs(score - row['score']) < 1e-12, 'score disagrees with assertions')
        scores[key] = score
    mean = lambda values: sum(values) / len(values)
    per_case = []
    b = cfg['output_bars']
    for ci in range(len(cases)):
        w = [scores[ci, 'with_skill', k] for k in range(n)]
        o = [scores[ci, 'without_skill', k] for k in range(n)]
        per_case.append(dict(case=ci, with_skill=mean(w), without_skill=mean(o), stable=all(v >= b['min_with_skill_score'] for v in w)))
    with_s = mean([r['with_skill'] for r in per_case]); without = mean([r['without_skill'] for r in per_case])
    stable = mean([r['stable'] for r in per_case])
    if n < b['min_trials']: failures.append('too few output trials')
    if with_s < b['min_with_skill_score']: failures.append('with-skill score below bar')
    if with_s - without <= b['min_lift']: failures.append('aggregate lift not above bar')
    if stable < b['min_stable_cases']: failures.append('too few cases pass every trial')
    if any(r['with_skill'] < r['without_skill'] for r in per_case): failures.append('a case regressed against baseline')
    return dict(with_skill=with_s, without_skill=without, lift=with_s-without, stable_cases=stable,
                errored_runs=0, cases=per_case,
                lift_uncertainty=paired_interval([r['with_skill']-r['without_skill'] for r in per_case])), failures


def trace_output(trace, model):
    require(isinstance(trace, list) and all(isinstance(e, dict) for e in trace), 'missing retained trace')
    terminal = [e for e in trace if e.get('type') == 'result']
    require(len(terminal) == 1 and terminal[0].get('is_error') is False and isinstance(terminal[0].get('result'), str), 'incomplete terminal trace')
    models = [e.get('message', {}).get('model') for e in trace if e.get('type') == 'assistant' and isinstance(e.get('message'), dict)]
    require(bool(models) and all(m == model for m in models), 'model identity differs from recorded runtime')
    return terminal[0]['result']


def observed_activation(trace, skill):
    require(isinstance(trace, list) and all(isinstance(e, dict) for e in trace), 'invalid trace')
    calls = set(); successful = set(); terminal = False
    for ev in trace:
        if ev.get('type') == 'result' and ev.get('is_error') is not True:
            terminal = True
        message = ev.get('message', {})
        require(isinstance(message, dict), 'invalid trace message')
        for part in message.get('content', []) if isinstance(message.get('content', []), list) else []:
            if not isinstance(part, dict): continue
            if part.get('type') == 'tool_use' and part.get('name') == 'Skill':
                inputs = part.get('input', {})
                require(isinstance(inputs, dict), 'invalid tool inputs')
                value = inputs.get('skill', '')
                if isinstance(value, str) and value.split(':')[-1] == skill and part.get('id'):
                    calls.add(part['id'])
            if part.get('type') == 'tool_result' and part.get('is_error') is not True:
                successful.add(part.get('tool_use_id'))
    if calls & successful: return 'invoked'
    if terminal and not calls: return 'not_invoked'
    return 'unknown'


def finalize(root, skill, kind, runtime, evidence):
    context = experiment(root, skill, kind, runtime)
    import skill_gate as gate
    try:
        results, failures = assess(context, evidence, gate.config())
        status = 'fail' if failures else 'pass'
    except (ValueError, KeyError, TypeError, ZeroDivisionError) as e:
        results, failures, status = {}, [str(e)], 'incomplete'
    return dict(schema_version=SCHEMA, skill=skill, pack=context['pack'], kind=kind,
                experiment_hash=digest(context), runtime=runtime, status=status,
                **{'pass': status == 'pass'}, failures=failures, results=results, evidence=evidence)



def same_json(left, right):
    # JSON has a single number type; JS serialization turns 1.0 into 1.
    # Booleans must remain distinct despite Python's True == 1 semantics.
    if type(left) in (int, float) and type(right) in (int, float):
        return math.isfinite(left) and math.isfinite(right) and left == right
    if type(left) is not type(right):
        return False
    if isinstance(left, dict):
        return left.keys() == right.keys() and all(same_json(left[k], right[k]) for k in left)
    if isinstance(left, list):
        return len(left) == len(right) and all(same_json(a, b) for a, b in zip(left, right))
    return left == right


def validate_report(root, skill, kind, report):
    require(isinstance(report, dict) and type(report.get('schema_version')) is int and report['schema_version'] == SCHEMA, 'unsupported evidence schema; re-run evaluation')
    rebuilt = finalize(root, skill, kind, report.get('runtime'), report.get('evidence'))
    for field in ('skill', 'pack', 'kind', 'experiment_hash', 'status', 'pass', 'results', 'failures'):
        require(same_json(report.get(field), rebuilt[field]), f'stale or inconsistent {field}')
    require(rebuilt['pass'] is True, f"{rebuilt['status']}: {'; '.join(rebuilt['failures'])}")
    return rebuilt
