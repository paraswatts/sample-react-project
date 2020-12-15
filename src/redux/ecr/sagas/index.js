import { all, fork } from 'redux-saga/effects';
import AuthSaga from './auth';
import AgencyDashboardSaga from './agency-dashboard';
import DriverSaga from './driver';
import AddNewListing from './add-new-listing';
import VehicleSaga from './vehicles';
import InviteDrivers from './invite-drivers';
import RateDrivers from './rate-driver';
import TokenSaga from './token';
import PaymentSaga from './payment';
import BranchSaga from './branch';
import AddReviewMember from './agency-review-member';
import AgencyProfileSaga from './agency-profile'
import CompanyDetailsSaga from './company-details';
import DashboardListingSaga from './dashboard-listing';


function* dataSaga() {
  yield all([
    fork(AuthSaga),
    fork(DriverSaga),
    fork(AgencyDashboardSaga),
    fork(AddNewListing),
    fork(VehicleSaga),
    fork(InviteDrivers),
    fork(RateDrivers),
    fork(TokenSaga),
    fork(PaymentSaga),
    fork(BranchSaga),
    fork(AddReviewMember),
    fork(AgencyProfileSaga),
    fork(CompanyDetailsSaga),
    fork(DashboardListingSaga)
  ])
}


export default dataSaga;
