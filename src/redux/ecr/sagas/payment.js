import { takeLatest, all, put } from "redux-saga/effects";

import {
    stopLoader, startLoader, setAuthorization,
    setFaq,
    SAVE_CARD,
    GET_CARDS,
    APPLY_PROMO,
    PURCHASE_TOKEN,
    setCards,
    DELETE_CARD,
    updateRequest,
    updateFailure,
    updateSuccess,
    SET_DEFAULT_CARD,
    setTransactionDetails,
    TRANSACTION_DETAILS
} from '../actions'
const { defaultConfig: { PLATFORM } } = require(`../../../config/default`);
const api = require(`../../../shared/${PLATFORM}/api`);
const { getRequest, postRequest, deleteRequest } = require(`../../../helpers/${PLATFORM}`);
const { STATUS_CODE } = require(`../../../shared/${PLATFORM}/constants`);

function* saveCard({ data,
    success, failure }) {
    const { token } = data
    try {
        yield put(startLoader())
        const response = yield postRequest({ API: `${api.URL.CARD}`, Data: token });

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
                yield put(stopLoader());
            }
            else {
                success(response.data);
                yield put(setFaq(response.data))
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
function* getCards(defaultCardGetter = () => { }) {

    try {
        // yield put(startLoader())
        const response = yield getRequest({ API: `${api.URL.CARD}` });

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
                // success(response.data);
                yield put(setCards(response && response.data && response.data.data))
                defaultCardGetter()
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

function* purchaseToken({ data, success, failure }) {
    try {

        // yield put(startLoader())
        const response = yield postRequest({ API: `${api.URL.PURCHASE_TOKEN}`, DATA: data });

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


function* deleteCard({ id, success, failure }) {
    yield put(updateRequest())

    try {
        yield put(startLoader())
        const response = yield deleteRequest({
            API: `${api.URL.CARD}`, DATA: {
                cardId: id
            }
        });

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


function* setDefaultCard({ id, success, failure }) {
    try {
        yield put(startLoader())

        yield put(updateRequest())
        const response = yield postRequest({
            API: `${api.URL.CARD_DEFAULT}`, DATA: {
                cardId: id
            }
        });

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
                yield put(updateFailure())

                yield put(stopLoader());
            }
            else {
                success(response.data);
                yield put(stopLoader());
                yield put(updateSuccess())

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

function* getTransactions({ failure = () => { } }) {
    try {
        yield put(startLoader())
        const response = yield getRequest({ API: `${api.URL.TRANSACTION}` });

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
                yield put(stopLoader());
            }
            else {
                // success(response.data);
                yield put(setTransactionDetails(response && response.data && response.data.data))
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

function* applyPromotion({ promoCode, success = () => { }, failure = () => { } }) {
    try {
        yield put(startLoader())
        const response = yield getRequest({ API: `${api.URL.VALIDATE_PROMO}?promoCode=${promoCode}` });

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
        failure({
            msg: 'Sorry, something went wrong.'
        })
    }
}

function* PaymentSaga() {
    yield all([
        takeLatest(GET_CARDS, getCards),
        takeLatest(SAVE_CARD, saveCard),
        takeLatest(PURCHASE_TOKEN, purchaseToken),
        takeLatest(DELETE_CARD, deleteCard),
        takeLatest(SET_DEFAULT_CARD, setDefaultCard),
        takeLatest(TRANSACTION_DETAILS, getTransactions),
        takeLatest(APPLY_PROMO, applyPromotion),
    ]);
}

export default PaymentSaga;