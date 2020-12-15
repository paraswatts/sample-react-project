export const SET_AUTHORIZATION = 'SET_AUTHORIZATION';
export const REGISTER_USER = 'REGISTER_USER';
export const CHECK_LOGIN = 'CHECK_LOGIN';
export const SEND_FORGOT_EMAIL = 'SEND_FORGOT_EMAIL';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SAVE_CAPTCHA = 'SAVE_CAPTCHA';
export const SAVE_USER_DETAIL = "SAVE_USER_DETAIL";
export const SOCIAL_SIGNUP = "SOCIAL_SIGNUP";
export const SET_PLATFORM_TYPE = 'SET_PLATFORM_TYPE';
export const SAVE_EMAIL = "SAVE_EMAIL";
export const SOCIAL_MEDIA_LOGIN = "SOCIAL_MEDIA_LOGIN";
export const SAVE_PLATFORM = "SAVE_PLATFORM";
export const SAVE_AGENCY_DATA = 'SAVE_AGENCY_DATA';
export const SAVE_ROLE = "SAVE_ROLE";
export const SAVE_LOGIN_TYPE = "SAVE_LOGIN_TYPE"


export const saveRole = (role) => {
    return {
        type: SAVE_ROLE,
        role
    }
}

export const saveAgencyData = (data) => {
    return {
        type: SAVE_AGENCY_DATA,
        data
    }
}
export const socialMediaLogin = (data, success, failure) => {
    return {
        type: SOCIAL_MEDIA_LOGIN,
        data,
        success, failure
    }
}

export const savePlatform = (platform) => {
    return {
        type: SAVE_PLATFORM,
        platform
    }
}
export const saveEmail = (email) => {
    return {
        type: SAVE_EMAIL,
        email
    }
}
export const saveUserDetail = (data) => {
    return {
        type: SAVE_USER_DETAIL,
        data
    }
}
export const setPlatformType = (role) => {
    return {
        type: SET_PLATFORM_TYPE,
        role
    }
};
export const setAuthorization = (userToken) => {
    return {
        type: SET_AUTHORIZATION,
        userToken
    };
};

export const saveCaptcha = (text) => {
    return {
        type: SAVE_CAPTCHA,
        text
    }
}

export const registerUser = (userData, success, error) => {
    return {
        type: REGISTER_USER,
        userData,
        success,
        error
    }
}

export const checkLogin = (credentials, success, onError) => {
    return {
        type: CHECK_LOGIN,
        credentials,
        success,
        onError
    }
};

export const socialSignUp = (data, success, onError) => {
    return {
        type: SOCIAL_SIGNUP, data, success, onError
    }
}

export const sendForgotEmail = (email, success, error) => {
    return {
        type: SEND_FORGOT_EMAIL,
        email,
        success,
        error
    }
};

export const saveLoginType = (data) => {
    return {
        type: SAVE_LOGIN_TYPE,
    data
    }
}

export const logout = (token, success, failure) => {
    return {
        type: LOGOUT_USER,
        token,
        success,
        failure
    }
};