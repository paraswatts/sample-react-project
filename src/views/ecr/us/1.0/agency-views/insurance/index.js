import { connect } from 'react-redux';
import { Insurance } from "./screen";
const { defaultConfig: { PLATFORM } } = require(`../../../../../../config/default`);
const {
    stopLoader,
    startLoader,
    updateApprovalStatus,
    fetchAllUsersStats,
    logout_success,
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
    addInsurance, deleteInsurance, getINsuranceByID, setInsuranceListIndex
} = require(`../../../../../../redux/${PLATFORM}/actions`);

const mapStateToProps = (state) => {
    return ({
        data: state && state.form && state.form.insurance && state.form.insurance.values,
        userData: state.CommonReducer.userData,
        platformType: state.CommonReducer.platformType,
        dashboardData: state.AgencyDashboardReducer.dashboardData,
        dashboardTableData: state.AgencyDashboardReducer.dashboardTableData,
        anyUpdate: state.AgencyDashboardReducer.anyUpdate,
        insuranceData: state.AddNewListingReducer.insuranceList && state.AddNewListingReducer.insuranceList,
        insuranceCount: state.AddNewListingReducer.insuranceList && state.AddNewListingReducer.insuranceCount,
        ferryData: state.AddNewListingReducer && state.AddNewListingReducer.ferryData,
        fuelOfferData: state.AddNewListingReducer && state.AddNewListingReducer.fuelOffer,
        termsData: state && state.AddNewListingReducer && state.AddNewListingReducer.terms,
        listIndex: state && state.AddNewListingReducer && state.AddNewListingReducer.listIndex
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
        getInsuranceList: (data, success, failure) => {
            dispatch(getInsuranceList(data, success, failure))
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
        addInsurance: (data, success, failure) => {
            dispatch(addInsurance(data, success, failure))
        },
        deleteInsurance: (data, success, failure) => {
            dispatch(deleteInsurance(data, success, failure))
        },
        getINsurance: (data, success, failure) => dispatch(getINsuranceByID(data, success, failure)),
        setInsuranceListIndex: (data) => dispatch(setInsuranceListIndex(data))
    }
}
export const InsuranceScreen = connect(mapStateToProps, mapDispatchToProps)(Insurance);