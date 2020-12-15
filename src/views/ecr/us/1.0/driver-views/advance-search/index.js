import { connect } from 'react-redux';
import { reset } from "redux-form";
import { AdvanceSearchVehicleForm } from "./advanceSearchForm";
const { defaultConfig: { PLATFORM } } = require(`../../../../../../config/default`);
const { stopLoader, startLoader, searchVehicle, setAdvanceSearchValues, setPickUpLocation,
    getFuelList, getVehicleTypeList, getTransmissionTypeList
} = require(`../../../../../../redux/${PLATFORM}/actions`);

const mapStateToProps = (state) => {
    return {
        pickupData: state.DriverReducer.pickup_Data,
        fuelList: state.AddNewListingReducer.fuelList,
        vehicleList: state.AddNewListingReducer.vehicleTypeList,
        transmissionList: state.AddNewListingReducer.transmissionTypeList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        resetForm: () => dispatch(reset('advanceSearchVehicleForm')),
        setAdvanceSearchValues: (data) => dispatch(setAdvanceSearchValues(data)),
        setPickUpLocation: (data) => dispatch(setPickUpLocation(data)),
        searchVehicle: (data, success, onError) => dispatch(searchVehicle(data, success, onError)),
        getFuelList: () => dispatch(getFuelList()),
        getVehicleTypeList: () => dispatch(getVehicleTypeList()),
        getTransmissionTypeList: () => dispatch(getTransmissionTypeList())
    }
}
export const AdvanceSearchVehicle = connect(mapStateToProps, mapDispatchToProps)(AdvanceSearchVehicleForm);