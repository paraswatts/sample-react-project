import { connect } from 'react-redux';
import { Screen } from "./screen";
const { defaultConfig: { PLATFORM } } = require(`../../../../../../../config/default`);
const {stopLoader,
    startLoader,cancelTripByDriver,getDriverTrips,getCancelledTrips,tableIndex } = require(`../../../../../../../redux/${PLATFORM}/actions`);

const mapStateToProps = (state,props) => {
    return {popupCancelTrip: props.popupCancelTrip,
        setPopCancelTrip: props.setPopCancelTrip,
        upcomingActiveRowData: props.upcomingActiveRowData,
        tripIndex: state && state.DriverReducer && state.DriverReducer.tripIndex,
        getDriverUpcomingTripList: state && state.DriverReducer && state.DriverReducer.getDriverUpcomingTripList,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        cancelTripByDriver: (data,success,onError) => dispatch(cancelTripByDriver(data,success,onError)),
        getDriverTrips: (data, success, onError) => dispatch(getDriverTrips(data, success, onError)),
        getCancelledTrips: (data, success, onError) => dispatch(getCancelledTrips(data, success, onError)),
        tableIndex: (data) => dispatch(tableIndex(data))
    }
}
export const CancelTrip = connect(mapStateToProps, mapDispatchToProps)(Screen);