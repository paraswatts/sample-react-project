import React, { useState, useEffect } from 'react';
import {
    Route,
    Switch,
    Redirect,
    useHistory
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
const { defaultConfig: { PLATFORM, LOCATION, VERSION } } = require(`../../../../config/default`);
const { HomeScreen } = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/driver-views/home`);
const { SearchVehicleList } = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/driver-views/search-vehicle-list`)
const { styles } = require(`../../../../theme/${PLATFORM}`);
const {
    stopLoader,
    logout
} = require(`../../../../redux/${PLATFORM}/actions`);
const { AppHeader } = require(`../../../../components/${PLATFORM}/atoms/app-header`)
const { DriverDrawer } = require(`../../../../components/${PLATFORM}/atoms/driver-drawer`);
const { ROUTES, DRIVER_DRAWER_ITEMS, CLOSE_ICON, ALT_TEXTS, LOGO_ICON, ACCOUNT_ICON, HAMBURGER_ICON,OUTER_LOGO_ICON } = require(`../../../../shared/${PLATFORM}/constants`);
const { DecisionPopup } = require(`../../../../components/${PLATFORM}/atoms/decision-popup`);
const { STRINGS } = require(`../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`);
const { SnackbarWrapper } = require(`../../../../components/${PLATFORM}/molecules/snackbar-wrapper`)
const { ViewVehicle } = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/driver-views/view-vehicle`);
const { VehicleSummary } = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/driver-views/vehicle-summary`)
const { SuccessfulBooking } = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/driver-views/vehicle-book/screen.js`);
const { NotificationComponent } = require(`../../../../components/${PLATFORM}/atoms/push-notification`);
const { CheckNotification } = require(`../../../../components/${PLATFORM}/atoms/checkNotificationPermission`);

const { TermsComponent } = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/terms&conditions`)
const { FaqComponent } = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/faq`)
const { DriverProfile } = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/driver-views/profile-account/driver-profile`);
const { DriverRatings } = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/driver-views/profile-account/driver-ratings`);
const { DriverTrips } = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/driver-views/profile-account/driver-trips`);
const { HowItWorkComponent } = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/how-it-works/screen.js`)

const AuthenticatedRouter = (props) => {
    const { userToken, logout } = props;
    const [popupVisible, setPopVisible] = useState(false);
    let history = useHistory();
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });
    const [drawerVisible, setDrawerVisible] = useState(true);
    useEffect(() => {
        if (window.navigator.onLine === false) {
            setSnackBarData({
                variant: 'error',
                message: STRINGS.NO_INTERNET
            });
            setOpenSnackbar(true)
        }
    }, [window.navigator.onLine]);
    const toggleDrawerFunction = () => {
        setDrawerVisible(!drawerVisible)
    }
    return (
        <>
            <SnackbarWrapper
                visible={openSnackBar}
                onClose={() => setOpenSnackbar(false)}
                variant={snackbarData.variant}
                message={snackbarData.message}
            />

            <AppHeader
                companyLogo={OUTER_LOGO_ICON}
                accountIcon={ACCOUNT_ICON}
                hamburgerIcon={HAMBURGER_ICON}
                history={history} ROUTES={ROUTES} props={props} onClickAction={() => {
                    setPopVisible(true)
                }} drawerVisible={drawerVisible} toggleDrawer={toggleDrawerFunction} />
            <NotificationComponent />
            <CheckNotification />
            <DecisionPopup
                modalVisibility={popupVisible}
                dialogContent={history.location.pathname === ROUTES.VEHICLE_SUMMARY ? STRINGS.DATA_LOST_CONTENT : STRINGS.LOGOUT_CONTENT}
                dialogTitle={STRINGS.LOGOUT}
                confirmButtonTitle={STRINGS.CONFIRM}
                rejectButtonTitle={STRINGS.CANCEL}
                toggleDialogModal={() => setPopVisible(!popupVisible)}
                onConfirmation={() => {
                    logout(userToken, () => {
                        setPopVisible(false)
                        return <Redirect to={ROUTES.LOGIN} />
                    },
                        (response) => {
                            setSnackBarData({
                                variant: response.status ? 'success' : 'error',
                                message: response.msg
                            });
                            setOpenSnackbar(true)
                        }
                    );
                }}
                onRejection={() => setPopVisible(false)}
            />
            {(history.location.pathname === ROUTES.DRIVER_PROFILE || history.location.pathname === ROUTES.DRIVER_RATINGS
                || history.location.pathname === ROUTES.DRIVER_TRIPS) ?
                <DriverDrawer
                    drawerItems={DRIVER_DRAWER_ITEMS}
                    companyLogo={ALT_TEXTS.companyLogo}
                    drawerVisible={drawerVisible}
                    onClickAction={() => {
                        setPopVisible(true)
                        window.innerWidth < 767 && setDrawerVisible(false)
                    }}
                    toggleDrawer={toggleDrawerFunction}
                    backArrow={CLOSE_ICON}
                />
                : ''}
            <Switch>
                <Route path={ROUTES.DASHBOARD} component={HomeScreen} {...props} />
                <Route path={ROUTES.SEARCH_VEHICLE_LIST} component={SearchVehicleList} {...props} />
                <Route path={ROUTES.VIEW_VEHICLE} component={ViewVehicle} {...props} />
                <Route path={ROUTES.VEHICLE_SUMMARY} component={VehicleSummary} {...props} />
                <Route path={ROUTES.SUCCESSFUL_BOOKING} component={SuccessfulBooking} {...props} />
                <Route path={ROUTES.TERMS} component={TermsComponent} />
                <Route path={ROUTES.FAQ} component={FaqComponent} />
                <Route path={ROUTES.DRIVER_PROFILE} component={DriverProfile} />
                <Route path={ROUTES.DRIVER_RATINGS} component={DriverRatings} />
                <Route path={ROUTES.DRIVER_TRIPS} component={DriverTrips} />
                <Route path={ROUTES.HOW_IT_WORK} component={HowItWorkComponent} />
                <Redirect to={ROUTES.DASHBOARD} />
            </Switch>
        </>
    );
}

const mapStateToProps = (state) => {
    return ({
        userToken: state.CommonReducer.userToken,
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        stopLoader: () => dispatch(stopLoader()),
        logout: (token, success, failure) => dispatch(logout(token, success, failure))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AuthenticatedRouter));