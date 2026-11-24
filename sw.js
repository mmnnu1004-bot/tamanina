const CACHE='tamanina-v3';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg','./1.png','./2.png','./3.png','./4.png','./5.jpg','./6.jpg','./7.png','./8.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))));self.clients.claim()});
self.addEventListener('fetch',event=>{if(event.request.method!== 'GET')return;event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{if(response.ok&&new URL(event.request.url).origin===location.origin){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy))}return response}))) });
