import type { Locale } from './config';

/** Longer page copy, kept out of the page files so all three locales sit together. */
export interface PageCopy {
  home: {
    heroLead: string;
    heroTail: string;
    intro: string;
    ctaArticle: string;
    ctaDatabase: string;
    statArticles: string;
    statRooms: string;
    statSources: string;
    latest: string;
    allArticles: string;
    methodHeading: string;
    methodIntro: string;
    method: { title: string; body: string }[];
    toolLabel: string;
    toolCta: string;
    pipelineHeading: string;
    pipelineIntro: string;
    pipeline: { title: string; body: string }[];
  };
  about: {
    heading: string;
    lead: string;
    whyHeading: string;
    why: string[];
    processHeading: string;
    process: { title: string; body: string }[];
    disclosureHeading: string;
    disclosures: { title: string; body: string }[];
    ctaArticles: string;
    ctaRss: string;
  };
}

const zhHant: PageCopy = {
  home: {
    heroLead: '把功課做完，',
    heroTail: '剩下的交給旅行',
    intro:
      '大部分旅遊文章告訴你「這裡很棒」。這裡想做的是另一件事：把官方資料、當地部落格與社群上的第一手分享全部攤開來交叉比對，整理成你在訂房頁面前面、真的按得下去的判斷依據。',
    ctaArticle: '閱讀最新一篇',
    ctaDatabase: '打開房型資料庫',
    statArticles: '目前文章',
    statRooms: '已收錄房型',
    statSources: '交叉查證來源',
    latest: '最新一篇',
    allArticles: '所有文章 →',
    methodHeading: '這裡怎麼寫東西',
    methodIntro:
      '旅遊內容最大的問題不是寫得不好，是過期。制度改了、價格調了、房型重新分類了，文章還停在三年前。這裡的做法是把可以結構化的資料抽出來單獨維護，讓更新這件事變得可行。',
    method: [
      {
        title: '官方資料是地基，不是全部',
        body: '規格、時間、價格一律回到官方頁面確認。但官方不會告訴你 3 樓和 8 樓的窗外差多少，那部分要靠住過的人。',
      },
      {
        title: '社群當作田野調查',
        body: 'TikTok 和 Instagram 上的開箱影片有大量細節，但也有大量倖存者偏差。我們把它們當線索，再回頭驗證。',
      },
      {
        title: '標明查證日期',
        body: '旅遊資訊會過期。每一篇都會寫清楚資料的時間點，並且在制度變動時回頭更新，而不是留一篇 2022 年的文章騙流量。',
      },
      {
        title: '把資料做成工具',
        body: '能整理成可篩選、可比較的資料，就不寫成一長串文字。你要的是做決定，不是讀完。',
      },
    ],
    toolLabel: '工具',
    toolCta: '打開資料庫',
    pipelineHeading: '接下來在查什麼',
    pipelineIntro: '下面這幾篇正在整理資料。順序會依查證的進度調整。',
    pipeline: [
      { title: '東京迪士尼度假區交通', body: '從成田、羽田到舞濱的四種走法與實際花費' },
      { title: '東京迪士尼樂園單日行程', body: '不買尊享卡的情況下，怎麼排才不會走冤枉路' },
      { title: '東京迪士尼海洋夢幻泉鄉大飯店', body: '豪華館與夢幻館的權益、入口與房型差異' },
    ],
  },
  about: {
    heading: '關於',
    lead: '「做功課」是台灣旅人講了很多年的詞。這個站想做的，就是把那份功課做到底，然後把過程和結論一起攤出來給你看。',
    whyHeading: '為什麼要做這個站',
    why: [
      '旅遊內容從來不缺。缺的是那種你查到第三個小時、還是不知道該按哪個按鈕的時候，能直接給你答案的東西。',
      '問題通常出在三個地方。第一，大部分文章的目的是讓你覺得那裡很棒，不是幫你做決定。第二，資訊過期——制度改了、價格調了、分類重編了，文章還停在原地，而且看起來和最新的文章一模一樣。第三，最關鍵的細節散落在日文部落格、社群影片和官方頁面的角落裡。',
      '所以這裡的每一篇都會做同一件事：把散落的資料收攏、交叉查證、標明來源與日期，然後整理成你可以直接拿去用的形式。',
    ],
    processHeading: '一篇文章怎麼生出來',
    process: [
      {
        title: '找一個真的會卡住的問題',
        body: '不是「東京有什麼好玩」，而是「這間飯店 38 種房型到底差在哪」。題目要具體到有標準答案，才有查證的意義。',
      },
      {
        title: '從官方頁面建立骨架',
        body: '房型名稱、面積、人數上限、營業時間、制度規則，一律以官方公告為準，包括日文、英文與繁體中文版本互相對照。官方的中文譯名會直接沿用，避免自創詞造成搜尋困難。',
      },
      {
        title: '用在地資料補上官方不會寫的部分',
        body: '官方不會告訴你哪一層樓的視野會被車站擋住、哪個房型其實比較划算。這些要靠日本在地的旅遊媒體、逐間紀錄的部落格與住客的實際回報。',
      },
      {
        title: '把 TikTok 與 Instagram 當田野調查',
        body: '短影音有大量官方拍不出來的細節：實際的窗景、備品的樣子、餐廳的餐點。但也有大量倖存者偏差——影片拍的永遠是最好的那間房。所以社群資料只當線索，一定回頭比對。',
      },
      {
        title: '整理成可以篩選的結構',
        body: '能做成表格與工具的資料就不寫成散文。你打開文章是為了做決定，不是為了讀完一篇文章。',
      },
      {
        title: '標明日期，並且回頭更新',
        body: '每一篇都寫清楚資料的時間點。制度變動時回頭改，而不是讓一篇三年前的文章繼續在搜尋結果裡誤導人。',
      },
    ],
    disclosureHeading: '幾件該說清楚的事',
    disclosures: [
      {
        title: '沒有業配，也沒有合作關係。',
        body: '本站與文章中提到的任何飯店、樂園、航空公司或品牌都沒有從屬或合作關係。所有評價都是根據公開資料整理出來的判斷。',
      },
      {
        title: '價格一律是參考值。',
        body: '日本的飯店房價依日期浮動幅度很大，本站標示的都是「參考起價」，用來比較房型之間的相對關係，不是報價。',
      },
      {
        title: '出發前請再確認一次官方公告。',
        body: '營業時間、制度規則與施工資訊都可能在文章發布後變動。每篇文末都列出使用的資料來源，可以直接點過去查最新版本。',
      },
      { title: '發現錯誤歡迎指正。', body: '寫錯了就改，並在文章上標註更新日期。' },
    ],
    ctaArticles: '看所有文章',
    ctaRss: '訂閱 RSS',
  },
};

