const SERVER_URL = 'https://api.easycarrelo.co.nz'
//'https://60253e4608d7.ngrok.io';
//'https://api.easycarrelo.co.nz';
//'http://13.238.207.250:5000'
//'https://api.easycarrelo.co.nz';
//'http://13.238.207.250:5000';
//'https://api.easycarrelo.co.nz';  
//const SERVER_URL = 
//"http://13.238.207.250:5001"

const API_VERSION = process.env.REACT_API_VERSION || '/v1'

module.exports = {

  URL: {
    SERVER_URL: SERVER_URL,
    LOGOUT: SERVER_URL + API_VERSION + '/user/logout',
    LOGIN: SERVER_URL + API_VERSION + '/user/login',
    SIGNUP_USER: SERVER_URL + API_VERSION + '/user/register',
    SOCIAL_SIGNUP: SERVER_URL + API_VERSION + '/user/social-login',
    FAQ_LIST: SERVER_URL + API_VERSION + '/faq',
    MAKE_VEHICLE_REQUEST: SERVER_URL + API_VERSION + '/listing',
    POPULAR_PLACES_LISTING: SERVER_URL + API_VERSION + '/listing/popular_places',
    VEHICLE_SEARCH: SERVER_URL + API_VERSION + '/listing',
    GET_VEHICLE: SERVER_URL + API_VERSION + '/listingByID',
    VEHICLE_TYPE_LIST: SERVER_URL + API_VERSION + '/vehicleType',
    TRANSMISSION_TYPE_LIST: SERVER_URL + API_VERSION + '/vehicle/transmissions',
    FORGOT_PASSWORD: SERVER_URL + API_VERSION + '/user/forgot-password',
    UPCOMING_DRIVER_TRIPS: SERVER_URL + API_VERSION + '/driver/upcoming-trips',
    PAST_DRIVER_TRIPS: SERVER_URL + API_VERSION + '/driver/past-trips',
    DRIVER_RATINGS: SERVER_URL + API_VERSION + '/driver/ratings',
    UPDATE_DRIVER_PROFILE: SERVER_URL + API_VERSION + '/user/complete-profile',
    EMAIL_AGENCY: SERVER_URL + API_VERSION + '/driver/email-to-agency',
    CANCEL_TRIP: SERVER_URL + API_VERSION + '/listing',
    GET_CANCELLED_TRIPS: SERVER_URL + API_VERSION + '/listing/cancelled-trips',
    GET_DRIVER_PROFILE: SERVER_URL + API_VERSION + '/driver/profile',
    CHANGE_DRIVER_PASSWORD_URL: SERVER_URL + API_VERSION + '/user/change-password',
    TEST_STATUS_UPDATE: SERVER_URL + API_VERSION + '/test/status',
    ANALYTICS: SERVER_URL + API_VERSION + '/agency/analytics',
    CREATE_TEST: SERVER_URL + API_VERSION + '/test/question/limit',
    TEST_QUESTION_LIST: SERVER_URL + API_VERSION + '/question/list',
    ADD_QUESTION: SERVER_URL + API_VERSION + '/question/add',
    QUESTION: SERVER_URL + API_VERSION + '/question',
    UPDATE_QUESTION: SERVER_URL + API_VERSION + '/question/update',
    UPLOAD_FILE: SERVER_URL + API_VERSION + '/file/upload',
    FETCH_INSTRUCTION: SERVER_URL + API_VERSION + '/test/instruction',
    GET_USER_TYPES: SERVER_URL + API_VERSION + '/admin/user-roles',
    SOCIAL_LOGIN: SERVER_URL + API_VERSION + '/user/social-login',
    AGENCY_REGISTER: SERVER_URL + API_VERSION + '/agency/register',
    AGENCY_DASHBOARD_DATA: SERVER_URL + API_VERSION + '/booking',
    DASHBOARD_DATA: SERVER_URL + API_VERSION + '/listing',
    VEHCILES_DATA: SERVER_URL + API_VERSION + '/vehicle',
    BRANCH_LIST: SERVER_URL + API_VERSION + '/branch',
    INSTRUCTION_LIST: SERVER_URL + API_VERSION + '/insurance',
    FUEL_TYPE_LIST: SERVER_URL + API_VERSION + '/fuel',
    FILE_UPLOAD: SERVER_URL + API_VERSION + '/file-upload',
    VEHICLE_TYPE: SERVER_URL + API_VERSION + '/vehicleType',
    VEHICLE_TRANSMISSION: SERVER_URL + API_VERSION + '/vehicle/transmissions',
    BRANCH_MANAGERS: SERVER_URL + API_VERSION + '/agency/memebers',
    CREATE_BRANCH: SERVER_URL + API_VERSION + '/branch/createBranch',
    TERMS: SERVER_URL + API_VERSION + '/terms',
    FERRY: SERVER_URL + API_VERSION + '/ferry',
    FUEL_OFFER: SERVER_URL + API_VERSION + '/fuelOffer',
    EXTRA_ITEMS: SERVER_URL + API_VERSION + '/extraItem',
    VEHICLE_CATEGORY: SERVER_URL + API_VERSION + '/category',
    SEARCH_DRIVER: SERVER_URL + API_VERSION + '/search_driver',
    CARD: SERVER_URL + API_VERSION + "/card",
    UNRATED_DRIVERS: SERVER_URL + API_VERSION + '/listing/unrated-booking',
    PAST_RATING: SERVER_URL + API_VERSION + '/listing/past-ratings',
    PACKAGES: SERVER_URL + API_VERSION + '/package',
    INVITE_DRIVERS: SERVER_URL + API_VERSION + '/agency/invite-drivers',
    PURCHASE_TOKEN: SERVER_URL + API_VERSION + '/agency/purchaseToken',
    TOKEN: SERVER_URL + API_VERSION + '/agency/get-tokens',
    EMAIL_OPTION: SERVER_URL + API_VERSION + '/emailOptions',
    CARD_DEFAULT: SERVER_URL + API_VERSION + '/card/set-default',
    AGENCY_UPDATE: SERVER_URL + API_VERSION + '/agency',
    TRANSACTION: SERVER_URL + API_VERSION + "/card/transactions",
    DASHBOARD_VIEW: SERVER_URL + API_VERSION + '/listing/dashboard-view',
    AGENCY_MEMBER_UPDATE: SERVER_URL + API_VERSION + '/agency-member',
    AGENCY_PROFILE: SERVER_URL + API_VERSION + '/agency/profile',
    NOTIFICATION_SESSION: SERVER_URL + API_VERSION + '/session',
    VEHICLE_IMAGES: SERVER_URL + API_VERSION + '/vehicleImageType',
    AGENCY_LISTING_RATING: SERVER_URL + API_VERSION + '/listing/agency-trip-ratings',
    CHANGE_DRIVER_RATING_STATUS: SERVER_URL + API_VERSION + '/listing/rating/acceptOrReject',
    VALIDATE_PROMO: SERVER_URL + API_VERSION + '/promoCode/validate'
  }
};