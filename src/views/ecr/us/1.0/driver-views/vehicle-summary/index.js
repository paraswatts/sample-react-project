import { connect } from 'react-redux';
import { Screen } from "./screen";
const { defaultConfig: { PLATFORM } } = require(`../../../../../../config/default`);
const { stopLoader, startLoader, makeRequest, getDriverProfileInformation } = require(`../../../../../../redux/${PLATFORM}/actions`);

const mapStateToProps = (state, props) => {
    return {
        vehicle: state.DriverReducer.getVehicleInformation,
        paidDays: state.DriverReducer.paidDays,
        setVehicleDate: state.DriverReducer.setVehicleDate,
        userToken: state.CommonReducer.userToken,
        loginType: state.CommonReducer.loginType,
        getDriverProfileData: state.DriverReducer.getDriverProfile,
        travelDates: state.DriverReducer.travelDates
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        makeRequest: (data, success, onError) => dispatch(makeRequest(data, success, onError)),
        getDriverProfile: (success, onError) => dispatch(getDriverProfileInformation(success, onError)),
    }
}

export const VehicleSummary = connect(mapStateToProps, mapDispatchToProps)(Screen)