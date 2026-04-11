import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

const defaultLocale = "en";
const locales = {
  en: "en-US",
  ko: "ko-KR",
};

// https://astro.build/config
export default defineConfig({
  site: "https://winetree94.com",
  i18n: {
    defaultLocale,
    locales: Object.keys(locales),
    routing: {
      redirectToDefaultLocale: false,
      prefixDefaultLocale: true,
    },
  },
  server: {
    host: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    // mdx({}),
    // markdoc({ }),
    sitemap({
      i18n: {
        locales: locales,
        defaultLocale: defaultLocale,
      },
    }),
    react({
      include: ["./src/**/*.{jsx,tsx}"],
    }),
  ],
});
