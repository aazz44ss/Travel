import type { Locale } from './config';
import { explorer } from './explorer';
import type { BedRow } from '~/components/BedTable.astro';
import type { ExplorerRoom } from '~/components/RoomExplorer.astro';
import type { HotelFact } from '~/data/hotel-schema';
import { cheapestRoom, formatYen } from '~/data/hotel-schema';
import { BED_SPECS, HOTEL, ROOMS } from '~/data/fantasy-springs-hotel';
import { AVAILABILITY_SOURCE, AVAILABILITY_TOTAL, RATE_SOURCE } from '~/data/fsh-rates';
import { ROSE_ROOM_COUNT, roseNumbersFor } from '~/data/fsh-rose-court';
import {
  LAYOUT_IMAGE_SIZE,
  ROOM_LAYOUTS,
  layoutImageUrl,
  layoutIsShared,
  layoutPageUrl,
} from '~/data/fsh-room-layouts';

/**
 * Copy for the Tokyo DisneySea Fantasy Springs Hotel pages.
 *
 * Names the hotel already publishes — the hotel and wing names, the four sides,
 * the view grades, room types and bed types — are read off its own Japanese and
 * English pages rather than translated here, so a reader who searches the
 * official site for "Superior Alcove Room (5th – 9th floors)" finds the same
 * room we describe.
 *
 * Editorial judgements about individual rooms stay in Traditional Chinese. They
 * are ours rather than the hotel's, and a machine translation of a judgement is
 * worth less than its absence.
 */

// ── Official names, per locale ──────────────────────────────────────────────

const ROOM_NAMES: Record<string, { ja: string; en: string }> = {
  'bay-superior': {
    ja: 'ベイエリアサイド スーペリアルーム',
    en: 'Bay Area Side Superior Room',
  },
  'bay-alcove': {
    ja: 'ベイエリアサイド スーペリア・アルコーヴルーム',
    en: 'Bay Area Side Superior Alcove Room',
  },
  'bay-deluxe': { ja: 'ベイエリアサイド デラックスルーム', en: 'Bay Area Side Deluxe Room' },
  'bay-deluxe-access': {
    ja: 'ベイエリアサイド デラックス・アクセシブルルーム',
    en: 'Bay Area Side Deluxe Accessible Room',
  },
  'entrance-superior': {
    ja: 'ホテルエントランスサイド スーペリアルーム',
    en: 'Hotel Entrance Side Superior Room',
  },
  'entrance-alcove': {
    ja: 'ホテルエントランスサイド スーペリア・アルコーヴルーム',
    en: 'Hotel Entrance Side Superior Alcove Room',
  },
  'entrance-deluxe': {
    ja: 'ホテルエントランスサイド デラックスルーム',
    en: 'Hotel Entrance Side Deluxe Room',
  },
  'rose-superior-low': {
    ja: 'ローズコートサイド スーペリアルーム（3-4階）',
    en: 'Rose Court Side Superior Room (3rd – 4th floors)',
  },
  'rose-superior-high': {
    ja: 'ローズコートサイド スーペリアルーム（5-7階）',
    en: 'Rose Court Side Superior Room (5th – 7th floors)',
  },
  'rose-alcove-low': {
    ja: 'ローズコートサイド スーペリア・アルコーヴルーム（3-4階）',
    en: 'Rose Court Side Superior Alcove Room (3rd – 4th floors)',
  },
  'rose-alcove-high': {
    ja: 'ローズコートサイド スーペリア・アルコーヴルーム（5-9階）',
    en: 'Rose Court Side Superior Alcove Room (5th – 9th floors)',
  },
  'rose-superior-park': {
    ja: 'ローズコートサイド スーペリアルーム（パークビュー）',
    en: 'Rose Court Side Superior Room (Park View)',
  },
  'rose-alcove-park': {
    ja: 'ローズコートサイド スーペリア・アルコーヴルーム（パークビュー）',
    en: 'Rose Court Side Superior Alcove Room (Park View)',
  },
  'rose-deluxe': { ja: 'ローズコートサイド デラックスルーム', en: 'Rose Court Side Deluxe Room' },
  'rose-deluxe-access': {
    ja: 'ローズコートサイド デラックス・アクセシブルルーム',
    en: 'Rose Court Side Deluxe Accessible Room',
  },
  'rose-deluxe-access-park': {
    ja: 'ローズコートサイド デラックス・アクセシブルルーム（パークビュー）',
    en: 'Rose Court Side Deluxe Accessible Room (Park View)',
  },
  'springs-alcove-partial': {
    ja: 'スプリングスサイド デラックス・アルコーヴルーム（パーシャルビュー）',
    en: 'Springs Side Deluxe Alcove Room (Partial View)',
  },
  'springs-access-partial': {
    ja: 'スプリングスサイド デラックス・アクセシブルルーム（パーシャルビュー）',
    en: 'Springs Side Deluxe Accessible Room (Partial View)',
  },
  'springs-alcove-grand': {
    ja: 'スプリングスサイド デラックス・アルコーヴルーム（パークグランドビュー）',
    en: 'Springs Side Deluxe Alcove Room (Park Grand View)',
  },
  'springs-balcony-grand': {
    ja: 'スプリングスサイド デラックス・バルコニールーム（パークグランドビュー）',
    en: 'Springs Side Deluxe Balcony Room (Park Grand View)',
  },
  'springs-balcony-alcove-grand': {
    ja: 'スプリングスサイド デラックス・バルコニー＆アルコーヴルーム（パークグランドビュー）',
    en: 'Springs Side Deluxe Balcony & Alcove Room (Park Grand View)',
  },
  'gc-cove-plain': { ja: 'アルコーヴルーム（4、5、7階）', en: 'Alcove Room (4th, 5th, 7th floors)' },
  'gc-cove-mid': { ja: 'アルコーヴルーム（4-7階）', en: 'Alcove Room (4th – 7th floors)' },
  'gc-cove-high': { ja: 'アルコーヴルーム（8-9階）', en: 'Alcove Room (8th – 9th floors)' },
  'gc-terrace-cove-a': {
    ja: 'テラス＆アルコーヴルーム（3、5階）',
    en: 'Terrace & Alcove Room (3rd, 5th floors)',
  },
  'gc-terrace-cove-b': {
    ja: 'テラス＆アルコーヴルーム（3-4階）',
    en: 'Terrace & Alcove Room (3rd – 4th floors)',
  },
  'gc-terrace': { ja: 'テラスルーム（5-7階）', en: 'Terrace Room (5th – 7th floors)' },
  'gc-terrace-access': {
    ja: 'テラス・アクセシブルルーム（3階）',
    en: 'Terrace Accessible Room (3rd floor)',
  },
  'gc-grand-mid': { ja: 'グランドルーム（5-6階）', en: 'Grand Room (5th – 6th floors)' },
  'gc-grand-high': { ja: 'グランドルーム（9階）', en: 'Grand Room (9th floor)' },
  'gc-grand-terrace': { ja: 'グランド・テラスルーム（8階）', en: 'Grand Terrace Room (8th floor)' },
};

