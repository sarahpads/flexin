workbox.core.setCacheNameDetails({
  prefix: "flexin",
  suffix: "v1"
});

self.oninstall = (event) => event.waitUntil(self.skipWaiting());
self.onactivate = (event) => event.waitUntil(self.clients.claim());

workbox.precaching.precacheAndRoute([
  ...self.__precacheManifest
]);

workbox.routing.registerRoute("/", new workbox.strategies.NetworkFirst());

workbox.routing.registerNavigationRoute(
  workbox.precaching.getCacheKeyForURL("/index.html")
)

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Push Codelab';
  const options = {
    body: 'Yay it works.',
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});