# 行前功課 Trip Homework

把功課做完，剩下的交給旅行。

一個以深度內容為主的旅遊誌，提供繁體中文、日文與英文三種版本。每一篇都從官方資料出發，用當地部落格與 TikTok、Instagram 上的第一手分享交叉查證，最後整理成出發前真的用得上的判斷依據——能做成表格與工具的資料就不寫成散文。

## 目前收錄

繁體中文不加語言前綴，日文與英文分別在 `/ja/` 與 `/en/` 之下，下表列的是繁中路徑。

| 內容 | 路徑 |
| --- | --- |
| 東京迪士尼海洋夢幻泉鄉大飯店完全指南 | `/articles/fantasy-springs-hotel` |
| 夢幻泉鄉大飯店房型資料庫（31 種房型、玫瑰庭區 147 間客房位置圖） | `/hotels/fantasy-springs-hotel` |
| 東京迪士尼海洋觀海景大飯店完全指南 | `/articles/tokyo-disneysea-hotel-miracosta` |
| 東京迪士尼海洋觀海景大飯店房型資料庫（37 種組合、海港區房號索引） | `/hotels/tokyo-disneysea-hotel-miracosta` |
| 東京迪士尼樂園大飯店完全指南 | `/articles/tokyo-disneyland-hotel` |
| 東京迪士尼樂園大飯店房型資料庫（38 種房型、逐間比例平面圖） | `/hotels/tokyo-disneyland-hotel` |
| 房型資料庫總覽 | `/hotels` |

## 技術

- [Astro 7](https://astro.build)，靜態輸出，內容用 content collections 管理（含 zod schema）
- [Tailwind CSS 4](https://tailwindcss.com)，設計 token 定義在 `src/styles/global.css` 的 `@theme`
- 沒有前端框架。互動功能（房型篩選、目錄高亮）以原生 TypeScript 實作
- SEO：sitemap、RSS、JSON-LD（Article / BreadcrumbList / Hotel / FAQPage）、OG 與 Twitter meta

## 開發

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 輸出到 dist/
npm run preview  # 預覽 build 結果
```

## 專案結構

```
src/
├── components/       UI 元件（房型探索器、房號索引、價格階梯、資料表格等）
├── content/
│   └── articles/     文章（MDX），依語言分目錄：zh-hant / ja / en
├── content.config.ts 文章 schema，以及從 id 拆出語言與 slug 的工具
├── data/             結構化資料集，與文章分離維護
│   ├── hotel.ts      各飯店共用型別與價格工具
│   ├── fantasy-springs-hotel.ts
│   ├── tokyo-disneyland-hotel.ts
│   └── tokyo-disneysea-hotel-miracosta.ts
├── i18n/             語言設定與各語言的介面、頁面、飯店頁文案
├── layouts/          BaseLayout / ArticleLayout
├── pages/
│   └── [...locale]/  一個檔案產出三種語言的路由
├── styles/           設計 token 與長文排版
└── consts.ts         站台設定與路徑工具
```

同一個房型元件服務所有飯店：資料從 `src/data/<hotel>.ts` 以 props 傳進去，頁面文案從 `src/i18n/hotel.ts` 依語言取出。新增一間飯店＝新增資料與文案，不必複製 UI。翻譯一篇文章＝在另一個語言目錄放同名 `.mdx`，語言切換器就會自動配對。

### 為什麼資料要和文章分開

旅遊內容最大的敵人是過期。房型改名、價格調整、制度變動的時候，如果資料寫死在文章裡就得整篇重寫；抽出來放在 `src/data/` 之後，改一個檔案，文章內文、房型探索器、資料庫頁面與結構化資料會一起更新。

## 新增一篇文章

在 `src/content/articles/` 建立 `.mdx` 檔，frontmatter 需符合 `src/content.config.ts` 的 schema：

```yaml
---
title: 標題
description: 摘要，會用在 meta description 與列表卡片
destination: 目的地
country: 國家・地區
publishedAt: 2026-08-02
readingMinutes: 24
accent: teal        # teal | gold | berry，決定主視覺配色
tags: [標籤]
takeaways:          # 文章開頭的「先看結論」
  - 一句話結論
sources:            # 文末的資料來源，依 official / media / blog / social 分類
  - label: 來源名稱
    url: https://example.com
    kind: official
---
```

文章內可以直接 `import` 並使用 `src/components/` 底下的元件。嵌入的元件請在最外層加上 `not-prose`，避免被長文排版樣式影響。

## 部署

`astro.config.mjs` 讀取兩個環境變數，同一份程式碼可以部署到自訂網域、GitHub 使用者頁或子路徑的專案頁：

| 變數 | 用途 | 預設 |
| --- | --- | --- |
| `SITE_URL` | 網站絕對網址，用於 canonical、sitemap 與 RSS | `https://trip-homework.pages.dev` |
| `BASE_PATH` | 部署的子路徑 | `/` |

正式站：**https://aazz44ss.github.io/Travel/**

repo 內附 `.github/workflows/deploy.yml`。每次推送都會跑型別檢查與建置，推上 `main` 時再發布到 GitHub Pages。網址與子路徑由 `actions/configure-pages` 提供，所以換成自訂網域也不需要改設定。

Pages 的來源設定在 **Settings → Pages → Source**，需要是 **GitHub Actions**。這是唯一需要人工設定的一步，而且只做一次——預設的 workflow token 沒有開啟 Pages 的權限。

## 編輯原則

- 官方資料優先，二手資料標明出處
- 價格一律標示為「參考起價」並註明年份，用來比較房型之間的相對關係，不是報價
- 社群素材當線索，不當結論
- 制度變動時回頭更新文章，並標註更新日期

本站與內容中提及的任何飯店、樂園或品牌均無合作或從屬關係。
