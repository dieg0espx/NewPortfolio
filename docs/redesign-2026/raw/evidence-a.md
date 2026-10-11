# Evidence pack A — verified facts (read-only audit)

Method: file reads, `ls`, `find`, `grep`, `git log --oneline | wc -l`. Counts exclude node_modules and .next. Paths are relative to each project root under /Volumes/Comcreate. Nothing here is a live-URL claim. Anything not listed was not verified.

---

## scenic-doors  (/Volumes/Comcreate/Scenic-Doors)

Stack (package.json): Next.js ^16.1.6, React 19, Supabase (@supabase/ssr), Square SDK, Resend, Cloudinary, jspdf + pdf-lib, Tailwind 4, Framer Motion, Recharts.

### A. Route / feature inventory
- 51 `page.tsx` + 13 `route.ts` under `src/app` (64 route files).
- Public marketing: `/`, `/about`, `/blog`, `/blog/[slug]`, `/contact`, `/faq`, `/gallery`, `/installation`, `/privacy`, `/terms`, `/service-areas`, `/doors` + 7 door-type pages (`doors/fold-up-windows|folding|multi-slide|pivot|pocket|slide-stack|ultra-slim`).
- Quote funnel: `/quote`, `/book`, `/quote/[id]`, `/quote/[id]/contract`, `/quote/[id]/pay`, `/invoice/[id]`, `/portal/[id]` (client portal).
- Admin (`src/app/admin/*`, 23 pages): clients (list/new/[id]/edit), leads (+[id]), quotes (list/new/[id]/edit/print), orders (+[id]), contracts, invoices, payments, calendar, contractors, discounts, marketing, notifications, users, account.
- API (`src/app/api`): `active-discounts`, `capi`, `consent`, `cosco-tracking`, `cron/follow-ups`, `cron/retry-conversions`, `pricing-rates`, `square/config`, `square/pay`, `upload-document`, `upload-photo`; plus `auth/callback` and a `[slug]/route.ts`.

### B. Architectural decisions with evidence
- **Auth / roles**: `src/proxy.ts` (Next 16 "proxy" convention) runs Supabase session refresh on every non-API request, then attribution capture. `src/lib/supabase/middleware.ts` redirects unauthenticated users from `/admin*` to `/login`. `src/lib/auth.ts` comments: users not in the admin table get a `role: "sales"` identity; "admin-only actions stay gated by the role check". `docs/ADMIN_MANUAL.md` documents two roles: Admins (full) and Sales Reps (own quotes/leads only).
- **Payments (Square)**: `src/app/api/square/pay/route.ts` re-reads the authoritative amount from the DB (`getPaymentById`) instead of trusting the client, rejects already-completed payments, applies a 3% card surcharge (`src/lib/payment-fees.ts`: `CREDIT_CARD_FEE_RATE = 0.03`), and creates the Square payment with a `randomUUID()` idempotency key. No Square webhook handler exists in `src/app/api` (verified by listing).
- **Data model**: 35 files in `supabase/migrations` (001–034; two files share the 015 prefix). Tables include quotes, contracts, payments, orders, clients, appointments, tracking_links, consent_log, contractors, installation_quotes, sales-rep referrals (migration names 001–034).
- **RLS**: `grep` finds 27 `ENABLE ROW LEVEL SECURITY` statements and 61 `CREATE POLICY` statements across migrations. `027_consent_log.sql` documents: anon can insert; reads only via service_role, "no SELECT policy needed".
- **Cron / background jobs**: `vercel.json` defines two crons: `/api/cron/follow-ups` daily `0 9 * * *` and `/api/cron/retry-conversions` every 10 min. Both require `Authorization: Bearer $CRON_SECRET`. Follow-ups route runs `sendPendingFollowUps` and `ageLeadStatuses` in parallel (`src/lib/cron/`).
- **Retry with backoff**: `src/app/api/cron/retry-conversions/route.ts` header comment: picks `conversion_events` rows with `status='failed'`, `attempt<6`, batch of 100; backoff `[1,5,15,60,240,1440]` minutes; after 6 attempts status becomes `dead` and surfaces in an admin card. Dedup: Meta on event_id (48h), Google Ads on order_id, TikTok on event_id.
- **Server-side conversion tracking**: `src/lib/tracking/platforms/{ga4,googleAds,meta,tiktok}.ts`; `src/app/api/capi/route.ts` hashes user data server-side and forwards to Meta with the shared `event_id`. `src/lib/tracking/conversions.ts` upserts with `onConflict: "event_id,platform,event_name"` to prevent retry double-fire.
- **Attribution**: `src/lib/tracking/middleware-attribution.ts` writes click IDs + UTMs as first-party cookies on ad landings (called from `src/proxy.ts`).
- **Consent**: `src/lib/consent/`, `src/app/api/consent/route.ts`, `consent_log` table keyed by anonymous_id, no PII (`supabase/migrations/027_consent_log.sql`).
- **PDF generation**: five generators in `src/lib/`: `generateContractPdf.ts` (306 lines), `generateInvoicePdf.ts` (406), `generateOrderPdf.ts` (292), `generateApprovalDrawingPdf.ts` (393), `generateReceiptPdfServer.ts` (183), plus `stampSignaturePdf.ts` which uses pdf-lib to draw a client signature PNG onto a factory manufacturing drawing at fixed fractional coordinates (`SIG_BOX`), with a wider box for typed-name signatures.
- **Email / alerts**: `src/lib/email.ts` (Resend), `src/lib/slack.ts`.
- **Caching**: 28 files reference `revalidate`/`unstable_cache`.

### C. Hard numbers
- Commits: 426 (first 2025-12-18, last 2026-06-30 by `git log` dates).
- Pages 51, route handlers 13, migrations 35 files, CREATE TABLE statements 27, RLS enables 27, policies 61, crons 2, PDF generators 5, server actions modules 26 in `src/lib/actions`.
- Test files: 0.

