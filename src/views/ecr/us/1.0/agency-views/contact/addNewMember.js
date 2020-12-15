import React, { Component } from "react";
import { reduxForm, Field, change as changeField } from "redux-form";
const {
  defaultConfig: { PLATFORM, LOCATION },
} = require(`../../../../../../config/default`);
const {
  DatePickerInput,
} = require(`../../../../../../components/${PLATFORM}/atoms/date-picker`);
const {
  getCountryData,
} = require(`../../../../../../helpers/${PLATFORM}/prepare-country-related-data`);
const {
  Select,
} = require(`../../../../../../components/${PLATFORM}/atoms/select`);
const {
  Input,
} = require(`../../../../../../components/${PLATFORM}/atoms/input`);

const {
  STRINGS,
} = require(`../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`);

const {
  VALIDATION_MESSAGES,
  EMAIL_REGX,
  NAME_REGX,
  REFERENCE_REGX,
  PHONE_REGX,
} = require(`../../../../../../shared/${PLATFORM}/constants`);
const {
  getPhoneValid,
} = require(`../../../../../../helpers/${PLATFORM}/getPhoneValid`);
const {
  getCountryPrefix,
} = require(`../../../../../../helpers/${PLATFORM}/getCountryPrefix`);

let data = getCountryData();
let callingCodes = data.callingCodes;
let countries = data.nations;
let getCountry;
let number;

