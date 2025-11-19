const CACHE_NAME = "crm-delivery-offline"
const urlsToCache = [
    '/',
    '/home',
    '/static/js/bundle.js',
    '/static/css/main.css',
    '/manifest.json',
    '/orders'
]
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return Promise.all(
                    urlsToCache.map(url => {
                        return cache.add(url).catch(err => {
                            console.error(`Failed to cache ${url}`, err)
                        })
                    })
                )
            })
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return fetch(event.request).catch(err => {return response})
                
            })
    )
})

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME){ 
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})
