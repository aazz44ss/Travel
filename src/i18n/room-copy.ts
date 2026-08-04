import type { Locale } from './config';

/**
 * The editorial line and the positional note we carry for each room type.
 *
 * These are our own judgements rather than anything the hotel publishes, so
 * unlike the names in `rooms.ts` they are written per language rather than
 * quoted. The Chinese originals stay in the dataset; this file supplies the
 * other two.
 */

type Pair = { ja: string; en: string };

export const ROOM_VERDICTS: Record<string, Pair> = {
  'std-superior-double': {
    ja: '2 名で泊まるなら最安。しかも 48 m² で、同じ価格帯のツインより 8 m² 広い。',
    en: 'The cheapest way in for two, and at 48 m² it is 8 m² larger than the twin at the same price.',
  },
  'std-superior-twin': {
    ja: '館内でもっとも入りやすい 4 名対応。パークは見えないが、浮いた分でもう一日入園できる。',
    en: 'The lowest bar to a room for four in this hotel. No park view, but the saving covers another day’s ticket.',
  },
  'std-superior-pv': {
    ja: '眺望なしとの差は約 6,000 円でパークが見える。館内で費用対効果が最も高い一枠。',
    en: 'About ¥6,000 over no view and the park is there. The best value in the building.',
  },
  'std-superior-pgv-double': {
    ja: '2 名で正面の眺望を狙う最適解。48 m² で城に正対し、価格は 6 桁に収まる。',
    en: 'The best answer for two who want the frontal view: 48 m², facing the castle, still under six figures.',
  },
  'std-superior-pgv-twin': {
    ja: '4 名対応の正面眺望でもっとも取りやすい枠。ネット上の客室からの花火動画はほぼこれ。',
    en: 'The most obtainable frontal view that sleeps four. Almost every in-room fireworks video online is this room.',
  },
  'std-alcove': {
    ja: '壁のくぼみに収まったアルコーヴベッドは子どもの秘密基地。4 台すべて固定式で家具を動かす必要がない。',
    en: 'The alcove bed set into the wall is a child’s hideout. All four beds are fixed, so nothing needs moving.',
  },
  'std-alcove-pv': {
    ja: '子ども連れでパークも見たいなら、ほぼこのために作られた枠。',
    en: 'With children and wanting the park too, this slot is almost purpose-built for you.',
  },
  'std-alcove-pgv': {
    ja: 'スタンダードでアルコーヴベッドと正面眺望が両立する唯一のタイプ。数が少なく、発売後すぐ消える。',
    en: 'The only standard type with both an alcove bed and the frontal view. There are few of them and they go quickly.',
  },
  'std-deluxe-twin': {
    ja: 'スーペリアより 8 m² 広く、荷物を広げても歩ける。ただし眺望の選択肢がない。',
    en: '8 m² more than a Superior, enough to open the suitcases and still walk. But no view option.',
  },
  'std-deluxe-double': {
    ja: '大人 2 名＋子ども 1 名で、トランドルに詰めたくない組み合わせ向け。',
    en: 'For two adults and a child who would rather not squeeze onto a trundle.',
  },
  'std-deluxe-quad': {
    ja: '大人 4 名で少し広くしたいが、ファミリールームまで上げたくない場合の中間解。',
    en: 'The middle ground for four adults who want more space without paying up to a Family Room.',
  },
  'std-deluxe-accessible': {
    ja: '66 m² で車椅子が回れる広さなのに、料金は通常のデラックスと同じ。',
    en: '66 m² with turning space for a wheelchair, at the same rate as an ordinary Deluxe.',
  },
  'std-corner': {
    ja: '建物の角にあり二面採光。59 m² あってスタンダードの価格帯。',
    en: 'On a corner with windows on two sides. 59 m² at a standard-room price.',
  },
  'std-corner-pv': {
    ja: '寝室とリビングの間に扉があり、子どもを早く寝かせて大人が起きている家庭に効く。',
    en: 'A door between the bedroom and the living area, which matters when the children sleep early and the adults do not.',
  },
  'std-junior-family': {
    ja: 'レギュラーベッド 3 台とトランドルで最大 4 名＋子ども 3 名。三世代でも 2 室に分けなくてよい。',
    en: 'Three regular beds plus a trundle, up to four adults and three children. Three generations without splitting into two rooms.',
  },
  'std-junior-family-pv': {
    ja: 'ジュニアファミリーにパークビューが付いたもの。7 階の一部はバルコニーに出られるとの報告がある。',
    en: 'A Junior Family Room with the park view added. Guests report that some 7th-floor rooms open onto a balcony.',
  },
  'std-family-pv': {
    ja: '93 m²、水回り 2 系統、最大 5 名＋子ども 2 名。しかも必ず 5 階以上のパークビュー。',
    en: '93 m², two bathrooms, up to five adults and two children, and always a park view on the 5th floor or above.',
  },
  'char-tinkerbell-3': {
    ja: '「ピクシー・ホロウ」をテーマにした緑の客室。壁の巨大な草花で、自分が妖精の大きさになった気分になる。',
    en: 'A green room themed to Pixie Hollow, where the oversized plants on the walls make you feel fairy-sized.',
  },
  'char-tinkerbell-4': {
    ja: 'テーマルームで最安の 4 名対応。アルコーヴベッド自体がティンカーベルの尺度に合っている。',
    en: 'The cheapest themed room that sleeps four, and the alcove bed suits the Tinker Bell scale anyway.',
  },
  'char-alice': {
    ja: 'ヘッドボードにトランプの兵士とハートの女王、カーペットは迷路、テレビの上に白ウサギ。細部の密度が最も高い。',
    en: 'Card soldiers and the Queen of Hearts at the headboard, a maze in the carpet, the White Rabbit above the television. The highest density of detail.',
  },
  'char-alice-alcove': {
    ja: '同じアリスのテーマにアルコーヴベッドが加わり、4 人が 1 台ずつ使える。',
    en: 'The same Alice theme with an alcove bed added, so four people get a bed each.',
  },
  'char-beast-twin-51': {
    ja: '深紅と金の野獣の城。テーマルームで人気が最も高く、もっとも取りにくい。',
    en: 'The Beast’s castle in deep red and gold. The most popular themed room, and the hardest to get.',
  },
  'char-beast-alcove-51': {
    ja: '美女と野獣のテーマにアルコーヴベッド。約 4,500 円の追加で独立した 1 台が増えるのは得。',
    en: 'Beauty and the Beast with an alcove bed. About ¥4,500 more for a whole extra bed is good value.',
  },
  'char-beast-twin-61': {
    ja: 'テーマルームで最も広いツイン。61 m² に 3 名なら相当ゆとりがある。',
    en: 'The roomiest twin among the themed rooms. Three people in 61 m² is genuinely spacious.',
  },
  'char-beast-triple-61': {
    ja: 'レギュラーベッド 3 台で最大 4 名＋子ども 3 名。テーマルームで 7 人入る唯一のタイプ。',
    en: 'Three regular beds, up to four adults and three children — the only themed room that fits seven.',
  },
  'char-cinderella': {
    ja: '71 m² で寝室とリビングが分かれたプリンセスルーム。1 m² あたりでは館内でもっとも安いタイプの一つ。',
    en: 'A 71 m² princess room with the bedroom separate from the living area. Per square metre, one of the cheapest rooms in the hotel.',
  },
  'conc-superior-pv': {
    ja: 'コンシェルジュの入門枠。4 名分の朝食を差し引けば、スタンダードとの差は帳簿ほど大きくない。',
    en: 'The entry point to concierge. Subtract breakfast for four and the gap to a standard room is smaller than it looks.',
  },
  'conc-superior-pgv': {
    ja: '正面の眺望とラウンジ。もともと 8〜9 階に集まっており、館内でもっとも見晴らしのよい一群。',
    en: 'The frontal view plus the lounge. Concentrated on floors 8 and 9, so among the best outlooks in the hotel.',
  },
  'conc-alcove-pgv': {
    ja: 'アルコーヴなしの同格より 2,500 円安いのに 1 台多い。コンシェルジュで最も過小評価されている枠。',
    en: '¥2,500 cheaper than the same grade without the alcove, and it sleeps one more. The most underrated slot at this level.',
  },
  'conc-deluxe-pv': {
    ja: '58 m² にラウンジ付き。しかもルームサービスを頼める数少ないタイプ。',
    en: '58 m² with lounge access, and one of the few room types that can order room service.',
  },
  'conc-balcony-pgv': {
    ja: '客室名に「バルコニー」と入る 2 タイプのうちの一つ。屋外に立って花火を見たいならここしかない。',
    en: 'One of only two room types with balcony in the name. If you want to stand outside for the fireworks, it is this or the other one.',
  },
  'conc-balcony-alcove-pgv': {
    ja: 'バルコニー、アルコーヴベッド、正面眺望、ラウンジ、朝食が全部揃い、バルコニーのみのタイプより 2,500 円安い。',
    en: 'Balcony, alcove bed, frontal view, lounge and breakfast all together, and ¥2,500 below the plain balcony room.',
  },
  'conc-turret-twin': {
    ja: '円形の小塔の中にあり、窓が複数方向を向く。眺望の保証はないが形が唯一無二。',
    en: 'Inside one of the round towers with windows facing several directions. No view guarantee, but the shape is unique.',
  },
  'conc-turret-double': {
    ja: '59 m² の小塔。コンシェルジュに入るもっとも安い経路の一つ。',
    en: 'A 59 m² turret, and one of the cheapest routes into concierge.',
  },
  'conc-cinderella': {
    ja: 'プリンセスルームにラウンジとルームサービスが付いたもの。',
    en: 'The princess room with the lounge and room service added.',
  },
  'suite-magic-kingdom-8f': {
    ja: '99 m²、洗面台 2 つ、シャワーと浴槽は別。8 階の方はバルコニーに出られない。',
    en: '99 m², twin basins, shower separate from the bath. The 8th-floor one does not open onto a balcony.',
  },
  'suite-magic-kingdom-9f': {
    ja: '8 階と同じ間取りで、こちらはバルコニーに出られる。30,000 円の差はあの扉の分。',
    en: 'The same layout as the 8th floor, but this one opens onto a balcony. The ¥30,000 difference is that door.',
  },
  'suite-walt-disney': {
    ja: '館内唯一のキングベッドと 235 m²。料金は通年変わらない。',
    en: 'The hotel’s only king bed and its only 235 m². The rate does not change all year.',
  },
};

