import { connect } from 'react-redux';
import { RateAgencyComponent } from "./form";
const { defaultConfig: { PLATFORM } } = require(`../../../../../../../config/default`);
const {
    stopLoader,
    startLoader,rateAgencyByDriver,getDriverPastTrip } = require(`../../../../../../../redux/${PLATFORM}/actions`);

const mapStateToProps = (state) => {
   
    return {tripIndex: state && state.DriverReducer && state.DriverReducer.tripIndex}
}
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        rateAgencyByDriver: (data,success,onError) => dispatch(rateAgencyByDriver(data,success,onError)),
        getDriverPastTrip: (data, success, onError) => dispatch(getDriverPastTrip(data, success, onError)),
    }
}
export const RateAgency = connect(mapStateToProps, mapDispatchToProps)(RateAgencyComponent);