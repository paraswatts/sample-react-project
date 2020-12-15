import React, { useEffect, useState } from 'react';
import {
  Route,
  Switch,
  Redirect,
  useHistory
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
const { defaultConfig: { PLATFORM, LOCATION, VERSION } } = require(`../../../../config/default`);
const { STRINGS } = require(`../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`);
const { DecisionPopup } = require(`../../../../components/${PLATFORM}/atoms/decision-popup`);
const { ScreenHOC } = require(`../../../../components/${PLATFORM}/hoc/screen-hoc`);
const { HomeScreen } = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/home`);
const { styles } = require(`../../../../theme/${PLATFORM}`);
const {
  SUB_ADMIN_DRAWER_ITEMS,
  HAMBURGER_ICON,
  HEADER_LOGO,
  CLOSE_ICON,
  ROUTES,
  HEADER_PROFILE_ITEMS
} = require(`../../../../shared/${PLATFORM}/constants`);
const {
  setAuthorization,
  stopLoader,
  logout
} = require(`../../../../redux/${PLATFORM}/actions`);
const { SnackbarWrapper } = require(`../../../../components/${PLATFORM}/molecules/snackbar-wrapper`)
const AuthenticatedRouter = (props) => {
  const { classes, setAuthorization, userToken, logout } = props;
  const [popupVisible, setPopVisible] = useState(false);
  let history = useHistory();
  const [openSnackBar, setOpenSnackbar] = useState(false);
  const [snackbarData, setSnackBarData] = useState({
    variant: '',
    message: ''
  });
  return (
    <div>
      <SnackbarWrapper
        visible={openSnackBar}
        onClose={() => setOpenSnackbar(false)}
        variant={snackbarData.variant}
        message={snackbarData.message}
      />
      <ScreenHOC
        containerStyle={classes.screenHocContainer}
        childrenStyle={classes.screenContentContainer}
        drawerItems={SUB_ADMIN_DRAWER_ITEMS}
        headerMenuItem={HEADER_PROFILE_ITEMS}
        onClickAction={(changedUrl) => {
          if (changedUrl === ROUTES.LOGOUT) {
            setPopVisible(true);
          }
          else {
            history.push(changedUrl);
          }
        }}
        hamburgerIcon={HAMBURGER_ICON}
        headerLogo={HEADER_LOGO}
        headerLogoAction={() => {
          history.replace(ROUTES.DASHBOARD)
        }}
        backArrow={CLOSE_ICON}
      >
        <DecisionPopup
          modalVisibility={popupVisible}
          dialogContent={STRINGS.LOGOUT_CONTENT}
          dialogTitle={STRINGS.LOGOUT}
          confirmButtonTitle={STRINGS.CONFIRM}
          rejectButtonTitle={STRINGS.CANCEL}
          toggleDialogModal={() => setPopVisible(!popupVisible)}
          onConfirmation={() => {
            logout(userToken, () => {
              setPopVisible(false)
              return <Redirect to={ROUTES.LOGIN} />
            }, (response) => {

              // setSnackBarData({
              //   variant: response.status ? 'success' : 'error',
              //   message: response.msg
              // });
              // setOpenSnackbar(true)
            }
            );
          }}
          onRejection={() => setPopVisible(false)}
        />
        <Switch>
          <Route exact path={`${ROUTES.DASHBOARD}`} component={HomeScreen} />
          <Redirect to={ROUTES.DASHBOARD} />
        </Switch>
      </ScreenHOC>
    </div>
  );
}

const mapStateToProps = (state) => {
  return ({
    userToken: state.CommonReducer.userToken,
  });
}
const mapDispatchToProps = (dispatch) => {
  return {
    setAuthorization: (userData) => dispatch(setAuthorization(userData)),
    stopLoader: () => dispatch(stopLoader()),
    logout: (token, success, failure) => {
      dispatch(logout(token, success, failure))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AuthenticatedRouter));