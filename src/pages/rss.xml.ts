import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { articleLocale, articleSlug } from '~/content.config';
import { DEFAULT_LOCALE, LOCALE_META, localePath } from '~/i18n/config';
import { t } from '~/i18n/ui';

/**
 * One feed, in the default locale. Articles are stored one file per locale, so
 * the collection holds every translation; mixing them into a single feed would
 * contradict its `<language>` and repeat each piece three times.
 */
export async function GET(context: APIContext) {
  const ui = t(DEFAULT_LOCALE);

  const articles = (await getCollection('articles'))
    .filter((article) => articleLocale(article.id) === DEFAULT_LOCALE)
    .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

  return rss({
    title: `${ui.site.name}｜${ui.site.tagline}`,
    description: ui.site.description,
    site: context.site ?? 'https://example.com',
    customData: `<language>${LOCALE_META[DEFAULT_LOCALE].htmlLang}</language>`,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.publishedAt,
      categories: article.data.tags,
      link: localePath(DEFAULT_LOCALE, `/articles/${articleSlug(article.id)}`),
    })),
  });
}
