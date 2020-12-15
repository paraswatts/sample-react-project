
import { REHYDRATE } from "redux-persist";
import {
    SAVE_TOKEN,
    SAVE_PACKAGES,
    BUYING_TOKEN_ID,
    DETAILS_NOT_FILLED
} from '../actions';


const initialCommonState = {
    packages: [],
    buyingTokenId: "",
    noOfToken: "",
    detailsNotFilled: false
};

const TokenReducer = (state = { ...initialCommonState }, action) => {
    switch (action.type) {

        case DETAILS_NOT_FILLED:
            return {
                ...state, detailsNotFilled: action.value
            }
        case SAVE_PACKAGES:
            return {
                ...state, packages: action.packages
            }
        case SAVE_TOKEN:
            return {
                ...state, noOfToken: action.data
            }
        case BUYING_TOKEN_ID:
            return {
                ...state, buyingTokenId: action.id
            }

        case REHYDRATE:
            let common = ((action || {}).payload || {}).TokenReducer || initialCommonState

            return {
                ...state,
                buyingTokenId: common.buyingTokenId,
                noOfToken: common.noOfToken,
                detailsNotFilled: common.detailsNotFilled,
                ...(action.payload || {}).common
            };
        default:
            return state;
    }
};

export default TokenReducer;