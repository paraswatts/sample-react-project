import { connect } from 'react-redux';
import { InviteScreen } from "./screen";

const { defaultConfig: { PLATFORM } } = require(`../../../../../../config/default`);
const {
    stopLoader,
    startLoader,
    updateApprovalStatus,
    fetchAllUsersStats,
    getDashboardData,
    changeStatusDashboard,
    getDashboardTableData,
    setFormStep2Data,
    setFormStep1Data,
    setFormStep3Data,
    getInsuranceList,
    getFerry,
    getFuelOffer,
    getTerms,
    deleteList,
    getDrivers,
    saveStepNo,
    inviteDrivers,
    newListingId
} = require(`../../../../../../redux/${PLATFORM}/actions`);

const mapStateToProps = (state) => {
    return ({
        newListId: state.AddNewListingReducer.newListingId,
        savedDrivers: state.InviteDriverReducer.savedDrivers,
        userData: state.CommonReducer.userData,
        platformType: state.CommonReducer.platformType,
        dashboardData: state.AgencyDashboardReducer.dashboardData,
        dashboardTableData: state.AgencyDashboardReducer.dashboardTableData,
        anyUpdate: state.AgencyDashboardReducer.anyUpdate,
        insuranceData: state.AddNewListingReducer.insuranceList && state.AddNewListingReducer.insuranceList,
        ferryData: state.AddNewListingReducer && state.AddNewListingReducer.ferryData,
        fuelOfferData: state.AddNewListingReducer && state.AddNewListingReducer.fuelOffer,
        termsData: state && state.AddNewListingReducer && state.AddNewListingReducer.terms,

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
        // updateStatus: (data, success, failure) => {
        //     dispatch(updateStatus(data, success, failure))
        // },
        getDashboardTableData: (data, success, failure) => {
            dispatch(getDashboardTableData(data, success, failure))
        },
        changeStatusDashboard: (data, success, failure) => {
            dispatch(changeStatusDashboard(data, success, failure))
        },
        setFormStep1Data: (data) => {
            dispatch(setFormStep1Data(data))
        },
        setFormStep2Data: (data) => {
            dispatch(setFormStep2Data(data))
        },
        setFormStep3Data: (data) => {
            dispatch(setFormStep3Data(data))
        },
        getInsuranceList: (data) => {
            dispatch(getInsuranceList(data))
        },
        getFerry: () => {
            dispatch(getFerry())
        },
        getFuelOffer: () => {
            dispatch(getFuelOffer())
        },
        getTerms: () => {
            dispatch(getTerms())
        },
        deleteList: (id, success, failure) => {
            dispatch(deleteList(id, success, failure))
        },
        getDrivers: (searchString) => {
            dispatch(getDrivers(searchString))
        },
        saveStepNo: (no) => {
            dispatch(saveStepNo(no))
        },
        inviteDrivers: (data, success, failure) => {
            dispatch(inviteDrivers(data, success, failure))
        },
        newListingId: (data) => {
            dispatch(newListingId(data))
        }
    }
}
export const InviteDriver = connect(mapStateToProps, mapDispatchToProps)(InviteScreen);