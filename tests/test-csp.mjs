// Prove the shipped markup, CSS and JS obey the Content-Security-Policy that
// public/_headers applies at the edge.
//
// This is the one class of site bug that never shows up in a local file:// or
// naive-server preview and only appears in production: the browser silently
// refuses an inline <script>, an inline style="" attribute or a third-party
// asset, and the page renders wrong for every visitor with no build error.
//
// Run via `npm test` (which runs this after the Worker suite).
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');

const headers = read('public/_headers');
const htmlPages = [
  ['index.html', read('public/index.html')],
  ['adaptive-media/index.html', read('public/adaptive-media/index.html')],
];
const html = htmlPages.map(([name, source]) => `<!-- ${name} -->\n${source}`).join('\n');
// Every stylesheet the pages link: the homepage has its own; the legacy media page keeps site.css.
const css = ['public/assets/site.css', 'public/assets/afk.css'].map(read).join('\n');
// The homepage ships no JavaScript. If a script is ever added again, it is checked here.
const appJs = existsSync(join(root, 'public/assets/app.js')) ? read('public/assets/app.js') : '';

let pass = 0;
let fail = 0;
function check(name, cond, detail) {
  if (cond) {
    pass++;
    console.log('  ok  ' + name);
  } else {
    fail++;
    console.log('FAIL  ' + name + (detail ? ' -> ' + detail : ''));
  }
}

// Parse the directives actually shipped, so this suite tracks _headers rather
// than a copy of it that can drift.
const cspLine = headers
  .split('\n')
  .map((l) => l.trim())
  .find((l) => l.startsWith('Content-Security-Policy:'));

console.log('Case A - the policy itself:');
check('a Content-Security-Policy is shipped', Boolean(cspLine));

const csp = (cspLine || '').replace('Content-Security-Policy:', '').trim();
const directive = (name) => {
  const found = csp
    .split(';')
    .map((d) => d.trim())
    .find((d) => d === name || d.startsWith(name + ' '));
  return found ? found.slice(name.length).trim() : null;
};

for (const name of ['default-src', 'script-src', 'style-src', 'font-src', 'connect-src']) {
  check(`${name} is declared`, directive(name) !== null);
}
check("frame-ancestors is 'none'", directive('frame-ancestors') === "'none'");
check("object-src is 'none'", directive('object-src') === "'none'");
check(
  'no policy directive allows unsafe-inline or unsafe-eval',
  !/unsafe-inline|unsafe-eval/.test(csp),
  csp
);

check(
  'Adaptive Media page is real content, not the placeholder',
  !/^\s*placeholder\s*$/i.test(read('public/adaptive-media/index.html'))
);

// Strip comments before scanning markup, so a CSP note in a comment does not
// read as a violation.
const htmlNoComments = html.replace(/<!--[\s\S]*?-->/g, '');
const cssNoComments = css.replace(/\/\*[\s\S]*?\*\//g, '');

console.log('Case B - all shipped markup obeys script-src ' + directive('script-src') + ':');
const scriptTags = [...htmlNoComments.matchAll(/<script\b([^>]*)>/gi)].map((m) => m[1]);
check('every <script> has a src (no inline script blocks)', scriptTags.every((a) => /\bsrc=/i.test(a)), String(scriptTags));
const scriptSrcs = [...htmlNoComments.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["']/gi)].map((m) => m[1]);
check('every script src is same-origin', scriptSrcs.every((s) => s.startsWith('/')), String(scriptSrcs));
check('no inline event handlers (onclick=, onload=, ...)', !/\son[a-z]+\s*=\s*["']/i.test(htmlNoComments));
check('no javascript: URLs', !/javascript:/i.test(htmlNoComments));

console.log('Case C - all shipped markup obeys style-src ' + directive('style-src') + ':');
check('no <style> blocks', !/<style\b/i.test(htmlNoComments));
check('no inline style="" attributes', !/\sstyle\s*=\s*["']/i.test(htmlNoComments));
const linkedCss = [...htmlNoComments.matchAll(/<link\b[^>]*rel=["']stylesheet["'][^>]*>/gi)].map((m) => m[0]);
check('every stylesheet is same-origin', linkedCss.every((t) => /href=["']\//.test(t)), String(linkedCss));

console.log('Case D - assets obey font-src/img-src (no third-party origins):');
// A remote asset would be blocked; a plain <a href> to another site would not,
// so only fetched-subresource attributes are checked here.
const subresource = [...htmlNoComments.matchAll(/\b(?:src|href)=["'](https?:\/\/[^"']+)["']/gi)]
  .filter((m) => !/<a\b[^>]*$/i.test(htmlNoComments.slice(0, m.index)))
  .map((m) => m[1]);
const remoteSubresources = subresource.filter(
  (u) => !u.startsWith('https://localai-windows-starter-site.') &&
    !u.startsWith('https://allusions.pages.dev/ai/') // canonical / og:url on the public route
);
check('no remote stylesheet/script/image/font subresources', remoteSubresources.length === 0, String(remoteSubresources));
check('no @import in the stylesheet', !/@import/i.test(cssNoComments));
const cssUrls = [...cssNoComments.matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/gi)].map((m) => m[1]);
check(
  'every url() in CSS is same-origin or a data: URI',
  cssUrls.every((u) => u.startsWith('/') || u.startsWith('data:') || !/^[a-z]+:\/\//i.test(u)),
  String(cssUrls)
);

console.log("Case E - the site makes no client-side network calls (connect-src " + directive('connect-src') + '):');
// _headers documents this claim; assert it rather than trusting the comment.
check('app.js has no fetch()', !/\bfetch\s*\(/.test(appJs));
check('app.js has no XMLHttpRequest', !/XMLHttpRequest/.test(appJs));
check('app.js has no WebSocket/EventSource', !/\b(WebSocket|EventSource)\b/.test(appJs));
check('app.js has no eval / Function constructor', !/\beval\s*\(|new\s+Function\s*\(/.test(appJs));
check('app.js sets no inline styles at runtime', !/\.style\s*\.|setAttribute\(\s*["']style["']/.test(appJs));

console.log("Case F - no analytics or third-party tracking:");
const trackers = /google-analytics|googletagmanager|gtag\(|plausible|fathom|segment\.com|hotjar|mixpanel|posthog|clarity\.ms|facebook\.net/i;
check('shipped HTML references no analytics provider', !trackers.test(html));
check('app.js references no analytics provider', !trackers.test(appJs));
check('the CSP would block one anyway (no third-party script origin)', !/script-src[^;]*https?:\/\//.test(csp));

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
