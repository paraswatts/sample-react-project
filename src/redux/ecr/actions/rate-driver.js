export const UNRATED_DRIVER = "UNRATED_DRIVER";
export const GET_UNRATED_DRIVERS_DATA = 'GET_UNRATED_DRIVERS_DATA'
export const RATED_DRIVERS = "RATED_DRIVERS";
export const GET_RATED_DRIVERS_DATA = "GET_RATED_DRIVERS_DATA";
export const GET_AGENCY_RATINGS = "GET_AGENCY_RATINGS";
export const SET_AGENCY_RATED_DATA = "SET_AGENCY_RATED_DATA";
export const CHANGE_RATING_STATUS = "CHANGE_RATING_STATUS";

export const ratedDrivers = (data) => {
    return {
        type: RATED_DRIVERS,
        data
    }
}


export const unratedDriver = (data) => {
    return {
        type: UNRATED_DRIVER,
        data
    }
}

export const getUnratedDriverData = (data) => {
    return {
        type: GET_UNRATED_DRIVERS_DATA,
        data
    }
}

export const getratedDriverData = (data) => {
    return {
        type: GET_RATED_DRIVERS_DATA,
        data
    }
}
export const setAgencyRatedData = (data) => {
    return {
        type: SET_AGENCY_RATED_DATA,
        data
    }
}

export const changeAcceptenceStatus = (data, success, failure) => {
    return {
        type: CHANGE_RATING_STATUS,
        data, success, failure
    }
}
export const getAgencyRatings = (data, success, failure) => {
    return {
        type: GET_AGENCY_RATINGS,
        data, success, failure
    }
}