import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { Miniflare, convertV4MiniflareOptions } from 'miniflare';

// Execute the unchanged production module in workerd. Only this test adapter
// supplies synthetic installer identity; the deployed entrypoint cannot do so.
const payload = new Uint8Array([0x4d, 0x5a, 0, 0xff]);
const sha = createHash('sha256').update(payload).digest('hex');
const root = fileURLToPath(new URL('../', import.meta.url));

test('download contracts in the Cloudflare runtime', { timeout: 30000 }, async () => {
  let upstreamCalls = 0;
  const mf = new Miniflare(convertV4MiniflareOptions({
    modules: [
      {
        type: 'ESModule',
        path: `${root}tests/runtime-entry.mjs`,
        contents: `
          import worker, { handleDownload } from '../worker.js';
          export default {
            async fetch(request, env, ctx) {
              const url = new URL(request.url);
              if (!url.pathname.startsWith('/fixture/')) return worker.fetch(request, env, ctx);
              const tasks = [];
              const response = await handleDownload(request, { waitUntil(p) { tasks.push(p); } }, {
                sourceUrl: 'https://installer.test/' + (url.searchParams.get('mode') || 'ok'),
                expectedSha: '${sha}', expectedLength: ${payload.length},
              });
              await Promise.all(tasks);
              return response;
            }
          };
        `,
      },
      { type: 'ESModule', path: `${root}worker.js` },
    ],
    compatibilityDate: '2024-11-01',
    cf: false,
    serviceBindings: { ASSETS: () => new Response('asset fixture', { status: 404 }) },
    outboundService: (request) => {
      assert.equal(new URL(request.url).origin, 'https://installer.test');
      upstreamCalls++;
      const mode = new URL(request.url).pathname;
      if (mode === '/unavailable') return new Response('private upstream details', { status: 503 });
      if (mode === '/corrupt') return new Response(new Uint8Array([0x4d, 0x5a, 0, 0xfe]));
      if (mode === '/stall') return new Response(new ReadableStream({
        start(controller) { controller.enqueue(payload.slice(0, 1)); },
      }));
      return new Response(payload);
    },
  }));
  try {
    let response = await mf.dispatchFetch('https://site/fixture/download?visitor=first', {
      headers: { range: 'bytes=0-0', 'if-range': 'untrusted' },
    });
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-length'), '4');
    assert.equal(response.headers.get('content-disposition'), 'attachment; filename="AFKLocalAISetup-0.2.0-rc1-x64.exe"');
    assert.deepEqual(new Uint8Array(await response.arrayBuffer()), payload);
    assert.equal(upstreamCalls, 1);

    response = await mf.dispatchFetch('https://site/fixture/download?visitor=second&mode=unavailable', { method: 'HEAD' });
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-length'), '4');
    assert.equal(await response.text(), '');
    assert.equal(upstreamCalls, 1, 'query changes and HEAD reuse the verified cache entry');

    for (const mode of ['unavailable', 'corrupt']) {
      response = await mf.dispatchFetch(`https://site/fixture/${mode}?mode=${mode}`);
      assert.equal(response.status, 502);
      assert.equal(await response.text(), '{"error":"installer_unavailable"}');
      response = await mf.dispatchFetch(`https://site/fixture/${mode}?mode=${mode}`, { method: 'HEAD' });
      assert.equal(response.status, 502);
      assert.equal(await response.text(), '');
      assert.equal(response.headers.get('cache-control'), 'no-store');
      assert.equal(response.headers.get('content-security-policy'), "default-src 'none'");
    }
    assert.equal(upstreamCalls, 5, 'failed GET responses never enter the cache');

    response = await mf.dispatchFetch('https://site/download', { method: 'POST' });
    assert.equal(response.status, 405);
    assert.equal(response.headers.get('allow'), 'GET, HEAD');
    response = await mf.dispatchFetch('https://site/missing');
    assert.equal(response.status, 404);
    assert.equal(await response.text(), 'asset fixture');

    const started = Date.now();
    response = await mf.dispatchFetch('https://site/fixture/stall?mode=stall', {
      signal: AbortSignal.timeout(22000),
    });
    assert.equal(response.status, 502);
    assert.equal(await response.text(), '{"error":"installer_unavailable"}');
    assert.ok(Date.now() - started >= 14000, 'the real 15-second body deadline was exercised');
  } finally {
    await mf.dispose();
  }
});
