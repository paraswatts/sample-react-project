import { connect } from 'react-redux';
import { Screen } from "./screen";
const { defaultConfig: { PLATFORM } } = require(`../../../../../../config/default`);
const { stopLoader, startLoader, makeRequest, getFaq ,range,setPaidDays,getVehicleInformation} = require(`../../../../../../redux/${PLATFORM}/actions`);

const mapStateToProps = (state,props) => {
   
    return {
        vehicle: state.DriverReducer.getVehicleInformation,
        userToken: state.CommonReducer.userToken,
        paidDays: state.DriverReducer.paidDays,
        faq: state.DriverReducer.getFaq,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        makeRequest: (data, success, error) => dispatch(makeRequest(data, success, error)),
        getFaq: () => dispatch(getFaq()),
        range: (data) => dispatch(range(data)),
        setPaidDay: (data) => dispatch(setPaidDays(data)),
        getVehicleInformation: (data, success, onError) => dispatch(getVehicleInformation(data, success, onError)),
    }
}

export const ViewVehicle = connect(mapStateToProps, mapDispatchToProps)(Screen)