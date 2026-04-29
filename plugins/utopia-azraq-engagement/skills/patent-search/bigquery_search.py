#!/usr/bin/env python3
"""
Direct BigQuery Patent Search - Bypasses MCP layer issues
"""
import json
import sys
from pathlib import Path

# Add parent directory to path to import from mcp_server
sys.path.insert(0, str(Path(__file__).parent.parent.parent.parent))

from mcp_server.bigquery_search import BigQueryPatentSearch


def search_patents(query, limit=10, country="US", start_year=None, end_year=None):
    """Search patents using BigQuery"""
    searcher = BigQueryPatentSearch()
    results = searcher.search_by_keywords(
        query=query, country=country, limit=limit, start_year=start_year, end_year=end_year
    )
    return results


def get_patent(patent_number):
    """Get full patent details"""
    searcher = BigQueryPatentSearch()
    return searcher.get_patent_details(patent_number)


def search_by_cpc(cpc_code, limit=10, country="US"):
    """Search by CPC classification"""
    searcher = BigQueryPatentSearch()
    return searcher.search_by_cpc(cpc_code=cpc_code, limit=limit, country=country)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python bigquery_search.py search 'voice biometric' [limit]")
        print("  python bigquery_search.py get US12424224B2")
        print("  python bigquery_search.py cpc G10L [limit]")
        sys.exit(1)

    command = sys.argv[1]

    if command == "search":
        query = sys.argv[2]
        limit = int(sys.argv[3]) if len(sys.argv) > 3 else 10
        results = search_patents(query, limit=limit)
        print(json.dumps(results, indent=2))

    elif command == "get":
        patent_number = sys.argv[2]
        result = get_patent(patent_number)
        print(json.dumps(result, indent=2))

    elif command == "cpc":
        cpc_code = sys.argv[2]
        limit = int(sys.argv[3]) if len(sys.argv) > 3 else 10
        results = search_by_cpc(cpc_code, limit=limit)
        print(json.dumps(results, indent=2))

    else:
        print(f"Unknown command: {command}")
        sys.exit(1)
