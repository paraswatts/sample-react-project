export const DELETE_VEHICLE = "DELETE_VEHICLE";
export const SAVE_EDIT_DATA = "SAVE_EDIT_DATA";
export const UPDATE_VEHICLE = "UPDATE_VEHICLE";
export const ADD_IMAGES = "ADD_IMAGES";
export const GET_VEHICLES = "GET_VEHICLES";
export const SET_VEHICLES = 'SET_VEHICLES';




export const setVehicles = (data) => {
    return {
        type: SET_VEHICLES,
        data
    }
}


export const getVehicles = (success, failure) => {
    return {
        type: GET_VEHICLES,
        success, failure
    }
}

export const addImages = (data) => {
    return {
        type: ADD_IMAGES,
        data
    }
}

export const updateVehicle = (data, success, failure) => {
    return {
        type: UPDATE_VEHICLE,
        data, success, failure
    }
}


export const saveEditData = (data) => {
    return {
        type: SAVE_EDIT_DATA,
        data
    }
}

export const deleteVehicle = (id, success, failure) => {
    return {
        type: DELETE_VEHICLE,
        id, success, failure
    }
}