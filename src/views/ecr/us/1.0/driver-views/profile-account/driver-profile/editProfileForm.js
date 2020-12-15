import React, { useState, useEffect } from "react";
import { Field, reduxForm, change as changeField } from "redux-form";
import { connect } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";
import validator from "./profileValidation.js";

const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../../config/default`);
const { DatePickerInput } = require(`../../../../../../../components/${PLATFORM}/atoms/date-picker`)
const { Form } = require(`../../../../../../../components/${PLATFORM}/atoms/form`);
const { STRINGS } = require(`../../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`)
const { Input } = require(`../../../../../../../components/${PLATFORM}/atoms/input`);
const { InputSubmit } = require(`../../../../../../../components/${PLATFORM}/atoms/input-submit`);
const { onSubmitFail } = require(`../../../../../../../helpers/${PLATFORM}`);
const { Select } = require(`../../../../../../../components/${PLATFORM}/atoms/select`)
const { getCountryData } = require(`../../../../../../../helpers/${PLATFORM}/prepare-country-related-data`);

let data = getCountryData();
let callingCodes = data.callingCodes;
let countries = data.nations;

const ProfileForm = ({
    handleSubmit = () => { },
    fields,
    onSubmit = () => { },
    setFields = () => { },
    setEditProfileMode,
    changeField
}) => {
    const minDate = new Date()
    const maxDate = new Date()
    let history = useHistory();
    let [updatePhone,setUpdatePhone] = useState(false)
    const onChangeField = (index, value) => {
        setFields({ ...fields, [index]: value })
    }

    useEffect(() => {
       
    }, [fields])

    useEffect(() => {
        
        if(updatePhone === true){
        let requiredIndex;
        for (let index = 0; index < callingCodes.length; index++) {
            let position = callingCodes[index].label.indexOf(fields.country && fields.country.value)
            if (position !== -1) {
                requiredIndex = index
                break;
            }
        }
        if (fields.country) {
            changeField("ProfileForm", "phoneKey", callingCodes[requiredIndex]);
            onChangeField("phoneKey", callingCodes[requiredIndex])
        }
    }
    }, [fields.country])

    return (
        <>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
                <div className="col-md-6 col-lg-3 col-sm-6">
                    <Field
                        name={STRINGS.NAME_INPUT}
                        component={Input}
                        placeholder={STRINGS.NAME_PLACEHOLDER}
                        type={'text'}
                        value={fields && fields.name}
                        onChange={(e) => onChangeField("name", e.target.value)}
                    />
                </div>
                <div className="col-md-6 col-lg-3 col-sm-6">
                    <Field
                        name={STRINGS.SURNAME_INPUT}
                        component={Input}
                        placeholder={STRINGS.SURNAME_PLACEHOLDER}
                        type={'text'}
                        value={fields && fields.surname}
                        onChange={(e) => onChangeField("surname", e.target.value)}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="col-md-6 col-lg-3 col-sm-6">
                    <Field
                        name={STRINGS.EMAIL_INPUT_NAME}
                        component={Input}
                        placeholder={STRINGS.EMAIL_LABEL}
                        value={fields && fields.email}
                        onChange={(e) => { }}
                        // onChangeField("email", e.target.value)
                        config={{
                            disabled: true,
                            type: "email"
                        }}
                    //    disabled={true}
                    />
                </div>
                <div className="col-md-6 col-lg-3 col-sm-6">
                    <Field
                        asterisk={true}
                        name={STRINGS.DOB}
                        component={DatePickerInput}
                        placeholder={STRINGS.DOB_PLACEHOLDER}
                        maxDate={maxDate.setFullYear(maxDate.getFullYear() - 16)}
                        value={fields && fields.dob}
                        onChange={(value) => onChangeField("dob", value.getTime())}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="col-md-6 col-lg-3 col-sm-6">
                    <Field
                        name={STRINGS.CITY_INPUT}
                        component={Input}
                        placeholder={STRINGS.CITY}
                        type={'text'}
                        value={fields && fields.city}
                        onChange={(e) => onChangeField("city", e.target.value)}
                    />
                </div>
                <div className="col-md-6 col-lg-3 col-sm-6">
                    <Field
                        name={STRINGS.COUNTRY_INPUT}
                        component={Select}
                        placeholder={STRINGS.COUNTRY}
                        // type={'text'}
                        options={countries}
                        isSearchable={true}
                        data={fields && fields.country}
                        onValueChange={(value) => {
                            changeField("ProfileForm", "country", value)
                            onChangeField("country", value)
                            setUpdatePhone(true)
                        }
                        }
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="col-md-6 col-lg-3 col-sm-6">
                    <Field
                        name={STRINGS.PHONE_CODE_KEY}
                        component={Select}
                        options={callingCodes}
                        isSearchable={true}
                        data={fields && fields.phoneKey}
                        placeholder={STRINGS.PHONE_NUMBER_PLACEHOLDER}
                        onValueChange={(value) => {
                            changeField("ProfileForm", "phoneKey", value);
                            onChangeField("phoneKey", value)
                        }
                        }
                    />
                </div>
                <div className="col-md-6 col-lg-3 col-sm-6">
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
                        placeholder={STRINGS.PHONE_NO}
                        config={{
                            type: "tel",

                        }}
                        onValueChange={(value) => {
                            onChangeField("phoneNumber", value);
                        }}
                    />
                </div>
            </div>

            <div className="group-btn">
                <InputSubmit buttonLabel={STRINGS.SAVE} buttonStyle={"btn btn-sm btn-primary"}
                    containerStyle={''}
                />
                <button className="btn btn-sm btn-outline-blue" onClick={() => {
                    setEditProfileMode(false)
                }}>{STRINGS.CANCEL}</button>
            </div>
        </Form >
        </>
    )
}

const mapStateToProps = (state, props) => {
    return {
        initialValues: props.fields,
        phoneCode: state && state.form && state.form.signup && state.form.signup.values && state.form.signup.values.country,
        data: state && state.form && state.form.signup && state.form.signup.values && state.form.signup.values
    };
}

const reduxFormFunction = reduxForm({
    form: "ProfileForm",
    fields: ['Name', 'Email', 'phoneKey', 'PhoneKey', 'Address', 'Dob'],
    onSubmitFail,
    validate: validator,
    enableReinitialize: true
})(ProfileForm);

export const EditProfileForm = connect(mapStateToProps, { changeField })(reduxFormFunction)