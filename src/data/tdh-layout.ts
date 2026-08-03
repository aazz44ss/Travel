/**
 * Room-by-room layout of Tokyo Disneyland Hotel.
 *
 * Transcribed from the fully numbered floor plan published on each room-type
 * page, which labels every single room. Cross-checks against the room-number
 * dataset: the courtyard ring reads 313 down to 301 and its Cinderella / Alice
 * / Beast / Tinker Bell pattern matches exactly, and the 9F bridge reads
 * 41-42-42-41-42-42-41, which is 9401 through 9407.
 *
 * The plan is double-loaded almost everywhere: odd and even room numbers sit on
 * opposite sides of a corridor. That is why one wing holds character rooms
 * facing the main entrance and park-view rooms facing the other way.
 *
 * A position code can change room type by floor — 517 is a standard alcove room
 * on 5–6F, a concierge alcove room on 7F and a concierge superior room on 8–9F —
 * so the labels here describe the position, and the exact room name per floor is
 * resolved at render time from the room-number dataset.
 */

export type Facing = 'park' | 'entrance' | 'side';
export type Tone = 'grand' | 'park' | 'entrance' | 'inner' | 'turret';

export interface Slot {
  /** Position code: the last three digits of the room number. */
  code: string;
  /** What sits at this position, in Traditional Chinese. */
  type: string;
  tone: Tone;
  /** Bed configuration, where the position pins it down. */
  bed?: string;
  /** Overrides the row's facing, for corner rooms that turn to face the park. */
  facing?: Facing;
}

export interface Row {
  facing: Facing;
  slots: Slot[];
}

export interface Bar {
  key: string;
  label: string;
  x: number;
  y: number;
  /** Degrees clockwise about the bar origin. */
  angle: number;
  rows: Row[];
}

const SUP = '精緻客房／精緻凹室客房';
const SUP_PARK = '精緻客房／精緻凹室客房（樂園景觀）';

/** Builds a run of same-type rooms from a list of codes. */
const run = (codes: string[], type: string, tone: Tone): Slot[] =>
  codes.map((code) => ({ code, type, tone }));

