/**
 * Tokyo DisneySea Hotel MiraCosta room database.
 *
 * Names, capacities, sizes, bed configurations and view definitions follow the
 * official Traditional Chinese guest-room listing and its Japanese detail
 * pages as published on 2026-08-03. Reference rates follow CASTEL's 2026
 * month-by-month tables; the official booking engine, not this file, is the
 * authority for the price of a particular date.
 *
 * The official room index groups multiple bed layouts and occupancies under one
 * link. This dataset deliberately splits them: a 37 m² double, a 37 m² twin and
 * a 40 m² four-guest room are three booking decisions even when the website
 * prints one heading over all three.
 */

import type {
  BedSpec,
  Benefit,
  Dining,
  Facility,
  Faq,
  HotelFact,
  Room,
  RoomCategory,
  RoomFlag,
  RoomView,
  SocialInsight,
} from './hotel';
import { formatYen } from './hotel';

export const HOTEL = {
  name: '東京迪士尼海洋觀海景大飯店',
  nameJa: '東京ディズニーシー・ホテルミラコスタ',
  nameEn: 'Tokyo DisneySea Hotel MiraCosta',
  opened: 2001,
  totalRooms: 502,
  floors: '地上 5 層',
  style: '義大利古典風格',
  checkIn: '15:00',
  checkOut: '12:00',
  slug: 'tokyo-disneysea-hotel-miracosta',
  region: '千葉縣',
  locality: '浦安市',
  officialUrl: 'https://www.tokyodisneyresort.jp/tc/hotel/dhm.html',
  roomsUrl: 'https://www.tokyodisneyresort.jp/tc/hotel/dhm/room.html',
  /** Yen per TWD, rounded, used only for rough conversions in the UI. */
  jpyPerTwd: 4.7,
} as const;

export const FLAGS: RoomFlag[] = [
  { key: 'captain', label: '米奇船長主題', badge: true },
  { key: 'open', label: '開放型衛浴', badge: true },
  { key: 'three-beds', label: '3 張標準床', badge: true, filter: true },
  { key: 'patio', label: '私人中庭', badge: true, filter: true },
  { key: 'balcony', label: '可走上陽台', badge: true, filter: true },
  { key: 'terrace', label: '約 30 m² 露天陽台', badge: true, filter: true },
  { key: 'lounge', label: '專用貴賓室', badge: true, filter: true },
  { key: 'breakfast', label: '含早餐', badge: true },
  { key: 'accessible', label: '無障礙', badge: true },
  { key: 'suite', label: '套房', badge: true },
];

export const VIEWS: RoomView[] = [
  {
    key: 'harbour-grand',
    label: '港灣全景觀',
    labelJa: 'ハーバーグランドビュー',
    labelEn: 'Harbor Grand View',
    summary: '從 5 樓約 30 m² 露天陽台看港灣',
    detail:
      '全館只有 5353、5357 兩間。官方定義不是單純「看得到整個港灣」，而是能從寬敞露天陽台欣賞港灣景色；這是頂樓陽台客房專屬的最高景觀級。',
  },
  {
    key: 'harbour',
    label: '港灣景觀',
    labelJa: 'ハーバービュー',
    labelEn: 'Harbor View',
    summary: '可一覽樂園海港全景',
    detail:
      '官方保證能看到樂園海港全景。要在房內看完整水上表演，房名至少要有「港灣景觀」；一般廣場景觀可能看得到部分演出，但不是同一件事。',
  },
  {
    key: 'piazza-grand',
    label: '廣場全景觀',
    labelJa: 'ピアッツァグランドビュー',
    labelEn: 'Piazza Grand View',
    summary: '廣場、街道，外加一部分港灣',
    detail:
      '比一般廣場景觀多看得到港灣的一部分，是價格與景色之間的中間解。不是港灣全景，也不保證完整看到水上表演。',
  },
  {
    key: 'piazza',
    label: '廣場景觀',
    labelJa: 'ピアッツァビュー',
    labelEn: 'Piazza View',
    summary: '看港町廣場與街道',
    detail:
      '主角是米老鼠廣場與建築街景，不是水面。同一級橫跨兩段長走廊，窗戶角度差很大；部分房間能斜看到港灣，房名卻不保證。',
  },
  {
    key: 'canal',
    label: '宮殿運河景觀',
    labelJa: 'パラッツォ・カナルビュー',
    labelEn: 'Palazzo Canals View',
    summary: '看威尼斯運河、橋與貢多拉',
    detail:
      '官方保證面向宮殿運河沿岸街景。看不到地中海港灣的水上表演，換來的是晚上閉園後像住在園區街道裡的安靜感。',
  },
  {
    key: 'aqua',
    label: '迪士尼海洋水之行星景觀',
    labelJa: 'ディズニーシー・アクアスフィアビュー',
    labelEn: 'DisneySea AquaSphere View',
    summary: '面向正門，保證看得到水之行星',
    detail:
      '托斯卡納區唯一有明確景觀保證的類別。窗外是東京迪士尼海洋入口與水之行星，不是園內港灣；2027 年 4 月起會因入口工程停賣約一年。',
  },
  {
    key: 'partial',
    label: '景隅景觀',
    labelJa: 'パーシャルビュー',
    labelEn: 'Partial View',
    summary: '人在園內側，但視線被牆或屋頂擋住',
    detail:
      '官方日文直譯是「部分景觀」：面向港町，卻會被建築牆面或屋頂遮擋。它和托斯卡納、威尼斯入門房同價，買到的是園內位置，不是景色。',
  },
  {
    key: 'none',
    label: '景觀未指定',
    labelJa: '眺望指定なし',
    labelEn: 'No designated view',
    summary: '房名沒有承諾窗外看得到什麼',
    detail:
      '托斯卡納與威尼斯的一般客房只承諾所在區域，不承諾窗外景色。官方特別提醒：「區」描述的是外觀與氛圍，不代表每間房的眺望。',
  },
];

export const CATEGORIES: RoomCategory[] = [
  {
    key: 'tuscany',
    label: '托斯卡納區',
    labelEn: 'Tuscany Side',
    summary: '面向飯店正門與東京迪士尼海洋入口；全部是米奇船長航海主題。',
    perks: ['全數最多 3 位', '37 或 43 m²', '部分可保證水之行星景觀', '價格門檻最低'],
  },
  {
    key: 'venice',
    label: '威尼斯區',
    labelEn: 'Venice Side',
    summary: '面向宮殿運河或 SPA；有全館唯一的私人中庭房與非尊榮陽台房。',
    perks: ['運河街景', '最多 4 位', '私人中庭／陽台', '沒有港灣全景'],
  },
  {
    key: 'porto',
    label: '海港區',
    labelEn: 'Porto Paradiso Side',
    summary: '面向地中海港灣的港町；是否看得到完整水面，由景觀後綴決定。',
    perks: ['景隅／廣場／港灣三級', '可看園內街景', '部分房型 4 位', '不含貴賓室與早餐'],
  },
  {
    key: 'speciale',
    label: '尊榮客房＆套房',
    labelEn: 'Speciale Rooms & Suites',
    summary: '威尼斯與海港區的最高層級，含德拉米可廳貴賓室與翌日早餐。',
    perks: ['專用貴賓室', '含翌日早餐', '專屬入住櫃檯', '陽台／露天陽台／套房'],
  },
];

type RoomInput = Omit<Room, 'coSleepers' | 'flags'> & {
  coSleepers?: number;
  flags?: string[];
};

const defineRoom = (room: RoomInput): Room => ({
  coSleepers: 2,
  flags: [],
  ...room,
});

export const ROOMS: Room[] = [
  // ── 托斯卡納區 ────────────────────────────────────────────────────────────
  defineRoom({
    id: 'tosca-superior-double',
    name: '米奇船長精緻客房・1 張雙人床',
    nameJa: 'カピターノ・ミッキー・スーペリアルーム（ダブル）',
    category: 'tuscany',
    view: 'none',
    capacity: 3,
    beds: '1 張雙人床 ＋ 推拉床',
    size: '37',
    sizeValue: 37,
    priceFrom: 83000,
    floors: '2–5 樓',
    flags: ['captain'],
    verdict: '兩位大人想睡同一張床的入門選擇；加上推拉床可以住第三位，但房名不保證窗外景色。',
  }),
  defineRoom({
    id: 'tosca-superior-twin',
    name: '米奇船長精緻客房・2 張標準床',
    nameJa: 'カピターノ・ミッキー・スーペリアルーム（ツイン）',
    category: 'tuscany',
    view: 'none',
    capacity: 3,
    beds: '2 張標準床 ＋ 推拉床',
    size: '37',
    sizeValue: 37,
    priceFrom: 83000,
    floors: '2–5 樓',
    flags: ['captain'],
    verdict: '全飯店最標準的三人配置，也是最低價的一檔。花錢買主題內裝與園內飯店，不是窗景。',
  }),
  defineRoom({
    id: 'tosca-superior-open',
    name: '米奇船長精緻客房（開放型）',
    nameJa: 'カピターノ・ミッキー・スーペリアルーム（オープンタイプ）',
    category: 'tuscany',
    view: 'none',
    capacity: 3,
    beds: '2 張標準床 ＋ 推拉床',
    size: '37',
    sizeValue: 37,
    priceFrom: 83000,
    floors: '2–5 樓',
    flags: ['captain', 'open'],
    verdict: '洗手台、浴室、廁所之間沒有門，視覺較開闊；朋友同行或有人早睡時，隱私與聲音反而是缺點。',
  }),
  defineRoom({
    id: 'tosca-superior-aqua',
    name: '米奇船長精緻客房（迪士尼海洋水之行星景觀）',
    nameJa:
      'カピターノ・ミッキー・スーペリアルーム（ディズニーシー・アクアスフィアビュー）',
    category: 'tuscany',
    view: 'aqua',
    capacity: 3,
    beds: '2 張標準床 ＋ 推拉床',
    size: '37',
    sizeValue: 37,
    priceFrom: 88500,
    floors: '2–5 樓',
    flags: ['captain'],
    verdict: '只比無景觀版本多約 5,500 日圓，就從抽窗景變成保證看到水之行星；托斯卡納區最值得的加價。',
    note: '官方公告 2027/4/13–2028/4/10 因東京迪士尼海洋入口周邊施工停賣。',
  }),
  defineRoom({
    id: 'tosca-triple',
    name: '米奇船長三床客房',
    nameJa: 'カピターノ・ミッキー・トリプルルーム',
    category: 'tuscany',
    view: 'none',
    capacity: 3,
    coSleepers: 3,
    beds: '3 張標準床',
    size: '43',
    sizeValue: 43,
    priceFrom: 88500,
    floors: '2–5 樓',
    flags: ['captain', 'three-beds'],
    verdict: '三位大人每人一張 120 公分寬正規床，不用讓任何人睡低矮推拉床；只比基本房多約 5,500 日圓。',
  }),
  defineRoom({
    id: 'tosca-triple-aqua',
    name: '米奇船長三床客房（迪士尼海洋水之行星景觀）',
    nameJa:
      'カピターノ・ミッキー・トリプルルーム（ディズニーシー・アクアスフィアビュー）',
    category: 'tuscany',
    view: 'aqua',
    capacity: 3,
    coSleepers: 3,
    beds: '3 張標準床',
    size: '43',
    sizeValue: 43,
    priceFrom: 94000,
    floors: '2–5 樓',
    flags: ['captain', 'three-beds'],
    verdict: '三張正規床加水之行星保證，是托斯卡納的完整版本；代價是不能住第四位大人。',
    note: '官方公告 2027/4/13–2028/4/10 因東京迪士尼海洋入口周邊施工停賣。',
  }),

  // ── 威尼斯區 ──────────────────────────────────────────────────────────────
  defineRoom({
    id: 'venez-superior-double',
    name: '精緻客房・1 張雙人床',
    nameJa: 'ヴェネツィア・サイド スーペリアルーム（ダブル）',
    category: 'venice',
    view: 'none',
    capacity: 3,
    beds: '1 張雙人床 ＋ 推拉床',
    size: '37',
    sizeValue: 37,
    priceFrom: 83000,
    floors: '2–5 樓',
    verdict: '和托斯卡納入門房同價，差別是放棄米奇船長主題，換到較安靜的運河一翼。',
  }),
  defineRoom({
    id: 'venez-superior-twin',
    name: '精緻客房・2 張標準床',
    nameJa: 'ヴェネツィア・サイド スーペリアルーム（ツイン）',
    category: 'venice',
    view: 'none',
    capacity: 3,
    beds: '2 張標準床 ＋ 推拉床',
    size: '37',
    sizeValue: 37,
    priceFrom: 83000,
    floors: '2–5 樓',
    verdict: '威尼斯區最低門檻，但「威尼斯區」不是運河景觀保證；真正在意運河，就加價選房名有括號的版本。',
  }),
  defineRoom({
    id: 'venez-superior-canal',
    name: '精緻客房（宮殿運河景觀）',
    nameJa: 'ヴェネツィア・サイド スーペリアルーム（パラッツォ・カナルビュー）',
    category: 'venice',
    view: 'canal',
    capacity: 3,
    beds: '2 張標準床 ＋ 推拉床',
    size: '37',
    sizeValue: 37,
    priceFrom: 88500,
    floors: '2–5 樓',
    verdict: '多約 5,500 日圓把「可能」變成保證面向運河；晚上看橋、街燈和空掉的園區，比白天更有價值。',
  }),
  defineRoom({
    id: 'venez-triple',
    name: '三床客房',
    nameJa: 'ヴェネツィア・サイド トリプルルーム',
    category: 'venice',
    view: 'none',
    capacity: 3,
    coSleepers: 3,
    beds: '3 張標準床',
    size: '43',
    sizeValue: 43,
    priceFrom: 88500,
    floors: '2–5 樓',
    flags: ['three-beds'],
    verdict: '三大人同行的務實選擇：比基本房多 6 m²、每人一張正規床，價格卻和運河景觀精緻客房同檔。',
  }),
  defineRoom({
    id: 'venez-triple-canal',
    name: '三床客房（宮殿運河景觀）',
    nameJa: 'ヴェネツィア・サイド トリプルルーム（パラッツォ・カナルビュー）',
    category: 'venice',
    view: 'canal',
    capacity: 3,
    coSleepers: 3,
    beds: '3 張標準床',
    size: '43',
    sizeValue: 43,
    priceFrom: 94000,
    floors: '2–5 樓',
    flags: ['three-beds'],
    verdict: '三張正規床和保證運河景同時擁有，不需要在睡眠品質與景色之間二選一。',
  }),
  defineRoom({
    id: 'venez-patio',
    name: '宮殿中庭客房',
    nameJa: 'ヴェネツィア・サイド パラッツォパティオルーム',
    category: 'venice',
    view: 'none',
    capacity: 4,
    beds: '2 張標準床 ＋ 推拉床 ＋ 郵輪床',
    size: '37',
    sizeValue: 37,
    priceFrom: 96000,
    floors: '1 樓',
    flags: ['patio'],
    verdict: '全館唯一的一樓私人小中庭；沒有港灣景，卻是一般房裡少數能走到戶外、也能住四位大人的選擇。',
    note: '官方公告 2027/4/7–5/11 因客房整修停賣。',
  }),
  defineRoom({
    id: 'venez-balcony',
    name: '陽台客房',
    nameJa: 'ヴェネツィア・サイド バルコニールーム',
    category: 'venice',
    view: 'canal',
    capacity: 4,
    beds: '2 張標準床 ＋ 推拉床 ＋ 郵輪床',
    size: '37–43',
    sizeValue: 40,
    priceFrom: 97400,
    floors: '2 樓',
    flags: ['balcony'],
    verdict: '2025 年新增、可走到宮殿運河陽台，卻不屬尊榮等級；不用為貴賓室和早餐付費，是全館最大的價格例外。',
    note: '官方公告 2027/4/7–5/11 因客房整修停賣。',
  }),

  // ── 海港區 ────────────────────────────────────────────────────────────────
  defineRoom({
    id: 'porto-superior-partial',
    name: '精緻客房（景隅景觀）',
    nameJa: 'ポルト・パラディーゾ・サイド スーペリアルーム（パーシャルビュー）',
    category: 'porto',
    view: 'partial',
    capacity: 3,
    beds: '2 張標準床 ＋ 推拉床',
    size: '37',
    sizeValue: 37,
    priceFrom: 83000,
    floors: '2–5 樓',
    verdict: '用托斯卡納入門房的價格住進園內側，但官方直接寫明會被牆或屋頂擋住。別把它當便宜版港灣景觀。',
    note: '不同位置落差極大；住客曾把 3147 窗外稱為「碎石景觀」，只能斜看夜間表演的光。',
  }),
  defineRoom({
    id: 'porto-superior-piazza-double',
    name: '精緻客房（廣場景觀）・1 張雙人床',
    nameJa:
      'ポルト・パラディーゾ・サイド スーペリアルーム（ピアッツァビュー）（ダブル）',
    category: 'porto',
    view: 'piazza',
    capacity: 3,
    beds: '1 張雙人床 ＋ 推拉床',
    size: '37',
    sizeValue: 37,
    priceFrom: 93000,
    floors: '2–5 樓',
    verdict: '全海港區只有 7 間雙人床廣場景觀；兩人旅行不想分床，又要園內街景，選項就只剩這格。',
  }),
  defineRoom({
    id: 'porto-superior-piazza-twin',
    name: '精緻客房（廣場景觀）・2 張標準床',
    nameJa:
      'ポルト・パラディーゾ・サイド スーペリアルーム（ピアッツァビュー）（ツイン）',
    category: 'porto',
    view: 'piazza',
    capacity: 3,
    beds: '2 張標準床 ＋ 推拉床',
    size: '37',
    sizeValue: 37,
    priceFrom: 93000,
    floors: '2–5 樓',
    verdict: '海港區數量最多、相對最好訂的入門景觀房；主景是廣場與街屋，水上表演只能看位置運氣。',
  }),
  defineRoom({
    id: 'porto-superior-piazza-quad',
    name: '精緻客房（廣場景觀）・4 位',
    nameJa:
      'ポルト・パラディーゾ・サイド スーペリアルーム（ピアッツァビュー）（4名対応）',
    category: 'porto',
    view: 'piazza',
    capacity: 4,
    beds: '2 張標準床 ＋ 推拉床 ＋ 郵輪床',
    size: '40',
    sizeValue: 40,
    priceFrom: 93000,
    floors: '2–5 樓',
    verdict: '一般房層級、四位大人、園內街景三件事同時成立的最低門檻；第四張郵輪床只有 84 × 182 公分。',
    note: '公開費率來源沒有把 4 位版拆開定價；此處沿用同名 37 m² 房的表，實際訂房價通常較高。',
  }),
  defineRoom({
    id: 'porto-superior-piazza-accessible',
    name: '精緻客房（廣場景觀）（無障礙設計）',
    nameJa:
      'ポルト・パラディーゾ・サイド スーペリアルーム（ピアッツァビュー）（アクセシブル）',
    category: 'porto',
    view: 'piazza',
    capacity: 2,
    beds: '1 張無障礙雙人床',
    size: '37',
    sizeValue: 37,
    priceFrom: 93000,
    floors: '3–4 樓',
    flags: ['accessible'],
    verdict: '只有 3103、4103 兩間；床高降到 45 公分，門寬、浴缸扶手與廁所動線按輪椅使用設計。',
  }),
  defineRoom({
    id: 'porto-superior-piazza-grand-twin',
    name: '精緻客房（廣場全景觀）・3 位',
    nameJa:
      'ポルト・パラディーゾ・サイド スーペリアルーム（ピアッツァグランドビュー）',
    category: 'porto',
    view: 'piazza-grand',
    capacity: 3,
    beds: '2 張標準床 ＋ 推拉床',
    size: '37',
    sizeValue: 37,
    priceFrom: 104900,
    floors: '2–4 樓',
    verdict: '比一般廣場景觀多看一部分港灣，又比完整港灣景觀便宜約 6,100 日圓；景觀預算的中間解。',
  }),
  defineRoom({
    id: 'porto-superior-piazza-grand-quad',
    name: '精緻客房（廣場全景觀）・4 位',
    nameJa:
      'ポルト・パラディーゾ・サイド スーペリアルーム（ピアッツァグランドビュー）（4名対応）',
    category: 'porto',
    view: 'piazza-grand',
    capacity: 4,
    beds: '2 張標準床 ＋ 推拉床 ＋ 郵輪床',
    size: '40',
    sizeValue: 40,
    priceFrom: 104900,
    floors: '2–4 樓',
    verdict: '四位版的中間景；如果完整看表演不是硬條件，這比港灣景觀省下的錢最有感。',
    note: '公開費率來源沒有把 4 位版拆開定價；實際金額以官方訂房日曆為準。',
  }),
  defineRoom({
    id: 'porto-superior-harbour-twin',
    name: '精緻客房（港灣景觀）・3 位',
    nameJa: 'ポルト・パラディーゾ・サイド スーペリアルーム（ハーバービュー）',
    category: 'porto',
    view: 'harbour',
    capacity: 3,
    beds: '2 張標準床 ＋ 推拉床',
    size: '37',
    sizeValue: 37,
    priceFrom: 111000,
    floors: '2–4 樓',
    verdict: '要完整水面、不需要貴賓室，從這格開始。36 間是港灣景觀裡供給最多的一型，仍然是開賣主戰場。',
  }),
  defineRoom({
    id: 'porto-superior-harbour-quad',
    name: '精緻客房（港灣景觀）・4 位',
    nameJa:
      'ポルト・パラディーゾ・サイド スーペリアルーム（ハーバービュー）（4名対応）',
    category: 'porto',
    view: 'harbour',
    capacity: 4,
    beds: '2 張標準床 ＋ 推拉床 ＋ 郵輪床',
    size: '40',
    sizeValue: 40,
    priceFrom: 111000,
    floors: '3–4 樓',
    verdict: '四位大人要完整港灣、又不買尊榮服務的唯一選擇。只有 13 間，供給不到三人版的一半。',
    note: '公開費率來源沒有把 4 位版拆開定價；實際金額以官方訂房日曆為準。',
  }),
  defineRoom({
    id: 'porto-triple-piazza',
    name: '三床客房（廣場景觀）',
    nameJa: 'ポルト・パラディーゾ・サイド トリプルルーム（ピアッツァビュー）',
    category: 'porto',
    view: 'piazza',
    capacity: 3,
    coSleepers: 3,
    beds: '3 張標準床',
    size: '43',
    sizeValue: 43,
    priceFrom: 98500,
    floors: '2–5 樓',
    flags: ['three-beds'],
    verdict: '三位大人每人一張正規床，還能看廣場；一層只有一間，全館共 4 間。',
  }),

  // ── 尊榮客房＆套房 ────────────────────────────────────────────────────────
  defineRoom({
    id: 'spec-venez-terrace',
    name: '威尼斯區 頂樓陽台客房',
    nameJa: 'スペチアーレ・ルーム＆スイート ヴェネツィア・サイド テラスルーム',
    category: 'speciale',
    view: 'canal',
    capacity: 2,
    beds: '1 張頂樓陽台客房專用雙人床（160 cm）',
    size: '43',
    sizeValue: 43,
    priceFrom: 119500,
    floors: '5 樓',
    flags: ['terrace', 'lounge', 'breakfast'],
    verdict: '室內 43 m² 外加約 30 m² 露天陽台，面向宮殿運河；不追港灣表演、只想安靜住戶外空間，選它。',
    note: '官方公告 2027/1/13–2/16 因客房整修停賣。',
  }),
  defineRoom({
    id: 'spec-superior-harbour-triple',
    name: '精緻客房（港灣景觀）・尊榮 3 位',
    nameJa:
      'スペチアーレ・ルーム＆スイート ポルト・パラディーゾ・サイド スーペリアルーム（ハーバービュー）',
    category: 'speciale',
    view: 'harbour',
    capacity: 3,
    beds: '2 張標準床 ＋ 推拉床',
    size: '40',
    sizeValue: 40,
    priceFrom: 130000,
    floors: '5 樓',
    flags: ['lounge', 'breakfast'],
    verdict: '尊榮層級的入門款：5 樓港灣全景、貴賓室與早餐；比一般 37 m² 港灣景觀起價多約 19,000 日圓。',
  }),
  defineRoom({
    id: 'spec-superior-harbour-quad',
    name: '精緻客房（港灣景觀）・尊榮 4 位',
    nameJa:
      'スペチアーレ・ルーム＆スイート ポルト・パラディーゾ・サイド スーペリアルーム（ハーバービュー）（4名対応）',
    category: 'speciale',
    view: 'harbour',
    capacity: 4,
    beds: '2 張標準床 ＋ 推拉床 ＋ 郵輪床',
    size: '40',
    sizeValue: 40,
    priceFrom: 139400,
    floors: '5 樓',
    flags: ['lounge', 'breakfast'],
    verdict: '四人份早餐加貴賓室後，和一般四人港灣景觀的真實價差往往比帳面小；四人同行最容易把加價用回來。',
  }),
  defineRoom({
    id: 'spec-balcony-piazza',
    name: '陽台客房（廣場景觀）',
    nameJa:
      'スペチアーレ・ルーム＆スイート ポルト・パラディーゾ・サイド バルコニールーム（ピアッツァビュー）',
    category: 'speciale',
    view: 'piazza',
    capacity: 4,
    beds: '2 張標準床 ＋ 推拉床 ＋ 追加床',
    size: '40–43',
    sizeValue: 41,
    priceFrom: 152500,
    floors: '2 樓',
    flags: ['balcony', 'lounge', 'breakfast'],
    verdict: '全館只有 2343 一間。景觀不是最頂，但能真的站到園區側陽台；稀少性比規格更能解釋它為什麼難訂。',
  }),
  defineRoom({
    id: 'spec-balcony-harbour-triple',
    name: '陽台客房（港灣景觀）・3 位',
    nameJa:
      'スペチアーレ・ルーム＆スイート ポルト・パラディーゾ・サイド バルコニールーム（ハーバービュー）',
    category: 'speciale',
    view: 'harbour',
    capacity: 3,
    beds: '2 張標準床 ＋ 推拉床',
    size: '37',
    sizeValue: 37,
    priceFrom: 161500,
    floors: '2–3 樓',
    flags: ['balcony', 'lounge', 'breakfast'],
    verdict: '走到戶外看整個港灣，距離水面比頂樓陽台近；房間本身只有 37 m²，錢幾乎都花在那道陽台門。',
    note: '官方公告 2027/5/12–6/15 因客房整修停賣。',
  }),
  defineRoom({
    id: 'spec-balcony-harbour-quad',
    name: '陽台客房（港灣景觀）・4 位',
    nameJa:
      'スペチアーレ・ルーム＆スイート ポルト・パラディーゾ・サイド バルコニールーム（ハーバービュー）（4名対応）',
    category: 'speciale',
    view: 'harbour',
    capacity: 4,
    beds: '2 張標準床 ＋ 推拉床 ＋ 郵輪床',
    size: '40',
    sizeValue: 40,
    priceFrom: 161500,
    floors: '3 樓',
    flags: ['balcony', 'lounge', 'breakfast'],
    verdict: '四位大人能一起在私人陽台俯瞰水上表演；只有 3 間，預算通常不是最難的條件，庫存才是。',
  }),
  defineRoom({
    id: 'spec-terrace-piazza',
    name: '頂樓陽台客房（廣場景觀）',
    nameJa:
      'スペチアーレ・ルーム＆スイート ポルト・パラディーゾ・サイド テラスルーム（ピアッツァビュー）',
    category: 'speciale',
    view: 'piazza',
    capacity: 2,
    beds: '1 張頂樓陽台客房專用雙人床（160 cm）',
    size: '43',
    sizeValue: 43,
    priceFrom: 158500,
    floors: '5 樓',
    flags: ['terrace', 'lounge', 'breakfast'],
    verdict: '約 30 m² 露天陽台看廣場街景；比港灣全景版本便宜約 12,500 日圓，戶外空間本身才是選它的理由。',
    note: '官方公告 2027/2/17–3/23 因客房整修停賣。',
  }),
  defineRoom({
    id: 'spec-terrace-harbour',
    name: '頂樓陽台客房（港灣景觀）',
    nameJa:
      'スペチアーレ・ルーム＆スイート ポルト・パラディーゾ・サイド テラスルーム（ハーバービュー）',
    category: 'speciale',
    view: 'harbour',
    capacity: 2,
    beds: '1 張頂樓陽台客房專用雙人床（160 cm）',
    size: '43',
    sizeValue: 43,
    priceFrom: 165500,
    floors: '5 樓',
    flags: ['terrace', 'lounge', 'breakfast'],
    verdict: '房內規格和廣場版相同，多付約 7,000 日圓把露天陽台的主景換成整片港灣。',
    note: '官方公告 2027/1/13–2/16 因客房整修停賣。',
  }),
  defineRoom({
    id: 'spec-terrace-harbour-grand',
    name: '頂樓陽台客房（港灣全景觀）',
    nameJa:
      'スペチアーレ・ルーム＆スイート ポルト・パラディーゾ・サイド テラスルーム（ハーバーグランドビュー）',
    category: 'speciale',
    view: 'harbour-grand',
    capacity: 2,
    beds: '1 張頂樓陽台客房專用雙人床（160 cm）',
    size: '43',
    sizeValue: 43,
    priceFrom: 171000,
    floors: '5 樓',
    flags: ['terrace', 'lounge', 'breakfast'],
    verdict: '日本住客口中的「ハバグラ」。只有 5353、5357 兩間；比一般港灣版多約 5,500 日圓，真正的成本是搶不到。',
  }),
  defineRoom({
    id: 'spec-harbour-room-piazza',
    name: '地中海客房（廣場景觀）',
    nameJa:
      'スペチアーレ・ルーム＆スイート ポルト・パラディーゾ・サイド ハーバールーム（ピアッツァビュー）',
    category: 'speciale',
    view: 'piazza',
    capacity: 4,
    beds: '2 張標準床（好萊塢雙床）＋ 推拉床 ＋ 追加床',
    size: '60',
    sizeValue: 60,
    priceFrom: 146500,
    floors: '3–5 樓',
    flags: ['lounge', 'breakfast'],
    verdict: '兩扇大窗、60 m²、最多四位；同價帶裡，比陽台房多 20 m²，少的是走到戶外的能力。',
  }),
  defineRoom({
    id: 'spec-harbour-room-harbour',
    name: '地中海客房（港灣景觀）',
    nameJa:
      'スペチアーレ・ルーム＆スイート ポルト・パラディーゾ・サイド ハーバールーム（ハーバービュー）',
    category: 'speciale',
    view: 'harbour',
    capacity: 4,
    beds: '2 張標準床（好萊塢雙床）＋ 推拉床 ＋ 追加床',
    size: '60',
    sizeValue: 60,
    priceFrom: 152000,
    floors: '3–5 樓',
    flags: ['lounge', 'breakfast'],
    verdict: '60 m²、兩扇大窗、完整港灣，起價反而低於 37 m² 的陽台房。重視室內空間多過戶外，這格更划算。',
  }),
  defineRoom({
    id: 'spec-porto-suite',
    name: '海港套房',
    nameJa:
      'スペチアーレ・ルーム＆スイート ポルト・パラディーゾ・サイド ポルト・パラディーゾ・スイート',
    category: 'speciale',
    view: 'piazza',
    capacity: 2,
    beds: '2 張標準床',
    size: '81',
    sizeValue: 81,
    priceFrom: 280000,
    floors: '3–4 樓',
    flags: ['lounge', 'breakfast', 'suite'],
    verdict: '獨立客廳、按摩浴缸與獨立淋浴間；四間都在廣場側，別因為叫「海港套房」就以為是港灣全景。',
    note: '公開費率表列全年 ¥280,000；同一來源的文章內文仍寫舊區間 ¥185,000–250,000，本站採表格但標示這個矛盾。',
  }),
  defineRoom({
    id: 'spec-miracosta-suite',
    name: '觀海景套房',
    nameJa:
      'スペチアーレ・ルーム＆スイート ポルト・パラディーゾ・サイド ミラコスタ・スイート',
    category: 'speciale',
    view: 'harbour',
    capacity: 3,
    beds: '2 張標準床（好萊塢雙床）＋ 推拉床',
    size: '87',
    sizeValue: 87,
    priceFrom: 360000,
    floors: '2–5 樓',
    flags: ['lounge', 'breakfast', 'suite'],
    verdict: '用飯店名字命名的 87 m² 轉角套房，客廳兩面開窗看地中海港灣；全館 8 間。',
    note: '公開費率表列全年 ¥360,000；同一來源內文寫舊區間 ¥261,000–325,000。',
  }),
  defineRoom({
    id: 'spec-ilmagnifico-suite',
    name: '皇家套房',
    nameJa:
      'スペチアーレ・ルーム＆スイート ポルト・パラディーゾ・サイド イル・マニーフィコ・スイート',
    category: 'speciale',
    view: 'harbour',
    capacity: 2,
    beds: '1 張皇家套房專用雙人床（180 × 210 × 60 cm）',
    size: '199',
    sizeValue: 199,
    priceFrom: 600000,
    floors: '5 樓',
    flags: ['lounge', 'breakfast', 'suite'],
    verdict: '5303 唯一一間、199 m²、飯店最高級。透過官方網站訂房可申請私人 VIP 導覽，但導覽費不是房價的一部分。',
    note: '官方公告 2027/2/17–3/23 因客房整修停賣。',
  }),
];

export const BED_SPECS: BedSpec[] = [
  {
    name: '標準床',
    nameJa: 'レギュラーサイズ',
    size: '120 × 210 × 55 cm',
    capacity: '2 位（含 1 位不佔床孩童）',
    note: '比台灣單人床寬，但兩位大人並睡仍然很擠。三床客房放的是三張這種床。',
  },
  {
    name: '雙人床',
    nameJa: 'ダブルサイズ',
    size: '180 × 210 × 55 cm',
    capacity: '4 位（含 2 位不佔床孩童）',
    note: '用於一般雙人床客房；房型定員仍是 3 位，不會因床本身可睡四位就變成四人房。',
  },
  {
    name: '雙人床（頂樓陽台客房）',
    nameJa: 'ダブルサイズ（テラスルーム）',
    size: '160 × 210 × 55 cm',
    capacity: '4 位（含 2 位不佔床孩童）',
    note: '只用於日文房名為「テラスルーム」的房型，比一般雙人床窄 20 公分。',
  },
  {
    name: '雙人床（皇家套房）',
    nameJa: 'ダブルサイズ（イル・マニーフィコ・スイート）',
    size: '180 × 210 × 60 cm',
    capacity: '4 位（含 2 位不佔床孩童）',
    note: '床面比一般雙人床高 5 公分，只用於皇家套房。',
  },
  {
    name: '雙人床（無障礙設計）',
    nameJa: 'ダブルサイズ（アクセシブル）',
    size: '180 × 210 × 45 cm',
    capacity: '4 位（含 2 位不佔床孩童）',
    note: '床高降低 10 公分，方便輪椅橫向移位。',
  },
  {
    name: '推拉床',
    nameJa: 'トランドルベッド',
    size: '100 × 190 × 27 cm',
    capacity: '1 位',
    note: '收在標準床或雙人床底下，拉出即可使用；床面低，適合兒童。',
  },
  {
    name: '郵輪床',
    nameJa: 'クルーズベッド',
    size: '84 × 182 × 55 cm',
    capacity: '1 位',
    note: '四人房的第四張床。長度只有 182 公分，身高較高的成人會不舒服。',
  },
  {
    name: '郵輪床（地中海客房／宮殿中庭客房）',
    nameJa: 'クルーズベッド（ハーバールーム、パラッツォパティオルーム）',
    size: '85 × 184 × 55 cm',
    capacity: '1 位',
    note: '比一般郵輪床寬 1 公分、長 2 公分；仍然是窄短的第四張床。',
  },
  {
    name: '嬰兒床',
    nameJa: 'ベビーベッド',
    size: '60 × 110 × 109 cm',
    capacity: '未滿 18 個月孩童',
    note: '需事先預約，數量有限。',
  },
];

export const FACILITIES: Facility[] = [
  {
    name: '飯店＆園區通路',
    nameEn: 'Hotel & Park Gateway',
    location: '2 樓・直達東京迪士尼海洋',
    guestOnly: true,
    description:
      '一道門直接連到地中海港灣。住客離園時全日可用；進園或再入園要等一般開園 1 小時後，早上首次入園不能拿它代替正式入口。',
    photoTip: '真正有用的不是少走幾步，而是午後可以回房放戰利品、讓小孩休息，再直接回園。',
  },
  {
    name: '德拉米可廳',
    nameEn: "Salone dell'Amico",
    location: '5 樓・7:00–22:00（最後點餐 21:30）',
    guestOnly: true,
    description:
      '尊榮客房與套房住客的專用貴賓室，可辦理入住、退房並享用飲料。使用期從住房日 14:00 到退房日 12:00。',
    photoTip: '人多時可能被安排到美景廳吧檯席；「有貴賓室」不等於每次都坐在同一個空間。',
  },
  {
    name: '威尼斯沐浴坊',
    nameEn: 'Terme Venezia',
    location: '1 樓・SPA＆室內外泳池',
    guestOnly: true,
    description:
      '羅馬浴場風格的室內主池、溫水池、兒童池、按摩浴池與三溫暖全年營業，戶外泳池僅夏季開放；不是免費住宿禮遇，要按日買入場。',
    photoTip: '2026/11/4–2027/2/19 全館翻新停業；不要為這段日期的住宿把泳池算進行程。',
  },
  {
    name: '觀海景教堂',
    nameEn: 'Chapel MiraCosta',
    location: '2 樓',
    description:
      '八角形婚禮教堂，彩繪玻璃與白色大理石走道之外，窗外直接框住普羅米修斯火山。',
    photoTip: '教堂不是一般觀光設施；遇到婚禮或活動時，以現場開放範圍為準。',
  },
  {
    name: '米奇朗基羅禮品',
    nameEn: "MickeyAngelo Gifts",
    location: '2 樓・8:00–22:00',
    description:
      '販售飯店限定商品、度假區當季商品與臨時需要的日用品。名稱把米奇（Mickey）和米開朗基羅（Michelangelo）疊在一起。',
  },
  {
    name: '東京迪士尼海洋站空中走廊',
    nameEn: 'Disney Resort Line Walkway',
    location: '2 樓・連接單軌電車站',
    description:
      '從東京迪士尼海洋站車頭方向的剪票口出站，沿空中走廊直接進飯店二樓，不必回到地面。',
    photoTip: '2026/8/19–12/1 車站該側電梯更新，這段通路只剩樓梯；輪椅與大型行李要走官方替代路線。',
  },
];

export const DINING: Dining[] = [
  {
    name: '美景廳',
    nameEn: 'BellaVista Lounge',
    type: '義式料理・大廳咖啡廳',
    hours: ['早餐 6:30–10:00', '午餐 11:30–14:30', '晚餐 16:30–22:00'],
    seats: '98 席（含吧檯 8 席）',
    description:
      '大片玻璃窗正對地中海港灣；部分用餐時段能從座位看港灣表演。早餐供應吃到飽自助餐，也是多數尊榮客房的指定早餐地點。',
    reservation: '適用優先入席',
  },
  {
    name: '海洋宮',
    nameEn: 'Oceano',
    type: '地中海料理・自助餐／全餐',
    hours: ['早餐 6:30–10:00', '自助餐 11:30–21:00', '晚餐全餐 17:00–21:00'],
    seats: '286 席（含包廂 36 席）',
    description:
      '三個用餐區以貝殼、珍珠等海洋元素設計，同時供應自助餐與全餐。官方寫部分時段可由露台看港灣表演，但是否開放要看當日營運。',
    reservation: '適用優先入席',
  },
  {
    name: '絲路園',
    nameEn: 'Silk Road Garden',
    type: '粵式中華料理',
    hours: ['午餐 11:30–14:30', '晚餐 17:00–22:00（全餐至 21:00）'],
    seats: '126 席（2 間 10 人包廂、1 間 6 人包廂）',
    description:
      '以馬可・波羅的絲路旅程為主題，壁畫從義大利一路畫到中國。三家餐廳裡唯一不供應早餐的一間。',
    reservation: '適用優先入席；包廂限 4 位大人以上並須事先電話預約',
  },
];

