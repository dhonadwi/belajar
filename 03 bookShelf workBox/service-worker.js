importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
  { url: '/icon.ico', revision: '1' },
  { url: '/icon/icon.png', revision: '1' },
  { url: '/index.html', revision: '1' },
  { url: '/index.js', revision: '1' },
  { url: '/manifest.json', revision: '1' },
  { url: '/nav.html', revision: '1' },
  { url: '/css/materialize.min.css', revision: '1' },
  { url: '/js/api.js', revision: '9' },
  { url: '/js/db.js', revision: '9' },
  { url: '/js/idb.js', revision: '1' },
  { url: '/js/materialize.min.js', revision: '1' },
  { url: '/js/nav.js', revision: '1' },
]);

// workbox.routing.registerRoute(
//   new RegExp('/pages/'),
//   workbox.strategies.staleWhileRevalidate({
//     cacheName: 'pages',
//     plugins: [
//       new workbox.expiration.Plugin({
//         maxAgeSeconds: 60 * 3,
//         maxEntries: 5,
//       })
//     ]
//   })
// );
workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.networkFirst({
      networkTimeoutSeconds: 3,     // 3 detik
      cacheName: 'pages',
          plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 3,
        maxEntries: 5,
      })
    ]
  })
);

workbox.routing.registerRoute(
  new RegExp('/book.html'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'book',
    plugins:[
    new workbox.expiration.Plugin({
      maxAgeSeconds: 60 * 3,
      maxEntries: 5,
    })
  ]
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

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  if (!event.action) {
    // Penguna menyentuh area notifikasi diluar action
    console.log('Notification Click.');
    return;
  }
  switch (event.action) {
    case 'yes-action':
      console.log('Pengguna memilih action yes.');
      // buka tab baru
      clients.openWindow('https://google.com');
      break;
    case 'no-action':
      console.log('Pengguna memilih action no');
      break;
    default:
      console.log(`Action yang dipilih tidak dikenal: '${event.action}'`);
      break;
  }
});

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'icon/icon.png',
    vibrate: [100, 50, 100],
    badge: '/icon/icon.png',
    actions: [
        {
            'action': 'yes-action',
            'title': 'Ya',
            // 'icon': '/img/yes.png'
        },
        {
            'action': 'no-action',
            'title': 'Tidak',
            // 'icon': '/img/no.png'
        }
    ],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});

