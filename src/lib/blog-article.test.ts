import { describe, expect, it } from "vitest";
import {
  buildAlternativeLanguageHref,
  getAlternativeLanguageLabel,
  resolveGiscusTheme,
} from "./blog-article";

describe("blog article helpers", () => {
  it("builds alternative language hrefs from the current pathname", () => {
    expect(
      buildAlternativeLanguageHref("/en/article/vector-optimizer/", "en", "ko"),
    ).toBe("/ko/article/vector-optimizer/");
  });

  it("returns the native label for each language", () => {
    expect(getAlternativeLanguageLabel("en")).toBe("English");
    expect(getAlternativeLanguageLabel("ko")).toBe("한국어");
  });

  it("maps page theme values to giscus themes", () => {
    expect(resolveGiscusTheme("black")).toBe("dark");
    expect(resolveGiscusTheme("light")).toBe("light");
    expect(resolveGiscusTheme(null)).toBe("light");
  });
});
