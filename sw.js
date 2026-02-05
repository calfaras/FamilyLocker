
const CACHE_NAME = 'family-locker-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  'https://esm.sh/react-router-dom@^7.13.0',
  'https://esm.sh/lucide-react@^0.563.0',
  'https://esm.sh/react@^19.2.4',
  'https://esm.sh/react-dom@^19.2.4/'
];

// Install Event - Pre-cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Pre-caching assets...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Cleaning up old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Stale-while-revalidate with SPA navigation support
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // SPA Navigation Support: If requesting a page (navigation), serve index.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Stale-while-revalidate for other assets
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchedResponse = fetch(request).then((networkResponse) => {
        // Update cache with the new version
        return caches.open(CACHE_NAME).then((cache) => {
          if (request.url.startsWith('http')) {
             cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        });
      }).catch(() => {
        // Fallback for network failure if not in cache
        return null; 
      });

      return cachedResponse || fetchedResponse;
    })
  );
});
