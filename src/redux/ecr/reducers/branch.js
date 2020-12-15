import { REHYDRATE } from "redux-persist";
import {
    SET_DASHBOARD_DATA,
    SET_DASHBOARD_TABLE_DATA,
    UPDATE_FAILURE,
    UPDATE_REQUEST,
    UPDATE_SUCCESS,
    SAVE_EDIT_BRANCH_DATA
} from '../actions';

const { defaultConfig: { PLATFORM } } = require(`../../../config/default`);
const { updateAuthToken } = require(`../../../helpers/${PLATFORM}/axios`);

const initialCommonState = {
    dashboardData: '',
    dashboardTableData: "",
    anyUpdate: false,
    editBranchData: {}
};

const BranchReducer = (state = { ...initialCommonState }, action) => {
    switch (action.type) {
        case SAVE_EDIT_BRANCH_DATA:
            return {
                ...state, editBranchData: action.data
            }
        case REHYDRATE:
            let common = ((action || {}).payload || {}).BranchReducer || initialCommonState
            return {
                ...state,
                editBranchData: common.editBranchData,
            };
        default:
            return state;
    }
};

export default BranchReducer;