/**
 * Official floor-plan images for each MiraCosta room type.
 *
 * Every room on the hotel's site has a detail page carrying a 910×400 plan
 * drawing under the レイアウト heading. The image is served from the resort's own
 * CDN and is referenced here rather than copied into this repository, so the
 * file is always the current official one and is delivered by its owner.
 *
 * One official page usually covers several of our room types, because the hotel
 * sells a bed layout and an occupancy under one name. `porto_superior_piazza`
 * carries three drawings — the 37 m² twin, the 37 m² double and the 40 m²
 * four-guest plan — so `layout` names which one belongs to which variant. Pages
 * whose variants share a single drawing point every variant at drawing 1.
 *
 * Image ids were read off the pages themselves; they are not derivable from the
 * slug.
 */

import type { RoomLayoutRef, RoomLayoutSet } from './hotel';

const page = (slug: string, imageId: number, layout?: number): RoomLayoutRef => ({
  slug,
  imageId,
  ...(layout ? { layout } : {}),
});

export const ROOM_LAYOUTS: Record<string, RoomLayoutRef> = {
  // トスカーナ・サイド
  'tosca-superior-twin': page('tosca_capitano_superior', 775, 1),
  'tosca-superior-double': page('tosca_capitano_superior', 775, 2),
  'tosca-superior-aqua': page('tosca_capitano_superior_as', 1808),
  'tosca-superior-open': page('tosca_capitano_superior_open', 777),
  'tosca-triple': page('tosca_capitano_triple', 779),
  'tosca-triple-aqua': page('tosca_capitano_triple_as', 1813),

  // ヴェネツィア・サイド
  'venez-superior-twin': page('venez_superior', 781, 1),
  'venez-superior-double': page('venez_superior', 781, 2),
  'venez-superior-canal': page('venez_superior_pc', 1818),
  'venez-triple': page('venez_triple', 783),
  'venez-triple-canal': page('venez_triple_pc', 1823),
  'venez-patio': page('venez_patio', 785),
  'venez-balcony': page('venez_balcony', 2298),

  // ポルト・パラディーゾ・サイド
  'porto-superior-partial': page('porto_superior_partial', 787),
  'porto-superior-piazza-twin': page('porto_superior_piazza', 789, 1),
  'porto-superior-piazza-double': page('porto_superior_piazza', 789, 2),
  'porto-superior-piazza-quad': page('porto_superior_piazza', 789, 3),
  'porto-superior-piazza-accessible': page('porto_superior_piazza_access', 791),
  'porto-superior-piazza-grand-twin': page('porto_superior_grand', 793, 1),
  'porto-superior-piazza-grand-quad': page('porto_superior_grand', 793, 2),
  'porto-superior-harbour-twin': page('porto_superior_harbor', 795, 1),
  'porto-superior-harbour-quad': page('porto_superior_harbor', 795, 2),
  'porto-triple-piazza': page('porto_triple', 797),

  // スペチアーレ・ルーム＆スイート
  'spec-venez-terrace': page('suite_venez_terrace', 799),
  'spec-superior-harbour-triple': page('suite_porto_superior', 801, 1),
  'spec-superior-harbour-quad': page('suite_porto_superior', 801, 2),
  'spec-balcony-piazza': page('suite_porto_balcony_piazza', 803),
  'spec-balcony-harbour-triple': page('suite_porto_balcony_harbor', 805),
  'spec-balcony-harbour-quad': page('suite_porto_balcony_harbor', 805),
  'spec-terrace-piazza': page('suite_porto_terrace_piazza', 807),
  'spec-terrace-harbour': page('suite_porto_terrace_harbor', 809),
  'spec-terrace-harbour-grand': page('suite_porto_terrace_grand', 811),
  'spec-harbour-room-piazza': page('suite_porto_harbor_piazza', 813),
  'spec-harbour-room-harbour': page('suite_porto_harbor_harbor', 815),
  'spec-porto-suite': page('suite_porto_porto', 817),
  'spec-miracosta-suite': page('suite_porto_miracosta', 819),
  'spec-ilmagnifico-suite': page('suite_porto_ilmagnifico', 821),
};

export const LAYOUTS: RoomLayoutSet = {
  refs: ROOM_LAYOUTS,
  imageUrl: (ref) =>
    `https://media1.tokyodisneyresort.jp/images/adventure/dh_room/${ref.imageId}_layout_image_${ref.layout ?? 1}.jpg`,
  pageUrl: (ref) => `https://www.tokyodisneyresort.jp/tc/hotel/dhm/room/detail/${ref.slug}/`,
  /** Native size of every plan image, used to reserve space before it loads. */
  imageSize: { width: 910, height: 400 },
};