### D. Documentation present
- `README.md` (single line, title only).
- `docs/ADMIN_MANUAL.md` – every admin feature, written for Admin and Sales Rep roles.
- `docs/CLIENT_MANUAL.md` – customer walkthrough from quote request to delivery.
- `docs/TRACKING_PLAN.md` – GA4 + GTM + Meta/Google Ads/TikTok/X server-side conversion APIs, Consent Mode v2, one `event_id` per conversion, closed-loop CRM attribution (dated 2026-04-14).
- `docs/LOCATION_SEO_PLAN.md` – West Coast local-SEO expansion plan (dated 2026-04-15); states site had DR 0 and 2 branded keywords at the time.
- `docs/LOCATION_KEYWORDS.md` – Ahrefs-validated location keyword matrix (pulled 2026-04-15).

### E. Testing
- No test files, no test framework in package.json. Scripts: `lint`, `typecheck` only.

### F. Notable engineering details
- Closed-loop attribution: ad click IDs captured in proxy, stored on leads, replayed to four ad platforms server-side with dedup IDs and a dead-letter state.
- Signed manufacturing drawing: client signature is stamped onto the factory's own PDF.
- `src/proxy.ts` uses the Next 16 `proxy` convention (not `middleware`).

---

## camp-alegria  (/Volumes/Comcreate/Camp-Alegria)

Stack (package.json): Next.js ^15.1.6, React 19, Supabase, Stripe ^20 + @stripe/react-stripe-js, Resend, Cloudinary, jspdf, react-hook-form + zod, dnd-kit, Tailwind 3.

### A. Route / feature inventory
- 57 pages + 77 route handlers under `app`.
- Public/parent: `/`, `/camps`, `/ages-schedule`, `/locations`, `/faq`, `/contact`, `/gift-cards`, `/register`, `/signup`, `/login`, `/forgot-password`, `/reset-password`, `/account/cart`, `/parent-dashboard` (children, enrollments, payments), `/waitlist-offer/[token]`, `/confirm-move`, `/invoice/[id]`, `/spanish-horizons-academy` (+apply), legal/consent pages (`liability-waiver`, `media-consent`, `social-media-release`, `behavioral-agreement`, `parent-handbook`, `terms`).
- Admin `/dashboard` (15 section folders): abandoned-carts, camps, capacity, contacts, coupons, email-marketing, emails, enrollments, gift-cards, invoices, notifications, payments, rsvps, students, waitlist.
- API groups (counts of route.ts): `api/admin` 13, `api/gift-cards` 10, `api/enrollments` 7, `api/stripe` 5 (cancel-payment, create-payment-intent, receipt, verify-payment, webhook), `api/cart` 5, `api/waitlist` 4, `api/consent` 4, `api/upload` 3, `api/live-chat` 3, `api/invoice` 3, `api/forms` 3, `api/children` 3, plus classrooms, camps, auth, parent, rsvp, contact, send-coupon, sha/applications, enrollment-move, cron/cart-reminders.

### B. Architectural decisions with evidence
- **Auth / roles**: `middleware.ts` calls `updateSession`; `lib/supabase/middleware.ts` guards `/dashboard` and calls `isAdminUser(supabase, user.email)` (`lib/supabase/admin`). Admin identity lives in an `admin_users` table (`supabase/migrations/001_create_admin_users_table.sql`) with RLS enabled.
- **RLS volume**: 99 `CREATE POLICY` occurrences across migrations.
- **Race-safe capacity**: `ENROLLMENT_CAPACITY_BUG_REPORT.md` documents a read-modify-write race on cached `enrolled` counts (two parents each read 10, both write 12). Fix: `supabase/migrations/046_add_atomic_enrollment_functions.sql` and `053_add_atomic_enrolled_count_functions.sql` add `increment_week_enrolled`, `decrement_week_enrolled`, `increment_day_enrolled`, `decrement_day_enrolled` (with `GREATEST(0, …)` floor) and `reconcile_week_enrollment_count` for drift repair.
- **Cart layer**: `064_create_cart_tables.sql` (372 lines) created `carts`/`cart_items`/`cart_holds` with 30-minute soft holds via a SECURITY DEFINER RPC `add_to_cart_with_hold` using `FOR UPDATE` row locks. `066_drop_cart_holds.sql` later removed the hold system "per product decision", keeping the row lock for a single capacity check and relying on the atomic count functions at payment time. This is a documented reversal.
- **Payments (Stripe) + idempotent finalize**: `app/api/stripe/webhook/route.ts` verifies the signature with `stripe.webhooks.constructEvent` on the raw body, handles only `payment_intent.succeeded`, looks up `cart_id` in PaymentIntent metadata, short-circuits if cart status is already `completed`, and calls `finalizeForAuthenticatedUser` (`lib/cart-finalize.ts`, 301 lines). That function's header says it is idempotent and called from both `/api/cart/finalize` and the webhook; "whichever wins the row lock claims it". Webhook comment: safety net "when the client tab dies between confirmPayment and finalize".
- **Cron / background**: `vercel.json`: `/api/cron/cart-reminders` every 15 min. Route uses `CRON_SECRET` bearer auth, `maxDuration = 60`, `MAX_ATTEMPTS = 3`, three reminder steps (`step: 1|2|3`), with `lib/cart-reminder-emails.ts` and migration `065_cart_reminders.sql`.
- **Waitlist**: migrations 023, 032 (confirmation token), 040 (waitlist days), 054 (unique-constraint fix); routes `api/waitlist/offer` and `/offer/confirm`; page `waitlist-offer/[token]`.
- **Enrollment moves**: `030_create_enrollment_move_requests.sql`, `lib/enrollment-move.ts`, `api/enrollment-move/confirm`, `api/admin/enrollments/move-week`.
- **Live chat**: `058_create_live_chat_tables.sql`, `059_admin_chat_reply_policies.sql`, `061_add_live_chat_attachments.sql`, routes `api/live-chat`.
- **Pricing**: `036_add_pricing_type_to_camp_programs.sql`, `039_add_age_based_pricing.sql`, `052_add_age_group_prices_to_camp_weeks.sql`, `056_add_sibling_discount_to_enrollments.sql`, `lib/pricing.ts`.
- **Gift cards / coupons**: migrations 007, 008, 009, 012, 014; 10 gift-card routes (validate, redeem, balance, create-payment-intent, send-email, …).
- **Consent / forms**: `003_create_consent_forms_table.sql`, `020_create_required_forms_tables.sql`, `028_migrate_consent_forms_to_completed_forms.sql`; routes `api/consent/{sign,photo,status,update-media}`, `api/forms/{complete,download,status}`; signature upload `api/upload/signature`.
- **Email**: Resend via `lib/resend.ts`; `lib/camp-cancellation-email.ts`, `lib/cart-reminder-emails.ts`; admin bulk send `api/admin/email-marketing/send`.
- **Admin notifications**: `024_create_admin_notifications.sql`, `062_fix_notify_admins_null_url.sql`.
- **SEO files**: `app/robots.ts`, `app/sitemap.ts`; middleware matcher keeps `sitemap.xml`, `robots.txt`, `llms.txt` public.

