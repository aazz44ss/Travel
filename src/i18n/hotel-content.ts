import type { Locale } from './config';

/**
 * The rest of the hotel dataset's prose in Japanese and English: facilities,
 * restaurants, guest benefits, bed notes, the FAQ and the social-media
 * observations. Keyed by the Chinese original's stable identifier — the item's
 * English name where one exists, otherwise its index — so the Chinese dataset
 * stays the single source of what exists and this file only supplies wording.
 */

type Pair = { ja: string; en: string };

/** Facilities, keyed by `nameEn` in the dataset. */
export const FACILITY_COPY: Record<
  string,
  { name: Pair; location: Pair; description: Pair; photoTip?: Pair }
> = {
  'Atrium Lobby': {
    name: { ja: 'アトリウムロビー', en: 'Atrium Lobby' },
    location: { ja: '2 階', en: '2nd floor' },
    description: {
      ja: '最上層まで抜けた吹き抜けに、シャンデリアが 2 基下がり、中央に噴水があります。チェックインを待つ時間そのものが行程の一部になります。',
      en: 'An atrium open to the top floor, with two chandeliers hanging down and a fountain in the middle. Waiting to check in is itself part of the itinerary.',
    },
    photoTip: {
      ja: '噴水の頂点にティンカーベルが立っています。シャンデリアの光を背景に下から狙うのが、このロビーの定番です。',
      en: 'Tinker Bell stands at the top of the fountain. Shooting upward with the chandelier light behind her is the classic shot here.',
    },
  },
  'Fantasia Court': {
    name: { ja: 'ファンタジア広場', en: 'Fantasia Court' },
    location: { ja: '3 階・ホテル正面エントランス', en: '3rd floor, main entrance' },
    description: {
      ja: '『ファンタジア』をテーマにした噴水広場。主役は魔法使いの弟子姿のミッキーと水を運ぶ箒です。電車で来ると一度も通らずに終わりがちな場所です。',
      en: 'A fountain plaza themed to Fantasia, starring Mickey as the sorcerer’s apprentice with the water-carrying brooms. Arriving by train, it is easy to never pass it.',
    },
    photoTip: {
      ja: 'シンデレラ城の裏にあった同じ魔法使いミッキーの像は撤去されたため、リゾート内で見られるのはここだけになりました。',
      en: 'The matching Sorcerer Mickey statue that stood behind Cinderella Castle has been removed, so this is the only one left in the resort.',
    },
  },
  'Alice Garden': {
    name: { ja: 'アリスの庭', en: 'Alice Garden' },
    location: { ja: '正面エントランスを出て左', en: 'Out the main entrance and left' },
    description: {
      ja: '『ふしぎの国のアリス』をテーマにした庭園。植栽がスペード、ハート、ダイヤ、クラブの形に刈られ、トランプの兵士とバラもあります。',
      en: 'A garden themed to Alice in Wonderland, with hedges clipped into spades, hearts, diamonds and clubs, plus card soldiers and roses.',
    },
    photoTip: {
      ja: 'ロビーから 1 分もかからず、ファンタジア広場とまとめて撮れます。',
      en: 'Under a minute from the lobby, so it pairs with Fantasia Court in one pass.',
    },
  },
  'Mickey & Friends Square': {
    name: { ja: 'ミッキー＆フレンズ広場', en: 'Mickey & Friends Square' },
    location: { ja: '1 階', en: '1st floor' },
    description: {
      ja: '東京ディズニーランドに面した中庭。ミッキー、ミニー、グーフィーが手を挙げて出迎える形の樹木が並び、その背後がワールドバザールです。',
      en: 'A courtyard facing Tokyo Disneyland, with topiary of Mickey, Minnie and Goofy waving in welcome and World Bazaar behind them.',
    },
    photoTip: {
      ja: 'ホテルの金色の外観とパークを 1 枚に収めたいなら、ここの角度がもっとも素直です。',
      en: 'If you want the hotel’s gold façade and the park in one frame, this is the easiest angle.',
    },
  },
  'Sherwood Garden': {
    name: { ja: 'シャーウッドガーデン', en: 'Sherwood Garden' },
    location: { ja: '1 階', en: '1st floor' },
    description: {
      ja: '宿泊者限定のヴィクトリアン様式の庭園。入口はカードキー式のゲートで、池と東屋があり、幾何学的に刈られた低木が歩道沿いに並びます。',
      en: 'A Victorian garden for guests only, entered through a key-card gate, with a pond, a gazebo and geometrically clipped hedges along the paths.',
    },
    photoTip: {
      ja: '日が落ちると庭全体がライトアップされ、噴水が光の中に浮かびます。宿泊者しか入れないため人が非常に少ないです。',
      en: 'After dark the whole garden is lit and the fountain floats in it. Because only guests can get in, it is very quiet.',
    },
  },
  'Outdoor Pool': {
    name: { ja: '屋外プール', en: 'Outdoor Pool' },
    location: { ja: '屋外・夏季限定', en: 'Outdoors, summer only' },
    description: {
      ja: '『ピーター・パン』をテーマにした屋外プール。入口でピーター・パンとフック船長の樹木が対峙し、プールサイドにはワニのチック・タックの噴水があります。',
      en: 'An outdoor pool themed to Peter Pan, with topiary of Peter and Captain Hook squaring up at the entrance and a Tick-Tock the crocodile fountain at the poolside.',
    },
  },
  'Bibbidi Bobbidi Boutique': {
    name: { ja: 'ビビディ・バビディ・ブティック', en: 'Bibbidi Bobbidi Boutique' },
    location: { ja: '1 階・8:00〜14:30', en: '1st floor, 8:00–14:30' },
    description: {
      ja: '3 歳から小学 6 年生までがディズニープリンセスに変身できるサロン。ここではシンデレラ、アリエル、ベル、ラプンツェル、アナ、エルサから選べます。隣の「魔法の記念写真スタジオ」（1 階・8:00〜15:15）が変身後の記念撮影を担当します。',
      en: 'A salon where children from age 3 to sixth grade transform into a Disney princess. Here the choices are Cinderella, Ariel, Belle, Rapunzel, Anna and Elsa. The photo studio next door (1st floor, 8:00–15:15) handles the portraits afterwards.',
    },
    photoTip: {
      ja: '利用日の 1 か月前の午前 9 時に公式のオンライン予約サイトで枠を取る必要があります。料金は約 9,350 円のクラウンコースから 40,150 円のキングダムコースまで。',
      en: 'Slots open at 9:00 one month before the date on the official reservation site. Courses run from about ¥9,350 for the Crown course to ¥40,150 for the Kingdom course.',
    },
  },
  'Merceline Salon': {
    name: { ja: 'マーセリンサロン', en: 'Marceline Salon' },
    location: {
      ja: '3 階・7:00〜22:00・コンシェルジュ専用ラウンジ',
      en: '3rd floor, 7:00–22:00, concierge lounge',
    },
    description: {
      ja: 'コンシェルジュとスイートの宿泊者専用の空間。チェックインはここで済み、ロビーに並ぶ必要がありません。7:00〜17:00 はソフトドリンク、17:00〜22:00 は軽く飲む時間。パークチケットもここで買え、駐車料金の精算も同じ場所です。',
      en: 'A space for concierge and suite guests only. Check-in happens here rather than in the lobby queue. Soft drinks from 7:00 to 17:00, drinks from 17:00 to 22:00. Park tickets are sold here and parking is settled here too.',
    },
  },
};

