import type { Locale } from './config';
import type { HotelKey } from './hotel';
import type { Benefit, BedSpec, Dining, Facility, Faq, Room, SocialInsight } from '~/data/hotel';
import { TDH_CONTENT } from './content-tdh';
import { DHM_CONTENT } from './content-dhm';
import { FSH_CONTENT } from './content-fsh';

/**
 * The prose in each hotel dataset that is ours rather than the hotel's: the
 * editorial line on a room, the positional note, the photo tip, the FAQ answer.
 *
 * Names live in `rooms.ts` because the hotel publishes them and we quote them.
 * These are written per language instead, keyed by whatever identifier is stable
 * in the dataset — a room id, a venue's English name, or the item's index — so
 * adding an entry to a dataset surfaces as a missing translation rather than
 * silently swapping languages.
 */

export type Pair = { ja: string; en: string };

export interface HotelContent {
  /** Keyed by room id. */
  verdicts: Record<string, Pair>;
  notes: Record<string, Pair>;
  /** Keyed by `nameEn`. */
  facilities: Record<string, { name: Pair; location: Pair; description: Pair; photoTip?: Pair }>;
  dining: Record<
    string,
    { name: Pair; type: Pair; hours: Pair[]; seats?: Pair; description: Pair; reservation?: Pair }
  >;
  /** In dataset order. */
  benefits: { title: Pair; description: Pair; caveat?: Pair }[];
  faqs: { question: Pair; answer: Pair }[];
  social: { headline: Pair; body: Pair; verdict: Pair }[];
  /** Keyed by the bed's Chinese name. */
  bedNotes: Record<string, Pair>;
  /** Keyed by the flag or amenity label, for short strings inside components. */
  labels: Record<string, Pair>;
}

const CONTENT: Record<HotelKey, HotelContent> = {
  tdh: TDH_CONTENT,
  dhm: DHM_CONTENT,
  fsh: FSH_CONTENT,
};

const pick = (pair: Pair | undefined, zh: string, locale: Locale): string =>
  locale === 'zh-hant' ? zh : (pair?.[locale] ?? zh);

/**
 * Localises one hotel's dataset. The page hands the result to the presentation
 * components, which stay unaware of language beyond their own labels.
 */
export function localizeHotelContent(hotel: HotelKey, locale: Locale) {
  const c = CONTENT[hotel];

  return {
    rooms: (rooms: Room[]): Room[] =>
      locale === 'zh-hant'
        ? rooms
        : rooms.map((room) => ({
            ...room,
            verdict: pick(c.verdicts[room.id], room.verdict, locale),
            note: room.note ? c.notes[room.id]?.[locale] : undefined,
          })),

    facilities: (facilities: Facility[]): Facility[] =>
      locale === 'zh-hant'
        ? facilities
        : facilities.map((facility) => {
            const t = c.facilities[facility.nameEn];
            return {
              ...facility,
              name: pick(t?.name, facility.name, locale),
              location: pick(t?.location, facility.location, locale),
              description: pick(t?.description, facility.description, locale),
              photoTip: facility.photoTip ? t?.photoTip?.[locale] : undefined,
            };
          }),

    dining: (dining: Dining[]): Dining[] =>
      locale === 'zh-hant'
        ? dining
        : dining.map((venue) => {
            const t = c.dining[venue.nameEn];
            return {
              ...venue,
              name: pick(t?.name, venue.name, locale),
              type: pick(t?.type, venue.type, locale),
              hours: venue.hours.map((slot, i) => pick(t?.hours[i], slot, locale)),
              seats: venue.seats ? pick(t?.seats, venue.seats, locale) : undefined,
              description: pick(t?.description, venue.description, locale),
              reservation: venue.reservation
                ? pick(t?.reservation, venue.reservation, locale)
                : undefined,
            };
          }),

    benefits: (benefits: Benefit[]): Benefit[] =>
      locale === 'zh-hant'
        ? benefits
        : benefits.map((benefit, i) => ({
            ...benefit,
            title: pick(c.benefits[i]?.title, benefit.title, locale),
            description: pick(c.benefits[i]?.description, benefit.description, locale),
            caveat: benefit.caveat ? c.benefits[i]?.caveat?.[locale] : undefined,
          })),

    faqs: (faqs: Faq[]): Faq[] =>
      locale === 'zh-hant'
        ? faqs
        : faqs.map((faq, i) => ({
            question: pick(c.faqs[i]?.question, faq.question, locale),
            answer: pick(c.faqs[i]?.answer, faq.answer, locale),
          })),

    social: (insights: SocialInsight[]): SocialInsight[] =>
      locale === 'zh-hant'
        ? insights
        : insights.map((item, i) => ({
            ...item,
            headline: pick(c.social[i]?.headline, item.headline, locale),
            body: pick(c.social[i]?.body, item.body, locale),
            verdict: pick(c.social[i]?.verdict, item.verdict, locale),
          })),

    beds: (beds: BedSpec[]): BedSpec[] =>
      locale === 'zh-hant'
        ? beds
        : beds.map((bed) => ({
            ...bed,
            note: bed.note ? pick(c.bedNotes[bed.name], bed.note, locale) : undefined,
          })),

    label: (zh: string): string => pick(c.labels[zh], zh, locale),
  };
}
