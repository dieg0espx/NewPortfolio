# Evidence batch B: verified engineering facts for 12 projects

Method: read-only inspection of each repo on 2026-10-11. Every claim cites a path relative to the project root under `/Volumes/Comcreate/<project>`. Commit counts come from `git log --oneline | wc -l` on the checked-out branch. Nothing here is inferred from folder names. No deployment URL is asserted as live. Items not verifiable are listed under "Not verified / omit".

Conventions: "page routes" = `page.*` files under `app/` (or non-api files under `pages/`); "API routes" = `route.*` / `pages/api/*`.

---

## ATP-ECommerce-Final

### A. Route/feature inventory
- 32 page routes, 17 API routes (counted from `app/**/page.*` and `app/**/route.*`).
- Public: `/`, `/about`, `/brands`, `/brands/[brand-slug]`, `/builds`, `/cart`, `/checkout`, `/contact`, `/products/[slug]`, `/shop/[[...page]]`, `/services`, `/services/[slug]`, `/privacy`, `/terms`, `/order-success`, `/payment`.
- Vehicle fitment catalogue ("YMM" = year/make/model): `/fit`, `/fit/[year]/[make]/[model]/[trim]`, `/fit/wheels`, `/parts`, `/parts/[sku]`.
- Quote/lead flow: `/quote/submit`, `/quote/thanks`.
- Auth: `/auth/signin`, `/auth/signup`, `/auth/forgot-password`, `/auth/reset-password`; customer `/dashboard`.
- Staff: `/admin`, `/admin/calls`, `/admin/quotes`, `/admin/test-data`.
- API routes (`app/api/**/route.ts`): `contact`, `quote`, `product-inquiry`, `fitment`, `wheels/search`, `wheels/specs`, `upload-image`, `orders/send-email`, `orders/update-status`, `admin/calls`, `admin/check-role`, `admin/quotes/[id]`, `admin/quotes/export`, `integrations/ctm`, `cron/website-inquiries`, `test-email`, `test-email-config`.
- `/payment` renders "Online payment is unavailable ... Do not enter card details on this site" with `robots: noindex` (`app/payment/page.tsx`). There is no live card payment in the code; the site funnels to quote/inquiry instead.

### B. Architectural decisions (with evidence)
- **Catalogue data model**: a separate additive Postgres schema for an imported ASAP product catalogue (`asap_products` with `specs jsonb`, `images text[]`, `discontinued`; `asap_fitment` with year_from/year_to/make/model rows, FK `on delete cascade`). Migration is wrapped in one transaction and states it leaves the 8 legacy tables untouched ("zero-regression guarantee") (`scripts/16-create-asap-schema.sql`).
- **Fitment search in the database**: year/make/model/trim cascades and paginated search are Postgres RPC functions (`asap_distinct_years`, `asap_makes_for_year`, `asap_models_for_make`, `asap_trims_for_model`, `asap_search_fitment_count/_page`) (`scripts/17-create-fitment-rpcs.sql`), plus wheel facet/search RPCs (`asap_wheel_search_count`, `asap_wheel_search_page`, `asap_wheel_facets`, `asap_wheel_distinct_specs`) (`scripts/18-create-wheel-specs-rpc.sql`, `scripts/19-create-wheel-search-rpcs.sql`).
- **Catalogue import is idempotent**: `npm run import:asap` upserts products by SKU, replaces fitment per brand, supports `--dry-run`, `--brand=`, `--batch-size`, retries batches, and aborts a brand's fitment phase if the delete step fails rather than duplicating rows (`scripts/16-import-asap.ts` header comment; `package.json` scripts).
- **Image strategy**: product images migrated to Cloudflare R2 via an S3 client (`lib/r2.ts`, `scripts/17-migrate-product-images-to-r2.ts`); a separate script sets Cache-Control on R2 objects and is idempotent, because "R2 doesn't apply Cache-Control automatically" (`scripts/18-set-r2-cache-control.ts`).
- **Feature flags**: `isYmmEnabled()` gates the `/fit` and `/parts` layouts via `NEXT_PUBLIC_YMM_ENABLED`; the comment notes route-segment layouts do not wrap `route.ts` handlers so any API under those paths must self-gate (`lib/feature-flags.ts`). `isQuoteEnabled()` is true if either rollout flag is on.
- **Durable form intake (leads)**: contact, product inquiries and cart pricing requests are accepted only after an atomic DB commit via the RPC `accept_website_inquiry`, using a stable browser submission UUID plus a SHA-256 payload hash for retry safety; same ID with different content returns 409; 50 KB cap; 20 new requests per IP per hour, with the rate key an HMAC of IP (`lib/integrations/forms/accept.ts` lines ~33-42; `docs/website-forms.md`).
- **Delivery worker**: Vercel cron runs `/api/cron/website-inquiries` every minute (`vercel.json`), requires bearer `CRON_SECRET`, leases up to six jobs per invocation, retries with backoff, and fails closed on ambiguous CRM identity (`docs/website-forms.md`; `lib/integrations/forms/delivery.ts`, `crm.ts`).
- **Call-tracking integration**: signed CallTrackingMetrics webhook at `/api/integrations/ctm` creates or links CRM leads (RepairShopr API client `lib/integrations/repairshopr.ts`); per-caller lock and activity ledger so replays never re-POST a lead (`docs/ctm-pilot.md`; `lib/integrations/ctm.ts`, `ctm-matching.ts`, `ctm-attribution.ts`).
- **Auth/roles**: Supabase Auth; admin check reads `role` from the `users` table (`lib/admin.ts`). The call-history API instead requires an exact server-side allowlist `CTM_REVIEWER_USER_IDS`, and states that user-editable metadata grants no access (`docs/ctm-pilot.md`).
- **Middleware**: only an `UNDER_CONSTRUCTION` maintenance-mode redirect to `/` (`middleware.ts`). It is not an auth gate.
- **RLS**: 20 `enable row level security` statements across migration scripts (`grep` over `scripts/*.sql`); private lead tables have RLS with no anon/customer access, accessed only by service-role RPCs (`docs/website-forms.md`).
- **SEO structure**: `app/sitemap.ts` (1-hour revalidate) emits static pages, every active non-hidden `/brands/[slug]` and every non-discontinued `/parts/[sku]`; comment says ~16k catalogue rows, one file under Google's 50k cap. `app/robots.ts` present. JSON-LD `Organization`+`LocalBusiness`, `WebSite`+`SearchAction`, `FAQPage` in `lib/structured-data.ts`, with a `safeJsonLd()` serializer that escapes `<`, U+2028 and U+2029 against script-tag breakout.
- **Privacy/consent**: tracking is opt-in and suppressed by GPC/DNT (`lib/optional-tracking.ts`, `components/tracking-choice.tsx`, `docs/website-forms.md`); a Playwright script asserts trackers stop after consent withdrawal (`tests/browser/privacy-regressions.mjs`, `tests/browser/README.md`).
- **Google Ads attribution**: first/last campaign touch, 90-day GCLID rules, "never claim paid attribution from the pool number alone" (`docs/google-attribution.md`, `lib/integrations/lead-source.ts`).

### C. Hard numbers
- Commits: 163 (first 2025-08-22, latest 2026-10-08 by `git log`).
- Page routes 32; API routes 17; SQL migration scripts 25 (`scripts/*.sql`); RPC functions defined in the fitment/wheel scripts: 10 (6 fitment + 4 wheel).
- Components: 81 files under `components/` (incl. `ui/`), 30 top-level entries; 4 hooks; 1 context.
- Test files: 10 `tests/*.test.ts` unit files, plus 2 non-unit suites: `tests/browser/privacy-regressions.mjs` and `tests/forms-storage.py`.
- Brand list `brands.csv`: 49 lines (includes header; do not quote as brand count without checking).
- One doc-recorded test result: "46 passed" for forms/ctm/lead-source tests (`docs/google-attribution.md`).

### D. Documentation present
- `docs/website-forms.md`: durable form acceptance, RepairShopr lead delivery, env gates, acceptance/recovery steps.
- `docs/ctm-pilot.md`: inbound call to CRM lead flow, number allow-list, exception handling, staff access.
- `docs/google-attribution.md`: Google Ads URL suffix and CTM attribution rollout plus verification checklist.
- `tests/browser/README.md`: how to run privacy/cart browser regressions.
- Root fix notes: `ADMIN_FIX.md`, `ADMIN_ORDERS_FIX.md`, `BUG_FIXES.md`, `CRITICAL_FIX_REQUIRED.md`, `DASHBOARD_FIX.md`, `DATABASE_FIX_SUMMARY.md` (missing `order_items` table), `EMAIL_SETUP.md`, `FINAL_FIXES_APPLIED.md`. These are historical debugging notes, not architecture docs.

### E. Testing
- Runner: Node built-in via `tsx --test tests/*.test.ts` (`package.json` `test`). Files: `ctm-attribution`, `ctm-matching`, `ctm-pilot`, `ctm-rollout`, `forms`, `forms-client`, `lead-source`, `optional-tracking`, `quote-flags`, `tracking-opt-in`.
- `tests/forms-storage.py` runs against an isolated PostgreSQL on port 55439 to test storage RPC/RLS (`docs/website-forms.md`).
- Browser: `npm run test:browser` runs `tests/browser/privacy-regressions.mjs` (blocks external requests, mocks Google scripts).

### F. Notable engineering details
- Replay-safe CRM write path: activity recorded before lead creation, permanent per-caller lock, `processing` rows older than two minutes flagged for review (`docs/ctm-pilot.md`).
- Email idempotency: one stable Resend idempotency key, retries only within a 23-hour window (`docs/website-forms.md`).
- Honest attribution rule: doc states a Google account tracking test is "a configuration test, not a real ad click/conversion" and campaigns remain paused (`docs/google-attribution.md`).
- Product description sanitising module (`lib/sanitize-description.ts`) and hidden-brand filter applied in both sitemap and brand route (`lib/hidden-brands.ts`, `app/sitemap.ts`).

### Not verified / omit
- No order volume, traffic or revenue data. Do not claim "e-commerce checkout" works: `/payment` says online payment is unavailable.
- Dollar amounts, plan limits, or live status of the CTM/RepairShopr integrations.

---

## AllLevelsAthletics-website

