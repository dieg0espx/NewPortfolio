'use client';

import { motion, useReducedMotion } from 'motion/react';

/**
 * Shared motion primitives.
 *
 * Every component here checks prefers-reduced-motion and degrades to a plain,
 * instantly-visible element rather than an animated one.
 */

const EASE = [0.16, 1, 0.3, 1];

/** Fade + rise as the element scrolls into view. Fires once. */
export function Reveal({ children, delay = 0, y = 16, className = '', as = 'div' }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (reduce) return <div className={className}>{children}</div>;

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
  if (reduce) return <div className={className}>{children}</div>;

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
  if (reduce) return <div className={className}>{children}</div>;

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
