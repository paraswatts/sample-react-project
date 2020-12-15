import { REHYDRATE } from "redux-persist";
import {
    SET_DASHBOARD_DATA,
    SET_DASHBOARD_TABLE_DATA,
    UPDATE_FAILURE,
    UPDATE_REQUEST,
    UPDATE_SUCCESS, SET_ANALYTIC_DATA
} from '../actions';

const { defaultConfig: { PLATFORM } } = require(`../../../config/default`);

const initialCommonState = {
    dashboardData: '',
    dashboardTableData: "",
    anyUpdate: false,
    AnalyticData: {}
};

const AgencyDashboardReducer = (state = { ...initialCommonState }, action) => {
    switch (action.type) {
        case UPDATE_REQUEST:
            return {
                ...state,
                anyUpdate: false
            }
        case UPDATE_SUCCESS:
            return {
                ...state,
                anyUpdate: true
            }
        case UPDATE_FAILURE:
            return {
                ...state,
                anyUpdate: false
            }
        case SET_DASHBOARD_DATA:
            return {
                ...state,
                dashboardData: action.data
            }
        case SET_DASHBOARD_TABLE_DATA:
            return {
                ...state,
                dashboardTableData: action.data
            }
        case SET_ANALYTIC_DATA:
            return {
                ...state,
                AnalyticData: action.data.data
            }
        case REHYDRATE:
            let common = ((action || {}).payload || {}).AgencyDashboardReducer || initialCommonState
            return {
                ...state,
                dashboardData: common.dashboardData,
            };
        default:
            return state;
    }
};

export default AgencyDashboardReducer;