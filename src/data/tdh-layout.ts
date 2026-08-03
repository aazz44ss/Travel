/**
 * Room-level layout of Tokyo Disneyland Hotel.
 *
 * Transcribed from the published floor plans, which mark every room with a
 * reference number keyed to a list of 54 room types. Cross-checking that
 * transcription against the room-number dataset confirmed it: the seven rooms
 * along the 9F bridge read 41-42-42-41-42-42-41, which is exactly the
 * concierge superior / alcove alternation of 9401 through 9407.
 *
 * The building is a double-loaded plan — most arms have rooms on both sides of
 * a corridor — which is why one wing can hold character rooms facing the main
 * entrance and park-view rooms facing the other way. Odd and even room numbers
 * sit on opposite sides.
 *
 * Positions marked without a code are real rooms whose numbers the survey did
 * not list, because those categories run to dozens of rooms. They are drawn so
 * that the corridor reads correctly rather than looking half empty.
 */

export type Facing = 'park' | 'entrance' | 'side';

export interface Slot {
  /** Position code (the last three digits of the room number). */
  code?: string;
  /** Room type in Traditional Chinese, as shown on the plan legend. */
  type: string;
  tone: 'grand' | 'park' | 'entrance' | 'inner' | 'turret';
  /** Bed configuration, where the room type distinguishes it. */
  bed?: string;
}

export interface Row {
  facing: Facing;
  slots: Slot[];
}

export interface Bar {
  key: string;
  label: string;
  /** Bar-local origin in plan coordinates. */
  x: number;
  y: number;
  /** Degrees, clockwise, applied about the origin. */
  angle: number;
  rows: Row[];
  /** Rendered only on these floors. Omit for "wherever rooms exist". */
  floors?: number[];
}

const SUPERIOR_NOVIEW: Slot = { type: '精緻客房／精緻凹室客房', tone: 'inner' };
const SUPERIOR_PARK: Slot = { type: '精緻客房／精緻凹室客房（樂園景觀）', tone: 'park' };

const repeat = (slot: Slot, n: number): Slot[] => Array.from({ length: n }, () => ({ ...slot }));

