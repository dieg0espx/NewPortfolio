'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { CATEGORIES } from '@/content/projects';
import ProjectFrame from './ProjectFrame';

/**
 * A project as an alternating two-column block: preview on one side, the
 * story on the other. Index drives both the accent and the side it sits on.
 */
export default function ProjectCard({ project, index, accent, reversed = false }) {
  const reduce = useReducedMotion();
  const { preview } = project;
  const hasImage = Boolean(preview.desktop || preview.screens?.length);
  const isPhone = preview.frame === 'phone';
  const file = preview.desktop || preview.screens?.[0]?.file;
  const category = CATEGORIES.find((c) => c.id === project.category)?.label;

  return (
    <motion.article
      className="card group overflow-hidden"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={`grid items-center gap-8 p-6 lg:grid-cols-2 lg:gap-12 lg:p-9 ${
          reversed ? 'lg:[&>*:first-child]:order-2' : ''
        }`}
      >
        <div>
          {hasImage ? (
            <ProjectFrame
              src={`/projects/${file}`}
              alt={`Captured screenshot of the ${project.name} ${isPhone ? 'app' : 'website'}`}
              name={project.name}
              variant={preview.frame}
              accent={accent}
              height={isPhone ? 440 : 330}
            />
          ) : (
            <div
              className="flex min-h-[300px] flex-col items-center justify-center rounded-cards p-8 text-center"
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
                className={`mt-3 max-w-[30ch] text-body-sm ${
                  accent === '#02093a' ? 'text-white/75' : 'text-ink/65'
                }`}
              >
                No screenshot captured
              </span>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: accent }}
              aria-hidden="true"
            />
            <span className="eyebrow">{category}</span>
          </div>

          <h3 className="mt-3 text-heading font-semibold text-ink">
            <Link href={`/work/${project.slug}`} className="transition-opacity hover:opacity-70">
              {project.name}
            </Link>
          </h3>
          <p className="mt-1.5 text-body font-medium text-ink/55">{project.tagline}</p>

          <p className="mt-5 text-body text-graphite">{project.summary}</p>

          {project.facts?.length > 0 && (
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {project.facts.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-caption uppercase text-ink/35">{k}</dt>
                  <dd className="mt-0.5 text-body-sm font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          )}

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.technologies.slice(0, 6).map((t) => (
              <li
                key={t}
                className="rounded-full bg-paper px-2.5 py-1 text-caption text-ink/60"
                style={{ border: '1px solid var(--hairline)' }}
              >
                {t}
              </li>
            ))}
            {project.technologies.length > 6 && (
              <li className="px-1 py-1 text-caption text-ink/40">
                +{project.technologies.length - 6}
              </li>
            )}
          </ul>

          <Link
            href={`/work/${project.slug}`}
            className="mt-7 inline-flex items-center gap-1.5 text-body-sm font-medium text-notion transition-all hover:gap-2.5"
          >
            Read the case study
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
