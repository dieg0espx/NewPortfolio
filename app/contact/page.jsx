import { Reveal, Stagger, Child } from '@/components/Motion';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with Diego Espinosa — email, LinkedIn and GitHub.',
};

const CHANNELS = [
  {
    label: 'Email',
    value: 'espinosa9mx@gmail.com',
    href: 'mailto:espinosa9mx@gmail.com',
    note: 'Best for project enquiries. Tell me what you are trying to build.',
    accent: '#0075de',
  },
  {
    label: 'LinkedIn',
    value: 'devDiegoE',
    href: 'https://www.linkedin.com/in/devDiegoE/',
    note: 'Background, experience and professional history.',
    accent: '#097fe8',
  },
  {
    label: 'GitHub',
    value: 'dieg0espx',
    href: 'https://github.com/dieg0espx',
    note: 'Public repositories and day-to-day code.',
    accent: '#111111',
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="shell pb-16 pt-16 sm:pt-20">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-5 max-w-[14ch] text-[44px] font-semibold leading-[1.02] tracking-[-1.9px] text-ink sm:text-display">
          Let&rsquo;s talk about what you need built
        </h1>
        <p className="mt-7 max-w-[58ch] font-serif text-body-lg text-graphite">
          Whether it is a marketing site, a platform with payments and portals, or a native app for
          your team — tell me the problem and I&rsquo;ll tell you how I would approach it.
        </p>
      </section>

      <section className="shell pb-24">
        <Stagger className="grid gap-5 lg:grid-cols-3">
          {CHANNELS.map((c) => (
            <Child key={c.label}>
              <a
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="card group flex h-full flex-col p-7 transition-all duration-200 hover:shadow-lift"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="inline-block h-2 w-2 rounded-full"
                    style={{ backgroundColor: c.accent }}
                    aria-hidden="true"
                  />
                  <span className="eyebrow">{c.label}</span>
                </div>
                <p className="mt-4 break-words text-heading-sm font-bold text-ink">{c.value}</p>
                <p className="mt-3 flex-1 text-body-sm text-graphite">{c.note}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-body-sm font-medium text-notion transition-all group-hover:gap-2.5">
                  Open
                  <span aria-hidden="true">→</span>
                </span>
              </a>
            </Child>
          ))}
        </Stagger>

        <Reveal>
          <div className="mt-6 rounded-cards bg-midnight px-8 py-14 text-center sm:py-20">
            <h2 className="mx-auto max-w-[20ch] text-heading font-semibold text-white">
              Prefer to just send an email?
            </h2>
            <p className="mx-auto mt-4 max-w-[46ch] font-serif text-body-lg text-white/65">
              No form, no autoresponder — it comes straight to me.
            </p>
            <a className="btn-primary mt-8" href="mailto:espinosa9mx@gmail.com">
              espinosa9mx@gmail.com
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
