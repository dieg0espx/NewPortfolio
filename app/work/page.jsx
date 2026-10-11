import WorkIndex from '@/components/WorkIndex';
import CallToAction from '@/components/CallToAction';
import projects from '@/content/projects';

export const metadata = {
  title: 'Work',
  description:
    'Selected development work: quote-to-invoice platforms, booking systems, dashboards, e-commerce storefronts, CMS-backed marketing sites and native mobile apps.',
};

export default function WorkPage() {
  return (
    <>
      <section className="shell pb-16 pt-16 sm:pt-20">
        <p className="eyebrow">Work</p>
        <h1 className="mt-5 max-w-[16ch] text-[44px] font-semibold leading-[1.03] tracking-[-1.9px] text-ink sm:text-display">
          Selected work
        </h1>
        <p className="mt-7 max-w-[62ch] font-serif text-body-lg text-graphite">
          {projects.length} projects drawn from a larger body of work. Every description and
          technology list is taken from the project&rsquo;s own source — nothing here is inferred
          from a folder name.
        </p>

        <WorkIndex />
      </section>

      <CallToAction
        eyebrow="Working together"
        title="Want something like these?"
        body="Tell me what you are trying to build and I will tell you how I would approach it."
      />
    </>
  );
}
