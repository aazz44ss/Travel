/**
 * Tokyo DisneySea Fantasy Springs Hotel room database.
 *
 * Room names, areas, capacities, floor bands and bed configurations follow the
 * official Traditional Chinese guest-room pages for both wings. Where this file
 * adds a qualifier the official name does not have, it goes after a 「・」 so the
 * two are always distinguishable.
 *
 * The Rose Court Side categories are the ones that apply to stays from
 * 2026-10-01, when the Superior and Superior Alcove types split into a lower
 * (3–4F) and an upper band. The official site still lists the single undivided
 * category for stays up to 2026-09-30, but that period is almost entirely sold
 * out — see AVAILABILITY in `./fsh-rates` — so listing it would add two cards
 * nobody can book.
 *
 * Rates are secondary and dated; the reasoning is in `./fsh-rates`. The Grand
 * Chateau has none because neither the official site nor any dated survey
 * publishes a per-type figure for it.
 */

import type {
  BedSpec,
  Benefit,
  Dining,
  Facility,
  Faq,
  Room,
  RoomCategory,
  RoomFlag,
  RoomView,
} from '~/data/hotel';
import { rateFor } from '~/data/fsh-rates';

export const HOTEL = {
  name: '東京迪士尼海洋夢幻泉鄉大飯店',
  nameJa: '東京ディズニーシー・ファンタジースプリングスホテル',
  nameEn: 'Tokyo DisneySea Fantasy Springs Hotel',
  opened: 2024,
  totalRooms: 475,
  fantasyChateauRooms: 419,
  grandChateauRooms: 56,
  guestFloors: '3～9 樓',
  style: '以夢幻泉鄉的動植物與神奇清泉為設計主題',
  checkIn: '15:00',
  checkOut: '12:00',
  slug: 'fantasy-springs-hotel',
  region: '千葉縣',
  locality: '浦安市',
  /** Yen per TWD, rounded, used only for rough conversions in the UI. */
  jpyPerTwd: 4.7,
  officialUrl: 'https://www.tokyodisneyresort.jp/tc/hotel/fsh.html',
  rooms: {
    'zh-hant': 'https://www.tokyodisneyresort.jp/tc/hotel/fsh/fcu/room.html',
    ja: 'https://www.tokyodisneyresort.jp/hotel/fsh/fcu/room.html',
    en: 'https://www.tokyodisneyresort.jp/en/hotel/fsh/fcu/room.html',
  },
  /**
   * The official side map, hotlinked rather than redrawn. The hotel publishes one
   * per language; the unsuffixed file is the Japanese one.
   */
  sideMap: {
    'zh-hant': 'https://media2.tokyodisneyresort.jp/home/hotel/fsh/room/fsh_room_map_tc.jpg',
    ja: 'https://media2.tokyodisneyresort.jp/home/hotel/fsh/room/fsh_room_map.jpg',
    en: 'https://media2.tokyodisneyresort.jp/home/hotel/fsh/room/fsh_room_map_en.jpg',
  },
  sideMapSize: { width: 800, height: 450 },
} as const;

export const VIEWS: RoomView[] = [
  {
    key: 'grand',
    label: '樂園全景觀',
    labelJa: 'パークグランドビュー',
    labelEn: 'Park Grand View',
    summary: '正面對著夢幻泉鄉',
    detail:
      '官方定義是「可由正面瞭望夢幻泉鄉的客房」。只出現在泉鄉區，也就是直接面向園區的那一側。這一級的房型全部是 50 m² 的尊爵客房，也是夢幻館價格最高的一批。',
  },
  {
    key: 'park',
    label: '樂園景觀',
    labelJa: 'パークビュー',
    labelEn: 'Park View',
    summary: '看得到園區，但隔著中庭',
    detail:
      '官方定義是「可瞭望夢幻泉鄉的客房」。只出現在玫瑰庭區，集中在朝園區那一面的 6～9 樓。看得到的是隔著中庭的園區遠景，普羅米修斯火山在正中間；價差是同區上層階再加一萬日圓。',
  },
  {
    key: 'partial',
    label: '景隅景觀',
    labelJa: 'パーシャルビュー',
    labelEn: 'Partial View',
    summary: '朝著園區，但被建築物擋住',
    detail:
      '官方繁中的定義是「可瞭望夢幻泉鄉的客房，但部分視野會受到建築物阻擋」。同一句話的日文版更重：寫的是視線「幾乎」被建築物的牆與屋頂遮住。位置在泉鄉區，房間規格和樂園全景觀完全一樣，便宜的是窗外。',
  },
  {
    key: 'none',
    label: '無景觀指定',
    labelJa: '眺望指定なし',
    labelEn: 'No view designation',
    summary: '灣岸區、飯店入口區，以及玫瑰庭區未分級的房型',
    detail:
      '沒有標註景觀等級的房型，窗外可能是公認飯店那一側、飯店正門，或是中庭。房間本身和同區的景觀房規格相同。玫瑰庭區的 3～4 樓另外註明「視野會受到造景樹木阻擋」——這句話是官方寫在房名旁邊的。',
  },
  {
    key: 'allpark',
    label: '豪華館：全房面向園區',
    labelJa: '（等級指定なし）',
    labelEn: '(no tier assigned)',
    summary: '沒有分級，因為 56 間都一樣',
    detail:
      '這一格不是官方分級，是本站為了讓篩選器完整而補的。官方沒有給豪華館的客房標註景觀等級，原因寫在客房頁上：56 間客房「皆設有陽台且面向夢幻泉鄉」，沒有需要區分的等級。',
  },
];

