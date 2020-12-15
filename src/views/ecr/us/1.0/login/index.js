import { connect } from 'react-redux';
import { Screen } from "./screen";
import { reset } from "redux-form";
const { defaultConfig: { PLATFORM } } = require(`../../../../../config/default`);
const { checkLogin, stopLoader, saveCaptcha, socialMediaLogin, savePlatform, setCurrentLocation } = require(`../../../../../redux/${PLATFORM}/actions`);

const mapStateToProps = (state) => {
  return ({
    platformType: state.CommonReducer.platformType,
    captcha: state.CommonReducer.captcha,
   previousLocation: state.CommonReducer.prevLocation,
   vehicle: state.DriverReducer.getVehicleInformation
  });
}
const mapDispatchToProps = (dispatch) => {
  return {
    checkLogin: (credentials, success, onError) => dispatch(checkLogin(credentials, success, onError)),
    stopLoader: () => dispatch(stopLoader()),
    saveCaptcha: (text) => {
      dispatch(saveCaptcha(text))
    },
    resetForm: () => (dispatch(reset('login'))),
    socialMediaLogin: (data, success, failure) => {
      dispatch(socialMediaLogin(data, success, failure))
    },
    savePlatform: (data) => {
      dispatch(savePlatform(data))
    },
    setCurrentLocation: (userData) => dispatch(setCurrentLocation(userData))
  }
}
export const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);