### C. Hard numbers
- Commits 224. Pages 57, route handlers 77. Migration files 58 (numbered 001–067 with gaps), CREATE TABLE statements 31, policies 99. Crons 1. Admin dashboard sections 15. Test files 0.

### D. Documentation present
- `README.md` (292 lines) – site overview and design philosophy.
- `ENROLLMENT_CAPACITY_BUG_REPORT.md` – root-cause analysis of the capacity race condition.
- `CAPACITY_FIX_INSTRUCTIONS.md`, `APPLY_FIX_NOW.md` – fix rollout steps.
- `ROTATE_SECRETS.md` – checklist after a security audit flagged live secrets in `.env.local`.
- `admin-manual.html` – admin manual (present at root).
- `docs/archive/` – 11 archived docs: schema migration status, database connection fixes, consent-system migration guide, CRM implementation plan, Cloudinary setup, brand colors, test report, quick start, etc.

### E. Testing
- No test files or test framework in package.json. Scripts: `lint`, `typecheck`. `docs/archive/TEST_REPORT.md` exists (not read in depth, so not characterized here).

### F. Notable engineering details
- Bug report, fix migrations, then a deliberate product simplification (drop holds) is all traceable in files above.
- SQL repair scripts for moved-enrollment days exist in `scripts/` (`fix-moved-enrollments-days.sql`, `fix-week12-correct-days.ts`), and admin recovery endpoints `api/admin/fix-enrollment-days`, `recover-enrollment-days`.

---

## er-soccer  (/Volumes/Comcreate/ER-soccer)

Stack (package.json): Next.js ^16.3.7, React 19.3.0, raw Postgres via `pg` (no ORM), AWS S3 SDK + presigner, pdf-lib + fontkit, Vitest, Radix UI, dnd-kit. `wrangler.toml` binds a Cloudflare R2 bucket "er-soccer" for hero media only; app deploys on Vercel (stated in that file).

### A. Route / feature inventory
- 51 pages + 59 route handlers under `src/app`.
- Marketing `(site)`: home, about, programs (9 files), faq, contact, careers, partners, testimonials, signup, login, waiver, terms, privacy.
- Three role portals: `/crm/(dashboard)` (14 pages, admin/staff back office), `/coach` (programs, players, enrollments, attendance, bookings, profile), `/family` (players, enrollments, payments, requests, book-a-coach, profile).
- API: `api/crm` 26 route files (bookings, coach-requests, coaches, contracts, dashboard, enrollments, exports, families, leads, notifications, payments, players, programs, auth), `api/family` 13, `api/coach` 12, `api/cron` 2 (notifications, bookings), `api/webhooks` (stripe), `api/parent-contracts`, `api/uploads`, `api/notifications`, `api/leads`, `api/auth`.

