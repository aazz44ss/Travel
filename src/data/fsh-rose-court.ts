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
  },
];

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
