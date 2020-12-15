import React, { useEffect, useState, useRef } from "react";
import { reduxForm, Field, reset, initialize } from "redux-form";
import './styles.scss';
import validator from "./validator";
const {
    defaultConfig: { PLATFORM, LOCATION },
} = require(`../../../../../config/default`);
const { CaptchaInput } = require(`../../../../../components/${PLATFORM}/atoms/captcha`);
const { Form } = require(`../../../../../components/${PLATFORM}/atoms/form`);
const { SnackbarWrapper } = require(`../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`);
const { LABELS } = require(`../../../../../shared/${PLATFORM}/constants`);
const { Input } = require(`../../../../../components/${PLATFORM}/atoms/input`);
const { onSubmitFail } = require(`../../../../../helpers/${PLATFORM}`);
const {
    STRINGS,
} = require(`../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`);
const { InputSubmit } = require(`../../../../../components/${PLATFORM}/atoms/input-submit`);

const WelcomeForm = (props) => {
    let [passwordVal, setPassword] = useState('')
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });
    const [openSnackBar, setOpenSnackbar] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault()
        props.startLoader()
        if (passwordVal !== '') {
            if (passwordVal === "Hireace2020") {
                props.welcomeShow()
                props.stopLoader()
            } else {
                props.stopLoader()
                setSnackBarData({
                    variant: 'error',
                    message: 'Password is incorrect.'
                });
                setOpenSnackbar(true)
            }
        }
        else {
            props.stopLoader()
            setSnackBarData({
                variant: 'error',
                message: 'Password is required.'
            });
            setOpenSnackbar(true)
        }
    }

    return (
        <>
            <SnackbarWrapper
                visible={openSnackBar}
                onClose={() => setOpenSnackbar(false)}
                variant={snackbarData.variant}
                message={snackbarData.message}
            />
            <Form onSubmit={onSubmit}>
                <Field
                    name={STRINGS.PASSWORD_INPUT_NAME}
                    component={Input}
                    placeholder={STRINGS.PASSWORD_PLACEHOLDER}
                    value={passwordVal}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    config={{
                        type: 'password'
                    }}
                    maxLength={15}
                />
                <InputSubmit className="btn btn-lg btn-outline-white" buttonLabel={LABELS.login} />
            </Form>
        </>
    )
}

export const WelcomeReduxForm = reduxForm({
    form: "welcome",
    fields: ["password"],
    onSubmitFail,
    validate: (values) => validator(values),
    enableReinitialize: true,
})(WelcomeForm);