import { takeLatest, all, put } from "redux-saga/effects";
import {
    SET_AUTHORIZATION,
    CHECK_LOGIN,
    SEND_FORGOT_EMAIL,
    setAuthorization,
    startLoader,
    stopLoader,
    LOGOUT_USER,
    REGISTER_USER,
    SOCIAL_MEDIA_LOGIN,
    saveAgencyData,
    saveStepNo,
    setDashboardTableData,
    setDashboardData,
    setCurrentLocation,
    setVehicleData,
    setBranchList,
    setFuelList,
    saveRole,
    saveLoginType
} from '../actions';
const { defaultConfig: { PLATFORM } } = require(`../../../config/default`);
const api = require(`../../../shared/${PLATFORM}/api`);
const { updateAuthToken, postRequestNoAuth, postRequest } = require(`../../../helpers/${PLATFORM}`);
const { STATUS_CODE } = require(`../../../shared/${PLATFORM}/constants`);

function* setUserToken({ userToken }) {
    try {
        yield updateAuthToken(userToken);
    }
    catch (error) {
        yield put(stopLoader());
        return;
    }
}

function* registerUser({ userData, success, error }) {
    const platformType = userData && userData.userType
    const apiUrl = platformType === 1 ? api.URL.SIGNUP_USER : api.URL.AGENCY_REGISTER
    try {
        yield put(startLoader())
        const response = yield postRequestNoAuth({ API: `${apiUrl}`, DATA: userData });
        if (window.navigator.onLine === false) {
            yield put(stopLoader())
            error({
                msg: 'You appear to be offline. Please check your connection.'
            })
        }
        else {
            if (response.status === STATUS_CODE.unAuthorized) {
                yield put(setAuthorization(null));
                yield put(setDashboardData(null));
                yield put(setDashboardTableData(null));
                yield put(saveAgencyData(null))
                yield put(stopLoader());
                return;
            }
            if (response.status !== STATUS_CODE.successful) {
                error(response.data);
                yield put(stopLoader());
            }
            else {
                success(response.data);
                yield put(stopLoader());
            }
        }

    }
    catch (err) {
        yield put(stopLoader());
        error({
            msg: 'Sorry, something went wrong.'
        })
    }
}

function* checkLogin({ credentials, success, onError }) {
    try {
        yield put(startLoader())
        const response = yield postRequestNoAuth({ API: `${api.URL.LOGIN}`, DATA: credentials });

        if (window.navigator.onLine === false) {
            yield put(stopLoader())
            onError({
                msg: 'You appear to be offline. Please check your connection.'
            })
        }
        else {
            if (response.status === STATUS_CODE.unAuthorized) {
                yield put(setAuthorization(null));
                yield put(saveAgencyData(null))
                yield put(setDashboardData(null));
                yield put(setDashboardTableData(null));
                yield put(stopLoader());
                return;
            }
            if (response.status !== STATUS_CODE.successful) {
                onError(response.data);
                yield put(stopLoader());
            }
            else {
                yield put(setAuthorization(response && response.data && response.data.data && response.data.data.token));
                yield put(saveAgencyData({ ...response.data.data, name: response && response.data && response.data.data && response.data.data.name, userAgency: response && response.data && response.data.data && response.data.data.userAgency, }))
                yield put(saveRole(response && response.data && response.data.data && response.data.data.role))
                yield put(saveLoginType(response.data.data.loginType))
                success();
                yield put(stopLoader());
            }
        }
    }
    catch (error) {
        yield put(stopLoader());
        onError({
            msg: 'Sorry, something went wrong.'
        })
    }
}

function* sendRecoveryMail({ email, success, error }) {
    try {
        yield put(startLoader());
        const response = yield postRequestNoAuth({ API: `${api.URL.FORGOT_PASSWORD}`, DATA: email });

        if (window.navigator.onLine === false) {
            yield put(stopLoader())
            error({
                msg: 'You appear to be offline. Please check your connection.'
            })
        }
        else {
            if (response.status === STATUS_CODE.unAuthorized) {
                yield put(setAuthorization(null));
                yield put(saveAgencyData(null))
                yield put(setDashboardData(null));
                yield put(setDashboardTableData(null));
                yield put(stopLoader());
                return;
            }
            if (response.status !== STATUS_CODE.successful) {
                error(response.data);
                yield put(stopLoader());
            }
            else {

                success(response.data);
                yield put(stopLoader());
            }
        }

    }
    catch (err) {
        yield put(stopLoader());
        error({
            msg: 'Sorry, something went wrong.'
        })
    }
}

