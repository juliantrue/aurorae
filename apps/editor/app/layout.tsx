import type { Metadata } from 'next';
import { EB_Garamond, Inter } from 'next/font/google';
import './globals.css';

const garamond = EB_Garamond({ subsets: ['latin'], display: 'swap' });
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Aurorae Web',
  description: 'Next.js app consuming the shared @aurorae/core package.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${garamond.className} ${inter.variable}`}>
        <header className="site-header">
          <div className="container">
            <div className="brand">
              <span className="mark" aria-hidden>
                ✠
              </span>
              <span className="title">Aurorae</span>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
