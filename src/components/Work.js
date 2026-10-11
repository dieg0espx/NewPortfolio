import React, { useMemo, useState } from 'react';
import projects, { CATEGORIES, accentFor } from '../data/projects';
import ProjectFrame from './ProjectFrame';

function TechList({ items }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {items.map((t) => (
        <li
          key={t}
          className="rounded-full border border-hairline bg-paper px-3 py-1 text-caption text-black/60"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function ProjectCard({ project, index }) {
  const accent = accentFor(index);
  const { preview } = project;
  const hasImage = Boolean(preview.desktop);
  const isPhone = preview.frame === 'phone';
  const src = hasImage ? `${process.env.PUBLIC_URL}/projects/${preview.desktop}` : null;

  return (
    <article className="card-surface overflow-hidden">
      <div className="grid gap-8 p-6 lg:grid-cols-2 lg:gap-10 lg:p-8">
        {/* Preview */}
        <div className={isPhone ? 'order-1 flex items-center justify-center' : 'order-1'}>
          {hasImage ? (
            <ProjectFrame
              src={src}
              alt={`Captured screenshot of the ${project.name} ${isPhone ? 'app' : 'website'}`}
              name={project.name}
              variant={preview.frame}
              accent={accent}
            />
          ) : (
            // Not renderable: say so plainly rather than fake a preview.
            <div
              className="flex min-h-[260px] flex-col items-center justify-center rounded-cards p-8 text-center"
              style={{ backgroundColor: accent }}
            >
              <span
                className={`text-heading-sm font-bold ${
                  accent === '#02093a' ? 'text-white' : 'text-ink'
                }`}
              >
                {project.name}
              </span>
              <span
                className={`mt-3 max-w-[34ch] text-body-sm ${
                  accent === '#02093a' ? 'text-white/80' : 'text-ink/70'
                }`}
              >
                No screenshot captured
              </span>
            </div>
          )}
        </div>

        {/* Copy */}
        <div className="order-2 flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: accent }}
              aria-hidden="true"
            />
            <span className="text-caption uppercase tracking-[0.12px] text-black/40">
              {CATEGORIES.find((c) => c.id === project.category)?.label}
            </span>
          </div>

          <h3 className="mt-3 text-heading-sm font-bold tracking-[-0.242px] text-ink">
            {project.name}
          </h3>
          <p className="mt-1 text-body-sm font-medium text-black/60">{project.tagline}</p>

          <p className="mt-4 text-body text-graphite">{project.description}</p>

          {project.highlights?.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
              {project.highlights.map((h) => (
                <li key={h} className="text-body-sm text-black/60">
                  · {h}
                </li>
              ))}
            </ul>
          )}

          <TechList items={project.technologies} />

          {preview.note && (
            <p className="mt-5 border-l-2 border-hairline pl-3 text-caption text-black/40">
              {preview.note}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

function Work() {
  const [active, setActive] = useState('all');

  const visible = useMemo(
    () => (active === 'all' ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  // Only offer filters that actually match something.
  const categories = CATEGORIES.filter(
    (c) => c.id === 'all' || projects.some((p) => p.category === c.id)
  );

  return (
    <section id="work" className="section-shell py-section">
      <div className="max-w-[46ch]">
        <h2 className="text-[40px] font-semibold leading-[1.06] tracking-[-1.5px] text-ink sm:text-display-sm">
          Selected work
        </h2>
        <p className="mt-5 font-serif text-[18px] leading-[1.56] text-graphite">
          {projects.length} projects from a larger body of work on the ComCreate disk. Every
          description and technology list below is taken from the project's own source.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
        {categories.map((c) => {
          const isActive = active === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActive(c.id)}
              aria-pressed={isActive}
              className={`rounded-full px-4 py-[6px] text-body-sm font-medium transition-colors duration-200 ease-out ${
                isActive
                  ? 'bg-ink text-white'
                  : 'border border-hairline bg-white text-black/60 hover:text-ink'
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col gap-6">
        {visible.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

export default Work;
