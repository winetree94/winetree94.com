import type { SupportedLanguageCodes } from "@/lib/language";
import en from "./translations/en.json";
import ko from "./translations/ko.json";

export const TRANSLATIONS: {
  [key in SupportedLanguageCodes]: Record<string, string>;
} = {
  en: en,
  ko: ko,
} as const;
