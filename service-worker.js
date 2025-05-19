// اسم ذاكرة التخزين المؤقت
const CACHE_NAME = 'alamal-center-cache-v1';

// قائمة الملفات التي سيتم تخزينها مؤقتًا
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/services.html',
  '/blog.html',
  '/gallery.html',
  '/contact.html',
  '/appointments.html',
  '/styles.css',
  '/fix-styles.css',
  '/animations.css',
  '/floating-social.css',
  '/enhanced-chatbot.css',
  '/responsive.css',
  '/home-parallax.css',
  '/home-parallax.js',
  '/parallax.js',
  '/gallery-parallax.js',
  '/blog-parallax.js',
  '/services-parallax.js',
  '/about-parallax.js',
  '/script.js',
  '/enhanced-chatbot.js',
  '/images/bg-pattern.svg',
  '/images/parallax-bg.svg',
  '/images/gallery-parallax-bg.svg',
  '/images/blog-parallax-bg.svg',
  '/images/services-parallax-bg.svg',
  '/images/about-parallax-bg.svg',
  '/images/home-parallax-bg.svg',
  '/images/hero-bg.jpg',
  '/images/about-bg.jpg',
  '/images/contact-bg.jpg',
  '/images/appointments-bg.jpg',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
  '/icons/maskable_icon.png',
  '/icons/appointment-icon.png',
  '/icons/contact-icon.png',
  '/offline.html',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap'
];

// تثبيت Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('تم فتح ذاكرة التخزين المؤقت');
        return cache.addAll(urlsToCache);
      })
  );
});

// تنشيط Service Worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// استراتيجية الشبكة أولاً، ثم التخزين المؤقت
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // إذا كان الطلب ناجحًا، قم بتخزين النسخة في ذاكرة التخزين المؤقت
        if (event.request.method === 'GET') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
        }
        return response;
      })
      .catch(() => {
        // إذا فشل الطلب، حاول استرداد الملف من ذاكرة التخزين المؤقت
        return caches.match(event.request)
          .then(response => {
            if (response) {
              return response;
            }
            // إذا كان الطلب لصفحة HTML، قم بإرجاع صفحة عدم الاتصال
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/offline.html');
            }
          });
      })
  );
});

// التعامل مع الإشعارات
self.addEventListener('push', event => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: 'icons/icon-192x192.png',
    badge: 'icons/badge-icon.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// التعامل مع النقر على الإشعارات
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
