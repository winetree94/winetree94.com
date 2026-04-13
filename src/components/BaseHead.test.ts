import { describe, expect, it } from "vitest";

import { getLanguageHeadLinks } from "@/i18n/ui";

describe("BaseHead", () => {
  it("provides English font preload links", () => {
    expect(getLanguageHeadLinks("en")).toEqual([
      {
        rel: "preload",
        href: "/fonts/Agave-Regular.ttf",
        as: "font",
        type: "font/woff",
        crossorigin: true,
      },
      {
        rel: "preload",
        href: "/fonts/Agave-Bold.ttf",
        as: "font",
        type: "font/woff",
        crossorigin: true,
      },
    ]);
  });

  it("provides Korean external font links", () => {
    expect(getLanguageHeadLinks("ko")).toEqual([
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: true,
      },
      {
        rel: "preload",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@100;200;300;400;500;600;700&display=block",
        as: "style",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@100;200;300;400;500;600;700&display=block",
      },
    ]);
  });

  it("returns no language links when lang is omitted", () => {
    expect(getLanguageHeadLinks()).toEqual([]);
  });
});
