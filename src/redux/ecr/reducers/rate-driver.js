
import { REHYDRATE } from "redux-persist";
import {
    GET_CARDS,
    GET_UNRATED_DRIVERS_DATA,
    GET_RATED_DRIVERS_DATA,
    SET_AGENCY_RATED_DATA
} from '../actions';

const { defaultConfig: { PLATFORM } } = require(`../../../config/default`);

const initialCommonState = {
    unratedDriversData: [],
    ratedDriversData: [],
    agencyRatedData: []
};

const RateDriverReducer = (state = { ...initialCommonState }, action) => {

    switch (action.type) {
        case GET_UNRATED_DRIVERS_DATA:

            return {
                ...state, unratedDriversData: action.data
            }
        case GET_RATED_DRIVERS_DATA:
            return {
                ...state, ratedDriversData: action.data

            }
        case SET_AGENCY_RATED_DATA:
            return {
                ...state, agencyRatedData: action.data
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

export default RateDriverReducer;