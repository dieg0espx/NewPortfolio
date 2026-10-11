import { Reveal, Stagger, Child } from './Motion';

const BLOCKS = [
  {
    bg: '#ffb110',
    fg: 'ink',
    title: 'Ship the whole product, not just the page',
    body: 'Most of this work pairs a public site with the system behind it: quoting and booking, payments and invoices, admin areas, and role-based portals for staff and customers.',
  },
  {
    bg: '#02093a',
    fg: 'white',
    title: 'Content the client can actually edit',
    body: 'Sanity and Supabase back the sites that change often, so copy, blogs and catalogues stay editable without a developer in the loop.',
  },
  {
    bg: '#62aef0',
    fg: 'ink',
    title: 'Built to be found',
    body: 'Service and city landing pages, sitemaps, structured metadata and documented SEO audits are part of the build, not an afterthought.',
  },
  {
    bg: '#f64932',
    fg: 'white',
    title: 'Tested where it counts',
    body: 'The larger platforms carry unit, integration and end-to-end suites with Playwright and Vitest, plus Lighthouse checks on the CRM.',
  },
];

export default function Capabilities() {
  return (
    <section className="shell pb-[120px] pt-6">
      <Reveal>
        <p className="eyebrow">How I work</p>
        <h2 className="mt-4 max-w-[18ch] text-heading font-semibold text-ink sm:text-display-sm">
          Patterns that run through the work
        </h2>
      </Reveal>

      <Stagger className="mt-12 grid gap-5 md:grid-cols-2">
        {BLOCKS.map((b) => (
          <Child key={b.title}>
            <div className="h-full rounded-cards p-8" style={{ backgroundColor: b.bg }}>
              <h3
                className={`text-heading-sm font-bold ${
                  b.fg === 'white' ? 'text-white' : 'text-ink'
                }`}
              >
                {b.title}
              </h3>
              <p
                className={`mt-3.5 text-body ${
                  b.fg === 'white' ? 'text-white/80' : 'text-ink/75'
                }`}
              >
                {b.body}
              </p>
            </div>
          </Child>
        ))}
      </Stagger>
    </section>
  );
}
