
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
    SAVE_LOGIN_TYPE,
    SET_LISTING,
    SELECTED_LIST,
    GET_LISTING
} from '../actions';

const { defaultConfig: { PLATFORM } } = require(`../../../config/default`);
const { updateAuthToken } = require(`../../../helpers/${PLATFORM}/axios`);

const initialCommonState = {
    listing: [],
    selectedListing: ''
};

const DashboardListingReducer = (state = { ...initialCommonState }, action) => {

    switch (action.type) {

        case SET_LISTING:
            return {
                ...state,
                listing: action.data
            }
        case SELECTED_LIST:
            return {
                ...state,
                selectedListing: action.data
            }
        case REHYDRATE:
            let common = ((action || {}).payload || {}).DashboardListingReducer || initialCommonState

            return {
                ...state,
                selectedListing: common.selectedListing,
                ...(action.payload || {}).common
            };
        default:
            return state;
    }
};

export default DashboardListingReducer;