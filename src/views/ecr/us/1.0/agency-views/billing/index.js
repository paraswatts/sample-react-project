import { connect } from 'react-redux';
import { Screen } from "./screen";
const { defaultConfig: { PLATFORM } } = require(`../../../../../../config/default`);
const {
    stopLoader,
    startLoader,
    updateApprovalStatus,
    fetchAllUsersStats,
    logout_success,
    saveCard
} = require(`../../../../../../redux/${PLATFORM}/actions`);

const mapStateToProps = (state) => {
    return ({
        platformType: state.CommonReducer.platformType
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        fetchAllUsersStats: () => dispatch(fetchAllUsersStats()),
        updateApprovalStatus: (data, success) => dispatch(updateApprovalStatus(data, success)),
        saveCard: (data, success, failure) => {
            dispatch(saveCard(data, success, failure))
        }
    }
}
export const Billing = connect(mapStateToProps, mapDispatchToProps)(Screen);