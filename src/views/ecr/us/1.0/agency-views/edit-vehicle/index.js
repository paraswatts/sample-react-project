import { connect } from 'react-redux';
import { Vehicles } from "./screen";
const { defaultConfig: { PLATFORM } } = require(`../../../../../../config/default`);
const {
    stopLoader,
    startLoader,
    updateApprovalStatus,
    fetchAllUsersStats,
    logout_success,
    getDashboardData,
    updateStatus,
    getDashboardTableData,
    getVehicleData,
    deleteVehicle,
    getFuelList,
    getVehicleType,
    fileUploader,
    getVehicleTransmission,
    clearVehiclesImages,
    changeOrderImages,
    getVehcileCategory,
    createVehicleCategory,
    addNewVehicle,
    getVehiclesImages,
    updateVehicle,
    addImages,
    getVehicles
} = require(`../../../../../../redux/${PLATFORM}/actions`);

const mapStateToProps = (state) => {
    return ({
        data: state && state.form && state.form.editVehicle && state.form.editVehicle.values,
        userData: state.CommonReducer.userData,
        platformType: state.CommonReducer.platformType,
        dashboardData: state.AgencyDashboardReducer.dashboardData,
        dashboardTableData: state.AgencyDashboardReducer.dashboardTableData,
        anyUpdate: state.AddNewListingReducer && state.AddNewListingReducer.update,
        fualData: state.AddNewListingReducer.fuelList && state.AddNewListingReducer.fuelList,
        vehicleType: state.AddNewListingReducer && state.AddNewListingReducer.vehicleTypes,
        vehicleData: state.AddNewListingReducer.vehicleOptions && state.AddNewListingReducer.vehicleOptions,
        vehicleType: state.AddNewListingReducer && state.AddNewListingReducer.vehicleTypes,
        vehicleTransmissionData: state.AddNewListingReducer && state.AddNewListingReducer.vehicleTransmission,
        vehicleImages: state.AddNewListingReducer && state.AddNewListingReducer.vehiclesImages,
        vehicleCategory: state.AddNewListingReducer && state.AddNewListingReducer.vehicleCategory,
        imagesforModal: state.VehicleReducer.vehicleImagesforModal,

    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        getDashboardData: (data, success, failure) => {
            dispatch(getDashboardData(data, success, failure))
        },
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        fetchAllUsersStats: () => dispatch(fetchAllUsersStats()),
        updateApprovalStatus: (data, success) => dispatch(updateApprovalStatus(data, success)),
        updateStatus: (data, success, failure) => {
            dispatch(updateStatus(data, success, failure))
        },
        getDashboardTableData: (data, success, failure) => {
            dispatch(getDashboardTableData(data, success, failure))
        },
        getVehicleData: () => {
            dispatch(getVehicleData())
        },
        deleteVehicle: (data, success, failure) => {
            dispatch(deleteVehicle(data, success, failure))
        },
        getFuelList: () => {
            dispatch(getFuelList())
        },
        getVehicleType: (data) => {
            dispatch(getVehicleType(data))
        },
        fileUploader: (data, index, length, success, failure) => {
            dispatch(fileUploader(data, index, length, success, failure))
        },
        clearVehiclesImages: () => {
            dispatch(clearVehiclesImages())
        },
        changeOrderImages: (data) => {
            dispatch(changeOrderImages(data))
        },
        getVehcileCategory: () => {
            dispatch(getVehcileCategory())
        },
        getVehicleTransmission: (data) => {
            dispatch(getVehicleTransmission(data))
        },
        deleteVehicle: (id, success, failure) => {
            dispatch(deleteVehicle(id, success, failure))
        },
        createVehicleCategory: (data, success, failure) => {
            dispatch(createVehicleCategory(data, success, failure))
        },
        addNewVehicleCall: (data, success, failure) => {
            dispatch(addNewVehicle(data, success, failure))
        },
        updateVehicle: (data, success, failure) => {
            dispatch(updateVehicle(data, success, failure))
        },
        addImages: (data) => {
            dispatch(addImages(data))
        },
        getVehicles: () => {
            dispatch(getVehicles(() => { }, () => { }))
        },

    }
}
export const EditVehicleScreen = connect(mapStateToProps, mapDispatchToProps)(Vehicles);