export const VIEW_LABELS: Record<Locale, Record<string, string>> = {
  'zh-hant': {
    grand: '樂園全景觀',
    park: '樂園景觀',
    partial: '景隅景觀',
    none: '無景觀指定',
    allpark: '豪華館：全房面向園區',
  },
  ja: {
    grand: 'パークグランドビュー',
    park: 'パークビュー',
    partial: 'パーシャルビュー',
    none: '眺望指定なし',
    allpark: 'グランドシャトー（全室パーク向き）',
  },
  en: {
    grand: 'Park Grand View',
    park: 'Park View',
    partial: 'Partial View',
    none: 'No view designation',
    allpark: 'Grand Chateau (every room faces the park)',
  },
};

const VIEW_SUMMARY: Record<Locale, Record<string, string>> = {
  'zh-hant': Object.fromEntries(ROOMS.length ? [] : []),
  ja: {
    grand: 'ファンタジースプリングスに正対する',
    park: 'パークは見えるが、中庭を挟む',
    partial: 'パーク側だが、建物に遮られる',
    none: 'ベイエリアサイドとホテルエントランスサイド、そしてローズコートサイドの区分なしの客室',
    allpark: '区分がないのは、56 室すべてが同じだから',
  },
  en: {
    grand: 'Faces Fantasy Springs head-on',
    park: 'Sees the park, across the courtyard',
    partial: 'Faces the park but is blocked by buildings',
    none: 'The Bay Area and Hotel Entrance sides, and the ungraded Rose Court rooms',
    allpark: 'No grade, because all 56 rooms are the same',
  },
};

