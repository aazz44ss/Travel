/**
 * Every hotel the site covers, in one list.
 *
 * The home page and the database index both need to enumerate hotels, and both
 * used to hold their own array. That is a list you have to remember to update,
 * and the third hotel was duly forgotten on both. Enumerating from here instead
 * means adding a hotel to the site is adding it to this file.
 *
 * Order is newest first, which is the order the index cards are written for.
 */

import type { HotelKey } from '~/i18n/hotel';
import type { Room, RoomCategory } from './hotel';
import {
  CATEGORIES as FSH_CATEGORIES,
  ROOMS as FSH_ROOMS,
} from './fantasy-springs-hotel';
import {
  CATEGORIES as DHM_CATEGORIES,
  ROOMS as DHM_ROOMS,
} from './tokyo-disneysea-hotel-miracosta';
import { CATEGORIES as TDH_CATEGORIES, ROOMS as TDH_ROOMS } from './tokyo-disneyland-hotel';

export interface HotelEntry {
  key: HotelKey;
  /** Path segment under /hotels/ and /articles/. */
  slug: string;
  rooms: Room[];
  categories: RoomCategory[];
  /** Tailwind gradient for the card header, keyed to the hotel's own palette. */
  gradient: string;
}

export const HOTELS: HotelEntry[] = [
  {
    key: 'fsh',
    slug: 'fantasy-springs-hotel',
    rooms: FSH_ROOMS,
    categories: FSH_CATEGORIES,
    gradient: 'from-berry via-[#5a3a63] to-brand-deep',
  },
  {
    key: 'dhm',
    slug: 'tokyo-disneysea-hotel-miracosta',
    rooms: DHM_ROOMS,
    categories: DHM_CATEGORIES,
    gradient: 'from-[#4c1826] via-berry to-[#9a6840]',
  },
  {
    key: 'tdh',
    slug: 'tokyo-disneyland-hotel',
    rooms: TDH_ROOMS,
    categories: TDH_CATEGORIES,
    gradient: 'from-brand-deep to-brand',
  },
];

export const TOTAL_ROOM_TYPES = HOTELS.reduce((sum, hotel) => sum + hotel.rooms.length, 0);
