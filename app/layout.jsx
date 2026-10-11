import localFont from 'next/font/local';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import SmoothScroll from '@/components/SmoothScroll';

const inter = localFont({
  src: [
    { path: './fonts/inter-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/inter-500.woff2', weight: '500', style: 'normal' },
    { path: './fonts/inter-600.woff2', weight: '600', style: 'normal' },
    { path: './fonts/inter-700.woff2', weight: '700', style: 'normal' },
    { path: './fonts/inter-800.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-inter',
  display: 'swap',
});

const sourceSerif = localFont({
  src: [
    { path: './fonts/source-serif-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/source-serif-600.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-source-serif',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://example.invalid'),
  title: {
    default: 'Diego Espinosa — Developer',
    template: '%s · Diego Espinosa',
  },
  description:
    'Developer building websites, dashboards and apps that businesses run on: quote-to-invoice platforms, booking systems, CMS-backed marketing sites and internal mobile tools.',
  openGraph: {
    title: 'Diego Espinosa — Developer',
    description: 'Websites, dashboards and apps that businesses run on.',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#f6f5f4',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-buttons focus:bg-ink focus:px-4 focus:py-2 focus:text-body-sm focus:text-white"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
