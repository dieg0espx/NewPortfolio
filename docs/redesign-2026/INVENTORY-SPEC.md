# Shared Inventory Spec — Redesign 2026 Discovery

All discovery agents MUST follow this contract. Output is consumed by the portfolio build.

## Verification rules (non-negotiable)
- NEVER infer purpose, stack, or completeness from the folder name alone.
- Purpose must come from README, page copy, metadata (title/description), or source code.
- Technologies must be evidenced in package.json / lockfiles / config / imports. No guessing.
- If something cannot be substantiated, write `unknown` — never invent clients, metrics, dates, or live URLs.
- Exclude: build outputs (dist/.next/build), node_modules, dependency copies, empty dirs,
  pure scrapers with no UI (note them but mark include=false), and duplicate/clone folders
  (identify which is canonical by git log recency + completeness).

## Required fields per project (one JSON object per project)
```json
{
  "slug": "kebab-case-id",
  "name": "Verified display name",
  "source_path": "/Volumes/Comcreate/<dir>",
  "type": "web-site | dashboard | ecommerce | mobile-app | tool | prototype",
  "purpose": "1-2 sentences, VERIFIED from source",
  "evidence": "where purpose came from: README path, metadata title, component file",
  "technologies": ["only what is evidenced"],
  "run_command": "npm run dev / unknown",
  "framework": "next | vite-react | astro | react-native | cra | static | unknown",
  "port_hint": 3000,
  "renderable": true,
  "blocker": "if not renderable, exact reason",
  "git_last_commit": "YYYY-MM-DD or unknown",
  "quality_signal": "has tests / rich feature set / thin stub / clone-of-X",
  "include_recommendation": true,
  "include_reason": "why it does or does not belong in a portfolio"
}
```

## How to verify cheaply
- `cat package.json` → name, deps, scripts, framework
- `head -40 README.md` → purpose
- `git -C <dir> log -1 --date=short --format=%ad` → recency
- Next.js: `app/layout.tsx|js` or `pages/_app` metadata title/description → real purpose
- Vite/CRA: `index.html` <title>, `src/App` routes
- Astro: `src/pages/index.astro`
- React Native: `app.json` name, `App.tsx`
- Count routes/pages to judge depth: `find app src -name "page.*" -o -name "*.astro" | wc -l`

## Output
Write ONLY a JSON array to the exact path given in your prompt. No prose, no markdown fences.
