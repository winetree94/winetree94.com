import { describe, expect, it } from "vitest";
import {
  defaultLangCode,
  LOCALE_INFO,
  SUPPORTED_LANGUAGE_CODES,
  SUPPORTED_LANGUAGES,
} from "./language";

describe("language constants", () => {
  it("keeps the supported language codes stable", () => {
    expect(SUPPORTED_LANGUAGES).toEqual({ EN: "en", KO: "ko", JA: "ja" });
    expect(SUPPORTED_LANGUAGE_CODES).toEqual(["en", "ko", "ja"]);
    expect(defaultLangCode).toBe("en");
  });

  it("exposes locale labels for each language", () => {
    expect(LOCALE_INFO.en).toBe("English");
    expect(LOCALE_INFO.ko).toBe("한국어");
    expect(LOCALE_INFO.ja).toBe("日本語");
  });
});
