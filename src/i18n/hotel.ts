import type { Locale } from './config';
import type { HotelFact } from '~/data/hotel';

/**
 * Copy for the room database pages, one entry per hotel per locale.
 *
 * Names the hotel already publishes — room names, view grades, categories, bed
 * types — are taken from its own Japanese and English pages rather than
 * translated here, so a reader searching the official site finds the same words.
 * What lives here is the writing around them: headings, intros and the sentences
 * that state where a number came from.
 */

export const HOTEL_KEYS = ['tdh', 'dhm'] as const;
export type HotelKey = (typeof HOTEL_KEYS)[number];

export interface HotelCopy {
  hotelName: string;
  titleSuffix: string;
  regionLabel: string;
  typeCount: (n: number) => string;
  databaseLabel: string;
  heroIntro: (rooms: number) => string;
  pageDescription: (rooms: number, positions: number) => string;
  readArticle: string;
  sections: { id: string; label: string }[];
  headings: Record<string, string>;
  /**
   * The headline numbers on the page's "at a glance" grid. Counts are passed in
   * from the dataset rather than written here, so they cannot drift from it.
   */
  facts: (counts: { rooms: number; types: number; from: string }) => HotelFact[];
  provenance: string;
  viewsIntro: string;
  categoriesIntro: string;
  bedsIntro: string;
  bedTableCaption: string;
  /** Where the room names and room numbers in the explorer came from. */
  explorerProvenance: string;
  rateSourceLabel: string;
  /** Why the months holding the cheapest dates are not a low season. */
  bargainNote: string;
  articleTeaseHeading: string;
  articleTease: string;
}

/**
 * Section labels are written as a list per hotel per locale so the order in the
 * dictionary is the order in the page's jump nav, and adding a section to one
 * hotel cannot silently shift another's labels.
 */
const SECTIONS: Record<HotelKey, { ids: string[]; labels: Record<Locale, string[]> }> = {
  tdh: {
    ids: [
      'overview',
      'views',
      'categories',
      'floor-plan',
      'room-explorer',
      'price-seasons',
      'beds',
      'facilities',
      'dining',
      'benefits',
      'faq',
    ],
    labels: {
      'zh-hant': [
        '基本資料',
        '景觀分級',
        '四大分類',
        '客房平面圖',
        '房型探索器',
        '逐月價格',
        '床型尺寸',
        '設施與拍照點',
        '餐廳',
        '住宿禮遇',
        '常見問題',
      ],
      ja: [
        '基本情報',
        '眺望の区分',
        '4 つのカテゴリー',
        '客室配置図',
        '客室を絞り込む',
        '月別料金',
        'ベッドサイズ',
        '施設と撮影スポット',
        'レストラン',
        '宿泊特典',
        'よくある質問',
      ],
      en: [
        'At a glance',
        'View grades',
        'The four categories',
        'Floor plan',
        'Room finder',
        'Rates by month',
        'Bed sizes',
        'Facilities and photo spots',
        'Restaurants',
        'Guest benefits',
        'FAQ',
      ],
    },
  },
  dhm: {
    ids: [
      'overview',
      'categories',
      'views',
      'room-index',
      'room-explorer',
      'price-seasons',
      'beds',
      'facilities',
      'dining',
      'benefits',
      'faq',
    ],
    labels: {
      'zh-hant': [
        '基本資料',
        '三區與尊榮',
        '八種景觀',
        '海港區房號',
        '房型探索器',
        '逐月價格',
        '床型尺寸',
        '設施',
        '餐廳',
        '住宿禮遇',
        '常見問題',
      ],
      ja: [
        '基本情報',
        '3 つのサイド',
        '8 種類の眺望',
        'ポルト側の部屋番号',
        '客室を絞り込む',
        '月別料金',
        'ベッドサイズ',
        '施設',
        'レストラン',
        '宿泊特典',
        'よくある質問',
      ],
      en: [
        'At a glance',
        'The three sides',
        'Eight view grades',
        'Porto room numbers',
        'Room finder',
        'Rates by month',
        'Bed sizes',
        'Facilities',
        'Restaurants',
        'Guest benefits',
        'FAQ',
      ],
    },
  },
};

