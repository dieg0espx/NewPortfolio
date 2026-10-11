/**
 * Featured project records.
 *
 * Every field traces to evidence recorded in docs/redesign-2026/inventory-merged.json
 * (purpose from README / layout metadata / route structure; technologies from
 * package.json and config).
 *
 * Content rules — enforced by tests in __tests__/content.test.js:
 *  - No invented clients, metrics, dates, outcomes or deployment links.
 *  - `links` is omitted unless a URL was actually verified. None were probed, so none appear.
 *  - `preview.note` states the limitation for anything that could not be rendered.
 */

export const CATEGORIES = [
  { id: 'all', label: 'All work' },
  { id: 'platform', label: 'Platforms' },
  { id: 'dashboard', label: 'Dashboards & tools' },
  { id: 'ecommerce', label: 'E-commerce' },
  { id: 'site', label: 'Marketing sites' },
  { id: 'mobile', label: 'Mobile' },
];

const ACCENTS = ['#ffb110', '#f64932', '#62aef0', '#02093a', '#097fe8', '#b18164'];
export const accentFor = (i) => ACCENTS[i % ACCENTS.length];

export const projects = [
  {
    slug: 'scenic-doors',
    name: 'Scenic Doors',
    category: 'platform',
    tagline: 'Quote-to-invoice platform for a door installer',
    summary:
      'Full website and operations platform for a premium door installation company in Southern California.',
    problem: [
      'A door installer selling high-consideration products has a long, expensive path from first click to signed job. Quotes, bookings, contracts, invoices and follow-up all lived outside the website, so every lead meant manual work — and the ad spend driving those leads could not be measured past the form submission.',
      'The brief was a website. The actual problem was that nothing downstream of the website was connected to it.',
    ],
    pullQuote:
      'The site and the business system are the same codebase, so a lead can be traced from the ad that produced it through to the invoice it became.',
    built: [
      'The public marketing site and the operations platform behind it were built as one application: 51 pages and 13 API routes over a single Supabase schema. A visitor moves through door-type pages into a quote, from quote to booking, from booking to a signed contract, and from contract to a paid invoice, without ever leaving the system.',
      'Behind it sits a 23-page admin area covering clients, leads, quotes, orders, contracts, invoices, payments, a calendar, contractors, discounts and marketing. Sales reps see only their own quotes and leads; admins see everything. Seven door-type pages and a service-area tree carry the local SEO load.',
    ],
    decisions: [
      {
        title: 'The server decides what a payment costs, not the browser',
        body: 'The Square payment route re-reads the authoritative amount from the database rather than trusting the posted value, refuses payments already marked complete, and applies the card surcharge server-side. A client that tampers with the amount simply pays the real one.',
      },
      {
        title: 'Ad conversions get a dead-letter queue',
        body: 'Conversions are fired server-side to Meta, Google Ads, TikTok and GA4. Because those calls fail, a cron retries failed rows every ten minutes on a 1m/5m/15m/1h/4h/24h backoff and marks them dead after six attempts, where an admin card surfaces them. Each event carries a shared event_id and is upserted on (event_id, platform, event_name), so a retry can never double-count a sale.',
      },
      {
        title: 'Signatures are stamped onto the factory’s own drawing',
        body: 'Rather than generating a separate signature page, the client’s signature image is drawn directly onto the manufacturer’s approval PDF at fixed coordinates — so what the factory receives is the document they already expect, signed.',
      },
      {
        title: 'Consent is logged without identity',
        body: 'The consent log is keyed by an anonymous id and holds no personal data. Anonymous visitors can write to it; only the service role can read it back. There is deliberately no select policy at all.',
      },
    ],
    stackNote: [
      'Next.js 16 with React 19 on Supabase, with 35 migrations, 27 tables, and row-level security enforced through 61 policies rather than in application code. Square handles payment, Resend transactional mail, Cloudinary the gallery imagery.',
      'Five separate PDF generators produce contracts, invoices, orders, receipts and approval drawings. Session refresh and ad-click attribution both run in the Next 16 proxy layer, so click IDs are captured as first-party cookies before any page renders.',
      'Worth stating plainly: this repository has no automated tests, and the Square integration has no webhook — payment state is confirmed inline rather than asynchronously.',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Square', 'Resend', 'Cloudinary', 'Framer Motion', 'Recharts'],
    facts: [
      ['Pages', '51'],
      ['Commits', '426'],
      ['Docs', 'Admin + client manuals'],
    ],
    preview: { desktop: 'scenic-doors-desktop.jpg', mobile: 'scenic-doors-mobile.jpg', frame: 'browser' },
  },
  {
    slug: 'camp-alegria',
    name: 'Camp Alegría',
    category: 'platform',
    tagline: 'Registration and payments for a kids camp',
    summary: 'Camp registration and management platform for hands-on camps for children ages 5–12.',
    problem: [
      'Seasonal camp registration looks like a form and behaves like an inventory system. Sessions have hard capacity limits, families pay in several different ways, siblings change the price, and a browser tab that dies mid-payment must not cost a child their place.',
      'The failure mode that matters is not an ugly page — it is two parents being sold the last spot at the same moment.',
    ],
    pullQuote:
      'Two parents both read ten of twelve places taken, both wrote eleven, and a child lost a spot that was never actually sold.',
    built: [
      'A registration platform of 57 pages and 77 API routes: enrolment, payment, invoices, gift cards, coupons, sibling discounts, waitlists with token-confirmed offers, enrolment moves between weeks, and the consent paperwork a camp legally needs — waivers, media consent and behavioural agreements — collected and signed online.',
      'Staff get a 15-section dashboard covering camps, capacity, enrolments, students, payments, invoices, gift cards, coupons, waitlist, abandoned carts, email marketing and live chat.',
    ],
    decisions: [
      {
        title: 'Capacity counting moved into the database',
        body: 'Enrolment counts were cached and updated with a read-modify-write, which raced under concurrent signups. The repository contains the bug report, the diagnosis and the fix: atomic SQL increment and decrement functions with a floor at zero, plus a reconcile function to repair drift that had already happened.',
      },
      {
        title: 'Thirty-minute cart holds were built, then deliberately removed',
        body: 'A full hold system with row-locked reservations shipped in one migration and was dropped in a later one as a product decision. The row lock was kept for the single capacity check, with the atomic counters doing the real work at payment time. Removing working code because the product does not need it is a decision worth recording.',
      },
      {
        title: 'Checkout can finish twice and still be correct',
        body: 'Cart finalisation is idempotent and reachable from two paths: the browser after Stripe confirms, and the Stripe webhook as a safety net for when the tab dies in between. Whichever wins the row lock claims the cart; the other short-circuits on seeing it already complete.',
      },
      {
        title: 'Abandoned carts are chased on a schedule, not forever',
        body: 'A cron runs every fifteen minutes and sends at most three reminder emails per cart, tracked by attempt number so a stalled job cannot spam a parent.',
      },
    ],
    stackNote: [
      'Next.js 15 and React 19 on Supabase with 58 migrations, 31 tables and 99 row-level-security policies. Stripe handles payment, Resend transactional mail, Cloudinary media; forms are validated with React Hook Form and Zod.',
      'Admin access is checked against an admin-users table in middleware rather than a flag on the user, so revoking access is a database row and not a redeploy.',
      'This repository also has no automated test suite — the capacity logic is defended by database constraints and atomic functions rather than by tests.',
    ],
    technologies: ['Next.js', 'Supabase', 'Stripe', 'Resend', 'Cloudinary', 'React Hook Form', 'Zod', 'dnd-kit', 'jsPDF'],
    facts: [
      ['Pages', '57'],
      ['Admin', 'Full dashboard'],
      ['Payments', 'Stripe + invoicing'],
    ],
    preview: { desktop: 'camp-alegria-desktop.jpg', mobile: 'camp-alegria-mobile.jpg', frame: 'browser' },
  },
  {
    slug: 'er-soccer-development',
    name: 'ER Soccer Development',
    category: 'platform',
    tagline: 'Public site plus a role-based academy CRM',
    summary:
      'Marketing website and role-based staff, coach and family CRM for a San Diego youth soccer academy established in 1991.',
    problem: [
      'An academy running programs across many teams serves three audiences who each need a different view of the same data: families enrolling players, coaches managing their own teams, and staff running the business. Get the boundary wrong and a parent sees another family’s child.',
      'On top of that, bookings move through real money and real paperwork — a request becomes an approval, an approval becomes a payment, a payment becomes a signed contract — and each of those steps can fail halfway.',
    ],
    pullQuote:
      'A coach can only ever touch their own coach_id, a family only their own family_id. That is the security invariant the whole CRM rests on.',
    built: [
      'A public marketing site sits in front of three separate portals — family, coach and staff CRM — across 51 pages and 59 API routes. Families manage players, enrolments, payments and requests; coaches see only their own programs, players and attendance; staff get a 14-page back office.',
      'The booking pipeline that connects them was rebuilt from a split of coach requests and parent enrolments into a single bookings table with an explicit state machine, and the legacy endpoints now return 410 rather than lingering as a second way in.',
    ],
    decisions: [
      {
        title: 'Roles come from the session, never from the request',
        body: 'Every CRM handler receives the authenticated user — including their coach or family id — from the session, rather than reading an id out of the request. A coach cannot ask for another coach’s roster, because there is no parameter to tamper with.',
      },
      {
        title: 'Bookings are a real state machine, not a status column',
        body: 'Eight states, with every transition funnelled through one helper that takes a row lock and returns 409 on an illegal move. A partial unique index stops a second live booking existing for the same player, coach and program, and unpaid approvals expire on a cron rather than sitting forever.',
      },
      {
        title: 'Stripe signatures verified by hand, not by the SDK',
        body: 'The webhook computes the HMAC itself, compares in constant time, and rejects anything outside a 300-second window to block replays. Keeping the payment and auth core dependency-light was a deliberate trade — the same instinct produced scrypt password hashing and opaque session tokens stored only as hashes.',
      },
      {
        title: 'Contracts are encrypted before they are stored',
        body: 'Contract PDFs are sealed with AES-256-GCM using a random IV and additional authenticated data bound to a context string, with hash digests for verification. The S3 bucket to hold them is defined as infrastructure-as-code with versioning, encryption and public access blocked — and the documentation says plainly that it is prepared, not yet provisioned.',
      },
    ],
    stackNote: [
      'Next.js 16 and React 19 talking to PostgreSQL directly through pg, with no ORM — 11 migrations, 18 tables, money stored as integer cents. Documents are generated with pdf-lib and an embedded font subset; AWS S3 holds uploads.',
      'The repository carries a six-stage written pipeline from audit through architecture, PRD and stories to a ship summary, 19 Vitest files and 11 integration scripts.',
      'The QA report is worth more than the test count: it records exactly which database-backed suites could not run in that environment instead of quietly omitting them. Live updates also ship as ten-second polling, not the server-sent events the architecture document originally proposed.',
    ],
    technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'AWS S3', 'pdf-lib', 'Resend', 'dnd-kit'],
    facts: [
      ['Portals', 'Coach / family / CRM'],
      ['Testing', 'Extensive suites'],
      ['Documents', 'Generated PDFs'],
    ],
    preview: { desktop: 'er-soccer-development-desktop.jpg', mobile: 'er-soccer-development-mobile.jpg', frame: 'browser' },
  },
  {
    slug: 'sd-dumping-solutions',
    name: 'SD Dumping Solutions',
    category: 'platform',
    tagline: 'Booking and dispatch for dumpster rental',
    summary: 'Dumpster rental booking and management platform for a San Diego roll-off company.',
    problem: [
      'Roll-off rental is priced by container size, duration, weight, distance and a handful of extras — and most of the business still arrives by phone. The company needed customers able to price and book themselves without losing the ability to take a booking over the counter, on the same pricing and the same contract.',
      'Payment is the fragile part: a customer who is not logged in still has to be chargeable again later for an overage or an extra day.',
    ],
    pullQuote:
      'Three different paths can mark a booking paid — the browser, the webhook, and a reconcile that asks Stripe directly — and a transaction guard makes sure only one of them counts.',
    built: [
      'A booking platform of 36 pages and 46 API routes. Customers get instant pricing, online or guest checkout, an e-signed rental contract and card payment. Staff get a 13-page admin covering the same flow for phone bookings, plus calendar, inventory, invoices, contracts, cards on file, pricing configuration and post-haul review requests.',
      'Service-area pages and a Sanity-backed blog carry local search, and the repository includes an Ahrefs-based SEO audit and content plan rather than guesswork.',
    ],
    decisions: [
      {
        title: 'One pricing function, used by every path',
        body: 'Pricing had been duplicated between the phone-booking form and the API route that created the booking, which meant the quote and the charge could disagree. It is now a single pure function covering base rate, extra days, tonnage, appliances, travel and distance — with unit tests, and an admin-editable configuration table behind it.',
      },
      {
        title: 'Saved cards for customers who never made an account',
        body: 'Guest and phone bookings were creating throwaway Stripe customers that were never linked to anything, so a card could not be charged again. A card-customers table now maps one lowercased email to one Stripe customer, with a unique constraint so the upsert is safe.',
      },
      {
        title: 'Contract wording is versioned by effective date',
        body: 'Every edit to the rental terms inserts a new row rather than updating one. A booking renders the version that was in force when it was created, so changing the terms tomorrow cannot retroactively alter what somebody already signed.',
      },
      {
        title: 'Payment state repairs itself',
        body: 'Beyond the webhook and the client confirm, an admin reconcile route checks unpaid invoices against Stripe directly and fixes them when a webhook never landed. The webhook also skips any payment whose transaction id is already recorded, so the three paths cannot double-charge.',
      },
    ],
    stackNote: [
      'Next.js 16, React 19 and Tailwind v4 on Supabase, with Stripe payment intents, setup intents and saved cards. Distance fees come from the Google Maps Distance Matrix, signatures are stored on Cloudinary, and Sanity backs the blog.',
      'Contracts, invoices and receipts are produced client-side by rasterising the rendered DOM into a paginated PDF — including a workaround that normalises Tailwind v4 oklch() colours the rasteriser cannot parse.',
      'Testing is narrow but aimed at the right things: pricing maths, attribution capture and lead validation. One scheduled job is configured but is now an intentional no-op, since payment links were made non-expiring.',
    ],
    technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Radix UI', 'Supabase', 'Cloudinary'],
    facts: [
      ['Routes', '36'],
      ['Contracts', 'E-signature'],
      ['Payments', 'Saved cards'],
    ],
    preview: { desktop: 'sd-dumping-solutions-desktop.jpg', mobile: 'sd-dumping-solutions-mobile.jpg', frame: 'browser' },
  },
  {
    slug: 'key-buyers-club',
    name: 'Key Buyers Club',
    category: 'platform',
    tagline: 'Private off-market real estate listings',
    summary:
      'Private off-market real estate listing platform with subscriber notifications and buyer interest capture.',
    problem: [
      'Off-market property deals are valuable precisely because they are not public, so the platform has to gate listings behind membership while still reaching interested buyers the moment something lands. A deal that surfaces a day late is worth nothing.',
      'There is also an internal access question: the people posting listings should not automatically be able to see each other’s.',
    ],
    pullQuote:
      'When a listing goes live, hundreds of emails and texts have to go out reliably — which means the fan-out cannot live inside the request that published it.',
    built: [
      'A members-only deal platform of 27 pages built around a listing feed, a clustered map view with URL-synced filters, and account features for favourites, saved searches and recently viewed. Publishing a listing triggers an alert fan-out to subscribers over both email and SMS.',
      'The admin side covers listings, team management, users and buyer interest submissions, with private underwriting documents held in a separate bucket behind short-lived signed URLs.',
    ],
    decisions: [
      {
        title: 'Alert fan-out moved to a durable job runner',
        body: 'Publishing emits an event; a background function then fetches the listing, batches recipients — 100 per batch for email, 50 for SMS to respect carrier rate limits — and checkpoints each stage so a failure resumes rather than restarting. Three retries, with every send logged.',
      },
      {
        title: 'Two tiers of admin, enforced in the database',
        body: 'A master admin sees every listing; a standard admin sees only the ones they created. That rule lives in row-level security driven by a JWT claim and a created_by column, so it holds even if application code forgets to check.',
      },
      {
        title: 'The admin check moved out of a table and into the token',
        body: 'An earlier design looked up a user profile row on every request to decide admin status. That was replaced by a stable security-definer function reading the JWT claim, and the now-redundant profiles table was dropped in a follow-up migration.',
      },
      {
        title: 'Private documents are never public URLs',
        body: 'Underwriting CSVs live in their own bucket; the app issues one-hour signed URLs through a service-role client, and the upload route rejects unauthenticated requests and caps file size.',
      },
    ],
    stackNote: [
      'Next.js and React 19 on Supabase with 19 migrations and 42 row-level-security policies. Inngest runs the background fan-out, Resend and react-email render the mail, ClickSend sends SMS, and Cloudflare Images and Stream hold media with resumable uploads.',
      'The map is MapLibre with supercluster over geocoded listings, backed by dedicated filter indexes.',
      'Testing is unusually broad for an MVP: 30 Playwright specs — including a Pixel 5 profile that runs the mobile browse journey at 390×844 — and 28 unit tests. The planning artefacts are in the repository too: a PRD, an architecture document, epics, a UX specification and per-story tech specs written alongside the code.',
    ],
    technologies: ['Next.js', 'React', 'Supabase', 'Inngest', 'react-email', 'Radix UI', 'Playwright', 'Vitest'],
    facts: [
      ['Areas', 'Public / admin / auth'],
      ['Jobs', 'Background notifications'],
      ['Planning', 'Written PRD'],
    ],
    preview: {
      frame: 'browser',
      note: 'Every route requires live Supabase credentials, so the app could not be rendered locally and no screenshot was captured.',
    },
  },
  {
    slug: 'comcreate-crm',
    name: 'ComCreate CRM',
    category: 'dashboard',
    tagline: 'Multi-tenant client portal and CRM',
    summary: 'Multi-tenant SaaS CRM and client portal for a digital marketing agency.',
    problem: [
      'An agency serving many clients has the same reporting conversation every month, and every client wants to see only their own numbers. Multi-tenancy is easy to get almost right and expensive to get wrong: one missing filter and a client sees another client’s pipeline.',
      'The second problem is cost. Once an AI assistant is summarising account activity, spend scales with usage and needs a ceiling.',
    ],
    pullQuote:
      'Tenant scoping lives in async context, not in every query — so a developer who forgets the filter gets an error instead of someone else’s data.',
    built: [
      'A multi-tenant CRM and client portal across 53 pages and 34 API routes. Each client gets a dashboard scoped to their own account — analytics, campaigns, contacts, deals, leads, messages, tickets — while agency staff work a separate platform admin covering every tenant, with five distinct roles between them.',
      'Reporting pulls real numbers from the Google Analytics Data API rather than being re-keyed, messaging is unified across SMS and chat, and an AI layer generates account insights on a schedule.',
    ],
    decisions: [
      {
        title: 'Tenant isolation enforced by async context',
        body: 'Rather than remembering a tenantId filter on every query, the tenant is held in AsyncLocalStorage for the life of the request and read by the data layer. Asking for the tenant when none is set throws. There is a dedicated test suite for the isolation itself.',
      },
      {
        title: 'AI spend is metered and capped',
        body: 'Usage is tracked per tenant with its own rate limiter and cost-alert model, and a nightly cron checks spend against limits. Shipping an AI feature without a ceiling is how a feature becomes a bill.',
      },
      {
        title: 'Third-party APIs are covered by contract tests',
        body: 'Google Ads, Facebook Marketing, GA4, Resend, Stream and Twilio each have contract tests with fixtures and schemas, so an upstream response change is caught in CI rather than in a client’s monthly report.',
      },
      {
        title: 'An N+1 was found by audit, not by outage',
        body: 'A written performance audit identified the client list issuing 1 + 4N queries and the code was reduced to a single query, with composite indexes added concurrently so the migration would not lock the table. The improvement figures in the docs are stated as expected rather than measured in production, and are presented that way here too.',
      },
    ],
    stackNote: [
      'Next.js with Prisma over PostgreSQL — 47 models, 23 enums and 112 indexes — behind NextAuth with magic-link, Google and credential sign-in. Stripe handles subscription billing, Twilio SMS, Stream chat, Upstash rate limiting, and OAuth tokens are encrypted at rest with AES-256-GCM.',
      'Eight scheduled jobs cover digests, analytics caching, lead scoring, insight generation, engagement checks and cost limits. CI runs seven gates — unit, integration, contract, performance, security, accessibility and a quality gate — alongside Lighthouse, load-test and performance-budget workflows.',
      '120 test files in total. One honest caveat: the production content-security policy still permits inline and eval script sources.',
    ],
    technologies: ['Next.js 15', 'Prisma', 'Auth.js', 'PostgreSQL', 'Radix UI', 'Vercel AI SDK', 'dnd-kit', 'Google Analytics Data API', 'Vitest'],
    facts: [
      ['Route files', '~53'],
      ['Testing', 'Unit + integration + e2e'],
      ['Quality', 'Lighthouse CI'],
    ],
    preview: {
      desktop: 'comcreate-crm-desktop.jpg',
      mobile: 'comcreate-crm-mobile.jpg',
      frame: 'browser',
      note: 'The portal is authenticated, so the capture shows the sign-in screen rather than client data.',
    },
  },
  {
    slug: 'agent-dashboard',
    name: 'Agent Dashboard',
    category: 'dashboard',
    tagline: 'Desktop orchestrator for coding agents',
    summary: 'macOS desktop app that orchestrates headless coding agents across project folders.',
    problem: [
      'Running coding agents across many repositories by hand means losing track of what is queued, what is running, what it cost, and which of them is stuck. Agents also fail in ways that are expensive to retry blindly.',
      'The scheduling logic is the interesting part, and it is exactly the part that is hardest to test if it is tangled up with the database and the window.',
    ],
    pullQuote:
      'Scheduling is pure functions — claim locks, retry policy, tool caps, dependencies — tested without ever launching the app.',
    built: [
      'A macOS desktop application that holds a task queue and a backup checklist per project, runs an orchestrator loop that spawns headless agent runs, and shows an activity feed, run history, credential requests, a budget indicator, team chat and a real embedded terminal.',
      'Tasks can depend on other tasks, and phase templates wire audit, redesign and polish stages together automatically; cancelling a parent cancels its queued dependents transitively.',
    ],
    decisions: [
      {
        title: 'Policy is separated from plumbing so it can be tested',
        body: 'Dispatch, claim locking with a two-hour cross-team TTL, retry classification, role split, tool caps, skill routing, task dependencies and cost metrics are each a pure module with unit tests. The scheduling decisions are verified without Electron, a database or a running agent.',
      },
      {
        title: 'One auto-retry, and rate limits pause instead of retrying',
        body: 'Failures are classified — tool-blocked, rate-limit, build, timeout, unknown — and a task gets at most one automatic retry. A rate-limit failure pauses the whole orchestrator and resumes it later rather than burning the remaining quota on retries that will also fail.',
      },
      {
        title: 'The agent talks back through marker lines',
        body: 'Agents emit structured marker lines in their output to request a credential or add a task; the host parses them, caps added tasks at five per run and skips duplicate titles. A deliberately narrow protocol beats giving the agent write access to the queue.',
      },
      {
        title: 'IPC is one wrapper, not seventy-six ad-hoc handlers',
        body: 'Every one of the 76 channels goes through a single wrapper returning a tagged success or error, which the preload bridge unwraps so the renderer receives plain values and real thrown errors instead of hand-checking each response.',
      },
    ],
    stackNote: [
      'Electron with electron-vite, a React renderer and context isolation on. State is SQLite in write-ahead-logging mode with foreign keys enforced across 10 tables, evolved by guarded column additions rather than a migration framework.',
      'Each project gets one persistent login shell through node-pty with a 200,000-character replay buffer, so re-attaching a terminal restores its scrollback. The packaging config unpacks the native helper from the archive so it can actually execute.',
      'Agent runs are spawned with the API key stripped from the child environment, killed after a configurable ceiling with an escalation from SIGTERM to SIGKILL, and any run left marked running from a previous session is reconciled as failed on launch. 21 test files cover the policy modules.',
    ],
    technologies: ['Electron', 'electron-vite', 'React', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'better-sqlite3', 'node-pty', 'xterm.js'],
    facts: [
      ['Platform', 'macOS desktop'],
      ['Storage', 'SQLite'],
      ['Terminal', 'Embedded pty'],
    ],
    preview: {
      frame: 'browser',
      note: 'Desktop Electron app — not a browser target, so no screenshot was captured in this pass.',
    },
  },
  {
    slug: 'ai-audit-dashboard',
    name: 'AI Project Audit Dashboard',
    category: 'dashboard',
    tagline: 'Visualizing automated code audits',
    summary:
      'Dashboard that visualizes AI-generated project audits across code quality, security, SEO and performance.',
    problem: [
      'Automated audits produce a great deal of text. Reading raw audit files across dozens of projects makes it impossible to see which problems are worst, which project is in trouble, or whether anything improved.',
      'The second problem is drift: audits written by different agent versions do not agree on their own field names.',
    ],
    pullQuote:
      'Generation and visualisation are deliberately separate — an agent writes files, a deterministic UI renders them, and a schema contract sits in between.',
    built: [
      'Eight routes: a portfolio overview, a per-project view, and dedicated cross-project views for security, SEO, performance and code quality. Issues can be filtered by severity and category and searched, with per-project score badges and critical counts in the sidebar.',
      'It currently renders 56 real project audits holding 1,424 reported issues — 100 of them critical — as radar charts, stacked bars, histograms and score rings, alongside the written summary for each project.',
    ],
    decisions: [
      {
        title: 'The filesystem is the database',
        body: 'Each audit is three files in a folder, read at request time. There is no database, no API and no migration step: updating an audit means overwriting a file. For a read-only visualiser that an agent writes into, a database would have been the heavier choice, not the safer one.',
      },
      {
        title: 'The reader tolerates schema drift',
        body: 'A normalisation layer coerces the differences between agent versions — a project as a string or an object, effort versus difficulty, camel case versus snake case — so an audit written by an older agent still renders rather than crashing the page.',
      },
      {
        title: 'Audits are comparable because the brief is shared',
        body: 'A standardised prompt defines what to read, the score bands and the exact output schema, so two projects audited separately can be placed on the same chart honestly.',
      },
    ],
    stackNote: [
      'Next.js 15 App Router with Radix primitives, Recharts for the distributions and custom SVG score rings, markdown rendering with GitHub flavour, and light, dark and system themes. Every data page is explicitly dynamic, since the files underneath can change between requests.',
      'The typed contract pins a schema version, five categories, five severities and a 0–100 score range.',
      'Stated plainly: the issue counts above are what the auditing agent reported, not independently verified defects — and this project has no automated tests of its own.',
    ],
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Radix UI', 'Recharts', 'Framer Motion', 'react-markdown', 'next-themes'],
    facts: [
      ['Routes', '8'],
      ['Charts', 'Recharts'],
      ['Themes', 'Light + dark'],
    ],
    preview: {
      desktop: 'ai-audit-dashboard-desktop.jpg',
      mobile: 'ai-audit-dashboard-mobile.jpg',
      frame: 'browser',
      note: 'Captured against bundled mock audit data; no client data is shown.',
    },
  },
  {
    slug: 'atp-ecommerce',
    name: 'ATP — All Terrain Performance',
    category: 'ecommerce',
    tagline: 'Off-road builds, parts and service storefront',
    summary: 'E-commerce site for an off-road vehicle build, service and parts shop in Escondido, CA.',
    problem: [
      'An off-road shop sells three different things at once — catalogue parts, custom builds and workshop service — and parts only matter if they fit your truck. A customer who cannot filter by year, make, model and trim is not shopping, they are guessing.',
      'The shop also takes a lot of business by phone, so a lead arriving as a call has to reach the same CRM as one arriving as a form, without being entered twice.',
    ],
    pullQuote:
      'A form submission is not acknowledged until it is committed — the browser sees a confirmation only once the lead is durable.',
    built: [
      'A storefront of 32 pages built around a vehicle-fitment catalogue: year, make, model and trim cascade down to the parts and wheels that actually fit, with faceted wheel search on top. Builds and service run through a quote and enquiry flow, and staff get an admin for quotes, calls and exports.',
      'An imported supplier catalogue of roughly sixteen thousand rows sits behind it, brought in by an idempotent import script and served from a schema deliberately kept separate from the original tables so the import could never regress them.',
    ],
    decisions: [
      {
        title: 'Fitment lookups live in the database',
        body: 'The year/make/model/trim cascade and the paginated searches are Postgres functions rather than application queries, so filtering happens next to the data instead of round-tripping sixteen thousand rows into Node.',
      },
      {
        title: 'The catalogue import is safe to run twice',
        body: 'Products upsert by SKU and fitment is replaced per brand, with dry-run and per-brand flags. If the delete step for a brand fails, the import aborts that brand rather than appending a duplicate set of fitment rows.',
      },
      {
        title: 'Leads are durable before they are acknowledged',
        body: 'Enquiries are accepted through a single atomic database call keyed by a browser-generated id and a hash of the payload; the same id with different content is rejected as a conflict. A worker then delivers to the CRM on a lease-and-retry loop, so a CRM outage delays a lead rather than losing it.',
      },
      {
        title: 'Calls are matched without creating duplicates',
        body: 'A signed call-tracking webhook creates or links a CRM lead behind a per-caller lock, recording the activity before the lead is created, so a replayed webhook cannot post the same lead twice.',
      },
    ],
    stackNote: [
      'Next.js and React on Supabase, with product media on Cloudflare R2 — including a separate idempotent pass to set cache headers, because R2 does not apply them on upload.',
      'The sitemap is generated from live catalogue data within Google’s per-file limit, structured data is emitted through a serializer that escapes the characters used to break out of a script tag, and tracking is opt-in with Global Privacy Control and Do Not Track respected — backed by a browser test asserting trackers actually stop when consent is withdrawn.',
      'One thing this site deliberately does not do is take card payments: the payment page states online payment is unavailable and tells customers not to enter card details, so the funnel ends in a quote rather than a checkout.',
    ],
    technologies: ['Next.js', 'Radix UI', 'Tailwind CSS', 'Supabase', 'AWS S3', 'embla-carousel'],
    facts: [
      ['Pages', '32'],
      ['Commits', '163'],
      ['Tooling', 'Product import scripts'],
    ],
    preview: { desktop: 'atp-ecommerce-desktop.jpg', mobile: 'atp-ecommerce-mobile.jpg', frame: 'browser' },
  },
  {
    slug: 'all-levels-athletics',
    name: 'All Levels Athletics',
    category: 'ecommerce',
    tagline: 'Online coaching, courses and recovery tools',
    summary: 'Online personal training site selling coaching programs, courses and recovery tools.',
    problem: [
      'A coach selling both knowledge and physical products needs one storefront that handles a recurring membership, a one-off programme and a shippable item without feeling like three different shops.',
      'Subscriptions are the hard part. People upgrade, downgrade and cancel, and the billing provider and the application database drift apart the moment one of those events is missed.',
    ],
    built: [
      'An online coaching platform with a shop, three subscription tiers billed monthly, annually or six-monthly, and a member dashboard covering programmes, products, coaching and profile. Coaches get check-ins, progress tracking and configurable metric templates with history, charted over time.',
      'Twenty pages sit on top of forty-five API routes, most of them handling the subscription lifecycle and the coaching data model.',
    ],
    decisions: [
      {
        title: 'Plan changes get their own endpoints',
        body: 'Upgrade and downgrade are separate routes with explicit sync endpoints that reconcile the database against the billing provider afterwards, rather than assuming the webhook always wins the race against the redirect.',
      },
      {
        title: 'Auth is a shared helper, not a per-route copy',
        body: 'One pair of helpers verifies the bearer token and the admin role — nineteen routes require a user, eight require an admin. Consolidating that was part of a visible hardening pass that also added a rate limiter and logging helpers which mask emails and ids.',
      },
      {
        title: 'The webhook refuses unsigned requests outright',
        body: 'A missing signature header is rejected before any parsing, and the event is verified against the raw body, covering checkout completion, the full subscription lifecycle and both invoice outcomes.',
      },
    ],
    stackNote: [
      'Next.js and React with Supabase for accounts and content, Stripe Checkout and Customer Portal for billing, Resend for mail, Calendly for session booking and Recharts for the progress views. Cart, discount, auth and subscription state live in React contexts with explicit hydration handling.',
      'A content security policy in the Next config allow-lists the third-party origins in use, though it still permits inline and eval scripts — a scoped policy rather than a strict one.',
      'This repository has no automated tests, and the rate limiter is in-memory, which means per-instance rather than global.',
    ],
    technologies: ['Next.js', 'React', 'Radix UI', 'Tailwind CSS', 'Stripe', 'Supabase'],
    facts: [
      ['Pages', '20'],
      ['Commits', '239'],
    ],
    preview: { desktop: 'all-levels-athletics-desktop.jpg', mobile: 'all-levels-athletics-mobile.jpg', frame: 'browser' },
  },
  {
    slug: 'bnc-builders',
    name: 'BNC Builders Inc.',
    category: 'site',
    tagline: 'Remodeling contractor site at local-SEO scale',
    summary: 'Website for a licensed home remodeling contractor in Escondido, CA serving San Diego County.',
    problem: [
      'A remodeling contractor competes in local search across dozens of service-and-city combinations. One generic services page cannot rank for all of them, and a site that takes three seconds to paint loses the click before ranking even matters.',
      'The deeper problem is that the best leads arrive as phone calls, which rarely reach the CRM with the detail a follow-up needs.',
    ],
    pullQuote:
      'The smooth-scroll library is dynamically imported and skipped entirely on touch devices, so a 50KB bundle never ships to the phones most of the traffic arrives on.',
    built: [
      'Sixty-five pages structured for reach: service pages, an ADU hub with its own cost guide, regulations and process sections, fifteen city landing pages, city-specific service pages, and paid-search landing pages with their own thank-you routes. A CMS-backed blog keeps the content side editable.',
      'Behind the marketing site sits a live chat with visitor-scoped threads, an ADU cost calculator, and a pipeline that turns inbound phone calls into structured CRM records.',
    ],
    decisions: [
      {
        title: 'Calls are transcribed and structured automatically',
        body: 'A signed webhook from the phone system acknowledges immediately and processes afterwards: a diarised transcript, then a forced tool call to a language model returning a typed extraction, then a write-back of notes, tags and an opportunity to the CRM, with a summary card posted to Slack. The pipeline stays inert until its keys are configured.',
      },
      {
        title: 'The sitemap tells the truth about dates',
        body: 'Static routes carry no last-modified date at all and only blog posts carry a real one, because a sitemap claiming every page changed today teaches search engines to ignore the field. It also fetches through a tagged cache, since a raw fetch would freeze it at build time.',
      },
      {
        title: 'Motion is budgeted, not just added',
        body: 'Smooth scrolling is skipped under reduced-motion preferences and on touch devices, and the library is dynamically imported so it is never downloaded in those cases. The animation helpers are a small set of named effects rather than ad-hoc tweens.',
      },
      {
        title: 'Chat threads are isolated by the database',
        body: 'Visitors can read only their own conversation, addressed by an unguessable identifier, enforced through row-level security rather than by the application remembering to filter. Admins are rows in a table, so access is granted and revoked as data.',
      },
    ],
    stackNote: [
      'Next.js 16, React 19 and Tailwind 4, with Sanity for the blog and Supabase behind the chat. Cache invalidation runs through an authenticated webhook that revalidates by tag, and form submissions are score-checked with reCAPTCHA v3 before Resend delivers them.',
      'The ADU calculator’s pricing is a pure, unit-tested module rather than arithmetic scattered through a component. Testing is 2 unit files and 13 Playwright specs, configured to run on a dedicated port so a stale dev server can never silently serve the tests.',
      'The repository also carries a substantial SEO workspace — audits, keyword research and a written recovery plan with explicit operating rules. Those documents record a starting baseline, not a result, and are described that way here.',
    ],
    technologies: ['Next.js 16', 'React 19', 'Tailwind CSS 4', 'Sanity', 'Supabase', 'Resend', 'GSAP', 'Lenis', 'Playwright'],
    facts: [
      ['Pages', '65'],
      ['Commits', '356'],
      ['Testing', 'Unit + e2e'],
    ],
    preview: { desktop: 'bnc-builders-desktop.jpg', mobile: 'bnc-builders-mobile.jpg', frame: 'browser' },
  },
  {
    slug: 'casita-azul',
    name: 'Casita Azul',
    category: 'site',
    tagline: 'Bilingual preschool site with a lead pipeline',
    summary:
      'Bilingual (English/Spanish) marketing site and admin lead pipeline for a Spanish immersion preschool in Portland, OR.',
    problem: [
      'A Spanish immersion school has to speak to two language audiences equally well. A translated afterthought undercuts the product itself — if the Spanish side of the site reads as a machine pass, the claim to immersion teaching is harder to believe.',
      'And the thing that actually matters commercially is not the brochure. It is whether an enquiring family gets followed up before they book a tour somewhere else.',
    ],
    pullQuote:
      'Both languages are first-class content with their own URLs, hreflang pairs and generated sitemaps — not a toggle bolted onto an English site.',
    built: [
      'Twenty-eight pages covering programmes, admissions, tuition, locations, team and philosophy, with ten location pages statically generated for each locale and roughly 540 translated keys per language.',
      'Behind it, staff get a seven-stage lead pipeline — new enquiry through contacted, tour scheduled, toured, paperwork, enrolled or not a fit — fed by four different intake forms, plus a grounded AI assistant that answers questions from a curated context rather than the open web.',
    ],
    decisions: [
      {
        title: 'Spam filtering that does not reject real families',
        body: 'Beyond a honeypot, the gibberish detector only fires when a submission is both vowel-poor and has mid-word capitals, specifically so a legitimate name like Krzysztof is not thrown away. The heuristics carry their own unit tests, because a false positive here costs an enrolment.',
      },
      {
        title: 'Stale leads chase themselves',
        body: 'A daily job emails staff about any enquiry still sitting in "new" after two days, with a dry-run mode for testing. The follow-up problem is solved by a cron rather than by hoping someone checks the dashboard.',
      },
      {
        title: 'The content security policy shipped in report-only first',
        body: 'Rather than enforcing a policy and breaking tag-manager-driven marketing scripts, it was deployed report-only with a note to promote it once the reports came back clean. Shipping security that silently breaks the business is not shipping security.',
      },
      {
        title: 'Editors can override code',
        body: 'Blog posts merge a local dataset with the CMS, and on a slug collision the CMS wins — so content people can take over a page that started life in the repository without a developer deploying anything.',
      },
    ],
    stackNote: [
      'Next.js on the Pages Router with next-translate driving locale routing, hreflang and x-default tags emitted per page, and sitemaps generated after build for both languages. Supabase holds the CRM with roles as a Postgres enum and row-level security; Sanity supplies blog content; Leaflet renders the location maps with a validation script for the map data.',
      'The AI assistant is rate-limited per IP and capped on message count and length, and its model is pinned to a floating alias after a pinned version was retired and took the bot offline — a failure worth designing around.',
      'An honest caveat: the build is configured to ignore TypeScript errors, and the repository carries a written plan to land its remaining major dependency upgrades one package family at a time.',
    ],
    technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'next-translate', 'Supabase', 'Sanity', 'Leaflet'],
    facts: [
      ['Pages', '~52'],
      ['Languages', 'EN + ES'],
      ['Admin', 'Lead pipeline'],
    ],
    preview: { desktop: 'casita-azul-desktop.jpg', mobile: 'casita-azul-mobile.jpg', frame: 'browser' },
  },
  {
    slug: 'coconut-bay-bahamas',
    name: 'Coconut Bay',
    category: 'site',
    tagline: 'Villa marketing site with a staff portal',
    summary: 'Marketing site and staff portal for oceanfront villas on Long Island, The Bahamas.',
    problem: [
      'A villa property sells on atmosphere, but the people running it need an operational tool — and those two things usually end up as two disconnected systems with guest email in a third place entirely.',
      'Guest replies are the hard part: an email answering a booking enquiry has to land back on the right conversation, not start a new one.',
    ],
    pullQuote:
      'Every secret-dependent surface fails closed. If the configuration is missing, the portal returns 503 rather than quietly serving an unauthenticated page.',
    built: [
      'Twenty public pages presenting the villas, experiences and purchasing options, with reservations handled by an embedded booking engine per unit.',
      'Behind authentication sits a staff portal: a shared guest inbox with threaded conversations, contacts, leads, a bookings calendar, notification settings and user management — twenty routes in total over five tables.',
    ],
    decisions: [
      {
        title: 'Guest replies are threaded by plus-addressing',
        body: 'Inbound mail arrives as a signed webhook whose HMAC is verified by hand in constant time. The thread is matched from the plus-address in the reply-to, falling back to the sender’s newest open thread, and quoted history is stripped — including Spanish-language and Outlook reply separators, not just the English ones.',
      },
      {
        title: 'An unsigned webhook is gated on a hashed token',
        body: 'The booking provider does not sign its webhooks, so the route compares a shared token in constant time with both sides hashed first, so even the length does not leak. Bookings upsert on the provider’s own id, which means a modification or cancellation updates the same row rather than creating a second one.',
      },
      {
        title: 'The portal is invisible to search engines at the header level',
        body: 'The noindex header is set in middleware rather than in page metadata, so it still applies to redirects and error responses — the cases where a page-level tag would never render.',
      },
      {
        title: 'Lead source captured without a schema change',
        body: 'First-touch landing page, referrer, UTMs and click ids are captured client-side and folded into a derived channel label stored alongside the thread, so attribution did not require new columns or a migration.',
      },
    ],
    stackNote: [
      'Deliberately small: the runtime dependencies are Next, React, the Supabase client, analytics and a mail SDK. No UI framework at all — plain CSS with a single shared easing curve, and fonts loaded through next/font.',
      'All five tables carry row-level security, with triggers maintaining thread timestamps. Team alerts go out over both email and WhatsApp, including parsing the WhatsApp relay’s HTML error responses rather than assuming success.',
      'Eleven test files cover both webhook routes, the CSV import, lead-source classification and the portal’s fail-closed behaviour. CI lints with zero warnings allowed, typechecks, tests, builds, then starts the server and smoke-tests every public route for a real response rather than an error shell.',
    ],
    technologies: ['Next.js', 'React', 'Supabase', 'Resend', 'Vercel Analytics', 'Sirvoy'],
    facts: [
      ['Routes', '20'],
      ['Portal', 'Auth-gated staff area'],
      ['Booking', 'Sirvoy integration'],
    ],
    preview: { desktop: 'coconut-bay-bahamas-desktop.jpg', mobile: 'coconut-bay-bahamas-mobile.jpg', frame: 'browser' },
  },
  {
    slug: 'v3-biomedical',
    name: 'V3 Biomedical',
    category: 'site',
    tagline: 'Wound care catalog and demo funnel',
    summary:
      'Marketing site for a wound care company, presenting a clinical product catalog and converting to demo bookings.',
    problem: [
      'Clinical products have to be presented precisely — the audience is practitioners, the catalogue changes, and overstating anything in wound care is a regulatory problem, not just a marketing one.',
      'Commercially the site has one job: turn a qualified clinician into a booked demo, and get that lead into the CRM with its source intact.',
    ],
    pullQuote:
      'The sitemap used to stamp today’s date on every URL. Now it is seeded from the last content commit, because a sitemap that always claims everything changed teaches search engines to ignore it.',
    built: [
      'Twenty-four pages covering the product families — skin substitutes, autologous blood, collagen, debridement — alongside comparison, documentation and reimbursement resources, four geographic landing pages and a dedicated conference landing page with QR-source detection.',
      'A CMS-backed blog sits behind publish gating, and every form funnels into the CRM through a single lead pipeline.',
    ],
    decisions: [
      {
        title: 'Spam filtering that silently absorbs bots',
        body: 'Three layers — a honeypot, a minimum two-and-a-half-second fill time, and reCAPTCHA only when both token and secret are present. When a submission is judged a bot the API returns a normal 200 with null ids, so the bot’s follow-up calls no-op instead of signalling that it was caught.',
      },
      {
        title: 'Publishing rules live in the query, not the template',
        body: 'The content queries themselves require a published date in the past, a defined slug, and for listings exclude anything flagged no-index. A draft cannot leak by someone forgetting a conditional in a component.',
      },
      {
        title: 'Revalidation by path, because tags do not exist here',
        body: 'On the Pages Router there are no fetch tags to invalidate, so the webhook revalidates the specific blog paths directly, authenticated by a shared secret hashed and compared in constant time, accepted from a header, query or body.',
      },
      {
        title: 'Rendered HTML from the CMS is sanitised, and links are checked',
        body: 'Table markup coming out of the editor is run through a sanitiser and link targets through a safe-href guard, both unit tested — the editor is trusted, but not unconditionally.',
      },
    ],
    stackNote: [
      'Next.js on the Pages Router with Sanity for content, Cloudinary and the Sanity CDN for imagery with remote patterns scoped to specific account paths, Resend for mail and Twilio for SMS. Leads upsert into HubSpot, reusing an existing contact on an email conflict and attaching a persistent lead source derived from the campaign parameters.',
      'Security headers include HSTS with preload, nosniff, a referrer policy and cross-origin opener policy. Seven Vitest files cover the content queries, sanitisation, UTM parsing and the conference lead path.',
      'The repository also documents its own mistakes usefully: an audit of the redesign staging build with graded findings, a diagnosis of a React hydration error caused by designer-export template elements, and an explicit rule that simple requests land as isolated commits after a batched change had to be reverted wholesale.',
    ],
    technologies: ['Next.js', 'React', 'Sanity', 'Tailwind CSS', 'Motion', 'Lenis', 'Resend', 'Vitest'],
    facts: [
      ['Catalogue', 'CMS-backed'],
      ['Testing', 'Vitest'],
      ['Design', 'Static redesign export'],
    ],
    preview: { desktop: 'v3-biomedical-desktop.jpg', mobile: 'v3-biomedical-mobile.jpg', frame: 'browser' },
  },
  {
    slug: 'sisters-in-motion',
    name: 'Sisters in Motion',
    category: 'site',
    tagline: 'Studio site with CMS, checkout and consent',
    summary: 'Marketing site for a trauma-informed movement studio in San Francisco.',
    problem: [
      'A trauma-informed studio has to be careful about how it treats the people visiting it, and that includes whether it tracks them before asking. A site that quietly fires five analytics scripts on load is contradicting the thing the business is selling.',
      'There was also a practical constraint: the build had to work, and keep working, before any of its third-party accounts existed.',
    ],
    pullQuote:
      'Global Privacy Control forces denial, advertising consent is never granted, and no query strings, form contents or raw contact details are ever sent.',
    built: [
      'Twenty pages covering classes, workshops, parties, open pole, virtual sessions, a quiz, press and testimonials, rebuilt from legacy static mockups while preserving the original styling, with a CMS studio embedded in the site itself.',
      'Checkout for the discovery package runs through Stripe, and the content layer is modelled as fourteen page singletons plus three collections so editors get a structured desk rather than a pile of documents.',
    ],
    decisions: [
      {
        title: 'Nothing shows a false success',
        body: 'Until the mail provider is configured, the contact form prepares an email draft and says plainly that you should review and send it — it never displays a "sent" message for something that was not. The same instinct runs through the Stripe integration, which falls back to a no-code payment link until real keys exist.',
      },
      {
        title: 'Fulfilment is idempotent per checkout session',
        body: 'Studio notifications and customer confirmations are keyed to the checkout session id, so Stripe redelivering a webhook cannot send a customer a second confirmation email.',
      },
      {
        title: 'The site publishes a machine-readable version of itself',
        body: 'An index at /llms.txt and Markdown renditions of each page are generated by converting the rendered HTML — mapping FAQ disclosure elements to headed questions and stripping forms, buttons and images — so language models citing the studio read clean prose rather than scraped layout.',
      },
      {
        title: 'The address is parsed, and the parsing is tested',
        body: 'Local-business structured data is built from a free-text address held in the CMS, so there are tests around the parser: an editor reformatting that field should not silently break the location signal that local search depends on.',
      },
    ],
    stackNote: [
      'Next.js 16 and React 19 with Sanity v6 — 19 registered schema types — and an embedded studio route. Stripe handles checkout, Resend transactional mail, and publishes invalidate a cache tag through a webhook so edits appear in seconds rather than waiting out the fallback window.',
      'Analytics load only on the production hostnames, only after consent, and report sanitised page context with one pageview per client-side navigation. The event map deliberately separates intent from confirmed conversion.',
      '75 test cases across seven files cover the analytics loader, attribution, contact delivery, Stripe logic, the Markdown routes and the structured-data parser.',
    ],
    technologies: ['Next.js 16', 'React 19', 'Sanity', 'Stripe', 'styled-components', 'Resend'],
    facts: [
      ['Pages', '20'],
      ['Commits', '90'],
      ['Privacy', 'Consent-gated analytics'],
    ],
    preview: { desktop: 'sisters-in-motion-desktop.jpg', mobile: 'sisters-in-motion-mobile.jpg', frame: 'browser' },
  },
  {
    slug: 'king-roofing',
    name: 'King Roofing',
    category: 'site',
    tagline: 'Multi-state roofing contractor site',
    summary:
      'Marketing site for a roofing contractor offering repair, replacement and installation across Utah and Nebraska.',
    problem: [
      'One contractor operating in two states needs the site to feel local in both without maintaining two websites. The obvious approach — templated city pages with the name swapped — is exactly what search engines classify as doorway content and discount.',
      'The site had also inherited a set of legacy URLs and a thin-content problem that an audit blamed, incorrectly, on a traffic crash.',
    ],
    pullQuote:
      'A test computes pairwise similarity across every city and service page and fails the build above 0.5 — the old templated pages would have scored above 0.9.',
    built: [
      'Twenty-six pages: nine service pages, sixteen Utah city pages plus state hubs for Utah and Nebraska, and the supporting gallery, projects, team, financing and licensing pages. Service and city content is authored as typed structured data rather than free-form templates, so each page is genuinely distinct.',
      'A CMS-backed blog sits alongside it, and drone footage is compressed through a scripted pipeline before being served from object storage.',
    ],
    decisions: [
      {
        title: 'The SEO fixes became tests',
        body: 'Rather than fixing an audit’s findings and hoping they stayed fixed, the findings were encoded as a suite: content-similarity limits, canonical correctness, forbidden headings, noindex on the thank-you page, internal link validity, redirect integrity and meta length. CI runs them as a gate.',
      },
      {
        title: 'Tests parse the built HTML, not the source',
        body: 'The SEO invariants run against the actual rendered output rather than the components that produce it, so a canonical tag broken by a layout change is caught where it matters.',
      },
      {
        title: 'Redirects live in one audited table',
        body: 'Legacy URL redirects are a single data structure spread into the Next config, with a test asserting each is permanent and that no source appears twice. CMS-authored internal links are rewritten to canonical routes on the way out.',
      },
      {
        title: 'The audit corrected its own narrative',
        body: 'A documented visual and SEO audit traced a reported 52% drop in clicks to branded-query fluctuation rather than a regression — the repository had one commit in the preceding month — and redirected effort to the real problem, thin templated money pages. Being willing to say nothing broke is itself a finding.',
      },
    ],
    stackNote: [
      'Next.js with Sanity for the blog, structured data covering the contractor, service, city and FAQ types through a serializer that escapes script-breakout characters, and a sitemap built from the city list plus CMS posts.',
      'Motion shares a single brand easing curve between JavaScript and a CSS custom property so animated and CSS-driven movement match. Drone video is batch-compressed with ffmpeg to capped 1080p, audio stripped and fast-start enabled before delivery.',
      '11 test files across SEO and unit suites. One caveat: this repository contains no backend for the contact form, so how submissions are delivered is not something the code here can show.',
    ],
    technologies: ['Next.js', 'React', 'Sanity', 'Tailwind CSS'],
    facts: [
      ['Routes', '26'],
      ['Content', 'CMS-backed'],
      ['SEO', 'Audit documentation'],
    ],
    preview: { desktop: 'king-roofing-desktop.jpg', mobile: 'king-roofing-mobile.jpg', frame: 'browser' },
  },
  {
    slug: 'bnc-mobile',
    name: 'BNC Builders Mobile',
    category: 'mobile',
    tagline: 'Native leads CRM for a construction team',
    summary:
      'React Native app giving a construction team their sales pipeline, conversations and reporting on a phone.',
    problem: [
      'The people who pick up a new lead are rarely at a desk. Pipeline status, customer conversations and performance reporting all lived in systems you had to be sitting down to use.',
      'The CRM is also a third-party system holding the real data, which means the app must never carry its credentials and must cope with a payload that omits the fields you would most like to have.',
    ],
    pullQuote:
      'Nothing here invents numbers. Anything that cannot be computed shows not-available, with a reason.',
    built: [
      'Eighteen screens across two distinct experiences: admins get Dashboard, Opportunities, Chat, Reports and Settings; sales representatives get a scoped two-tab view of their own dashboard and settings, gated by role as the session resolves.',
      'The chat runs against the same tables as the client’s website live chat, so a conversation started on the site continues in the app, with realtime updates, optimistic sending, image attachments and push notifications that deep-link into the right thread.',
    ],
    decisions: [
      {
        title: 'The CRM token never ships in the app',
        body: 'Every call to the external CRM goes through a server-side proxy holding the token as a function secret, accepting only allow-listed operations with validated identifiers and forwarding only specific fields. A decompiled app yields nothing.',
      },
      {
        title: 'Webhooks verified with Ed25519, not a shared secret',
        body: 'Inbound CRM webhooks are checked against an Ed25519 signature using WebCrypto. Because the payload carries no change timestamp or previous stage, the design compensates by recording stage transitions against the last known stage at receipt time.',
      },
      {
        title: 'Report maths runs on the server, in the right timezone',
        body: 'Booking ratios, after-hours splits, projects sold and spend are computed by a pure metrics engine in shared server code, with timeframes resolved in the business’s own timezone rather than whatever the phone is set to — so two staff in different places read the same number.',
      },
      {
        title: 'Missing integrations say so',
        body: 'Live ad-campaign data on reports prints "not connected" or "error" rather than a plausible stand-in. A report that silently shows zero is worse than one that admits it could not reach the source.',
      },
    ],
    stackNote: [
      'React Native with NativeWind and React Navigation v7 — a bottom-tab navigator with nested native stacks and a navigation reference so a push notification can route from outside React. TanStack Query handles fetching and caching, Supabase provides auth, data, realtime and seven edge functions, with sessions persisted to device storage.',
      'Offline support is deliberately narrow and worth describing accurately: the reports list is cached locally so it paints instantly before the network resolves. There is no general offline queue.',
      'The testing sits where the risk is: 141 test cases across six Deno suites cover the metrics engines, timeframe resolution and dispatch logic, while the app itself has a render smoke test. Its own specification records the sales dashboard as built but not yet deployed.',
    ],
    technologies: ['React Native', 'NativeWind', 'Supabase', 'React Navigation', 'TanStack Query', 'Gifted Charts'],
    facts: [
      ['Source files', '45'],
      ['Testing', 'Jest'],
      ['Platform', 'iOS + Android'],
    ],
    preview: {
      frame: 'phone',
      screens: [
        { file: 'bnc-mobile-screen1.jpg', shows: 'Dashboard — pipeline value and leads by stage' },
        { file: 'bnc-mobile-screen2.jpg', shows: 'Reports — generated sales reports' },
        { file: 'bnc-mobile-screen3.jpg', shows: 'Settings — profile and appearance' },
      ],
      note: 'Captured on an iOS 26 simulator against the live backend, signed in with an existing session.',
    },
  },
  {
    slug: 'campalegria-mobile',
    name: 'Camp Alegría Admin',
    category: 'mobile',
    tagline: 'Native admin companion for camp staff',
    summary: 'React Native admin app for the Camp Alegría camp management platform.',
    problem: [
      'Camp staff answer family questions from the website’s live chat, but that inbox lived on a desktop admin. Away from a laptop, a question sat unanswered.',
      'Giving staff a phone app also widens the attack surface: a mobile client is easier to tamper with than a web admin behind a login.',
    ],
    pullQuote:
      'A determined client could call the update directly — so the permission check lives in the database, where it can say no.',
    built: [
      'A staff chat inbox: conversations with unread counts, a threaded chat view, archived conversations and settings, gated behind an admin check after sign-in.',
      'It runs against the same Supabase project and the same tables as the Camp Alegría website, so a visitor’s message and a staff reply are the same conversation seen from two places.',
    ],
    decisions: [
      {
        title: 'Permissions are enforced by row-level security, not the UI',
        body: 'Closing and archiving a conversation are separate per-admin flags, defaulting to off, checked by database policies. Hiding the button would be a suggestion; a policy that rejects the write is a rule.',
      },
      {
        title: 'Realtime with optimistic sending',
        body: 'Each conversation subscribes to inserts and de-duplicates by id, so a message sent locally appears immediately and is replaced by the authoritative row when it lands, rather than waiting on a round trip.',
      },
      {
        title: 'Only the public key ever ships',
        body: 'The app carries the anonymous key alone; the privileged key stays server-side, and the push function signs its own tokens from a key held as a secret, choosing the sandbox or production endpoint by environment.',
      },
    ],
    stackNote: [
      'Bare React Native with NativeWind, React Navigation and the Supabase client for auth, data and realtime, with sessions and theme persisted to device storage. Push notifications go through an edge function triggered by new messages.',
      'The brand palette is ported directly from the web app so the two surfaces match, and a dependency patch is carried in-repo rather than waiting upstream.',
      'This is the smaller of the two mobile apps and is honest about it: 18 source files, a single render smoke test, and seven commits. Its value is less the code than the pattern — the same inbox-and-push design was reused for a second client.',
    ],
    technologies: ['React Native', 'Supabase', 'React Navigation', 'react-native-reanimated', 'react-native-svg'],
    facts: [
      ['Source files', '18'],
      ['Testing', 'Jest config'],
      ['Backend', 'Shared with web'],
    ],
    preview: {
      frame: 'phone',
      screens: [
        { file: 'campalegria-mobile-screen1.jpg', shows: 'Admin console sign-in' },
      ],
      note: 'Built and run on an iOS 26 simulator. Admin access is credential-gated, so only the sign-in screen was reachable.',
    },
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);

export const getNeighbours = (slug) => {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? projects[i - 1] : projects[projects.length - 1],
    next: i < projects.length - 1 ? projects[i + 1] : projects[0],
  };
};

export default projects;
