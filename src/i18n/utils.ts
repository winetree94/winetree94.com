import { type SupportedLanguageCodes } from "@/lib/language";
import { TRANSLATIONS } from ".";

export const useTranslation = (lang: SupportedLanguageCodes) => {
  return (key: string) => {
    return TRANSLATIONS[lang][key];
  };
};