function* SocialSignUp({ data, success, error }) {
    try {
        yield put(startLoader());
        const response = yield postRequestNoAuth({ API: `${api.URL.SOCIAL_SIGNUP}`, DATA: data });
        if (window.navigator.onLine === false) {
            yield put(stopLoader())
            error({
                msg: 'You appear to be offline. Please check your connection.'
            })
        }
        else {
            if (response.status === STATUS_CODE.unAuthorized) {
                yield put(stopLoader());
                yield put(setAuthorization(null));
                yield put(saveAgencyData(null))
                yield put(stopLoader());
                return;
            }
            if (response.status !== STATUS_CODE.successful) {
                error(response.data);
                yield put(stopLoader());
            }
            else {
                success(response.data);
                yield put(saveLoginType(response.data.data.loginType))
                yield put(stopLoader());
            }
        }
    }
    catch (err) {
        yield put(stopLoader());
        error({
            msg: 'Sorry, something went wrong.'
        })
    }
}

function* logoutUser({ token, success, failure }) {

    try {
        yield put(startLoader());
        const response = yield postRequest({ API: `${api.URL.LOGOUT}`, DATA: { authorization: token } });
        if (window.navigator.onLine === false) {
            yield put(stopLoader())
            failure({
                msg: 'You appear to be offline. Please check your connection.'
            })
        } else {
            if (response.status === STATUS_CODE.unAuthorized) {
                yield put(setAuthorization(null));
                yield put(saveAgencyData(null))
                yield put(setDashboardData(null));
                yield put(setDashboardTableData(null));

                yield put(stopLoader());
                failure(response.data)
            }
            if (response.status !== STATUS_CODE.successful) {
                yield put(setAuthorization(null))
                yield put(setDashboardData(null));
                yield put(setDashboardTableData(null));
                yield put(saveAgencyData(null))
                yield put(stopLoader());
                failure(response.data)
            }
            else {
                success()
                yield put(setAuthorization(null))
                yield put(saveAgencyData(null))
                yield put(setDashboardData(null));
                yield put(setDashboardTableData(null));
                yield put(setCurrentLocation(''))
                yield put(saveStepNo(1))
                yield put(stopLoader());
            }
        }
    }
    catch (error) {
        yield put(stopLoader());
        failure({
            msg: 'Sorry, something went wrong.'
        })
    }
}

function* socialLogin({ data, success = () => { }, failure = () => { } }) {
    try {
        yield put(startLoader());
        const response = yield postRequestNoAuth({ API: `${api.URL.SOCIAL_LOGIN}`, DATA: data });
        if (window.navigator.onLine === false) {
            yield put(stopLoader())
            failure({
                msg: 'You appear to be offline. Please check your connection.'
            })
        }
        else {
            if (response.status !== STATUS_CODE.successful) {
                yield put(setAuthorization(null))
                yield put(setDashboardData(null));
                yield put(setDashboardTableData(null));
                yield put(saveAgencyData(null))
                yield put(stopLoader());
                failure(response.data)
            }
            else {
                yield put(stopLoader());
                yield put(setAuthorization(response && response.data && response.data.data && response.data.data.token));
                yield put(saveAgencyData({ ...response.data.data, name: response && response.data && response.data.data && response.data.data.name, userAgency: response && response.data && response.data.data && response.data.data.userAgency }))
                yield put(saveRole(response && response.data && response.data.data && response.data.data.role))
                yield put(saveLoginType(response.data.data.loginType))
                success()
            }
        }

    }
    catch (error) {
        yield put(stopLoader());
        failure({
            msg: 'Sorry, something went wrong.'
        })
    }
}

function* AuthSaga() {
    yield all([
        takeLatest(REGISTER_USER, registerUser),
        takeLatest(SET_AUTHORIZATION, setUserToken),
        takeLatest(CHECK_LOGIN, checkLogin),
        takeLatest(SEND_FORGOT_EMAIL, sendRecoveryMail),
        takeLatest(LOGOUT_USER, logoutUser),
        takeLatest(SOCIAL_MEDIA_LOGIN, socialLogin),
    ]);
}

export default AuthSaga;
