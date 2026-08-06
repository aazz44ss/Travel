/**
 * Room numbers for Tokyo DisneySea Hotel MiraCosta, keyed by the room type ids
 * in `./tokyo-disneysea-hotel-miracosta`.
 *
 * Compiled from dhoteloo's room-by-room survey of the Porto Paradiso Side
 * (https://dhoteloo.com, published 2022-04, last revised 2023-05). That article
 * covers one of the hotel's three sides — the one facing Mediterranean Harbor,
 * which is also the side where the number tells you the most, because a few
 * metres along the corridor is the difference between the piazza and the whole
 * harbour. The Toscana and Venezia sides have never been surveyed room by room,
 * so their types carry no numbers here. The survey itself asks to be read as a
 * reference rather than a guarantee, and every count below was checked against
 * the per-type totals it publishes.
 *
 * Two things the survey makes visible that the official pages do not:
 *
 * - Every number it lists is odd. It does not say what the even numbers are, so
 *   an even number is simply not covered by this dataset.
 * - Floor 1 has no Porto Paradiso rooms at all and floor 2 only reaches part of
 *   the way along, which is why the 1xx block starts on floor 3 and only the
 *   3xx block has floor-2 rooms.
 *
 * The plan drawings that accompany these lists are traced separately in
 * `./dhm-plan.ts`, which is what places each number in the building; this file
 * stays a map from room type to room numbers.
 *
 * The survey predates two changes. `スーペリアルーム（パーシャルビュー）` is the
 * name it uses for what the Traditional Chinese pages now call 景隅景觀, and it
 * groups the Speciale balcony harbour rooms by view level where the hotel now
 * splits them by occupancy — so those seven numbers can be placed as a group
 * but not one by one. The building itself has not moved, so a number still
 * identifies the same window.
 */

import type { ConnectingPair, RoomNumbers } from './hotel';

