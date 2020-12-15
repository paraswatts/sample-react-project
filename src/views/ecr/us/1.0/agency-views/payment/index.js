import { connect } from 'react-redux';
import { Screen } from "./screen.jsx";
const { defaultConfig: { PLATFORM } } = require(`../../../../../../config/default`);
const {
    stopLoader,
    startLoader,
    applyPromo,
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
    saveCard,
    promoCode,
    getCards,
    purchaseToken,
    buyingTokenId,
    deleteCard,
    setDefaultCard
} = require(`../../../../../../redux/${PLATFORM}/actions`);

const mapStateToProps = (state) => {

    return ({
        cards: state.PaymentReducer.cards,
        packageId: state.TokenReducer.buyingTokenId,
        data: state && state.form && state.form.insurance && state.form.insurance.values,
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
        saveCard: (data) => {
            dispatch(saveCard(data))
        },
        getCards: (defaultCardGetter) => {
            dispatch(getCards(defaultCardGetter))
        },
        purchaseToken: (data, success, failure) => {
            dispatch(purchaseToken(data, success, failure))
        },
        buyingTokenId: (id) => {
            dispatch(buyingTokenId(id))
        },
        deleteCard: (id, success, failure) => {
            dispatch(deleteCard(id, success, failure))
        },
        setDefaultCard: (id, success, failure) => {
            dispatch(setDefaultCard(id, success, failure))
        },
        applyPromo: (promoCode, success, failure) => {
            dispatch(applyPromo(promoCode,success,failure))
        }
    }
}
export const Payment = connect(mapStateToProps, mapDispatchToProps)(Screen);