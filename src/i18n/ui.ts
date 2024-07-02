import ko from './translations/ko.json';
import en from './translations/en.json';

export const languages = {
  en: {
    name: 'English',
    path: '',
  },
  ko: {
    name: '한국어',
    path: '/ko',
  },
} as const;

export const defaultLangCode: keyof typeof languages = 'en';

export const translations: {
  [key in keyof typeof languages]: Record<string, string>;
} = {
  en: en,
  ko: ko,
} as const;
