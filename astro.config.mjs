import markdoc from "@astrojs/markdoc";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import pagefind from "./plugins/pagefind";
import tailwindcss from "@tailwindcss/vite";

const defaultLocale = "en";
const locales = {
  en: "en-US",
  ko: "ko-KR",
};

// https://astro.build/config
export default defineConfig({
  site: "https://winetree94.com",
  output: "static",
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
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    mdx({}),
    markdoc({

    }),
    sitemap({
      i18n: {
        locales: locales,
        defaultLocale: defaultLocale,
        prefixDefaultLocale: false,
      },
    }),
    react({
      include: ["./src/**/*.{jsx,tsx}"],
    }),
    pagefind(),
  ],
});