export const CATEGORIES: RoomCategory[] = [
  {
    key: 'springs',
    label: '泉鄉區',
    labelEn: 'Springs Side',
    summary: '夢幻館裡直接面向夢幻泉鄉的一側，也是唯一有樂園全景觀與陽台的一側。',
    perks: ['50 m²', '人數上限 5 位', '樂園全景觀／景隅景觀', '部分房型有陽台'],
  },
  {
    key: 'rose',
    label: '玫瑰庭區',
    labelEn: 'Rose Court Side',
    summary:
      '三面圍住中庭「玫瑰庭」，是夢幻館唯一有樂園景觀的一側，也是唯一按樓層分價的一側。',
    perks: ['41／48 m²', '樂園景觀集中在 6～9 樓', '3～4 樓另立較便宜的分類'],
  },
  {
    key: 'bay',
    label: '灣岸區',
    labelEn: 'Bay Area Side',
    summary: '朝東京迪士尼度假區公認飯店那一側。沒有景觀分級，價位是這間飯店的下限。',
    perks: ['41／48 m²', '無景觀指定', '與飯店入口區同價'],
  },
  {
    key: 'entrance',
    label: '飯店入口區',
    labelEn: 'Hotel Entrance Side',
    summary: '朝飯店正門那一側。規格與價位和灣岸區一樣，差別只有窗外。',
    perks: ['41／48 m²', '無景觀指定', '與灣岸區同價'],
  },
  {
    key: 'grand',
    label: '豪華館',
    labelEn: 'Grand Chateau',
    summary:
      '56 間客房的獨立館別，全房面向園區且有陽台或露台。房價本身包含 8 張遊樂設施體驗券與 4 張娛樂表演觀賞券。',
    perks: ['70／100 m²', '專用接待廳與園區通路', '專屬法式餐廳', '房價含園區體驗券'],
  },
];

export const FLAGS: RoomFlag[] = [
  { key: 'alcove', label: '凹室床', badge: true, filter: true },
  { key: 'balcony', label: '陽台或露台', badge: true, filter: true },
  { key: 'lounge', label: '專用接待廳', badge: true },
  { key: 'accessible', label: '無障礙', badge: true },
];

const SUPERIOR_BEDS = '2 張標準床、1 張推拉床、1 張郵輪床';
const ALCOVE_BEDS = '2 張標準床、1 張推拉床、1 張凹室床';
const SPRINGS_ALCOVE_BEDS = '2 張標準床、1 張推拉床、1 張凹室床、1 張郵輪床';
const ACCESSIBLE_BEDS = '2 張標準床';
const GC_ALCOVE_BEDS = '2 張標準床、1 張凹室床，以及 1 張推拉床或 1 張郵輪床';

