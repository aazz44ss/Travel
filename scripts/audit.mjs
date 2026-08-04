/**
 * Reads the built HTML and checks the things a type-checker cannot: that every
 * number shown on a page equals the number derived from the data, that the two
 * pages about one hotel do not repeat each other's prose, and that every internal
 * link resolves.
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const read = (p) => readFileSync(join(DIST, p), 'utf8');

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<header[\s\S]*?<\/header>/g, ' ')
    .replace(/<footer[\s\S]*?<\/footer>/g, ' ')
    .replace(/<nav[\s\S]*?<\/nav>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

let fails = 0;
const fail = (msg) => {
  console.log(`  FAIL ${msg}`);
  fails++;
};
const ok = (msg) => console.log(`  ok   ${msg}`);

// ── every route builds and resolves ──────────────────────────────────────────
console.log('\nroutes');
// Traditional Chinese is unprefixed; the other two live under their own segment.
const PREFIXES = ['', 'ja/', 'en/'];
const PER_LOCALE = [
  'index.html',
  'about/index.html',
  'articles/index.html',
  'articles/fantasy-springs-hotel/index.html',
  'articles/tokyo-disneyland-hotel/index.html',
  'hotels/index.html',
  'hotels/fantasy-springs-hotel/index.html',
  'hotels/tokyo-disneyland-hotel/index.html',
];
const routes = [
  ...PREFIXES.flatMap((prefix) => PER_LOCALE.map((route) => prefix + route)),
  '404.html',
  'rss.xml',
  'robots.txt',
  'sitemap-index.xml',
];
for (const r of routes) {
  existsSync(join(DIST, r)) ? ok(r) : fail(`missing ${r}`);
}

// ── internal links resolve ──────────────────────────────────────────────────
console.log('\ninternal links');
function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}
const pages = walk(DIST).filter((f) => f.endsWith('.html'));
const hrefs = new Set();
for (const page of pages) {
  for (const m of readFileSync(page, 'utf8').matchAll(/href="(\/[^"#?]*)"/g)) hrefs.add(m[1]);
}
for (const href of [...hrefs].sort()) {
  const candidates = [
    join(DIST, href),
    join(DIST, href, 'index.html'),
    join(DIST, `${href}.html`),
    join(DIST, href.replace(/\/$/, ''), 'index.html'),
  ];
  candidates.some((c) => existsSync(c)) ? null : fail(`dead internal link ${href}`);
}
ok(`${hrefs.size} distinct internal hrefs, all resolve`);

// ── the elevation grid agrees with the figures printed beside it ────────────
// Nothing here hardcodes the truth: the counts come out of the page's own
// heading and legend, so a drift on either side shows up as a disagreement.
console.log('\nRose Court elevations');
const fshDb = read('hotels/fantasy-springs-hotel/index.html');
const cells = [
  ...fshDb.matchAll(/data-number="(\d{4})"\s+data-category="([^"]*)"\s+data-park="([^"]*)"/g),
].map((m) => ({ number: m[1], category: m[2], park: m[3] === 'true' }));

const headingTotal = Number(fshDb.match(/玫瑰庭區 (\d+) 間客房的位置/)?.[1]);
cells.length === headingTotal
  ? ok(`heading says ${headingTotal} rooms and ${cells.length} cells are rendered`)
  : fail(`heading says ${headingTotal} rooms but ${cells.length} cells are rendered`);
new Set(cells.map((c) => c.number)).size === cells.length
  ? ok('no duplicate room numbers')
  : fail('duplicate room numbers');

const sectionStart = fshDb.indexOf('id="rose-court"');
const legendHtml = fshDb.slice(sectionStart, fshDb.indexOf('<figure', sectionStart));
const legend = [...visibleText(legendHtml).matchAll(
  /(精緻客房|附凹室精緻客房|尊爵客房|尊爵無障礙客房|樂園景觀)\s+(\d+) 間/g,
)].map((m) => [m[1], Number(m[2])]);
legend.length === 5 ? ok('legend has all five tallies') : fail(`legend has ${legend.length} tallies`);
for (const [label, stated] of legend) {
  const counted =
    label === '樂園景觀'
      ? cells.filter((c) => c.park).length
      : cells.filter((c) => c.category === label).length;
  counted === stated
    ? ok(`legend ${label} ${stated} matches ${counted} cells`)
    : fail(`legend ${label} says ${stated} but ${counted} cells carry it`);
}
const legendSum = legend
  .filter(([l]) => l !== '樂園景觀')
  .reduce((n, [, v]) => n + v, 0);
legendSum === cells.length
  ? ok(`category tallies sum to ${legendSum}`)
  : fail(`category tallies sum to ${legendSum}, not ${cells.length}`);
fshDb.includes('官方公布的樓層區間沒有涵蓋這個位置')
  ? ok('the position no published band covers is disclosed')
  : fail('unassigned position not disclosed');

console.log('\nevery locale renders the position map');
for (const prefix of PREFIXES) {
  const html = read(`${prefix}hotels/fantasy-springs-hotel/index.html`);
  const n = [...html.matchAll(/data-number="\d{4}"/g)].length;
  n === cells.length
    ? ok(`${prefix || 'zh-hant/'} renders ${n} cells`)
    : fail(`${prefix || 'zh-hant/'} renders ${n} cells, expected ${cells.length}`);
}

console.log('\nlanguage switcher targets exist');
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const nav = /<header[\s\S]*?<\/header>/.exec(html)?.[0] ?? '';
  for (const m of nav.matchAll(/href="(\/(?:ja|en)\/[^"#?]*)"/g)) {
    const href = m[1];
    const target = [join(DIST, href), join(DIST, href, 'index.html')].some((c) => existsSync(c));
    if (!target) fail(`switcher on ${page} points at missing ${href}`);
  }
}
ok('all locale switcher targets resolve');

// ── numbers stated in prose match the data ──────────────────────────────────
console.log('\nfigures in prose');
const fshText = visibleText(fshDb);
const artText = visibleText(read('articles/fantasy-springs-hotel/index.html'));
const checks = [
  [fshText, '475', 'total rooms 475'],
  [fshText, '夢幻館 419 ＋ 豪華館 56', 'wing split'],
  [fshText, '121 天裡 14 天', 'availability figure on db page'],
  [artText, '121 個日期只有 14 天', 'availability figure in article'],
  [artText, '提前 15 分鐘', 'happy entry minutes'],
  [artText, '5 到 15 分鐘', 'happy entry DisneySea minutes'],
  [artText, '8 張遊樂設施體驗券與 4 張娛樂表演觀賞券', 'grand chateau tickets'],
];
for (const [text, needle, label] of checks) {
  text.includes(needle) ? ok(label) : fail(`${label}: "${needle}" not found`);
}

// ── the corrected claims must not survive anywhere ──────────────────────────
console.log('\nstale claims');
// Claims an earlier revision made that the official sources contradicted, plus
// wording that frames a fact as a change the reader is assumed to remember.
// The October 2026 restructure is deliberately not here: it has not happened yet,
// so its date is load-bearing for anyone booking either side of it.
const stale = [
  '提前的分鐘數在官方頁面上沒有寫',
  '官方沒有寫在飯店頁上',
  '這件事以前的殺傷力',
  '以前 3 樓的植栽景',
];
for (const page of pages) {
  const t = visibleText(readFileSync(page, 'utf8'));
  for (const term of stale) {
    if (t.includes(term)) fail(`"${term}" still appears in ${page}`);
  }
}
ok('no corrected or change-framing wording remains');

// Emphasis around a span that both opens and closes with a CJK bracket does not
// render, and leaves the asterisks visible on the page.
console.log('\nunrendered markdown');
let strayTotal = 0;
for (const page of pages) {
  // scripts legitimately contain /** comments
  const t = readFileSync(page, 'utf8')
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ');
  const strays = t.match(/\*\*/g);
  if (strays) {
    fail(`${strays.length} literal ** in ${page}`);
    strayTotal += strays.length;
  }
}
if (strayTotal === 0) ok('no literal emphasis markers in output');

