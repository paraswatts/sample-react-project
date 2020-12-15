import { connect } from 'react-redux';
import { EditBranch } from "./screen";
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
    addInsurance,
    getBranchManager,
    addNewMember,
    getBranchList,
    createBranch,
    branchDelete,
    updateBranch
} = require(`../../../../../../redux/${PLATFORM}/actions`);

const mapStateToProps = (state) => {

    return ({
        data: state && state.form && state.form.editBranch && state.form.editBranch.values,
        userData: state.CommonReducer.userData,
        platformType: state.CommonReducer.platformType,
        dashboardData: state.AgencyDashboardReducer.dashboardData,
        dashboardTableData: state.AgencyDashboardReducer.dashboardTableData,
        anyUpdate: state.AgencyDashboardReducer.anyUpdate,
        insuranceData: state.AddNewListingReducer.insuranceList && state.AddNewListingReducer.insuranceList,
        ferryData: state.AddNewListingReducer && state.AddNewListingReducer.ferryData,
        fuelOfferData: state.AddNewListingReducer && state.AddNewListingReducer.fuelOffer,
        termsData: state && state.AddNewListingReducer && state.AddNewListingReducer.terms,
        branchManagers: state.AddNewListingReducer && state.AddNewListingReducer.branchManager,
        branchData: state.AddNewListingReducer.branchList && state.AddNewListingReducer.branchList.items,

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
        addInsurance: (data, success, failure) => {
            dispatch(addInsurance(data, success, failure))
        },
        addNewMemberCall: (data, success, failure) => {
            dispatch(addNewMember(data, success, failure))
        },
        getBranchManager: () => {
            dispatch(getBranchManager())
        },
        getBranchList: () => {
            dispatch(getBranchList())
        },
        createBranch: (data, success, failure) => {
            dispatch(createBranch(data, success, failure))
        },
        branchDelete: (id, success, failure) => {
            dispatch(branchDelete(id, success, failure))
        },
        updateBranch: (data, success, failure) => {
            dispatch(updateBranch(data, success, failure))
        }
    }
}
export const EditBranchScreen = connect(mapStateToProps, mapDispatchToProps)(EditBranch);