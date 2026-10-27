import json, math
from statistics import NormalDist
from pathlib import Path
out=[]
z=NormalDist().inv_cdf(.975); zb=NormalDist().inv_cdf(.8)
for p,d in [(0.1,0.02),(0.5,0.05),(0.02,0.005)]:
 old=math.ceil(z*z*2*p*(1-p)/d**2)
 p1=p+d; pbar=(p+p1)/2
 new=math.ceil((z*math.sqrt(2*pbar*(1-pbar))+zb*math.sqrt(p*(1-p)+p1*(1-p1)))**2/d**2)
 # Approximate equal-variance power at the declared MDE.
 mu=d/math.sqrt(2*p*(1-p)/old)
 power=1-NormalDist().cdf(z-mu)+NormalDist().cdf(-z-mu)
 assert new>old and power<.8
 out.append({'case':'ab-sizing','input':{'baseline':p,'absolute_MDE':d,'alpha':.05,'target_power':.8},'before_n_per_arm':old,'before_approx_power':power,'after_n_per_arm':new,'method':'Executed formula extracted verbatim from SKILL.md; corrected two-proportion normal approximation uses alternative p1 and pooled pbar. Not stochastic agent replication.'})
for x in [dict(in_tokens=100000,out_tokens=10000,tool_calls=5,human_fix_min=2,rate_in=3,rate_out=15,rate_call=.02,human_rate=1,successful=5),dict(in_tokens=12000,out_tokens=1500,tool_calls=10,human_fix_min=0,rate_in=1,rate_out=4,rate_call=.1,human_rate=2,successful=3),dict(in_tokens=5000,out_tokens=1000,tool_calls=5,human_fix_min=10,rate_in=2,rate_out=10,rate_call=.01,human_rate=1,successful=0)]:
 subtotal=x['tool_calls']*x['rate_call']+x['human_fix_min']*x['human_rate']
 old=x['in_tokens']*x['rate_in']+x['out_tokens']*x['rate_out']+subtotal
 new=(x['in_tokens']*x['rate_in']+x['out_tokens']*x['rate_out'])/1e6+subtotal
 out.append({'case':'agent-concierge-cost','input':x,'before_total_literal_formula':old,'after_total':new,'before_CPO':old/x['successful'] if x['successful'] else 'ZeroDivisionError','after_CPO':new/x['successful'] if x['successful'] else 'undefined: no successful outcomes; report total spend','method':'Literal shipped formula executed; per-million units taken from same SKILL.md rates table; example already normalizes tokens correctly.'})
Path(__file__).with_name('product-numeric-fixtures.json').write_text(json.dumps(out,indent=2))
print(json.dumps(out,indent=2))
