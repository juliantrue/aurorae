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
      <body className={`${inter.className} ${playfair.variable}`} data-theme="light">
        <div className="aurorae-shell">
          <header className="aurorae-header">
            <div className="aurorae-header-top">
              <div className="aurorae-brand">
                <span className="aurorae-mark" aria-hidden>
                  ✷
                </span>
                <div>
                  <p className="aurorae-title">Aurorae</p>
                  <p className="aurorae-kicker">workspace preview</p>
                </div>
              </div>
              <ThemeToggle />
            </div>
            <p className="aurorae-subtitle">Shared tooling, fresh surface.</p>
          </header>
          <main className="aurorae-main">{children}</main>
          <footer className="aurorae-footer">
            <small>Built with Next.js and the shared Aurorae core primitives.</small>
          </footer>
        </div>
      </body>
    </html>
  );
}
