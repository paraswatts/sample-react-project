import { connect } from 'react-redux';
import { Screen } from "./screen";
const { defaultConfig: { PLATFORM } } = require(`../../../../../../config/default`);
const {
    stopLoader,
    startLoader,
    updateApprovalStatus,
    fetchAllUsersStats,
    logout_success,
    getBranchManager,
    deleteMember,
    addNewMember
} = require(`../../../../../../redux/${PLATFORM}/actions`);

const mapStateToProps = (state) => {
    return ({
        agencyData: state.CommonReducer.userData,
        anyUpdate: state.AddNewListingReducer && state.AddNewListingReducer.update,
        branchManagers: state.AddNewListingReducer && state.AddNewListingReducer.branchManager,
        platformType: state.CommonReducer.platformType
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        fetchAllUsersStats: () => dispatch(fetchAllUsersStats()),
        updateApprovalStatus: (data, success) => dispatch(updateApprovalStatus(data, success)),
        getBranchManager: () => {
            dispatch(getBranchManager())
        },
        deleteMember: (id, success, failure) => {
            dispatch(deleteMember(id, success, failure))
        },
        addNewMemberCall: (data, success, failure) => {
            dispatch(addNewMember(data, success, failure))
        }
    }
}
export const Contact = connect(mapStateToProps, mapDispatchToProps)(Screen);