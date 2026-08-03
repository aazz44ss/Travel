/**
 * Tokyo Disneyland Hotel room database.
 *
 * Room names, capacities, sizes and bed configurations follow the official
 * Traditional Chinese guest-room listing; reference rates follow published
 * 2026 rate tables. Rates move constantly by date, so they are labelled as
 * "reference from" prices everywhere they are displayed.
 *
 * The hotel reorganised its room categories on 2026-04-01: the old
 * floor-banded categories (e.g. "3-6F" vs "7-8F") were merged and their price
 * gaps removed, so a floor can no longer be chosen at booking time.
 */

export type ViewKey = 'grand' | 'park' | 'none';
export type CategoryKey = 'standard' | 'character' | 'concierge' | 'suite';

export interface RoomView {
  key: ViewKey;
  label: string;
  labelJa: string;
  labelEn: string;
  summary: string;
  detail: string;
}

export interface RoomCategory {
  key: CategoryKey;
  label: string;
  labelEn: string;
  summary: string;
  perks: string[];
}

export interface Room {
  id: string;
  name: string;
  nameJa: string;
  category: CategoryKey;
  view: ViewKey;
  /** Maximum paying adults. */
  capacity: number;
  /** Additional children aged 11 or under who may share a bed free of charge. */
  coSleepers: number;
  beds: string;
  /** Square metres, as a display string because a few types span a range. */
  size: string;
  /** Numeric size used for sorting and filtering. */
  sizeValue: number;
  /** Reference "from" rate in JPY per room per night. */
  priceFrom: number;
  floors?: string;
  alcove: boolean;
  balcony: boolean;
  lounge: boolean;
  breakfast: boolean;
  accessible: boolean;
  /** Short editorial verdict shown in the explorer. */
  verdict: string;
  note?: string;
}

export const HOTEL = {
  name: '東京迪士尼樂園大飯店',
  nameJa: '東京ディズニーランドホテル',
  nameEn: 'Tokyo Disneyland Hotel',
  opened: 2008,
  totalRooms: 706,
  floors: '地上 9 層',
  style: '維多利亞風格',
  checkIn: '15:00',
  checkOut: '12:00',
  officialUrl: 'https://www.tokyodisneyresort.jp/tc/hotel/tdh.html',
  roomsUrl: 'https://www.tokyodisneyresort.jp/tc/hotel/tdh/room.html',
  /** Yen per TWD, rounded, used only for rough conversions in the UI. */
  jpyPerTwd: 4.7,
} as const;

export const VIEWS: RoomView[] = [
  {
    key: 'grand',
    label: '樂園全景觀',
    labelJa: 'パークグランドビュー',
    labelEn: 'Park Grand View',
    summary: '正面對著東京迪士尼樂園',
    detail:
      '官方定義是「可由正面瞭望東京迪士尼樂園的客房」。窗外由近到遠依序是迪士尼度假區線車站、世界市集屋頂、灰姑娘城堡，天氣好時還能看到迪士尼海洋的普羅米修斯火山與驚魂古塔。全部集中在 5 樓以上，所以不會被車站站體擋住。',
  },
  {
    key: 'park',
    label: '樂園景觀',
    labelJa: 'パークビュー',
    labelEn: 'Park View',
    summary: '看得到樂園，但角度是斜的',
    detail:
      '官方定義是「可瞭望東京迪士尼樂園的客房」，位置比全景觀偏側面。城堡會在斜前方，煙火大致看得到但構圖沒那麼完整。價差通常比全景觀便宜約 8,000～10,000 日圓，是最務實的選擇。',
  },
  {
    key: 'none',
    label: '無景觀指定',
    labelJa: '景観指定なし',
    labelEn: 'No view designation',
    summary: '面向中庭、正門或飯店側面',
    detail:
      '沒有標註景觀的房型窗外可能是愛麗絲花園、幻想曲廣場、飯店中庭或停車場側。房間本身的規格與同級的景觀房完全一樣，差別只有窗外。想在房內看煙火的話，這一類要直接排除。',
  },
];

export const CATEGORIES: RoomCategory[] = [
  {
    key: 'standard',
    label: '標準房',
    labelEn: 'Standard',
    summary: '飯店的主力房型，從最基本的精緻客房到 93 平方公尺的家庭客房都在這一層。',
    perks: ['房間面向樂園側', '可加選樂園景觀／樂園全景觀', '早餐需另外付費'],
  },
  {
    key: 'character',
    label: '迪士尼明星房',
    labelEn: 'Character',
    summary: '四部電影主題的整體改裝客房，從壁紙、床頭板到備品全部換過一輪。',
    perks: ['四種電影主題', '房間面向飯店正門側', '看不到樂園與煙火'],
  },
  {
    key: 'concierge',
    label: '禮賓房',
    labelEn: 'Concierge',
    summary: '含專用貴賓室（馬瑟林廳）與翌日早餐，在專屬櫃檯辦理入住。',
    perks: ['專用貴賓室', '含翌日早餐', '專屬入住櫃檯', '幾乎都是樂園景觀以上'],
  },
  {
    key: 'suite',
    label: '套房',
    labelEn: 'Suite',
    summary: '飯店最頂端的兩種房型，位在 8～9 樓，含貴賓室與早餐。',
    perks: ['99～235 平方公尺', '含貴賓室與早餐', '可選擇客房送餐服務'],
  },
];

