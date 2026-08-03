/**
 * Official floor-plan drawings for each room type, hotlinked from the resort CDN
 * rather than copied here, so the drawing is always the current official one.
 *
 * One official page usually covers several of our types, because the floor bands
 * a room is sold in do not change its plan. The Grand Chateau's Alcove Room page
 * is the exception worth knowing about: it carries two drawings, and they differ
 * only in the balcony — one has a table and chairs on it and one is bare, which
 * is exactly the distinction the page's own footnotes draw between its variants.
 * The `layout` number below records which drawing belongs to which variant.
 *
 * Image ids are not derivable from the slug, so both are recorded.
 */

export interface RoomLayoutRef {
  /** Wing segment of the official URL. */
  wing: 'fcu' | 'gcu';
  /** Slug of the official room detail page. */
  slug: string;
  /** Numeric id the CDN uses for this page's assets. */
  imageId: number;
  /** Which drawing on the page, for the one page with two. */
  layout?: number;
  /** Most drawings are PNG; the newest room type's is JPEG. */
  ext?: 'png' | 'jpg';
}

const page = (
  wing: 'fcu' | 'gcu',
  slug: string,
  imageId: number,
  extra: Partial<RoomLayoutRef> = {},
): RoomLayoutRef => ({ wing, slug, imageId, ...extra });

export const ROOM_LAYOUTS: Record<string, RoomLayoutRef> = {
  // Fantasy Chateau — Bay Area Side
  'bay-superior': page('fcu', 'bayarea_superior', 1898),
  'bay-alcove': page('fcu', 'bayarea_superior_cove', 1903),
  'bay-deluxe': page('fcu', 'bayarea_deluxe', 1908),
  'bay-deluxe-access': page('fcu', 'bayarea_deluxe_access', 1913),

  // Fantasy Chateau — Hotel Entrance Side
  'entrance-superior': page('fcu', 'entrance_superior', 1918),
  'entrance-alcove': page('fcu', 'entrance_superior_cove', 1923),
  'entrance-deluxe': page('fcu', 'entrance_deluxe', 1928),

  // Fantasy Chateau — Rose Court Side
  'rose-superior-low': page('fcu', 'rose_superior', 1933),
  'rose-superior-high': page('fcu', 'rose_superior', 1933),
  'rose-alcove-low': page('fcu', 'rose_superior_cove', 1938),
  'rose-alcove-high': page('fcu', 'rose_superior_cove', 1938),
  'rose-deluxe': page('fcu', 'rose_deluxe', 1943),
  'rose-deluxe-access': page('fcu', 'rose_deluxe_access', 1948),
  'rose-superior-park': page('fcu', 'rose_superior_park', 1953),
  'rose-alcove-park': page('fcu', 'rose_superior_cove_park', 1958),
  'rose-deluxe-access-park': page('fcu', 'rose_deluxe_access_park', 2668, { ext: 'jpg' }),

  // Fantasy Chateau — Springs Side
  'springs-alcove-partial': page('fcu', 'springs_cove_partial', 1963),
  'springs-access-partial': page('fcu', 'springs_access', 1973),
  'springs-alcove-grand': page('fcu', 'springs_cove_grand', 1968),
  'springs-balcony-grand': page('fcu', 'springs_balcony', 1978),
  'springs-balcony-alcove-grand': page('fcu', 'springs_balcony_cove', 1983),

  // Grand Chateau
  'gc-cove-plain': page('gcu', 'cove', 1868, { layout: 2 }),
  'gc-cove-mid': page('gcu', 'cove', 1868, { layout: 1 }),
  'gc-cove-high': page('gcu', 'cove', 1868, { layout: 1 }),
  'gc-terrace-cove-a': page('gcu', 'terrace_cove', 1873),
  'gc-terrace-cove-b': page('gcu', 'terrace_cove', 1873),
  'gc-terrace': page('gcu', 'terrace', 1878),
  'gc-terrace-access': page('gcu', 'terrace_access', 1883),
  'gc-grand-mid': page('gcu', 'grand', 1888),
  'gc-grand-high': page('gcu', 'grand', 1888),
  'gc-grand-terrace': page('gcu', 'grand_terrace', 1893),
};

export const layoutImageUrl = (ref: RoomLayoutRef): string =>
  `https://media1.tokyodisneyresort.jp/images/adventure/dh_room/${ref.imageId}_layout_image_${ref.layout ?? 1}.${ref.ext ?? 'png'}`;

export const layoutPageUrl = (ref: RoomLayoutRef): string =>
  `https://www.tokyodisneyresort.jp/tc/hotel/fsh/${ref.wing}/room/detail/${ref.slug}/`;

/** Native size of every drawing, used to reserve space before it loads. */
export const LAYOUT_IMAGE_SIZE = { width: 910, height: 400 } as const;

/** True when the official page this drawing came from covers several of our types. */
export function layoutIsShared(id: string): boolean {
  const ref = ROOM_LAYOUTS[id];
  if (!ref) return false;
  return (
    Object.values(ROOM_LAYOUTS).filter(
      (other) =>
        other.slug === ref.slug &&
        other.wing === ref.wing &&
        (other.layout ?? 1) === (ref.layout ?? 1),
    ).length > 1
  );
}
