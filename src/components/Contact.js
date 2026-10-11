import React from 'react';
import CharacterMark from './CharacterMark';

/** Contact details carried over verbatim from the previous site. */
function Contact() {
  return (
    <footer id="contact" className="section-shell pb-20 pt-section">
      <div className="rounded-cards bg-midnight px-6 py-14 text-center sm:px-12 sm:py-20">
        <div className="mb-7 flex items-center justify-center gap-3">
          <CharacterMark color="#ffb110" index={1} size={48} />
          <CharacterMark color="#62aef0" index={3} size={48} delay={90} />
          <CharacterMark color="#f64932" index={0} size={48} delay={180} />
        </div>

        <h2 className="mx-auto max-w-[20ch] text-[36px] font-semibold leading-[1.08] tracking-[-1.2px] text-white sm:text-heading-lg sm:leading-[1.06]">
          Have something you want built?
        </h2>
        <p className="mx-auto mt-5 max-w-[52ch] font-serif text-[18px] leading-[1.56] text-white/70">
          Happy to talk through a site, a dashboard, or the system behind them.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a className="btn-primary" href="mailto:espinosa9mx@gmail.com">
            espinosa9mx@gmail.com
          </a>
          <a
            className="inline-flex items-center justify-center rounded-buttons bg-white/10 px-[15px] py-[6px] text-body-sm font-medium text-white transition-colors duration-200 ease-out hover:bg-white/20"
            href="https://www.linkedin.com/in/devDiegoE/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="inline-flex items-center justify-center rounded-buttons bg-white/10 px-[15px] py-[6px] text-body-sm font-medium text-white transition-colors duration-200 ease-out hover:bg-white/20"
            href="https://github.com/dieg0espx"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>

      <p className="mt-8 text-center text-caption text-black/40">
        © {new Date().getFullYear()} Diego Espinosa. Project previews are captured screenshots, not
        live embeds.
      </p>
    </footer>
  );
}

export default Contact;
