import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  if (typeof document !== "undefined") {
    cleanup();
    delete document.documentElement.dataset.theme;
    delete document.documentElement.dataset.scheme;
  }

  if (typeof window !== "undefined") {
    window.localStorage.clear();
  }

  vi.restoreAllMocks();
});
