/**
 * Every guest room on the Rose Court Side of the Fantasy Chateau, by position.
 *
 * The Rose Court Side wraps three sides of the hotel's courtyard, and the room
 * number tells you exactly where you are: the leading digit is the floor and the
 * last three are the position, so 9103 and 3103 are the same window seven floors
 * apart. That makes the side describable as three elevations rather than seven
 * floor plans.
 *
 * Source: a room-by-room survey on the fukufukusatoka blog, which marked each
 * window on three photographs of the courtyard elevations with its category and
 * shaded the Park View block. The survey states it contains the author's own
 * inference where social-media reports ran out, and this file inherits that.
 *
 * What makes it trustworthy anyway is that it reconciles: the 147 positions below
 * split into exactly the six category totals the hotel publishes for this side
 * (21 Superior, 96 Superior Alcove, 4 and 22 of their Park View counterparts,
 * 2 Deluxe, 2 Deluxe Accessible). A wrong marker would break that arithmetic,
 * which `roseCourtTally()` recomputes from the data on every build.
 */

import type { RoomNumbers } from '~/data/hotel';

export type RoseCategory = 'superior' | 'alcove' | 'deluxe' | 'accessible';

export interface ElevationColumn {
  /** Last three digits of the room number. Prefix with a floor for the full number. */
  position: number;
  /** Floors this position exists on, highest first. */
  floors: number[];
  /** Category, for the columns where it is the same all the way up. */
  category?: RoseCategory;
  /** Category per floor, for the one column where it changes. */
  categoryByFloor?: Partial<Record<number, RoseCategory>>;
  /** Floors on which this position is sold as 樂園景觀. */
  parkView?: number[];
}

export interface ElevationFace {
  key: string;
  label: string;
  /** The number band that identifies this elevation. */
  numberBand: string;
  /** What the windows look at, in one line. */
  outlook: string;
  /** Left-to-right in the same order as the source photograph. */
  columns: ElevationColumn[];
  /**
   * Where each column sits across the facade, in bay widths, parallel to
   * `columns`. Recovered from the survey photographs: the markers form a
   * projected image of a rectangular grid, so fitting a line through each floor
   * and each column gives two vanishing points, and sending the line joining
   * them to infinity rectifies the facade far enough to read off ratios.
   *
   * Two of the three faces came back regular to within 3%, which is measurement
   * noise, so they are recorded as evenly spaced. The third did not — see its
   * own note.
   */
  bays: number[];
  /** Centre of the roofline's ornamental crest, in the same bay units. */
  crest: number;
  /** Link to the photograph the face was surveyed on. */
  source: string;
}

