import { render, screen, within } from '@testing-library/react';
import App from './App';
import projects from './data/projects';

test('renders the hero headline and identity', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    /your vision, my code, our success/i
  );
  expect(screen.getAllByText(/diego espinosa/i).length).toBeGreaterThan(0);
});

test('renders every featured project', () => {
  render(<App />);
  const work = document.querySelector('#work');
  projects.forEach((p) => {
    expect(within(work).getByRole('heading', { name: p.name })).toBeInTheDocument();
  });
});

test('project previews are labelled as captured screenshots, not live embeds', () => {
  render(<App />);
  const shots = screen.getAllByRole('img', { name: /captured screenshot/i });
  expect(shots.length).toBeGreaterThan(0);
  // No iframe should ever be used to embed an original project.
  expect(document.querySelectorAll('iframe')).toHaveLength(0);
});

test('projects without a capture state the limitation instead of faking one', () => {
  render(<App />);
  projects
    .filter((p) => !p.preview.desktop)
    .forEach((p) => {
      expect(p.preview.note).toEqual(expect.any(String));
      expect(p.preview.note.length).toBeGreaterThan(10);
    });
});

test('no project asserts an unverified live link', () => {
  projects.forEach((p) => {
    expect(p.links).toBeUndefined();
  });
});
