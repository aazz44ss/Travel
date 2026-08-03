/**
 * Shapes shared by every hotel dataset in `src/data/`.
 *
 * Each hotel keeps its own file with its own room list, view tiers and category
 * names, but they all describe the same kinds of thing — so the components that
 * render them take these types as props rather than importing one hotel.
 */

export interface RoomView {
  key: string;
  label: string;
  labelJa: string;
  labelEn: string;
  summary: string;
  detail: string;
}

export interface RoomCategory {
  key: string;
  label: string;
  labelEn: string;
  summary: string;
  perks: string[];
}

export interface Room {
  id: string;
  name: string;
  nameJa: string;
  category: string;
  view: string;
  /** Maximum paying adults. */
  capacity: number;
  /** Additional children aged 11 or under who may share a bed free of charge. */
  coSleepers: number;
  beds: string;
  /** Square metres, as a display string because a few types span a range. */
  size: string;
  /** Numeric size used for sorting and filtering. */
  sizeValue: number;
  /**
   * Reference "from" rate in JPY per room per night. Left undefined when no
   * source publishes a rate for the type, rather than filled with an estimate.
   */
  priceFrom?: number;
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

/** One cell of the six-up summary grid at the top of a hotel page. */
export interface HotelFact {
  label: string;
  value: string;
  sub: string;
}

export interface BedSpec {
  name: string;
  nameJa: string;
  size: string;
  capacity: string;
  note?: string;
}

export interface Facility {
  name: string;
  nameEn: string;
  location: string;
  description: string;
  guestOnly?: boolean;
  photoTip?: string;
}

export interface Dining {
  name: string;
  nameEn: string;
  type: string;
  hours: string[];
  seats?: string;
  description: string;
  reservation?: string;
}

export interface Benefit {
  title: string;
  description: string;
  caveat?: string;
}

export interface SocialInsight {
  platform: string;
  headline: string;
  body: string;
  verdict: string;
}

export interface Faq {
  question: string;
  answer: string;
}

/**
 * Yen per TWD, rounded. Used only for the rough companion figure next to every
 * yen price, so readers do not have to open a converter.
 */
export const JPY_PER_TWD = 4.7;

export function formatYen(value: number): string {
  return `¥${value.toLocaleString('en-US')}`;
}

export function toTwd(yen: number): number {
  return Math.round(yen / JPY_PER_TWD / 100) * 100;
}

export function roomsByCategory(rooms: Room[], key: string): Room[] {
  return rooms.filter((room) => room.category === key);
}

export function cheapestRoom(rooms: Room[]): Room | undefined {
  return rooms
    .filter((room) => room.priceFrom !== undefined)
    .reduce<Room | undefined>(
      (min, room) => (!min || room.priceFrom! < min.priceFrom! ? room : min),
      undefined,
    );
}

/** Priced types first and cheapest first; unpriced types keep their input order at the end. */
export function byPrice(a: Room, b: Room): number {
  if (a.priceFrom === undefined) return b.priceFrom === undefined ? 0 : 1;
  if (b.priceFrom === undefined) return -1;
  return a.priceFrom - b.priceFrom;
}
