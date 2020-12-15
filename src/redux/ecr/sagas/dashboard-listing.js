
import { takeLatest, all, put } from "redux-saga/effects";

import {
    stopLoader, startLoader, setAuthorization,
    updateFailure,
    setDashboardTableData,
    setListing,
    GET_LISTING
} from '../actions'
const { defaultConfig: { PLATFORM } } = require(`../../../config/default`);
const api = require(`../../../shared/${PLATFORM}/api`);
const { getRequest } = require(`../../../helpers/${PLATFORM}`);
const { STATUS_CODE } = require(`../../../shared/${PLATFORM}/constants`);


function* getListing({ data, success = () => { }, failure = () => { } }) {

    const { status, index, limit, sortKey, sortType } = data
    try {
        yield put(startLoader())
        const response = yield getRequest({ API: `${api.URL.DASHBOARD_VIEW}?status=${status}&index=${index}&limit=${limit}&sortKey=${sortKey}&sortType=${sortType}` });

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
                // yield put(updateFailure())

            }
            else {
                // success(response.data);
                yield put(setDashboardTableData({ data: response.data && response.data.data.listings }))
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
    finally {
        yield put(stopLoader());

    }
}


function* DashboardListingSaga() {
    yield all([
        takeLatest(GET_LISTING, getListing),
    ]);
}

export default DashboardListingSaga;