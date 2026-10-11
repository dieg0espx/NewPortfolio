'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

/**
 * True only once scroll-reveal animation can actually complete.
 *
 * A reveal starts at opacity 0 and is cleared when the element scrolls into
 * view. If that never happens — JS fails, the bundle is still loading, or the
 * environment has no IntersectionObserver — the content would be stranded
 * invisible. Arming on mount AND on observer support means the server-rendered
 * markup is plain and visible, and motion only takes over when it is safe.
 */
function useArmed() {
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (typeof IntersectionObserver === 'function') setArmed(true);
  }, []);
  return armed;
}

/**
 * Shared motion primitives.
 *
 * Every component here checks prefers-reduced-motion and degrades to a plain,
 * instantly-visible element rather than an animated one.
 */

const EASE = [0.16, 1, 0.3, 1];

/**
 * Fade + rise as the element scrolls into view. Fires once.
 *
 * `initial` is applied only after mount, so the server-rendered HTML is fully
 * opaque. If JS fails, is still loading, or IntersectionObserver never fires,
 * the content stays visible rather than being stranded at opacity 0.
 */
export function Reveal({ children, delay = 0, y = 16, className = '', as = 'div' }) {
  const reduce = useReducedMotion();
  const armed = useArmed();
  const Tag = motion[as] ?? motion.div;

  if (reduce || !armed) return <div className={className}>{children}</div>;

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** Staggers direct children on view. Pair with <Child>. */
export function Stagger({ children, className = '', delay = 0, gap = 0.06 }) {
  const reduce = useReducedMotion();
  const armed = useArmed();
  if (reduce || !armed) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function Child({ children, className = '', y = 14 }) {
  const reduce = useReducedMotion();
  const armed = useArmed();
  // Must mirror Stagger: a motion child inside a plain parent never animates in.
  if (reduce || !armed) return <div className={className}>{children}</div>;

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
