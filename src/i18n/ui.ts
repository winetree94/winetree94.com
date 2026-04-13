import type { SupportedLanguageCodes } from "@/lib/language";

export interface LanguageHeadLink {
  rel: string;
  href: string;
  as?: string;
  type?: string;
  crossorigin?: boolean;
}

export const languageInfos = {
  en: {
    headLinks: [
      {
        rel: "preload",
        href: "/fonts/Agave-Regular.ttf",
        as: "font",
        type: "font/woff",
        crossorigin: true,
      },
      {
        rel: "preload",
        href: "/fonts/Agave-Bold.ttf",
        as: "font",
        type: "font/woff",
        crossorigin: true,
      },
    ],
  },
  ko: {
    headLinks: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: true,
      },
      {
        rel: "preload",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@100;200;300;400;500;600;700&display=block",
        as: "style",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@100;200;300;400;500;600;700&display=block",
      },
    ],
  },
} as const;

export function getLanguageHeadLinks(lang?: SupportedLanguageCodes) {
  return lang ? languageInfos[lang].headLinks : [];
}
