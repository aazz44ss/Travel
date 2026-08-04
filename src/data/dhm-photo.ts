/**
 * Aerial photography under the room plan, instead of shapes drawn by hand.
 *
 * Zoom 19 is the sharpest imagery available over Urayasu: 0.24 m per pixel, so a
 * 4.4 m room front is 18 image pixels wide. Esri's World Imagery serves it; the Geospatial
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
  /**
   * The window drawn, in metres about that origin. Cropped to the rooms and the
   * water in front of them: at 480 m across, a 4.4 m room front was 7 px on a
   * phone and could not carry its number. The rooms span 212 by 158 m, so 250 m
   * across leaves 21 m of Mediterranean Harbor beyond the far end of the wing and
   * makes a room front 17 px wide and 38 deep, which a four-digit number fits
   * across comfortably.
   */
  window: { x0: -160.0, y0: -70.0, x1: 90.0, y1: 120.0 },
  tiles: { x0: 465868, y0: 206549, x1: 465872, y1: 206552 },
  size: 256,
  url: (x: number, y: number, z: number) =>
    `https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`,
  credit: 'Esri, Vantor, Earthstar Geographics',
  creditUrl:
    'https://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9',
} as const;