export default class addNewMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      branchManagerData: {
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        surname: "",
        dob: "",
        city: "",
        country: "",
        phoneCode: "",
        phoneNo: "",
      },
      branchManagerDataValidation: {
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        dob: "",
        city: "",
        country: "",
        phoneCode: "",
        phoneNo: "",
      },
    };
  }
  branchManagarValidate = () => {
    let validation = true;

    let number;
    const {
      email,
      password,
      confirmPassword,
      name,
      dob,
      city,
      country,
      phoneCode,
      phoneNo,
    } = this.state.branchManagerData;

    if (!email) {
      this.setState({
        branchManagerDataValidation: Object.assign(
          this.state.branchManagerDataValidation,
          { email: VALIDATION_MESSAGES.EMAIL_REQUIRED }
        ),
      });
      validation = false;
    }
    if (!password) {
      this.setState({
        branchManagerDataValidation: Object.assign(
          this.state.branchManagerDataValidation,
          { password: VALIDATION_MESSAGES.PASSWORD_REQUIRED }
        ),
      });
      validation = false;
    }
    if (!confirmPassword) {
      this.setState({
        branchManagerDataValidation: Object.assign(
          this.state.branchManagerDataValidation,
          { confirmPassword: VALIDATION_MESSAGES.PASSWORD_REQUIRED }
        ),
      });
      validation = false;
    }
    if (!name) {
      this.setState({
        branchManagerDataValidation: Object.assign(
          this.state.branchManagerDataValidation,
          { name: VALIDATION_MESSAGES.NAME_REQUIRED }
        ),
      });
      validation = false;
    }

    if (!(name && name.trim && name.trim())) {
      this.setState({
        branchManagerDataValidation: Object.assign(
          this.state.branchManagerDataValidation,
          { name: VALIDATION_MESSAGES.NAME_REQUIRED }
        ),
      });
      validation = false;
    }

    if (!dob) {
      this.setState({
        branchManagerDataValidation: Object.assign(
          this.state.branchManagerDataValidation,
          { dob: VALIDATION_MESSAGES.DOB_REQUIRED }
        ),
      });
      validation = false;
    }
    if (!city) {
      this.setState({
        branchManagerDataValidation: Object.assign(
          this.state.branchManagerDataValidation,
          { city: VALIDATION_MESSAGES.CITY_REQUIRED }
        ),
      });
      validation = false;
    }
    if (!(city && city.trim && city.trim())) {
      this.setState({
        branchManagerDataValidation: Object.assign(
          this.state.branchManagerDataValidation,
          { city: VALIDATION_MESSAGES.CITY_REQUIRED }
        ),
      });
      validation = false;
    }
    if (!country) {
      this.setState({
        branchManagerDataValidation: Object.assign(
          this.state.branchManagerDataValidation,
          { country: VALIDATION_MESSAGES.COUNTRY_REQUIRED }
        ),
      });
      validation = false;
    }
    if (!phoneCode) {
      this.setState({
        branchManagerDataValidation: Object.assign(
          this.state.branchManagerDataValidation,
          { phoneCode: VALIDATION_MESSAGES.PHONE_CODE_KEY_REQUIRED }
        ),
      });
      validation = false;
    }
    if (!phoneNo) {
      this.setState({
        branchManagerDataValidation: Object.assign(
          this.state.branchManagerDataValidation,
          { phoneNo: VALIDATION_MESSAGES.PHONE_NUMBER_REQUIRED }
        ),
      });
      validation = false;
    }
    if (!dob) {
      this.setState({
        branchManagerDataValidation: Object.assign(
          this.state.branchManagerDataValidation,
          { dob: VALIDATION_MESSAGES.DOB_REQUIRED }
        ),
      });
      validation = false;
    }
    Object.values(this.state.branchManagerDataValidation).find(
      (item, index) => {
        if (!!item) {
          validation = false;
        }
      }
    );

    return validation;
  };

  validatePhoneNumber(country) {
    if (country && this.state.branchManagerData.phoneNo) {
      number = getPhoneValid(this.state.branchManagerData.phoneNo, getCountry);
      if (number && number === "invalid") {
        this.setState({
          branchManagerDataValidation: {
            ...this.state.branchManagerDataValidation,
            phoneNo: VALIDATION_MESSAGES.INVALID_NUMBER_FOR_COUNTRY,
          },
        });
      } else {
        this.setState({
          branchManagerDataValidation: {
            ...this.state.branchManagerDataValidation,
            phoneNo: false,
          },
        });
      }
    }
  }

  render() {
    const maxDate = new Date();
    const { modalVisibility, onAddNewMember } = this.props;
    return (
      <div id="myModal" className="modal">
        <div className={`modal-content`}>
          <div
            className="modal_body"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <span
              className="close"
              onClick={() => {
                this.setState({
                  addBranchManger: false,
                  branchManagerData: {
                    email: "",
                    password: "",
                    confirmPassword: "",
                    name: "",
                    surname: "",
                    role: "",
                    dob: "",
                    city: "",
                    country: "",
                    phoneCode: "",
                    phoneNo: "",
                  },
                  branchManagerDataValidation: {
                    email: "",
                    password: "",
                    confirmPassword: "",
                    name: "",
                    surname: "",
                    role: "",
                    dob: "",
                    city: "",
                    country: "",
                    phoneCode: "",
                    phoneNo: "",
                  },
                });
                modalVisibility();
              }}
            >
              &times;
            </span>
            <form>
              <h5 className="mb-3">{"Add new member"}</h5>

              <div className="form-row">
                <div className="col-sm-6">
                  <Field
                    name={STRINGS.BRANCH_MANAGER_EMAIL}
                    component={Input}
                    placeholder={STRINGS.EMAIL}
                    onBlur={() => {
                      if (!this.state.branchManagerData.email) {
                        this.setState({
                          branchManagerDataValidation: {
                            ...this.state.branchManagerDataValidation,
                            email: VALIDATION_MESSAGES.EMAIL_REQUIRED,
                          },
                        });
                      } else if (
                        !EMAIL_REGX.test(this.state.branchManagerData.email)
                      ) {
                        this.setState({
                          branchManagerDataValidation: {
                            ...this.state.branchManagerDataValidation,
                            email: VALIDATION_MESSAGES.EMAIL_IS_NOT_VALID,
                          },
                        });
                      }
                    }}
                    meta={{
                      error: this.state.branchManagerDataValidation.email,
                      touched:
                        this.state.branchManagerDataValidation.email && true,
                    }}
                    config={{
                      value: this.state.branchManagerData.email,
                      onChange: (value) => {
                        this.setState(
                          {
                            branchManagerData: {
                              ...this.state.branchManagerData,
                              email: value.target.value,
                            },
                          },
                          () => {
                            if (
                              !EMAIL_REGX.test(
                                this.state.branchManagerData.email
                              )
                            ) {
                              this.setState({
                                branchManagerDataValidation: {
                                  ...this.state.branchManagerDataValidation,
                                  email: VALIDATION_MESSAGES.EMAIL_IS_NOT_VALID,
                                },
                              });
                            }
                            if (!this.state.branchManagerData.email) {
                              this.setState({
                                branchManagerDataValidation: {
                                  ...this.state.branchManagerDataValidation,
                                  email: VALIDATION_MESSAGES.EMAIL_REQUIRED,
                                },
                              });
                            }
                            if (
                              EMAIL_REGX.test(
                                this.state.branchManagerData.email
                              ) &&
                              this.state.branchManagerData.email
                            ) {
                              this.setState({
                                branchManagerDataValidation: {
                                  ...this.state.branchManagerDataValidation,
                                  email: false,
                                },
                              });
                            }
                          }
                        );
                      },
                      type: "email",
                    }}
                  />
                </div>

                <div className="col-sm-6">
                  <Field
                    asterisk={true}
                    name={STRINGS.BRANCH_MANAGER_DOB}
                    component={DatePickerInput}
                    placeholder={STRINGS.DOB_PLACEHOLDER}
                    onBlur={() => {
                      if (!this.state.branchManagerData.dob) {
                        this.setState({
                          branchManagerDataValidation: {
                            ...this.state.branchManagerDataValidation,
                            dob: VALIDATION_MESSAGES.DOB_REQUIRED,
                          },
                        });
                      }
                    }}
                    maxDate={maxDate.setFullYear(maxDate.getFullYear() - 16)}
                    meta={{
                      error: this.state.branchManagerDataValidation.dob,
                      touched:
                        this.state.branchManagerDataValidation.dob && true,
                    }}
                    config={{
                      value: this.state.branchManagerData.dob,
                      onChange: (value) => {
                        let val;
                        this.setState(
                          {
                            branchManagerData: {
                              ...this.state.branchManagerData,
                              dob: value,
                            },
                          },
                          () => {
                            if (this.state.branchManagerData.dob) {
                              this.setState({
                                branchManagerDataValidation: {
                                  ...this.state.branchManagerDataValidation,
                                  dob: false,
                                },
                              });
                            } else {
                              this.setState({
                                branchManagerDataValidation: {
                                  ...this.state.branchManagerDataValidation,
                                  dob: VALIDATION_MESSAGES.DOB_REQUIRED,
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

              <div className="form-row">
                <div className="col-sm-6">
                  <Field
                    name={STRINGS.BRANCH_MANAGER_PASSWORD}
                    component={Input}
                    placeholder={STRINGS.PASSWORD_LABEL}
                    meta={{
                      error: this.state.branchManagerDataValidation.password,
                      touched:
                        this.state.branchManagerDataValidation.password && true,
                    }}
                    config={{
                      value: this.state.branchManagerData.password,
                      type: "password",
                      maxLength: 15,
                      onBlur: (e) => {
                        e.preventDefault();
                        if (!this.state.branchManagerData.password) {
                          this.setState({
                            branchManagerDataValidation: {
                              ...this.state.branchManagerDataValidation,
                              password: VALIDATION_MESSAGES.PASSWORD_REQUIRED,
                            },
                          });
                        }
                      },
                      onChange: (evt) => {
                        this.setState(
                          {
                            branchManagerData: {
                              ...this.state.branchManagerData,
                              password: evt.target.value,
                            },
                          },
                          () => {
                            if (!this.state.branchManagerData.password) {
                              this.setState({
                                branchManagerDataValidation: {
                                  ...this.state.branchManagerDataValidation,
                                  password:
                                    VALIDATION_MESSAGES.PASSWORD_REQUIRED,
                                },
                              });
                            } else if (
                              this.state.branchManagerData.password.toString()
                                .length < 6
                            ) {
                              this.setState({
                                branchManagerDataValidation: {
                                  ...this.state.branchManagerDataValidation,
                                  password:
                                    VALIDATION_MESSAGES.PASSWORD_MINLENGTH,
                                },
                              });
                            } else if (
                              this.state.branchManagerData.confirmPassword &&
                              this.state.branchManagerData.confirmPassword !==
                                this.state.branchManagerData.password
                            ) {
                              this.setState({
                                branchManagerDataValidation: {
                                  ...this.state.branchManagerDataValidation,
                                  confirmPassword:
                                    VALIDATION_MESSAGES.PASSWORDS_DO_NOT_MATCH,
                                },
                              });
                            } else {
                              this.setState({
                                branchManagerDataValidation: {
                                  ...this.state.branchManagerDataValidation,
                                  password: false,
                                  confirmPassword: false,
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
                    name={STRINGS.CONFIRM_PASSWORD}
                    component={Input}
                    placeholder={STRINGS.RE_ENTER_PASSWORD}
                    maxLength={15}
                    meta={{
                      error: this.state.branchManagerDataValidation
                        .confirmPassword,
                      touched:
                        this.state.branchManagerDataValidation
                          .confirmPassword && true,
                    }}
                    config={{
                      value: this.state.branchManagerData.confirmPassword,
                      type: "password",
                      maxLength: 15,
                      onBlur: (e) => {
                        e.preventDefault();
                        if (!this.state.branchManagerData.confirmPassword) {
                          this.setState({
                            branchManagerDataValidation: {
                              ...this.state.branchManagerDataValidation,
                              confirmPassword:
                                VALIDATION_MESSAGES.PASSWORD_REQUIRED,
                            },
                          });
                        } else if (
                          this.state.branchManagerData.password !==
                          this.state.branchManagerData.confirmPassword
                        ) {
                          this.setState({
                            branchManagerDataValidation: {
                              ...this.state.branchManagerDataValidation,
                              confirmPassword:
                                VALIDATION_MESSAGES.PASSWORDS_DO_NOT_MATCH,
                            },
                          });
                        }
                      },
                      onChange: (evt) => {
                        this.setState(
                          {
                            branchManagerData: {
                              ...this.state.branchManagerData,
                              confirmPassword: evt.target.value,
                            },
                          },
                          () => {
                            if (!this.state.branchManagerData.confirmPassword) {
                              this.setState({
                                branchManagerDataValidation: {
                                  ...this.state.branchManagerDataValidation,
                                  confirmPassword:
                                    VALIDATION_MESSAGES.PASSWORD_REQUIRED,
                                },
                              });
                            } else if (
                              this.state.branchManagerData.password !==
                              this.state.branchManagerData.confirmPassword
                            ) {
                              this.setState({
                                branchManagerDataValidation: {
                                  ...this.state.branchManagerDataValidation,
                                  confirmPassword:
                                    VALIDATION_MESSAGES.PASSWORDS_DO_NOT_MATCH,
                                },
                              });
                            } else {
                              this.setState({
                                branchManagerDataValidation: {
                                  ...this.state.branchManagerDataValidation,
                                  confirmPassword: false,
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
              <div className="form-row">
                <div className="col-sm-6">
                  <Field
                    name={STRINGS.MEMBER_CITY_INPUT}
                    component={Input}
                    placeholder={STRINGS.CITY}
                    type={"text"}
                    onBlur={() => {
                      if (!this.state.branchManagerData.city) {
                        this.setState({
                          branchManagerDataValidation: {
                            ...this.state.branchManagerDataValidation,
                            city: VALIDATION_MESSAGES.CITY_REQUIRED,
                          },
                        });
                      }
                    }}
                    meta={{
                      error: this.state.branchManagerDataValidation.city,
                      touched:
                        this.state.branchManagerDataValidation.city && true,
                    }}
                    config={{
                      value: this.state.branchManagerData.city,
                      onChange: (value) => {
                        if (NAME_REGX.test(value.target.value)) {
                          this.setState(
                            {
                              branchManagerData: {
                                ...this.state.branchManagerData,
                                city: value.target.value,
                              },
                            },
                            () => {
                              if (!this.state.branchManagerData.city) {
                                this.setState({
                                  branchManagerDataValidation: {
                                    ...this.state.branchManagerDataValidation,
                                    city: VALIDATION_MESSAGES.CITY_REQUIRED,
                                  },
                                });
                              } else {
                                this.setState({
                                  branchManagerDataValidation: {
                                    ...this.state.branchManagerDataValidation,
                                    city: false,
                                  },
                                });
                              }
                            }
                          );
                        } else if (value.target.value === "") {
                          this.setState(
                            {
                              branchManagerData: {
                                ...this.state.branchManagerData,
                                city: value.target.value,
                              },
                            },
                            () => {
                              if (!this.state.branchManagerData.city) {
                                this.setState({
                                  branchManagerDataValidation: {
                                    ...this.state.branchManagerDataValidation,
                                    city: VALIDATION_MESSAGES.CITY_REQUIRED,
                                  },
                                });
                              } else {
                                this.setState({
                                  branchManagerDataValidation: {
                                    ...this.state.branchManagerDataValidation,
                                    city: false,
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
                    name={STRINGS.MEMBER_COUNTRY_INPUT}
                    component={Select}
                    placeholder={STRINGS.COUNTRY}
                    // type={'text'}
                    options={countries}
                    isSearchable={true}
                    meta={{
                      error: this.state.branchManagerDataValidation.country,
                      touched:
                        this.state.branchManagerDataValidation.country && true,
                    }}
                    config={{
                      value: this.state.branchManagerData.country,
                      onBlur: (e) => {
                        e.preventDefault();
                        if (!this.state.branchManagerData.country) {
                          this.setState({
                            branchManagerDataValidation: {
                              ...this.state.branchManagerDataValidation,
                              country: VALIDATION_MESSAGES.COUNTRY_REQUIRED,
                            },
                          });
                        }
                      },
                      onChange: (value) => {
                        this.setState(
                          {
                            branchManagerData: {
                              ...this.state.branchManagerData,
                              country: value,
                              phoneCode: value,
                            },
                          },
                          () => {
                            const { country } = this.state.branchManagerData;
                            let requiredIndex;
                            for (
                              let index = 0;
                              index < callingCodes.length;
                              index++
                            ) {
                              let position = callingCodes[index].label.indexOf(
                                country && country.value
                              );
                              if (position !== -1) {
                                requiredIndex = index;
                                break;
                              }
                            }
                            if (country) {
                              this.setState({
                                branchManagerData: {
                                  ...this.state.branchManagerData,
                                  phoneCode: callingCodes[requiredIndex],
                                },
                              });
                              let getCode = callingCodes[requiredIndex];

                              if (getCode && getCode.value && getCode.label) {
                                var code = getCode.value.replace("+", "");
                                var label = getCode.label.split("(")[0];
                                label = label.split(getCode.value)[1];
                                getCountry = getCountryPrefix(
                                  code.trim(),
                                  label.trim()
                                );
                              }
                            }
                            if (this.state.branchManagerData.country) {
                              this.setState(
                                {
                                  branchManagerDataValidation: {
                                    ...this.state.branchManagerDataValidation,
                                    country: false,
                                    phoneCode: false,
                                  },
                                },
                                () => {
                                  this.validatePhoneNumber(getCountry);
                                }
                              );
                            } else {
                              this.setState({
                                branchManagerDataValidation: {
                                  ...this.state.branchManagerDataValidation,
                                  country: VALIDATION_MESSAGES.COUNTRY_REQUIRED,
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
              <div className="form-row">
                <div className="col-sm-6">
                  <Field
                    name={STRINGS.MEMBER_PHONE_KEY_INPUT}
                    component={Select}
                    options={callingCodes}
                    isSearchable={true}
                    placeholder={STRINGS.PHONE_NUMBER_PLACEHOLDER}
                    meta={{
                      error: this.state.branchManagerDataValidation.phoneCode,
                      touched:
                        this.state.branchManagerDataValidation.phoneCode &&
                        true,
                    }}
                    config={{
                      value: this.state.branchManagerData.phoneCode,
                      onBlur: (e) => {
                        e.preventDefault();
                        if (!this.state.branchManagerData.phoneCode) {
                          this.setState({
                            branchManagerDataValidation: {
                              ...this.state.branchManagerDataValidation,
                              phoneCode:
                                VALIDATION_MESSAGES.PHONE_CODE_KEY_REQUIRED,
                            },
                          });
                        }
                      },
                      onChange: (value) => {
                        this.setState(
                          {
                            branchManagerData: {
                              ...this.state.branchManagerData,
                              phoneCode: value,
                            },
                          },
                          () => {
                            if (this.state.branchManagerData.phoneCode) {
                              this.setState(
                                {
                                  branchManagerDataValidation: {
                                    ...this.state.branchManagerDataValidation,
                                    phoneCode: false,
                                  },
                                },
                                () => {
                                  let getCode = value;

                                  if (
                                    getCode &&
                                    getCode.value &&
                                    getCode.label
                                  ) {
                                    var code = getCode.value.replace("+", "");
                                    var label = getCode.label.split("(")[0];
                                    label = label.split(getCode.value)[1];
                                    getCountry = getCountryPrefix(
                                      code.trim(),
                                      label.trim()
                                    );
                                  }

                                  this.validatePhoneNumber(getCountry);
                                }
                              );
                            } else {
                              this.setState({
                                branchManagerDataValidation: {
                                  ...this.state.branchManagerDataValidation,
                                  phoneCode:
                                    VALIDATION_MESSAGES.PHONE_CODE_KEY_REQUIRED,
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
                    name={STRINGS.MEMBER_PHONE_INPUT}
                    component={Input}
                    placeholder={STRINGS.PHONE_NO}
                    onBlur={() => {
                      if (!this.state.branchManagerData.phoneNo) {
                        this.setState({
                          branchManagerDataValidation: {
                            ...this.state.branchManagerDataValidation,
                            phoneNo: VALIDATION_MESSAGES.PHONE_NUMBER_REQUIRED,
                          },
                        });
                      } else {
                        this.validatePhoneNumber(getCountry);
                      }
                    }}
                    meta={{
                      error: this.state.branchManagerDataValidation.phoneNo,
                      touched:
                        this.state.branchManagerDataValidation.phoneNo && true,
                    }}
                    config={{
                      value: this.state.branchManagerData.phoneNo,
                      onChange: (value) => {
                        if (PHONE_REGX.test(value.target.value)) {
                          this.setState(
                            {
                              branchManagerData: {
                                ...this.state.branchManagerData,
                                phoneNo: value.target.value,
                              },
                            },
                            () => {
                              if (!this.state.branchManagerData.phoneNo) {
                                this.setState({
                                  branchManagerDataValidation: {
                                    ...this.state.branchManagerDataValidation,
                                    phoneNo:
                                      VALIDATION_MESSAGES.PHONE_NUMBER_REQUIRED,
                                  },
                                });
                              } else if (
                                this.state.branchManagerData.phoneNo.toString()
                                  .length < 7 ||
                                this.state.branchManagerData.phoneNo.toString()
                                  .length > 15
                              ) {
                                this.setState({
                                  branchManagerDataValidation: {
                                    ...this.state.branchManagerDataValidation,
                                    phoneNo:
                                      VALIDATION_MESSAGES.PHONE_NUMBER_CHARACTER_LENGTH,
                                  },
                                });
                              }
                              // else if (this.state.branchManagerData.phoneNo.toString().length > 3 && this.state.branchManagerData.phoneNo.toString().length < 18) {
                              //     this.setState({
                              //         branchManagerDataValidation: { ...this.state.branchManagerDataValidation, phoneNo: false }
                              //     }, () => {
                              //         this.validatePhoneNumber(getCountry)
                              //     })
                              // }
                              else {
                                this.setState(
                                  {
                                    branchManagerDataValidation: {
                                      ...this.state.branchManagerDataValidation,
                                      phoneNo: false,
                                    },
                                  },
                                  () => {
                                    this.validatePhoneNumber(getCountry);
                                  }
                                );
                              }
                            }
                          );
                        } else if (value.target.value === "") {
                          this.setState(
                            {
                              branchManagerData: {
                                ...this.state.branchManagerData,
                                phoneNo: value.target.value,
                              },
                            },
                            () => {
                              if (!this.state.branchManagerData.phoneNo) {
                                this.setState({
                                  branchManagerDataValidation: {
                                    ...this.state.branchManagerDataValidation,
                                    phoneNo:
                                      VALIDATION_MESSAGES.PHONE_NUMBER_REQUIRED,
                                  },
                                });
                              } else {
                                this.setState({
                                  branchManagerDataValidation: {
                                    ...this.state.branchManagerDataValidation,
                                    phoneNo: false,
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
              <div className="form-row">
                <div className="col-sm-6">
                  <Field
                    name={STRINGS.MEMBER_NAME_INPUT}
                    component={Input}
                    placeholder={STRINGS.NAME_PLACEHOLDER}
                    type={"text"}
                    onBlur={() => {
                      if (!this.state.branchManagerData.name) {
                        this.setState({
                          branchManagerDataValidation: {
                            ...this.state.branchManagerDataValidation,
                            name: VALIDATION_MESSAGES.NAME_REQUIRED,
                          },
                        });
                      }
                    }}
                    meta={{
                      error: this.state.branchManagerDataValidation.name,
                      touched:
                        this.state.branchManagerDataValidation.name && true,
                    }}
                    config={{
                      value: this.state.branchManagerData.name,
                      onChange: (value) => {
                        if (NAME_REGX.test(value.target.value)) {
                          this.setState(
                            {
                              branchManagerData: {
                                ...this.state.branchManagerData,
                                name: value.target.value,
                              },
                            },
                            () => {
                              if (!this.state.branchManagerData.name) {
                                this.setState({
                                  branchManagerDataValidation: {
                                    ...this.state.branchManagerDataValidation,
                                    name: VALIDATION_MESSAGES.NAME_REQUIRED,
                                  },
                                });
                              } else {
                                this.setState({
                                  branchManagerDataValidation: {
                                    ...this.state.branchManagerDataValidation,
                                    name: false,
                                  },
                                });
                              }
                            }
                          );
                        } else if (value.target.value === "") {
                          this.setState(
                            {
                              branchManagerData: {
                                ...this.state.branchManagerData,
                                name: value.target.value,
                              },
                            },
                            () => {
                              if (!this.state.branchManagerData.name) {
                                this.setState({
                                  branchManagerDataValidation: {
                                    ...this.state.branchManagerDataValidation,
                                    name: VALIDATION_MESSAGES.NAME_REQUIRED,
                                  },
                                });
                              } else {
                                this.setState({
                                  branchManagerDataValidation: {
                                    ...this.state.branchManagerDataValidation,
                                    name: false,
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
                    name={STRINGS.SURNAME_INPUT}
                    component={Input}
                    placeholder={STRINGS.SURNAME_PLACEHOLDER}
                    type={"text"}
                    meta={{
                      error: this.state.branchManagerDataValidation.surname,
                      touched:
                        this.state.branchManagerDataValidation.surname && true,
                    }}
                    config={{
                      value: this.state.branchManagerData.surname,
                      onChange: (value) => {
                        if (NAME_REGX.test(value.target.value)) {
                          if (!value.target.value.startsWith(" ")) {
                            this.setState({
                              branchManagerData: {
                                ...this.state.branchManagerData,
                                surname: value.target.value,
                              },
                            });
                          }
                        } else if (value.target.value === "") {
                          this.setState({
                            branchManagerData: {
                              ...this.state.branchManagerData,
                              surname: value.target.value,
                            },
                          });
                        }
                      },
                    }}
                  />
                  <span className="text_label">optional</span>
                </div>
              </div>

              <div className="group-btn text-center">
                <button
                  className="btn btn-lg btn-primary text-capitalize"
                  type={"text"}
                  onClick={(e) => {
                    e.preventDefault();
                    if (this.branchManagarValidate()) {
                      onAddNewMember(this.state.branchManagerData);
                    }
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
