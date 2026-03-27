const CACHE_NAME = 'one-v2.0';  // Increment this when you update the app (e.g. v2.1)

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.png',
  '/sw.js'   // optional: helps with self-updates
];

// Install event - precache essential files
self.addEventListener('install', event => {
  console.log('[[ONE]] Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[[ONE]] Precaching core assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        console.log('[[ONE]] Precache completed');
        return self.skipWaiting(); // Activate immediately
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[[ONE]] Service Worker activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log(`[[ONE]] Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim(); // Take control of all clients
    })
  );
});

// Fetch event - reinforced offline strategy
self.addEventListener('fetch', event => {
  // Skip non-GET requests and chrome-extension URLs
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      // 1. Try cache first (fast offline experience)
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      }

      // 2. For esm.sh imports (Three.js modules): network only, do NOT cache aggressively
      if (event.request.url.includes('esm.sh')) {
        try {
          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (err) {
          // Offline - return a minimal fallback or nothing (Three.js may partially degrade)
          console.log(`[[ONE]] esm.sh offline: ${event.request.url}`);
          return new Response('/* esm.sh offline - limited 3D functionality */', {
            status: 503,
            statusText: 'Service Unavailable'
          });
        }
      }

      // 3. For everything else: try network, then cache the successful response
      try {
        const networkResponse = await fetch(event.request);

        // Cache successful responses (clone because response can only be used once)
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          cache.put(event.request, responseToCache);
        }

        return networkResponse;
      } catch (err) {
        // 4. Offline fallback
        console.log(`[[ONE]] Offline fallback for: ${event.request.url}`);

        if (event.request.destination === 'document' || 
            event.request.url.endsWith('/')) {
          // Serve app shell when offline
          return cache.match('/index.html');
        }

        // For other resources, return a simple offline message or let it fail gracefully
        return new Response('Offline - Resource not cached', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      }
    })()
  );
});

// Optional: Listen for messages from the page (e.g. "skip waiting")
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
