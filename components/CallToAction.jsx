import Link from 'next/link';
import { Reveal } from './Motion';

export default function CallToAction({
  eyebrow = 'Next step',
  title = 'Have something you want built?',
  body = 'Happy to talk through a site, a platform, or the system behind them.',
}) {
  return (
    <section className="shell pb-6">
      <Reveal>
        <div className="rounded-cards bg-midnight px-6 py-16 text-center sm:px-12 sm:py-24">
          <p className="text-caption font-medium uppercase tracking-[0.12px] text-white/45">
            {eyebrow}
          </p>
          <h2 className="mx-auto mt-5 max-w-[18ch] text-heading font-semibold text-white sm:text-display-sm">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-[50ch] font-serif text-body-lg text-white/65">{body}</p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link className="btn-primary" href="/contact">
              Start a project
              <span aria-hidden="true">→</span>
            </Link>
            <a
              className="inline-flex items-center justify-center rounded-buttons bg-white/10 px-4 py-[9px] text-body-sm font-medium text-white transition-colors duration-200 hover:bg-white/20"
              href="mailto:espinosa9mx@gmail.com"
            >
              espinosa9mx@gmail.com
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
