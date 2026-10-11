# Phase 2/3 — PRD + UX/Architecture (BMAD Method, brownfield)

**Track:** BMad Method (brownfield, UI-heavy, multi-feature) — per `scale-adaptive-system.md`.
Quick Flow was rejected: this is a full redesign plus a new data layer and a new preview component.

## Problem
The portfolio shows **2 rendering projects** out of **62 substantiated** on disk, in a dark theme that
is being replaced. The work is far stronger than its presentation.

## Goals
1. Re-skin the entire site to the supplied **Notion "warm paper notebook"** design system.
2. Grow the showcase from 2 → **17 featured** projects, each with verified copy.
3. Give every renderable project a **real screenshot** inside a browser/device frame that scrolls.
4. Keep every verified fact from the old site; invent nothing.
5. Leave the strict (`CI=true`) build passing.

## Non-goals
Deploying, merging to `main`, changing the default branch, or publishing anything.

## Design system — source of truth
The supplied MD rules are implemented verbatim as CSS custom properties + Tailwind theme extension.

| Decision | Value | Rule followed |
|---|---|---|
| Page canvas | `#f6f5f4` | Never pure white as page bg |
| Card surface | `#ffffff`, 12px radius, 1px `rgba(0,0,0,.08)` | Hairline borders, **no shadows** on content cards |
| Primary action | `#0075de` — the only filled button | One chromatic button per view |
| Accent cards | `#ffb110`, `#f64932`, `#62aef0`, `#02093a` | Color variety lives in card backgrounds |
| Text hierarchy | `#000` at 100/95/60/40% alpha + `#615d59` body | Build hierarchy with alpha, not new hues |
| Display type | Inter, negative tracking (−4.6px@96, −2px@72, −1.9px@54) | Tight, confident headlines |
| Editorial serif | Source Serif Pro @18px, sparingly | Lyon Text substitute; never for UI labels |
| Motion | 200ms ease hovers; spring only for character marks | |
| Shapes | 12px cards · 8px buttons · 9999px pills only | No other radii, **no gradients** |

**Fonts:** Inter + Source Serif Pro, self-hosted via `@fontsource` (no external CSS request, and the
rules only permit Google Fonts for stylesheets — self-hosting keeps it offline-safe).

## Information architecture
Nav (sticky, 64px) → **Hero** (character marks, highlight-pill headline, dual CTA)
→ **Tech wall** (logos as typography, greyscale)
→ **Work** (17 projects, filterable by category, each in a scrollable frame)
→ **Approach** (accent feature blocks)
→ **Education** → **Contact/footer**.

## Key component: `ProjectFrame`
A browser chrome (traffic lights + URL bar) or phone bezel wrapping a captured PNG.
- The image scrolls **inside** the frame — on hover (desktop, `requestAnimationFrame`) and by
  touch/drag + native scroll (mobile), so it reads as an interactive preview.
- Honest by construction: labelled "Captured preview", `alt` text says it is a screenshot,
  and nothing claims to be a live embed of the original site.
- `prefers-reduced-motion` disables the auto-scroll.

## Data model
`src/data/projects.js` — one record per project, generated from the verified inventory.
Fields: slug, name, category, summary, description, technologies[], screenshots{desktop,mobile},
frame type, and `links` (only when verified — otherwise omitted entirely).

## Risks
- **Screenshot fidelity:** apps needing real credentials render partially. Mitigation: capture public
  marketing surfaces; where a project cannot render, state the limitation rather than fake an image.
- **Repo weight:** 2x-DPI full-page PNGs are large. Mitigation: downscale to ≤1600px wide, strip to 8-bit.
