/**
 * Locale set and URL helpers.
 *
 * Traditional Chinese is the default and keeps its URLs unprefixed so existing
 * links stay valid; Japanese and English live under /ja/ and /en/. Pages are
 * generated from a single `[...locale]` route per page, so every locale renders
 * the same component with a different dictionary rather than a copied file.
 */

export const LOCALES = ['zh-hant', 'ja', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'zh-hant';

export const LOCALE_META: Record<
  Locale,
  { label: string; shortLabel: string; htmlLang: string; ogLocale: string; dateLocale: string }
> = {
  'zh-hant': {
    label: '繁體中文',
    shortLabel: '中文',
    htmlLang: 'zh-Hant-TW',
    ogLocale: 'zh_TW',
    dateLocale: 'zh-TW',
  },
  ja: { label: '日本語', shortLabel: '日本語', htmlLang: 'ja', ogLocale: 'ja_JP', dateLocale: 'ja-JP' },
  en: { label: 'English', shortLabel: 'EN', htmlLang: 'en', ogLocale: 'en_US', dateLocale: 'en-US' },
};

/** The URL segment for a locale, empty for the default. */
export const localeSegment = (locale: Locale): string =>
  locale === DEFAULT_LOCALE ? '' : `/${locale}`;

/**
 * Builds an internal path for a locale, then prefixes the deployment base path.
 * `path` is always written as if the site were single-language and served from
 * the root, e.g. `/articles`.
 */
export function localePath(locale: Locale, path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const suffix = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `${base}${localeSegment(locale)}${suffix}` || '/';
}

/** The `[...locale]` params Astro needs to emit every locale of a page. */
export const localeParams = (): { params: { locale: string | undefined }; props: { locale: Locale } }[] =>
  LOCALES.map((locale) => ({
    params: { locale: locale === DEFAULT_LOCALE ? undefined : locale },
    props: { locale },
  }));

/** Resolves the locale from a route param, falling back to the default. */
export const localeFromParam = (param?: string): Locale =>
  LOCALES.includes(param as Locale) ? (param as Locale) : DEFAULT_LOCALE;

export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(LOCALE_META[locale].dateLocale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function formatDateShort(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(LOCALE_META[locale].dateLocale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'UTC',
  }).format(date);
}