/** Restaurants, keyed by `nameEn`. */
export const DINING_COPY: Record<
  string,
  { name: Pair; type: Pair; hours: Pair[]; seats?: Pair; description: Pair; reservation: Pair }
> = {
  'Sherwood Garden Restaurant': {
    name: { ja: 'シャーウッドガーデン・レストラン', en: 'Sherwood Garden Restaurant' },
    type: { ja: 'ブッフェ', en: 'Buffet' },
    hours: [
      { ja: '朝食 6:30〜10:00', en: 'Breakfast 6:30–10:00' },
      { ja: 'ランチ／ディナー 11:30〜21:00', en: 'Lunch and dinner 11:30–21:00' },
    ],
    seats: { ja: '298 席', en: '298 seats' },
    description: {
      ja: 'シャーウッドガーデンに面した大きな窓のブッフェ。和洋どちらも並び、子ども専用の低いカウンターもあります。',
      en: 'A buffet with tall windows onto Sherwood Garden, serving both Japanese and Western food, with a lower counter for children.',
    },
    reservation: {
      ja: 'プライオリティ・シーティングをオンラインで申し込めます',
      en: 'Priority Seating can be requested online',
    },
  },
  Canna: {
    name: { ja: 'カンナ', en: 'Canna' },
    type: { ja: 'クリエイティブ料理・コース', en: 'Creative cuisine, set courses' },
    hours: [
      { ja: 'ランチ 11:30〜14:30', en: 'Lunch 11:30–14:30' },
      { ja: 'ディナー 17:00〜21:00', en: 'Dinner 17:00–21:00' },
    ],
    seats: {
      ja: '90 席（カウンター 10 席、個室 10 席を含む）',
      en: '90 seats, including 10 at the counter and 10 in private rooms',
    },
    description: {
      ja: 'カンナの花をデザインテーマにした赤いモダンな空間。「健康と美」を掲げたクリエイティブ料理をコースで供します。朝食はなく、館内でもっとも静かな一軒です。',
      en: 'A red, modern room designed around the canna flower, serving creative cuisine built on health and beauty as set courses. No breakfast, and the quietest of the three.',
    },
    reservation: {
      ja: 'プライオリティ・シーティング可、一部メニューは事前予約制',
      en: 'Priority Seating available; some menus require advance booking',
    },
  },
  'Dreamers Lounge': {
    name: { ja: 'ドリーマーズ・ラウンジ', en: 'Dreamers Lounge' },
    type: { ja: 'ロビーラウンジ', en: 'Lobby lounge' },
    hours: [
      { ja: '朝食 6:30〜9:30', en: 'Breakfast 6:30–9:30' },
      { ja: 'ランチ＆デザート 11:30〜17:00', en: 'Lunch and dessert 11:30–17:00' },
      { ja: 'ディナー＆カクテル 17:00〜21:30', en: 'Dinner and cocktails 17:00–21:30' },
    ],
    description: {
      ja: 'ロビー横の明るく開けたラウンジ。アフタヌーンティー、軽食、カクテルはここ。コンシェルジュ 4 タイプ（スーペリアルームのパークビューとパークグランドビュー、スーペリアアルコーヴルームのパークグランドビュー、タレットルーム）の朝食はここに固定されています。',
      en: 'A bright, open lounge beside the lobby for afternoon tea, light meals and cocktails. Breakfast for four concierge types — Superior Room in Park View and Park Grand View, Superior Alcove Room in Park Grand View, and Turret Room — is fixed here.',
    },
    reservation: {
      ja: 'プライオリティ・シーティング対象外、一部のみ事前予約可',
      en: 'Not part of Priority Seating; only some items can be ordered in advance',
    },
  },
};

