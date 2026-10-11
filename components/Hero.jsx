'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { SplitHeadline } from './Motion';
import ProjectFrame from './ProjectFrame';

const EASE = [0.16, 1, 0.3, 1];

export default function Hero({ lead, projectCount }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  // A short frame on phones; a tall one where there is room for it.
  const [heroFrameHeight, setHeroFrameHeight] = useState(560);

  useEffect(() => {
    const apply = () => setHeroFrameHeight(window.innerWidth < 640 ? 400 : 560);
    apply();
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
  }, []);

  // Parallax: the mockup settles as the hero scrolls away.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, reduce ? 1 : 0.4]);

  return (
    <section ref={ref} className="shell relative pb-20 pt-16 sm:pt-24">
      <div className="mx-auto max-w-[23ch] text-center sm:max-w-none">
        <motion.p
          className="eyebrow"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          Full-stack developer · San Diego
        </motion.p>
      </div>

      <SplitHeadline
        text="Your vision, my code, our success"
        highlight="code"
        highlightClass="pill bg-peach"
        className="mx-auto mt-6 max-w-[13ch] text-center text-[42px] font-semibold leading-[1.06] tracking-[-1.6px] text-ink sm:max-w-[16ch] sm:text-[66px] sm:leading-[1.04] sm:tracking-[-2.4px] lg:text-[84px] lg:tracking-[-3.4px]"
      />

      <motion.p
        className="mx-auto mt-7 max-w-[34ch] text-center font-serif text-[16px] leading-[1.6] text-graphite sm:mt-8 sm:max-w-[58ch] sm:text-body-lg sm:leading-[1.56]"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
      >
        I build the websites businesses are judged on and the systems they actually run on —
        quote-to-invoice platforms, booking and payment flows, role-based portals, and the native
        apps their teams carry into the field.
      </motion.p>

      <motion.div
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.58, ease: EASE }}
      >
        <Link className="btn-primary" href="/work">
          View {projectCount} projects
          <span aria-hidden="true">→</span>
        </Link>
        <Link className="btn-outline" href="/contact">
          Start a project
        </Link>
      </motion.div>

      {lead?.preview?.desktop && (
        // Two layers on purpose: scroll-linked MotionValues in `style` would
        // override an `animate` on the same properties, silently killing the
        // entrance. The outer element owns the parallax, the inner the entrance.
        <motion.div
          className="mx-auto mt-16 max-w-[1040px]"
          style={reduce ? undefined : { y, scale, opacity }}
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 36 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
          >
            <ProjectFrame
              src={`/projects/${lead.preview.desktop}`}
              alt={`Captured screenshot of the ${lead.name} website`}
              name={lead.name}
              accent="#0075de"
              priority
              height={heroFrameHeight}
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