export const BARS: Bar[] = [
  // ── West wing. Odd numbers on the outer side, even on the inner side. ──
  {
    key: 'wing-west-diag',
    label: '西翼・斜段',
    x: 108,
    y: 66,
    angle: 38,
    rows: [
      {
        facing: 'entrance',
        slots: run(
          ['632', '630', '628', '626', '624', '622'],
          '迪士尼小仙子客房',
          'entrance',
        ).map((slot) => ({ ...slot, bed: '4 人・凹室' })),
      },
      {
        facing: 'side',
        slots: [
          ...run(['633', '631', '629', '627', '625', '623', '621'], SUP, 'inner'),
          { code: '619', type: '尊爵客房', tone: 'inner', bed: '兩張標準床' },
          { code: '617', type: '小家庭客房（樂園景觀）', tone: 'park', bed: '三張標準床', facing: 'park' },
        ],
      },
    ],
  },
  {
    key: 'wing-west-horiz',
    label: '西翼・橫段',
    x: 244,
    y: 152,
    angle: 0,
    rows: [
      {
        facing: 'entrance',
        slots: [
          { code: '616', type: '迪士尼愛麗絲夢遊仙境客房', tone: 'entrance' },
          ...run(['614', '612', '610', '608', '606', '604'], '迪士尼愛麗絲夢遊仙境客房', 'entrance').map(
            (slot) => ({ ...slot, bed: '凹室' }),
          ),
          { code: '602', type: '迪士尼美女與野獸客房', tone: 'entrance', bed: '兩張標準床・4 人' },
        ],
      },
      {
        facing: 'park',
        slots: [
          ...run(['615', '613', '611', '609', '607', '605'], SUP_PARK, 'park'),
          { code: '603', type: '迪士尼美女與野獸客房', tone: 'entrance', bed: '兩張標準床・3 人' },
          { code: '601', type: SUP, tone: 'inner', facing: 'side' },
        ],
      },
    ],
  },

  // ── Courtyard ring: one row of character rooms, 313 on the left to 301 on the right ──
  {
    key: 'ring-west',
    label: '中庭環・西側',
    x: 556,
    y: 130,
    angle: -50,
    rows: [
      {
        facing: 'entrance',
        slots: [
          { code: '313', type: '迪士尼仙履奇緣客房', tone: 'entrance' },
          { code: '312', type: '迪士尼愛麗絲夢遊仙境客房', tone: 'entrance' },
          { code: '311', type: '迪士尼愛麗絲夢遊仙境客房', tone: 'entrance' },
        ],
      },
    ],
  },
  {
    key: 'ring-top',
    label: '中庭環・北側',
    x: 616,
    y: 60,
    angle: 0,
    rows: [
      {
        facing: 'entrance',
        slots: [
          { code: '310', type: '迪士尼仙履奇緣客房', tone: 'entrance' },
          { code: '309', type: '迪士尼美女與野獸客房', tone: 'entrance', bed: '兩張標準床＋凹室床' },
          { code: '308', type: '迪士尼小仙子客房', tone: 'entrance', bed: '4 人・凹室' },
          { code: '307', type: '迪士尼小仙子客房', tone: 'entrance', bed: '3 人' },
          { code: '306', type: '迪士尼小仙子客房', tone: 'entrance', bed: '4 人・凹室' },
          { code: '305', type: '迪士尼美女與野獸客房', tone: 'entrance', bed: '兩張標準床＋凹室床' },
          { code: '304', type: '迪士尼仙履奇緣客房', tone: 'entrance' },
        ],
      },
    ],
  },
  {
    key: 'ring-east',
    label: '中庭環・東側',
    x: 796,
    y: 62,
    angle: 50,
    rows: [
      {
        facing: 'entrance',
        slots: [
          { code: '303', type: '迪士尼愛麗絲夢遊仙境客房', tone: 'entrance' },
          { code: '302', type: '迪士尼愛麗絲夢遊仙境客房', tone: 'entrance' },
          { code: '301', type: '迪士尼仙履奇緣客房', tone: 'entrance' },
        ],
      },
    ],
  },

  // ── West leg: odd numbers on the inner side, even on the outer ──
  {
    key: 'leg-west',
    label: '西腳',
    x: 528,
    y: 222,
    angle: 90,
    rows: [
      {
        facing: 'side',
        slots: [
          { code: '501', type: '迪士尼美女與野獸客房', tone: 'entrance', bed: '三張標準床' },
          ...run(['503', '505', '507', '509', '511'], '精緻凹室客房', 'inner'),
          { code: '513', type: '尊爵客房（4 名對應）', tone: 'inner' },
        ],
      },
      {
        facing: 'side',
        slots: [
          { code: '502', type: '迪士尼美女與野獸客房', tone: 'entrance', bed: '三張標準床' },
          ...run(['504', '506', '508', '510', '512'], SUP, 'inner'),
        ],
      },
    ],
  },
  {
    key: 'corner-west',
    label: '西腳・轉角',
    x: 556,
    y: 186,
    angle: -45,
    rows: [
      {
        facing: 'park',
        slots: [
          { code: '323', type: '客房（原始平面圖未標示房型）', tone: 'inner' },
          { code: '324', type: '家庭客房（樂園景觀）', tone: 'park', bed: '5 人・93 m²' },
        ],
      },
    ],
  },

  // ── East leg mirrors the west one ──
  {
    key: 'leg-east',
    label: '東腳',
    x: 928,
    y: 222,
    angle: 90,
    rows: [
      {
        facing: 'side',
        slots: [
          { code: '202', type: '迪士尼美女與野獸客房', tone: 'entrance', bed: '三張標準床' },
          ...run(['204', '206', '208', '210', '212'], SUP, 'inner'),
        ],
      },
      {
        facing: 'side',
        slots: [
          { code: '201', type: '迪士尼美女與野獸客房', tone: 'entrance', bed: '三張標準床' },
          ...run(['203', '205', '207', '209', '211'], '精緻凹室客房', 'inner'),
          { code: '213', type: '尊爵客房（4 名對應）', tone: 'inner' },
        ],
      },
    ],
  },
  {
    key: 'corner-east',
    label: '東腳・轉角',
    x: 892,
    y: 152,
    angle: 45,
    rows: [
      {
        facing: 'park',
        slots: [
          { code: '224', type: '家庭客房（樂園景觀）', tone: 'park', bed: '5 人・93 m²' },
          { code: '223', type: '客房（原始平面圖未標示房型）', tone: 'inner' },
        ],
      },
    ],
  },

  // ── The two end blocks that face the park head on ──
  {
    key: 'end-west',
    label: '西端正面客房',
    x: 415,
    y: 402,
    angle: 0,
    rows: [
      {
        facing: 'park',
        slots: [
          { code: '522', type: '樂園全景觀客房', tone: 'grand', bed: '雙人床・48 m²' },
          { code: '521', type: '樂園全景觀客房', tone: 'grand', bed: '兩張標準床・40 m²' },
          { code: '520', type: '樂園全景觀・凹室客房', tone: 'grand' },
          { code: '518', type: '樂園全景觀・凹室客房', tone: 'grand' },
          { code: '517', type: '樂園全景觀客房', tone: 'grand' },
          { code: '516', type: '樂園全景觀・凹室客房', tone: 'grand' },
          { code: '515', type: '角塔：景隅／塔樓客房／套房', tone: 'turret' },
        ],
      },
    ],
  },
  {
    key: 'end-east',
    label: '東端正面客房',
    x: 817,
    y: 402,
    angle: 0,
    rows: [
      {
        facing: 'park',
        slots: [
          { code: '215', type: '角塔：景隅／塔樓客房／套房', tone: 'turret' },
          { code: '216', type: '樂園全景觀・凹室客房', tone: 'grand' },
          { code: '217', type: '樂園全景觀客房', tone: 'grand' },
          { code: '218', type: '樂園全景觀・凹室客房', tone: 'grand' },
          { code: '220', type: '樂園全景觀・凹室客房', tone: 'grand' },
          { code: '221', type: '樂園全景觀客房', tone: 'grand', bed: '兩張標準床・40 m²' },
          { code: '222', type: '樂園全景觀客房', tone: 'grand', bed: '雙人床・48 m²' },
        ],
      },
    ],
  },

  // ── The bridge, 8F and 9F only ──
  {
    key: 'bridge',
    label: '空橋（8–9 樓）',
    x: 616,
    y: 320,
    angle: 0,
    rows: [
      {
        facing: 'park',
        slots: [
          { code: '401', type: '禮賓房 精緻客房（樂園全景觀）', tone: 'grand' },
          { code: '402', type: '禮賓房 精緻凹室客房（樂園全景觀）', tone: 'grand' },
          { code: '403', type: '禮賓房 精緻凹室客房（樂園全景觀）', tone: 'grand' },
          { code: '404', type: '禮賓房 精緻客房（樂園全景觀）', tone: 'grand' },
          { code: '405', type: '禮賓房 精緻凹室客房（樂園全景觀）', tone: 'grand' },
          { code: '406', type: '禮賓房 精緻凹室客房（樂園全景觀）', tone: 'grand' },
          { code: '407', type: '禮賓房 精緻客房（樂園全景觀）', tone: 'grand' },
        ],
      },
    ],
  },

  // ── East wing: a single-loaded run that bends twice, ending at the turret ──
  {
    key: 'wing-east-inner',
    label: '東翼・內段',
    x: 962,
    y: 152,
    angle: 0,
    rows: [
      {
        facing: 'park',
        slots: [
          { code: '101', type: SUP, tone: 'inner' },
          { code: '102', type: SUP, tone: 'inner' },
          { code: '103', type: '尊爵客房（無障礙設計）', tone: 'inner' },
          { code: '104', type: SUP, tone: 'inner' },
          { code: '105', type: '禮賓房 尊爵客房（樂園景觀）', tone: 'park' },
          { code: '106', type: '禮賓房 精緻客房（樂園景觀）', tone: 'park' },
          { code: '107', type: '景隅客房（樂園景觀）', tone: 'park' },
        ],
      },
    ],
  },
  {
    key: 'wing-east-diag-a',
    label: '東翼・斜段一',
    x: 1146,
    y: 168,
    angle: 48,
    rows: [
      { facing: 'park', slots: run(['108', '109', '110', '111', '112', '113'], SUP_PARK, 'park') },
    ],
  },
  {
    key: 'wing-east-diag-b',
    label: '東翼・斜段二',
    x: 1252,
    y: 278,
    angle: 52,
    rows: [
      {
        facing: 'park',
        slots: [
          ...run(['114', '115', '116', '117', '118', '119', '120'], SUP_PARK, 'park'),
          { code: '121', type: '禮賓房 塔樓客房', tone: 'turret', bed: '兩張標準床' },
        ],
      },
    ],
  },
];

export const CELL_W = 24;
export const CELL_H = 22;
export const CORRIDOR = 10;
