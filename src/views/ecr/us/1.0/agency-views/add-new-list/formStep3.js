import React, { useState, useEffect } from "react";
import { reduxForm, Field, change as changeField } from "redux-form";
import { connect } from "react-redux";
import "./style.scss";
import validator from "./formValidatorStep3";
import Tooltip from "@material-ui/core/Tooltip";
const {
  defaultConfig: { PLATFORM, LOCATION },
} = require(`../../../../../../config/default`);
const {
  Input,
} = require(`../../../../../../components/${PLATFORM}/atoms/input`);
const { Form } = require(`../../../../../../components/${PLATFORM}/atoms/form`);
const {
  getTerms,
  addNewTerms,
  setFormStep3Data,
} = require(`../../../../../../redux/${PLATFORM}/actions`);
const { CLEAR_ICON } = require(`../../../../../../shared/ecr/constants`);
const {
  STRINGS,
} = require(`../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`);
const {
  InputSubmit,
} = require(`../../../../../../components/${PLATFORM}/atoms/input-submit`);
const { onSubmitFail } = require(`../../../../../../helpers/${PLATFORM}`);
const {
  FormDropDown,
} = require(`../../../../../../components/${PLATFORM}/atoms/formDropDown/`);
const {
  getCountryData,
} = require(`../../../../../../helpers/${PLATFORM}/prepare-country-related-data`);
const {
  Editor,
} = require(`../../../../../../components/${PLATFORM}/cells/editor-text`);
const {
  SnackbarWrapper,
} = require(`../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`);
let onSubmition = false;

