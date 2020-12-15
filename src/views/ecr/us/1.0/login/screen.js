import React, { useState, useEffect } from "react";
import { LoginReduxForm } from './form';
import "./style.scss";
import GoogleLogin from 'react-google-login';
import { useHistory, useLocation } from "react-router-dom";
import FacebookLogin from 'react-facebook-login';
import { messaging } from "../../../../../init-fcm";

const { defaultConfig: { PLATFORM, LOCATION, GOOGLE_CLIENT_ID, FACEBOOK_APP_ID } } = require(`../../../../../config/default`);
const { FormWrapper } = require(`../../../../../components/${PLATFORM}/hoc/form-wrapper`);
const { SnackbarWrapper } = require(`../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`);
const {
    LABELS,
    ROUTES,
    PAGE_TITLES,
    REGENERATE_CAPCTHA,
    USER_ROLES,
    LOGIN_TYPES,
    FACEBOOK_ICON,
    PASSWORD_HIDE_ICON,
    PASSWORD_EYE
} = require(`../../../../../shared/${PLATFORM}/constants`);
const { STRINGS } = require(`../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`)
const { TAB_VALUES, USER_TABS, VALIDATION_MESSAGES } = require(`../../../../../shared/${PLATFORM}/constants`)
const { CustomTabs } = require(`../../../../../components/${PLATFORM}/atoms/tab-drawer`);
const { ScrollToTop } = require(`../../../../../components/${PLATFORM}/atoms/scroll-top`)

