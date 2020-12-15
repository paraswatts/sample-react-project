import { connect } from 'react-redux';
import { Screen } from "./screen";
const { defaultConfig: { PLATFORM } } = require(`../../../../../../../config/default`);
const {
    stopLoader,
    startLoader,getDriverRatings,getDriverProfileInformation } = require(`../../../../../../../redux/${PLATFORM}/actions`);

const mapStateToProps = (state) => {
    return {getDriverRatingsData: state.DriverReducer.getDriverRatingsData,
        getProfileInformation: state.DriverReducer.getDriverProfile,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        getDriverRatings: (data,success,onError) => dispatch(getDriverRatings(data,success,onError)),
        getDriverProfile: (success,onError) => dispatch(getDriverProfileInformation(success,onError))
    }
}
export const DriverRatings = connect(mapStateToProps, mapDispatchToProps)(Screen);