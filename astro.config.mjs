// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Deployment target is configurable so the same build works on a custom domain,
// a GitHub user page, or a project page served from a sub-path. CI passes these
// through as empty strings when it has nothing to fill in, hence `||`.
const site = process.env.SITE_URL || 'https://trip-homework.pages.dev';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
