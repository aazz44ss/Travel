import type { APIContext } from 'astro';
import { withBase } from '~/consts';

export function GET({ site }: APIContext) {
  const path = withBase('/sitemap-index.xml');
  const sitemap = site ? new URL(path, site).href : path;

  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