export const ROOM_NOTES: Record<string, Pair> = {
  'std-deluxe-accessible': {
    ja: 'ベッドの高さは 45 cm（通常のレギュラーサイズは 55 cm）で、浴室はアクセシブル仕様です。',
    en: 'The bed sits at 45 cm rather than the usual 55 cm, and the bathroom is built to accessible spec.',
  },
  'std-corner': {
    ja: '館内に 3215 と 3515 の 2 室のみ。この列は下から 3 階がコーナールーム、4〜7 階がタレットルーム、8〜9 階がスイートと、上がるほど等級が上がります。',
    en: 'Only two in the hotel, 3215 and 3515. Going up this column the grade rises: Corner Room on the 3rd, Turret Rooms on the 4th to 7th, suites on the 8th and 9th.',
  },
  'std-junior-family-pv': {
    ja: 'バルコニーはこのタイプの標準装備ではなく、予約時に階を指定できません。必ず付くものとして期待しないでください。',
    en: 'A balcony is not standard for this type and you cannot choose the floor when booking, so do not count on getting one.',
  },
  'conc-balcony-pgv': {
    ja: 'バルコニーが保証されるのは客室名に「バルコニー」が入るタイプだけです。通常のパークグランドビューには付きません。',
    en: 'Only room types with balcony in the name are guaranteed one. An ordinary Park Grand View room does not have one.',
  },
  'conc-turret-twin': {
    ja: '部屋番号は 3121・4121・5121・6121・7121 で、館内に 5 室、各階 1 室のみ。7 階のツインは屋外に出られるという報告がありますが、予約時に階は指定できません。',
    en: 'Rooms 3121, 4121, 5121, 6121 and 7121 — five in the hotel, one per floor. Guests report the 7th-floor twin can step outside, but you cannot request a floor.',
  },
  'conc-turret-double': {
    ja: '部屋番号の末尾は 215 と 515、つまり正面の 2 つの小塔です。同じ列の 8〜9 階はスイートなので、コンシェルジュの料金でスイートの真下に泊まることになります。',
    en: 'The numbers end 215 and 515, the two towers on the front. The 8th and 9th floors of the same column are the suites, so this is the concierge rate directly below one.',
  },
  'conc-cinderella': {
    ja: 'このコンシェルジュルームは正面エントランス側で、パーク側ではありません。',
    en: 'This concierge room faces the main entrance side, not the park.',
  },
  'suite-magic-kingdom-8f': {
    ja: '部屋番号は 8215 と 8515 で、正面両側の小塔の最上部。公式の客室一覧はスイートに眺望の区分を与えていませんが、実際には小塔から正面と側面の両方に窓があります。',
    en: 'Rooms 8215 and 8515, at the top of the two front towers. The official list gives suites no view grade, but from the tower there are windows to the front and the side.',
  },
  'suite-magic-kingdom-9f': {
    ja: '館内に 9515 の 1 室のみ、小塔の最上階。公式の客室一覧はスイートに眺望の区分を与えていません。',
    en: 'Just one, room 9515, on the top floor of the tower. The official list gives suites no view grade.',
  },
  'suite-walt-disney': {
    ja: '館内唯一の 9215 号室、もう一方の小塔の最上階。公式の客室一覧はスイートに眺望の区分を与えていません。',
    en: 'The hotel’s only room 9215, at the top of the other tower. The official list gives suites no view grade.',
  },
};

export const roomVerdict = (id: string, zh: string, locale: Locale): string =>
  locale === 'zh-hant' ? zh : (ROOM_VERDICTS[id]?.[locale] ?? zh);

export const roomNote = (id: string, zh: string | undefined, locale: Locale): string | undefined => {
  if (locale === 'zh-hant') return zh;
  return ROOM_NOTES[id]?.[locale];
};