// ── the two pages about one hotel should not repeat each other ──────────────
console.log('\ncross-page overlap (article vs database)');
const sentences = (t) =>
  t
    .split(/[。！？]/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 12);
const a = new Set(sentences(artText));
const b = new Set(sentences(fshText));
const same = [...a].filter((s) => b.has(s));
same.length === 0 ? ok('0 identical sentences') : fail(`${same.length} identical sentences`);
for (const s of same) console.log(`       ${s}`);

const shingles = (t, n) => {
  const set = new Set();
  for (let i = 0; i + n <= t.length; i++) set.add(t.slice(i, i + n));
  return set;
};
const sa = shingles(artText, 22);
const sb = shingles(fshText, 22);
const shared = [...sa].filter((s) => sb.has(s));
// collapse overlapping shingles into the longest runs
const runs = [];
for (const s of shared.sort()) {
  const last = runs[runs.length - 1];
  if (last && (last.includes(s.slice(0, 21)) || s.includes(last.slice(-21)))) {
    runs[runs.length - 1] = last + s.slice(21);
  } else runs.push(s);
}
console.log(`  ${runs.length} shared phrase run(s) of 22+ characters`);
for (const r of runs.slice(0, 12)) console.log(`       ${r}`);

// ── rendered length ─────────────────────────────────────────────────────────
console.log('\nrendered length (visible characters)');
for (const [label, path] of [
  ['article  fantasy-springs', 'articles/fantasy-springs-hotel/index.html'],
  ['database fantasy-springs', 'hotels/fantasy-springs-hotel/index.html'],
  ['article  tokyo-disneyland', 'articles/tokyo-disneyland-hotel/index.html'],
  ['database tokyo-disneyland', 'hotels/tokyo-disneyland-hotel/index.html'],
]) {
  const html = read(path);
  console.log(
    `  ${label}: ${visibleText(html).length.toLocaleString()} chars, ${(html.length / 1024).toFixed(0)} KB html`,
  );
}

console.log(fails === 0 ? '\nAUDIT PASSED' : `\nAUDIT FAILED with ${fails} problem(s)`);
process.exit(fails === 0 ? 0 : 1);
