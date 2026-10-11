# Phase 3 — Architecture (BMAD solutioning) · Redesign v2

**Date:** 2026-10-10 · **Branch:** `Redesign-2026` · **Supersedes:** the CRA single-page build in `070ea50`

## Why v2
v1 delivered the design tokens and verified content, but shipped as **one long scroll of static
cards**. Review verdict: it does not read as a senior portfolio. v2 rebuilds it as a multi-page,
animated site that reads like a client website.

## Decisions (all resolved — no TBD)

| # | Decision | Choice | Rationale |
|---|---|---|---|
| 1 | Framework | **Next.js 16.4.0** (App Router) | User-selected. SSR + per-page metadata = real SEO; file routing gives true multi-page. |
| 2 | React | **19.3.0** | Required peer for Next 16. |
| 3 | Styling | **Tailwind CSS 4.3.3** (`@theme`) | v4 CSS-first config; tokens live in CSS, matching the supplied rules' quick-start. |
| 4 | Animation | **Motion 14.1.0** (`motion/react`) | Successor to framer-motion. Layout animation, scroll-linked transforms, `AnimatePresence` for route transitions. |
| 5 | Smooth scroll | **Lenis 1.3.26** | Momentum scrolling is a large part of the "expensive" feel. Disabled under reduced-motion. |
| 6 | Type | **Inter + Source Serif 4** via `next/font/local` | User-selected: stay faithful to the supplied rules. Self-hosted, zero layout shift. |
| 7 | Rendering | **SSG** (fully static) | No backend. `output: 'export'`-compatible, so hosting stays trivial. |
| 8 | Data | Static TS modules in `content/` | No CMS needed for 17 records; keeps the verified-content guarantee in version control. |
| 9 | State | None global | Local component state only. No store justified. |
| 10 | Auth / DB / API | **None** | Static marketing site; explicitly out of scope. |
| 11 | Deployment | **Not performed** | Out of scope per the original brief. Build must stay deploy-ready. |
| 12 | Testing | Vitest + Testing Library | CRA's jest goes away with react-scripts; carry the content-honesty guarantees over. |

## Route map (true multi-page)

| Route | Purpose |
|---|---|
| `/` | Hero, featured work, capability strip, selected clients, CTA |
| `/work` | Full filterable index of all featured projects |
| `/work/[slug]` | **Case study per project** — the depth a senior portfolio needs |
| `/about` | Story, approach, education, stack |
| `/contact` | Direct contact routes |

`generateStaticParams` prerenders every case study. Each page exports real `metadata`.

## Information architecture per case study
Hero (name, category, year) → at-a-glance facts → the problem → what was built →
scrollable captured preview → technology rationale → prev/next navigation.

## Motion system (purposeful, not decorative)
- **Route transitions:** shared fade/rise via `AnimatePresence`, 320ms.
- **Scroll reveals:** `whileInView`, 16px rise + fade, 60ms stagger, `once: true`.
- **Hero:** word-level stagger on the headline.
- **Preview frames:** scroll-linked pan (`useScroll` + `useTransform`).
- **Magnetic CTA + marquee strip** for tactility.
- All of it gated behind `prefers-reduced-motion`, which also disables Lenis.

## Non-negotiable carry-overs from v1
Content honesty is unchanged and re-tested: no invented clients/metrics/dates/links; previews are
labelled captured screenshots, never live embeds; unrenderable projects state the reason.

## Risks
- **CRA → Next migration touches every file.** Mitigation: new `app/` tree, port components
  deliberately, delete `react-scripts` only once the Next build is green.
- **Tailwind v3 → v4 syntax break.** Mitigation: tokens re-authored in `@theme`; no v3 config file.
- **Motion bundle weight.** Mitigation: client components only where motion is needed; pages stay server components.