const ja: PageCopy = {
  home: {
    heroLead: '下調べを終えたら、',
    heroTail: 'あとは旅にまかせる',
    intro:
      '多くの旅行記事は「ここが素晴らしい」と伝えます。このサイトがやりたいのは別のことです。公式情報、現地のブログ、SNS の実際の宿泊レポートを並べて突き合わせ、予約画面の前で実際にボタンを押せる判断材料に整えます。',
    ctaArticle: '最新の記事を読む',
    ctaDatabase: '客室データベースを開く',
    statArticles: '記事数',
    statRooms: '収録客室タイプ',
    statSources: '突き合わせた資料',
    latest: '最新の記事',
    allArticles: '記事一覧 →',
    methodHeading: 'このサイトの書き方',
    methodIntro:
      '旅行情報の最大の問題は、書き方ではなく古くなることです。制度が変わり、料金が改定され、客室が再分類されても、記事は三年前で止まっている。だから構造化できるデータは切り出して別に管理し、更新を現実的な作業にしています。',
    method: [
      {
        title: '公式情報は土台、ただしそれだけでは足りない',
        body: '仕様・時間・料金はすべて公式ページで確認します。ただし 3 階と 8 階で窓の外がどれだけ違うかは公式には書かれていません。そこは泊まった人の記録に頼ります。',
      },
      {
        title: 'SNS はフィールドワークとして扱う',
        body: 'TikTok や Instagram のルームツアーには細部が大量にありますが、生存者バイアスも大量にあります。手がかりとして使い、必ず裏を取ります。',
      },
      {
        title: '確認した日付を明記する',
        body: '旅行情報は古くなります。どの時点の情報かを必ず書き、制度が変わったら戻って直します。2022 年の記事をそのまま置いてアクセスを稼ぐことはしません。',
      },
      {
        title: 'データは道具に変える',
        body: '絞り込めて比べられる形にできるなら、長い文章にはしません。必要なのは決めることで、読み終えることではないからです。',
      },
    ],
    toolLabel: 'ツール',
    toolCta: 'データベースを開く',
    pipelineHeading: 'いま調べているもの',
    pipelineIntro: '以下は資料を整理中の記事です。順番は確認の進み方によって変わります。',
    pipeline: [
      { title: '東京ディズニーリゾートへの交通', body: '成田・羽田から舞浜までの四通りの経路と実際の費用' },
      { title: '東京ディズニーランド 一日の回り方', body: 'プレミアアクセスを買わない前提で、無駄に歩かない組み方' },
      {
        title: '東京ディズニーシー・ファンタジースプリングスホテル',
        body: 'グランドシャトーとファンタジーシャトーの特典・入口・客室の違い',
      },
    ],
  },
  about: {
    heading: 'このサイトについて',
    lead: '「下調べ」は旅行者が長く使ってきた言葉です。このサイトがやりたいのは、その下調べを最後までやり切って、過程と結論の両方をそのまま見せることです。',
    whyHeading: 'なぜこのサイトを作ったか',
    why: [
      '旅行情報が足りないことはありません。足りないのは、三時間調べてもまだどのボタンを押すべきか分からないときに、そのまま答えになるものです。',
      '原因はたいてい三つあります。第一に、多くの記事の目的は「素晴らしい」と思わせることで、決めるのを助けることではない。第二に、情報が古い。制度が変わり、料金が改定され、分類が組み替えられても記事は動かず、しかも最新の記事と見分けがつかない。第三に、いちばん重要な細部が日本語のブログ、SNS の動画、公式ページの隅に散らばっている。',
      'だからここでは毎回同じことをします。散らばった情報を集め、突き合わせ、出典と日付を明記し、そのまま使える形に整える。',
    ],
    processHeading: '記事ができるまで',
    process: [
      {
        title: '本当に手が止まる問いを選ぶ',
        body: '「東京で何が楽しいか」ではなく「このホテルの 38 種類の客室は何が違うのか」。答えが定まるくらい具体的でなければ、調べる意味がありません。',
      },
      {
        title: '公式ページで骨組みを作る',
        body: '客室名・面積・定員・営業時間・制度上のルールはすべて公式の記載に従い、日本語・英語・繁体字中国語版を相互に照合します。公式の訳語はそのまま使い、独自の言い換えで検索しにくくなることを避けます。',
      },
      {
        title: '公式が書かないことを現地の情報で補う',
        body: 'どの階の眺望が駅舎に遮られるか、どの客室が実は割安かは公式には書かれていません。そこは日本の旅行メディア、部屋ごとに記録したブログ、宿泊者の報告に頼ります。',
      },
      {
        title: 'TikTok と Instagram はフィールドワークとして',
        body: '短い動画には公式では撮られない細部があります。実際の窓の景色、アメニティの様子、レストランの料理。ただし生存者バイアスも大量です。映るのは常に一番良い部屋。だから手がかりに留め、必ず突き合わせます。',
      },
      {
        title: '絞り込める構造に整える',
        body: '表や道具にできるデータは散文にしません。記事を開くのは決めるためで、読み終えるためではありません。',
      },
      {
        title: '日付を明記し、あとから直す',
        body: 'どの時点の情報かを必ず書きます。制度が変わったら戻って直す。三年前の記事を検索結果に残して誤解を招くことはしません。',
      },
    ],
    disclosureHeading: 'はっきりさせておきたいこと',
    disclosures: [
      {
        title: '広告案件も提携もありません。',
        body: '記事内のホテル・パーク・航空会社・ブランドとは一切の提携関係がありません。評価はすべて公開情報から組み立てた判断です。',
      },
      {
        title: '料金はすべて参考値です。',
        body: '日本のホテルの料金は日付で大きく動きます。本サイトの数字は「参考の最低料金」で、客室どうしの相対関係を比べるためのもの。見積りではありません。',
      },
      {
        title: '出発前にもう一度公式をご確認ください。',
        body: '営業時間・制度・工事の情報は公開後に変わり得ます。各記事の末尾に使用した資料を挙げているので、そこから最新版を確認できます。',
      },
      { title: '誤りのご指摘を歓迎します。', body: '間違いは直し、記事に更新日を記載します。' },
    ],
    ctaArticles: '記事一覧を見る',
    ctaRss: 'RSS を購読',
  },
};

