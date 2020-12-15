import { connect } from 'react-redux';
import { Screen } from "./screen";
const { defaultConfig: { PLATFORM } } = require(`../../../../../../config/default`);
const {
    stopLoader,
    startLoader, logout, changePassword,
    updateMember,
    getProfile
} = require(`../../../../../../redux/${PLATFORM}/actions`);

const mapStateToProps = (state) => {
    return {
        getProfileInformation: state.AgencyProfileReducer.profileData,
        userToken: state.CommonReducer.userToken,
        prevLocation: state.CommonReducer.prevLocation
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        getProfile: (success, failure) => dispatch(getProfile(success, failure)),
        updateMember: (data, success, onError) => dispatch(updateMember(data, success, onError)),
        changePassword: (data, success, onError) => dispatch(changePassword(data, success, onError)),
        logout: (token, success, failure) => dispatch(logout(token, success, failure)),

    }
}
export const AgencyProfile = connect(mapStateToProps, mapDispatchToProps)(Screen);