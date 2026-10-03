/* Bamboo Fountain service worker
 * - Precaches the app shell + CodeMirror modules (from esm.sh) so the editor works offline.
 * - Bump VERSION whenever index.html changes to roll out an update. */
const VERSION = 'v23';
const SHELL_CACHE = 'bf-shell-' + VERSION;
const CDN_CACHE = 'bf-cdn-v1'; // CodeMirror URLs are version-pinned, so this cache can persist across app versions

const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Must match the importmap in index.html
const CDN_ENTRIES = [
  'https://esm.sh/@codemirror/state@6.4.1',
  'https://esm.sh/@codemirror/view@6.26.3?deps=@codemirror/state@6.4.1',
  'https://esm.sh/@codemirror/commands@6.5.0?deps=@codemirror/state@6.4.1,@codemirror/view@6.26.3',
  'https://esm.sh/nspell@2.1.5'
];

// Spellcheck dictionary files (plain text, no imports to follow). Must match DICT_BASE in index.html
const DICT_URLS = [
  'https://cdn.jsdelivr.net/npm/dictionary-en@4.0.0/index.aff',
  'https://cdn.jsdelivr.net/npm/dictionary-en@4.0.0/index.dic'
];

// Cache a module and, recursively, every module it imports (esm.sh uses absolute-path imports like "/v135/...")
async function cacheModuleTree(url, cache, seen = new Set()) {
  if (seen.has(url) || seen.size > 200) return;
  seen.add(url);
  let res = await cache.match(url);
  if (!res) {
    res = await fetch(url, { mode: 'cors' });
    if (!res.ok) throw new Error('Failed ' + url);
    await cache.put(url, res.clone());
  }
  const text = await res.clone().text();
  const re = /(?:from|import)\s*["'](\/[^"']+)["']/g;
  let m;
  const deps = [];
  while ((m = re.exec(text))) deps.push(new URL(m[1], url).href);
  await Promise.all(deps.map(d => cacheModuleTree(d, cache, seen)));
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const shell = await caches.open(SHELL_CACHE);
    await shell.addAll(SHELL);
    // CDN prefetch is best-effort: a failure here must not block installing the app shell.
    try {
      const cdn = await caches.open(CDN_CACHE);
      await Promise.all(CDN_ENTRIES.map(u => cacheModuleTree(u, cdn)));
    } catch (e) { /* runtime caching below will fill the gaps */ }
    try {
      const cdn = await caches.open(CDN_CACHE);
      await Promise.all(DICT_URLS.map(async u => {
        if (await cdn.match(u)) return;
        const r = await fetch(u, { mode: 'cors' });
        if (r.ok) await cdn.put(u, r);
      }));
    } catch (e) { /* same: fetched and cached on first use instead */ }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keep = [SHELL_CACHE, CDN_CACHE];
    for (const k of await caches.keys()) if (!keep.includes(k)) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Page navigations: network first (fresh updates), fall back to cached shell when offline.
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const res = await fetch(req);
        const cache = await caches.open(SHELL_CACHE);
        cache.put('./index.html', res.clone());
        return res;
      } catch (e) {
        return (await caches.match('./index.html')) || (await caches.match('./')) || Response.error();
      }
    })());
    return;
  }

  // CodeMirror/nspell modules (esm.sh) and the spellcheck dictionary (jsDelivr): cache first, add anything new at runtime.
  if (url.hostname === 'esm.sh' || url.hostname === 'cdn.jsdelivr.net') {
    event.respondWith((async () => {
      const cache = await caches.open(CDN_CACHE);
      const hit = await cache.match(req);
      if (hit) return hit;
      const res = await fetch(req);
      if (res.ok) cache.put(req, res.clone());
      return res;
    })());
    return;
  }

  // Other same-origin assets: cache first, refresh in background.
  if (url.origin === location.origin) {
    event.respondWith((async () => {
      const cache = await caches.open(SHELL_CACHE);
      const hit = await cache.match(req);
      const refresh = fetch(req).then(res => {
        if (res.ok) cache.put(req, res.clone());
        return res;
      }).catch(() => null);
      return hit || (await refresh) || Response.error();
    })());
  }
});
