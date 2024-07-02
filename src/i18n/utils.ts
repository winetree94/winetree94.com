import { languages, defaultLang } from './ui';

export function getLangAbsolutePath(url: URL) {
    const [, lang] = url.pathname.split('/');
    if (lang in languages && lang !== defaultLang) {
        return '/' + lang as keyof typeof languages;
    }
    return '';
}
