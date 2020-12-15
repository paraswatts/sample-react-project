export const START_LOADER = 'START_LOADER';
export const STOP_LOADER = 'STOP_LOADER';
export const WELCOME = 'WELCOME'
export const FCM_TOKEN = "FCM_TOKEN"
export const SAVE = "SAVE"
export const startLoader = () => {
    return {
        type: START_LOADER,
    };
}

export const stopLoader = () => {
    return {
        type: STOP_LOADER,
    };
}

export const welcome = () => {
    return {
        type: WELCOME
    }
}

export const saveFCMToken = (data) => {
    return {
        type: FCM_TOKEN,
        data
    }
}

export const savePreviousLocation = (data) => {
    return {
        type: SAVE,
        data
    }
}