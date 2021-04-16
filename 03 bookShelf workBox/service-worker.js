importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
  // { url: '/book.html', revision: '1' },
  { url: '/icon.ico', revision: '1' },
  { url: '/index.html', revision: '1' },
  { url: '/index.js', revision: '1' },
  { url: '/manifest.json', revision: '1' },
  { url: '/nav.html', revision: '1' },
  { url: '/css/materialize.min.css', revision: '1' },
  { url: '/js/api.js', revision: '1' },
  { url: '/js/idb.js', revision: '1' },
  { url: '/js/materialize.min.js', revision: '1' },
  { url: '/js/nav.js', revision: '1' },


  // { url: '/pages/about.html', revision: '1' },
  // { url: '/pages/contact.html', revision: '1' },
  // { url: '/pages/home.html', revision: '1' },
]);

// workbox.routing.registerRoute(
//   new RegExp('/pages/'),
//   workbox.strategies.staleWhileRevalidate({
//     cacheName: 'pages'
//   })
// );

workbox.routing.registerRoute(
  new RegExp('/book.html'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'book'
  })
)

// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /^http:\/\/13\.229\.240\.223:5000\/books/,
  workbox.strategies.cacheFirst({
    cacheName: 'api-bookshelf',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 3,
        maxEntries: 30,
      }),
    ],
  })
);