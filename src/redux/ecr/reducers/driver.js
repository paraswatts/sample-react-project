
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
    SET_RETURN_DATE, SET_PROFILE_INFORMATION, TRIP_INDEX,
    DRIVER_TRIP_LIST,SET_DRIVER_PAST_TRIP_LIST,SET_DRIVER_RATINGS,SET_CANCELLED_TRIP,SELECTED_TRAVEL_DATES
} from '../actions';

const { defaultConfig: { PLATFORM } } = require(`../../../config/default`);

const initialCommonState = {
    pickup_Data: {},
    currentLocation: '',
    advanceSearchFormValues: {},
    popularPlacesListing: [],
    vehicleListing: {},
    getVehicleInformation: {},
    bookRequest: {},
    paidDays: { paid: 0, free: 0 },
    range: {},
    getFaq: [],
    setVehicleDate: {},
    getDriverProfile: {},
    getDriverUpcomingTripList: {},
    getDriverPastTripList: {},
    getDriverRatingsData:{},
    getCancelledTripData: [],
    pastTripListCount: 0,
    travelDates: {},
    tripIndex: {upcoming: 0,past: 0}
};

const DriverReducer = (state = { ...initialCommonState }, action) => {
    switch (action.type) {
        case SET_UP_PICKUP_LOCATION:
            return {
                ...state, pickup_Data: action.data
            }
        case SET_ADVANCE_SEARCH_VALUES:
            return {
                ...state, advanceSearchFormValues: action.data
            }
        case GET_PLACES_LISTING:
            return {
                ...state,
                popularPlacesListing: action.data
            }
        case VEHICLE_LISTING:
            return {
                ...state,
                vehicleListing: action.data
            }
        case MAKE_REQUEST:
            return {
                ...state,
                bookRequest: action.data
            }
        case SET_VEHICLE_INFORMATION:
            return {
                ...state,
                getVehicleInformation: action.data
            }
        case PAID_DAYS:
            return {
                ...state,
                paidDays: action.data
            }
        case SET_RANGE:
            return {
                ...state,
                range: action.data
            }
        case SET_FAQ_LIST:
            return {
                ...state,
                getFaq: action.data.data
            }
        case SET_RETURN_DATE:
            return {
                ...state,
                setVehicleDate: action.data
            }
        case SET_PROFILE_INFORMATION:
            return {
                ...state,
                getDriverProfile: action.data
            }
        case DRIVER_TRIP_LIST:
            return {
                ...state,
                getDriverUpcomingTripList: action.data.data
            }
        case SET_DRIVER_PAST_TRIP_LIST:
            return {
                ...state,
                getDriverPastTripList: action.data.data,
            }
        case SET_DRIVER_RATINGS:
        return {
            ...state,
            getDriverRatingsData: action.data.data
        } 
        case SET_CANCELLED_TRIP: 
        return {
            ...state,
            getCancelledTripData: action.data.data
        } 
        case SELECTED_TRAVEL_DATES:
        return {
            ...state,
            travelDates: action.data
        }
        case TRIP_INDEX:
        return {
            ...state,
            tripIndex: action.data
        }
        case REHYDRATE:
            let common = ((action || {}).payload || {}).DriverReducer || initialCommonState
            return {
                ...state,
                currentLocation: common.currentLocation,
                advanceSearchFormValues: common.advanceSearchFormValues,
                pickup_Data: common.pickup_Data,
                vehicleListing: common.vehicleListing,
                getVehicleInformation: common.getVehicleInformation,
                setVehicleDate: common.setVehicleDate,
                range: common.range,
                paidDays: common.paidDays,
                travelDates: common.travelDates,
                getDriverProfile: common.getDriverProfile,
                ...(action.payload || {}).common
            };
        default:
            return state;
    }
};

export default DriverReducer;