const VIEW_DETAIL: Record<Locale, Record<string, string>> = {
  'zh-hant': {},
  ja: {
    grand: '公式の定義は「ファンタジースプリングスが正面に見える客室」。スプリングスサイドにしかなく、いずれも 50 m² のデラックスルームで、このホテルでもっとも高い客室です。',
    park: '公式の定義は「ファンタジースプリングスが見える客室」。ローズコートサイドだけにあり、パーク側の面の 6〜9 階に集中しています。中庭越しの遠景で、正面にプロメテウス火山。同じサイドの上層階から 10,000 円上乗せです。',
    partial:
      '日本語の公式定義は「ファンタジースプリングス側に面していますが、建物の壁や屋根などによりほぼ視界が遮られます」。繁体字中国語版より強い言い方です。客室の仕様はパークグランドビューと同じで、安いのは窓の外だけ。',
    none: '眺望の区分が付かない客室。窓の外はオフィシャルホテル側、ホテル正面、または中庭です。ローズコートサイドの 3〜4 階には「草木によって視界が遮られています」と公式が客室名の脇に書いています。',
    allpark:
      'これは公式の区分ではなく、絞り込みを揃えるために本サイトが足した枠です。公式がグランドシャトーに眺望の区分を付けていない理由は客室ページに書かれています。56 室すべてに「バルコニーまたはテラスがあり」、パークに向いているからです。',
  },
  en: {
    grand: 'Officially "rooms facing Fantasy Springs". Only on the Springs Side, all 50 m² Deluxe rooms, and the most expensive rooms in the hotel.',
    park: 'Officially "rooms with a view of Fantasy Springs". Only on the Rose Court Side, concentrated on floors 6 to 9 of the park-facing facade. What you see is the park across the courtyard with Mount Prometheus in the middle, for ¥10,000 more than an upper floor on the same side.',
    partial:
      'The Japanese wording is blunter than the Chinese: the view is "almost entirely blocked by the walls and roofs of buildings". The room is identical to a Park Grand View one; what is cheaper is the window.',
    none: 'Rooms with no view grade. The window faces the official hotels, the hotel entrance or the courtyard. For floors 3 and 4 on the Rose Court Side the hotel prints "the view from this room is obstructed by trees and plants" beside the room name.',
    allpark:
      'This is not an official grade; it is a slot we added so the filter is complete. The hotel assigns the Grand Chateau no view grade, and its room page says why: all 56 rooms "have a balcony or terrace" and face Fantasy Springs.',
  },
};

export const CATEGORY_LABELS: Record<Locale, Record<string, string>> = {
  'zh-hant': {
    springs: '泉鄉區',
    rose: '玫瑰庭區',
    bay: '灣岸區',
    entrance: '飯店入口區',
    grand: '豪華館',
  },
  ja: {
    springs: 'スプリングスサイド',
    rose: 'ローズコートサイド',
    bay: 'ベイエリアサイド',
    entrance: 'ホテルエントランスサイド',
    grand: 'グランドシャトー',
  },
  en: {
    springs: 'Springs Side',
    rose: 'Rose Court Side',
    bay: 'Bay Area Side',
    entrance: 'Hotel Entrance Side',
    grand: 'Grand Chateau',
  },
};

const CATEGORY_SUMMARY: Record<Locale, Record<string, string>> = {
  'zh-hant': {},
  ja: {
    springs:
      'ファンタジーシャトーでパークに直接面する唯一のサイド。パークグランドビューとバルコニーがあるのもここだけです。',
    rose: '中庭「ローズコート」を三方から囲む面。パークビューがあるのはここだけで、階によって値段が分かれるのもここだけです。',
    bay: '東京ディズニーリゾート・オフィシャルホテル側。眺望の区分はなく、このホテルの下限の価格帯です。',
    entrance: 'ホテル正面側。仕様も価格もベイエリアサイドと同じで、違うのは窓の外だけ。',
    grand:
      '56 室の独立した棟。全室がパークに面し、バルコニーまたはテラス付き。客室料金にアトラクション利用券 8 枚とショー鑑賞券 4 枚が含まれます。',
  },
  en: {
    springs:
      'The only side of the Fantasy Chateau that faces the park directly, and the only one with Park Grand View rooms or balconies.',
    rose: 'Wraps three sides of the Rose Court courtyard. The only side with Park View rooms, and the only one priced by floor.',
    bay: 'Faces the Tokyo Disney Resort Official Hotels. No view grade, and the bottom of this hotel’s price range.',
    entrance: 'Faces the hotel’s main entrance. Same spec and same price as the Bay Area Side; only the window differs.',
    grand:
      'A separate 56-room wing. Every room faces the park and has a balcony or terrace, and the room rate itself includes eight Attraction Tickets and four Show Viewing Tickets.',
  },
};

