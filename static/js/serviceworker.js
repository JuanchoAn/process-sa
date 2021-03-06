var staticCacheName = 'djangopwa-v1' + new Date().getTime();
var filesToCache = [
    '/'
];
 
self.addEventListener('install', event => {
    this.skipWaiting();
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                return cache.addAll(filesToCache);
            })
    )
});
 
self.addEventListener('activate', event =>{
  event.waitUntil(
      caches.keys().then(cacheNames => {
          return Promise.all(
              cacheNames
                .filter(cacheName => (cacheName.startsWith("django-pwa-")))
                .filter(cacheName => (cacheName !== staticCacheName))
                .map(cacheName => caches.delete(cacheName))
            );
        })
    );
 });

 self.addEventListener("fetch", event => {
     event.respondWith(
        caches.match(event.request)
            .then(response =>{
                return response || fetch(event.request);
            })
            .catch(() => {
                return caches.match('/');
            })
     )
 });
