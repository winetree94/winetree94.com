import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { i18n, filterSitemapByDefaultLocale } from "astro-i18n-aut/integration";

const defaultLocale = "en";
const locales = {
  en: "en-US", // the `defaultLocale` value must present in `locales` keys
  ko: "ko-KR",
};

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  integrations: [
    mdx(),
    i18n({
      locales,
      defaultLocale,
    }),
    sitemap(
      {
        i18n: {
          locales,
          defaultLocale,
        },
        filter: filterSitemapByDefaultLocale({ defaultLocale }),
      }
    ),
    react(),
    tailwind()
  ]
});