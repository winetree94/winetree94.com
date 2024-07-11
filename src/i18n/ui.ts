import en from './translations/en.json';
import ko from './translations/ko.json';

export const LANG_CODE = {
  EN: 'en',
  KO: 'ko',
} as const;

export const languages = {
  en: {
    name: 'English',
    path: '',
    header: `
<link rel="preload" href="/fonts/Agave-Regular.ttf" as="font" type="font/woff" crossorigin>
<link rel="preload" href="/fonts/Agave-Bold.ttf" as="font" type="font/woff" crossorigin>
<style>
@font-face {
  font-family: "Agave";
  src: url("/fonts/Agave-Regular.ttf") format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: block;
}

@font-face {
  font-family: "Agave";
  src: url("/fonts/Agave-Bold.ttf") format("woff");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

body {
  font-family: "Agave", sans-serif;
}
</style>
    `,
  },
  ko: {
    name: '한국어',
    path: '/ko',
    header: `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@100;200;300;400;500;600;700&display=block" as="style">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@100;200;300;400;500;600;700&display=block" rel="stylesheet">
<style>
body {
  font-family: "IBM Plex Sans KR", "Gowun Dodum", sans-serif;
}
</style>
    `,
  },
} as const;

export const defaultLangCode: keyof typeof languages = 'en';

export const translations: {
  [key in keyof typeof languages]: Record<string, string>;
} = {
  en: en,
  ko: ko,
} as const;
