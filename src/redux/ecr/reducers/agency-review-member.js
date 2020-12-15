import { REHYDRATE } from "redux-persist";
import {
    SET_DASHBOARD_DATA,
    SET_DASHBOARD_TABLE_DATA,
    UPDATE_FAILURE,
    UPDATE_REQUEST,
    UPDATE_SUCCESS, SET_ANALYTIC_DATA,
    SET_BOOKING_MEMBER,
    SET_REVIEW_MEMBER
} from '../actions';

const { defaultConfig: { PLATFORM } } = require(`../../../config/default`);
const { updateAuthToken } = require(`../../../helpers/${PLATFORM}/axios`);

const initialCommonState = {
    bookingMember: [],
    reviewMember: []
};

const AgencyReviewMemberReducer = (state = { ...initialCommonState }, action) => {
    switch (action.type) {

        case SET_BOOKING_MEMBER:
            return {
                ...state,
                bookingMember: action.data
            }
        case SET_REVIEW_MEMBER:
            return {
                ...state,
                reviewMember: action.data
            }
        case REHYDRATE:
        // let common = ((action || {}).payload || {}).AgencyDashboardReducer || initialCommonState
        // return {
        //     ...state,
        //     dashboardData: common.dashboardData,
        // };
        default:
            return state;
    }
};

export default AgencyReviewMemberReducer;