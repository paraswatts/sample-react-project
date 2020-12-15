import React, { useEffect, useState } from "react";
import { reduxForm, Field, reset, initialize } from "redux-form";
import { connect } from "react-redux";
import "./style.scss";
import validator from "./validator";
const {
  defaultConfig: { PLATFORM, LOCATION },
} = require(`../../../../../config/default`);
const { CaptchaInput } = require(`../../../../../components/${PLATFORM}/atoms/captcha`);
const { Form } = require(`../../../../../components/${PLATFORM}/atoms/form`);

const {
  InputSubmit,
} = require(`../../../../../components/${PLATFORM}/atoms/input-submit`);
const { Input } = require(`../../../../../components/${PLATFORM}/atoms/input`);
const { onSubmitFail } = require(`../../../../../helpers/${PLATFORM}`);
const {
  STRINGS,
} = require(`../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`);

const LoginForm = ({
  handleSubmit = () => { },
  initialize,
  passwordHideIcon,
  passwordEyeIcon,
  credentials = {
    email: "",
    password: "",
    Captcha: "",
  },
  onEmailChange = () => { },
  onPasswordChange = () => { },
  saveCaptcha = () => { },
  onSubmit = (e) => { },
  captcha,
  REGENERATE_CAPCTHA,
  children,
  setField = () => { },
  type,
  resetForm = () => { },
  dispatch,
}) => {
  useEffect(() => {
    // resetForm()
    dispatch(initialize());
  }, [type]);
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const changeVisibility = () => {
    if (passwordVisibility === false) {
      setPasswordVisibility(true)
    }
    else {
      setPasswordVisibility(false)
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-12 label_float">
            <Field
              name={STRINGS.EMAIL_INPUT_NAME}
              component={Input}
              placeholder={STRINGS.EMAIL_PLACEHOLDER}
              config={{
                type: "email",
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 pass_eye label_float">
            <Field
              name={STRINGS.PASSWORD_INPUT_NAME}
              component={Input}
              placeholder={STRINGS.PASSWORD_PLACEHOLDER}
              maxLength={15}
              config={{
                type: passwordVisibility === false ? "password" : 'text',
              }}
            />
            <span className="eye_input_set" onClick={changeVisibility}>
              <img src={passwordVisibility === false ? passwordHideIcon :
                passwordEyeIcon
              }
                alt="ECR" className="img-fluid" width="20px"
              />
            </span>
          </div>
        </div>
        <div className="row label_float">
          <Field
            name={STRINGS.CAPTCHA_INPUT}
            component={CaptchaInput}
            saveCaptcha={saveCaptcha}
            REGENERATE_CAPCTHA={REGENERATE_CAPCTHA}
            placeholder={STRINGS.CAPTCHA_PLACEHOLDER}
            text={"text"}
          />
        </div>
        {children}
        <div className="group-btn text-right">
          <InputSubmit
            buttonLabel={STRINGS.BUTTON_LABEL_LOGIN}
            buttonStyle={"btn btn-lg btn-secondary"}
            containerStyle={"mt-4"}
          />
        </div>
      </Form>
    </>
  );
};

const mapStateToProps = (state, props) => {
  return {
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    resetForm: () => {
      dispatch(reset("login"));
    },
  };
};

const reduxFormFunction = reduxForm({
  form: "login",
  fields: ["email", "password"],
  onSubmitFail,
  validate: (values) => validator(values),
  enableReinitialize: true,
})(LoginForm);

export const LoginReduxForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxFormFunction);
