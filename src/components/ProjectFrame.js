import React, { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Renders a captured screenshot inside a browser or phone frame so it reads as a
 * scrollable preview.
 *
 * Honesty constraints (see docs/redesign-2026/02-prd-and-design.md):
 * the image is a still capture, never a live embed, and the UI says so via the
 * "Captured preview" label and the alt text. The URL bar shows the project's own
 * name, not a clickable address, so nothing implies a live site.
 *
 * Interaction: the image scrolls inside the frame on hover (desktop) and by
 * touch/drag or native scroll (mobile). Auto-scroll is disabled when the user
 * prefers reduced motion.
 */
function ProjectFrame({ src, alt, name, variant = 'browser', accent = '#62aef0' }) {
  const scrollRef = useRef(null);
  const rafRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [coarsePointer, setCoarsePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // Touch devices have no hover, so the caption must not tell them to hover.
  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const apply = () => setCoarsePointer(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const stop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  // Ease the capture downward while hovered, then ease back when the pointer leaves.
  const drive = useCallback(
    (direction) => {
      const el = scrollRef.current;
      if (!el || reduceMotion) return;
      stop();
      const step = () => {
        const max = el.scrollHeight - el.clientHeight;
        if (max <= 0) return;
        const target = direction === 'down' ? max : 0;
        const delta = (target - el.scrollTop) * 0.015;
        if (Math.abs(delta) < 0.4) {
          el.scrollTop = target;
          rafRef.current = null;
          return;
        }
        el.scrollTop += delta;
        rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    },
    [reduceMotion, stop]
  );

  useEffect(() => stop, [stop]);

  const isPhone = variant === 'phone';

  return (
    <figure className="m-0">
      <div
        className={
          isPhone
            ? 'mx-auto w-full max-w-[280px] rounded-[36px] border-[10px] border-charcoal bg-charcoal shadow-mockup'
            : 'w-full overflow-hidden rounded-cards border border-hairline bg-white shadow-mockup'
        }
        onMouseEnter={() => drive('down')}
        onMouseLeave={() => drive('up')}
      >
        {isPhone ? (
          // Phone bezel: a notch stands in for device chrome.
          <div className="relative overflow-hidden rounded-[26px] bg-white">
            <div className="absolute left-1/2 top-0 z-10 h-[18px] w-[86px] -translate-x-1/2 rounded-b-[12px] bg-charcoal" />
            <div
              ref={scrollRef}
              className="no-scrollbar h-[460px] overflow-y-auto overscroll-contain"
              tabIndex={0}
              role="group"
              aria-label={`${name} — scrollable captured preview`}
            >
              <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                onLoad={() => setLoaded(true)}
                className="block w-full"
              />
            </div>
          </div>
        ) : (
          <>
            {/* Browser chrome: traffic lights + a non-interactive label bar. */}
            <div className="flex items-center gap-2 border-b border-hairline bg-[#fbfbfa] px-3 py-2">
              <span className="flex gap-[6px]" aria-hidden="true">
                <span className="h-[10px] w-[10px] rounded-full bg-[#f64932]" />
                <span className="h-[10px] w-[10px] rounded-full bg-[#ffb110]" />
                <span className="h-[10px] w-[10px] rounded-full bg-[#28c840]" />
              </span>
              <span className="mx-auto max-w-[70%] truncate rounded-full bg-black/[0.05] px-3 py-[3px] text-caption text-black/40">
                {name}
              </span>
            </div>
            <div
              ref={scrollRef}
              className="no-scrollbar aspect-[16/10] overflow-y-auto overscroll-contain bg-white"
              tabIndex={0}
              role="group"
              aria-label={`${name} — scrollable captured preview`}
            >
              <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                onLoad={() => setLoaded(true)}
                className="block w-full"
              />
            </div>
          </>
        )}
      </div>

      <figcaption className="mt-2 flex items-center justify-center gap-2 text-caption text-black/40">
        <span
          className="inline-block h-[6px] w-[6px] rounded-full"
          style={{ backgroundColor: accent }}
          aria-hidden="true"
        />
        {loaded
          ? `Captured preview — ${coarsePointer ? 'swipe' : 'hover or scroll'} to pan`
          : 'Loading preview…'}
      </figcaption>
    </figure>
  );
}

export default ProjectFrame;
