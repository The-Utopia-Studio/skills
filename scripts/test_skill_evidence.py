"""Offline acceptance cases for evidence enforcement; never calls a model."""
import copy
import json
import os
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

import skill_evidence as ev
import skill_gate as gate
from skill_checks import check_integrity

CFG = gate.config()
RUNTIME = dict(model='fixture-model', cli_version='fixture-cli', attempts=3, description_budget=300000, environment_hash='0'*64)


def trace(used=True):
    parts = [dict(type='assistant', message=dict(model='fixture-model', content=[dict(type='tool_use', name='Skill', id='call1', input=dict(skill='pack:example'))])),
             dict(type='user', message=dict(content=[dict(type='tool_result', tool_use_id='call1', content='loaded')]))] if used else []
    return parts + [dict(type='assistant', message=dict(model='fixture-model', content=[dict(type='text', text='answer')])), dict(type='result', result='answer', is_error=False)]


def output_context():
    return dict(kind='output', skill='example', runtime=RUNTIME, cases=[dict(prompt=f'p{i}', assertions=['a', 'b']) for i in range(3)])


def outputs():
    result = [dict(case=ci, condition=condition, trial=k, activation='invoked' if condition == 'with_skill' else 'not_invoked',
                 output='answer', trace=trace(condition == 'with_skill'), score=1 if condition == 'with_skill' else .5,
                 verdicts=[dict(id=i, verdict='pass' if condition == 'with_skill' or i == 1 else 'fail', evidence='quote') for i in (1,2)])
            for ci in range(3) for condition in ('with_skill', 'without_skill') for k in range(3)]
    for row in result:
        text = json.dumps(dict(assertions=row['verdicts']))
        row['judge_trace'] = [dict(type='assistant', message=dict(model='fixture-model', content=[])), dict(type='result', is_error=False, result=text)]
    return result


class OutputEvidence(unittest.TestCase):
    def test_valid_paired_results_and_every_trial_stability(self):
        result, failures = ev.assess(output_context(), outputs(), CFG)
        self.assertEqual(failures, [])
        self.assertEqual(result['lift'], .5)
        self.assertEqual(result['stable_cases'], 1)
        self.assertEqual(result['lift_uncertainty']['low'], .5)

    def test_partial_duplicate_wrong_identity_and_nonfinite(self):
        for mutation in ('missing', 'duplicate', 'case', 'nan', 'boolean'):
            rows = outputs()
            if mutation == 'missing': rows.pop()
            if mutation == 'duplicate': rows[-1] = rows[0]
            if mutation == 'case': rows[0]['case'] = 7
            if mutation == 'nan': rows[0]['score'] = float('nan')
            if mutation == 'boolean': rows[0]['score'] = True
            with self.subTest(mutation=mutation), self.assertRaises(ValueError): ev.assess(output_context(), rows, CFG)

    def test_judge_unknown_duplicate_missing_evidence(self):
        for mutation in ('unknown', 'duplicate', 'missing', 'evidence'):
            rows = outputs(); verdicts = rows[0]['verdicts']
            if mutation == 'unknown': verdicts[0]['verdict'] = 'unknown'
            if mutation == 'duplicate': verdicts[1]['id'] = 1
            if mutation == 'missing': verdicts.pop()
            if mutation == 'evidence': verdicts[0]['evidence'] = ''
            with self.subTest(mutation=mutation), self.assertRaises(ValueError): ev.assess(output_context(), rows, CFG)

    def test_mixed_model_and_fabricated_judge_verdicts_cannot_pass(self):
        rows = outputs(); rows[0]['trace'][0]['message']['model'] = 'other-model'
        with self.assertRaises(ValueError): ev.assess(output_context(), rows, CFG)
        rows = outputs(); rows[0]['judge_trace'][-1]['result'] = '{}';
        with self.assertRaises(ValueError): ev.assess(output_context(), rows, CFG)

    def test_failed_activation_or_text_claim_cannot_pass(self):
        for observed in [[], [dict(type='result', result='I invoked example')], trace(False)]:
            rows = outputs(); rows[0]['trace'] = observed
            with self.assertRaises(ValueError): ev.assess(output_context(), rows, CFG)
        failed = trace(); failed[1]['message']['content'][0]['is_error'] = True
        self.assertEqual(ev.observed_activation(failed, 'example'), 'unknown')

    def test_no_success_within_retries_substitute_for_stability(self):
        rows = outputs()
        # One bad trial in each of two cases: retry success remains high; stability fails.
        for row in rows:
            if row['condition'] == 'with_skill' and row['trial'] == 0 and row['case'] < 2:
                row['verdicts'][1]['verdict'] = 'fail'; row['score'] = .5
        for row in rows: row['judge_trace'][-1]['result'] = json.dumps(dict(assertions=row['verdicts']))
        result, failures = ev.assess(output_context(), rows, CFG)
        self.assertAlmostEqual(result['stable_cases'], 1/3)
        self.assertIn('too few cases pass every trial', failures)

    def test_per_case_regressions_fail_despite_positive_lift(self):
        rows = outputs()
        for row in rows:
            if row['case'] == 0 and row['condition'] == 'with_skill':
                for v in row['verdicts']: v['verdict'] = 'fail'
                row['score'] = 0
        for row in rows: row['judge_trace'][-1]['result'] = json.dumps(dict(assertions=row['verdicts']))
        _, failures = ev.assess(output_context(), rows, CFG)
        self.assertIn('a case regressed against baseline', failures)


