import { useState } from "react";

const THEME_KEY = 'theme-preference';

const THEME = {
  AUTO: 'auto',
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type SupportedTheme = typeof THEME[keyof typeof THEME];

function getThemePreference() {
  return localStorage.getItem(THEME_KEY) as SupportedTheme | undefined
    || THEME.AUTO;
}

function setThemePreference(theme: SupportedTheme) {
  localStorage.setItem(THEME_KEY, theme);
}

function applyTheme(theme: SupportedTheme) {
  const html = document.documentElement;

  if (theme === THEME.AUTO) {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    html.setAttribute("data-theme", prefersDark ? "black" : "light");
  } else if (theme === THEME.LIGHT) {
    html.setAttribute("data-theme", "light");
  } else if (theme === THEME.DARK) {
    html.setAttribute("data-theme", "black");
  }
}

export const ThemeSwitcher = ({ labels }: {
  labels: {
    theme: string;
    auto: string;
    light: string;
    dark: string;
  };
}) => {
  const [theme, setTheme] = useState(getThemePreference());

  const updateTheme = (theme: 'auto' | 'light' | 'dark') => {
    setTheme(theme);
    setThemePreference(theme);
    applyTheme(theme);
  }

  return (
    <div className="dropdown dropdown-top">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost w-full font-medium justify-start"
      >
        <i className="ri-contrast-2-line"></i>
        <span id="theme-label">{labels.theme}</span>
      </div>
      <ul
        tabIndex={-1}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
      >
        <li>
          <button
            className={[
              'justify-start',
              theme === 'auto' ? 'font-bold' : ''
            ].join(' ')}
            onClick={() => updateTheme('auto')}
          >
            <i className="ri-computer-line"></i>
            {labels.auto}
          </button>
        </li>
        <li>
          <button
            className={[
              'justify-start',
              theme === 'light' ? 'font-bold' : ''
            ].join(' ')}
            onClick={() => updateTheme('light')}
          >
            <i className="ri-sun-line"></i>
            {labels.light}
          </button>
        </li>
        <li>
          <button
            className={[
              'justify-start',
              theme === 'dark' ? 'font-bold' : ''
            ].join(' ')}
            onClick={() => updateTheme('dark')}
          >
            <i className="ri-moon-line"></i>
            {labels.dark}
          </button>
        </li>
      </ul>
    </div>
  );
};
