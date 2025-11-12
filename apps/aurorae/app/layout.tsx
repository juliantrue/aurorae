import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ThemeToggle } from './components/theme-toggle';

const inter = Inter({ subsets: ['latin'], display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-display', display: 'swap' });

export const metadata: Metadata = {
  title: 'Aurorae',
  description: 'Next.js entry point for the Aurorae workspace.',
  metadataBase: new URL('https://aurorae.local'),
  openGraph: {
    title: 'Aurorae Next.js App',
    description: 'An exploratory surface powered by @aurorae/core.',
    url: 'https://aurorae.local',
    siteName: 'Aurorae'
  },
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${playfair.variable} bg-parchment text-ink antialiased`} data-theme="light">
        <div className="flex min-h-screen flex-col items-center gap-6 px-4 py-6 sm:px-8 lg:px-12">
          <header className="w-full max-w-aurorae rounded-card border border-border bg-ivory p-6 text-center shadow-soft sm:p-8">
            <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl text-oxblood" aria-hidden>
                  ✷
                </span>
                <div className="text-center sm:text-left">
                  <p className="m-0 text-sm font-semibold uppercase tracking-[0.12em]">Aurorae</p>
                  <p className="m-0 text-[0.65rem] uppercase tracking-[0.28em] text-muted">workspace preview</p>
                </div>
              </div>
              <ThemeToggle />
            </div>
            <p className="mt-1 text-muted italic">Shared tooling, fresh surface.</p>
          </header>
          <main className="flex w-full flex-1 justify-center">{children}</main>
          <footer className="w-full max-w-aurorae rounded-card border border-border bg-ivory p-5 text-center text-sm text-muted shadow-soft">
            <small className="tracking-[0.08em]">Built with Next.js and the shared Aurorae core primitives.</small>
          </footer>
        </div>
      </body>
    </html>
  );
}
