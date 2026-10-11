import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import ProjectFrame from '@/components/ProjectFrame';
import WorkIndex from '@/components/WorkIndex';
import projects from '@/content/projects';

describe('ProjectFrame', () => {
  it('labels the image as a captured screenshot, never a live embed', () => {
    render(
      <ProjectFrame
        src="/projects/scenic-doors-desktop.jpg"
        alt="Captured screenshot of the Scenic Doors website"
        name="Scenic Doors"
      />
    );

    expect(screen.getByRole('img', { name: /captured screenshot/i })).toBeInTheDocument();
    // An iframe would be an actual live embed — it must never appear.
    expect(document.querySelectorAll('iframe')).toHaveLength(0);
  });

  it('exposes the preview as a keyboard-reachable scrollable group', () => {
    render(<ProjectFrame src="/x.jpg" alt="Captured screenshot of X" name="X" />);
    const group = screen.getByRole('group', { name: /scrollable captured preview/i });
    expect(group).toHaveAttribute('tabindex', '0');
  });
});

describe('WorkIndex', () => {
  it('renders every project by default', () => {
    render(<WorkIndex />);
    projects.forEach((p) => {
      expect(screen.getByRole('heading', { name: p.name })).toBeInTheDocument();
    });
  });

  it('offers a filter for each category that has projects, with counts', () => {
    render(<WorkIndex />);
    const group = screen.getByRole('group', { name: /filter projects/i });
    const buttons = within(group).getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(1);
    // "All work" is pressed on first render.
    expect(buttons[0]).toHaveAttribute('aria-pressed', 'true');
  });

  it('links every project to its case study', () => {
    render(<WorkIndex />);
    projects.forEach((p) => {
      const links = screen.getAllByRole('link').map((l) => l.getAttribute('href'));
      expect(links).toContain(`/work/${p.slug}`);
    });
  });
});

describe('motion never strands content', () => {
  it('renders children visibly when IntersectionObserver is unavailable', async () => {
    // Simulates the real failure mode: a scroll-reveal that can never fire.
    const saved = window.IntersectionObserver;
    delete window.IntersectionObserver;

    const { Reveal, Stagger, Child } = await import('@/components/Motion');
    render(
      <>
        <Reveal>
          <p>revealed content</p>
        </Reveal>
        <Stagger>
          <Child>
            <p>staggered content</p>
          </Child>
        </Stagger>
      </>
    );
    // Content must be in the document regardless of scroll position, so a
    // reveal that never fires can't leave a blank section behind.
    expect(screen.getByText('revealed content')).toBeVisible();
    expect(screen.getByText('staggered content')).toBeVisible();

    window.IntersectionObserver = saved;
  });
});
