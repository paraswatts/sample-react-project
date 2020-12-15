import { combineReducers } from "redux";
import CommonReducer from './common';
import DriverReducer from './driver'
import { reducer as formReducer } from "redux-form";
import AgencyDashboardReducer from './agency-dashboard';
import AddNewListingReducer from './add-new-listing';
import RateDriverReducer from './rate-driver';
import InviteDriverReducer from './invite-driver';
import TokenReducer from './token';
import PaymentReducer from './payment';
import BranchReducer from './branch';
import VehicleReducer from './vehicle';
import AgencyReviewMemberReducer from './agency-review-member';
import DashboardListingReducer from './dashboard-listing';
import AgencyProfileReducer from './agency-profile';

const rootReducer = combineReducers({
    CommonReducer,
    form: formReducer,
    DriverReducer,
    AgencyDashboardReducer,
    AddNewListingReducer,
    RateDriverReducer,
    InviteDriverReducer,
    TokenReducer,
    PaymentReducer,
    BranchReducer,
    VehicleReducer,
    AgencyReviewMemberReducer,
    DashboardListingReducer,
    AgencyProfileReducer
});

export default rootReducer;