export const ROOMS: Room[] = [
  // ── 標準房 ─────────────────────────────────────────────────────────────
  {
    id: 'std-superior-double',
    name: '精緻客房・1 張雙人床',
    nameJa: 'スタンダード スーペリアルーム（ダブル）',
    category: 'standard',
    view: 'none',
    capacity: 2,
    coSleepers: 2,
    beds: '1 張雙人床',
    size: '48',
    sizeValue: 48,
    priceFrom: 64500,
    floors: '3–4 樓',
    alcove: false,
    balcony: false,
    lounge: false,
    breakfast: false,
    accessible: false,
    verdict: '兩人入住最便宜的選擇，而且是 48 平方公尺，比同價位的雙床房大 8 平方公尺。',
  },
  {
    id: 'std-superior-twin',
    name: '精緻客房・2 張標準床',
    nameJa: 'スタンダード スーペリアルーム（ツイン）',
    category: 'standard',
    view: 'none',
    capacity: 4,
    coSleepers: 2,
    beds: '2 張標準床 ＋ 推拉床（可加價再加郵輪床）',
    size: '40',
    sizeValue: 40,
    priceFrom: 64500,
    floors: '1–9 樓',
    alcove: false,
    balcony: false,
    lounge: false,
    breakfast: false,
    accessible: false,
    verdict: '全飯店入住門檻最低的四人房。窗外看不到樂園，但省下來的錢夠再買一天門票。',
  },
  {
    id: 'std-superior-pv',
    name: '精緻客房（樂園景觀）',
    nameJa: 'スタンダード スーペリアルーム（パークビュー）',
    category: 'standard',
    view: 'park',
    capacity: 4,
    coSleepers: 2,
    beds: '2 張標準床 ＋ 推拉床（可加價再加郵輪床）',
    size: '40',
    sizeValue: 40,
    priceFrom: 70500,
    floors: '3–8 樓',
    alcove: false,
    balcony: false,
    lounge: false,
    breakfast: false,
    accessible: false,
    verdict: '只比無景觀貴約 6,000 日圓就能看到樂園，整間飯店 CP 值最高的一格。',
  },
  {
    id: 'std-superior-pgv-double',
    name: '精緻客房（樂園全景觀）・1 張雙人床',
    nameJa: 'スタンダード スーペリアルーム（パークグランドビュー）（ダブル）',
    category: 'standard',
    view: 'grand',
    capacity: 2,
    coSleepers: 2,
    beds: '1 張雙人床',
    size: '48',
    sizeValue: 48,
    priceFrom: 79000,
    floors: '5–8 樓',
    alcove: false,
    balcony: false,
    lounge: false,
    breakfast: false,
    accessible: false,
    verdict: '兩人旅行想看正面景的最佳解：48 平方公尺加正對城堡，價格還在六位數以內。',
  },
  {
    id: 'std-superior-pgv-twin',
    name: '精緻客房（樂園全景觀）・2 張標準床',
    nameJa: 'スタンダード スーペリアルーム（パークグランドビュー）（ツイン）',
    category: 'standard',
    view: 'grand',
    capacity: 4,
    coSleepers: 2,
    beds: '2 張標準床 ＋ 推拉床（可加價再加郵輪床）',
    size: '40',
    sizeValue: 40,
    priceFrom: 79000,
    floors: '5–7 樓',
    alcove: false,
    balcony: false,
    lounge: false,
    breakfast: false,
    accessible: false,
    verdict: '四人房裡最容易搶到的正面景，網路上絕大多數的房內煙火影片都出自這一格。',
  },
  {
    id: 'std-alcove',
    name: '精緻凹室客房',
    nameJa: 'スタンダード スーペリアアルコーヴルーム',
    category: 'standard',
    view: 'none',
    capacity: 4,
    coSleepers: 2,
    beds: '2 張標準床 ＋ 推拉床 ＋ 凹室床',
    size: '40',
    sizeValue: 40,
    priceFrom: 68000,
    floors: '1–9 樓',
    alcove: true,
    balcony: false,
    lounge: false,
    breakfast: false,
    accessible: false,
    verdict: '牆上挖出來的凹室床是小孩的秘密基地。四張床全部固定，不用移動家具。',
  },
  {
    id: 'std-alcove-pv',
    name: '精緻凹室客房（樂園景觀）',
    nameJa: 'スタンダード スーペリアアルコーヴルーム（パークビュー）',
    category: 'standard',
    view: 'park',
    capacity: 4,
    coSleepers: 2,
    beds: '2 張標準床 ＋ 推拉床 ＋ 凹室床',
    size: '40',
    sizeValue: 40,
    priceFrom: 73500,
    floors: '3–8 樓',
    alcove: true,
    balcony: false,
    lounge: false,
    breakfast: false,
    accessible: false,
    verdict: '帶小孩又想看樂園的話，這一格幾乎是為你設計的。',
  },
  {
    id: 'std-alcove-pgv',
    name: '精緻凹室客房（樂園全景觀）',
    nameJa: 'スタンダード スーペリアアルコーヴルーム（パークグランドビュー）',
    category: 'standard',
    view: 'grand',
    capacity: 4,
    coSleepers: 2,
    beds: '2 張標準床 ＋ 推拉床 ＋ 凹室床',
    size: '40',
    sizeValue: 40,
    priceFrom: 81000,
    floors: '5–6 樓',
    alcove: true,
    balcony: false,
    lounge: false,
    breakfast: false,
    accessible: false,
    verdict: '標準房裡唯一同時有凹室床和正面景的房型，數量少、開賣後很快消失。',
  },
  {
    id: 'std-deluxe-twin',
    name: '尊爵客房・2 張標準床',
    nameJa: 'スタンダード デラックスルーム（ツイン）',
    category: 'standard',
    view: 'none',
    capacity: 3,
    coSleepers: 2,
    beds: '2 張標準床 ＋ 推拉床',
    size: '48',
    sizeValue: 48,
    priceFrom: 72000,
    floors: '1–8 樓',
    alcove: false,
    balcony: false,
    lounge: false,
    breakfast: false,
    accessible: false,
    verdict: '比精緻客房多 8 平方公尺，行李攤開來還走得動路。但沒有景觀選項。',
  },
  {
    id: 'std-deluxe-double',
    name: '尊爵客房・1 張雙人床',
    nameJa: 'スタンダード デラックスルーム（ダブル）',
    category: 'standard',
    view: 'none',
    capacity: 3,
    coSleepers: 2,
    beds: '1 張雙人床（可加價加郵輪床）',
    size: '48',
    sizeValue: 48,
    priceFrom: 72000,
    floors: '4 樓',
    alcove: false,
    balcony: false,
    lounge: false,
    breakfast: false,
    accessible: false,
    verdict: '兩大一小、又不想擠推拉床的組合可以看這一格。',
  },
  {
    id: 'std-deluxe-quad',
    name: '尊爵客房・4 位',
    nameJa: 'スタンダード デラックスルーム（4名対応）',
    category: 'standard',
    view: 'none',
    capacity: 4,
    coSleepers: 2,
    beds: '2 張標準床 ＋ 推拉床 ＋ 郵輪床',
    size: '48',
    sizeValue: 48,
    priceFrom: 78500,
    floors: '3–4 樓',
    alcove: false,
    balcony: false,
    lounge: false,
    breakfast: false,
    accessible: false,
    verdict: '四個大人想住得寬一點又不想加價到家庭客房，這是中間解。',
  },
  {
    id: 'std-deluxe-accessible',
    name: '尊爵客房（無障礙設計）',
    nameJa: 'スタンダード デラックスルーム（アクセシブル）',
    category: 'standard',
    view: 'none',
    capacity: 3,
    coSleepers: 2,
    beds: '2 張無障礙標準床（可加價加郵輪床）',
    size: '66',
    sizeValue: 66,
    priceFrom: 72000,
    floors: '4–8 樓',
    alcove: false,
    balcony: false,
    lounge: false,
    breakfast: false,
    accessible: true,
    verdict: '66 平方公尺、輪椅可迴轉，價格卻和一般尊爵客房相同。',
    note: '床高 45 公分（一般標準床為 55 公分），浴室為無障礙規格。',
  },
  {
    id: 'std-corner',
    name: '景隅客房',
    nameJa: 'スタンダード コーナールーム',
    category: 'standard',
    view: 'none',
    capacity: 3,
    coSleepers: 2,
    beds: '1 張雙人床（可加價加郵輪床）',
    size: '59',
    sizeValue: 59,
    priceFrom: 75500,
    floors: '3 樓',
    alcove: false,
    balcony: false,
    lounge: false,
    breakfast: false,
    accessible: false,
    verdict: '位在建築轉角，兩面採光。59 平方公尺卻只要標準房的價位。',
    note: '全飯店只有 3215、3515 兩間。這一整欄由下往上是：3 樓景隅客房、4–7 樓塔樓客房、8–9 樓套房，越高等級越高。',
  },
  {
    id: 'std-corner-pv',
    name: '景隅客房（樂園景觀）',
    nameJa: 'スタンダード コーナールーム（パークビュー）',
    category: 'standard',
    view: 'park',
    capacity: 4,
    coSleepers: 2,
    beds: '2 張標準床 ＋ 推拉床（可加價加郵輪床）',
    size: '59',
    sizeValue: 59,
    priceFrom: 85000,
    floors: '3–8 樓',
    alcove: false,
    balcony: false,
    lounge: false,
    breakfast: false,
    accessible: false,
    verdict: '臥室和客廳之間有門可以關起來，帶小孩早睡、大人晚睡的家庭最有感。',
  },
  {
    id: 'std-junior-family',
    name: '小家庭客房',
    nameJa: 'スタンダード ジュニアファミリールーム',
    category: 'standard',
    view: 'none',
    capacity: 4,
    coSleepers: 3,
    beds: '3 張標準床 ＋ 推拉床',
    size: '57',
    sizeValue: 57,
    priceFrom: 87000,
    floors: '1–3 樓',
    alcove: false,
    balcony: false,
    lounge: false,
    breakfast: false,
    accessible: false,
    verdict: '三張正規床加推拉床，最多 4 大 3 小。三代同行不用拆成兩間房。',
  },
  {
    id: 'std-junior-family-pv',
    name: '小家庭客房（樂園景觀）',
    nameJa: 'スタンダード ジュニアファミリールーム（パークビュー）',
    category: 'standard',
    view: 'park',
    capacity: 4,
    coSleepers: 3,
    beds: '3 張標準床 ＋ 推拉床',
    size: '57',
    sizeValue: 57,
    priceFrom: 94000,
    floors: '4–8 樓',
    alcove: false,
    balcony: false,
    lounge: false,
    breakfast: false,
    accessible: false,
    verdict: '小家庭客房加上樂園景觀，7 樓的部分房間據住客回報可以走到陽台。',
    note: '陽台不是這個房型的標配，而且訂房時無法指定樓層，別把它當成必得的條件。',
  },
  {
    id: 'std-family-pv',
    name: '家庭客房（樂園景觀）',
    nameJa: 'スタンダード ファミリールーム（パークビュー）',
    category: 'standard',
    view: 'park',
    capacity: 5,
    coSleepers: 2,
    beds: '2 張標準床 ＋ 2 張凹室床 ＋ 推拉床',
    size: '93',
    sizeValue: 93,
    priceFrom: 137000,
    floors: '5–9 樓',
    alcove: true,
    balcony: false,
    lounge: false,
    breakfast: false,
    accessible: false,
    verdict: '93 平方公尺、兩套衛浴、最多 5 大 2 小，而且一定是 5 樓以上的樂園景觀。',
  },

  // ── 迪士尼明星房 ────────────────────────────────────────────────────────
  {
    id: 'char-tinkerbell-3',
    name: '迪士尼小仙子客房・3 位',
    nameJa: 'ディズニーティンカーベルルーム',
    category: 'character',
    view: 'none',
    capacity: 3,
    coSleepers: 2,
    beds: '2 張標準床 ＋ 推拉床',
    size: '40',
    sizeValue: 40,
    priceFrom: 71500,
    floors: '5–9 樓',
    alcove: false,
    balcony: false,
    lounge: false,
    breakfast: false,
    accessible: false,
    verdict: '以「精靈谷」為主題的綠色房間，牆上的巨大花草會讓人有縮小成小仙子的錯覺。',
  },
  {
    id: 'char-tinkerbell-4',
    name: '迪士尼小仙子客房・4 位＋凹室床',
    nameJa: 'ディズニーティンカーベルルーム（アルコーヴ）',
    category: 'character',
    view: 'none',
    capacity: 4,
    coSleepers: 2,
    beds: '2 張標準床 ＋ 推拉床 ＋ 凹室床',
    size: '40',
    sizeValue: 40,
    priceFrom: 75500,
    floors: '3–9 樓',
    alcove: true,
    balcony: false,
    lounge: false,
    breakfast: false,
    accessible: false,
    verdict: '四種主題房裡最便宜的四人版本，凹室床本身就很符合小仙子的尺度感。',
  },
  {
    id: 'char-alice',
    name: '迪士尼愛麗絲夢遊仙境客房',
    nameJa: 'ディズニーふしぎの国のアリスルーム',
    category: 'character',
    view: 'none',
    capacity: 4,
    coSleepers: 2,
    beds: '2 張標準床 ＋ 推拉床（可加價加郵輪床）',
    size: '40–43',
    sizeValue: 41,
    priceFrom: 71500,
    floors: '3–9 樓',
    alcove: false,
    balcony: false,
    lounge: false,
    breakfast: false,
    accessible: false,
    verdict: '床頭是撲克牌士兵與紅心皇后，地毯做成迷宮，電視上方蹲著白兔。細節密度最高的一間。',
  },
  {
    id: 'char-alice-alcove',
    name: '迪士尼愛麗絲夢遊仙境客房・含凹室床',
    nameJa: 'ディズニーふしぎの国のアリスルーム（アルコーヴ）',
    category: 'character',
    view: 'none',
    capacity: 4,
    coSleepers: 2,
    beds: '2 張標準床 ＋ 推拉床 ＋ 凹室床',
    size: '40',
    sizeValue: 40,
    priceFrom: 75500,
    floors: '3–8 樓',
    alcove: true,
    balcony: false,
    lounge: false,
    breakfast: false,
    accessible: false,
    verdict: '同樣的愛麗絲主題加上凹室床，四張床各睡一人不用擠。',
  },
  {
    id: 'char-beast-twin-51',
    name: '迪士尼美女與野獸客房・2 張標準床 51 m²',
    nameJa: 'ディズニー美女と野獣ルーム（ツイン）',
    category: 'character',
    view: 'none',
    capacity: 4,
    coSleepers: 2,
    beds: '2 張標準床 ＋ 推拉床（可加價加郵輪床）',
    size: '51',
    sizeValue: 51,
    priceFrom: 78500,
    floors: '3–8 樓',
    alcove: false,
    balcony: false,
    lounge: false,
    breakfast: false,
    accessible: false,
    verdict: '深紅與金色的野獸城堡。四種主題房裡人氣最高，也是最難訂的一間。',
  },
  {
    id: 'char-beast-alcove-51',
    name: '迪士尼美女與野獸客房・2 張標準床＋凹室床 51 m²',
    nameJa: 'ディズニー美女と野獣ルーム（アルコーヴ）',
    category: 'character',
    view: 'none',
    capacity: 4,
    coSleepers: 2,
    beds: '2 張標準床 ＋ 推拉床 ＋ 凹室床',
    size: '51',
    sizeValue: 51,
    priceFrom: 83000,
    floors: '5–9 樓',
    alcove: true,
    balcony: false,
    lounge: false,
    breakfast: false,
    accessible: false,
    verdict: '美女與野獸主題加凹室床。加價約 4,500 日圓換一張獨立的床，划算。',
  },
  {
    id: 'char-beast-twin-61',
    name: '迪士尼美女與野獸客房・2 張標準床 61 m²',
    nameJa: 'ディズニー美女と野獣ルーム（ツイン・61 m²）',
    category: 'character',
    view: 'none',
    capacity: 3,
    coSleepers: 2,
    beds: '2 張標準床（可加價加郵輪床）',
    size: '61',
    sizeValue: 61,
    priceFrom: 85000,
    floors: '1–8 樓',
    alcove: false,
    balcony: false,
    lounge: false,
    breakfast: false,
    accessible: false,
    verdict: '主題房裡最寬敞的雙床版本，61 平方公尺住三人非常鬆。',
  },
  {
    id: 'char-beast-triple-61',
    name: '迪士尼美女與野獸客房・3 張標準床 61 m²',
    nameJa: 'ディズニー美女と野獣ルーム（トリプル）',
    category: 'character',
    view: 'none',
    capacity: 4,
    coSleepers: 3,
    beds: '3 張標準床（可加價加郵輪床）',
    size: '61',
    sizeValue: 61,
    priceFrom: 85500,
    floors: '1–9 樓',
    alcove: false,
    balcony: false,
    lounge: false,
    breakfast: false,
    accessible: false,
    verdict: '三張正規床、最多 4 大 3 小，是主題房裡唯一能塞下七個人的房型。',
  },
  {
    id: 'char-cinderella',
    name: '迪士尼仙履奇緣客房',
    nameJa: 'ディズニーシンデレラルーム',
    category: 'character',
    view: 'none',
    capacity: 4,
    coSleepers: 2,
    beds: '2 張標準床 ＋ 推拉床（可加價加郵輪床）',
    size: '71',
    sizeValue: 71,
    priceFrom: 78500,
    floors: '5–7 樓',
    alcove: false,
    balcony: false,
    lounge: false,
    breakfast: false,
    accessible: false,
    verdict: '71 平方公尺、臥室與客廳分離的公主房。以每平方公尺計算是全飯店最便宜的房型之一。',
  },

  // ── 禮賓房 ─────────────────────────────────────────────────────────────
  {
    id: 'conc-superior-pv',
    name: '禮賓房 精緻客房（樂園景觀）',
    nameJa: 'コンシェルジュ スーペリアルーム（パークビュー）',
    category: 'concierge',
    view: 'park',
    capacity: 4,
    coSleepers: 2,
    beds: '2 張標準床 ＋ 推拉床 ＋ 郵輪床',
    size: '43',
    sizeValue: 43,
    priceFrom: 96000,
    floors: '3–8 樓',
    alcove: false,
    balcony: false,
    lounge: true,
    breakfast: true,
    accessible: false,
    verdict: '禮賓房的入門款。四人份早餐折算下來，和標準房的價差沒有帳面上那麼可怕。',
  },
  {
    id: 'conc-superior-pgv',
    name: '禮賓房 精緻客房（樂園全景觀）',
    nameJa: 'コンシェルジュ スーペリアルーム（パークグランドビュー）',
    category: 'concierge',
    view: 'grand',
    capacity: 4,
    coSleepers: 2,
    beds: '2 張標準床 ＋ 推拉床 ＋ 郵輪床',
    size: '40',
    sizeValue: 40,
    priceFrom: 103500,
    floors: '8–9 樓',
    alcove: false,
    balcony: false,
    lounge: true,
    breakfast: true,
    accessible: false,
    verdict: '正面景加貴賓室。原本集中在 8–9 樓，是視野最好的一批房間。',
  },
  {
    id: 'conc-alcove-pgv',
    name: '禮賓房 精緻凹室客房（樂園全景觀）',
    nameJa: 'コンシェルジュ スーペリアアルコーヴルーム（パークグランドビュー）',
    category: 'concierge',
    view: 'grand',
    capacity: 4,
    coSleepers: 2,
    beds: '2 張標準床 ＋ 推拉床 ＋ 凹室床',
    size: '40',
    sizeValue: 40,
    priceFrom: 101000,
    floors: '7–9 樓',
    alcove: true,
    balcony: false,
    lounge: true,
    breakfast: true,
    accessible: false,
    verdict: '比不含凹室的同級房還便宜 2,500 日圓，卻多一張床。禮賓房裡最被低估的一格。',
  },
  {
    id: 'conc-deluxe-pv',
    name: '禮賓房 尊爵客房（樂園景觀）',
    nameJa: 'コンシェルジュ デラックスルーム（パークビュー）',
    category: 'concierge',
    view: 'park',
    capacity: 3,
    coSleepers: 2,
    beds: '2 張標準床 ＋ 推拉床',
    size: '58',
    sizeValue: 58,
    priceFrom: 105500,
    floors: '3–8 樓',
    alcove: false,
    balcony: false,
    lounge: true,
    breakfast: true,
    accessible: false,
    verdict: '58 平方公尺加貴賓室，而且是少數可以叫客房送餐的房型。',
  },
  {
    id: 'conc-balcony-pgv',
    name: '禮賓房 陽台客房（樂園全景觀）',
    nameJa: 'コンシェルジュ バルコニールーム（パークグランドビュー）',
    category: 'concierge',
    view: 'grand',
    capacity: 4,
    coSleepers: 2,
    beds: '2 張標準床 ＋ 推拉床 ＋ 郵輪床',
    size: '40',
    sizeValue: 40,
    priceFrom: 109000,
    floors: '8 樓',
    alcove: false,
    balcony: true,
    lounge: true,
    breakfast: true,
    accessible: false,
    verdict: '房名直接寫「陽台」的兩個房型之一。想站在戶外看煙火，只能從這裡選。',
    note: '只有房名含「陽台」的類別才保證有陽台；一般的樂園全景觀不會附陽台。',
  },
  {
    id: 'conc-balcony-alcove-pgv',
    name: '禮賓房 陽台＆凹室客房（樂園全景觀）',
    nameJa: 'コンシェルジュ バルコニーアルコーヴルーム（パークグランドビュー）',
    category: 'concierge',
    view: 'grand',
    capacity: 4,
    coSleepers: 2,
    beds: '2 張標準床 ＋ 推拉床 ＋ 凹室床',
    size: '40',
    sizeValue: 40,
    priceFrom: 106500,
    floors: '8 樓',
    alcove: true,
    balcony: true,
    lounge: true,
    breakfast: true,
    accessible: false,
    verdict: '陽台、凹室床、正面景、貴賓室、早餐全都有，還比純陽台房便宜 2,500 日圓。',
  },
  {
    id: 'conc-turret-twin',
    name: '禮賓房 塔樓客房・2 張標準床',
    nameJa: 'コンシェルジュ タレットルーム（ツイン）',
    category: 'concierge',
    view: 'none',
    capacity: 4,
    coSleepers: 2,
    beds: '2 張標準床 ＋ 推拉床（可加價加郵輪床）',
    size: '55',
    sizeValue: 55,
    priceFrom: 104500,
    floors: '3–7 樓',
    alcove: false,
    balcony: false,
    lounge: true,
    breakfast: true,
    accessible: false,
    verdict: '位在飯店的圓形小塔裡，窗戶朝多個方向。房間本身沒有景觀保證，但形狀獨一無二。',
    note: '房號 3121、4121、5121、6121、7121，全飯店只有五間，一層一間。有住客回報 7 樓的雙床塔樓客房可以走到戶外，但訂房時無法指定樓層。',
  },
  {
    id: 'conc-turret-double',
    name: '禮賓房 塔樓客房・1 張雙人床',
    nameJa: 'コンシェルジュ タレットルーム（ダブル）',
    category: 'concierge',
    view: 'none',
    capacity: 3,
    coSleepers: 2,
    beds: '1 張雙人床（可加價加郵輪床）',
    size: '59',
    sizeValue: 59,
    priceFrom: 104500,
    floors: '4–7 樓',
    alcove: false,
    balcony: false,
    lounge: true,
    breakfast: true,
    accessible: false,
    verdict: '59 平方公尺的塔樓，是進入禮賓房層級最便宜的路徑之一。',
    note: '房號結尾是 215 與 515，也就是正面兩座角塔。同一欄的 8–9 樓就是套房，等於用禮賓房的價格住進套房的正下方。',
  },
  {
    id: 'conc-cinderella',
    name: '禮賓房 迪士尼仙履奇緣客房',
    nameJa: 'コンシェルジュ ディズニーシンデレラルーム',
    category: 'concierge',
    view: 'none',
    capacity: 4,
    coSleepers: 2,
    beds: '2 張標準床 ＋ 推拉床（可加價加郵輪床）',
    size: '71',
    sizeValue: 71,
    priceFrom: 112000,
    floors: '8–9 樓',
    alcove: false,
    balcony: false,
    lounge: true,
    breakfast: true,
    accessible: false,
    verdict: '公主房加貴賓室加客房送餐。台灣旅客口中的「圓夢房」大多指這一間。',
    note: '這間禮賓房面向飯店正門側，不是樂園側。',
  },

  // ── 套房 ──────────────────────────────────────────────────────────────
  {
    id: 'suite-magic-kingdom-8f',
    name: '迪士尼魔法王國套房・8 樓',
    nameJa: 'ディズニー・マジックキングダム・スイート（8階）',
    category: 'suite',
    view: 'park',
    capacity: 3,
    coSleepers: 2,
    beds: '2 張標準床 ＋ 凹室床',
    size: '99',
    sizeValue: 99,
    priceFrom: 260000,
    floors: '8 樓',
    alcove: true,
    balcony: false,
    lounge: true,
    breakfast: true,
    accessible: false,
    verdict: '99 平方公尺、兩座洗手台、淋浴間與浴缸分離。8 樓的版本不能走到陽台。',
    note: '房號 8215 與 8515，位在飯店正面兩側角塔的頂端。官方客房一覽沒有給套房景觀分類，實際是從塔樓的角度看出去，正面與側面都有窗。'
  },
  {
    id: 'suite-magic-kingdom-9f',
    name: '迪士尼魔法王國套房・9 樓',
    nameJa: 'ディズニー・マジックキングダム・スイート（9階）',
    category: 'suite',
    view: 'park',
    capacity: 3,
    coSleepers: 2,
    beds: '2 張標準床 ＋ 凹室床',
    size: '99',
    sizeValue: 99,
    priceFrom: 290000,
    floors: '9 樓',
    alcove: true,
    balcony: true,
    lounge: true,
    breakfast: true,
    accessible: false,
    verdict: '和 8 樓同格局，但可以走到陽台上。多付 30,000 日圓買的就是那一道門。',
    note: '全飯店只有 9515 一間，位在角塔的最頂層。官方客房一覽沒有給套房景觀分類。'
  },
  {
    id: 'suite-walt-disney',
    name: '華特・迪士尼套房',
    nameJa: 'ウォルト・ディズニー・スイート',
    category: 'suite',
    view: 'park',
    capacity: 2,
    coSleepers: 2,
    beds: '1 張 King size 雙人床',
    size: '235',
    sizeValue: 235,
    priceFrom: 600000,
    floors: '9 樓',
    alcove: false,
    balcony: true,
    lounge: true,
    breakfast: true,
    accessible: false,
    verdict: '235 平方公尺、房內有米奇銅像，全年一價 600,000 日圓。住客可確保參加園區導覽行程。',
    note: '全飯店唯一的 9215 號房，位在另一座角塔的最頂層。官方客房一覽沒有給套房景觀分類。'
  },
];

