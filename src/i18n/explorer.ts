import type { Locale } from './config';

/** Copy for the room finder, the bed table and the floor plan. */
export interface ExplorerCopy {
  heading: string;
  intro: (types: number) => string;
  typeCount: (n: number) => string;
  filters: { category: string; view: string; capacity: string; features: string; all: string };
  /** Capacity choices are built from the data, since hotels differ in ceiling. */
  capacityAny: string;
  capacityAtLeast: (n: number) => string;
  capacityExact: (n: number) => string;
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
  /** Copy for the plan that shows which way each window faces. */
  harbourPlan: {
    heading: string;
    intro: (rooms: number, harbour: number) => string;
    floors: string;
    floorLabel: (floor: number) => string;
    lookupLabel: string;
    lookupPlaceholder: string;
    lookupSubmit: string;
    lookupIncomplete: string;
    lookupMissing: string;
    tapHint: string;
    readTitle: string;
    readBody: string;
    unlisted: string;
    svgTitle: string;
    svgDesc: string;
    note: (rooms: number, enumerated: number) => string;
    zones: { harbour: string; piazza: string; chapel: string };
    facing: { inland: string; canal: string; entrance: string };
    shows: { full: string; partial: string; piazza: string; none: string };
    fields: { sees: string; shows: string; area: string; capacity: string };
    detail: { ambiguous: string; balcony: string; fromPlan: string; plain: string };
    balconyLegend: string;
    sourceLabel: string;
    connectingHeading: string;
    connectingIntro: (pairs: number) => string;
    connectingEmphasis: string;
    connectingTail: string;
  };
}

const zhHant: ExplorerCopy = {
  heading: '房型探索器',
  intro: (types) =>
    `${types} 種房型，用你在意的條件篩掉不適合的。價格區間是公開費率表裡該房型的全年最低到最高，也就是最便宜與最貴的那一天。`,
  typeCount: (n) => `${n} 種房型`,
  filters: { category: '分類', view: '景觀', capacity: '入住人數', features: '必要條件', all: '全部' },
  capacityAny: '不限',
  capacityAtLeast: (n) => `${n} 人以上`,
  capacityExact: (n) => `${n} 人`,
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
  harbourPlan: {
    heading: '逐間客房位置圖：窗戶朝哪一邊',
    intro: (rooms, harbour) =>
      `${rooms} 間客房畫在 2 到 5 樓的平面上，其中 ${harbour} 間的窗戶朝地中海港灣那一側。點任一間房，看它看得到什麼、看不看得到水上表演。`,
    floors: '樓層',
    floorLabel: (floor) => `${floor} 樓`,
    lookupLabel: '查房號',
    lookupPlaceholder: '例如 5353',
    lookupSubmit: '找房間',
    lookupIncomplete: '請輸入完整 4 位房號。',
    lookupMissing: '這張圖上找不到這個號碼。請確認第一碼是 2 到 5 的樓層。',
    tapHint: '點圖上任一間房',
    readTitle: '第一碼樓層，後三碼位置',
    readBody:
      '例如 5353 是 5 樓、位置 353。同一組後三碼在不同樓層是垂直堆疊的同一個位置，所以窗戶朝向一樣，但販售的房型可能不同。',
    unlisted: '本站未收錄房型（威尼斯／托斯卡納側）',
    svgTitle: '東京迪士尼海洋觀海景大飯店逐間客房位置圖',
    svgDesc:
      '飯店像一個環抱地中海港灣的馬蹄形。左上翼與上方走廊面向米老鼠廣場，中央直廊與左下翼面向港灣，右側與右下翼背對水面。每個多邊形是一間客房。',
    note: (rooms, enumerated) =>
      `走廊走向與每間房的順序、朝向依來源的手繪平面圖描繪，房號逐格核對過；其中 ${enumerated} 間能對到官方房型（來源逐間列號的海港區），其餘畫出位置與朝向但不標房型。走廊長度按房間數換算、全館同一節距，所以同一個位置在各樓層上下對齊，佔兩格的房型（例如 5 樓的頂樓陽台客房）也會畫成兩倍寬。但這不是實測圖：角度是照手繪圖目測的，面積也沒有反映——60 m² 的地中海客房和 37 m² 的精緻客房畫起來一樣寬。全圖 ${rooms} 格，手機請左右滑動。`,
    zones: { harbour: '地中海港灣', piazza: '米老鼠廣場', chapel: '教堂' },
    facing: { inland: '朝內側（看不到水面）', canal: '宮殿運河側', entrance: '園區入口側' },
    shows: {
      full: '水上表演看得到完整水面',
      partial: '看得到一部分港灣',
      piazza: '看廣場與街景，水上表演看位置運氣',
      none: '看不到水上表演',
    },
    fields: { sees: '窗外', shows: '水上表演', area: '面積', capacity: '人數上限' },
    detail: {
      ambiguous:
        '來源按景觀分級列出這批房號，官方現在按定員分成兩種版本，所以格局與景觀確定，定員版本無法確定。',
      balcony: '這間可以走到戶外陽台，離水面比隔著窗戶更近。',
      fromPlan:
        '這個位置在來源的平面圖上標為景隅景觀，但文章的房號清單沒有列出它——位置來自圖，不是逐間清單。',
      plain: '官方不接受指定房號，這張圖適合拿到房卡後判讀窗戶朝向。',
    },
    balconyLegend: '同一個後三碼在各樓層是同一面窗戶',
    sourceLabel: '平面圖與房號來源：dhoteloo',
    connectingHeading: '可以連通的房型組合',
    connectingIntro: (pairs) =>
      `同一份調查列出海港區 ${pairs} 組能打通成連通房的分類。這是分類層級的清單，不是特定房號；連通房也不是訂房選項——必須`,
    connectingEmphasis: '同時訂下兩種房型',
    connectingTail: '，再打電話向飯店提出希望，而且仍然不保證安排得到。',
  },
};

