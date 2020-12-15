export const GET_DASHBOARD_DATA = "GET_DASHBOARD_DATA";
export const SET_DASHBOARD_DATA = 'SET_DASHBOARD_DATA';
export const UPDATE_STATUS = 'UPDATE_STATUS';
export const GET_DASHBOARD_TABLE_DATA = "GET_DASHBOARD_TABLE_DATA";
export const SET_DASHBOARD_TABLE_DATA = "SET_DASHBOARD_TABLE_DATA";
export const CHANGES_STATUS_DASHBOARD = 'CHANGES_STATUS_DASHBOARD';
export const UPDATE_REQUEST = "UPDATE_REQUEST";
export const UPDATE_SUCCESS = "UPDATE_SUCCESS";
export const UPDATE_FAILURE = "UPDATE_FAILURE";
export const DELETE_LIST = "DELETE_LIST";
export const REGO_SET = "REGO_SET";
export const GET_ANALYTIC_DATA = "GET_ANALYTIC_DATA"
export const SET_ANALYTIC_DATA = "SET_ANALYTIC_DATA"
export const DASHBOARD_DATA_COUNT = "DASHBOARD_DATA_COUNT"

export const regoSet = (data, success, failure) => {
    return {
        type: REGO_SET,
        data, success, failure
    }
}


export const deleteList = (id, success, failure) => {
    return {
        type: DELETE_LIST,
        id,
        success, failure
    }
}



export const updateRequest = () => {
    return {
        type: UPDATE_REQUEST
    }
}

export const updateSuccess = () => {
    return {
        type: UPDATE_SUCCESS
    }
}
export const updateFailure = () => {
    return {
        type: UPDATE_FAILURE
    }
}
export const changeStatusDashboard = (data, success, failure) => {
    return {
        type: CHANGES_STATUS_DASHBOARD,
        data, success, failure
    }
}
export const setDashboardTableData = (data) => {
    return {
        type: SET_DASHBOARD_TABLE_DATA,
        data
    }
}
export const getDashboardTableData = (data, success, failure) => {
    return {
        type: GET_DASHBOARD_TABLE_DATA,
        data, success, failure
    }
}

export const getDashboardData = (data, success, failure) => {
    return {
        type: GET_DASHBOARD_DATA,
        data, success, failure
    }
}

export const setDashboardData = (data) => {
    return {
        type: SET_DASHBOARD_DATA,
        data
    }
}

export const updateStatus = (data, success, failure) => {
    return {
        type: UPDATE_STATUS,
        data,
        success, failure
    }
}
export const analyticData = (data, success, failure) => {
    return {
        type: GET_ANALYTIC_DATA,
        data,
        success, failure
    }
}
export const setAnalyticData = (data, success, failure) => {
    return {
        type: SET_ANALYTIC_DATA,
        data,
        success, failure
    }
}
export const dashboardDataCount = (data,success,failure) => {
    return {
        type: DASHBOARD_DATA_COUNT,
        data,
        success, failure
    }
}