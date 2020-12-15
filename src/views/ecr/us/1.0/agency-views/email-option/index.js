import { connect } from 'react-redux';
import { Screen } from "./screen";
const { defaultConfig: { PLATFORM } } = require(`../../../../../../config/default`);
const {
    stopLoader,
    startLoader,
    updateApprovalStatus,
    fetchAllUsersStats,
    logout_success,
    addReviewMember,
    getReviewMember,
    deleteReviewMember,
    updateNotificationSetting
} = require(`../../../../../../redux/${PLATFORM}/actions`);

const mapStateToProps = (state) => {
    return ({
        agencyData: state.CommonReducer.userData,
        reviewMembers: state.AgencyReviewMemberReducer.reviewMember,
        bookingMember: state.AgencyReviewMemberReducer.bookingMember,
        platformType: state.CommonReducer.platformType,
        anyUpdate: state.AgencyDashboardReducer.anyUpdate,

    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        fetchAllUsersStats: () => dispatch(fetchAllUsersStats()),
        updateApprovalStatus: (data, success) => dispatch(updateApprovalStatus(data, success)),
        addReviewMember: (data, success, failure) => {
            dispatch(addReviewMember(data, success, failure))
        },
        getReviewMember: (data) => {
            dispatch(getReviewMember(data))
        },
        deleteReviewMember: (id, success, failure) => {
            dispatch(deleteReviewMember(id, success, failure))
        },
        updateNotificationSetting: (data, success, failure) => {
            dispatch(updateNotificationSetting(data, success, failure))
        }
    }
}

export const EmailOptions = connect(mapStateToProps, mapDispatchToProps)(Screen);

