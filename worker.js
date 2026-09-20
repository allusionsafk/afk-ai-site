// Cloudflare Worker entry for the AFK AI site (Static Assets model).
//
// Static files live in ./public and are served automatically by the assets
// binding (including _headers processing). This Worker handles one dynamic
// route, /download, and delegates everything else to assets.
//
// WHY /download EXISTS
// The Beta installer is fetched from one exact GitHub prerelease asset.
// Nothing here consults releases/latest or selects an asset dynamically.
//
// Serving through the Worker lets us verify the bytes before returning them
// and set an explicit attachment filename.
//
// Hardening:
//   - GET/HEAD only; other methods => 405.
//   - the payload is checked against pinned length and SHA-256 before serving.
//     A mismatch fails CLOSED (502) rather than shipping unverified bytes.
//   - cache key is normalized (query string stripped) so `?x=1` cache-busting
//     cannot bypass the edge cache and hammer the upstream.
//   - generic error shape only; upstream error details are never echoed.

const REPO = 'allusionsafk/afk-ai';

// The exact published asset was independently downloaded and compared with the
// candidate workflow's certified bytes before this pin was changed.
const RC_TAG = 'v0.2.0-rc1';
const DOWNLOAD_FILENAME = 'AFKLocalAISetup-0.2.0-rc1-x64.exe';
const INSTALLER_SOURCE =
  `https://github.com/${REPO}/releases/download/${RC_TAG}/${DOWNLOAD_FILENAME}`;
const INSTALLER_SHA256 =
  'e380aa5c70bc4820df9f6c93e9d0602a3e9d0df501586090facb67c4f7c7447a';
const INSTALLER_BYTES = 58367121;

const UPSTREAM_TIMEOUT_MS = 15000;

function toHex(buffer) {
  const bytes = new Uint8Array(buffer);
  let out = '';
  for (let i = 0; i < bytes.length; i++) out += bytes[i].toString(16).padStart(2, '0');
  return out;
}

function errorResponse(status) {
  return new Response(
    JSON.stringify({ error: 'installer_unavailable' }),
    {
      status,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store',
        'x-content-type-options': 'nosniff',
        'content-security-policy': "default-src 'none'",
        'x-frame-options': 'DENY',
      },
    }
  );
}

function installerHeaders(length) {
  return {
    // octet-stream + attachment is what makes this an actual download rather
    // than a page of text.
    'content-type': 'application/octet-stream',
    'content-disposition': `attachment; filename="${DOWNLOAD_FILENAME}"`,
    'content-length': String(length),
    'x-content-type-options': 'nosniff',
    'content-security-policy': "default-src 'none'",
    'x-frame-options': 'DENY',
    'cross-origin-resource-policy': 'same-origin',
    'referrer-policy': 'strict-origin-when-cross-origin',
    // Short cache: a pinned artifact is stable, but a beta pin may move.
    'cache-control': 'public, max-age=900, s-maxage=900, stale-while-revalidate=3600',
  };
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/download') {
      if (request.method !== 'GET' && request.method !== 'HEAD') {
        return new Response('Method Not Allowed', {
          status: 405,
          headers: { allow: 'GET, HEAD' },
        });
      }
      return handleDownload(request, ctx);
    }
    // Everything else → static assets in ./public (index.html, _headers, etc.).
    return env.ASSETS.fetch(request);
  },
};

// `opts` exists so the test suite can drive the integrity gate with synthetic
// bytes. Production callers pass nothing and get the pinned constants above;
// there is no way to relax the check from outside a request.
export async function handleDownload(request, ctx, opts) {
  const sourceUrl = (opts && opts.sourceUrl) || INSTALLER_SOURCE;
  const expectedSha = (opts && opts.expectedSha) || INSTALLER_SHA256;
  const expectedLength = (opts && opts.expectedLength) ?? INSTALLER_BYTES;
  const isHead = request.method === 'HEAD';

  // The digest separates this release from bytes cached under older pins.
  // Visitor query strings do not create separate cache entries.
  const cache = caches.default;
  const keyUrl = new URL(request.url);
  keyUrl.search = `?sha256=${expectedSha}`;
  const cacheKey = new Request(keyUrl.toString(), { method: 'GET' });

  const hit = await cache.match(cacheKey);
  if (hit) {
    let body;
    try { body = await hit.arrayBuffer(); } catch (e) { return errorResponse(502); }
    if (!(await hasExpectedIdentity(body, expectedLength, expectedSha))) {
      return errorResponse(502);
    }
    return new Response(isHead ? null : body, {
      status: 200,
      headers: installerHeaders(body.byteLength),
    });
  }

  let bytes;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
    let upstream;
    try {
      upstream = await fetch(sourceUrl, {
        headers: { 'User-Agent': 'afk-ai-site' },
        signal: controller.signal,
        cf: { cacheTtl: 900, cacheEverything: true },
      });
    } finally {
      clearTimeout(timer);
    }
    if (!upstream.ok) throw new Error(`upstream ${upstream.status}`);
    bytes = await upstream.arrayBuffer();
  } catch (e) {
    return errorResponse(502);
  }

  // Integrity gate. An upstream that has been tampered with, truncated, or
  // silently repointed must not reach a visitor's machine as an executable.
  if (!(await hasExpectedIdentity(bytes, expectedLength, expectedSha))) {
    return errorResponse(502);
  }

  const cacheable = new Response(bytes, {
    status: 200,
    headers: installerHeaders(bytes.byteLength),
  });
  if (ctx && typeof ctx.waitUntil === 'function') {
    ctx.waitUntil(cache.put(cacheKey, cacheable.clone()));
  }

  return new Response(isHead ? null : bytes, {
    status: 200,
    headers: installerHeaders(bytes.byteLength),
  });
}

async function hasExpectedIdentity(bytes, length, sha256) {
  return bytes.byteLength === length &&
    toHex(await crypto.subtle.digest('SHA-256', bytes)) === sha256;
}

// Exported for the test suite.
export const _config = {
  REPO,
  RC_TAG,
  INSTALLER_SOURCE,
  INSTALLER_SHA256,
  INSTALLER_BYTES,
  DOWNLOAD_FILENAME,
};
