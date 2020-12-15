importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");

firebase.initializeApp({
  // Project Settings => Add Firebase to your web app
  apiKey: "AIzaSyBIklDxiJtv4qK-EPPalHIiaBC7-7F9-uk",
  authDomain: "easycarrelo.firebaseapp.com",
  databaseURL: "https://easycarrelo.firebaseio.com",
  projectId: "easycarrelo",
  storageBucket: "easycarrelo.appspot.com",
  messagingSenderId: "18046953276",
  appId: "1:18046953276:web:02abda1b013a0bc8372039"
});
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification("my notification title");
    });
  return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
  // do what you want
  // ...
});