export const ROOMS: Room[] = [
  // ── 泉鄉區 ───────────────────────────────────────────────────────────────
  {
    id: 'springs-balcony-alcove-grand',
    name: '泉鄉區 附陽台＆凹室尊爵客房（樂園全景觀）',
    nameJa: 'スプリングスサイド デラックス・バルコニー＆アルコーヴルーム（パークグランドビュー）',
    category: 'springs',
    view: 'grand',
    capacity: 5,
    coSleepers: 2,
    beds: SPRINGS_ALCOVE_BEDS,
    size: '50',
    sizeValue: 50,
    priceFrom: rateFor('springs-balcony-alcove-grand'),
    flags: ['alcove', 'balcony'],
    verdict: '和只有陽台的那一格同價，多一張凹室床。五個人要住進一間房的話，這是夢幻館的答案。',
  },
  {
    id: 'springs-balcony-grand',
    name: '泉鄉區 附陽台尊爵客房（樂園全景觀）',
    nameJa: 'スプリングスサイド デラックス・バルコニールーム（パークグランドビュー）',
    category: 'springs',
    view: 'grand',
    capacity: 5,
    coSleepers: 2,
    beds: '2 張標準床、1 張推拉床、2 張郵輪床',
    size: '50',
    sizeValue: 50,
    priceFrom: rateFor('springs-balcony-grand'),
    flags: ['balcony'],
    verdict: '正面全景加陽台，夢幻館的價格天花板。能走到戶外看園區的房型只有這一格和上一格。',
  },
  {
    id: 'springs-alcove-grand',
    name: '泉鄉區 附凹室尊爵客房（樂園全景觀）',
    nameJa: 'スプリングスサイド デラックス・アルコーヴルーム（パークグランドビュー）',
    category: 'springs',
    view: 'grand',
    capacity: 5,
    coSleepers: 2,
    beds: SPRINGS_ALCOVE_BEDS,
    size: '50',
    sizeValue: 50,
    priceFrom: rateFor('springs-alcove-grand'),
    flags: ['alcove'],
    verdict: '樂園全景觀裡最便宜的一格，比有陽台的便宜一萬日圓。看得到的東西一樣，只是走不出去。',
  },
  {
    id: 'springs-alcove-partial',
    name: '泉鄉區 附凹室尊爵客房（景隅景觀）',
    nameJa: 'スプリングスサイド デラックス・アルコーヴルーム（パーシャルビュー）',
    category: 'springs',
    view: 'partial',
    capacity: 5,
    coSleepers: 2,
    beds: SPRINGS_ALCOVE_BEDS,
    size: '50',
    sizeValue: 50,
    priceFrom: rateFor('springs-alcove-partial'),
    flags: ['alcove'],
    verdict:
      '房間規格和樂園全景觀一模一樣，便宜一萬二日圓，代價是官方直接告訴你視野會被建築物擋掉一部分。',
  },
  {
    id: 'springs-access-partial',
    name: '泉鄉區 尊爵無障礙客房（景隅景觀）',
    nameJa: 'スプリングスサイド デラックス・アクセシブルルーム（パーシャルビュー）',
    category: 'springs',
    view: 'partial',
    capacity: 3,
    coSleepers: 2,
    beds: ACCESSIBLE_BEDS,
    size: '50',
    sizeValue: 50,
    priceFrom: rateFor('springs-access-partial'),
    flags: ['accessible'],
    verdict: '泉鄉區最便宜的一格，而且是 50 平方公尺。人數上限 3 位。',
  },

  // ── 玫瑰庭區 ─────────────────────────────────────────────────────────────
  {
    id: 'rose-deluxe-access-park',
    name: '玫瑰庭區 尊爵無障礙客房（樂園景觀）',
    nameJa: 'ローズコートサイド デラックス・アクセシブルルーム（パークビュー）',
    category: 'rose',
    view: 'park',
    capacity: 3,
    coSleepers: 2,
    beds: ACCESSIBLE_BEDS,
    size: '48',
    sizeValue: 48,
    priceFrom: rateFor('rose-deluxe-access-park'),
    flags: ['accessible'],
    verdict:
      '2026 年 10 月新增的分類，比同款沒有景觀的版本只貴 2,500 日圓——玫瑰庭區其他樂園景觀的價差是一萬。',
    note: '官方沒有公布這一間在幾樓。位置圖顯示這一側只有兩間無障礙客房，分別在 5 樓與 8 樓。',
  },
  {
    id: 'rose-superior-park',
    name: '玫瑰庭區 精緻客房（樂園景觀）',
    nameJa: 'ローズコートサイド スーペリアルーム（パークビュー）',
    category: 'rose',
    view: 'park',
    capacity: 4,
    coSleepers: 2,
    beds: SUPERIOR_BEDS,
    size: '41',
    sizeValue: 41,
    priceFrom: rateFor('rose-superior-park'),
    flags: [],
    verdict: '這一分類只有 4 間，全部在同一直排的 6 到 9 樓。想要沙發不要凹室床的話只有這一格。',
  },
  {
    id: 'rose-alcove-park',
    name: '玫瑰庭區 附凹室精緻客房（樂園景觀）',
    nameJa: 'ローズコートサイド スーペリア・アルコーヴルーム（パークビュー）',
    category: 'rose',
    view: 'park',
    capacity: 4,
    coSleepers: 2,
    beds: ALCOVE_BEDS,
    size: '41',
    sizeValue: 41,
    priceFrom: rateFor('rose-alcove-park'),
    flags: ['alcove'],
    verdict:
      '和上一格同價，房間數多五倍，是樂園景觀的預設選擇。同一分類裡越靠左的房號看到的園區越多。',
  },
  {
    id: 'rose-deluxe',
    name: '玫瑰庭區 尊爵客房',
    nameJa: 'ローズコートサイド デラックスルーム',
    category: 'rose',
    view: 'none',
    capacity: 4,
    coSleepers: 2,
    beds: SUPERIOR_BEDS,
    size: '48',
    sizeValue: 48,
    priceFrom: rateFor('rose-deluxe'),
    flags: [],
    verdict: '和樂園景觀同價，但買的是 7 平方公尺而不是窗外。中庭那一側最容易後悔的一格。',
  },
  {
    id: 'rose-deluxe-access',
    name: '玫瑰庭區 尊爵無障礙客房',
    nameJa: 'ローズコートサイド デラックス・アクセシブルルーム',
    category: 'rose',
    view: 'none',
    capacity: 3,
    coSleepers: 2,
    beds: ACCESSIBLE_BEDS,
    size: '48',
    sizeValue: 48,
    priceFrom: rateFor('rose-deluxe-access'),
    flags: ['accessible'],
    verdict: '48 平方公尺的無障礙房型，和同區的尊爵客房同價。',
  },
  {
    id: 'rose-superior-high',
    name: '玫瑰庭區 精緻客房（5～7 樓）',
    nameJa: 'ローズコートサイド スーペリアルーム（5-7階）',
    category: 'rose',
    view: 'none',
    capacity: 4,
    coSleepers: 2,
    beds: SUPERIOR_BEDS,
    size: '41',
    sizeValue: 41,
    priceFrom: rateFor('rose-superior-high'),
    floors: '5～7 樓',
    flags: [],
    verdict: '比 3～4 樓貴 2,500 日圓，買到的是「窗外不會是樹」。中庭側最務實的一格。',
  },
  {
    id: 'rose-alcove-high',
    name: '玫瑰庭區 附凹室精緻客房（5～9 樓）',
    nameJa: 'ローズコートサイド スーペリア・アルコーヴルーム（5-9階）',
    category: 'rose',
    view: 'none',
    capacity: 4,
    coSleepers: 2,
    beds: ALCOVE_BEDS,
    size: '41',
    sizeValue: 41,
    priceFrom: rateFor('rose-alcove-high'),
    floors: '5～9 樓',
    flags: ['alcove'],
    verdict:
      '玫瑰庭區房間數最多的一格，樓層範圍也比精緻客房多兩層。有機會分到斜看得到艾倫戴爾城堡的那一面。',
  },
  {
    id: 'rose-superior-low',
    name: '玫瑰庭區 精緻客房（3～4 樓）',
    nameJa: 'ローズコートサイド スーペリアルーム（3-4階）',
    category: 'rose',
    view: 'none',
    capacity: 4,
    coSleepers: 2,
    beds: SUPERIOR_BEDS,
    size: '41',
    sizeValue: 41,
    priceFrom: rateFor('rose-superior-low'),
    floors: '3～4 樓',
    flags: [],
    verdict: '價格被壓到和灣岸區、飯店入口區同一格。窗外是中庭的植栽，但你事先就知道。',
    note: '官方在房名旁邊註明：「本客房視野會受到造景樹木阻擋。」',
  },
  {
    id: 'rose-alcove-low',
    name: '玫瑰庭區 附凹室精緻客房（3～4 樓）',
    nameJa: 'ローズコートサイド スーペリア・アルコーヴルーム（3-4階）',
    category: 'rose',
    view: 'none',
    capacity: 4,
    coSleepers: 2,
    beds: ALCOVE_BEDS,
    size: '41',
    sizeValue: 41,
    priceFrom: rateFor('rose-alcove-low'),
    floors: '3～4 樓',
    flags: ['alcove'],
    verdict: '和上一格同價，多一張凹室床。整間飯店最便宜的並列第一。',
    note: '官方在房名旁邊註明：「本客房視野會受到造景樹木阻擋。」',
  },

  // ── 灣岸區 ───────────────────────────────────────────────────────────────
  {
    id: 'bay-deluxe',
    name: '灣岸區 尊爵客房',
    nameJa: 'ベイエリアサイド デラックスルーム',
    category: 'bay',
    view: 'none',
    capacity: 4,
    coSleepers: 2,
    beds: SUPERIOR_BEDS,
    size: '48',
    sizeValue: 48,
    priceFrom: rateFor('bay-deluxe'),
    flags: [],
    verdict: '比同區的精緻客房多 7 平方公尺、貴一萬日圓。窗外完全一樣。',
  },
  {
    id: 'bay-deluxe-access',
    name: '灣岸區 尊爵無障礙客房',
    nameJa: 'ベイエリアサイド デラックス・アクセシブルルーム',
    category: 'bay',
    view: 'none',
    capacity: 3,
    coSleepers: 2,
    beds: ACCESSIBLE_BEDS,
    size: '48',
    sizeValue: 48,
    priceFrom: rateFor('bay-deluxe-access'),
    flags: ['accessible'],
    verdict: '48 平方公尺的無障礙房型。玫瑰庭區與泉鄉區也各有一種無障礙客房可以比。',
  },
  {
    id: 'bay-superior',
    name: '灣岸區 精緻客房',
    nameJa: 'ベイエリアサイド スーペリアルーム',
    category: 'bay',
    view: 'none',
    capacity: 4,
    coSleepers: 2,
    beds: SUPERIOR_BEDS,
    size: '41',
    sizeValue: 41,
    priceFrom: rateFor('bay-superior'),
    flags: [],
    verdict: '和飯店入口區、玫瑰庭區 3～4 樓並列最低價。買的是位置和專用入口，不是窗外。',
  },
  {
    id: 'bay-alcove',
    name: '灣岸區 附凹室精緻客房',
    nameJa: 'ベイエリアサイド スーペリア・アルコーヴルーム',
    category: 'bay',
    view: 'none',
    capacity: 4,
    coSleepers: 2,
    beds: ALCOVE_BEDS,
    size: '41',
    sizeValue: 41,
    priceFrom: rateFor('bay-alcove'),
    flags: ['alcove'],
    verdict: '官方說這是夢幻館數量最多的客房。同價多一張凹室床，帶小孩沒有理由選上一格。',
  },

  // ── 飯店入口區 ───────────────────────────────────────────────────────────
  {
    id: 'entrance-deluxe',
    name: '飯店入口區 尊爵客房',
    nameJa: 'ホテルエントランスサイド デラックスルーム',
    category: 'entrance',
    view: 'none',
    capacity: 4,
    coSleepers: 2,
    beds: SUPERIOR_BEDS,
    size: '48',
    sizeValue: 48,
    priceFrom: rateFor('entrance-deluxe'),
    flags: [],
    verdict: '和灣岸區的尊爵客房同價同面積。',
  },
  {
    id: 'entrance-superior',
    name: '飯店入口區 精緻客房',
    nameJa: 'ホテルエントランスサイド スーペリアルーム',
    category: 'entrance',
    view: 'none',
    capacity: 4,
    coSleepers: 2,
    beds: SUPERIOR_BEDS,
    size: '41',
    sizeValue: 41,
    priceFrom: rateFor('entrance-superior'),
    flags: [],
    verdict: '和灣岸區、玫瑰庭區 3～4 樓並列最低價的三個區之一。窗外是飯店正門那一側。',
  },
  {
    id: 'entrance-alcove',
    name: '飯店入口區 附凹室精緻客房',
    nameJa: 'ホテルエントランスサイド スーペリア・アルコーヴルーム',
    category: 'entrance',
    view: 'none',
    capacity: 4,
    coSleepers: 2,
    beds: ALCOVE_BEDS,
    size: '41',
    sizeValue: 41,
    priceFrom: rateFor('entrance-alcove'),
    flags: ['alcove'],
    verdict: '同價多一張凹室床，和灣岸區的同款完全對稱。',
  },

  // ── 豪華館 ───────────────────────────────────────────────────────────────
  {
    id: 'gc-grand-terrace',
    name: '附陽台寬暢客房（8 樓）',
    nameJa: 'グランド・テラスルーム（8階）',
    category: 'grand',
    view: 'allpark',
    capacity: 4,
    coSleepers: 2,
    beds: SUPERIOR_BEDS,
    size: '100',
    sizeValue: 100,
    floors: '8 樓',
    flags: ['balcony', 'lounge'],
    verdict: '100 平方公尺，只在 8 樓。豪華館房型表上的最後一格。',
  },
  {
    id: 'gc-grand-high',
    name: '寬暢客房（9 樓）',
    nameJa: 'グランドルーム（9階）',
    category: 'grand',
    view: 'allpark',
    capacity: 4,
    coSleepers: 2,
    beds: '2 張標準床',
    size: '100',
    sizeValue: 100,
    floors: '9 樓',
    flags: ['balcony', 'lounge'],
    verdict: '和 5～6 樓那一格同款，位在最高層。',
  },
  {
    id: 'gc-grand-mid',
    name: '寬暢客房（5～6 樓）',
    nameJa: 'グランドルーム（5-6階）',
    category: 'grand',
    view: 'allpark',
    capacity: 4,
    coSleepers: 2,
    beds: '2 張標準床',
    size: '100',
    sizeValue: 100,
    floors: '5～6 樓',
    flags: ['balcony', 'lounge'],
    verdict: '100 平方公尺，是夢幻館最大房型的兩倍。官方客房頁沒有列出加床的配置。',
  },
  {
    id: 'gc-cove-high',
    name: '凹室客房（8～9 樓）',
    nameJa: 'アルコーヴルーム（8-9階）',
    category: 'grand',
    view: 'allpark',
    capacity: 4,
    coSleepers: 2,
    beds: GC_ALCOVE_BEDS,
    size: '70',
    sizeValue: 70,
    floors: '8～9 樓',
    flags: ['alcove', 'balcony', 'lounge'],
    verdict: '豪華館凹室客房的最高樓層版本，陽台有桌椅。',
    note: '官方註明：「陽台設有桌椅。」',
  },
  {
    id: 'gc-cove-mid',
    name: '凹室客房（4～7 樓）',
    nameJa: 'アルコーヴルーム（4-7階）',
    category: 'grand',
    view: 'allpark',
    capacity: 4,
    coSleepers: 2,
    beds: GC_ALCOVE_BEDS,
    size: '70',
    sizeValue: 70,
    floors: '4～7 樓',
    flags: ['alcove', 'balcony', 'lounge'],
    verdict: '和下一格的樓層幾乎重疊，差別是陽台上有桌椅。官方的兩張平面圖也真的畫出了這個差別。',
    note: '官方註明：「陽台設有桌椅。」',
  },
  {
    id: 'gc-cove-plain',
    name: '凹室客房（4、5、7 樓）',
    nameJa: 'アルコーヴルーム（4、5、7階）',
    category: 'grand',
    view: 'allpark',
    capacity: 4,
    coSleepers: 2,
    beds: GC_ALCOVE_BEDS,
    size: '70',
    sizeValue: 70,
    floors: '4、5、7 樓',
    flags: ['alcove', 'balcony', 'lounge'],
    verdict: '陽台上沒有桌椅。想坐在陽台上看園區的話，這是要避開的一格。',
    note: '官方註明：「陽台無設桌椅。」',
  },
  {
    id: 'gc-terrace',
    name: '陽台客房（5～7 樓）',
    nameJa: 'テラスルーム（5-7階）',
    category: 'grand',
    view: 'allpark',
    capacity: 4,
    coSleepers: 2,
    beds: SUPERIOR_BEDS,
    size: '70',
    sizeValue: 70,
    floors: '5～7 樓',
    flags: ['balcony', 'lounge'],
    verdict: '70 平方公尺，沒有凹室床，加床用推拉床與郵輪床。',
  },
  {
    id: 'gc-terrace-cove-b',
    name: '附陽台＆凹室客房（3～4 樓）',
    nameJa: 'テラス＆アルコーヴルーム（3-4階）',
    category: 'grand',
    view: 'allpark',
    capacity: 4,
    coSleepers: 2,
    beds: GC_ALCOVE_BEDS,
    size: '70',
    sizeValue: 70,
    floors: '3～4 樓',
    flags: ['alcove', 'balcony', 'lounge'],
    verdict: '官方把同款客房拆成兩個樓層組合，除了樓層以外沒有公布任何差異。',
  },
  {
    id: 'gc-terrace-cove-a',
    name: '附陽台＆凹室客房（3、5 樓）',
    nameJa: 'テラス＆アルコーヴルーム（3、5階）',
    category: 'grand',
    view: 'allpark',
    capacity: 4,
    coSleepers: 2,
    beds: GC_ALCOVE_BEDS,
    size: '70',
    sizeValue: 70,
    floors: '3、5 樓',
    flags: ['alcove', 'balcony', 'lounge'],
    verdict: '和上一格是同一頁上的兩個分類，共用一張平面圖。',
  },
  {
    id: 'gc-terrace-access',
    name: '附陽台無障礙客房（3 樓）',
    nameJa: 'テラス・アクセシブルルーム（3階）',
    category: 'grand',
    view: 'allpark',
    capacity: 3,
    coSleepers: 2,
    beds: ACCESSIBLE_BEDS,
    size: '70',
    sizeValue: 70,
    floors: '3 樓',
    flags: ['balcony', 'lounge', 'accessible'],
    verdict: '豪華館唯一的無障礙房型，只在 3 樓。',
  },
];

