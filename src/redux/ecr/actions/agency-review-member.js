export const ADD_REVIEW_MEMBER = "ADD_REVIEW_MEMBER";
export const GET_REVIEW_MEMBER = "GET_REVIEW_MEMBER";
export const SET_BOOKING_MEMBER = "SET_BOOKING_MEMBER";
export const DELETE_REVIEW_MEMBER = "DELETE_REVIEW_MEMBER";
export const SET_REVIEW_MEMBER = 'REVIEW_MEMBER';
export const UPDATE_NOTIFICATION_SETTING = "UPDATE_NOTIFICATION_SETTING";



export const updateNotificationSetting = (data, success, failure) => {
    return {
        type: UPDATE_NOTIFICATION_SETTING,
        data, success, failure
    }
}

export const setReviewMember = (data) => {
    return {
        type: SET_REVIEW_MEMBER,
        data
    }
}
// export

export const deleteReviewMember = (id, success, failure) => {
    return {
        type: DELETE_REVIEW_MEMBER,
        id, success, failure
    }
}


export const setBookingMember = (data) => {
    return {
        type: SET_BOOKING_MEMBER,
        data
    }
}

export const getReviewMember = (data) => {
    return {
        type: GET_REVIEW_MEMBER,
        data
    }
}

export const addReviewMember = (data, success, failure) => {
    return {
        type: ADD_REVIEW_MEMBER,
        data, success, failure
    }
}