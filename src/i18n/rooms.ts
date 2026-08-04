import type { Locale } from './config';
import { ROOMS } from '~/data/tokyo-disneyland-hotel';
import type { Room } from '~/data/hotel-schema';

/**
 * Room, view, category and bed names in each locale.
 *
 * These are the hotel's own words, read off its Japanese and English room pages,
 * not translations of our Chinese. A reader who searches the official site for
 * "Superior Alcove Room (Park Grand View)" finds the same room we describe.
 *
 * The official pages list 27 names while we track 38 types, because one official
 * name can cover two bed or occupancy variants. Our qualifier is appended after
 * a separator so the official part of the name stays intact.
 */

/** Official base names per official room page, keyed by our room ids. */
const BASE_NAMES: Record<string, { ja: string; en: string }> = {
  'std-superior-double': { ja: 'スーペリアルーム', en: 'Superior Room' },
  'std-superior-twin': { ja: 'スーペリアルーム', en: 'Superior Room' },
  'std-superior-pv': { ja: 'スーペリアルーム（パークビュー）', en: 'Superior Room (Park View)' },
  'std-superior-pgv-double': {
    ja: 'スーペリアルーム（パークグランドビュー）',
    en: 'Superior Room (Park Grand View)',
  },
  'std-superior-pgv-twin': {
    ja: 'スーペリアルーム（パークグランドビュー）',
    en: 'Superior Room (Park Grand View)',
  },
  'std-alcove': { ja: 'スーペリアアルコーヴルーム', en: 'Superior Alcove Room' },
  'std-alcove-pv': {
    ja: 'スーペリアアルコーヴルーム（パークビュー）',
    en: 'Superior Alcove Room (Park View)',
  },
  'std-alcove-pgv': {
    ja: 'スーペリアアルコーヴルーム（パークグランドビュー）',
    en: 'Superior Alcove Room (Park Grand View)',
  },
  'std-deluxe-twin': { ja: 'デラックスルーム', en: 'Deluxe Room' },
  'std-deluxe-double': { ja: 'デラックスルーム', en: 'Deluxe Room' },
  'std-deluxe-quad': { ja: 'デラックスルーム', en: 'Deluxe Room' },
  'std-deluxe-accessible': {
    ja: 'デラックスルーム（アクセシブル）',
    en: 'Deluxe Room (Accessible)',
  },
  'std-corner': { ja: 'コーナールーム', en: 'Corner Room' },
  'std-corner-pv': { ja: 'コーナールーム（パークビュー）', en: 'Corner Room (Park View)' },
  'std-junior-family': { ja: 'ジュニアファミリールーム', en: 'Junior Family Room' },
  'std-junior-family-pv': {
    ja: 'ジュニアファミリールーム（パークビュー）',
    en: 'Junior Family Room (Park View)',
  },
  'std-family-pv': { ja: 'ファミリールーム（パークビュー）', en: 'Family Room (Park View)' },
  'char-tinkerbell-3': { ja: 'ティンカーベルルーム', en: "Disney's Tinker Bell Room" },
  'char-tinkerbell-4': { ja: 'ティンカーベルルーム', en: "Disney's Tinker Bell Room" },
  'char-alice': { ja: '不思議の国のアリスルーム', en: "Disney's Alice in Wonderland Room" },
  'char-alice-alcove': { ja: '不思議の国のアリスルーム', en: "Disney's Alice in Wonderland Room" },
  'char-beast-twin-51': { ja: '美女と野獣ルーム', en: "Disney's Beauty and the Beast Room" },
  'char-beast-alcove-51': { ja: '美女と野獣ルーム', en: "Disney's Beauty and the Beast Room" },
  'char-beast-twin-61': { ja: '美女と野獣ルーム', en: "Disney's Beauty and the Beast Room" },
  'char-beast-triple-61': { ja: '美女と野獣ルーム', en: "Disney's Beauty and the Beast Room" },
  'char-cinderella': { ja: 'シンデレラルーム', en: "Disney's Cinderella Room" },
  'conc-superior-pv': {
    ja: 'コンシェルジュ スーペリアルーム（パークビュー）',
    en: 'Concierge Superior Room (Park View)',
  },
  'conc-superior-pgv': {
    ja: 'コンシェルジュ スーペリアルーム（パークグランドビュー）',
    en: 'Concierge Superior Room (Park Grand View)',
  },
  'conc-alcove-pgv': {
    ja: 'コンシェルジュ スーペリアアルコーヴルーム（パークグランドビュー）',
    en: 'Concierge Superior Alcove Room (Park Grand View)',
  },
  'conc-deluxe-pv': {
    ja: 'コンシェルジュ デラックスルーム（パークビュー）',
    en: 'Concierge Deluxe Room (Park View)',
  },
  'conc-balcony-pgv': {
    ja: 'コンシェルジュ バルコニールーム（パークグランドビュー）',
    en: 'Concierge Balcony Room (Park Grand View)',
  },
  'conc-balcony-alcove-pgv': {
    ja: 'コンシェルジュ バルコニーアルコーヴルーム（パークグランドビュー）',
    en: 'Concierge Balcony Alcove Room (Park Grand View)',
  },
  'conc-turret-twin': { ja: 'コンシェルジュ タレットルーム', en: 'Concierge Turret Room' },
  'conc-turret-double': { ja: 'コンシェルジュ タレットルーム', en: 'Concierge Turret Room' },
  'conc-cinderella': {
    ja: 'コンシェルジュ ディズニーシンデレラルーム',
    en: "Concierge Disney's Cinderella Room",
  },
  'suite-magic-kingdom-8f': {
    ja: 'ディズニー・マジックキングダム・スイート',
    en: "Disney's Magic Kingdom Suite",
  },
  'suite-magic-kingdom-9f': {
    ja: 'ディズニー・マジックキングダム・スイート',
    en: "Disney's Magic Kingdom Suite",
  },
  'suite-walt-disney': { ja: 'ウォルト・ディズニー・スイート', en: 'Walt Disney Suite' },
};