const CATEGORY_PERKS: Record<Locale, Record<string, string[]>> = {
  'zh-hant': {},
  ja: {
    springs: ['50 m²', '定員 5 名', 'パークグランドビュー／パーシャルビュー', '一部バルコニー付き'],
    rose: ['41／48 m²', 'パークビューは 6〜9 階', '3〜4 階は安い別区分'],
    bay: ['41／48 m²', '眺望指定なし', 'ホテルエントランスサイドと同額'],
    entrance: ['41／48 m²', '眺望指定なし', 'ベイエリアサイドと同額'],
    grand: ['70／100 m²', '専用ラウンジとゲートウェイ', '専用フレンチダイニング', '料金に体験券込み'],
  },
  en: {
    springs: ['50 m²', 'Up to 5 guests', 'Park Grand View / Partial View', 'Some have balconies'],
    rose: ['41 / 48 m²', 'Park View on floors 6–9', 'Floors 3–4 priced separately'],
    bay: ['41 / 48 m²', 'No view grade', 'Same price as Hotel Entrance Side'],
    entrance: ['41 / 48 m²', 'No view grade', 'Same price as Bay Area Side'],
    grand: ['70 / 100 m²', 'Private lounge and gateway', 'Its own French restaurant', 'Park tickets in the rate'],
  },
};

const BED_NAMES: Record<Locale, Record<string, string>> = {
  'zh-hant': {},
  ja: {
    標準床: 'レギュラーサイズ',
    '標準床（無障礙客房）': 'レギュラーサイズ（アクセシブル）',
    推拉床: 'トランドルベッド',
    凹室床: 'アルコーヴベッド',
    郵輪床: 'クルーズベッド',
    嬰兒床: 'ベビーベッド',
  },
  en: {
    標準床: 'Regular',
    '標準床（無障礙客房）': 'Regular (Accessible)',
    推拉床: 'Trundle Bed',
    凹室床: 'Alcove Bed',
    郵輪床: 'Cruise Bed',
    嬰兒床: 'Crib for infants',
  },
};

// ── Page copy ───────────────────────────────────────────────────────────────

export interface FshCopy {
  hotelName: string;
  titleSuffix: string;
  regionLabel: string;
  databaseLabel: string;
  heroIntro: (rooms: number, positions: number) => string;
  pageDescription: (rooms: number, positions: number) => string;
  readArticle: string;
  sections: { id: string; label: string }[];
  headings: Record<'overview' | 'sides' | 'views' | 'beds', string>;
  provenance: string;
  sidesIntro: (rooms: number) => string;
  sideMapCaption: string;
  viewsIntro: string;
  bedsIntro: string;
  articleTeaseHeading: string;
  articleTease: string;
  databaseNote: string;
  explorerIntro: (types: number) => string;
  explorerFootnote: (positions: number) => string;
  roomNumberNote: string;
}

const SECTION_IDS = ['overview', 'sides', 'views', 'rose-court', 'room-explorer', 'rates', 'beds', 'facilities', 'dining', 'benefits', 'faq'];

const SECTION_LABELS: Record<Locale, string[]> = {
  'zh-hant': [
    '基本資料',
    '四區與豪華館',
    '景觀分級',
    '玫瑰庭區位置圖',
    '房型探索器',
    '完整價目',
    '床型尺寸',
    '館內設施',
    '餐廳',
    '住宿禮遇',
    '常見問題',
  ],
  ja: [
    '基本情報',
    '4 つのサイドとグランドシャトー',
    '眺望の区分',
    'ローズコートサイド配置図',
    '客室を絞り込む',
    '同じ日の全料金',
    'ベッドサイズ',
    '館内施設',
    'レストラン',
    '宿泊特典',
    'よくある質問',
  ],
  en: [
    'At a glance',
    'Four sides and the Grand Chateau',
    'View grades',
    'Rose Court positions',
    'Room finder',
    'One day’s full price list',
    'Bed sizes',
    'Facilities',
    'Restaurants',
    'Guest benefits',
    'Frequently asked',
  ],
};

