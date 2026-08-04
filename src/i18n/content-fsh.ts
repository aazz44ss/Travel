import type { HotelContent } from './content';

/** Tokyo DisneySea Fantasy Springs Hotel: our own prose, in Japanese and English. */
export const FSH_CONTENT: HotelContent = {
  verdicts: {
    'springs-balcony-alcove-grand': {
      ja: 'バルコニーだけの区分と同額で、アルコーヴベッドが 1 台多い。5 人が 1 室に入るなら、これがファンタジーシャトーの答えです。',
      en: 'The same price as the balcony-only category, with one more alcove bed. If five of you have to fit in one room, this is the Fantasy Chateau’s answer.',
    },
    'springs-balcony-grand': {
      ja: 'パークが正面に見えて、そのうえバルコニーも付く。ファンタジーシャトーの価格の上限です。外に出てパークを見られるのは、この区分とバルコニー＆アルコーヴの区分だけ。',
      en: 'The park head-on with a balcony as well, and the price ceiling of the Fantasy Chateau. This and the Balcony & Alcove version are the only rooms you can step outside to look at the park from.',
    },
    'springs-alcove-grand': {
      ja: 'パークグランドビューでもっとも安い区分で、バルコニー付きより 10,000 円安い。見えるものは同じで、外に出られないだけです。',
      en: 'The cheapest Park Grand View category, ¥10,000 below the ones with a balcony. You see the same thing; you just cannot step outside.',
    },
    'springs-alcove-partial': {
      ja: '客室の仕様はパークグランドビューとまったく同じで 12,000 円安い。代償は、視界の一部が建物に遮られると公式がはっきり書いていることです。',
      en: 'The room is identical to a Park Grand View one and ¥12,000 cheaper; the price is that the hotel tells you outright part of the view will be blocked by buildings.',
    },
    'springs-access-partial': {
      ja: 'スプリングスサイドでもっとも安い区分で、しかも 50 m²。定員は 3 名です。',
      en: 'The cheapest category on the Springs Side, and still 50 m². Three guests maximum.',
    },
    'rose-deluxe-access-park': {
      ja: '2026 年 10 月に新設された区分で、眺望なしの同型より 2,500 円しか高くありません——ローズコートサイドのほかのパークビューの差額は 10,000 円です。',
      en: 'A category added in October 2026, only ¥2,500 above the same room without a view — every other Park View on the Rose Court Side costs ¥10,000 more.',
    },
    'rose-superior-park': {
      ja: 'この区分は 4 室だけで、すべて同じ縦一列の 6〜9 階です。アルコーヴベッドではなくソファが欲しいなら、選べるのはここだけ。',
      en: 'Only four rooms in this category, all in one vertical line on floors 6 to 9. If you want the sofa rather than an alcove bed, this is the only slot.',
    },
    'rose-alcove-park': {
      ja: 'パークビューのスーペリアルームと同額で客室数は 5 倍あり、パークビューの既定の選択肢です。同じ区分でも、部屋番号が左に寄るほどパークが多く見えます。',
      en: 'The same price as the Park View Superior Room with five times as many rooms, which makes it the default Park View choice. Within the category, the further left the room number, the more of the park you see.',
    },
    'rose-deluxe': {
      ja: 'パークビューと同額ですが、買っているのは窓の外ではなく 7 m² です。中庭側でもっとも後悔しやすい区分。',
      en: 'The same price as Park View, but what you buy is 7 m², not the window. The easiest category on the courtyard side to regret.',
    },
    'rose-deluxe-access': {
      ja: '48 m² のアクセシブルルームで、同じサイドのデラックスルームと同額です。',
      en: 'A 48 m² accessible room, at the same price as the Deluxe Room on the same side.',
    },
    'rose-superior-high': {
      ja: '3〜4 階より 2,500 円高く、買えるのは「窓の外が木ではない」ことです。中庭側でもっとも現実的な区分。',
      en: '¥2,500 above floors 3 to 4, and what that buys is "the window will not be a tree." The most pragmatic category on the courtyard side.',
    },
    'rose-alcove-high': {
      ja: 'ローズコートサイドで客室数が最多の区分で、階の範囲もスーペリアルームより 2 層広い。アレンデール城が斜めに見える面に当たる可能性があります。',
      en: 'The largest category on the Rose Court Side, and its floor band runs two floors beyond the Superior Room’s. You may be assigned the face that sees Arendelle Castle at an angle.',
    },
    'rose-superior-low': {
      ja: '価格はベイエリアサイド、ホテルエントランスサイドと同じ水準まで下げられています。窓の外は中庭の植栽ですが、それを予約前から知っています。',
      en: 'Priced down into the same band as the Bay Area Side and the Hotel Entrance Side. The window looks at the courtyard planting, but you know that before you book.',
    },
    'rose-alcove-low': {
      ja: '3〜4 階のスーペリアルームと同額で、アルコーヴベッドが 1 台多い。このホテルの最安に並ぶ 1 つです。',
      en: 'The same price as the 3rd-to-4th-floor Superior Room, with one more alcove bed. Tied for the cheapest room in the hotel.',
    },
    'bay-deluxe': {
      ja: '同じサイドのスーペリアルームより 7 m² 広く、10,000 円高い。窓の外はまったく同じです。',
      en: '7 m² more than the Superior Room on the same side, and ¥10,000 more. The window is exactly the same.',
    },
    'bay-deluxe-access': {
      ja: '48 m² のアクセシブルルーム。ローズコートサイドとスプリングスサイドにも、比べられるアクセシブルルームがそれぞれあります。',
      en: 'A 48 m² accessible room. The Rose Court Side and the Springs Side each have one to compare it against.',
    },
    'bay-superior': {
      ja: 'ホテルエントランスサイド、ローズコートサイドの 3〜4 階と並ぶ最低価格。買うのは立地と専用入口で、窓の外ではありません。',
      en: 'Tied at the lowest price with the Hotel Entrance Side and the Rose Court Side’s floors 3 to 4. What you buy is the location and the private entrance, not the window.',
    },
    'bay-alcove': {
      ja: '公式はこれをファンタジーシャトーでもっとも数が多い客室としています。同額でアルコーヴベッドが 1 台多いので、子ども連れがスーペリアルームを選ぶ理由はありません。',
      en: 'The hotel calls this the most numerous room in the Fantasy Chateau. An alcove bed at the same price, so with children there is no reason to take the plain Superior Room.',
    },
    'entrance-deluxe': {
      ja: 'ベイエリアサイドのデラックスルームと同額・同面積です。',
      en: 'The same price and the same area as the Bay Area Side Deluxe Room.',
    },
    'entrance-superior': {
      ja: 'ベイエリアサイド、ローズコートサイドの 3〜4 階と並んで最安の 3 サイドの 1 つ。窓の外はホテル正面側です。',
      en: 'One of the three sides tied at the lowest price, with the Bay Area Side and the Rose Court Side’s 3rd and 4th floors. The window faces the hotel’s main entrance.',
    },
    'entrance-alcove': {
      ja: '同額でアルコーヴベッドが 1 台多く、ベイエリアサイドの同型と完全に対称です。',
      en: 'An alcove bed at the same price, exactly mirroring the Bay Area Side equivalent.',
    },
    'gc-grand-terrace': {
      ja: '100 m² で、8 階だけ。グランドシャトーの客室表の最後の区分です。',
      en: '100 m², and only on the 8th floor. The last category on the Grand Chateau’s room list.',
    },
    'gc-grand-high': {
      ja: '5〜6 階の区分と同じ客室で、最上階にあります。',
      en: 'The same room as the 5th-to-6th-floor category, on the top floor.',
    },
    'gc-grand-mid': {
      ja: '100 m² で、ファンタジーシャトーで最大の客室の 2 倍です。公式の客室ページには追加ベッドの構成が載っていません。',
      en: '100 m², twice the largest room in the Fantasy Chateau. The official room page lists no extra-bed layout.',
    },
    'gc-cove-high': {
      ja: 'グランドシャトーのアルコーヴルームでもっとも高い階の版で、バルコニーにテーブルと椅子があります。',
      en: 'The highest-floor version of the Grand Chateau’s Alcove Room, and the balcony has a table and chairs.',
    },
    'gc-cove-mid': {
      ja: '4、5、7 階の区分と階がほぼ重なり、違いはバルコニーのテーブルと椅子です。公式の 2 枚の平面図も、その違いを実際に描き分けています。',
      en: 'Its floors almost entirely overlap the 4th, 5th and 7th floor version; the difference is the table and chairs on the balcony. The hotel’s two floor plans really do draw that difference.',
    },
    'gc-cove-plain': {
      ja: 'バルコニーにテーブルと椅子がありません。バルコニーに座ってパークを見たいなら、これが避けるべき区分です。',
      en: 'No table or chairs on the balcony. If you mean to sit out there and look at the park, this is the one to avoid.',
    },
    'gc-terrace': {
      ja: '70 m² で、アルコーヴベッドはなく、追加ベッドはトランドルベッドとクルーズベッドです。',
      en: '70 m², no alcove bed, and the extra beds are a trundle and a cruise bed.',
    },
    'gc-terrace-cove-b': {
      ja: '公式が同じ客室を 2 つの階の組み合わせに分けていて、階以外の違いは公表されていません。',
      en: 'The hotel splits one room into two floor combinations and publishes no difference beyond the floors.',
    },
    'gc-terrace-cove-a': {
      ja: '3〜4 階の区分とあわせて同じページに並ぶ 2 つの区分で、平面図は 1 枚を共有しています。',
      en: 'One of two categories on the same page as the 3rd-to-4th-floor version, sharing a single floor plan.',
    },
    'gc-terrace-access': {
      ja: 'グランドシャトー唯一のアクセシブルルームで、3 階だけです。',
      en: 'The Grand Chateau’s only accessible room, and only on the 3rd floor.',
    },
  },

  notes: {
    'rose-deluxe-access-park': {
      ja: '公式はこの 1 室が何階かを公表していません。配置図では、この面のアクセシブルルームは 5 階と 8 階の 2 室だけです。',
      en: 'The hotel does not publish which floor this one is on. The position map shows only two accessible rooms on this side, on the 5th floor and the 8th.',
    },
    'rose-superior-low': {
      ja: '公式が客室名の脇に注記しています。「草木によって視界が遮られています。」',
      en: 'The hotel prints a note beside the room name: "The view from this room is obstructed by trees and plants."',
    },
    'rose-alcove-low': {
      ja: '公式が客室名の脇に注記しています。「草木によって視界が遮られています。」',
      en: 'The hotel prints a note beside the room name: "The view from this room is obstructed by trees and plants."',
    },
    'gc-cove-high': {
      ja: '公式の注記は「バルコニーにテーブルと椅子があります」。',
      en: 'The hotel notes: "The balcony has a table and chairs."',
    },
    'gc-cove-mid': {
      ja: '公式の注記は「バルコニーにテーブルと椅子があります」。',
      en: 'The hotel notes: "The balcony has a table and chairs."',
    },
    'gc-cove-plain': {
      ja: '公式の注記は「バルコニーにテーブルと椅子はありません」。',
      en: 'The hotel notes: "The balcony has no table or chairs."',
    },
  },

  /**
   * The Japanese and English versions of this hotel's page drop the facility,
   * dining, benefit and FAQ lists rather than show them untranslated, since the
   * guides in those languages cover the same ground in prose. The dataset has no
   * social insights at all. Nothing is keyed here for any of the five.
   */
  facilities: {},
  dining: {},
  benefits: [],
  faqs: [],
  social: [],

  bedNotes: {
    標準床: {
      ja: '幅 120 cm はシングルより広いものの、ダブルにはまだ遠い。大人 2 人が並んで寝ると窮屈です。',
      en: 'At 120 cm wide it is wider than a single and still a long way from a double. Two adults side by side is cramped.',
    },
    '標準床（無障礙客房）': {
      ja: '床面の高さは 47 cm で、通常のレギュラーサイズより 9 cm 低く、車椅子からの横移動がしやすくなっています。',
      en: 'The mattress sits at 47 cm, 9 cm lower than a regular bed, to make a sideways transfer from a wheelchair easier.',
    },
    推拉床: {
      ja: '普段はレギュラーサイズの下に収まり、使うときに引き出します。床面は 27 cm しかなく、子ども向きです。',
      en: 'Stows under a regular bed and pulls out when needed. The mattress is only 27 cm off the floor, which suits children.',
    },
    凹室床: {
      ja: '壁のくぼみに造り付けられた固定ベッドで、長さはレギュラーサイズとほぼ同じ。子どもには人気ですが、体格の大きい大人には圧迫感があります。',
      en: 'A fixed bed built into a recess in the wall, about the same length as a regular bed. Children love it; a large adult will find it confining.',
    },
    郵輪床: {
      ja: '長さが 188 cm しかなく、身長 180 cm 前後から上の人には短く感じます。',
      en: 'At only 188 cm long, it sleeps short for anyone near or above 180 cm.',
    },
    嬰兒床: { ja: '事前予約が必要です。', en: 'Requires advance booking.' },
  },

  labels: {
    住客限定: { ja: '宿泊者限定', en: 'Guests only' },
  },
};
