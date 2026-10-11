import Image from 'next/image';
import { Reveal, Stagger, Child } from '@/components/Motion';
import CallToAction from '@/components/CallToAction';
import projects from '@/content/projects';

export const metadata = {
  title: 'About',
  description:
    'Diego Espinosa — full-stack developer. Web & Mobile App Development at Cornerstone International Community College of Canada, Vancouver.',
};

const STACK_GROUPS = [
  {
    label: 'Front end',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Motion / GSAP', 'Astro'],
  },
  {
    label: 'Back end & data',
    items: ['Node.js', 'PostgreSQL', 'Supabase', 'Prisma', 'MySQL', 'PHP', 'Python'],
  },
  {
    label: 'Mobile',
    items: ['React Native', 'React Navigation', 'NativeWind', 'Swift'],
  },
  {
    label: 'Platform & tooling',
    items: ['Sanity', 'Stripe', 'AWS S3', 'Resend', 'Playwright', 'Vitest', 'WordPress'],
  },
];

export default function AboutPage() {
  const categories = new Set(projects.map((p) => p.category));

  return (
    <>
      <section className="shell pb-16 pt-16 sm:pt-20">
        <p className="eyebrow">About</p>
        <h1 className="mt-5 max-w-[18ch] text-[44px] font-semibold leading-[1.03] tracking-[-1.9px] text-ink sm:text-display">
          I build the thing and the system behind it
        </h1>
        <p className="mt-7 max-w-[64ch] font-serif text-body-lg text-graphite">
          Most of my work starts as a website and ends up as a product. A contractor needs service
          pages that rank, then a way to quote. A camp needs a brochure site, then registration,
          payments and capacity limits. I tend to end up owning both halves — the public surface and
          the system that keeps it running.
        </p>
      </section>

      <section className="border-y bg-white py-14">
        <Stagger className="shell grid gap-10 sm:grid-cols-3">
          {[
            [`${projects.length}`, 'Featured projects'],
            [`${categories.size}`, 'Project categories'],
            ['2021', 'Graduated, Vancouver BC'],
          ].map(([n, l]) => (
            <Child key={l}>
              <p className="text-display-sm font-semibold tracking-[-1.89px] text-ink">{n}</p>
              <p className="mt-2 text-body-sm text-ink/50">{l}</p>
            </Child>
          ))}
        </Stagger>
      </section>

      <section className="shell py-24">
        <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow">Background</p>
            <h2 className="mt-4 text-heading font-semibold text-ink">From learning to leading</h2>
            <p className="mt-5 font-serif text-body-lg text-graphite">
              A foundation built on continuous learning, mastering technologies, and refining skills
              to turn knowledge into real-world impact.
            </p>
          </Reveal>

          <div className="flex flex-col gap-4">
            <Reveal>
              <div className="card p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-heading-sm font-bold text-ink">
                    Web &amp; Mobile App Development
                  </h3>
                  <span className="text-body-sm text-ink/45">Graduated 09/2021</span>
                </div>
                <p className="mt-2 text-body text-graphite">
                  Cornerstone International Community College of Canada
                </p>
                <p className="mt-1 text-body-sm font-medium text-notion">Vancouver, Canada</p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="card p-7">
                <h3 className="text-heading-sm font-bold text-ink">Online courses</h3>
                <p className="mt-2 text-body text-graphite">Udemy</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {[
                    'The Complete JavaScript Course',
                    'The Ultimate SEO Training + SEO for WordPress Websites',
                    'React — The Complete Guide',
                  ].map((c) => (
                    <li key={c} className="flex gap-2.5 text-body-sm text-ink/60">
                      <span className="text-ink/25" aria-hidden="true">
                        ·
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="shell pb-24">
        <Reveal>
          <p className="eyebrow">Stack</p>
          <h2 className="mt-4 max-w-[20ch] text-heading font-semibold text-ink">
            What I reach for, and why
          </h2>
          <p className="mt-5 max-w-[58ch] text-body text-graphite">
            These are the tools actually evidenced across the projects in this portfolio — not a
            wish list.
          </p>
        </Reveal>

        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2">
          {STACK_GROUPS.map((g) => (
            <Child key={g.label}>
              <div className="card h-full p-7">
                <h3 className="text-caption uppercase tracking-[0.12px] text-ink/35">{g.label}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((i) => (
                    <li
                      key={i}
                      className="rounded-full bg-paper px-3 py-1.5 text-body-sm text-ink/70"
                      style={{ border: '1px solid var(--hairline)' }}
                    >
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </Child>
          ))}
        </Stagger>
      </section>

      <CallToAction />
    </>
  );
}
