// Cloudflare Worker entry for the AFK AI site (Static Assets model).
//
// Static files live in ./public and are served automatically by the assets
// binding (including _headers processing). This Worker handles one dynamic
// route, /download, and delegates everything else to assets.
//
// WHY /download EXISTS
// AFK AI Beta is distributed from a PINNED TAG, not from a GitHub Release.
// An earlier /api/release route resolved dynamically through the Releases API,
// which made AFK AI delivery depend on whatever release GitHub considered
// current rather than on the reviewed AFK AI Beta candidate. That mechanism is
// gone. Nothing on this site consults releases/latest, and releases for other
// work in the starter repository do not change the AFK AI download pin.
//
// Serving (rather than redirecting to raw.githubusercontent.com) is deliberate:
// raw responds text/plain, so a browser DISPLAYS the installer as source
// instead of downloading it. Proxying lets us set a real attachment
// disposition, give the file its product name, and verify the bytes first.
//
// Hardening:
//   - GET/HEAD only; other methods => 405.
//   - the payload is checked against a pinned SHA-256 before it is served.
//     A mismatch fails CLOSED (502) rather than shipping unverified bytes.
//   - cache key is normalized (query string stripped) so `?x=1` cache-busting
//     cannot bypass the edge cache and hammer the upstream.
//   - generic error shape only; upstream error details are never echoed.

// Public repository identity changes with the GitHub rename. The qualified
// installer source remains at its historical URL until that exact artifact is
// verified at the renamed raw URL. Do not couple this to the public link name.
const PUBLIC_REPO = 'allusionsafk/afk-ai';
const PINNED_SOURCE_REPO = 'allusionsafk/localai-windows-starter';

// The frozen AFK AI Beta artifact; keep tag, source URL, and digest unchanged
// during repository-identity work.
const RC_TAG = 'v0.1.7rc1';
const INSTALLER_SOURCE =
  `https://raw.githubusercontent.com/${PINNED_SOURCE_REPO}/${RC_TAG}/Install%20Local%20AI.cmd`;
// SHA-256 of that exact blob at that exact tag. Verified against the local git
// object and two independent downloads before it was pinned here.
const INSTALLER_SHA256 =
  '767e4f603c79c21ce9bebc01d42241d7b84ff9728c12fb13c43fff4d51c24356';

// What the visitor's browser saves it as. The product is "AFK AI".
const DOWNLOAD_FILENAME = 'Install AFK AI.cmd';

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
  const isHead = request.method === 'HEAD';

  // Edge cache, keyed without the query string.
  const cache = caches.default;
  const keyUrl = new URL(request.url);
  keyUrl.search = '';
  const cacheKey = new Request(keyUrl.toString(), { method: 'GET' });

  const hit = await cache.match(cacheKey);
  if (hit) {
    const body = await hit.arrayBuffer();
    const cachedDigest = toHex(await crypto.subtle.digest('SHA-256', body));
    if (cachedDigest !== expectedSha) return errorResponse(502);
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
  const digest = toHex(await crypto.subtle.digest('SHA-256', bytes));
  if (digest !== expectedSha) {
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

// Exported for the test suite.
export const _config = {
  PUBLIC_REPO,
  PINNED_SOURCE_REPO,
  RC_TAG,
  INSTALLER_SOURCE,
  INSTALLER_SHA256,
  DOWNLOAD_FILENAME,
};
