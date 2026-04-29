# Patent Search Skill - Usage Examples

This document provides practical examples of using the Patent Search skill in Claude Code.

## Quick Start

Once the skill is installed in your project (`.claude/skills/patent-search/`), simply ask Claude to help with patent searches. The skill will be automatically invoked.

## Example Conversations

### Example 1: Basic Prior Art Search

**User:** "I'm working on an invention related to using AI for medical diagnosis. Can you search for relevant prior art patents from before 2023?"

**Claude will:**
1. Activate the patent-search skill
2. Construct a query searching for patents about AI medical diagnosis
3. Filter for patents granted before 2023-01-01
4. Return formatted results with patent numbers, titles, dates, and links

### Example 2: Competitive Intelligence

**User:** "What has Apple patented related to augmented reality in the last 2 years?"

**Claude will:**
1. Search for patents assigned to Apple
2. Filter for AR-related keywords
3. Limit results to 2022-present
4. Present findings with technology classification analysis

### Example 3: Inventor Research

**User:** "Find patents by inventor Jane Smith in the field of biotechnology"

**Claude will:**
1. Search by inventor name "Jane Smith"
2. Filter for biotech-related classifications or keywords
3. Present chronological list of patents
4. Offer to analyze trends or specific patents

### Example 4: Technology Landscape Analysis

**User:** "I want to understand the patent landscape for quantum computing"

**Claude will:**
1. Search for quantum computing patents
2. Aggregate by top assignees/companies
3. Show technology trends over time
4. Identify key patents and recent developments

### Example 5: Citation Network Analysis

**User:** "Find patents that cite US patent 10123456"

**Claude will:**
1. Search for patents citing the specified patent
2. Present citing patents with context
3. Offer to analyze the citation network further

## Using the Helper Script Directly

You can also use the Python helper script independently:

### Basic Search

```bash
# Set your API key
export PATENTSVIEW_API_KEY="your_key_here"

# Run example searches
python .claude/skills/patent-search/patent_search.py
```

### Custom Search Script

Create your own search script:

```python
#!/usr/bin/env python3
import sys
sys.path.append('.claude/skills/patent-search')
from patent_search import PatentsViewAPI, format_patent

# Initialize
api = PatentsViewAPI()

# Search for AI-related patents from Google
results = api.search_by_assignee("Google", start_date="2023-01-01", limit=10)

print(f"Found {results['total_hits']} total patents\n")

for patent in results['patents']:
    # Check if title contains AI-related terms
    title = patent.get('patent_title', '').lower()
    if any(term in title for term in ['artificial intelligence', 'machine learning', 'neural', 'ai']):
        print(format_patent(patent))
```

### Advanced Query Example

```python
#!/usr/bin/env python3
import sys
sys.path.append('.claude/skills/patent-search')
from patent_search import PatentsViewAPI

api = PatentsViewAPI()

# Complex prior art search
query = {
    "_and": [
        {
            "_or": [
                {"_text_phrase": {"patent_title": "wireless power"}},
                {"_text_all": {"patent_abstract": "wireless charging inductive"}}
            ]
        },
        {"_lt": {"patent_date": "2023-01-01"}},
        {"patent_type": "utility"},
        {
            "_not": {
                "assignees.assignee_organization": {"_contains": "University"}
            }
        }
    ]
}

fields = [
    "patent_id",
    "patent_title",
    "patent_abstract",
    "patent_date",
    "inventors.inventor_name_last",
    "assignees.assignee_organization",
    "cpc_current.cpc_group_id",
    "patent_num_claims"
]

sort = [{"patent_date": "desc"}]

results = api.search(query, fields=fields, sort=sort, options={"size": 50})

print(f"Found {results['total_hits']} patents matching criteria")
print(f"Showing top {results['count']} results:\n")

for patent in results['patents']:
    print(f"US{patent['patent_id']}")
    print(f"  {patent['patent_title']}")
    print(f"  Date: {patent['patent_date']}")
    print(f"  Claims: {patent.get('patent_num_claims', 'N/A')}")

    assignees = [a.get('assignee_organization') for a in patent.get('assignees', [])
                 if a.get('assignee_organization')]
    if assignees:
        print(f"  Assignee: {assignees[0]}")

    print(f"  https://patents.google.com/patent/US{patent['patent_id']}\n")
```

### Batch Processing Example

