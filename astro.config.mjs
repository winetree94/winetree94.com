import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { i18n, filterSitemapByDefaultLocale } from "astro-i18n-aut/integration";

const defaultLocale = "ko";
const locales = {
  en: 'en-US',
  ko: 'ko-KR',
};

export default defineConfig({
  site: 'https://winetree94.com',
  output: 'static',
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
        },
      }
    ),
    react({
      include: ["./src/**/*.{jsx,tsx}"],
    }),
    tailwind()
  ]
});