export const LogInScreen = ({ checkLogin,
    stopLoader,
    saveCaptcha,
    socialMediaLogin,
    savePlatform,
    platformType,
    captcha, previousLocation, vehicle }) => {

    const [FcmToken, setFcmToken] = useState("")


    useEffect(() => {
        setTabValue(platformType === USER_ROLES.DRIVER ? 0 : 1)
        setOpenSnackbar(false)
        let safariAgent = navigator.userAgent.indexOf("Safari") > -1;
        let chromeAgent = navigator.userAgent.indexOf("Chrome") > -1;

        if ((chromeAgent) && (safariAgent)) {
            safariAgent = false
        }
        if (!safariAgent) {
            messaging.requestPermission()
                .then(async function () {
                    const token = await messaging.getToken();
                    setFcmToken(token)
                }).catch(function (err) {
                    console.log("Unable to get permission to notify.", err);
                    setFcmToken("")
                });
        }
    }, [])

    useEffect(() => {
        if (window.navigator.onLine === false) {
            stopLoader()
            setSnackBarData({
                variant: 'error',
                message: STRINGS.NO_INTERNET
            });
            setOpenSnackbar(true)
        }
    }, [window.navigator.onLine]);
    let history = useHistory();
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });
    const [tabValue, setTabValue] = useState(TAB_VALUES.driverTab)
    const [credentials, setCredentials] = useState({ email: '', password: '', Captcha: '' });
    const responseFacebook = (response) => {
        const { name, email, userID } = response
        socialMediaLogin({
            email, name, socialId: userID, loginType: LOGIN_TYPES.FACEBOOK,
            deviceToken: FcmToken === "" ? "FcmToken" : FcmToken, userType: tabValue === 0 ? USER_ROLES.DRIVER : USER_ROLES.AGENCY
        },
            () => {

                if (previousLocation === ROUTES.DASHBOARD || previousLocation === ROUTES.SEARCH_VEHICLE_LIST ||
                    previousLocation === ROUTES.VIEW_VEHICLE || previousLocation === ROUTES.VEHICLE_SUMMARY) {
                    if (previousLocation === ROUTES.VIEW_VEHICLE) {
                        history.push(`${ROUTES.VIEW_VEHICLE}?id=${vehicle._id}`)
                    } else {
                        history.push(previousLocation)
                    }
                } else {
                    history.push(ROUTES.DASHBOARD)
                }
            },
            (response) => {

                setSnackBarData({
                    variant: response.status ? 'success' : 'error',
                    message: response.msg
                });
                setOpenSnackbar(true)
            }
        )
    }
    const responseGoogle = (response) => {
        const { name, email, googleId } = response.profileObj
        socialMediaLogin({ email, name, socialId: googleId, loginType: LOGIN_TYPES.GOOGLE, deviceToken: FcmToken === "" ? "FcmToken" : FcmToken, userType: tabValue === 0 ? USER_ROLES.DRIVER : USER_ROLES.AGENCY },
            () => {
                if (previousLocation === ROUTES.DASHBOARD || previousLocation === ROUTES.SEARCH_VEHICLE_LIST ||
                    previousLocation === ROUTES.VIEW_VEHICLE || previousLocation === ROUTES.VEHICLE_SUMMARY) {
                    if (previousLocation === ROUTES.VIEW_VEHICLE) {
                        history.push(`${ROUTES.VIEW_VEHICLE}?id=${vehicle._id}`)
                    } else {
                        history.push(previousLocation)
                    }
                } else {
                    history.push(ROUTES.DASHBOARD)
                }
            },
            (response) => {

                setSnackBarData({
                    variant: response.status ? 'success' : 'error',
                    message: response.msg
                });
                setOpenSnackbar(true)
            }
        )
    }

    return (
        <>
            <ScrollToTop />
            <React.Fragment>
                <title>{PAGE_TITLES.login}</title>
                <div className={'login_signup_sec pt-4 py-4 pt-md-5'}>
                    <div className={'container'}>
                        <div className="form-wrap">
                            <div className="login-info text-center mb-3">
                                <h4 className="mb-4">{LABELS.register}</h4>
                            </div>
                            <div className="form-grid d-flex flex-column flex-md-row">
                                <ul className="sidebar_tab">
                                    <li><a onClick={() => {
                                        history.push(ROUTES.REGISTER)
                                    }}>{LABELS.iMNew}</a></li>
                                    <li className="active"><a onClick={() => {
                                        history.push(ROUTES.LOGIN)
                                    }}>{LABELS.login}</a></li>
                                </ul>
                                <FormWrapper>
                                    <div className="form-box">
                                        <SnackbarWrapper
                                            visible={openSnackBar}
                                            onClose={() => setOpenSnackbar(false)}
                                            variant={snackbarData.variant}
                                            message={snackbarData.message}
                                        />
                                        <CustomTabs
                                            tabsItems={USER_TABS}
                                            value={tabValue}
                                            handleTabChange={(newValue) => {
                                                setTabValue(newValue);
                                                savePlatform(newValue === 0 ? USER_ROLES.DRIVER : USER_ROLES.AGENCY)
                                            }} />
                                        <LoginReduxForm
                                            passwordHideIcon={PASSWORD_HIDE_ICON}
                                            passwordEyeIcon={PASSWORD_EYE}
                                            onSubmit={(credentials) => {
                                                if (credentials.Captcha != captcha) {
                                                    setSnackBarData({
                                                        variant: 'error',
                                                        message: VALIDATION_MESSAGES.INVALID_CAPTCHA
                                                    });
                                                    setOpenSnackbar(true)
                                                }
                                                else {
                                                    checkLogin({
                                                        email: credentials.email,
                                                        password: credentials.password,
                                                        deviceToken: FcmToken === "" ? "FcmToken" : FcmToken,
                                                        userType: tabValue === 0 ? USER_ROLES.DRIVER : USER_ROLES.AGENCY
                                                    }, () => {
                                                        stopLoader();

                                                        if (previousLocation === ROUTES.DASHBOARD || previousLocation === ROUTES.SEARCH_VEHICLE_LIST ||
                                                            previousLocation === ROUTES.VIEW_VEHICLE || previousLocation === ROUTES.VEHICLE_SUMMARY) {
                                                            if (previousLocation === ROUTES.VIEW_VEHICLE) {
                                                                history.push(`${ROUTES.VIEW_VEHICLE}?id=${vehicle._id}`)
                                                            } else {
                                                                history.push(previousLocation)
                                                            }
                                                        } else {
                                                            history.push(ROUTES.DASHBOARD)
                                                        }

                                                    },
                                                        (response) => {
                                                            setSnackBarData({
                                                                variant: response.status ? 'success' : 'error',
                                                                message: response.msg
                                                            });
                                                            setOpenSnackbar(true)
                                                        });
                                                }
                                            }}
                                            saveCaptcha={saveCaptcha}
                                            REGENERATE_CAPCTHA={REGENERATE_CAPCTHA}
                                            credentials={credentials}
                                            onEmailChange={(value) => setCredentials({
                                                ...credentials,
                                                email: value
                                            })}
                                            onPasswordChange={(value) => setCredentials({
                                                ...credentials,
                                                password: value
                                            })}
                                            type={tabValue}
                                        >
                                            <span className="or-txt d-block text-center">{LABELS.orConnectWith}</span>
                                            <div className="social_login">
                                                <GoogleLogin
                                                    clientId={GOOGLE_CLIENT_ID}
                                                    buttonText="Login with Google"
                                                    onSuccess={responseGoogle}
                                                    className='btn google-btn'
                                                ></GoogleLogin >
                                                <FacebookLogin
                                                    appId={FACEBOOK_APP_ID}
                                                    autoLoad={false}
                                                    fields="name,email,picture"
                                                    callback={responseFacebook}
                                                    disableMobileRedirect={true}
                                                    icon={
                                                        <i className="mr-2"><img src={FACEBOOK_ICON} alt="Facebook" className="img-fluid" width="22px" /></i>
                                                    }
                                                    cssClass='btn facebook-btn'
                                                    disableMobileRedirect={true}
                                                />
                                            </div>
                                            <hr />
                                        </LoginReduxForm>
                                    </div>
                                    <ul className="d-flex flex-wrap forgot_txt justify-content-center">
                                        <li onClick={() => {
                                            history.push(ROUTES.FORGOT_PASSWORD)
                                        }}><a>{LABELS.forgotPassword}</a></li>
                                    </ul>
                                </FormWrapper>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        </>
    );
}

export const Screen = (LogInScreen);