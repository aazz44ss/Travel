import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE } from '~/consts';

export async function GET(context: APIContext) {
  const articles = (await getCollection('articles')).sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );

  return rss({
    title: `${SITE.name}｜${SITE.tagline}`,
    description: SITE.description,
    site: context.site ?? 'https://example.com',
    customData: `<language>zh-Hant-TW</language>`,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.publishedAt,
      categories: article.data.tags,
      link: `/articles/${article.id}`,
    })),
  });
}
