export const GET_LISTING = "GET_LISTING";
export const SET_LISTING = 'SET_LISTING';
export const SELECTED_LIST = "SELECTED_LIST"


export const selectedList = (data) => {
    return {
        type: SELECTED_LIST,
        data
    }
}
export const getListing = (data) => {
    return {
        type: GET_LISTING,
        data
    }
}

export const setListing = (data) => {
    return {
        type: SET_LISTING,
        data
    }
}