import tsconfigPaths from "vite-tsconfig-paths";
import { playwright } from "@vitest/browser-playwright";
import { defineProject } from "vitest/config";

export default [
  defineProject({
    plugins: [tsconfigPaths()],
    test: {
      name: "unit",
      environment: "node",
      globals: true,
      setupFiles: ["./vitest.setup.ts"],
      include: ["src/**/*.test.ts"],
      exclude: ["src/components/react/**/*.test.tsx", "tests/**"],
    },
  }),
  defineProject({
    plugins: [tsconfigPaths()],
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react/jsx-dev-runtime",
        "@testing-library/react",
        "@testing-library/user-event",
      ],
    },
    test: {
      name: "browser",
      globals: true,
      setupFiles: ["./vitest.setup.ts"],
      include: ["src/components/react/**/*.test.tsx"],
      browser: {
        enabled: true,
        provider: playwright(),
        headless: true,
        instances: [{ browser: "chromium" }],
      },
    },
  }),
];