### A. Route/feature inventory
- 20 page routes, 45 API route files (`app/**/page.*`, `app/**/route.*`).
- Pages: `/`, `/about`, `/blog`, `/contact`, `/programs`, `/services`, `/team`, `/checkout`, `/success`, `/plan-success`, `/subscription-success`, `/admin`, `/auth/confirm`, `/auth/reset-password`, `/dashboard`, `/dashboard/coaching`, `/dashboard/products`, `/dashboard/profile`, `/dashboard/programs`, `/dashboard/programs/tension-release-program`.
- API groups (`app/api/README.md` + file tree): `admin/*` (clients, orders, coaching-clients, coaching-sessions, discounts, check-ins, programs, sessions), `coaching/*` (check-ins, progress, schedule, metric-history, metric-templates, send-appointment-confirmation), Stripe (`create-checkout-session`, `create-subscription-checkout`, `create-plan-checkout-session`, `create-customer-portal-session`, `get-checkout-session`, `stripe-webhook`), subscription management (`upgrade-`, `downgrade-`, `sync-subscription-status`, `sync-subscription-after-upgrade`, `check-subscription*`, `user-subscription`), Elite coupon flow (`get-`, `validate-`, `redeem-`, `apply-elite-discount`), orders/emails, `tiktok-embed`.
- Product: online coaching platform with a shop, three subscription plans (Foundation, Growth, Elite; env-keyed Stripe price IDs for monthly/annual/six-month billing) and a member dashboard (`app/api/create-subscription-checkout/route.ts` lines ~10-40).

### B. Architectural decisions
- **Payments**: Stripe Checkout Sessions for products and subscriptions, Customer Portal session, and a webhook handling `checkout.session.completed`, `customer.subscription.created|updated|deleted`, `invoice.payment_succeeded`, `invoice.payment_failed`. The webhook rejects a missing `stripe-signature` and verifies with `stripe.webhooks.constructEvent` (`app/api/stripe-webhook/route.ts` lines ~33-105).
- **Plan change path**: dedicated upgrade/downgrade endpoints plus sync routes to reconcile Supabase with Stripe after an upgrade (`app/api/upgrade-subscription`, `downgrade-subscription`, `sync-subscription-after-upgrade`).
- **Auth/roles**: Bearer-token verification through Supabase admin client (`requireUser`); `requireAdmin` accepts `user_metadata.role === 'admin'` or a row in `user_profiles` (`lib/api-auth.ts`). 19 API routes call `requireUser` and 8 call `requireAdmin` (grep over `app/api`).
- **Rate limiting**: in-memory per-IP bucket helper with periodic sweep (`lib/rate-limit.ts`); applied to 1 route (grep `rateLimit(` in `app/api`). In-memory means per-instance, not global.
- **Log hygiene**: `maskEmail` and `maskId` helpers (`lib/safe-log.ts`).
- **State**: React contexts for cart, discount, auth and subscription, with "safe" wrapper variants and a hydration hook (`contexts/*.tsx`, `hooks/use-hydration.ts`, `components/hydration-wrapper.tsx`, `components/error-boundary.tsx`).
- **Security headers**: `next.config.mjs` sets a Content-Security-Policy allow-listing Stripe, Calendly, Supabase and TikTok origins (note `'unsafe-inline'`/`'unsafe-eval'` in script-src; do not call it a strict CSP).
- **Third-party embeds**: Calendly popup components for booking (`components/calendly-popup*.tsx`), TikTok embed proxy route (`app/api/tiktok-embed/route.ts`).
- **Email**: Resend client (`lib/resend.ts`), and an SMTP setup guide (`EMAIL_SETUP.md`).
- **Coaching data features**: metric templates, metric history, progress and check-ins APIs; `ProgressPanel` component; charts via `recharts` (`package.json`).

### C. Hard numbers
- Commits: 239 (2025-08-18 to 2026-06-11).
- 20 pages, 45 API routes, 74 component files (`find components -type f`), 5 contexts, 3 hooks.
- Tests: 0 test files. No test script in `package.json`.

### D. Documentation present
- `app/api/README.md`: endpoint catalogue grouped by admin/coaching/discounts/Stripe/subscription/user.
- `EMAIL_SETUP.md`: SMTP env variable guide (Gmail/Outlook) for confirmation emails.
- `config-template.ts`, `env-template.txt`: configuration templates.

### E. Testing
- None present.

### F. Notable engineering details
- Elite-plan side effect: checkout flags the Elite plan for a free item ("free MF roller") in code comments (`app/api/create-subscription-checkout/route.ts` ~line 349). Cite only as a code comment.
- Security hardening pass visible: shared auth helper, rate limiter and masking utilities added as lib modules rather than inline per route.

### Not verified / omit
- Member counts, revenue, retention. The `README.md` is the API doc only. Do not claim tests, CI, or a strict CSP.

---

## new-bnc-builders

### A. Route/feature inventory
- 65 page routes, 11 route handlers (9 under `app/api`, plus `app/icon-192/route.tsx` and `app/icon-512/route.tsx`).
- Marketing/service pages: `/`, `/about-us`, `/our-process`, `/contact-us`, `/reviews`, `/portfolio`, `/portfolio/[category]`, `/portfolio/[category]/[project]`, `/careers`, `/blog`, `/blog/[slug]`, `/services`, `/site-map`, `/customer-referral-program`, `/kitchen-remodeling`, `/bathroom-remodeling`, `/home-remodeling`, `/garage-remodeling`, `/new-room-additions`, `/deck-repair`, `/hardscaping`, `/outdoor-kitchens`, `/landscape-remodeling`, `/3d-landscape-design`, `/exterior-remodeling`, `/pre-construction`, `/documentation`, plus legal pages.
- ADU hub (9 routes): `/adus`, `/adus/cost-guide`, `/adus/regulations`, `/adus/types`, `/adus/process`, `/adus/escondido`, `/adu-handbook-download`, plus calculator landing pages.
- Local landing pages: `/areas-we-serve` and 15 city pages under `/areas/*` (carlsbad, chula-vista, el-cajon, encinitas, escondido, la-jolla, la-mesa, national-city, oceanside, poway, rancho-santa-fe, san-diego, solana-beach, valley-center, vista) and 3 city-specific service pages (`/kitchen-remodeling/escondido`, `/new-room-additions/escondido`, `/adus/escondido`).
- Paid-search landing pages under `/lp/`: `adu`, `adu-calculator`, `adu-cost-calculator` (+ `thank-you`), `bathroom-remodel-quote` (+ `thank-you`), `kitchen-remodel-quote` (+ `thank-you`), `remodel`.
- API (`app/api/**`): `contact`, `careers`, `new-submission`, `health`, `revalidate`, `ghl/call-webhook`, `live-chat`, `live-chat/[conversationId]`, `live-chat/upload`.

### B. Architectural decisions
- **CMS (Sanity)**: blog only. Queries in this repo reference two document types, `post` and `category` (`lib/sanity/queries.ts`; `app/sitemap.ts`). The schemas live in a sibling `bnc-sanity-studio/` repo not present in this folder, so the schema count cannot be verified from here (`AGENTS.md` line 5). Sanity project/dataset named in `AGENTS.md`.
- **Cache invalidation**: Sanity webhook posts to `/api/revalidate`, authenticated with a bearer secret (`SANITY_REVALIDATE_SECRET`) and fires `revalidateTag`/`revalidatePath` (`app/api/revalidate/route.ts`). Sitemap fetch goes through a tagged `sanityFetch` with a code comment explaining that a raw fetch would statically freeze the sitemap at build time (`app/sitemap.ts`).
- **Sitemap honesty**: static routes have no `lastModified`; only blog posts carry real dates, with a comment explaining Google distrusts inaccurate lastmod (`app/sitemap.ts`).
- **Structured data**: JSON-LD in 5 files; types seen: `Service` (11 occurrences), `PostalAddress`, `Offer`, `LocalBusiness`, `GeoCoordinates`, `OfferCatalog`, `HomeAndConstructionBusiness`, `AggregateRating`, `WebSite`, `Organization` (grep over `app components lib`).
- **Edge redirect**: `proxy.ts` (Next 16 proxy convention) 301-redirects the non-www host to www and skips localhost (`proxy.ts`).
- **Motion/perf**: GSAP plus Lenis. `useSmoothScroll` skips entirely under `prefers-reduced-motion` and on touch devices, and dynamic-imports Lenis so "the 50KB Lenis bundle never ships" on mobile (`lib/animations/smoothScroll.ts`). Animation helpers in `lib/animations/` (`splitReveal`, `scrollFx`, `tilt`, `breathingBorder`, `buttonPress`). `browserslist` pins chrome/edge/firefox 100+, safari 15.4+ (`package.json`).
- **Design system as code**: `AGENTS.md` defines tokens (`--bg-page`, `--accent` etc.) and a "gold is accent only" rule; styling is Tailwind 4.
- **Live chat with RLS**: Supabase tables `live_chat_conversations`, `live_chat_messages`, `admin_users`; RLS enabled; visitors read only their own thread via an unguessable UUID; admins are rows in `admin_users`; migrations also add admin policies and a mobile-admin chat path (`supabase/migrations/20260807000001..4`). An edge function `notify-admins-new-message` exists (`supabase/functions/`). Attachment upload route `app/api/live-chat/upload/route.ts`.
- **Call to CRM AI pipeline (opt-in, inert until env set)**: GoHighLevel call webhook verifies a shared secret with `timingSafeEqual`, acknowledges fast and processes via `after()`; pipeline = transcript (Deepgram Nova-3, diarized) -> Claude Haiku 4.5 forced tool call into a typed `CallExtraction` -> write back to GHL contact/notes/tags/opportunity -> Slack Block Kit card (`app/api/ghl/call-webhook/route.ts`, `lib/ghl/*`, `lib/ghl/CALL-PIPELINE-SETUP.md`).
- **Forms/spam**: reCAPTCHA v3 server verification with min score (default 0.5) and expected-action check (`lib/recaptcha/index.ts`); Resend for email (`lib/resend.ts`, `email-templates/`); UTM capture and conventions (`lib/utm.ts`, `lib/tracking.ts`, `seo/utm-conventions.md`).
- **ADU calculator**: pricing math extracted to a pure module with per-sq-ft rates by finish level, unit tested (`lib/adu-pricing.ts`, `lib/adu-pricing.test.ts`). Rate constants are code values ("basic/mid/high"), not market claims.