export interface BedSpec {
  name: string;
  nameJa: string;
  size: string;
  capacity: string;
  note?: string;
}

export const BED_SPECS: BedSpec[] = [
  {
    name: '標準床',
    nameJa: 'レギュラーサイズ',
    size: '120 × 210 × 55 cm',
    capacity: '2 位（含 1 位不佔床孩童）',
    note: '寬 120 公分，比台灣的單人床寬、比雙人床窄。兩個大人並睡會很擠。',
  },
  {
    name: '標準床（無障礙設計）',
    nameJa: 'レギュラーサイズ（アクセシブル）',
    size: '120 × 210 × 45 cm',
    capacity: '2 位（含 1 位不佔床孩童）',
    note: '床高 45 公分，方便輪椅平移。',
  },
  {
    name: '雙人床',
    nameJa: 'ダブルサイズ',
    size: '180 × 210 × 45 cm',
    capacity: '4 位（含 2 位不佔床孩童）',
    note: '180 公分寬，接近台灣的雙人加大。兩大兩小睡得下。',
  },
  {
    name: '推拉床',
    nameJa: 'トランドルベッド',
    size: '100 × 190 × 27 cm',
    capacity: '1 位',
    note: '平常收在標準床底下，拉出來就能用。床面只有 27 公分高，小孩滾下床也不會受傷。',
  },
  {
    name: '郵輪床',
    nameJa: 'クルーズベッド',
    size: '83 × 183 × 55 cm',
    capacity: '1 位',
    note: '需要加價的追加床，寬度只有 83 公分、長度 183 公分，成年男性睡起來偏短。',
  },
  {
    name: '凹室床',
    nameJa: 'アルコーヴベッド',
    size: '90 × 206 × 45 cm',
    capacity: '1 位',
    note: '嵌在牆面凹陷處的固定床。小朋友很愛，但體型較大的成人會覺得壓迫。',
  },
  {
    name: 'King size 雙人床',
    nameJa: 'キングベッド',
    size: '200 × 210 × 55 cm',
    capacity: '4 位（含 2 位不佔床孩童）',
    note: '僅華特・迪士尼套房配置。',
  },
  {
    name: '嬰兒床',
    nameJa: 'ベビーベッド',
    size: '64 × 115 × 108 cm',
    capacity: '未滿 18 個月孩童',
    note: '需事先預約，數量有限。',
  },
];

