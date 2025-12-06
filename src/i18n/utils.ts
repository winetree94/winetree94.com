import {
  defaultLangCode,
  SUPPORTED_LANGUAGE_CODES,
  SUPPORTED_LANGUAGES,
  type SupportedLanguageCodes,
} from "@/lib/language";
import { languageInfos, translations } from "./ui";

export const getCurrentLangCode = (url: URL) => {
  const [, lang] = url.pathname.split("/");
  if (lang in SUPPORTED_LANGUAGE_CODES) {
    return lang as SupportedLanguageCodes;
  }
  return defaultLangCode;
};

export const useTranslation = (lang: keyof typeof languageInfos) => {
  return (key: string) => {
    return translations[lang][key];
  };
};

export function getLangBasePath(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in SUPPORTED_LANGUAGE_CODES) {
    return `/${lang}` as SupportedLanguageCodes;
  }
  return "";
}

export function getMultilangUrlInfo(url: URL) {
  const [, lang, ...rest] = url.pathname.split("/");

  const results = Object.values(SUPPORTED_LANGUAGES)
    .filter((lang) => lang !== defaultLangCode)
    .map((lang) => ({
      code: lang,
      url: `${url.protocol}//${url.host}/${lang}/${rest.join("/")}`,
    }));

  results.unshift({
    code: defaultLangCode,
    url: `${url.protocol}//${url.host}/${rest.join("/")}`,
  });

  return results;
}
