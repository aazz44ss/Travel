/**
 * Every guest room on the Springs Side of the Fantasy Chateau, by position.
 *
 * This is the smallest side of the hotel and the one it sells hardest: fifteen
 * rooms at the tip of the wing that points at Fantasy Springs, all 50 m², and
 * the only place in the whole Fantasy Chateau with the top view tier
 * 樂園全景觀 / パークグランドビュー / Park Grand View — or a balcony.
 *
 * Unlike the Rose Court Side there is no single room-by-room survey to lean on,
 * so this is assembled from an official count and first-hand reports:
 *
 *  - The counts and sizes are official, from Oriental Land and Milial's
 *    2023-12-12 press release. Its four side totals add to the published 419,
 *    and its Rose Court breakdown matches the independent 147-room survey,
 *    which is why the Springs Side line is worth trusting too.
 *  - The numbering — 317 to 321 on the 5th, 6th and 7th floors, fifteen rooms
 *    and nothing else — is from two parties who went and looked: a guest who
 *    walked every corridor of the Fantasy Chateau and drew the floor as a
 *    schematic, and a guest who has stayed on this side four times.
 *  - Which position is which type on the 6th and 7th floors is stated by the
 *    four-time guest, corroborated by a guest who has stayed in all four
 *    balcony rooms, and confirmed by two photographs of the facade with a
 *    window ringed (6318, 6319) and one of a door plate (7321).
 *  - The floor split — 5th floor 景隅景觀, 6th and 7th 樂園全景觀 — is forced by
 *    the official counts (ten Park Grand View rooms is five positions on two
 *    floors, five Partial View is five positions on one) and explained by
 *    every 5th-floor report: the lobby terrace's roof is directly in front.
 *
 * The one thing nobody has confirmed is which 5th-floor room is the accessible
 * one; `SPRINGS_ACCESSIBLE_NOTE` carries that, and the position below is
 * marked as inferred rather than known.
 */

import type { RoomNumbers } from '~/data/hotel';

export type SpringsCategory = 'alcove' | 'balconyAlcove' | 'balcony' | 'accessible';
export type SpringsView = 'grand' | 'partial';

/** The two planes the facade turns between. */
export type SpringsPlane = 'pavilion' | 'wing';

export interface SpringsColumn {
  /** Last three digits of the room number. Prefix with a floor for the full number. */
  position: number;
  /** Category on the 6th and 7th floors. */
  category: SpringsCategory;
  /** Category on the 5th floor, where every room drops to Partial View. */
  fifthFloor: SpringsCategory;
  plane: SpringsPlane;
}

/**
 * The rooms somebody has actually published a number for, rather than a number
 * this file works out. Everything else below is arithmetic on the official
 * counts, which is worth being explicit about because the arithmetic is only as
 * good as the assumption that a position keeps its type up the building.
 *
 * 7321 is a photograph of the door plate. 6318 and 6319 are stay reports whose
 * authors also ringed their own window on a photograph of the facade. 6320,
 * 6321 and 7320 are named by a guest who has stayed in all four balcony rooms.
 */
const ATTESTED = new Set(['6318', '6319', '6320', '6321', '7320', '7321']);

export const SPRINGS_FLOORS = [7, 6, 5];

/**
 * Left to right as the facade is seen from Fantasy Springs, which is both how
 * the photographs are taken and the only way a guest ever sees it: the room
 * numbers run downwards, 321 at the outer corner nearest the Grand Chateau and
 * 317 at the end that also looks back into the Rose Court.
 *
 * The corridor behind runs the other way. It arrives at a T between 318 and
 * 319 — two doors to the left, three to the right — which is why the guest who
 * walked it describes the numbers as increasing from left to right and the
 * photographs show the opposite.
 */
export const SPRINGS_COLUMNS: SpringsColumn[] = [
  { position: 321, category: 'balcony', fifthFloor: 'accessible', plane: 'pavilion' },
  { position: 320, category: 'balconyAlcove', fifthFloor: 'alcove', plane: 'pavilion' },
  { position: 319, category: 'alcove', fifthFloor: 'alcove', plane: 'wing' },
  { position: 318, category: 'alcove', fifthFloor: 'alcove', plane: 'wing' },
  { position: 317, category: 'alcove', fifthFloor: 'alcove', plane: 'wing' },
];

/**
 * Measured off a park-level photograph of the facade, in bay widths. The five
 * openings came back evenly spaced to within 3%, so they are recorded as even;
 * the facade turns between 320 and 319, and the drawing unfolds it.
 *
 * The other ratios from the same photograph, per bay width: a storey is 0.73,
 * the three plain windows are 0.54 wide and 0.35 tall, and the two balcony
 * openings are 0.60 wide and 0.47 tall — the balcony rooms really do get a
 * wider, taller opening, not just a railing.
 */
