/**
 * Aerial photography under the room plan, instead of shapes drawn by hand.
 *
 * Tiles come from the Geospatial Information Authority of Japan's seamless photo
 * layer (地理院タイル, seamlessphoto), which is published for reuse with a credit
 * and needs no key. Google's imagery is not an option: deriving or embedding it
 * this way is outside their terms, and there is no key here either.
 *
 * The grid is standard Web Mercator at zoom 18, so one pixel is 0.485 m at this
 * latitude. Coordinates below are absolute pixels in that grid; the plan's own
 * metre frame is centred on the hotel at 35.626816, 139.888051.
 */

export const PHOTO = {
  zoom: 18,
  /** Metres per pixel at the hotel's latitude. */
  metresPerPixel: 0.485392,
  /** Pixel coordinates of the metre frame's origin. */
  originX: 59631454.79,
  originY: 26438479.54,
  /** The window drawn, in metres about that origin. */
  window: { x0: -330.0, y0: -170.0, x1: 150.0, y1: 190.0 },
  tiles: { x0: 232932, y0: 103273, x1: 232936, y1: 103276 },
  size: 256,
  url: (x: number, y: number, z: number) =>
    `https://cyberjapandata.to.gsi.go.jp/xyz/seamlessphoto/${z}/${x}/${y}.jpg`,
  credit: '国土地理院（地理院タイル・シームレス写真）',
  creditUrl: 'https://maps.gsi.go.jp/development/ichiran.html',
} as const;
