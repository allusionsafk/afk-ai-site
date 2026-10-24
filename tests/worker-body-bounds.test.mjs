import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { test } from 'node:test';
import { handleDownload } from '../worker.js';

const payload = new Uint8Array([0x4d, 0x5a, 0, 0, 0, 0, 0, 0]);
const options = {
  sourceUrl: 'https://installer.test/pinned.exe',
  expectedLength: payload.length,
  expectedSha: createHash('sha256').update(payload).digest('hex'),
};

function environment(t) {
  const original = { fetch: globalThis.fetch, caches: globalThis.caches };
  const cached = [];
  globalThis.caches = { default: {
    async match() { return null; },
    async put(_key, response) { cached.push(response); },
  } };
  t.after(() => { globalThis.fetch = original.fetch; globalThis.caches = original.caches; });
  return cached;
}

function source({ headers, chunks = 16, chunk = payload } = {}) {
  const stats = { pulls: 0, cancelled: false };
  const response = new Response(new ReadableStream({
    pull(controller) {
      if (++stats.pulls <= chunks) controller.enqueue(chunk);
      else controller.close();
    },
    cancel() { stats.cancelled = true; },
  }, { highWaterMark: 0 }), { headers });
  return { response, stats };
}

for (const method of ['GET', 'HEAD']) {
  test(`oversized unadvertised upstream ${method} stops at the pinned byte limit`, async t => {
    const cached = environment(t);
    const fixture = source();
    globalThis.fetch = async () => fixture.response;
    const response = await handleDownload(new Request('https://site/download', { method }), null, options);
    assert.equal(response.status, 502);
    assert.equal(await response.text(), method === 'HEAD' ? '' : '{"error":"installer_unavailable"}');
    assert.ok(fixture.stats.cancelled, 'the unread excess stream is cancelled');
    assert.ok(fixture.stats.pulls <= 2, 'consumption ends on the first excess chunk');
    assert.equal(cached.length, 0);
  });
}

test('oversized cache entry is bounded and never falls through to the upstream', async t => {
  environment(t);
  const fixture = source();
  globalThis.caches.default.match = async () => fixture.response;
  globalThis.fetch = async () => { throw new Error('upstream must not be used'); };
  const response = await handleDownload(new Request('https://site/download'), null, options);
  assert.equal(response.status, 502);
  assert.ok(fixture.stats.cancelled);
  assert.ok(fixture.stats.pulls <= 2);
});

test('an impossible unencoded Content-Length is rejected without reading the body', async t => {
  environment(t);
  const fixture = source({ headers: { 'content-length': '999999999999' }, chunks: 1 });
  globalThis.fetch = async () => fixture.response;
  const response = await handleDownload(new Request('https://site/download'), null, options);
  assert.equal(response.status, 502);
  assert.equal(fixture.stats.pulls, 0);
  assert.ok(fixture.stats.cancelled);
});

test('encoded representation length does not replace the decoded byte and digest contract', async t => {
  environment(t);
  // A decoded Fetch body may retain encoded representation headers. Its bytes are still verified.
  globalThis.fetch = async () => new Response(payload, { headers: { 'content-encoding': 'gzip', 'content-length': '1' } });
  const response = await handleDownload(new Request('https://site/download'), null, options);
  assert.equal(response.status, 200);
  assert.deepEqual(new Uint8Array(await response.arrayBuffer()), payload);
});

test('a truncated zero suffix cannot be accepted through preallocated zero-filled memory', async t => {
  environment(t);
  globalThis.fetch = async () => new Response(payload.slice(0, 2));
  const response = await handleDownload(new Request('https://site/download'), null, options);
  assert.equal(response.status, 502);
});

test('exact streamed bytes are verified and only then cached', async t => {
  const cached = environment(t);
  const tasks = [];
  globalThis.fetch = async () => new Response(new ReadableStream({
    start(controller) { controller.enqueue(payload.slice(0, 3)); controller.enqueue(payload.slice(3)); controller.close(); },
  }));
  const response = await handleDownload(new Request('https://site/download'), { waitUntil(task) { tasks.push(task); } }, options);
  assert.equal(response.status, 200);
  assert.deepEqual(new Uint8Array(await response.arrayBuffer()), payload);
  await Promise.all(tasks);
  assert.equal(cached.length, 1);
  assert.deepEqual(new Uint8Array(await cached[0].arrayBuffer()), payload);
});
