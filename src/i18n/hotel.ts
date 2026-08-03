import type { Locale } from './config';

/**
 * Copy for the room database page.
 *
 * Names the hotel already publishes — room names, view grades, categories, bed
 * types — are taken from its own Japanese and English pages rather than
 * translated here, so a reader searching the official site finds the same words.
 */
export interface HotelCopy {
  hotelName: string;
  titleSuffix: string;
  regionLabel: string;
  typeCount: (n: number) => string;
  databaseLabel: string;
  heroIntro: (rooms: number) => string;
  pageDescription: (rooms: number, positions: number) => string;
  readArticle: string;
  sections: { id: string; label: string }[];
  headings: Record<
    'overview' | 'views' | 'categories' | 'beds' | 'facilities' | 'dining' | 'benefits' | 'faq',
    string
  >;
  provenance: string;
  viewsIntro: string;
  categoriesIntro: string;
  bedsIntro: string;
  articleTeaseHeading: string;
  articleTease: string;
}

const SECTION_LABELS: Record<Locale, string[]> = {
  'zh-hant': [
    '基本資料',
    '景觀分級',
    '四大分類',
    '客房平面圖',
    '房型探索器',
    '逐月價格',
    '床型尺寸',
    '設施與拍照點',
    '餐廳',
    '住宿禮遇',
    '常見問題',
  ],
  ja: [
    '基本情報',
    '眺望の区分',
    '4 つのカテゴリー',
    '客室配置図',
    '客室を絞り込む',
    '月別料金',
    'ベッドサイズ',
    '施設と撮影スポット',
    'レストラン',
    '宿泊特典',
    'よくある質問',
  ],
  en: [
    'At a glance',
    'View grades',
    'The four categories',
    'Floor plan',
    'Room finder',
    'Rates by month',
    'Bed sizes',
    'Facilities and photo spots',
    'Restaurants',
    'Guest benefits',
    'FAQ',
  ],
};

const SECTION_IDS = [
  'overview',
  'views',
  'categories',
  'floor-plan',
  'room-explorer',
  'price-seasons',
  'beds',
  'facilities',
  'dining',
  'benefits',
  'faq',
];

const buildSections = (locale: Locale) =>
  SECTION_IDS.map((id, i) => ({ id, label: SECTION_LABELS[locale][i]! }));

