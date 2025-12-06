import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig, envField } from "astro/config";
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
    enabled: true,
  },
  build: {
    format: "directory",
  },
  i18n: {
    defaultLocale,
    locales: Object.keys(locales),
    routing: {
      redirectToDefaultLocale: true,
      prefixDefaultLocale: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      GHOST_API_KEY: envField.string({
        context: "server",
        access: "secret",
        optional: false,
      }),
    },
  },
  integrations: [
    // mdx({}),
    // markdoc({ }),
    sitemap({
      i18n: {
        locales: locales,
        defaultLocale: defaultLocale,
        redirectToDefaultLocale: true,
        prefixDefaultLocale: true,
      },
    }),
    react({
      include: ["./src/**/*.{jsx,tsx}"],
    }),
    pagefind(),
  ],
});
