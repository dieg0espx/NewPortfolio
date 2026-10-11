import Link from 'next/link';
import projects, { accentFor } from '@/content/projects';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import ProjectCard from '@/components/ProjectCard';
import Capabilities from '@/components/Capabilities';
import CallToAction from '@/components/CallToAction';
import { Reveal } from '@/components/Motion';

export default function HomePage() {
  const lead = projects.find((p) => p.preview.desktop);
  const featured = projects.filter((p) => p.slug !== lead?.slug).slice(0, 4);

  return (
    <>
      <Hero lead={lead} projectCount={projects.length} />
      <Marquee />

      <section className="shell py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-4 max-w-[16ch] text-heading font-semibold text-ink sm:text-display-sm">
              Platforms, storefronts and the tools behind them
            </h2>
          </div>
          <Link className="btn-outline" href="/work">
            All {projects.length} projects
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>

        <div className="mt-12 flex flex-col gap-5">
          {featured.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              index={i}
              accent={accentFor(i)}
              reversed={i % 2 === 1}
            />
          ))}
        </div>
      </section>

      <Capabilities />
      <CallToAction />
    </>
  );
}