export const ELEVATIONS: ElevationFace[] = [
  {
    key: 'park',
    label: '朝夢幻泉鄉的一面',
    numberBand: '1xx',
    outlook: '隔著中庭正對園區，普羅米修斯火山在正中間。越往右，豪華館的外牆越擠進畫面。',
    columns: [
      { position: 101, floors: [9, 8, 7, 6, 5, 4, 3], category: 'superior', parkView: [9, 8, 7, 6] },
      { position: 103, floors: [9, 8, 7, 6, 5, 4, 3], category: 'alcove', parkView: [9, 8, 7, 6] },
      { position: 105, floors: [9, 8, 7, 6, 5, 4, 3], category: 'alcove', parkView: [9, 8, 7, 6] },
      { position: 107, floors: [9, 8, 7, 6, 5, 4, 3], category: 'alcove', parkView: [9, 8, 7, 6] },
      { position: 109, floors: [9, 8, 7, 6, 5, 4, 3], category: 'alcove', parkView: [9, 8, 7, 6] },
      { position: 111, floors: [9, 8, 7, 6, 5, 4, 3], category: 'alcove', parkView: [9, 8, 7, 6] },
      { position: 113, floors: [9, 8, 7, 6, 5, 4, 3], category: 'alcove', parkView: [9, 8] },
      { position: 115, floors: [9, 8, 7, 6, 5, 4, 3], category: 'alcove' },
      { position: 117, floors: [9, 8, 7, 6, 5, 4, 3], category: 'alcove' },
    ],
    bays: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    crest: 4.5,
    source: 'https://ameblo.jp/fukufukusatoka/entry-12881620128.html',
  },
  {
    key: 'chateau',
    label: '朝豪華館的一面',
    numberBand: '2xx',
    outlook: '窗外主要是豪華館的建築。這一面沒有任何樂園景觀客房。',
    columns: [
      { position: 201, floors: [7, 6, 5, 4, 3], category: 'superior' },
      { position: 202, floors: [7, 6, 5, 4, 3], category: 'alcove' },
      { position: 203, floors: [7, 6, 5, 4, 3], category: 'alcove' },
      { position: 204, floors: [7, 6, 5, 4, 3], category: 'alcove' },
      { position: 205, floors: [7, 6, 5, 4, 3], category: 'alcove' },
      { position: 206, floors: [7, 6, 5, 4, 3], category: 'alcove' },
      { position: 207, floors: [7, 6, 5, 4, 3], category: 'alcove' },
      { position: 208, floors: [7, 6, 5, 4, 3], category: 'superior' },
      { position: 209, floors: [6, 5, 4, 3], category: 'alcove' },
      { position: 210, floors: [6, 5, 4, 3], category: 'alcove' },
      { position: 211, floors: [6, 5, 4, 3], category: 'superior' },
    ],
    // This face is the one that did not come back regular. Ten of its bays are
    // even to within 4%, but the eleventh — between 208 and 209 — measures 1.9
    // times the rest, which is a step in the building rather than noise. The
    // photograph agrees: the last three positions sit on a block set back
    // behind the corner, and it stops a storey lower, which is why 209 to 211
    // reach only the 6th floor.
    bays: [0, 1, 2, 3, 4, 5, 6, 7, 8.9, 9.9, 10.9],
    crest: 4.5,
    source: 'https://ameblo.jp/fukufukusatoka/entry-12881620128.html',
  },
  {
    key: 'diagonal',
    label: '斜看樂園的一面',
    numberBand: '3xx',
    outlook:
      '正前方是對面的客房，但站到窗邊往斜向看得到樂園，而且看得到樂園景觀客房看不到的艾倫戴爾城堡。這一面只有 5 樓以上。',
    columns: [
      {
        position: 315,
        floors: [8, 7, 6, 5],
        categoryByFloor: { 8: 'accessible', 7: 'deluxe', 6: 'deluxe', 5: 'accessible' },
      },
      { position: 313, floors: [8, 7, 6, 5], category: 'alcove' },
      { position: 311, floors: [8, 7, 6, 5], category: 'alcove' },
      { position: 309, floors: [8, 7, 6, 5], category: 'alcove' },
      { position: 307, floors: [8, 7, 6, 5], category: 'alcove' },
      { position: 305, floors: [8, 7, 6, 5], category: 'alcove' },
      { position: 303, floors: [8, 7, 6, 5], category: 'alcove' },
      { position: 301, floors: [8, 7, 6, 5], category: 'superior' },
    ],
    bays: [0, 1, 2, 3, 4, 5, 6, 7],
    crest: 5.5,
    source: 'https://ameblo.jp/fukufukusatoka/entry-12881620128.html',
  },
];

/**
 * A key plan of the courtyard, so the three faces can be pointed at instead of
 * only described. Names like "the side facing the Grand Chateau" only mean
 * something once you can see which wall they are.
 *
 * Metres, x east and y south, origin at the centre of the courtyard. Taken from
 * the hotel's OpenStreetMap footprint (way 1259623365), which lands on the Esri
 * aerial to within half a metre, and confirmed against the hotel's own floor
 * map: fitting the three courtyard corners below onto the Rose Court shown on
 * `fsh_floormap.jpg` puts the rest of the 146-node outline on the building the
 * plan draws, with the corners themselves off by about two metres.
 *
 * Which wall is which face is not in either source; it comes from the survey's
 * own photographs and reconciles four separate ways:
 *
 *  - The 11 positions of the 2xx face need the 52.9 m wall. Nothing else fits.
 *  - Park View on the 1xx face runs 101–111 and fades by 113, and only from the
 *    6th floor up. From the 101 end of the 40.7 m wall the volcano clears the
 *    courtyard mouth; walking towards 117 swings the 2xx wing across it, and
 *    the wing's last three positions stop a storey lower, which is what the
 *    6th-floor cut-off is.
 *  - The 3xx face reports the park diagonally to the right and Arendelle Castle
 *    at the left of it, which is what the 29.6 m wall sees: it looks at 46°,
 *    with the castle at 88° and Mount Prometheus at 120°.
 *  - A guest who walked every corridor drew 201 next to 117 and 301 next to
 *    101, which is where the two shared corners below put them.
 */
export interface CourtWall {
  key: string;
  /** Wall ends, at the lower and higher position number. */
  from: [number, number];
  to: [number, number];
  fromPosition: number;
  toPosition: number;
  /** Compass bearing the windows look along. */
  faces: number;
}

