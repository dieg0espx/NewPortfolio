'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import projects, { CATEGORIES, accentFor } from '@/content/projects';
import ProjectFrame from './ProjectFrame';

function Tile({ project, accent, isPhone }) {
  const file = project.preview.desktop || project.preview.screens?.[0]?.file;
  const category = CATEGORIES.find((c) => c.id === project.category)?.label;

  return (
    <article className="card flex h-full flex-col overflow-hidden p-5">
      {file ? (
        <ProjectFrame
          src={`/projects/${file}`}
          alt={`Captured screenshot of the ${project.name} ${isPhone ? 'app' : 'website'}`}
          name={project.name}
          variant={project.preview.frame}
          accent={accent}
          height={isPhone ? 360 : 230}
        />
      ) : (
        <div
          className="flex h-[230px] flex-col items-center justify-center rounded-cards p-6 text-center"
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
            className={`mt-2 text-caption ${accent === '#02093a' ? 'text-white/70' : 'text-ink/60'}`}
          >
            No screenshot captured
          </span>
        </div>
      )}

      <div className="mt-6 flex flex-1 flex-col">
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-[7px] w-[7px] rounded-full"
            style={{ backgroundColor: accent }}
            aria-hidden="true"
          />
          <span className="eyebrow">{category}</span>
        </div>
        <h3 className="mt-2.5 text-heading-sm font-bold text-ink">{project.name}</h3>
        <p className="mt-1 text-body-sm font-medium text-ink/50">{project.tagline}</p>
        <p className="mt-3 flex-1 text-body-sm text-graphite">{project.summary}</p>

        <Link
          href={`/work/${project.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-body-sm font-medium text-notion transition-all hover:gap-2.5"
        >
          Case study
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

export default function WorkIndex() {
  const [active, setActive] = useState('all');
  const reduce = useReducedMotion();

  const visible = useMemo(
    () => (active === 'all' ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  const categories = CATEGORIES.filter(
    (c) => c.id === 'all' || projects.some((p) => p.category === c.id)
  );

  return (
    <>
      <div
        className="mt-10 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter projects by category"
      >
        {categories.map((c) => {
          const isActive = active === c.id;
          const count =
            c.id === 'all' ? projects.length : projects.filter((p) => p.category === c.id).length;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActive(c.id)}
              aria-pressed={isActive}
              className={`relative rounded-full px-4 py-2 text-body-sm font-medium transition-colors duration-200 ${
                isActive ? 'text-white' : 'bg-white text-ink/60 hover:text-ink'
              }`}
              style={isActive ? undefined : { border: '1px solid var(--hairline)' }}
            >
              {isActive && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-ink"
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                />
              )}
              {c.label}
              <span className={isActive ? 'ml-1.5 text-white/50' : 'ml-1.5 text-ink/30'}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Keeps the heading order h1 -> h2 -> h3 for the project tiles below. */}
      <h2 className="sr-only">
        {active === 'all'
          ? 'All projects'
          : `${CATEGORIES.find((c) => c.id === active)?.label} projects`}
      </h2>

      <motion.div layout={!reduce} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.div
              key={p.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={reduce ? undefined : { opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <Tile
                project={p}
                accent={accentFor(i)}
                isPhone={p.preview.frame === 'phone'}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <p className="mt-16 text-center text-body text-ink/45">No projects in this category.</p>
      )}
    </>
  );
}
