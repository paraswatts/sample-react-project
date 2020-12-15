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

export class AddNewFerryCost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedData: {
        name: "",
        Desc: "",
      },
      validation: { name: false, Desc: false },
      edited: false,
      modalVisibility: false,
    };
  }
  validate = () => {
    const { name, Desc } = this.state.savedData;
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
    if (!Desc) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          Desc: VALIDATION_MESSAGES.DESCRIPTION_REQUIRED,
        }),
      });
      validation = false;
    }
    if (!(Desc.trim && Desc.trim())) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          Desc: VALIDATION_MESSAGES.DESCRIPTION_REQUIRED,
        }),
      });
      validation = false;
    }
    return validation;
  };

  render() {
    const {
      modalVisibilityHandler,
      branchManagers,
      onAddFerryCost,
    } = this.props;

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
                <h5 className="mb-">Add Ferry Cost</h5>
                <div className="form-row">
                  <div className="col-md-6 col-sm-12">
                    <Field
                      name={STRINGS.FERRY_COST_NAME}
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
                        name={STRINGS.FERRY_COST_DESCRIPTION}
                        component={TextArea}
                        placeholder={STRINGS.DESCRIPTION_PLACEHOLDER}
                        meta={{
                          error:
                            this.state.validation.Desc &&
                            this.state.validation.Desc,
                          touched: this.state.validation.Desc && true,
                        }}
                        onBlur={() => {
                          if (!this.state.savedData.Desc) {
                            this.setState({
                              validation: {
                                ...this.state.validation,
                                Desc: VALIDATION_MESSAGES.DESCRIPTION_REQUIRED,
                              },
                            });
                          }
                        }}
                        config={{
                          value: this.state.savedData.Desc,
                          onChange: (value) => {
                            this.setState(
                              {
                                savedData: {
                                  ...this.state.savedData,
                                  Desc: value.target.value,
                                },
                              },
                              () => {
                                if (!this.state.savedData.Desc) {
                                  this.setState({
                                    validation: {
                                      ...this.state.validation,
                                      Desc:
                                        VALIDATION_MESSAGES.DESCRIPTION_REQUIRED,
                                    },
                                  });
                                }
                                if (this.state.savedData.Desc) {
                                  this.setState({
                                    validation: {
                                      ...this.state.validation,
                                      Desc: false,
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
                  className="btn btn-lg btn-secondary text-capitalize"
                  type={"text"}
                  onClick={(e) => {
                    e.preventDefault();
                    if (this.validate()) {
                      onAddFerryCost({
                        ...this.state.savedData,
                        name: this.state.savedData.name.trim(),
                        Desc: this.state.savedData.Desc.trim(),
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
