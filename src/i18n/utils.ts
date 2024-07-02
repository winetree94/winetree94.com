import { languages, defaultLangCode } from './ui';

export const getCurrentLangCode = (url: URL) => {
    const [, lang] = url.pathname.split('/');
    if (lang in languages && lang !== defaultLangCode) {
        return lang as keyof typeof languages;
    }
    return defaultLangCode;
}

export function getLangBasePath(url: URL) {
    const [, lang] = url.pathname.split('/');
    if (lang in languages && lang !== defaultLangCode) {
        return '/' + lang as keyof typeof languages;
    }
    return '';
}