### C. Hard numbers
- Commits: 356 (2026-01-23 to 2026-10-06).
- Page routes 65; route handlers 11; component files 73; Supabase migrations 4.
- Test files: 15 (2 unit under `lib/`, 13 Playwright specs under `playwright/e2e/`).
- Playwright spec line counts range 27-177 lines each (`playwright/e2e/*.spec.ts`).
- SEO workspace holds roughly 25+ markdown files under `seo/` (audit, archive, keyword research, reports).

### D. Documentation present
- `README.md`, `AGENTS.md` (agent guidelines + design tokens), `LANDING_PAGES_README.md` (paid-search LP overview).
- `lib/ghl/CALL-PIPELINE-SETUP.md`: call-to-GHL pipeline setup, env vars, Slack wiring, PIT scopes.
- `seo/README.md`, `seo/utm-conventions.md`, `seo/recovery-plan-2026-07-28.md` (validated SEO recovery baseline with operating decisions such as "do not disavow preemptively", "do not use Indexing API for ordinary pages"), `seo/audit/*` (Ahrefs overview, backlinks, competitors, GTM container audit 2026-07, end-to-end tracking plan, GHL call forwarding runbook, PPC conversion audit 2026-04), `seo/archive/*`, `seo/content-plan/blog-roadmap.md`, `seo/keyword-research/*`, `seo/reports/2026-04-report.md`.

### E. Testing
- Unit: `node --import tsx --test "lib/**/*.test.ts"` (`package.json` `test:unit`) covering `adu-pricing` and `utm`.
- E2E: Playwright with 13 specs: homepage, service pages, area pages, content pages, redirects, mobile navigation, ADU calculator, landing pages, tracking, contact form, careers form, API contact, API careers (`playwright/e2e/`).
- `playwright.config.ts` defaults to a dedicated test port 3100 so a developer's own dev server is never reused, and sets E2E/reCAPTCHA-bypass flags (comment explains the stale-server footgun).
- `npm run typecheck` (`tsc --noEmit`) and `eslint` scripts.

### F. Notable engineering details
- SEO recovery plan baseline (Search Console 2026-04-27 to 2026-07-25: 290 clicks, 27,499 impressions, 1.05% CTR, avg position 19.5) is quoted in `seo/recovery-plan-2026-07-28.md`. It is a baseline of a recovery effort, not a success metric. Do not present as an outcome.
- Constant-time secret comparison on the webhook (`timingSafeEqual` with length check).

### Not verified / omit
- Sanity schema count (studio repo absent); lead volume, rankings improvement, CRM outcomes; Slack/GHL live behaviour (doc says inert until keys set).

---

## CasitaAzul

### A. Route/feature inventory
- Pages Router. 28 page routes + 404 under `pages/` (`find pages -type f`: 52 files, 21 in `pages/api`), 21 API files.
- Public pages: `/`, `/about-us` (+ `/philosophy`, `/team`, `/testimonials`, `/why-choose-us`), `/admissions` (+ `/tuitions-and-fees`), `/programs` (+ `/calendar`, `/schedule`), `/locations`, `/locations/[casita]`, `/blog`, `/blog/[slug]`, `/gallery`, `/faq`, `/contact-us` (+ `/waitlist`), `/join-our-team`, `/camp-alegria`, `/spanish-academy`, `/interest`, `/rsvp`, `/thank-you`.
- Location pages: `scripts/generate-sitemaps.js` lists 10 location detail pages (casita-1 through casita-6, casita-azul-7-burlwood, casita-azul-cedar-mill, tanasbourne-campus, hillsboro-campus), each generated for both locales (`pages/locations/[casita].tsx` `getStaticPaths`).
- Staff CRM: `/admin`, `/admin/dashboard`, `/admin/set-password`; admin API (`delete-lead`, `mark-read`, `send-email`, `settings`, `submissions`, `update-lead-stage`, `update-lead`, `update-status`, `users`).
- Intake/other API: `interest-lead`, `rsvp-lead`, `waitlist`, `send-waitlist`, `lead-details`, `resend-email`, `chat` (AI assistant), `cron/stale-leads`, plus sitemap endpoints (`sitemap.xml`, `sitemap-index`, `pages-sitemap`, `blog-sitemap`).

### B. Architectural decisions
- **i18n (how it is actually done)**: `next-translate` + `next-translate-plugin`, locales `["es","en"]`, default `en`, namespaces `common` globally and `services` for `/[service]` (`i18n.json`, `next.config.ts`). Translation files are `locales/en/common.json` and `locales/es/common.json`: 540 and 546 leaf keys respectively (counted by script). Next.js i18n routing yields `/es/...` URLs, listed explicitly in the generated sitemap (`scripts/generate-sitemaps.js`, "Spanish locale pages"). A `LanguageToggle` atom exists (`components/Atoms/LanguageToggle`). 35 component/page files reference `useTranslation` (grep); `components/Templates/Layout/Layout.tsx` renders per-locale `<link rel="alternate" hrefLang>` tags from an `alternateLanguages` prop, an `x-default` pointing to English, `og:locale` and `og:locale:alternate` (en_US/es_ES) (lines ~120-150).
- **Locations static generation**: `getStaticPaths` enumerates every casita slug plus slug aliases for every locale, `fallback: 'blocking'`, with a comment that propless prerender across locales had broken static export (`pages/locations/[casita].tsx` ~849-866).
- **CMS**: hybrid. Blog posts merged from local data (`data/blogPosts.ts`, 6 `slug:` entries) and Sanity; on slug collision Sanity wins "so editors can override" (`data/mergedBlog.ts`). The Sanity studio is in a sibling folder `/Volumes/Comcreate/casita-azul-studio` (outside this repo) and registers one document type, `post` (`schemaTypes/index.ts`, `schemaTypes/blogPost.ts`). So: 1 Sanity document type.
- **Lead CRM on Supabase**: staff dashboard with a 7-stage pipeline: New Inquiry, Contacted, Tour Scheduled, Toured, Enrollment Paperwork Started, Enrolled, Not a Fit; lead sources `contact|waitlist|interest|rsvp` (`lib/leadStages.ts`, `supabase/migrations/002_crm_leads.sql`).
- **Roles/RLS**: Postgres enum `admin_role` (`admin`, `editor`, `viewer`), `profiles` table created by trigger from invite metadata, RLS enabled, service-role key used by the app for privileged reads/writes (`supabase/migrations/001_profiles_and_roles.sql`). API role resolution accepts either cookie session or Bearer token (`lib/adminAuth.ts` `getAdminContext`).
- **Spam defence**: honeypot field `company_website` plus heuristics (gibberish detector requiring both vowel-poor token AND mid-word capitals so legitimate names like "Krzysztof" are not flagged; Gmail dot-trick detection) with a unit test file of 37 `test(`/`it(` lines (`lib/spam.ts`, `lib/spam.test.ts`, `components/Atoms/HoneypotField`).
- **Follow-up automation**: Vercel cron `/api/cron/stale-leads` daily at 15:00 UTC emails staff about leads still in "New Inquiry" after 2 days; `?dryRun=1` supported; requires `CRON_SECRET` in production (`pages/api/cron/stale-leads.ts`, `vercel.json`).
- **AI chatbot**: `/api/chat` uses Vercel AI SDK with Google Gemini via the `gemini-flash-latest` alias (code comment: a pinned model was retired 2026-06-01 and took the bot offline), per-IP rate limit 15 requests/minute, max 30 messages, 4,000 chars per message, grounded on `data/chatbot_context.ts` (`pages/api/chat/index.ts`).
- **SEO**: static sitemap files generated at `postbuild` (`npm run generate-sitemaps`; `package.json`) into `public/sitemap.xml`, `sitemap-pages.xml`, `sitemap-blog.xml` (EN and `/es` variants with priorities). JSON-LD types in code: `EducationalOrganization`, `City`, `FAQPage`/`Question`/`Answer`, `PostalAddress`, `BreadcrumbList`/`ListItem`, `VideoObject`, `WebPage`, `Organization` (grep over `components pages utils`). `output dec16/*` reports document title-tag, H1, meta-description, FAQ-schema and childcare-schema updates.
- **Security headers**: HSTS (2 years, preload), `nosniff`, `X-Frame-Options: SAMEORIGIN`, strict-origin referrer policy, Permissions-Policy; CSP shipped as `Content-Security-Policy-Report-Only` first so GTM-managed tags are not broken (`next.config.ts`, with a code comment saying promote to enforcing once reports are clean).
- **Observability/perf**: `@vercel/analytics`, `@vercel/speed-insights`, GTM (`react-gtm-module`); `images.remotePatterns` for Hygraph (graphassets), Cloudinary, Sanity CDN. `package.json` also still lists `@apollo/client`, `@graphcms/rich-text-react-renderer` and `mongoose` (not verified as used). `typescript.ignoreBuildErrors: true` in `next.config.ts` (a code-quality caveat; do not hide if discussing rigor).
- **Maps**: Leaflet with a validation script for map locations (`npm run test:locations` -> `scripts/validate-map-locations.js`, `data/mapLocations.ts`).

### C. Hard numbers
- Commits: 380.
- 28 page routes (+404), 21 API files, 10 location pages x 2 locales (per generated sitemap), 540/546 translation keys, 102 component files, 3 files in `models/` (`FAQ.ts`, `User.ts`, `Waitlist.ts`), 2 SQL migrations.
- Test files: 1 (`lib/spam.test.ts`). `package.json` `test` runs `node --test "**/*.test.ts"`.
- 7 stage pipeline; 3 roles.

### D. Documentation present
- `README.md`: describes bilingual preschool site + Supabase admin CRM.
- SEO docs (root): `SEO_AUDIT_REPORT.md`, `SEO_AUDIT_SUMMARY.md`, `SEO_IMPLEMENTATION_GUIDE.md`, `SEO_IMPLEMENTATION_COMPLETE.md`, `CLIENT_SEO_UPDATE.md`, `H1_AUDIT_SPREADSHEET.md`, `DIRECTORY_LISTINGS_AND_SEO_AUDIT.md`.
- `SEO-Audit-Report-2025-01-27/` (14 md: executive summary, full audit, performance audit/optimisations applied, PageSpeed test results, sitemap locations, Screaming Frog explanation, acceptance criteria status).
- `output dec16/` (7 md: H1, title tags, meta descriptions, FAQ schema, childcare schema, educational organisation schema, Google Business Profile checklist).
- `docs/major-dependency-upgrade-plan.md`: plan to land the remaining major-version bumps (carrying 11 npm-audit advisories) as separate tickets, "one package family per PR".

