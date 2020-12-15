import { connect } from 'react-redux';
import { Screen } from "./screen";
const { defaultConfig: { PLATFORM } } = require(`../../../../../../config/default`);
const {
    stopLoader,
    startLoader,
    updateApprovalStatus,
    fetchAllUsersStats,
    logout_success,
    getToken,
    buyingTokenId,
    getPackages,
    getCards,
    detailsNotFIlled
} = require(`../../../../../../redux/${PLATFORM}/actions`);

const mapStateToProps = (state) => {

    return ({
        agencyData: state.CommonReducer.userData,
        totalToken: state.TokenReducer.noOfToken,
        platformType: state.CommonReducer.platformType,
        packages: state.TokenReducer.packages
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        detailsNotFIlled: (value) => {
            dispatch(detailsNotFIlled(value))
        },
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        fetchAllUsersStats: () => dispatch(fetchAllUsersStats()),
        updateApprovalStatus: (data, success) => dispatch(updateApprovalStatus(data, success)),
        getToken: () => {
            dispatch(getToken())
        },
        getPackages: () => {
            dispatch(getPackages())
        },
        buyingTokenId: (id) => {
            dispatch(buyingTokenId(id))
        },
        getCards: (defaultCardGetter) => {
            dispatch(getCards(defaultCardGetter))
        },
    }
}
export const TokenScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);