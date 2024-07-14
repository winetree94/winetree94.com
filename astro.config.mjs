import mdx from '@astrojs/mdx';
import react from "@astrojs/react";
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import { defineConfig } from 'astro/config';
import pagefind from './plugins/pagefind';

const defaultLocale = "en";
const locales = {
  en: 'en-US',
  ko: 'ko-KR',
};

export default defineConfig({
  site: 'https://winetree94.com',
  output: 'static',
  devToolbar: {
    enabled: false,
  },
  build: {
    format: "directory",
  },
  i18n: {
    defaultLocale,
    locales: Object.keys(locales),
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    mdx(),
    sitemap(
      {
        i18n: {
          locales: locales,
          defaultLocale: defaultLocale,
          prefixDefaultLocale: false,
        },
      }
    ),
    react({
      include: ["./src/**/*.{jsx,tsx}"],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    pagefind(),
  ]
});