export const UPDATE_PROFILE = "UPDATE_PROFILE";


export const updateProfile = (data, success, failure) => {
    return {
        type: UPDATE_PROFILE,
        data, success, failure
    }

}