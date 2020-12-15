import { takeLatest, all, put } from "redux-saga/effects";

import {
    POPULAR_PLACES, stopLoader, startLoader, setAuthorization,
    SEARCH_VEHICLE, GET_CURRENT_LOCATION, getPopularPlacesListing, vehicleListing, MAKE_REQUEST,
    GET_VEHICLE_INFORMATION, setVehicleInformation, GET_FAQ, setFaq, EDIT_DRIVER_PROFILE, DRIVER_TRIPS,
    DRIVER_RATINGS,
    SAVE_CARD,
    GET_CARDS,
    GET_TOKEN,
    saveToken,
    GET_PACKAGES,
    savePackages
} from '../actions'
const { defaultConfig: { PLATFORM } } = require(`../../../config/default`);
const api = require(`../../../shared/${PLATFORM}/api`);
const { getRequest, putRequest, postRequest } = require(`../../../helpers/${PLATFORM}`);
const { STATUS_CODE } = require(`../../../shared/${PLATFORM}/constants`);

function* saveCard({ data, success, onError }) {
    try {
        yield put(startLoader())
        const response = yield postRequest({ API: `${api.URL.CARD}`, Data: data });

        if (window.navigator.onLine === false) {
            yield put(stopLoader())
            onError({
                msg: 'You appear to be offline. Please check your connection.'
            })
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
                yield put(setFaq(response.data))
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
function* getPackages({ data, success, onError = () => { } }) {
    try {
        // yield put(startLoader())
        const response = yield getRequest({ API: `${api.URL.PACKAGES}` });

        if (window.navigator.onLine === false) {
            yield put(stopLoader())
            onError({
                msg: 'You appear to be offline. Please check your connection.'
            })
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
                yield put(savePackages(response && response.data && response.data.data))
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

function* getTokens({ data, success = () => { }, onError = () => { } }) {
    try {
        // yield put(startLoader())
        const response = yield getRequest({ API: `${api.URL.TOKEN}` });

        if (window.navigator.onLine === false) {
            yield put(stopLoader())
            onError({
                msg: 'You appear to be offline. Please check your connection.'
            })
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
                yield put(saveToken(response && response.data && response.data.tokenCount))
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


function* TokenSaga() {
    yield all([
        takeLatest(GET_TOKEN, getTokens),
        takeLatest(GET_PACKAGES, getPackages)
        // takeLatest(SAVE_CARD, saveCard),
    ]);
}

export default TokenSaga;