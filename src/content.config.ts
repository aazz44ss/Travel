import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { LOCALES } from './i18n/config';

/**
 * Articles live under a directory per locale, so a translation is a sibling file
 * with the same name: `articles/<locale>/<slug>.mdx`. The id therefore carries
 * both, and `articleLocale` / `articleSlug` split it back apart.
 */

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** Short label used in cards and lists when the full title is too long. */
    cardTitle: z.string().optional(),
    destination: z.string(),
    country: z.string(),
    tags: z.array(z.string()).default([]),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    readingMinutes: z.number(),
    featured: z.boolean().default(false),
    /** Rendered as the hero gradient when there is no photograph. */
    accent: z.enum(['teal', 'gold', 'berry']).default('teal'),
    heroKicker: z.string().optional(),
    /** Bullet summary shown above the article body. */
    takeaways: z.array(z.string()).default([]),
    sources: z
      .array(
        z.object({
          label: z.string(),
          url: z.url(),
          kind: z.enum(['official', 'blog', 'social', 'media']).default('blog'),
        }),
      )
      .default([]),
  }),
});

export const collections = { articles };

export const articleLocale = (id: string) => {
  const [head] = id.split('/');
  return (LOCALES as readonly string[]).includes(head!) ? (head as (typeof LOCALES)[number]) : LOCALES[0];
};

export const articleSlug = (id: string) => {
  const parts = id.split('/');
  return (LOCALES as readonly string[]).includes(parts[0]!) ? parts.slice(1).join('/') : id;
};
