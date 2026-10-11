# v2 Verification Record

**Branch:** `Redesign-2026` · **Stack:** Next.js 16.4.0 / React 19.3.0 / Tailwind v4.3.3 / Motion 14.1.0

## Checks run

| Check | Result |
|---|---|
| `next build` | Compiled successfully; 24 pages (18 case studies prerendered via `generateStaticParams`) |
| `npm test` (Vitest) | 15/15 passing |
| Routes | `/`, `/work`, `/work/[slug]`, `/about`, `/contact` all 200; unknown path 404 |
| Console / page errors | None on any real page |
| Failed network requests | None on any real page |
| Broken images | 0 of 32 referenced screenshots |
| Horizontal overflow | None at 1440 / 768 / 390px |
| Elements stuck at `opacity: 0` | 0 (was 7 before the reveal fix) |
| Heading structure | One `h1` per page, no level skips |
| Image alt text | Every image has `alt` |
| Accessible names | Every button and link named |

## Content metrics

| Metric | v1 | v2 |
|---|---|---|
| Pages | 1 | 24 |
| Case study narrative (avg) | ~197 words | **639 words** |
| Featured projects | 17 | 18 |
| Project screenshots | 28 web | 28 web + 4 iOS simulator |
| Tests | 5 | 15 |

## Test guarantees worth keeping
`__tests__/content.test.js` fails the build if a project claims a link that was never
verified, references a screenshot that does not exist on disk, omits an explanation when it
has no screenshot, or uses marketing superlatives. `__tests__/render.test.jsx` asserts the
previews are labelled captured screenshots, that no `iframe` is ever used to embed an
original project, and that scroll-reveal content stays visible when `IntersectionObserver`
is unavailable.

## Native app capture
Both React Native apps were built and run on an iOS 26.4 simulator (Xcode 26.4.1).
BNC Builders Mobile produced three screens from the live app. Camp Alegría Admin builds and
runs but its admin console is credential-gated, so only the sign-in screen was reachable —
recorded as exactly that rather than substituted.

## Known limitations (unchanged, stated on the site)
- No deployment URL is asserted for any project; none were probed.
- Key Buyers Club could not be rendered (requires live Supabase credentials).
- Agent Dashboard is an Electron app, not a browser target.
- The ComCreate CRM capture shows its sign-in screen, because the portal is authenticated.
