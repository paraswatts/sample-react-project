import React, { Component } from "react";
import { Field } from "redux-form";
const {
  defaultConfig: { PLATFORM, LOCATION },
} = require(`../../../../../../config/default`);
const {
  Input,
} = require(`../../../../../../components/${PLATFORM}/atoms/input`);
const {
  STRINGS,
} = require(`../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`);
const {
  VALIDATION_MESSAGES,
} = require(`../../../../../../shared/${PLATFORM}/constants`);
const {
  TextArea,
} = require(`../../../../../../components/${PLATFORM}/atoms/text-area`);

export class AddNewFuel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedData: {
        name: "",
        desc: "",
      },
      validation: { name: false, desc: false },
      edited: false,
      modalVisibility: false,
      snackbarData: {
        variant: "",
        message: "",
      },
      openSnackBar: false,
    };
  }
  validate = () => {
    const { name, desc } = this.state.savedData;
    let validation = true;
    if (!name) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          name: VALIDATION_MESSAGES.NAME_REQUIRED,
        }),
      });
      validation = false;
    }
    if (!(name.trim && name.trim())) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          name: VALIDATION_MESSAGES.NAME_REQUIRED,
        }),
      });
      validation = false;
    }
    if (!desc) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          desc: VALIDATION_MESSAGES.DESCRIPTION_REQUIRED,
        }),
      });
      validation = false;
    }
    if (!(desc.trim && desc.trim())) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          desc: VALIDATION_MESSAGES.DESCRIPTION_REQUIRED,
        }),
      });
      validation = false;
    }
    return validation;
  };

  render() {
    const { modalVisibilityHandler, onAddFuelOffer } = this.props;
    const { openSnackBar } = this.state;

    return (
      <>
        <div id="myModal" className="modal">
          <div
            className="modal-content"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="modal_body">
              <span className="close" onClick={modalVisibilityHandler}>
                &times;
              </span>
              <div className="form-fields">
                <h5 className="mb-3">Add Fuel Type</h5>
                <div className="form-row">
                  <div className="col-sm-6 col-12">
                    <Field
                      name={STRINGS.FUEL_INPUT}
                      component={Input}
                      placeholder={STRINGS.NAME_PLACEHOLDER}
                      type={"text"}
                      meta={{
                        error:
                          this.state.validation.name &&
                          this.state.validation.name,
                        touched: this.state.validation.name && true,
                      }}
                      onBlur={() => {
                        if (!this.state.savedData.name) {
                          this.setState({
                            validation: {
                              ...this.state.validation,
                              name: VALIDATION_MESSAGES.NAME_REQUIRED,
                            },
                          });
                        }
                      }}
                      config={{
                        value: this.state.savedData.name,
                        onChange: (value) => {
                          this.setState(
                            {
                              savedData: {
                                ...this.state.savedData,
                                name: value.target.value,
                              },
                            },
                            () => {
                              if (!this.state.savedData.name) {
                                this.setState({
                                  validation: {
                                    ...this.state.validation,
                                    name: VALIDATION_MESSAGES.NAME_REQUIRED,
                                  },
                                });
                              }
                              if (this.state.savedData.name) {
                                this.setState({
                                  validation: {
                                    ...this.state.validation,
                                    name: false,
                                  },
                                });
                              }
                            }
                          );
                        },
                      }}
                    />
                  </div>

                  <div className="col-12">
                    <div className="form-group">
                      <Field
                        name={STRINGS.FUEL_DESCRIPTION}
                        component={TextArea}
                        placeholder={STRINGS.DESCRIPTION_PLACEHOLDER}
                        meta={{
                          error:
                            this.state.validation.desc &&
                            this.state.validation.desc,
                          touched: this.state.validation.desc && true,
                        }}
                        onBlur={() => {
                          if (!this.state.savedData.desc) {
                            this.setState({
                              validation: {
                                ...this.state.validation,
                                desc: VALIDATION_MESSAGES.DESCRIPTION_REQUIRED,
                              },
                            });
                          }
                        }}
                        config={{
                          value: this.state.savedData.desc,
                          onChange: (value) => {
                            this.setState(
                              {
                                savedData: {
                                  ...this.state.savedData,
                                  desc: value.target.value,
                                },
                              },
                              () => {
                                if (!this.state.savedData.desc) {
                                  this.setState({
                                    validation: {
                                      ...this.state.validation,
                                      desc:
                                        VALIDATION_MESSAGES.DESCRIPTION_REQUIRED,
                                    },
                                  });
                                }
                                if (this.state.savedData.desc) {
                                  this.setState({
                                    validation: {
                                      ...this.state.validation,
                                      desc: false,
                                    },
                                  });
                                }
                              }
                            );
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <hr />
              <div className="group-btn text-center">
                <button
                  className="btn btn-lg btn-primary text-capitalize"
                  type={"text"}
                  onClick={(e) => {
                    e.preventDefault();
                    if (this.validate()) {
                      onAddFuelOffer({
                        ...this.state.savedData,
                        name: this.state.savedData.name.trim(),
                        desc: this.state.savedData.desc.trim(),
                      });
                    }
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
