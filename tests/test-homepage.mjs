// Source-level contract for the AFK AI landing page. Runtime screenshots and
// browser checks cover layout; this suite locks the product hierarchy, maturity
// language, download path, real-capture evidence and no-fabrication rules into CI.
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const publicDir = fileURLToPath(new URL('../public/', import.meta.url));
const html = readFileSync(publicDir + 'index.html', 'utf8');
const css = readFileSync(publicDir + 'assets/afk.css', 'utf8');
const provenance = existsSync(publicDir + 'assets/captures/PROVENANCE.md')
  ? readFileSync(publicDir + 'assets/captures/PROVENANCE.md', 'utf8')
  : '';
const source = html.replace(/<!--[\s\S]*?-->/g, '');
const text = source.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

let pass = 0;
let fail = 0;
function check(name, condition, detail = '') {
  if (condition) {
    pass++;
    console.log('  ok  ' + name);
  } else {
    fail++;
    console.log('FAIL  ' + name + (detail ? ' -> ' + detail : ''));
  }
}

console.log('Case H1 - product hierarchy and conversion:');
const h1s = [...source.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
check('homepage has exactly one h1', h1s.length === 1, String(h1s.length));
check('AFK AI is named before Allusions in visible content',
  text.indexOf('AFK AI') >= 0 && text.toLowerCase().indexOf('allusions') > text.indexOf('AFK AI'));
check('homepage keeps the pinned Beta version visible', /Beta[\s\S]{0,160}0\.2\.0-rc1|0\.2\.0-rc1[\s\S]{0,160}Beta/i.test(source));
check('homepage describes the native Windows app', /native Windows app/i.test(text));
check('homepage names the exact EXE download', /AFKLocalAISetup-0\.2\.0-rc1-x64\.exe/.test(text));
check('homepage has at least two direct download calls to action', (source.match(/href=["']\/download["']/g) || []).length >= 2);
check('maker attribution is subordinate and explicit', /Built by\s+<a[^>]*>Allusions<\/a>/i.test(source));
check('legacy Friend Beta wording is absent', !/Friend Beta/i.test(source));
check('requirements are stated', /Windows 11/.test(text) && /40 GB/.test(text) && /NVIDIA GPU is recommended/i.test(text) && /Virtualization/i.test(text));

console.log('Case H2 - maturity and evidence structure:');
for (const maturity of ['shipping', 'beta', 'direction']) {
  check(`has a ${maturity} maturity section`, new RegExp(`<section\\b[^>]*data-maturity=["']${maturity}["']`, 'i').test(source));
}
check('the direction section says it is not shipped', /data-maturity=["']direction["'][\s\S]*?not shipped yet/i.test(source));
const figures = [...source.matchAll(/<figure\b[\s\S]*?<\/figure>/gi)].map((m) => m[0]);
check('the page shows real app captures', figures.length >= 3, String(figures.length));
for (const figure of figures) {
  const img = (figure.match(/<img\b[^>]*>/i) || [''])[0];
  const name = (img.match(/captures\/([a-z-]+)-\d{3,4}\.webp/) || [])[1] || '?';
  check(`capture ${name} has descriptive alt text`, /alt="[^"]{60,}"/.test(img));
  check(`capture ${name} has intrinsic dimensions`, /width="\d+"/.test(img) && /height="\d+"/.test(img));
  check(`capture ${name} has a caption`, /<figcaption>[\s\S]+?<\/figcaption>/.test(figure));
  check(`capture ${name} is listed in PROVENANCE.md`, provenance.includes(`${name}-*.webp`));
  for (const file of figure.matchAll(/\/assets\/captures\/([a-z-]+\.webp)/g)) {
    check(`capture file ${file[1]} exists`, existsSync(publicDir + 'assets/captures/' + file[1]));
  }
}
check('captures of the unreleased interface say so next to the download version',
  /next build[\s\S]{0,200}0\.2\.0-rc1[\s\S]{0,200}(?:earlier|dark)/i.test(text));
check('ready is described only as the result of chat answering', !/\bready\b/i.test(text.replace(/Ready"? only after chat has actually answered|reports ready only after chat has actually answered/gi, '')));
check('no eyebrow label sits above the h1', !/<p\b[^>]*>[^<]*(?:<[^>]+>[^<]*)*<\/p>\s*<h1\b/i.test(source));

console.log('Case H3 - accessibility and no-fabrication guardrails:');
check('main content is explicitly labelled', /<main\b[^>]*id=["']main["']/i.test(source));
check('primary navigation has an accessible name', /<nav\b[^>]*aria-label=/i.test(source));
check('CSS keeps a visible focus treatment', /:focus-visible\s*\{[^}]*outline/i.test(css));
check('CSS gates motion on the reduced-motion preference', /prefers-reduced-motion\s*:\s*(?:reduce|no-preference)/i.test(css));
check('interactive targets keep a 44px minimum', /min-height:\s*44px/.test(css));
check('no fake screenshot asset or simulated dashboard is shipped', !/mock[-_ ]?(?:ui|dashboard|screenshot)|fake[-_ ]?screenshot/i.test(source));
check('no future optimizer surface is presented', !/Models (?:&amp;|&) Fit|Optimi[sz]ation (?:screen|view)/i.test(text));
check('no forbidden overclaim is shipped', !/\b(?:one[- ]click|zero[- ]setup|works on any pc|self[- ]healing|optimal model|fastest model|no data (?:ever )?leaves|fully offline)\b/i.test(text));
check(
  'no third-party fetched subresource is introduced',
  !/<(?:script|img|source)\b[^>]*src(?:set)?=["']https?:\/\//i.test(source) &&
    !/<link\b[^>]*rel=["'](?:stylesheet|preload)["'][^>]*href=["']https?:\/\//i.test(source)
);
check('the homepage ships no JavaScript', !/<script\b/i.test(source));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
