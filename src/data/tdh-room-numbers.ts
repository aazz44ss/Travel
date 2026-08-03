/**
 * Room numbers for Tokyo Disneyland Hotel, keyed by the room type ids in
 * `./tokyo-disneyland-hotel`.
 *
 * Compiled from dhoteloo's room-by-room survey, which was written against the
 * pre-2026-04 category names. The April 2026 reorganisation changed how rooms
 * are *sold*, not the building: a given room number is still the same physical
 * room on the same floor facing the same direction, so the mapping from number
 * to position and view still holds.
 *
 * Because floors can no longer be chosen at booking, these numbers are most
 * useful after check-in: they tell you what you are about to see when you open
 * the curtains, and roughly what the odds were.
 */

export interface RoomNumberEntry {
  /** Room numbers known to belong to this room type. */
  numbers: string[];
  /** Rooms within the type that open onto an outdoor balcony. */
  balcony: string[];
  /** False when the source could not enumerate every room in the category. */
  complete: boolean;
  note?: string;
}

export const ROOM_NUMBERS: Record<string, RoomNumberEntry> = {
  'char-alice': {
    numbers: [
      '3616', '4616', '5302', '5303', '5311', '5312', '5616', '6302', '6303', '6311', '6312',
      '6616', '7302', '7303', '7311', '7312', '7616', '8302', '8303', '8311', '8312', '8616',
      '9302', '9303', '9311', '9312'
    ],
    balcony: ['9302', '9303', '9311', '9312'],
    complete: true,
  },
  'char-alice-alcove': {
    numbers: [
      '3604', '3606', '3608', '3610', '3612', '3614', '4604', '4606', '4608', '4610', '4612',
      '4614', '5604', '5606', '5608', '5610', '5612', '5614', '6604', '6606', '6608', '6610',
      '6612', '6614', '7604', '7606', '7608', '7610', '7612', '7614', '8604', '8606', '8608',
      '8610', '8612', '8614'
    ],
    balcony: [],
    complete: true,
  },
  'char-beast-alcove-51': {
    numbers: ['5305', '5309', '6305', '6309', '7305', '7309', '8305', '8309', '9305', '9309'],
    balcony: [],
    complete: true,
  },
  'char-beast-triple-61': {
    numbers: [
      '1502', '2502', '3202', '3501', '3502', '4202', '4501', '5201', '5202', '5501', '5502',
      '6201', '6202', '6501', '6502', '7201', '7202', '7501', '7502', '8201', '8202', '8501',
      '8502', '9201', '9202', '9501', '9502'
    ],
    balcony: [],
    complete: true,
  },
  'char-beast-twin-51': {
    numbers: ['3602', '4602', '5602', '6602', '7602', '8602'],
    balcony: [],
    complete: true,
  },
  'char-beast-twin-61': {
    numbers: ['1603', '2603', '3603', '4603', '5603', '6603', '7603', '8603'],
    balcony: [],
    complete: true,
  },
  'char-cinderella': {
    numbers: [
      '5301', '5304', '5310', '5313', '6301', '6304', '6310', '6313', '7301', '7304', '7310',
      '7313'
    ],
    balcony: [],
    complete: true,
  },
  'char-tinkerbell-3': {
    numbers: ['5307', '6307', '7307', '8307', '9307'],
    balcony: ['9307'],
    complete: true,
  },
  'char-tinkerbell-4': {
    numbers: [
      '3622', '3624', '3626', '3628', '3630', '3632', '4622', '4624', '4626', '4628', '4630',
      '4632', '5306', '5308', '5622', '5624', '5626', '5628', '5630', '5632', '6306', '6308',
      '6622', '6624', '6626', '6628', '6630', '6632', '7306', '7308', '7624', '7626', '7628',
      '7630', '7632', '8306', '8308', '8622', '8624', '8626', '9306', '9308'
    ],
    balcony: ['9306', '9308'],
    complete: true,
  },
  'conc-alcove-pgv': {
    numbers: [
      '7216', '7217', '7218', '7220', '7516', '7517', '7518', '7520', '8218', '8220', '8518',
      '8520', '9218', '9220', '9402', '9403', '9405', '9406', '9518', '9520'
    ],
    balcony: [],
    complete: true,
  },
  'conc-balcony-alcove-pgv': {
    numbers: ['8402', '8403', '8405', '8406'],
    balcony: [],
    complete: true,
  },
  'conc-balcony-pgv': {
    numbers: ['8401', '8404', '8407'],
    balcony: [],
    complete: true,
  },
  'conc-cinderella': {
    numbers: ['8301', '8304', '8310', '8313', '9301', '9304', '9310', '9313'],
    balcony: [],
    complete: true,
  },
  'conc-deluxe-pv': {
    numbers: ['3105', '4105', '5105', '6105', '7105', '8105'],
    balcony: [],
    complete: true,
  },
  'conc-superior-pgv': {
    numbers: ['8217', '8221', '8517', '8521', '9217', '9221', '9401', '9404', '9407', '9517', '9521'],
    balcony: [],
    complete: true,
  },
  'conc-superior-pv': {
    numbers: ['3106', '4106', '5106', '6106', '7106', '8106'],
    balcony: [],
    complete: true,
  },
  'conc-turret-double': {
    numbers: ['4215', '4515', '5215', '5515', '6215', '6515', '7215', '7515'],
    balcony: [],
    complete: true,
  },
  'conc-turret-twin': {
    numbers: ['3121', '4121', '5121', '6121', '7121'],
    balcony: [],
    complete: true,
  },
  'std-alcove': {
    numbers: ['3209', '3211', '3503', '3505', '3507', '3509', '3511'],
    balcony: [],
    complete: false,
    note: '原始調查只逐間記錄了 1–3 樓的部分，4–9 樓的房號未列出。',
  },
  'std-alcove-pgv': {
    numbers: [
      '5216', '5217', '5218', '5220', '5516', '5517', '5518', '5520', '6216', '6217', '6218',
      '6220', '6516', '6517', '6518'
    ],
    balcony: [],
    complete: true,
  },
  'std-corner': {
    numbers: ['3215', '3515'],
    balcony: [],
    complete: true,
  },
  'std-corner-pv': {
    numbers: ['3107', '4107', '5107', '6107', '7107', '8107'],
    balcony: [],
    complete: true,
  },
  'std-deluxe-accessible': {
    numbers: ['4103', '5103', '6103', '7103', '8103'],
    balcony: [],
    complete: true,
  },
  'std-deluxe-double': {
    numbers: ['4324'],
    balcony: [],
    complete: true,
  },
  'std-deluxe-quad': {
    numbers: ['3213', '3513', '4213', '4513'],
    balcony: [],
    complete: true,
  },
  'std-deluxe-twin': {
    numbers: ['1619', '2619', '3619', '4619', '5619', '6619', '7619', '8619'],
    balcony: [],
    complete: true,
  },
  'std-family-pv': {
    numbers: ['5224', '5324', '6224', '6324', '7224', '7324', '8224', '8324', '9224', '9324'],
    balcony: [],
    complete: true,
  },
  'std-junior-family': {
    numbers: ['1617', '2617', '3617'],
    balcony: [],
    complete: true,
  },
  'std-junior-family-pv': {
    numbers: ['4617', '5617', '6617', '7617', '8617'],
    balcony: [],
    complete: true,
  },
  'std-superior-double': {
    numbers: ['3222', '3522', '4222', '4522'],
    balcony: [],
    complete: true,
  },
  'std-superior-pgv-double': {
    numbers: ['5222', '5522', '6222', '6522', '7222', '7522', '8222', '8522'],
    balcony: [],
    complete: true,
  },
  'std-superior-pgv-twin': {
    numbers: ['5221', '5521', '6221', '6521', '7221', '7521'],
    balcony: [],
    complete: true,
  },
  'suite-magic-kingdom-8f': {
    numbers: ['8215', '8515'],
    balcony: [],
    complete: true,
  },
  'suite-magic-kingdom-9f': {
    numbers: ['9515'],
    balcony: [],
    complete: true,
  },
  'suite-walt-disney': {
    numbers: ['9215'],
    balcony: [],
    complete: true,
  },
  'std-superior-twin': {
    numbers: [],
    balcony: [],
    complete: false,
    note: '這個類別遍布 1–9 樓、房間數量太多，原始調查只用樓層平面圖標示範圍，沒有逐間列出房號。',
  },
  'std-superior-pv': {
    numbers: [],
    balcony: [],
    complete: false,
    note: '這個類別在 3–8 樓有大量房間，原始調查只用樓層平面圖標示範圍，沒有逐間列出房號。',
  },
  'std-alcove-pv': {
    numbers: [],
    balcony: [],
    complete: false,
    note: '這個類別在 3–8 樓有大量房間，原始調查只用樓層平面圖標示範圍，沒有逐間列出房號。',
  },
};

