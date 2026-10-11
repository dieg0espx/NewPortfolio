import React from 'react';

/**
 * Decorative character marks and squiggles — visual punctuation only.
 * They never carry information or link anywhere, so they are hidden from
 * assistive technology (per the design rules' decorative-marks system).
 */

const FACES = [
  // Each face is a tiny flat illustration on a white fill.
  (c) => (
    <>
      <circle cx="24" cy="20" r="7" fill={c} />
      <path d="M11 37c2.6-6 7.4-9 13-9s10.4 3 13 9" fill={c} />
    </>
  ),
  (c) => (
    <>
      <circle cx="19" cy="21" r="2.4" fill={c} />
      <circle cx="29" cy="21" r="2.4" fill={c} />
      <path d="M18 29c2.2 2.6 4.1 3.8 6 3.8s3.8-1.2 6-3.8" stroke={c} strokeWidth="2.4" strokeLinecap="round" fill="none" />
    </>
  ),
  (c) => (
    <>
      <path d="M15 19h6M27 19h6" stroke={c} strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="24" cy="29" r="4.2" fill={c} />
    </>
  ),
  (c) => (
    <>
      <circle cx="24" cy="24" r="9" stroke={c} strokeWidth="2.6" fill="none" />
      <circle cx="24" cy="24" r="3" fill={c} />
    </>
  ),
];

export function CharacterMark({ color = '#097fe8', index = 0, size = 48, delay = 0 }) {
  const face = FACES[index % FACES.length];
  return (
    <span
      aria-hidden="true"
      className="inline-block animate-mark-pop"
      style={{ animationDelay: `${delay}ms` }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        className="rounded-full bg-white"
        style={{ border: `2px solid ${color}`, borderRadius: '9999px' }}
      >
        {face(color)}
      </svg>
    </span>
  );
}

export function Squiggle({ color = '#f64932', className = '' }) {
  return (
    <svg aria-hidden="true" className={className} width="56" height="16" viewBox="0 0 56 16" fill="none">
      <path
        d="M2 10c6-9 12 9 18 0s12 9 18 0 12 9 16 2"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Sparkle({ color = '#ffb110', className = '' }) {
  return (
    <svg aria-hidden="true" className={className} width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 1l2.4 6.6L20 10l-6.6 2.4L11 19l-2.4-6.6L2 10l6.6-2.4L11 1z" fill={color} />
    </svg>
  );
}

export default CharacterMark;
