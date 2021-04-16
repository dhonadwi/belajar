const CACHE_NAME = "bookShelf-v1";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/book.html",
  "/index.js",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/api.js",
  "/icon/icon.png",
  "/manifest.json",
  "/icon.ico",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
  "http://13.229.240.223:5000/books"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});


self.addEventListener("fetch", event => {
  const base_url = `http://13.229.240.223:5000/`;
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME)
        .then(cache => {
          return fetch(event.request)
            .then(response => {
              cache.put(event.request.url, response.clone());
              return response;
            })
        })
    )
  } else {
    event.respondWith(
      caches.match(event.request, {
        ignoreSearch: true
      })
        .then(response => {
          return response || fetch(event.request);
        })
    )
  }
})


self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME && cacheName.startsWith("bookShelf-")) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});