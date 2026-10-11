# Diego Espinosa — Portfolio

Multi-page portfolio built with Next.js 16 (App Router), React 19, Tailwind CSS v4 and Motion.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # Vitest
npm run build   # production build (static)
```

## Routes

| Route | Purpose |
|---|---|
| `/` | Hero, technology marquee, featured work, approach, CTA |
| `/work` | Filterable index of every featured project |
| `/work/[slug]` | Case study per project (statically prerendered) |
| `/about` | Background, education, stack |
| `/contact` | Direct contact routes |

## Structure

```
app/                    App Router pages + globals.css (design tokens)
  fonts/                self-hosted Inter + Source Serif 4
components/             UI + motion primitives
content/projects.js     project records — the single source of content truth
public/projects/        captured screenshots (web + iOS simulator)
__tests__/              content-integrity and render tests
docs/redesign-2026/     discovery, PRD, architecture, inventory, screenshot map
```

## Design system

Warm-paper system: `#f6f5f4` canvas, white cards with 1px hairline borders and no shadows,
`#0075de` as the only filled button, accent hues (`#ffb110`, `#f64932`, `#62aef0`, `#02093a`)
used solely as card backgrounds. Inter with negative display tracking, Source Serif 4 for
editorial subheads. Tokens are defined in `app/globals.css` under Tailwind v4 `@theme`.

Motion — route-aware nav, word-staggered headline, scroll reveals, Lenis momentum scrolling —
is disabled wholesale under `prefers-reduced-motion`.

## Content rules

Project copy is derived from each project's own source. No clients, metrics, dates, technologies
or deployment links are asserted without evidence. Projects that could not be rendered say so
explicitly instead of showing a substitute image. Previews are captured screenshots, never live
embeds. `__tests__/content.test.js` enforces these rules.
