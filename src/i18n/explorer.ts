import type { Locale } from './config';

/** Copy for the room finder, the bed table and the floor plan. */
export interface ExplorerCopy {
  heading: string;
  intro: (types: number) => string;
  naming: (numbered: number) => string;
  typeCount: (n: number) => string;
  filters: { category: string; view: string; capacity: string; features: string; all: string };
  capacityOptions: { value: string; label: string }[];
  features: { alcove: string; balcony: string; breakfast: string; lounge: string; accessible: string };
  order: string;
  reset: string;
  fields: { area: string; capacity: string; priceRange: string; beds: string; floors: string };
  guests: string;
  from: (price: string) => string;
  roomNumbers: string;
  roomCount: (n: number) => string;
  notListed: string;
  incomplete: string;
  balconyNumbers: string;
  balconyTitle: string;
  empty: string;
  layoutCaption: { shared: string; official: string };
  plan: {
    heading: string;
    intro: string;
    floors: string;
    colourBy: { view: string; category: string };
    allFloors: string;
    tapHint: string;
    wholeFloor: string;
    positions: string;
    roomsOnPlan: string;
    totalRooms: string;
    floorRooms: (floor: number) => string;
    facing: { park: string; entrance: string; side: string };
    bedField: string;
    officialName: (floor: number) => string;
    officialNames: string;
    numbersField: (floor: number | null) => string;
    noneOnFloor: string;
    note: (planRooms: number, total: number, positions: number, published: number) => string;
    legendNote: string;
    turretLabel: string;
    colourLabel: string;
    entranceSide: string;
    parkSide: string;
    svgTitle: string;
    svgDesc: string;
    blurbIntro: string;
    detail: string;
    positionLabel: (code: string) => string;
  };
  beds: { name: string; size: string; capacity: string; note: string };
}

const zhHant: ExplorerCopy = {
  heading: '房型探索器',
  intro: (types) =>
    `${types} 種房型，用你在意的條件篩掉不適合的。價格區間是公開費率表裡該房型的全年最低到最高，也就是最便宜與最貴的那一天。`,
  naming: (numbered) =>
    `名稱依官方繁中頁，「・」之後是本站為區分床型或人數所加。房號收錄 ${numbered} 間，最基本的幾種標準房型來源沒有逐間列號。`,
  typeCount: (n) => `${n} 種房型`,
  filters: { category: '分類', view: '景觀', capacity: '入住人數', features: '必要條件', all: '全部' },
  capacityOptions: [
    { value: '0', label: '不限' },
    { value: '2', label: '2 人以上' },
    { value: '3', label: '3 人以上' },
    { value: '4', label: '4 人以上' },
    { value: '5', label: '5 人' },
  ],
  features: { alcove: '凹室床', balcony: '陽台', breakfast: '含早餐', lounge: '貴賓室', accessible: '無障礙' },
  order: '依分類排列，每一類裡由便宜到貴',
  reset: '清除條件',
  fields: { area: '面積', capacity: '人數上限', priceRange: '價格區間', beds: '床型', floors: '分佈樓層' },
  guests: ' 位',
  from: (price) => `${price} 起`,
  roomNumbers: '房號',
  roomCount: (n) => `${n} 間`,
  notListed: '未逐間公布',
  incomplete: '不完整',
  balconyNumbers: '金色標示的房號可以走到戶外陽台。',
  balconyTitle: '可以走到戶外陽台',
  empty: '沒有符合條件的房型。試著放寬景觀或必要條件。',
  layoutCaption: { shared: '官方同一頁涵蓋數種床型，圖上並列', official: '官方平面圖' },
  plan: {
    heading: '客房平面圖',
    intro:
      '上方是飯店正門與幻想曲廣場，下方是東京迪士尼樂園。格子裡的三位數是房號的後三碼，前面加上樓層就是完整房號。',
    floors: '樓層',
    colourBy: { view: '依景觀', category: '依房型分類' },
    allFloors: '全部樓層',
    tapHint: '點圖上任一間房',
    wholeFloor: '整層平面',
    positions: '圖上位置',
    roomsOnPlan: '這些位置的客房',
    totalRooms: '全館客房',
    floorRooms: (floor) => `${floor} 樓客房`,
    facing: {
      park: '窗戶在面向東京迪士尼樂園的那一側。',
      entrance: '窗戶在面向飯店正門的那一側。',
      side: '窗戶在建築側面。',
    },
    bedField: '床型',
    officialName: (floor) => `${floor} 樓官方房型`,
    officialNames: '官方房型名稱',
    numbersField: (floor) => (floor === null ? '房號' : `${floor} 樓房號`),
    noneOnFloor: '這一層沒有這個位置',
    note: (planRooms, total, positions, published) =>
      `依原始平面圖逐間描出位置與大小，房號沿走廊推得。圖上涵蓋 ${planRooms} 間，全館 ${total} 間；${positions} 個位置裡有 ${published} 個有公開房號，1、2 樓最不完整。手機請左右滑動。`,
    legendNote: '選定樓層後，顏色是該樓層實際販售的分類',
    turretLabel: '角塔',
    colourLabel: '上色依據',
    entranceSide: '飯店正門側・幻想曲廣場',
    parkSide: '東京迪士尼樂園',
    svgTitle: '東京迪士尼樂園大飯店逐間客房平面圖',
    svgDesc: '依實際比例描繪的平面圖。每一個多邊形是一間客房。',
    blurbIntro: '這張圖從原始平面圖描出來，位置、大小和角度都照實際比例。',
    detail: '逐間客房平面圖',
    positionLabel: (code) => `位置 ${code}`,
  },
  beds: { name: '床型', size: '尺寸（cm）', capacity: '每張床鋪的人數上限', note: '說明' },
};

