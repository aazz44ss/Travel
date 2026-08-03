/**
 * Shapes shared by every hotel dataset.
 *
 * One hotel is one module under `src/data/` exporting these types; the
 * components under `src/components/` take them as props and know nothing about
 * which hotel they are rendering. Adding a hotel therefore means adding data,
 * not copying UI.
 *
 * `category`, `view` and `flag` are plain strings rather than unions because
 * every hotel invents its own vocabulary — Tokyo Disneyland Hotel sells four
 * categories graded by service, MiraCosta sells three sides graded by which
 * part of the park the window faces.
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

/** A "must have" toggle in the room explorer, and the badge on matching cards. */
export interface RoomFlag {
  key: string;
  label: string;
  /** Shown as a badge on every room carrying the flag. */
  badge?: boolean;
  /** Offered as a filter. Flags worth showing but not filtering set this false. */
  filter?: boolean;
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
  /** Reference "from" rate in JPY per room per night. */
  priceFrom: number;
  floors?: string;
  /** Keys from the hotel's `FLAGS`. */
  flags: string[];
  /** Short editorial verdict shown in the explorer. */
  verdict: string;
  note?: string;
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
  platform: 'TikTok' | 'Instagram' | 'YouTube' | '部落格';
  headline: string;
  body: string;
  verdict: string;
}

export interface Faq {
  question: string;
  answer: string;
}

/** A headline number on the hotel page's "基本資料" grid. */
export interface HotelFact {
  label: string;
  value: string;
  sub: string;
}

/** [lowest, highest] rate seen in a month, in yen per room per night. */
export type MonthRange = readonly [low: number, high: number];

export type MonthlyRates = Record<string, Partial<Record<number, MonthRange>>>;

export interface RoomNumberEntry {
  /** Room numbers known to belong to this room type. */
  numbers: string[];
  /** Rooms within the type that open onto an outdoor balcony. */
  balcony: string[];
  /** False when the source could not enumerate every room in the category. */
  complete: boolean;
  note?: string;
}

export type RoomNumbers = Record<string, RoomNumberEntry>;

/** One official floor-plan drawing, referenced rather than copied. */
export interface RoomLayoutRef {
  /** Slug of the official room detail page. */
  slug: string;
  /** Numeric id the resort's CDN uses for this page's assets. */
  imageId: number;
  /** Which plan image on the page, for pages that carry more than one. */
  layout?: number;
}

/** Everything the layout figure needs to build its own URLs. */
export interface RoomLayoutSet {
  refs: Record<string, RoomLayoutRef>;
  imageUrl: (ref: RoomLayoutRef) => string;
  pageUrl: (ref: RoomLayoutRef) => string;
  imageSize: { readonly width: number; readonly height: number };
}

export function formatYen(value: number): string {
  return `¥${value.toLocaleString('en-US')}`;
}

export function toTwd(yen: number, jpyPerTwd: number): number {
  return Math.round(yen / jpyPerTwd / 100) * 100;
}

/** Cheapest and dearest date across every month a room type has a rate for. */
export function annualRangeOf(
  rates: MonthlyRates,
  roomId: string,
): MonthRange | undefined {
  const months = rates[roomId];
  if (!months) return undefined;
  const values = Object.values(months).filter((v): v is MonthRange => Boolean(v));
  if (values.length === 0) return undefined;
  return [Math.min(...values.map((v) => v[0])), Math.max(...values.map((v) => v[1]))];
}
