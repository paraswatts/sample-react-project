
import { REHYDRATE } from "redux-persist";
import {
    SET_UP_PICKUP_LOCATION,
    SET_ADVANCE_SEARCH_VALUES,
    GET_PLACES_LISTING,
    VEHICLE_LISTING,
    GET_VEHICLE_INFORMATION,
    MAKE_REQUEST,
    SET_VEHICLE_INFORMATION,
    PAID_DAYS,
    SET_RANGE,
    SET_FAQ_LIST,
    SET_RETURN_DATE, SET_PROFILE_INFORMATION,
    SAVE_SEARCHED_DRIVERS
} from '../actions';

const { defaultConfig: { PLATFORM } } = require(`../../../config/default`);

const initialCommonState = {
    savedDrivers: []
};

const InviteDriverReducer = (state = { ...initialCommonState }, action) => {
    switch (action.type) {
        case SAVE_SEARCHED_DRIVERS:
            return {
                ...state, savedDrivers: action.data
            }
        // case REHYDRATE:
        //     let common = ((action || {}).payload || {}).DriverReducer || initialCommonState
        //     return {
        //         ...state,
        //         currentLocation: common.currentLocation,
        //         advanceSearchFormValues: common.advanceSearchFormValues,
        //         pickup_Data: common.pickup_Data,
        //         vehicleListing: common.vehicleListing,
        //         getVehicleInformation: common.getVehicleInformation,
        //         setVehicleDate: common.setVehicleDate,
        //         range: common.range,
        //         paidDays: common.paidDays,
        //         ...(action.payload || {}).common
        //     };
        default:
            return state;
    }
};

export default InviteDriverReducer;