### B. Architectural decisions with evidence
- **Four-role RBAC from session, not input**: `migrations/0003_rbac.sql` widens `staff_users.role` CHECK to `admin|staff|coach|family`. `src/lib/crm/rbac.ts` header: `requireRole` passes the session user (with `coach_id`/`family_id`) to handlers so "a coach can only ever touch their own coach_id, a family only their own family_id" — "the core security invariant".
- **Sessions**: `src/lib/crm/session.ts`: opaque random token in an httpOnly cookie; only its SHA-256 is stored in DB; 7-day expiry (`SESSION_DAYS = 7`); cookie scoped to /crm.
- **Passwords**: `src/lib/crm/password.ts` uses Node built-in scrypt, stored as `scrypt$<salt>$<hash>`, "no external dependency".
- **Booking state machine**: `docs/pipeline/02-architecture-state-machine.md` – single `bookings` table (migration 0009) replaces a split of `coach_requests` + parent-created `enrollments`. 8 states: pending, awaiting_payment, paid, declined, cancelled, payment_failed, refunded, expired. Transitions enforced in one `transitionBooking` helper; any illegal transition returns 409; all writes use `SELECT … FOR UPDATE`. Implemented/tested in `src/lib/crm/booking-state.ts` + `booking-state.test.ts`, `booking-decision.ts`, `booking-expiry.ts`.
- **Duplicate-prevention index**: `migrations/0009_bookings.sql` partial unique index `idx_bookings_live` on (player_id, coach_id, program_id) where status in pending/awaiting_payment/paid/payment_failed; second unique index on `enrollment_id`; partial index on `expires_at` where `awaiting_payment`. Money is integer cents (`price_cents`), per the architecture doc.
- **Stripe webhook without the SDK**: `src/lib/payments/stripe-webhook.ts` verifies HMAC-SHA256 of `"<t>.<rawBody>"`, constant-time compare via `timingSafeEqual`, 300-second timestamp tolerance against replay. Architecture doc: webhook is "idempotent (dedupe on Stripe event id in a `payment_events` table)"; client redirect "cosmetic only". Tests: `stripe-webhook.test.ts`, `provider.test.ts`, `simulate-card.test.ts`.
- **Payments fallback**: if Stripe env is absent, pay endpoint returns a clear error and admins use "Mark paid" (`docs/pipeline/06-ship-summary.md`); a simulated card checkout exists for testing (`simulate-card.ts`, `simulate-payment-dialog.test.tsx`).
- **Cron**: `vercel.json` – `/api/cron/notifications` daily 07:00, `/api/cron/bookings` hourly. Bookings cron expires unpaid approvals (72h TTL per ship summary), authenticated with `CRON_SECRET` compared via `timingSafeEqual` (`src/app/api/cron/bookings/route.ts`).
- **Contracts encrypted at rest**: `src/lib/contracts/crypto.ts` – AES-256-GCM, 12-byte random IV, AAD bound to a context string, `ERSC01` magic header, SHA-256 digests; key must be a validated 32-byte base64 value. `src/lib/contracts/pdf.ts` builds PDFs with pdf-lib and an embedded Noto Sans subset (`src/assets/NotoSans-Regular.ttf`). `docs/contracts-aws-setup.md` + `src/lib/s3.ts`: private S3 storage prepared via CloudFormation (versioning, AES256, public access blocked, access-log bucket, least-privilege IAM). That doc states plainly it is "a prepared deployment, not an already provisioned environment".
- **Polling, not SSE**: the architecture doc proposed SSE; `docs/pipeline/06-ship-summary.md` says live updates shipped as 10-second polling, and no `api/events` route exists. Report polling only.
- **In-app + email notifications**: migrations `0008_email_notifications.sql`, `0010_notifications_inapp.sql`; `src/lib/notifications/{delivery,schedule,server}.ts`; `docs/email-notifications.md` (Resend).
- **Migrations runner**: `scripts/migrate.mjs` (`db:migrate`, `db:status` npm scripts).
- **Legacy retirement**: ship summary says legacy parent direct-enroll and coach-request POST now return 410.

### C. Hard numbers
- Commits 75 (first 2026-08-18, last 2026-10-01). Pages 51, route handlers 59. Migrations 11 (0001–0011). CREATE TABLE statements 18. Crons 2. Roles 4.
- Test files: 19 Vitest `*.test.ts(x)` + 11 `scripts/test-*.cjs` integration/unit scripts. `docs/qa-e2e-report-2026-09-30.md` reports 79 Vitest tests passing, program-validation 54, sample-contract-guard 6, notification-delivery unit 17 (all PASS) and states DB-backed integration suites could NOT run in that environment (host did not resolve).

### D. Documentation present
- `README.md`, `AGENTS.md`/`CLAUDE.md` (Next.js agent rules).
- `docs/pipeline/01-analyst-audit.md` through `06-ship-summary.md` – a six-stage BMAD-style pipeline (audit, architecture/state machine, PRD, PO validation, stories, ship summary) for the booking pipeline, dated 2026-09-30.
- `docs/email-notifications.md` – Resend setup and notification behavior.
- `docs/contracts-aws-setup.md`, `docs/contracts-status.md` – private contract storage plan and parent-contract integration status.
- `docs/qa-e2e-report-2026-09-30.md` – QA report with pass counts and a stated blocker.
- `docs/hook-refactor-qa.md` – QA sign-off after 15 React hook-rule fixes and a Next 16 build fix.
- `docs/next-16-upgrade-plan.md` – migration plan (status "Planned"; package.json now shows Next ^16.3.7).
- `docs/requirements-coverage.md` – client wishlist vs built features.
- `docs/client-photo-request.md` – open request to client for real photos.

### E. Testing
- Vitest (`vitest.config.ts`, `vitest.setup.ts`); coverage areas: booking state machine, RBAC, payments provider/webhook/simulate-card, CRM lead details, family payments/enrollments/requests UI, coach attendance, site header, hooks, mutation feedback.
- `package.json` defines `test:unit`, `test:integration`, `test:ci` (lint + typecheck + unit). Integration scripts cover contracts, portals, accounts, family enrollments, booking pipeline, coach requests, notification queue/delivery.

### F. Notable engineering details
- Hand-rolled Stripe signature verification and scrypt/sha256 session handling keep the auth/payment core dependency-light.
- Encrypted, hash-verified contract PDFs with context-bound AAD.
- Documented, honest QA report that records what could not be run.

---

## sdd-umps  (/Volumes/Comcreate/sdd-umps-frontendmain (1))  — SD Dumping Solutions

Per `README.md`: dumpster rental booking and management platform for a San Diego roll-off dumpster company. Stack: Next.js 16.3.6, React 19, Supabase (Postgres + RLS), Stripe (Payment Intents, Setup Intents, saved cards, webhooks), Sanity CMS (blog), Resend, Cloudinary (signature images), Google Maps Distance Matrix, GTM/GA4, Tailwind 4 + shadcn/Radix. package.json name is `my-v0-project`.

### A. Route / feature inventory
- 36 pages + 46 route handlers under `app`.
- Customer: `/`, `/booking`, `/booking/thank-you`, `/guest-booking`, `/bookings`, `/payments`, `/payment-methods`, `/payment/[token]`, `/invoice/[token]`, `/profile`, `/chat`, `/services`, `/service-areas` and `/service-areas/[city]`, `/blog` and `/blog/[slug]`, `/about`, `/contact`, `/auth/*` (login, sign-up, success, error).
- Admin (13 pages): bookings/new, calendar, cards-on-file, chat, client-history, contracts, inventory, invoices, payments, phone-bookings, pricing, users, dashboard.
- API highlights: `api/webhooks/stripe`; `api/admin/*` (21 routes incl. cancel-booking, move-booking, extend-booking, end-rental-early, create-phone-booking, create-invoice, charge-manual-card, manual-refund, set-payment-status, pricing-config, contract-terms, invoices/reconcile, send-review-request, revive-expired-links, backfill-stripe-customer-ids); `create-payment-intent`, `setup-intent`, `charge-saved-card`, `charge-booking-card`, `payment-methods`, `verify-payment-method`, `calculate-distance`, `upload-signature`, `delete-signature`, `guest-inquiry`, `send-booking-email`, `payment-link/{complete,expire-old}`.

