import type { HotelNames } from './rooms';

/**
 * Tokyo DisneySea Hotel MiraCosta names in each locale.
 *
 * Room, view, side and bed names are the hotel's own, read off its Japanese and
 * English guest-room pages. The official English list prints "Tuscany Side" and
 * "Venice Side" where the Japanese prints トスカーナ・サイド and
 * ヴェネツィア・サイド, and both are kept as published rather than harmonised.
 *
 * The official list groups bed layouts and occupancies under one heading — one
 * "Superior Room (Piazza View)" covers a double, a twin and a 40 m² four-guest
 * plan — so a qualifier is appended after a separator, leaving the official part
 * of the name intact.
 */
export const DHM_NAMES: HotelNames = {
  base: {
    // トスカーナ・サイド / Tuscany Side
    'tosca-superior-double': {
      ja: 'カピターノ・ミッキー・スーペリアルーム',
      en: 'Capitano Mickey Superior Room',
    },
    'tosca-superior-twin': {
      ja: 'カピターノ・ミッキー・スーペリアルーム',
      en: 'Capitano Mickey Superior Room',
    },
    'tosca-superior-open': {
      ja: 'カピターノ・ミッキー・スーペリアルーム（オープンタイプ）',
      en: 'Capitano Mickey Superior Room (Open Type)',
    },
    'tosca-superior-aqua': {
      ja: 'カピターノ・ミッキー・スーペリアルーム（ディズニーシー・アクアスフィアビュー）',
      en: 'Capitano Mickey Superior Room (DisneySea AquaSphere View)',
    },
    'tosca-triple': {
      ja: 'カピターノ・ミッキー・トリプルルーム',
      en: 'Capitano Mickey Triple Room',
    },
    'tosca-triple-aqua': {
      ja: 'カピターノ・ミッキー・トリプルルーム（ディズニーシー・アクアスフィアビュー）',
      en: 'Capitano Mickey Triple Room (DisneySea AquaSphere View)',
    },

    // ヴェネツィア・サイド / Venice Side
    'venez-superior-double': { ja: 'スーペリアルーム', en: 'Superior Room' },
    'venez-superior-twin': { ja: 'スーペリアルーム', en: 'Superior Room' },
    'venez-superior-canal': {
      ja: 'スーペリアルーム（パラッツォ・カナルビュー）',
      en: 'Superior Room (Palazzo Canals View)',
    },
    'venez-triple': { ja: 'トリプルルーム', en: 'Triple Room' },
    'venez-triple-canal': {
      ja: 'トリプルルーム（パラッツォ・カナルビュー）',
      en: 'Triple Room (Palazzo Canals View)',
    },
    'venez-patio': { ja: 'パラッツォパティオルーム', en: 'Palazzo Patio Room' },
    'venez-balcony': { ja: 'バルコニールーム', en: 'Balcony Room' },

    // ポルト・パラディーゾ・サイド / Porto Paradiso Side
    'porto-superior-partial': {
      ja: 'スーペリアルーム（パーシャルビュー）',
      en: 'Superior Room (Partial View)',
    },
    'porto-superior-piazza-double': {
      ja: 'スーペリアルーム（ピアッツァビュー）',
      en: 'Superior Room (Piazza View)',
    },
    'porto-superior-piazza-twin': {
      ja: 'スーペリアルーム（ピアッツァビュー）',
      en: 'Superior Room (Piazza View)',
    },
    'porto-superior-piazza-quad': {
      ja: 'スーペリアルーム（ピアッツァビュー）',
      en: 'Superior Room (Piazza View)',
    },
    'porto-superior-piazza-accessible': {
      ja: 'スーペリアルーム（ピアッツァビュー）（アクセシブル）',
      en: 'Superior Room (Piazza View) (Accessible)',
    },
    'porto-superior-piazza-grand-twin': {
      ja: 'スーペリアルーム（ピアッツァグランドビュー）',
      en: 'Superior Room (Piazza Grand View)',
    },
    'porto-superior-piazza-grand-quad': {
      ja: 'スーペリアルーム（ピアッツァグランドビュー）',
      en: 'Superior Room (Piazza Grand View)',
    },
    'porto-superior-harbour-twin': {
      ja: 'スーペリアルーム（ハーバービュー）',
      en: 'Superior Room (Harbor View)',
    },
    'porto-superior-harbour-quad': {
      ja: 'スーペリアルーム（ハーバービュー）',
      en: 'Superior Room (Harbor View)',
    },
    'porto-triple-piazza': {
      ja: 'トリプルルーム（ピアッツァビュー）',
      en: 'Triple Room (Piazza View)',
    },

    // スペチアーレ・ルーム＆スイート / Speciale Rooms and Suites
    'spec-venez-terrace': { ja: 'テラスルーム', en: 'Terrace Room' },
    'spec-superior-harbour-triple': {
      ja: 'スーペリアルーム（ハーバービュー）',
      en: 'Superior Room (Harbor View)',
    },
    'spec-superior-harbour-quad': {
      ja: 'スーペリアルーム（ハーバービュー）',
      en: 'Superior Room (Harbor View)',
    },
    'spec-balcony-piazza': {
      ja: 'バルコニールーム（ピアッツァビュー）',
      en: 'Balcony Room (Piazza View)',
    },
    'spec-balcony-harbour-triple': {
      ja: 'バルコニールーム（ハーバービュー）',
      en: 'Balcony Room (Harbor View)',
    },
    'spec-balcony-harbour-quad': {
      ja: 'バルコニールーム（ハーバービュー）',
      en: 'Balcony Room (Harbor View)',
    },
    'spec-terrace-piazza': {
      ja: 'テラスルーム（ピアッツァビュー）',
      en: 'Terrace Room (Piazza View)',
    },
    'spec-terrace-harbour': {
      ja: 'テラスルーム（ハーバービュー）',
      en: 'Terrace Room (Harbor View)',
    },
    'spec-terrace-harbour-grand': {
      ja: 'テラスルーム（ハーバーグランドビュー）',
      en: 'Terrace Room (Harbor Grand View)',
    },
    'spec-harbour-room-piazza': {
      ja: 'ハーバールーム（ピアッツァビュー）',
      en: 'Harbor Room (Piazza View)',
    },
    'spec-harbour-room-harbour': {
      ja: 'ハーバールーム（ハーバービュー）',
      en: 'Harbor Room (Harbor View)',
    },
    'spec-porto-suite': {
      ja: 'ポルト・パラディーゾ・スイート',
      en: 'Porto Paradiso Suite',
    },
    'spec-miracosta-suite': { ja: 'ミラコスタ・スイート', en: 'MiraCosta Suite' },
    'spec-ilmagnifico-suite': { ja: 'イル・マニーフィコ・スイート', en: 'Il Magnifico Suite' },
  },

  qualifiers: {
    'tosca-superior-double': { ja: 'ダブルベッド 1 台', en: '1 double bed' },
    'tosca-superior-twin': { ja: 'レギュラーベッド 2 台', en: '2 regular beds' },
    'venez-superior-double': { ja: 'ダブルベッド 1 台', en: '1 double bed' },
    'venez-superior-twin': { ja: 'レギュラーベッド 2 台', en: '2 regular beds' },
    'porto-superior-piazza-double': { ja: 'ダブルベッド 1 台', en: '1 double bed' },
    'porto-superior-piazza-twin': { ja: 'レギュラーベッド 2 台', en: '2 regular beds' },
    'porto-superior-piazza-quad': { ja: '4 名', en: '4 guests' },
    'porto-superior-piazza-grand-twin': { ja: '3 名', en: '3 guests' },
    'porto-superior-piazza-grand-quad': { ja: '4 名', en: '4 guests' },
    'porto-superior-harbour-twin': { ja: '3 名', en: '3 guests' },
    'porto-superior-harbour-quad': { ja: '4 名', en: '4 guests' },
    'spec-superior-harbour-triple': { ja: '3 名', en: '3 guests' },
    'spec-superior-harbour-quad': { ja: '4 名', en: '4 guests' },
    'spec-balcony-harbour-triple': { ja: '3 名', en: '3 guests' },
    'spec-balcony-harbour-quad': { ja: '4 名', en: '4 guests' },
  },

  views: {
    'zh-hant': {
      'harbour-grand': '港灣全景觀',
      harbour: '港灣景觀',
      'piazza-grand': '廣場全景觀',
      piazza: '廣場景觀',
      canal: '宮殿運河景觀',
      aqua: '迪士尼海洋水之行星景觀',
      partial: '景隅景觀',
      none: '景觀未指定',
    },
    ja: {
      'harbour-grand': 'ハーバーグランドビュー',
      harbour: 'ハーバービュー',
      'piazza-grand': 'ピアッツァグランドビュー',
      piazza: 'ピアッツァビュー',
      canal: 'パラッツォ・カナルビュー',
      aqua: 'ディズニーシー・アクアスフィアビュー',
      partial: 'パーシャルビュー',
      none: '眺望指定なし',
    },
    en: {
      'harbour-grand': 'Harbor Grand View',
      harbour: 'Harbor View',
      'piazza-grand': 'Piazza Grand View',
      piazza: 'Piazza View',
      canal: 'Palazzo Canals View',
      aqua: 'DisneySea AquaSphere View',
      partial: 'Partial View',
      none: 'No view grade',
    },
  },

  viewSummary: {
    'zh-hant': {
      'harbour-grand': '從 5 樓約 30 m² 露天陽台看港灣',
      harbour: '可一覽樂園海港全景',
      'piazza-grand': '廣場、街道，外加一部分港灣',
      piazza: '看港町廣場與街道',
      canal: '看威尼斯運河、橋與貢多拉',
      aqua: '面向正門，保證看得到水之行星',
      partial: '人在園內側，但視線被牆或屋頂擋住',
      none: '房名沒有承諾窗外看得到什麼',
    },
    ja: {
      'harbour-grand': '5 階の約 30 m² のテラスから港を望む',
      harbour: '港の全景を望む',
      'piazza-grand': '広場と街並みに加えて港の一部',
      piazza: '港町の広場と街並み',
      canal: '運河沿いの街並みと橋、ゴンドラ',
      aqua: '正面エントランス側、アクアスフィアを望む',
      partial: 'パーク側だが壁や屋根にさえぎられる',
      none: '客室名が窓の外を約束していない',
    },
    en: {
      'harbour-grand': 'The harbour from about 30 m² of fifth-floor terrace',
      harbour: 'A panoramic view of the whole harbour',
      'piazza-grand': 'The piazza and streets plus part of the harbour',
      piazza: 'The piazza and streets of the harbour town',
      canal: 'The canals, bridges and gondolas',
      aqua: 'Facing the entrance, with the AquaSphere in view',
      partial: 'On the park side, but walls or roofs interrupt it',
      none: 'The room name promises nothing about the window',
    },
  },

  viewDetail: {
    'zh-hant': { 'harbour-grand': '', harbour: '', 'piazza-grand': '', piazza: '', canal: '', aqua: '', partial: '', none: '' },
    ja: {
      'harbour-grand':
        '全館で 5353 号室と 5357 号室の 2 室のみ。公式の定義は「見えるかどうか」ではなく、広々としたテラスから港の景観を楽しめること。テラスルーム専用の最上位の区分です。',
      harbour:
        '公式の定義は「ポルト・パラディーゾの港の全景」。客室から水上ショーの全体を見たいなら、客室名に最低これが必要です。ピアッツァビューでも一部が見えることはありますが、同じ約束ではありません。',
      'piazza-grand':
        '一般のピアッツァビューに港の一部が加わる区分。全景ではなく、水上ショーの全体も保証されませんが、価格と眺望の中間解になります。',
      piazza:
        '主役はミッキー広場と建物の街並みで、水面ではありません。同じ区分が 2 本の長い廊下にまたがるため窓の角度差が大きく、斜めに港が見える位置もありますが、客室名の保証ではありません。',
      canal:
        '公式にパラッツォ・カナル沿いの街並みに面することが保証されます。メディテレーニアンハーバーの水上ショーは見えませんが、閉園後はパークの街中に住んでいるような静けさがあります。',
      aqua: 'トスカーナ・サイドで唯一、眺望が明記される区分。窓の外は東京ディズニーシーのエントランスとアクアスフィアで、パーク内の港ではありません。2027 年 4 月からエントランス周辺の工事で約 1 年販売休止です。',
      partial:
        '公式の表記どおり「部分的な眺望」。港町に面しますが、建物の壁や屋根にさえぎられます。トスカーナやヴェネツィアの入門タイプと同額で、買えるのはパーク内の位置であって景色ではありません。',
      none: 'トスカーナとヴェネツィアの通常客室は、サイドは示されても窓の外は約束されません。公式も「サイドの説明は外観や雰囲気を示すもので、眺望の保証ではない」と明記しています。',
    },
    en: {
      'harbour-grand':
        'Just two rooms in the hotel, 5353 and 5357. The official definition is not simply seeing more of the harbour but taking it in from a spacious terrace, which makes this the top grade for Terrace Rooms alone.',
      harbour:
        'Officially a panoramic view of the entire harbour of Porto Paradiso. To watch a whole water show from the room, this is the minimum the name has to say; Piazza View may catch part of it, but that is not the same promise.',
      'piazza-grand':
        'The piazza and townscape with part of the harbour added. Not the full harbour and no promise of a complete water show, but the middle answer between price and view.',
      piazza:
        'The subject is Piazza Topolino and the buildings around it, not water. The grade spans two long corridors, so window angles vary widely; some positions catch the harbour off to one side, but the name does not promise it.',
      canal:
        'Officially faces the townscape along the Palazzo Canals. You cannot see the water shows on Mediterranean Harbor; what you get instead is the quiet of living on a park street after closing.',
      aqua: 'The only Tuscany Side grade with a stated view. The window faces the Tokyo DisneySea entrance and the AquaSphere rather than the harbour inside the park. Out of sale for about a year from April 2027 for construction near the entrance.',
      partial:
        'Officially a partial view: the room faces the harbour town, but the view may be obstructed by the walls and roofs of buildings. It costs the same as the entry-level Tuscany and Venice rooms, so what you buy is a position inside the park rather than a view.',
      none: 'Ordinary Tuscany and Venice rooms state a side but promise nothing about the window. The hotel says explicitly that explanations of the sides describe the exterior style and atmosphere and are not a guarantee of the views.',
    },
  },

  categories: {
    'zh-hant': {
      tuscany: '托斯卡納區',
      venice: '威尼斯區',
      porto: '海港區',
      speciale: '尊榮客房＆套房',
    },
    ja: {
      tuscany: 'トスカーナ・サイド',
      venice: 'ヴェネツィア・サイド',
      porto: 'ポルト・パラディーゾ・サイド',
      speciale: 'スペチアーレ・ルーム＆スイート',
    },
    en: {
      tuscany: 'Tuscany Side',
      venice: 'Venice Side',
      porto: 'Porto Paradiso Side',
      speciale: 'Speciale Rooms and Suites',
    },
  },

  categorySummary: {
    'zh-hant': {
      tuscany: '面向飯店正門與東京迪士尼海洋入口；全部是米奇船長航海主題。',
      venice: '面向宮殿運河或 SPA；有全館唯一的私人中庭房與非尊榮陽台房。',
      porto: '面向地中海港灣的港町；是否看得到完整水面，由景觀後綴決定。',
      speciale: '威尼斯與海港區的最高層級，含德拉米可廳貴賓室與翌日早餐。',
    },
    ja: {
      tuscany: '正面エントランスと東京ディズニーシーのエントランス側。全室がカピターノ・ミッキーの航海テーマです。',
      venice: 'パラッツォ・カナルとテルメ・ヴェネツィア側。館内唯一のパティオ付き客室と、スペチアーレではないバルコニールームがあります。',
      porto: 'メディテレーニアンハーバーの港町側。水面の全景が見えるかは、名前の最後の眺望で決まります。',
      speciale: 'ヴェネツィアとポルトにまたがる最上位グレード。サローネ・デッラミーコと翌日の朝食つき。',
    },
    en: {
      tuscany: 'Faces the hotel entrance and the Tokyo DisneySea gates; every room carries the Capitano Mickey seafaring theme.',
      venice: 'Faces the Palazzo Canals or the spa, and holds the only patio room and the only non-Speciale balcony room in the hotel.',
      porto: 'Faces the harbour town on Mediterranean Harbor; whether you see open water is decided by the view suffix.',
      speciale: 'The top grade across the Venice and Porto sides, with the Salone dell’Amico lounge and next-morning breakfast.',
    },
  },

  categoryPerks: {
    'zh-hant': {
      tuscany: ['全數最多 3 位', '37 或 43 m²', '部分可保證水之行星景觀', '價格門檻最低'],
      venice: ['運河街景', '最多 4 位', '私人中庭／陽台', '沒有港灣全景'],
      porto: ['景隅／廣場／港灣三級', '可看園內街景', '部分房型 4 位', '不含貴賓室與早餐'],
      speciale: ['專用貴賓室', '含翌日早餐', '專屬入住櫃檯', '陽台／露天陽台／套房'],
    },
    ja: {
      tuscany: ['全室 3 名まで', '37 または 43 m²', 'アクアスフィアビューあり', '価格の入口'],
      venice: ['運河沿いの街並み', '最大 4 名', 'パティオ／バルコニー', '港の全景はなし'],
      porto: ['パーシャル／ピアッツァ／ハーバー', 'パーク内の街並み', '一部は 4 名対応', 'ラウンジと朝食なし'],
      speciale: ['専用ラウンジ', '翌日の朝食つき', '専用チェックインカウンター', 'バルコニー／テラス／スイート'],
    },
    en: {
      tuscany: ['All sleep up to 3', '37 or 43 m²', 'AquaSphere View available', 'Lowest price of entry'],
      venice: ['Canal-side streets', 'Up to 4 guests', 'Patio or balcony', 'No full harbour view'],
      porto: ['Partial, Piazza or Harbor', 'Streets inside the park', 'Some sleep 4', 'No lounge or breakfast'],
      speciale: ['Private lounge', 'Next-morning breakfast', 'Dedicated check-in', 'Balcony, terrace or suite'],
    },
  },

  flags: {
    'zh-hant': {
      captain: '米奇船長主題',
      open: '開放型衛浴',
      'three-beds': '3 張標準床',
      patio: '私人中庭',
      balcony: '可走上陽台',
      terrace: '約 30 m² 露天陽台',
      lounge: '專用貴賓室',
      breakfast: '含早餐',
      accessible: '無障礙',
      suite: '套房',
    },
    ja: {
      captain: 'カピターノ・ミッキー',
      open: 'オープンタイプの水回り',
      'three-beds': 'レギュラーベッド 3 台',
      patio: '専用パティオ',
      balcony: 'バルコニー',
      terrace: '約 30 m² のテラス',
      lounge: '専用ラウンジ',
      breakfast: '朝食つき',
      accessible: 'アクセシブル',
      suite: 'スイート',
    },
    en: {
      captain: 'Capitano Mickey theme',
      open: 'Open-plan bathroom',
      'three-beds': '3 regular beds',
      patio: 'Private patio',
      balcony: 'Balcony',
      terrace: 'About 30 m² of terrace',
      lounge: 'Private lounge',
      breakfast: 'Breakfast',
      accessible: 'Accessible',
      suite: 'Suite',
    },
  },
};