const ja: ExplorerCopy = {
  heading: '客室を絞り込む',
  intro: (types) =>
    `${types} タイプの客室を、気になる条件で絞り込めます。料金の幅は公開されている料金表での年間の最安値から最高値、つまりもっとも安い日ともっとも高い日です。`,
  typeCount: (n) => `${n} タイプ`,
  filters: { category: 'カテゴリー', view: '眺望', capacity: '人数', features: '必須条件', all: 'すべて' },
  capacityAny: '指定なし',
  capacityAtLeast: (n) => `${n} 名以上`,
  capacityExact: (n) => `${n} 名`,
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
  harbourPlan: {
    heading: '客室配置図：窓がどちらを向くか',
    intro: (rooms, harbour) =>
      `2〜5 階の平面に ${rooms} 室を配置しています。うち ${harbour} 室はメディテレーニアンハーバー側。どの部屋をタップしても、窓の外と水上ショーが見えるかが分かります。`,
    floors: '階',
    floorLabel: (floor) => `${floor} 階`,
    lookupLabel: '部屋番号を調べる',
    lookupPlaceholder: '例：5353',
    lookupSubmit: '調べる',
    lookupIncomplete: '4 桁の部屋番号を入力してください。',
    lookupMissing: 'この図に該当がありません。1 桁目が 2〜5 の階かご確認ください。',
    tapHint: '図の客室をタップ',
    readTitle: '1 桁目が階、下 3 桁が位置',
    readBody:
      '5353 なら 5 階の位置 353。同じ下 3 桁は各階で垂直に重なる同じ位置なので、窓の向きは同じでも販売されるタイプは階で変わることがあります。',
    unlisted: '本サイト未収録（ヴェネツィア／トスカーナ側）',
    svgTitle: '東京ディズニーシー・ホテルミラコスタ 客室配置図',
    svgDesc:
      'ホテルはメディテレーニアンハーバーを抱くような馬蹄形です。左上の翼と上の廊下はミッキー広場に面し、中央の縦廊下と左下の翼はハーバーに面し、右側と右下の翼は水面に背を向けます。多角形 1 つが 1 室です。',
    note: (rooms, enumerated) =>
      `廊下の向きと各室の順序・向きは出典の手描き配置図をなぞり、部屋番号は 1 マスずつ照合しています。うち ${enumerated} 室は公式の客室タイプに対応（出典が 1 室ずつ挙げているポルト側）、残りは位置と向きのみを示しタイプは記載していません。廊下の長さは部屋数から換算し、館内で同じピッチにしているため、同じ位置は各階で上下に重なり、2 マス分を占めるタイプ（5 階のテラスルームなど）は倍の幅で描かれます。ただし実測図ではありません。角度は手描き図を目で読んだもので、面積も反映されません——60 m² のハーバールームと 37 m² のスーペリアルームは同じ幅です。全 ${rooms} マス。スマートフォンでは横にスクロールしてください。`,
    zones: { harbour: 'メディテレーニアンハーバー', piazza: 'ミッキー広場', chapel: 'チャペル' },
    facing: { inland: '内側向き（水面は見えない）', canal: 'パラッツォ・カナル側', entrance: 'パーク入口側' },
    shows: {
      full: '水上ショーの水面が全部見える',
      partial: 'ハーバーの一部が見える',
      piazza: '広場と街並み。水上ショーは位置次第',
      none: '水上ショーは見えない',
    },
    fields: { sees: '窓の外', shows: '水上ショー', area: '広さ', capacity: '定員' },
    detail: {
      ambiguous:
        '出典は眺望の段階でこの番号群を挙げ、公式は現在それを定員で 2 種類に分けています。間取りと眺望は確定、定員版は特定できません。',
      balcony: 'この客室は屋外に出られます。窓越しよりも水面が近く感じられます。',
      fromPlan:
        'この位置は出典の配置図でパーシャルビューと記されていますが、記事の部屋番号一覧には載っていません。位置は図によるもので、1 室ずつの一覧ではありません。',
      plain: '公式は部屋番号の指定を受け付けません。この図はカードキーを受け取ったあと、窓の向きを読むためのものです。',
    },
    balconyLegend: '同じ下 3 桁は各階で同じ窓の位置',
    sourceLabel: '配置図と部屋番号の出典：dhoteloo',
    connectingHeading: 'コネクティングできる組み合わせ',
    connectingIntro: (pairs) =>
      `同じ調査が、ポルト側でコネクティングできる ${pairs} 組のカテゴリーを挙げています。これはカテゴリー単位の一覧で、特定の部屋番号ではありません。コネクティングは予約画面の選択肢でもなく、`,
    connectingEmphasis: '2 つのタイプを同時に予約',
    connectingTail: 'したうえでホテルに電話で希望を伝える必要があり、それでも確約はされません。',
  },
};