const SignupForm = ({
  handleSubmit = () => {},
  props,
  subscribe,
  credentials = {
    CompanyName: "",
    name: "",
    surname: "",
    dob: "",
    city: "",
    country: "",
    email: "",
    phoneKey: "",
    phoneNumber: "",
    password: "",
    reenter_password: "",
    subscribe: "",
  },
  onSubmit = () => {},
  setSubscribeChange = () => {},
  setCredentials = () => {},
  children,
  onBack,
  getTerms,
  termsData,
  changeField,
  createNewTerms,
  anyUpdate,
  setFormStep3Data,
  inputtedValues,
  initialValues,
}) => {
  useEffect(() => {
    getTerms();
  }, []);

  useEffect(() => {
    if (initialValues && Object.values(initialValues).length) {
      changeField("formStep3", "name", initialValues && initialValues.name);
      setSelectedTerm(initialValues && initialValues.name);
      changeField(
        "formStep3",
        "templateName",
        initialValues &&
          initialValues.templateName &&
          initialValues.templateName
      );
      changeField(
        "formStep3",
        "templateDescription",
        initialValues && initialValues.templateDescription
      );
      setTemplateDescription({
        value: initialValues && initialValues.templateDescription,
      });
      setTemplateName(
        initialValues &&
          initialValues.templateName &&
          initialValues.templateName
      );
    }
  }, []);
  useEffect(() => {
    if (anyUpdate) getTerms();
  }, [anyUpdate]);
  useEffect(() => {
    let tempTermsList;
    tempTermsList =
      termsData &&
      termsData.map((item) => {
        return {
          value: item.name ? item.name : " ",
          label: item.name ? item.name : " ",
          description: item.description ? item.description : "",
          id: item._id ? item._id : "",
        };
      });
    setTermsList([...tempTermsList]);
  }, [termsData]);

  const [termslist, setTermsList] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");
  const [templateonChange] = useState("");
  const [openSnackBar, setOpenSnackbar] = useState(false);
  const [snackbarData, setSnackBarData] = useState({
    variant: "",
    message: "",
  });
  return (
    <>
      <SnackbarWrapper
        visible={openSnackBar}
        onClose={() => setOpenSnackbar(false)}
        variant={snackbarData.variant}
        message={snackbarData.message}
      />

      <div className="step_3">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="col-md-12">
              <div className="form-fields">
                <label>7. Terms and Conditions: </label>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="col-md-5 col-9">
              <div className="form-group">
                <Field
                  name={STRINGS.NAME_INPUT}
                  component={FormDropDown}
                  dataItems={termslist}
                  placeholder={STRINGS.YOUR_SAVED_TEMPLATE_PLCAHOLDER}
                  type={"text"}
                  config={{
                    value: selectedTerm,
                    onChange: (value) => {
                      if (value) {
                        changeField("formStep3", "name", value);
                        setSelectedTerm(value);
                        if (value.label !== "Please select") {
                          changeField(
                            "formStep3",
                            "templateName",
                            value && value.value
                          );
                          changeField(
                            "formStep3",
                            "templateDescription",
                            value && value.description
                          );
                          setTemplateDescription({
                            value: value && value.description,
                          });
                          setTemplateName(value && value.value);
                        }
                      }
                    },
                  }}
                />
              </div>
            </div>
            <div className={"remove-button-wrapper"}>
              <Tooltip title={"Clear Selection"} aria-label="add">
                <button
                  type={"button"}
                  className={"remove-admin-button"}
                  onClick={() => {
                    if (!!selectedTerm) {
                      changeField("formStep3", "templateName", "");
                      changeField("formStep3", "templateDescription", "");
                      changeField("formStep3", "name", "");
                      setTemplateDescription({ value: "" });
                      setTemplateName("");
                      setSelectedTerm("");
                    }
                  }}
                >
                  <img src={CLEAR_ICON} alt="ECR" />
                </button>
              </Tooltip>
            </div>
          </div>

          <div className="form-row">
            <div className="col-md-5 col-sm-8 label_float">
              <Field
                name={STRINGS.TEMPLATE_NAME}
                component={Input}
                placeholder={STRINGS.TEMPLATE_NAME_PLACEHOLDER}
                type={"text"}
                config={{
                  value: templateName,
                  onChange: (value) => {
                    changeField(
                      "formStep3",
                      "templateName",
                      value && value.target && value.target.value
                    );
                    setTemplateName(
                      value && value.target && value.target.value
                    );
                  },
                }}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="col-sm-12">
              <Field
                name={STRINGS.TEMPLATE_DESCRIPTION}
                component={Editor}
                type={"text"}
                config={{
                  ...templateDescription,
                  onChange: (html, delta) => {
                    const { ops } = delta;
                    changeField("formStep3", "templateDescription", html);
                    setTemplateDescription({ defaultValue: html });
                    if (
                      (ops && ops.length === 1 && ops[0].delete) ||
                      (ops[0] &&
                        ops[0].attributes &&
                        !ops[0].attributes["code-block"] &&
                        ops[0].retain)
                    ) {
                      changeField("formStep3", "templateDescription", "");
                      setTemplateDescription({ defaultValue: "" });
                    }
                  },
                }}
              />
            </div>
          </div>
          {children}
          <div className="form-btn-container mt-3">
            <span className="group-btn text-left mx-2">
              <InputSubmit
                buttonLabel={STRINGS.BUTTON_LABEL_NEXT}
                buttonStyle={"btn btn-lg btn-primary text-capitalize"}
                buttonAction={() => {
                  onSubmition = true;
                  setFormStep3Data(inputtedValues);
                }}
              />
            </span>
            <span className="group-btn text-right mx-2">
              <InputSubmit
                buttonLabel={STRINGS.BUTTON_LABEL_BACK}
                buttonStyle={"btn btn-lg btn-secondary text-capitalize"}
                buttonAction={() => {
                  onSubmition = false;
                  onBack();
                }}
              />
            </span>
          </div>
        </Form>
      </div>
    </>
  );
};

const mapStateToProps = (state, props) => {
  return {
    initialValues:
      state &&
      state.AddNewListingReducer &&
      state.AddNewListingReducer.formStep3Data,
    termsData:
      state && state.AddNewListingReducer && state.AddNewListingReducer.terms,
    anyUpdate:
      state && state.AddNewListingReducer && state.AddNewListingReducer.update,
    inputtedValues:
      state &&
      state.form &&
      state.form.formStep3 &&
      state.form.formStep3.values,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTerms: () => {
      dispatch(getTerms());
    },
    changeField: (form, field, value) => {
      dispatch(changeField(form, field, value));
    },
    createNewTerms: (data, success, failure) => {
      dispatch(addNewTerms(data, success, failure));
    },
    setFormStep3Data: (data) => {
      dispatch(setFormStep3Data(data));
    },
  };
};
const reduxFormFunction = reduxForm({
  form: "formStep3",
  onSubmitFail,
  validate: validator,
  enableReinitialize: true,
})(SignupForm);

export const FormStep3 = connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxFormFunction);
