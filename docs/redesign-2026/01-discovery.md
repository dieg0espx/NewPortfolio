# Phase 1 — Discovery (BMAD: document-project)

**Date:** 2026-10-10 · **Branch:** `Redesign-2026`

## Access verified
| Resource | Status |
|---|---|
| ComCreate disk | Mounted, readable: `/Volumes/Comcreate` (932Gi, 104 entries) |
| Portfolio repo | `/Users/diego/Desktop/NewPortfolio`, clean on `main`, remote `github.com/dieg0espx/NewPortfolio` |
| BMAD install | `/Users/diego/bmad` (v6.0.0-alpha.7, bmm + core modules) |
| Playwright/Chromium | `chromium-1194` in ms-playwright cache — screenshot capture verified working |

## Existing portfolio — as-built audit
- **Stack:** Create React App 5 + React 19, Tailwind 3, framer-motion, react-slick, styled-components.
- **Theme:** dark (`bg-black`), accent `#794FFF`, dot-pattern backgrounds, mask-gradient fades.
- **Structure:** `App.js` → `Header` + `Container1..4`. Projects live in `components/Projects/Project1..3.js`.
- **Projects shown:** 3 (Project1 "Advici" is imported but commented out, so only 2 render).
- **Baseline build:** `npx react-scripts build` → **exit 0, "Compiled with warnings"**.
  With `CI=true` it **fails**, because CRA promotes lint warnings to errors. Pre-existing warnings:
  unused vars, `react-hooks/exhaustive-deps`, `eqeqeq`, and many `jsx-a11y/alt-text`.
  → The redesign must clear these so the strict build passes.

### Content preserved from the existing site (verified, carried into the redesign)
- Identity: **Diego Espinosa**; GitHub `dieg0espx`, LinkedIn `devDiegoE`, email `espinosa9mx@gmail.com`.
- Headline: "Your vision, my code, our success" · eyebrow "MORE THAN A PROGRAMMER".
- Education: **Web & Mobile App Development**, Cornerstone International Community College of Canada,
  Vancouver — graduated 09/2021. Udemy coursework (JavaScript, SEO, React).
- Section themes: "Turning Visions Into Reality", "Bridging Theory & Practice".
- Tech logo wall: HTML, CSS, JS, React, Node, PHP, Python, MySQL, Firebase, Supabase, Swift, WordPress.
- Existing project imagery under `src/images/` is retained in the repo.

## Disk discovery method
Four discovery agents ran over **disjoint** slices of `/Volumes/Comcreate` against a shared contract
(`INVENTORY-SPEC.md`): purpose from README/metadata/source only, technologies only where evidenced in
`package.json`/config/imports, duplicates resolved by git recency + completeness, and `unknown` wherever
a fact could not be substantiated. Agent claims were spot-checked by the orchestrator rather than trusted.

## Results
- **94** candidate directories inventoried (full records in `inventory-merged.json`).
- **62** substantiated as real, distinct, presentable projects.
- **32** excluded: duplicates/clones, empty dirs, UI-less scrapers/CLIs, thin stubs, template collections.
- **17** curated as **featured** (`featured.json`).

### Duplicates resolved (canonical ← superseded)
- `new-bnc-builders` ← `bnc-builders` (356 vs 61 commits)
- `ATP-ECommerce-Final` ← `atp-ecommerce` (163 vs 7 commits)
- `AllLevelsAthletics-website` ← `all-levels-athletics` (identical HEAD)
- `9-pine-tree-road` ← `9-pine-tree-road-clone` (clone is an untouched CNA stub)
- `comcreate-svelte` ← `Comcreate-site`, `comcreate-new`
- `Firaeli-client` ← `firaeli` · `key-real-estate` ← `keyswag-website`
- `Scenic-Doors` ← `ScenicPricingApp-main`, `scenic-pricing-local`
- `rs-surf-co-theme` ← `RS-SURF`, `RS-SURF-NewDesign`, `RsSurf`
- `SanDiego-ClassicCarDetail` ← `SanDiegoClassicCarDetail`

### Excluded for confidentiality / consent (not a quality judgement)
- `teqneeq-engagement` — unreleased, under deploy freeze.
- `chatham-motel-context`, `nova1-supplements-context` — client context repos.
- `ai-audit-dashboard` — featured, but only **mock** audit data may be shown; real client audits excluded.

### Security note (checked, not an issue)
`BNC-ReactNative/AuthKey_*.p8` exists on disk but is **gitignored and untracked** — verified via
`git check-ignore` / `git ls-files`. No key is committed, and no secret is copied into this portfolio.

## Unverifiable / limitations
- Live deployment URLs are **not** asserted anywhere. READMEs mention domains; these were not probed, so
  no project claims a live link it cannot prove.
- Many ComCreate repos share a `2026-06-11` bulk-commit date, so recency alone does not rank activity.
- Shopify themes (`bahamii-theme`, `rs-surf-co-theme`) cannot be rendered locally without a store.
- Native apps (`bnc-mobile`, `campalegria-admin-mobile`) need a simulator build; not rendered here.
- `agent-dashboard` is an Electron desktop app, not a browser target.
