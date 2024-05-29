self.addEventListener("push", (event) => {
  const data = event.data.json();

  console.log('event :>> ', event);
  const options = {
    body: data.body,
    icon: "/assets/react.svg", // Replace with your icon path
    data: {
      url: data.link || "http://localhost:3000", // Customize the link to open when the notification is clicked
    },
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// self.addEventListener("notificationclick", (event) => {
//   const notificationData = event.notification.data;

//   if (notificationData.url) {
//     clients.openWindow(notificationData.url);
//   }

//   event.notification.close();
// });
