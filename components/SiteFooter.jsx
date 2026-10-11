import Link from 'next/link';

const YEAR = new Date().getFullYear();

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t">
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-buttons bg-ink text-[13px] font-bold text-white">
              D
            </span>
            <span className="text-body font-semibold tracking-[-0.3px]">Diego Espinosa</span>
          </div>
          <p className="mt-4 max-w-[38ch] text-body-sm text-graphite">
            Websites, dashboards and apps that businesses run on — built end to end.
          </p>
        </div>

        <div>
          <p className="eyebrow">Pages</p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {[
              ['/', 'Home'],
              ['/work', 'Work'],
              ['/about', 'About'],
              ['/contact', 'Contact'],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="text-body-sm text-ink/60 transition-colors hover:text-ink">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">Elsewhere</p>
          <ul className="mt-4 flex flex-col gap-2.5">
            <li>
              <a
                className="text-body-sm text-ink/60 transition-colors hover:text-ink"
                href="https://github.com/dieg0espx"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                className="text-body-sm text-ink/60 transition-colors hover:text-ink"
                href="https://www.linkedin.com/in/devDiegoE/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                className="text-body-sm text-ink/60 transition-colors hover:text-ink"
                href="mailto:espinosa9mx@gmail.com"
              >
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="shell flex flex-col gap-2 border-t py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-caption text-ink/40">© {YEAR} Diego Espinosa</p>
        <p className="text-caption text-ink/40">
          Project previews are captured screenshots, not live embeds.
        </p>
      </div>
    </footer>
  );
}