const en: PageCopy = {
  home: {
    heroLead: 'Do the homework,',
    heroTail: 'then let the trip happen',
    intro:
      'Most travel writing tells you a place is wonderful. This site tries to do something else: lay the official pages, the local blogs and the first-hand stays posted on social media side by side, cross-check them, and turn the result into something you can actually act on with the booking page open.',
    ctaArticle: 'Read the latest guide',
    ctaDatabase: 'Open the room database',
    statArticles: 'Guides so far',
    statRooms: 'Room types catalogued',
    statSources: 'Sources cross-checked',
    latest: 'Latest guide',
    allArticles: 'All articles →',
    methodHeading: 'How things get written here',
    methodIntro:
      'The biggest problem with travel content is not the writing, it is that it goes stale. Policies change, rates move, rooms get reclassified, and the article still describes three years ago. So anything that can be structured is pulled out and maintained separately, which makes updating a realistic job.',
    method: [
      {
        title: 'Official pages are the foundation, not the whole thing',
        body: 'Specifications, times and rates all get checked against the official pages. But no official page tells you how different the view is from the 3rd floor versus the 8th. That part comes from people who stayed.',
      },
      {
        title: 'Social media as fieldwork',
        body: 'Room tours on TikTok and Instagram carry an enormous amount of detail, and an enormous amount of survivorship bias. They are treated as leads, then verified.',
      },
      {
        title: 'Say when it was checked',
        body: 'Travel information expires. Every piece states the date its data comes from and gets revisited when something changes, rather than leaving a 2022 article up to farm traffic.',
      },
      {
        title: 'Turn data into a tool',
        body: 'If something can be filtered and compared, it does not become a wall of prose. You came to decide, not to finish reading.',
      },
    ],
    toolLabel: 'Tool',
    toolCta: 'Open the database',
    pipelineHeading: 'What is being researched next',
    pipelineIntro: 'These are in progress. The order shifts with how the fact-checking goes.',
    pipeline: [
      {
        title: 'Getting to Tokyo Disney Resort',
        body: 'Four routes from Narita and Haneda to Maihama, with what each actually costs',
      },
      {
        title: 'One day at Tokyo Disneyland',
        body: 'How to order the day without Premier Access and without doubling back',
      },
      {
        title: 'Tokyo DisneySea Fantasy Springs Hotel',
        body: 'What separates Grand Chateau from Fantasy Chateau: benefits, entrances and rooms',
      },
    ],
  },
  about: {
    heading: 'About',
    lead: 'Doing your homework is what travellers have always called this. What this site wants to do is take that homework all the way, then show you both the process and the conclusion.',
    whyHeading: 'Why this site exists',
    why: [
      'There is no shortage of travel content. What is missing is the thing that answers you at hour three of researching, when you still do not know which button to press.',
      'The problem is usually one of three things. First, most articles are written to make you feel a place is wonderful, not to help you decide. Second, the information is stale: the policy changed, the rate moved, the categories were reshuffled, and the article did not move — while looking identical to a current one. Third, the details that matter most are scattered across Japanese blogs, social videos and the corners of official pages.',
      'So every piece here does the same thing: gather what is scattered, cross-check it, state the source and the date, and shape it into something you can use directly.',
    ],
    processHeading: 'How a guide gets made',
    process: [
      {
        title: 'Pick a question that genuinely stalls people',
        body: 'Not "what is fun in Tokyo" but "what actually separates this hotel\'s 38 room types". The question has to be specific enough to have a right answer for checking it to mean anything.',
      },
      {
        title: 'Build the skeleton from official pages',
        body: 'Room names, areas, occupancy, opening hours and policy rules all follow the official wording, with the Japanese, English and Traditional Chinese versions checked against each other. Official names are used verbatim rather than paraphrased, so searching for them still works.',
      },
      {
        title: 'Fill the gaps with local sources',
        body: 'No official page tells you which floors have their view cut off by the station building, or which room type is quietly the better deal. That comes from Japanese travel media, blogs that documented the hotel room by room, and reports from people who stayed.',
      },
      {
        title: 'Treat TikTok and Instagram as fieldwork',
        body: 'Short video carries detail no official photo does: the real view, what the amenities look like, what arrives at the table. It also carries heavy survivorship bias — the room being filmed is always the best one. So social material stays a lead and always gets checked.',
      },
      {
        title: 'Shape it into something filterable',
        body: 'Anything that can become a table or a tool does not become an essay. You opened the page to make a decision, not to reach the end of it.',
      },
      {
        title: 'Date it, and come back to it',
        body: 'Every piece states when its data was checked. When something changes, it gets corrected, rather than leaving a three-year-old article to mislead people in search results.',
      },
    ],
    disclosureHeading: 'Things worth stating plainly',
    disclosures: [
      {
        title: 'No sponsorship and no partnerships.',
        body: 'This site has no affiliation with any hotel, park, airline or brand mentioned. Every judgement is assembled from public information.',
      },
      {
        title: 'Every price is indicative.',
        body: 'Hotel rates in Japan swing widely by date. The figures here are reference starting rates, meant for comparing room types against each other, not quotes.',
      },
      {
        title: 'Check the official pages again before you go.',
        body: 'Hours, policies and construction notices can change after publication. Every piece lists the sources it used so you can go straight to the current version.',
      },
      { title: 'Corrections are welcome.', body: 'Mistakes get fixed, and the piece carries the date it was updated.' },
    ],
    ctaArticles: 'Browse all articles',
    ctaRss: 'Subscribe by RSS',
  },
};

export const PAGES: Record<Locale, PageCopy> = { 'zh-hant': zhHant, ja, en };
export const page = (locale: Locale): PageCopy => PAGES[locale];