/** Our own disambiguator for variants the official pages group under one name. */
const QUALIFIERS: Record<string, { ja: string; en: string }> = {
  'std-superior-double': { ja: 'ダブルベッド 1 台', en: '1 double bed' },
  'std-superior-twin': { ja: 'レギュラーベッド 2 台', en: '2 regular beds' },
  'std-superior-pgv-double': { ja: 'ダブルベッド 1 台', en: '1 double bed' },
  'std-superior-pgv-twin': { ja: 'レギュラーベッド 2 台', en: '2 regular beds' },
  'std-deluxe-twin': { ja: 'レギュラーベッド 2 台', en: '2 regular beds' },
  'std-deluxe-double': { ja: 'ダブルベッド 1 台', en: '1 double bed' },
  'std-deluxe-quad': { ja: '4 名', en: '4 guests' },
  'char-tinkerbell-3': { ja: '3 名', en: '3 guests' },
  'char-tinkerbell-4': { ja: '4 名＋アルコーヴベッド', en: '4 guests with alcove bed' },
  'char-alice-alcove': { ja: 'アルコーヴベッドあり', en: 'with alcove bed' },
  'char-beast-twin-51': { ja: 'レギュラーベッド 2 台 51 m²', en: '2 regular beds, 51 m²' },
  'char-beast-alcove-51': {
    ja: 'レギュラーベッド 2 台＋アルコーヴベッド 51 m²',
    en: '2 regular beds plus alcove, 51 m²',
  },
  'char-beast-twin-61': { ja: 'レギュラーベッド 2 台 61 m²', en: '2 regular beds, 61 m²' },
  'char-beast-triple-61': { ja: 'レギュラーベッド 3 台 61 m²', en: '3 regular beds, 61 m²' },
  'conc-turret-twin': { ja: 'レギュラーベッド 2 台', en: '2 regular beds' },
  'conc-turret-double': { ja: 'ダブルベッド 1 台', en: '1 double bed' },
  'suite-magic-kingdom-8f': { ja: '8 階', en: '8th floor' },
  'suite-magic-kingdom-9f': { ja: '9 階', en: '9th floor' },
};

export function roomName(room: Room, locale: Locale): string {
  if (locale === 'zh-hant') return room.name;
  const base = BASE_NAMES[room.id];
  if (!base) return room.name;
  const qualifier = QUALIFIERS[room.id]?.[locale];
  return qualifier ? `${base[locale]}・${qualifier}` : base[locale];
}

/** The name the hotel itself uses, shown as a secondary line. */
export function roomNameSecondary(room: Room, locale: Locale): string {
  if (locale === 'ja') return BASE_NAMES[room.id]?.en ?? '';
  if (locale === 'en') return BASE_NAMES[room.id]?.ja ?? room.nameJa;
  return room.nameJa;
}