const COPY: Record<Locale, Omit<FshCopy, 'sections'>> = {
  'zh-hant': {
    hotelName: HOTEL.name,
    titleSuffix: ' 房型資料庫',
    regionLabel: '日本・千葉縣浦安市',
    databaseLabel: '房型資料庫',
    heroIntro: (rooms, positions) =>
      `兩館 ${rooms} 種房型的規格與參考價，加上玫瑰庭區 ${positions} 間客房的位置圖。訂房頁面開著的時候，把這一頁放在旁邊對照。`,
    pageDescription: (rooms, positions) =>
      `${HOTEL.name}全 ${rooms} 種房型的面積、床型、人數上限、景觀分級與同一天的完整價目，整理成可篩選的清單。另有玫瑰庭區 ${positions} 間客房的位置圖，房號對應的樓層、分類與景觀一目瞭然。`,
    readArticle: '先讀完整攻略',
    headings: {
      overview: '基本資料',
      sides: '四區與豪華館',
      views: '景觀分級',
      beds: '床型尺寸',
    },
    provenance:
      '房型、面積、床型與樓層區間取自官方繁體中文客房頁；價格是每室每晚、2 位大人的參考價，來自開賣日價格調查的二手整理。實際金額依日期大幅浮動，請以官方訂房系統為準。',
    sidesIntro: (rooms) =>
      `房名的第一段就是位置。夢幻館的 ${rooms} 間客房分成四區，區域決定窗外朝哪一邊、有沒有景觀分級，也決定價格；豪華館是另一個館別，不用這套分區。`,
    sideMapCaption: '官方客房頁的位置圖。',
    viewsIntro:
      '房名括號裡寫的就是景觀等級，沒有括號代表沒有景觀保證。四個等級不會同時出現在同一區——樂園全景觀與景隅景觀只在泉鄉區，樂園景觀只在玫瑰庭區。',
    bedsIntro:
      '這間飯店的加床有四種，而且尺寸差很多。房型名稱只寫「附凹室」「附陽台」，實際睡幾個人、睡得舒不舒服看這張表。',
    articleTeaseHeading: '想知道這些數字背後的判斷？',
    articleTease:
      '完整攻略裡有訂房難度的實測數字、「樂園景觀」為什麼不是這裡最好的景、玫瑰庭區的樓層問題怎麼變成價格問題，以及豪華館那 56 間房到底買到了什麼。',
    databaseNote: '兩館 31 種房型，加上玫瑰庭區 147 間客房的逐間位置圖',
    explorerIntro: (types) =>
      `${types} 種房型，用你在意的條件篩掉不適合的。價格是同一個住宿日的參考價，這樣才比得出房型之間的相對關係。`,
    explorerFootnote: (positions) =>
      `名稱依官方繁體中文客房頁，玫瑰庭區採用 2026 年 10 月起適用的分類。房號只有玫瑰庭區有——那一側的 ${positions} 間客房位置已被逐間整理出來，其他三區與豪華館沒有這樣的資料。`,
    roomNumberNote: '房號的第一位是樓層，後三位是位置。來源是逐間調查，含作者推測。',
  },
  ja: {
    hotelName: HOTEL.nameJa,
    titleSuffix: ' 客室データベース',
    regionLabel: '千葉県浦安市',
    databaseLabel: '客室データベース',
    heroIntro: (rooms, positions) =>
      `2 つのシャトー ${rooms} タイプの仕様と参考料金、そしてローズコートサイド ${positions} 室の配置図。予約ページを開いたまま、このページを横に置いて見比べてください。`,
    pageDescription: (rooms, positions) =>
      `${HOTEL.nameJa}の全 ${rooms} タイプについて、面積・ベッド・定員・眺望の区分と同じ日の全料金を絞り込めるリストにまとめました。ローズコートサイド ${positions} 室の配置図付きで、部屋番号から階・区分・眺望がすぐ引けます。`,
    readArticle: '先に完全ガイドを読む',
    headings: {
      overview: '基本情報',
      sides: '4 つのサイドとグランドシャトー',
      views: '眺望の区分',
      beds: 'ベッドサイズ',
    },
    provenance:
      '客室タイプ・面積・ベッド・階層は公式の客室ページから。料金は 1 室 1 泊・大人 2 名の参考価格で、予約開始日の価格調査という二次情報をまとめたものです。実際の金額は日付で大きく動くため、公式の予約システムでご確認ください。',
    sidesIntro: (rooms) =>
      `客室名の最初がその位置です。ファンタジーシャトーの ${rooms} 室は 4 つのサイドに分かれ、サイドが窓の向き、眺望の区分の有無、そして料金を決めます。グランドシャトーは別棟で、この区分を使いません。`,
    sideMapCaption: '公式の客室位置図。',
    viewsIntro:
      '客室名の括弧の中が眺望の区分で、括弧がなければ眺望の保証はありません。4 つの区分が同じサイドに揃うことはなく、パークグランドビューとパーシャルビューはスプリングスサイド、パークビューはローズコートサイドだけです。',
    bedsIntro:
      'このホテルの追加ベッドは 4 種類あり、サイズがかなり違います。客室名は「アルコーヴ」「バルコニー」としか書きません。実際に何人がどう寝るかはこの表を見てください。',
    articleTeaseHeading: 'この数字の背景を知りたい方へ',
    articleTease:
      '完全ガイドでは、予約の取りにくさを実数で示し、パークビューがなぜここで一番いい眺望ではないのか、ローズコートサイドの階の問題がどう価格の問題に変わるのか、そしてグランドシャトーの 56 室で何を買うのかを扱っています。',
    databaseNote: '2 つのシャトーで 31 タイプ、ローズコートサイド 147 室の配置図付き',
    explorerIntro: (types) =>
      `${types} タイプを、気になる条件で絞り込めます。料金は同じ宿泊日の参考価格なので、タイプ同士の相対関係が比べられます。`,
    explorerFootnote: (positions) =>
      `名称は公式の客室ページに従い、ローズコートサイドは 2026 年 10 月 1 日からの区分です。部屋番号があるのはローズコートサイドだけで、そのサイドの ${positions} 室は 1 室ずつ位置が特定されています。`,
    roomNumberNote: '部屋番号は先頭が階、下 3 桁が位置。出典は 1 室ずつの調査で、著者の推測を含みます。',
  },
  en: {
    hotelName: HOTEL.nameEn,
    titleSuffix: ' room database',
    regionLabel: 'Urayasu, Chiba, Japan',
    databaseLabel: 'Room database',
    heroIntro: (rooms, positions) =>
      `${rooms} room types across both wings with their specs and reference rates, plus a position map for all ${positions} rooms on the Rose Court Side. Keep it open beside the booking page.`,
    pageDescription: (rooms, positions) =>
      `Every one of the ${rooms} room types at the ${HOTEL.nameEn} — area, beds, occupancy, view grade and one day's complete price list — as a filterable list, with a position map showing what each of the ${positions} Rose Court room numbers looks out on.`,
    readArticle: 'Read the full guide first',
    headings: {
      overview: 'At a glance',
      sides: 'Four sides and the Grand Chateau',
      views: 'View grades',
      beds: 'Bed sizes',
    },
    provenance:
      'Room types, areas, beds and floor bands follow the hotel’s official pages. Rates are reference prices per room per night for two adults, compiled from a survey taken the morning bookings opened, which is a secondary source. Actual prices move a great deal by date — confirm in the official booking system.',
    sidesIntro: (rooms) =>
      `The first part of a room name is where it is. The Fantasy Chateau’s ${rooms} rooms are split across four sides, and the side decides which way the window faces, whether there is a view grade at all, and the price. The Grand Chateau is a separate wing and does not use these divisions.`,
    sideMapCaption: 'The hotel’s own room location map.',
    viewsIntro:
      'Whatever sits in brackets after a room name is its view grade; no brackets means no view is guaranteed. The four grades never appear on the same side — Park Grand View and Partial View only on the Springs Side, Park View only on the Rose Court Side.',
    bedsIntro:
      'This hotel has four kinds of extra bed and they differ a great deal in size. A room name only tells you "alcove" or "balcony"; this table tells you who actually fits.',
    articleTeaseHeading: 'Want the reasoning behind these numbers?',
    articleTease:
      'The full guide measures how hard this hotel is to book, explains why Park View is not the best view here, how the Rose Court floor problem turns into a pricing problem, and what the Grand Chateau’s 56 rooms actually buy.',
    databaseNote: '31 room types across both wings, plus 147 Rose Court rooms placed individually',
    explorerIntro: (types) =>
      `${types} room types, filtered by whatever you care about. Prices are all for the same stay date, so the types are comparable against each other.`,
    explorerFootnote: (positions) =>
      `Names follow the hotel’s official pages, with the Rose Court Side using the categories that apply from 1 October 2026. Only the Rose Court Side has room numbers: all ${positions} of its rooms have been placed individually.`,
    roomNumberNote:
      'The first digit of a room number is the floor and the last three fix the position. The source is a room-by-room survey that states it contains its author’s inference.',
  },
};

