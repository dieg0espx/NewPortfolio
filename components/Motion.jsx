'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

/** Content must never be left invisible because an animation did not run. */
const SAFETY_MS = 2500;

/**
 * Drives a scroll reveal that is guaranteed to end visible.
 *
 * Returns `[ref, state]` where state is:
 *   'static'  — render plain markup (SSR, reduced motion, or no observer)
 *   'hidden'  — mounted, waiting to enter the viewport
 *   'shown'   — reveal it
 *
 * Two safeguards: the server-rendered markup is always plain and opaque, so a
 * failed or still-loading bundle shows content rather than a blank section; and
 * once armed, a timer forces 'shown' if the element has not entered the viewport
 * within SAFETY_MS. That covers the cases a plain `whileInView` strands —
 * printing, screenshot and preview bots, and any context that never scrolls.
 */
function useReveal() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [state, setState] = useState('static');

  useEffect(() => {
    if (reduce || typeof IntersectionObserver !== 'function') return undefined;

    const el = ref.current;
    if (!el) return undefined;

    setState('hidden');

    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      setState('shown');
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) show();
      },
      { rootMargin: '0px 0px -80px 0px' }
    );
    observer.observe(el);

    const timer = setTimeout(show, SAFETY_MS);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [reduce]);

  return [ref, state];
}

/**
 * Shared motion primitives.
 *
 * Every component here checks prefers-reduced-motion and degrades to a plain,
 * instantly-visible element rather than an animated one.
 */

const EASE = [0.16, 1, 0.3, 1];

/**
 * Fade + rise as the element scrolls into view. Fires once, and is guaranteed
 * to end visible even if the viewport event never arrives (see useReveal).
 */
export function Reveal({ children, delay = 0, y = 16, className = '' }) {
  const [ref, state] = useReveal();

  if (state === 'static') return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={state === 'shown' ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Staggers direct children once in view. Pair with <Child>. */
export function Stagger({ children, className = '', delay = 0, gap = 0.06 }) {
  const [ref, state] = useReveal();

  if (state === 'static') return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={state === 'shown' ? 'show' : 'hidden'}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * A staggered child. Reads its variant from the parent <Stagger>, so it must
 * render plain whenever the parent does — otherwise it would stay hidden with
 * no parent to animate it in.
 */
export function Child({ children, className = '', y = 14 }) {
  const reduce = useReducedMotion();
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!reduce && typeof IntersectionObserver === 'function') setArmed(true);
  }, [reduce]);

  if (!armed) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Word-by-word headline reveal — used once, in the hero.
 *
 * `highlight` matches the word ignoring surrounding punctuation, so "code" still
 * matches the word "code," and only the word itself gets the pill — the trailing
 * comma stays outside it.
 */
export function SplitHeadline({ text, className = '', highlight, highlightClass = '' }) {
  const reduce = useReducedMotion();
  const words = text.split(' ');

  // Splits "code," into ["code", ","] so the pill wraps the word, not the comma.
  const parts = (w) => {
    const m = w.match(/^([\p{L}\p{N}'’-]+)(.*)$/u);
    return m ? { core: m[1], tail: m[2] } : { core: w, tail: '' };
  };
  const isHit = (w) => Boolean(highlight) && parts(w).core.toLowerCase() === highlight.toLowerCase();

  const renderWord = (w) => {
    if (!isHit(w)) return w;
    const { core, tail } = parts(w);
    return (
      <>
        <span className={highlightClass}>{core}</span>
        {tail}
      </>
    );
  };

  if (reduce) {
    return (
      <h1 className={className}>
        {words.map((w, i) => (
          <span key={i}>{renderWord(w)} </span>
        ))}
      </h1>
    );
  }

  return (
    <motion.h1
      className={className}
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } } }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '105%', opacity: 0 },
              show: { y: '0%', opacity: 1, transition: { duration: 0.75, ease: EASE } },
            }}
          >
            {renderWord(w)}
            {' '}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

export { motion, useReducedMotion };