const ja: ExplorerCopy = {
  heading: '客室を絞り込む',
  intro: (types) =>
    `${types} タイプの客室を、気になる条件で絞り込めます。料金の幅は公開されている料金表での年間の最安値から最高値、つまりもっとも安い日ともっとも高い日です。`,
  naming: (numbered) =>
    `客室名は公式表記に従い、「・」以降は床型や定員を区別するために本サイトが加えたものです。部屋番号は ${numbered} 室分を収録。もっとも基本的なスタンダードのいくつかは出典に 1 室ずつの記載がありません。`,
  typeCount: (n) => `${n} タイプ`,
  filters: { category: 'カテゴリー', view: '眺望', capacity: '人数', features: '必須条件', all: 'すべて' },
  capacityOptions: [
    { value: '0', label: '指定なし' },
    { value: '2', label: '2 名以上' },
    { value: '3', label: '3 名以上' },
    { value: '4', label: '4 名以上' },
    { value: '5', label: '5 名' },
  ],
  features: {
    alcove: 'アルコーヴベッド',
    balcony: 'バルコニー',
    breakfast: '朝食つき',
    lounge: 'ラウンジ',
    accessible: 'アクセシブル',
  },
  order: 'カテゴリー順、各カテゴリー内は安い順',
  reset: '条件をクリア',
  fields: { area: '広さ', capacity: '定員', priceRange: '料金の幅', beds: 'ベッド', floors: '階層' },
  guests: ' 名',
  from: (price) => `${price} から`,
  roomNumbers: '部屋番号',
  roomCount: (n) => `${n} 室`,
  notListed: '1 室ずつの公開なし',
  incomplete: '不完全',
  balconyNumbers: '金色の番号はバルコニーに出られる客室です。',
  balconyTitle: 'バルコニーに出られる',
  empty: '条件に合う客室がありません。眺望か必須条件を緩めてみてください。',
  layoutCaption: { shared: '公式の同一ページが複数の床型を扱い、図に並記', official: '公式の平面図' },
  plan: {
    heading: '客室配置図',
    intro:
      '上がホテル正面エントランスとファンタジア広場、下が東京ディズニーランドです。枠内の 3 桁は部屋番号の下 3 桁で、頭に階を付けると完全な番号になります。',
    floors: '階',
    colourBy: { view: '眺望で色分け', category: 'カテゴリーで色分け' },
    allFloors: 'すべての階',
    tapHint: '図の客室をタップ',
    wholeFloor: 'フロア全体',
    positions: '図上の位置',
    roomsOnPlan: 'これらの位置の客室',
    totalRooms: '全客室',
    floorRooms: (floor) => `${floor} 階の客室`,
    facing: {
      park: '窓は東京ディズニーランド側にあります。',
      entrance: '窓はホテル正面エントランス側にあります。',
      side: '窓は建物の側面にあります。',
    },
    bedField: 'ベッド',
    officialName: (floor) => `${floor} 階の公式客室名`,
    officialNames: '公式の客室名',
    numbersField: (floor) => (floor === null ? '部屋番号' : `${floor} 階の部屋番号`),
    noneOnFloor: 'この階にこの位置はありません',
    note: (planRooms, total, positions, published) =>
      `元の配置図から 1 室ずつ位置と広さを描き出し、部屋番号は廊下沿いに推定しました。図が扱うのは ${planRooms} 室で、全館は ${total} 室。${positions} か所のうち ${published} か所に公開された部屋番号があり、1〜2 階がもっとも不完全です。スマートフォンでは左右にスクロールしてください。`,
    legendNote: '階を選ぶと、その階で実際に販売されているカテゴリーの色になります',
    turretLabel: '小塔',
    colourLabel: '色分けの基準',
    entranceSide: '正面エントランス側・ファンタジア広場',
    parkSide: '東京ディズニーランド',
    svgTitle: '東京ディズニーランドホテル 客室配置図',
    svgDesc: '実際の比率で描いた配置図。多角形の一つが 1 室です。',
    blurbIntro: '元の配置図から描き出し、位置・広さ・角度をすべて実際の比率で表しています。',
    detail: '客室配置図',
    positionLabel: (code) => `位置 ${code}`,
  },
  beds: { name: 'ベッド', size: 'サイズ（cm）', capacity: '1 台あたりの定員', note: '備考' },
};