export const SPRINGS_METRICS = {
  bays: [0, 1, 2, 3, 4],
  storeyPerBay: 0.73,
  windowPerBay: { width: 0.54, height: 0.35 },
  balconyPerBay: { width: 0.6, height: 0.47 },
};

export interface SpringsRoom {
  number: string;
  position: number;
  floor: number;
  category: SpringsCategory;
  view: SpringsView;
  plane: SpringsPlane;
  balcony: boolean;
  inferred: boolean;
  /** Id in `fantasy-springs-hotel`. Every Springs position has one. */
  roomType: string;
}

const ROOM_TYPE: Record<string, string> = {
  'alcove:grand': 'springs-alcove-grand',
  'alcove:partial': 'springs-alcove-partial',
  'balconyAlcove:grand': 'springs-balcony-alcove-grand',
  'balcony:grand': 'springs-balcony-grand',
  'accessible:partial': 'springs-access-partial',
};

export const SPRINGS_ROOMS: SpringsRoom[] = SPRINGS_COLUMNS.flatMap((column) =>
  SPRINGS_FLOORS.map((floor) => {
    const view: SpringsView = floor >= 6 ? 'grand' : 'partial';
    const category = floor >= 6 ? column.category : column.fifthFloor;
    const number = `${floor}${column.position}`;
    const roomType = ROOM_TYPE[`${category}:${view}`];
    if (!roomType) {
      throw new Error(`fsh-springs-side: no room type sells ${category} at ${view} view`);
    }
    return {
      number,
      position: column.position,
      floor,
      category,
      view,
      plane: column.plane,
      balcony: category === 'balcony' || category === 'balconyAlcove',
      inferred: !ATTESTED.has(number),
      roomType,
    };
  }),
);

export const SPRINGS_ROOM_COUNT = SPRINGS_ROOMS.length;

/**
 * The counts the hotel publishes for this side. The fifteen positions above are
 * only worth publishing because they add up to exactly this, so the build fails
 * rather than shipping a drawing that no longer reconciles.
 */
const PUBLISHED_COUNTS: Record<string, number> = {
  'springs-alcove-partial': 4,
  'springs-alcove-grand': 6,
  'springs-access-partial': 1,
  'springs-balcony-grand': 2,
  'springs-balcony-alcove-grand': 2,
};

if (SPRINGS_ROOM_COUNT !== 15) {
  throw new Error(`fsh-springs-side: ${SPRINGS_ROOM_COUNT} positions, the hotel publishes 15`);
}
for (const [type, expected] of Object.entries(PUBLISHED_COUNTS)) {
  const got = SPRINGS_ROOMS.filter((room) => room.roomType === type).length;
  if (got !== expected) {
    throw new Error(`fsh-springs-side: placed ${got} ${type}, hotel publishes ${expected}`);
  }
}
if (SPRINGS_METRICS.bays.length !== SPRINGS_COLUMNS.length) {
  throw new Error('fsh-springs-side: measured bays and columns disagree');
}
for (const number of ATTESTED) {
  if (!SPRINGS_ROOMS.some((room) => room.number === number)) {
    throw new Error(`fsh-springs-side: ${number} is attested but is not a position here`);
  }
}

export const SPRINGS_SOURCES = {
  /** Official: per-type counts, sizes and the definitions of the three view tiers. */
  counts: 'https://www.milialresorthotels.co.jp/pdf/20231212_3.pdf',
  /** A guest who walked every corridor and drew the floor. */
  walked: 'https://ameblo.jp/mamachanv/entry-12893876000.html',
  /** Four stays on this side: the number range, the corridor T, the type order. */
  stays: 'https://kakuyasu-kenkyu.com/springsside-roomreviw/',
  /** All four balcony rooms, naming 6320/7320 and 6321/7321. */
  balconies: 'https://ameblo.jp/jukutyokazu/entry-12965866370.html',
  /** The facade with 6318 ringed, from the Arendelle Castle waterfront. */
  facade: 'https://youmeshi-hotel.hatenablog.com/entry/2025/02/22/132919',
};

/** Room numbers per bookable type, in the shape the room explorer expects. */
export const ROOM_NUMBERS: RoomNumbers = Object.fromEntries(
  Object.keys(PUBLISHED_COUNTS).map((id) => {
    const rooms = SPRINGS_ROOMS.filter((room) => room.roomType === id);
    return [
      id,
      {
        numbers: rooms.map((room) => room.number).sort(),
        balcony: rooms.filter((room) => room.balcony).map((room) => room.number).sort(),
        complete: true,
        note: '房號的第一位是樓層，後三位是位置。間數是官方公布的，位置來自住客的實地回報。',
      },
    ];
  }),
);
