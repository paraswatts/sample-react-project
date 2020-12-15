
import { REHYDRATE } from "redux-persist";
import {
    GET_CARDS,
    SET_CARDS,
    SET_TRANSACTION_DETAILS
} from '../actions';

const { defaultConfig: { PLATFORM } } = require(`../../../config/default`);

const initialCommonState = {
    cards: [],
    transactions: []
};

const PaymentReducer = (state = { ...initialCommonState }, action) => {
    switch (action.type) {
        case SET_TRANSACTION_DETAILS:
            return {
                ...state, transactions: action.data
            }
        case SET_CARDS:
            return {
                ...state, cards: action.data
            }

        case REHYDRATE:
            let common = ((action || {}).payload || {}).PaymentReducer || initialCommonState
            return {
                ...state,
                cards: common.cards,
                ...(action.payload || {}).common
            };
        default:
            return state;
    }
};

export default PaymentReducer;