class RoutingEvidence(unittest.TestCase):
    def context_rows(self):
        plan = [dict(expected='example' if i < 8 else 'none', group='positive' if i < 8 else 'negative', prompt=f'p{i}') for i in range(16)]
        context = dict(skill='example', kind='routing', runtime=RUNTIME, plan=plan)
        observations = [{**r, 'runs': 3, 'errors': 0, 'hits': 3, 'fired': {r['expected']: 3}} for r in plan]
        return context, observations

    def test_recompute_counters_and_routing_thresholds(self):
        context, rows = self.context_rows()
        self.assertEqual(ev.assess(context, rows, CFG)[1], [])
        rows[0]['hits'] = 0
        with self.assertRaises(ValueError): ev.assess(context, rows, CFG)

    def test_missing_duplicate_and_unscored_rows(self):
        for mutation in ('missing', 'duplicate', 'errors'):
            context, rows = self.context_rows()
            if mutation == 'missing': rows.pop()
            if mutation == 'duplicate': rows[1] = rows[0]
            if mutation == 'errors': rows[0]['errors'] = 1
            with self.subTest(mutation=mutation), self.assertRaises(ValueError): ev.assess(context, rows, CFG)


class GateIdentity(unittest.TestCase):
    def test_report_decision_and_metrics_are_recomputed(self):
        context = output_context()
        context['pack'] = 'pack'
        with patch.object(ev, 'experiment', return_value=context):
            report = ev.finalize(ev.ROOT, 'example', 'output', RUNTIME, outputs())
            ev.validate_report(ev.ROOT, 'example', 'output', report)
            for field, value in [('results', {'lift': 99}), ('pass', 'true'), ('skill', 'another'), ('experiment_hash', 'fake')]:
                altered = {**report, field: value}
                with self.subTest(field=field), self.assertRaises(ValueError): ev.validate_report(ev.ROOT, 'example', 'output', altered)


    def test_json_number_roundtrip_preserves_values_but_rejects_booleans(self):
        self.assertTrue(ev.same_json({'score': 1}, {'score': 1.0}))
        self.assertFalse(ev.same_json({'score': True}, {'score': 1.0}))
        self.assertFalse(ev.same_json({'score': float('nan')}, {'score': 1.0}))

    def test_minimal_boolean_report_rejected(self):
        with self.assertRaises(ValueError): ev.validate_report(ev.ROOT, 'skill-eval', 'routing', {'pass': True})

    def test_experiment_changes_with_catalog_prompts_harness_policy_and_runtime(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)
            (root/'scripts').mkdir()
            names = ['example', 'neighbour']
            packs = dict(packs=[dict(name='pack', skills=names)])
            (root/'packs.config.json').write_text(json.dumps(packs))
            for n in names:
                full = root/'skills'/n; (full/'evals').mkdir(parents=True)
                (full/'SKILL.md').write_text(f'---\nname: {n}\ndescription: Use when testing {n}.\n---\nBody\n')
            for file in ['skill_evidence.py', 'skill_gate.py', 'skill_checks.py', 'eval-skill.mjs', 'eval-runtime.mjs', 'trigger-test.mjs', 'skill-gate.config.json']:
                (root/'scripts'/file).write_text('{}')
            (root/'scripts/trigger-prompts.tsv').write_text('example\tgroup\tprompt\n')
            with patch.object(gate, 'ROOT', str(root)):
                original = ev.digest(ev.experiment(root, 'example', 'routing', RUNTIME))
                for path in [root/'skills/neighbour/SKILL.md', root/'scripts/trigger-prompts.tsv', root/'scripts/eval-skill.mjs', root/'scripts/skill-gate.config.json']:
                    previous = path.read_text()
                    changed = previous.replace('Use when testing', 'Use when reviewing') if path.name == 'SKILL.md' else previous.replace('prompt', 'different prompt') if path.suffix == '.tsv' else previous+'\n# change\n'
                    path.write_text(changed)
                    self.assertNotEqual(original, ev.digest(ev.experiment(root, 'example', 'routing', RUNTIME)))
                    path.write_text(previous)
                for key, value in [('model','new-model'), ('attempts',4), ('cli_version','new-cli'), ('environment_hash','1'*64)]:
                    self.assertNotEqual(original, ev.digest(ev.experiment(root, 'example', 'routing', {**RUNTIME,key:value})))

    def test_high_risk_survives_later_edits_and_downgrades(self):
        with patch.object(gate, 'git', return_value='{"risk":"high"}'):
            self.assertTrue(gate.high_risk('example', 'HEAD', 'skills/example', {'high_risk_skills': []}, None))
            self.assertTrue(gate.high_risk('example', 'HEAD', 'skills/example', {'high_risk_skills': []}, 'normal'))
        with patch.object(gate, 'git', return_value='{}'):
            self.assertTrue(gate.high_risk('example', 'HEAD', 'skills/example', {'high_risk_skills': []}, 'high'))

    def test_removing_central_risk_does_not_bypass_output_evidence(self):
        def at_base(*args, **kwargs):
            return '{"high_risk_skills":["example"]}' if args[1].endswith('skill-gate.config.json') else '{}'
        with patch.object(gate, 'git', side_effect=at_base):
            self.assertTrue(gate.high_risk('example', 'HEAD', 'skills/example', {'high_risk_skills': []}, None))

    def test_hidden_controls_encoding_and_escaping_symlinks(self):
        with tempfile.TemporaryDirectory() as td:
            root = Path(td)/'skill'; root.mkdir()
            f = root/'SKILL.md'; f.write_text('Arabic العربية is valid')
            self.assertEqual(check_integrity(root), [])
            f.write_text('hidden\u202econtrol')
            self.assertIn('U+202E', check_integrity(root)[0])
            f.write_bytes(b'\xff')
            self.assertIn('UTF-8', check_integrity(root)[0])
            f.write_text('valid'); (root/'escape').symlink_to(Path(td))
            self.assertIn('symlink leaves', check_integrity(root)[0])


if __name__ == '__main__': unittest.main()
