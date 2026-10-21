"""Deterministic synthetic counterexamples, not live financial validation."""
import json, math
from pathlib import Path
out={}
for label, intersection, expected in [('duplicate',.3,.3),('independent',.09,.51),('disjoint',0,.6)]:
    value=.3+.3-intersection
    assert math.isclose(value,expected)
    out[label+'_union']=value
assert math.isclose(.25*.4,.1)
out['conditional_joint']=.25*.4
out['wacc']=[]
for debt,cash,expected in [(0,30,.1),(20,50,.09),(20,0,.09)]:
    value=.1*100/(100+debt)+.04*debt/(100+debt)
    assert math.isclose(value,expected)
    out['wacc'].append(dict(debt=debt,cash=cash,value=value))
assert (60+50-10)==100
assert 20/(.20*100)==1
for operating_income,da,expected in [(20,5,25),(-10,5,-5),(0,0,0)]:
    assert operating_income+da==expected
out['ebitda']=[25,-5,0]
out['segment_total']=100
out['peg']=1
print(json.dumps(out,indent=2))
Path(__file__).with_name('gtm-executable-investment-results.json').write_text(json.dumps(out,indent=2)+'\n')
