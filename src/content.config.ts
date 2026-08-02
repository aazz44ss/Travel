import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
          url: z.string().url(),
          kind: z.enum(['official', 'blog', 'social', 'media']).default('blog'),
        }),
      )
      .default([]),
  }),
});

export const collections = { articles };
