
import { takeLatest, all, put, delay, takeEvery } from "redux-saga/effects";
import {
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
    newListingId, DELETE_INSURANCE,
    DELETE_MEMBER,
    EDIT_INSURANCE, GET_INSURANCE_BY_ID,
    UPDATE_MEMBER
} from '../actions';
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../config/default`);
const api = require(`../../../shared/${PLATFORM}/api`);
const { updateAuthToken, postRequestNoAuth, postRequest, getRequest, putRequest, deleteRequest } = require(`../../../helpers/${PLATFORM}`);
const { STATUS_CODE } = require(`../../../shared/${PLATFORM}/constants`);

const createFormData = (fileData) => {
    const data = new FormData();
    data.append("file", fileData.file);
    return data;
};


function* getVehicleData({ data, success = () => { }, failure = () => { } }) {
    try {
        // yield put(startLoader())

        const response = yield getRequest({ API: `${api.URL.VEHCILES_DATA}?limit=9999999` });

        if (window.navigator.onLine === false) {
            yield put(stopLoader())
            // failure({
            //     msg: 'You appear to be offline. Please check your connection.'
            // })

            return
        }
        else {
            if (response.status === STATUS_CODE.unAuthorized) {

                yield put(setAuthorization(null));
                yield put(saveAgencyData(null))
                yield put(setDashboardData(null));
                yield put(stopLoader())

                yield put(setDashboardTableData(null));
                return;
            }
            if (response.status !== STATUS_CODE.successful) {
                yield put(stopLoader())

                failure(response.data);
            }
            else {
                yield put(stopLoader())
                yield put(setVehicleData(response.data && response.data.data))
            }
        }
    }
    catch (err) {
        failure({
            msg: 'Sorry, something went wrong.'
        })
    }
}

function* getBranchList({ data, success = () => { }, failure = () => { } }) {
    try {
        // yield put(startLoader())

        const response = yield getRequest({ API: `${api.URL.BRANCH_LIST}?limit=99999999` });
        if (window.navigator.onLine === false) {
            yield put(stopLoader())


            // yield put(stopLoader())
            // failure({
            //     msg: 'You appear to be offline. Please check your connection.'
            // })
            return
        }
        else {
            if (response.status === STATUS_CODE.unAuthorized) {
                yield put(setAuthorization(null));
                yield put(saveAgencyData(null))
                yield put(setDashboardData(null));
                yield put(stopLoader())

                yield put(setDashboardTableData(null));
                return;
            }
            if (response.status !== STATUS_CODE.successful) {
                failure(response.data);
                yield put(stopLoader())

            }
            else {
                yield put(setBranchList(response.data && response.data.data))
                yield put(stopLoader())

            }
        }
    }
    catch (err) {
        failure({
            msg: 'Sorry, something went wrong.'
        })
    }
}





function* getFuelList({ data, success = () => { }, failure = () => { } }) {

    try {
        // yield put(startLoader())

        const response = yield getRequest({ API: `${api.URL.FUEL_TYPE_LIST}`, DATA: data });

        if (window.navigator.onLine === false) {
            yield put(stopLoader())

            // yield put(stopLoader())
            // failure({
            //     msg: 'You appear to be offline. Please check your connection.'
            // })
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
                yield put(stopLoader())
                failure(response.data);
            }
            else {
                yield put(setFuelList(response.data && response.data.data))
                yield put(stopLoader())
            }
        }
    }
    catch (err) {
        failure({
            msg: 'Sorry, something went wrong.'
        })
    }
}


function* getInsuranceList({ data, success = () => { }, failure = () => { } }) {

    try {
        // yield put(startLoader())

        const response = yield getRequest({ API: `${api.URL.INSTRUCTION_LIST}?${data}` });

        if (window.navigator.onLine === false) {
            yield put(stopLoader())

            // yield put(stopLoader())
            // failure({
            //     msg: 'You appear to be offline. Please check your connection.'
            // })
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
                yield put(setInsuranceData(response.data && response.data.data && response.data.data))
                yield put(stopLoader())
            }
        }
    }
    catch (err) {
        failure({
            msg: 'Sorry, something went wrong.'
        })
    }
}


function* fileUpload({ data, index, length, success = () => { }, failure = () => { } }) {

    const formData = createFormData(data);


    try {
        yield put(startLoader())

        const response = yield postRequest({ API: `${api.URL.FILE_UPLOAD}`, DATA: formData });

        if (window.navigator.onLine === false) {
            yield put(stopLoader())
            return
        }
        else {
            if (response.status === STATUS_CODE.unAuthorized) {
                yield put(setAuthorization(null));
                yield put(saveAgencyData(null))
                if (index === (length - 1)) {
                    yield put(stopLoader())
                }
                yield put(setDashboardData(null));
                yield put(setDashboardTableData(null));
                return;
            }
            if (response.status !== STATUS_CODE.successful) {
                if (index === (length - 1)) {
                    yield put(stopLoader())
                }
                failure(response.data, index);
            }
            else {
                if (index === (length - 1))
                    success(response.data)
                yield put(getVehiclesImages(response.data && response.data.data && response.data.data))
                if (index === (length - 1)) {
                    yield put(stopLoader())
                }
            }
        }
    }
    catch (err) {
        if (index === (length - 1)) {
            yield put(stopLoader())
        }
        failure({
            msg: 'Sorry, something went wrong.please try again'
        }, index)

    }
}

function* vehicleType({ data, success = () => { }, failure = () => { } }) {

    try {
        // yield put(startLoader())

        const response = yield getRequest({ API: `${api.URL.VEHICLE_TYPE}` });
        if (window.navigator.onLine === false) {
            yield put(stopLoader())

            // yield put(stopLoader())
            // failure({
            //     msg: 'You appear to be offline. Please check your connection.'
            // })
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
                yield put(setVehicleType(response.data && response.data.data))
                yield put(stopLoader())
            }
        }
    }
    catch (err) {
        failure({
            msg: 'Sorry, something went wrong.'
        })
    }
}



function* gettransmissionTypeList({ data, success = () => { }, failure = () => { } }) {
    try {
        const response = yield getRequest({ API: `${api.URL.TRANSMISSION_TYPE_LIST}` });

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
                yield put(setDashboardData(null));
                yield put(setDashboardTableData(null));
                return;
            }
            if (response.status !== STATUS_CODE.successful) {
                failure(response.data);
                yield put(stopLoader())

            }
            else {
                yield put(setTransmissionTypeList(response.data && response.data.data))
            }
        }
    }
    catch (err) {
        failure({
            msg: 'Sorry, something went wrong.'
        })
    }
}



function* vehicleTransmission({ data, success = () => { }, failure = () => { } }) {

    try {
        // yield put(startLoader())

        const response = yield getRequest({ API: `${api.URL.VEHICLE_TRANSMISSION}` });
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
            }
            else {
                yield put(setVehicleTransmission(response.data && response.data.data))
                yield put(stopLoader())
            }
        }
    }
    catch (err) {
        failure({
            msg: 'Sorry, something went wrong.'
        })
    }
}



function* getvehicleTypeList({ data, success = () => { }, failure = () => { } }) {
    try {


        const response = yield getRequest({ API: `${api.URL.VEHICLE_TYPE_LIST}` });

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
            }
            else {
                yield put(stopLoader())

                yield put(setVehicleTypeList(response.data && response.data.data))
            }
        }
    }
    catch (err) {
        failure({
            msg: 'Sorry, something went wrong.'
        })
    }
}


function* getBranchManger({ data, success = () => { }, failure = () => { } }) {
    try {
        const response = yield getRequest({ API: `${api.URL.BRANCH_MANAGERS}`, headers: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI1ZWE2YjBiZWUyODYyYzE4NzZiYmNmNmEiLCJyb2xlIjoyLCJpYXQiOjE1ODg3Njc3MDEsImV4cCI6MTU4ODc2NzcwMX0.Tkrl9VHGu0yNLdyhAvXVw__kefezxybCikwE5UP9gSg" });
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
            }
            else {
                yield put(stopLoader())
                yield put(setBranchManager(response.data && response.data.data && response.data.data.memberData))
            }
        }
    }
    catch (err) {
        failure({
            msg: 'Sorry, something went wrong.'
        })
    }
}

function* createBranch({ data, success = () => { }, failure = () => { } }) {
    try {
        yield put(startLoader())
        yield put(updateRequest())
        const response = yield postRequest({ API: `${api.URL.CREATE_BRANCH}`, DATA: data });
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
                // yield put(setBranchManager(response.data && response.data.data && response.data.data.memberData))
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

function* getTerms({ data, success = () => { }, failure = () => { } }) {
    try {
        const response = yield getRequest({ API: `${api.URL.TERMS}` });
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
            }
            else {
                yield put(stopLoader())
                yield put(setTerms(response.data && response.data.data))
            }
        }
    }
    catch (err) {
        failure({
            msg: 'Sorry, something went wrong.'
        })
    }
}


function* addInsurance({ data, success = () => { }, failure = () => { } }) {

    try {
        if (window.navigator.onLine === false) {
            yield put(stopLoader())
            failure({
                msg: 'You appear to be offline. Please check your connection.'
            })
            return
        }
        yield put(updateRequest())
        const response = yield postRequest({ API: `${api.URL.INSTRUCTION_LIST}`, DATA: data });
        if (response.status === STATUS_CODE.unAuthorized) {
            yield put(setAuthorization(null));
            yield put(saveAgencyData(null))
            yield put(stopLoader())
            yield put(setDashboardData(null));
            yield put(setDashboardTableData(null));
            return;
        }
        if (response.status !== STATUS_CODE.successful) {
            yield put(updateFailure())
            yield put(stopLoader())
            failure(response.data);
        }
        else {
            yield put(stopLoader())
            yield put(updateSuccess())
            success(response.data)
        }
    }
    catch (err) {
        yield put(stopLoader())

        failure({
            msg: 'Sorry, something went wrong.'
        })
    }
}


function* addFerry({ data, success = () => { }, failure = () => { } }) {

    try {
        yield put(updateRequest())

        const response = yield postRequest({ API: `${api.URL.FERRY}`, DATA: data });
        if (window.navigator.onLine === false) {
            yield put(stopLoader())
            failure({
                msg: 'You appear to be offline. Please check your connection.'
            })
            return
        }
        else {
            if (response.status === STATUS_CODE.unAuthorized) {
                yield put(updateFailure())

                yield put(setAuthorization(null));
                yield put(saveAgencyData(null))
                yield put(stopLoader())
                yield put(setDashboardData(null));
                yield put(setDashboardTableData(null));
                return;

            }
            if (response.status !== STATUS_CODE.successful) {
                failure(response.data);
            }
            else {
                yield put(updateSuccess())

                yield put(stopLoader())
                success(response.data)
            }
        }
    }
    catch (err) {
        failure({
            msg: 'Sorry, something went wrong.'
        })
    }
}


function* getFerry({ data, success = () => { }, failure = () => { } }) {

    try {
        const response = yield getRequest({ API: `${api.URL.FERRY}` });
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
            }
            else {
                yield put(stopLoader())
                yield put(setFerry(response.data && response.data.data))
                success(response.data)
            }
        }
    }
    catch (err) {
        failure({
            msg: 'Sorry, something went wrong.'
        })
    }
}

function* getFuelOffer({ data, success = () => { }, failure = () => { } }) {

    try {
        const response = yield getRequest({ API: `${api.URL.FUEL_OFFER}` });
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
            }
            else {
                yield put(stopLoader())
                yield put(setFuelOffer(response.data && response.data.data))
                // success(response.data)
            }
        }
    }
    catch (err) {
        failure({
            msg: 'Sorry, something went wrong.'
        })
    }
}


function* addFuelOffer({ data, success = () => { }, failure = () => { } }) {
    try {
        yield put(startLoader())
        yield put(updateRequest())
        const response = yield postRequest({ API: `${api.URL.FUEL_OFFER}`, DATA: data });

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


function* addExtraItems({ data, success = () => { }, failure = () => { } }) {
    try {
        yield put(startLoader())
        yield put(updateRequest())
        const response = yield postRequest({ API: `${api.URL.EXTRA_ITEMS}`, DATA: data });

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


function* getExtraItems({ data, success = () => { }, failure = () => { } }) {
    try {
        const response = yield getRequest({ API: `${api.URL.EXTRA_ITEMS}` });
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
            }
            else {
                yield put(stopLoader())
                yield put(setExtraItems(response.data && response.data.data))
                // success(response.data)
            }
        }
    }
    catch (err) {
        failure({
            msg: 'Sorry, something went wrong.'
        })
    }
}




function* addNewTerms({ data, success = () => { }, failure = () => { } }) {
    try {
        yield put(startLoader())
        yield put(updateRequest())
        const response = yield postRequest({ API: `${api.URL.TERMS}`, DATA: data });

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


function* getVehicleCategory({ data, success = () => { }, failure = () => { } }) {
    try {
        const response = yield getRequest({ API: `${api.URL.VEHICLE_CATEGORY}` });
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
            }
            else {
                yield put(stopLoader())
                yield put(setVehcileCategory(response.data && response.data.data))
            }
        }
    }
    catch (err) {
        failure({
            msg: 'Sorry, something went wrong.'
        })
    }
}



function* addNewVehicle({ data, success = () => { }, failure = () => { } }) {
    try {
        yield put(startLoader())
        yield put(updateRequest())
        const response = yield postRequest({ API: `${api.URL.VEHCILES_DATA}`, DATA: data });

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

function* createNewListing({ data, success = () => { }, failure = () => { } }) {
    const { id } = data
    delete data.id

    if (!data.expenses) {
        delete data.expenses
    }
    if (!data.reference) {
        delete data.reference
    }

    if (!data.extraPaidDays) {
        delete data.extraPaidDays
    }
    if (!data.insurance) {
        delete data.insurance
    }
    if (!data.ferryCost) {
        delete data.ferryCost
    }
    if (!data.fuelOffer) {
        delete data.fuelOffer
    }
    if (!data.freeDays) {
        delete data.freeDays
    }
    if (!data.kmAllow) {
        delete data.kmAllow
    }
    if (!data.extraPaidDays) {
        delete data.extraPaidDays
    }
    if (!data.ratePerDay) {
        delete data.ratePerDay
    }
    if (!data.comment) {
        delete data.comment
    }
    if (!(data.extraItemObj && data.extraItemObj.name)) {
        delete data.extraItemObj
    }

    try {
        yield put(startLoader())
        yield put(updateRequest())
        const response = !!id ? yield putRequest({ API: `${api.URL.DASHBOARD_DATA}/${id}`, DATA: data }) : yield postRequest({ API: `${api.URL.DASHBOARD_DATA}`, DATA: data })
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

function* createNewVehicleCategory({ data, success = () => { }, failure = () => { } }) {
    try {
        yield put(startLoader())
        yield put(updateRequest())
        const response = yield postRequest({ API: `${api.URL.VEHICLE_CATEGORY}`, DATA: data });

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

function* deleteInsurance({ data, success = () => { }, failure = () => { } }) {

    try {
        yield put(startLoader())
        yield put(updateRequest())
        const response = yield deleteRequest({ API: `${api.URL.INSTRUCTION_LIST}/${data}` });

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

function* deleteMember({ id, success = () => { }, failure = () => { } }) {

    try {
        yield put(startLoader())
        yield put(updateRequest())
        const response = yield deleteRequest({ API: `${api.URL.BRANCH_MANAGERS}/${id}` });

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
                yield put(updateSuccess())
                success(response.data)
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

function* editInsurance({ data, success = () => { }, failure = () => { } }) {
    try {
        yield put(startLoader())
        yield put(updateRequest())
        const response = yield putRequest({ API: `${api.URL.INSTRUCTION_LIST}/${data.id}`, DATA: data.data });
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
                yield put(updateSuccess())
                success(response.data)
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


function* addNewMember({ data, success = () => { }, failure = () => { } }) {
    try {
        if (!data.surname) {
            delete data.surname
        }

        yield put(startLoader())
        yield put(updateRequest())
        const response = yield postRequest({ API: `${api.URL.BRANCH_MANAGERS}`, DATA: data });

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



function* updateMember({ data, success = () => { }, failure = () => { } }) {
    try {
        yield put(startLoader())
        yield put(updateRequest())
        const response = yield putRequest({ API: `${api.URL.AGENCY_MEMBER_UPDATE}`, DATA: data });
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
                yield put(updateSuccess())
                success(response.data)
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
function* AddNewListing() {
    yield all([
        takeLatest(GET_VEHICLE_DATA, getVehicleData),
        takeLatest(GET_BRANCH_LIST, getBranchList),
        takeLatest(GET_INSURANCE_LIST, getInsuranceList),
        takeEvery(FILE_UPLOAD, fileUpload),
        takeLatest(GET_VEHICLE_TYPE, vehicleType),
        takeLatest(GET_VEHICLE_TRANSMISSION, vehicleTransmission),
        takeLatest(GET_FUEL_TYPE_LIST, getFuelList),
        takeLatest(GET_VEHICLE_TYPE_LIST, getvehicleTypeList),
        takeLatest(GET_TRANSMISSION_TYPE_LIST, gettransmissionTypeList),
        takeLatest(GET_BRANCH_MANGERS, getBranchManger),
        takeLatest(CREATE_BRANCH, createBranch),
        takeLatest(GET_TERMS, getTerms),
        takeLatest(ADD_INSURANCE, addInsurance),
        takeLatest(ADD_FERRY, addFerry),
        takeLatest(GET_FERRY, getFerry),
        takeLatest(GET_FUEL_OFFER, getFuelOffer),
        takeLatest(ADD_FUEL_OFFER, addFuelOffer),
        takeLatest(ADD_EXTRA_ITEMS, addExtraItems),
        takeLatest(GET_EXTRA_ITEMS, getExtraItems),
        takeLatest(ADD_NEW_TERMS, addNewTerms),
        takeLatest(GET_VEHCILE_CATEGORY, getVehicleCategory),
        takeLatest(ADD_NEW_VEHICLE, addNewVehicle),
        takeLatest(CREATE_NEW_LISTING, createNewListing),
        takeLatest(CREATE_VEHICLE_CATEGORY, createNewVehicleCategory),
        takeLatest(ADD_NEW_MEMBER, addNewMember),
        takeLatest(DELETE_INSURANCE, deleteInsurance),
        takeLatest(DELETE_MEMBER, deleteMember),
        takeLatest(EDIT_INSURANCE, editInsurance),
        takeLatest(UPDATE_MEMBER, updateMember),

        // takeLatest(GET_INSURANCE_BY_ID, getInsuranceById)


    ]);
}

export default AddNewListing;
