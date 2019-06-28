var cacheName = 'hello-pwa';
var filesToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js',
  '/js/jquery.js',
  '/manifest.json',
  './fallback.json',
    '/images/not-connected.jpg'
];


self.addEventListener('install', async event => {
    const cache = await caches.open('new-static');
    cache.addAll(filesToCache);
    });
    
    self.addEventListener('fetch', event => {
       const req = event.request;
       const url = new URL(req.url);
    
       if(url.origin == location.origin){
           event.respondWith(cacheFirst(req));
       }
       else{
           event.respondWith(networkFirst(req));
       }
    });  
    
    async function cacheFirst(req){
       const cacheResponse = await caches.match(req);
       return cacheResponse || fetch(req);
    }
    
    async function networkFirst(req){
       const cache =await caches.open('new-dynamic')
       try{
           const res = await fetch(req);
           cache.put(req,res.clone());
           return res;
       }
       catch(error){
           const cachedResponse =  await cache.match(req);
           return cachedResponse || await caches.match('./fallback.json');
       }
    }