---
name: londonbs-seo-from-gsc
description: Drive SEO improvements on londonbs.uk from Google Search Console data. Use this skill whenever the user uploads, pastes, or references a GSC CSV/export, mentions Search Console, talks about CTR, impressions, positions, ranking, query data, keyword opportunities, page cannibalisation, striking-distance keywords, or wants to iterate SEO on the londonbs.uk site based on real query data. Trigger even if the user just says "here's the GSC export" or "what should we fix from this query data" — those count.
---

# London BS — SEO Iteration from GSC

Take a Google Search Console export and turn it into specific, applied edits to the londonbs.uk data layer. The output is JSON file changes, not a slide deck.

## Operating principle

GSC data tells you what queries people are *already finding the site for*. The cheapest wins come from helping pages already in the top 20 rank better, not from chasing new keywords. Prioritise in this order:

1. **Cannibalisation fixes** — multiple URLs competing for the same query
2. **Striking-distance queries** — positions 4–15 with meaningful impressions
3. **CTR diagnostics** — top-3 positions with abnormally low CTR (title/meta problem)
4. **Content gaps** — high-impression queries with no well-matched landing page

This mirrors what worked for leicester-spark.co.uk. Don't reinvent the framework.

## Expected GSC export format

User typically provides one of:

- **Queries export** — columns: Query, Clicks, Impressions, CTR, Position
- **Pages export** — columns: Page, Clicks, Impressions, CTR, Position
- **Query × Page export** — both joined (most useful)

Ask which one if it's ambiguous. If they only have one, ask for the other for cannibalisation work.

## Step-by-step

### 1. Read the data

Load the CSV. Note the date range (usually the filename or a row above the header). State the date range back to the user so they confirm it's the period they meant.

If the file lives in `/mnt/user-data/uploads/`, read it from there. If pasted inline, parse from the message.

### 2. Sanity pass

Before analysis, check:

- Total clicks and impressions for the period
- Number of unique queries and pages
- Any obviously branded queries (e.g. "london bs", "lukasz gryko") — separate these from non-brand traffic, brand queries skew CTR averages

### 3. Cannibalisation detection (Query × Page only)

Group by query. For each query with ≥ 2 URLs receiving impressions:

- If both pages have meaningful clicks → **real cannibalisation**, propose consolidation or differentiation
- If one page dominates and the other gets <5% of clicks → **noise**, ignore
- If neither ranks well (avg position > 20) → **weak relevance**, suggest content rework

Output cannibalisation findings as a small table: query, competing URLs, current positions, recommendation (consolidate / differentiate / leave).

For londonbs.uk this matters most for queries like "electrician dunstable", "EICR cost", "consumer unit replacement" — where service and guide cluster pages can compete.

### 4. Striking-distance opportunities

Filter for: position between 4 and 15, impressions ≥ 30 (adjust threshold to dataset size), CTR below the position-expected baseline.

Rough CTR baselines to compare against:
- Position 1: ~28%
- Position 2: ~15%
- Position 3: ~10%
- Position 4–6: ~6–4%
- Position 7–10: ~3–2%
- Position 11–20: ~1–0.5%

For each striking-distance query, identify which existing page targets it (or should) and propose a specific edit:

- Title tag tightening (move query closer to start, remove filler)
- Meta description rewrite (include the query verbatim if natural)
- H1 change (if it doesn't include the head term)
- Body content reinforcement (add a section answering the query directly)
- New FAQ entry on the relevant page

### 5. CTR diagnostics for top-ranked pages

For queries at position 1–3 with CTR below baseline:

- Pull the current title and meta description from `pages.json`
- Check whether they read like an answer to the query
- Propose rewrites that lead with the answer, not the brand

### 6. Content gaps (Query export only or combined)

Queries with high impressions but no obvious matching page → potential new page candidates.

Don't create pages from this skill. Instead, hand off: list the candidate queries with their volume, and tell the user "these look like new-page candidates — run `londonbs-new-page` to scaffold one."

## Output format

When the analysis is done, present findings in this shape:

```
## Period: [dates from CSV]
## Headline: [one-line summary, e.g. "EICR cluster cannibalising; 4 striking-distance wins on the consumer unit page"]

### 1. Cannibalisation
- [query] — [URLs] — recommendation: [consolidate/differentiate]
  → planned edit: [specific JSON change]

### 2. Striking-distance wins
- [query] (pos X, CTR Y%, vs baseline Z%) on [page]
  → planned edit: [specific JSON change]

### 3. CTR fixes
- [query] (pos X, CTR Y%) on [page]
  → planned edit: [specific JSON change]

### 4. New page candidates (no edit, hand off)
- [query] — [impressions]
```

Then **ask before applying**. Don't batch-edit a dozen pages without confirmation. Lech wants to see the plan first, especially for cannibalisation calls — those affect URL structure and need his judgement.

## Applying the edits

Once Lech approves a subset:

1. Hand off to the `londonbs-content-edit` skill workflow for each edit (read the JSON file, change only the targeted fields, validate JSON, preserve schema).
2. Group edits by file when possible — touching `pages.json` once with three changes beats three separate touches.
3. Keep a short changelog at the end of the response: "Edited: pages.json (3), services.json (1)."

## What this skill does NOT do

- Run any command on the user's machine (no `npm run build`, no `git push`)
- Pull live GSC data via API (always works from the export the user provides)
- Decide on URL structure changes unilaterally — those are escalations, not edits
- Touch component files or `.astro` templates — data layer only

## Lessons baked in from Leicester Spark

These came up on leicester-spark.co.uk and are worth carrying forward:

- **EICR / landlord safety / commercial EICR pages cannibalise easily** — same pattern likely for londonbs.uk if the cluster grows. Flag any sign of this early.
- **Cost-related queries ("EICR cost", "rewire cost") punch above their weight** — they're high commercial intent. If the data shows them, prioritise.
- **Title length matters more than meta length** — most CTR fixes come from the title, not the description.
- **PAT testing is low priority** — don't suggest building it out unless the data demands it.
- **"Electrician [city]" head terms are hard** — striking-distance wins on long-tails are more achievable than fighting for the head term directly.
