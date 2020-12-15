import { connect } from 'react-redux';
import { Screen } from "./screen";
const { defaultConfig: { PLATFORM } } = require(`../../../../../../config/default`);
const {
    stopLoader,
    startLoader,
    updateApprovalStatus,
    fetchAllUsersStats,
    logout_success,
    unratedDriver,
    createNewListing,
    ratedDrivers
} = require(`../../../../../../redux/${PLATFORM}/actions`);

const mapStateToProps = (state) => {

    return ({
        anyUpdate: state.AgencyDashboardReducer.anyUpdate,
        ratedDriversData: state.RateDriverReducer.ratedDriversData,
        unratedDriverData: state.RateDriverReducer.unratedDriversData,
        platformType: state.CommonReducer.platformType
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        fetchAllUsersStats: () => dispatch(fetchAllUsersStats()),
        updateApprovalStatus: (data, success) => dispatch(updateApprovalStatus(data, success)),
        unratedDriver: (data) => {
            dispatch(unratedDriver(data))
        },
        createNewListing: (data, success, failure) => {
            dispatch(createNewListing(data, success, failure))
        },
        ratedDrivers: (data) => {
            dispatch(ratedDrivers(data))
        }
    }
}
export const DriverRating = connect(mapStateToProps, mapDispatchToProps)(Screen);