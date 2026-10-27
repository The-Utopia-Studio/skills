import importlib.util
import json
from pathlib import Path
import tempfile
from types import SimpleNamespace
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location("routing", Path(__file__).with_name("codex-routing-eval.py"))
routing = importlib.util.module_from_spec(spec)
spec.loader.exec_module(routing)


class RoutingTests(unittest.TestCase):
    def test_qualified_and_alternative_matching(self):
        self.assertTrue(routing.matches("foo|bar", "utopia-product:bar"))
        self.assertTrue(routing.matches("none", "none"))
        self.assertFalse(routing.matches("utopia-product:foo", "other:foo"))
        self.assertFalse(routing.matches("foo", "utopia-product:foobar"))

    def fixture(self, temp):
        root = Path(temp)
        pack = root / "plugins/utopia-product"
        (pack / ".claude-plugin").mkdir(parents=True)
        (pack / ".claude-plugin/plugin.json").write_text('{"name":"utopia-product"}')
        skill = pack / "skills/foo"
        skill.mkdir(parents=True)
        (skill / "SKILL.md").write_text("---\nname: foo\ndescription: >-\n  First line\n  second line.\n---\nBody")
        (root / "prompts-before.tsv").write_text("foo\tgroup\tFirst request\nfoo\tgroup\tSecond request\n")
        output = root / "results"
        output.mkdir()
        args = SimpleNamespace(report=root, output=output, model="test-model", effort="medium",
                               jobs=1, timeout=5, limit=None, skill_overrides="skills.config=[]")
        return root / "plugins", args

    @patch.object(routing.subprocess, "check_output", return_value="codex test")
    def test_limit_checkpoint_and_resume(self, _):
        with tempfile.TemporaryDirectory() as temp:
            plugins, args = self.fixture(temp)
            self.assertEqual(routing.catalog(plugins)[0]["description"], "First line second line.")
            with patch.object(routing, "classify", return_value={"error": "usage limit"}) as classify:
                self.assertFalse(routing.run_build("before", plugins, args))
                self.assertEqual(classify.call_count, 1)
            path = args.output / "routing-before.json"
            self.assertEqual([r["status"] for r in json.loads(path.read_text())], ["ERROR", "PENDING"])
            args.limit = 1
            with patch.object(routing, "classify", return_value={"skill": "utopia-product:foo"}):
                self.assertTrue(routing.run_build("before", plugins, args))
            args.limit = None
            with patch.object(routing, "classify", return_value={"skill": "none"}) as classify:
                self.assertTrue(routing.run_build("before", plugins, args))
                self.assertEqual(classify.call_count, 1)
            rows = json.loads(path.read_text())
            self.assertEqual([r["status"] for r in rows], ["PASS", "FAIL"])
            self.assertEqual([(r["runs"], r["errors"]) for r in rows], [(1, 0), (1, 0)])

    @patch.object(routing.subprocess, "check_output", return_value="codex test")
    def test_changed_catalog_cannot_resume(self, _):
        with tempfile.TemporaryDirectory() as temp:
            plugins, args = self.fixture(temp)
            with patch.object(routing, "classify", return_value={"skill": "none"}):
                routing.run_build("before", plugins, args)
            skill = plugins / "utopia-product/skills/foo/SKILL.md"
            skill.write_text(skill.read_text().replace("First line", "Changed description"))
            with self.assertRaisesRegex(ValueError, "metadata mismatch"):
                routing.run_build("before", plugins, args)

    def test_invalid_choice_and_tool_activity_are_not_scored_as_misses(self):
        args = SimpleNamespace(model="test-model", effort="medium", skill_overrides="skills.config=[]", timeout=5)
        for item in ({"type": "agent_message", "text": '{"skill":"not-in-catalog"}'},
                     {"type": "command_execution", "command": "unexpected tool"}):
            events = [{"type": "item.completed", "item": item},
                      {"type": "turn.completed", "usage": {"input_tokens": 1, "output_tokens": 1}}]
            process = SimpleNamespace(returncode=0, communicate=lambda *a, **k: (
                "\n".join(json.dumps(e) for e in events), ""))
            with patch.object(routing.subprocess, "Popen", return_value=process):
                result = routing.classify({"prompt": "test"}, [{"skill": "pack:foo"}], args,
                                          Path("/tmp"), Path("/tmp/schema.json"))
            self.assertIn("error", result)
            self.assertNotIn("skill", result)


if __name__ == "__main__":
    unittest.main()