const en: ExplorerCopy = {
  heading: 'Room finder',
  intro: (types) =>
    `All ${types} room types, filtered by what you care about. The price range runs from that room's cheapest date of the year to its dearest, according to the published rate table.`,
  naming: (numbered) =>
    `Names follow the hotel's official wording; anything after the separator is our own note distinguishing bed or occupancy variants. Room numbers are recorded for ${numbered} rooms — the highest-volume standard types were never listed room by room.`,
  typeCount: (n) => `${n} room type${n === 1 ? '' : 's'}`,
  filters: { category: 'Category', view: 'View', capacity: 'Guests', features: 'Must have', all: 'All' },
  capacityOptions: [
    { value: '0', label: 'Any' },
    { value: '2', label: '2 or more' },
    { value: '3', label: '3 or more' },
    { value: '4', label: '4 or more' },
    { value: '5', label: '5' },
  ],
  features: {
    alcove: 'Alcove bed',
    balcony: 'Balcony',
    breakfast: 'Breakfast',
    lounge: 'Lounge',
    accessible: 'Accessible',
  },
  order: 'Grouped by category, cheapest first within each',
  reset: 'Clear filters',
  fields: { area: 'Area', capacity: 'Sleeps', priceRange: 'Price range', beds: 'Beds', floors: 'Floors' },
  guests: '',
  from: (price) => `from ${price}`,
  roomNumbers: 'Room numbers',
  roomCount: (n) => `${n} room${n === 1 ? '' : 's'}`,
  notListed: 'Not published individually',
  incomplete: 'Incomplete',
  balconyNumbers: 'Numbers in gold open onto a balcony.',
  balconyTitle: 'Opens onto a balcony',
  empty: 'No room type matches. Try relaxing the view or the must-haves.',
  layoutCaption: {
    shared: 'One official page covers several bed variants, shown side by side',
    official: 'Official floor plan',
  },
  plan: {
    heading: 'Floor plan',
    intro:
      'The hotel’s main entrance and Fantasia Plaza are at the top, Tokyo Disneyland at the bottom. The three digits in each cell are the last three of the room number; add the floor in front for the full one.',
    floors: 'Floor',
    colourBy: { view: 'By view', category: 'By category' },
    allFloors: 'All floors',
    tapHint: 'Tap any room on the plan',
    wholeFloor: 'Whole floor',
    positions: 'Positions drawn',
    roomsOnPlan: 'Rooms at those positions',
    totalRooms: 'Rooms in the hotel',
    floorRooms: (floor) => `Rooms on floor ${floor}`,
    facing: {
      park: 'The window is on the Tokyo Disneyland side.',
      entrance: 'The window is on the hotel’s main entrance side.',
      side: 'The window is on the side of the building.',
    },
    bedField: 'Beds',
    officialName: (floor) => `Official room type on floor ${floor}`,
    officialNames: 'Official room names',
    numbersField: (floor) => (floor === null ? 'Room numbers' : `Room numbers on floor ${floor}`),
    noneOnFloor: 'This position does not exist on this floor',
    note: (planRooms, total, positions, published) =>
      `Positions and sizes are traced room by room from the published plan, with numbers inferred along each corridor. The plan accounts for ${planRooms} rooms of the hotel's ${total}; ${published} of ${positions} positions have a published room number, and floors 1 and 2 are the least complete. Scroll sideways on a phone.`,
    legendNote: 'With a floor selected, colours show the category sold on that floor',
    turretLabel: 'Turret',
    colourLabel: 'Colour by',
    entranceSide: 'Main entrance side · Fantasia Plaza',
    parkSide: 'Tokyo Disneyland',
    svgTitle: 'Tokyo Disneyland Hotel floor plan, room by room',
    svgDesc: 'Drawn to true proportions. Each polygon is one guest room.',
    blurbIntro: 'Traced from the published plan, with position, size and angle all to true scale.',
    detail: 'Floor plan, room by room',
    positionLabel: (code) => `Position ${code}`,
  },
  beds: { name: 'Bed', size: 'Size (cm)', capacity: 'Maximum per bed', note: 'Notes' },
};

