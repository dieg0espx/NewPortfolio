import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="shell flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-5 max-w-[16ch] text-heading font-semibold text-ink sm:text-display-sm">
        That page doesn&rsquo;t exist
      </h1>
      <p className="mt-5 max-w-[44ch] font-serif text-body-lg text-graphite">
        The link may be out of date, or the page may have moved.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link className="btn-primary" href="/">Back home</Link>
        <Link className="btn-outline" href="/work">See the work</Link>
      </div>
    </section>
  );
}
