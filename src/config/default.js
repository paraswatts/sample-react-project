export const defaultConfig = {
    PLATFORM: process.env.REACT_APP_PLATFORM || 'ecr',
    LOCATION: process.env.REACT_APP_LOCATION || 'us',
    VERSION: process.env.REACT_APP_VERSION || '1.0',
    USER_PLATFORM: process.env.REACT_APP_USER_PLATFORM || 7,
    GOOGLE_CLIENT_ID: process.env.REACT_GOOGLE_CLIENT_ID || "820009158374-n1kbhddokivjk1ome2et3an836jkavfl.apps.googleusercontent.com",
    FACEBOOK_APP_ID: process.env.REACT_FACEBOOK_APP_ID || "581708245875275",
    STRIPE_ID: process.env.REACT_STRIPE_ID || 'pk_test_ehWYnykJLNjPr2CIZaxwCoFs00IDZQanZT',
    FIREBASE: {
        API_KEY: 'AIzaSyBIklDxiJtv4qK-EPPalHIiaBC7-7F9-uk',
        AUTH_DOMAIN: 'easycarrelo.firebaseapp.com',
        DATABASE: 'https://easycarrelo.firebaseio.com',
        PROJECT_ID: "easycarrelo",
        STORAGE_BUCKET: "easycarrelo.appspot.com",
        MESSAGING_SENDER_ID: "18046953276",
        APPID: "1:18046953276:web:02abda1b013a0bc8372039",
        VAPID_KEY: "BDuBCwG_9jOdV2RH1KLgFsss2SyvEiSa1YiE-1M1_hB6-5x4mZOqBSV7-pRb6Rwgww_gaKItlaW5-BzghwimW5A"
    },
    ANALYTIC_TRACKING_ID: "UA-169854256-1"
}