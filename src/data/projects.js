/**
 * Featured project data for the 2026 redesign.
 *
 * Every field here is traceable to source evidence recorded in
 * docs/redesign-2026/inventory-merged.json (purpose from README / layout metadata /
 * route structure; technologies from package.json and config).
 *
 * Rules this file follows:
 *  - No invented clients, metrics, dates, outcomes or deployment links.
 *  - `links` is omitted unless a URL was actually verified. None were probed in this
 *    pass, so no project asserts a live link.
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

// Accent cast rotates through the card backgrounds, per the design rules.
const ACCENTS = ['#ffb110', '#f64932', '#62aef0', '#02093a', '#097fe8', '#b18164'];
export const accentFor = (i) => ACCENTS[i % ACCENTS.length];

const projects = [
  {
    slug: 'scenic-doors',
    name: 'Scenic Doors',
    category: 'platform',
    tagline: 'Quote-to-invoice platform for a door installer',
    summary:
      'Full website and operations platform for a premium door installation company in Southern California.',
    description:
      'Combines the public marketing site with a working business platform: a quote builder, booking flow, customer portal, admin area, invoicing, blog and service-area pages for local SEO. The richest project in the collection by route count and commit history.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Square', 'Resend', 'Cloudinary', 'Framer Motion'],
    highlights: ['51 pages', '426 commits', 'Admin + client manuals'],
    preview: { desktop: 'scenic-doors-desktop.jpg', mobile: 'scenic-doors-mobile.jpg', frame: 'browser' },
  },
  {
    slug: 'camp-alegria',
    name: 'Camp Alegría',
    category: 'platform',
    tagline: 'Registration and payments for a kids camp',
    summary:
      'Camp registration and management platform for hands-on camps for children ages 5–12.',
    description:
      'Handles enrollments, payments, invoices, gift cards, coupons and capacity limits, with an admin dashboard and email marketing built in. Parent-facing booking is backed by Stripe and Supabase.',
    technologies: ['Next.js', 'Supabase', 'Stripe', 'Resend', 'Cloudinary', 'React Hook Form', 'Zod', 'dnd-kit', 'jsPDF'],
    highlights: ['57 pages', 'Large admin dashboard', 'Payments + invoicing'],
    preview: { desktop: 'camp-alegria-desktop.jpg', mobile: 'camp-alegria-mobile.jpg', frame: 'browser' },
  },
  {
    slug: 'er-soccer-development',
    name: 'ER Soccer Development',
    category: 'platform',
    tagline: 'Public site plus a role-based academy CRM',
    summary:
      'Marketing website and role-based staff, coach and family CRM for a San Diego youth soccer academy established in 1991.',
    description:
      'Separate portals for staff, coaches and families sit behind a public marketing site. Generates contracts and documents as PDFs, stores assets on S3, and is backed by PostgreSQL. Carries one of the largest automated test suites in the collection.',
    technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'AWS S3', 'pdf-lib', 'Resend', 'dnd-kit'],
    highlights: ['Coach / family / CRM portals', 'Extensive test scripts', 'PDF contract generation'],
    preview: { desktop: 'er-soccer-development-desktop.jpg', mobile: 'er-soccer-development-mobile.jpg', frame: 'browser' },
  },
  {
    slug: 'sd-dumping-solutions',
    name: 'SD Dumping Solutions',
    category: 'platform',
    tagline: 'Booking and dispatch for dumpster rental',
    summary:
      'Dumpster rental booking and management platform for a San Diego roll-off company.',
    description:
      'Gives customers instant pricing and online or guest booking with contract signing and card payment, and gives staff an admin area for bookings, phone bookings, charging saved cards, invoices and review requests.',
    technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Radix UI', 'Supabase', 'Cloudinary'],
    highlights: ['36 routes', 'E-signature contracts', 'Saved-card payments'],
    preview: { desktop: 'sd-dumping-solutions-desktop.jpg', mobile: 'sd-dumping-solutions-mobile.jpg', frame: 'browser' },
  },
  {
    slug: 'key-buyers-club',
    name: 'Key Buyers Club',
    category: 'platform',
    tagline: 'Private off-market real estate listings',
    summary:
      'Private off-market real estate listing platform with subscriber notifications and buyer interest capture.',
    description:
      'An MVP built around a members-only deal feed: public, admin and auth routes, background notification jobs through Inngest, and transactional email templates. Ships with both end-to-end and unit test setups.',
    technologies: ['Next.js', 'React', 'Supabase', 'Inngest', 'react-email', 'Radix UI', 'Playwright', 'Vitest'],
    highlights: ['Public / admin / auth areas', 'Written PRD', 'Background jobs'],
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
    summary:
      'Multi-tenant SaaS CRM and client portal for a digital marketing agency.',
    description:
      'Clients get a portal onto their own account while the agency works a shared pipeline. Pulls reporting from the Google Analytics Data API, adds AI assistance through the Vercel AI SDK, and is held to unit, integration and end-to-end tests plus Lighthouse CI.',
    technologies: ['Next.js 15', 'Prisma', 'Auth.js', 'PostgreSQL', 'Radix UI', 'Vercel AI SDK', 'dnd-kit', 'Google Analytics Data API', 'Vitest'],
    highlights: ['~53 route files', 'Unit + integration + e2e', 'Lighthouse CI'],
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
    summary:
      'macOS desktop app that orchestrates headless coding agents across project folders.',
    description:
      'An Electron application with per-project task queues, an orchestrator loop, an activity feed, a budget indicator, a team chat window and an embedded terminal. State is persisted locally in SQLite.',
    technologies: ['Electron', 'electron-vite', 'React', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'better-sqlite3', 'node-pty', 'xterm.js'],
    highlights: ['Desktop app', 'SQLite persistence', 'Embedded terminal'],
    preview: {
      frame: 'browser',
      note: 'Desktop Electron app — not rendered in a browser for this capture pass.',
    },
  },
  {
    slug: 'ai-audit-dashboard',
    name: 'AI Project Audit Dashboard',
    category: 'dashboard',
    tagline: 'Visualizing automated code audits',
    summary:
      'Dashboard that visualizes AI-generated project audits across code quality, security, SEO and performance.',
    description:
      'Reads audit files written to disk and renders them as charts and readable reports, with dedicated views per audit dimension. Read-only by design.',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Radix UI', 'Recharts', 'Framer Motion', 'react-markdown'],
    highlights: ['8 routes', 'Chart-driven reports', 'Light + dark themes'],
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
    summary:
      'E-commerce site for an off-road vehicle build, service and parts shop in Escondido, CA.',
    description:
      'Storefront with cart, checkout and quote request, plus admin and dashboard areas for the shop. Product data is imported through dedicated scripts and media is served from S3.',
    technologies: ['Next.js', 'Radix UI', 'Tailwind CSS', 'Supabase', 'AWS S3', 'embla-carousel'],
    highlights: ['32 pages', '163 commits', 'Product import tooling'],
    preview: { desktop: 'atp-ecommerce-desktop.jpg', mobile: 'atp-ecommerce-mobile.jpg', frame: 'browser' },
  },
  {
    slug: 'all-levels-athletics',
    name: 'All Levels Athletics',
    category: 'ecommerce',
    tagline: 'Online coaching, courses and recovery tools',
    summary:
      'Online personal training site selling coaching programs, courses and recovery tools.',
    description:
      'Brings programs, course content and physical recovery products into a single storefront, with checkout handled by Stripe and content and accounts backed by Supabase.',
    technologies: ['Next.js', 'React', 'Radix UI', 'Tailwind CSS', 'Stripe', 'Supabase'],
    highlights: ['20 pages', '239 commits'],
    preview: { desktop: 'all-levels-athletics-desktop.jpg', mobile: 'all-levels-athletics-mobile.jpg', frame: 'browser' },
  },
  {
    slug: 'bnc-builders',
    name: 'BNC Builders Inc.',
    category: 'site',
    tagline: 'Remodeling contractor site at local-SEO scale',
    summary:
      'Website for a licensed home remodeling contractor in Escondido, CA serving San Diego County.',
    description:
      'Built for local search reach: many service and city landing pages plus a CMS-driven blog, with motion handled by GSAP and Lenis. Content comes from Sanity, data from Supabase, and the site is covered by Playwright end-to-end tests.',
    technologies: ['Next.js 16', 'React 19', 'Tailwind CSS 4', 'Sanity', 'Supabase', 'Resend', 'GSAP', 'Lenis', 'Playwright'],
    highlights: ['65 pages', '356 commits', 'Unit + e2e tests'],
    preview: { desktop: 'bnc-builders-desktop.jpg', mobile: 'bnc-builders-mobile.jpg', frame: 'browser' },
  },
  {
    slug: 'casita-azul',
    name: 'Casita Azul',
    category: 'site',
    tagline: 'Bilingual preschool site with a lead pipeline',
    summary:
      'Bilingual (English/Spanish) marketing site and admin lead pipeline for a Spanish immersion preschool in Portland, OR.',
    description:
      'Serves both language audiences from one codebase through next-translate, and routes enquiries into a Supabase-backed admin pipeline so the school can track families from first contact onward.',
    technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'next-translate', 'Supabase', 'Sanity', 'Leaflet'],
    highlights: ['~52 pages', 'EN/ES throughout', 'Admin lead pipeline'],
    preview: { desktop: 'casita-azul-desktop.jpg', mobile: 'casita-azul-mobile.jpg', frame: 'browser' },
  },
  {
    slug: 'coconut-bay-bahamas',
    name: 'Coconut Bay',
    category: 'site',
    tagline: 'Villa marketing site with a staff portal',
    summary:
      'Marketing site and staff portal for oceanfront villas on Long Island, The Bahamas.',
    description:
      'Public villa pages take bookings through a Sirvoy integration, while a separate portal gives staff a guest inbox, contacts, leads, a bookings calendar, notification settings and user management.',
    technologies: ['Next.js', 'React', 'Supabase', 'Resend', 'Vercel Analytics', 'Sirvoy'],
    highlights: ['20 routes', 'Auth-gated staff portal', 'Booking integration'],
    preview: { desktop: 'coconut-bay-bahamas-desktop.jpg', mobile: 'coconut-bay-bahamas-mobile.jpg', frame: 'browser' },
  },
  {
    slug: 'v3-biomedical',
    name: 'V3 Biomedical',
    category: 'site',
    tagline: 'Wound care catalog and demo funnel',
    summary:
      'Marketing site for a wound care company, presenting a clinical product catalog and converting to demo bookings.',
    description:
      'Covers skin substitutes, autologous blood, collagen and debridement products, backed by a Sanity CMS so the catalog stays editable, with motion from Motion and Lenis and coverage from Vitest.',
    technologies: ['Next.js', 'React', 'Sanity', 'Tailwind CSS', 'Motion', 'Lenis', 'Resend', 'Vitest'],
    highlights: ['CMS-backed catalog', 'Has tests', 'Static redesign export'],
    preview: { desktop: 'v3-biomedical-desktop.jpg', mobile: 'v3-biomedical-mobile.jpg', frame: 'browser' },
  },
  {
    slug: 'sisters-in-motion',
    name: 'Sisters in Motion',
    category: 'site',
    tagline: 'Studio site with CMS, checkout and consent',
    summary:
      'Marketing site for a trauma-informed movement studio in San Francisco.',
    description:
      'Pairs a Sanity CMS studio with Stripe checkout for classes and Resend for transactional email, and gates analytics behind explicit consent — a deliberate fit for the studio’s trauma-informed practice.',
    technologies: ['Next.js 16', 'React 19', 'Sanity', 'Stripe', 'styled-components', 'Resend'],
    highlights: ['20 pages', '90 commits', 'Consent-gated analytics'],
    preview: { desktop: 'sisters-in-motion-desktop.jpg', mobile: 'sisters-in-motion-mobile.jpg', frame: 'browser' },
  },
  {
    slug: 'king-roofing',
    name: 'King Roofing',
    category: 'site',
    tagline: 'Multi-state roofing contractor site',
    summary:
      'Marketing site for a roofing contractor offering repair, replacement and installation across Utah and Nebraska.',
    description:
      'Structured around two state markets with local team pages and service routes, backed by Sanity CMS content and supported by a documented SEO audit process.',
    technologies: ['Next.js', 'React', 'Sanity', 'Tailwind CSS'],
    highlights: ['26 routes', 'CMS content', 'SEO audit docs'],
    preview: { desktop: 'king-roofing-desktop.jpg', mobile: 'king-roofing-mobile.jpg', frame: 'browser' },
  },
  {
    slug: 'bnc-mobile',
    name: 'BNC Builders Mobile',
    category: 'mobile',
    tagline: 'Internal field app for a construction team',
    summary:
      'React Native app used internally by a construction team for reporting and project tracking.',
    description:
      'Field staff file reports, track spend, view the project manager roster, export PDFs, check the calendar and receive push notifications, all backed by Supabase with charts and offline-aware data handling.',
    technologies: ['React Native', 'NativeWind', 'Supabase', 'React Navigation', 'TanStack Query', 'Gifted Charts'],
    highlights: ['45 source files', 'Jest tests', 'Push notifications'],
    preview: {
      frame: 'phone',
      note: 'Native iOS/Android app — requires a simulator build and backend credentials, so no screenshot was captured.',
    },
  },
];

export default projects;
