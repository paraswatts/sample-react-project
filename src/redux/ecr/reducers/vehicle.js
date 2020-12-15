import { REHYDRATE } from "redux-persist";
import {
    SET_DASHBOARD_DATA,
    SET_DASHBOARD_TABLE_DATA,
    UPDATE_FAILURE,
    UPDATE_REQUEST,
    UPDATE_SUCCESS,
    SAVE_EDIT_BRANCH_DATA,
    SAVE_EDIT_DATA,
    SET_VEHICLES
} from '../actions';

const { defaultConfig: { PLATFORM } } = require(`../../../config/default`);
const { updateAuthToken } = require(`../../../helpers/${PLATFORM}/axios`);

const initialCommonState = {
    dashboardData: '',
    dashboardTableData: "",
    anyUpdate: false,
    editVehicleData: {},
    vehicleImagesforModal: []
};

const VehicleReducer = (state = { ...initialCommonState }, action) => {
    switch (action.type) {
        case SET_VEHICLES:
            return {
                ...state, vehicleImagesforModal: action.data
            }
        case SAVE_EDIT_DATA:
            return {
                ...state, editVehicleData: action.data
            }
        case SAVE_EDIT_DATA:
            return {
                ...state, editVehicleData: action.data
            }
        case REHYDRATE:
            let common = ((action || {}).payload || {}).VehicleReducer || initialCommonState
            return {
                ...state,
                editVehicleData: common.editVehicleData,
                vehicleImagesforModal: common.vehicleImagesforModal
            };
        default:
            return state;
    }
};

export default VehicleReducer;