'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Momentum scrolling via Lenis. A large part of why a site feels "expensive".
 *
 * Disabled entirely when the user prefers reduced motion, and torn down on
 * route change so each page starts at the top with native behaviour intact.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let lenis;
    let frame;
    let cancelled = false;

    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        // Never hijack touch scrolling — native momentum is better on phones.
        smoothTouch: false,
      });

      const raf = (time) => {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      if (frame) cancelAnimationFrame(frame);
      if (lenis) lenis.destroy();
    };
  }, [pathname]);

  return null;
}