export const BED_SPECS: BedSpec[] = [
  {
    name: '標準床',
    nameJa: 'レギュラーサイズ',
    size: '120 × 210 × 56 cm',
    capacity: '2 位（含 1 位不佔床孩童）',
    note: '寬 120 公分，比台灣的單人床寬、離雙人床還很遠。兩個大人並睡會很擠。',
  },
  {
    name: '標準床（無障礙客房）',
    nameJa: 'レギュラーサイズ（アクセシブル）',
    size: '120 × 210 × 47 cm',
    capacity: '2 位（含 1 位不佔床孩童）',
    note: '床高 47 公分，比一般的標準床低 9 公分，方便輪椅平移。',
  },
  {
    name: '推拉床',
    nameJa: 'トランドルベッド',
    size: '100 × 190 × 27 cm',
    capacity: '1 位',
    note: '平常收在標準床底下，要用的時候拉出來。床面只有 27 公分高，適合兒童。',
  },
  {
    name: '凹室床',
    nameJa: 'アルコーヴベッド',
    size: '90 × 207 × 45 cm',
    capacity: '1 位',
    note: '嵌在牆面凹陷處的固定床，長度和標準床差不多。小孩很愛，體型大的成人會覺得壓迫。',
  },
  {
    name: '郵輪床',
    nameJa: 'クルーズベッド',
    size: '85 × 188 × 51 cm',
    capacity: '1 位',
    note: '長度只有 188 公分，身高接近或超過 180 公分的人睡起來會短。',
  },
  {
    name: '嬰兒床',
    nameJa: 'ベビーベッド',
    size: '65 × 116 × 109 cm',
    capacity: '未滿 18 個月孩童',
    note: '須事先預約。',
  },
];

