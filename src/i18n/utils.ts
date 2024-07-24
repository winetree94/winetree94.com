import { LANG_CODE, defaultLangCode, languages, translations } from './ui';

export const getCurrentLangCode = (url: URL) => {
  const [, lang] = url.pathname.split('/');
  if (lang in languages && lang !== defaultLangCode) {
    return lang as keyof typeof languages;
  }
  return defaultLangCode;
};

export const useTranslation = (lang: keyof typeof languages) => (key: string) => {
  return translations[lang][key];
};

export function getLangBasePath(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in languages && lang !== defaultLangCode) {
    return `/${lang}` as keyof typeof languages;
  }
  return '';
}

export function getMultilangUrlInfo(url: URL) {
  const [, lang, ...rest] = url.pathname.split('/');

  const results = Object.values(LANG_CODE)
    .filter((lang) => lang !== defaultLangCode)
    .map((lang) => ({
      code: lang,
      url: `${url.protocol}//${url.host}/${lang}/${rest.join('/')}`,
    }));

  results.unshift({ code: defaultLangCode, url: `${url.protocol}//${url.host}/${rest.join('/')}` });

  return results;
}
