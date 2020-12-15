
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
    GET_VEHICLES,
    setVehicles
} from '../actions';
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../config/default`);
const api = require(`../../../shared/${PLATFORM}/api`);
const { updateAuthToken, postRequestNoAuth, postRequest, getRequest, deleteRequest, putRequest } = require(`../../../helpers/ecr`);
const { STATUS_CODE } = require(`../../../shared/${PLATFORM}/constants`);

function* deleteVehicle({ id, success = () => { }, failure = () => { } }) {

    try {
        yield put(startLoader())
        yield put(updateRequest())
        const response = yield deleteRequest({ API: `${api.URL.VEHCILES_DATA}/${id}` });

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


function* updateVehicle({ data, success = () => { }, failure = () => { } }) {
    const { id } = data
    delete data.id
    try {
        yield put(startLoader())
        yield put(updateRequest())
        const response = yield putRequest({ API: `${api.URL.VEHCILES_DATA}/${id}`, DATA: data });

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



function* getVehicles({ success = () => { }, failure = () => { } }) {

    try {
        const response = yield getRequest({ API: `${api.URL.VEHICLE_IMAGES}`, });

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
                yield put(stopLoader())

            }
            else {
                yield put(stopLoader())
                // success(response.data)
                yield put(setVehicles(response.data && response.data && response.data.data))
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
function* Vehicle() {
    yield all([
        takeLatest(DELETE_VEHICLE, deleteVehicle),
        takeLatest(UPDATE_VEHICLE, updateVehicle),
        takeLatest(GET_VEHICLES, getVehicles),
    ]);
}

export default Vehicle;
