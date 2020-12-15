import { connect } from 'react-redux';
import { Screen } from "./screen";
const { defaultConfig: { PLATFORM } } = require(`../../../../../config/default`);
const { registerUser, stopLoader, socialMediaLogin, savePlatform,setCurrentLocation } = require(`../../../../../redux/${PLATFORM}/actions`)

const mapStateToProps = (state) => {
  return ({
    platformType: state.CommonReducer.platformType
  });
}

const mapDispatchToProps = (dispatch) => {
  return {
    register_User: (data, success, onError) => dispatch(registerUser(data, success, onError)),
    stopLoader: () => dispatch(stopLoader()),
    socialMediaLogin: (data, success, failure) => {
      dispatch(socialMediaLogin(data, success, failure))
    },
    savePlatform: (data) => {
      dispatch(savePlatform(data))
    },
    setCurrentLocation: (userData) => dispatch(setCurrentLocation(userData))
  }
}
export const SignupScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);