export interface Facility {
  name: string;
  nameEn: string;
  location: string;
  description: string;
  guestOnly?: boolean;
  photoTip?: string;
}

export const FACILITIES: Facility[] = [
  {
    name: '大廳挑高中庭',
    nameEn: 'Atrium Lobby',
    location: '2 樓',
    description:
      '挑高到最上層的中庭，兩盞水晶吊燈從天花板垂下，中央有一座噴泉。等候入住的時間本身就是行程的一部分。',
    photoTip: '噴泉最頂端站著小仙子。把吊燈的光當背景由下往上拍，是這座大廳最經典的一張。',
  },
  {
    name: '幻想曲廣場',
    nameEn: 'Fantasia Court',
    location: '3 樓・飯店正門入口',
    description:
      '以《幻想曲》為主題的噴泉廣場，主角是魔法師學徒造型的米奇與提水的掃把。搭電車來的人容易整趟都沒經過這裡。',
    photoTip:
      '園區裡原本在灰姑娘城堡後方的同款魔法師米奇銅像已經撤除，現在全度假區只剩這一座看得到。',
  },
  {
    name: '愛麗絲花園',
    nameEn: 'Alice Garden',
    location: '飯店正門出去後往左',
    description:
      '以《愛麗絲夢遊仙境》為主題的庭園，植栽修剪成黑桃、紅心、方塊、梅花的形狀，還有撲克牌士兵與玫瑰。',
    photoTip: '從大廳走出來不到一分鐘就會到，和幻想曲廣場可以一次拍完。',
  },
  {
    name: '米奇友誼廣場',
    nameEn: 'Mickey & Friends Square',
    location: '1 樓',
    description:
      '面向東京迪士尼樂園的中庭廣場，樹雕修剪成米奇、米妮、高飛舉手迎賓的樣子，背後就是世界市集。',
    photoTip: '想同時把飯店的金色外觀和樂園拍進同一張照片，這裡的角度最順。',
  },
  {
    name: '雪伍德花園',
    nameEn: 'Sherwood Garden',
    location: '1 樓',
    guestOnly: true,
    description:
      '住客限定的維多利亞式庭園，入口設有安全門，要用房卡感應才進得去。庭園內有池塘與涼亭，幾何式修剪的低矮灌木沿著步道排開。',
    photoTip: '入夜後整座庭園會打燈，噴泉浮在光裡。因為只有住客進得來，人非常少。',
  },
  {
    name: '戶外泳池',
    nameEn: 'Outdoor Pool',
    location: '飯店戶外・夏季限定',
    description:
      '以《小飛俠》為主題的戶外泳池，入口有彼得潘與虎克船長的樹雕對峙，池畔有滴滴嗒鱷魚造型噴泉。',
  },
  {
    name: '神仙教母美容院',
    nameEn: 'Bibbidi Bobbidi Boutique',
    location: '1 樓・8:00–14:30',
    description:
      '3 歲到小學六年級的孩子可以變身成迪士尼公主的美容院。飯店這一間可以選仙杜瑞拉、愛麗兒、貝兒、樂佩、安娜、艾莎；隔壁的「魔法紀念攝影棚」（1 樓・8:00–15:15）負責替變身後的小公主拍紀念照。',
    photoTip:
      '需要在使用日一個月前的上午 9 點於官方線上預約網站搶位。價格從約 9,350 日圓的皇冠課程到 40,150 日圓的王國課程都有。',
  },
  {
    name: '馬瑟林廳',
    nameEn: 'Merceline Salon',
    location: '3 樓・7:00–22:00・禮賓房專用貴賓室',
    description:
      '禮賓房與套房住客的專屬空間，入住手續在這裡辦，不用排大廳的隊。7:00–17:00 供應無酒精飲料，17:00–22:00 是小酌時間。園區票券也可以在這裡買，停車費同樣在這裡結算。',
  },
];

