import type { SupportedLanguageCodes } from "@/lib/language";

type LanguageHeadLink = {
  rel: string;
  href: string;
  as?: string;
  type?: string;
  crossorigin?: boolean;
};

export const LANGUAGE_HEAD_LINKS: Record<
  SupportedLanguageCodes,
  readonly LanguageHeadLink[]
> = {
  en: [
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
  ko: [
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
};