const COPY: Record<Locale, ExplorerCopy> = { 'zh-hant': zhHant, ja, en };
export const explorer = (locale: Locale): ExplorerCopy => COPY[locale];

/** Copy for the month-by-month rate panel. */
export interface SeasonCopy {
  heading: string;
  intro: string;
  panelHeading: string;
  panelIntro: (types: number) => string;
  bargain: (months: string, safest: string) => string;
  safest: (month: string, pct: number, worst: string, worstPct: number) => string;
  flattest: (month: string, pct: number, swingiest: string) => string;
  roomLabel: string;
  stats: { low: [string, string]; high: [string, string]; ratio: [string, string]; season: [string, string] };
  monthLabel: (m: number) => string;
  flatRatio: string;
  flatSeason: string;
  ratio: (n: string) => string;
  seasonPair: (cheap: number, dear: number) => string;
  partial: (from: number, to: number) => string;
  flatNote: string;
  colourNote: string;
  tooltip: (year: number, month: number, low: string, high: string) => string;
  source: (unpriced: number) => { before: string; link: string; after: string };
}

const SEASON: Record<Locale, SeasonCopy> = {
  'zh-hant': {
    heading: '逐月價格區間',
    intro:
      '每一條橫棒是那個月「最便宜的日期」到「最貴的日期」。棒子的位置看淡旺季，棒子的長度看同一個月裡日期的影響有多大。選一個房型看它整年的樣子。',
    panelHeading: '淡旺季：光看底價會看錯',
    panelIntro: (types) =>
      `${types} 種有完整十二個月資料的房型，各自以「自己全年最便宜的那一天」為 100 對齊後平均。每條棒子的左端是那個月最便宜的日期、右端是最貴的日期。棒子的高度看貴不貴，長度看挑日子有多重要。`,
    bargain: (months, safest) =>
      `${months}有全年最便宜的日期，但不是淡季。它們的底價是全年最低，天花板卻比 ${safest} 高出不少——暑假就是這個形狀：連假與週末很貴，中間夾著幾個特別便宜的日子。`,
    safest: (month, pct, worst, worstPct) =>
      `真正整月都便宜的是 ${month}，天花板全年最低（+${pct}%），也就是不太需要挑日子。最該避開的是 ${worst}，最貴的日期到 +${worstPct}%。`,
    flattest: (month, pct, swingiest) =>
      `${month}是「怎麼選都一樣」的月份，月內落差全年最小，底價卻已經是 +${pct}%，等於沒有便宜的日子可挑；${swingiest}相反，落差全年最大，值得為了日期調整行程。`,
    roomLabel: '房型',
    stats: {
      low: ['全年最低', '最便宜的日期'],
      high: ['全年最高', '最貴的日期'],
      ratio: ['最高／最低', '同一間房的倍數'],
      season: ['最便宜／最貴', '以月份看'],
    },
    monthLabel: (m) => `${m} 月`,
    flatRatio: '全年同價',
    flatSeason: '全年一價',
    ratio: (n) => `${n} 倍`,
    seasonPair: (cheap, dear) => `${cheap} 月／${dear} 月`,
    partial: (from, to) => `這個房型的來源只公布 ${from} 到 ${to} 月。`,
    flatNote: '這個房型全年一價，不分日期與季節。',
    colourNote: '深色是最便宜的月份，紅色是最貴的。',
    tooltip: (year, month, low, high) => `${year} 年 ${month} 月：${low} – ${high}`,
    source: (unpriced) => ({
      before: '每室每晚、2 位大人。整理自',
      link: 'CASTEL 的逐月費率表',
      after: `，是二手來源；官方只逐日標價，沒有發布月費率。10 到 12 月為 2025 年價格。另有 ${unpriced} 種房型只公布起價。`,
    }),
  },
  ja: {
    heading: '月別の料金レンジ',
    intro:
      '横棒 1 本がその月の「もっとも安い日」から「もっとも高い日」までです。棒の位置で季節、棒の長さで同じ月のなかで日付がどれだけ効くかが分かります。客室タイプを選ぶと一年分が表示されます。',
    panelHeading: '季節：底値だけを見ると読み違える',
    panelIntro: (types) =>
      `12 か月分のデータが揃う ${types} タイプについて、それぞれ「自分の年間最安の 1 日」を 100 として揃えたうえで平均しました。棒の左端がその月の最安日、右端が最高日。高さで高いかどうか、長さで日付選びの重要度が分かります。`,
    bargain: (months, safest) =>
      `${months}は年間最安の日を持ちますが、閑散期ではありません。底値は年間最低でも、天井は ${safest} よりかなり高い。夏休みはこの形です。連休と週末が高く、その間に特別に安い日がはさまっています。`,
    safest: (month, pct, worst, worstPct) =>
      `月を通して本当に安いのは ${month} です。天井が年間最低（+${pct}%）で、日付を選ぶ必要があまりありません。もっとも避けるべきは ${worst} で、最高日は +${worstPct}% に届きます。`,
    flattest: (month, pct, swingiest) =>
      `${month} は「どれを選んでも同じ」月です。月内の振れ幅が年間最小である一方、底値がすでに +${pct}%。つまり安い日を選ぶ余地がありません。${swingiest} は逆に振れ幅が年間最大で、日付のために日程を動かす価値があります。`,
    roomLabel: '客室タイプ',
    stats: {
      low: ['年間最安', 'もっとも安い日'],
      high: ['年間最高', 'もっとも高い日'],
      ratio: ['最高／最安', '同じ部屋での倍率'],
      season: ['最安／最高', '月で見る'],
    },
    monthLabel: (m) => `${m} 月`,
    flatRatio: '通年同額',
    flatSeason: '通年一律',
    ratio: (n) => `${n} 倍`,
    seasonPair: (cheap, dear) => `${cheap} 月／${dear} 月`,
    partial: (from, to) => `このタイプは出典が ${from}〜${to} 月しか公開していません。`,
    flatNote: 'このタイプは通年一律で、日付や季節で変わりません。',
    colourNote: '濃い色がもっとも安い月、赤がもっとも高い月です。',
    tooltip: (year, month, low, high) => `${year} 年 ${month} 月：${low} – ${high}`,
    source: (unpriced) => ({
      before: '1 室 1 泊・大人 2 名。出典は',
      link: 'CASTEL の月別料金表',
      after: `で、二次情報です。公式は日別にしか料金を出しておらず、月別の料金表は公開していません。10〜12 月は 2025 年の価格。ほかに ${unpriced} タイプは最低料金のみの公開です。`,
    }),
  },
  en: {
    heading: 'Rates by month',
    intro:
      'Each bar runs from that month’s cheapest date to its dearest. The bar’s position shows the season; its length shows how much the date matters within the month. Pick a room type to see its whole year.',
    panelHeading: 'Season: reading only the floor misleads',
    panelIntro: (types) =>
      `The ${types} room types with a full twelve months, each indexed against its own cheapest date of the year as 100, then averaged. The left end of each bar is that month’s cheapest date, the right end its dearest. Height tells you how expensive; length tells you how much the date matters.`,
    bargain: (months, safest) =>
      `${months} hold the cheapest dates of the year, but they are not low season. Their floor is the year’s lowest while their ceiling sits well above ${safest}. That is the shape of a school holiday: expensive weekends and public holidays with a few unusually cheap days in between.`,
    safest: (month, pct, worst, worstPct) =>
      `The month that is genuinely cheap throughout is ${month}, whose ceiling is the year’s lowest at +${pct}%, so the date barely matters. The one to avoid is ${worst}, where the dearest date reaches +${worstPct}%.`,
    flattest: (month, pct, swingiest) =>
      `${month} is the “whichever you pick” month: the smallest spread of the year, but on a floor already +${pct}%, so there are no cheap days to choose. ${swingiest} is the opposite, with the widest spread of the year, which makes shifting your dates worth it.`,
    roomLabel: 'Room type',
    stats: {
      low: ['Year’s low', 'Cheapest date'],
      high: ['Year’s high', 'Dearest date'],
      ratio: ['High / low', 'Multiple for one room'],
      season: ['Cheapest / dearest', 'By month'],
    },
    monthLabel: (m) => ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][m - 1]!,
    flatRatio: 'Flat all year',
    flatSeason: 'One rate all year',
    ratio: (n) => `${n}×`,
    seasonPair: (cheap, dear) =>
      `${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][cheap - 1]} / ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][dear - 1]}`,
    partial: (from, to) => `The source only publishes months ${from} to ${to} for this type.`,
    flatNote: 'This type charges one rate all year, regardless of date or season.',
    colourNote: 'Dark marks the cheapest month, red the dearest.',
    tooltip: (year, month, low, high) =>
      `${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][month - 1]} ${year}: ${low} – ${high}`,
    source: (unpriced) => ({
      before: 'Per room per night for two adults, compiled from',
      link: 'CASTEL’s month-by-month rate tables',
      after: `, a secondary source: the hotel only prices by date and publishes no monthly table. October to December are 2025 rates. A further ${unpriced} room types publish only a starting price.`,
    }),
  },
};

export const season = (locale: Locale): SeasonCopy => SEASON[locale];