### B. Architectural decisions with evidence
- **Auth**: `middleware.ts` runs Supabase `updateSession`; matcher explicitly excludes robots/sitemap/llms/manifest so "the auth redirect" never serves crawlers the login page. Admin routes check `profiles.role` / `is_admin` (e.g. `app/api/admin/invoices/reconcile/route.ts` returns 401 without a user and reads `role, is_admin` from `profiles`).
- **Stripe webhook idempotency**: `app/api/webhooks/stripe/route.ts` verifies the signature (`constructEvent`), handles `payment_intent.succeeded` only; invoice payments (metadata `invoice_id`) route to `markInvoicePaid`; otherwise it skips if a `payments` row with the same `transaction_id` already exists ("idempotency"), resolves the booking via `metadata.booking_id` or falls back to matching a pending booking by Stripe customer email and amount, then sends a receipt email.
- **Self-healing invoices**: `app/api/admin/invoices/reconcile/route.ts` doc: reconciles unpaid invoices against Stripe "even if the webhook or client confirm never landed", called by the admin invoices page before listing.
- **Saved-card model for accountless customers**: `migrations/create_card_customers_table.sql` explains why: phone bookings and guest checkout created cards on throwaway Stripe customers never linked to anything; new `card_customers` table maps one lower-cased email to one Stripe customer so cards persist and can be re-charged; UNIQUE on email supports `ON CONFLICT (email)` upsert. Logged-in users use `profiles.stripe_customer_id` (`add_stripe_customer_id_to_profiles.sql`). Admin charging of a booking's stored card: `ADMIN_CHARGE_BOOKING_CARD.md`.
- **Versioned contract terms**: `migrations/create_contract_terms_versions.sql` – every save inserts a new row with `effective_at`; a booking renders the version whose `effective_at <= booking.created_at`, so edits apply "GOING FORWARD ONLY" and signed contracts keep their original wording. App falls back to `DEFAULT_CONTRACT_TERMS` if the table is missing (`lib/contract-terms.ts`).
- **Pricing**: shared pure function `lib/phone-booking-pricing.ts` (file header: formerly duplicated in the phone-booking form and `create-phone-booking` route; now one source so the form and "rebook" dialog give identical totals). Rules: base + extra-day charges per container unit; tonnage, appliances, travel and distance fees, manual adjustment at booking level. Admin-editable `pricing_config` table (`create_pricing_config_table.sql`, `lib/pricing-config.ts`). Tests in `lib/phone-booking-pricing.test.ts`. Distance fee via Google Maps (`lib/distance.ts`, `api/calculate-distance`).
- **Multi-container bookings**: `create_booking_containers.sql`, `add_quantity_to_bookings.sql`, `lib/booking-containers.ts`.
- **Availability**: `AVAILABILITY_CHECKING.md` – real-time availability check in the phone-booking form to prevent overbooking.
- **Attribution**: `lib/attribution.ts` – first-touch gclid + UTMs in localStorage, folded into the bookings insert; migrations `add_attribution_to_bookings.sql`, `add_attribution_to_profiles.sql`; tested in `lib/attribution.test.ts`.
- **Signatures**: PNG signatures uploaded to Cloudinary, URL stored in DB (`CLOUDINARY_SIGNATURE_INTEGRATION.md`, `lib/signature-utils.ts`, `api/upload-signature`).
- **PDF**: client-side `lib/html-to-pdf.ts` rasterizes a DOM element via html2canvas into multi-page A4 jsPDF; it injects CSS to normalize Tailwind v4 `oklch()` colors that html2canvas cannot parse. Reused for contracts, invoices and receipts.
- **Cron**: `vercel.json` and `railway.json` both schedule `/api/payment-link/expire-old` daily at midnight, but the route is now an intentional no-op ("Payment links are now non-expiring per the team's request"). Do not describe link expiry as active.
- **CMS**: Sanity Studio in `studio/` with `schemaTypes/{post,blogSection}`, `lib/sanity.client.ts`; static fallback `lib/blog-data.static.ts`.
- **Hosting config**: `vercel.json` plus `railway.json` (NIXPACKS builder, restart on failure max 10).
- **SEO folder**: `seo/` contains Ahrefs-based audit (backlinks, competitors, keyword rankings, top pages, site issues) and keyword-research/content-plan markdown.

### C. Hard numbers
- Commits 305 (first 2025-08-23, last 2026-09-30). Pages 36, route handlers 46. SQL files in `migrations/` 20 (the base schema is not in the repo; `supabase/` is empty). CREATE TABLE in those migrations: 5 (card_customers, booking_containers, invoices, contract_terms_versions, pricing_config). Crons configured 1 (no-op). Test files 3 with 43 `test(`/`it(` lines.

### D. Documentation present
- `README.md` – stack, setup, scripts.
- `AVAILABILITY_CHECKING.md` (166 lines) – overbooking prevention.
- `ADMIN_CHARGE_BOOKING_CARD.md` (173) – charging extra fees to a booking's saved card.
- `CLOUDINARY_SIGNATURE_INTEGRATION.md` (381) – signature storage design.
- `EMAIL_SETUP.md` (187) – Resend notification emails.
- `DEBUG_SIGNATURE.md` (82) – debugging signature storage.
- `AGENTS.md`/`CLAUDE.md`, `studio/README.md`, `seo/**` (10 md files).
- `SDDS_Ads_Weekly_Report.pptx` present at root (contents not opened).

