export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const GET_PROFILE = "GET_PROFILE";
export const SET_PROFILE = "SET_PROFILE";


export const setProfile = (data) => {
    return {
        type: SET_PROFILE,
        data
    }
}


export const getProfile = (success, failure) => {
    return {
        type: GET_PROFILE,
        success, failure
    }
}

export const changePassword = (data, success, failure) => {
    return {
        type: CHANGE_PASSWORD,
        data, success, failure
    }
}