export const fshCopy = (locale: Locale): FshCopy => ({
  ...COPY[locale],
  sections: SECTION_IDS.map((id, i) => ({ id, label: SECTION_LABELS[locale][i]! })),
});

/** Sections whose content is editorial prose we only publish in Chinese. */
export const CHINESE_ONLY_SECTIONS = ['rates', 'facilities', 'dining', 'benefits', 'faq'];

// ── View models ─────────────────────────────────────────────────────────────

export const roomName = (id: string, fallback: string, locale: Locale): string =>
  locale === 'zh-hant' ? fallback : (ROOM_NAMES[id]?.[locale] ?? fallback);

export const viewSummary = (key: string, fallback: string, locale: Locale): string =>
  locale === 'zh-hant' ? fallback : (VIEW_SUMMARY[locale][key] ?? fallback);

export const viewDetail = (key: string, fallback: string, locale: Locale): string =>
  locale === 'zh-hant' ? fallback : (VIEW_DETAIL[locale][key] ?? fallback);

export const categorySummary = (key: string, fallback: string, locale: Locale): string =>
  locale === 'zh-hant' ? fallback : (CATEGORY_SUMMARY[locale][key] ?? fallback);

export const categoryPerks = (key: string, fallback: string[], locale: Locale): string[] =>
  locale === 'zh-hant' ? fallback : (CATEGORY_PERKS[locale][key] ?? fallback);