### E. Testing
- Node's built-in test runner: `npm test` = `node --test 'lib/**/*.test.ts'`. Files: `lib/attribution.test.ts`, `lib/lead-validation.test.ts`, `lib/phone-booking-pricing.test.ts`. Cover attribution capture, lead validation, pricing math. No component or E2E tests.

### F. Notable engineering details
- Webhook plus reconcile plus client confirm = three paths to a paid state, with a transaction_id guard.
- Versioned contract wording with effective dates.
- Accountless saved-card mapping solved a real data-linking problem (documented in the migration comment).

---

## comcreate-simple-crm  (/Volumes/Comcreate/Comcreate-Simple-Crm)

Stack (package.json): Next.js (Turbopack dev), Prisma ^6.18 on PostgreSQL, Supabase client, NextAuth (`auth.ts`: Resend magic link, Google, Credentials/bcryptjs, JWT sessions 30 days), TanStack Query + Table, Vercel AI SDK (`ai`, `@ai-sdk/openai`), Stripe, Twilio, Stream chat, Upstash Redis + ratelimit, react-email, Vitest + Playwright, @sparticuz/chromium (PDF), pnpm.

### A. Route / feature inventory
- 53 pages + 34 route handlers under `app`.
- Tenant dashboard `(dashboard)/dashboard`: analytics, campaigns, clients, contacts, deals, insights, leads, messages, settings, tickets; plus `feedback`, `unsubscribe`.
- Platform admin `(admin)/admin`: analytics, clients, features, insights, messages, opportunities, performance, tenants, tickets, users.
- API: `api/cron` 8 jobs, `api/webhooks` 5 (email-tracking, feedback, resend, stripe, twilio), `api/features` (check, list, usage), `api/oauth` 2, `api/email` 2, `api/admin` 2, `api/export`, `api/track`, `api/subscription`, `api/monitoring`, `api/invoices`, `api/clients`, `api/alerts`, `api/auth`, `api/debug` 2.

### B. Architectural decisions with evidence
- **Multi-tenancy**: Prisma `Tenant` model; `tenantId` appears 132 times in `prisma/schema.prisma`. `lib/db/tenant-context.ts` uses `AsyncLocalStorage` (`withTenant`, `withTenantAsync`, `getTenantId` throws if unset) so queries are scoped per tenant; used in `lib/actions/features/dashboard-client-actions.ts`. `__tests__/security/tenant-isolation.test.ts` exists.
- **Role model**: `enum UserRole { CLIENT_USER, CLIENT_ADMIN, ACCOUNT_MANAGER, COMCREATE_ADMIN, SUPER_ADMIN }` (schema.prisma). Separate `(admin)` route group for platform staff.
- **Feature modules / per-tenant entitlements**: models `FeatureModule`, `TenantFeature`, `FeatureUsage`, `FeatureSubscription`, `SubscriptionPlan`; `api/features/check`; migration `20251105_add_feature_subscriptions.sql`; `__tests__/feature-flags-story-1.5.test.ts`.
- **Payments / billing (Stripe)**: `app/api/webhooks/stripe/route.ts` header lists handled events: `checkout.session.completed` (links subscription to tenant, creates CLIENT_ADMIN user), `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_succeeded` (creates BillingInvoice record), `invoice.payment_failed` (sends notification). Raw body signature verification. `STRIPE_SETUP_GUIDE.md` at root.
- **Background jobs** (`vercel.json`, 8 crons): send-digests every 4h; refresh-analytics-cache every 15 min; archive-activities 02:00 daily; recalculate-scores hourly; generate-insights Mondays 08:00; check-engagement 09:00 daily; opportunity-alerts 09:00 daily; check-cost-limits 00:00 daily.
- **Lead scoring + archival**: models `LeadScore`, `LeadActivity`, `ArchiveLeadActivity`, `OpportunityAlert`, `EngagementAlert`; tests `lead-scoring-actions.test.ts`, `lead-scoring-validation.test.ts`, `__tests__/scoring`, `__tests__/performance/lead-scoring.test.ts`.
- **AI insights with cost control**: `lib/ai/{insights-generator,insights-context-loader,prompt-builder,insights-parser,openai-client,usage-tracker,rate-limiter}.ts`; models `AIUsage`, `CostAlert`, `AIInsight`; cron `check-cost-limits`; tests `api-usage-tracker.test.ts`, `__tests__/ai`.
- **Cached analytics**: model `AnalyticsCache`; cron `refresh-analytics-cache`; `__tests__/analytics-cache.test.ts`; GA4 via `@google-analytics/data`; PDF export via `export-analytics-pdf.test.ts`.
- **Omnichannel messaging**: models `SMSMessage`, `SMSUsage`, `UnifiedMessage`, `Message`, `ConversationAssignment`; Twilio webhook; Stream chat helpers `lib/stream/`, `lib/actions/stream`; push notifications (`PushSubscription`, `__tests__/push-notifications.test.ts`).
- **OAuth token security**: `lib/crypto/encryption.ts` – AES-256-GCM for stored OAuth tokens; `lib/utils/ratelimit.ts` – Upstash sliding window, 20 requests / 15 min / IP on OAuth callbacks; `__tests__/oauth-refresh.test.ts`, `encryption.test.ts`.
- **Security headers**: `middleware.ts` sets X-Frame-Options DENY, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, and in production a CSP and HSTS (`max-age=31536000; includeSubDomains; preload`). Dashboard routes redirect to `/login?callbackUrl=` when logged out. Note: CSP allows `'unsafe-inline'` and `'unsafe-eval'` in script-src.
- **Custom domains**: `docs/custom-domains.md`, `__tests__/domain-routing.test.ts`, `domain-verification.test.ts`, `subdomain-validation.test.ts`. Middleware comment says domain routing relies on Vercel domain config, not DB lookups in edge middleware.
- **Performance work with documented before/after**: `docs/performance-n+1-audit.md` identified `getClients()` generating 1 + 4N queries; `docs/performance-optimization-results.md` reports 401 queries reduced to 1 for a 100-client tenant (stated as "theoretical", "expected impact"; status "Ready for Production Testing"), `getClient()` 10 reduced to 4, plus 4 composite indexes (`prisma/migrations/20251104_add_composite_indexes.sql`, written with `CONCURRENTLY` to avoid locking). The code (`dashboard-client-actions.ts`) states "Reduces from 1 + 4N queries to 1 query". Present as documented design, not measured production results. Also `docs/connection-pooling-config.md`.
- **Schema size**: 47 Prisma models, 23 enums, 112 `@@index` entries, 1,240-line `schema.prisma`.