/** Guest benefits, in dataset order. */
export const BENEFIT_COPY: { title: Pair; description: Pair; caveat?: Pair }[] = [
  {
    title: { ja: 'ハッピーエントリー', en: 'Happy Entry' },
    description: {
      ja: '一般ゲストの 15 分前に入園でき、両パークが対象です。入園時にはチェックインで渡される通行証とパークチケットの両方が必要です。',
      en: 'Enter 15 minutes before general opening, at either park. You must show both the pass issued at check-in and your park ticket.',
    },
    caveat: {
      ja: 'チェックイン日は対象外で、滞在中の翌日とチェックアウト日のみ利用できます。',
      en: 'Not valid on your check-in day — only on the days during your stay and on check-out day.',
    },
  },
  {
    title: { ja: 'ホテルへの無料手荷物搬送', en: 'Free luggage delivery to the hotel' },
    description: {
      ja: '受付はディズニーホテル・カウンター（ウェルカムセンター 2 階）、7:30〜16:00、無料です。',
      en: 'Handled at the Disney hotel counter on the Welcome Center’s 2nd floor, 7:30–16:00, free of charge.',
    },
  },
  {
    title: { ja: '帰りの駅への手荷物搬送', en: 'Luggage delivery back to the station' },
    description: {
      ja: '受付 7:00〜12:30、13:00 以降にウェルカムセンター 2 階で受け取り。1 個 800 円です。',
      en: 'Accepted 7:00–12:30 and collected from the Welcome Center’s 2nd floor after 13:00, at ¥800 per item.',
    },
    caveat: {
      ja: '受取の終了時刻は公式ページ間で食い違っており、ホテルのページは 20:00、ウェルカムセンターのページは 21:00 です。',
      en: 'Official pages disagree on the deadline: the hotel’s page says 20:00, the Welcome Center’s says 21:00.',
    },
  },
  {
    title: { ja: 'ホテル限定のアメニティ', en: 'Hotel-exclusive amenities' },
    description: {
      ja: 'ディズニーキャラクター柄のオリジナルアメニティは持ち帰れます。客室にはエコバッグも用意されます（1 室 1 泊につき 2 個）。',
      en: 'The original Disney-character amenity set is yours to take home. Rooms also include eco bags, two per room per night.',
    },
    caveat: {
      ja: '2023 年 2 月 28 日をもって客室への紙袋の常設は終了し、必要な場合はキャストに申し出る形になりました。',
      en: 'Paper bags stopped being placed in rooms on 28 February 2023; ask a cast member if you need one.',
    },
  },
  {
    title: { ja: 'ディズニーチャンネル無料', en: 'Disney Channel included' },
    description: {
      ja: '客室のテレビでディズニーチャンネルを無料で視聴できます。',
      en: 'The Disney Channel is free to watch on the room television.',
    },
  },
  {
    title: { ja: 'ルームサービス', en: 'Room service' },
    description: {
      ja: '客室でコースまたはアラカルトを楽しめます。全客室で使えるわけではなく、ディズニーシンデレラルーム、コンシェルジュ デラックスルーム（パークビュー）、コンシェルジュ バルコニールームおよびバルコニーアルコーヴルーム（パークグランドビュー）などが対象です。',
      en: 'Set menus or à la carte in your room. Not available in every room type — it covers Disney’s Cinderella Room, Concierge Deluxe Room (Park View), and the Concierge Balcony and Balcony Alcove Rooms (Park Grand View), among others.',
    },
  },
];

