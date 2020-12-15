import React, { useState, useEffect } from "react";
import { ForgotReduxForm } from './form';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import "./style.scss";
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../config/default`);
const { SnackbarWrapper } = require(`../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`);
const { FormWrapper } = require(`../../../../../components/${PLATFORM}/hoc/form-wrapper`);
const { InputSubmit } = require(`../../../../../components/${PLATFORM}/atoms/input-submit`);
const { STRINGS } = require(`../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`);
const {
    LABELS,
    ROUTES,
    PAGE_TITLES,
    EMAIL_ICON
} = require(`../../../../../shared/${PLATFORM}/constants`);


export const Screen = ({
    sendForgotEmail,
    stopLoader,
    history,
    saveEmail,
    userEmail
}) => {

    const [emailSent, setEmailSent] = useState(false);
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    })
    useEffect(() => {
        if (window.navigator.onLine === false) {
            stopLoader()
            setSnackBarData({
                variant: 'error',
                message: STRINGS.NO_INTERNET
            });
            setOpenSnackbar(true)
        }
    }, [window.navigator.onLine === false]);
    return (
        <React.Fragment>
            <Helmet>
                <title>{PAGE_TITLES.forgot}</title>
            </Helmet>

            <div className={'login_signup_sec pt-4 py-4 pt-md-5'}>

                {
                    !emailSent ? <div className={'container'}>
                        <div className="form-wrap">
                            <div className="login-info text-center my-4">
                                <h4>Forgot Password</h4>
                                <p>We will email you a link to reset your password.</p>
                            </div>
                            <div className="form-grid d-flex flex-column">
                                <FormWrapper formWrapperStyle='forget-screen'>
                                    <SnackbarWrapper
                                        visible={openSnackBar}
                                        onClose={() => setOpenSnackbar(false)}
                                        variant={snackbarData.variant}
                                        message={snackbarData.message}
                                    />
                                    <div className="form-box">
                                        {!emailSent && <ForgotReduxForm onSubmit={(credentials) => {
                                            sendForgotEmail({
                                                email: credentials.email,
                                            }, (response) => {
                                                setEmailSent(true);
                                                saveEmail(credentials.email);
                                            }, (response) => {
                                                setSnackBarData({
                                                    variant: response.status ? 'success' : 'error',
                                                    message: response.msg
                                                });
                                                setOpenSnackbar(true)
                                            });
                                        }} />}
                                    </div>
                                    <div className="text-center mt-4">
                                        <a className="btn btn-md btn-outline-primary back-btn submit"
                                            onClick={
                                                () => {
                                                    history.goBack();
                                                }}
                                        >Back to Login</a>
                                    </div>
                                </FormWrapper>
                            </div>
                        </div>
                    </div> :
                        <div className={'container'}>
                            <div className="email_verification text-center">
                                <SnackbarWrapper
                                    visible={openSnackBar}
                                    onClose={() => setOpenSnackbar(false)}
                                    variant={snackbarData.variant}
                                    message={snackbarData.message}
                                />
                                <i><img src={EMAIL_ICON} alt="" width="80px" className="img-fluid" /></i>
                                <h3 className="mt-4 mt-md-4 mb-3 mb-md-3">Check your mail!</h3>
                                <p>{STRINGS.EMAIL_RESPONSE_MESSAGE}</p>
                                <button className="btn btn-lg btn-secondary my-4"
                                    onClick={() => {
                                        history.replace(ROUTES.LOGIN);
                                    }}
                                >Login</button>
                                <span className="ver_link">Didn’t receive the link? <a
                                    onClick={() => {
                                        sendForgotEmail({
                                            email: userEmail,
                                        }, (response) => {
                                            setOpenSnackbar(true)
                                            setSnackBarData({
                                                variant: response.status ? 'success' : 'error',
                                                message: response.msg
                                            });
                                            setEmailSent(true);
                                            saveEmail(userEmail);
                                        }, (response) => {
                                            setSnackBarData({
                                                variant: response.status ? 'success' : 'error',
                                                message: response.msg
                                            });
                                            setOpenSnackbar(true)
                                        });
                                    }}
                                >Resend</a></span>
                            </div>

                        </div>}
            </div>
        </React.Fragment>
    );
}