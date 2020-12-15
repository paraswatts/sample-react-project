import { takeLatest, all, put } from "redux-saga/effects";

import {
    POPULAR_PLACES, stopLoader, startLoader, setAuthorization,
    SEARCH_VEHICLE, getPopularPlacesListing, vehicleListing, MAKE_REQUEST,
    GET_VEHICLE_INFORMATION, setVehicleInformation, GET_FAQ, setFaq, EDIT_DRIVER_PROFILE, DRIVER_TRIPS,
    DRIVER_RATINGS, GET_PROFILE_INFORMATION, setDriverProfileInformation, CHANGE_DRIVER_PASSWORD,
    setDriverTripListing, GET_DRIVER_PAST_TRIP_LIST, setDriverPastTripList, setDriverRatings, RATE_AGENCY,
    EMAIL_AGENCY, CANCEL_TRIP, GET_CANCELLED_TRIP, setCancelledTrips, CHANGE_SESSION,
} from '../actions'
const { defaultConfig: { PLATFORM } } = require(`../../../config/default`);
const api = require(`../../../shared/${PLATFORM}/api`);
const { getRequest, putRequest, postRequest } = require(`../../../helpers/${PLATFORM}`);
const { STATUS_CODE } = require(`../../../shared/${PLATFORM}/constants`);

