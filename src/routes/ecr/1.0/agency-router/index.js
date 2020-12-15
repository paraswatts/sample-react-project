import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
const {
  defaultConfig: { PLATFORM, LOCATION, VERSION },
} = require(`../../../../config/default`);
const {
  Payment,
} = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/agency-views/payment`);
const {
  STRINGS,
} = require(`../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`);
const {
  DecisionPopup,
} = require(`../../../../components/${PLATFORM}/atoms/decision-popup`);
const {
  ScreenHOC,
} = require(`../../../../components/${PLATFORM}/hoc/screen-hoc`);
const {
  HomeScreen,
} = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/agency-views/home`);
const {
  VehicleScreen,
} = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/agency-views/vehicles`);
const { styles } = require(`../../../../theme/${PLATFORM}`);
const {
  AppHeader,
} = require(`../../../../components/${PLATFORM}/atoms/agency-header`);
const {
  DriverRating,
} = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/agency-views/driver-rating`);
const {
  TokenScreen,
} = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/agency-views/token`);
const {
  BranchScreen,
} = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/agency-views/branch`);
const {
  EditBranchScreen,
} = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/agency-views/edit-branch`);
const {
  EmailOptions,
} = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/agency-views/email-option`);
const {
  InviteDriver,
} = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/agency-views/invite-drivers`);
const {
  ViewListing,
} = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/agency-views/view-listing/screen`);
const {
  Contact,
} = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/agency-views/contact`);
const {
  Billing,
} = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/agency-views/billing`);
const {
  Statement,
} = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/agency-views/statement`);
const {
  TermsComponent,
} = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/terms&conditions`);
const {
  DashboardListingScreen,
} = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/agency-views/dashboard-listing`);
const {
  EditVehicleScreen,
} = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/agency-views/edit-vehicle`);
const {
  AgencyProfile,
} = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/agency-views/agency-profile`);
const {
  AgencyRating
} = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/agency-views/agency-ratings`);

const {
  AGENCY_DRAWER_ITEMS_ACCOUNT_SETTING,
  HAMBURGER_ICON,
  HEADER_LOGO,
  CLOSE_ICON,
  ROUTES,
  HEADER_PROFILE_ITEMS,
  USER_ROLES,
  MEMBER_DRAWER_ITEMS_ACCOUNT_SETTING,
  LOGO_ICON,
  ACCOUNT_ICON,
  AGENCY_SIDE_HEADER_ICON
} = require(`../../../../shared/${PLATFORM}/constants`);
const {
  AddNewList,
} = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/agency-views/add-new-list`);
const {
  setAuthorization,
  stopLoader,
  logout,
  saveStepNo,
  setFormStep1Data,
  setFormStep2Data,
  setFormStep3Data,
  getToken,
  clearVehiclesImages,
} = require(`../../../../redux/${PLATFORM}/actions`);
const {
  InsuranceScreen,
} = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/agency-views/insurance`);
const {
  EditInsuranceScreen,
} = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/agency-views/insurance/edit-insurance/screen.js`);
const {
  SnackbarWrapper,
} = require(`../../../../components/${PLATFORM}/molecules/snackbar-wrapper`);
const {
  CompanyDetails,
} = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/agency-views/company-details`);
const {
  PageViews,
} = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/agency-views/home/page-views.js`);

const AuthenticatedRouter = (props) => {
  const {
    classes,
    setAuthorization,
    userToken,
    logout,
    totalToken,
    anyUpdate,
    packageId,
    role,
    newListId,
    agencyData,
    clearVehiclesImages,
  } = props;
  const [popupVisible, setPopVisible] = useState(false);
  let history = useHistory();
  const [openSnackBar, setOpenSnackbar] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(true);

  const [snackbarData, setSnackBarData] = useState({
    variant: "",
    message: "",
  });

  useEffect(() => {
    if (window.navigator.onLine === false) {
      setSnackBarData({
        variant: "error",
        message: STRINGS.NO_INTERNET,
      });
      setOpenSnackbar(true);
    }
    getToken();
  }, [window.navigator.onLine]);

  useEffect(() => {
    if (anyUpdate) {
      getToken();
    }
  }, [anyUpdate]);
  const toggleDrawerFunction = () => {
    setDrawerVisible(!drawerVisible);
  };
  useEffect(() => {
    // if (history.location.pathname === ROUTES.COMPANY_DETAILS) {
    //     console.log("called useEffect");
    //     clearVehiclesImages()
    // }
    getToken();
  }, [history.location.pathname, packageId]);

  return (
    <>
      <AppHeader
        companyLogo={AGENCY_SIDE_HEADER_ICON}
        accountIcon={ACCOUNT_ICON}
        hamburgerIcon={HAMBURGER_ICON}
        accountIcon={ACCOUNT_ICON}
        agencyLogo={agencyData}
        history={history}
        ROUTES={ROUTES}
        props={props}
        onClickAction={() => {
          setPopVisible(true);
        }}
        toggleDrawer={toggleDrawerFunction}
      />
      <SnackbarWrapper
        visible={openSnackBar}
        onClose={() => setOpenSnackbar(false)}
        variant={snackbarData.variant}
        message={snackbarData.message}
      />
      <DecisionPopup
        modalVisibility={popupVisible}
        dialogContent={STRINGS.LOGOUT_CONTENT}
        dialogTitle={STRINGS.LOGOUT}
        confirmButtonTitle={STRINGS.CONFIRM}
        rejectButtonTitle={STRINGS.CANCEL}
        toggleDialogModal={() => setPopVisible(!popupVisible)}
        onConfirmation={() => {
          logout(
            userToken,
            () => {
              setPopVisible(false);
              return <Redirect to={ROUTES.LOGIN} />;
            },
            (response) => {
              setSnackBarData({
                variant: response.status ? "success" : "error",
                message: response.msg,
              });
              setOpenSnackbar(true);
            }
          );
        }}
        onRejection={() => setPopVisible(false)}
      />
      <Route path={ROUTES.TERMS} component={TermsComponent} />
      {!(history.location.pathname == ROUTES.TERMS) && (
        <ScreenHOC
          drawerVisible={drawerVisible}
          companyLogo={LOGO_ICON}
          setDrawerVisible={(value) => {
            setDrawerVisible(value);
          }}
          containerStyle={classes.screenHocContainer}
          childrenStyle={classes.screenContentContainer}
          onAddNewListing={() => {
            props.saveStepNo(1);
            props.setFormStep1Data({});
            props.setFormStep2Data({});
            props.setFormStep3Data({});
          }}
          USER_ROLES={USER_ROLES}
          drawerItems={
            !!(role === USER_ROLES.AGENCY)
              ? AGENCY_DRAWER_ITEMS_ACCOUNT_SETTING
              : MEMBER_DRAWER_ITEMS_ACCOUNT_SETTING
          }
          role={role}
          headerMenuItem={HEADER_PROFILE_ITEMS}
          ROUTES={ROUTES}
          totalToken={totalToken}
          onClickAction={(changedUrl) => {
            if (changedUrl === ROUTES.LOGOUT) {
              setPopVisible(true);
            } else {
              history.push(changedUrl);
            }
          }}
          hamburgerIcon={HAMBURGER_ICON}
          headerLogo={HEADER_LOGO}
          headerLogoAction={() => {
            history.replace(ROUTES.DASHBOARD);
          }}
          backArrow={CLOSE_ICON}
        >
          <Switch>
            <Route exact path={`${ROUTES.DASHBOARD}`} component={HomeScreen} />
            <Route
              exact
              path={`${ROUTES.DRIVER_RATING}`}
              component={DriverRating}
            />
            <Route
              exact
              path={`${ROUTES.RATINGS}`}
              component={AgencyRating}
            />
            <Route
              exact
              path={`${ROUTES.COPY_LISTING}`}
              component={AddNewList}
            />
            <Route
              exact
              path={`${ROUTES.EDIT_LISTING}`}
              component={AddNewList}
            />
            <Route
              exact
              path={`${ROUTES.ADD_NEW_LIST}`}
              component={AddNewList}
            />
            <Route
              path={`${ROUTES.AGENCY_PROFILE}`}
              component={AgencyProfile}
            />
            <Route
              exact
              path={`${ROUTES.GET_INSURANCE}`}
              component={EditInsuranceScreen}
            />
            <Route exact path={`${ROUTES.PAGEVIEWS}`} component={PageViews} />
            {newListId && (
              <Route
                exact
                path={`${ROUTES.INVITE_DRIVER}`}
                component={InviteDriver}
              />
            )}

            <Route
              path={`${ROUTES.DASHBOARD_LIST}`}
              component={DashboardListingScreen}
            />

            <Route
              exact
              path={`${ROUTES.VIEW_LISTING}`}
              component={ViewListing}
            />
            {!!(role === USER_ROLES.AGENCY) && (
              <Route path={`${ROUTES.TOKEN}`} component={TokenScreen} />
            )}
            {!!(role === USER_ROLES.AGENCY) && (
              <Route
                path={`${ROUTES.EDIT_VEHICLE}`}
                component={EditVehicleScreen}
              />
            )}
            {!!(role === USER_ROLES.AGENCY) && (
              <Route
                path={`${ROUTES.EDIT_BRANCH}`}
                component={EditBranchScreen}
              />
            )}

            {!!(role === USER_ROLES.AGENCY) && (
              <Route
                exact
                path={`${ROUTES.COMPANY_DETAILS}`}
                component={CompanyDetails}
              />
            )}
            {!!(role === USER_ROLES.AGENCY) && (
              <Route
                exact
                path={`${ROUTES.VEHICLE}`}
                component={VehicleScreen}
              />
            )}
            {!!(role === USER_ROLES.AGENCY) && (
              <Route
                exact
                path={`${ROUTES.INSURANCE}`}
                component={InsuranceScreen}
              />
            )}
            {!!(role === USER_ROLES.AGENCY) && (
              <Route exact path={`${ROUTES.BRANCH}`} component={BranchScreen} />
            )}
            {!!(role === USER_ROLES.AGENCY) && (
              <Route
                exact
                path={`${ROUTES.EMAIL_OPTIONS}`}
                component={EmailOptions}
              />
            )}
            {!!(role === USER_ROLES.AGENCY) && (
              <Route exact path={`${ROUTES.CONTACT}`} component={Contact} />
            )}
            {/* {!!(role === USER_ROLES.AGENCY) && <Route exact path={`${ROUTES.BILLING}`} component={Billing} />
                    } */}
            {!!(role === USER_ROLES.AGENCY) && (
              <Route exact path={`${ROUTES.STATEMENT}`} component={Statement} />
            )}
            {!!(role === USER_ROLES.AGENCY) && !!packageId ? (
              <Route exact path={`${ROUTES.PAYMENT}`} component={Payment} />
            ) : (
                <Redirect to={ROUTES.DASHBOARD} />
              )}
            <Redirect to={ROUTES.DASHBOARD} />
          </Switch>
        </ScreenHOC>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    agencyData: state.CommonReducer.userData,
    newListId: state.AddNewListingReducer.newListingId,
    role: state.CommonReducer.role,
    packageId: state.TokenReducer.buyingTokenId,
    anyUpdate: state.AgencyDashboardReducer.anyUpdate,
    totalToken: state.TokenReducer.noOfToken,
    userToken: state.CommonReducer.userToken,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setAuthorization: (userData) => dispatch(setAuthorization(userData)),
    stopLoader: () => dispatch(stopLoader()),
    logout: (token, success, failure) =>
      dispatch(logout(token, success, failure)),
    saveStepNo: (no) => {
      dispatch(saveStepNo(no));
    },
    setFormStep1Data: (data) => {
      dispatch(setFormStep1Data(data));
    },
    setFormStep2Data: (data) => {
      dispatch(setFormStep2Data(data));
    },
    clearVehiclesImages: () => {
      dispatch(clearVehiclesImages());
    },
    setFormStep3Data: (data) => {
      dispatch(setFormStep3Data(data));
    },
    getToken: () => {
      dispatch(getToken());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AuthenticatedRouter));
