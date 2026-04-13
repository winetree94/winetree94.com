import { describe, expect, it } from "vitest";
import {
  defaultLangCode,
  LOCALE_INFO,
  SUPPORTED_LANGUAGE_CODES,
  SUPPORTED_LANGUAGES,
} from "./language";

describe("language constants", () => {
  it("keeps the supported language codes stable", () => {
    expect(SUPPORTED_LANGUAGES).toEqual({ EN: "en", KO: "ko" });
    expect(SUPPORTED_LANGUAGE_CODES).toEqual(["en", "ko"]);
    expect(defaultLangCode).toBe("en");
  });

  it("exposes locale labels for each language", () => {
    expect(LOCALE_INFO.en.nativeName).toBe("English");
    expect(LOCALE_INFO.en.localeNames.ko).toBe("영어");
    expect(LOCALE_INFO.ko.nativeName).toBe("한국어");
    expect(LOCALE_INFO.ko.localeNames.en).toBe("Korean");
  });
});