### E. Testing
- One Node test file (`lib/spam.test.ts`) covering honeypot/gibberish/dot-trick heuristics. `npm run typecheck`, `npm run test:locations`. No E2E.

### F. Notable engineering details
- Gibberish heuristic false-positive avoidance is explicitly reasoned in comments (`lib/spam.ts`).
- Page-speed work is documented (`SEO-Audit-Report-2025-01-27/PERFORMANCE_OPTIMIZATIONS_APPLIED.md`, `PAGESPEED_TEST_RESULTS.md`). Read those files before quoting any score; none are quoted here.

### Not verified / omit
- Enrollment, lead counts, SEO rankings/traffic. The Sanity schema count of 1 relies on the sibling studio folder `casita-azul-studio`, which is outside this project's directory.

---

## coconut-bay-bahamas

### A. Route/feature inventory
- 20 page routes, 3 API routes.
- Public (8 distinct areas): `/`, `/villas/oceanfront`, `/villas/oceanfront/[unit]`, `/experiences`, `/getting-here`, `/about`, `/purchasing`, `/purchasing/[type]` (oceanfront|grand per sitemap).
- Staff portal under `/portal` (route group `(app)`): `/portal/login`, `/portal/inbox`, `/portal/inbox/[threadId]`, `/portal/inbox/new`, `/portal/contacts`, `/portal/contacts/[contactId]`, `/portal/leads`, `/portal/bookings`, `/portal/bookings/[villa]`, `/portal/settings`, `/portal/users`.
- API: `/api/contact` (website inquiry), `/api/inbound` (inbound guest email), `/api/sirvoy` (booking webhook).

### B. Architectural decisions
- **Middleware**: scoped to `/portal/:path*` only. It refreshes the Supabase session cookie, redirects unauthenticated users to login, bounces signed-in users off the login page, **fails closed with a 503 if Supabase env is missing**, and sets `X-Robots-Tag: noindex, nofollow` at header level so even redirects/503s are noindexed (`middleware.ts`, `lib/supabase/middleware.ts`).
- **Data model**: 5 Postgres tables, all with RLS enabled: `contacts`, `threads`, `messages`, `notification_recipients`, `bookings`; triggers keep `threads.last_message_at` and `updated_at` current (`supabase/migrations/0001_init.sql`, `0002_notifications.sql`, `0003_bookings.sql`; migrations 0004-0006 add staff note, thread source, WhatsApp notifications). Policies are "admins full access" for any authenticated user (`for all to authenticated using (true)`), so access control relies on only staff having accounts.
- **Inbound email into a portal inbox**: Resend Inbound posts a Svix-signed `email.received` webhook; code verifies the HMAC-SHA256 signature manually with `timingSafeEqual`, fetches the full message, matches the thread by plus-address `reply+<threadId>@`, otherwise the sender's newest open thread, upserts the contact, and strips quoted reply history ("On ... wrote:", Spanish "El ... escribio:", Outlook separators). Fails closed (503) until `RESEND_WEBHOOK_SECRET` is set (`app/api/inbound/route.ts`).
- **Booking webhook**: Sirvoy does not sign webhooks, so the route gates on a shared token compared in constant time (both sides SHA-256-hashed first so length does not leak), upserts keyed on Sirvoy booking id so modify/cancel update the same row, emails the team on a brand-new booking; 503 if token unset (`app/api/sirvoy/route.ts`).
- **Booking calendar fed by CSV backfill**: `scripts/import-sirvoy-bookings.mjs`, `sirvoy-csv.mjs`, `backfill-sirvoy-bookings.sql`.
- **Team alerts**: email plus WhatsApp via CallMeBot, with phone normalisation and parsing of CallMeBot's HTML error responses (`lib/whatsapp.ts`, `lib/notify.ts`).
- **Lead source tracking without a DB change**: client captures first-touch (landing page, referrer, UTM + gclid/fbclid) in `cb_first_touch`; server derives a channel label and `kind` (reservation|purchase|question) stored in `threads.source_meta` (`lib/leadSource.ts`).
- **Contact form anti-spam**: honeypot field `company`, per-IP in-memory rate limit, short dedupe (`app/api/contact/route.ts`).
- **SEO**: `app/sitemap.ts` built from a path list plus `UNITS` (one URL per published villa unit); `app/robots.ts`; JSON-LD `Resort`, `PostalAddress`, `LocationFeatureSpecification` (grep `lib app`); `lib/seo.ts`. Scripts `test:seo` and `test:routes` smoke-test rendered title/description/canonical/og:image/robots tags on every sitemap URL and that every villa page linked from the listing returns 200 without an error shell (`scripts/check-seo-tags.mjs`, `scripts/check-public-routes.mjs`).
- **Styling/motion**: no UI framework; plain CSS with one shared easing curve `cubic-bezier(0.2, 0.8, 0.2, 1)`; fonts Cormorant Garamond + Jost via `next/font` (`README.md`). Media URLs are built through a `cb()` helper in `lib/site.ts`; `R2-ASSETS.txt` lists the assets.
- **Reservations**: Sirvoy booking widget per unit with a `ROOM_TYPE_ID` map and per-unit form id prefill (`lib/site.ts` ~lines 183-232). No payment code in this repo.
- **Dependencies are minimal**: runtime deps are only `next`, `react`, `react-dom`, `@supabase/ssr`, `@supabase/supabase-js`, `@vercel/analytics`, `resend` (`package.json`).

### C. Hard numbers
- Commits: 290 (2026-06-10 to 2026-10-07).
- 20 pages, 3 API routes, 31 component files, 6 migrations, 5 tables.
- Test files: 11 (`tests/*.test.mjs`): format, inbound-route, lead-source, portal-env, qaui-loader, routes, seo, sirvoy-csv, sirvoy-route, sirvoy-webhook, whatsapp; 117 `test(`/`it(` lines (grep).
- CI: `.github/workflows/ci.yml` runs lint with `--max-warnings=0`, `tsc --noEmit`, unit tests, build, then starts the server and smoke-tests public villa/purchasing routes; a second workflow `qaui-regression.yml` exists.

### D. Documentation present
- `README.md`: stack, env table, portal overview.
- `PORTAL_SETUP.md`: migrations, env variables, Resend inbound setup.
- `AGENTS.md`: Next.js agent rules block.
- `AGENT_NOTE_OCT7_CLIENT_REQUESTS.md`: status note on client change requests.
- `docs/qaui-onboarding.md`: QAUI review-embed loader install and regeneration notes.
- `docs/devtools-upgrade-eval-2026-10.md`: devtools upgrade evaluation.

### E. Testing
- Node built-in test runner with a custom ESM alias helper and experimental module mocks (`package.json` `test`; `tests/helpers/alias.mjs`). Tests exercise both webhook routes, WhatsApp client, CSV import, lead-source classification, portal env fail-closed behaviour, SEO tags, routes.

### F. Notable engineering details
- Fail-closed design on every secret-dependent surface (portal, inbound email, Sirvoy webhook).
- Reply threading via plus-addressing and quoted-text stripping is a non-trivial email-parsing piece.
- Public product copy in README: "Grand Villas marked Coming Soon" (do not invent availability).

### Not verified / omit
- Occupancy, bookings volume, revenue. README claim "only resort on the island with a swimming pool" is client copy, not engineering evidence. Number of villa units is not cleanly derivable (a code comment and the name list disagree), so omit a unit count.

---

## V3Biomedical

### A. Route/feature inventory
- Pages Router: 24 page routes (+ `sitemap.xml.js` and `test.js`) and 12 API routes (`find pages -type f` = 40 files).
- Pages: `/`, `/about`, `/products`, `/how-it-works`, `/compare`, `/contact`, `/skin-substitutes`, `/autologous-blood`, `/collagen`, `/debridement`, `/metabolic-wellness`, `/resources`, `/resources/documentation-costs-infographic`, `/resources/wound-care-documentation`, `/resources/wound-care-management-software`, `/blog/[slug]`, `/landing-reimbursement`, `/sawc` (event landing), 4 landing pages (`/lp/wound-care-platform`, `/lp/wound-care-software-ca|fl|tx`), `/privacy-policy`, `/terms-conditions`.
- API: `createLead`, `updateLeadContact`, `updateLeadDemo`, `startForFree`, `notifyStep1`, `linkedinLead`, `newsLetter`, `sendEmail`, `sendSMS`, `verifyRecaptcha`, `revalidate`, `health`.
- Redesign work lives in `design/v3-redesign-staging/` (designer export) with a Next.js conversion on a separate branch; checked-out branch here is `main` (`docs/REDESIGN_ROLLOUT_PLAN.md`; `git branch`).

