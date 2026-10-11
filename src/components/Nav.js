import React, { useEffect, useState } from 'react';

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'approach', label: 'Approach' },
  { id: 'stack', label: 'Stack' },
  { id: 'education', label: 'Education' },
];

/** Sticky 64px bar — the one place besides product mockups where a shadow is allowed. */
function Nav() {
  const [open, setOpen] = useState(false);

  // Lock background scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-paper/85 shadow-nav backdrop-blur-md">
      <nav className="section-shell flex h-16 items-center justify-between" aria-label="Main">
        <a href="#top" className="text-heading-sm font-semibold tracking-[-0.242px] text-ink">
          Diego Espinosa
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className="rounded-buttons px-4 py-3 text-body-sm font-medium text-black/[0.54] transition-colors duration-200 ease-out hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <a className="btn-ghost" href="https://github.com/dieg0espx" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a className="btn-primary" href="#contact">
            Get in touch
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="rounded-buttons px-3 py-2 text-body-sm font-medium text-ink lg:hidden"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>

      {open && (
        <div id="mobile-nav" className="border-t border-hairline bg-paper lg:hidden">
          <ul className="section-shell flex flex-col py-2">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-buttons px-2 py-3 text-body font-medium text-black/[0.54] hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="flex gap-2 px-2 py-3">
              <a className="btn-ghost flex-1" href="https://github.com/dieg0espx" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a className="btn-primary flex-1" href="#contact" onClick={() => setOpen(false)}>
                Get in touch
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Nav;
