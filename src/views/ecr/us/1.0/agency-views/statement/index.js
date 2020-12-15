import { connect } from 'react-redux';
import { Screen } from "./screen";
const { defaultConfig: { PLATFORM } } = require(`../../../../../../config/default`);
const {
    stopLoader,
    startLoader,
    updateApprovalStatus,
    fetchAllUsersStats,
    logout_success,
    transactionDetails
} = require(`../../../../../../redux/${PLATFORM}/actions`);

const mapStateToProps = (state) => {

    return ({
        transactions: state.PaymentReducer.transactions,
        platformType: state.CommonReducer.platformType
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        fetchAllUsersStats: () => dispatch(fetchAllUsersStats()),
        updateApprovalStatus: (data, success) => dispatch(updateApprovalStatus(data, success)),
        transactionDetails: (failure) => {
            dispatch(transactionDetails(failure))
        }
    }
}
export const Statement = connect(mapStateToProps, mapDispatchToProps)(Screen);