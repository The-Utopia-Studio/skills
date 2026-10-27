import json
from pathlib import Path
out={}
out['pricing']=[]
for value,price,cost in [(100,10,4),(100,20,5),(200,30,0)]:
 out['pricing'].append(dict(value=value,price=price,cost=cost,gross_benefit_multiple=value/price,net_roi=(value-price)/price,gross_margin=(price-cost)/price,price_cost_multiple=price/cost if cost else None))
out['launch_joint']=[dict(comprehension=c,value=v,old_pass=sum(c)>=2 and sum(v)>=2,joint_pass=sum(a and b for a,b in zip(c,v))>=2) for c,v in [([1,1,0],[0,1,1]),([1,1,0],[1,1,0]),([1,0,0],[1,1,1])]]
out['launch_b']=[dict(present=flags,passes=all(flags)) for flags in [[1,1,1,1,1],[0,1,1,1,1],[1,1,1,1,0]]]
out['buying_roles']=[{'input':'Enterprise department head uses reporting and has documented $20k software budget; CFO approves above $50k.','output':'Same head is user and buyer for a $5k purchase; verify whether delegated authority also makes them decision-maker. No invented second buyer.','check':'Counterexample to enterprise roles always distinct'}, {'input':'Operator likes demo, HSE manager owns budget, procurement signs.','output':'Keep operator user, HSE buyer, procurement decision-maker; champion unknown until observed.','check':'Do not infer authority from enthusiasm'}, {'input':'Solo consultant buys own app.','output':'One person user/buyer/decider; champion role unnecessary; no invented opposition.','check':'Preserve genuine overlap'}]
out['synthetic_negative']=[{'input':'Model panel says confusing; three actual target users complete task unaided.','output':'Real observations outweigh synthetic confusion; record false negative, do not kill concept.','check':'Synthetic negative is not validation'}, {'input':'Model cites cheaper workaround but named source says it costs more.','output':'Check source, reject unsupported workaround claim, retain issue as unresolved hypothesis.','check':'Grounding must be checked'}, {'input':'Model repeats actual logged workflow break with exact source.','output':'Cite source as evidence of that recorded event; model adds no independent replication or prevalence evidence.','check':'Evidence comes from corpus, not generated panel'}]
out['method']='Arithmetic executed by Python; buying-role and synthetic outputs are this Codex reviewer\'s authored offline cases, not external user studies or independent stochastic runs.'
Path(__file__).with_name('founder-tail-fixtures.json').write_text(json.dumps(out,indent=2))
assert out['launch_joint'][0]['old_pass'] and not out['launch_joint'][0]['joint_pass']
assert out['pricing'][0]['net_roi']==9 and out['pricing'][1]['net_roi']==4
print('3 pricing, 3 joint launch, 3 correction-gate, 3 role and 3 synthetic cases saved')
