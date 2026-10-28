export const SUPPORTED_LANGUAGES = {
  EN: "en",
  KO: "ko",
  JA: "ja",
} as const;

export const SUPPORTED_LANGUAGE_CODES = Object.values(SUPPORTED_LANGUAGES);

export type SupportedLanguageCodes =
  (typeof SUPPORTED_LANGUAGES)[keyof typeof SUPPORTED_LANGUAGES];

export const LOCALE_INFO: Record<SupportedLanguageCodes, string> = {
  en: "English",
  ko: "한국어",
  ja: "日本語",
};

export const defaultLangCode = SUPPORTED_LANGUAGES.EN as SupportedLanguageCodes;
