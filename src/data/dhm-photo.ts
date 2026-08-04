/**
 * Aerial photography under the room plan, instead of shapes drawn by hand.
 *
 * Zoom 19 is the sharpest imagery available over Urayasu: 0.24 m per pixel, so a
 * 4.4 m room front is 18 px wide. Esri's World Imagery serves it; the Geospatial
 * Information Authority of Japan's seamless photo layer stops at zoom 18, half
 * this detail, and zoom 20 here answers "map data not yet available". Google's
 * tiles are not an option — taking them this way is outside their terms, and
 * there is no key here either. Nothing is upscaled or generated: at this scale
 * an invented pixel would invent a window, and the whole point of the drawing is
 * that a room's position can be trusted.
 *
 * The grid is standard Web Mercator, north up. Coordinates below are absolute
 * pixels in that grid; the plan's own metre frame is centred on the hotel at
 * 35.626816, 139.888051.
 */

export const PHOTO = {
  zoom: 19,
  /** Metres per pixel at the hotel's latitude. */
  metresPerPixel: 0.242696,
  /** Pixel coordinates of the metre frame's origin. */
  originX: 119262909.58,
  originY: 52876959.08,
  /** The window drawn, in metres about that origin. */
  window: { x0: -330.0, y0: -170.0, x1: 150.0, y1: 190.0 },
  tiles: { x0: 465865, y0: 206548, x1: 465873, y1: 206553 },
  size: 256,
  url: (x: number, y: number, z: number) =>
    `https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`,
  credit: 'Esri, Vantor, Earthstar Geographics',
  creditUrl:
    'https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9',
} as const;