### C. Hard numbers
- Commits 33 (first 2025-10-29, last 2026-06-11). Pages 53, route handlers 34. Prisma models 47, enums 23, @@index 112. SQL migration files 2. Crons 8. Webhooks 5. GitHub workflows 4 (`test-suite.yml`, `lighthouse-ci.yml`, `load-test.yml`, `performance-budgets.yml`). `test-suite.yml` jobs: unit-tests, integration-tests, contract-tests, performance-tests, security-tests, accessibility-tests, quality-gates.
- Test files: 111 `.test.*` in `__tests__` + 9 Playwright `.spec.ts` in `e2e` (120 total counted; 121 in an earlier broader count). `docs/test-coverage-audit-report.md` (dated 2025-11-04) records a baseline of 1450/1473 tests passing (98.4%) across 83 test files at that date and calls coverage of critical paths "insufficient" (audit, not a claim of >80%).

### D. Documentation present (37 md files in `docs/` and root; selection)
- `README.md`, `CLAUDE.md`, `WARP.md`, `STRIPE_SETUP_GUIDE.md`.
- Planning: `docs/PRD.md`, `docs/architecture.md`, `docs/epics.md` (5 epics headers), `docs/tech-spec-epic-5.md`, `docs/product-brief-comcreate-crm-expansion-2025-10-27.md`, `docs/research-technical-2025-10-27.md`, `docs/epic-task-mapping.md`, `docs/bmm-workflow-status.md`.
- Performance: `performance-testing-strategy.md`, `performance-baseline-report.md`, `performance-verification-guide.md`, `performance-n+1-audit.md`, `performance-optimization-story-5.5.md`, `performance-optimization-results.md`, `connection-pooling-config.md`; root `performance-baseline.json` + JSON schema.
- Quality: `testing-strategy.md`, `test-writing-guidelines.md`, `test-fixtures-guide.md`, `flaky-tests-troubleshooting.md`, `test-coverage-audit-report.md`, `ci-cd-pipeline-documentation.md` (808 lines), `contract-version-monitoring.md` (monitoring third-party API contracts: Google Ads, Facebook Marketing, GA4, etc.).
- Accessibility: `accessibility-compliance-wcag-2.1-aa.md` (claims 0 critical / 0 serious violations from axe-core + manual testing as of 2025-11-04), `mobile-ux-audit-5.1.md`.
- Dev guides: `docs/development/COMCREATE_CRM_DEVELOPER_GUIDE.md`, `component-guide.md`, `tanstack-query-migration-guide.md`, `custom-domains.md`, `RESEND_DEVELOPMENT_SETUP.md`.

### E. Testing
- Vitest (happy-dom, v8 coverage config, integration tests forced single-threaded to avoid DB deadlocks per `vitest.config.ts`) + Playwright (`playwright.config.ts`).
- Areas: server actions, tenant/domain logic, security (authorization, input validation, tenant isolation), contracts for third-party APIs (`__tests__/contracts`: Google Ads, Facebook Ads, GA4, Resend, Stream Chat, Twilio), AI usage, analytics cache, scoring, performance regression and benchmarks, DB query performance, components, hooks.
- Playwright specs: accessibility (WCAG + general), keyboard shortcuts, mobile responsiveness, performance, three user-journey specs, insights history.
- `package.json` scripts: `test`, `test:integration`, `test:e2e`, `size` (size-limit), `lighthouse:audit`, `analyze`.

### F. Notable engineering details
- Third-party API contract tests with fixtures and schemas (`__tests__/contracts/schemas.ts`, `fixtures.ts`).
- CI with seven job gates plus Lighthouse, load-test and performance-budget workflows.
- Per-tenant AI spend tracking with a cost-limit cron.

---

## keybuyersclub  (/Volumes/Comcreate/KeyBuyersClub, app in `keybuyersclub/`)

Stack (keybuyersclub/package.json): Next.js (latest tag), React 19, Supabase (@supabase/ssr), Inngest ^3.42, Resend + react-email, ClickSend SMS (`src/lib/sms/clicksend.ts`), Cloudflare Images + Stream (`src/lib/cloudflare/`), MapLibre GL + react-map-gl + supercluster, papaparse, tus-js-client, zod, Vitest + Playwright, pnpm. A separate `keyDocs/` folder is a stock Vite + React template (README only describes the template).

### A. Route / feature inventory
- 27 pages + 5 route handlers under `src/app`.
- Public `(public)`: home, `/listings/[id]`, `/map`, `/how-it-works`, `/resources`, `/subscribe`, `/unsubscribe`, `/account` (favorites, profile, recently-viewed, saved-searches, settings).
- Auth: login, register, forgot-password, update-password, verify-email, error, plus `auth/callback` and `auth/confirm` routes.
- Admin: dashboard, interests, listings (list/new/[id]/edit), team, users (list/[id]).
- API: `api/admin/upload-csv`, `api/storage/signed-url`, `api/webhooks/inngest`, `auth/callback`, `auth/confirm`.
- 12 server action modules in `src/actions` (admins, auth, favorites, interests, listings, notifications, recently-viewed, saved-searches, subscribers, subscription, unsubscribe, users).