### B. Architectural decisions
- **CMS**: Sanity Studio in `studio/` with 3 document types (`post`, `author`, `category`) and 2 reusable objects (`blockContent`, `seo`) (`studio/schemas/index.ts`, `post.ts`, `author.ts`, `category.ts`, `seo.ts`). The SEO object carries `metaTitle`, `metaDescription`, `ogImage`, `noIndex`.
- **GROQ with publish gating**: `LIVE_POST` = published, slug defined, `publishedAt <= now()`; `LISTABLE_POST` also excludes `seo.noIndex` (`lib/sanity/queries.js`). Related-post picking is a pure function with a test (`lib/sanity/related.js`, `related.test.js`). Body HTML sanitisation for tables via `sanitize-html` (`lib/sanity/sanitize.js`, `sanitize.test.js`); `isSafeHref` link guard (`lib/sanity/href.js`).
- **ISR revalidation (Pages Router)**: no fetch tags exist in the Pages Router, so `/api/revalidate` revalidates specific paths (`/blog` and `/blog/<slug>`) with `res.revalidate()`, auth by shared secret compared in constant time (SHA-256 then `timingSafeEqual`) via header, query or body (`pages/api/revalidate.js`).
- **Lead pipeline into HubSpot**: forms post to `/api/createLead`; `upsertContact` creates or reuses a contact on email conflict, then creates a HubSpot Lead associated to the contact, with a default owner overridable by env and HUBSPOT_DEFINED association IDs; a persistent "Lead Source" derives from `utm_source` or "Direct/Organic" (`lib/hubspot.js`, `pages/api/createLead.js`). The rollout doc mentions a later PR routing to HubSpot Deals/MQL (`docs/REDESIGN_ROLLOUT_PLAN.md`).
- **Layered spam guard**: honeypot `company_website`, minimum fill time 2,500 ms from `formRenderedAt`, reCAPTCHA v3 only decisive when token and secret both present; on a hit the API returns 200 with null ids so bots no-op on follow-up endpoints (`lib/spamGuard.js`, `pages/api/createLead.js`).
- **Event landing (SAWC)**: dedicated `/sawc` page with catalog download and QR-source detection (`utm_source=sawc&utm_medium=qr`) handled in `createLead` (`pages/sawc.js`, `pages/api/createLead.js`, `lib/tracking.js`).
- **Notifications**: email via Resend, SMS via Twilio (`lib/resend.js`, `lib/leadNotification.js`, `pages/api/sendSMS.js`; `package.json` deps).
- **SEO**: `pages/sitemap.xml.js` builds the sitemap with honest `lastmod` (code comment: it previously stamped `new Date()` on every render, so half of URLs claimed to be modified today; now seeded from last content commit and must be bumped manually); `/blog` has a permanent redirect to `/resources` (`next.config.mjs`).
- **Security headers**: HSTS preload, nosniff, Referrer-Policy, Permissions-Policy, COOP; CSP uses only `frame-ancestors` to allow the QAUI review portal to iframe the site (`next.config.mjs`).
- **Smooth scroll/motion**: Lenis hook and `motion` library (`hooks/useLenis.js`, `package.json`).
- **Image strategy**: Cloudinary (`lib/cloudinary.js`, `upload_to_cloudinary.py`, `cloudinary_urls.json`) and Sanity CDN, with `remotePatterns` scoped to specific account paths (`next.config.mjs`).
- **UI kit**: shadcn + Radix + Base UI components, 75 component files.

### C. Hard numbers
- Commits: 449 (2025-04-26 to 2026-09-28).
- 24 page routes; 12 API routes; 75 component files; 3 Sanity document types + 2 objects.
- Test files: 7 (`lib/utm`, `lib/utils`, `lib/tracking.sawc`, `lib/sanity/queries`, `related`, `sanitize`, `tests/createLead.sawc`), 626 lines total. Vitest, `environment: 'node'`, with `@` alias (`vitest.config.js`).
- Redesign audit counts from `docs/redesign-staging-audit-2026-07-14.md`: 4 P0, 14 P1, 15 P2, 10 P3 findings across 9 staging pages; initial health score 8/20; P0/P1 items documented as fixed same day except content-dependent ones. Specific figures documented there: ~9 MB eager design-tool iframes, 38 below-fold images lazy-loaded.
- CI: `.github/workflows/ci.yml` (eslint + `npm test` per `README.md`).

### D. Documentation present
- `PRODUCT.md`: product register, users, brand personality, design principles (identity preservation, evidence over hype, conversion continuity, no em-dashes in customer copy).
- `docs/REDESIGN_ROLLOUT_PLAN.md`: dated redesign-to-Next.js rollout log, queued changes, verification checklist (zero hydration errors, counters animate, no horizontal scrollbar).
- `docs/redesign-staging-audit-2026-07-14.md`: five-dimension audit of staging redesign.
- SEO/ads: `docs/internal-linking-map.md`, `docs/resource-page-*` (identification guide, outreach strategy/emails/tracker/quickstart), `docs/guest-posting-targets.md`, `docs/scholarship-link-building-evaluation.md`, `docs/V3_ADS_AUDIT_APRIL_2026.md`, `docs/V3_ADS_GAMEPLAN_APRIL_2026.md`, `docs/V3_TRACKING_AUDIT_APRIL_2026.md`, `docs/V3_NATIONAL_CAMPAIGN_PLAN_MAY_2026.md`.
- `studio/README.md`, `public/downloads/PDF_TEMPLATES_SUMMARY.md`, `public/infographics/README.md`.
- Root `README.md` is the default create-next-app text plus email config.

### E. Testing
- Vitest unit tests only (Sanity query/related/sanitize logic, UTM parsing, tracking events, createLead SAWC handling). No E2E.

### F. Notable engineering details
- Hydration bug diagnosis in the redesign conversion: designer-export `<template id="__bundler_thumbnail">` elements cause React hydration error #418; fix is to strip templates in the converter (`docs/REDESIGN_ROLLOUT_PLAN.md`). Also records that CSS `zoom` is off the table because it breaks IntersectionObserver thresholds.
- Workflow rule: "simple requests must land as isolated commits" after a batched styling change was reverted wholesale (`docs/REDESIGN_ROLLOUT_PLAN.md`).

### Not verified / omit
- Lead volume, ad performance outcomes (ads docs contain audits, not verified results here). "48-hour onboarding" is product copy in `PRODUCT.md`.

---

## Sisters-In-Motion

### A. Route/feature inventory
- 20 page routes, 4 API routes + 3 other route handlers.
- Pages: `/` (home), `/about`, `/blog`, `/blog/[slug]`, `/build-guide`, `/classes`, `/contact`, `/discovery`, `/discovery/success`, `/essential-s`, `/faq`, `/open-pole`, `/parties`, `/press`, `/quiz`, `/terms`, `/testimonials`, `/virtual`, `/workshops`, plus embedded Sanity Studio at `/studio/[[...tool]]` (`app/(site)/*`, `app/studio/`).
- API: `/api/checkout`, `/api/contact`, `/api/revalidate`, `/api/stripe/webhook`; also `/llms.txt`, `/md/[slug]`, `/robots.txt` route handlers.

### B. Architectural decisions
- **CMS modelling**: Sanity v6 with 19 registered schema types: `siteSettings`, `homePage`, 14 page singletons (about, discovery, contact, classes, virtual, essentialS, workshops, parties, openPole, guidingPrinciples, faq, terms, quiz, press) and 3 collections (`blogPost`, `teacher`, `testimonial`) (`sanity/schemaTypes/index.js`). Desk structure presents singleton pages in a "Pages" folder with fixed document IDs (`sanity/structure.js`). A `pressItem` type is defined in `sanity/schemaTypes/documents.js` but not registered in `index.js`.
- **Graceful degradation**: runs with built-in content from `lib/content/*` and `app/(site)/blog/posts.js` until a Sanity project is connected; no broken states before credentials exist (`CMS.md`, `README.md`).
- **Cache**: Sanity webhook hits `/api/revalidate?secret=...`, which purges the `sanity` cache tag (`revalidateTag('sanity','max')`) so publishes appear in seconds rather than the 60 s fallback (`app/api/revalidate/route.js`).
- **Payments**: Stripe Checkout Sessions for a Discovery Package, with a no-code Payment Link fallback until `STRIPE_SECRET_KEY` is set; webhook verifies signature with `constructEvent` on the raw body and fulfils on `checkout.session.completed` or `async_payment_succeeded` when `payment_status === 'paid'`; studio notification and customer confirmation emails are idempotent per checkout session id so Stripe redelivery never double-sends (`PAYMENTS.md`, `lib/stripe.mjs`, `app/api/stripe/webhook/route.js`).
- **Contact delivery**: Resend to a fixed studio inbox with same-origin check, JSON-only, streamed size limit, field validation, honeypot, 12 s timeout and a daily idempotency key; until configured, the form prepares an email draft and states plainly to review and send, never showing a false "sent" (`CONTACT-AND-BOOKING.md`, `lib/contact.mjs`).
- **Consent-gated analytics**: loader `public/analytics.js` loads GA4/GTM/Meta Pixel/Clarity only on the production hostnames, only after consent; GPC forces denial; ad consent always denied; sends sanitised page context, never query strings, form contents or raw phone/email; one pageview per client-side navigation via a `sim:navigation` event; `purchase` fires only from the Stripe success page (`ANALYTICS.md`, `components/Analytics.js`).
- **First-touch attribution**: UTMs/fbclid kept client-side 30 days and passed into Stripe Checkout session metadata at purchase (`lib/attribution.js`).
- **AI/LLM readability (GEO)**: `/llms.txt` index per llmstxt.org and `/md/<slug>` Markdown renditions generated by converting rendered HTML with Turndown (FAQ `<details>` mapped to `###` questions, images dropped, forms/buttons removed) (`app/llms.txt/route.js`, `app/md/[slug]/route.js`, `lib/llms.mjs`).
- **Structured data**: `LocalBusiness` JSON-LD built from a CMS free-text address parsed into a `PostalAddress` by `lib/address.mjs`, with tests because a CMS format change could silently break the address signal (`components/StructuredData.js`, `tests/structured-data.test.cjs`).
- **Migration**: legacy static HTML mockups kept under `legacy/` (about.html, blog.html, ...), rebuilt as Next.js App Router preserving the original CSS (`README.md`, `legacy/`). Fonts self-hosted (ITC Bauhaus Light, Mellanika) plus Google fonts via `next/font`.
- **Build flag**: dev/build use `--webpack` (`package.json`).

### C. Hard numbers
- Commits: 90 (2026-09-14 to 2026-09-29).
- 20 pages, 4 API routes, 12 component files, 19 Sanity types, 15 content modules under `lib/content/` (home + 14 pages), 45 lines in `lib/content.js`.
- Tests: 7 files, 75 `test(` cases: analytics 15, attribution 12, booking-links 5, contact 3, llms-routes 19, stripe 10, structured-data 11 (grep count of `test(`).

### D. Documentation present
- `README.md` (stack, setup), `CMS.md` (connect Sanity, editing), `PAYMENTS.md` (Stripe link vs sessions), `CONTACT-AND-BOOKING.md` (contact delivery, Mindbody booking links), `ANALYTICS.md` (consent, event map, GTM mode), `GO-LIVE.md` (launch checklist by owner), `AGENTS.md`/`CLAUDE.md` (agent rules).
- `deliverables/` client-review packet, mobile QA sweep, website/GBP maintenance checklist, Mindbody click-test; `Squarespace-Editing-Guide.pdf`.

