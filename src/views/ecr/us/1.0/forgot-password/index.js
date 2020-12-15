import { connect } from 'react-redux';
import { Screen } from "./screen";
const { defaultConfig: { PLATFORM } } = require(`../../../../../config/default`);
const { sendForgotEmail, saveEmail,stopLoader } = require(`../../../../../redux/${PLATFORM}/actions`);

const mapStateToProps = (state) => {
    return ({
        userEmail: state.CommonReducer.userEmail
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        sendForgotEmail: (email, success, error) => dispatch(sendForgotEmail(email, success, error)),
        saveEmail: (email) => dispatch(saveEmail(email)),
        stopLoader: () => dispatch(stopLoader())
    }
}
export const ForgotScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);



