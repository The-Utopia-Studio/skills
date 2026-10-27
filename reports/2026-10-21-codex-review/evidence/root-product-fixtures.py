import json, math
from pathlib import Path
out=[]
for revenue,accounts,users in [(2000000,200,20000),(100000,200,2000),(500000,2000,10000)]:
 a=revenue/accounts;u=revenue/users
 assert math.isclose(a/u,users/accounts)
 out.append(dict(case='ARPA/ARPU reconciliation',input=[revenue,accounts,users],ARPA=a,ARPU=u,seats=users/accounts))
for start,exp,churn,contract in [(100,0,0,0),(100,0,2,1),(100,8,2,1)]:
 n=(start+exp-churn-contract)/start
 assert (n>1)==(exp>churn+contract)
 out.append(dict(case='NRR requires net expansion',input=[start,exp,churn,contract],NRR=n))
for cash,spent,collected,revenue in [(600,80,40,40),(600,80,120,10),(600,80,0,40)]:
 burn=spent-collected
 out.append(dict(case='cash runway vs revenue',input=[cash,spent,collected,revenue],old_revenue_based_runway=cash/(spent-revenue),cash_runway=cash/burn if burn>0 else None))
for revenue,opex in [(1000000,800000),(1300000,1200000),(1600000,1800000)]:
 profit=revenue*.8-opex
 out.append(dict(case='operating profit with 20 percent COGS',revenue=revenue,opex=opex,profit=profit))
for gap in [10,20,100]:
 band='no room' if gap<10 else 'thin' if gap<20 else 'real prize' if gap<=100 else 'check omitted cost'
 out.append(dict(case='floor boundary has single band',ratio=gap,band=band))
for before,after in [(6,.5),(10,1),(10,0)]:
 out.append(dict(case='compression denominator',before=before,after=after,ratio=before/after if after>0 else None))
print(json.dumps({'method':'Deterministic numerical counterexamples to literal documented formulas; not agent routing or live integration tests.','cases':out},indent=2))
