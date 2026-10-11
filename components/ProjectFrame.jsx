'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

/**
 * A captured screenshot inside a browser or phone frame, presented as a
 * scrollable preview.
 *
 * Honesty constraints: the image is a still capture, never a live embed. The
 * caption and alt text both say so, and the chrome shows the project name
 * rather than a clickable address so nothing implies a live site.
 *
 * Interaction: pans on hover (pointer), by swipe/native scroll (touch), and by
 * keyboard when focused. Auto-pan is disabled under prefers-reduced-motion.
 */
export default function ProjectFrame({
  src,
  alt,
  name,
  variant = 'browser',
  accent = '#62aef0',
  priority = false,
  height,
}) {
  const scrollRef = useRef(null);
  const rafRef = useRef(null);
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [coarse, setCoarse] = useState(false);
  const reduce = useReducedMotion();

  // A cached image can finish loading before hydration, so onLoad never fires.
  // Check completeness once on mount as well.
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) setLoaded(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)');
    const apply = () => setCoarse(mq.matches);
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

  const drive = useCallback(
    (direction) => {
      const el = scrollRef.current;
      if (!el || reduce || coarse) return;
      stop();
      const step = () => {
        const max = el.scrollHeight - el.clientHeight;
        if (max <= 0) return;
        const target = direction === 'down' ? max : 0;
        const delta = (target - el.scrollTop) * 0.014;
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
    [reduce, coarse, stop]
  );

  useEffect(() => stop, [stop]);

  const isPhone = variant === 'phone';

  const scroller = (
    <div
      ref={scrollRef}
      className="no-scrollbar h-full overflow-y-auto overscroll-contain bg-white"
      tabIndex={0}
      role="group"
      aria-label={`${name} — scrollable captured preview`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className="block w-full"
      />
    </div>
  );

  return (
    <figure className="m-0">
      <div
        onMouseEnter={() => drive('down')}
        onMouseLeave={() => drive('up')}
        className={
          isPhone
            ? 'mx-auto w-full max-w-[262px] rounded-[42px] bg-charcoal p-[9px] shadow-mockup'
            : 'overflow-hidden rounded-cards bg-white shadow-mockup'
        }
        style={isPhone ? undefined : { border: '1px solid var(--hairline)' }}
      >
        {isPhone ? (
          <div className="relative overflow-hidden rounded-[34px] bg-white">
            {/* Dynamic-island style indicator stands in for device chrome. */}
            <div className="absolute left-1/2 top-[9px] z-10 h-[22px] w-[74px] -translate-x-1/2 rounded-full bg-charcoal" />
            <div style={{ height: height || 500 }}>{scroller}</div>
          </div>
        ) : (
          <>
            <div
              className="flex items-center gap-2 px-3 py-2"
              style={{ borderBottom: '1px solid var(--hairline)', background: '#fbfbfa' }}
            >
              <span className="flex gap-[6px]" aria-hidden="true">
                <span className="h-[10px] w-[10px] rounded-full bg-[#f64932]" />
                <span className="h-[10px] w-[10px] rounded-full bg-[#ffb110]" />
                <span className="h-[10px] w-[10px] rounded-full bg-[#28c840]" />
              </span>
              <span className="mx-auto max-w-[70%] truncate rounded-full bg-ink/[0.05] px-3 py-[3px] text-caption text-ink/40">
                {name}
              </span>
            </div>
            <div style={{ height: height || undefined }} className={height ? '' : 'aspect-[16/10]'}>
              {scroller}
            </div>
          </>
        )}
      </div>

      <figcaption className="mt-2.5 flex items-center justify-center gap-2 text-caption text-ink/40">
        <span
          className="inline-block h-[6px] w-[6px] rounded-full"
          style={{ backgroundColor: accent }}
          aria-hidden="true"
        />
        {loaded
          ? `Captured preview — ${coarse ? 'swipe' : 'hover'} to pan`
          : 'Loading preview…'}
      </figcaption>
    </figure>
  );
}