export interface RoomNumberHit {
  number: string;
  floor: number;
  roomId: string;
  balcony: boolean;
}

/** number -> room type, built once from ROOM_NUMBERS. */
const INDEX: Map<string, RoomNumberHit> = new Map(
  Object.entries(ROOM_NUMBERS).flatMap(([roomId, entry]) =>
    entry.numbers.map((number): [string, RoomNumberHit] => [
      number,
      {
        number,
        floor: Number(number[0]),
        roomId,
        balcony: entry.balcony.includes(number),
      },
    ]),
  ),
);

export function lookupRoomNumber(value: string): RoomNumberHit | undefined {
  return INDEX.get(value.trim());
}

export const KNOWN_ROOM_NUMBERS: RoomNumberHit[] = [...INDEX.values()].sort((a, b) =>
  a.number.localeCompare(b.number),
);

export const ROOM_NUMBER_COUNT = INDEX.size;

/**
 * Where a room number sits in the building.
 *
 * The last three digits of a room number are a position code: the same code on
 * a different floor is the same window, one storey up. Grouping the codes by
 * the view class the hotel assigns them reconstructs the building's
 * orientation without guessing at architecture — every assignment below comes
 * either from an official view label or from the hotel's statement that the
 * character rooms, and the concierge Cinderella room, face the main entrance.
 */
