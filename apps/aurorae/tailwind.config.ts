import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        parchment: 'var(--parchment)',
        ivory: 'var(--ivory)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        oxblood: 'var(--oxblood)',
        'oxblood-soft': 'var(--oxblood-soft)',
        gold: 'var(--gold)',
        border: 'var(--border)'
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        pressed: 'var(--shadow-pressed)'
      },
      borderRadius: {
        card: 'var(--radius)'
      },
      maxWidth: {
        aurorae: 'var(--max-width)'
      },
      fontFamily: {
        display: ['var(--font-display)', 'Playfair Display', 'serif']
      }
    }
  },
  plugins: []
};

export default config;