const en: ExplorerCopy = {
  heading: 'Room finder',
  intro: (types) =>
    `All ${types} room types, filtered by what you care about. The price range runs from that room's cheapest date of the year to its dearest, according to the published rate table.`,
  typeCount: (n) => `${n} room type${n === 1 ? '' : 's'}`,
  filters: { category: 'Category', view: 'View', capacity: 'Guests', features: 'Must have', all: 'All' },
  capacityAny: 'Any',
  capacityAtLeast: (n) => `${n} or more`,
  capacityExact: (n) => `${n}`,
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
  harbourPlan: {
    heading: 'Room-by-room plan: which way each window faces',
    intro: (rooms, harbour) =>
      `${rooms} rooms drawn on the plans of floors 2 to 5, ${harbour} of them with windows on the Mediterranean Harbor side. Tap any room to see what it looks at and whether a water show is visible from it.`,
    floors: 'Floor',
    floorLabel: (floor) => `Floor ${floor}`,
    lookupLabel: 'Look up a room number',
    lookupPlaceholder: 'e.g. 5353',
    lookupSubmit: 'Find it',
    lookupIncomplete: 'Enter all four digits.',
    lookupMissing: 'Not on this plan. Check that the first digit is a floor from 2 to 5.',
    tapHint: 'Tap a room on the plan',
    readTitle: 'First digit the floor, last three the position',
    readBody:
      '5353 is position 353 on the fifth floor. The same last three digits stack vertically, so the window faces the same way on every floor even where the room type sold there changes.',
    unlisted: 'Not catalogued here (Venice or Tuscany side)',
    svgTitle: 'Tokyo DisneySea Hotel MiraCosta room-by-room plan',
    svgDesc:
      'The hotel is a horseshoe wrapped around Mediterranean Harbor. The north-west wing and the upper corridor face Piazza Topolino, the central spine and the south-west wing face the harbour, and the eastern and south-eastern wings turn their backs to the water. Each polygon is one guest room.',
    note: (rooms, enumerated) =>
      `Corridor directions and each room’s order and orientation are traced from the source’s hand-drawn plans, with every room number checked cell by cell. ${enumerated} of them map to an official room type — the Porto Paradiso side, the one enumerated room by room — while the rest show position and orientation without a type. Corridor lengths come from room counts at one pitch for the whole building, so a position stacks across floors and a room covering two positions, like a fifth-floor Terrace Room, is drawn twice as wide. It is still not a measured drawing: the angles were read off the source by eye, and floor area is not represented — a 60 m² Harbor Room is drawn as wide as a 37 m² Superior. ${rooms} cells in total; scroll sideways on a phone.`,
    zones: { harbour: 'Mediterranean Harbor', piazza: 'Piazza Topolino', chapel: 'Chapel' },
    facing: { inland: 'Faces inland (no water)', canal: 'Palazzo Canals side', entrance: 'Park entrance side' },
    shows: {
      full: 'Sees the whole water stage',
      partial: 'Sees part of the harbour',
      piazza: 'Piazza and streets; a water show depends on the position',
      none: 'No view of a water show',
    },
    fields: { sees: 'Looks at', shows: 'Water show', area: 'Area', capacity: 'Sleeps' },
    detail: {
      ambiguous:
        'The source lists these numbers by view level while the hotel now splits them by occupancy, so the layout and view are certain and the occupancy version is not.',
      balcony: 'This room opens onto outdoor space, which puts you closer to the water than glass does.',
      fromPlan:
        'The source’s plan marks this position as Partial View, but its room-number lists never include it — the position comes from the drawing rather than the enumerated lists.',
      plain: 'The hotel accepts no request for a specific room, so this plan is for reading which way your window faces after check-in.',
    },
    balconyLegend: 'The same last three digits are the same window on every floor',
    sourceLabel: 'Plan and room numbers: dhoteloo',
    connectingHeading: 'Pairs that can be connected',
    connectingIntro: (pairs) =>
      `The same survey lists ${pairs} pairs of categories that can be connected on the Porto side. It is a list of categories rather than specific rooms, and connecting is not an option in the booking form: you have to `,
    connectingEmphasis: 'reserve both room types together',
    connectingTail: ', then telephone the hotel with the request — and even then it is not guaranteed.',
  },
};

const COPY: Record<Locale, ExplorerCopy> = { 'zh-hant': zhHant, ja, en };
export const explorer = (locale: Locale): ExplorerCopy => COPY[locale];
