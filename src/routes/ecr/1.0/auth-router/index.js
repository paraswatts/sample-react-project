import React from 'react';
import {
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
const { defaultConfig: { PLATFORM, LOCATION, VERSION } } = require(`../../../../config/default`);
const { ROUTES, LOGO_ICON, ACCOUNT_ICON, HAMBURGER_ICON, OUTER_LOGO_ICON } = require(`../../../../shared/${PLATFORM}/constants`);
const { LoginScreen } = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/login`);
const { ForgotScreen } = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/forgot-password`);
const { SignupScreen } = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/sign-up`)
const { HomeScreen } = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/driver-views/home`);
const { AppHeader } = require(`../../../../components/${PLATFORM}/atoms/app-header`)
const { SearchVehicleList } = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/driver-views/search-vehicle-list`)
const { ViewVehicle } = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/driver-views/view-vehicle`);
const { FaqComponent } = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/faq`)
const { HowItWorkComponent } = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/how-it-works/screen.js`)

const AuthRouter = (props) => {
    let history = useHistory()

    return (
        <React.Fragment>
            <AppHeader
                companyLogo={OUTER_LOGO_ICON}
                accountIcon={ACCOUNT_ICON}
                hamburgerIcon={HAMBURGER_ICON}
                history={history} ROUTES={ROUTES} props={props} />
            <Switch>
                <Route path={ROUTES.REGISTER} render={() => { return <SignupScreen /> }} />
                <Route path={ROUTES.LOGIN} component={LoginScreen} />
                <Route path={ROUTES.FORGOT_PASSWORD} component={ForgotScreen} />
                <Route path={ROUTES.DASHBOARD} component={HomeScreen} {...props} />
                <Route path={ROUTES.SEARCH_VEHICLE_LIST} component={SearchVehicleList} {...props} />
                <Route path={ROUTES.VIEW_VEHICLE} component={ViewVehicle} {...props} />
                <Route path={ROUTES.FAQ} component={FaqComponent} />
                <Route path={ROUTES.HOW_IT_WORK} component={HowItWorkComponent} />
                <Redirect to={{
                    pathname: ROUTES.DASHBOARD,
                    state: { from: history.location.pathname }
                }} />
            </Switch>
        </React.Fragment>
    );
}

export default (AuthRouter);