export const ROOM_NUMBERS: RoomNumbers = {
  'porto-superior-partial': {
    numbers: [],
    balcony: [],
    complete: false,
    note: '這是全海港區唯一沒有逐間列號的房型。原始調查的位置圖有標出這一類，但沒有列出房號。',
  },
  'porto-superior-piazza-double': {
    numbers: ['2373', '2375', '3373', '3375', '4373', '4375', '5325'],
    balcony: [],
    complete: true,
    note: '整個海港區只有這 7 間是一張雙人床——全館 502 間裡的 7 間。想要雙人床又想看廣場，機率就是這個數字。',
  },
  'porto-superior-piazza-twin': {
    numbers: [
      '2325', '2337', '2339', '2341', '2349', '2351',
      '3107', '3109', '3111', '3113', '3117', '3119', '3121',
      '3325', '3337', '3339', '3341', '3349', '3351',
      '4107', '4109', '4111', '4113', '4117', '4119', '4121',
      '4325', '4337', '4339', '4341', '4349', '4351',
      '5107', '5109', '5111', '5113', '5117', '5119', '5121',
      '5337', '5339', '5341',
    ],
    balcony: [],
    complete: true,
  },
  'porto-superior-piazza-quad': {
    numbers: [
      '2347', '3115', '3343', '3345', '3347', '4115', '4343', '4345', '4347', '5115', '5343',
      '5345',
    ],
    balcony: [],
    complete: true,
  },
  'porto-superior-piazza-accessible': {
    numbers: ['3103', '4103'],
    balcony: [],
    complete: true,
    note: '只有 2 間，而且都在 1xx 段最靠近海港套房的位置。',
  },
  'porto-superior-piazza-grand-twin': {
    numbers: ['2353', '3143', '3353', '4143', '4353'],
    balcony: [],
    complete: true,
  },
  'porto-superior-piazza-grand-quad': {
    numbers: ['2355', '2357', '3145', '3355', '3357', '4145', '4355', '4357'],
    balcony: [],
    complete: true,
  },
  'porto-superior-harbour-twin': {
    numbers: [
      '2359', '2361', '2363', '2365', '2367',
      '3127', '3133', '3135', '3137', '3139', '3141',
      '3313', '3315', '3359', '3361', '3363', '3365', '3367',
      '4127', '4133', '4135', '4137', '4139', '4141',
      '4303', '4305', '4307', '4309', '4311', '4313', '4315',
      '4359', '4361', '4363', '4365', '4367',
    ],
    balcony: [],
    complete: true,
    note: '36 間，是海港區裡港灣景觀數量最多的一格。5 樓的同一批位置歸到尊榮客房層級，價格差一截。',
  },
  'porto-superior-harbour-quad': {
    numbers: [
      '3129', '3131', '3317', '3319', '3321', '3323',
      '4129', '4131', '4301', '4317', '4319', '4321', '4323',
    ],
    balcony: [],
    complete: true,
  },
  'porto-triple-piazza': {
    numbers: ['2335', '3335', '4335', '5335'],
    balcony: [],
    complete: true,
    note: '一層只有一間，四層共 4 間。三張正規床又要看廣場的話，這是唯一的選擇。',
  },

  // ── スペチアーレ・ルーム＆スイート ──────────────────────────────────────
  'spec-superior-harbour-triple': {
    numbers: ['5127', '5133', '5135', '5137', '5313', '5315'],
    balcony: [],
    complete: true,
    note: '全部在 5 樓。3–4 樓同一個位置賣的是不含貴賓室的港灣景觀精緻客房。',
  },
  'spec-superior-harbour-quad': {
    numbers: ['5129', '5131', '5301', '5317', '5319', '5321', '5323'],
    balcony: [],
    complete: true,
  },
  'spec-harbour-room-piazza': {
    numbers: ['3123', '4123', '5123'],
    balcony: [],
    complete: true,
    note: '3、4、5 樓各一間，位置垂直重疊，就在海港套房與港灣景觀之間的轉角。',
  },
  'spec-harbour-room-harbour': {
    numbers: ['3125', '4125', '5125'],
    balcony: [],
    complete: true,
    note: '和廣場景觀版本門對門（3123／3125），只差一間房的距離，窗外從廣場變成整片港灣。',
  },
  'spec-balcony-piazza': {
    numbers: ['2343'],
    balcony: ['2343'],
    complete: true,
    note: '全飯店只有這一間。開賣即消失的房型，指的就是它。',
  },
  'spec-balcony-harbour-triple': {
    numbers: ['2345', '3301', '3303', '3305', '3307', '3309', '3311'],
    balcony: ['2345', '3301', '3303', '3305', '3307', '3309', '3311'],
    complete: true,
    ambiguousWith: ['spec-balcony-harbour-quad'],
    note: '這 7 間是港灣景觀陽台房的全部。來源按景觀分成 4 間「港灣景觀」與 3 間已取消的「港灣全景觀」，不是按定員，所以無法判斷哪幾間現在賣 3 位版、哪幾間賣 4 位版。',
  },
  'spec-balcony-harbour-quad': {
    numbers: [],
    balcony: [],
    complete: false,
    ambiguousWith: ['spec-balcony-harbour-triple'],
    note: '和 3 位版共用同一批 7 個房號，列在 3 位版條目下；來源沒有按定員區分。',
  },
  'spec-terrace-piazza': {
    numbers: ['5149', '5153'],
    balcony: ['5149', '5153'],
    complete: true,
  },
  'spec-terrace-harbour': {
    numbers: ['5141', '5145', '5349', '5361', '5365'],
    balcony: ['5141', '5145', '5349', '5361', '5365'],
    complete: true,
  },
  'spec-terrace-harbour-grand': {
    numbers: ['5353', '5357'],
    balcony: ['5353', '5357'],
    complete: true,
    note: '全飯店只有 2 間，是日本粉絲口中的「ハバグラ」。',
  },
  'spec-porto-suite': {
    numbers: ['3101', '3105', '4101', '4105'],
    balcony: [],
    complete: true,
    note: '在 1xx 段的盡頭，鄰居是無障礙客房（3103）。這一段的窗戶對著廣場那一側，不是整片港灣。',
  },
  'spec-miracosta-suite': {
    numbers: ['2369', '2371', '3369', '3371', '4369', '4371', '5369', '5371'],
    balcony: [],
    complete: true,
    note: '8 間全部在 3xx 段的末端，也就是建築轉角，兩面開窗。',
  },
  'spec-ilmagnifico-suite': {
    numbers: ['5303'],
    balcony: [],
    complete: true,
    note: '全飯店唯一一間，5 樓。旁邊的 5301 是尊榮客房層級的港灣景觀精緻客房。',
  },
};


/**
 * Category pairs the survey says can be booked as connecting rooms. It is a
 * category-level list, not a list of specific doors, and connecting is a request
 * rather than a booking option: both rooms have to be reserved together and the
 * hotel telephoned in advance, and even then it is not guaranteed.
 */
export const CONNECTING_PAIRS: ConnectingPair[] = [
  { types: ['porto-superior-piazza-twin', 'porto-superior-piazza-twin'] },
  { types: ['porto-superior-harbour-twin', 'porto-superior-harbour-twin'] },
  { types: ['porto-superior-piazza-twin', 'spec-harbour-room-piazza'] },
  { types: ['porto-superior-harbour-twin', 'spec-harbour-room-harbour'] },
  { types: ['spec-superior-harbour-triple', 'spec-harbour-room-harbour'] },
  {
    types: ['porto-superior-harbour-twin', 'spec-miracosta-suite'],
    note: '房號上就看得出來：觀海景套房在 3xx 段末端，隔壁就是港灣景觀精緻客房。',
  },
  {
    types: ['porto-superior-piazza-accessible', 'spec-porto-suite'],
    note: '兩間無障礙客房（3103、4103）夾在海港套房 3101／3105 與 4101／4105 之間。',
  },
];
