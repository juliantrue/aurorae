'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'aurorae-theme';

function getPreferredTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light';
  }
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const preferred = getPreferredTheme();
    setTheme(preferred);
    document.body.dataset.theme = preferred;
    setReady(true);
  }, []);

  const toggleTheme = () => {
    if (!ready) return;
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.body.dataset.theme = next;
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  const label = theme === 'dark' ? 'Midnight mode' : 'Parchment mode';

  return (
    <button
      type="button"
      className="inline-flex transform items-center gap-2 rounded-full border border-border bg-ivory px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-ink transition duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      onClick={toggleTheme}
      aria-pressed={theme === 'dark'}
      disabled={!ready}
    >
      <span
        className={`flex h-5 w-11 items-center rounded-full border border-border px-0.5 transition-colors ${
          theme === 'dark' ? 'bg-white/15' : 'bg-black/10'
        }`}
        aria-hidden
      >
        <span
          className={`h-4 w-4 rounded-full transition-transform duration-300 ${
            theme === 'dark' ? 'translate-x-5 bg-gold' : 'translate-x-0 bg-oxblood'
          }`}
        />
      </span>
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}
