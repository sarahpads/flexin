workbox.core.setCacheNameDetails({
  prefix: "waffle-tax",
  suffix: "v1.1"
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

self.addEventListener("push", function(event) {
  console.log("[Service Worker] Push Received.");
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  const { title, body } = event.data.json();

  // Note: SVG images are not supported
  const options = {
    body,
    icon: "/logo192.png",
    badge: "/badge.png"
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function(event) {
  const url = new URL("/?page=challenge", self.location.origin);
  event.notification.close();
  clients.openWindow(url.href);
});