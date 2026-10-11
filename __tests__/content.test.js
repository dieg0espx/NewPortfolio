import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import projects, { CATEGORIES, getProject, getNeighbours } from '@/content/projects';

const PUBLIC_PROJECTS = path.join(process.cwd(), 'public', 'projects');

/**
 * These tests encode the content-honesty rules from
 * docs/redesign-2026/02-prd-and-design.md. They are the guard against the
 * portfolio quietly drifting into claims it cannot support.
 */
describe('content integrity', () => {
  it('every project has the fields the UI renders', () => {
    projects.forEach((p) => {
      expect(p.slug, 'slug').toMatch(/^[a-z0-9-]+$/);
      expect(p.name, `${p.slug} name`).toBeTruthy();
      expect(p.tagline, `${p.slug} tagline`).toBeTruthy();
      expect(p.summary, `${p.slug} summary`).toBeTruthy();
      expect(Array.isArray(p.technologies), `${p.slug} technologies`).toBe(true);
      expect(p.technologies.length, `${p.slug} technologies`).toBeGreaterThan(0);
      expect(p.preview, `${p.slug} preview`).toBeTruthy();
    });
  });

  it('slugs are unique', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('every category used by a project exists in CATEGORIES', () => {
    const known = new Set(CATEGORIES.map((c) => c.id));
    projects.forEach((p) => {
      expect(known.has(p.category), `${p.slug} category "${p.category}"`).toBe(true);
    });
  });

  it('no project asserts an unverified live link', () => {
    // No deployment URL was ever probed, so none may be claimed.
    projects.forEach((p) => {
      expect(p.links, `${p.slug} must not claim links`).toBeUndefined();
      expect(p.url, `${p.slug} must not claim a url`).toBeUndefined();
    });
  });

  it('projects without a capture explain why instead of faking one', () => {
    projects
      .filter((p) => !p.preview.desktop && !p.preview.screens?.length)
      .forEach((p) => {
        expect(typeof p.preview.note, `${p.slug} needs a note`).toBe('string');
        expect(p.preview.note.length, `${p.slug} note too short`).toBeGreaterThan(20);
      });
  });

  it('every referenced screenshot exists on disk', () => {
    projects.forEach((p) => {
      const files = [
        p.preview.desktop,
        p.preview.mobile,
        ...(p.preview.screens ?? []).map((s) => s.file),
      ].filter(Boolean);

      files.forEach((f) => {
        expect(
          fs.existsSync(path.join(PUBLIC_PROJECTS, f)),
          `${p.slug} references missing file ${f}`
        ).toBe(true);
      });
    });
  });

  it('does not use forbidden marketing superlatives', () => {
    // Guards against drifting into unverifiable claims.
    const banned = /\b(award[- ]winning|world[- ]class|best[- ]in[- ]class|industry[- ]leading|cutting[- ]edge|revolutionary)\b/i;
    projects.forEach((p) => {
      const prose = [p.summary, p.problem, p.built, p.stackNote, p.tagline]
        .filter(Boolean)
        .join(' ');
      expect(banned.test(prose), `${p.slug} uses a superlative`).toBe(false);
    });
  });
});

describe('navigation helpers', () => {
  it('getProject finds by slug and returns undefined otherwise', () => {
    expect(getProject(projects[0].slug)?.slug).toBe(projects[0].slug);
    expect(getProject('does-not-exist')).toBeUndefined();
  });

  it('getNeighbours wraps around at both ends', () => {
    const first = getNeighbours(projects[0].slug);
    expect(first.prev.slug).toBe(projects[projects.length - 1].slug);
    expect(first.next.slug).toBe(projects[1].slug);

    const last = getNeighbours(projects[projects.length - 1].slug);
    expect(last.next.slug).toBe(projects[0].slug);
  });
});
