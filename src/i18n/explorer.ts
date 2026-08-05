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
  /** Shown where no source publishes a rate for the type. */
  unpriced: string;
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
  /** Copy for the measured site plan: the footprint and the water it wraps. */
  site: {
    title: string;
    desc: string;
    harbour: string;
    lagoon: string;
    frontage: string;
    hotel: string;
    /** Credit for the aerial photography, which its licence requires. */
    credit: string;
    scaleBar: (metres: number) => string;
    caption: string;
  };
  /** Copy for the plan that shows which way each window faces. */
  harbourPlan: {
    heading: string;
    intro: (rooms: number, harbour: number) => string;
    floors: string;
    floorLabel: (floor: number) => string;
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
  unpriced: '未公布',
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
  site: {
    title: '東京迪士尼海洋觀海景大飯店與地中海港灣的實測位置',
    desc:
      '依實際比例的基地圖。飯店輪廓呈馬蹄形環抱地中海港灣，港灣在西南側，東南另有一片水域。',
    credit: '底圖航照：',
    harbour: '地中海港灣',
    lagoon: '宮殿運河',
    frontage: '客房面向港灣的一段',
    hotel: '觀海景大飯店',
    scaleBar: (m) => `${m} 公尺`,
    caption:
      '這是全頁唯一按實際比例、可以量距離的圖。飯店輪廓 294 × 235 公尺、約 20,100 平方公尺；港灣約 178,000 平方公尺。深色是客房面向港灣的兩段立面：南段 108 公尺，離水面只有 5 到 25 公尺；西北段 112 公尺，離水面 24 到 68 公尺——中間那段差距就是米老鼠廣場的深度。輪廓與水域取自 ',
  },
  harbourPlan: {
    heading: '逐間客房位置圖：窗戶朝哪一邊',
    intro: (rooms, harbour) =>
      `${rooms} 間客房畫在 2 到 5 樓的平面上，其中 ${harbour} 間的窗戶朝地中海港灣那一側。點任一間房，看它看得到什麼、看不看得到水上表演。`,
    floors: '樓層',
    floorLabel: (floor) => `${floor} 樓`,
    tapHint: '點圖上任一間房',
    readTitle: '第一碼樓層，後三碼位置',
    readBody:
      '例如 5353 是 5 樓、位置 353。同一組後三碼在不同樓層是垂直堆疊的同一個位置，所以窗戶朝向一樣，但販售的房型可能不同。',
    unlisted: '本站未收錄房型（威尼斯／托斯卡納側）',
    svgTitle: '東京迪士尼海洋觀海景大飯店逐間客房位置圖',
    svgDesc:
      '飯店像一個環抱地中海港灣的馬蹄形。左上翼與上方走廊面向米老鼠廣場，中央直廊與左下翼面向港灣，右側與右下翼背對水面。每個多邊形是一間客房。',
    note: (rooms, enumerated) =>
      `底圖是實景航照圖（縮放層級 19，1 像素 0.24 公尺，比例尺 100 公尺，是浦安一帶目前最清晰的公開影像），不是手繪的形狀，所以海港、廣場、街屋都是照片本身。上面每一間房的形狀來自來源的手繪平面圖：每一面客房外牆都從 4 樓那張圖描下來——用圖上墨線自己圍出的輪廓，不是用眼睛量的——然後整張圖用一次相似變換放到實測座標上，只縮放、旋轉、平移，不拉伸，所以來源圖的比例完整保留，要遷就的是底下的照片，不是反過來。之前是反過來的：牆取自實測輪廓，來源圖只提供「這一段有幾間房」，再把牆按房間數均分。只要房間數少於圖上實際的開間數，這種做法就會錯，而港灣臂正好少了六格——4369 與 4371 是三格寬的觀海景套房，另外兩格是轉折處的純牆楔形。用 21 而不是 27 去除，那一臂每間房就寬了四分之一，誤差一路累積，末端的 4373、4375 最後畫到建物尖端之外將近 20 公尺。實測輪廓現在負責的是尺度與方位，也是事後的檢查。來源圖與 OpenStreetMap 輪廓共同指認的十個轉角上，這次的變換平均差 2.4 公尺、最大 5.4 公尺，而建物有 210 公尺長。換算下來，八面牆每間房的面寬是 3.85 到 4.97 公尺，對照 37 平方公尺客房在 9.8 公尺深時的 4.3 公尺——八個各自獨立的判讀同時對上一份它們沒有被校準過的實測資料，而且沒有為了對上而調整任何數字。第二道檢查是逐格對：來源圖的墨線是封閉的，每一格客房都是墨線圍起來的一塊白，可以完全不參照上述任何步驟直接取出來；把 4 樓那 165 格各自配上這張圖畫得最近的一格，中位數差 0.9 公尺、九成在 2.2 公尺以內，差得更多的都是圖上的走廊、樓梯與教堂，本來就沒有對應的客房格。房深也是量圖得到的：橫切九個翼，每次都在 53 像素處遇到這一排的背牆、再過 12 像素遇到走廊另一側，換算成 9.8 公尺與 2.2 公尺，整個翼 21.8 公尺寬。逐格重讀來源圖也改正了四筆開間數：港灣臂 27 格而不是 21；南向走廊 16 格，其中 4101 這間套房佔兩格、上方兩組電梯廳佔四格，這是 4306 正對 4305 的原因；西北翼 18 格，折角的楔形跨兩格、轉角的 4125 佔兩格；北向走廊的房間從第二格才開始，第一格屬於西北翼自己的楔形。東南翼原本還站錯了牆：來源圖把它的十二格畫在東北面、4402 在最前面，另一排的十格與兩組電梯廳在後面。從南向走廊轉出來的 4330 到 4334 三間，改成站在來源圖給它們的那一小段南向外牆上，不再沿港灣臂的牆往回延伸——建物在那裡退了一階，原本差了 7 公尺。一條走廊兩側的房間共用同一組開間，那本來就是同一批結構開間從走廊兩邊看；電梯廳、樓梯間或酒廊就寫成空格。走廊內側那一排離牆較遠，牆往它轉的時候可站的長度就短一截，來源圖畫的是它就地收攏、不留缺口：4344 之後直接是 4348、4358 之後直接是 4362。還不忠實的地方：內側那一排自己的背牆沒有描，統一畫成一間標準房的深度；來源圖把翼畫成 21.8 公尺寬、實測是 24.4 公尺，這裡以來源圖為準，所以格子會比照片上的屋頂略窄一圈。全圖 ${rooms} 格互不重疊，每一格的中心都落在實測輪廓內，其中 ${enumerated} 間能對到官方房型。手機請左右滑動。`,
    zones: { harbour: '這一側是地中海港灣', piazza: '這一側是米老鼠廣場', chapel: '教堂' },
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
  unpriced: '非公開',
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
  site: {
    title: '東京ディズニーシー・ホテルミラコスタとメディテレーニアンハーバーの実測配置',
    desc:
      '実際の縮尺による敷地図。ホテルの輪郭は馬蹄形にメディテレーニアンハーバーを抱き、ハーバーは南西側、南東にもう一つの水面があります。',
    credit: '航空写真の出典：',
    harbour: 'メディテレーニアンハーバー',
    lagoon: 'パラッツォ・カナル',
    frontage: 'ハーバーに面する客室の立面',
    hotel: 'ホテルミラコスタ',
    scaleBar: (m) => `${m} m`,
    caption:
      'このページで唯一、実際の縮尺で距離を測れる図です。輪郭は 294 × 235 m・約 20,100 m²、ハーバーは約 178,000 m²。濃い線はハーバーに面する客室立面の 2 区間で、南側は 108 m で水際から 5〜25 m、北西側は 112 m で 24〜68 m。その差がミッキー広場の奥行きです。輪郭と水面の出典は ',
  },
  harbourPlan: {
    heading: '客室配置図：窓がどちらを向くか',
    intro: (rooms, harbour) =>
      `2〜5 階の平面に ${rooms} 室を配置しています。うち ${harbour} 室はメディテレーニアンハーバー側。どの部屋をタップしても、窓の外と水上ショーが見えるかが分かります。`,
    floors: '階',
    floorLabel: (floor) => `${floor} 階`,
    tapHint: '図の客室をタップ',
    readTitle: '1 桁目が階、下 3 桁が位置',
    readBody:
      '5353 なら 5 階の位置 353。同じ下 3 桁は各階で垂直に重なる同じ位置なので、窓の向きは同じでも販売されるタイプは階で変わることがあります。',
    unlisted: '本サイト未収録（ヴェネツィア／トスカーナ側）',
    svgTitle: '東京ディズニーシー・ホテルミラコスタ 客室配置図',
    svgDesc:
      'ホテルはメディテレーニアンハーバーを抱くような馬蹄形です。左上の翼と上の廊下はミッキー広場に面し、中央の縦廊下と左下の翼はハーバーに面し、右側と右下の翼は水面に背を向けます。多角形 1 つが 1 室です。',
    note: (rooms, enumerated) =>
      `下地は実際の航空写真です（ズーム 19、1 px が 0.24 m、スケールバー 100 m。浦安周辺で公開されている最も精細な写真です）。ハーバー・広場・街並みは描いたものではなく写真そのものです。その上の客室の形は出典の手描き図から取っています。客室が面する外壁はすべて 4 階の図から写し取り、目分量ではなく図のインクが囲む輪郭そのものを使いました。そして図全体を一つの相似変換で実測座標に載せます。拡大・回転・平行移動だけで引き伸ばしはしないので、出典図の比率はそのまま残り、合わせに行くのは下の写真の側です。以前は逆でした。壁は実測の輪郭から取り、出典図は「この区間に何室あるか」だけを提供して、壁を室数で等分していました。室数が図の実際の開口数より少なければこの方法は必ず狂います。ハーバー側の翼はちょうど 6 区画ぶん足りませんでした。4369 と 4371 は 3 区画ぶんの幅があるミラコスタスイートで、ほかの 2 区画は折れ曲がりが残す壁だけの楔形です。27 ではなく 21 で割ったために、その翼の客室はどれも 4 分の 1 広くなり、誤差が積み上がって、末端の 4373 と 4375 は建物の先端から 20 m 近く外へ出ていました。実測の輪郭が受け持つのは寸法と方位、そして後からの検算です。出典図と OpenStreetMap の輪郭がともに示す 10 か所の角で、今回の変換の差は平均 2.4 m・最大 5.4 m。建物は 210 m あります。その縮尺で 8 面の壁それぞれの 1 室あたり間口は 3.85〜4.97 m となり、37 m² の客室が奥行き 9.8 m のときの 4.3 m と合います。互いに独立した 8 つの読み取りが、それに合わせて調整していない実測と一致したということです。検算はもう一つあります。出典図のインクは閉じているので、客室の区画はどれもインクが囲む白い領域として、ここまでの手順を一切参照せずに取り出せます。4 階のその 165 区画を、この図が描く最も近い区画とそれぞれ対応させると、差は中央値 0.9 m、9 割が 2.2 m 以内。それより離れるのは図の廊下・階段・チャペルで、対応する客室の区画がもともと存在しないものです。奥行きも図の実測から取りました。9 つの翼を横断すると、いずれも 53 px でその列の背面の壁、さらに 12 px 先で廊下の反対側に達します。縮尺に直すと 9.8 m と 2.2 m、翼の幅は 21.8 m です。区画を一つずつ読み直したことで、開口数の誤りも 4 か所直りました。ハーバー側の翼は 21 ではなく 27 区画。南側廊下は 16 区画で、スイートの 4101 が 2 区画、上のエレベーターホール 2 組が 4 区画を占めます。これが 4306 が 4305 の正面に来る理由です。北西の翼は 18 区画で、折れ曲がりの楔形が 2 区画にまたがり、角の 4125 が 2 区画を占めます。北側廊下の客室は 2 区画目から始まり、1 区画目は北西の翼自身の楔形です。南東の翼は立っている壁そのものが違っていました。出典図はその 12 区画を北東側の面に、4402 を先頭にして描き、もう一方の列の 10 区画とエレベーターホール 2 組はその後ろにあります。南側廊下から角を回る 4330〜4334 の 3 室は、ハーバー側の壁を逆にたどるのをやめ、出典図がそこに与えている短い南向きの面に立たせました。建物はそこで一段下がっており、以前は 7 m ずれていました。一つの廊下の両側の客室は同じ区画を共有します。もともと同じ構造開口を廊下の両側から見たものだからです。エレベーターホール・階段室・ラウンジは空欄として書き出します。廊下の内側の列は壁から遠いので、壁がそちらへ曲がるぶん立てる長さが短くなり、出典図はそれをその場で詰めて隙間を作りません。4344 の次は 4348、4358 の次は 4362 です。まだ忠実でないところ。内側の列自身の背面の壁は写し取っておらず、標準的な客室の奥行きで描いています。出典図は翼を 21.8 m 幅で描き、実測は 24.4 m ですが、ここでは出典図を採るので、区画は写真の屋根よりわずかに内側に収まります。図の ${rooms} 区画はどれも重ならず、中心はすべて実測の輪郭の内側にあり、そのうち ${enumerated} 室が公式の客室タイプに対応します。スマートフォンでは横にスクロールしてください。`,
    zones: { harbour: 'この側がメディテレーニアンハーバー', piazza: 'この側がミッキー広場', chapel: 'チャペル' },
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
  unpriced: 'Not published',
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
  site: {
    title: 'Tokyo DisneySea Hotel MiraCosta and Mediterranean Harbor, measured',
    desc:
      'A site plan at true scale. The hotel’s footprint curls around Mediterranean Harbor, which lies to the south-west, with a second body of water to the south-east.',
    credit: 'Imagery: ',
    harbour: 'Mediterranean Harbor',
    lagoon: 'Palazzo Canals',
    frontage: 'Harbour-facing guest-room frontage',
    hotel: 'Hotel MiraCosta',
    scaleBar: (m) => `${m} m`,
    caption:
      'The one figure on this page drawn at true scale, where a distance can be measured. The footprint is 294 by 235 m over about 20,100 m²; the harbour about 178,000 m². The dark lines are the two stretches of guest-room frontage that face it: the southern one runs 108 m at 5 to 25 m from the water, the north-western one 112 m at 24 to 68 m — and the difference between them is the depth of Piazza Topolino. Outlines from ',
  },
  harbourPlan: {
    heading: 'Room-by-room plan: which way each window faces',
    intro: (rooms, harbour) =>
      `${rooms} rooms drawn on the plans of floors 2 to 5, ${harbour} of them with windows on the Mediterranean Harbor side. Tap any room to see what it looks at and whether a water show is visible from it.`,
    floors: 'Floor',
    floorLabel: (floor) => `Floor ${floor}`,
    tapHint: 'Tap a room on the plan',
    readTitle: 'First digit the floor, last three the position',
    readBody:
      '5353 is position 353 on the fifth floor. The same last three digits stack vertically, so the window faces the same way on every floor even where the room type sold there changes.',
    unlisted: 'Not catalogued here (Venice or Tuscany side)',
    svgTitle: 'Tokyo DisneySea Hotel MiraCosta room-by-room plan',
    svgDesc:
      'The hotel is a horseshoe wrapped around Mediterranean Harbor. The north-west wing and the upper corridor face Piazza Topolino, the central spine and the south-west wing face the harbour, and the eastern and south-eastern wings turn their backs to the water. Each polygon is one guest room.',
    note: (rooms, enumerated) =>
      `The base is aerial photography (zoom 19, one pixel to 0.24 m, with a 100 m bar — the sharpest imagery published over Urayasu) rather than shapes drawn by hand, so the harbour, the square and the streets are the photograph itself. The shape of every room on it is the source’s hand-drawn plan: each wall the rooms face is traced off the fourth-floor sheet, taken from the outline the drawing’s own ink encloses rather than read off it by eye, and the whole drawing is then placed on the surveyed frame by one similarity — scaled, turned and moved, never stretched — so it keeps its own proportions and the photograph underneath is what has to be met. It used to be the other way about. The walls came from the surveyed outline and the drawing gave only how many rooms stood on each, the wall then divided by that count. That is wrong wherever the count is short of the bays the drawing draws, and on the harbour arm it was short by six: 4369 and 4371 are MiraCosta Suites three bays wide apiece, and two more bays are the wedges of plain wall its bends leave. Divided by twenty-one instead of twenty-seven, every room on that arm came out a quarter too wide, and the error accumulated until 4373 and 4375 stood almost twenty metres beyond the point of the building. The survey now carries the size and the bearing, and it is the check afterwards. Over the ten corners the drawing and the OpenStreetMap outline both name, the fit is out by 2.4 m on average and 5.4 m at worst, on a building 210 m across. At that scale a room has 3.85 to 4.97 m of frontage on each of the eight walls, against the 4.3 m a 37 m² room 9.8 m deep has — eight independent readings agreeing with a survey none of them was calibrated against, and nothing fitted to make them. The second check is cell by cell. The drawing’s own cells can be had without reference to any of that — its ink is closed, so each cell is a white region shut in by it — and paired with the nearest cell this figure draws, the fourth floor’s 165 of them come out 0.9 m apart at the median and 2.2 m at the ninth decile; the few further out are the drawing’s corridors, stairs and chapel, which have no cell of the figure to pair with at all. The depth is measured off the drawing too: a line cast across each of nine wings meets the row’s back wall at 53 px and the far side of the corridor 12 px later, which the fit makes 9.8 m and 2.2 m, for a wing 21.8 m across. Reading the sheet’s bays one by one also settled four counts that were out. The harbour arm has twenty-seven bays, not twenty-one. The south spine has sixteen, the suite 4101 taking two of them and the two lift lobbies above it four, which is what puts 4306 opposite 4305. The north-west wing has eighteen, the wedge at its dog-leg spanning two and 4125 at the corner taking two. The north spine’s rooms begin at its second bay, the first belonging to that wing’s own wedge. The south-eastern wing was also standing on the wrong wall: the drawing puts its twelve bays on the north-eastern face with 4402 at the head of them, and the other row’s ten bays and two lift lobbies behind. And the three rooms that turn the corner out of the south spine, 4330 to 4334, now stand on the short south face the drawing gives them instead of being carried back along the arm’s wall, which had them seven metres out — the building steps there. Both sides of a corridor share the same bays, because they are the same structural bays seen from either side of it, and a lift lobby, a stair core or a lounge is written out as a gap. The row set back from the wall has less wall to stand on wherever the wall turns towards it, and the drawing closes it up rather than leaving a hole: 4344 is followed by 4348 and 4358 by 4362. What is still not faithful: that inner row’s own back wall is not traced, so it is drawn a standard room deep; and the drawing makes a wing 21.8 m across where the survey measures 24.4, and the drawing wins here, so the cells sit a little inside the roofs in the photograph. All ${rooms} cells overlap none of their neighbours and every one has its centre inside the surveyed outline; ${enumerated} of them match an official room type. On a phone, scroll sideways.`,
    zones: { harbour: 'Mediterranean Harbor is on this side', piazza: 'Piazza Topolino is on this side', chapel: 'Chapel' },
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
  /** Month labels, so this copy can also travel to the browser as a template. */
  seasonPair: (cheap: string, dear: string) => string;
  partial: (from: string, to: string) => string;
  flatNote: string;
  colourNote: string;
  tooltip: (year: string, month: string, low: string, high: string) => string;
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
    seasonPair: (cheap, dear) => `${cheap}／${dear}`,
    partial: (from, to) => `這個房型的來源只公布 ${from} 到 ${to}。`,
    flatNote: '這個房型全年一價，不分日期與季節。',
    colourNote: '深色是最便宜的月份，紅色是最貴的。',
    tooltip: (year, month, low, high) => `${year} 年 ${month}：${low} – ${high}`,
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
    seasonPair: (cheap, dear) => `${cheap}／${dear}`,
    partial: (from, to) => `このタイプは出典が ${from}〜${to} しか公開していません。`,
    flatNote: 'このタイプは通年一律で、日付や季節で変わりません。',
    colourNote: '濃い色がもっとも安い月、赤がもっとも高い月です。',
    tooltip: (year, month, low, high) => `${year} 年 ${month}：${low} – ${high}`,
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
    seasonPair: (cheap, dear) => `${cheap} / ${dear}`,
    partial: (from, to) => `The source only publishes ${from} to ${to} for this type.`,
    flatNote: 'This type charges one rate all year, regardless of date or season.',
    colourNote: 'Dark marks the cheapest month, red the dearest.',
    tooltip: (year, month, low, high) => `${month} ${year}: ${low} – ${high}`,
    source: (unpriced) => ({
      before: 'Per room per night for two adults, compiled from',
      link: 'CASTEL’s month-by-month rate tables',
      after: `, a secondary source: the hotel only prices by date and publishes no monthly table. October to December are 2025 rates. A further ${unpriced} room types publish only a starting price.`,
    }),
  },
};

export const season = (locale: Locale): SeasonCopy => SEASON[locale];