### E. Testing
- `node --test tests/*.test.cjs` (Node built-in). Coverage: analytics loader logic, attribution, booking links, contact delivery, llms routes, Stripe logic, structured data. No E2E.

### F. Notable engineering details
- Event map distinguishes intent (`checkout_click`, `contact_click`) from confirmed conversion (`purchase`, `generate_lead`) and documents that purchase tracking requires Checkout Sessions, not Payment Links (`ANALYTICS.md`).

### Not verified / omit
- Sales/booking/class numbers; Netflix documentary claim in `lib/llms.mjs` is client copy.

---

## king-roofing

### A. Route/feature inventory
- 26 page routes, 1 API route (`/api/revalidate`), plus `app/sitemap.ts`, `app/robots.ts`.
- Pages: `/`, `/services`, 9 service pages (`roof-replacement`, `roof-repair`, `roof-installation`, `storm-damage-repair`, `insurance-claims`, `metal-roofing`, `tile-roofing`, `soffit-fascia`, `gutters`), `/service-areas`, `/service-areas/[city]`, `/service-areas/utah`, `/service-areas/nebraska`, `/gallery`, `/projects`, `/team`, `/financing`, `/licenses`, `/contact`, `/thank-you`, `/blog`, `/blog/[slug]`, `/privacy-policy`, `/terms-of-service`.
- City pages: `lib/service-areas.ts` defines 16 Utah cities (ogden, salt-lake-city, west-valley, taylorsville, midvale, sandy, draper, south-jordan, west-jordan, lehi, american-fork, orem, provo, farmington, vernal, st-george), each rendered via `[city]`.

### B. Architectural decisions
- **Content as typed data**: service pages (`lib/services.ts`, 1,717 lines) and city pages (`lib/service-areas.ts`, 905 lines) are authored as structured data, not CMS, rendered through `ServicePageLayout` / `ServiceArticle` components.
- **CMS (Sanity) for blog**: studio with 3 document types (`post`, `author`, `category`) and 2 objects (`blockContent`, `seo`) (`studio/schemas/index.ts`). Blog queries and sitemap query in `lib/sanity/`; cache revalidated via `/api/revalidate`.
- **Doorway-content guard**: a test computes pairwise Jaccard similarity across service pages and across city pages and fails above 0.5 (`MAX_SIMILARITY = 0.5`), with a comment that the old templated city pages "would score ~0.9+" (`tests/seo/content-uniqueness.test.ts`, `tests/util/text.ts`).
- **SEO invariants tested against the BUILT output**: `tests/seo/rendered.test.ts` parses `.next/server/app` HTML with cheerio and checks canonicals, forbidden H1s ("City not found"), noindex on `/thank-you`, internal link validity; plus `metadata`, `sitemap`, `robots`, `redirects`, `internal-links` tests.
- **Redirect governance**: legacy URL redirects live in one data table `lib/legacy-redirects.ts` (7 audited redirects, including `/service-areas/kentucky` -> `/service-areas`), spread into `next.config.ts` `redirects()`; `canonicalizeInternalHref()` rewrites CMS-authored internal links directly to canonical routes; a test asserts each is permanent and no duplicate sources (`tests/seo/redirects.test.ts`). `next.config.ts` also redirects `/home`, `/about-us*`, `/contact-us*`, etc.
- **Meta hygiene**: `clampMeta()` clamps blog/city descriptions to ~155 chars, tested (`lib/seo.ts`, `tests/unit/clamp-meta.test.ts`). `robots.ts` lists only the real XML sitemap after "llms.txt listed as sitemap" issue (`docs/seo/README.md`).
- **Structured data**: `RoofingContractor` (11), `Service` (10), `State` (20), `City`, `BreadcrumbList`, `FAQPage`, `Organization`, `ImageObject`, `PostalAddress` (grep `app components lib`); `jsonLdScript()` serializer for safe embedding (`lib/json-ld.ts`).
- **Sitemap**: static list with priorities + one entry per city + blog posts from Sanity (`app/sitemap.ts`).
- **Media/perf**: `scripts/compress-videos.mjs` batch-compresses drone footage with ffmpeg-static (H.264 CRF 23, capped 1080p, audio stripped, `+faststart`) for Cloudflare R2 delivery; images configured for AVIF/WebP with explicit device sizes and remote patterns for Cloudinary, YouTube thumbs, Sanity CDN (`next.config.ts`). Components `AmbientVideo`, `DroneVideoGallery`, `DroneImageGallery`, `BeforeAfterSlider`, `CommutesMap`.
- **Motion**: Framer Motion with one brand easing `[0.22, 1, 0.36, 1]` shared between JS and the CSS `--ease-brand` token (`lib/motion.ts`); Lenis smooth scroll (`components/SmoothScroll.tsx`); `components/motion/`.
- **Conversion tracking**: pure `classifyClick()` classifies tel:/CTA clicks, tested; gclid etc. captured (`lib/tracking.ts`, `components/TrackingInit.tsx`, `tests/unit/classify-click.test.ts`); `CookieConsent` component.
- **Headers**: HSTS preload, nosniff, COOP; CSP `frame-ancestors` for QAUI portal (`next.config.ts`).
- **CI**: `quality.yml` job "Build + SEO invariant gate" runs `npm ci`, build, `npm test`, plus a React Doctor "new issues only" scan; also `ci.yml` (`.github/workflows/`).

### C. Hard numbers
- Commits: 96 (2026-03-03 to 2026-08-28).
- 26 pages; 1 API route; 37 component files; 9 service pages; 16 city pages + Utah + Nebraska hubs; 7 audited redirects.
- Test files: 11 (7 in `tests/seo/`, 4 in `tests/unit/`), 860 total lines.
- `docs/seo/README.md` references a 241-domain disavow file (`docs/seo/disavow.txt`) as an off-site action item. Verify the file exists before quoting; do not claim it was submitted.

### D. Documentation present
- `README.md` is create-next-app boilerplate.
- `docs/seo/README.md`: SEO remediation table of code fixes (5 legacy 404 redirects, out-of-area page redirect, robots fix, meta clamp, Utah page retarget) and an off-site checklist (disavow, re-indexing).
- `SEO-VISUAL-AUDIT.md`: dated 2026-06-16 SEO + visual audit; argues the week's -52% clicks was brand-query flux and "nothing broke" (one commit in 30 days), diagnosing thin templated money pages ranking page 3-10.
- `studio/README.md`; `.react-doctor/false-positives.md`; `.agents/skills/*` (agent skill files, not project docs).

### E. Testing
- Vitest 4 (`vitest.config.ts`). `npm run test:seo` runs the SEO suite only. Tests: content uniqueness, internal links, metadata, redirects, rendered HTML (needs a build; skips locally if `.next` missing, always live in CI per file comment), robots, sitemap; unit tests for meta clamp, click classification, Sanity queries, sanitisation.

### F. Notable engineering details
- Turning an SEO audit into regression tests (content similarity, redirect table, rendered canonicals) so fixes cannot silently regress.
- The audit corrects a false narrative (a "crash" that was brand-query noise) with data, which is a good non-inflated story.

### Not verified / omit
- No contact-form backend found in this repo (`ContactForm.tsx` exists; no API route for it besides revalidate). Do not claim form-delivery mechanics. No traffic/ranking outcomes.

---

## ai-audit-dashboard

### A. Route/feature inventory
- 8 page routes + `not-found` (`src/app/`): `/` (portfolio overview), `/projects`, `/projects/[slug]`, `/security`, `/seo`, `/performance`, `/code-quality`, `/settings`. All data pages use `export const dynamic = "force-dynamic"`.
- Purpose (`README.md`): visualises AI-generated audits; it does **not** run audits. An AI agent writes three files per project (`audit.json`, `summary.md`, `raw-report.txt`) into `audits/<slug>/`; the dashboard reads the filesystem at request time.

### B. Architectural decisions
- **File-system as database**: `src/lib/audits.ts` reads `audits/` with `fs`, no DB or API. Overwrite files to update; no migration step (`README.md`).
- **Tolerant schema normalisation**: `normalizeAudit()` coerces drift between agent versions (string vs object `project`, `effort` vs `difficulty`, `codeQuality` vs `code_quality`) so differently-authored audits still render (`src/lib/audits.ts`).
- **Typed audit contract**: `schemaVersion: 1`, five categories (security, seo, performance, code_quality, infrastructure), severities critical/high/medium/low/info, difficulty trivial..expert, scores 0-100 (`src/lib/audit-types.ts`).
- **Reusable audit brief**: `audits/.audit-prompt.md` is a standardised subagent brief (what to read, score bands, output schema) so each project audit is comparable.
- **UI**: Next.js 15 App Router, shadcn/Radix primitives, Recharts radar/stacked bars/histograms, score rings (custom SVG), theme provider (dark/light/system), markdown rendering with GFM (`src/components/charts.tsx`, `score-ring.tsx`, `markdown.tsx`).
- Aggregated cross-project views per category (`/security`, `/seo`, `/performance`, `/code-quality`), expandable issue list with severity/category filters and search, sidebar search with per-project score badge and critical count (`README.md`, `src/components/sidebar.tsx`, `issue-list.tsx`).

### C. Hard numbers (all computed from files)
- Git: not a git repository (no commit count available).
- 37 source files under `src/`, 23 under `src/components/`.
- 58 audit folders, 58 `audit.json`; excluding the 2 `_mock-*` demos: **56 real project audits**, 0 failed to parse.
- Across those 56 audits: **1,424 issues** total: 100 critical, 428 high, 594 medium, 294 low, 8 info. By category: security 380, code_quality 312, performance 276, infrastructure 200, seo 256. (Script over `audits/*/audit.json`, excluding `_mock*`.)
- All 56 carry `auditDate` 2026-05-14 and `metadata.auditor` "claude-opus-4-7".
- Tests: 0.

### D. Documentation present
- `README.md`: architecture, three-file contract, JSON schema, route table, features, how to add/update/remove audits.
- `audits/.audit-prompt.md`: agent brief. 58 `summary.md` files are generated outputs.

### E. Testing
- None.

