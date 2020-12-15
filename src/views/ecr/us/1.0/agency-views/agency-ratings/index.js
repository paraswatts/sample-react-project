import { connect } from 'react-redux';
import { Screen } from "./screen";
const { defaultConfig: { PLATFORM } } = require(`../../../../../../config/default`);
const {
    getAgencyRatings,
    changeAcceptenceStatus
} = require(`../../../../../../redux/ecr/actions`);

const mapStateToProps = (state) => {
    return ({
        anyUpdate: state.AgencyDashboardReducer.anyUpdate,
        agencyRatedData: state.RateDriverReducer.agencyRatedData
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAgencyRatings: (data, success, failure) => dispatch(getAgencyRatings(data, success, failure)),
        changeStatus: (data, success, failure) => dispatch(changeAcceptenceStatus(data, success, failure))
    }
}
export const AgencyRating = connect(mapStateToProps, mapDispatchToProps)(Screen);