export interface Dining {
  name: string;
  nameEn: string;
  type: string;
  hours: string[];
  seats?: string;
  description: string;
  reservation?: string;
}

export const DINING: Dining[] = [
  {
    name: '雪伍德花園餐廳',
    nameEn: 'Sherwood Garden Restaurant',
    type: '自助餐',
    hours: ['早餐 6:30–10:00', '午餐／晚餐 11:30–21:00'],
    seats: '298 席',
    description:
      '面向雪伍德花園的大片落地窗自助餐廳，日式與西式都有。設有較低的兒童自助餐檯，午晚餐時小朋友可以自己在米奇餐盤上擺盤。奇奇蒂蒂造型麵包是社群上最常出現的一道。',
    reservation: '可線上申請優先入席（Priority Seating）',
  },
  {
    name: '美人蕉時尚餐廳',
    nameEn: 'Canna',
    type: '創作料理・套餐',
    hours: ['午餐 11:30–14:30', '晚餐 17:00–21:00'],
    seats: '90 席（含吧檯 10 席、包廂 10 席）',
    description:
      '以美人蕉（Canna）為設計主題的紅色現代空間，主打「健康與美麗」的創作料理，以套餐形式供應。不供應早餐，是飯店裡最安靜的一家。',
    reservation: '可線上申請優先入席，部分菜單為事先預約制',
  },
  {
    name: '夢想家歡飲廳',
    nameEn: "Dreamers Lounge",
    type: '大廳酒廊',
    hours: ['早餐 6:30–9:30', '午餐＆甜點 11:30–17:00', '晚餐＆雞尾酒 17:00–21:30'],
    description:
      '大廳旁明亮開放的酒廊，下午茶、輕食與調酒都在這裡。四種禮賓房型（精緻客房樂園景觀／樂園全景觀、精緻凹室客房樂園全景觀、塔樓客房）的早餐固定在這一間。',
    reservation: '不適用優先入席，僅部分餐點可事先預約',
  },
];

