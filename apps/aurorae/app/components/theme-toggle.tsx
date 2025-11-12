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
      className="theme-toggle"
      onClick={toggleTheme}
      aria-pressed={theme === 'dark'}
      disabled={!ready}
    >
      <span className="theme-toggle-track" aria-hidden>
        <span className="theme-toggle-thumb" data-theme={theme} />
      </span>
      <span className="theme-toggle-label">{label}</span>
    </button>
  );
}
