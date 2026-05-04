---
name: londonbs-content-edit
description: Edit content for London BS Ltd's Astro website (londonbs.uk). Use this skill whenever the user asks to update copy, change service descriptions, fix wording, edit FAQs, modify metadata, adjust titles or meta descriptions, change CTAs, rewrite intros, or make any text edit on the londonbs.uk site — even when they only say things like "update the X page", "tweak the Y wording", "the EICR copy reads weak", or "change what we say about Z". Trigger on any content-touching request that targets this repo, even if the user does not mention SEO or schema explicitly.
---

# London BS — Content Edit

Edit the content layer of londonbs.uk safely and consistently. The site is an Astro 4 static build that pulls all body copy, metadata, and schema content from JSON data files. Almost every edit Lech asks for is a JSON edit, not an HTML/component edit.

## Business context (don't get this wrong)

- **Trading name:** London BS Ltd
- **Managing director:** Lukasz Gryko
- **Registration:** NICEIC registered electrical contractor
- **Base:** Dunstable
- **Service area:** London and surrounding (the company is named for London but operates from Dunstable — never imply a London office)
- **Standards:** All work to BS 7671. Treat this as a hard constraint when describing services.

If anything in a draft contradicts the above, fix it before saving.

## Tech stack

- **Framework:** Astro 4 (static output)
- **Data layer:** JSON files under `src/data/` (see project root `CLAUDE.md` for exact field schemas — read it before editing if you have not seen the file structure this session)
- **Schema markup:** JSON-LD generated from data — `LocalBusiness`, `Service`, `BreadcrumbList`, `FAQPage`, `Article`
- **Brand colour:** `#A07850` (warm brown/tan) — used in UI tokens, not in copy edits
- **Hosting:** Cloudflare Pages, auto-deploys on push to `main`

## Where content actually lives

Read `src/data/` first if you don't already know the layout. Typical files:

| File | What it holds |
|---|---|
| `site.json` | Global business info (name, address, phone, opening hours, LocalBusiness schema fields) |
| `pages.json` | Page-level metadata: slug, title, meta description, hero copy, schema type |
| `clusters.json` | Topic clusters that group related pages and define internal linking |
| `services.json` (or similar) | Service-specific bodies, FAQs, pricing notes |
| `guides.json` (or similar) | Long-form articles |

**Always read the actual file before assuming field names.** Lech iterates on the data shape; the project's `CLAUDE.md` is the source of truth.

## Editing workflow

1. **Read the relevant JSON file in full** before editing. Skim the whole structure so you don't break a sibling field.
2. **Make the smallest precise edit** that solves the request. Don't rewrite paragraphs the user didn't ask about.
3. **Preserve schema integrity:**
   - Don't break `@type`, `@id`, `@context`, or any URL field.
   - If you change a page title, also check whether `pages.json` references that title in breadcrumb or schema fields elsewhere.
   - FAQs feed `FAQPage` schema — keep the question/answer structure intact.
4. **Preserve internal links.** If a page slug changes, search the repo for references and update them. Cluster files often hard-code slugs.
5. **Keep meta lengths sane:**
   - Title tags: 50–60 chars
   - Meta descriptions: 140–160 chars
   - H1: one per page, distinct from title tag where possible
6. **Don't deploy.** End the task at the file edit. Lech runs `npm run build` and pushes himself.

## Voice and tone

- Direct, trade-professional. No marketing fluff, no "passionate about excellence" filler.
- Active voice. Concrete nouns (RCBO, consumer unit, EICR, BS 7671) over vague ones ("electrical solutions").
- British English: spelling (organise, colour), units (mm², metres), £ pricing.
- Plain dates and numbers. "Same-day callout" beats "rapid response solutions".
- When describing services, lead with what the customer gets and end with the standard or certification it conforms to.

## Common edits and how to handle them

**"Tweak the wording on the EICR page"**
→ Open `services.json` (or wherever EICR lives), find the relevant block, edit only the prose fields. Don't touch FAQ structure unless asked.

**"Change the meta description on /landlord-electrical-safety"**
→ `pages.json`, find the page by slug, edit `metaDescription` only. Confirm new length is 140–160 chars.

**"Add an FAQ about EV charger installation"**
→ Find the relevant page's FAQ array, append a `{question, answer}` object. Don't reorder existing FAQs unless asked.

**"Update the phone number / address"**
→ `site.json`. Then grep the repo for the old value to catch any hardcoded references in components.

**"The H1 on the consumer unit page is weak"**
→ `pages.json`, edit `h1`. Check it still differs from the page `title` to avoid duplication.

## Post-edit checklist

Before reporting done, confirm:

- [ ] JSON parses (no trailing commas, balanced braces). If you have shell access, `node -e "JSON.parse(require('fs').readFileSync('path/to/file.json','utf8'))"` validates fast.
- [ ] No schema-required field was removed.
- [ ] Internal slug references still resolve.
- [ ] Meta title/description within length budget.
- [ ] British English throughout the edited block.
- [ ] No mention of a "London office" or anything that contradicts the Dunstable base.

## What this skill does NOT cover

- **New pages from scratch** → use `londonbs-new-page` skill
- **SEO iteration from GSC data** → use `londonbs-seo-from-gsc` skill
- **Component / template / styling changes** → that's `.astro` file edits, not data edits; handle directly without this skill
- **Deployment** → user-driven, never auto-push

## Quick reference: red flags to flag back to Lech

If a requested edit would:

- Remove an existing schema-required field
- Break an internal link without obvious replacement
- Introduce a claim that needs a citation (e.g. response time guarantees, statistics)
- Contradict NICEIC scope or BS 7671

…stop and ask before writing. Better to confirm than redo.
