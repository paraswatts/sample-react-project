import { takeLatest, all, put } from "redux-saga/effects";

import {
    stopLoader, startLoader, setAuthorization,
    BRANCH_DELETE,
    updateRequest,
    updateFailure,
    updateSuccess,
    UPDATE_BRANCH
} from '../actions'
const { defaultConfig: { PLATFORM } } = require(`../../../config/default`);
const api = require(`../../../shared/${PLATFORM}/api`);
const { putRequest, deleteRequest } = require(`../../../helpers/${PLATFORM}`);
const { STATUS_CODE } = require(`../../../shared/${PLATFORM}/constants`);

function* deleteBranch({ id, success, failure }) {
    yield put(updateRequest())

    try {
        yield put(startLoader())
        const response = yield deleteRequest({ API: `${api.URL.BRANCH_LIST}/${id}` });

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

                // yield put(setFaq(response.data))
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

function* updateBranch({ data, success, failure }) {
    yield put(updateRequest())
    const { id } = data
    delete data.id
    try {
        yield put(startLoader())
        const response = yield putRequest({ API: `${api.URL.BRANCH_LIST}/${id}`, DATA: data });

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

                // yield put(setFaq(response.data))
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


function* BranchSaga() {
    yield all([
        takeLatest(BRANCH_DELETE, deleteBranch),
        takeLatest(UPDATE_BRANCH, updateBranch)
    ]);
}

export default BranchSaga;