import type { Locale } from './config';

/**
 * Interface copy for every locale.
 *
 * Room names, bed names and the official view definitions are not here — those
 * come from the hotel's own Japanese and English pages and live in the dataset,
 * so the site never paraphrases a name the hotel has already published.
 */
export interface UIStrings {
  site: { name: string; tagline: string; description: string; author: string };
  nav: { home: string; articles: string; database: string; about: string; menu: string; primary: string };
  common: {
    skipToContent: string;
    breadcrumb: string;
    backToTop: string;
    backToArticles: string;
    allArticles: string;
    home: string;
    destination: string;
    takeaways: string;
    tableOfContents: string;
    sections: (n: number) => string;
    readingTime: (n: number) => string;
    updatedOn: (date: string) => string;
    languageLabel: string;
  };
  callout: Record<'note' | 'tip' | 'warn' | 'key', string>;
  sources: {
    heading: string;
    intro: string;
    kinds: Record<'official' | 'blog' | 'social' | 'media', string>;
  };
  footer: { siteNav: string; principles: string; footerNav: string; rss: string; disclaimer: string; rules: string[] };
  notFound: { kicker: string; heading: string; body: string; home: string; articles: string };
  articleIndex: { heading: string; empty: string };
}

const zhHant: UIStrings = {
  site: {
    name: '行前功課',
    tagline: '把功課做完，剩下的交給旅行',
    description:
      '行前功課把每個行程細節查到底。從官方資料、當地部落格與 TikTok、Instagram 的第一手分享交叉查證，寫成你出發前真的用得上的指南。',
    author: '行前功課編輯部',
  },
  nav: {
    home: '首頁',
    articles: '所有文章',
    database: '房型資料庫',
    about: '關於',
    menu: '開啟選單',
    primary: '主要導覽',
  },
  common: {
    skipToContent: '跳到主要內容',
    breadcrumb: '麵包屑',
    backToTop: '回到頂端',
    backToArticles: '回到所有文章',
    allArticles: '所有文章',
    home: '首頁',
    destination: '目的地',
    takeaways: '先看結論',
    tableOfContents: '本文目錄',
    sections: (n) => `${n} 節`,
    readingTime: (n) => `閱讀 ${n} 分鐘`,
    updatedOn: (date) => `${date} 更新`,
    languageLabel: '語言',
  },
  callout: { note: '備註', tip: '實用技巧', warn: '注意', key: '重點' },
  sources: {
    heading: '資料來源',
    intro: '本文交叉查證下列資料。規格與價格請以出發前的官方公告為準。',
    kinds: { official: '官方', blog: '部落格', social: '社群', media: '媒體' },
  },
  footer: {
    siteNav: '網站導覽',
    principles: '編輯原則',
    footerNav: '頁尾導覽',
    rss: 'RSS 訂閱',
    disclaimer: '本站與文中提及的任何飯店、樂園或品牌均無合作或從屬關係。',
    rules: ['官方資料優先，二手資料標明出處', '價格與時刻標註查證日期', '不寫沒查證過的推薦'],
  },
  notFound: {
    kicker: '這條路線沒有規劃過',
    heading: '找不到這一頁',
    body: '這個網址沒有對應的內容。可能是連結打錯了，也可能是那篇文章還在查資料的階段。',
    home: '回到首頁',
    articles: '看所有文章',
  },
  articleIndex: { heading: '所有文章', empty: '還沒有文章。' },
};

