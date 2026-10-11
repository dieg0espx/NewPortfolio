import Link from 'next/link';
import { notFound } from 'next/navigation';
import projects, { CATEGORIES, getProject, getNeighbours, accentFor } from '@/content/projects';
import ProjectFrame from '@/components/ProjectFrame';
import { Reveal } from '@/components/Motion';
import CallToAction from '@/components/CallToAction';

/**
 * Renders a narrative field that may be a single string or several paragraphs.
 * Keeping the content as an array lets a case study breathe without the data
 * file carrying any markup.
 */
function Prose({ body }) {
  const paragraphs = Array.isArray(body) ? body : [body];
  return (
    <div className="mt-5 flex flex-col gap-4">
      {paragraphs.map((t, i) => (
        <p key={i} className="text-body-lg leading-[1.68] text-graphite">
          {t}
        </p>
      ))}
    </div>
  );
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    openGraph: { title: project.name, description: project.summary },
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const accent = accentFor(index);
  const { prev, next } = getNeighbours(slug);
  const category = CATEGORIES.find((c) => c.id === project.category)?.label;
  const isPhone = project.preview.frame === 'phone';
  const screens = project.preview.screens ?? [];
  const primary = project.preview.desktop || screens[0]?.file;

  return (
    <>
      <article>
        {/* ---- Title block ---- */}
        <header className="shell pb-12 pt-14 sm:pt-20">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-body-sm font-medium text-ink/45 transition-colors hover:text-ink"
          >
            <span aria-hidden="true">←</span> All work
          </Link>

          <div className="mt-8 flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: accent }}
              aria-hidden="true"
            />
            <span className="eyebrow">{category}</span>
          </div>

          <h1 className="mt-4 max-w-[16ch] text-[44px] font-semibold leading-[1.02] tracking-[-1.9px] text-ink sm:text-display">
            {project.name}
          </h1>
          <p className="mt-5 max-w-[56ch] font-serif text-body-lg text-graphite">
            {project.summary}
          </p>

          {project.facts?.length > 0 && (
            <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-5 border-t pt-7">
              {project.facts.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-caption uppercase text-ink/35">{k}</dt>
                  <dd className="mt-1 text-subheading font-semibold text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          )}
        </header>

        {/* ---- Primary preview ---- */}
        {primary && (
          <section className="shell pb-16">
            <Reveal>
              <div className={isPhone ? 'flex justify-center' : ''}>
                <ProjectFrame
                  src={`/projects/${primary}`}
                  alt={`Captured screenshot of the ${project.name} ${isPhone ? 'app' : 'website'}`}
                  name={project.name}
                  variant={project.preview.frame}
                  accent={accent}
                  priority
                  height={isPhone ? 520 : 620}
                />
              </div>
            </Reveal>
          </section>
        )}

        {!primary && (
          <section className="shell pb-16">
            <div
              className="flex min-h-[280px] flex-col items-center justify-center rounded-cards p-10 text-center"
              style={{ backgroundColor: accent }}
            >
              <p
                className={`text-heading-sm font-bold ${
                  accent === '#02093a' ? 'text-white' : 'text-ink'
                }`}
              >
                No screenshot captured
              </p>
              {project.preview.note && (
                <p
                  className={`mt-3 max-w-[48ch] text-body-sm ${
                    accent === '#02093a' ? 'text-white/75' : 'text-ink/70'
                  }`}
                >
                  {project.preview.note}
                </p>
              )}
            </div>
          </section>
        )}

        {/* ---- Narrative ---- */}
        <section className="shell grid items-start gap-12 pb-20 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-24">
          <div className="flex max-w-[68ch] flex-col gap-14">
            {project.problem && (
              <Reveal>
                <p className="eyebrow">01 — Context</p>
                <h2 className="mt-3 text-heading-sm font-semibold text-ink/95">The problem</h2>
                <div className="mt-5 flex flex-col gap-4">
                  {(Array.isArray(project.problem) ? project.problem : [project.problem]).map(
                    (t, i) => (
                      <p
                        key={i}
                        className="text-[21px] leading-[1.52] tracking-[-0.3px] text-ink/85"
                      >
                        {t}
                      </p>
                    )
                  )}
                </div>
              </Reveal>
            )}

            {project.built && (
              <Reveal>
                <p className="eyebrow">02 — Solution</p>
                <h2 className="mt-3 text-heading-sm font-semibold text-ink/95">What was built</h2>
                <Prose body={project.built} />
              </Reveal>
            )}

            {project.pullQuote && (
              <Reveal>
                <blockquote className="border-l-2 border-ink/15 pl-6 font-serif text-[28px] leading-[1.38] tracking-[-0.4px] text-ink/95">
                  {project.pullQuote}
                </blockquote>
              </Reveal>
            )}

            {project.decisions?.length > 0 && (
              <Reveal>
                <p className="eyebrow">03 — Approach</p>
                <h2 className="mt-3 text-heading-sm font-semibold text-ink/95">
                  Decisions that shaped it
                </h2>
                <dl className="mt-6 flex flex-col gap-6">
                  {project.decisions.map((d) => (
                    <div key={d.title} className="border-t pt-5">
                      <dt className="text-body font-semibold text-ink">{d.title}</dt>
                      <dd className="mt-2 text-body leading-[1.65] text-graphite">{d.body}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}

            {project.stackNote && (
              <Reveal>
                <p className="eyebrow">04 — Under the hood</p>
                <h2 className="mt-3 text-heading-sm font-semibold text-ink/95">Technical notes</h2>
                <Prose body={project.stackNote} />
              </Reveal>
            )}

            {project.preview.note && primary && (
              <p className="border-l-2 pl-4 text-body-sm text-ink/45">{project.preview.note}</p>
            )}
          </div>

          {/* ---- Sidebar ---- */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <h2 className="eyebrow">Technologies</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <li
                    key={t}
                    className="rounded-full bg-paper px-2.5 py-1 text-caption text-ink/65"
                    style={{ border: '1px solid var(--hairline)' }}
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-caption leading-[1.5] text-ink/35">
                Taken from the project&rsquo;s package manifest and configuration.
              </p>
            </div>
          </aside>
        </section>

        {/* ---- Additional captured screens ---- */}
        {screens.length > 1 && (
          <section className="shell pb-20">
            <Reveal>
              <h2 className="eyebrow">More screens</h2>
            </Reveal>
            <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {screens.slice(1).map((s) => (
                <Reveal key={s.file}>
                  <ProjectFrame
                    src={`/projects/${s.file}`}
                    alt={`Captured screenshot of ${project.name}: ${s.shows}`}
                    name={project.name}
                    variant="phone"
                    accent={accent}
                    height={440}
                  />
                  {s.shows && (
                    <p className="mt-2 text-center text-caption text-ink/45">{s.shows}</p>
                  )}
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* ---- Prev / next ---- */}
        <nav className="shell grid gap-4 border-t py-10 sm:grid-cols-2" aria-label="More projects">
          {prev && (
            <Link href={`/work/${prev.slug}`} className="card group p-6 transition-colors hover:bg-white">
              <span className="text-caption uppercase text-ink/35">Previous</span>
              <span className="mt-2 block text-heading-sm font-bold text-ink">{prev.name}</span>
              <span className="mt-1 block text-body-sm text-ink/50">{prev.tagline}</span>
            </Link>
          )}
          {next && (
            <Link
              href={`/work/${next.slug}`}
              className="card group p-6 transition-colors hover:bg-white sm:text-right"
            >
              <span className="text-caption uppercase text-ink/35">Next</span>
              <span className="mt-2 block text-heading-sm font-bold text-ink">{next.name}</span>
              <span className="mt-1 block text-body-sm text-ink/50">{next.tagline}</span>
            </Link>
          )}
        </nav>
      </article>

      <CallToAction
        eyebrow="Next step"
        title="Need something built like this?"
        body="Tell me what you are trying to build and I will tell you how I would approach it."
      />
    </>
  );
}
