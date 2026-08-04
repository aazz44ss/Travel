import type { Locale } from './config';
import type { HotelKey } from './hotel';
import type { Room } from '~/data/hotel';
import { TDH_NAMES } from './rooms-tdh';
import { DHM_NAMES } from './rooms-dhm';
import { FSH_NAMES } from './rooms-fsh';

/**
 * Room, view, category, flag and bed names in each locale, per hotel.
 *
 * Every name here is the hotel's own, read off its Japanese and English room
 * pages rather than translated out of our Chinese, so a reader who searches the
 * official site for "Superior Room (Harbor View)" finds the room we describe.
 * The prose that is ours rather than the hotel's — a view's editorial detail, a
 * category summary — is written per locale instead.
 *
 * Traditional Chinese is the language the datasets are written in, so its maps
 * only carry the keys where a page needs a lookup; anything left empty falls
 * back to the dataset.
 */

export type NameMap = Record<string, { ja: string; en: string }>;
type LocaleMap = Record<Locale, Record<string, string>>;

export interface HotelNames {
  /** Official room names, keyed by our room ids. */
  base: NameMap;
  /** Our own disambiguator for variants the official pages group under one name. */
  qualifiers: NameMap;
  views: LocaleMap;
  viewSummary: LocaleMap;
  viewDetail: LocaleMap;
  categories: LocaleMap;
  categorySummary: LocaleMap;
  categoryPerks: Record<Locale, Record<string, string[]>>;
  flags: LocaleMap;
}

const NAMES: Record<HotelKey, HotelNames> = { tdh: TDH_NAMES, dhm: DHM_NAMES, fsh: FSH_NAMES };

export const names = (hotel: HotelKey): HotelNames => NAMES[hotel];

export function roomName(room: Room, hotel: HotelKey, locale: Locale): string {
  if (locale === 'zh-hant') return room.name;
  const base = NAMES[hotel].base[room.id];
  if (!base) return room.name;
  const qualifier = NAMES[hotel].qualifiers[room.id]?.[locale];
  return qualifier ? `${base[locale]}・${qualifier}` : base[locale];
}

/** The name the hotel itself uses in another language, shown as a secondary line. */
export function roomNameSecondary(room: Room, hotel: HotelKey, locale: Locale): string {
  const base = NAMES[hotel].base[room.id];
  if (locale === 'ja') return base?.en ?? '';
  if (locale === 'en') return base?.ja ?? room.nameJa;
  return room.nameJa;
}

export const viewLabel = (hotel: HotelKey, locale: Locale, key: string): string =>
  NAMES[hotel].views[locale][key] ?? key;

export const categoryLabel = (hotel: HotelKey, locale: Locale, key: string): string =>
  NAMES[hotel].categories[locale][key] ?? key;

export const flagLabel = (hotel: HotelKey, locale: Locale, key: string): string =>
  NAMES[hotel].flags[locale][key] ?? key;

/**
 * Bed names are keyed by the Chinese name in the datasets, which is unique across
 * hotels, so one map covers both.
 */
export const BED_NAMES: Record<Locale, Record<string, string>> = {
  'zh-hant': {},
  ja: {
    標準床: 'レギュラーサイズ',
    '標準床（無障礙設計）': 'レギュラーサイズ（アクセシブル）',
    '標準床（無障礙客房）': 'レギュラーサイズ（アクセシブル）',
    雙人床: 'ダブルサイズ',
    '雙人床（頂樓陽台客房）': 'ダブルサイズ（テラスルーム）',
    '雙人床（皇家套房）': 'ダブルサイズ（イル・マニーフィコ・スイート）',
    '雙人床（無障礙設計）': 'ダブルサイズ（アクセシブル）',
    推拉床: 'トランドルベッド',
    郵輪床: 'クルーズベッド',
    '郵輪床（地中海客房／宮殿中庭客房）': 'クルーズベッド（ハーバールーム、パラッツォパティオルーム）',
    凹室床: 'アルコーヴベッド',
    追加床: 'エキストラベッド',
    'King size 雙人床': 'キングベッド',
    嬰兒床: 'ベビーベッド',
  },
  en: {
    標準床: 'Regular',
    '標準床（無障礙設計）': 'Regular (accessible)',
    '標準床（無障礙客房）': 'Regular (accessible)',
    雙人床: 'Double',
    '雙人床（頂樓陽台客房）': 'Double (Terrace Room)',
    '雙人床（皇家套房）': 'Double (Il Magnifico Suite)',
    '雙人床（無障礙設計）': 'Double (accessible)',
    推拉床: 'Trundle bed',
    郵輪床: 'Cruise bed',
    '郵輪床（地中海客房／宮殿中庭客房）': 'Cruise bed (Harbor Room, Palazzo Patio Room)',
    凹室床: 'Alcove bed',
    追加床: 'Extra bed',
    'King size 雙人床': 'King',
    嬰兒床: 'Crib',
  },
};