export type ZoneKey = 'front' | 'park-side' | 'turret' | 'inner' | 'entrance';

export interface Zone {
  key: ZoneKey;
  label: string;
  description: string;
}

export const ZONES: Zone[] = [
  {
    key: 'front',
    label: '樂園正面',
    description:
      '被歸為樂園全景觀的位置。全部集中在 5 樓以上——同一欄的 3、4 樓因為被車站站體擋住，官方就不給景觀分類。',
  },
  {
    key: 'park-side',
    label: '樂園側面',
    description: '被歸為樂園景觀的位置，看得到樂園但角度偏斜。',
  },
  {
    key: 'turret',
    label: '角塔',
    description:
      '正面兩側的圓塔，房號結尾 215 與 515。由下往上是景隅客房、塔樓客房、套房，同一座塔越高等級越高。',
  },
  {
    key: 'inner',
    label: '內側',
    description: '標準房與禮賓房中沒有景觀分類的位置，窗外可能是中庭、側面或停車場方向。',
  },
  {
    key: 'entrance',
    label: '飯店正門側',
    description:
      '迪士尼明星房所在的一側。官方明確說明這一類客房面向飯店正門，看不到樂園；禮賓房的仙履奇緣客房也在這一側。',
  },
];

/** Position codes ordered from the park-facing side toward the main entrance. */
export const COLUMNS: { code: string; zone: ZoneKey }[] = [
  { code: '216', zone: 'front' },
  { code: '217', zone: 'front' },
  { code: '218', zone: 'front' },
  { code: '220', zone: 'front' },
  { code: '221', zone: 'front' },
  { code: '222', zone: 'front' },
  { code: '401', zone: 'front' },
  { code: '402', zone: 'front' },
  { code: '403', zone: 'front' },
  { code: '404', zone: 'front' },
  { code: '405', zone: 'front' },
  { code: '406', zone: 'front' },
  { code: '407', zone: 'front' },
  { code: '516', zone: 'front' },
  { code: '517', zone: 'front' },
  { code: '518', zone: 'front' },
  { code: '520', zone: 'front' },
  { code: '521', zone: 'front' },
  { code: '522', zone: 'front' },
  { code: '105', zone: 'park-side' },
  { code: '106', zone: 'park-side' },
  { code: '107', zone: 'park-side' },
  { code: '224', zone: 'park-side' },
  { code: '324', zone: 'park-side' },
  { code: '617', zone: 'park-side' },
  { code: '215', zone: 'turret' },
  { code: '515', zone: 'turret' },
  { code: '103', zone: 'inner' },
  { code: '121', zone: 'inner' },
  { code: '209', zone: 'inner' },
  { code: '211', zone: 'inner' },
  { code: '213', zone: 'inner' },
  { code: '503', zone: 'inner' },
  { code: '505', zone: 'inner' },
  { code: '507', zone: 'inner' },
  { code: '509', zone: 'inner' },
  { code: '511', zone: 'inner' },
  { code: '513', zone: 'inner' },
  { code: '619', zone: 'inner' },
  { code: '201', zone: 'entrance' },
  { code: '202', zone: 'entrance' },
  { code: '301', zone: 'entrance' },
  { code: '302', zone: 'entrance' },
  { code: '303', zone: 'entrance' },
  { code: '304', zone: 'entrance' },
  { code: '305', zone: 'entrance' },
  { code: '306', zone: 'entrance' },
  { code: '307', zone: 'entrance' },
  { code: '308', zone: 'entrance' },
  { code: '309', zone: 'entrance' },
  { code: '310', zone: 'entrance' },
  { code: '311', zone: 'entrance' },
  { code: '312', zone: 'entrance' },
  { code: '313', zone: 'entrance' },
  { code: '501', zone: 'entrance' },
  { code: '502', zone: 'entrance' },
  { code: '602', zone: 'entrance' },
  { code: '603', zone: 'entrance' },
  { code: '604', zone: 'entrance' },
  { code: '606', zone: 'entrance' },
  { code: '608', zone: 'entrance' },
  { code: '610', zone: 'entrance' },
  { code: '612', zone: 'entrance' },
  { code: '614', zone: 'entrance' },
  { code: '616', zone: 'entrance' },
  { code: '622', zone: 'entrance' },
  { code: '624', zone: 'entrance' },
  { code: '626', zone: 'entrance' },
  { code: '628', zone: 'entrance' },
  { code: '630', zone: 'entrance' },
  { code: '632', zone: 'entrance' },
];

export const COLUMN_ZONE: Record<string, ZoneKey> = Object.fromEntries(
  COLUMNS.map((column) => [column.code, column.zone]),
);

export function zoneOfNumber(value: string): ZoneKey | undefined {
  return COLUMN_ZONE[value.slice(1)];
}