/** Bed notes, keyed by the Chinese bed name. */
export const BED_NOTE_COPY: Record<string, Pair> = {
  標準床: {
    ja: '幅 120 cm。シングルより広くダブルより狭いので、大人 2 人が並ぶと窮屈です。',
    en: '120 cm wide — wider than a single, narrower than a double, so two adults side by side is a squeeze.',
  },
  '標準床（無障礙設計）': {
    ja: 'ベッドの高さが 45 cm で、車椅子からの移乗がしやすくなっています。',
    en: 'At 45 cm high, it is easier to transfer onto from a wheelchair.',
  },
  雙人床: {
    ja: '幅 180 cm。大人 2 人と子ども 2 人まで眠れます。',
    en: '180 cm wide, and it takes two adults plus two children.',
  },
  推拉床: {
    ja: '普段はレギュラーベッドの下に収まり、引き出して使います。床面が低く子ども向きです。',
    en: 'Stows under a regular bed and pulls out. It sits low, which suits children.',
  },
  郵輪床: {
    ja: '有料の追加ベッド。幅 83 cm、長さ 183 cm で、成人男性にはやや短いです。',
    en: 'A paid extra bed at 83 by 183 cm, which is short for an adult man.',
  },
  凹室床: {
    ja: '壁のくぼみに固定されたベッド。子どもには人気ですが、体格の大きい大人には圧迫感があります。',
    en: 'A fixed bed set into a wall recess. Children love it; larger adults find it confining.',
  },
  'King size 雙人床': {
    ja: 'ウォルト・ディズニー・スイートのみに配置されています。',
    en: 'Only in the Walt Disney Suite.',
  },
  嬰兒床: {
    ja: '事前予約が必要で、台数に限りがあります。',
    en: 'Requires advance booking, and numbers are limited.',
  },
};

