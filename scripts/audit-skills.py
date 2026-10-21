from pathlib import Path
import re,json,hashlib,ast,subprocess,collections
import argparse
parser=argparse.ArgumentParser(description='Static packaged-skill syntax, link-candidate and exact-duplicate audit; does not execute integrations.')
parser.add_argument('--output', type=Path, required=True)
args=parser.parse_args()
root=Path(__file__).resolve().parents[1]
config=json.loads((root/'packs.config.json').read_text()); packed={n for pack in config['packs'] for n in pack['skills']}; skills=sorted(p for p in (root/'skills').rglob('SKILL.md') if p.parent.name in packed); files=[p for skill in skills for p in skill.parent.rglob('*')]; results={'skill_count':len(skills),'missing_relative_links':[],'missing_inline_resources':[],'syntax':[]}
hashes=collections.defaultdict(list)
for p in files:
 if not p.is_file():continue
 rel=str(p.relative_to(root)); data=p.read_bytes(); hashes[hashlib.sha256(data).hexdigest()].append(rel)
 if p.suffix=='.md':
  txt=data.decode(errors='replace')
  for m in re.finditer(r'\]\(([^)\s]+)(?:\s+[^)]*)?\)',txt):
   target=m.group(1).split('#')[0]
   if not target or re.match(r'\w+:',target) or target.startswith(('/', '~')) or any(x in target for x in '<>{}*'):continue
   if not (p.parent/target).exists(): results['missing_relative_links'].append({'file':rel,'line':txt[:m.start()].count('\n')+1,'target':target})
  for m in re.finditer(r'`((?:\./)?(?:resources|references|scripts)/[^`\s<>*{}]+)`',txt):
   base=next((a for a in p.parents if (a/'SKILL.md').exists()), p.parent)
   if not (p.parent/m.group(1)).exists() and not (base/m.group(1)).exists():results['missing_inline_resources'].append({'file':rel,'line':txt[:m.start()].count('\n')+1,'target':m.group(1)})
 if p.suffix=='.py':
  try:ast.parse(data,filename=rel); err=None
  except Exception as e:err=str(e)
  results['syntax'].append({'file':rel,'method':'ast.parse (no execution)','error':err})
 if p.suffix in ('.sh','.js','.mjs'):
  cmd=['bash','-n',str(p)] if p.suffix=='.sh' else ['node','--check',str(p)]
  r=subprocess.run(cmd,capture_output=True,text=True);results['syntax'].append({'file':rel,'method':' '.join(cmd[:2]),'error':r.stderr if r.returncode else None})
results['exact_duplicate_files']=[v for v in hashes.values() if len(v)>1]
bodyhash=collections.defaultdict(list)
for p in skills:
 t=p.read_text(); t=re.sub(r'^---\n.*?\n---\n','',t,flags=re.S);bodyhash[hashlib.sha256(t.encode()).hexdigest()].append(str(p.relative_to(root)))
results['exact_duplicate_skill_bodies']=[v for v in bodyhash.values() if len(v)>1]
args.output.parent.mkdir(parents=True,exist_ok=True)
args.output.write_text(json.dumps(results,indent=2)+'\n')
print(json.dumps({k:len(v) if isinstance(v,list) else v for k,v in results.items()},indent=2))
print('Syntax errors:',[v for v in results['syntax'] if v['error']])

raise SystemExit(1 if any(v['error'] for v in results['syntax']) else 0)
