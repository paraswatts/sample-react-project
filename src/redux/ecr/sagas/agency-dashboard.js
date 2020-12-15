import { takeLatest, all, put, delay } from "redux-saga/effects";

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
    CHANGES_STATUS_DASHBOARD,
    updateRequest,
    updateSuccess,
    updateFailure,
    DELETE_LIST,
    REGO_SET,
    GET_ANALYTIC_DATA, setAnalyticData, DASHBOARD_DATA_COUNT
} from '../actions';
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../config/default`);
const api = require(`../../../shared/${PLATFORM}/api`);
const { updateAuthToken, postRequestNoAuth, postRequest, getRequest, putRequest, deleteRequest } = require(`../../../helpers/${PLATFORM}`);
const { STATUS_CODE } = require(`../../../shared/${PLATFORM}/constants`);

function* getAnalyticData({ data, success = () => { }, failure = () => { } }) {
    const requestUrl = !!data ? `${api.URL.ANALYTICS}/?${data}` : `${api.URL.ANALYTICS}`

    try {
        const response = yield getRequest({ API: requestUrl });

        if (window.navigator.onLine === false) {
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
                yield put(setDashboardTableData(null));
                return;
            }
            if (response.status !== STATUS_CODE.successful) {
                failure(response.data);
            }
            else {
                success(response.data)
                yield put(setAnalyticData(response.data))
                yield put(stopLoader());
            }
        }
    }
    catch (err) {
        failure({
            msg: 'Sorry, something went wrong.'
        })
    }
}

function* getDashboardData({ data, success = () => { }, failure = () => { } }) {
    try {
        const response = yield getRequest({ API: `${api.URL.DASHBOARD_DATA}?dashboardData=true&agencyId=${data.agencyId}` });
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
            }
            else {
                yield put(setDashboardData(response.data && response.data.data))
            }
        }
    }
    catch (err) {
        failure({
            msg: 'Sorry, something went wrong.'
        })
    }
}

function* dummy({ data, success = () => { }, failure = () => { } }) {

    yield put(setDashboardData(data))
    success()
    // try {
    //     yield put(startLoader())
    //     const response = yield postRequestNoAuth({ API: `${apiUrl}`, DATA: userData });
    //     if (window.navigator.onLine === false) {
    //         yield put(stopLoader())
    //         error({
    //             msg: 'You appear to be offline. Please check your connection.'
    //         })
    //     }
    //     else {
    //         if (response.status === STATUS_CODE.unAuthorized) {
    //             yield put(setAuthorization(null));
    //             return;
    //         }
    //         if (response.status !== STATUS_CODE.successful) {
    //             error(response.data);
    //             yield put(stopLoader());
    //         }
    //         else {
    //             success(response.data);
    //             yield put(stopLoader());
    //         }
    //     }

    // }
    // catch (err) {
    //     yield put(stopLoader());
    //     error({
    //         msg: 'Sorry, something went wrong.'
    //     })
    // }
}


function* getDashboardTableData({ data, success = () => { }, failure = () => { } }) {

    try {
        if (window.navigator.onLine === false) {

            return
        }
        else {
            const response = yield getRequest({ API: `${api.URL.DASHBOARD_DATA}?dashboardData=false&limit=${data.limit}&index=${data.index}&agencyId=${data.agencyId}` });

            if (response.status === STATUS_CODE.unAuthorized) {
                yield put(setAuthorization(null));
                yield put(saveAgencyData(null))
                yield put(setDashboardData(null));
                yield put(setDashboardTableData(null));
                yield put(stopLoader());
                return;
            }
            if (response.status !== STATUS_CODE.successful) {
                failure(response.data);
                yield put(stopLoader());
            }
            else {
                yield put(setDashboardTableData(response.data && response.data))

                yield put(stopLoader());
            }
        }

    }
    catch (err) {
        yield put(stopLoader());
        failure({
            msg: 'Sorry, something went wrong.'
        })
    }
}

// /v1/listing / { id } / status
function* updateStatus({ data, success = () => { }, failure = () => { } }) {
    const { status, id, rego } = data
    let dataToSend;
    if (!rego) {
        dataToSend = {
            status
        }
    }
    else {
        dataToSend = {
            status, rego
        }
    }
    try {
        yield put(startLoader())
        yield put(updateRequest())
        const response = yield putRequest({
            API: `${api.URL.DASHBOARD_DATA}/${id}/status`, DATA: dataToSend
        });
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
                failure(response.data);
                yield put(updateFailure());
                yield put(stopLoader())
                // yield put(stopLoader());
            }
            else {
                yield put(updateSuccess())
                success(response.data)
                yield put(stopLoader());
            }
        }

    }
    catch (err) {
        yield put(stopLoader());
        yield put(updateFailure());

        failure({
            msg: 'Sorry, something went wrong.'
        })
    }
}

function* DashboardDataCount({ id, success = () => { }, failure = () => { } }) {
    try {
        yield put(startLoader())
        yield put(updateRequest())
        const response = yield deleteRequest({ API: `${api.URL.DASHBOARD_DATA}/${id}` });

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
                failure(response.data);
                yield put(updateFailure());
                yield put(stopLoader())
                // yield put(stopLoader());
            }
            else {
                yield put(updateSuccess())
                success(response.data)
                yield put(stopLoader());
            }
        }

    }
    catch (err) {
        yield put(stopLoader());
        yield put(updateFailure());

        failure({
            msg: 'Sorry, something went wrong.'
        })
    }
}

function* deleteList({ id, success = () => { }, failure = () => { } }) {
    try {
        yield put(startLoader())
        yield put(updateRequest())
        const response = yield deleteRequest({ API: `${api.URL.DASHBOARD_DATA}/${id}` });

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
                failure(response.data);
                yield put(updateFailure());
                yield put(stopLoader())
                // yield put(stopLoader());
            }
            else {
                yield put(updateSuccess())
                success(response.data)
                yield put(stopLoader());
            }
        }

    }
    catch (err) {
        yield put(stopLoader());
        yield put(updateFailure());

        failure({
            msg: 'Sorry, something went wrong.'
        })
    }
}


function* regoSet({ data, success, failure }) {
    success()
    // try {
    //     yield put(startLoader())
    //     const response = yield postRequest({ API: `${api.URL.INVITE_DRIVERS}`, DATA: data });

    //     if (window.navigator.onLine === false) {
    //         yield put(stopLoader())
    //         failure({
    //             msg: 'You appear to be offline. Please check your connection.'
    //         })
    //     }
    //     else {
    //         if (response.status === STATUS_CODE.unAuthorized) {
    //             yield put(setAuthorization(null));
    //             yield put(stopLoader())

    //             return;
    //         }
    //         if (response.status !== STATUS_CODE.successful) {
    //             // onError(response.data);
    //             yield put(stopLoader());
    //         }
    //         else {
    //             success(response.data);
    //             // yield put(setFaq(response.data))
    //             yield put(stopLoader());
    //         }
    //     }
    // }
    // catch (error) {
    //     yield put(stopLoader());
    //     failure({
    //         msg: 'Sorry, something went wrong.'
    //     })
    // }
}




function* AgencyDashboardSaga() {
    yield all([
        takeLatest(GET_DASHBOARD_DATA, getDashboardData),
        takeLatest(UPDATE_STATUS, updateStatus),
        takeLatest(GET_DASHBOARD_TABLE_DATA, getDashboardTableData),
        takeLatest(DELETE_LIST, deleteList),
        takeLatest(CHANGES_STATUS_DASHBOARD, updateStatus),
        takeLatest(REGO_SET, regoSet),
        takeLatest(GET_ANALYTIC_DATA, getAnalyticData),
        takeLatest(DASHBOARD_DATA_COUNT, DashboardDataCount)
    ])

}

export default AgencyDashboardSaga;