export const COURT_PLAN: {
  /** Building around the courtyard, cropped wide so the drawing can run off its frame. */
  outline: [number, number][];
  court: [number, number][];
  walls: CourtWall[];
  /** The gap the courtyard opens through, towards the park. */
  mouth: { from: [number, number]; to: [number, number] };
  /** Landmarks worth naming, as bearing and metres from the courtyard's centre. */
  sights: { key: string; bearing: number; metres: number }[];
} = {
  outline: [
    [-51.3, 16.5], [-48.2, 16.4], [-25.3, 39.9], [-28.2, 42.5], [-17.6, 53.5], [-17.7, 56.0],
    [19.8, 56.0], [20.2, 49.2], [23.1, 49.0], [24.1, 29.9], [21.0, 28.0], [20.9, 24.3],
    [15.8, 24.2], [15.8, 22.2], [-11.0, 21.7], [-31.5, 0.4], [-31.3, -2.9], [-2.2, -31.5],
    [34.0, 7.1], [41.5, 1.2], [43.3, 3.3], [47.7, -0.8], [37.0, -11.5], [38.1, -12.5],
    [34.5, -16.4], [33.4, -15.4], [-3.8, -54.7], [-5.6, -52.7], [-8.6, -55.7], [-13.9, -49.2],
    [-15.8, -51.3], [-52.6, -16.0], [-54.6, -17.9], [-63.8, -9.4], [-61.7, -7.1], [-74.0, 4.2],
    [-74.0, 35.9],
  ],
  court: [
    [34.0, 7.1], [-2.2, -31.5], [-31.3, -2.9], [-31.5, 0.4], [-11.0, 21.7], [15.8, 22.2],
  ],
  walls: [
    { key: 'park', from: [-31.3, -2.9], to: [-2.2, -31.5], fromPosition: 101, toPosition: 117, faces: 135.5 },
    { key: 'chateau', from: [-2.2, -31.5], to: [34.0, 7.1], fromPosition: 201, toPosition: 211, faces: 226.8 },
    { key: 'diagonal', from: [-31.5, 0.4], to: [-11.0, 21.7], fromPosition: 301, toPosition: 315, faces: 46.0 },
  ],
  mouth: { from: [15.8, 22.2], to: [34.0, 7.1] },
  sights: [
    { key: 'prometheus', bearing: 120.0, metres: 850 },
    { key: 'arendelle', bearing: 87.5, metres: 173 },
  ],
};

export const ROSE_CATEGORY_LABEL: Record<RoseCategory, string> = {
  superior: '精緻客房',
  alcove: '附凹室精緻客房',
  deluxe: '尊爵客房',
  accessible: '尊爵無障礙客房',
};

export interface RoseRoom {
  number: string;
  face: string;
  position: number;
  floor: number;
  category: RoseCategory;
  parkView: boolean;
  /** Id in `fantasy-springs-hotel`, or undefined where no category covers it. */
  roomType?: string;
}

export function categoryAt(column: ElevationColumn, floor: number): RoseCategory {
  return column.categoryByFloor?.[floor] ?? column.category!;
}

/**
 * Which bookable room type a position falls into from 2026-10-01, when the
 * Superior and Superior Alcove categories split by floor band.
 *
 * Returns undefined for one position: the published bands for Superior stop at
 * the 7th floor, but position 301 continues to the 8th. Nothing official says
 * where 8301 is sold, so this does not guess.
 */
function roomTypeAt(category: RoseCategory, floor: number, parkView: boolean): string | undefined {
  if (category === 'superior') {
    if (parkView) return 'rose-superior-park';
    if (floor <= 4) return 'rose-superior-low';
    if (floor <= 7) return 'rose-superior-high';
    return undefined;
  }
  if (category === 'alcove') {
    if (parkView) return 'rose-alcove-park';
    return floor <= 4 ? 'rose-alcove-low' : 'rose-alcove-high';
  }
  if (category === 'deluxe') return 'rose-deluxe';
  // Of the two accessible rooms one is now sold as 樂園景觀. The official page
  // gives no floor; the source blog reads it as the 8th-floor room, because the
  // 5th-floor one looks into a roof.
  return floor >= 8 ? 'rose-deluxe-access-park' : 'rose-deluxe-access';
}

export const ROSE_ROOMS: RoseRoom[] = ELEVATIONS.flatMap((face) =>
  face.columns.flatMap((column) =>
    column.floors.map((floor) => {
      const category = categoryAt(column, floor);
      const parkView = column.parkView?.includes(floor) ?? false;
      const roomType = roomTypeAt(category, floor, parkView);
      return {
        number: `${floor}${column.position}`,
        face: face.key,
        position: column.position,
        floor,
        category,
        parkView,
        ...(roomType ? { roomType } : {}),
      };
    }),
  ),
);

export const ROSE_ROOM_COUNT = ROSE_ROOMS.length;