const FACT_LABELS: Record<Locale, string[]> = {
  'zh-hant': ['客房總數', '位置', '客房樓層', '入住／退房', '最低參考價', '官方日曆還有房的日期'],
  ja: ['客室数', '立地', '客室階', 'チェックイン／アウト', '参考最低料金', '公式カレンダーで空きのある日'],
  en: [
    'Guest rooms',
    'Location',
    'Guest floors',
    'Check-in / out',
    'Reference lowest rate',
    'Dates still bookable',
  ],
};

const FACT_TEXT: Record<
  Locale,
  {
    inPark: string;
    parkSub: string;
    floors: string;
    wings: (a: number, b: number) => string;
    bothWings: string;
    rateSub: string;
    snapshot: string;
    datesOf: (open: number, total: number) => string;
  }
> = {
  'zh-hant': {
    inPark: '園區裡面',
    parkSub: '東京迪士尼海洋夢幻泉鄉，魔法清泉旁',
    floors: HOTEL.guestFloors,
    wings: (a, b) => `夢幻館 ${a} ＋ 豪華館 ${b}`,
    bothWings: '兩館相同',
    rateSub: `每室每晚・2 位大人・${RATE_SOURCE.stayDateLabel}`,
    snapshot: `${AVAILABILITY_SOURCE.snapshotLabel}的快照`,
    datesOf: (open, total) => `${total} 天裡 ${open} 天`,
  },
  ja: {
    inPark: 'パークの中',
    parkSub: '東京ディズニーシー・ファンタジースプリングス、魔法の泉のほとり',
    floors: '3〜9 階',
    wings: (a, b) => `ファンタジーシャトー ${a} ＋ グランドシャトー ${b}`,
    bothWings: '両シャトー共通',
    rateSub: '1 室 1 泊・大人 2 名・2026 年 10 月 1 日（木）',
    snapshot: '2026 年 8 月 4 日時点',
    datesOf: (open, total) => `${total} 日中 ${open} 日`,
  },
  en: {
    inPark: 'Inside the park',
    parkSub: 'Fantasy Springs, Tokyo DisneySea, beside the magic spring',
    floors: '3rd – 9th floors',
    wings: (a, b) => `${a} Fantasy Chateau + ${b} Grand Chateau`,
    bothWings: 'The same in both wings',
    rateSub: 'Per room per night, two adults, 1 October 2026',
    snapshot: 'Snapshot of 4 August 2026',
    datesOf: (open, total) => `${open} of ${total}`,
  },
};

