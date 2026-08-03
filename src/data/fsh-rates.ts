/**
 * Rates and availability for the Tokyo DisneySea Fantasy Springs Hotel.
 *
 * Two separate things, from two separate sources, both dated.
 *
 * RATES are a single day's full price list for the Fantasy Chateau, recorded on
 * the morning bookings opened for that date. Disney hotel rooms go on sale four
 * months ahead, and this hotel sells out within days, so the day a date opens is
 * the only moment its whole price list is visible at once. The figures come from
 * a survey published on the fukufukusatoka blog on 2026-06-05 covering stays on
 * 2026-10-01, the day the current rates took effect. They are secondary, not
 * official; the official site publishes only a cheapest-per-day calendar.
 *
 * The list has no weekday dimension beyond what WEEKEND records, and no rate for
 * the Grand Chateau — the official site publishes none either, and the survey
 * only established that wing's day-of-week pattern. Nothing here is estimated to
 * fill a gap.
 *
 * AVAILABILITY is read off the official rate calendar instead, which shows a
 * price only on dates that still have a room. It is a snapshot, and the point of
 * keeping it is the shape rather than the individual dates.
 */

export const RATE_SOURCE = {
  label: 'fukufukusatoka「FSホテルも10/1から値上げ！新設の下層階カテのお値段はどうなった？」',
  url: 'https://ameblo.jp/fukufukusatoka/entry-12968176650.html',
  published: '2026-06-05',
  /** The stay date the price list applies to. */
  stayDate: '2026-10-01',
  stayDateLabel: '2026 年 10 月 1 日（週四）',
} as const;

/**
 * Yen per room per night for two bed-occupying guests, keyed by room type id.
 * `rise` is how much more than the same weekday in the second half of September,
 * as recorded in the same survey; the four floor-banded Rose Court categories
 * did not exist before that date and so have none.
 */
export const RATES: Record<string, { price: number; rise?: number }> = {
  'bay-superior': { price: 101_500, rise: 12_000 },
  'bay-alcove': { price: 101_500, rise: 12_000 },
  'bay-deluxe': { price: 111_500, rise: 12_000 },

  'entrance-superior': { price: 101_500, rise: 12_000 },
  'entrance-alcove': { price: 101_500, rise: 12_000 },
  'entrance-deluxe': { price: 111_500, rise: 12_000 },

  'rose-superior-low': { price: 101_500 },
  'rose-superior-high': { price: 104_000 },
  'rose-alcove-low': { price: 101_500 },
  'rose-alcove-high': { price: 104_000 },
  'rose-deluxe': { price: 114_000, rise: 12_000 },
  'rose-deluxe-access': { price: 114_000, rise: 12_000 },
  'rose-superior-park': { price: 114_000, rise: 10_000 },
  'rose-alcove-park': { price: 114_000, rise: 10_000 },
  'rose-deluxe-access-park': { price: 116_500 },

  'springs-access-partial': { price: 111_500, rise: 10_000 },
  'springs-alcove-partial': { price: 118_000, rise: 10_000 },
  'springs-alcove-grand': { price: 130_000, rise: 10_000 },
  'springs-balcony-grand': { price: 140_000, rise: 10_000 },
  'springs-balcony-alcove-grand': { price: 140_000, rise: 10_000 },
};

/**
 * What the same room costs on the other days of that October week, from the same
 * survey. The Fantasy Chateau charged one price from Thursday to Sunday and put
 * everything on Saturday; the Grand Chateau charged for every day away from
 * Thursday, and a great deal for Saturday.
 */
export const WEEKEND = [
  { wing: 'fcu', label: '週四・週五・週日', delta: 0 },
  { wing: 'fcu', label: '週六', delta: 15_000 },
  { wing: 'gcu', label: '週四', delta: 0 },
  { wing: 'gcu', label: '週五・週日', delta: 10_000 },
  { wing: 'gcu', label: '週六', delta: 50_000 },
] as const;

/**
 * Dates in the official rate calendar that still had a room, by month.
 * `dates` counts the days the calendar covered, not the days in the month.
 */
export const AVAILABILITY_SOURCE = {
  url: 'https://www.tokyodisneyresort.jp/tc/hotel/fsh/fcu.html',
  /** Date printed on the calendar itself, Japan time. */
  snapshot: '2026-08-04',
  snapshotLabel: '2026 年 8 月 4 日',
} as const;

export const AVAILABILITY = [
  { month: '2026 年 8 月', dates: 27, open: 11 },
  { month: '2026 年 9 月', dates: 30, open: 1 },
  { month: '2026 年 10 月', dates: 31, open: 0 },
  { month: '2026 年 11 月', dates: 30, open: 2 },
  { month: '2026 年 12 月', dates: 3, open: 0 },
] as const;

export const AVAILABILITY_TOTAL = AVAILABILITY.reduce(
  (acc, month) => ({ dates: acc.dates + month.dates, open: acc.open + month.open }),
  { dates: 0, open: 0 },
);

/**
 * How the other Disney hotels' calendars looked in the same snapshot, so the
 * figure above reads as a fact about this hotel rather than about the season.
 */
export const AVAILABILITY_PEERS = [
  { hotel: '迪士尼大使大飯店', open: 108 },
  { hotel: '東京迪士尼樂祥飯店', open: 104 },
  { hotel: '東京迪士尼樂園大飯店', open: 101 },
  { hotel: '東京迪士尼海洋觀海景大飯店', open: 24 },
  { hotel: '東京迪士尼海洋夢幻泉鄉大飯店', open: 14 },
  { hotel: '東京迪士尼度假區玩具總動員飯店', open: 12 },
] as const;

export function rateFor(id: string): number | undefined {
  return RATES[id]?.price;
}
