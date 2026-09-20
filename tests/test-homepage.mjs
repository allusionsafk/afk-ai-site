// Source-level contract for the AFK AI landing page. Runtime screenshots and
// browser checks cover layout; this suite locks the product hierarchy, maturity
// language, download path, and no-fabrication rules into CI.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const html = readFileSync(fileURLToPath(new URL('../public/index.html', import.meta.url)), 'utf8');
const css = readFileSync(fileURLToPath(new URL('../public/assets/site.css', import.meta.url)), 'utf8');
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
check('AFK AI is named before Allusions in visible content', text.indexOf('AFK AI') >= 0 && text.indexOf('AFK AI') < text.indexOf('Allusions'));
check('homepage keeps the pinned Beta version visible', /Beta[\s\S]{0,160}0\.1\.7rc1|0\.1\.7rc1[\s\S]{0,160}Beta/i.test(source));
check('homepage has at least two direct download calls to action', (source.match(/href=["']\/download["']/g) || []).length >= 2);
check('maker attribution is subordinate and explicit', /Built by\s+<a[^>]*>Allusions<\/a>/i.test(source));
check('maker attribution points to the Allusions site',
  /Built by\s+<a\b[^>]*href=["']https:\/\/allusions-site\.pages\.dev\/["'][^>]*>Allusions<\/a>/i.test(source));
check('header maker attribution uses the same site',
  /class=["']registration-note["'][^>]*>[\s\S]*?Built by\s+<a\b[^>]*href=["']https:\/\/allusions-site\.pages\.dev\/["'][^>]*>Allusions<\/a>/i.test(source));
check('legacy Friend Beta wording is absent', !/Friend Beta/i.test(source));

console.log('Case H2 - maturity and evidence structure:');
for (const maturity of ['shipping', 'beta', 'direction']) {
  check(`has a ${maturity} maturity section`, new RegExp(`<section\\b[^>]*data-maturity=["']${maturity}["']`, 'i').test(source));
}
check('maturity headings use approved language', /Shipping now/i.test(text) && /Beta limits/i.test(text) && /Development direction/i.test(text));
check('setup path is a labelled figure', /<figure\b[^>]*class=["'][^"']*setup-figure[^"']*["'][^>]*>[\s\S]*?<figcaption/i.test(source));
check('product proof is a labelled asymmetric figure', /<figure\b[^>]*class=["'][^"']*proof-figure[^"']*["'][^>]*>[\s\S]*?<figcaption/i.test(source));
check('future demo seam is truthfully labelled', /class=["'][^"']*demo-seam[^"']*["'][\s\S]*20[–-]60 second product demo/i.test(source));

console.log('Case H3 - accessibility and no-fabrication guardrails:');
check('main content is explicitly labelled', /<main\b[^>]*id=["']main["']/i.test(source));
check('primary navigation has an accessible name', /<nav\b[^>]*aria-label=/i.test(source));
check('decorative schematic layers are hidden from assistive tech', /class=["'][^"']*setup-diagram[^"']*["'][^>]*aria-hidden=["']true["']/i.test(source));
check('CSS preserves reduced focus treatment', /:focus-visible\s*\{[^}]*outline/i.test(css));
check('CSS preserves reduced-motion handling', /prefers-reduced-motion\s*:\s*reduce/i.test(css));
check('no fake screenshot asset or simulated dashboard is shipped', !/mock[-_ ]?(?:ui|dashboard|screenshot)|fake[-_ ]?screenshot|product-screenshot/i.test(source));
check('no forbidden overclaim is shipped', !/\b(?:one[- ]click|zero[- ]setup|works on any pc|self[- ]healing|optimal model|fastest model|no data (?:ever )?leaves)\b/i.test(text));
check(
  'no third-party fetched subresource is introduced',
  !/<(?:script|img)\b[^>]*src=["']https?:\/\//i.test(source) &&
    !/<link\b[^>]*rel=["'](?:stylesheet|preload)["'][^>]*href=["']https?:\/\//i.test(source)
);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