export const FACILITIES: Facility[] = [
  {
    name: '玫瑰庭',
    nameEn: 'Rose Court',
    location: '3 樓',
    description:
      '飯店的中庭，中央是魔法清泉，四周的岩石造景做成《美女與野獸》裡迪士尼明星的形狀。玫瑰庭區的客房就是圍著這座中庭的三個面。',
    photoTip: '入夜後岩石造景會打上藍光。從中庭抬頭可以認出自己的房間在哪一格。',
  },
  {
    name: '夢幻館的挑高中庭',
    nameEn: 'Fantasy Chateau atrium',
    location: '主入口的最深處',
    description:
      '從正門一路走到底的巨大挑高空間，天花板做成天空，中央立著一隻大型孔雀裝飾。夢幻館每一層都靠這裡的環形走廊分流到三條客房走廊，所以回房一定會經過。官方設施一覽沒有收錄這個空間，這一項來自住宿紀錄。',
    photoTip:
      '每一層的環形走廊上有兩扇窗，其中朝玫瑰庭的那一扇，位置就緊鄰樂園景觀客房——沒訂到樂園景觀的話，這裡看到的幾乎就是那個景。',
  },
  {
    name: '面向園區的露台',
    nameEn: 'Terrace overlooking the park',
    location: '夢幻泉鄉餐廳的正上方',
    description:
      '有屋頂的戶外露台，可以直接看夢幻泉鄉。與觀海景大飯店把露台放在客房裡不同，這裡是住宿遊客共用的空間。官方設施一覽同樣沒有收錄，來源是住宿紀錄。',
  },
  {
    name: '歡悅泉鄉',
    nameEn: 'Joyful Springs',
    location: '3 樓・6:00–24:00',
    description:
      '館內商店，賣飲料、零食等日用品，也有尿布與嬰兒食品。住宿遊客限定的「迪士尼飯店獨家商品」不在這裡賣，官方寫的是飯店內無銷售，要進園區的夢幻泉鄉禮品才買得到。',
  },
  {
    name: '住宿遊客洗衣室',
    nameEn: 'Guest Laundry',
    location: '夢幻館 1 樓',
    guestOnly: true,
    description: '自助洗衣與烘衣，付費，要用房卡才進得去。住豪華館的話得走到另一館來洗。',
  },
  {
    name: '育嬰室',
    nameEn: 'Baby Center',
    location: '3 樓',
    description: '在大廳樓層，可以哺乳與更換尿布。',
  },
];

