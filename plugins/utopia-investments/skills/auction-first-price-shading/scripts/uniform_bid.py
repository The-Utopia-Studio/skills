#!/usr/bin/env python3
"""Risk-neutral symmetric first-price IPV benchmark; uniform [0, upper], public reserve."""
import argparse
import json
import math


def uniform_bid(value, bidders, reserve=0.0):
    """Return benchmark bid, or None when value is below the reserve.

    bidders counts everyone, including this bidder. No budgets, entry costs,
    correlated signals, risk aversion or asymmetric bidder distributions modeled.
    """
    if isinstance(bidders, bool) or not isinstance(bidders, int) or bidders < 1:
        raise ValueError('bidders must be a positive integer including you')
    if not all(isinstance(x, (int, float)) and not isinstance(x, bool) and math.isfinite(x) and x >= 0 for x in (value, reserve)):
        raise ValueError('value and reserve must be finite nonnegative numbers')
    if value < reserve:
        return None
    if bidders == 1 or value == 0:
        return reserve
    return value * (bidders - 1) / bidders + reserve * (reserve / value) ** (bidders - 1) / bidders


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--value', type=float, required=True)
    parser.add_argument('--bidders', type=int, required=True)
    parser.add_argument('--reserve', type=float, default=0.0)
    args = parser.parse_args()
    try:
        bid = uniform_bid(args.value, args.bidders, args.reserve)
    except ValueError as error:
        parser.error(str(error))
    print(json.dumps({'benchmark_bid': bid, 'participate': bid is not None,
                      'model': 'symmetric risk-neutral independent uniform private values'}))
