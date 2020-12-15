import * as firebase from "firebase/app";
import "firebase/messaging";
import { defaultConfig } from "./config/default"
let safariAgent = navigator.userAgent.indexOf("Safari") > -1;
let chromeAgent = navigator.userAgent.indexOf("Chrome") > -1;

if ((chromeAgent) && (safariAgent)) {
    safariAgent = false
}

let messaging = '';
if (!safariAgent) {
    const initializedFirebaseApp = firebase.initializeApp({
        // Project Settings => Add Firebase to your web app
        apiKey: defaultConfig.FIREBASE.API_KEY,
        authDomain: defaultConfig.FIREBASE.AUTH_DOMAIN,
        databaseURL: defaultConfig.FIREBASE.DATABASE,
        projectId: defaultConfig.FIREBASE.PROJECT_ID,
        storageBucket: defaultConfig.FIREBASE.STORAGE_BUCKET,
        messagingSenderId: defaultConfig.FIREBASE.MESSAGING_SENDER_ID,
        appId: defaultConfig.FIREBASE.APPID
    });
    messaging = initializedFirebaseApp.messaging();
    messaging.usePublicVapidKey(
        // Project Settings => Cloud Messaging => Web Push certificates
        defaultConfig.FIREBASE.VAPID_KEY
    );
    messaging.onMessage((payload) => console.log('Message received. ', payload));
}
export { messaging };