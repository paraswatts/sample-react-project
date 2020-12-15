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
  PHONE_REGX,
  PRICE_REGX,
} = require(`../../../../../../shared/${PLATFORM}/constants`);

export class AddNewInsurance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedData: {
        name: "",
        excess: "",
        bond: "",
        dailyFee: "",
      },
      validation: { name: false, excess: false, bond: false, dailyFee: false },
      edited: false,
      modalVisibility: false,
    };
  }
  validate = () => {
    const { name, excess, bond, dailyFee } = this.state.savedData;
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
    if (!excess) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          excess: VALIDATION_MESSAGES.EXCESS_REQUIRED,
        }),
      });
      validation = false;
    }
    if (!bond) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          bond: VALIDATION_MESSAGES.BOND_REQUIRED,
        }),
      });
      validation = false;
    }
    if (!dailyFee) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          dailyFee: VALIDATION_MESSAGES.DAILY_FEE_REQUIRED,
        }),
      });
      validation = false;
    }
    return validation;
  };

  render() {
    const { modalVisibilityHandler, onAddNewInsuranceClick } = this.props;

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
                <h5 className="mb-3">Add a new insurance</h5>
                <div className="form-row">
                  <div className="col-sm-6">
                    <Field
                      name={STRINGS.INSURANCE_MODAL_NAME}
                      component={Input}
                      placeholder={STRINGS.INSURANCE_NAME_PLACEHOLDER}
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

                  <div className="col-sm-6">
                    <Field
                      name={STRINGS.EXCESS_NAME}
                      component={Input}
                      placeholder={STRINGS.EXCESS_PLACEHOLDER}
                      type={"number"}
                      meta={{
                        error:
                          this.state.validation.excess &&
                          this.state.validation.excess,
                        touched: this.state.validation.excess && true,
                      }}
                      onBlur={() => {
                        if (!this.state.savedData.excess) {
                          this.setState({
                            validation: {
                              ...this.state.validation,
                              excess: VALIDATION_MESSAGES.EXCESS_REQUIRED,
                            },
                          });
                        }
                      }}
                      normalize={(val, val1) => {
                        if (PHONE_REGX.test(val)) {
                          return val;
                        } else if (val === "") {
                          return val;
                        } else {
                          return val1;
                        }
                      }}
                      config={{
                        value: this.state.savedData.excess,
                        onChange: (value) => {
                          if (PRICE_REGX.test(value.target.value)) {
                            this.setState(
                              {
                                savedData: {
                                  ...this.state.savedData,
                                  excess: value.target.value,
                                },
                              },
                              () => {
                                if (!this.state.savedData.excess) {
                                  this.setState({
                                    validation: {
                                      ...this.state.validation,
                                      excess:
                                        VALIDATION_MESSAGES.EXCESS_REQUIRED,
                                    },
                                  });
                                } else {
                                  this.setState({
                                    validation: {
                                      ...this.state.validation,
                                      excess: false,
                                    },
                                  });
                                }
                              }
                            );
                          } else if (value.target.value === "") {
                            this.setState(
                              {
                                savedData: {
                                  ...this.state.savedData,
                                  excess: value.target.value,
                                },
                              },
                              () => {
                                if (!this.state.savedData.excess) {
                                  this.setState({
                                    validation: {
                                      ...this.state.validation,
                                      excess:
                                        VALIDATION_MESSAGES.EXCESS_REQUIRED,
                                    },
                                  });
                                } else {
                                  this.setState({
                                    validation: {
                                      ...this.state.validation,
                                      excess: false,
                                    },
                                  });
                                }
                              }
                            );
                          }
                        },
                      }}
                    />
                  </div>

                  <div className="col-sm-6">
                    <Field
                      name={STRINGS.BOND_NAME}
                      component={Input}
                      placeholder={STRINGS.BOND_PLACEHOLDER}
                      type={"number"}
                      meta={{
                        error:
                          this.state.validation.bond &&
                          this.state.validation.bond,
                        touched: this.state.validation.bond && true,
                      }}
                      normalize={(val, val1) => {
                        if (PHONE_REGX.test(val)) {
                          return val;
                        } else if (val === "") {
                          return val;
                        } else {
                          return val1;
                        }
                      }}
                      onBlur={() => {
                        if (!this.state.savedData.bond) {
                          this.setState({
                            validation: {
                              ...this.state.validation,
                              bond: VALIDATION_MESSAGES.BOND_REQUIRED,
                            },
                          });
                        }
                      }}
                      config={{
                        value: this.state.savedData.bond,
                        onChange: (value) => {
                          if (PHONE_REGX.test(value.target.value)) {
                            this.setState(
                              {
                                savedData: {
                                  ...this.state.savedData,
                                  bond: value.target.value,
                                },
                              },
                              () => {
                                if (!this.state.savedData.bond) {
                                  this.setState({
                                    validation: {
                                      ...this.state.validation,
                                      bond: VALIDATION_MESSAGES.BOND_REQUIRED,
                                    },
                                  });
                                } else {
                                  this.setState({
                                    validation: {
                                      ...this.state.validation,
                                      bond: false,
                                    },
                                  });
                                }
                              }
                            );
                          } else if (value.target.value === "") {
                            this.setState(
                              {
                                savedData: {
                                  ...this.state.savedData,
                                  bond: value.target.value,
                                },
                              },
                              () => {
                                if (!this.state.savedData.bond) {
                                  this.setState({
                                    validation: {
                                      ...this.state.validation,
                                      bond: VALIDATION_MESSAGES.BOND_REQUIRED,
                                    },
                                  });
                                } else {
                                  this.setState({
                                    validation: {
                                      ...this.state.validation,
                                      bond: false,
                                    },
                                  });
                                }
                              }
                            );
                          }
                        },
                      }}
                    />
                  </div>
                  <div className="col-sm-6">
                    <Field
                      name={STRINGS.DAILY_FEE_NAME}
                      component={Input}
                      placeholder={STRINGS.DAILY_FEE_PLACEHOLDER}
                      type={"number"}
                      normalize={(val, val1) => {
                        if (PRICE_REGX.test(val)) {
                          return val;
                        } else if (val === "") {
                          return val;
                        } else {
                          return val1;
                        }
                      }}
                      meta={{
                        error:
                          this.state.validation.dailyFee &&
                          this.state.validation.dailyFee,
                        touched: this.state.validation.dailyFee && true,
                      }}
                      onBlur={() => {
                        if (!this.state.savedData.dailyFee) {
                          this.setState({
                            validation: {
                              ...this.state.validation,
                              dailyFee: VALIDATION_MESSAGES.DAILY_FEE_REQUIRED,
                            },
                          });
                        }
                      }}
                      config={{
                        value: this.state.savedData.dailyFee,
                        onChange: (value) => {
                          if (PRICE_REGX.test(value.target.value)) {
                            this.setState(
                              {
                                savedData: {
                                  ...this.state.savedData,
                                  dailyFee: value.target.value,
                                },
                              },
                              () => {
                                if (!this.state.savedData.dailyFee) {
                                  this.setState({
                                    validation: {
                                      ...this.state.validation,
                                      dailyFee:
                                        VALIDATION_MESSAGES.DAILY_FEE_REQUIRED,
                                    },
                                  });
                                } else {
                                  this.setState({
                                    validation: {
                                      ...this.state.validation,
                                      dailyFee: false,
                                    },
                                  });
                                }
                              }
                            );
                          } else if (value.target.value === "") {
                            this.setState(
                              {
                                savedData: {
                                  ...this.state.savedData,
                                  dailyFee: value.target.value,
                                },
                              },
                              () => {
                                if (!this.state.savedData.dailyFee) {
                                  this.setState({
                                    validation: {
                                      ...this.state.validation,
                                      dailyFee:
                                        VALIDATION_MESSAGES.DAILY_FEE_REQUIRED,
                                    },
                                  });
                                } else {
                                  this.setState({
                                    validation: {
                                      ...this.state.validation,
                                      dailyFee: false,
                                    },
                                  });
                                }
                              }
                            );
                          }
                        },
                      }}
                    />
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
                      onAddNewInsuranceClick({
                        ...this.state.savedData,
                        name: this.state.savedData.name.trim(),
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
