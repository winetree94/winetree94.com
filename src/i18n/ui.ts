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
<link rel="preload" href="/fonts/Agave-Regular.ttf" as="font" type="font/woff" crossorigin>
<link rel="preload" href="/fonts/Agave-Bold.ttf" as="font" type="font/woff" crossorigin>
<link rel="preload" href="/fonts/GowunDodum-Regular.ttf" as="font" type="font/woff" crossorigin>
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
  font-display: block;
}

@font-face {
  font-family: "Gowun Dodum";
  src: url("/fonts/GowunDodum-Regular.ttf") format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: block;
}

body {
  font-family: "Agave", "Gowun Dodum", sans-serif;
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
