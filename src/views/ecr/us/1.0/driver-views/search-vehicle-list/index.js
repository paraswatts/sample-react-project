import { connect } from 'react-redux';
import { Screen } from "./screen";
const { defaultConfig: { PLATFORM } } = require(`../../../../../../config/default`);
const { stopLoader, startLoader,
    setPickUpLocation, setAdvanceSearchValues, searchVehicle,
    getFuelList, getVehicleTypeList, getTransmissionTypeList, setPaidDays, range } = require(`../../../../../../redux/${PLATFORM}/actions`);

const mapStateToProps = (state) => {
    return {
        pickupData: state.DriverReducer.pickup_Data,
        advanceSearchFormValues: state.DriverReducer.advanceSearchFormValues,
        currentLocation: state.CommonReducer.pickup_location,
        vehicleListing: state.DriverReducer.vehicleListing.data,
        totalCount: state.DriverReducer.vehicleListing.totalCount,
        fuelList: state.AddNewListingReducer.fuelList,
        vehicleList: state.AddNewListingReducer.vehicleTypeList,
        transmissionList: state.AddNewListingReducer.transmissionTypeList
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        setUpPickUpLocation: (data) => dispatch(setPickUpLocation(data)),
        setAdvanceSearchValues: (data) => dispatch(setAdvanceSearchValues(data)),
        searchVehicle: (data, success, onError) => {
            dispatch(searchVehicle(data, success, onError))
        },
        getFuelList: () => dispatch(getFuelList()),
        getVehicleTypeList: () => dispatch(getVehicleTypeList()),
        getTransmissionTypeList: () => dispatch(getTransmissionTypeList()),
        setPaidDay: (data) => dispatch(setPaidDays(data)),
        range: (data) => dispatch(range(data)),
    }
}

export const SearchVehicleList = connect(mapStateToProps, mapDispatchToProps)(Screen)