### F. Notable engineering details
- The same dashboard pattern is a deliberate separation: generation (AI agent) vs visualisation (deterministic UI), with a schema contract in between.
- Settings page has "reduce motion"/"high contrast" toggles held in local state; I did not verify they apply any behaviour, so do not claim an accessibility feature.

### Not verified / omit
- Audit accuracy: counts above are the number of issues the AI wrote, not independently verified defects. Frame as "audit output the dashboard visualises", not "bugs found".

---

## agentsDashboard

### A. Route/feature inventory
- Not a routed web app: Electron desktop app (electron-vite). Renderer is a single-page React UI (`src/renderer/src/App.tsx`) with views: project grid and detail, task list, backup checklist, run history/log, credential requests, activity feed, terminal panel, preview panel, chat and team chat (separate window), Skills, MCP, Monday, project management/pipeline, team, morning digest, budget chip (`src/renderer/src/components/*.tsx`, 26 non-ui components).
- Core loop (`README.md`): per-project task queue + backup checklist; an orchestrator loop (default 30 s, concurrency 2) spawns headless `claude -p` runs.

### B. Architectural decisions
- **Process model**: Electron main process (`src/main/`, 12,926 lines across main-process TS files per `wc -l`), preload bridge (`src/preload/index.ts`), React renderer (`src/renderer/`), shared types (`src/shared/`). Window `webPreferences`: `contextIsolation: true`, `nodeIntegration: false`, `sandbox: false` (`src/main/index.ts` lines 34-36, `src/main/windows.ts`). `sandbox: false` is required for node-pty/natives; state it honestly.
- **IPC**: single wrapper `handle(channel, fn)` returns `{ok:true,data}` or `{ok:false,error}`; preload `call()` unwraps so the renderer gets plain values and real thrown errors; 76 `handle('...')` channels registered (`src/main/ipc.ts` lines 34-43; `src/preload/index.ts`). Main-to-renderer push uses a single `app:event` broadcast channel to all windows (`broadcast()`); terminal uses `term:data`.
- **SQLite (better-sqlite3)**: WAL journal mode and `foreign_keys = ON`; 10 tables: `projects`, `tasks`, `backup_items`, `runs`, `credential_requests`, `settings`, `agent_notes`, `project_memory`, `chat_messages`, `team_chat_messages` (`src/main/db.ts` lines 23-142). Schema evolved by guarded `ALTER TABLE ... ADD COLUMN` blocks (project liveUrl/Ahrefs/Vercel fields, claim fields `claimedByTeam/claimedUntil/claimedPhase`, task `dependsOnTaskId`, `autoRetryCount`, `shipCard`, `scheduledFor`, run `personaName`, etc.) rather than a migration framework (`src/main/db.ts` ~160-245). Tasks have FK `dependsOnTaskId ... ON DELETE SET NULL`; runs cascade on project delete.
- **pty handling**: one persistent login shell per project via `node-pty` (`spawn(shell, ['-l'], {name:'xterm-256color'})`), cwd = project folder; 200,000-char scrollback buffer per session; renderer re-attaches and replays buffer; on exit, deletes the session and prints a restart hint; UI is xterm.js with the fit addon (`src/main/terminal.ts`; `package.json`). `electron-builder.yml` unpacks node-pty from asar so its `spawn-helper` can execute; `postinstall` rebuilds better-sqlite3 against Electron and chmods spawn-helper.
- **Agent execution**: each job spawns `claude -p ... --output-format stream-json --verbose --no-session-persistence --permission-mode acceptEdits --allowedTools ...` in the project folder; strips `ANTHROPIC_API_KEY` from the child env so it uses the logged-in subscription; kills runs after a configurable max (default 30 min) with SIGTERM then SIGKILL after 5 s; marks stale "running" rows failed on launch (`README.md`, `src/main/runner.ts` ~lines 33, 843, 888-915).
- **Agent-to-dashboard protocol**: agents print `NEED_CREDENTIAL: {...}` or `ADD_TASK: {...}` marker lines parsed from output (ADD_TASK capped at 5 per run, duplicate titles skipped) (`src/main/runner.ts` ~140, ~250; `README.md`).
- **Policy modules as pure, tested functions**: dispatch policy, claim policy (2-hour cross-team project claim TTL, phases audit/redesign/polish/other), retry policy (max ONE auto-retry per task; failure classes tool-blocked/rate-limit/build/timeout/unknown; rate-limit failures pause the provider instead), role policy, tool caps, skill routing, task dependencies, cost metrics (token counts + USD where reported, else labelled estimate) (`src/main/*-policy.ts`, `claim-policy.ts`, `retry-policy.ts`, `cost-metrics.ts`).
- **Rate-limit handling**: detects usage-limit sentences narrowly (comment explains an earlier looser heuristic false-fired on agent output) and pauses the whole orchestrator, resuming automatically (`src/main/runner.ts` ~428-441; `README.md`).
- **Two-provider split**: docs lock a role split where Cursor acts as PM (chat, notes, queue) and Claude is the sole task executor, to stop dual force-queue races (`docs/role-split-spec.md`; `src/main/role-policy.ts`, `cursor-agent.ts`; dep `@cursor/sdk`).
- **Dependencies between tasks**: `dependsOnTaskId`; cancelling a parent cancels queued dependents transitively; phase templates audit -> redesign -> polish auto-wire dependencies (`README.md`, `src/main/task-deps.ts`, `phase-templates.ts`).
- **Integrations**: monday.com read-only connection (`docs/monday-integration.md`, `src/main/monday*.ts`), Supabase MCP via committed project-scoped `.mcp.json` (`docs/supabase-mcp.md`), Ahrefs and Vercel fields on projects, git helpers/branch-per-run `agent/<slug>-<runId>`, push/PR (`src/main/gitops.ts`, `git.ts`).
- **Voice**: on-device dictation fallback and WAV encoding with tests (`src/main/dictation.ts`, `src/shared/wav.ts`, `wav.test.ts`); `electron-builder.yml` sets macOS microphone/speech usage strings.
- **Packaging**: `electron-builder --mac`, arm64 `dir` target, unsigned (`identity: null`) (`electron-builder.yml`).

### C. Hard numbers
- Commits: 80 (2026-09-29 to 2026-10-07).
- 137 source files under `src/`; 10 SQLite tables; 76 IPC handlers; 16 persona avatar images (`src/renderer/src/assets/personas/`).
- Test files: 21 (`src/**/*.test.ts`, Node test runner; `npm test`).

### D. Documentation present
- `README.md`: setup, how agents run, reliability, dependencies/cancel policy, scripts.
- `docs/role-split-spec.md`: Cursor=PM / Claude=worker role matrix and the problems it fixes.
- `docs/wave3-deep-plan.md`: gap-analysed backlog of next features.
- `docs/monday-integration.md`: read-only monday.com connection scope.
- `docs/supabase-mcp.md`: how agents reach Supabase through MCP.
- `coconut-bay-audit.md`: an open-work checklist produced by the app for another project (output artefact).

### E. Testing
- Node built-in runner on pure-function modules: allowed-tools, claim-policy, cost-metrics, dispatch-policy, load-env, monday, morning-digest, permission-denials, phase-templates, pm-suggestions-core, preview-detect, project-brief, retry-policy, role-policy, ship-card, skill-routing, task-deps, tool-caps, wav (x2), chat-zoom. No UI/E2E test.
- `npm run typecheck` splits node and web tsconfigs.

### F. Notable engineering details
- Policy logic is deliberately separated from DB/Electron ("pure, unit-testable") so scheduling decisions are tested without launching the app (header comments in `claim-policy.ts`, `retry-policy.ts`).
- Honest dangerous-mode design: "Full autonomy" toggle swaps in `--dangerously-skip-permissions`, off by default and labelled dangerous (`README.md`).

### Not verified / omit
- Throughput or time saved; the number of projects it manages; any cost totals. Local-only tool; do not describe as a product with users.

---

## BNC-ReactNative

### A. Route/feature inventory (screens)
- Confirmed a **leads/CRM and reporting app for BNC Builders staff** (GoHighLevel pipeline), not a consumer app: bottom-tab navigator with five admin tabs **Dashboard, Opportunities, Chat, Reports, Settings** (`App.tsx` `MainTabs`), plus a separate two-tab rep experience **My Dashboard (Sales), Settings** (`RepTabs`).
- 18 screen files under `src/screens/`: Dashboard-tab `DashboardHomeScreen`; Opportunities stack `DashboardScreen` (opportunity list), `OpportunityDetailScreen`, `NewLeadScreen`; Chat stack `ConversationsScreen`, `ChatScreen`, `ArchivedConversationsScreen` (`src/navigation/ChatStackNavigator.tsx`); Reports stack `ReportHistoryScreen`, `ReportsGenerateScreen`, `ReportDetailScreen` plus `ReportSettingsScreen`; Sales stack `RepDashboardScreen`, `UnassignedLeadsScreen`, `MonthlyReportScreen`, `SalesSettingsScreen`; shared `SettingsScreen`, `LoginScreen`, `SplashScreen`.
- Backend: 7 Supabase Edge Functions: `leads-api`, `ghl-proxy`, `ghl-webhook`, `ghl-backfill`, `reports-api`, `ad-spend-sync`, `notify-admins-new-message` (`supabase/functions/`).

