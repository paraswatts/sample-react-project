import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { AgencySignUpForm } from "./agencyForm"
import { DriverSignupForm } from './driverForm';
import "./style.scss";
import { useHistory } from "react-router-dom";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { geolocated } from "react-geolocated";
import Geocode from "react-geocode";
import { messaging } from "../../../../../init-fcm";
const { defaultConfig: { PLATFORM, LOCATION, GOOGLE_CLIENT_ID, FACEBOOK_APP_ID } } = require(`../../../../../config/default`);
const { FormWrapper } = require(`../../../../../components/${PLATFORM}/hoc/form-wrapper`);
const { SnackbarWrapper } = require(`../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`);
const {
    LABELS,
    ROUTES,
    PAGE_TITLES,
    USER_ROLES,
    LOGIN_TYPES,
    FACEBOOK_ICON,
    PASSWORD_HIDE_ICON,
    PASSWORD_EYE
} = require(`../../../../../shared/${PLATFORM}/constants`);
const { TAB_VALUES, USER_TABS } = require(`../../../../../shared/${PLATFORM}/constants`)
const { CustomTabs } = require(`../../../../../components/${PLATFORM}/atoms/tab-drawer`);
const { STRINGS } = require(`../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`)

const SignScreen = ({
    register_User,
    stopLoader,
    socialMediaLogin,
    savePlatform,
    platformType,
    coords,
    setCurrentLocation
}) => {

    let history = useHistory();
    const [credentials, setCredentials] = useState({ name: '', phoneKey: '', surname: '', city: '', country: '', phoneNumber: '', email: '', password: '', reenter_password: '' })
    let [startDate, setStartDate] = useState(null)
    const [tabValue, setTabValue] = useState(TAB_VALUES.driverTab)
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });
    const [subscribe, setSubscribe] = useState(false)
    const [FcmToken, setFcmToken] = useState("")
    const [coordinate, setCoordinate] = useState({ lat: '', lon: '' })
    useEffect(() => {
        if (window.navigator.onLine === false) {
            setSnackBarData({
                variant: 'error',
                message: STRINGS.NO_INTERNET
            });
            setOpenSnackbar(true)
        }
    }, [window.navigator.onLine]);
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
        if (coords && coords.latitude) {
            setCoordinate({ lat: coords.latitude, lon: coords.longitude })
        }
    }, [coords])

    const responseFacebook = (response) => {
        const { name, email, userID } = response
        socialMediaLogin({
            email, name, socialId: userID, loginType: LOGIN_TYPES.FACEBOOK,
            deviceToken: FcmToken === "" ? "FcmToken" : FcmToken, userType: tabValue === 0 ? USER_ROLES.DRIVER : USER_ROLES.AGENCY
        },
            () => {
                setLocation()
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
                setLocation()
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

    const setLocation = () => {
        if (coordinate.lat !== '') {
            Geocode.setApiKey("AIzaSyCwe-4k_nGXdLcNt9YcIy0WeJzlL1Ot77k");
            (Geocode.fromLatLng(coordinate.lat, coordinate.lon).then(
                response => {
                    const add = response.results[0].formatted_address !== '' ? response.results[1].formatted_address : response.results[1].formatted_address;
                    setCurrentLocation(add)
                },
                error => {
                    console.error(error);
                }
            ))
        }
    }
    return (<React.Fragment>

        <title>{PAGE_TITLES.register}</title>


        <div className={'login_signup_sec pt-4 py-4 pt-md-5'}>

            <div className={'container'}>
                <div className="form-wrap">
                    <div className="login-info text-center">
                        <h4>{LABELS.signUpHeading}<br />{LABELS.signUpSubHeading}</h4>
                        <h6>{LABELS.signUpSubSubHeading}</h6>
                    </div>
                </div>

                <div className="form-grid d-flex flex-column flex-md-row">
                    <ul className="sidebar_tab">
                        <li className="active"><a onClick={
                            () => {
                                history.push(ROUTES.REGISTER)
                            }
                        }>{LABELS.iMNew}</a></li>
                        <li><a onClick={() => {
                            history.push(ROUTES.LOGIN)
                        }}>{LABELS.login}</a></li>
                    </ul>

                    <FormWrapper>
                        <div className="form-box">
                            <CustomTabs
                                tabsItems={USER_TABS}
                                value={tabValue}
                                handleTabChange={(newValue) => {
                                    setTabValue(newValue);
                                    savePlatform(newValue === 0 ? USER_ROLES.DRIVER : USER_ROLES.AGENCY)
                                }} />
                            {tabValue === TAB_VALUES.driverTab ?
                                <DriverSignupForm
                                    passwordEyeIcon={PASSWORD_EYE}
                                    passwordHIdeIcon={PASSWORD_HIDE_ICON}
                                    type={platformType}
                                    onSubmit={(credentials) => {
                                        let ptempPhoneKey = (credentials.phoneKey && credentials.phoneKey.label && 
                                            credentials.phoneKey.label).replace(/\s/g, '')
                                        let postData = {
                                            name: credentials.name,
                                            surname: credentials.surname,
                                            dob: new Date(credentials.dob).getTime(),
                                            email: credentials.email,
                                            password: credentials.password,
                                            city: credentials.city,
                                            country: credentials.country && credentials.country.value,
                                            userType: platformType,
                                            subscribe: credentials.subscribe ? credentials.subscribe : false,
                                            phoneNumber: { code: ptempPhoneKey, phone: credentials.phoneNumber },
                                        }
                                        register_User(postData, (response) => {
                                            setSnackBarData({
                                                variant: response.status ? 'success' : 'error',
                                                message: response.msg || 'error'
                                            });
                                            setOpenSnackbar(true)
                                            setTimeout(() => { history.replace(ROUTES.LOGIN) }, 800)
                                        }, (response) => {
                                            setSnackBarData({
                                                variant: response.status ? 'success' : 'error',
                                                message: response.msg || 'error'
                                            });
                                            setOpenSnackbar(true)
                                        },
                                        );
                                    }}
                                    credentials={credentials}
                                    onChangeFieldValues={(field, value) => {
                                        setCredentials({ ...credentials, field: value })
                                    }}
                                    setStartDate={setStartDate}
                                    startDate={startDate}
                                    subscribe={subscribe}
                                    setSubscribe={setSubscribe}
                                >
                                    <span className="or-txt d-block text-center">{LABELS.orConnectWith}</span>
                                    <SnackbarWrapper
                                        visible={openSnackBar}
                                        onClose={() => setOpenSnackbar(false)}
                                        variant={snackbarData.variant}
                                        message={snackbarData.message}
                                    />
                                    <div className="social_login">
                                        <GoogleLogin
                                            clientId={GOOGLE_CLIENT_ID}
                                            onSuccess={responseGoogle}
                                            className='btn google-btn'
                                            buttonText={"Login with Google"}
                                        ></GoogleLogin >
                                        <FacebookLogin
                                            appId={FACEBOOK_APP_ID}
                                            autoLoad={false}
                                            fields="name,email,picture"
                                            callback={responseFacebook}
                                            icon={
                                                <i className="mr-2"><img src={FACEBOOK_ICON} alt="Facebook" className="img-fluid" width="22px" /></i>
                                            }
                                            cssClass='btn facebook-btn'
                                            disableMobileRedirect={true}
                                        />
                                    </div>
                                    <hr />
                                </DriverSignupForm>
                                :
                                <AgencySignUpForm
                                    passwordEyeIcon={PASSWORD_EYE}
                                    passwordHIdeIcon={PASSWORD_HIDE_ICON}
                                    type={platformType}
                                    onSubmit={(credentials) => {
                                        const { companyName, name, surname, city, phoneNumber, email, password, phoneKey, subscribe } = credentials;
                                        let postData = {
                                            companyName,
                                            email,
                                            password,
                                            name,
                                            surname,
                                            city,
                                            country: credentials.country && credentials.country.value,
                                            phoneNumber: { code: phoneKey && phoneKey.value, phone: phoneNumber },
                                            subscribe: subscribe ? subscribe : false,
                                        }
                                        register_User(postData, (response) => {
                                            setSnackBarData({
                                                variant: response.status ? 'success' : 'error',
                                                message: response.msg || 'error'
                                            });
                                            setOpenSnackbar(true)
                                            setTimeout(() => { history.replace(ROUTES.LOGIN) }, 800)
                                        }, (response) => {
                                            setSnackBarData({
                                                variant: response.status ? 'success' : 'error',
                                                message: response.msg || 'error'
                                            });
                                            setOpenSnackbar(true)
                                        },
                                        );
                                    }}
                                    credentials={credentials}
                                    onChangeFieldValues={(field, value) => {
                                        setCredentials({ ...credentials, field: value })
                                    }} >
                                    <span className="or-txt d-block text-center">{LABELS.orConnectWith}</span>
                                    <SnackbarWrapper
                                        visible={openSnackBar}
                                        onClose={() => setOpenSnackbar(false)}
                                        variant={snackbarData.variant}
                                        message={snackbarData.message}
                                    />
                                    <div className="social_login">
                                        <GoogleLogin
                                            clientId="820009158374-n1kbhddokivjk1ome2et3an836jkavfl.apps.googleusercontent.com"
                                            buttonText="Sign Up with Google"
                                            onSuccess={responseGoogle}
                                            className='btn google-btn'
                                            // onFailure={responseGoogle}
                                            buttonText={"Login with Google"}
                                        ></GoogleLogin >
                                        <FacebookLogin
                                            appId="250843499427866"
                                            autoLoad={false}
                                            fields="name,email,picture"
                                            callback={responseFacebook}
                                            icon={
                                                <i className="mr-2"><img src={FACEBOOK_ICON} alt="Facebook" className="img-fluid" width="22px" /></i>
                                            }
                                            cssClass='btn facebook-btn'
                                            disableMobileRedirect={true}
                                        />
                                    </div>
                                    <hr />
                                </AgencySignUpForm>
                            }
                        </div>
                    </FormWrapper>
                </div>
            </div>
        </div>
    </React.Fragment >)
}

export const Screen = geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(SignScreen);