export const DINING: Dining[] = [
  {
    name: '全日餐廳 夢幻泉鄉餐廳',
    nameEn: 'All-Day Dining: Fantasy Springs Restaurant',
    type: '吃到飽自助餐',
    hours: ['早餐、午餐、晚餐三個時段都是自助餐'],
    description:
      '飯店的主餐廳，三餐都供應吃到飽自助餐。有兒童餐與低敏餐點。原則上只有本飯店的住宿遊客能用，但依當日營運狀況，園區內的遊客也有可能從夢幻泉鄉那一側的專用出入口進來。',
    reservation: '適用優先入席（餐飲設施的優先帶位服務）',
  },
  {
    name: '大廳咖啡廳 格蘭派拉迪大廳',
    nameEn: 'Lobby Lounge: Grand Paradis Lounge',
    type: '大廳咖啡廳',
    hours: ['官方頁面未公布營業時間'],
    description:
      '位在夢幻館與豪華館之間，開放式大窗正對夢幻泉鄉。有兒童餐。僅供本飯店的住宿遊客使用——兩館的住客都可以，不是豪華館專屬。',
  },
  {
    name: '〈豪華館住宿遊客專屬服務〉法式餐廳 利貝爾',
    nameEn: 'Only for guests staying in Grand Chateau — French Dining: La Libellule',
    type: '法式料理',
    hours: ['官方頁面未公布營業時間'],
    description:
      '豪華館住宿遊客專屬的法式餐廳，在 3 樓。有兒童餐與低敏餐點。餐點內容只有日文頁面。',
    reservation: '適用優先入席',
  },
];