export const VIEW_LABELS: Record<Locale, Record<string, string>> = {
  'zh-hant': { grand: '樂園全景觀', park: '樂園景觀', none: '無景觀指定' },
  ja: { grand: 'パークグランドビュー', park: 'パークビュー', none: '眺望指定なし' },
  en: { grand: 'Park Grand View', park: 'Park View', none: 'No view grade' },
};

export const VIEW_SUMMARY: Record<Locale, Record<string, string>> = {
  'zh-hant': { grand: '正面對著東京迪士尼樂園', park: '看得到樂園，但角度是斜的', none: '面向中庭、正門或飯店側面' },
  ja: {
    grand: '東京ディズニーランドを正面に望む',
    park: 'パークは見えるが角度は斜め',
    none: '中庭・正面エントランス・建物側面',
  },
  en: {
    grand: 'Faces Tokyo Disneyland head on',
    park: 'Sees the park, but at an angle',
    none: 'Faces the courtyard, entrance or side',
  },
};

export const VIEW_DETAIL: Record<Locale, Record<string, string>> = {
  'zh-hant': {
    grand: '',
    park: '',
    none: '',
  },
  ja: {
    grand:
      '公式の定義は「東京ディズニーランドを正面に望める客室」。窓の外は手前からディズニーリゾートライン、ワールドバザールの屋根、シンデレラ城。すべて 5 階以上にあります。',
    park: '公式の定義は「東京ディズニーランドを望める客室」。パークグランドビューより側面寄りで、城は斜め前方に見えます。差額はおよそ 8,500 円で、現実的な選択です。',
    none: '眺望の表記がないタイプは、窓の外がアリスの庭、ファンタジア広場、中庭、駐車場側などです。客室の仕様は同格の眺望付きと同じで、違うのは窓の外だけ。客室から花火を見たいならこのカテゴリーは外してください。',
  },
  en: {
    grand:
      'Officially "a guest room from which Tokyo Disneyland can be viewed from the front". Looking out you get the Disney Resort Line, the World Bazaar roofs and Cinderella Castle, in that order. Every room in this grade is on the 5th floor or above.',
    park: 'Officially "a guest room from which Tokyo Disneyland can be viewed", set further round to the side, with the castle off to one side of the frame. About ¥8,500 cheaper than the frontal grade, which makes it the pragmatic choice.',
    none: 'Rooms with no view grade look onto the Alice garden, Fantasia Plaza, the courtyard or the car park side. The room itself matches its view-graded equivalent; only the window differs. If you want fireworks from the room, rule this category out.',
  },
};

export const CATEGORY_LABELS: Record<Locale, Record<string, string>> = {
  'zh-hant': { standard: '標準房', character: '迪士尼明星房', concierge: '禮賓房', suite: '套房' },
  ja: { standard: 'スタンダード', character: 'ディズニーキャラクタールーム', concierge: 'コンシェルジュ', suite: 'スイート' },
  en: { standard: 'Standard', character: 'Character', concierge: 'Concierge', suite: 'Suite' },
};

export const CATEGORY_SUMMARY: Record<Locale, Record<string, string>> = {
  'zh-hant': {
    standard: '飯店的主力房型，從最基本的精緻客房到 93 平方公尺的家庭客房都在這一層。',
    character: '四部電影主題的整體改裝客房，從壁紙、床頭板到備品全部換過一輪。',
    concierge: '含專用貴賓室（馬瑟林廳）與翌日早餐，在專屬櫃檯辦理入住。',
    suite: '飯店最頂端的兩種房型，位在 8～9 樓，含貴賓室與早餐。',
  },
  ja: {
    standard: 'ホテルの主力。もっとも基本のスーペリアから 93 m² のファミリールームまでがこの層です。',
    character: '映画 4 作品をテーマにした全面改装。壁紙からヘッドボード、アメニティまで入れ替わっています。',
    concierge: '専用ラウンジ「マーセリンサロン」と翌日の朝食つき。専用カウンターでチェックインします。',
    suite: '最上位の 2 タイプ。8〜9 階に位置し、ラウンジと朝食が含まれます。',
  },
  en: {
    standard:
      'The bulk of the hotel, from the most basic Superior room up to the 93 m² Family Room.',
    character:
      'Full refits themed to four films — wallpaper, headboards and amenities all changed.',
    concierge:
      'Includes the private Marceline Salon lounge and next-day breakfast, with check-in at a dedicated desk.',
    suite: 'The hotel’s top two room types, on floors 8 and 9, with lounge access and breakfast.',
  },
};

