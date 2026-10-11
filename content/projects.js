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
    problem:
      'A door installer selling high-consideration products needs more than a brochure site. Quotes, bookings, invoices and customer follow-up all lived outside the website, so every lead meant manual work.',
    built:
      'The public marketing site and the business platform behind it were built as one system. A quote builder captures configuration up front, a booking flow schedules the visit, and a customer portal and admin area carry the job through to an invoice. Service-area pages give the site local search reach, and a blog keeps it fresh.',
    stackNote:
      'Supabase backs data and auth, Square handles payment, Resend sends transactional mail, and Cloudinary serves the gallery imagery. jsPDF and pdf-lib generate the invoice documents.',
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
    problem:
      'Seasonal camp registration is a scheduling and payment problem disguised as a form. Sessions have hard capacity limits, families pay in different ways, and the office needs to see all of it in one place.',
    built:
      'Parents enrol, pay and receive invoices through a flow that understands capacity, coupons and gift cards. Behind it, an admin dashboard manages sessions and enrolments, and email marketing reaches past families when a new season opens.',
    stackNote:
      'Stripe handles payment, Supabase stores enrolments, Zod and React Hook Form validate the registration forms, and jsPDF produces invoices. dnd-kit powers the drag-ordering in admin.',
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
    problem:
      'An academy running programs across many teams has three different audiences — families, coaches and staff — who each need a different view of the same data, and paperwork that has to end up as a signed document.',
    built:
      'A public marketing site sits in front of three separate portals. Families see enrolment and their own players, coaches see their teams and requests, and staff run the CRM. Contracts and program documents are generated server-side as PDFs.',
    stackNote:
      'PostgreSQL on AWS RDS holds the data, S3 stores documents and media, and pdf-lib with fontkit generates contracts. The repo carries one of the largest test-script sets in the collection, covering program validation, contracts, portals and the notification queue.',
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
    problem:
      'Roll-off rental is priced by size, duration and location, and most of the business arrives by phone. The company needed customers to be able to price and book themselves without losing the ability to take a booking over the phone.',
    built:
      'Customers get instant pricing and can book online or as a guest, sign the rental contract, and pay by card. Staff get an admin area that mirrors that flow for phone bookings, including charging a saved card, issuing invoices and sending review requests after the haul.',
    stackNote:
      'Built on the newest stack in the collection — Next.js 16 and Tailwind v4 — with Supabase for data and Cloudinary for media.',
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
    problem:
      'Off-market property deals are valuable precisely because they are not public. The platform had to gate listings behind membership while still capturing buyer interest fast enough to matter.',
    built:
      'A members-only deal feed sits behind auth, with separate public, admin and authenticated areas. When a listing goes up, background jobs fan out notifications to subscribers, and buyer interest is captured back as a lead.',
    stackNote:
      'Inngest runs the notification jobs out of band, react-email renders the templates, and Supabase provides data and auth. Playwright and Vitest cover the flows.',
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
    problem:
      'An agency serving many clients has the same reporting conversation every month. Clients want to see their own performance; the agency wants one pipeline across all of them.',
    built:
      'Each client gets a portal scoped to their own account, while the agency works a shared pipeline behind it. Reporting pulls real numbers from the Google Analytics Data API rather than being re-keyed, and an AI assistant helps summarise account activity.',
    stackNote:
      'Prisma over PostgreSQL with Auth.js for multi-tenant access control. The repo is held to unit, integration and end-to-end tests plus Lighthouse CI and bundle-size checks.',
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
    problem:
      'Running coding agents across many repositories by hand means losing track of what is queued, what is running and what it costs.',
    built:
      'A desktop app that holds a task queue per project and runs an orchestrator loop across them, with an activity feed, a budget indicator, backup checklists, a team chat window and a real embedded terminal.',
    stackNote:
      'Electron with electron-vite, persisting state locally in SQLite via better-sqlite3. node-pty and xterm.js provide the embedded terminal.',
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
    problem:
      'Automated audits produce a lot of text. Reading raw audit files across many projects makes it hard to see which problems are worst or whether anything improved.',
    built:
      'Audit files written to disk are read and rendered as charts and readable reports, with a dedicated view per dimension — code quality, security, SEO and performance — and a per-project index. Read-only by design, so it can never alter what it reports on.',
    stackNote: 'Recharts draws the charts, react-markdown renders the written sections, and next-themes supports light and dark.',
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
    problem:
      'An off-road shop sells three different things at once — catalogue parts, custom builds and workshop service — and each needs a different path to checkout or enquiry.',
    built:
      'A storefront with cart and checkout for parts, a quote request path for builds and service, and admin plus dashboard areas for the shop. Product data is brought in through dedicated import scripts rather than entered by hand.',
    stackNote: 'Supabase backs the catalogue and orders, media is served from S3, and embla-carousel drives the product galleries.',
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
    problem:
      'A coach selling both knowledge and physical products needs one storefront that can handle a recurring program, a one-off course and a shippable item without feeling like three different shops.',
    built:
      'Programs, course content and recovery products share a single storefront and checkout, with accounts carrying a customer between what they have bought and what they are working through.',
    stackNote: 'Stripe handles checkout; Supabase backs content and accounts.',
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
    problem:
      'A contractor competes in local search across dozens of service-and-city combinations. One generic services page cannot rank for all of them.',
    built:
      'The site is structured for that reach: many service and city landing pages, each with its own content, plus a CMS-driven blog the client can run without a developer. Motion is handled carefully so a content-heavy site still feels considered.',
    stackNote:
      'Sanity supplies the editable content, Supabase backs form data, Resend sends enquiries, and GSAP with Lenis drive the scroll motion. Playwright covers the critical paths end to end.',
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
    problem:
      'A Spanish immersion school has to speak to two language audiences equally well — a translated afterthought undercuts the product itself — and enrolment enquiries are the thing that actually matters.',
    built:
      'Both languages are served as first-class content from one codebase rather than a bolted-on translation layer. Enquiries route into a Supabase-backed admin pipeline so the school can track a family from first contact through to enrolment.',
    stackNote: 'next-translate handles routing and copy per locale; Sanity supplies CMS content and Leaflet renders the location map.',
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
    problem:
      'A villa property sells on atmosphere, but the people running it need an operational tool — and those two things usually end up as two disconnected systems.',
    built:
      'Public villa pages present the property and take bookings through a Sirvoy integration. Behind auth, a staff portal carries a guest inbox, contacts, leads, a bookings calendar, notification settings and user management.',
    stackNote: 'Supabase provides data and the auth gate for the portal; Resend handles guest email.',
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
    problem:
      'Clinical products have to be presented precisely — the audience is practitioners, and the catalogue changes — while the site still has to do a commercial job and book demos.',
    built:
      'The catalogue covers skin substitutes, autologous blood, collagen and debridement products, backed by a CMS so it stays editable as the range changes. The whole site funnels toward booking a demo.',
    stackNote: 'Sanity backs the catalogue, Motion and Lenis handle scroll feel, Resend sends enquiries, and Vitest covers the logic.',
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
    problem:
      'A trauma-informed studio has to be careful about how it treats the people visiting it — including whether it tracks them before asking.',
    built:
      'Classes are sold through Stripe checkout, content runs through a Sanity studio the team controls, and analytics only load after explicit consent, which matches the studio’s practice rather than contradicting it.',
    stackNote: 'Sanity for content, Stripe for checkout, Resend for transactional email, styled-components for styling.',
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
    problem:
      'One contractor operating in two states needs the site to feel local in both, without maintaining two separate websites.',
    built:
      'The site is structured around two state markets, with local team and service routes under each, backed by CMS content so the regions can diverge where they need to. A documented SEO audit process keeps the structure honest.',
    stackNote: 'Sanity supplies the content; the repo carries written SEO audit documentation.',
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
    problem:
      'The people who pick up a new lead are rarely at a desk. Pipeline status, customer conversations and reporting all lived in systems you had to be sitting down to use.',
    built:
      'A native app built around five areas: a dashboard of pipeline value and leads by stage, an opportunities list for working deals, in-app chat with customers, generated reports, and settings. It runs against the same Supabase backend as the web work, so the phone and the desktop see the same pipeline.',
    stackNote:
      'React Native with NativeWind for styling and React Navigation for structure. TanStack Query handles fetching and caching so the app stays usable on a bad site connection, and Gifted Charts draws the dashboard breakdowns.',
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
    problem:
      'Camp staff run sessions away from the office. Checking enrolments or acting on an update meant going back to a desktop.',
    built:
      'A native companion to the Camp Alegría platform, giving staff the admin surface on a phone, built against the same Supabase backend as the web app.',
    stackNote: 'React Native with React Navigation, Supabase for data, and native image picking and push notification support.',
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