export const BENEFITS: Benefit[] = [
  {
    title: '專用的園區入口',
    description:
      '住宿期間可以從專用入口直接進出夢幻泉鄉。夢幻館走「夢幻泉鄉口」，每次進出都要出示住宿證明；豪華館走「豪華館通路」，是只有豪華館住客能用的專屬通道。',
    caveat:
      '要入園仍然需要園區票券。想從這兩個入口離開園區的話，請於 21:00 前回到夢幻泉鄉（2026 年 6 月 19 日～9 月 14 日為 21:10）；依娛樂表演時間，有時候會無法從這裡出園。',
  },
  {
    title: '歡樂入園',
    description:
      '兩座樂園都適用：東京迪士尼樂園可提前 15 分鐘入園，東京迪士尼海洋是提前 5～15 分鐘。在海洋使用時，兩館各自走自己的專用入口——夢幻館走夢幻泉鄉口，豪華館走 1 樓的豪華館通路，不能從北口或南口進去。',
    caveat:
      '住房首日不適用，只有住宿期間的隔天起到退房當日可以用。通行證在辦理住房手續時領，4 歲以上每人 1 張。東京迪士尼樂園有不適用日期（2026 年為 9 月 15、16、19 日、10 月 31 日、11 月 10 日），但那幾天只影響夢幻館，豪華館的住客照舊適用。',
  },
  {
    title: '遊樂設施體驗券 8 張（豪華館）',
    description:
      '豪華館的客房價格本身就包含 8 張，可以從優先通道入場、用較短的等候時間玩。適用清單涵蓋夢幻泉鄉的四項遊樂設施，以及兩座樂園的多項設施。',
    caveat: '需要額外的可以加購，訂房後由豪華館接待廳寄訂單通知信說明。夢幻館沒有這項禮遇。',
  },
  {
    title: '娛樂表演觀賞券 4 張（豪華館）',
    description: '同樣含在豪華館的房價裡，可以事先選定適用表演，在專屬觀賞區看。',
    caveat: '席位數有限，有可能選不到。夢幻館沒有這項禮遇。',
  },
  {
    title: '在飯店買園區票券',
    description:
      '官方網站的票券售完時，住宿遊客仍然可以在飯店買到住宿期間的票券。行李服務櫃檯的販售時間是 6:00–22:00，豪華館住客專用的豪華館接待廳是 7:00–22:00。',
    caveat:
      '假期套票已含票券的話，票面記載的入園日不能加購。目前沒有販售特別連日護照。兩個櫃檯都在 3 樓。',
  },
  {
    title: '免費行李遞送到飯店',
    description:
      '在迪士尼度假區迎賓中心 2 樓的迪士尼飯店服務台受理，7:30–16:00，免費。夢幻館的行李送到行李服務櫃檯自取，豪華館直接送到客房。',
    caveat: '貴重物品、易碎物品、飲料與精密儀器不受理。',
  },
  {
    title: '提前辦理住房手續（夢幻館）',
    description:
      '15:00 之前就可以在夢幻館接待廳辦好住房手續，受理時間 7:00–13:00，房間 16:30 起可以進。',
    caveat: '只適用住房首日，而且某些情況下不提供。豪華館的服務頁面沒有列出這項。',
  },
];

