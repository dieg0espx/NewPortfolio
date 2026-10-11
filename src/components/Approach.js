import React from 'react';
import { Sparkle } from './CharacterMark';

/**
 * Accent feature blocks. Color variety lives here, in card backgrounds —
 * not in buttons — per the design rules.
 */
const BLOCKS = [
  {
    bg: '#ffb110',
    fg: 'text-ink',
    title: 'Ship the whole product, not just the page',
    body: 'Most of the work here pairs a public site with the system behind it: booking and quoting, payments and invoices, admin areas, and role-based portals for staff and customers.',
  },
  {
    bg: '#02093a',
    fg: 'text-white',
    title: 'Content the client can actually edit',
    body: 'Sanity and Supabase back the sites that change often, so marketing copy, blogs and catalogs stay editable without a developer in the loop.',
  },
  {
    bg: '#62aef0',
    fg: 'text-ink',
    title: 'Built to be found',
    body: 'Service and city landing pages, sitemaps, structured metadata and documented SEO audits are part of the build on the contractor and local-service sites.',
  },
  {
    bg: '#f64932',
    fg: 'text-white',
    title: 'Tested where it counts',
    body: 'The larger platforms carry unit, integration and end-to-end suites — Playwright and Vitest — plus Lighthouse checks on the CRM.',
  },
];

function Approach() {
  return (
    <section id="approach" className="section-shell py-section">
      <div className="flex items-start gap-3">
        <div className="max-w-[46ch]">
          <h2 className="text-[40px] font-semibold leading-[1.06] tracking-[-1.5px] text-ink sm:text-display-sm">
            How I work
          </h2>
          <p className="mt-5 font-serif text-[18px] leading-[1.56] text-graphite">
            Patterns that show up across the projects above.
          </p>
        </div>
        <Sparkle className="mt-2 hidden sm:block" color="#ffb110" />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {BLOCKS.map((b) => (
          <div key={b.title} className="rounded-cards p-6 sm:p-8" style={{ backgroundColor: b.bg }}>
            <h3 className={`text-heading-sm font-bold tracking-[-0.242px] ${b.fg}`}>{b.title}</h3>
            <p className={`mt-3 text-body ${b.fg === 'text-white' ? 'text-white/85' : 'text-ink/75'}`}>
              {b.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Approach;
