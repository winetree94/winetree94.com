import type { SupportedLanguageCodes } from "@/lib/language";
import { TRANSLATIONS } from ".";

export const getTranslation = (lang: SupportedLanguageCodes) => {
  return (key: string) => {
    return TRANSLATIONS[lang][key];
  };
};