### B. Architectural decisions
- **Navigation**: React Navigation v7: one bottom-tab navigator with four native-stack navigators nested (Opportunities, Reports, Sales, Settings) and a Chat stack; a per-route tab-bar style helper (`tabBarStyleFor`); a global `navigationRef` supports navigating from a push-tap (`App.tsx`, `src/navigation/*`).
- **Role-gated app shell**: a `Gate` component shows Splash while the session resolves, Login if signed out, a "not authorized" splash for accounts that are neither admin nor active sales rep, full tabs for admins, rep-only tabs for sales reps. Admin = a row in `public.admin_users` by email; rep = `public.sales_reps` matched by login email (`App.tsx`, `src/contexts/AuthContext.tsx`, `docs/reports-architecture.md`).
- **State/data layer**: TanStack React Query v5 (`staleTime` 30 s, `retry` 1) for leads/reports/sales hooks (`src/lib/queryClient.ts`, `src/hooks/useLeads.ts`, `useReports.ts`), Supabase JS client with AsyncStorage session persistence, React contexts for auth and theme (`src/lib/supabase.ts`, `src/contexts/`). Theme preference persisted in AsyncStorage (`ThemeContext.tsx`).
- **Offline handling**: limited and specific. Only the reports list is cached to AsyncStorage (`saveReportsCache`/`loadReportsCache`, "never throws") so it renders instantly before the network resolves (`src/lib/queryClient.ts`, `src/hooks/useReports.ts` line ~67). `@react-native-community/netinfo` is a dependency, but I did not verify a global offline queue; do not claim one.
- **Push notifications**: iOS APNs. The client registers device tokens (upsert on `admin_email,device_token`) (`src/lib/push.ts`); a Supabase Edge Function triggered by a Postgres trigger on new chat message sends APNs pushes carrying `conversationId` (`supabase/functions/notify-admins-new-message/index.ts`, `supabase/migrations/20260813_notify_admins_trigger.sql`); tapping a push resolves the visitor row then deep-links into that conversation (`App.tsx` `setPushTapHandler`). `push.ts` guards against a missing native module before `require()`-ing the library to avoid a `NativeEventEmitter` crash.
- **Realtime chat**: Supabase Realtime channels (`postgres_changes`) on `live_chat_messages` per conversation and on the conversation list; optimistic message placeholder replaced by the real row (`src/screens/ChatScreen.tsx` ~150-175, ~238-270; `ConversationsScreen.tsx` ~106). Image attachments with MIME allow-list (jpeg/png/gif/webp/heic/heif) and a 5 MB cap to a `live-chat-attachments` bucket (`src/lib/attachments.ts`). This uses the same Supabase tables as the BNC website's live chat (`new-bnc-builders/supabase/migrations/20260807000002_create_live_chat.sql`).
- **GHL as system of record, never exposed to the client**: all GHL calls go through `ghl-proxy`; the token lives in a function secret; only allow-listed operations; ID regex validation; only specific new-lead fields forwarded (`supabase/functions/ghl-proxy/index.ts`). `ghl-webhook` verifies GHL's **Ed25519** signature (`x-ghl-signature`) with WebCrypto instead of JWT, and records stage changes as `opportunity_stage_events` rows using receipt time (GHL payload has no change timestamp) (`supabase/functions/ghl-webhook/index.ts` header comment).
- **Reports computed server-side**: a pure metrics engine (booking ratio, total booked, work vs after-hours booked, projects sold, marketing spend, plus Phase 2 metrics) in `supabase/functions/_shared/metrics.ts`, `metrics_phase2.ts`; timeframes resolved in the GHL location timezone using Luxon, not device time (`_shared/timeframe.ts`); PDF templates (`_shared/pdf.ts`, `pdf_template.ts`); reports saved to a private storage bucket (planned in `docs/stories/README.md` story A1); live read-only Meta Ads and Google Ads campaign lists printed on reports with "Not connected"/"Error" rather than stand-in data (`docs/live-ad-campaigns.md`, `_shared/meta_ads.ts`, `google_ads.ts`). On-device HTML-to-PDF rendering path also present (`src/lib/reportHtml.ts`, `react-native-html-to-pdf`).
- **Sales rep dashboard**: `lead_records` side table keyed by GHL opportunity id for fields GHL cannot hold (project manager + assignment date, sold-rep override, sale amount, closed date, markup %, first-contact time); commission plan and settings tables; "Nothing here invents numbers. Anything that cannot be computed shows N/A or a warning with a reason" (`docs/sales-dashboard-spec.md`; migrations `20261006000000`..`20261008000003`).
- **UX component**: `SlideToConfirm` uses Reanimated shared values + `withSpring` + Gesture Handler (`src/components/SlideToConfirm.tsx`).
- **Release**: fastlane with `certs`, `beta`, `beta_auto` lanes for TestFlight (`ios/fastlane/Fastfile`).
- **Styling**: NativeWind v4 + Tailwind 3.

### C. Hard numbers
- Commits: 50 (2026-05-12 to 2026-10-08).
- 18 screens, 7 edge functions, 14 SQL migrations, 14 distinct tables created in migrations (`opportunity_stage_events`, `reports`, `marketing_spend`, `report_settings`, `csrs`, `ad_spend`, `sales_reps`, `commission_plan`, `report_commissions`, `sales_settings`, `lead_records`, `lead_pm_history`, `lead_pm_pending`, `lead_first_contact`).
- 45 files under `src/`.
- Tests: 1 Jest smoke test (`__tests__/App.test.tsx`: renders `<App />`) plus **6 Deno test files with 141 `Deno.test` cases** in `supabase/functions/tests/` (ad-campaigns 18, dispatch-first-contact 24, metrics 22, rep-dashboard 18, timeframe 8, metrics-phase2 51).

### D. Documentation present
- `docs/reports-prd.md`: PRD for CSR performance reports from GHL data.
- `docs/reports-architecture.md`: source-of-truth architecture (backend on Supabase edge functions, RLS, GHL constants).
- `docs/stories/README.md`: epic/story breakdown (A1 schema+RLS+bucket, etc.).
- `docs/sergio-phase2-spec.md`: Phase 2 metrics spec (leads dispatched per rep, time to first contact).
- `docs/sales-dashboard-spec.md`: 16-task rep-dashboard build notes; status "built on branch agent-work, not yet deployed" as of 2026-10-08.
- `docs/live-ad-campaigns.md`: read-only live ad campaign snapshot on reports.
- `docs/monday-audit-2026-10-06.md`, `docs/monday-items-plan-2026-10-06.md`: reconciliation of delivered work against a monday board, including a candid "marked Done but off in prod" caveat.
- Root `README.md` is the React Native template.

### E. Testing
- Metrics, timeframe, rep dashboard, ad campaign and first-contact dispatch logic are tested in Deno against the pure engines. App side has only a render smoke test. Jest preset from `@react-native/jest-preset`.

### F. Notable engineering details
- Webhook authenticity via Ed25519 (WebCrypto) with `verify_jwt=false` documented in `config.toml` comments.
- GHL payload has no previous-stage or change timestamp; the design compensates by tracking last known `to_stage_id` (`ghl-webhook/index.ts`).
- Caution for publishing: the repo root contains an APNs auth key file (`AuthKey_F33MQZF3MB.p8`). Do not reference, screenshot, or link it, and consider flagging it to the owner.

### Not verified / omit
- App Store/TestFlight release status; number of users; whether Android is shipped; the sales dashboard is described as not yet deployed in its own spec. Do not state report accuracy or sales outcomes.

---

## CampAlegria-Mobile

### A. Route/feature inventory
- Staff chat inbox for Camp Alegria admins (not a parent-facing app): "lets admins read and reply to live-chat conversations submitted by website visitors" (`README.md`).
- 4 stack screens declared plus gate screens (`src/navigation/RootNavigator.tsx`): `Conversations`, `Chat`, `ArchivedConversations`, `Settings`; `LoginScreen`, `SplashScreen`. 6 screen files total; 18 files in `src/`.

### B. Architectural decisions
- **Stack**: bare React Native 0.85 CLI (not Expo), NativeWind v4, Supabase JS v2 (auth, Postgres, Realtime), AsyncStorage session persistence, React Navigation native stack (`README.md`, `package.json`). A `patch-package` patch fixes `react-native-css-interop@0.2.4` (`patches/`).
- **Shared backend**: uses the same Supabase project/auth as the Camp Alegria web app; depends on web-repo migration `059_admin_chat_reply_policies.sql` for admin INSERT policy (`README.md`).
- **Auth/roles**: email+password; after sign-in checks `admin_users` by email, else access denied (`README.md`, `src/contexts/AuthContext.tsx`, `RootNavigator.tsx`).
- **Server-enforced permissions (RLS)**: `admin_users` gains `can_close_conversations` and `can_archive_conversations` (default false). RLS policies on `live_chat_conversations` allow closing only if the admin has the flag, archive/unarchive for any admin, and other updates only when status is not being changed to closed/archived; comment: "a determined client could call `.update({status:'archived'})` directly ... RLS makes the DB itself say no" (`PERMISSIONS_SETUP.sql`).
- **Realtime + optimistic UI**: `postgres_changes` INSERT subscription per conversation with de-dup by id, auto mark-read for visitor messages, optimistic message placeholder (`src/screens/ChatScreen.tsx` ~148-175, ~238); unread badge counts on the conversation list.
- **Push**: iOS APNs; device tokens in `admin_push_tokens` (`src/lib/push.ts`); Supabase Edge Function `notify-admins-new-message` signs a JWT with djwt (`deno.land/x/djwt`) from the `.p8` key, picks sandbox or production APNs host by env, and sends to every admin device token (`supabase/functions/notify-admins-new-message/index.ts`). Local state: AsyncStorage for session and theme (`src/contexts/ThemeContext.tsx`).
- **Offline**: no explicit offline cache found beyond AsyncStorage session persistence. Do not claim offline support.
- **Release tooling**: `scripts/deploy-testflight.sh` archives and uploads to TestFlight via an App Store Connect API key (env-provided, not committed).
- **Branding**: Tailwind brand palette ported from web (`alegria-navy`, `alegria-orange`) in `tailwind.config.js`; `PoweredByComCreate` component.

### C. Hard numbers
- Commits: 7 (2026-06-01 to 2026-06-11).
- 6 screens, 18 source files under `src/`, 1 edge function, 1 SQL permissions script.
- Tests: 1 Jest smoke test (`__tests__/App.test.tsx`).
- `src/screens` total 1,899 lines.

### D. Documentation present
- `README.md`: stack, run commands, auth model, RLS dependency, file map, secrets guidance (anon key only; service-role key never shipped).
- `PERMISSIONS_SETUP.sql`: self-documenting SQL with comments on per-admin permissions and RLS.

### E. Testing
- Single render smoke test. No logic tests.

### F. Notable engineering details
- Permission model enforced at the database row level rather than only in the UI.
- Sibling of the BNC app: same chat-inbox + APNs-push pattern reused for a second client (compare `BNC-ReactNative/supabase/functions/notify-admins-new-message`).

### Not verified / omit
- Release/TestFlight status, user counts, Android status. The CampAlegria web repo (`/Volumes/Comcreate/Camp-Alegria`) holds the migrations referenced but is outside this project folder.
