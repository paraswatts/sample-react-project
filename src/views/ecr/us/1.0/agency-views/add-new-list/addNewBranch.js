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
  TimePickerInput,
} = require(`../../../../../../components/${PLATFORM}/atoms/time-picker`);
const {
  VALIDATION_MESSAGES,
  EMAIL_REGX,
  NAME_REGX,
  REFERENCE_REGX,
  PHONE_REGX,
} = require(`../../../../../../shared/${PLATFORM}/constants`);

const {
  SnackbarWrapper,
} = require(`../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`);
const {
  FormDropDown,
} = require(`../../../../../../components/${PLATFORM}/atoms/formDropDown/`);
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
  getPhoneValid,
} = require(`../../../../../../helpers/${PLATFORM}/getPhoneValid`);
const {
  getCountryPrefix,
} = require(`../../../../../../helpers/${PLATFORM}/getCountryPrefix`);

let data = getCountryData();
let callingCodes = data.callingCodes;
let countries = data.nations;
let getCountry;

export class AddNewBranch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedData: {
        branchName: "",
        phone: "",
        email: "",
        address: "",
        suburb: "",
        country: "",
        postcode: "",
        code: "",
        pickupdropoff1: "",
        openfrom: "",
        closeby: "",
        pickupdropoff2: "",
        city: "",
        phoneCode: "",
        branchManager: "",
      },
      validation: {
        email: false,
        branchName: false,
        suburb: false,
        address: false,
      },
      edited: false,
      addBranchManger: "",
      modalVisibility: false,
      snackbarData: {
        variant: "",
        message: "",
      },
      openSnackBar: false,
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
    if (!(name.trim && name.trim())) {
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
    if (!(city.trim && city.trim())) {
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
    } else {
      this.setState({
        branchManagerDataValidation: Object.assign(
          this.state.branchManagerDataValidation,
          { phoneCode: false }
        ),
      });
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
  validate = () => {
    const {
      branchName,
      phone,
      email,
      address,
      suburb,
      city,
      country,
      postcode,
      code,
      pickupdropoff1,
      openfrom,
      closeby,
      pickupdropoff2,
      phoneCode,
      branchManager,
    } = this.state.savedData;
    let validation = true;
    if (!branchName) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          branchName: VALIDATION_MESSAGES.BRANCH_REQUIRED,
        }),
      });
      validation = false;
    }
    if (!(branchName.trim && branchName.trim())) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          branchName: VALIDATION_MESSAGES.BRANCH_REQUIRED,
        }),
      });
      validation = false;
    }
    if (!phoneCode) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          phoneCode: VALIDATION_MESSAGES.PHONE_CODE_KEY_REQUIRED,
        }),
      });
      validation = false;
    } else {
      this.setState({
        validation: Object.assign(this.state.validation, { phoneCode: false }),
      });
    }
    if (!phone) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          phone: VALIDATION_MESSAGES.PHONE_NUMBER_REQUIRED,
        }),
      });
      validation = false;
    }
    if (!email) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          email: VALIDATION_MESSAGES.EMAIL_REQUIRED,
        }),
      });
      validation = false;
    }

    if (!address) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          address: VALIDATION_MESSAGES.ADDRESS_REQUIRED,
        }),
      });
      validation = false;
    }
    if (!(address.trim && address.trim())) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          address: VALIDATION_MESSAGES.ADDRESS_REQUIRED,
        }),
      });
      validation = false;
    }
    if (!suburb) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          suburb: VALIDATION_MESSAGES.SUBURB_REQUIRED,
        }),
      });
    }
    if (!(suburb.trim && suburb.trim())) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          suburb: VALIDATION_MESSAGES.SUBURB_REQUIRED,
        }),
      });
    }
    if (!city) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          city: VALIDATION_MESSAGES.CITY_REQUIRED,
        }),
      });
      validation = false;
    }
    if (!(city.trim && city.trim())) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          city: VALIDATION_MESSAGES.CITY_REQUIRED,
        }),
      });
      validation = false;
    }
    if (!country) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          country: VALIDATION_MESSAGES.COUNTRY_REQUIRED,
        }),
      });
      validation = false;
    }
    if (!postcode) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          postcode: VALIDATION_MESSAGES.POSTCODE_REQUIRED,
        }),
      });
    }
    if (!code) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          code: VALIDATION_MESSAGES.CODE_REQUIRED,
        }),
      });
    }
    if (!pickupdropoff1) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          pickupdropoff1: VALIDATION_MESSAGES.PICK_DROP_REQUIRED,
        }),
      });
    }
    if (!openfrom) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          openfrom: VALIDATION_MESSAGES.OPEN_FROM_REQUIRED,
        }),
      });
      validation = false;
    }

    if (!closeby) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          closeby: VALIDATION_MESSAGES.CLOSE_BY_REQUIRED,
        }),
      });
      validation = false;
    }
    if (!pickupdropoff2) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          pickupdropoff2: VALIDATION_MESSAGES.PICK_DROP_TO_REQUIRED,
        }),
      });
      validation = false;
    }
    if (!branchManager) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          branchManager: VALIDATION_MESSAGES.BRANCH_MANAGER_REQUIRED,
        }),
      });
      validation = false;
    }

    Object.values(this.state.validation).find((item, index) => {
      if (!!item) {
        validation = false;
      }
    });

    return validation;
  };
  validatePhoneNumber(country) {
    let number;
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

  validateBranchPhoneNumber(country) {
    let number;
    if (this.state.savedData.phone) {
      number = getPhoneValid(this.state.savedData.phone, getCountry);
      if (number && number === "invalid") {
        this.setState({
          validation: {
            ...this.state.validation,
            phone: VALIDATION_MESSAGES.INVALID_NUMBER_FOR_COUNTRY,
          },
        });
      } else {
        this.setState({
          validation: { ...this.state.validation, phone: false },
        });
      }
    }
  }

  getCountryCode(getCode) {
    if (getCode && getCode.value && getCode.label) {
      var code = getCode.value.replace("+", "");
      var label = getCode.label.split("(")[0];
      label = label.split(getCode.value)[1];
      getCountry = getCountryPrefix(code.trim(), label.trim());
    }
  }
  render() {
    const {
      modalVisibilityHandler,
      branchManagers,
      ADD_ICON,
      onAddNewMember,
    } = this.props;
    const { openSnackBar, snackbarData, addBranchManger } = this.state;
    const maxDate = new Date();

    return (
      <>
        <div id="myModal" className="modal">
          <div className={`modal-content ${!addBranchManger && `modal-lg`}`}>
            <SnackbarWrapper
              visible={openSnackBar}
              onClose={() => this.setState({ openSnackBar: false })}
              variant={snackbarData.variant}
              message={snackbarData.message}
            />
            <div
              className="modal_body"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <span
                className="close"
                onClick={() => {
                  if (addBranchManger) {
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
                  } else {
                    modalVisibilityHandler();
                  }
                }}
              >
                &times;
              </span>

              {addBranchManger ? (
                <form>
                  <h5 className="mb-3">{"Add new member"}</h5>

                  <div className="form-row">
                    <div className="col-sm-6">
                      <Field
                        name={STRINGS.BRANCH_MANAGER_EMAIL}
                        component={Input}
                        placeholder={STRINGS.EMAIL_PLACEHOLDER}
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
                            this.state.branchManagerDataValidation.email &&
                            true,
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
                                      email:
                                        VALIDATION_MESSAGES.EMAIL_IS_NOT_VALID,
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
                        maxDate={maxDate.setFullYear(
                          maxDate.getFullYear() - 16
                        )}
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
                          error: this.state.branchManagerDataValidation
                            .password,
                          touched:
                            this.state.branchManagerDataValidation.password &&
                            true,
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
                                  password:
                                    VALIDATION_MESSAGES.PASSWORD_REQUIRED,
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
                                  this.state.branchManagerData
                                    .confirmPassword &&
                                  this.state.branchManagerData
                                    .confirmPassword !==
                                    this.state.branchManagerData.password
                                ) {
                                  this.setState({
                                    branchManagerDataValidation: {
                                      ...this.state.branchManagerDataValidation,
                                      confirmPassword:
                                        VALIDATION_MESSAGES.PASSWORDS_DO_NOT_MATCH,
                                      password: false,
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
                                if (
                                  !this.state.branchManagerData.confirmPassword
                                ) {
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
                        name={STRINGS.CITY_INPUT}
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
                                        ...this.state
                                          .branchManagerDataValidation,
                                        city: VALIDATION_MESSAGES.CITY_REQUIRED,
                                      },
                                    });
                                  } else {
                                    this.setState({
                                      branchManagerDataValidation: {
                                        ...this.state
                                          .branchManagerDataValidation,
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
                                        ...this.state
                                          .branchManagerDataValidation,
                                        city: VALIDATION_MESSAGES.CITY_REQUIRED,
                                      },
                                    });
                                  } else {
                                    this.setState({
                                      branchManagerDataValidation: {
                                        ...this.state
                                          .branchManagerDataValidation,
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
                        name={STRINGS.COUNTRY_INPUT}
                        component={Select}
                        placeholder={STRINGS.COUNTRY}
                        // type={'text'}
                        options={countries}
                        isSearchable={true}
                        meta={{
                          error: this.state.branchManagerDataValidation.country,
                          touched:
                            this.state.branchManagerDataValidation.country &&
                            true,
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
                                const {
                                  country,
                                } = this.state.branchManagerData;
                                let requiredIndex;
                                for (
                                  let index = 0;
                                  index < callingCodes.length;
                                  index++
                                ) {
                                  let position = callingCodes[
                                    index
                                  ].label.indexOf(country && country.value);
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
                                  this.getCountryCode(
                                    callingCodes[requiredIndex]
                                  );
                                }
                                if (this.state.branchManagerData.country) {
                                  this.setState(
                                    {
                                      branchManagerDataValidation: {
                                        ...this.state
                                          .branchManagerDataValidation,
                                        country: false,
                                        phoneCode: false,
                                      },
                                    },
                                    () => {
                                      this.validatePhoneNumber(getCountry);
                                    }
                                  );
                                  // if (this.state.branchManagerData.phoneNo.toString().length > 3 && this.state.branchManagerData.phoneNo.toString().length < 18) {

                                  // }
                                } else {
                                  this.setState({
                                    branchManagerDataValidation: {
                                      ...this.state.branchManagerDataValidation,
                                      country:
                                        VALIDATION_MESSAGES.COUNTRY_REQUIRED,
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
                        name={STRINGS.PHONE_CODE_KEY}
                        component={Select}
                        options={callingCodes}
                        isSearchable={true}
                        placeholder={STRINGS.PHONE_NUMBER_PLACEHOLDER}
                        meta={{
                          error: this.state.branchManagerDataValidation
                            .phoneCode,
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
                                        ...this.state
                                          .branchManagerDataValidation,
                                        phoneCode: false,
                                      },
                                    },
                                    () => {
                                      this.getCountryCode(value);
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
                        name={STRINGS.PHONE_NUMBER_KEY}
                        component={Input}
                        placeholder={STRINGS.PHONE_NO}
                        onBlur={() => {
                          if (!this.state.branchManagerData.phoneNo) {
                            this.setState({
                              branchManagerDataValidation: {
                                ...this.state.branchManagerDataValidation,
                                phoneNo:
                                  VALIDATION_MESSAGES.PHONE_NUMBER_REQUIRED,
                              },
                            });
                          }
                        }}
                        meta={{
                          error: this.state.branchManagerDataValidation.phoneNo,
                          touched:
                            this.state.branchManagerDataValidation.phoneNo &&
                            true,
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
                                        ...this.state
                                          .branchManagerDataValidation,
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
                                        ...this.state
                                          .branchManagerDataValidation,
                                        phoneNo:
                                          VALIDATION_MESSAGES.PHONE_NUMBER_CHARACTER_LENGTH,
                                      },
                                    });
                                  } else {
                                    this.setState(
                                      {
                                        branchManagerDataValidation: {
                                          ...this.state
                                            .branchManagerDataValidation,
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
                                        ...this.state
                                          .branchManagerDataValidation,
                                        phoneNo:
                                          VALIDATION_MESSAGES.PHONE_NUMBER_REQUIRED,
                                      },
                                    });
                                  } else {
                                    this.setState({
                                      branchManagerDataValidation: {
                                        ...this.state
                                          .branchManagerDataValidation,
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
                        name={STRINGS.NAME_INPUT}
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
                                        ...this.state
                                          .branchManagerDataValidation,
                                        name: VALIDATION_MESSAGES.NAME_REQUIRED,
                                      },
                                    });
                                  } else {
                                    this.setState({
                                      branchManagerDataValidation: {
                                        ...this.state
                                          .branchManagerDataValidation,
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
                                        ...this.state
                                          .branchManagerDataValidation,
                                        name: VALIDATION_MESSAGES.NAME_REQUIRED,
                                      },
                                    });
                                  } else {
                                    this.setState({
                                      branchManagerDataValidation: {
                                        ...this.state
                                          .branchManagerDataValidation,
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
                            this.state.branchManagerDataValidation.surname &&
                            true,
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
                      <span class="text_label">optional</span>
                    </div>
                  </div>

                  <div className="group-btn text-center">
                    <button
                      className="btn btn-lg btn-primary text-capitalize"
                      type={"text"}
                      onClick={(e) => {
                        e.preventDefault();
                        if (this.branchManagarValidate()) {
                          const {
                            email,
                            password,
                            dob,
                            city,
                            country,
                            name,
                            phoneCode,
                            phoneNo,
                            surname,
                          } = this.state.branchManagerData;
                          onAddNewMember(
                            {
                              email,
                              password,
                              name: name.trim(),
                              surname: surname.trim && surname.trim(),
                              dob: dob.getTime(),
                              city: city.trim(),
                              country: country.value,
                              phoneNumber: {
                                code: phoneCode.value,
                                phone: phoneNo,
                              },
                            },
                            (response) => {
                              this.setState({
                                snackbarData: {
                                  variant: response.status
                                    ? "success"
                                    : "error",
                                  message: response.msg || "error",
                                },
                              });
                              this.setState({ openSnackBar: true });
                              this.setState({ addBranchManger: false });
                            },
                            (response) => {
                              this.setState({
                                snackbarData: {
                                  variant: response.status
                                    ? "success"
                                    : "error",
                                  message: response.msg || "error",
                                },
                              });
                              this.setState({ openSnackBar: true });
                            }
                          );
                        }
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h5 className="mb-3">{STRINGS.ADD_NEW_BRANCH}</h5>
                  <div className="form-fields">
                    <div className="form-row">
                      <div className="col-md-4">
                        <Field
                          name={STRINGS.BRANCH_NAME}
                          component={Input}
                          placeholder={STRINGS.BRANCH_NAME_PLACEHOLDER}
                          type={"text"}
                          meta={{
                            error:
                              this.state.validation.branchName &&
                              this.state.validation.branchName,
                            touched: this.state.validation.branchName && true,
                          }}
                          onBlur={() => {
                            if (!this.state.savedData.branchName) {
                              this.setState({
                                validation: {
                                  ...this.state.validation,
                                  branchName:
                                    VALIDATION_MESSAGES.BRANCH_REQUIRED,
                                },
                              });
                            }
                          }}
                          config={{
                            value: this.state.savedData.branchName,
                            onChange: (value) => {
                              this.setState(
                                {
                                  savedData: {
                                    ...this.state.savedData,
                                    branchName: value.target.value,
                                  },
                                },
                                () => {
                                  if (!this.state.savedData.branchName) {
                                    this.setState({
                                      validation: {
                                        ...this.state.validation,
                                        branchName:
                                          VALIDATION_MESSAGES.BRANCH_REQUIRED,
                                      },
                                    });
                                  }
                                  if (this.state.savedData.branchName) {
                                    this.setState({
                                      validation: {
                                        ...this.state.validation,
                                        branchName: false,
                                      },
                                    });
                                  }
                                }
                              );
                            },
                          }}
                        />
                      </div>
                      <div className="col-md-4">
                        <Field
                          name={STRINGS.PHONE_CODE_KEY}
                          component={Select}
                          options={callingCodes}
                          isSearchable={true}
                          placeholder={STRINGS.PHONE_NUMBER_PLACEHOLDER}
                          onBlur={() => {
                            if (!this.state.savedData.phoneCode) {
                              this.setState({
                                validation: {
                                  ...this.state.validation,
                                  phoneCode:
                                    VALIDATION_MESSAGES.PHONE_CODE_KEY_REQUIRED,
                                },
                              });
                            }
                          }}
                          meta={{
                            error:
                              this.state.validation.phoneCode &&
                              this.state.validation.phoneCode,
                            touched: this.state.validation.phoneCode && true,
                          }}
                          config={{
                            onBlur: (e) => {
                              e.preventDefault();
                              if (!this.state.savedData.phoneCode) {
                                this.setState({
                                  validation: {
                                    ...this.state.validation,
                                    phoneCode:
                                      VALIDATION_MESSAGES.PHONE_CODE_KEY_REQUIRED,
                                  },
                                });
                              }
                            },
                            value: this.state.savedData.phoneCode,
                            onChange: (value) => {
                              this.setState(
                                {
                                  savedData: {
                                    ...this.state.savedData,
                                    phoneCode: value,
                                  },
                                },
                                () => {
                                  if (this.state.savedData.phoneCode) {
                                    this.setState(
                                      {
                                        validation: {
                                          ...this.state.validation,
                                          phoneCode: false,
                                        },
                                      },
                                      () => {
                                        this.getCountryCode(value);
                                        this.validateBranchPhoneNumber(
                                          getCountry
                                        );
                                      }
                                    );
                                  } else {
                                    this.setState({
                                      validation: {
                                        ...this.state.validation,
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

                      <div className="col-md-4">
                        <Field
                          name={STRINGS.PHONE_NAME}
                          normalize={(val, val1) => {
                            if (PHONE_REGX.test(val)) {
                              return val;
                            } else if (val === "") {
                              return val;
                            } else {
                              return val1;
                            }
                          }}
                          component={Input}
                          placeholder={STRINGS.PHONE_NO}
                          type={"number"}
                          onBlur={() => {
                            if (!this.state.savedData.phone) {
                              this.setState({
                                validation: {
                                  ...this.state.validation,
                                  phone:
                                    VALIDATION_MESSAGES.PHONE_NUMBER_REQUIRED,
                                },
                              });
                            }
                          }}
                          meta={{
                            error:
                              this.state.validation.phone &&
                              this.state.validation.phone,
                            touched: this.state.validation.phone && true,
                          }}
                          config={{
                            value: this.state.savedData.phone,
                            onChange: (value) => {
                              if (PHONE_REGX.test(value.target.value)) {
                                this.setState(
                                  {
                                    savedData: {
                                      ...this.state.savedData,
                                      phone: value.target.value,
                                    },
                                  },
                                  () => {
                                    if (!this.state.savedData.phone) {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          phone:
                                            VALIDATION_MESSAGES.PHONE_NUMBER_REQUIRED,
                                        },
                                      });
                                    } else if (
                                      this.state.savedData.phone.toString()
                                        .length < 7 ||
                                      this.state.savedData.phone.toString()
                                        .length > 15
                                    ) {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          phone:
                                            VALIDATION_MESSAGES.PHONE_NUMBER_CHARACTER_LENGTH,
                                        },
                                      });
                                    } else {
                                      this.setState(
                                        {
                                          validation: {
                                            ...this.state.validation,
                                            phone: false,
                                          },
                                        },
                                        () => {
                                          this.validateBranchPhoneNumber(
                                            getCountry
                                          );
                                        }
                                      );
                                    }
                                  }
                                );
                              } else if (value.target.value === "") {
                                this.setState(
                                  {
                                    savedData: {
                                      ...this.state.savedData,
                                      phone: value.target.value,
                                    },
                                  },
                                  () => {
                                    if (!this.state.savedData.phone) {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          phone:
                                            VALIDATION_MESSAGES.PHONE_NUMBER_REQUIRED,
                                        },
                                      });
                                    } else {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          phone: false,
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
                  <div className="form-fields">
                    <div className="form-row">
                      <div className="col-md-4">
                        <Field
                          name={STRINGS.EMAIL_INPUT_NAME}
                          component={Input}
                          placeholder={STRINGS.EMAIL_PLACEHOLDER}
                          meta={{
                            error:
                              this.state.validation.email &&
                              this.state.validation.email,
                            touched: this.state.validation.email && true,
                          }}
                          onBlur={() => {
                            if (!this.state.savedData.email) {
                              this.setState({
                                validation: {
                                  ...this.state.validation,
                                  email: VALIDATION_MESSAGES.EMAIL_REQUIRED,
                                },
                              });
                            } else if (
                              !EMAIL_REGX.test(this.state.savedData.email)
                            ) {
                              this.setState({
                                validation: {
                                  ...this.state.validation,
                                  email: VALIDATION_MESSAGES.EMAIL_IS_NOT_VALID,
                                },
                              });
                            }
                          }}
                          config={{
                            value: this.state.savedData.email,
                            onChange: (value) => {
                              this.setState(
                                {
                                  savedData: {
                                    ...this.state.savedData,
                                    email: value.target.value,
                                  },
                                },
                                () => {
                                  if (
                                    !EMAIL_REGX.test(this.state.savedData.email)
                                  ) {
                                    this.setState({
                                      validation: {
                                        ...this.state.validation,
                                        email:
                                          VALIDATION_MESSAGES.EMAIL_IS_NOT_VALID,
                                      },
                                    });
                                  }
                                  if (!this.state.savedData.email) {
                                    this.setState({
                                      validation: {
                                        ...this.state.validation,
                                        email:
                                          VALIDATION_MESSAGES.EMAIL_REQUIRED,
                                      },
                                    });
                                  }
                                  if (
                                    EMAIL_REGX.test(
                                      this.state.savedData.email
                                    ) &&
                                    this.state.savedData.email
                                  ) {
                                    this.setState({
                                      validation: {
                                        ...this.state.validation,
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
                      <div className="col-md-4">
                        <Field
                          name={STRINGS.ADDRESS_INPUT_NAME}
                          component={Input}
                          placeholder={STRINGS.ADDRESS}
                          type={"text"}
                          meta={{
                            error:
                              this.state.validation.address &&
                              this.state.validation.address,
                            touched: this.state.validation.address && true,
                          }}
                          onBlur={() => {
                            if (!this.state.savedData.address) {
                              this.setState({
                                validation: {
                                  ...this.state.validation,
                                  address: VALIDATION_MESSAGES.ADDRESS_REQUIRED,
                                },
                              });
                            }
                          }}
                          config={{
                            value: this.state.savedData.address,
                            onChange: (value) => {
                              this.setState(
                                {
                                  savedData: {
                                    ...this.state.savedData,
                                    address: value.target.value,
                                  },
                                },
                                () => {
                                  if (this.state.savedData.address) {
                                    this.setState({
                                      validation: {
                                        ...this.state.validation,
                                        address: false,
                                      },
                                    });
                                  }
                                }
                              );
                            },
                          }}
                        />
                      </div>
                      <div className="col-md-4">
                        <Field
                          name={STRINGS.SUBURB_INPUT_NAME}
                          component={Input}
                          placeholder={STRINGS.SUBURB_PLACEHOLDER}
                          onBlur={() => {
                            if (!this.state.savedData.suburb) {
                              this.setState({
                                validation: {
                                  ...this.state.validation,
                                  suburb: VALIDATION_MESSAGES.SUBURB_REQUIRED,
                                },
                              });
                            }
                          }}
                          type={"text"}
                          meta={{
                            error:
                              this.state.validation.suburb &&
                              this.state.validation.suburb,
                            touched: this.state.validation.suburb && true,
                          }}
                          config={{
                            value: this.state.savedData.suburb,
                            onChange: (value) => {
                              if (NAME_REGX.test(value.target.value)) {
                                this.setState(
                                  {
                                    savedData: {
                                      ...this.state.savedData,
                                      suburb: value.target.value,
                                    },
                                  },
                                  () => {
                                    if (!this.state.savedData.suburb) {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          suburb:
                                            VALIDATION_MESSAGES.SUBURB_REQUIRED,
                                        },
                                      });
                                    } else {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          suburb: false,
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
                                      suburb: value.target.value,
                                    },
                                  },
                                  () => {
                                    if (!this.state.savedData.suburb) {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          suburb:
                                            VALIDATION_MESSAGES.SUBURB_REQUIRED,
                                        },
                                      });
                                    } else {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          suburb: false,
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
                  <div className="form-fields">
                    <div className="form-row">
                      <div className="col-md-4">
                        <Field
                          name={STRINGS.CITY_INPUT}
                          component={Input}
                          placeholder={STRINGS.CITY}
                          type={"text"}
                          onBlur={() => {
                            if (!this.state.savedData.city) {
                              this.setState({
                                validation: {
                                  ...this.state.validation,
                                  city: VALIDATION_MESSAGES.CITY_REQUIRED,
                                },
                              });
                            }
                          }}
                          meta={{
                            error:
                              this.state.validation.city &&
                              this.state.validation.city,
                            touched: this.state.validation.city && true,
                          }}
                          config={{
                            value: this.state.savedData.city,
                            onChange: (value) => {
                              if (NAME_REGX.test(value.target.value)) {
                                this.setState(
                                  {
                                    savedData: {
                                      ...this.state.savedData,
                                      city: value.target.value,
                                    },
                                  },
                                  () => {
                                    if (!this.state.savedData.city) {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          city:
                                            VALIDATION_MESSAGES.CITY_REQUIRED,
                                        },
                                      });
                                    } else {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          city: false,
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
                                      city: value.target.value,
                                    },
                                  },
                                  () => {
                                    if (!this.state.savedData.city) {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          city:
                                            VALIDATION_MESSAGES.CITY_REQUIRED,
                                        },
                                      });
                                    } else {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
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
                      <div className="col-md-4">
                        <Field
                          name={STRINGS.COUNTRY_INPUT}
                          component={Select}
                          placeholder={STRINGS.COUNTRY}
                          options={countries}
                          isSearchable={true}
                          meta={{
                            error:
                              this.state.validation.country &&
                              this.state.validation.country,
                            touched: this.state.validation.country && true,
                          }}
                          config={{
                            onBlur: (e) => {
                              e.preventDefault();
                              if (!this.state.savedData.country) {
                                this.setState({
                                  validation: {
                                    ...this.state.validation,
                                    country:
                                      VALIDATION_MESSAGES.COUNTRY_REQUIRED,
                                  },
                                });
                              }
                            },
                            value: this.state.savedData.country,
                            onChange: (value) => {
                              this.setState(
                                {
                                  savedData: {
                                    ...this.state.savedData,
                                    country: value,
                                  },
                                },
                                () => {
                                  const { country } = this.state.savedData;
                                  let requiredIndex;
                                  for (
                                    let index = 0;
                                    index < callingCodes.length;
                                    index++
                                  ) {
                                    let position = callingCodes[
                                      index
                                    ].label.indexOf(country && country.value);
                                    if (position !== -1) {
                                      requiredIndex = index;
                                      break;
                                    }
                                  }
                                  if (country) {
                                    this.setState({
                                      savedData: {
                                        ...this.state.savedData,
                                        phoneCode: callingCodes[requiredIndex],
                                      },
                                    });
                                    this.getCountryCode(
                                      callingCodes[requiredIndex]
                                    );
                                  }
                                  if (this.state.savedData.country) {
                                    this.setState(
                                      {
                                        validation: {
                                          ...this.state.validation,
                                          country: false,
                                          phoneCode: false,
                                        },
                                      },
                                      () => {
                                        this.validateBranchPhoneNumber(
                                          getCountry
                                        );
                                      }
                                    );
                                    // if (this.state.savedData.phone.toString().length > 3 && this.state.savedData.phone.toString().length < 18) {

                                    // }
                                  }
                                }
                              );
                            },
                          }}
                        />
                      </div>
                      <div className="col-md-4">
                        <Field
                          name={STRINGS.POSTCODE_INPUT}
                          component={Input}
                          placeholder={STRINGS.POSTCODE_INPUT_PLACEHOLDER}
                          type={"text"}
                          onBlur={() => {
                            if (!this.state.savedData.postcode) {
                              this.setState({
                                validation: {
                                  ...this.state.validation,
                                  postcode:
                                    VALIDATION_MESSAGES.POSTCODE_REQUIRED,
                                },
                              });
                            }
                          }}
                          meta={{
                            error:
                              this.state.validation.postcode &&
                              this.state.validation.postcode,
                            touched: this.state.validation.postcode && true,
                          }}
                          config={{
                            value: this.state.savedData.postcode,
                            onChange: (value) => {
                              if (REFERENCE_REGX.test(value.target.value)) {
                                this.setState(
                                  {
                                    savedData: {
                                      ...this.state.savedData,
                                      postcode: value.target.value,
                                    },
                                  },
                                  () => {
                                    if (!this.state.savedData.postcode) {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          postcode:
                                            VALIDATION_MESSAGES.POSTCODE_REQUIRED,
                                        },
                                      });
                                    } else {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          postcode: false,
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
                                      postcode: value.target.value,
                                    },
                                  },
                                  () => {
                                    if (!this.state.savedData.postcode) {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          postcode:
                                            VALIDATION_MESSAGES.POSTCODE_REQUIRED,
                                        },
                                      });
                                    } else {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          postcode: false,
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
                      <div className="col-md-4">
                        <Field
                          name={STRINGS.CODE_INPUT}
                          component={Input}
                          placeholder={STRINGS.CODE_PLACEHOLDER}
                          type={"text"}
                          onBlur={() => {
                            if (!this.state.savedData.code) {
                              this.setState({
                                validation: {
                                  ...this.state.validation,
                                  code: VALIDATION_MESSAGES.CODE_REQUIRED,
                                },
                              });
                            }
                          }}
                          meta={{
                            error:
                              this.state.validation.code &&
                              this.state.validation.code,
                            touched: this.state.validation.code && true,
                          }}
                          config={{
                            value: this.state.savedData.code,
                            onChange: (value) => {
                              if (REFERENCE_REGX.test(value.target.value)) {
                                this.setState(
                                  {
                                    savedData: {
                                      ...this.state.savedData,
                                      code: value.target.value,
                                    },
                                  },
                                  () => {
                                    if (!this.state.savedData.code) {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          code:
                                            VALIDATION_MESSAGES.CODE_REQUIRED,
                                        },
                                      });
                                    } else {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          code: false,
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
                                      code: value.target.value,
                                    },
                                  },
                                  () => {
                                    if (!this.state.savedData.code) {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          code:
                                            VALIDATION_MESSAGES.CODE_REQUIRED,
                                        },
                                      });
                                    } else {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          code: false,
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

                  <div className="form-fields mt-4">
                    <div className="form-row">
                      <div className="col-md-4">
                        <Field
                          name={STRINGS.PICK_UP_DROP_OFF_TO_FIRST}
                          component={TimePickerInput}
                          placeholder={STRINGS.PICK_UP_DROP_OFF_FROM}
                          type={"text"}
                          meta={{
                            error:
                              this.state.validation.pickupdropoff1 &&
                              this.state.validation.pickupdropoff1,
                            touched:
                              this.state.validation.pickupdropoff1 && true,
                          }}
                          config={{
                            onBlur: () => {
                              if (!this.state.savedData.pickupdropoff1) {
                                this.setState({
                                  validation: {
                                    ...this.state.validation,
                                    pickupdropoff1:
                                      VALIDATION_MESSAGES.PICK_DROP_TO_REQUIRED,
                                  },
                                });
                              }
                            },
                            value: this.state.savedData.pickupdropoff1,
                            onChange: (value) => {
                              value.setSeconds(0);
                              value.setMilliseconds(0);
                              if (
                                this.state.savedData.openfrom.getTime &&
                                this.state.savedData.openfrom.getTime() >
                                  value.getTime()
                              ) {
                                this.setState({
                                  snackbarData: {
                                    variant: "error",
                                    message:
                                      VALIDATION_MESSAGES.PICK_UP_DROP_OFF_FROM_GREATER_THAN_OPENING_TIME,
                                  },
                                });
                                this.setState({
                                  openSnackBar: true,
                                });
                              } else if (
                                value.getTime() >
                                (this.state.savedData.pickupdropoff2.getTime &&
                                  this.state.savedData.pickupdropoff2.getTime())
                              ) {
                                this.setState({
                                  snackbarData: {
                                    variant: "error",
                                    message:
                                      VALIDATION_MESSAGES.PICK_UP_DROP_OFF_FROM_GREATER_THAN_PICK_UP_DROP_OFF_TO,
                                  },
                                });
                                this.setState({
                                  openSnackBar: true,
                                });
                              } else if (
                                (this.state.savedData.pickupdropoff2.getTime &&
                                  this.state.savedData.pickupdropoff2.getTime() -
                                    value.getTime()) < 1200000
                              ) {
                                this.setState({
                                  snackbarData: {
                                    variant: "error",
                                    message:
                                      VALIDATION_MESSAGES.PICK_UP_DROP_OFF_FROM_20MINT_GREATER_THAN_PICK_UP_DROP_OFF_TO,
                                  },
                                });
                                this.setState({
                                  openSnackBar: true,
                                });
                              } else {
                                this.setState(
                                  {
                                    savedData: {
                                      ...this.state.savedData,
                                      pickupdropoff1: value,
                                    },
                                  },
                                  () => {
                                    if (!this.state.savedData.pickupdropoff1) {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          pickupdropoff1:
                                            VALIDATION_MESSAGES.PICK_DROP_TO_REQUIRED,
                                        },
                                      });
                                    } else {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          pickupdropoff1: false,
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
                      <div className="col-md-4">
                        <Field
                          name={STRINGS.OPEN_FROM}
                          component={TimePickerInput}
                          placeholder={STRINGS.OPEN_FROM_PLACEHOLDER}
                          type={"text"}
                          meta={{
                            error:
                              this.state.validation.openfrom &&
                              this.state.validation.openfrom,
                            touched: this.state.validation.openfrom && true,
                          }}
                          config={{
                            onBlur: () => {
                              if (!this.state.savedData.openfrom) {
                                this.setState({
                                  validation: {
                                    ...this.state.validation,
                                    openfrom:
                                      VALIDATION_MESSAGES.OPEN_FROM_REQUIRED,
                                  },
                                });
                              }
                            },
                            value: this.state.savedData.openfrom,
                            onChange: (value) => {
                              value.setSeconds(0);
                              value.setMilliseconds(0);

                              if (
                                this.state.savedData.pickupdropoff1.getTime &&
                                this.state.savedData.pickupdropoff1.getTime() <
                                  value.getTime()
                              ) {
                                this.setState({
                                  snackbarData: {
                                    variant: "error",
                                    message:
                                      VALIDATION_MESSAGES.OPENING_TIME_LESS_THAN_PICK_DROP_OFF,
                                  },
                                });
                                this.setState({
                                  openSnackBar: true,
                                });
                              } else {
                                this.setState(
                                  {
                                    savedData: {
                                      ...this.state.savedData,
                                      openfrom: value,
                                    },
                                  },
                                  () => {
                                    if (!this.state.savedData.openfrom) {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          openfrom:
                                            VALIDATION_MESSAGES.OPEN_FROM_REQUIRED,
                                        },
                                      });
                                    } else {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          openfrom: false,
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
                  <div className="form-fields">
                    <div className="form-row">
                      <div className="col-md-4">
                        <Field
                          name={STRINGS.PICK_UP_DROP_OFF_TO_SECOND}
                          component={TimePickerInput}
                          placeholder={STRINGS.PICK_UP_DROP_OFF_TO}
                          type={"text"}
                          meta={{
                            error:
                              this.state.validation.pickupdropoff2 &&
                              this.state.validation.pickupdropoff2,
                            touched:
                              this.state.validation.pickupdropoff2 && true,
                          }}
                          config={{
                            onBlur: () => {
                              if (!this.state.savedData.pickupdropoff2) {
                                this.setState({
                                  validation: {
                                    ...this.state.validation,
                                    pickupdropoff2:
                                      VALIDATION_MESSAGES.PICK_DROP_TO_REQUIRED,
                                  },
                                });
                              }
                            },
                            value: this.state.savedData.pickupdropoff2,
                            onChange: (value) => {
                              value.setSeconds(0);

                              if (
                                this.state.savedData.closeby.getTime &&
                                this.state.savedData.closeby.getTime() <
                                  value.getTime()
                              ) {
                                this.setState({
                                  snackbarData: {
                                    variant: "error",
                                    message:
                                      VALIDATION_MESSAGES.PICK_DROP_FROM_LESS_THAN_CLOSING_TIME,
                                  },
                                });
                                this.setState({
                                  openSnackBar: true,
                                });
                              } else if (
                                this.state.savedData.openfrom.getTime &&
                                this.state.savedData.openfrom.getTime() >
                                  value.getTime()
                              ) {
                                this.setState({
                                  snackbarData: {
                                    variant: "error",
                                    message:
                                      VALIDATION_MESSAGES.PICK_UP_DROP_OFF_FROM_GREATER_THAN_OPENING_TIME,
                                  },
                                });

                                this.setState({
                                  openSnackBar: true,
                                });
                              } else if (
                                value.getTime() -
                                  (this.state.savedData.openfrom.getTime &&
                                    this.state.savedData.openfrom.getTime()) <
                                3600000
                              ) {
                                this.setState({
                                  snackbarData: {
                                    variant: "error",
                                    message:
                                      VALIDATION_MESSAGES.PICK_DROP_1HOUR_GREATER_THAN_OPRNING,
                                  },
                                });
                                this.setState({
                                  openSnackBar: true,
                                });
                              } else if (
                                value.getTime() <
                                (this.state.savedData.pickupdropoff1.getTime &&
                                  this.state.savedData.pickupdropoff1.getTime())
                              ) {
                                this.setState({
                                  snackbarData: {
                                    variant: "error",
                                    message:
                                      VALIDATION_MESSAGES.PICK_DROP_TO_GREATER_THAN_PICK_DROP_FROM,
                                  },
                                });
                                this.setState({
                                  openSnackBar: true,
                                });
                              } else if (
                                value.getTime() -
                                  (this.state.savedData.pickupdropoff1
                                    .getTime &&
                                    this.state.savedData.pickupdropoff1.getTime()) <
                                1200000
                              ) {
                                this.setState({
                                  snackbarData: {
                                    variant: "error",
                                    message:
                                      VALIDATION_MESSAGES.PICK_UP_DROP_OFF_TO_20MINT_LESS_THAN_PICK_UP_DROP_OFF_FROM,
                                  },
                                });
                                this.setState({
                                  openSnackBar: true,
                                });
                              } else {
                                this.setState(
                                  {
                                    savedData: {
                                      ...this.state.savedData,
                                      pickupdropoff2: value,
                                    },
                                  },
                                  () => {
                                    if (!this.state.savedData.pickupdropoff2) {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          pickupdropoff2:
                                            VALIDATION_MESSAGES.PICK_DROP_TO_REQUIRED,
                                        },
                                      });
                                    } else {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          pickupdropoff2: false,
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
                      <div className="col-md-4">
                        <Field
                          name={STRINGS.CLOSE_BY}
                          component={TimePickerInput}
                          placeholder={STRINGS.CLOSE_BY_PLACEHOLDER}
                          type={"text"}
                          meta={{
                            error:
                              this.state.validation.closeby &&
                              this.state.validation.closeby,
                            touched: this.state.validation.closeby && true,
                          }}
                          config={{
                            onBlur: () => {
                              if (!this.state.savedData.closeby) {
                                this.setState({
                                  validation: {
                                    ...this.state.validation,
                                    closeby:
                                      VALIDATION_MESSAGES.CLOSE_BY_REQUIRED,
                                  },
                                });
                              }
                            },
                            value: this.state.savedData.closeby,
                            onChange: (value) => {
                              value.setSeconds(0);
                              if (
                                this.state.savedData.pickupdropoff2 &&
                                this.state.savedData.pickupdropoff2.getTime() >
                                  value.getTime()
                              ) {
                                this.setState({
                                  snackbarData: {
                                    variant: "error",
                                    message:
                                      VALIDATION_MESSAGES.CLOSING_TIME_GREATER_THAN_PICK_DROP_OFF_TO,
                                  },
                                });
                                this.setState({
                                  openSnackBar: true,
                                });
                              } else if (
                                this.state.savedData.pickupdropoff1 &&
                                this.state.savedData.pickupdropoff1.getTime() >
                                  value.getTime()
                              ) {
                                this.setState({
                                  snackbarData: {
                                    variant: "error",
                                    message:
                                      VALIDATION_MESSAGES.CLOSING_TIME_LESS_THAN_PICK_DROP_OFF_FROM,
                                  },
                                });
                                this.setState({
                                  openSnackBar: true,
                                });
                              } else if (
                                this.state.savedData.openfrom &&
                                this.state.savedData.openfrom.getTime() >
                                  value.getTime()
                              ) {
                                this.setState({
                                  snackbarData: {
                                    variant: "error",
                                    message:
                                      VALIDATION_MESSAGES.CLOSING_TIME_MUST_GREATER_THAN_OPENING_TIME,
                                  },
                                });
                                this.setState({
                                  openSnackBar: true,
                                });
                              } else if (
                                value.getTime() -
                                  (this.state.savedData.openfrom &&
                                    this.state.savedData.openfrom.getTime()) <
                                3600000
                              ) {
                                this.setState({
                                  snackbarData: {
                                    variant: "error",
                                    message:
                                      VALIDATION_MESSAGES.CLOSING_TIME_1HOUR_GREATER_THAN_OPENING_TIME,
                                  },
                                });
                                this.setState({
                                  openSnackBar: true,
                                });
                              } else {
                                this.setState(
                                  {
                                    savedData: {
                                      ...this.state.savedData,
                                      closeby: value,
                                    },
                                  },
                                  () => {
                                    if (!this.state.savedData.closeby) {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          closeby:
                                            VALIDATION_MESSAGES.CLOSE_BY_REQUIRED,
                                        },
                                      });
                                    } else {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          closeby: false,
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
                  <div className="form-fields mt-4">
                    <div className="form-row">
                      <div className="col-md-4">
                        <Field
                          name={STRINGS.BRANCH_MANAGER}
                          component={FormDropDown}
                          dataItems={branchManagers}
                          isSearchable={true}
                          meta={{
                            error:
                              this.state.validation.branchManager &&
                              this.state.validation.branchManager,
                            touched:
                              this.state.validation.branchManager && true,
                          }}
                          config={{
                            onBlur: (e) => {
                              e.preventDefault();
                              if (!this.state.savedData.branchManager) {
                                this.setState({
                                  validation: {
                                    ...this.state.validation,
                                    branchManager:
                                      VALIDATION_MESSAGES.BRANCH_MANAGER_REQUIRED,
                                  },
                                });
                              }
                            },
                            value: this.state.savedData.branchManager,
                            ref: () => {},
                            onChange: (value) => {
                              this.setState(
                                {
                                  savedData: {
                                    ...this.state.savedData,
                                    branchManager: value,
                                  },
                                },
                                () => {
                                  if (!this.state.savedData.branchManager) {
                                    this.setState({
                                      validation: {
                                        ...this.state.validation,
                                        branchManager:
                                          VALIDATION_MESSAGES.BRANCH_MANAGER_REQUIRED,
                                      },
                                    });
                                  } else {
                                    this.setState({
                                      validation: {
                                        ...this.state.validation,
                                        branchManager: false,
                                      },
                                    });
                                  }
                                }
                              );
                            },
                          }}
                          placeholder={
                            STRINGS.BRANCH_MANAGER_SELECT_PLACEHOLDER
                          }
                        />
                      </div>
                      <div className="col-md-2 col-sm-3 col-5 mt-2 mt-sm-0">
                        <div
                          className="add-control"
                          onClick={() => {
                            // setAddNewModalVisibility(true)
                            this.setState({ addBranchManger: true });
                          }}
                        >
                          Add new
                          <i>
                            <img
                              src={ADD_ICON}
                              width="40"
                              alt="ECR"
                              className="img-fluid"
                            />
                          </i>
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
                          this.props.createBranch(this.state.savedData);
                        }
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
