import type { Config } from "prettier";

const config: Config = {
  printWidth: 80,
  useTabs: false,
  tabWidth: 2,
  trailingComma: "all",
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: ["**/*.astro"],
      options: {
        parser: "astro",
      },
    },
  ],
};

export default config;
