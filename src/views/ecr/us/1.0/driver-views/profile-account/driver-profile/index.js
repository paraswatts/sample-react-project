import { connect } from 'react-redux';
import { Screen } from "./screen";
const { defaultConfig: { PLATFORM } } = require(`../../../../../../../config/default`);
const {
    stopLoader,
    startLoader,getDriverProfileInformation,editDriverProfile,changeDriverPassword,logout } = require(`../../../../../../../redux/${PLATFORM}/actions`);

const mapStateToProps = (state) => {
 
    return {getProfileInformation: state.DriverReducer.getDriverProfile,
        userToken: state.CommonReducer.userToken,
        prevLocation: state.CommonReducer.prevLocation
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        getDriverProfile: (success,onError) => dispatch(getDriverProfileInformation(success,onError)),
        updateDriverProfile: (data,success,onError) => dispatch(editDriverProfile(data,success,onError)),
        changeDriverPassword: (data,success,onError) => dispatch(changeDriverPassword(data,success,onError)),
        logout: (token, success, failure) => dispatch(logout(token, success, failure))
    }
}
export const DriverProfile = connect(mapStateToProps, mapDispatchToProps)(Screen);