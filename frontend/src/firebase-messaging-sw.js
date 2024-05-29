// importScripts("https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js");
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCeNLRBDeSHQO0oRjD0b0pvDfKxJdCCEEg",
  authDomain: "test-push-d351e.firebaseapp.com",
  projectId: "test-push-d351e",
  storageBucket: "test-push-d351e.appspot.com",
  messagingSenderId: "910699046271",
  appId: "1:910699046271:web:c512487328496a11daa64a",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