export function facts(locale: Locale): HotelFact[] {
  const ex = explorer(locale);
  const labels = FACT_LABELS[locale];
  const text = FACT_TEXT[locale];
  return [
    {
      label: labels[0]!,
      value: `${HOTEL.totalRooms}`,
      sub: text.wings(HOTEL.fantasyChateauRooms, HOTEL.grandChateauRooms),
    },
    { label: labels[1]!, value: text.inPark, sub: text.parkSub },
    { label: labels[2]!, value: text.floors, sub: ex.typeCount(ROOMS.length) },
    { label: labels[3]!, value: `${HOTEL.checkIn} / ${HOTEL.checkOut}`, sub: text.bothWings },
    {
      label: labels[4]!,
      value: formatYen(cheapestRoom(ROOMS)!.priceFrom!),
      sub: text.rateSub,
    },
    {
      label: labels[5]!,
      value: text.datesOf(AVAILABILITY_TOTAL.open, AVAILABILITY_TOTAL.dates),
      sub: text.snapshot,
    },
  ];
}

function capacityText(text: string, locale: Locale): string {
  if (locale === 'zh-hant') return text;
  const max = /以 (\d) 位為限/.exec(text)?.[1];
  const share = /含 (\d) 位不佔床/.exec(text)?.[1];
  if (!max) return locale === 'ja' ? '生後 18 か月未満' : 'Under 18 months';
  if (locale === 'ja') return share ? `最大 ${max} 名（うち添い寝 ${share} 名）` : `最大 ${max} 名`;
  return share ? `Up to ${max}, including ${share} sharing` : `Up to ${max}`;
}

export const bedRows = (locale: Locale): BedRow[] =>
  BED_SPECS.map((bed) => ({
    name: locale === 'zh-hant' ? bed.name : (BED_NAMES[locale][bed.name] ?? bed.nameJa),
    ...(locale === 'ja' ? {} : { secondary: bed.nameJa }),
    size: bed.size,
    capacity: capacityText(bed.capacity, locale),
    ...(locale === 'zh-hant' && bed.note ? { note: bed.note } : {}),
  }));

/** Floor bands are stored as Chinese strings like "5～9 樓". */
function floorRange(floors: string | undefined, locale: Locale): string | undefined {
  if (!floors) return undefined;
  if (locale === 'zh-hant') return floors;
  const range = floors.replace(/\s*樓\s*/g, '').trim();
  return locale === 'ja' ? `${range} 階` : `${range}F`;
}

/** Bed composition, rebuilt from the official bed names for the locale. */
function bedSummary(beds: string, locale: Locale): string {
  if (locale === 'zh-hant') return beds;
  const name = (key: string) => BED_NAMES[locale][key] ?? key;
  const parts: string[] = [];
  const regular = /(\d) 張標準床/.exec(beds);
  if (regular) parts.push(`${regular[1]} × ${name('標準床')}`);
  const cruise = /(\d) 張郵輪床/.exec(beds);
  if (cruise) parts.push(`${cruise[1]} × ${name('郵輪床')}`);
  if (/凹室床/.test(beds)) parts.push(`1 × ${name('凹室床')}`);
  if (/推拉床/.test(beds)) parts.push(name('推拉床'));
  return parts.join(locale === 'ja' ? '＋' : ' + ');
}

export function explorerRooms(locale: Locale): ExplorerRoom[] {
  return ROOMS.map((room) => {
    const ref = ROOM_LAYOUTS[room.id];
    const numbers = roseNumbersFor(room.id);
    return {
      id: room.id,
      category: room.category,
      view: room.view,
      capacity: room.capacity,
      size: room.size,
      priceFrom: room.priceFrom,
      alcove: room.alcove,
      balcony: room.balcony,
      lounge: room.lounge,
      breakfast: room.breakfast,
      accessible: room.accessible,
      name: roomName(room.id, room.name, locale),
      ...(locale === 'ja' ? {} : { secondary: room.nameJa }),
      beds: bedSummary(room.beds, locale),
      ...(floorRange(room.floors, locale) ? { floors: floorRange(room.floors, locale)! } : {}),
      ...(locale === 'zh-hant' ? { verdict: room.verdict } : {}),
      ...(locale === 'zh-hant' && room.note ? { note: room.note } : {}),
      ...(ref
        ? {
            layout: {
              src: layoutImageUrl(ref),
              href: layoutPageUrl(ref),
              width: LAYOUT_IMAGE_SIZE.width,
              height: LAYOUT_IMAGE_SIZE.height,
              shared: layoutIsShared(room.id),
            },
          }
        : {}),
      ...(numbers.length > 0
        ? {
            numbers: {
              numbers,
              complete: true,
              note: COPY[locale].roomNumberNote,
            },
          }
        : {}),
    };
  });
}

export const ROSE_POSITIONS = ROSE_ROOM_COUNT;
