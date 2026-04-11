import { describe, expect, it } from "vitest";
import { getTranslation } from "./utils";

describe("getTranslation", () => {
  it("returns English translation values", () => {
    const t = getTranslation("en");

    expect(t("theme")).toBe("Theme");
    expect(t("theme.dark")).toBe("Dark");
  });

  it("returns Korean translation values", () => {
    const t = getTranslation("ko");

    expect(t("theme")).toBe("테마");
    expect(t("theme.light")).toBe("밝은 색상");
  });
});
