import { takeLatest, all, put } from "redux-saga/effects";

import {
    stopLoader, startLoader, setAuthorization,
    updateRequest,
    updateFailure,
    updateSuccess,
    UPDATE_BRANCH,
    CHANGE_PASSWORD,
    GET_PROFILE,
    setProfile
} from '../actions'
const { defaultConfig: { PLATFORM } } = require(`../../../config/default`);
const api = require(`../../../shared/${PLATFORM}/api`);
const { getRequest, postRequest } = require(`../../../helpers/${PLATFORM}`);
const { STATUS_CODE } = require(`../../../shared/${PLATFORM}/constants`);



function* changePassword({ data, success, failure }) {
    yield put(updateRequest())
    try {
        yield put(startLoader())
        const response = yield postRequest({ API: `${api.URL.CHANGE_DRIVER_PASSWORD_URL}`, DATA: data });

        if (window.navigator.onLine === false) {
            yield put(stopLoader())
            failure({
                msg: 'You appear to be offline. Please check your connection.'
            })
            yield put(updateFailure())

        }
        else {
            if (response.status === STATUS_CODE.unAuthorized) {
                yield put(setAuthorization(null));
                yield put(stopLoader())
                yield put(updateFailure())

                return;
            }
            if (response.status !== STATUS_CODE.successful) {
                failure(response.data);
                yield put(stopLoader());
                yield put(updateFailure())

            }
            else {
                success(response.data);
                yield put(updateSuccess())

                // yield put(setFaq(response.data))
                yield put(stopLoader());
            }
        }
    }
    catch (error) {
        yield put(stopLoader());
        yield put(updateFailure())
        failure({
            msg: 'Sorry, something went wrong.'
        })
    }
}

function* getProfile({ success = () => { }, failure = () => { } }) {

    try {
        yield put(startLoader())
        const response = yield getRequest({ API: `${api.URL.AGENCY_PROFILE}` });

        if (window.navigator.onLine === false) {
            yield put(stopLoader())
            // onError({
            //     msg: 'You appear to be offline. Please check your connection.'
            // })
        }
        else {
            if (response.status === STATUS_CODE.unAuthorized) {
                yield put(setAuthorization(null));
                yield put(stopLoader())

                return;
            }
            if (response.status !== STATUS_CODE.successful) {
                // onError(response.data);
                yield put(stopLoader());
            }
            else {
                // success(response.data);
                yield put(setProfile(response && response.data && response.data.data))
                // defaultCardGetter()
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
function* AgencyProfileSaga() {
    yield all([
        takeLatest(CHANGE_PASSWORD, changePassword),
        takeLatest(GET_PROFILE, getProfile)
    ]);
}

export default AgencyProfileSaga;