const COPY: Record<Locale, Omit<HotelCopy, 'sections'>> = {
  'zh-hant': {
    hotelName: '東京迪士尼樂園大飯店',
    titleSuffix: ' 房型資料庫',
    regionLabel: '日本・千葉縣浦安市',
    typeCount: (n) => `${n} 種房型`,
    databaseLabel: '房型資料庫',
    heroIntro: (rooms) =>
      `全 ${rooms} 種房型的規格與參考價，以及床型尺寸、餐廳、設施與住宿禮遇的完整整理。訂房頁面開著的時候，把這一頁放在旁邊對照。`,
    pageDescription: (rooms, positions) =>
      `東京迪士尼樂園大飯店全 ${rooms} 種房型的面積、床型、人數上限、景觀分級與參考價，整理成可篩選的清單。另有依實際比例描繪的客房平面圖，${positions} 個位置的大小與面向一目瞭然。`,
    readArticle: '先讀完整攻略',
    headings: {
      overview: '基本資料',
      views: '景觀分級',
      categories: '四大分類',
      beds: '床型尺寸',
      facilities: '設施與拍照點',
      dining: '餐廳',
      benefits: '住宿禮遇',
      faq: '常見問題',
    },
    provenance:
      '房型、面積與床型取自官方繁體中文客房頁；價格是每室每晚、2 位大人的參考起價，來自公開費率表的二手整理。實際金額依日期大幅浮動，請以官方訂房系統為準。',
    viewsIntro: '這是選房時最先要決定的一件事。房名括號裡寫的就是景觀等級；沒有括號代表沒有景觀保證。',
    categoriesIntro: '房名的第一段就是分類。分類決定了你有沒有貴賓室、含不含早餐，以及窗戶朝哪一邊。',
    bedsIntro:
      '日本飯店的「標準床」寬度只有 120 公分，比台灣的單人床寬、離雙人床還很遠。訂房前先看這張表，比看房型名稱有用。',
    articleTeaseHeading: '想知道這些數字背後的判斷？',
    articleTease:
      '完整攻略裡有三種景觀的真實差異、從房間看夜間表演的實際狀況、四種明星主題房怎麼選，以及訂房開賣時間與撿取消房的做法。',
  },
  ja: {
    hotelName: '東京ディズニーランドホテル',
    titleSuffix: ' 客室データベース',
    regionLabel: '日本・千葉県浦安市',
    typeCount: (n) => `${n} タイプ`,
    databaseLabel: '客室データベース',
    heroIntro: (rooms) =>
      `全 ${rooms} タイプの客室の仕様と参考料金、ベッドサイズ、レストラン、施設、宿泊特典をまとめています。予約画面を開いたまま、このページを横に並べて使ってください。`,
    pageDescription: (rooms, positions) =>
      `東京ディズニーランドホテルの全 ${rooms} タイプについて、広さ・ベッド・定員・眺望の区分・参考料金を絞り込める一覧に整理。実際の比率で描いた客室配置図では ${positions} か所の広さと向きが一目で分かります。`,
    readArticle: '詳しい解説を読む',
    headings: {
      overview: '基本情報',
      views: '眺望の区分',
      categories: '4 つのカテゴリー',
      beds: 'ベッドサイズ',
      facilities: '施設と撮影スポット',
      dining: 'レストラン',
      benefits: '宿泊特典',
      faq: 'よくある質問',
    },
    provenance:
      '客室名・広さ・ベッドは公式の客室ページに従っています。料金は 1 室 1 泊・大人 2 名の参考最低料金で、公開されている料金表の二次整理です。実際の金額は日付で大きく変わるため、公式の予約システムでご確認ください。',
    viewsIntro:
      '客室を選ぶとき最初に決めるのがここです。客室名の括弧内が眺望の区分で、括弧がなければ眺望の保証はありません。',
    categoriesIntro:
      '客室名の頭がカテゴリーです。ラウンジが使えるか、朝食が付くか、窓がどちら側を向くかはここで決まります。',
    bedsIntro:
      '日本のホテルの「レギュラーサイズ」は幅 120 cm です。客室名を眺めるより、この表を先に見るほうが確実です。',
    articleTeaseHeading: 'この数字の背景を知りたい方へ',
    articleTease:
      '詳しい解説では、3 段階の眺望の実際の違い、客室から夜のショーがどこまで見えるか、4 つのキャラクタールームの選び方、予約開始時刻とキャンセル拾いの実践を扱っています。',
  },
  en: {
    hotelName: 'Tokyo Disneyland Hotel',
    titleSuffix: ' room database',
    regionLabel: 'Urayasu, Chiba, Japan',
    typeCount: (n) => `${n} room type${n === 1 ? '' : 's'}`,
    databaseLabel: 'Room database',
    heroIntro: (rooms) =>
      `Specifications and reference rates for all ${rooms} room types, plus bed sizes, restaurants, facilities and guest benefits. Keep this page open beside the booking form.`,
    pageDescription: (rooms, positions) =>
      `Area, beds, occupancy, view grade and reference rate for all ${rooms} Tokyo Disneyland Hotel room types, in one filterable list. A floor plan drawn to true proportions shows the size and orientation of ${positions} room positions.`,
    readArticle: 'Read the full guide',
    headings: {
      overview: 'At a glance',
      views: 'View grades',
      categories: 'The four categories',
      beds: 'Bed sizes',
      facilities: 'Facilities and photo spots',
      dining: 'Restaurants',
      benefits: 'Guest benefits',
      faq: 'Frequently asked',
    },
    provenance:
      'Room names, areas and bed types follow the hotel’s official pages. Rates are reference starting prices per room per night for two adults, compiled from a published rate table, which is a secondary source. Actual prices move a great deal by date — confirm in the official booking system.',
    viewsIntro:
      'This is the first thing to settle. Whatever sits in brackets after the room name is the view grade; no brackets means no view is guaranteed.',
    categoriesIntro:
      'The first part of a room name is its category. That is what decides lounge access, whether breakfast is included, and which way the window faces.',
    bedsIntro:
      'A Japanese hotel’s regular bed is only 120 cm wide. Reading this table tells you more than the room name does.',
    articleTeaseHeading: 'Want the reasoning behind these numbers?',
    articleTease:
      'The full guide covers what actually separates the three view grades, how much of the night show you can see from a room, how to choose between the four character rooms, and when booking opens along with how people catch cancellations.',
  },
};

export const hotelCopy = (locale: Locale): HotelCopy => ({
  ...COPY[locale],
  sections: buildSections(locale),
});
