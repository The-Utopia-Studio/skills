# Patent Search Skill

An advanced prior art search skill for Claude Code that integrates with the PatentsView Search API to help with patent research, freedom to operate analysis, and competitive intelligence.

## Features

- **Comprehensive Patent Search**: Search millions of US patents by title, abstract, inventor, assignee, classification, and more
- **Advanced Query Construction**: Build complex queries with logical operators, text search, and field filtering
- **Prior Art Research**: Find relevant patents before specific dates for novelty assessment
- **Competitive Intelligence**: Analyze patent portfolios by company or technology area
- **Citation Analysis**: Explore patent citation networks for related technologies
- **Helper Scripts**: Python utilities for making API calls and processing results

## Setup

**See [docs/PATENTSVIEW_API_SETUP.md](../../../docs/PATENTSVIEW_API_SETUP.md) for complete setup instructions.**

Quick summary:
1. Request API key from [PatentsView Help Center](https://patentsview-support.atlassian.net/servicedesk/customer/portal/1/group/1/create/18)
2. Set `PATENTSVIEW_API_KEY` environment variable (see [ENVIRONMENT_VARIABLES.md](../../../docs/ENVIRONMENT_VARIABLES.md))
3. Start searching

## Usage

### From Claude Code

The skill is automatically available in Claude Code. Simply ask Claude to help with patent searches:

**Example requests:**

- "Search for patents about neural networks published before 2020"
- "Find patents by Google related to machine learning"
- "Look for prior art on wireless charging technologies before 2023"
- "Analyze the patent landscape for autonomous vehicles"
- "Find patents by inventor John Smith in the field of biotechnology"

Claude will automatically use this skill to construct appropriate API queries and present the results.

### Using the Helper Script

The included Python script can be used independently:

```bash
# Basic usage with examples
python docs/skills/patent-search/patent_search.py

# In your own Python code
import sys
sys.path.append('docs/skills/patent-search')
from patent_search import PatentsViewAPI

api = PatentsViewAPI()  # Uses PATENTSVIEW_API_KEY env var

# Search by title
results = api.search_by_title("quantum computing", limit=10)

# Prior art search
results = api.search_prior_art("blockchain", before_date="2020-01-01", limit=50)

# Search by assignee
results = api.search_by_assignee("IBM", start_date="2023-01-01", limit=20)

# Advanced custom query
query = {
    "_and": [
        {"_text_any": {"patent_title": "artificial intelligence"}},
        {"_gte": {"patent_date": "2020-01-01"}},
        {"assignees.assignee_organization": {"_contains": "Google"}}
    ]
}
fields = ["patent_id", "patent_title", "patent_date"]
results = api.search(query, fields=fields)
```

## Search Capabilities

### Search Types

1. **Keyword Search**
   - Title keywords
   - Abstract keywords
   - Full-text search with Boolean operators

2. **Structured Search**
   - By patent number
   - By inventor name
   - By assignee/company
   - By date range
   - By classification (CPC, USPC)

3. **Advanced Queries**
   - Combine multiple criteria with AND/OR/NOT
   - Phrase matching
   - Wildcard and substring searches
   - Citation network analysis

### Query Operators and Fields

For complete API reference including all operators and fields, see [SKILL.md](SKILL.md).

## Rate Limits

**45 requests per minute** per API key (automatically handled by helper script).

## Examples

### Example 1: Prior Art Search

Find patents related to "wireless charging" published before your invention date:

```python
api = PatentsViewAPI()
results = api.search_prior_art(
    keywords="wireless charging power transfer",
    before_date="2023-01-01",
    limit=100,
    search_abstract=True
)

print(f"Found {results['total_hits']} relevant patents")
for patent in results['patents']:
    print(f"{patent['patent_id']}: {patent['patent_title']}")
```

### Example 2: Competitive Analysis

Analyze recent patents from a competitor:

```python
api = PatentsViewAPI()
results = api.search_by_assignee(
    assignee="Apple",
    start_date="2022-01-01",
    limit=100
)

# Group by technology classification
classifications = {}
for patent in results['patents']:
    for cpc in patent.get('cpc_current', []):
        cpc_id = cpc.get('cpc_subsection_id', 'Unknown')
        classifications[cpc_id] = classifications.get(cpc_id, 0) + 1

print("Technology areas:")
for cpc, count in sorted(classifications.items(), key=lambda x: x[1], reverse=True):
    print(f"{cpc}: {count} patents")
```

### Example 3: Citation Network

Find patents that cite a specific patent:

```python
api = PatentsViewAPI()

# Find patents citing US10123456
query = {"citedby_patents.citedby_patent_number": "10123456"}
fields = [
    "patent_id",
    "patent_title",
    "patent_date",
    "assignees.assignee_organization"
]

results = api.search(query, fields=fields)
print(f"{results['total_hits']} patents cite US10123456")
```

## Best Practices

### For Prior Art Searches

1. **Cast a wide net initially**: Start with broad keyword searches
2. **Use multiple search strategies**: Keywords, classifications, citations
3. **Consider synonyms**: Include alternative terms and technical jargon
4. **Check date ranges carefully**: Ensure you're searching before your priority date
5. **Review classifications**: Identify relevant CPC codes from initial results
6. **Follow citations**: Examine backward and forward citations

### For Competitive Intelligence

1. **Search by assignee name variations**: Companies may have multiple legal entities
2. **Track over time**: Compare different time periods for trends
3. **Analyze classifications**: Understand technology focus areas
4. **Identify key inventors**: Track key technical personnel
5. **Monitor filing rates**: Increasing activity may signal strategic focus

### For Patent Landscape Analysis

1. **Define scope clearly**: Use appropriate classifications and keywords
2. **Aggregate results**: Group by assignee, year, classification
3. **Visualize trends**: Export data for charting and analysis
4. **Identify white space**: Look for under-explored areas
5. **Track evolution**: How has the technology area changed over time?

## Troubleshooting

See [PATENTSVIEW_API_SETUP.md](../../PATENTSVIEW_API_SETUP.md#troubleshooting) for common issues and solutions.

## Resources

For API documentation, testing tools, and additional resources, see [PATENTSVIEW_API_SETUP.md](../../PATENTSVIEW_API_SETUP.md#resources).

## Limitations

- **US Patents Only**: This API covers only US patent grants
- **Data Lag**: Updates may lag recent publications by a few weeks
- **Rate Limits**: 45 requests/minute may limit very large bulk operations
- **Legal Disclaimer**: Results are for research only; consult patent attorney for legal opinions

## International Patent Searches

For international patents, consider:

- **EPO Espacenet**: https://worldwide.espacenet.com/ (European patents)
- **WIPO PATENTSCOPE**: https://patentscope.wipo.int/ (International PCT applications)
- **Google Patents**: https://patents.google.com/ (worldwide coverage)

## License

This skill uses the PatentsView API, which provides data under the Creative Commons Attribution 4.0 International License.

## Support

For PatentsView API issues:
- Help Center: https://patentsview-support.atlassian.net/servicedesk/customer/portals

For Claude Code skill issues:
- Report at: https://github.com/anthropics/claude-code/issues