export interface Benefit {
  title: string;
  description: string;
  caveat?: string;
}

export const BENEFITS: Benefit[] = [
  {
    title: '歡樂入園（Happy Entry）',
    description:
      '比一般遊客早 15 分鐘進入東京迪士尼樂園或東京迪士尼海洋。樂園大飯店的住客兩座樂園都適用，通行證在入住時發放，入園時要同時出示通行證與門票。',
    caveat: '入住當天不適用，只有住宿期間的隔天與退房當天可以用。',
  },
  {
    title: '免費行李遞送到飯店',
    description:
      '抵達當天先到 JR 舞濱車站南口左前方的「東京迪士尼度假區迎賓中心」2 樓迪士尼飯店服務台，把行李免費送到飯店，人就可以直接進園。服務時間 7:30–16:00。',
  },
  {
    title: '回程行李遞送到車站',
    description:
      '退房後把行李交給飯店的行李服務櫃檯（受理 7:00–12:30），下午再到迎賓中心 2 樓領取，領取時間到 21:00。',
    caveat: '這一段是收費服務，和去程的免費遞送不同。',
  },
  {
    title: '飯店限定客房備品',
    description: '迪士尼明星圖案的原創備品組，可以帶回家。房內另附環保袋（每房每晚 2 個）。',
    caveat: '2023 年 2 月 28 日起客房不再放置紙袋，需要的話要向工作人員索取。',
  },
  {
    title: '免費迪士尼頻道',
    description: '客房電視可以免費收看迪士尼頻道，小孩在房間耗時間的救命工具。',
  },
  {
    title: '客房送餐服務',
    description:
      '在房內享用套餐或單點。並非所有房型都能使用，限迪士尼仙履奇緣客房、禮賓房尊爵客房（樂園景觀）、禮賓房陽台客房與陽台＆凹室客房（樂園全景觀）等房型。',
  },
];

