import { connect } from 'react-redux';
import { Screen } from "./screen";
const { defaultConfig: { PLATFORM } } = require(`../../../../../../config/default`);
const {
    stopLoader,
    startLoader,
    searchVehicle,
    popularPlaces, setPickUpLocation } = require(`../../../../../../redux/${PLATFORM}/actions`);

const mapStateToProps = (state) => {
    return state

}
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        getPopularPlaces: (data, success, onError) => dispatch(popularPlaces(data, success, onError)),
        searchVehicle: (data, success, onError) => dispatch(searchVehicle(data, success, onError)),
        setUpPickUpLocation: (data) => dispatch(setPickUpLocation(data)),
    }
}
export const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);