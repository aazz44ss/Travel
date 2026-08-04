/**
 * Where the hotel stands, and what its windows are pointed at.
 *
 * The article's central claim is geometric: a Park View room faces Mount
 * Prometheus, and Arendelle Castle is far enough round to the left that only the
 * end rooms catch its top. That is measurable, so it is measured here rather
 * than asserted.
 *
 * The outline is the hotel's building as traced in OpenStreetMap (way 1259623365,
 * 146 nodes), projected to metres about its own centroid — x east, y south. It was
 * checked against aerial photography on the Web Mercator grid at zoom 18 before
 * being used. Landmark positions are the centroids of their own OpenStreetMap
 * features, so bearing and distance are derived rather than estimated.
 *
 * There is no photograph under the drawing. The hotel opened in June 2024 and
 * this build cannot reach the aerial tile service the rest of the site credits,
 * so there is no way to confirm the imagery shows the finished building; an
 * outline that is known to be right is worth more than a photograph that might
 * be of a building site.
 */

export interface Landmark {
  /** Official Japanese name, which is also the key into the locale dictionary. */
  key: string;
  /** Metres east and south of the hotel's centroid. */
  x: number;
  y: number;
  /** Degrees clockwise from north, as seen from the hotel. */
  bearing: number;
  /** Metres from the hotel's centroid. */
  distance: number;
}

/** The hotel outline in metres, x east and y south of its centroid. */
export const FOOTPRINT: readonly (readonly [number, number])[] = [
  [92.2, 96.1], [88.5, 96.8], [88.9, 99.8], [80.3, 101.1], [80.2, 97.8], [64.2, 99.8],
  [63.3, 95.7], [57.7, 93.8], [44.8, 89.7], [45.7, 87.1], [14.4, 76.8], [12.3, 78.1],
  [6.7, 70.1], [3.1, 72.3], [2.7, 71.6], [-14.8, 45.2], [-28.5, 23.0], [-34.9, 13.5],
  [-32.3, 12.0], [-33.5, 9.8], [-34.7, 10.6], [-35.9, 9.0], [-35.1, 8.5], [-34.4, -5.5],
  [-33.9, -21.1], [-44.5, -32.1], [-41.6, -34.7], [-42.9, -36.1], [-64.4, -58.2], [-67.6, -58.1],
  [-93.1, -36.3], [-97.6, -41.3], [-99.9, -38.9], [-100.5, -36.0], [-96.3, -33.9], [-101.5, -15.6],
  [-108.3, -18.1], [-109.4, -14.7], [-117.3, -16.7], [-116.5, -19.5], [-123.1, -21.7], [-115.6, -43.6],
  [-91.2, -66.7], [-92.6, -68.3], [-78.0, -81.7], [-79.3, -83.2], [-80.1, -84.1], [-76.2, -87.7],
  [-70.9, -92.5], [-70.0, -91.7], [-68.9, -90.6], [-32.0, -125.9], [-30.2, -123.9], [-24.9, -130.3],
  [-21.9, -127.3], [-20.1, -129.3], [17.2, -90.0], [18.2, -91.0], [21.9, -87.1], [20.8, -86.1],
  [30.0, -76.9], [31.4, -75.5], [27.1, -71.3], [25.2, -73.4], [17.7, -67.6], [-18.5, -106.1],
  [-47.5, -77.5], [-47.8, -74.2], [-27.2, -52.9], [-0.5, -52.4], [-0.5, -50.4], [4.6, -50.3],
  [4.2, -49.1], [4.2, -47.9], [4.7, -46.6], [5.6, -45.6], [6.6, -45.0], [7.8, -44.8],
  [7.7, -42.6], [7.2, -33.5], [7.2, -31.9], [6.9, -25.6], [3.9, -25.5], [3.5, -17.2],
  [3.2, -12.2], [3.7, -11.9], [4.9, -13.9], [6.2, -14.5], [8.2, -14.4], [9.2, -13.9],
  [8.9, -12.1], [7.5, -10.7], [7.2, -10.5], [8.2, -8.9], [9.5, -6.3], [10.4, -6.2],
  [11.5, -5.0], [12.2, -3.6], [11.0, -2.3], [9.9, -1.9], [9.0, 1.2], [7.4, 3.8],
  [7.5, 5.2], [7.1, 6.4], [5.4, 6.3], [4.1, 5.7], [3.8, 5.1], [2.2, 5.3],
  [2.1, 6.9], [2.1, 7.2], [1.9, 14.4], [1.3, 18.6], [8.0, 29.4], [11.9, 27.4],
  [12.3, 28.0], [23.2, 45.2], [23.6, 45.8], [22.5, 46.4], [20.2, 47.8], [21.4, 49.8],
  [22.6, 51.7], [25.9, 56.9], [23.3, 59.5], [23.5, 59.8], [24.0, 60.7], [24.5, 61.7],
  [31.4, 63.6], [35.6, 64.8], [48.8, 68.5], [52.8, 69.6], [58.6, 71.0], [62.3, 72.0],
  [64.7, 72.6], [62.0, 80.7], [63.1, 81.1], [63.9, 81.4], [64.7, 81.3], [71.3, 80.4],
  [71.8, 80.4], [72.5, 80.3], [79.2, 79.4], [80.5, 79.2], [84.1, 78.7], [85.4, 78.6],
  [90.8, 77.9], [92.2, 96.1],
];

/** Ordered left to right as seen from the hotel, which is how the fan reads. */
export const LANDMARKS: Landmark[] = [
  { key: 'アナとエルサのフローズンジャーニー', x: 80.7, y: -86.7, bearing: 43.0, distance: 118 },
  { key: 'アレンデール城', x: 156.4, y: -82.2, bearing: 62.3, distance: 177 },
  { key: 'ラプンツェルのランタンフェスティバル', x: 257.9, y: -14.0, bearing: 86.9, distance: 258 },
  { key: 'ピーターパンのネバーランドアドベンチャー', x: 220.7, y: 74.2, bearing: 108.6, distance: 233 },
  { key: 'プロメテウス火山', x: 719.6, y: 351.0, bearing: 116.0, distance: 801 },
];

/** The swing from the volcano to the castle, which is why one view excludes the other. */
export const FAN_DEGREES = Math.round(116.0 - 62.3);

export const SOURCE = {
  label: 'OpenStreetMap',
  url: 'https://www.openstreetmap.org/way/1259623365',
  licence: '© OpenStreetMap contributors',
} as const;