/** FAQ, in dataset order. */
export const FAQ_COPY: { question: Pair; answer: Pair }[] = [
  {
    question: {
      ja: '花火を見るにはパークグランドビューでないといけませんか？',
      en: 'Do I need Park Grand View to see the fireworks?',
    },
    answer: {
      ja: 'いいえ。パークビューでも見えます。角度が斜めになるだけで、料金は約 8,500 円安い。避けるべきは眺望の表記がないタイプで、そちらは全く見えません。',
      en: 'No. Park View sees them too, just at an angle, and costs about ¥8,500 less. What to avoid is a room with no view grade, which sees nothing.',
    },
  },
  {
    question: { ja: '階や部屋番号を指定できますか？', en: 'Can I request a floor or a room number?' },
    answer: {
      ja: 'できません。分類が階の範囲全体をまとめており（パークビューなら 3〜8 階）、部屋番号の指定も受け付けていません。備考欄に「高層階希望」と書けますが、保証はありません。',
      en: 'No. Categories span whole floor ranges — Park View covers floors 3 to 8 — and room numbers cannot be requested. You can note a preference for a high floor, but nothing is guaranteed.',
    },
  },
  {
    question: {
      ja: 'ディズニーキャラクタールームからパークは見えますか？',
      en: 'Can you see the park from a character room?',
    },
    answer: {
      ja: '9 タイプすべてに眺望の表記がありません。公式は正面エントランス側としつつ「一部客室を除く」と添えています。確実にパークを見たいなら、テーマルームは諦めることになります。',
      en: 'None of the nine types carries a view grade. The hotel says they face the main entrance, with a footnote reading "some rooms excepted". To be sure of the park, give up the themed room.',
    },
  },
  {
    question: { ja: '予約はいつ始まりますか？', en: 'When does booking open?' },
    answer: {
      ja: '宿泊日の 4 か月前同日 11:00（日本時間）から。一度に最大 5 泊・3 室です。',
      en: 'At 11:00 Japan time on the same date four months before your stay, for up to five nights and three rooms at once.',
    },
  },
  {
    question: { ja: 'コンシェルジュは追加料金に見合いますか？', en: 'Is concierge worth the extra?' },
    answer: {
      ja: '4 名なら翌日の朝食が含まれるぶん見合うことが多い。2 名でホテルに長居しないなら、その金額は正面眺望のスタンダードに回したほうが得です。',
      en: 'For four people it usually is, because next-day breakfast is included. For two who will not linger in the hotel, that money goes further on a frontal-view standard room.',
    },
  },
  {
    question: { ja: '舞浜駅からどう歩きますか？', en: 'How do you walk from Maihama Station?' },
    answer: {
      ja: '南口を出て右折し、徒歩約 8 分です。ディズニーリゾートラインで最初の駅「東京ディズニーランド・ステーション」まで行く方法もあります。',
      en: 'Leave by the south exit, turn right and walk about 8 minutes. You can also take the Disney Resort Line to its first stop, Tokyo Disneyland Station.',
    },
  },
  {
    question: {
      ja: 'いちばん高い月と安い月はいつですか？',
      en: 'Which months are dearest and cheapest?',
    },
    answer: {
      ja: '6 月が月を通してもっとも安く、いちばん高い日でも年間最安値の 3 割増に収まります。11 月と 12 月は両端とも高い。7〜9 月は年間最安の日を持ちますが、同じ月に 6 割高い日もあるため、日付を選ぶ必要があります。',
      en: 'June is cheapest throughout, and even its dearest date is only about 30% above the year’s floor. November and December are high at both ends. July to September hold the year’s cheapest dates but also dates 60% above them, so the date matters.',
    },
  },
];