export const CATEGORY_PERKS: Record<Locale, Record<string, string[]>> = {
  'zh-hant': {
    standard: ['房間面向樂園側', '可加選樂園景觀／樂園全景觀', '早餐需另外付費'],
    character: ['四種電影主題', '房間面向飯店正門側', '沒有景觀標註'],
    concierge: ['專用貴賓室', '含翌日早餐', '專屬入住櫃檯', '幾乎都是樂園景觀以上'],
    suite: ['99～235 平方公尺', '含貴賓室與早餐', '可選擇客房送餐服務'],
  },
  ja: {
    standard: ['客室はパーク側', 'パークビュー／グランドビューを選択可', '朝食は別料金'],
    character: ['映画 4 作品のテーマ', '客室は正面エントランス側', '眺望の表記なし'],
    concierge: ['専用ラウンジ', '翌日の朝食つき', '専用チェックインカウンター', 'ほぼパークビュー以上'],
    suite: ['99〜235 m²', 'ラウンジと朝食つき', 'ルームサービス可'],
  },
  en: {
    standard: ['Rooms on the park side', 'Park View or Park Grand View available', 'Breakfast extra'],
    character: ['Four film themes', 'Rooms on the main entrance side', 'No view grade'],
    concierge: ['Private lounge', 'Next-day breakfast', 'Dedicated check-in desk', 'Almost all Park View or better'],
    suite: ['99 to 235 m²', 'Lounge and breakfast included', 'Room service available'],
  },
};

export const BED_NAMES: Record<Locale, Record<string, string>> = {
  'zh-hant': {},
  ja: {
    標準床: 'レギュラーサイズ',
    '標準床（無障礙設計）': 'レギュラーサイズ（アクセシブル）',
    雙人床: 'ダブルサイズ',
    推拉床: 'トランドルベッド',
    郵輪床: 'クルーズベッド',
    凹室床: 'アルコーヴベッド',
    'King size 雙人床': 'キングベッド',
    嬰兒床: 'ベビーベッド',
  },
  en: {
    標準床: 'Regular',
    '標準床（無障礙設計）': 'Regular (accessible)',
    雙人床: 'Double',
    推拉床: 'Trundle bed',
    郵輪床: 'Cruise bed',
    凹室床: 'Alcove bed',
    'King size 雙人床': 'King',
    嬰兒床: 'Crib',
  },
};

export const bedName = (name: string, locale: Locale): string =>
  locale === 'zh-hant' ? name : (BED_NAMES[locale][name] ?? name);

/** Bed composition rendered from the official bed names for the locale. */
export function bedSummary(room: Room, locale: Locale): string {
  if (locale === 'zh-hant') return room.beds;
  const counts: [RegExp, string][] = [
    [/(\d) 張無障礙標準床/, '標準床（無障礙設計）'],
    [/(\d) 張標準床/, '標準床'],
    [/(\d) 張雙人床/, '雙人床'],
    [/(\d) 張凹室床/, '凹室床'],
  ];
  const parts: string[] = [];
  for (const [pattern, key] of counts) {
    const hit = pattern.exec(room.beds);
    if (hit) parts.push(`${hit[1]} × ${bedName(key, locale)}`);
  }
  if (/King size/.test(room.beds)) parts.push(`1 × ${bedName('King size 雙人床', locale)}`);
  if (/凹室床/.test(room.beds) && !/\d 張凹室床/.test(room.beds))
    parts.push(`1 × ${bedName('凹室床', locale)}`);
  if (/推拉床/.test(room.beds)) parts.push(bedName('推拉床', locale));
  if (/郵輪床/.test(room.beds)) {
    const optional = /可加價/.test(room.beds);
    const cruise = bedName('郵輪床', locale);
    parts.push(optional ? (locale === 'ja' ? `${cruise}（有料）` : `${cruise} (paid extra)`) : cruise);
  }
  return parts.join(locale === 'ja' ? '＋' : ' + ');
}

/** Room types with no monthly rate data, named for the locale. */
export const localizedRooms = (locale: Locale) =>
  ROOMS.map((room) => ({ ...room, localName: roomName(room, locale) }));

/** Floor ranges are stored as Chinese strings like "3–8 樓". */
export function floorRange(floors: string | undefined, locale: Locale): string {
  if (!floors) return '';
  if (locale === 'zh-hant') return floors;
  const range = floors.replace(/\s*樓\s*/g, '').trim();
  return locale === 'ja' ? `${range} 階` : `${range}F`;
}

export const fieldSeparator = (locale: Locale): string => (locale === 'zh-hant' ? '：' : ': ');
