export const SAVE_CARD = "SAVE_CARD";
export const GET_CARDS = "GET_CARDS";
export const PURCHASE_TOKEN = "PURCHASE_TOKEN";
export const SET_CARDS = "SET_CARDS"
export const DELETE_CARD = "DELETE_CARD";
export const APPLY_PROMO = 'APPLY_PROMO';
export const SET_DEFAULT_CARD = "SET_DEFAULT_CARD";
export const TRANSACTION_DETAILS = "TRANSACTION_DETAILS";
export const SET_TRANSACTION_DETAILS = "SET_TRANSACTION_DETAILS";


export const setTransactionDetails = (data) => {
    return {
        type: SET_TRANSACTION_DETAILS,
        data
    }
}

export const transactionDetails = (failure) => {
    return {
        type: TRANSACTION_DETAILS,
        failure
    }
}

export const applyPromo = (promoCode, success, failure) => {
    return {
        type: APPLY_PROMO,
        promoCode,
        success,
        failure
    };
};


export const setDefaultCard = (id, success, failure) => {
    return {
        type: SET_DEFAULT_CARD,
        id, success, failure
    }
}


export const deleteCard = (id, success, failure) => {
    return {
        type: DELETE_CARD,
        id,
        success, failure
    }
}

export const setCards = (data) => {
    return {
        type: SET_CARDS,
        data
    }
}
export const purchaseToken = (data, success, failure) => {
    return {
        type: PURCHASE_TOKEN,
        data, success, failure
    }
}
export const getCards = (defaultCardGetter) => {
    return {
        type: GET_CARDS,
        defaultCardGetter
    }
}

export const saveCard = (data, success, failure) => {
    return {
        type: SAVE_CARD,
        data,
        success, failure
    }
}