/** Social observations, in dataset order. */
export const SOCIAL_COPY: { headline: Pair; body: Pair; verdict: Pair }[] = [
  {
    headline: {
      ja: '「カーテンを開ける」あの一瞬が、ルームツアー動画の定型',
      en: 'The curtain-pull is the formula of every room tour',
    },
    body: {
      ja: 'このホテルの短い動画はパークグランドビューがほぼ独占しています。構成もほぼ同じ。ドアハンドル、玄関、窓へパン、カーテンを開けるとワールドバザールとシンデレラ城が同時に入る。実際に泊まった人によれば、昼間は遠くにディズニーシーのプロメテウス火山とタワー・オブ・テラーも見えるそうです。',
      en: 'Park Grand View rooms almost monopolise the short video from this hotel, and the framing barely varies: door handle, entryway, pan to the window, curtain back, and World Bazaar and Cinderella Castle arrive together. Guests add that in daylight you can also pick out DisneySea’s Mount Prometheus and the Tower of Terror in the distance.',
    },
    verdict: {
      ja: '動画は正面眺望の期待値を作りますが、撮られているのはほぼ 7〜8 階。低層階の仕上がりは相当違います。',
      en: 'The videos set the expectation for a frontal view, but almost all of them are shot from the 7th or 8th floor. Lower down the result is quite different.',
    },
  },
  {
    headline: {
      ja: '宿泊者限定のシャーウッドガーデンは、館内でもっとも撮られていない場所',
      en: 'Guest-only Sherwood Garden is the least photographed spot here',
    },
    body: {
      ja: '入口がカードキー式のゲートなので、チェックインからチェックアウトまでの間の宿泊者しか入れません。噴水と東屋があり、夜はライトアップされます。宿泊者以外が入らないため人が少なく、ゆっくり構図を決められます。',
      en: 'The gate takes a key card, so only guests between check-in and check-out can be inside. There is a fountain and a gazebo, lit after dark. With non-guests filtered out it stays quiet enough to take your time over the framing.',
    },
    verdict: {
      ja: '館内で 1 セットだけ撮るならロビーではなくここ。ロビーには常に人がいます。',
      en: 'If you only shoot one set of photos in the hotel, do it here rather than the lobby, which always has people in it.',
    },
  },
  {
    headline: {
      ja: 'イベント期間の限定客室が、SNS で本当に争われているもの',
      en: 'Limited-run event rooms are what people actually chase',
    },
    body: {
      ja: 'ホテルはパークのイベントに合わせて期間限定客室を出します。たとえば 2026 年 1 月 14 日から 3 月 2 日の「ミニーのファンダーランド」に合わせたミニールームは 1 室約 78,000 円から。宿泊者（添い寝の子どもを除く）に限定アメニティが付き、要予約の限定ルームキーとケースもあります。',
      en: 'The hotel runs limited rooms alongside park events. The Minnie room tied to Minnie’s Funderland from 14 January to 2 March 2026 started at about ¥78,000 per room, with exclusive amenities for guests other than bedsharing children, plus a bookable limited key card and case.',
    },
    verdict: {
      ja: '主眼は部屋そのものより限定グッズで、収集の動機で動く枠です。日程が出たら張り付くしかありません。',
      en: 'The draw is the merchandise more than the room, so it runs on collecting instinct. Watch for the dates the moment they are announced.',
    },
  },
  {
    headline: {
      ja: '天井のレインシャワーの向きは先に確認する',
      en: 'Check which way the ceiling rain shower points',
    },
    body: {
      ja: 'ハンドシャワーと天井のレインシャワーが両方あるディズニーホテルは限られます。説明を読まずに切り替えて、頭から水を浴びたという投稿が繰り返し上がっています。',
      en: 'This is one of the few Disney hotels with both a handheld and a ceiling rain shower. Creators keep reporting the same thing: they turned it on without reading, and the water came straight down on their head.',
    },
    verdict: {
      ja: '浴室に入ったら切替弁の向きを一度見る。退屈な助言ですが実際に効きます。',
      en: 'Glance at the diverter before you turn it on. Dull advice, but it works.',
    },
  },
];

export const pick = (pair: Pair | undefined, zh: string, locale: Locale): string =>
  locale === 'zh-hant' ? zh : (pair?.[locale] ?? zh);