/** Recomputed from the data so it can never drift from the elevations above. */
export function roseCourtTally(): { category: RoseCategory; parkView: boolean; count: number }[] {
  const keys: [RoseCategory, boolean][] = [
    ['superior', false],
    ['superior', true],
    ['alcove', false],
    ['alcove', true],
    ['deluxe', false],
    ['accessible', false],
  ];
  return keys.map(([category, parkView]) => ({
    category,
    parkView,
    count: ROSE_ROOMS.filter((r) => r.category === category && r.parkView === parkView).length,
  }));
}

/** Room numbers belonging to one room type, for the explorer's per-type panel. */
export function roseNumbersFor(roomType: string): string[] {
  return ROSE_ROOMS.filter((room) => room.roomType === roomType)
    .map((room) => room.number)
    .sort();
}

/**
 * The counts the hotel publishes for this side. The whole reason the elevations
 * above are worth publishing is that they add up to exactly this, so the build
 * fails rather than quietly shipping a table that no longer reconciles.
 */
const PUBLISHED_COUNTS: Record<string, number> = {
  'superior:none': 21,
  'superior:park': 4,
  'alcove:none': 96,
  'alcove:park': 22,
  'deluxe:none': 2,
  'accessible:none': 2,
};

for (const face of ELEVATIONS) {
  if (face.bays.length !== face.columns.length) {
    throw new Error(
      `fsh-rose-court: ${face.key} has ${face.columns.length} columns but ${face.bays.length} measured bays`,
    );
  }
  if (face.bays.some((bay, i) => i > 0 && bay <= face.bays[i - 1]!)) {
    throw new Error(`fsh-rose-court: ${face.key} bays are not left to right`);
  }
}

// The key plan and the elevations describe the same three walls, so a face
// renamed or a position range edited in one has to move in the other. The bay
// pitch is the cross-check that the plan is pointing at the right wall at all:
// each face's windows have to fit the wall the plan gives it.
for (const wall of COURT_PLAN.walls) {
  const face = ELEVATIONS.find((f) => f.key === wall.key);
  if (!face) throw new Error(`fsh-rose-court: key plan has a wall for no face, ${wall.key}`);
  const positions = face.columns.map((column) => column.position);
  const ends = [Math.min(...positions), Math.max(...positions)];
  if (wall.fromPosition !== ends[0] || wall.toPosition !== ends[1]) {
    throw new Error(
      `fsh-rose-court: ${wall.key} runs ${ends[0]}–${ends[1]}, key plan says ${wall.fromPosition}–${wall.toPosition}`,
    );
  }
}

// A face with more windows has to be on a longer wall. This is the check that
// would catch two faces swapped, which is the mistake worth guarding against;
// the exact pitch is not, because the walls are not all measurable to the same
// standard. The 1xx and 2xx faces work out at 4.5 m a room, the 3xx face at
// 3.7 m, and that face is also the one whose block starts on the 5th floor and
// stands on a podium, so its wall need not follow the outline at ground level.
const byWall = [...COURT_PLAN.walls].sort(
  (a, b) =>
    Math.hypot(a.to[0] - a.from[0], a.to[1] - a.from[1]) -
    Math.hypot(b.to[0] - b.from[0], b.to[1] - b.from[1]),
);
const byWindows = [...COURT_PLAN.walls].sort(
  (a, b) =>
    ELEVATIONS.find((f) => f.key === a.key)!.columns.length -
    ELEVATIONS.find((f) => f.key === b.key)!.columns.length,
);
if (byWall.some((wall, i) => wall.key !== byWindows[i]!.key)) {
  throw new Error(
    `fsh-rose-court: walls ordered ${byWall.map((w) => w.key).join(',')} by length but ` +
      `${byWindows.map((w) => w.key).join(',')} by window count`,
  );
}

for (const [key, expected] of Object.entries(PUBLISHED_COUNTS)) {
  const [category, view] = key.split(':');
  const got = ROSE_ROOMS.filter(
    (room) => room.category === category && room.parkView === (view === 'park'),
  ).length;
  if (got !== expected) {
    throw new Error(`fsh-rose-court: traced ${got} ${key} positions, hotel publishes ${expected}`);
  }
}


/**
 * Room numbers per bookable type, in the shape the room explorer expects. Only
 * the Rose Court Side has them; the other three sides and the Grand Chateau have
 * no published room-by-room survey.
 */
export const ROOM_NUMBERS: RoomNumbers = Object.fromEntries(
  [...new Set(ROSE_ROOMS.map((room) => room.roomType).filter((id): id is string => !!id))].map(
    (id) => [
      id,
      {
        numbers: roseNumbersFor(id),
        balcony: [],
        complete: true,
        note: '房號的第一位是樓層，後三位是位置。來源是逐間調查，含作者推測。',
      },
    ],
  ),
);
