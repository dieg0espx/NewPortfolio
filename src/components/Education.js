import React from 'react';

/** Education content preserved verbatim from the previous site. */
function Education() {
  return (
    <section id="education" className="section-shell py-section">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="text-caption uppercase tracking-[0.12px] text-black/40">
            From learning to leading
          </p>
          <h2 className="mt-4 text-[40px] font-semibold leading-[1.06] tracking-[-1.5px] text-ink sm:text-display-sm">
            Bridging theory &amp; practice
          </h2>
          <p className="mt-5 font-serif text-[18px] leading-[1.56] text-graphite">
            A foundation built on continuous learning, mastering technologies, and refining skills to
            turn knowledge into real-world impact.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="card-surface p-6 sm:p-8">
            <h3 className="text-heading-sm font-bold tracking-[-0.242px] text-ink">
              Web &amp; Mobile App Development
            </h3>
            <p className="mt-2 text-body text-graphite">
              Cornerstone International Community College of Canada
            </p>
            <p className="mt-1 text-body-sm text-notion">Vancouver, Canada</p>
            <p className="mt-3 text-body-sm text-black/60">Graduated 09/2021</p>
          </div>

          <div className="card-surface p-6 sm:p-8">
            <h3 className="text-heading-sm font-bold tracking-[-0.242px] text-ink">Online courses</h3>
            <p className="mt-2 text-body text-graphite">Udemy</p>
            <ul className="mt-3 flex flex-col gap-1">
              <li className="text-body-sm text-black/60">The Complete JavaScript Course</li>
              <li className="text-body-sm text-black/60">
                The Ultimate SEO Training + SEO for WordPress Websites
              </li>
              <li className="text-body-sm text-black/60">React — The Complete Guide</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
