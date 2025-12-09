import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";
import { defineConfig } from "eslint/config";

export default defineConfig([
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
]);
