'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the sheet whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

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

  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-paper/80 shadow-nav backdrop-blur-xl' : 'bg-transparent'
      }`}
      style={{ borderBottom: scrolled ? '1px solid var(--hairline)' : '1px solid transparent' }}
    >
      <nav className="shell flex h-16 items-center justify-between" aria-label="Main">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-ink text-[13px] font-bold text-white">
            D
          </span>
          <span className="text-body font-semibold tracking-[-0.3px] text-ink">Diego Espinosa</span>
        </Link>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href} className="relative">
              <Link
                href={l.href}
                className={`relative rounded-buttons px-4 py-2 text-body-sm font-medium transition-colors duration-200 ${
                  isActive(l.href) ? 'text-ink' : 'text-ink/50 hover:text-ink'
                }`}
              >
                {l.label}
                {isActive(l.href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-buttons bg-ink/[0.055]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            className="btn-outline"
            href="https://github.com/dieg0espx"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <Link className="btn-primary" href="/contact">
            Start a project
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden"
        >
          <span
            className={`block h-[1.5px] w-5 bg-ink transition-transform duration-300 ${
              open ? 'translate-y-[3.25px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-[1.5px] w-5 bg-ink transition-transform duration-300 ${
              open ? '-translate-y-[3.25px] -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t bg-paper lg:hidden"
          >
            <ul className="shell flex flex-col py-3">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`block rounded-buttons px-2 py-3 text-subheading font-medium ${
                      isActive(l.href) ? 'text-ink' : 'text-ink/50'
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 flex gap-2 px-2 pb-2">
                <a
                  className="btn-outline flex-1"
                  href="https://github.com/dieg0espx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <Link className="btn-primary flex-1" href="/contact">
                  Start a project
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
