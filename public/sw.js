const CACHE = "webos-plasma-v1";
const BASE = self.registration.scope;
const CORE = [BASE, `${BASE}index.html`, `${BASE}manifest.json`];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(r => {
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return r;
    }).catch(() => e.request.mode === "navigate"
      ? caches.match(`${BASE}index.html`)
      : new Response("", {status:503})
    ))
  );
});