const buildSections = (hotel: HotelKey, locale: Locale) =>
  SECTIONS[hotel].ids.map((id, i) => ({ id, label: SECTIONS[hotel].labels[locale][i]! }));

const COPY: Record<HotelKey, Record<Locale, Omit<HotelCopy, 'sections'>>> = {
  tdh: {
    'zh-hant': {
      hotelName: '東京迪士尼樂園大飯店',
      titleSuffix: ' 房型資料庫',
      regionLabel: '日本・千葉縣浦安市',
      typeCount: (n) => `${n} 種房型`,
      databaseLabel: '房型資料庫',
      heroIntro: (rooms) =>
        `全 ${rooms} 種房型的規格與參考價，以及床型尺寸、餐廳、設施與住宿禮遇的完整整理。訂房頁面開著的時候，把這一頁放在旁邊對照。`,
      pageDescription: (rooms, positions) =>
        `東京迪士尼樂園大飯店全 ${rooms} 種房型的面積、床型、人數上限、景觀分級與參考價，整理成可篩選的清單。另有依實際比例描繪的客房平面圖，${positions} 個位置的大小與面向一目瞭然。`,
      readArticle: '先讀完整攻略',
      headings: {
        overview: '基本資料',
        views: '景觀分級',
        categories: '四大分類',
        beds: '床型尺寸',
        facilities: '設施與拍照點',
        dining: '餐廳',
        benefits: '住宿禮遇',
        faq: '常見問題',
      },
      facts: ({ rooms, types, from }) => [
        { label: '客房總數', value: `${rooms} 間`, sub: `${types} 種房型` },
        { label: '到樂園正門', value: '步行 1 分鐘', sub: '4 座迪士尼飯店中最近' },
        { label: '到 JR 舞濱車站', value: '步行 8 分鐘', sub: '東京車站搭車約 15 分鐘' },
        { label: '入住／退房', value: '15:00 / 12:00', sub: '退房時間比多數飯店晚' },
        { label: '最低參考價', value: from, sub: '每室每晚・2 位大人' },
        { label: '訂房開放', value: '4 個月前 11:00', sub: '日本時間・最多 5 晚 3 房' },
      ],
      provenance:
        '房型、面積與床型取自官方繁體中文客房頁；價格是每室每晚、2 位大人的參考起價，來自公開費率表的二手整理。實際金額依日期大幅浮動，請以官方訂房系統為準。',
      viewsIntro:
        '這是選房時最先要決定的一件事。房名括號裡寫的就是景觀等級；沒有括號代表沒有景觀保證。',
      categoriesIntro:
        '房名的第一段就是分類。分類決定了你有沒有貴賓室、含不含早餐，以及窗戶朝哪一邊。',
      bedsIntro:
        '日本飯店的「標準床」寬度只有 120 公分，比台灣的單人床寬、離雙人床還很遠。訂房前先看這張表，比看房型名稱有用。',
      bedTableCaption: '床型尺寸與可睡人數',
      explorerProvenance:
        '名稱依官方繁中頁，「・」之後是本站為區分床型或人數所加。房號收錄 {numbered} 間，最基本的幾種標準房型來源沒有逐間列號。',
      rateSourceLabel: 'CASTEL 的逐月費率表',
      bargainNote: '暑假就是這個形狀：連假與週末很貴，中間夾著幾個特別便宜的日子。',
      articleTeaseHeading: '想知道這些數字背後的判斷？',
      articleTease:
        '完整攻略裡有三種景觀的真實差異、從房間看夜間表演的實際狀況、四種明星主題房怎麼選，以及訂房開賣時間與撿取消房的做法。',
    },
    ja: {
      hotelName: '東京ディズニーランドホテル',
      titleSuffix: ' 客室データベース',
      regionLabel: '日本・千葉県浦安市',
      typeCount: (n) => `${n} タイプ`,
      databaseLabel: '客室データベース',
      heroIntro: (rooms) =>
        `全 ${rooms} タイプの客室の仕様と参考料金、ベッドサイズ、レストラン、施設、宿泊特典をまとめています。予約画面を開いたまま、このページを横に並べて使ってください。`,
      pageDescription: (rooms, positions) =>
        `東京ディズニーランドホテルの全 ${rooms} タイプについて、広さ・ベッド・定員・眺望の区分・参考料金を絞り込める一覧に整理。実際の比率で描いた客室配置図では ${positions} か所の広さと向きが一目で分かります。`,
      readArticle: '詳しい解説を読む',
      headings: {
        overview: '基本情報',
        views: '眺望の区分',
        categories: '4 つのカテゴリー',
        beds: 'ベッドサイズ',
        facilities: '施設と撮影スポット',
        dining: 'レストラン',
        benefits: '宿泊特典',
        faq: 'よくある質問',
      },
      facts: ({ rooms, types, from }) => [
        { label: '客室数', value: `${rooms} 室`, sub: `${types} タイプ` },
        { label: 'パーク正面まで', value: '徒歩 1 分', sub: '4 座のディズニーホテルで最短' },
        { label: 'JR 舞浜駅まで', value: '徒歩 8 分', sub: '東京駅から電車で約 15 分' },
        { label: 'チェックイン／アウト', value: '15:00 / 12:00', sub: 'チェックアウトは遅め' },
        { label: '参考最低料金', value: from, sub: '1 室 1 泊・大人 2 名' },
        { label: '予約開始', value: '4 か月前 11:00', sub: '日本時間・最大 5 泊 3 室' },
      ],
      provenance:
        '客室名・広さ・ベッドは公式の客室ページに従っています。料金は 1 室 1 泊・大人 2 名の参考最低料金で、公開されている料金表の二次整理です。実際の金額は日付で大きく変わるため、公式の予約システムでご確認ください。',
      viewsIntro:
        '客室を選ぶとき最初に決めるのがここです。客室名の括弧内が眺望の区分で、括弧がなければ眺望の保証はありません。',
      categoriesIntro:
        '客室名の頭がカテゴリーです。ラウンジが使えるか、朝食が付くか、窓がどちら側を向くかはここで決まります。',
      bedsIntro:
        '日本のホテルの「レギュラーサイズ」は幅 120 cm です。客室名を眺めるより、この表を先に見るほうが確実です。',
      bedTableCaption: 'のベッドサイズと就寝人数',
      explorerProvenance:
        '客室名は公式ページに従い、「・」以降はベッドや定員を区別するため本サイトが付けています。部屋番号は {numbered} 室分。基本的なスタンダードルームは出典に部屋番号の記載がありません。',
      rateSourceLabel: 'CASTEL の月別料金表',
      bargainNote:
        '夏休みはこの形になります。連休と週末が高く、その間に特別に安い日が数日はさまっています。',
      articleTeaseHeading: 'この数字の背景を知りたい方へ',
      articleTease:
        '詳しい解説では、3 段階の眺望の実際の違い、客室から夜のショーがどこまで見えるか、4 つのキャラクタールームの選び方、予約開始時刻とキャンセル拾いの実践を扱っています。',
    },
    en: {
      hotelName: 'Tokyo Disneyland Hotel',
      titleSuffix: ' room database',
      regionLabel: 'Urayasu, Chiba, Japan',
      typeCount: (n) => `${n} room type${n === 1 ? '' : 's'}`,
      databaseLabel: 'Room database',
      heroIntro: (rooms) =>
        `Specifications and reference rates for all ${rooms} room types, plus bed sizes, restaurants, facilities and guest benefits. Keep this page open beside the booking form.`,
      pageDescription: (rooms, positions) =>
        `Area, beds, occupancy, view grade and reference rate for all ${rooms} Tokyo Disneyland Hotel room types, in one filterable list. A floor plan drawn to true proportions shows the size and orientation of ${positions} room positions.`,
      readArticle: 'Read the full guide',
      headings: {
        overview: 'At a glance',
        views: 'View grades',
        categories: 'The four categories',
        beds: 'Bed sizes',
        facilities: 'Facilities and photo spots',
        dining: 'Restaurants',
        benefits: 'Guest benefits',
        faq: 'Frequently asked',
      },
      facts: ({ rooms, types, from }) => [
        { label: 'Guest rooms', value: `${rooms}`, sub: `${types} room types` },
        { label: 'To the park gate', value: '1 min walk', sub: 'Closest of the four Disney hotels' },
        { label: 'To JR Maihama', value: '8 min walk', sub: 'About 15 min by train from Tokyo Station' },
        { label: 'Check in / out', value: '15:00 / 12:00', sub: 'Later checkout than most hotels' },
        { label: 'From', value: from, sub: 'Per room per night, two adults' },
        { label: 'Booking opens', value: '4 months ahead, 11:00', sub: 'Japan time, up to 5 nights and 3 rooms' },
      ],
      provenance:
        'Room names, areas and bed types follow the hotel’s official pages. Rates are reference starting prices per room per night for two adults, compiled from a published rate table, which is a secondary source. Actual prices move a great deal by date — confirm in the official booking system.',
      viewsIntro:
        'This is the first thing to settle. Whatever sits in brackets after the room name is the view grade; no brackets means no view is guaranteed.',
      categoriesIntro:
        'The first part of a room name is its category. That is what decides lounge access, whether breakfast is included, and which way the window faces.',
      bedsIntro:
        'A Japanese hotel’s regular bed is only 120 cm wide. Reading this table tells you more than the room name does.',
      bedTableCaption: ' bed sizes and how many each sleeps',
      explorerProvenance:
        'Room names follow the official pages; anything after the “・” is this site separating bed layouts or occupancies. Room numbers cover {numbered} rooms — the plainest standard types are not enumerated by the source.',
      rateSourceLabel: 'CASTEL’s month-by-month rate tables',
      bargainNote:
        'That is the shape of a school holiday: expensive weekends and public holidays with a few unusually cheap days in between.',
      articleTeaseHeading: 'Want the reasoning behind these numbers?',
      articleTease:
        'The full guide covers what actually separates the three view grades, how much of the night show you can see from a room, how to choose between the four character rooms, and when booking opens along with how people catch cancellations.',
    },
  },
  dhm: {
    'zh-hant': {
      hotelName: '東京迪士尼海洋觀海景大飯店',
      titleSuffix: '房型資料庫',
      regionLabel: '日本・千葉縣浦安市',
      typeCount: (n) => `${n} 種`,
      databaseLabel: '房型資料庫',
      heroIntro: (rooms) =>
        `${rooms} 種可訂組合、八種景觀、官方客房格局與海港區逐間房號，放在同一頁對照。這間飯店最貴的不是房間大小，是窗外那一格。`,
      pageDescription: (rooms, numbered) =>
        `東京迪士尼海洋觀海景大飯店全 ${rooms} 種可訂組合的面積、床型、人數、景觀與 2026 參考價，另有海港區 ${numbered} 間房號索引、官方格局圖、設施、餐廳與住宿禮遇。`,
      readArticle: '先讀完整攻略',
      headings: {
        overview: '基本資料',
        categories: '三個區，加上一個服務等級',
        views: '八種景觀名稱，不能只看「哪一區」',
        beds: '床型尺寸',
        facilities: '設施與園區動線',
        dining: '餐廳',
        benefits: '住宿禮遇',
        faq: '常見問題',
      },
      facts: ({ rooms, types, from }) => [
        { label: '客房總數', value: `${rooms} 間`, sub: `${types} 種可訂組合` },
        { label: '最大特色', value: '住在園區裡', sub: '飯店建築就是東京迪士尼海洋的一部分' },
        { label: '最近車站', value: '東京迪士尼海洋站', sub: '2 樓空中走廊直達飯店' },
        { label: '入住／退房', value: '15:00 / 12:00', sub: '退房日仍可使用歡樂入園' },
        { label: '最低參考價', value: from, sub: '每室每晚・2 位大人' },
        { label: '訂房開放', value: '4 個月前 11:00', sub: '日本時間・最多 5 晚 3 房' },
      ],
      provenance:
        '房型名稱、面積、定員、床型與格局圖取自官方繁體中文及日文客房頁。價格是每室每晚、2 位大人的公開費率二手整理，不是報價；房號只涵蓋有逐間調查的海港區，實際房價與房間分配以官方為準。',
      viewsIntro:
        '海港區不等於港灣全景，威尼斯區也不等於運河景。真正的景觀承諾寫在房名最後一個括號；房名沒有景觀後綴，就沒有保證。',
      categoriesIntro:
        '托斯卡納、威尼斯、海港描述的是建築朝向；「尊榮客房＆套房」則是跨威尼斯與海港的服務等級。先決定要看哪一側，再決定要不要為貴賓室與早餐加價。',
      bedsIntro:
        '「最多 4 位」常代表第四位要睡 84 × 182 公分的郵輪床；「頂樓陽台客房」的雙人床又比一般雙人床窄 20 公分。人數上限相同，不代表四個人的睡眠品質相同。',
      bedTableCaption: '床型尺寸與可睡人數',
      explorerProvenance:
        '名稱依官方繁中頁，「・」之後是本站為拆開床型或定員所加。房號收錄海港區 {numbered} 間；托斯卡納與威尼斯區沒有可靠的逐間調查，故不填號碼。',
      rateSourceLabel: 'CASTEL 的逐月費率表',
      bargainNote: '暑假同時有低價日和全年的高價日，能不能移動入住日期，比月份名稱更重要。',
      articleTeaseHeading: '資料都在這裡，選房邏輯在完整攻略',
      articleTease:
        '完整攻略會把三區與四級海港景觀的價差拆開，說明房內看水上表演的限制、陽台與頂樓露天陽台的差別，以及歡樂入園和飯店通路該怎麼排進行程。',
    },
    ja: {
      hotelName: '東京ディズニーシー・ホテルミラコスタ',
      titleSuffix: ' 客室データベース',
      regionLabel: '日本・千葉県浦安市',
      typeCount: (n) => `${n} タイプ`,
      databaseLabel: '客室データベース',
      heroIntro: (rooms) =>
        `${rooms} タイプの予約単位、8 種類の眺望、公式のレイアウト図、そしてポルト・パラディーゾ・サイドの部屋番号を 1 ページに並べています。このホテルで高いのは広さではなく、窓の位置です。`,
      pageDescription: (rooms, numbered) =>
        `東京ディズニーシー・ホテルミラコスタの全 ${rooms} タイプについて、広さ・ベッド・定員・眺望・2026 年の参考料金を整理。ポルト・パラディーゾ・サイド ${numbered} 室の部屋番号一覧、公式レイアウト図、施設、レストラン、宿泊特典も収録しています。`,
      readArticle: '詳しい解説を読む',
      headings: {
        overview: '基本情報',
        categories: '3 つのサイドと、もう 1 つのグレード',
        views: '8 種類の眺望：サイド名だけでは決まらない',
        beds: 'ベッドサイズ',
        facilities: '施設とパークへの動線',
        dining: 'レストラン',
        benefits: '宿泊特典',
        faq: 'よくある質問',
      },
      facts: ({ rooms, types, from }) => [
        { label: '客室数', value: `${rooms} 室`, sub: `${types} タイプ` },
        { label: '最大の特徴', value: 'パークの中に泊まる', sub: '建物が東京ディズニーシーの一部' },
        { label: '最寄り駅', value: '東京ディズニーシー・ステーション', sub: '2 階の空中通路で直結' },
        { label: 'チェックイン／アウト', value: '15:00 / 12:00', sub: 'チェックアウト日もハッピーエントリー可' },
        { label: '参考最低料金', value: from, sub: '1 室 1 泊・大人 2 名' },
        { label: '予約開始', value: '4 か月前 11:00', sub: '日本時間・最大 5 泊 3 室' },
      ],
      provenance:
        '客室名・広さ・定員・ベッド・レイアウト図は公式の客室ページに従っています。料金は 1 室 1 泊・大人 2 名の参考料金で、公開料金表の二次整理です。部屋番号は 1 室ずつの調査があるポルト・パラディーゾ・サイドのみで、実際の料金と客室の割り当ては公式にご確認ください。',
      viewsIntro:
        'ポルト・パラディーゾ・サイド＝ハーバーの全景ではありませんし、ヴェネツィア・サイド＝運河の眺めでもありません。眺望の保証は客室名の最後の括弧にあり、括弧がなければ保証はありません。',
      categoriesIntro:
        'トスカーナ、ヴェネツィア、ポルト・パラディーゾは建物のどちら側かを表します。「スペチアーレ・ルーム＆スイート」はヴェネツィアとポルトにまたがるグレードです。まずどちら側を見たいかを決め、そのあとでラウンジと朝食に払うかを決めます。',
      bedsIntro:
        '「定員 4 名」の 4 人目はたいてい 84 × 182 cm のクルーズベッドです。テラスルームのダブルベッドは通常より 20 cm 狭い。定員が同じでも、4 人の寝心地は同じではありません。',
      bedTableCaption: 'のベッドサイズと就寝人数',
      explorerProvenance:
        '客室名は公式ページに従い、「・」以降はベッドや定員を分けるため本サイトが付けています。部屋番号はポルト・パラディーゾ・サイドの {numbered} 室分で、トスカーナとヴェネツィアには 1 室ずつの調査がないため記載していません。',
      rateSourceLabel: 'CASTEL の月別料金表',
      bargainNote:
        '夏休みは最安の日と年間最高値の日が同じ月に同居します。月の名前より、日付を動かせるかどうかが効きます。',
      articleTeaseHeading: 'データはここ、選び方は解説記事に',
      articleTease:
        '詳しい解説では、3 つのサイドとハーバー側 4 段階の眺望の価格差、客室から水上ショーがどこまで見えるか、バルコニールームとテラスルームの違い、ハッピーエントリーとホテル専用通路の使い方を扱っています。',
    },
    en: {
      hotelName: 'Tokyo DisneySea Hotel MiraCosta',
      titleSuffix: ' room database',
      regionLabel: 'Urayasu, Chiba, Japan',
      typeCount: (n) => `${n} type${n === 1 ? '' : 's'}`,
      databaseLabel: 'Room database',
      heroIntro: (rooms) =>
        `${rooms} bookable combinations, eight view grades, the hotel’s own layout drawings and the Porto Paradiso room numbers, side by side on one page. What costs money here is not floor area — it is which window you get.`,
      pageDescription: (rooms, numbered) =>
        `Area, beds, occupancy, view grade and 2026 reference rates for all ${rooms} Tokyo DisneySea Hotel MiraCosta booking combinations, plus an index of ${numbered} Porto Paradiso room numbers, official layout drawings, facilities, restaurants and guest benefits.`,
      readArticle: 'Read the full guide',
      headings: {
        overview: 'At a glance',
        categories: 'Three sides, plus one service grade',
        views: 'Eight view names — the side alone tells you nothing',
        beds: 'Bed sizes',
        facilities: 'Facilities and the route into the park',
        dining: 'Restaurants',
        benefits: 'Guest benefits',
        faq: 'Frequently asked',
      },
      facts: ({ rooms, types, from }) => [
        { label: 'Guest rooms', value: `${rooms}`, sub: `${types} bookable combinations` },
        { label: 'What sets it apart', value: 'Inside the park', sub: 'The building is part of Tokyo DisneySea' },
        { label: 'Nearest station', value: 'Tokyo DisneySea Station', sub: 'Walkway straight to the second floor' },
        { label: 'Check in / out', value: '15:00 / 12:00', sub: 'Happy Entry still applies on departure day' },
        { label: 'From', value: from, sub: 'Per room per night, two adults' },
        { label: 'Booking opens', value: '4 months ahead, 11:00', sub: 'Japan time, up to 5 nights and 3 rooms' },
      ],
      provenance:
        'Room names, areas, occupancies, bed layouts and plan drawings follow the hotel’s official pages. Rates are reference prices per room per night for two adults, compiled from a published table rather than quoted. Room numbers cover only Porto Paradiso, the side that has been surveyed room by room; confirm prices and room assignment with the hotel.',
      viewsIntro:
        'Porto Paradiso Side does not mean the whole harbour, and Venice Side does not mean a canal view. The promise about your window is in the last bracket of the room name; no bracket, no promise.',
      categoriesIntro:
        'Toscana, Venezia and Porto Paradiso describe which side of the building you are on. Speciale Rooms & Suites is a service grade instead, spanning the Venice and Porto sides. Decide which side you want to look at first, then decide whether the lounge and breakfast are worth the difference.',
      bedsIntro:
        'A fourth guest usually means a cruise bed of 84 × 182 cm, and a Terrace Room’s double is 20 cm narrower than a standard one. The same occupancy number does not mean four people sleep equally well.',
      bedTableCaption: ' bed sizes and how many each sleeps',
      explorerProvenance:
        'Room names follow the official pages; anything after the “・” is this site separating bed layouts or occupancies. Room numbers cover {numbered} rooms on the Porto Paradiso side; the Toscana and Venezia sides have no room-by-room survey, so they carry none.',
      rateSourceLabel: 'CASTEL’s month-by-month rate tables',
      bargainNote:
        'The summer holidays hold the year’s cheapest dates and its dearest ones in the same month, so being able to move your dates matters more than the name of the month.',
      articleTeaseHeading: 'The data is here; the reasoning is in the guide',
      articleTease:
        'The full guide separates the three sides and the four harbour-side view grades by price, explains the limits of watching a water show from your room, sets Balcony Rooms against Terrace Rooms, and covers how Happy Entry and the hotel’s own park gateway fit into a day.',
    },
  },
};