const ja: UIStrings = {
  site: {
    name: '旅の下調べ',
    tagline: '下調べを終えたら、あとは旅にまかせる',
    description:
      '公式情報と現地のブログ、TikTok や Instagram の実際の宿泊レポートを突き合わせて、出発前に本当に使える情報だけをまとめています。',
    author: '旅の下調べ編集部',
  },
  nav: {
    home: 'ホーム',
    articles: '記事一覧',
    database: '客室データベース',
    about: 'このサイトについて',
    menu: 'メニューを開く',
    primary: 'メインナビゲーション',
  },
  common: {
    skipToContent: '本文へスキップ',
    breadcrumb: 'パンくずリスト',
    backToTop: 'ページ先頭へ',
    backToArticles: '記事一覧へ戻る',
    allArticles: '記事一覧',
    home: 'ホーム',
    destination: '行き先',
    takeaways: '先に結論',
    tableOfContents: '目次',
    sections: (n) => `${n} 節`,
    readingTime: (n) => `読了 ${n} 分`,
    updatedOn: (date) => `${date} 更新`,
    languageLabel: '言語',
  },
  callout: { note: '補足', tip: '実践的なコツ', warn: '注意', key: 'ポイント' },
  sources: {
    heading: '参考資料',
    intro: '以下の資料を突き合わせて確認しています。料金と時間は出発前に公式の案内でご確認ください。',
    kinds: { official: '公式', blog: 'ブログ', social: 'SNS', media: 'メディア' },
  },
  footer: {
    siteNav: 'サイトマップ',
    principles: '編集方針',
    footerNav: 'フッターナビゲーション',
    rss: 'RSS を購読',
    disclaimer: '当サイトは記事内のホテル・パーク・ブランドと提携関係にありません。',
    rules: ['公式情報を優先し、二次情報は出典を明記', '料金と時間は確認した日付を明記', '確認できていないおすすめは書かない'],
  },
  notFound: {
    kicker: 'この道は下調べしていません',
    heading: 'ページが見つかりません',
    body: 'この URL に対応する内容がありません。リンクの誤りか、まだ調べている途中の記事かもしれません。',
    home: 'ホームへ',
    articles: '記事一覧を見る',
  },
  articleIndex: { heading: '記事一覧', empty: 'まだ記事がありません。' },
};

const en: UIStrings = {
  site: {
    name: 'Trip Homework',
    tagline: 'Do the homework, then let the trip happen',
    description:
      'Trip Homework researches one trip detail at a time, cross-checking official sources against local blogs and first-hand stays posted on TikTok and Instagram, so what you read is what you can actually use.',
    author: 'Trip Homework editors',
  },
  nav: {
    home: 'Home',
    articles: 'Articles',
    database: 'Room database',
    about: 'About',
    menu: 'Open menu',
    primary: 'Primary navigation',
  },
  common: {
    skipToContent: 'Skip to main content',
    breadcrumb: 'Breadcrumb',
    backToTop: 'Back to top',
    backToArticles: 'Back to all articles',
    allArticles: 'All articles',
    home: 'Home',
    destination: 'Destination',
    takeaways: 'The short version',
    tableOfContents: 'Contents',
    sections: (n) => `${n} sections`,
    readingTime: (n) => `${n} min read`,
    updatedOn: (date) => `Updated ${date}`,
    languageLabel: 'Language',
  },
  callout: { note: 'Note', tip: 'Tip', warn: 'Watch out', key: 'Key point' },
  sources: {
    heading: 'Sources',
    intro:
      'Everything here is cross-checked against the sources below. Confirm rates and times against the official pages before you travel.',
    kinds: { official: 'Official', blog: 'Blog', social: 'Social', media: 'Media' },
  },
  footer: {
    siteNav: 'Site',
    principles: 'How we work',
    footerNav: 'Footer navigation',
    rss: 'Subscribe by RSS',
    disclaimer: 'This site has no affiliation with any hotel, park or brand mentioned.',
    rules: [
      'Official sources first, secondary ones attributed',
      'Prices and times carry the date they were checked',
      'No recommendation we have not verified',
    ],
  },
  notFound: {
    kicker: 'This route was never planned',
    heading: 'Page not found',
    body: 'Nothing lives at this URL. Either the link is wrong, or that piece is still being researched.',
    home: 'Go to the home page',
    articles: 'Browse the articles',
  },
  articleIndex: { heading: 'All articles', empty: 'No articles yet.' },
};

export const UI: Record<Locale, UIStrings> = { 'zh-hant': zhHant, ja, en };

export const t = (locale: Locale): UIStrings => UI[locale];