export const BENEFITS: Benefit[] = [
  {
    title: '歡樂入園：兩座樂園都適用',
    description:
      '東京迪士尼樂園可提早 15 分鐘；東京迪士尼海洋依當日安排提早 5–15 分鐘。辦理入住時領通行證，入園需同時出示票券。',
    caveat: '住房首日不適用；不適用日期約於 4 個月前公布，訂房時可能尚未確定。',
  },
  {
    title: '飯店＆園區通路',
    description:
      '飯店二樓直接往返東京迪士尼海洋，離園全日可用；一般開園一小時後可由此入園或再入園。',
    caveat: '早上第一次進園不能走這道門，歡樂入園仍要前往指定安全檢查與專用入口。',
  },
  {
    title: '即使官網售罄，住客仍可買住宿期間門票',
    description:
      '住宿期間使用的園區票券可在飯店購買；官方網站顯示售罄時，住客保障仍然有效。飯店迎賓櫃檯售票時間為 6:00–22:00。',
  },
  {
    title: '抵達日免費行李遞送',
    description:
      '7:30–16:00 在 JR 舞濱站前的東京迪士尼度假區迎賓中心 2 樓寄件，免費送到飯店。',
  },
  {
    title: '退房日行李送回舞濱站',
    description:
      '飯店 7:00–12:30 受理，13:00–21:00 在迎賓中心 2 樓領取，為收費服務。',
  },
  {
    title: '飯店限定客房備品與環保袋',
    description:
      '客房提供迪士尼明星圖案備品與每房每晚 2 個可帶走的環保袋；紙袋已不再常設，需要時向工作人員索取。',
  },
];

