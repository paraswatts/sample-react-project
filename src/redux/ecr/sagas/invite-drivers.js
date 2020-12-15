
import { takeLatest, all, put, delay, takeEvery } from "redux-saga/effects";
import {
    GET_DRIVERS,
    GET_DASHBOARD_DATA,
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
    CREATE_VEHICLE_CATEGORY,
    ADD_NEW_MEMBER,
    saveSearchedDrivers,
    INVITE_DRIVERS
} from '../actions';
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../config/default`);
const api = require(`../../../shared/${PLATFORM}/api`);
const { updateAuthToken, postRequestNoAuth, postRequest, getRequest, deleteRequest } = require(`../../../helpers/${PLATFORM}`);
const { STATUS_CODE } = require(`../../../shared/${PLATFORM}/constants`);

function* getDriver({ searchString, success = () => { }, failure = () => { } }) {
    if (!!searchString) {
        try {
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
                    yield put(saveSearchedDrivers(response && response.data && response.data.data))
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
}


function* inviteDrivers({ data, success, failure }) {

    try {
        yield put(startLoader())
        const response = yield postRequest({ API: `${api.URL.INVITE_DRIVERS}`, DATA: data });

        if (window.navigator.onLine === false) {
            yield put(stopLoader())
            failure({
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
                success(response.data);
                // yield put(setFaq(response.data))
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

function* InviteDrivers() {
    yield all([
        takeLatest(GET_DRIVERS, getDriver),
        takeLatest(INVITE_DRIVERS, inviteDrivers)
    ]);
}

export default InviteDrivers;
