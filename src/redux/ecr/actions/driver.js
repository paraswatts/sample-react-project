export const SEARCH_VEHICLE = 'SEARCH_VEHICLE'
export const POPULAR_PLACES = 'POPULAR_PLACES'
export const GET_PLACES_LISTING = 'GET_PLACES_LISTING'
export const SET_UP_PICKUP_LOCATION = 'SET_UP_PICKUP_LOCATION'
export const SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION'
export const SET_ADVANCE_SEARCH_VALUES = 'SET_ADVANCE_SEARCH_VALUES'
export const VEHICLE_LISTING = 'VEHICLE_LISTING'
export const GET_VEHICLE_INFORMATION = 'GET_VEHICLE_INFORMATION'
export const SET_VEHICLE_INFORMATION = 'SET_VEHICLE_INFORMATION'
export const MAKE_REQUEST = "MAKE_REQUEST"
export const PAID_DAYS = "PAID_DAYS"
export const SET_RANGE = "SET_RANGE"
export const GET_FAQ = "GET_FAQ"
export const SET_FAQ_LIST = "SET_FAQ_LIST"
export const SET_RETURN_DATE = "SET_RETURN_DATE"
export const EDIT_DRIVER_PROFILE = "EDIT_DRIVER_PROFILE"
export const DRIVER_TRIPS = "DRIVER_TRIPS"
export const DRIVER_RATINGS = "DRIVER_RATINGS"
export const GET_PROFILE_INFORMATION = "GET_PROFILE_INFORMATION"
export const SET_PROFILE_INFORMATION = "SET_PROFILE_INFORMATION"
export const CHANGE_DRIVER_PASSWORD = "CHANGE_DRIVER_PASSWORD"
export const DRIVER_TRIP_LIST = "DRIVER_TRIP_LIST"
export const GET_DRIVER_PAST_TRIP_LIST = "GET_DRIVER_PAST_TRIP_LIST"
export const SET_DRIVER_PAST_TRIP_LIST = "SET_DRIVER_PAST_TRIP_LIST"
export const SET_DRIVER_RATINGS = "SET_DRIVER_RATINGS"
export const RATE_AGENCY = 'RATE_AGENCY'
export const EMAIL_AGENCY = 'EMAIL_AGENCY'
export const CANCEL_TRIP = 'CANCEL_TRIP'
export const GET_CANCELLED_TRIP = "GET_CANCELLED_TRIP"
export const SET_CANCELLED_TRIP = "SET_CANCELLED_TRIP"
export const SELECTED_TRAVEL_DATES = "SELECTED_TRAVEL_DATES"
export const CHANGE_SESSION = "CHANGE_SESSION"
export const TRIP_INDEX = "TRIP_INDEX"


export const searchVehicle = (data, success, onError) => {
        return {
                type: SEARCH_VEHICLE,
                data, success, onError
        }
}

export const popularPlaces = (data, onError) => {
        return {
                type: POPULAR_PLACES,
                data, onError
        }
}

export const getPopularPlacesListing = (data) => {
        return {
                type: GET_PLACES_LISTING,
                data
        }
}

export const setPickUpLocation = (data) => {
        return {
                type: SET_UP_PICKUP_LOCATION,
                data
        }
}
export const setCurrentLocation = (data) => {
        return {
                type: SET_CURRENT_LOCATION,
                data
        }
}

export const setAdvanceSearchValues = (data) => {
        return {
                type: SET_ADVANCE_SEARCH_VALUES,
                data
        }
}

export const vehicleListing = (data) => {
        return {
                type: VEHICLE_LISTING,
                data
        }
}

export const getVehicleInformation = (data, success, onError) => {
        return {
                type: GET_VEHICLE_INFORMATION,
                data, success, onError
        }
}

export const makeRequest = (data, success, onError) => {
        return {
                type: MAKE_REQUEST,
                data, success, onError
        }
}
export const setVehicleInformation = (data) => {
        return {
                type: SET_VEHICLE_INFORMATION,
                data,
        }
}

export const setPaidDays = (data) => {
        return {
                type: PAID_DAYS,
                data,
        }
}

export const range = (data) => {
        return {
                type: SET_RANGE,
                data
        }
}

export const getFaq = () => {
        return {
                type: GET_FAQ,

        }
}

export const setFaq = (data) => {
        return {
                type: SET_FAQ_LIST,
                data
        }
}

export const setReturnDateForVehicle = (data) => {
        return {
                type: SET_RETURN_DATE,
                data
        }
}
export const editDriverProfile = (data, success, onError) => {
        return {
                type: EDIT_DRIVER_PROFILE,
                data, success, onError
        }
}

export const getDriverTrips = (data, success, onError) => {
        return {
                type: DRIVER_TRIPS,
                data, success, onError
        }
}

export const getDriverRatings = (data, success, onError) => {
        return {
                type: DRIVER_RATINGS,
                data, success, onError
        }
}

export const setDriverRatings = (data) => {
        return {
                type: SET_DRIVER_RATINGS,
                data
        }
}

export const getDriverProfileInformation = (success, onError) => {
        return {
                type: GET_PROFILE_INFORMATION,
                success, onError
        }
}
export const setDriverProfileInformation = (data) => {
        return {
                type: SET_PROFILE_INFORMATION,
                data
        }
}
export const changeDriverPassword = (data, success, onError) => {
        return {
                type: CHANGE_DRIVER_PASSWORD,
                data, success, onError
        }
}
export const setDriverTripListing = (data) => {
        return {
                type: DRIVER_TRIP_LIST,
                data
        }
}
export const getDriverPastTrip = (data, success, onError) => {
        return {
                type: GET_DRIVER_PAST_TRIP_LIST,
                data, success, onError
        }
}
export const setDriverPastTripList = (data) => {
        return {
                type: SET_DRIVER_PAST_TRIP_LIST,
                data
        }
}
export const rateAgencyByDriver = (data, success, onError) => {
        return {
                type: RATE_AGENCY,
                data, success, onError
        }
}
export const emailAgencyByDriver = (data, success, onError) => {
        return {
                type: EMAIL_AGENCY,
                data, success, onError
        }
}
export const cancelTripByDriver = (data, success, onError) => {
        return {
                type: CANCEL_TRIP,
                data, success, onError
        }
}
export const getCancelledTrips = (data, success, onError) => {
        return {
                type: GET_CANCELLED_TRIP,
                data, success, onError
        }
}
export const setCancelledTrips = (data) => {
        return {
                type: SET_CANCELLED_TRIP,
                data
        }
}
export const SelectedTravelDates = (data) => {
        return {
                type: SELECTED_TRAVEL_DATES,
                data
        }
}
export const ChangeFcmSession = (data) => {
        return {
                type: CHANGE_SESSION,
                data
        }
}
export const tableIndex = (data) => {
        return {
                type: TRIP_INDEX,
                data
        }
}
