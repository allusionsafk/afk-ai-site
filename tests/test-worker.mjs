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

// Advance only the Worker's deadline, without wall-clock waits or real HTTP.
async function withDeadline(run) {
  const originalSetTimeout = globalThis.setTimeout;
  const originalClearTimeout = globalThis.clearTimeout;
  const pending = new Map();
  globalThis.setTimeout = (callback, delay) => {
    const timer = {};
    pending.set(timer, { callback, delay });
    return timer;
  };
  globalThis.clearTimeout = (timer) => pending.delete(timer);
  try {
    await run({
      expire() {
        for (const [timer, { callback, delay }] of pending) {
          if (delay !== 15000) throw new Error('Unexpected upstream deadline');
          pending.delete(timer);
          callback();
        }
      },
      get pending() { return pending.size; },
    });
  } finally {
    globalThis.setTimeout = originalSetTimeout;
    globalThis.clearTimeout = originalClearTimeout;
  }
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

// --- Case 4b: receiving headers must not end the upstream deadline ---
console.log('Case 4b — installer body deadline:');
await withDeadline(async (deadline) => {
  resetCache();
  let aborted = false;
  globalThis.fetch = async (_url, { signal }) => new Response(new ReadableStream({
    start(controller) {
      signal.addEventListener('abort', () => {
        aborted = true;
        controller.error(new DOMException('Installer body timed out', 'AbortError'));
      }, { once: true });
    },
    pull(controller) {
      // Headers have arrived; time runs out only when consumption starts.
      deadline.expire();
      if (!signal.aborted) {
        controller.enqueue(PAYLOAD);
        controller.close();
      }
    },
  }, { highWaterMark: 0 }));
  res = await handleDownload(new Request('https://site/download'), ctx, OPTS);
  check('deadline aborts the upstream body after headers arrive', aborted);
  check('expired body returns 502', res.status === 502);
  check('expired body returns only the generic error',
    await res.text() === '{"error":"installer_unavailable"}');
  check('expired body is never cached', cacheStore.size === 0);
  check('expired body leaves no pending deadline', deadline.pending === 0);
});

// --- Case 4c: successful bodies release the deadline without aborting ---
await withDeadline(async (deadline) => {
  resetCache();
  let signal;
  globalThis.fetch = async (_url, init) => {
    signal = init.signal;
    return new Response(PAYLOAD);
  };
  res = await handleDownload(new Request('https://site/download'), ctx, OPTS);
  check('completed body is still served', res.status === 200);
  check('completed body clears its deadline', deadline.pending === 0);
  deadline.expire();
  check('completed request is never aborted later', !signal.aborted);
});

// --- Case 4d: every upstream failure releases the deadline ---
for (const failure of ['headers timeout', 'HTTP error', 'body read error']) {
  await withDeadline(async (deadline) => {
    resetCache();
    globalThis.fetch = async (_url, { signal }) => {
      if (failure === 'headers timeout') {
        return new Promise((_resolve, reject) => {
          signal.addEventListener('abort', () => reject(signal.reason), { once: true });
          deadline.expire();
        });
      }
      if (failure === 'HTTP error') return new Response('unavailable', { status: 503 });
      return new Response(new ReadableStream({
        start(controller) { controller.error(new Error('interrupted body')); },
      }));
    };
    res = await handleDownload(new Request('https://site/download'), ctx, OPTS);
    check(`${failure} returns 502`, res.status === 502);
    check(`${failure} clears its deadline`, deadline.pending === 0);
    check(`${failure} is never cached`, cacheStore.size === 0);
  });
}

// --- Case 5: HEAD returns headers but no body ---
resetCache();
globalThis.fetch = upstreamOk(PAYLOAD);
res = await handleDownload(new Request('https://site/download', { method: 'HEAD' }), ctx, OPTS);
console.log('Case 5 — HEAD:');
check('status 200', res.status === 200);
check('content-length still advertised', res.headers.get('content-length') === String(PAYLOAD.length));
check('body empty', (await res.arrayBuffer()).byteLength === 0);

// HEAD must remain bodyless on every failure path, while retaining the same
// generic status and security headers as GET. Integrity verification still runs.
console.log('Case 5b — HEAD failures:');
for (const failure of ['upstream HTTP', 'upstream body', 'length', 'digest', 'cache bytes', 'cache read']) {
  resetCache();
  globalThis.fetch = upstreamOk(PAYLOAD);
  if (failure === 'upstream HTTP') globalThis.fetch = async () => new Response('private details', { status: 503 });
  if (failure === 'upstream body') globalThis.fetch = async () => new Response(new ReadableStream({
    start(controller) { controller.error(new Error('private details')); },
  }));
  if (failure === 'length') globalThis.fetch = upstreamOk(PAYLOAD.slice(1));
  if (failure === 'digest') globalThis.fetch = upstreamOk(PAYLOAD.map((byte) => byte ^ 1));
  if (failure === 'cache bytes') globalThis.caches.default.match = async () => new Response('corrupt');
  if (failure === 'cache read') globalThis.caches.default.match = async () => ({
    async arrayBuffer() { throw new Error('private cache details'); },
  });
  res = await handleDownload(new Request('https://site/download', { method: 'HEAD' }), ctx, OPTS);
  check(`${failure} HEAD returns 502`, res.status === 502);
  check(`${failure} HEAD has no body`, res.body === null && (await res.text()) === '');
  check(`${failure} HEAD keeps generic JSON metadata`, res.headers.get('content-type') === 'application/json; charset=utf-8');
  check(`${failure} HEAD cannot be cached`, res.headers.get('cache-control') === 'no-store' && cacheStore.size === 0);
  check(`${failure} HEAD keeps the restrictive CSP`, res.headers.get('content-security-policy') === "default-src 'none'");
}

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