```python
#!/usr/bin/env python3
import sys
import csv
sys.path.append('.claude/skills/patent-search')
from patent_search import PatentsViewAPI

api = PatentsViewAPI()

# Get all patents from a company in a specific year
all_patents = api.get_all_pages(
    query={
        "_and": [
            {"assignees.assignee_organization": {"_contains": "Tesla"}},
            {"_gte": {"patent_date": "2023-01-01"}},
            {"_lte": {"patent_date": "2023-12-31"}}
        ]
    },
    fields=["patent_id", "patent_title", "patent_date", "cpc_current.cpc_subsection_id"],
    sort=[{"patent_date": "desc"}],
    max_results=500
)

# Export to CSV
with open('tesla_2023_patents.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=['Patent ID', 'Title', 'Date', 'CPC Codes'])
    writer.writeheader()

    for patent in all_patents:
        cpc_codes = set()
        for cpc in patent.get('cpc_current', []):
            if cpc.get('cpc_subsection_id'):
                cpc_codes.add(cpc['cpc_subsection_id'])

        writer.writerow({
            'Patent ID': f"US{patent['patent_id']}",
            'Title': patent['patent_title'],
            'Date': patent['patent_date'],
            'CPC Codes': ', '.join(sorted(cpc_codes))
        })

print(f"Exported {len(all_patents)} patents to tesla_2023_patents.csv")
```

## Common Query Patterns

### Prior Art Before Date

```python
results = api.search_prior_art(
    keywords="blockchain distributed ledger",
    before_date="2020-01-01",
    limit=100,
    search_abstract=True
)
```

### Recent Patents by Company

```python
results = api.search_by_assignee(
    assignee="Microsoft",
    start_date="2023-01-01",
    limit=100
)
```

### Patents in Date Range with Keywords

```python
query = {
    "_and": [
        {"_text_any": {"patent_title": "autonomous vehicle"}},
        {"_gte": {"patent_date": "2020-01-01"}},
        {"_lte": {"patent_date": "2023-12-31"}}
    ]
}
results = api.search(query)
```

### Patents by CPC Classification

```python
query = {
    "_and": [
        {"cpc_current.cpc_section_id": "H"},
        {"cpc_current.cpc_subsection_id": "H04L"},  # Transmission of digital information
        {"_gte": {"patent_date": "2022-01-01"}}
    ]
}
results = api.search(query)
```

### Patents with Many Claims (Complex Inventions)

```python
query = {
    "_and": [
        {"_gte": {"patent_num_claims": 20}},
        {"_text_any": {"patent_title": "semiconductor"}},
        {"_gte": {"patent_date": "2020-01-01"}}
    ]
}
results = api.search(query)
```

## Tips for Effective Searches

1. **Start broad, then narrow**: Begin with general keywords, analyze results, then add filters

2. **Use multiple search terms**: Include synonyms and related terms with `_text_any`

3. **Combine search strategies**: Mix keyword search with classifications and date ranges

4. **Check both title and abstract**: Abstract searches find more results but may be less precise

5. **Use classifications for precision**: CPC codes are more accurate for technology areas

6. **Respect rate limits**: The script handles this automatically, but be patient with large batches

7. **Export for analysis**: Save results to CSV for further processing in Excel or other tools

8. **Follow citation chains**: Important patents often cite or are cited by other important patents

9. **Track trends over time**: Search by year to see how a technology area has evolved

10. **Verify critical findings**: Always review full patent documents for important prior art

## Troubleshooting

### "API key not found"

```bash
# Make sure the environment variable is set
export PATENTSVIEW_API_KEY="your_actual_key"

# Verify it's set
echo $PATENTSVIEW_API_KEY
```

### "Rate limit exceeded"

The script automatically handles rate limiting, but if you're making many requests:
- Wait 60 seconds between batches
- Reduce the `limit` parameter to make fewer total requests
- The script will automatically pace requests at 45/minute

### "No results found"

- Try broader keywords
- Use `_text_any` instead of `_text_all`
- Remove some filters (date range, assignee, etc.)
- Search in abstract as well as title
- Check spelling of technical terms

### "Invalid query syntax"

- Verify JSON structure is correct
- Check that field names match API documentation
- Ensure dates are in YYYY-MM-DD format
- Make sure quotes and braces are balanced

## Additional Resources

- **Skill Documentation**: See SKILL.md for comprehensive API reference
- **API Docs**: https://search.patentsview.org/docs/
- **Interactive Testing**: https://search.patentsview.org/swagger-ui/
- **CPC Codes**: https://www.cooperativepatentclassification.org/
- **Google Patents**: https://patents.google.com/ (for viewing full patent documents)
