import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
	const enPosts = await getCollection('en');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: enPosts.map((post) => ({
			...post.data,
			link: `/en/blog/${post.slug}/`,
		})),
	});
}