function* popularPlacesListing({ data, onError }) {
    try {
        yield put(startLoader())
        const response = yield getRequest({ API: `${api.URL.POPULAR_PLACES_LISTING}?limit=${data.limit}&sortOrder=${data.sortOrder}` });

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
                onError(response.data);
                yield put(stopLoader());
            }
            else {
                yield put(getPopularPlacesListing(response.data.data))
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

function* vehicleSearch({ data, success, onError }) {
    try {
        yield put(startLoader())
        const response = yield getRequest({ API: `${api.URL.VEHICLE_SEARCH}?${data}` });

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
                onError(response.data);
                yield put(stopLoader());
            }
            else {
                success(response.data);
                yield put(vehicleListing(response.data))
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

function* getVehicleInformation({ data, success, onError }) {
    try {
        yield put(startLoader())
        const response = yield getRequest({ API: `${api.URL.GET_VEHICLE}/${data}` });

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
                onError(response.data);
                yield put(stopLoader());
            }
            else {
                yield put(setVehicleInformation(response.data.data))
                success(response.data.data);
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

function* bookVehicle({ data, success, onError }) {
    try {
        yield put(startLoader())
        const response = yield putRequest({ API: `${api.URL.MAKE_VEHICLE_REQUEST}/${data.id}/driver`, DATA: data.data });

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
                onError(response.data);
                yield put(stopLoader());
            }
            else {
                success(response.data);
                yield put(vehicleListing(response.data))
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

function* getFaqList({ success, onError }) {
    try {
        yield put(startLoader())
        const response = yield getRequest({ API: `${api.URL.FAQ_LIST}` });

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

function* editDriverProfileForm({ data, success, onError }) {
    try {
        yield put(startLoader())
        const response = yield postRequest({ API: `${api.URL.UPDATE_DRIVER_PROFILE}`, DATA: data });
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
                onError(response.data);
                yield put(stopLoader());
            }
            else {
                success(response.data);
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

function* driverTrips({ data, success, onError }) {
    try {
        yield put(startLoader())
        const response = yield getRequest({ API: `${api.URL.UPCOMING_DRIVER_TRIPS}?${data}` });

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
                onError(response.data);
                yield put(stopLoader());
            }
            else {
                success(response.data);
                yield put(setDriverTripListing(response.data))
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

function* driverPastTrips({ data, success, onError }) {

    try {
        yield put(startLoader())
        const response = yield getRequest({ API: `${api.URL.PAST_DRIVER_TRIPS}?${data}` });

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
                onError(response.data);
                yield put(stopLoader());
            }
            else {
                success(response.data);
                yield put(setDriverPastTripList(response.data))
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

function* driverRatings({ data, success, onError }) {
    try {
        yield put(startLoader())
        const response = yield getRequest({ API: `${api.URL.DRIVER_RATINGS}?${data}` });

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
                onError(response.data);
                yield put(stopLoader());
            }
            else {
                success(response.data);
                yield put(setDriverRatings(response.data))
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

function* getProfileInformation({ success, onError }) {
    try {
        yield put(startLoader())
        const response = yield getRequest({ API: `${api.URL.GET_DRIVER_PROFILE}` });

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
                onError(response.data);
                yield put(stopLoader());
            }
            else {
                success(response.data);
                yield put(setDriverProfileInformation(response.data.data))
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

function* changeDriverPasswordFunction({ data, success, onError }) {
    try {
        yield put(startLoader())
        const response = yield postRequest({ API: `${api.URL.CHANGE_DRIVER_PASSWORD_URL}`, DATA: data });

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
                onError(response.data);
                yield put(stopLoader());
            }
            else {
                success(response.data);
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

function* rateAgency({ data, success, onError }) {
    try {
        yield put(startLoader())
        const response = yield putRequest({ API: `${api.URL.DASHBOARD_DATA}/${data.id}`, DATA: data.data });

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
                onError(response.data);
                yield put(stopLoader());
            }
            else {
                success(response.data);
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

function* emailAgency({ data, success, onError }) {
    try {
        yield put(startLoader())
        const response = yield postRequest({ API: `${api.URL.EMAIL_AGENCY}`, DATA: data });

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
                onError(response.data);
                yield put(stopLoader());
            }
            else {
                success(response.data);
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

function* cancelTrip({ data, success, onError }) {
    try {
        yield put(startLoader())
        const response = yield putRequest({ API: `${api.URL.CANCEL_TRIP}/${data.id}/status`, DATA: data.status });

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
                onError(response.data);
                yield put(stopLoader());
            }
            else {
                success(response.data);
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

function* getCancelledTrip({ data, success, onError }) {
    try {
        yield put(startLoader())
        const response = yield getRequest({ API: `${api.URL.GET_CANCELLED_TRIPS}?${data}&sortKey=createdAt&sortType=-1` });

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
                onError(response.data);
                yield put(stopLoader());
            }
            else {
                success(response.data);
                yield put(setCancelledTrips(response.data))
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

function* changeNotificationSession({ data, success, onError }) {
    try {
        yield put(startLoader())
        const response = yield putRequest({ API: `${api.URL.NOTIFICATION_SESSION}`, DATA: data });

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
                onError(response.data);
                yield put(stopLoader());
            }
            else {
                success(response.data);
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


function* DriverSaga() {
    yield all([
        takeLatest(POPULAR_PLACES, popularPlacesListing),
        takeLatest(SEARCH_VEHICLE, vehicleSearch),
        takeLatest(GET_VEHICLE_INFORMATION, getVehicleInformation),
        takeLatest(MAKE_REQUEST, bookVehicle),
        takeLatest(GET_FAQ, getFaqList),
        takeLatest(EDIT_DRIVER_PROFILE, editDriverProfileForm),
        takeLatest(DRIVER_TRIPS, driverTrips),
        takeLatest(DRIVER_RATINGS, driverRatings),
        takeLatest(GET_PROFILE_INFORMATION, getProfileInformation),
        takeLatest(CHANGE_DRIVER_PASSWORD, changeDriverPasswordFunction),
        takeLatest(GET_DRIVER_PAST_TRIP_LIST, driverPastTrips),
        takeLatest(RATE_AGENCY, rateAgency),
        takeLatest(EMAIL_AGENCY, emailAgency),
        takeLatest(CANCEL_TRIP, cancelTrip),
        takeLatest(GET_CANCELLED_TRIP, getCancelledTrip),
        takeLatest(CHANGE_SESSION, changeNotificationSession),

    ]);
}

export default DriverSaga;