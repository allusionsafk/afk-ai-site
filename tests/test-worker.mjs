// Unit-test worker.js handleDownload() with mocked Cloudflare runtime globals.
// Run via `npm test` (from the repo root, so the relative import resolves).
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import worker, { handleDownload, _config } from '../worker.js';

const ctx = { waitUntil() {} };
let cacheStore = null;
function resetCache() {
  cacheStore = null;
  globalThis.caches = {
    default: {
      async match() { return cacheStore; },
      async put(_key, res) { cacheStore = res; },
    },
  };
}

const enc = new TextEncoder();
async function sha256Hex(bytes) {
  const d = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
function upstreamOk(bytes) {
  return async () => ({ ok: true, status: 200, async arrayBuffer() { return bytes.buffer ?? bytes; } });
}

let pass = 0, fail = 0;
function check(name, cond) { (cond ? (pass++, console.log('  ok  ' + name)) : (fail++, console.log('FAIL  ' + name))); }

const PAYLOAD = enc.encode('@echo off\r\nrem pretend installer\r\n');
const GOOD_SHA = await sha256Hex(PAYLOAD);
const OPTS = { sourceUrl: 'https://upstream.test/Install.cmd', expectedSha: GOOD_SHA };

// --- Case 1: verified installer is served as a real download ---
resetCache();
globalThis.fetch = upstreamOk(PAYLOAD);
let res = await handleDownload(new Request('https://site/download?x=1'), ctx, OPTS);
let body = new Uint8Array(await res.arrayBuffer());
console.log('Case 1 — verified installer:');
check('status 200', res.status === 200);
check('octet-stream (forces a download, not a text page)',
  res.headers.get('content-type') === 'application/octet-stream');
check('attachment disposition', (res.headers.get('content-disposition') || '').startsWith('attachment;'));
check('filename is the product name', res.headers.get('content-disposition') === 'attachment; filename="Install AFK AI.cmd"');
check('content-length matches payload', res.headers.get('content-length') === String(PAYLOAD.length));
check('bytes served are the upstream bytes', body.length === PAYLOAD.length && body.every((b, i) => b === PAYLOAD[i]));
check('nosniff header', res.headers.get('x-content-type-options') === 'nosniff');
check('x-frame-options DENY', res.headers.get('x-frame-options') === 'DENY');

// --- Case 2: tampered upstream must fail CLOSED ---
resetCache();
globalThis.fetch = upstreamOk(enc.encode('@echo off\r\nrem TAMPERED\r\n'));
res = await handleDownload(new Request('https://site/download'), ctx, OPTS);
let text = await res.text();
console.log('Case 2 — tampered upstream:');
check('status 502', res.status === 502);
check('no installer bytes served', text.indexOf('TAMPERED') === -1);
check('generic error shape only', text === JSON.stringify({ error: 'installer_unavailable' }));
check('not cached', cacheStore === null);

// --- Case 3: upstream unavailable ---
resetCache();
globalThis.fetch = async () => ({ ok: false, status: 404, async arrayBuffer() { return new ArrayBuffer(0); } });
res = await handleDownload(new Request('https://site/download'), ctx, OPTS);
console.log('Case 3 — upstream 404:');
check('status 502', res.status === 502);
check('no-store on error', res.headers.get('cache-control') === 'no-store');

// --- Case 4: upstream throws ---
resetCache();
globalThis.fetch = async () => { throw new Error('network'); };
res = await handleDownload(new Request('https://site/download'), ctx, OPTS);
console.log('Case 4 — upstream throws:');
check('status 502', res.status === 502);

// --- Case 5: HEAD returns headers but no body ---
resetCache();
globalThis.fetch = upstreamOk(PAYLOAD);
res = await handleDownload(new Request('https://site/download', { method: 'HEAD' }), ctx, OPTS);
console.log('Case 5 — HEAD:');
check('status 200', res.status === 200);
check('content-length still advertised', res.headers.get('content-length') === String(PAYLOAD.length));
check('body empty', (await res.arrayBuffer()).byteLength === 0);

// --- Case 6: cache key ignores the query string ---
resetCache();
globalThis.fetch = upstreamOk(PAYLOAD);
await handleDownload(new Request('https://site/download?a=1'), ctx, OPTS);
let cachedUnder = cacheStore ? 'stored' : 'missing';
globalThis.fetch = async () => { throw new Error('upstream must not be hit on a cache hit'); };
res = await handleDownload(new Request('https://site/download?b=2'), ctx, OPTS);
console.log('Case 6 — cache key normalization:');
check('first request cached', cachedUnder === 'stored');
check('different query served from cache without hitting upstream', res.status === 200);

// --- Case 6b: a corrupt or poisoned cache entry must not bypass integrity ---
resetCache();
cacheStore = new Response(enc.encode('@echo off\r\nrem TAMPERED CACHE\r\n'));
globalThis.fetch = async () => { throw new Error('cache hit must not need upstream'); };
res = await handleDownload(new Request('https://site/download'), ctx, OPTS);
console.log('Case 6b — tampered edge cache:');
check('unverified cached bytes fail closed', res.status === 502);
check('tampered cache bytes are not served', !(await res.text()).includes('TAMPERED CACHE'));

// --- Case 7: method gate on the route ---
resetCache();
const env = { ASSETS: { fetch: async () => new Response('asset', { status: 200 }) } };
res = await worker.fetch(new Request('https://site/download', { method: 'POST' }), env, ctx);
console.log('Case 7 — method gate:');
check('POST /download is 405', res.status === 405);
check('Allow header lists GET, HEAD', res.headers.get('allow') === 'GET, HEAD');

// --- Case 8: everything else falls through to static assets ---
res = await worker.fetch(new Request('https://site/'), env, ctx);
console.log('Case 8 — asset passthrough:');
check('non-/download served by ASSETS', (await res.text()) === 'asset');

// --- Case 9: the pin itself, and no releases/latest anywhere ---
const src = readFileSync(fileURLToPath(new URL('../worker.js', import.meta.url)), 'utf8');
const html = readFileSync(fileURLToPath(new URL('../public/index.html', import.meta.url)), 'utf8');
const appjs = readFileSync(fileURLToPath(new URL('../public/assets/app.js', import.meta.url)), 'utf8');
console.log('Case 9 — release pin truth:');
check('RC tag is v0.1.7rc1', _config.RC_TAG === 'v0.1.7rc1');
check('installer source points at that tag', _config.INSTALLER_SOURCE.includes('/v0.1.7rc1/'));
check('installer source is the raw tag blob', _config.INSTALLER_SOURCE ===
  'https://raw.githubusercontent.com/allusionsafk/localai-windows-starter/v0.1.7rc1/Install%20Local%20AI.cmd');
check('future public repository is separate from the qualified download source',
  _config.PUBLIC_REPO === 'allusionsafk/afk-ai' &&
  _config.PINNED_SOURCE_REPO === 'allusionsafk/localai-windows-starter');
check('pinned sha256 is 64 lowercase hex', /^[0-9a-f]{64}$/.test(_config.INSTALLER_SHA256));
check('worker.js never calls releases/latest', !/releases\/latest/.test(src.replace(/^\s*\/\/.*$/gm, '')));
check('worker.js never calls the releases API', !/api\.github\.com/.test(src.replace(/^\s*\/\/.*$/gm, '')));
check('app.js has no release fetching', !/api\/release|releases\/latest/.test(appjs));
check('index.html has no releases/latest link', !/releases\/latest/.test(html));
check('index.html CTA points at /download', /href="\/download"/.test(html));
check('index.html shows the beta version', /0\.1\.7rc1/.test(html));
check('index.html names AFK AI Beta and retires Friend Beta',
  /AFK AI Beta/.test(html) && !/Friend Beta/i.test(html));
check('index.html never claims a stable release', !/\bstable release\b|\bproduction release\b/i.test(html));

console.log('\n' + pass + ' passed, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
