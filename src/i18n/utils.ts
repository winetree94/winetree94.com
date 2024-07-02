import { languages, defaultLangCode, translations } from './ui';

export const getCurrentLangCode = (url: URL) => {
    const [, lang] = url.pathname.split('/');
    if (lang in languages && lang !== defaultLangCode) {
        return lang as keyof typeof languages;
    }
    return defaultLangCode;
}

export const useTranslation = (lang: keyof typeof languages) => (key: string) => {
    return translations[lang][key];
};

export function getLangBasePath(url: URL) {
    const [, lang] = url.pathname.split('/');
    if (lang in languages && lang !== defaultLangCode) {
        return '/' + lang as keyof typeof languages;
    }
    return '';
}
