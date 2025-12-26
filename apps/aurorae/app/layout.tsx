import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aurorae',
  description: 'Next.js entry point for the Aurorae workspace.',
  metadataBase: new URL('https://aurorae.local'),
  openGraph: {
    title: 'Aurorae Next.js App',
    description: 'An exploratory surface powered by @aurorae/core.',
    url: 'https://aurorae.local',
    siteName: 'Aurorae',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${playfair.variable} bg-parchment text-ink antialiased`}>
        <div className="flex min-h-screen flex-col items-center gap-6 px-4 py-6 sm:px-8 lg:px-12">
          <main className="flex w-full flex-1 justify-center">{children}</main>
        </div>
      </body>
    </html>
  );
}