export interface SocialInsight {
  platform: 'TikTok' | 'Instagram' | 'YouTube' | '部落格';
  headline: string;
  body: string;
  verdict: string;
}

export const SOCIAL_INSIGHTS: SocialInsight[] = [
  {
    platform: 'TikTok',
    headline: '「拉開窗簾」的那一秒，是所有房間開箱影片的公式',
    body: '樂園全景觀客房幾乎壟斷了這間飯店的短影音。運鏡幾乎都一樣：先拍門把、走過玄關、鏡頭轉向窗戶、拉開窗簾，世界市集與灰姑娘城堡同時進畫面。實際住過的人補充，白天從窗戶看出去，遠方還能看到迪士尼海洋的普羅米修斯火山與驚魂古塔。',
    verdict: '影片會給你正面景的期待值，但拍的幾乎都是 7–8 樓。低樓層的成品差很多。',
  },
  {
    platform: 'Instagram',
    headline: '住客限定的雪伍德花園，是這間飯店最少人拍到的地方',
    body: '雪伍德花園入口設有安全門，必須用房卡感應才進得去，等於只有辦完入住到退房之間的那段時間能進。庭園裡有噴泉與涼亭，晚上會打燈。因為擋掉了所有非住客，人少到可以慢慢喬角度。',
    verdict: '如果只打算在飯店拍一組照片，選這裡，不要選大廳。大廳永遠都有人。',
  },
  {
    platform: 'TikTok',
    headline: '活動檔期的限定房型，是社群上真正的搶手貨',
    body: '飯店會配合園區活動推出期間限定客房。例如 2026 年 1 月 14 日到 3 月 2 日配合「米妮的歡樂園地」推出的米妮主題房，一室約 78,000 日圓起，住客（不含不佔床孩童）可獲得限定備品，另有需預約的限定房卡與卡套。',
    verdict: '這類房型的重點是限定商品而不是房間本身，走的是收藏心態。日期一公布就要盯著。',
  },
  {
    platform: '部落格',
    headline: '天花板花灑的方向要先看清楚',
    body: '這是少數同時有手持蓮蓬頭和天花板花灑的迪士尼飯店。有創作者分享自己沒看說明就轉開關，結果水直接從頭頂灌下來。',
    verdict: '進浴室先看一眼切換閥的方向，這條建議很無聊但真的有用。',
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: '一定要住到「樂園全景觀」才看得到煙火嗎？',
    answer:
      '不一定。樂園景觀也看得到，只是角度偏斜、構圖沒那麼完整，價格便宜約 8,500 日圓。真正必須避開的是沒有標註景觀的房型，那些窗外是中庭或正門側，完全看不到。',
  },
  {
    question: '可以指定樓層或房號嗎？',
    answer:
      '不行。官方的客房分類涵蓋整個樓層區間（例如樂園景觀是 3–8 樓），訂房時選不到其中特定樓層，也不接受指定房號。可以做的只有在訂房備註欄寫「希望高樓層」，飯店會視當天狀況盡量配合，但沒有保證。',
  },
  {
    question: '迪士尼明星房看得到樂園嗎？',
    answer:
      '九種明星房型都沒有景觀標註。官方寫的是面向飯店正門，但附註「部分客房除外」，所以少數位置其實朝樂園側；只是這類房不以景觀販售、也無法指定房號。想要主題房又想確保看得到樂園，在這間飯店只能二選一。',
  },
  {
    question: '訂房什麼時候開賣？',
    answer:
      '只訂客房（不含門票的方案）在住宿日的 4 個月前同日上午 11:00（日本時間）開放，一次最多可訂 5 晚、3 間房。如果四個月前的那個月份沒有對應日期，會順延到再下個月 1 日的 11:00 開始受理，官方舉的例子是 10 月 31 日的住宿要等 7 月 1 日 11:00。',
  },
  {
    question: '禮賓房值得加價嗎？',
    answer:
      '把翌日早餐折算進去再判斷。以四人入住為例，早餐本身就是一筆不小的支出，加上專屬櫃檯入住、貴賓室的時段輕食，禮賓房與同景觀的標準房價差會比帳面上看起來小。如果只有兩個人、又不打算在飯店久待，那筆錢換成正面景的標準房通常比較划算。',
  },
  {
    question: '從舞濱車站怎麼走過去？',
    answer:
      'JR 舞濱車站南口出來右轉，經過「迪士尼一路順風」商店後繼續往樂園方向走，約 8 分鐘。也可以在車站旁的度假區總站搭迪士尼度假區線，第一站「東京迪士尼樂園站」下車，車站就在飯店與樂園之間。飯店位在樂園正前方，走到入口很近。',
  },
  {
    question: '有什麼近期要注意的施工？',
    answer:
      '兩件事。第一，東京迪士尼樂園站的站體整修預計進行到 2027 年 5 月底，深夜 0:00 到 6:00 部分客房可能聽到約 45 分貝的施工聲；官方已確認 2026 年 8 月 3 日以後的住宿不受影響。第二，2027 年 1 月 4 日到 3 月 14 日飯店會分批整修客房，期間可能有噪音、震動與油漆氣味，部分房間停售。',
  },
];

// ── Derived helpers ────────────────────────────────────────────────────────

export const ROOM_COUNT = ROOMS.length;

export function roomsByCategory(key: CategoryKey): Room[] {
  return ROOMS.filter((room) => room.category === key);
}

export function cheapestRoom(): Room {
  return ROOMS.reduce((min, room) => (room.priceFrom < min.priceFrom ? room : min));
}

export function formatYen(value: number): string {
  return `¥${value.toLocaleString('en-US')}`;
}

export function toTwd(yen: number): number {
  return Math.round(yen / HOTEL.jpyPerTwd / 100) * 100;
}
