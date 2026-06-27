self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title ?? "StellarSwipe Alert";
  const options = {
    body: data.body ?? "",
    icon: "/favicon.ico",
    badge: "/favicon.ico",
    data: { url: data.url ?? "/" },
    tag: data.tag ?? "stellarswipe",
    renotify: true,
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = event.notification.data?.url ?? "/";
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        for (const client of windowClients) {
          if (client.url.includes(self.location.origin) && "focus" in client) {
            client.navigate(target);
            return client.focus();
          }
        }
        return clients.openWindow(target);
      })
  );
});
