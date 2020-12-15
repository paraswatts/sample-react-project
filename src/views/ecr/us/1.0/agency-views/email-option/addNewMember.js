import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
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

class addNewMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "",
        categoryDescription: "",
        dob: "",
        country: "",
        phone: "",
        surname: "",
        email: "",
        city: "",
        phoneCode: "",
      },
      validation: {
        name: "",
        categoryDescription: "",
        dob: "",
        country: "",
        phone: "",
        surname: "",
        city: "",
        phoneCode: "",
      },
    };
  }
  validate = () => {
    const {
      name,
      dob,
      country,
      phone,
      surname,
      email,
      phoneCode,
      address,
      city,
    } = this.state.data;
    let validation = true;
    if (!dob) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          dob: VALIDATION_MESSAGES.DOB_REQUIRED,
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
    if (!(address && address.trim && address.trim())) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          address: VALIDATION_MESSAGES.ADDRESS_REQUIRED,
        }),
      });
      validation = false;
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

    Object.values(this.state.validation).find((item, index) => {
      if (!!item) {
        validation = false;
      }
    });

    return validation;
  };
  validatePhoneNumber(country) {
    let number;
    if (country && this.state.data.phone) {
      number = getPhoneValid(this.state.data.phone, getCountry);
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
    const { validation, data } = this.state;
    const {
      modalVisibility,
      createVehicleCategory,
      onAddNewAgencyReviewMember,
    } = this.props;
    const maxDate = new Date();

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
                modalVisibility();
              }}
            >
              &times;
            </span>
            <form action="">
              <h5 className="mb-3">Add a new contact</h5>
              <div className="row">
                <div className="col-md-6">
                  <Field
                    name={"name"}
                    component={Input}
                    onBlur={() => {
                      if (!this.state.data.name) {
                        this.setState({
                          validation: {
                            ...this.state.validation,
                            name: VALIDATION_MESSAGES.NAME_REQUIRED,
                          },
                        });
                      }
                    }}
                    meta={{
                      error: validation.name,
                      touched: validation.name && true,
                    }}
                    config={{
                      value: this.state.data.name,
                      onChange: (value) => {
                        if (NAME_REGX.test(value.target.value)) {
                          this.setState(
                            {
                              data: {
                                ...this.state.data,
                                name: value.target.value,
                              },
                            },
                            () => {
                              if (!this.state.data.name) {
                                this.setState({
                                  validation: {
                                    ...this.state.validation,
                                    name: VALIDATION_MESSAGES.NAME_REQUIRED,
                                  },
                                });
                              } else {
                                this.setState({
                                  validation: {
                                    ...this.state.validation,
                                    name: false,
                                  },
                                });
                              }
                            }
                          );
                        } else if (value.target.value === "") {
                          this.setState(
                            {
                              data: {
                                ...this.state.data,
                                name: value.target.value,
                              },
                            },
                            () => {
                              if (!this.state.data.name) {
                                this.setState({
                                  validation: {
                                    ...this.state.validation,
                                    name: VALIDATION_MESSAGES.NAME_REQUIRED,
                                  },
                                });
                              } else {
                                this.setState({
                                  validation: {
                                    ...this.state.validation,
                                    name: false,
                                  },
                                });
                              }
                            }
                          );
                        }
                      },
                    }}
                    placeholder={"Name"}
                  />
                </div>
                <div className="col-md-6">
                  <Field
                    name={STRINGS.SURNAME_INPUT}
                    component={Input}
                    placeholder={STRINGS.SURNAME_PLACEHOLDER}
                    type={"text"}
                    // onBlur={()=>{

                    // }}
                    meta={{
                      error: this.state.validation.surname,
                      touched: this.state.validation.surname && true,
                    }}
                    config={{
                      value: this.state.data.surname,
                      onChange: (value) => {
                        if (NAME_REGX.test(value.target.value)) {
                          if (!value.target.value.startsWith(" ")) {
                            this.setState({
                              data: {
                                ...this.state.data,
                                surname: value.target.value,
                              },
                            });
                          }
                        } else if (value.target.value === "") {
                          this.setState({
                            data: {
                              ...this.state.data,
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
              <div className="row">
                <div className="col-sm-6">
                  <Field
                    name={"email"}
                    component={Input}
                    placeholder={"Email"}
                    onBlur={() => {
                      if (!this.state.data.email) {
                        this.setState({
                          validation: {
                            ...this.state.validation,
                            email: VALIDATION_MESSAGES.EMAIL_REQUIRED,
                          },
                        });
                      } else if (!EMAIL_REGX.test(this.state.data.email)) {
                        this.setState({
                          validation: {
                            ...this.state.validation,
                            email: VALIDATION_MESSAGES.EMAIL_IS_NOT_VALID,
                          },
                        });
                      }
                    }}
                    meta={{
                      error: this.state.validation.email,
                      touched: this.state.validation.email && true,
                    }}
                    config={{
                      value: this.state.data.email,
                      onChange: (value) => {
                        this.setState(
                          {
                            data: {
                              ...this.state.data,
                              email: value.target.value,
                            },
                          },
                          () => {
                            if (!EMAIL_REGX.test(this.state.data.email)) {
                              this.setState({
                                validation: {
                                  ...this.state.validation,
                                  email: VALIDATION_MESSAGES.EMAIL_IS_NOT_VALID,
                                },
                              });
                            }
                            if (!this.state.data.email) {
                              this.setState({
                                validation: {
                                  ...this.state.validation,
                                  email: VALIDATION_MESSAGES.EMAIL_REQUIRED,
                                },
                              });
                            }
                            if (
                              EMAIL_REGX.test(this.state.data.email) &&
                              this.state.data.email
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
                <div className="col-sm-6">
                  <Field
                    asterisk={true}
                    name={"dob"}
                    component={DatePickerInput}
                    placeholder={STRINGS.DOB_PLACEHOLDER}
                    onBlur={() => {
                      if (!this.state.data.dob) {
                        this.setState({
                          validation: {
                            ...this.state.validation,
                            dob: VALIDATION_MESSAGES.DOB_REQUIRED,
                          },
                        });
                      }
                    }}
                    maxDate={maxDate.setFullYear(maxDate.getFullYear() - 16)}
                    meta={{
                      error: this.state.validation.dob,
                      touched: this.state.validation.dob && true,
                    }}
                    config={{
                      value: this.state.data.dob,
                      onChange: (value) => {
                        let val;
                        this.setState(
                          {
                            data: {
                              ...this.state.data,
                              dob: value,
                            },
                          },
                          () => {
                            if (this.state.data.dob) {
                              this.setState({
                                validation: {
                                  ...this.state.validation,
                                  dob: false,
                                },
                              });
                            } else {
                              this.setState({
                                validation: {
                                  ...this.state.validation,
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
              <div className="row">
                <div className="col-sm-6">
                  <Field
                    asterisk={true}
                    name={STRINGS.ADDRESS_INPUT_NAME}
                    component={Input}
                    placeholder={STRINGS.ADDRESS}
                    onBlur={() => {
                      if (!this.state.data.address) {
                        this.setState({
                          validation: {
                            ...this.state.validation,
                            address: VALIDATION_MESSAGES.ADDRESS_REQUIRED,
                          },
                        });
                      }
                    }}
                    meta={{
                      error: this.state.validation.address,
                      touched: this.state.validation.address && true,
                    }}
                    config={{
                      value: this.state.data.address,
                      onChange: (value) => {
                        this.setState(
                          {
                            data: {
                              ...this.state.data,
                              address: value.target.value,
                            },
                          },
                          () => {
                            if (this.state.data.address) {
                              this.setState({
                                validation: {
                                  ...this.state.validation,
                                  address: false,
                                },
                              });
                            } else {
                              this.setState({
                                validation: {
                                  ...this.state.validation,
                                  address: VALIDATION_MESSAGES.ADDRESS_REQUIRED,
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
                    asterisk={true}
                    name={STRINGS.CITY_INPUT}
                    component={Input}
                    placeholder={STRINGS.CITY}
                    onBlur={() => {
                      if (!this.state.data.address) {
                        this.setState({
                          validation: {
                            ...this.state.validation,
                            city: VALIDATION_MESSAGES.CITY_REQUIRED,
                          },
                        });
                      }
                    }}
                    meta={{
                      error: this.state.validation.city,
                      touched: this.state.validation.city && true,
                    }}
                    config={{
                      value: this.state.data.city,
                      onChange: (value) => {
                        if (NAME_REGX.test(value.target.value)) {
                          this.setState(
                            {
                              data: {
                                ...this.state.data,
                                city: value.target.value,
                              },
                            },
                            () => {
                              if (!this.state.data.city) {
                                this.setState({
                                  validation: {
                                    ...this.state.validation,
                                    city: VALIDATION_MESSAGES.CITY_REQUIRED,
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
                              data: {
                                ...this.state.city,
                                name: value.target.value,
                              },
                            },
                            () => {
                              if (!this.state.data.name) {
                                this.setState({
                                  validation: {
                                    ...this.state.validation,
                                    city: VALIDATION_MESSAGES.CITY_REQUIRED,
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
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <Field
                    name={STRINGS.COUNTRY_INPUT}
                    component={Select}
                    placeholder={STRINGS.COUNTRY}
                    // type={'text'}
                    options={countries}
                    isSearchable={true}
                    meta={{
                      error: this.state.validation.country,
                      touched: this.state.validation.country && true,
                    }}
                    config={{
                      value: this.state.data.country,
                      onBlur: (e) => {
                        e.preventDefault();
                        if (!this.state.data.country) {
                          this.setState({
                            validation: {
                              ...this.state.validation,
                              country: VALIDATION_MESSAGES.COUNTRY_REQUIRED,
                            },
                          });
                        }
                      },
                      onChange: (value) => {
                        this.setState(
                          {
                            data: {
                              ...this.state.data,
                              country: value,
                            },
                          },
                          () => {
                            const { country } = this.state.data;
                            // console.log("this.state.data", this.state.data.country);

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
                                data: {
                                  ...this.state.data,
                                  phoneCode: callingCodes[requiredIndex],
                                },
                              });
                              this.getCountryCode(callingCodes[requiredIndex]);
                            }
                            if (this.state.data.country) {
                              this.setState(
                                {
                                  validation: {
                                    ...this.state.validation,
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
                                validation: {
                                  ...this.state.validation,
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
                <div className="col-sm-6">
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
                      if (!this.state.data.phone) {
                        this.setState({
                          validation: {
                            ...this.state.validation,
                            phone: VALIDATION_MESSAGES.PHONE_NUMBER_REQUIRED,
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
                      value: this.state.data.phone,
                      onChange: (value) => {
                        if (PHONE_REGX.test(value.target.value)) {
                          this.setState(
                            {
                              data: {
                                ...this.state.data,
                                phone: value.target.value,
                              },
                            },
                            () => {
                              if (!this.state.data.phone) {
                                this.setState({
                                  validation: {
                                    ...this.state.validation,
                                    phone:
                                      VALIDATION_MESSAGES.PHONE_NUMBER_REQUIRED,
                                  },
                                });
                              } else if (
                                this.state.data.phone.toString().length < 7 ||
                                this.state.data.phone.toString().length > 15
                              ) {
                                this.setState({
                                  validation: {
                                    ...this.state.validation,
                                    phone:
                                      VALIDATION_MESSAGES.PHONE_NUMBER_CHARACTER_LENGTH,
                                  },
                                });
                              }
                              // else if (this.state.data.phone.toString().length > 3 && this.state.data.phone.toString().length < 18) {
                              //     this.validatePhoneNumber(getCountry)
                              // }
                              else {
                                this.setState(
                                  {
                                    validation: {
                                      ...this.state.validation,
                                      phone: false,
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
                              data: {
                                ...this.state.data,
                                phone: value.target.value,
                              },
                            },
                            () => {
                              if (!this.state.data.phone) {
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
              <div className="row">
                <div className="col-sm-6">
                  <Field
                    name={STRINGS.PHONE_CODE_KEY}
                    component={Select}
                    options={callingCodes}
                    isSearchable={true}
                    placeholder={STRINGS.PHONE_NUMBER_PLACEHOLDER}
                    meta={{
                      error: this.state.validation.phoneCode,
                      touched: this.state.validation.phoneCode && true,
                    }}
                    config={{
                      value: this.state.data.phoneCode,
                      onBlur: (e) => {
                        e.preventDefault();
                        if (!this.state.data.phoneCode) {
                          this.setState({
                            validation: {
                              ...this.state.validation,
                              phoneCode:
                                VALIDATION_MESSAGES.PHONE_CODE_KEY_REQUIRED,
                            },
                          });
                        }
                      },
                      onChange: (value) => {
                        this.setState(
                          { data: { ...this.state.data, phoneCode: value } },
                          () => {
                            if (this.state.data.phoneCode) {
                              this.setState(
                                {
                                  validation: {
                                    ...this.state.validation,
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
              </div>
              <div className="group-btn text-center">
                <button
                  className="btn btn-lg btn-primary text-capitalize"
                  type={"text"}
                  onClick={(e) => {
                    e.preventDefault();
                    if (this.validate()) {
                      onAddNewAgencyReviewMember(this.state.data);
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

export default addNewMember;
