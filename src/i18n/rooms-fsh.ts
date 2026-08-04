import type { HotelNames } from './rooms';

/**
 * Tokyo DisneySea Fantasy Springs Hotel names, in the hotel's own words.
 *
 * The four sides, the view grades, the room types and the two wings are all read
 * off the hotel's Japanese and English pages, so a reader who searches the
 * official site for "Superior Alcove Room (5th – 9th floors)" finds the room we
 * describe. Traditional Chinese falls back to the dataset, which is written in it.
 */
export const FSH_NAMES: HotelNames = {
  base: {
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
},

  qualifiers: {},

  views: {
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
},

  viewSummary: {
  'zh-hant': {},
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
},

  viewDetail: {
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
},

  categories: {
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
},

  categorySummary: {
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
},

  categoryPerks: {
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
},

  flags: {
    'zh-hant': {},
    ja: {
      alcove: 'アルコーヴベッド',
      balcony: 'バルコニーまたはテラス',
      lounge: '専用ラウンジ',
      accessible: 'アクセシブル',
    },
    en: {
      alcove: 'Alcove bed',
      balcony: 'Balcony or terrace',
      lounge: 'Private lounge',
      accessible: 'Accessible',
    },
  },
};
