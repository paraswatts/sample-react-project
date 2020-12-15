import { connect } from 'react-redux';
import { Screen } from "./screen";
import { reduxForm, Field, change as changeField } from "redux-form";
const { defaultConfig: { PLATFORM } } = require(`../../../../../../config/default`);
const {
    stopLoader,
    startLoader,
    updateApprovalStatus,
    fetchAllUsersStats,
    logout_success,
    saveStepNo,
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
    unratedDriver,
    getToken,
    updateSuccess,
    updateRequest,
    newListingId,
    getPackages,
    regoSet, analyticData,
    selectedList,
    getListing
} = require(`../../../../../../redux/${PLATFORM}/actions`);

const mapStateToProps = (state) => {

    return ({
        agencyData: state.CommonReducer.userData,
        unratedDriverData: state.RateDriverReducer.unratedDriversData,
        userData: state.CommonReducer.userData,
        platformType: state.CommonReducer.platformType,
        dashboardData: state.AgencyDashboardReducer.dashboardData,
        dashboardTableData: state.AgencyDashboardReducer.dashboardTableData,
        anyUpdate: state.AgencyDashboardReducer.anyUpdate,
        insuranceData: state.AddNewListingReducer.insuranceList && state.AddNewListingReducer.insuranceList,
        ferryData: state.AddNewListingReducer && state.AddNewListingReducer.ferryData,
        fuelOfferData: state.AddNewListingReducer && state.AddNewListingReducer.fuelOffer,
        termsData: state && state.AddNewListingReducer && state.AddNewListingReducer.terms,
        agencyViews: state && state.AgencyDashboardReducer && state.AgencyDashboardReducer.AnalyticData &&
            state.AgencyDashboardReducer.AnalyticData.count ? state.AgencyDashboardReducer.AnalyticData.count : 0,
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        getDashboardData: (data, success, failure) => {
            dispatch(getDashboardData(data, success, failure))
        },
        newListingId: (id) => {
            dispatch(newListingId(id))
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
        getListing: (data) => {
            dispatch(getListing(data))
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
        saveStepNo: (no) => {
            dispatch(saveStepNo(no))
        },
        unratedDriver: (data) => {
            dispatch(unratedDriver(data))
        },
        getToken: () => {
            dispatch(getToken())
        },
        updateSuccess: () => {
            dispatch(updateSuccess())
        },
        updateRequest: () => {
            dispatch(updateRequest())
        },
        getPackages: () => {
            dispatch(getPackages())
        },
        regoSet: (data, success, failure) => {
            dispatch(regoSet(data, success, failure))
        },
        analyticData: (data, success, failure) => {
            dispatch(analyticData(data, success, failure))
        },
        selectedList: (data) => {
            dispatch(selectedList(data))
        }
    }
}

const reduxFormFunction = reduxForm({
    form: "home",
    enableReinitialize: true
})(Screen);

export const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(reduxFormFunction);
// export const  = connect(mapStateToProps, mapDispatchToProps)(Screen);