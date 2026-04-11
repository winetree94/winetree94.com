import { defineCollection, z } from "astro:content";

const languageSchema = z.enum(["en", "ko"]);

const articles = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    excerpt: z.string().default(""),
    lang: languageSchema,
    routeSlug: z.string(),
    translationKey: z.string(),
    publishedAt: z.string(),
    updatedAt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featureImage: z.string().optional(),
    commentsTerm: z.string(),
    draft: z.boolean().optional().default(false),
  }),
});

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    excerpt: z.string().default(""),
    lang: languageSchema,
    routeSlug: z.string(),
    translationKey: z.string(),
    featureImage: z.string().optional(),
    updatedAt: z.string().optional(),
  }),
});

const tags = defineCollection({
  type: "data",
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    visibility: z.enum(["public", "internal"]).optional(),
    order: z.number().optional(),
    translations: z.object({
      en: z.object({
        title: z.string(),
        description: z.string().default(""),
      }),
      ko: z.object({
        title: z.string(),
        description: z.string().default(""),
      }),
    }),
  }),
});

export const collections = {
  articles,
  pages,
  tags,
};
