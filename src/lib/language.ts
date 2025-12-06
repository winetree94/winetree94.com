export const SUPPORTED_LANGUAGES = {
  EN: "en",
  KO: "ko",
} as const;

export const SUPPORTED_LANGUAGE_CODES = Object.values(SUPPORTED_LANGUAGES);

export type SupportedLanguageCodes =
  (typeof SUPPORTED_LANGUAGES)[keyof typeof SUPPORTED_LANGUAGES];

export const LOCALE_INFO: {
  [key in SupportedLanguageCodes]: {
    nativeName: string;
    localeNames: {
      [key in SupportedLanguageCodes]: string;
    };
  };
} = {
  en: {
    nativeName: "English",
    localeNames: {
      en: "English",
      ko: "영어",
    },
  },
  ko: {
    nativeName: "한국어",
    localeNames: {
      en: "Korean",
      ko: "한국어",
    },
  },
};

export const defaultLangCode = SUPPORTED_LANGUAGES.EN as SupportedLanguageCodes;
