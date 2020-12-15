
import { REHYDRATE } from "redux-persist";
import {
    SET_AUTHORIZATION,
    CHECK_LOGIN,
    STOP_LOADER,
    START_LOADER,
    SAVE_CAPTCHA,
    SAVE_USER_DETAIL,
    SAVE_EMAIL,
    SET_PLATFORM_TYPE,
    SAVE_PLATFORM,
    SAVE_AGENCY_DATA,
    SET_CURRENT_LOCATION,
    WELCOME,
    FCM_TOKEN, SAVE,
    SAVE_ROLE,
    SAVE_LOGIN_TYPE
} from '../actions';

const { defaultConfig: { PLATFORM } } = require(`../../../config/default`);
const { updateAuthToken } = require(`../../../helpers/${PLATFORM}/axios`);

const initialCommonState = {
    userToken: '',
    loader: false,
    platformType: null,
    captcha: '',
    userData: "",
    userEmail: "",
    pickup_location: "",
    userId: "",
    fuelListing: [],
    welcome: true,
    FCMToken: "",
    prevLocation: "",
    role: '',
    loginType: null
};

const CommonReducer = (state = { ...initialCommonState }, action) => {

    switch (action.type) {

        case SAVE_ROLE:
            return {
                ...state,
                role: action.role
            }
        case SAVE_PLATFORM:
            return {
                ...state,
                platformType: action.platform
            }
        case SAVE_LOGIN_TYPE:
            return {
                ...state,
                loginType: action.data
            }
        case SET_CURRENT_LOCATION:
            return {
                ...state, pickup_location: action.data
            }
        case SET_AUTHORIZATION:
            return {
                ...state,
                userToken: action.userToken
            };
        case START_LOADER:
            return {
                ...state,
                loader: true
            }
        case SET_PLATFORM_TYPE:
            return {
                ...state,
                platformType: action.role
            }
        case SAVE_EMAIL:
            return {
                ...state, userEmail: action.email
            }
        case STOP_LOADER:
            return {
                ...state,
                loader: false
            }
        case CHECK_LOGIN:
            return {
                ...state,
            }
        case SAVE_CAPTCHA:
            return {
                ...state,
                captcha: action.text
            }
        case SAVE_AGENCY_DATA:
            return {
                ...state,
                userData: action.data
            }
        case WELCOME:
            return {
                ...state,
                welcome: false
            }
        case FCM_TOKEN:
            return {
                ...state,
                FCMToken: action.data
            }
        case SAVE:
            return {
                ...state,
                prevLocation: action.data
            }
        case REHYDRATE:
            let common = ((action || {}).payload || {}).CommonReducer || initialCommonState
            updateAuthToken(common.userToken)

            return {
                ...state,
                userToken: common.userToken,
                platformType: common.platformType,
                userData: common.userData,
                pickup_location: common.pickup_location,
                FCMToken: common.FCMToken,
                welcome: common.welcome,
                loginType: common.loginType,
                prevLocation: common.prevLocation,
                role: common.role,
                ...(action.payload || {}).common
            };
        default:
            return state;
    }
};

export default CommonReducer;