### B. Architectural decisions with evidence
- **Admin role hierarchy in the database**: `supabase/migrations/20251217000000_add_admin_role_hierarchy.sql` – enum `admin_role_type ('master','standard')`; Master Admin sees all listings, Standard Admin only listings they created (`created_by = auth.uid()`); role carried in JWT `app_metadata.admin_role`; `created_by` columns on `listings` and `listing_photos` with indexes. Helper in `src/lib/auth/admin-roles.ts` (`getAdminRole`, `isMasterAdmin`, `isStandardAdmin`).
- **JWT-based admin check**: `20251206110000_use_app_metadata_for_admin.sql` replaced a `user_profiles` lookup with `public.is_admin()` (SECURITY DEFINER, STABLE) reading `auth.jwt() -> app_metadata`, stated purpose "better performance and security". A later migration drops `user_profiles` (`20251206120000_drop_user_profiles.sql`).
- **RLS**: 42 `CREATE POLICY` occurrences across the 19 migrations. Migration names also show unsubscribe-token RLS (`20251204000001_add_unsubscribe_rls_policies.sql`) and a cascade fix.
- **Background jobs with Inngest**: `src/inngest/functions/send-listing-email.ts` (296 lines) – triggered by event `listing/published`, `retries: 3`, fetches listing and hero image in checkpointed `step.run` stages, sends in batches of 100, logs completion to `notification_logs`. `send-listing-sms.ts` (279 lines) – batch size 50 "due to rate limits", message template with deal-type prefix and "Reply STOP to unsubscribe", via ClickSend. Served from `src/app/api/webhooks/inngest/route.ts`. Four Inngest unit-test files (`client`, `send-listing-email`, `send-listing-sms`, `webhook`).
- **Deal types**: `20251211000000_add_deal_type_schema.sql`, `20251212300000_add_deal_type_to_notification_logs.sql`; SMS labels Fix & Flip, Turnkey, Seller Finance.
- **Media**: images via Cloudflare Images (`src/lib/cloudflare/images.ts`, `cloudflare_image_id` on `listing_photos`), video via Cloudflare Stream (`stream.ts`, `20251212100000_add_video_to_listings.sql`), resumable uploads via tus-js-client.
- **Private document storage**: `20251212000000_create_underwriting_csv_bucket.sql`; `api/storage/signed-url/route.ts` issues 1-hour signed URLs (`SIGNED_URL_EXPIRY = 3600`) using the service-role admin client; `api/admin/upload-csv` rejects unauthenticated users and caps files at 5 MB.
- **Map experience**: geocoding columns (`20251205130936_add_geocoding_columns.sql`), `src/lib/geocoding.ts` (tested), supercluster + MapLibre; filter indexes (`20251205125039_add_listing_filter_indexes.sql`); URL-synced filters (`tests/e2e/filters-url.spec.ts`).
- **Subscriber model**: unsubscribe tokens (`20251204000000_add_subscriber_unsubscribe_token.sql`), `subscribed` flag (`20251206100001_add_user_subscribed_field.sql`, default false), subscribers table dropped then recreated (`20251206130000_…`, `20251212200000_…`).
- **Account features**: favorites, recently viewed, saved searches tables (`20251206000000_create_favorites_schema.sql`).
- **Auth session handling**: `src/proxy.ts` (Next 16 proxy) calls `updateSession` from `src/lib/supabase/proxy`.

### C. Hard numbers
- Commits 31 (first 2025-12-03, last 2025-12-17). Pages 27, route handlers 5. Migrations 19. Tables created (CREATE TABLE statements, includes later recreations): listings, listing_photos, subscribers (twice), interest_submissions, notification_logs, user_profiles (later dropped), user_favorites, recently_viewed, saved_searches. Policies 42.
- Test files: 58 total = 30 Playwright E2E specs (27 in `tests/e2e` + 3 in `tests/e2e/auth`) + 28 Vitest unit tests under `tests/unit`.
- Docs: 115 markdown files in `docs/` and `keyDocs/` (92 files in `docs/sprint-artifacts`, 15 of them `tech-spec-epic-*`).

### D. Documentation present
- `docs/prd.md` (321 lines), `docs/architecture.md` (1,213), `docs/epics.md` (2,937), `docs/ux-design-specification.md` (646), `docs/index.md`.
- `docs/implementation-readiness-report-2025-12-03.md` – phase 3 to 4 readiness check ("READY").
- `docs/validation-report-architecture-2025-12-03.md` – architecture validation.
- `docs/test-design-system.md` – system-level testability assessment (controllability, seeding, mocking).
- `docs/sprint-artifacts/` – per-story files (e.g. `1-1-project-initialization.md`, `2-4-password-protected-listing-gate.md`, `6-2-email-notification-function.md`) and per-epic tech specs.
- `keybuyersclub/README.md`.

### E. Testing
- Playwright (`playwright.config.ts`): two projects, Desktop Chrome and a Pixel 5 profile with a 390x844 viewport that runs only `mobile-browse.spec.ts`; CI retries 2. E2E specs cover admin auth, admin role access, team management, listings CRUD, deal-type filters, filter bar/drawer/URL sync, favorites, recently viewed, saved searches, map, split view, subscribe, interest submission, navigation, mobile nav.
- Vitest (`vitest.config.ts`, `tests/setup.ts`): actions, components, content, email, filters, geocoding, hooks, Inngest functions, providers, schemas, SMS, utils, Cloudflare images, listing schema.

### F. Notable engineering details
- Planning artifacts (PRD, architecture, epics, readiness report, per-story specs) were produced before and alongside code; all 31 commits fall between 2025-12-03 and 2025-12-17 (git log dates).
- Role hierarchy enforced in RLS via JWT claims rather than app code alone.
- Durable fan-out of listing alerts (email + SMS) through retrying, batched, checkpointed Inngest steps.