export const bedName = (name: string, locale: Locale): string =>
  locale === 'zh-hant' ? name : (BED_NAMES[locale][name] ?? name);

/**
 * Bed composition rebuilt from the official bed names for the locale.
 *
 * The datasets write compositions as Chinese phrases like
 * `2 張標準床 ＋ 推拉床 ＋ 郵輪床`, which are formulaic enough to take apart:
 * a counted bed, then any singles the room adds. Anything the patterns do not
 * recognise is dropped rather than guessed at, so a new phrasing shows up as a
 * missing bed instead of a mistranslation.
 */
export function bedSummary(room: Room, locale: Locale): string {
  if (locale === 'zh-hant') return room.beds;

  const counted: [RegExp, string][] = [
    [/(\d) 張無障礙標準床/, '標準床（無障礙設計）'],
    [/(\d) 張標準床/, '標準床'],
    [/(\d) 張無障礙雙人床/, '雙人床（無障礙設計）'],
    [/(\d) 張頂樓陽台客房專用雙人床/, '雙人床（頂樓陽台客房）'],
    [/(\d) 張皇家套房專用雙人床/, '雙人床（皇家套房）'],
    [/(\d) 張雙人床/, '雙人床'],
    [/(\d) 張凹室床/, '凹室床'],
    [/(\d) 張郵輪床/, '郵輪床'],
  ];

  const parts: string[] = [];
  for (const [pattern, key] of counted) {
    const hit = pattern.exec(room.beds);
    if (hit) parts.push(`${hit[1]} × ${bedName(key, locale)}`);
  }
  if (/King size/.test(room.beds)) parts.push(`1 × ${bedName('King size 雙人床', locale)}`);
  if (/凹室床/.test(room.beds) && !/\d 張凹室床/.test(room.beds))
    parts.push(`1 × ${bedName('凹室床', locale)}`);
  if (/推拉床/.test(room.beds)) parts.push(bedName('推拉床', locale));
  if (/郵輪床/.test(room.beds) && !/\d 張郵輪床/.test(room.beds)) {
    const optional = /可加價/.test(room.beds);
    const cruise = bedName('郵輪床', locale);
    parts.push(optional ? (locale === 'ja' ? `${cruise}（有料）` : `${cruise} (paid extra)`) : cruise);
  }
  if (/追加床/.test(room.beds)) parts.push(bedName('追加床', locale));

  /** Hollywood twin is a layout note on the beds, not another bed. */
  if (/好萊塢雙床/.test(room.beds))
    parts.push(locale === 'ja' ? '（ハリウッドツイン）' : '(Hollywood twin)');

  return parts.join(locale === 'ja' ? '＋' : ' + ');
}

/** Floor ranges are stored as Chinese strings like "3–8 樓". */
export function floorRange(floors: string | undefined, locale: Locale): string {
  if (!floors) return '';
  if (locale === 'zh-hant') return floors;
  const range = floors.replace(/\s*樓\s*/g, '').trim();
  return locale === 'ja' ? `${range} 階` : `${range}F`;
}

export const fieldSeparator = (locale: Locale): string => (locale === 'zh-hant' ? '：' : ': ');
