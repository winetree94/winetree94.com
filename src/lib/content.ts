import { getCollection, type CollectionEntry } from "astro:content";
import type { SupportedLanguageCodes } from "@/lib/language";

const LANGUAGE_TAGS = new Set(["en", "ko"]);

export type ArticleEntry = CollectionEntry<"articles">;
export type PageEntry = CollectionEntry<"pages">;
export type TagEntry = CollectionEntry<"tags">;

function sortByPublishedAtDesc<T extends { data: { publishedAt: string } }>(
  entries: T[],
) {
  return entries.sort((left, right) => {
    return (
      new Date(right.data.publishedAt).getTime() -
      new Date(left.data.publishedAt).getTime()
    );
  });
}

function sortTags(entries: TagEntry[]) {
  return entries.sort((left, right) => {
    const leftOrder = left.data.order ?? Number.MAX_SAFE_INTEGER;
    const rightOrder = right.data.order ?? Number.MAX_SAFE_INTEGER;

    if (leftOrder !== rightOrder) {
      return leftOrder - rightOrder;
    }

    return left.data.slug.localeCompare(right.data.slug);
  });
}

export async function getAllArticles(): Promise<ArticleEntry[]> {
  const entries = await getCollection("articles", ({ data }) => !data.draft);
  return sortByPublishedAtDesc(entries);
}

export async function getArticle(
  lang: SupportedLanguageCodes,
  slug: string,
): Promise<ArticleEntry | undefined> {
  const entries = await getAllArticles();
  return entries.find(
    (entry) => entry.data.lang === lang && entry.data.routeSlug === slug,
  );
}

export async function getArticleAlternatives(
  translationKey: string,
  lang: SupportedLanguageCodes,
): Promise<ArticleEntry[]> {
  const entries = await getAllArticles();
  return entries.filter((entry) => {
    return (
      entry.data.translationKey === translationKey && entry.data.lang !== lang
    );
  });
}

export async function getAllPages(): Promise<PageEntry[]> {
  return getCollection("pages");
}

export async function getPage(
  lang: SupportedLanguageCodes,
  slug: string,
): Promise<PageEntry | undefined> {
  const entries = await getAllPages();
  return entries.find(
    (entry) => entry.data.lang === lang && entry.data.routeSlug === slug,
  );
}

export async function getPageAlternatives(
  translationKey: string,
  lang: SupportedLanguageCodes,
): Promise<PageEntry[]> {
  const entries = await getAllPages();
  return entries.filter((entry) => {
    return (
      entry.data.translationKey === translationKey && entry.data.lang !== lang
    );
  });
}

export async function getArticlesByTag(
  lang: SupportedLanguageCodes,
  tag: string,
): Promise<ArticleEntry[]> {
  const entries = await getAllArticles();
  return entries.filter((entry) => {
    return entry.data.lang === lang && entry.data.tags.includes(tag);
  });
}

export async function getAllTags(): Promise<TagEntry[]> {
  const entries = await getCollection("tags");
  return sortTags(entries);
}

export async function getTag(slug: string): Promise<TagEntry | undefined> {
  const entries = await getAllTags();
  return entries.find((entry) => entry.data.slug === slug);
}

export async function getNavigationTags(): Promise<TagEntry[]> {
  const entries = await getAllTags();
  return entries.filter((entry) => {
    return (
      !LANGUAGE_TAGS.has(entry.data.slug) &&
      entry.data.visibility !== "internal"
    );
  });
}

export async function getTagPages(): Promise<TagEntry[]> {
  const entries = await getAllTags();
  return entries.filter((entry) => !LANGUAGE_TAGS.has(entry.data.slug));
}