export const SOCIAL_INSIGHTS: SocialInsight[] = [
  {
    platform: '部落格',
    headline: '房名有「海港」不代表看得到完整港灣',
    body: '日本住客反覆提醒兩個容易混淆的詞：「港灣景觀（ハーバービュー）」是窗景保證；「地中海客房（ハーバールーム）」是 60 平方公尺的格局名稱。後者還分廣場景觀與港灣景觀，訂到廣場版不會因為日文名有 Harbor 就突然看到整片水面。',
    verdict: '找景色看最後一個括號，不要看房型主名。',
  },
  {
    platform: 'YouTube',
    headline: '完整港灣景觀的價值，是把閉園前後也變成表演',
    body: '港灣景觀開箱不只拍正式水上秀，也會拍早上演藝人員集合、船隻測試、閉園後清空的地中海港灣。這些不是節目表上的體驗，卻是住在園內才會反覆拉開窗簾看的部分。',
    verdict: '如果只打算在正式表演那 30 分鐘看窗外，港灣景觀的使用率其實很低。',
  },
  {
    platform: '部落格',
    headline: '「景隅景觀」真的可能只看到牆與碎石',
    body: '一位帶小孩入住 3147 的住客，把窗外直接稱作「碎石景觀」：正面是碎石和近距離建築，斜看才有廣場與港灣的一角，夜間能感受到表演的光，但看不到完整內容。房間本身沒有問題，落差全部來自期待。',
    verdict: '把它當成「園內側的無景觀房」才不會失望；不能把最好的住客照片當保底。',
  },
  {
    platform: '部落格',
    headline: '陽台與頂樓露天陽台有一個訂房頁不會寫的敵人：天氣',
    body: '新開的威尼斯陽台房有人正好遇上颱風，抵達後拍不到一張照片就先撤回室內。另一位冬天入住則因日照充足，穿著外套仍能端咖啡坐在陽台。相同硬體，在雨、風與體感溫度下會變成完全不同的商品。',
    verdict: '陽台房溢價不是保證能用；若旅期在颱風季或寒流期，別把全部住宿價值押在戶外。',
  },
];

export const FAQS: Faq[] = [
  {
    question: '要在房間看完整水上表演，最低要訂哪一級？',
    answer:
      '房名必須明寫「港灣景觀」。廣場景觀能看廣場與街道，部分位置也能斜看到水面，但官方不保證完整表演；景隅景觀更直接寫明視線會被牆或屋頂擋住。',
  },
  {
    question: '海港區就一定看得到港灣嗎？',
    answer:
      '不一定。「海港區」只是建築所在側，裡面還分景隅、廣場、廣場全景與港灣景觀。只有港灣景觀保證看得到港口全景。',
  },
  {
    question: '可以指定樓層或房號嗎？',
    answer:
      '不行。官方明寫不接受指定具體位置與樓層。可以提出偏好，但沒有保證；房號資料主要是在拿到房卡後判讀窗戶位置，不是讓你點房。',
  },
  {
    question: '陽台客房與頂樓陽台客房差在哪？',
    answer:
      '日文分成 Balcony Room 與 Terrace Room。陽台客房多在 2–3 樓、離園區近；官方繁中稱「頂樓陽台客房」的 Terrace Room 全在 5 樓，室內 43 m² 外另有約 30 m² 露天陽台，而且只住 2 位。',
  },
  {
    question: '尊榮客房＆套房多了什麼？',
    answer:
      '可使用 5 樓德拉米可廳貴賓室、在專屬櫃檯辦入住與退房，並含翌日早餐。早餐地點依房型是美景廳，或可選美景廳與客房送餐。',
  },
  {
    question: '訂房什麼時候開賣？',
    answer:
      '只訂客房通常在住宿日 4 個月前同日上午 11:00（日本時間）開放，一次最多 5 晚、3 間。月底沒有對應日期時，從下個月 1 日開賣。',
  },
  {
    question: '從舞濱車站怎麼去？',
    answer:
      '舞濱站旁搭迪士尼度假區線，在「東京迪士尼海洋站」下車；車頭方向剪票口外有空中走廊直達飯店 2 樓。單軌電車是付費的。',
  },
  {
    question: '飯店內那道門早上也能直接進園嗎？',
    answer:
      '不能。飯店＆園區通路要到一般開園一小時後才開放入園與再入園；離園則全日可用。早上的歡樂入園要走官方指定的安全檢查與專用入口。',
  },
];

export const ROOM_COUNT = ROOMS.length;

export const roomsByCategory = (key: string): Room[] =>
  ROOMS.filter((room) => room.category === key);

export const cheapestRoom = (): Room =>
  ROOMS.reduce((min, room) => (room.priceFrom < min.priceFrom ? room : min));

export const HOTEL_FACTS: HotelFact[] = [
  { label: '客房總數', value: `${HOTEL.totalRooms} 間`, sub: `${ROOMS.length} 種可訂組合` },
  { label: '最大特色', value: '住在園區裡', sub: '飯店建築就是東京迪士尼海洋的一部分' },
  { label: '最近車站', value: '東京迪士尼海洋站', sub: '2 樓空中走廊直達飯店' },
  {
    label: '入住／退房',
    value: `${HOTEL.checkIn} / ${HOTEL.checkOut}`,
    sub: '退房日仍可使用歡樂入園',
  },
  {
    label: '最低參考價',
    value: formatYen(cheapestRoom().priceFrom),
    sub: '每室每晚・2 位大人',
  },
  { label: '訂房開放', value: '4 個月前 11:00', sub: '日本時間・最多 5 晚 3 房' },
];
