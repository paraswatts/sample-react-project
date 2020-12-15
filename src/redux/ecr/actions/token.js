export const GET_TOKEN = "GET_TOKEN";
export const SAVE_TOKEN = "SAVE_TOKEN";
export const BUYING_TOKEN_ID = "BUYING_TOKEN_ID";
export const GET_PACKAGES = "GET_PACKAGES";
export const SAVE_PACKAGES = 'SAVE_PACKAGES';
export const DETAILS_NOT_FILLED = "DETAILS_NOT_FILLED"

export const detailsNotFIlled = (value) => {
    return {
        type: DETAILS_NOT_FILLED,
        value
    }
}
export const savePackages = (packages) => {
    return {
        type: SAVE_PACKAGES,
        packages
    }
}


export const getPackages = () => {
    return {
        type: GET_PACKAGES
    }
}


export const buyingTokenId = (id) => {
    return {
        type: BUYING_TOKEN_ID,
        id
    }
}

export const getToken = () => {
    return {
        type: GET_TOKEN
    }
}

export const saveToken = (data) => {

    return {
        type: SAVE_TOKEN,
        data
    }
}