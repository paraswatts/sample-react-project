import { connect } from 'react-redux';
import { SearchVehicleForm } from "./searchVehicleForm";
const { defaultConfig: { PLATFORM } } = require(`../../../../../../config/default`);
const {
    stopLoader,
    startLoader, searchVehicle, setPickUpLocation, getCurrentLocation } = require(`../../../../../../redux/${PLATFORM}/actions`);

const mapStateToProps = (state) => {
    return {
        advanceSearchFormValues: state.DriverReducer.advanceSearchFormValues,
        currentLocation: state.CommonReducer.pickup_location,
        pickup_Data: state.DriverReducer.pickup_Data
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        searchVehicle: (data, success, onError) => dispatch(searchVehicle(data, success, onError)),
        setUpPickUpLocation: (data) => dispatch(setPickUpLocation(data)),
        getCurrentLocation: () => dispatch(getCurrentLocation())
    }
}
export const SearchVehicle = connect(mapStateToProps, mapDispatchToProps)(SearchVehicleForm)