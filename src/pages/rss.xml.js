import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts";
import { getAllArticles } from "../lib/content";

export async function GET(context) {
  const enPosts = (await getAllArticles()).filter(
    (post) => post.data.lang === "en",
  );
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: enPosts.map((post) => {
      return {
        title: post.data.title,
        description: post.data.excerpt,
        pubDate: new Date(post.data.publishedAt),
        link: `/en/article/${post.data.routeSlug}/`,
      };
    }),
  });
}
