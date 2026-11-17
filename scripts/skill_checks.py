"""Small keyless checks complementing static_check; no scanner/model dependency.

Inspired by SkillEvaluator's Unicode and code-integrity checks. Full NVIDIA
harness/quality/embedding checks remain opt-in through eval:inspect.
"""
from pathlib import Path

TEXT = {'.md', '.txt', '.py', '.js', '.mjs', '.cjs', '.ts', '.sh', '.json', '.yaml', '.yml', '.toml'}
BIDI = set(range(0x202A, 0x202F)) | set(range(0x2066, 0x206A))
HIDDEN = {0x200B, 0x2060, 0xFEFF}


def check_integrity(directory):
    root = Path(directory).resolve()
    issues = []
    for p in root.rglob('*'):
        if any(part in {'node_modules', '.git', '__pycache__'} for part in p.relative_to(root).parts):
            continue
        rel = p.relative_to(root).as_posix()
        if p.is_symlink():
            try:
                if not p.resolve(strict=True).is_relative_to(root):
                    issues.append(f'{rel}: symlink leaves the skill directory')
            except (OSError, RuntimeError):
                issues.append(f'{rel}: broken or cyclic symlink')
            continue
        if not p.is_file() or p.suffix not in TEXT:
            continue
        try:
            text = p.read_text(encoding='utf-8')
        except UnicodeError:
            issues.append(f'{rel}: text must be UTF-8')
            continue
        controls = sorted({ord(c) for c in text if ord(c) in BIDI | HIDDEN})
        if controls:
            issues.append(f"{rel}: hidden/bidirectional controls {', '.join(f'U+{c:04X}' for c in controls)}")
    return issues
