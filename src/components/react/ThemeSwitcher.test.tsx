import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ThemeSwitcher } from "./ThemeSwitcher";

function mockMatchMedia(matches: boolean) {
  const matchMedia = vi.fn().mockImplementation(() => ({
    matches,
    media: "(prefers-color-scheme: dark)",
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));

  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: matchMedia,
  });
}

const labels = {
  theme: "Theme",
  auto: "Auto",
  light: "Light",
  dark: "Dark",
};

describe("ThemeSwitcher", () => {
  it("renders translated labels", () => {
    mockMatchMedia(false);

    render(<ThemeSwitcher labels={labels} />);

    expect(screen.getByRole("button", { name: "Theme" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Auto" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Light" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Dark" })).toBeVisible();
  });

  it("applies the saved dark theme on click and persists it", async () => {
    mockMatchMedia(false);
    const user = userEvent.setup();

    render(<ThemeSwitcher labels={labels} />);
    await user.click(screen.getByRole("button", { name: "Dark" }));

    expect(window.localStorage.getItem("theme-preference")).toBe("dark");
    expect(document.documentElement).toHaveAttribute("data-theme", "black");
    expect(document.documentElement).toHaveAttribute("data-scheme", "dark");
    expect(screen.getByRole("button", { name: "Dark" })).toHaveClass(
      "font-bold",
    );
  });

  it("uses the stored theme as the initial selected state", () => {
    mockMatchMedia(false);
    window.localStorage.setItem("theme-preference", "light");

    render(<ThemeSwitcher labels={labels} />);

    expect(screen.getByRole("button", { name: "Light" })).toHaveClass(
      "font-bold",
    );
  });

  it("maps auto mode to the system dark preference", async () => {
    mockMatchMedia(true);
    const user = userEvent.setup();

    render(<ThemeSwitcher labels={labels} />);
    await user.click(screen.getByRole("button", { name: "Auto" }));

    expect(window.localStorage.getItem("theme-preference")).toBe("auto");
    expect(document.documentElement).toHaveAttribute("data-theme", "black");
    expect(document.documentElement).toHaveAttribute("data-scheme", "dark");
  });
});
