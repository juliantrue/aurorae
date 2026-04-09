import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Sing Ex Nihilo | Gregorian Chant Trainer',
  description: 'A mobile-first Gregorian chant pitch trainer for new singers.',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return children;
}
