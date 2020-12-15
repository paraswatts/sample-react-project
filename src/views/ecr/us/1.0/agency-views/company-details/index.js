import { connect } from 'react-redux';
import { Screen } from "./screen";
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
    updateProfile,
    detailsNotFIlled,
    getVehiclesImages,
    addImages
} = require(`../../../../../../redux/${PLATFORM}/actions`);

const mapStateToProps = (state) => {

    return ({
        packageId: state.TokenReducer.buyingTokenId,
        detailsFilled: state.TokenReducer.detailsNotFilled,
        prevLocation: state.CommonReducer.prevLocation,
        data: state && state.form && state.form.companyDetails && state.form.companyDetails.values,
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
        saveStepNo: (no) => {
            dispatch(saveStepNo(no))
        },
        unratedDriver: (data) => {
            dispatch(unratedDriver(data))
        },
        getToken: () => {
            dispatch(getToken())
        },
        updateProfile: (data, success, failure) => {
            dispatch(updateProfile(data, success, failure))
        },
        detailsNotFIlled: (value) => {
            dispatch(detailsNotFIlled(value))
        },
        addImages: (data) => {
            dispatch(addImages(data))
        }

    }
}
export const CompanyDetails = connect(mapStateToProps, mapDispatchToProps)(Screen);