import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";
import validator from "./changePasswordValidator";
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../config/default`);
const { Form } = require(`../../../../../../components/${PLATFORM}/atoms/form`);
const { STRINGS } = require(`../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`)
const { Input } = require(`../../../../../../components/${PLATFORM}/atoms/input`);
const { InputSubmit } = require(`../../../../../../components/${PLATFORM}/atoms/input-submit`);
const { onSubmitFail } = require(`../../../../../../helpers/${PLATFORM}`);

const ChangePassword = ({
    handleSubmit = () => { },
    onSubmit = () => { },
    passwordHideLogo,
    passwordEyeLogo
}) => {
    let history = useHistory();

    const onChangeField = (index, val) => {
        setpasswordFields({ ...passwordFields, [index]: val })
    }
    const [passwordFields, setpasswordFields] = useState({
        current: '',
        new: '',
        reEnter: ''
    })
    const [passwordVisibility, setPasswordVisibility] = useState({ current: false, new: false })
    const changeVisibility = (type) => {
        if (passwordVisibility[type] === false) {
            setPasswordVisibility({ ...passwordVisibility, [type]: true })
        } else {
            setPasswordVisibility({ ...passwordVisibility, [type]: false })
        }
    }
    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="form-group pass_eye">
                            <Field
                                name={STRINGS.PASSWORD_INPUT_NAME}
                                component={Input}
                                value={passwordFields.current}
                                placeholder={'Current Password'}
                                maxLength={15}
                                config={{
                                    type: passwordVisibility.current === false ? "password" : 'text',
                                }}
                                onChange={(e) => onChangeField('current', e.target.value)}
                            />
                            <span onClick={() => changeVisibility('current')}>
                                <img src={passwordVisibility.current === false ? passwordHideLogo :
                                    passwordEyeLogo
                                }
                                    alt="ECR" className="img-fluid" width="20px"
                                /> </span>
                        </div>
                        <div className="form-group pass_eye">
                            <Field
                                name={STRINGS.PASSWORD}
                                value={passwordFields.new}
                                component={Input}
                                placeholder={'New Password'}
                                maxLength={15}
                                config={{
                                    type: passwordVisibility.new === false ? "password" : 'text',
                                }}
                                onChange={(e) => onChangeField('new', e.target.value)}
                            />
                            <span onClick={() => changeVisibility('new')}>
                                <img src={passwordVisibility.new === false ? passwordHideLogo :
                                    passwordEyeLogo
                                }
                                    alt="ECR" className="img-fluid" width="20px"
                                />
                            </span>
                        </div>
                        <div className="form-group">
                            <Field
                                name={STRINGS.RE_ENTER_PASSWORD_INPUT}
                                value={passwordFields.reEnter}
                                component={Input}
                                placeholder={'Re-enter new password'}
                                maxLength={15}
                                config={{
                                    type: "password",
                                }}
                                onChange={(e) => onChangeField('reEnter', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-sm btn-primary">{STRINGS.SAVE}</button>
            </Form >
        </>
    )
}

const mapStateToProps = (state, props) => {
    return {

    };
}

const reduxFormFunction = reduxForm({
    form: "ChangePasswordForm",
    fields: ['Name', 'Email', 'PhoneCode', 'PhoneKey', 'Address', 'Dob'],
    onSubmitFail,
    validate: validator,
    enableReinitialize: true
})(ChangePassword);

export const ChangePasswordForm = connect(mapStateToProps, null)(reduxFormFunction)