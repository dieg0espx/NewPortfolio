import React from 'react';
import CharacterMark, { Sparkle, Squiggle } from './CharacterMark';

const MARK_COLORS = ['#097fe8', '#f64932', '#ffb110', '#62aef0', '#097fe8', '#f64932', '#ffb110'];

/**
 * Centered hero stack: character-mark row → headline with an embedded highlight
 * pill → editorial subhead → two-button CTA row → featured product mockup.
 *
 * The headline and eyebrow are carried over verbatim from the previous site.
 */
function Hero({ projectCount, children }) {
  return (
    <section id="top" className="section-shell pb-16 pt-14 text-center sm:pt-20">
      {/* Decorative mark row */}
      <div className="mb-8 flex items-center justify-center gap-2 sm:gap-3">
        {MARK_COLORS.map((c, i) => (
          <CharacterMark key={i} color={c} index={i} size={i === 3 ? 56 : 44} delay={i * 70} />
        ))}
      </div>

      <p className="mb-5 text-caption font-medium uppercase tracking-[0.12px] text-black/40">
        More than a programmer
      </p>

      <h1 className="mx-auto max-w-[18ch] text-[40px] font-medium leading-[1.08] tracking-[-1.4px] text-ink sm:text-display-sm md:text-[72px] md:leading-[1.08] md:tracking-[-2.016px]">
        Your vision, my{' '}
        <span className="pill-highlight bg-[#f6d5b8]">code</span>, our success
      </h1>

      <p className="mx-auto mt-7 max-w-[62ch] font-serif text-[18px] leading-[1.56] text-graphite">
        I build websites, dashboards and apps that businesses actually run on — from quote-to-invoice
        platforms and booking systems to CMS-backed marketing sites and internal mobile tools.
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <a className="btn-primary" href="#work">
          See {projectCount} projects
        </a>
        <a className="btn-ghost" href="#contact">
          Get in touch
        </a>
      </div>

      {/* Decorative punctuation around the mockup */}
      <div className="relative mt-14">
        <Sparkle className="absolute -left-1 -top-6 hidden sm:block" color="#ffb110" />
        <Squiggle className="absolute -right-2 -top-7 hidden sm:block" color="#f64932" />
        {children}
      </div>
    </section>
  );
}

export default Hero;
