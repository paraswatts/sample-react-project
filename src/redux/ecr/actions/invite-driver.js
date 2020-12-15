export const GET_DRIVERS = "GET_DRIVERS";
export const SAVE_SEARCHED_DRIVERS = "SAVE_SEARCHED_DRIVERS";
export const INVITE_DRIVERS = "INVITE_DRIVERS";




export const inviteDrivers = (data, success, failure) => {
    return {
        type: INVITE_DRIVERS,
        data,
        success, failure
    }
}

export const saveSearchedDrivers = (data) => {
    return {
        type: SAVE_SEARCHED_DRIVERS,
        data
    }
}

export const getDrivers = (searchString) => {
    return {
        type: GET_DRIVERS,
        searchString
    }
}