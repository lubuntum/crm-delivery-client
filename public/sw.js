const CACHE_NAME = "crm-delivery-offline-v1"

const STATIC_URLS = [
    '/',
    '/home',
    '/static/js/bundle.js',
    '/static/css/main.css',
    '/manifest.json',
]

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(STATIC_URLS)
                    .catch(err => {console.error("Failed to cache some static assets", err)})
            })
    )
    self.skipWaiting()
})

self.addEventListener('fetch', event => {
    const {request} = event
    const url = new URL (request.url)
    if (request.url.includes("/api/") || request.method !== "GET" ||
        (request.headers.get("Accept") && request.headers.get("Accept").includes("application/json"))) 
        return
    
    event.respondWith(
        fetch(request)
            .catch(() => {
                if (event.request.mode === "navigate") return caches.match('/')
                return caches.match(request)
            })
    )
})

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim())
})
