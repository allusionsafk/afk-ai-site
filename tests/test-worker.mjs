// Unit-test worker.js handleDownload() with mocked Cloudflare runtime globals.
// Run via `npm test` (from the repo root, so the relative import resolves).
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import worker, { handleDownload, _config } from '../worker.js';

const ctx = { waitUntil() {} };
let cacheStore = new Map();
function resetCache() {
  cacheStore = new Map();
  globalThis.caches = {
    default: {
      async match(key) { return cacheStore.get(key.url)?.clone() ?? null; },
      async put(key, res) { cacheStore.set(key.url, res); },
    },
  };
}

const enc = new TextEncoder();
async function sha256Hex(bytes) {
  const d = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
function upstreamOk(bytes) {
  return async () => new Response(bytes, { status: 200, headers: { 'content-length': String(bytes.length) } });
}

let pass = 0, fail = 0;
function check(name, cond) { (cond ? (pass++, console.log('  ok  ' + name)) : (fail++, console.log('FAIL  ' + name))); }

const PAYLOAD = enc.encode('MZ pretend EXE installer');
const GOOD_SHA = await sha256Hex(PAYLOAD);
const OPTS = { sourceUrl: 'https://upstream.test/AFKLocalAISetup-0.2.0-rc1-x64.exe', expectedSha: GOOD_SHA, expectedLength: PAYLOAD.length };

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
check('filename is the exact release asset', res.headers.get('content-disposition') === 'attachment; filename="AFKLocalAISetup-0.2.0-rc1-x64.exe"');
check('content-length matches payload', res.headers.get('content-length') === String(PAYLOAD.length));
check('bytes served are the upstream bytes', body.length === PAYLOAD.length && body.every((b, i) => b === PAYLOAD[i]));
check('nosniff header', res.headers.get('x-content-type-options') === 'nosniff');
check('x-frame-options DENY', res.headers.get('x-frame-options') === 'DENY');

// --- Case 2: tampered upstream must fail CLOSED ---
resetCache();
globalThis.fetch = upstreamOk(enc.encode('MZ TAMPERED'));
res = await handleDownload(new Request('https://site/download'), ctx, OPTS);
let text = await res.text();
console.log('Case 2 — tampered upstream:');
check('status 502', res.status === 502);
check('no installer bytes served', text.indexOf('TAMPERED') === -1);
check('generic error shape only', text === JSON.stringify({ error: 'installer_unavailable' }));
check('not cached', cacheStore.size === 0);

// --- Case 2b: matching digest with a wrong byte length still fails closed ---
resetCache();
globalThis.fetch = upstreamOk(PAYLOAD);
res = await handleDownload(new Request('https://site/download'), ctx, { ...OPTS, expectedLength: PAYLOAD.length + 1 });
check('wrong byte length is refused', res.status === 502);
check('wrong byte length is not cached', cacheStore.size === 0);

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
let cachedUnder = cacheStore.size ? 'stored' : 'missing';
globalThis.fetch = async () => { throw new Error('upstream must not be hit on a cache hit'); };
res = await handleDownload(new Request('https://site/download?b=2'), ctx, OPTS);
console.log('Case 6 — cache key normalization:');
check('first request cached', cachedUnder === 'stored');
check('different query served from cache without hitting upstream', res.status === 200);

// --- Case 6b: a cache entry from a previous installer pin cannot be reused ---
const previousBody = enc.encode('old installer');
const previousSha = await sha256Hex(previousBody);
globalThis.fetch = upstreamOk(previousBody);
res = await handleDownload(new Request('https://site/download'), ctx,
  { ...OPTS, expectedSha: previousSha, expectedLength: previousBody.length });
check('new digest uses a distinct cache key', new TextDecoder().decode(await res.arrayBuffer()) === 'old installer');

// --- Case 6c: a damaged cache entry must fail closed ---
resetCache();
globalThis.fetch = upstreamOk(PAYLOAD);
await handleDownload(new Request('https://site/download'), ctx, OPTS);
for (const key of cacheStore.keys()) cacheStore.set(key, new Response(enc.encode('corrupt cached bytes')));
globalThis.fetch = async () => { throw new Error('cache hit must not fetch upstream'); };
res = await handleDownload(new Request('https://site/download'), ctx, OPTS);
check('corrupt cached bytes are refused', res.status === 502);

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
// The homepage ships no JavaScript; if a script comes back, it is held to the same rule.
const appjsPath = fileURLToPath(new URL('../public/assets/app.js', import.meta.url));
const appjs = existsSync(appjsPath) ? readFileSync(appjsPath, 'utf8') : '';
console.log('Case 9 — release pin truth:');
check('RC tag is v0.2.0-rc1', _config.RC_TAG === 'v0.2.0-rc1');
check('installer source is the exact public release asset', _config.INSTALLER_SOURCE ===
  'https://github.com/allusionsafk/afk-ai/releases/download/v0.2.0-rc1/AFKLocalAISetup-0.2.0-rc1-x64.exe');
check('pinned byte length is the certified length', _config.INSTALLER_BYTES === 58367121);
check('pinned digest is the certified digest', _config.INSTALLER_SHA256 === 'e380aa5c70bc4820df9f6c93e9d0602a3e9d0df501586090facb67c4f7c7447a');
check('pinned sha256 is 64 lowercase hex', /^[0-9a-f]{64}$/.test(_config.INSTALLER_SHA256));
check('worker.js never calls releases/latest', !/releases\/latest/.test(src.replace(/^\s*\/\/.*$/gm, '')));
check('worker.js never calls the releases API', !/api\.github\.com/.test(src.replace(/^\s*\/\/.*$/gm, '')));
check('app.js has no release fetching', !/api\/release|releases\/latest/.test(appjs));
check('index.html has no releases/latest link', !/releases\/latest/.test(html));
check('index.html CTA points at /download', /href="\/download"/.test(html));
check('index.html shows the beta version', /0\.2\.0-rc1/.test(html));
check('index.html never claims a stable release', !/\bstable release\b|\bproduction release\b/i.test(html));

console.log('\n' + pass + ' passed, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
