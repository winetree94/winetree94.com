import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { i18n, filterSitemapByDefaultLocale } from "astro-i18n-aut/integration";

const defaultLocale = "en";
const locales = ['en', 'ko'];

export default defineConfig({
  site: 'https://winetree94.com',
  output: 'static',
  build: {
    format: "directory",
  },
  i18n: {
    defaultLocale,
    locales,
    routing: {
      prefixDefaultLocale: true,
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
    react(),
    tailwind()
  ]
});