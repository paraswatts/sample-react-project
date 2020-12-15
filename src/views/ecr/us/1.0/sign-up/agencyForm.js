import React, { useEffect, useState } from "react";
import { reduxForm, Field, change as changeField } from "redux-form";
import { connect } from 'react-redux';
import "./style.scss";
import validator from "./agencyValidator";
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../config/default`);
const { Checkbox } = require(`../../../../../components/${PLATFORM}/atoms/checkbox`);
const { Form } = require(`../../../../../components/${PLATFORM}/atoms/form`);
const { STRINGS } = require(`../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`)
const { Input } = require(`../../../../../components/${PLATFORM}/atoms/input`);
const { InputSubmit } = require(`../../../../../components/${PLATFORM}/atoms/input-submit`);
const { onSubmitFail } = require(`../../../../../helpers/${PLATFORM}`);
const { Select } = require(`../../../../../components/${PLATFORM}/atoms/select`)
const { getCountryData } = require(`../../../../../helpers/${PLATFORM}/prepare-country-related-data`);

let data = getCountryData();
let callingCodes = data.callingCodes;
let countries = data.nations;


const SignupForm = ({
    handleSubmit = () => { },
    subscribe,
    passwordEyeIcon,
    passwordHIdeIcon,
    credentials = {
        CompanyName: '',
        name: '',
        surname: '',
        dob: '',
        city: '',
        country: '',
        email: '',
        phoneKey: '',
        phoneNumber: '',
        password: '',
        reenter_password: '',
        subscribe: ''
    },
    onSubmit = () => { },
    setSubscribeChange = () => { },
    setCredentials = () => { },
    children,
    phoneCode = '',
    dispatch,
    data,
    type,
    changeField,
    ...props
}) => {
    const [phoneKey, setPhoneKey] = useState('')
    const [country, setCountry] = useState('')
    const [passwordVisibility, setPasswordVisibility] = useState(false)

    useEffect(() => {
        let requiredIndex;
        for (let index = 0; index < callingCodes.length; index++) {
            let position = callingCodes[index].label.indexOf(country && country.value)
            if (position !== -1) {
                requiredIndex = index
                break;
            }
        }
        if (country) {
            changeField("signup", "phoneKey", callingCodes[requiredIndex]);
            setPhoneKey(callingCodes[requiredIndex])
        }
    }, [country])
    const changeVisibility = () => {
        if (passwordVisibility === false) {
            setPasswordVisibility(true)
        }
        else {
            setPasswordVisibility(false)
        }
    }
    return (
        <Form onSubmit={
            handleSubmit(onSubmit)}>
            <div className="form-row">
                <div className="col-sm-12 label_float">
                    <Field
                        name={STRINGS.COMPANY_NAME}
                        component={Input}
                        config={{
                            autoFocus: false
                        }}
                        placeholder={STRINGS.COMPANY_NAME_PLACEHOLDER}
                        type={'text'}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="col-sm-6 label_float">
                    <Field
                        name={STRINGS.NAME_INPUT}
                        component={Input}
                        placeholder={STRINGS.NAME_PLACEHOLDER}
                        type={'text'}

                    />
                </div>
                <div className="col-sm-6 label_float">
                    <Field
                        name={STRINGS.SURNAME_INPUT}
                        component={Input}
                        placeholder={STRINGS.SURNAME_PLACEHOLDER}
                        type={'text'}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="col-sm-12 label_float">
                    <Field
                        name={STRINGS.CITY_INPUT}
                        component={Input}
                        placeholder={STRINGS.CITY}
                        type={'text'}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="col-sm-12 label_float">
                    <Field
                        name={STRINGS.COUNTRY_INPUT}
                        component={Select}
                        placeholder={STRINGS.COUNTRY}
                        type={'text'}
                        options={countries}
                        isSearchable={true}
                        data={country}
                        onValueChange={(value) => {
                            changeField("signup", "country", value); setCountry(value)
                        }
                        }
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="col-sm-6 label_float">
                    <Field
                        name={STRINGS.PHONE_CODE_KEY}
                        component={Select}
                        options={callingCodes}
                        isSearchable={true}
                        placeholder={STRINGS.PHONE_NUMBER_PLACEHOLDER}
                        data={phoneKey}
                        onValueChange={(value) => { changeField("signup", "phoneKey", value); setPhoneKey(value) }
                        }
                    />
                </div>
                <div className="col-sm-6 label_float">
                    <Field
                        name={STRINGS.PHONE_NUMBER_KEY}
                        component={Input}
                        maxLength={15}
                        minLength={7}
                        normalize={(val, val1) => {
                            if (!isNaN(val)) {
                                return val;
                            } else {
                                return val1;
                            }
                        }}
                        config={{
                            type: "tel",
                            label: STRINGS.PHONE_NO,
                            id: STRINGS.PHONE_NO,
                            // placeholder: STRINGS.PHONE_NO,
                        }}
                    />
                </div>

            </div>

            <div className="form-row">
                <div className="col-sm-12 label_float">
                    <Field
                        name={STRINGS.EMAIL_INPUT_NAME}
                        component={Input}
                        placeholder={STRINGS.EMAIL_LABEL}
                        config={{
                            type: "email"
                        }}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="col-sm-6 pass_eye label_float">
                    <Field
                        name={STRINGS.PASSWORD_INPUT_NAME}
                        component={Input}
                        placeholder={STRINGS.PASSWORD_LABEL}
                        maxLength={15}
                        config={{
                            type: passwordVisibility === false ? "password" : 'text',
                        }}
                    />

                    <span onClick={changeVisibility}>
                        <img src={passwordVisibility === false ? passwordHIdeIcon :
                            passwordEyeIcon
                        }
                            alt="ECR" className="img-fluid" width="20px"
                        /> </span>
                </div>
            </div>
            <div className="form-row">
                <div className="col-sm-6 label_float">
                    <Field
                        name={STRINGS.RE_ENTER_PASSWORD_INPUT}
                        component={Input}
                        placeholder={STRINGS.RE_ENTER_PASSWORD}
                        maxLength={15}
                        config={{
                            type: "password"
                        }}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="col-md-12 label_float">
                    <Field
                        name={STRINGS.SUBSCRIBE_INPUT}
                        component={Checkbox}
                        text={STRINGS.SUBSCRIBE}
                        config={{
                            onChange: event => setSubscribeChange(event.target.checked),
                            checked: subscribe
                        }}
                    />
                </div>
            </div>
            {children}
            <div className="group-btn text-right">
                <InputSubmit buttonLabel={STRINGS.BUTTON_LABEL_REGISTER} buttonStyle={"btn btn-lg btn-secondary"}
                    containerStyle={"mt-4"}
                />
            </div>
        </Form>
    )
}

const mapStateToProps = (state, props) => {
    return {
        initialValues: props.credentials,
        phoneCode: state && state.form && state.form.signup && state.form.signup.values && state.form.signup.values.country,
        data: state && state.form && state.form.signup && state.form.signup.values && state.form.signup.values
    };
}

const reduxFormFunction = reduxForm({
    form: "signup",
    fields: ['name', 'surname', 'dob', 'city', 'country', 'email', 'password', 're-enterpassword'],
    onSubmitFail,
    validate: validator,
    enableReinitialize: true
})(SignupForm);

export const AgencySignUpForm = connect(mapStateToProps, { changeField })(reduxFormFunction);