export const hotelCopy = (locale: Locale, hotel: HotelKey): HotelCopy => ({
  ...COPY[hotel][locale],
  sections: buildSections(hotel, locale),
});

/** Copy for the page that lists every hotel database. */
export interface HotelIndexCopy {
  heading: string;
  kicker: string;
  intro: (hotels: number, types: number) => string;
  statHotels: string;
  statTypes: string;
  statPrinciple: string;
  statPrincipleValue: string;
  openDatabase: string;
  readArticle: string;
  countNote: string;
  cards: Record<HotelKey, { kicker: string; description: string; facts: string[] }>;
}

const INDEX_COPY: Record<Locale, HotelIndexCopy> = {
  'zh-hant': {
    heading: '房型資料庫',
    kicker: '工具',
    intro: (hotels, types) =>
      `目前收錄 ${hotels} 間東京迪士尼飯店、共 ${types} 種可訂房型組合。把房型名稱拆成可以篩選的規格，再把官方格局、逐月價格與可核對的房號放回同一張卡片。`,
    statHotels: '飯店',
    statTypes: '可訂組合',
    statPrinciple: '資料原則',
    statPrincipleValue: '官方規格＋標明二手來源',
    openDatabase: '打開資料庫',
    readArticle: '閱讀完整攻略',
    countNote:
      '「可訂組合」是把官方同一名稱下不同床型、面積或定員拆開後的數量，不等於官方宣稱的房型名稱數。價格一律是比較用的參考值，實際庫存與金額以東京迪士尼度假區訂房系統為準。',
    cards: {
      dhm: {
        kicker: '住在東京迪士尼海洋裡',
        description:
          '拆解托斯卡納、威尼斯、海港與尊榮客房，並整理八種景觀、海港區逐間房號、官方格局與 2026 逐月費率。',
        facts: ['八種景觀', '海港區房號索引', '連通房組合', '官方格局圖'],
      },
      tdh: {
        kicker: '東京迪士尼樂園正門前',
        description:
          '把標準房、明星房、禮賓房與套房拆成可篩選規格，另有 116 個位置依實際比例描繪的客房平面圖。',
        facts: ['三種景觀', '逐間比例平面圖', '房號對照', '官方格局圖'],
      },
    },
  },
  ja: {
    heading: '客室データベース',
    kicker: 'ツール',
    intro: (hotels, types) =>
      `東京ディズニーリゾートのホテル ${hotels} 軒、合わせて ${types} タイプの予約単位を収録しています。客室名を絞り込める仕様に分解し、公式レイアウト、月別料金、照合できる部屋番号を 1 枚のカードに戻しています。`,
    statHotels: 'ホテル',
    statTypes: '予約単位',
    statPrinciple: '編集方針',
    statPrincipleValue: '公式の仕様＋二次情報は出典明記',
    openDatabase: 'データベースを開く',
    readArticle: '詳しい解説を読む',
    countNote:
      '「予約単位」は公式が同じ名前で並べているベッドや広さ、定員の違いを分けた数で、公式が掲げる客室名の数とは一致しません。料金は比較のための参考値で、実際の空室と金額は公式の予約システムでご確認ください。',
    cards: {
      dhm: {
        kicker: '東京ディズニーシーの中に泊まる',
        description:
          'トスカーナ、ヴェネツィア、ポルト・パラディーゾ、スペチアーレを分解し、8 種類の眺望、ポルト側の部屋番号、公式レイアウト、2026 年の月別料金をまとめています。',
        facts: ['8 種類の眺望', 'ポルト側の部屋番号', 'コネクティングの組み合わせ', '公式レイアウト図'],
      },
      tdh: {
        kicker: '東京ディズニーランドの正面',
        description:
          'スタンダード、キャラクター、コンシェルジュ、スイートを絞り込める仕様に分解。116 か所を実際の比率で描いた客室配置図も収録しています。',
        facts: ['3 段階の眺望', '実比率の配置図', '部屋番号の対照', '公式レイアウト図'],
      },
    },
  },
  en: {
    heading: 'Room databases',
    kicker: 'Tools',
    intro: (hotels, types) =>
      `${hotels} Tokyo Disney Resort hotels so far, ${types} bookable combinations between them. Room names are broken back down into specifications you can filter, then put beside the official layouts, the month-by-month rates and the room numbers that can be checked.`,
    statHotels: 'Hotels',
    statTypes: 'Bookable combinations',
    statPrinciple: 'Sourcing',
    statPrincipleValue: 'Official specs, secondary sources named',
    openDatabase: 'Open the database',
    readArticle: 'Read the full guide',
    countNote:
      'A “bookable combination” separates the bed layouts, areas and occupancies the hotel sells under one name, so the count is higher than the number of room names on the official site. Rates are reference figures for comparison; confirm availability and price in the Tokyo Disney Resort booking system.',
    cards: {
      dhm: {
        kicker: 'Sleeping inside Tokyo DisneySea',
        description:
          'Toscana, Venezia, Porto Paradiso and the Speciale grade taken apart, with the eight view grades, the Porto room numbers, the official layouts and 2026 rates by month.',
        facts: ['Eight view grades', 'Porto room-number index', 'Connecting-room pairs', 'Official layouts'],
      },
      tdh: {
        kicker: 'A minute from the Tokyo Disneyland gate',
        description:
          'Standard, character, concierge and suite rooms broken into filterable specifications, plus a floor plan of 116 positions drawn to true proportions.',
        facts: ['Three view grades', 'True-proportion floor plan', 'Room-number lookup', 'Official layouts'],
      },
    },
  },
};

export const hotelIndexCopy = (locale: Locale): HotelIndexCopy => INDEX_COPY[locale];
