
import { takeLatest, all, put, delay, takeEvery } from "redux-saga/effects";
import {
    DELETE_VEHICLE,
    setDashboardData,
    UPDATE_STATUS,
    GET_DASHBOARD_TABLE_DATA,
    startLoader,
    stopLoader,
    setAuthorization,
    setDashboardTableData,
    saveAgencyData,
    setVehicleData,
    GET_VEHICLE_DATA,
    GET_BRANCH_LIST,
    setBranchList,
    GET_FUEL_TYPE_LIST,
    setFuelList,
    GET_INSURANCE_LIST,
    setInsuranceData,
    FILE_UPLOAD,
    getVehiclesImages,
    GET_VEHICLE_TYPE,
    setVehicleType,
    setVehicleTransmission,
    GET_VEHICLE_TRANSMISSION,
    getVehicleTypeList,
    GET_VEHICLE_TYPE_LIST,
    setVehicleTypeList,
    GET_TRANSMISSION_TYPE_LIST,
    getTransmissionTypeList,
    setTransmissionTypeList,
    GET_BRANCH_MANGERS,
    setBranchManager,
    CREATE_BRANCH,
    GET_TERMS,
    setTerms,
    updateRequest,
    updateFailure,
    updateSuccess,
    ADD_INSURANCE,
    ADD_FERRY,
    setFerry,
    GET_FERRY,
    GET_FUEL_OFFER,
    setFuelOffer,
    ADD_FUEL_OFFER,
    ADD_EXTRA_ITEMS,
    GET_EXTRA_ITEMS,
    setExtraItems,
    ADD_NEW_TERMS,
    GET_VEHCILE_CATEGORY,
    setVehcileCategory,
    ADD_NEW_VEHICLE,
    CREATE_NEW_LISTING,
    UPDATE_VEHICLE,
    ADD_REVIEW_MEMBER,
    GET_REVIEW_MEMBER,
    setReviewMember,
    DELETE_REVIEW_MEMBER,
    setBookingMember,
    UPDATE_NOTIFICATION_SETTING
} from '../actions';
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../config/default`);
const api = require(`../../../shared/${PLATFORM}/api`);
const { updateAuthToken, postRequestNoAuth, postRequest, getRequest, deleteRequest, putRequest } = require(`../../../helpers/ecr`);
const { STATUS_CODE } = require(`../../../shared/${PLATFORM}/constants`);

function* addReviewMember({ data, success = () => { }, failure = () => { } }) {
    try {
        if (!data.surname) {
            delete data.surname
        }
        yield put(startLoader())
        yield put(updateRequest())
        const response = yield postRequest({ API: `${api.URL.EMAIL_OPTION}`, DATA: data });

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
function* getReviewMember({ data }) {

    try {
        // yield put(startLoader())

        const response = yield getRequest({ API: `${api.URL.EMAIL_OPTION}/${data}` });

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
                if (data === 1)
                    yield put(setBookingMember(response.data.data))
                else
                    yield put(setReviewMember(response.data.data))
                yield
                yield put(stopLoader());
            }
        }

    }
    catch (error) {
        yield put(stopLoader());
        // onError({
        //     msg: 'Sorry, something went wrong.'
        // })
    }
}


function* deleteReviewMember({ id, success = () => { }, failure = () => { } }) {

    try {
        yield put(startLoader())
        yield put(updateRequest())
        const response = yield deleteRequest({ API: `${api.URL.EMAIL_OPTION}/${id}` });

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
// updateNotificationSetting

function* updateNotificationSetting({ data, success, failure }) {
    yield put(updateRequest())

    try {
        yield put(startLoader())
        const response = yield putRequest({ API: `${api.URL.AGENCY_UPDATE}`, DATA: data });

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
                yield put(saveAgencyData({ ...response.data.data, name: response && response.data && response.data.data && response.data.data.name, userAgency: response && response.data && response.data.data && response.data.data.userAgency }))

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

function* AddReviewMember() {
    yield all([
        takeLatest(ADD_REVIEW_MEMBER, addReviewMember),
        takeEvery(GET_REVIEW_MEMBER, getReviewMember),
        takeLatest(DELETE_REVIEW_MEMBER, deleteReviewMember),
        takeLatest(UPDATE_NOTIFICATION_SETTING, updateNotificationSetting),

    ]);
}

export default AddReviewMember;
