import { connect } from "react-redux";
import { Screen } from "./screen";
const {
  defaultConfig: { PLATFORM },
} = require(`../../../../../../config/default`);
const {
  stopLoader,
  startLoader,
  updateApprovalStatus,
  fetchAllUsersStats,
  logout_success,
  saveStepNo,
  setFormStep2Data,
  setFormStep1Data,
  setFormStep3Data,
} = require(`../../../../../../redux/${PLATFORM}/actions`);
const mapStateToProps = (state) => {
  return {
    errorsSync: state.form,
    stepIndex: state.AddNewListingReducer.stepNo,
    platformType: state.CommonReducer.platformType
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    startLoader: () => dispatch(startLoader()),
    stopLoader: () => dispatch(stopLoader()),
    fetchAllUsersStats: () => dispatch(fetchAllUsersStats()),
    updateApprovalStatus: (data, success) =>
      dispatch(updateApprovalStatus(data, success)),
    saveStepNo: (no) => {
      dispatch(saveStepNo(no));
    },
    setFormStep1Data: (data) => {
      dispatch(setFormStep1Data(data));
    },
    setFormStep2Data: (data) => {
      dispatch(setFormStep2Data(data));
    },
    setFormStep3Data: (data) => {
      dispatch(setFormStep3Data(data));
    },
  };
};
export const AddNewList = connect(mapStateToProps, mapDispatchToProps)(Screen);
