const CACHE_VERSION = Date.now(); // auto version
const CACHE_NAME = `portfolio-cache-${CACHE_VERSION}`;

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/style.css",
        "/manifest.json"
      ]);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(key => caches.delete(key)));
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request, { cache: "no-store" })
      .then(response => response)
      .catch(() => caches.match(event.request))
  );
});
