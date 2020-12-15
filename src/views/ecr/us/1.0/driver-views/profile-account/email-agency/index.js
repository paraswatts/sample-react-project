import { connect } from 'react-redux';
import { EmailAgencyComponent } from "./form";
const { defaultConfig: { PLATFORM } } = require(`../../../../../../../config/default`);
const {
    stopLoader,
    startLoader,emailAgencyByDriver } = require(`../../../../../../../redux/${PLATFORM}/actions`);

const mapStateToProps = (state) => {
    return { tripIndex: state && state.DriverReducer && state.DriverReducer.tripIndex}
}
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        emailAgencyByDriver: (data,success,onError) => dispatch(emailAgencyByDriver(data,success,onError))
    }
}
export const EmailAgency = connect(mapStateToProps, mapDispatchToProps)(EmailAgencyComponent);