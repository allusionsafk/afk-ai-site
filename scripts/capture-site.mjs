#!/usr/bin/env node
// Dependency-free, deterministic full-page capture through Chrome DevTools
// Protocol. Fails on page/console errors or horizontal viewport overflow.
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';

function args(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 2) out[argv[i].replace(/^--/, '')] = argv[i + 1];
  return out;
}

const options = args(process.argv.slice(2));
const url = options.url;
const output = options.out;
const width = Number(options.width);
const height = Number(options.height || 900);
const theme = options.theme || 'light';
const strict = options.strict !== 'false';
const mobile = options.mobile === 'true' || (options.mobile !== 'false' && width <= 480);
const full = options.full !== 'false';
const chrome = options.chrome || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

if (!url || !output || !Number.isFinite(width) || width < 160 || !Number.isFinite(height)) {
  console.error('Usage: node scripts/capture-site.mjs --url URL --out FILE --width PX [--height PX] [--theme light|dark] [--strict false] [--mobile false] [--full false]');
  process.exit(2);
}
if (!existsSync(chrome)) throw new Error(`Chrome not found: ${chrome}`);

const profile = mkdtempSync(join(tmpdir(), 'afk-site-capture-'));
const child = spawn(chrome, [
  '--headless=new',
  '--remote-debugging-port=0',
  `--user-data-dir=${profile}`,
  '--no-first-run',
  '--no-default-browser-check',
  '--disable-background-networking',
  '--disable-component-update',
  '--hide-scrollbars',
  'about:blank',
], { stdio: ['ignore', 'ignore', 'pipe'], windowsHide: true });

let chromeErrors = '';
child.stderr.on('data', (chunk) => { chromeErrors += chunk.toString(); });
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForDebugPort() {
  const marker = join(profile, 'DevToolsActivePort');
  for (let i = 0; i < 100; i++) {
    if (existsSync(marker)) return Number(readFileSync(marker, 'utf8').split(/\r?\n/)[0]);
    if (child.exitCode !== null) throw new Error(`Chrome exited before CDP was ready: ${chromeErrors}`);
    await sleep(50);
  }
  throw new Error(`Timed out waiting for Chrome CDP: ${chromeErrors}`);
}

let socket;
try {
  const port = await waitForDebugPort();
  const targetResponse = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent('about:blank')}`, { method: 'PUT' });
  if (!targetResponse.ok) throw new Error(`Could not create Chrome target: ${targetResponse.status}`);
  const target = await targetResponse.json();
  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });

  let nextId = 0;
  const pending = new Map();
  const runtimeErrors = [];
  const events = new Map();
  socket.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message)); else resolve(message.result);
      return;
    }
    if (message.method === 'Runtime.exceptionThrown') runtimeErrors.push(message.params.exceptionDetails.text || 'Runtime exception');
    if (message.method === 'Runtime.consoleAPICalled' && ['error', 'assert'].includes(message.params.type)) runtimeErrors.push(`console.${message.params.type}`);
    if (message.method === 'Log.entryAdded' && message.params.entry.level === 'error') runtimeErrors.push(message.params.entry.text);
    const listeners = events.get(message.method) || [];
    listeners.splice(0).forEach((resolve) => resolve(message.params));
  });

  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
  const once = (method) => new Promise((resolve) => {
    const listeners = events.get(method) || [];
    listeners.push(resolve);
    events.set(method, listeners);
  });

  await Promise.all([send('Page.enable'), send('Runtime.enable'), send('Log.enable')]);
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile,
    screenWidth: width,
    screenHeight: height,
  });
  await send('Emulation.setEmulatedMedia', {
    media: '',
    features: [{ name: 'prefers-color-scheme', value: theme }],
  });
  const loaded = once('Page.loadEventFired');
  await send('Page.navigate', { url });
  await loaded;
  await send('Runtime.evaluate', {
    expression: 'document.fonts.ready.then(() => new Promise(resolve => setTimeout(resolve, 250)))',
    awaitPromise: true,
  });
  const hash = new URL(url).hash;
  if (hash) {
    await send('Runtime.evaluate', {
      expression: `document.querySelector(${JSON.stringify(hash)})?.scrollIntoView({ behavior: 'instant', block: 'start' })`,
    });
  }
  const measured = await send('Runtime.evaluate', {
    expression: `({
      title: document.title,
      readyState: document.readyState,
      viewportWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      layoutDiagnostics: ['html', 'body', '.instrument-header', '.instrument-nav-row', '.topnav', '.topacts', 'main']
        .map(selector => {
          const element = document.querySelector(selector);
          if (!element) return { selector, missing: true };
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return {
            selector,
            clientWidth: element.clientWidth,
            scrollWidth: element.scrollWidth,
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            width: Math.round(rect.width),
            overflowX: style.overflowX,
            minWidth: style.minWidth
          };
        }),
      overflowingElements: [...document.body.querySelectorAll('*')]
        .map(element => {
          const rect = element.getBoundingClientRect();
          return {
            selector: element.id ? '#' + element.id : element.tagName.toLowerCase() + (element.className && typeof element.className === 'string' ? '.' + element.className.trim().replace(/\\s+/g, '.') : ''),
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            width: Math.round(rect.width)
          };
        })
        .filter(({ left, right }) => left < -1 || right > document.documentElement.clientWidth + 1)
        .slice(0, 12),
      intrinsicOverflowElements: [...document.querySelectorAll('main *')]
        .map(element => ({
          selector: element.id ? '#' + element.id : element.tagName.toLowerCase() + (element.className && typeof element.className === 'string' ? '.' + element.className.trim().replace(/\\s+/g, '.') : ''),
          clientWidth: element.clientWidth,
          scrollWidth: element.scrollWidth,
          overflowX: getComputedStyle(element).overflowX
        }))
        .filter(({ clientWidth, scrollWidth, overflowX }) => scrollWidth > clientWidth + 1 && overflowX === 'visible')
        .slice(0, 20)
    })`,
    returnByValue: true,
  });
  const metrics = measured.result.value;
  if (metrics.scrollWidth > metrics.viewportWidth + 1) {
    const offenders = metrics.overflowingElements.map(({ selector, right }) => `${selector} (${right}px)`).join(', ');
    runtimeErrors.push(`horizontal overflow ${metrics.scrollWidth}px > ${metrics.viewportWidth}px${offenders ? `; offenders: ${offenders}` : ''}`);
  }
  const screenshot = await send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: full,
    fromSurface: true,
  });
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, Buffer.from(screenshot.data, 'base64'));

  if (strict && runtimeErrors.length) throw new Error(runtimeErrors.join('; '));
  console.log(JSON.stringify({ output, width, height, theme, strict, full, issues: runtimeErrors, ...metrics }));
} finally {
  if (socket && socket.readyState === WebSocket.OPEN) socket.close();
  child.kill();
  await sleep(100);
  rmSync(profile, { recursive: true, force: true });
}
