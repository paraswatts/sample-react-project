export const BRANCH_DELETE = "BRANCH_DELETE";
export const SAVE_EDIT_BRANCH_DATA = "SAVE_EDIT_BRANCH_DATA";
export const UPDATE_BRANCH = "UPDATE_BRANCH";


export const updateBranch = (data, success, failure) => {
    return {
        type: UPDATE_BRANCH,
        data, success, failure
    }
}


export const saveEditBranchData = (data) => {
    return {
        type: SAVE_EDIT_BRANCH_DATA,
        data
    }
}

export const branchDelete = (id, success, failure) => {
    return {
        type: BRANCH_DELETE,
        id,
        success, failure
    }
}