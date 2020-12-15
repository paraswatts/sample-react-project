import React from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import "./style.scss";

import validator from "./validator";
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../config/default`);
const { Form } = require(`../../../../../components/${PLATFORM}/atoms/form`);
const { Checkbox } = require(`../../../../../components/${PLATFORM}/atoms/checkbox`);
const { InputSubmit } = require(`../../../../../components/${PLATFORM}/atoms/input-submit`);
const { Input } = require(`../../../../../components/${PLATFORM}/atoms/input`);
const { onSubmitFail } = require(`../../../../../helpers/${PLATFORM}`);
const { STRINGS } = require(`../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`)
const { ROUTES } = require(`../../../../../shared/${PLATFORM}/constants`);

const ForgotForm = ({
    handleSubmit,
    onSubmit = () => { }
}) => {
    return (
        <Form onSubmit={
            handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-md-12">
                    <Field
                        name={STRINGS.EMAIL_INPUT_NAME}
                        component={Input}
                        placeholder={STRINGS.EMAIL_PLACEHOLDER}
                        config={{
                            type: "email"
                        }}
                    />
                </div>
            </div>
            <InputSubmit buttonLabel={STRINGS.SEND_EMAIL} containerStyle={"text-right mt-4"}
                buttonStyle={'btn btn-secondary btn-lg'}
            />
            {/* <div className="row">
                <Link
                    className="col-md-12 auth-link text-center"
                    to={ROUTES.LOGIN}
                >
                    {STRINGS.LOG_IN}
                </Link>
            </div> */}
        </Form>
    );
};

export const ForgotReduxForm = reduxForm({
    form: "forgot",
    validate: validator,
    onSubmitFail: onSubmitFail,
})(ForgotForm);