const CACHE_NAME = "crm-delivery-offline-v1"
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
    self.skipWaiting()
})

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return
    
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) return response
                
                return fetch(event.request)
                    .then(response => {
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response
                        }
                        
                        const responseToCache = response.clone()
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache)
                            })
                        return response
                    })
                    .catch(err => {
                        console.error("Network failed, serving from cache ", err)
                        return caches.match('/') || new Response("Offline", {
                            status: 503, 
                            statusText: "Service Unavailable",
                            headers: new Headers({
                                "Content-Type": "text/plain"
                            })
                        })
                    })
            })
    )
})

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) { 
                        return caches.delete(cacheName)
                    }
                })
            )
        }).then(() => {
            return self.clients.claim()
        })
    )
})
