import { fileURLToPath } from "node:url";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

const resolveConfig = {
  alias: {
    "@": fileURLToPath(new URL("./src", import.meta.url)),
  },
  tsconfigPaths: true,
};

export default defineConfig({
  resolve: resolveConfig,
  test: {
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,js}"],
      exclude: ["src/**/*.test.ts"],
      reporter: ["text", "html", "lcov"],
    },
    projects: [
      {
        resolve: resolveConfig,
        test: {
          name: "unit",
          environment: "node",
          setupFiles: ["./vitest.setup.ts"],
          include: ["src/**/*.test.ts"],
          exclude: ["src/**/*.browser.test.ts", "tests/**"],
        },
      },
      {
        resolve: resolveConfig,
        test: {
          name: "browser",
          setupFiles: ["./vitest.setup.ts"],
          include: ["src/**/*.browser.test.ts"],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
