/**
 * Official floor-plan images for each room type.
 *
 * Every room on the hotel's site has a detail page carrying a 910×400 plan
 * drawing under the 平面圖 heading. The image is served from the resort's own
 * CDN and is referenced here rather than copied into this repository, so the
 * file is always the current official one and is delivered by its owner.
 *
 * One official page often covers several of our room types: `stnd_superior_a`
 * holds both the 40 m² twin and the 48 m² double, and its single image shows the
 * two plans side by side. The Beauty and the Beast page is the only one with two
 * images — the first covers its 51 m² variants, the second its 61 m² ones.
 *
 * Image ids were read off the pages themselves; they are not derivable from the
 * slug, so both are recorded and `layout` names which image on pages with more
 * than one.
 */

export interface RoomLayoutRef {
  /** Slug of the official room detail page, under /tc/hotel/tdh/room/detail/. */
  slug: string;
  /** Numeric id the CDN uses for this page's assets. */
  imageId: number;
  /** Which plan image on the page, for the one page that has two. */
  layout?: number;
}

const page = (slug: string, imageId: number, layout?: number): RoomLayoutRef => ({
  slug,
  imageId,
  ...(layout ? { layout } : {}),
});

export const ROOM_LAYOUTS: Record<string, RoomLayoutRef> = {
  // Standard
  'std-superior-double': page('stnd_superior_a', 2373),
  'std-superior-twin': page('stnd_superior_a', 2373),
  'std-superior-pv': page('stnd_superior_park', 2368),
  'std-superior-pgv-double': page('stnd_superior_grand', 2408),
  'std-superior-pgv-twin': page('stnd_superior_grand', 2408),
  'std-alcove': page('stnd_cove', 2378),
  'std-alcove-pv': page('stnd_cove_park', 2383),
  'std-alcove-pgv': page('stnd_cove_grand', 2423),
  'std-deluxe-twin': page('stnd_deluxe', 2388),
  'std-deluxe-double': page('stnd_deluxe', 2388),
  'std-deluxe-quad': page('stnd_deluxe', 2388),
  'std-deluxe-accessible': page('stnd_deluxe_access_a', 2393),
  'std-corner': page('stnd_corner_2', 2398),
  'std-corner-pv': page('stnd_corner_park', 2328),
  'std-junior-family': page('stnd_junior_a', 2333),
  'std-junior-family-pv': page('stnd_junior_park', 2338),
  'std-family-pv': page('stnd_family_a', 2343),

  // Character
  'char-tinkerbell-3': page('chara_tinkerbell', 2348),
  'char-tinkerbell-4': page('chara_tinkerbell', 2348),
  'char-alice': page('chara_alice_2', 2353),
  'char-alice-alcove': page('chara_alice_2', 2353),
  'char-beast-twin-51': page('chara_beauty', 2358, 1),
  'char-beast-alcove-51': page('chara_beauty', 2358, 1),
  'char-beast-twin-61': page('chara_beauty', 2358, 2),
  'char-beast-triple-61': page('chara_beauty', 2358, 2),
  'char-cinderella': page('chara_cinderella_2', 2363),

  // Concierge
  'conc-superior-pv': page('concie_superior_park', 2403),
  'conc-superior-pgv': page('concie_superior_grand', 2418),
  'conc-alcove-pgv': page('concie_cove_grand', 2413),
  'conc-deluxe-pv': page('concie_deluxe_park', 2428),
  'conc-balcony-pgv': page('concie_balcony_grand', 2433),
  'conc-balcony-alcove-pgv': page('concie_balcony_cove_grand', 2438),
  'conc-turret-twin': page('concie_turret', 2443),
  'conc-turret-double': page('concie_turret', 2443),
  'conc-cinderella': page('concie_cinderella_2', 2448),

  // Suite
  'suite-magic-kingdom-8f': page('suite_magic', 2453),
  'suite-magic-kingdom-9f': page('suite_magic', 2453),
  'suite-walt-disney': page('suite_walt', 2458),
};

export const layoutImageUrl = (ref: RoomLayoutRef): string =>
  `https://media1.tokyodisneyresort.jp/images/adventure/dh_room/${ref.imageId}_layout_image_${ref.layout ?? 1}.jpg`;

export const layoutPageUrl = (ref: RoomLayoutRef): string =>
  `https://www.tokyodisneyresort.jp/tc/hotel/tdh/room/detail/${ref.slug}/`;

/** Native size of every plan image, used to reserve space before it loads. */
export const LAYOUT_IMAGE_SIZE = { width: 910, height: 400 } as const;