export const FAQS: Faq[] = [
  {
    question: '訂了「樂園景觀」，保證看得到什麼？',
    answer:
      '官方只承諾「可瞭望夢幻泉鄉」。逐間調查的部落客歸納出這一批房間的實際分界是看不看得到普羅米修斯火山，所以火山幾乎是保證項目；艾倫戴爾城堡則看不到。',
  },
  {
    question: '可以指定樓層或房號嗎？',
    answer:
      '玫瑰庭區的精緻客房與附凹室精緻客房分成 3～4 樓與上層階兩種分類，選分類就等於選樓層區間。其他區沒有樓層分級，房號也無法指定。',
  },
  {
    question: '早餐含在房價裡嗎？',
    answer:
      '官方客房與禮遇頁面都沒有提到早餐。豪華館明列包含在房價裡的只有 8 張遊樂設施體驗券與 4 張娛樂表演觀賞券。訂房時請看方案內容。',
  },
  {
    question: '沒有住這裡也能去飯店的餐廳嗎？',
    answer:
      '原則上不行，飯店用地目前只開放給住宿遊客。夢幻泉鄉餐廳有例外：買假期套票並選了這家餐廳的遊客可以只進餐廳；依當日營運狀況，園區內的遊客也有可能從夢幻泉鄉那一側的專用出入口進來。',
  },
  {
    question: '晚上幾點前要回到夢幻泉鄉？',
    answer:
      '21:00 前必須回到夢幻泉鄉，2026 年 6 月 19 日～9 月 14 日期間是 21:10。官方的用詞是回到夢幻泉鄉，而不是通過閘門，所以要把走回來的時間也算進去。另外依娛樂表演時間，有時候無法從這裡出園。',
  },
  {
    question: '入住當天可以用歡樂入園嗎？',
    answer:
      '不行。官方寫的是住宿期間「住房首日除外」，可以用到退房當日。所以入住當天早上到，還是得跟一般遊客一起排。',
  },
  {
    question: '這間飯店怎麼才訂得到？',
    answer:
      '住房首日的 4 個月前同一日期 11:00（日本時間）開放訂房，一次最多連住 5 天、3 間客房。開賣當天沒訂到的話，後面幾乎只能靠撿取消房。',
  },
];

// ── Derived helpers ────────────────────────────────────────────────────────

export const ROOM_COUNT = ROOMS.length;

export function roomsByCategory(key: string): Room[] {
  return ROOMS.filter((room) => room.category === key);
}

export function cheapestRoom(): Room {
  return ROOMS.filter((room) => room.priceFrom !== undefined).reduce((min, room) =>
    room.priceFrom! < min.priceFrom! ? room : min,
  );
}
