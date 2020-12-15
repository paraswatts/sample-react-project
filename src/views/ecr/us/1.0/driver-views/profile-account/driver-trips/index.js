import { connect } from 'react-redux';
import { Screen } from "./screen";
const { defaultConfig: { PLATFORM } } = require(`../../../../../../../config/default`);
const {
    stopLoader,
    startLoader, getDriverTrips, getDriverPastTrip, getCancelledTrips, tableIndex, getAllPastTrips } = require(`../../../../../../../redux/${PLATFORM}/actions`);

const mapStateToProps = (state) => {
    return {
        getDriverUpcomingTripList: state.DriverReducer.getDriverUpcomingTripList,
        getDriverPastTripList: state.DriverReducer.getDriverPastTripList,
        getCancelledTripData: state.DriverReducer.getCancelledTripData,
        tripIndex: state && state.DriverReducer && state.DriverReducer.tripIndex
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        getDriverTrips: (data, success, onError) => dispatch(getDriverTrips(data, success, onError)),
        getDriverPastTrip: (data, success, onError) => dispatch(getDriverPastTrip(data, success, onError)),
        getCancelledTrips: (data, success, onError) => dispatch(getCancelledTrips(data, success, onError)),
        tableIndex: (data) => dispatch(tableIndex(data)),

    }
}
export const DriverTrips = connect(mapStateToProps, mapDispatchToProps)(Screen);