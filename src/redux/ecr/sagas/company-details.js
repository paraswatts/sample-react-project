import { takeLatest, all, put } from "redux-saga/effects";

import {
    POPULAR_PLACES, stopLoader, startLoader, setAuthorization,
    SEARCH_VEHICLE, GET_CURRENT_LOCATION, getPopularPlacesListing, vehicleListing, MAKE_REQUEST,
    GET_VEHICLE_INFORMATION, setVehicleInformation, GET_FAQ, setFaq, EDIT_DRIVER_PROFILE, DRIVER_TRIPS,
    DRIVER_RATINGS,
    SAVE_CARD,
    GET_CARDS,
    PURCHASE_TOKEN,
    setCards,
    BRANCH_DELETE,
    updateRequest,
    updateFailure,
    updateSuccess,
    UPDATE_BRANCH,
    UPDATE_PROFILE,
    saveAgencyData
} from '../actions'
const { defaultConfig: { PLATFORM } } = require(`../../../config/default`);
const api = require(`../../../shared/${PLATFORM}/api`);
const { getRequest, putRequest, postRequest, deleteRequest } = require(`../../../helpers/${PLATFORM}`);
const { STATUS_CODE } = require(`../../../shared/${PLATFORM}/constants`);


function* updateDetails({ data, success, failure }) {
    yield put(updateRequest())
    if (!data.suburb) {
        delete data.suburb
    }

    if (!data.logo) {
        data.logo = null
    }
    if (
        !data.postcode
    ) {
        data.postcode = null
    }
    if (!data.requestedInformationToDriver) {
        data.requestedInformationToDriver = null
    }

    if (!data.confirmationInformationToDriver) {
        data.confirmationInformationToDriver = null
    }
    if (!data.website) {
        data.website = null
    }

    if (!data.onlyCreditCardAllowed) {
        data.onlyCreditCardAllowed = false
    }
    if (!data.paymentConditions) {
        data.paymentConditions = null
    }
    if (!data.shortDescription) {
        data.shortDescription = null
    }
    if (!(data.driverLicenseRequirement && data.driverLicenseRequirement.driverWithRestrictedLicense)) {
        data.driverLicenseRequirement.driverWithRestrictedLicense = false
    }
    if (!(data.driverLicenseRequirement && data.driverLicenseRequirement.overseasDriversAllowed)) {
        data.driverLicenseRequirement.overseasDriversAllowed = false
    }
    if (!(data.driverLicenseRequirement && data.driverLicenseRequirement.driverWithRestrictedLicense) && !(data.driverLicenseRequirement && data.driverLicenseRequirement.overseasDriversAllowed)) {
        data.driverLicenseRequirement.driverWithRestrictedLicense = false
        data.driverLicenseRequirement.overseasDriversAllowed = false
    }
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


function* CompanyDetailsSaga() {
    yield all([
        takeLatest(UPDATE_PROFILE, updateDetails),
    ]);
}

export default CompanyDetailsSaga;