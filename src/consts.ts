export const SITE = {
  name: '行前功課',
  nameEn: 'Trip Homework',
  tagline: '把功課做完，剩下的交給旅行',
  description:
    '行前功課是一個把資料查到底的中文旅遊誌。每一篇都從官方資料、當地部落格與 TikTok、Instagram 的第一手分享交叉查證，寫成你出發前真的用得上的指南。',
  locale: 'zh-Hant-TW',
  author: '行前功課編輯部',
} as const;

export const NAV_LINKS = [
  { label: '首頁', href: '/' },
  { label: '所有文章', href: '/articles' },
  { label: '飯店資料庫', href: '/hotels' },
  { label: '關於', href: '/about' },
] as const;

/**
 * Prefixes an internal path with the configured deployment base path.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return `${base}${suffix}` || '/';
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function formatDateShort(date: Date): string {
  return new Intl.DateTimeFormat('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'UTC',
  }).format(date);
}
