
import { takeLatest, all, put, delay, takeEvery, fork } from "redux-saga/effects";
import {
    setDashboardData,
    startLoader,
    stopLoader,
    setAuthorization,
    setDashboardTableData,
    saveAgencyData,
    updateRequest,
    updateFailure,
    updateSuccess,
    getUnratedDriverData,
    UNRATED_DRIVER,
    RATED_DRIVERS,
    getratedDriverData,
    CHANGE_FAVORITE,
    GET_AGENCY_RATINGS,
    setAgencyRatedData,
    CHANGE_RATING_STATUS,
} from '../actions';
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../config/default`);
const api = require(`../../../shared/${PLATFORM}/api`);
const { updateAuthToken, postRequestNoAuth, postRequest, getRequest, deleteRequest } = require(`../../../helpers/${PLATFORM}`);
const { STATUS_CODE } = require(`../../../shared/${PLATFORM}/constants`);

function* getDriverData({ searchString, success = () => { }, failure = () => { } }) {

    try {
        yield put(startLoader())
        yield put(updateRequest())
        const response = yield getRequest({ API: `${api.URL.SEARCH_DRIVER}?searchString=${searchString}`, });

        if (window.navigator.onLine === false) {
            yield put(stopLoader())
            failure({
                msg: 'You appear to be offline. Please check your connection.'
            })
            yield put(updateFailure())
            return
        }
        else {
            if (response.status === STATUS_CODE.unAuthorized) {
                yield put(setAuthorization(null));
                yield put(saveAgencyData(null))
                yield put(stopLoader())
                yield put(setDashboardData(null));
                yield put(setDashboardTableData(null));
                return;
            }
            if (response.status !== STATUS_CODE.successful) {
                failure(response.data);
                yield put(updateFailure())
                yield put(stopLoader())

            }
            else {
                yield put(stopLoader())
                success(response.data)
                yield put(updateSuccess())
            }
        }
    }
    catch (err) {
        failure({
            msg: 'Sorry, something went wrong.'
        })
        yield put(stopLoader())

    }
}

function* pendingRatings({ data, success = () => { }, failure = () => { } }) {
    const { index, limit, sortType,
        sortKey } = data

    try {
        const response = yield getRequest({ API: `${api.URL.UNRATED_DRIVERS}?index=${index}&limit=${limit}&sortType=${sortType}&sortKey=${sortKey}` });

        if (window.navigator.onLine === false) {
            yield put(stopLoader())
            failure({
                msg: 'You appear to be offline. Please check your connection.'
            })
            return
        }
        else {
            if (response.status === STATUS_CODE.unAuthorized) {
                yield put(setAuthorization(null));
                yield put(saveAgencyData(null))
                yield put(stopLoader())
                yield put(setDashboardData(null));
                yield put(setDashboardTableData(null));
                return;
            }
            if (response.status !== STATUS_CODE.successful) {
                failure(response.data);
                yield put(updateFailure())
                yield put(stopLoader())

            }
            else {
                yield put(stopLoader())
                success(response.data)
                yield put(getUnratedDriverData(response && response.data && response.data.data))
            }
        }
    }
    catch (err) {
        failure({
            msg: 'Sorry, something went wrong.'
        })
        yield put(stopLoader())
    }

}


function* ratedDrivers({ data, success = () => { }, failure = () => { } }) {
    const { index, limit, sortType,
        sortKey } = data

    try {
        const response = yield getRequest({ API: `${api.URL.PAST_RATING}?index=${index}&limit=${limit}&sortType=${sortType}&sortKey=${sortKey}` });

        if (window.navigator.onLine === false) {
            yield put(stopLoader())
            failure({
                msg: 'You appear to be offline. Please check your connection.'
            })
            return
        }
        else {
            if (response.status === STATUS_CODE.unAuthorized) {
                yield put(setAuthorization(null));
                yield put(saveAgencyData(null))
                yield put(stopLoader())
                yield put(setDashboardData(null));
                yield put(setDashboardTableData(null));
                return;
            }
            if (response.status !== STATUS_CODE.successful) {
                failure(response.data);
                yield put(updateFailure())
                yield put(stopLoader())

            }
            else {
                yield put(stopLoader())
                success(response.data)
                yield put(getratedDriverData(response && response.data && response.data.data))
            }
        }
    }
    catch (err) {
        failure({
            msg: 'Sorry, something went wrong.'
        })
        yield put(stopLoader())

    }
}

function* getAgencyRatings({ data, success = () => { }, failure = () => { } }) {
    const { index, limit, sortType, sortKey } = data
    try {
        const response = yield getRequest({ API: `${api.URL.AGENCY_LISTING_RATING}?index=${index}&limit=${limit}&sortType=${sortType}&sortKey=${sortKey}` });
        if (window.navigator.onLine === false) {
            yield put(stopLoader())
            failure({
                msg: 'You appear to be offline. Please check your connection.'
            })
            return
        }
        else {
            if (response.status === STATUS_CODE.unAuthorized) {
                yield put(setAuthorization(null));
                yield put(saveAgencyData(null))
                yield put(stopLoader())
                yield put(setDashboardData(null));
                yield put(setDashboardTableData(null));
                return;
            }
            if (response.status !== STATUS_CODE.successful) {
                failure(response.data);
                yield put(updateFailure())
                yield put(stopLoader())

            }
            else {
                yield put(stopLoader())
                yield put(setAgencyRatedData(response && response.data && response.data.data))
            }
        }
    }
    catch (err) {
        failure({
            msg: 'Sorry, something went wrong.'
        })
        yield put(stopLoader())

    }
}

function* changeStatus({ data,
    success = () => { }, failure = () => { } }) {
    try {
        yield put(updateRequest())
        // yield put(startLoader())
        const response = yield postRequest({ API: `${api.URL.CHANGE_DRIVER_RATING_STATUS}`, DATA: data });

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

function* RateDrivers() {
    yield takeEvery(UNRATED_DRIVER, pendingRatings)
    yield takeEvery(RATED_DRIVERS, ratedDrivers)
    yield takeEvery(GET_AGENCY_RATINGS, getAgencyRatings)
    yield takeLatest(CHANGE_RATING_STATUS, changeStatus)
}

export default RateDrivers;
