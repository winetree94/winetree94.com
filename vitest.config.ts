import { playwright } from "@vitest/browser-playwright";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,js}"],
      exclude: ["src/**/*.test.ts", "src/**/*.test.tsx"],
      reporter: ["text", "html", "lcov"],
    },
    projects: [
      {
        plugins: [tsconfigPaths()],
        test: {
          name: "unit",
          environment: "node",
          setupFiles: ["./vitest.setup.ts"],
          include: ["src/**/*.test.ts"],
          exclude: ["src/components/react/**/*.test.tsx", "tests/**"],
        },
      },
      {
        plugins: [tsconfigPaths()],
        test: {
          name: "browser",
          setupFiles: ["./vitest.setup.ts"],
          include: ["src/components/react/**/*.test.tsx"],
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
