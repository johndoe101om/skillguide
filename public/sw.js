// Service Worker for SkillGuide PWA
const CACHE_NAME = "skillguide-v1.0.0";
const OFFLINE_URL = "/offline.html";

// Files to cache for offline functionality
const CACHE_URLS = [
  "/",
  "/dashboard",
  "/analytics",
  "/reports",
  "/offline.html",
  "/static/js/bundle.js",
  "/static/css/main.css",
  "/manifest.json",
  // Add more critical assets
];

// Install event - cache resources
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Caching app shell");
        return cache.addAll(CACHE_URLS);
      })
      .then(() => {
        // Force the waiting service worker to become the active service worker
        return self.skipWaiting();
      }),
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => {
        // Ensure the service worker takes control of all pages
        return self.clients.claim();
      }),
  );
});

// Fetch event - serve cached content when offline
self.addEventListener("fetch", (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Handle navigation requests
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.open(CACHE_NAME).then((cache) => {
          return cache.match(OFFLINE_URL);
        });
      }),
    );
    return;
  }

  // Handle other requests with cache-first strategy
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version if available
      if (response) {
        return response;
      }

      // Otherwise fetch from network
      return fetch(event.request)
        .then((response) => {
          // Don't cache non-successful responses
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response before caching
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // Return a fallback response for failed requests
          if (event.request.destination === "image") {
            return caches.match("/images/placeholder.png");
          }

          return new Response(
            JSON.stringify({ error: "Network unavailable" }),
            {
              status: 503,
              statusText: "Service Unavailable",
              headers: { "Content-Type": "application/json" },
            },
          );
        });
    }),
  );
});

// Background sync for offline data
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    console.log("Background sync triggered");
    event.waitUntil(syncOfflineData());
  }
});

// Push notifications
self.addEventListener("push", (event) => {
  console.log("Push message received:", event);

  const options = {
    body: event.data ? event.data.text() : "New notification from SkillGuide",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/badge.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "View Details",
        icon: "/icons/checkmark.png",
      },
      {
        action: "close",
        title: "Close",
        icon: "/icons/xmark.png",
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification("SkillGuide Notification", options),
  );
});

// Notification click handling
self.addEventListener("notificationclick", (event) => {
  console.log("Notification click received:", event);

  event.notification.close();

  if (event.action === "explore") {
    // Open the app or navigate to specific page
    event.waitUntil(clients.openWindow("/dashboard"));
  }
});

// Helper function to sync offline data
async function syncOfflineData() {
  try {
    // Get offline data from IndexedDB or localStorage
    const offlineData = await getOfflineData();

    if (offlineData.length > 0) {
      // Send data to server
      const response = await fetch("/api/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(offlineData),
      });

      if (response.ok) {
        // Clear offline data after successful sync
        await clearOfflineData();
        console.log("Offline data synced successfully");
      }
    }
  } catch (error) {
    console.error("Error syncing offline data:", error);
  }
}

// Helper function to get offline data (placeholder)
async function getOfflineData() {
  // In a real implementation, this would read from IndexedDB
  return [];
}

// Helper function to clear offline data (placeholder)
async function clearOfflineData() {
  // In a real implementation, this would clear IndexedDB
  console.log("Clearing offline data");
}

// Handle service worker updates
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Periodic background sync (if supported)
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "background-fetch") {
    event.waitUntil(
      // Perform periodic background tasks
      performBackgroundTasks(),
    );
  }
});

async function performBackgroundTasks() {
  try {
    // Fetch latest course content
    // Update cached resources
    // Sync user progress
    console.log("Performing background tasks");
  } catch (error) {
    console.error("Background task failed:", error);
  }
}
