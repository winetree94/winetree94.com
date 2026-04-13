import { getCollection } from "astro:content";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  getAllArticles,
  getAllTags,
  getArticleAlternatives,
  getArticlesByTag,
  getNavigationTags,
  getPageAlternatives,
  getTagPages,
} from "./content";

vi.mock("astro:content", () => ({
  getCollection: vi.fn(),
}));

const getCollectionMock = vi.mocked(getCollection);

type CollectionFilter<T> = ((entry: T) => boolean) | undefined;

function createArticleEntry(overrides: Record<string, unknown> = {}) {
  return {
    id: `article-${Math.random()}`,
    collection: "articles",
    data: {
      draft: false,
      publishedAt: "2025-01-01",
      lang: "en",
      routeSlug: "hello-world",
      translationKey: "hello-world",
      tags: ["blog"],
      title: "Hello World",
      excerpt: "Example excerpt",
      ...overrides,
    },
  } as never;
}

function createTagEntry(overrides: Record<string, unknown> = {}) {
  return {
    id: `tag-${Math.random()}`,
    collection: "tags",
    data: {
      slug: "blog",
      name: "Blog",
      order: undefined,
      visibility: "public",
      ...overrides,
    },
  } as never;
}

function createPageEntry(overrides: Record<string, unknown> = {}) {
  return {
    id: `page-${Math.random()}`,
    collection: "pages",
    data: {
      lang: "en",
      routeSlug: "about",
      translationKey: "about",
      title: "About",
      excerpt: "About page",
      ...overrides,
    },
  } as never;
}

describe("content helpers", () => {
  beforeEach(() => {
    getCollectionMock.mockReset();
  });

  it("filters drafts and sorts articles by published date descending", async () => {
    const articles = [
      createArticleEntry({ routeSlug: "older", publishedAt: "2024-01-02" }),
      createArticleEntry({
        routeSlug: "draft",
        publishedAt: "2025-01-01",
        draft: true,
      }),
      createArticleEntry({ routeSlug: "newer", publishedAt: "2025-01-03" }),
    ];

    getCollectionMock.mockImplementation(async (_collection, filter) => {
      const typedFilter = filter as CollectionFilter<(typeof articles)[number]>;

      return typedFilter
        ? articles.filter((entry) => typedFilter(entry))
        : articles;
    });

    await expect(getAllArticles()).resolves.toMatchObject([
      { data: { routeSlug: "newer" } },
      { data: { routeSlug: "older" } },
    ]);
  });

  it("returns alternative translations for an article", async () => {
    const articles = [
      createArticleEntry({ lang: "en", translationKey: "astro-testing" }),
      createArticleEntry({ lang: "ko", translationKey: "astro-testing" }),
      createArticleEntry({ lang: "en", translationKey: "another-post" }),
    ];

    getCollectionMock.mockImplementation(async (_collection, filter) => {
      const typedFilter = filter as CollectionFilter<(typeof articles)[number]>;

      return typedFilter
        ? articles.filter((entry) => typedFilter(entry))
        : articles;
    });

    await expect(
      getArticleAlternatives("astro-testing", "en"),
    ).resolves.toMatchObject([
      { data: { lang: "ko", translationKey: "astro-testing" } },
    ]);
  });

  it("filters articles by tag and language", async () => {
    const articles = [
      createArticleEntry({
        lang: "en",
        routeSlug: "browser-tests",
        tags: ["blog", "testing"],
      }),
      createArticleEntry({ lang: "en", routeSlug: "infra", tags: ["devops"] }),
      createArticleEntry({
        lang: "ko",
        routeSlug: "browser-tests-ko",
        tags: ["blog", "testing"],
      }),
    ];

    getCollectionMock.mockImplementation(async (_collection, filter) => {
      const typedFilter = filter as CollectionFilter<(typeof articles)[number]>;

      return typedFilter
        ? articles.filter((entry) => typedFilter(entry))
        : articles;
    });

    await expect(getArticlesByTag("en", "testing")).resolves.toMatchObject([
      { data: { routeSlug: "browser-tests" } },
    ]);
  });

  it("returns alternative translations for a page", async () => {
    const pages = [
      createPageEntry({ lang: "en", translationKey: "about" }),
      createPageEntry({ lang: "ko", translationKey: "about" }),
      createPageEntry({ lang: "en", translationKey: "resume" }),
    ];

    getCollectionMock.mockImplementation(async () => pages);

    await expect(getPageAlternatives("about", "en")).resolves.toMatchObject([
      { data: { lang: "ko", translationKey: "about" } },
    ]);
  });

  it("sorts all tags by order and slug", async () => {
    const tags = [
      createTagEntry({ slug: "web" }),
      createTagEntry({ slug: "blog", order: 5 }),
      createTagEntry({ slug: "ai", order: 5 }),
      createTagEntry({ slug: "project", order: 1 }),
    ];

    getCollectionMock.mockImplementation(async () => tags);

    await expect(getAllTags()).resolves.toMatchObject([
      { data: { slug: "project" } },
      { data: { slug: "ai" } },
      { data: { slug: "blog" } },
      { data: { slug: "web" } },
    ]);
  });

  it("sorts tag pages and excludes hidden or language tags from navigation", async () => {
    const tags = [
      createTagEntry({ slug: "ko", name: "Korean", order: 0 }),
      createTagEntry({ slug: "infra", name: "Infra" }),
      createTagEntry({
        slug: "internal",
        name: "Internal",
        visibility: "internal",
        order: 1,
      }),
      createTagEntry({ slug: "blog", name: "Blog", order: 2 }),
      createTagEntry({ slug: "project", name: "Projects", order: 2 }),
    ];

    getCollectionMock.mockImplementation(async () => tags);

    await expect(getNavigationTags()).resolves.toMatchObject([
      { data: { slug: "blog" } },
      { data: { slug: "project" } },
      { data: { slug: "infra" } },
    ]);

    await expect(getTagPages()).resolves.toMatchObject([
      { data: { slug: "internal" } },
      { data: { slug: "blog" } },
      { data: { slug: "project" } },
      { data: { slug: "infra" } },
    ]);
  });
});