export const BARS: Bar[] = [
  // ── Courtyard ring: a single row of character rooms, 301 to 313 in order ──
  {
    key: 'ring-west',
    label: '中庭環・西側',
    x: 637,
    y: 185,
    angle: -50,
    rows: [
      {
        facing: 'entrance',
        slots: [
          { code: '301', type: '迪士尼仙履奇緣客房', tone: 'entrance' },
          { code: '302', type: '迪士尼愛麗絲夢遊仙境客房', tone: 'entrance' },
          { code: '303', type: '迪士尼愛麗絲夢遊仙境客房', tone: 'entrance' },
        ],
      },
    ],
  },
  {
    key: 'ring-top',
    label: '中庭環・北側',
    x: 695,
    y: 90,
    angle: 0,
    rows: [
      {
        facing: 'entrance',
        slots: [
          { code: '304', type: '迪士尼仙履奇緣客房', tone: 'entrance' },
          { code: '305', type: '迪士尼美女與野獸客房', tone: 'entrance', bed: '兩張標準床＋凹室床' },
          { code: '306', type: '迪士尼小仙子客房', tone: 'entrance', bed: '4 人・凹室' },
          { code: '307', type: '迪士尼小仙子客房', tone: 'entrance', bed: '3 人' },
          { code: '308', type: '迪士尼小仙子客房', tone: 'entrance', bed: '4 人・凹室' },
          { code: '309', type: '迪士尼美女與野獸客房', tone: 'entrance', bed: '兩張標準床＋凹室床' },
          { code: '310', type: '迪士尼仙履奇緣客房', tone: 'entrance' },
        ],
      },
    ],
  },
  {
    key: 'ring-east',
    label: '中庭環・東側',
    x: 928,
    y: 94,
    angle: 50,
    rows: [
      {
        facing: 'entrance',
        slots: [
          { code: '311', type: '迪士尼愛麗絲夢遊仙境客房', tone: 'entrance' },
          { code: '312', type: '迪士尼愛麗絲夢遊仙境客房', tone: 'entrance' },
          { code: '313', type: '迪士尼仙履奇緣客房', tone: 'entrance' },
        ],
      },
    ],
  },

  // ── West wing: bends, so the same side of the corridor changes what it faces ──
  {
    key: 'wing-west-diag',
    label: '西翼・斜段',
    x: 150,
    y: 120,
    angle: 30,
    rows: [
      {
        facing: 'entrance',
        slots: [
          { code: '632', type: '迪士尼小仙子客房', tone: 'entrance', bed: '4 人・凹室' },
          { code: '630', type: '迪士尼小仙子客房', tone: 'entrance', bed: '4 人・凹室' },
          { code: '628', type: '迪士尼小仙子客房', tone: 'entrance', bed: '4 人・凹室' },
          { code: '626', type: '迪士尼小仙子客房', tone: 'entrance', bed: '4 人・凹室' },
          { code: '624', type: '迪士尼小仙子客房', tone: 'entrance', bed: '4 人・凹室' },
          { code: '622', type: '迪士尼小仙子客房', tone: 'entrance', bed: '4 人・凹室' },
        ],
      },
      { facing: 'side', slots: repeat(SUPERIOR_NOVIEW, 6) },
    ],
  },
  {
    key: 'wing-west-horiz',
    label: '西翼・橫段',
    x: 306,
    y: 210,
    angle: 0,
    rows: [
      {
        facing: 'entrance',
        slots: [
          { code: '616', type: '迪士尼愛麗絲夢遊仙境客房', tone: 'entrance' },
          { code: '614', type: '迪士尼愛麗絲夢遊仙境客房', tone: 'entrance', bed: '凹室' },
          { code: '612', type: '迪士尼愛麗絲夢遊仙境客房', tone: 'entrance', bed: '凹室' },
          { code: '610', type: '迪士尼愛麗絲夢遊仙境客房', tone: 'entrance', bed: '凹室' },
          { code: '608', type: '迪士尼愛麗絲夢遊仙境客房', tone: 'entrance', bed: '凹室' },
          { code: '606', type: '迪士尼愛麗絲夢遊仙境客房', tone: 'entrance', bed: '凹室' },
          { code: '604', type: '迪士尼愛麗絲夢遊仙境客房', tone: 'entrance', bed: '凹室' },
          { code: '602', type: '迪士尼美女與野獸客房', tone: 'entrance', bed: '兩張標準床・4 人' },
        ],
      },
      {
        facing: 'park',
        slots: [
          { code: '619', type: '尊爵客房', tone: 'inner', bed: '兩張標準床' },
          { code: '617', type: '小家庭客房（樂園景觀）', tone: 'park', bed: '三張標準床' },
          ...repeat(SUPERIOR_PARK, 4),
          { code: '603', type: '迪士尼美女與野獸客房', tone: 'entrance', bed: '兩張標準床・3 人' },
        ],
      },
    ],
  },

  // ── East wing ──
  {
    key: 'wing-east-inner',
    label: '東翼・內段',
    x: 1040,
    y: 210,
    angle: 0,
    rows: [
      {
        facing: 'park',
        slots: [
          { code: '103', type: '尊爵客房（無障礙設計）', tone: 'inner' },
          { ...SUPERIOR_NOVIEW },
          { code: '105', type: '禮賓房 尊爵客房（樂園景觀）', tone: 'park' },
          { code: '106', type: '禮賓房 精緻客房（樂園景觀）', tone: 'park' },
          { code: '107', type: '景隅客房（樂園景觀）', tone: 'park' },
        ],
      },
    ],
  },
  {
    key: 'wing-east-diag',
    label: '東翼・斜段',
    x: 1200,
    y: 240,
    angle: 46,
    rows: [
      { facing: 'park', slots: [...repeat(SUPERIOR_PARK, 6)] },
      {
        facing: 'side',
        slots: [
          ...repeat(SUPERIOR_PARK, 5),
          { code: '121', type: '禮賓房 塔樓客房', tone: 'turret', bed: '兩張標準床' },
        ],
      },
    ],
  },

  // ── The two legs, running from the ring toward the park ──
  {
    key: 'leg-west',
    label: '西腳',
    x: 664,
    y: 262,
    angle: 90,
    rows: [
      {
        facing: 'side',
        slots: [
          { code: '202', type: '迪士尼美女與野獸客房', tone: 'entrance', bed: '三張標準床' },
          ...repeat(SUPERIOR_NOVIEW, 6),
        ],
      },
      {
        facing: 'side',
        slots: [
          { code: '201', type: '迪士尼美女與野獸客房', tone: 'entrance', bed: '三張標準床' },
          ...repeat(SUPERIOR_NOVIEW, 3),
          { code: '209', type: '精緻凹室客房', tone: 'inner' },
          { code: '211', type: '精緻凹室客房', tone: 'inner' },
          { code: '213', type: '尊爵客房（4 名對應）', tone: 'inner' },
        ],
      },
    ],
  },
  {
    key: 'leg-east',
    label: '東腳',
    x: 1000,
    y: 262,
    angle: 90,
    rows: [
      {
        facing: 'side',
        slots: [
          { code: '501', type: '迪士尼美女與野獸客房', tone: 'entrance', bed: '三張標準床' },
          { code: '503', type: '精緻凹室客房', tone: 'inner' },
          { code: '505', type: '精緻凹室客房', tone: 'inner' },
          { code: '507', type: '精緻凹室客房', tone: 'inner' },
          { code: '509', type: '精緻凹室客房', tone: 'inner' },
          { code: '511', type: '精緻凹室客房', tone: 'inner' },
          { code: '513', type: '尊爵客房（4 名對應）', tone: 'inner' },
        ],
      },
      {
        facing: 'side',
        slots: [
          { code: '502', type: '迪士尼美女與野獸客房', tone: 'entrance', bed: '三張標準床' },
          ...repeat(SUPERIOR_NOVIEW, 6),
        ],
      },
    ],
  },

  // ── Family rooms sit at the top-outer corner of each leg ──
  {
    key: 'family-west',
    label: '西側家庭客房',
    x: 552,
    y: 248,
    angle: 0,
    rows: [
      {
        facing: 'park',
        slots: [{ code: '224', type: '家庭客房（樂園景觀）', tone: 'park', bed: '5 人・93 m²' }],
      },
    ],
  },
  {
    key: 'family-east',
    label: '東側家庭客房',
    x: 1088,
    y: 248,
    angle: 0,
    rows: [
      {
        facing: 'park',
        slots: [{ code: '324', type: '家庭客房（樂園景觀）', tone: 'park', bed: '5 人・93 m²' }],
      },
    ],
  },

  // ── The end blocks that face the park head on ──
  {
    key: 'end-west',
    label: '西端正面客房',
    x: 527,
    y: 492,
    angle: 0,
    rows: [
      {
        facing: 'park',
        slots: [
          { code: '222', type: '精緻客房（樂園全景觀）', tone: 'grand', bed: '雙人床・48 m²' },
          { code: '221', type: '精緻客房（樂園全景觀）', tone: 'grand', bed: '兩張標準床・40 m²' },
          { code: '220', type: '禮賓房 精緻凹室客房（樂園全景觀）', tone: 'grand' },
          { code: '218', type: '禮賓房 精緻凹室客房（樂園全景觀）', tone: 'grand' },
          { code: '217', type: '禮賓房 精緻客房（樂園全景觀）', tone: 'grand' },
          { code: '216', type: '禮賓房 精緻凹室客房（樂園全景觀）', tone: 'grand' },
          { code: '215', type: '角塔：景隅／塔樓客房／套房', tone: 'turret' },
        ],
      },
    ],
  },
  {
    key: 'end-east',
    label: '東端正面客房',
    x: 863,
    y: 492,
    angle: 0,
    rows: [
      {
        facing: 'park',
        slots: [
          { code: '515', type: '角塔：景隅／塔樓客房／套房', tone: 'turret' },
          { code: '516', type: '禮賓房 精緻凹室客房（樂園全景觀）', tone: 'grand' },
          { code: '517', type: '禮賓房 精緻客房（樂園全景觀）', tone: 'grand' },
          { code: '518', type: '禮賓房 精緻凹室客房（樂園全景觀）', tone: 'grand' },
          { code: '520', type: '禮賓房 精緻凹室客房（樂園全景觀）', tone: 'grand' },
          { code: '521', type: '精緻客房（樂園全景觀）', tone: 'grand', bed: '兩張標準床・40 m²' },
          { code: '522', type: '精緻客房（樂園全景觀）', tone: 'grand', bed: '雙人床・48 m²' },
        ],
      },
    ],
  },

  // ── The bridge exists only on the top two floors ──
  {
    key: 'bridge',
    label: '空橋（8–9 樓）',
    x: 695,
    y: 400,
    angle: 0,
    floors: [8, 9],
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
];

export const CELL_W = 30;
export const CELL_H = 26;
export const CORRIDOR = 12;
