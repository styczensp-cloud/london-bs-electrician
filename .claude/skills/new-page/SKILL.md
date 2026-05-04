---
name: londonbs-new-page
description: Scaffold a new service page or guide article on the London BS Ltd Astro site (londonbs.uk). Use this skill whenever the user asks to add a new page, create a new service description, write a new guide, target a new keyword cluster, expand the site structure, or build out a new section of londonbs.uk. Trigger even when the request is casual — e.g. "let's add a page on smoke alarm testing" or "we need something for EV chargers" — those are page-creation requests.
---

# London BS — New Page Scaffold

Add a new page to londonbs.uk by writing data into the right JSON files and slotting it into the cluster structure. The site is static Astro — pages are generated from data, so you do not create new `.astro` files unless the page needs a layout that doesn't yet exist.

## Decide page type first

Two clusters exist:

- **Service** — a thing the company does for money. EICRs, rewires, consumer unit changes, EV charger installs. Schema type: `Service`. Typically lives under `/services/[slug]` or similar (confirm in `clusters.json`).
- **Guide** — informational article. "What is an EICR?", "How much does a rewire cost?". Schema type: `Article`. Usually under `/guides/[slug]` or `/blog/[slug]`.

If the topic is ambiguous (e.g. "smart home wiring") ask the user which cluster it belongs in. Service pages and guides have different intent and shouldn't be mashed together.

## Inputs to gather before writing

Get these from the user (or infer from context, then confirm):

1. **Topic / target keyword** — the head term (e.g. "EV charger installation Dunstable")
2. **Cluster** — service or guide
3. **Slug** — kebab-case, no stopwords, ≤ 4 words ideal (e.g. `ev-charger-installation`)
4. **Primary user intent** — what does someone searching this actually want? (price, "what is", "how to find", booking)
5. **Any existing GSC data** — if there's a candidate query backing this page, use it to anchor title/meta

If the user hasn't given enough, ask. Don't guess slug — slugs are sticky.

## File layout (read project's CLAUDE.md for exact field names)

You will typically touch three files:

| File | What changes |
|---|---|
| `pages.json` | New page metadata entry (slug, title, meta, h1, schema type) |
| `services.json` or `guides.json` | The body content, FAQs, structured sections |
| `clusters.json` | Add the new page to the relevant cluster, define its internal links |

**Read each file before editing.** The exact field names belong to Lech's data model and may not match what you assume.

## Required fields per page type

### Service page minimum

- `slug`
- `title` (50–60 chars, leads with the service, ends with "London BS" or location)
- `metaDescription` (140–160 chars)
- `h1` (distinct from title where possible)
- Schema fields: `name`, `description`, `provider` (references `site.json` LocalBusiness), `areaServed`
- Body content: intro, what's included, process/standards, pricing notes, CTA
- FAQs (3–6 entries, fed into FAQPage schema)
- Breadcrumb data (Home → Services → [Service Name])

### Guide page minimum

- `slug`
- `title` (50–60 chars, leads with the question or topic)
- `metaDescription` (140–160 chars)
- `h1`
- Schema fields: `headline`, `author` (Lukasz Gryko or London BS Ltd), `datePublished`, `dateModified`, `publisher`
- Body: intro answering the query directly in the first 150 words, then sections, then summary
- FAQs (optional, only if it earns its place)
- Breadcrumb data (Home → Guides → [Guide Title])

## Writing the content

### Voice and structure

- Direct, trade-professional. Same rules as `londonbs-content-edit`.
- British English, BS 7671 referenced where relevant, NICEIC mentioned where it adds credibility.
- Service pages: lead with what the customer gets, finish with the standard. Avoid "we are passionate about…" filler.
- Guide pages: answer the user's question in the first paragraph. Don't bury the lede with definitions.

### Heading structure

- One H1 (the page title or close variant)
- H2s for major sections — make them scannable, ideally include long-tail variations of the topic
- H3s for sub-points
- No skipped levels

### Internal linking obligations

A new page must link out to and be linked from:

- Its **parent cluster page** (e.g. a new EV charger page links from `/services` index)
- At least **one related service or guide** in the same cluster
- The **contact / booking page** (CTA)
- Where natural, **one cross-cluster link** (e.g. EV charger service → consumer unit guide)

Add the new page slug to `clusters.json` so the cluster index picks it up automatically.

## Step-by-step workflow

1. **Confirm inputs** with the user — topic, cluster, slug.
2. **Read** `clusters.json`, `pages.json`, and the relevant cluster data file. Note current naming conventions and field shapes.
3. **Draft the page metadata** entry for `pages.json`. Show it to the user before writing.
4. **Draft the body content** for the cluster file. Show it to the user before writing.
5. **Update `clusters.json`** to register the new page and define internal links.
6. **Validate JSON** (`node -e "JSON.parse(...)"` if shell available).
7. **Run `npm run build` if Lech asks** — but don't push, don't deploy.
8. **Hand back a summary**: which files changed, what the new URL will be, what to check after the next deploy (e.g. "search 'site:londonbs.uk new-slug' once Cloudflare picks it up").

## Schema markup checklist

Before declaring done, confirm the page will emit:

- [ ] `BreadcrumbList` (always)
- [ ] `Service` *or* `Article` (depending on type)
- [ ] `FAQPage` if FAQs were added (3+ entries minimum to be worth it)
- [ ] No duplicate `@id` values across the site
- [ ] All `url` fields use `https://londonbs.uk/` as the base

If schema is generated by an Astro component rather than written by hand into JSON, just confirm the data fields the component reads are populated.

## Anti-patterns to avoid

- **Don't create a page that competes with an existing one.** Search `pages.json` for similar slugs/topics first. If something close exists, propose extending it instead. Cannibalisation later is harder to fix than refusing to ship now.
- **Don't ship a thin page.** Service: ≥ 400 words of substantive content. Guide: ≥ 800 words. If the topic genuinely doesn't warrant that, it might belong as an FAQ on an existing page, not a new URL.
- **Don't fabricate certifications, response times, or guarantees** that the user hasn't confirmed.
- **Don't invent prices.** If the user wants pricing on the page, ask for the figures or write it as "from £X" / "ask for a quote".
- **Don't skip the cluster registration.** A page that exists in `pages.json` but not `clusters.json` becomes an orphan — bad for both UX and SEO.

## After shipping

The page won't appear live until Lech runs `npm run build`, commits, and pushes. Cloudflare Pages auto-deploys from `main`.

Once live:
- Submit the URL to GSC for indexing
- Watch for the page in GSC over the next 2–4 weeks
- Re-run the `londonbs-seo-from-gsc` skill against the next export to see how it performs

These are user actions, not skill actions. Mention them in the handoff but don't try to automate them.
