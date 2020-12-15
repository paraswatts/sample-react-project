import React, { Component } from "react";
import { Field, submit } from "redux-form";
const {
  defaultConfig: { PLATFORM, LOCATION },
} = require(`../../../../../../config/default`);
const {
  Input,
} = require(`../../../../../../components/${PLATFORM}/atoms/input`);
const {
  RangeInput,
} = require(`../../../../../../components/${PLATFORM}/atoms/range-component`);

const {
  STRINGS,
} = require(`../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`);

const {
  FormDropDown,
} = require(`../../../../../../components/${PLATFORM}/atoms/formDropDown/`);
const {
  TextArea,
} = require(`../../../../../../components/${PLATFORM}/atoms/text-area`);
const {
  VALIDATION_MESSAGES,
  NAME_REGX,
  PHONE_REGX,
  NO_IMG,
  ABOUT_ICON,
} = require(`../../../../../../shared/${PLATFORM}/constants`);
// const { InputSubmit } = require(`../../../../../../components/${PLATFORM}/atoms/input-submit`);
const {
  CustomFileDrop,
} = require(`../../../../../../components/${PLATFORM}/cells/custom-filedrop`);
const {
  SnackbarWrapper,
} = require(`../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`);

export class AddNewVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedData: {
        vehicleType: "",
        vehicleCategory: "",
        vehicleName: "",
        vehicleCode: "",
        vehicleDesc: "",
        vehicleTransmission: "",
        fuelType: "",
        adultSeats: "",
        childSeats: "",
        largeLuggage: "",
        smallLuggage: "",
        rangeFrom: "",
        rangeTo: "",
        airCondition: "",
        doors: "",
        manufactureYear: "",
      },
      validation: {
        vehicleType: false,
        vehicleCategory: false,
        vehicleName: false,
        vehicleCode: false,
        vehicleDesc: false,
        vehicleTransmission: false,
        fuelType: false,
        adultSeats: false,
        childSeats: false,
        largeLuggage: false,
        smallLuggage: false,
        rangeFrom: false,
        rangeTo: false,
        currentImages: false,
        airCondition: false,
        doors: false,
        manufactureYear: false,
      },
      edited: false,
      modalVisibility: false,
      addNewCategory: false,
      categoryData: {
        categoryName: "",
        categoryDescription: "",
      },
      categoryDataValidation: {
        categoryName: "",
        categoryDescription: "",
      },
      openSnackBar: false,
      addImages: false,
      currentImages: [],
      openSnackBar: false,
      snackbarData: {
        variant: "",
        message: "",
      },
      hovered: false,
    };
  }
  validate = () => {
    const {
      vehicleType,
      vehicleCategory,
      vehicleName,
      vehicleCode,
      vehicleDesc,
      vehicleTransmission,
      fuelType,
      adultSeats,
      childSeats,
      largeLuggage,
      smallLuggage,
      rangeFrom,
      rangeTo,
      airCondition,
      doors,
      manufactureYear,
    } = this.state.savedData;
    const { currentImages, categoryData } = this.state;
    const { categoryName, categoryDescription } = categoryData;
    let validation = true;

    if (!vehicleType) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          vehicleType: VALIDATION_MESSAGES.VEHICLE_TYPE_REQUIRED,
        }),
      });
      validation = false;
    }

    if (!rangeFrom || !rangeTo) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          rangeFrom: VALIDATION_MESSAGES.RANGE_REQUIRED,
        }),
      });
      validation = false;
    }
    if (!vehicleCategory) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          vehicleCategory: VALIDATION_MESSAGES.VEHICLE_CATEGORY_REQUIRED,
        }),
      });
      validation = false;
    }
    if (!vehicleName) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          vehicleName: VALIDATION_MESSAGES.VEHICLE_NAME_REQUIRED,
        }),
      });
      validation = false;
    }
    if (!(vehicleName.trim && vehicleName.trim())) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          vehicleName: VALIDATION_MESSAGES.VEHICLE_NAME_REQUIRED,
        }),
      });
      validation = false;
    }
    if (!vehicleCode) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          vehicleCode: VALIDATION_MESSAGES.VEHICLE_CODE_REQUIRED,
        }),
      });
      validation = false;
    }
    if (!(vehicleCode.trim && vehicleCode.trim())) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          vehicleCode: VALIDATION_MESSAGES.VEHICLE_CODE_REQUIRED,
        }),
      });
      validation = false;
    }
    if (!doors) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          doors: VALIDATION_MESSAGES.DOORS_REQUIRED,
        }),
      });
      validation = false;
    }

    if (!vehicleDesc) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          vehicleDesc: VALIDATION_MESSAGES.VEHICLE_DESCRIPTION_REQUIRED,
        }),
      });
      validation = false;
    }

    if (!(vehicleDesc.trim && vehicleDesc.trim())) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          vehicleDesc: VALIDATION_MESSAGES.VEHICLE_DESCRIPTION_REQUIRED,
        }),
      });
      validation = false;
    }
    if (!fuelType) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          fuelType: VALIDATION_MESSAGES.FUEL_TYPE_REQUIRED,
        }),
      });
    }
    if (!vehicleTransmission) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          vehicleTransmission:
            VALIDATION_MESSAGES.VEHICLE_TRANSMISSION_REQUIRED,
        }),
      });
      validation = false;
    }
    if (!adultSeats) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          adultSeats: VALIDATION_MESSAGES.ADULTS_SEAT_REQUIRED,
        }),
      });
      validation = false;
    }
    if (!childSeats) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          childSeats: VALIDATION_MESSAGES.CHILDS_SEAT_REQUIRED,
        }),
      });
      validation = false;
    }
    if (!largeLuggage) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          largeLuggage: VALIDATION_MESSAGES.LARGE_LUGGAGE_REQUIRED,
        }),
      });
      validation = false;
    }
    if (!smallLuggage) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          smallLuggage: VALIDATION_MESSAGES.SMALL_LUGGAGE_REQUIRED,
        }),
      });
      validation = false;
    }
    if (!airCondition) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          airCondition: VALIDATION_MESSAGES.AIR_CONDITION_REQUIRED,
        }),
      });
      validation = false;
    }

    let length = 0;
    for (let index = 0; index < currentImages.length; index++) {
      if (!!currentImages[index]) {
        length++;
      }
    }

    if (length === 0) {
      this.setState({
        validation: Object.assign(this.state.validation, {
          currentImages: VALIDATION_MESSAGES.UPLOAD_AT_LEAST_REQUIRED,
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
  componentDidMount() {
    let currentImages = [];
    for (let index = 0; index < 1; index++) {
      currentImages.push("");
    }
    this.setState({ currentImages });
  }
  componentWillReceiveProps(nextProps) {
    const { rangeFrom, rangeTo } = this.state.savedData;
    if (this.props !== nextProps) {
      const { vehicleImages } = nextProps;
      let currentImages = [];
      for (let index = 0; index < 1; index++) {
        if (vehicleImages[index] && vehicleImages[index]) {
          currentImages.push(vehicleImages[index]);
        } else {
          currentImages.push("");
        }
      }

      this.setState({ currentImages });
    }
  }

  checkHover(value) {
    this.setState({ ...this.state, hovered: value });
  }

  componentWillUnmount() {
    this.props.clearVehiclesImages();
  }

  render() {
    const {
      modalVisibilityHandler,
      fileUploader,
      vehicleImages,
      localSavedImages,
      localSavedImagesArray,
      vehicleType,
      vehicleTransmissionList,
      fuelList,
      handleSubmit = () => {},
      onSubmit = () => {},
      changeOrderImages,
      onAddNewVehicle,
      ADD_ICON,
      createVehicleCategory,
      imagesforModal,
    } = this.props;
    const {
      addImages,
      openSnackBar,
      snackbarData,
      savedData,
      addNewCategory,
    } = this.state;
    const { currentImages, categoryData, categoryDataValidation } = this.state;
    const { categoryName, categoryDescription } = categoryData;

    return (
      <>
        <div id="myModal" className="modal">
          <div className={`modal-content ${!addNewCategory && `modal-lg`}`}>
            <div
              className="modal_body"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <SnackbarWrapper
                visible={openSnackBar}
                onClose={() => this.setState({ openSnackBar: false })}
                variant={snackbarData.variant}
                message={snackbarData.message}
              />
              <span
                className="close"
                onClick={() => {
                  if (addImages) {
                    let tempCount = 0;
                    currentImages.map((item) => {
                      if (!!item) {
                        tempCount++;
                      }
                    });
                    if (!!tempCount) {
                      this.setState({
                        validation: {
                          ...this.state.validation,
                          currentImages: false,
                        },
                      });
                    } else {
                      this.setState({
                        validation: {
                          ...this.state.validation,
                          currentImages:
                            VALIDATION_MESSAGES.UPLOAD_AT_LEAST_REQUIRED,
                        },
                      });
                    }
                    this.setState({ addImages: false });
                  } else if (addNewCategory) {
                    this.setState({
                      addNewCategory: false,
                      categoryData: {
                        categoryName: "",
                        categoryDescription: "",
                      },
                      categoryDataValidation: {
                        categoryName: "",
                        categoryDescription: "",
                      },
                    });
                  } else {
                    modalVisibilityHandler();
                  }
                }}
              >
                &times;
              </span>

              <div className="panel-group">
                {addNewCategory ? (
                  <form action="">
                    <h5 className="mb-3">Add a new vehicle category</h5>
                    <div className="row">
                      <div className="form-group">
                        <Field
                          name={STRINGS.CATEGORY_NAME_INPUT}
                          component={Input}
                          onBlur={() => {
                            if (!this.state.categoryData.categoryName) {
                              this.setState({
                                categoryDataValidation: {
                                  ...this.state.categoryDataValidation,
                                  categoryName:
                                    VALIDATION_MESSAGES.VEHICLE_NAME_REQUIRED,
                                },
                              });
                            }
                          }}
                          meta={{
                            error: categoryDataValidation.categoryName,
                            touched:
                              categoryDataValidation.categoryName && true,
                          }}
                          config={{
                            value: this.state.categoryData.categoryName,
                            onChange: (value) => {
                              if (NAME_REGX.test(value.target.value)) {
                                this.setState(
                                  {
                                    categoryData: {
                                      ...this.state.categoryData,
                                      categoryName: value.target.value,
                                    },
                                  },
                                  () => {
                                    if (!this.state.categoryData.categoryName) {
                                      this.setState({
                                        categoryDataValidation: {
                                          ...this.state.categoryDataValidation,
                                          categoryName:
                                            VALIDATION_MESSAGES.CATEGORY_NAME_REQUIRED,
                                        },
                                      });
                                    } else {
                                      this.setState({
                                        categoryDataValidation: {
                                          ...this.state.categoryDataValidation,
                                          categoryName: false,
                                        },
                                      });
                                    }
                                  }
                                );
                              } else if (value.target.value === "") {
                                this.setState(
                                  {
                                    categoryData: {
                                      ...this.state.categoryData,
                                      categoryName: value.target.value,
                                    },
                                  },
                                  () => {
                                    if (!this.state.categoryData.categoryName) {
                                      this.setState({
                                        categoryDataValidation: {
                                          ...this.state.categoryDataValidation,
                                          categoryName:
                                            VALIDATION_MESSAGES.CATEGORY_NAME_REQUIRED,
                                        },
                                      });
                                    } else {
                                      this.setState({
                                        categoryDataValidation: {
                                          ...this.state.categoryDataValidation,
                                          categoryName: false,
                                        },
                                      });
                                    }
                                  }
                                );
                              }
                            },
                          }}
                          placeholder={STRINGS.CATEGORY_PLACEHOLDER}
                        />
                      </div>
                      {/* </div> */}
                    </div>

                    <div className="row">
                      <div className="form-group">
                        <Field
                          name={STRINGS.CATEGORY_DESCRIPTION_INPUT}
                          component={TextArea}
                          meta={{
                            error: this.state.categoryDataValidation
                              .categoryDescription,
                            touched:
                              this.state.categoryDataValidation
                                .categoryDescription && true,
                          }}
                          config={{
                            onBlur: (e) => {
                              e.preventDefault();
                              if (
                                !this.state.categoryData.categoryDescription
                              ) {
                                this.setState({
                                  categoryDataValidation: {
                                    ...this.state.categoryDataValidation,
                                    categoryDescription:
                                      VALIDATION_MESSAGES.CATEGORY_DESCRIPTION_REQUIRED,
                                  },
                                });
                              }
                            },
                            value: this.state.categoryData.categoryDescription,
                            onChange: (value) => {
                              this.setState(
                                {
                                  categoryData: {
                                    ...this.state.categoryData,
                                    categoryDescription: value.target.value,
                                  },
                                },
                                () => {
                                  if (
                                    !this.state.categoryData.categoryDescription
                                  ) {
                                    this.setState({
                                      categoryDataValidation: {
                                        ...this.state.categoryDataValidation,
                                        categoryDescription:
                                          VALIDATION_MESSAGES.CATEGORY_DESCRIPTION_REQUIRED,
                                      },
                                    });
                                  } else {
                                    this.setState({
                                      categoryDataValidation: {
                                        ...this.state.categoryDataValidation,
                                        categoryDescription: false,
                                      },
                                    });
                                  }
                                }
                              );
                            },
                          }}
                          placeholder={STRINGS.CATEGORY_DESCRIPTION_PLACEHOLDER}
                        />
                      </div>
                    </div>

                    <div className="group-btn text-center">
                      <button
                        className="btn btn-lg btn-primary text-capitalize"
                        type={"text"}
                        onClick={(e) => {
                          e.preventDefault();
                          let validate = true;
                          Object.values(categoryData).map((item) => {
                            if (!item) {
                              validate = false;
                            }
                          });
                          if (
                            !(
                              this.state.categoryData.categoryName.trim &&
                              this.state.categoryData.categoryName.trim()
                            )
                          ) {
                            this.setState(
                              {
                                categoryDataValidation: Object.assign(
                                  this.state.categoryDataValidation,
                                  {
                                    categoryName:
                                      VALIDATION_MESSAGES.CATEGORY_NAME_REQUIRED,
                                  }
                                ),
                              },
                              () => {
                                validate = false;
                              }
                            );
                          }
                          if (
                            !(
                              this.state.categoryData.categoryDescription
                                .trim &&
                              this.state.categoryData.categoryDescription.trim()
                            )
                          ) {
                            this.setState(
                              {
                                categoryDataValidation: Object.assign(
                                  this.state.categoryDataValidation,
                                  {
                                    categoryDescription:
                                      VALIDATION_MESSAGES.CATEGORY_DESCRIPTION_REQUIRED,
                                  }
                                ),
                              },
                              () => {
                                validate = false;
                              }
                            );
                          }

                          if (validate) {
                            const {
                              categoryName,
                              categoryDescription,
                            } = categoryData;
                            createVehicleCategory(
                              {
                                category: categoryName.trim(),
                                description: categoryDescription.trim(),
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

                                this.setState({
                                  addNewCategory: false,
                                  categoryData: {
                                    categoryName: "",
                                    categoryDescription: "",
                                  },
                                  categoryDataValidation: {
                                    categoryName: "",
                                    categoryDescription: "",
                                  },
                                });
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
                          } else {
                            if (!this.state.categoryData.categoryName) {
                              this.setState({
                                categoryDataValidation: Object.assign(
                                  this.state.categoryDataValidation,
                                  {
                                    categoryName:
                                      VALIDATION_MESSAGES.CATEGORY_NAME_REQUIRED,
                                  }
                                ),
                              });
                            }
                            if (!this.state.categoryData.categoryDescription) {
                              this.setState({
                                categoryDataValidation: Object.assign(
                                  this.state.categoryDataValidation,
                                  {
                                    categoryDescription:
                                      VALIDATION_MESSAGES.CATEGORY_DESCRIPTION_REQUIRED,
                                  }
                                ),
                              });
                            }
                          }
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                ) : !addImages ? (
                  <div>
                    <h5 className="mb-3">Add a new vehicle</h5>

                    <div className="row">
                      <div className="col-lg-4 col-md-6">
                        <div className="form-group">
                          <Field
                            name={STRINGS.VEHICLE_TYPE_NAME}
                            component={FormDropDown}
                            dataItems={vehicleType}
                            isSearchable={true}
                            autofocus={true}
                            meta={{
                              error:
                                this.state.validation.vehicleType &&
                                this.state.validation.vehicleType,
                              touched:
                                this.state.validation.vehicleType && true,
                            }}
                            config={{
                              onBlur: (e) => {
                                e.preventDefault();
                                if (!this.state.savedData.vehicleType) {
                                  this.setState({
                                    validation: {
                                      ...this.state.validation,
                                      vehicleType:
                                        VALIDATION_MESSAGES.VEHICLE_TYPE_REQUIRED,
                                    },
                                  });
                                }
                              },
                              value: this.state.savedData.vehicleType,
                              ref: () => {},
                              onChange: (value) => {
                                this.setState(
                                  {
                                    savedData: {
                                      ...this.state.savedData,
                                      vehicleType: value,
                                    },
                                  },
                                  () => {
                                    if (!this.state.savedData.vehicleType) {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          vehicleType:
                                            VALIDATION_MESSAGES.VEHICLE_TYPE_REQUIRED,
                                        },
                                      });
                                    } else {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          vehicleType: false,
                                        },
                                      });
                                    }
                                  }
                                );
                              },
                            }}
                            placeholder={STRINGS.VEHICLE_TYPE_PLACEHOLDER}
                          />
                        </div>

                        <div className="form-group">
                          <Field
                            name={STRINGS.VEHICLE_CATEGORY_NAME}
                            component={FormDropDown}
                            dataItems={
                              this.props.vehicleCategory &&
                              this.props.vehicleCategory
                            }
                            isSearchable={true}
                            placeholder={STRINGS.VEHICLE_CATEGORY_PLACEHOLDER}
                            meta={{
                              error:
                                this.state.validation.vehicleCategory &&
                                this.state.validation.vehicleCategory,
                              touched:
                                this.state.validation.vehicleCategory && true,
                            }}
                            config={{
                              onBlur: (e) => {
                                e.preventDefault();
                                if (!this.state.savedData.vehicleCategory) {
                                  this.setState({
                                    validation: {
                                      ...this.state.validation,
                                      vehicleCategory:
                                        VALIDATION_MESSAGES.VEHICLE_CATEGORY_REQUIRED,
                                    },
                                  });
                                }
                              },
                              value: this.state.savedData.vehicleCategory,
                              ref: () => {},
                              onChange: (value) => {
                                this.setState(
                                  {
                                    savedData: {
                                      ...this.state.savedData,
                                      vehicleCategory: value,
                                    },
                                  },
                                  () => {
                                    if (!this.state.savedData.vehicleCategory) {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          vehicleCategory:
                                            VALIDATION_MESSAGES.VEHICLE_CATEGORY_REQUIRED,
                                        },
                                      });
                                    } else {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          vehicleCategory: false,
                                        },
                                      });
                                    }
                                  }
                                );
                              },
                            }}
                          />
                          <div
                            className="add-control mt-3"
                            onClick={() => {
                              this.setState({ addNewCategory: true });
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

                        <div className="form-group">
                          <Field
                            name={STRINGS.VEHICLE_NAME_NAME}
                            component={Input}
                            placeholder={STRINGS.VEHICLE_NAME_PLACEHOLDER}
                            type={"text"}
                            meta={{
                              error:
                                this.state.validation.vehicleName &&
                                this.state.validation.vehicleName,
                              touched:
                                this.state.validation.vehicleName && true,
                            }}
                            onBlur={() => {
                              if (!this.state.savedData.vehicleName) {
                                this.setState({
                                  validation: {
                                    ...this.state.validation,
                                    vehicleName:
                                      VALIDATION_MESSAGES.VEHICLE_NAME_REQUIRED,
                                  },
                                });
                              }
                            }}
                            config={{
                              value: this.state.savedData.vehicleName,
                              onChange: (value) => {
                                this.setState(
                                  {
                                    savedData: {
                                      ...this.state.savedData,
                                      vehicleName: value.target.value,
                                    },
                                  },
                                  () => {
                                    if (!this.state.savedData.vehicleName) {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          vehicleName:
                                            VALIDATION_MESSAGES.VEHICLE_NAME_REQUIRED,
                                        },
                                      });
                                    }
                                    if (this.state.savedData.vehicleName) {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          vehicleName: false,
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

                      <div className="col-lg-4 col-md-6">
                        <div className="form-group">
                          <Field
                            name={STRINGS.VEHICLE_CODE_NAME}
                            component={Input}
                            placeholder={STRINGS.ENTER_VEHICLE_CODE_PLACEHOLDER}
                            type={"text"}
                            meta={{
                              error:
                                this.state.validation.vehicleCode &&
                                this.state.validation.vehicleCode,
                              touched:
                                this.state.validation.vehicleCode && true,
                            }}
                            onBlur={() => {
                              if (!this.state.savedData.vehicleCode) {
                                this.setState({
                                  validation: {
                                    ...this.state.validation,
                                    vehicleCode:
                                      VALIDATION_MESSAGES.VEHICLE_CODE_REQUIRED,
                                  },
                                });
                              }
                            }}
                            config={{
                              value: this.state.savedData.vehicleCode,
                              onChange: (value) => {
                                this.setState(
                                  {
                                    savedData: {
                                      ...this.state.savedData,
                                      vehicleCode: value.target.value,
                                    },
                                  },
                                  () => {
                                    if (!this.state.savedData.vehicleCode) {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          vehicleCode:
                                            VALIDATION_MESSAGES.VEHICLE_CODE_REQUIRED,
                                        },
                                      });
                                    }
                                    if (this.state.savedData.vehicleCode) {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          vehicleCode: false,
                                        },
                                      });
                                    }
                                  }
                                );
                              },
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <Field
                            name={STRINGS.VEHICLE_DESCRIPTION_NAME}
                            component={TextArea}
                            placeholder={
                              STRINGS.VEHICLE_DESCRIPTION_PLACEHOLDER
                            }
                            meta={{
                              error:
                                this.state.validation.vehicleDesc &&
                                this.state.validation.vehicleDesc,
                              touched:
                                this.state.validation.vehicleDesc && true,
                            }}
                            onBlur={() => {
                              if (!this.state.savedData.vehicleDesc) {
                                this.setState({
                                  validation: {
                                    ...this.state.validation,
                                    vehicleDesc:
                                      VALIDATION_MESSAGES.VEHICLE_DESCRIPTION_REQUIRED,
                                  },
                                });
                              }
                            }}
                            config={{
                              value: this.state.savedData.vehicleDesc,
                              onChange: (value) => {
                                this.setState(
                                  {
                                    savedData: {
                                      ...this.state.savedData,
                                      vehicleDesc: value.target.value,
                                    },
                                  },
                                  () => {
                                    if (!this.state.savedData.vehicleDesc) {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          vehicleDesc:
                                            VALIDATION_MESSAGES.VEHICLE_DESCRIPTION_REQUIRED,
                                        },
                                      });
                                    }
                                    if (this.state.savedData.vehicleDesc) {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          vehicleDesc: false,
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
                      <div className="col-lg-4 col-md-6 select_new_vehicle text-center">
                        <div
                          className={
                            this.state.hovered === true
                              ? "d-flex tooltip_show"
                              : "d-flex tooltip_hide"
                          }
                        >
                          <div className="form-group pr-3">
                            <div
                              className="custom_drop"
                              onClick={() => {
                                this.setState({ addImages: true });
                              }}
                            >
                              <Field
                                name={STRINGS.VEHICLE_IMAGE_NAME}
                                component={Input}
                                dataItems={[]}
                                isSearchable={false}
                                autofocus={true}
                                config={{
                                  readOnly: true,
                                  disabled: true,
                                  onBlur: (e) => {
                                    e.preventDefault();
                                    if (!this.state.savedData.vehicleType) {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          vehicleType:
                                            VALIDATION_MESSAGES.VEHICLE_TYPE_REQUIRED,
                                        },
                                      });
                                    }
                                  },
                                }}
                                placeholder={STRINGS.VEHICLE_IMAGE_PLACEHOLDER}
                              />
                            </div>
                            <div className="mt-3 text-center">
                              {currentImages.map((item, index) => {
                                return (
                                  <img
                                    src={!!item ? item : NO_IMG}
                                    alt="ECR"
                                    className={
                                      !!item
                                        ? "img-fluid img-selected"
                                        : "img-fluid"
                                    }
                                    width={"100px"}
                                    key={index + ""}
                                  />
                                );
                              })}
                            </div>
                            {!!(
                              this.state.validation &&
                              this.state.validation.currentImages
                            ) && (
                              <span className="error_msg text-danger pl-0">
                                {this.state.validation.currentImages}
                              </span>
                            )}
                          </div>

                          <div
                            id={"tooltip_title_show"}
                            onMouseOut={() => this.checkHover(false)}
                            onMouseOver={() => this.checkHover(true)}
                          >
                            <button
                              type={"button"}
                              className={"add-vehicle-button rounded-circle"}
                            >
                              <i>
                                <img
                                  src={ABOUT_ICON}
                                  alt="ECR"
                                  className="img-fluid"
                                  width="15px"
                                />
                              </i>
                            </button>
                          </div>

                          <div className="Tooltip_block">
                            Please select the vehicle image that represent best
                            your actual vehicle
                          </div>
                        </div>
                      </div>
                      {/* <div className="col-lg-4 col-md-6">
                                            <div className="form-group">
                                            </div>
                                            {/* <div className="form-group">
                                                    <div className="d-flex align-items-start justify-content-between vechile_pic">
                                                        <div className="form-row">
                                                            {
                                                                !!this.state.currentImages.map && this.state.currentImages.map((item, index) => {
                                                                    return (
                                                                        <span className="col-3"
                                                                        >
                                                                            {!!item && <span
                                                                                onClick={() => {
                                                                                    let currentImages = this.state.currentImages
                                                                                    currentImages.splice(index, 1)
                                                                                    currentImages.push('')
                                                                                    let tempdata = []
                                                                                    for (let index = 0; index < currentImages.length; index++) {
                                                                                        if (!!currentImages[index]) {
                                                                                            tempdata.push(currentImages[index])
                                                                                        }
                                                                                    }
                                                                                    this.setState({ currentImages })
                                                                                    changeOrderImages(tempdata)
                                                                                }}
                                                                            >&times;</span>}
                                                                            <img src={!!item ? item :NO_IMG} alt="ECR" className={`img-fluid 
                                                                        ${!!item && (index === 0) && `primary-img`}
                                                                        `} width="134px"
                                                                                id={index}
                                                                                draggable={!!item ? true : false}
                                                                                onDragStart={(evt) => {
                                                                                    evt.dataTransfer.setData("text", evt.target.id);
                                                                                }}
                                                                                onDrop={(ev) => {
                                                                                    if (!!item) {
                                                                                        let currentImages = this.state.currentImages
                                                                                        ev.preventDefault();
                                                                                        let selectedIndex = ev.dataTransfer.getData('text')
                                                                                        let droppedIndex = ev.target.id
                                                                                        let deletedImg = currentImages.splice(selectedIndex, 1)
                                                                                            ;
                                                                                        currentImages.splice(droppedIndex, 0, ...deletedImg)
                                                                                        let tempdata = []
                                                                                        for (let index = 0; index < currentImages.length; index++) {
                                                                                            if (!!currentImages[index]) {
                                                                                                tempdata.push(currentImages[index])
                                                                                            }
                                                                                        }
                                                                                        this.setState({ currentImages })
                                                                                        changeOrderImages(tempdata)
                                                                                    }
                                                                                }}
                                                                                onDragOver={
                                                                                    (e) => {
                                                                                        if (!!item)
                                                                                            e.preventDefault()
                                                                                    }
                                                                                }
                                                                            />
                                                                        </span>
                                                                    )
                                                                })
                                                            }
                                                            <label>Drag and Drop for reorder.</label>
                                                        </div>
                                                        <button className="add_btn"
                                                            onClick={() => {
                                                                const { currentImages } = this.state
                                                                this.setState({ addImages: true })
                                                                let length = 0;
                                                                for (let index = 0; index < currentImages.length; index++) {
                                                                    if (!!currentImages[index]) {
                                                                        length++
                                                                    }
                                                                }
                                                                if (length === 0) {
                                                                    this.setState({ validation: { ...this.state.validation, currentImages: VALIDATION_MESSAGES.UPLOAD_AT_LEAST_REQUIRED } })
                                                                }
                                                            }}
                                                        >
                                                            Add
                                                <i><img src={ADD_ICON} alt="ECR" className="img-fluid" width="34px" /></i>
                                                        </button>
                                                    </div>
                                                    {!!this.state.validation.currentImages && <span className="error_msg text-danger">{this.state.validation.currentImages}</span>}
                                                </div> */}
                      {/* </div> */}
                    </div>

                    <hr className="mb-4 pb-2" />

                    <div className="row">
                      <div className="col-lg-4 col-md-6">
                        <div className="form-group">
                          <Field
                            name={STRINGS.VEHICLE_TRANSMISSION_NAME}
                            component={FormDropDown}
                            dataItems={vehicleTransmissionList}
                            isSearchable={true}
                            placeholder={
                              STRINGS.VEHICLE_TRANSMISSION_PLACEHOLDER
                            }
                            meta={{
                              error:
                                this.state.validation.vehicleTransmission &&
                                this.state.validation.vehicleTransmission,
                              touched:
                                this.state.validation.vehicleTransmission &&
                                true,
                            }}
                            config={{
                              onBlur: (e) => {
                                e.preventDefault();
                                if (!this.state.savedData.vehicleTransmission) {
                                  this.setState({
                                    validation: {
                                      ...this.state.validation,
                                      vehicleTransmission:
                                        VALIDATION_MESSAGES.VEHICLE_TRANSMISSION_REQUIRED,
                                    },
                                  });
                                }
                              },
                              value: this.state.savedData.vehicleTransmission,
                              ref: () => {},
                              onChange: (value) => {
                                this.setState(
                                  {
                                    savedData: {
                                      ...this.state.savedData,
                                      vehicleTransmission: value,
                                    },
                                  },
                                  () => {
                                    if (
                                      !this.state.savedData.vehicleTransmission
                                    ) {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          vehicleTransmission:
                                            VALIDATION_MESSAGES.VEHICLE_TRANSMISSION_REQUIRED,
                                        },
                                      });
                                    } else {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          vehicleTransmission: false,
                                        },
                                      });
                                    }
                                  }
                                );
                              },
                            }}
                          />
                        </div>

                        <div className="form-group">
                          <Field
                            name={STRINGS.FUEL_TYPE_NAME}
                            component={FormDropDown}
                            dataItems={fuelList}
                            isSearchable={true}
                            placeholder={STRINGS.FUEL_TYPE_PLACEHOLDER}
                            meta={{
                              error:
                                this.state.validation.fuelType &&
                                this.state.validation.fuelType,
                              touched: this.state.validation.fuelType && true,
                            }}
                            config={{
                              onBlur: (e) => {
                                e.preventDefault();
                                if (!this.state.savedData.fuelType) {
                                  this.setState({
                                    validation: {
                                      ...this.state.validation,
                                      fuelType:
                                        VALIDATION_MESSAGES.FUEL_TYPE_REQUIRED,
                                    },
                                  });
                                }
                              },
                              value: this.state.savedData.fuelType,
                              ref: () => {},
                              onChange: (value) => {
                                this.setState(
                                  {
                                    savedData: {
                                      ...this.state.savedData,
                                      fuelType: value,
                                    },
                                  },
                                  () => {
                                    if (!this.state.savedData.fuelType) {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          fuelType:
                                            VALIDATION_MESSAGES.FUEL_TYPE_REQUIRED,
                                        },
                                      });
                                    } else {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          fuelType: false,
                                        },
                                      });
                                    }
                                  }
                                );
                              },
                            }}
                          />
                        </div>

                        <div className="form-group">
                          <Field
                            name={STRINGS.VEHICLE_RANGE_NAME}
                            component={RangeInput}
                            placeholder={STRINGS.VEHICLE_YEAR_RANGE_TO}
                            type={"text"}
                            meta={{
                              error:
                                (this.state.validation.rangeFrom &&
                                  this.state.validation.rangeFrom) ||
                                (this.state.validation.rangeTo &&
                                  this.state.validation.rangeTo),
                              touched:
                                (this.state.validation.rangeFrom && true) ||
                                (this.state.validation.rangeTo && true),
                            }}
                            config1={{
                              value: this.state.savedData.rangeFrom,
                              // onBlur: () => {
                              //     let latestYear = new Date()

                              //     const { rangeFrom, rangeTo } = this.state.savedData
                              //     // console.log("this.state.rangeTo", this.state.savedData.rangeTo);

                              //     if (!this.state.savedData.rangeFrom) {
                              //         this.setState({ validation: { ...this.state.validation, rangeFrom: "Start range is required." } })
                              //     }
                              //     else if (!this.state.savedData.rangeTo) {
                              //         this.setState({ validation: { ...this.state.validation, rangeTo: "End range is required." } })
                              //     }
                              //     // else if (this.state.savedData.rangeFrom >= this.state.savedData.rangeTo) {
                              //     //     this.setState({ validation: { ...this.state.validation, rangeFrom: "Enter the valid range." } })
                              //     // }
                              //     else if (this.state.savedData.rangeTo > (latestYear.getFullYear() + 1)) {
                              //         this.setState({ validation: { ...this.state.validation, rangeTo: "Exceeding max range year." } })
                              //     }
                              //     else {
                              //         this.setState({ validation: { ...this.state.validation, rangeFrom: false, rangeTo: false } })
                              //     }
                              // },
                              onChange: (value) => {
                                let latestYear = new Date();

                                if (PHONE_REGX.test(value.target.value)) {
                                  this.setState(
                                    {
                                      savedData: {
                                        ...this.state.savedData,
                                        rangeFrom: value.target.value,
                                      },
                                    },
                                    () => {
                                      if (!this.state.savedData.rangeFrom) {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            rangeFrom:
                                              VALIDATION_MESSAGES.START_RANGE_REQUIRED,
                                            rangeTo: false,
                                          },
                                        });
                                      } else if (
                                        this.state.savedData.rangeFrom < 1980
                                      ) {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            rangeFrom:
                                              VALIDATION_MESSAGES.VALID_RANGE_REQUIRED,
                                            rangeTo: false,
                                          },
                                        });
                                      } else if (
                                        this.state.savedData.rangeFrom >
                                        latestYear.getFullYear()
                                      ) {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            rangeFrom:
                                              VALIDATION_MESSAGES.MAX_YEAR_VALDITION,
                                            rangeTo: false,
                                          },
                                        });
                                      } else if (
                                        this.state.savedData.rangeFrom >=
                                        this.state.savedData.rangeTo
                                      ) {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            rangeFrom:
                                              VALIDATION_MESSAGES.VALID_RANGE_REQUIRED,
                                            rangeTo: false,
                                          },
                                        });
                                      } else if (
                                        this.state.savedData.rangeTo >
                                        latestYear.getFullYear() + 1
                                      ) {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            rangeTo:
                                              VALIDATION_MESSAGES.EXCEEDING_MAX_RANGE,
                                            rangeFrom: false,
                                          },
                                        });
                                      } else {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            rangeFrom: false,
                                            rangeTo: false,
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
                                        rangeFrom: value.target.value,
                                      },
                                    },
                                    () => {
                                      if (!this.state.savedData.rangeFrom) {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            rangeFrom:
                                              VALIDATION_MESSAGES.START_RANGE_REQUIRED,
                                            rangeTo: false,
                                          },
                                        });
                                      } else {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            rangeFrom: false,
                                          },
                                        });
                                      }
                                    }
                                  );
                                }
                              },
                            }}
                            config2={{
                              value: this.state.savedData.rangeTo,
                              // onBlur: () => {
                              //     let latestYear = new Date()

                              //     const { rangeFrom, rangeTo } = this.state.savedData
                              //     if (!this.state.savedData.rangeFrom) {
                              //         this.setState({ validation: { ...this.state.validation, rangeFrom: "Start range is required." } })
                              //     }
                              //     else if (!this.state.savedData.rangeTo) {
                              //         this.setState({ validation: { ...this.state.validation, rangeTo: "End range is required." } })
                              //     }
                              //     // else if (rangeFrom >= rangeTo) {
                              //     //     this.setState({ validation: { ...this.state.validation, rangeTo: "Enter the valid range." } })
                              //     // }
                              //     else if (this.state.savedData.rangeTo > (latestYear.getFullYear() + 1)) {
                              //         this.setState({ validation: { ...this.state.validation, rangeTo: "Exceeding max range year." } })
                              //     }
                              //     else {
                              //         this.setState({ validation: { ...this.state.validation, rangeFrom: false, rangeTo: false } })
                              //     }

                              // },
                              onChange: (value) => {
                                let latestYear = new Date();

                                if (PHONE_REGX.test(value.target.value)) {
                                  this.setState(
                                    {
                                      savedData: {
                                        ...this.state.savedData,
                                        rangeTo: value.target.value,
                                      },
                                    },
                                    () => {
                                      if (!this.state.savedData.rangeTo) {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            rangeTo:
                                              VALIDATION_MESSAGES.END_RANGE_REQUIRED,
                                          },
                                        });
                                      } else if (
                                        this.state.savedData.rangeTo < 1980
                                      ) {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            rangeTo:
                                              VALIDATION_MESSAGES.VALID_RANGE_REQUIRED,
                                            rangeFrom: false,
                                          },
                                        });
                                      } else if (
                                        this.state.savedData.rangeTo >
                                        latestYear.getFullYear() + 1
                                      ) {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            rangeTo:
                                              VALIDATION_MESSAGES.EXCEEDING_MAX_RANGE,
                                            rangeFrom: false,
                                          },
                                        });
                                      } else if (
                                        this.state.savedData.rangeFrom >=
                                        this.state.savedData.rangeTo
                                      ) {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            rangeTo:
                                              VALIDATION_MESSAGES.VALID_RANGE_REQUIRED,
                                            rangeFrom: false,
                                          },
                                        });
                                      } else {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            rangeTo: false,
                                            rangeFrom: false,
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
                                        rangeTo: value.target.value,
                                      },
                                    },
                                    () => {
                                      if (!this.state.savedData.rangeTo) {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            rangeTo:
                                              VALIDATION_MESSAGES.END_RANGE_REQUIRED,
                                            rangeFrom: false,
                                          },
                                        });
                                      } else {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            rangeTo: false,
                                          },
                                        });
                                      }
                                    }
                                  );
                                }
                              },
                            }}
                          />
                          <span class="text_label">min year 1980</span>
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-6">
                        <div className="form-group">
                          <Field
                            name={STRINGS.AIR_CONDITION_TYPE}
                            component={FormDropDown}
                            dataItems={[
                              { value: true, label: "AC" },
                              { value: false, label: "Non AC" },
                            ]}
                            isSearchable={true}
                            autofocus={true}
                            meta={{
                              error:
                                this.state.validation.airCondition &&
                                this.state.validation.airCondition,
                              touched:
                                this.state.validation.airCondition && true,
                            }}
                            config={{
                              onBlur: (e) => {
                                e.preventDefault();
                                if (!this.state.savedData.airCondition) {
                                  this.setState({
                                    validation: {
                                      ...this.state.validation,
                                      airCondition:
                                        VALIDATION_MESSAGES.AIR_CONDITION_REQUIRED,
                                    },
                                  });
                                }
                              },
                              value: this.state.savedData.airCondition,
                              ref: () => {},
                              onChange: (value) => {
                                this.setState(
                                  {
                                    savedData: {
                                      ...this.state.savedData,
                                      airCondition: value,
                                    },
                                  },
                                  () => {
                                    if (!this.state.savedData.airCondition) {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          airCondition:
                                            VALIDATION_MESSAGES.AIR_CONDITION_REQUIRED,
                                        },
                                      });
                                    } else {
                                      this.setState({
                                        validation: {
                                          ...this.state.validation,
                                          airCondition: false,
                                        },
                                      });
                                    }
                                  }
                                );
                              },
                            }}
                            placeholder={STRINGS.AIR_CONDITION_PLACEHOLDER}
                          />
                        </div>
                        <div className="form-group">
                          <Field
                            name={STRINGS.ADULT_SEATS_NAME}
                            component={Input}
                            placeholder={STRINGS.ADULTS_SEATS_PLACEHOLDER}
                            type={"text"}
                            meta={{
                              error:
                                this.state.validation.adultSeats &&
                                this.state.validation.adultSeats,
                              touched: this.state.validation.adultSeats && true,
                            }}
                            onBlur={() => {
                              if (!this.state.savedData.adultSeats) {
                                this.setState({
                                  validation: {
                                    ...this.state.validation,
                                    adultSeats:
                                      VALIDATION_MESSAGES.ADULTS_SEAT_REQUIRED,
                                  },
                                });
                              }
                            }}
                            config={{
                              value: this.state.savedData.adultSeats,
                              onChange: (value) => {
                                if (PHONE_REGX.test(value.target.value)) {
                                  this.setState(
                                    {
                                      savedData: {
                                        ...this.state.savedData,
                                        adultSeats: value.target.value,
                                      },
                                    },
                                    () => {
                                      if (!this.state.savedData.adultSeats) {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            adultSeats:
                                              VALIDATION_MESSAGES.ADULTS_SEAT_REQUIRED,
                                          },
                                        });
                                      } else if (
                                        this.state.savedData.adultSeats > 25
                                      ) {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            adultSeats:
                                              VALIDATION_MESSAGES.MAX_VALUE_25,
                                          },
                                        });
                                      } else {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            adultSeats: false,
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
                                        adultSeats: value.target.value,
                                      },
                                    },
                                    () => {
                                      if (!this.state.savedData.adultSeats) {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            adultSeats:
                                              VALIDATION_MESSAGES.ADULTS_SEAT_REQUIRED,
                                          },
                                        });
                                      } else {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            adultSeats: false,
                                          },
                                        });
                                      }
                                    }
                                  );
                                }
                              },
                            }}
                          />
                          <span class="text_label">max upto 25</span>
                        </div>
                        <div className="form-group">
                          <Field
                            name={STRINGS.CHILD_SEATS_NAME}
                            component={Input}
                            placeholder={STRINGS.CHILD_SEATS_PLACEHOLDER}
                            type={"text"}
                            normalize={(val, val1) => {
                              if (PHONE_REGX.test(val)) {
                                return val;
                              } else if (val === "") {
                                return val;
                              } else {
                                return val1;
                              }
                            }}
                            meta={{
                              error:
                                this.state.validation.childSeats &&
                                this.state.validation.childSeats,
                              touched: this.state.validation.childSeats && true,
                            }}
                            onBlur={() => {
                              if (!this.state.savedData.childSeats) {
                                this.setState({
                                  validation: {
                                    ...this.state.validation,
                                    childSeats:
                                      VALIDATION_MESSAGES.CHILDS_SEAT_REQUIRED,
                                  },
                                });
                              }
                            }}
                            config={{
                              value: this.state.savedData.childSeats,
                              onChange: (value) => {
                                if (PHONE_REGX.test(value.target.value)) {
                                  this.setState(
                                    {
                                      savedData: {
                                        ...this.state.savedData,
                                        childSeats: value.target.value,
                                      },
                                    },
                                    () => {
                                      if (!this.state.savedData.childSeats) {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            childSeats:
                                              VALIDATION_MESSAGES.CHILDS_SEAT_REQUIRED,
                                          },
                                        });
                                      } else if (
                                        this.state.savedData.childSeats > 25
                                      ) {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            childSeats:
                                              VALIDATION_MESSAGES.MAX_VALUE_25,
                                          },
                                        });
                                      } else {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            childSeats: false,
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
                                        childSeats: value.target.value,
                                      },
                                    },
                                    () => {
                                      if (!this.state.savedData.childSeats) {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            childSeats:
                                              VALIDATION_MESSAGES.CHILDS_SEAT_REQUIRED,
                                          },
                                        });
                                      } else {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            childSeats: false,
                                          },
                                        });
                                      }
                                    }
                                  );
                                }
                              },
                            }}
                          />
                          <span class="text_label">max upto 25</span>
                        </div>
                      </div>

                      <div className="col-lg-4 col-md-6">
                        <div className="form-group">
                          <Field
                            name={STRINGS.LARGE_LUGGAGE_NAME}
                            component={Input}
                            placeholder={STRINGS.LARGE_LUGGAGE_PLACEHOLDER}
                            type={"text"}
                            normalize={(val, val1) => {
                              if (PHONE_REGX.test(val)) {
                                return val;
                              } else if (val === "") {
                                return val;
                              } else {
                                return val1;
                              }
                            }}
                            meta={{
                              error:
                                this.state.validation.largeLuggage &&
                                this.state.validation.largeLuggage,
                              touched:
                                this.state.validation.largeLuggage && true,
                            }}
                            onBlur={() => {
                              if (!this.state.savedData.largeLuggage) {
                                this.setState({
                                  validation: {
                                    ...this.state.validation,
                                    largeLuggage:
                                      VALIDATION_MESSAGES.LARGE_LUGGAGE_REQUIRED,
                                  },
                                });
                              }
                            }}
                            config={{
                              value: this.state.savedData.largeLuggage,
                              onChange: (value) => {
                                if (PHONE_REGX.test(value.target.value)) {
                                  this.setState(
                                    {
                                      savedData: {
                                        ...this.state.savedData,
                                        largeLuggage: value.target.value,
                                      },
                                    },
                                    () => {
                                      if (!this.state.savedData.largeLuggage) {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            largeLuggage:
                                              VALIDATION_MESSAGES.LARGE_LUGGAGE_REQUIRED,
                                          },
                                        });
                                      } else if (
                                        this.state.savedData.largeLuggage > 25
                                      ) {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            largeLuggage:
                                              VALIDATION_MESSAGES.MAX_VALUE_25,
                                          },
                                        });
                                      } else {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            largeLuggage: false,
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
                                        largeLuggage: value.target.value,
                                      },
                                    },
                                    () => {
                                      if (!this.state.savedData.largeLuggage) {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            largeLuggage:
                                              VALIDATION_MESSAGES.LARGE_LUGGAGE_REQUIRED,
                                          },
                                        });
                                      } else {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            largeLuggage: false,
                                          },
                                        });
                                      }
                                    }
                                  );
                                }
                              },
                            }}
                          />
                          <span class="text_label">max upto 25</span>
                        </div>
                        <div className="form-group">
                          <Field
                            name={STRINGS.SMALL_LUGGAGE_NAME}
                            component={Input}
                            placeholder={STRINGS.SMALL_LUGGAGE_PLACEHOLDER}
                            type={"text"}
                            normalize={(val, val1) => {
                              if (PHONE_REGX.test(val)) {
                                return val;
                              } else if (val === "") {
                                return val;
                              } else {
                                return val1;
                              }
                            }}
                            meta={{
                              error:
                                this.state.validation.smallLuggage &&
                                this.state.validation.smallLuggage,
                              touched:
                                this.state.validation.smallLuggage && true,
                            }}
                            onBlur={() => {
                              if (!this.state.savedData.smallLuggage) {
                                this.setState({
                                  validation: {
                                    ...this.state.validation,
                                    smallLuggage:
                                      VALIDATION_MESSAGES.SMALL_LUGGAGE_REQUIRED,
                                  },
                                });
                              }
                            }}
                            config={{
                              value: this.state.savedData.smallLuggage,
                              onChange: (value) => {
                                if (PHONE_REGX.test(value.target.value)) {
                                  this.setState(
                                    {
                                      savedData: {
                                        ...this.state.savedData,
                                        smallLuggage: value.target.value,
                                      },
                                    },
                                    () => {
                                      if (!this.state.savedData.smallLuggage) {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            smallLuggage:
                                              VALIDATION_MESSAGES.SMALL_LUGGAGE_REQUIRED,
                                          },
                                        });
                                      } else if (
                                        this.state.savedData.smallLuggage > 25
                                      ) {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            smallLuggage:
                                              VALIDATION_MESSAGES.MAX_VALUE_25,
                                          },
                                        });
                                      } else {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            smallLuggage: false,
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
                                        smallLuggage: value.target.value,
                                      },
                                    },
                                    () => {
                                      if (!this.state.savedData.smallLuggage) {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            smallLuggage:
                                              VALIDATION_MESSAGES.SMALL_LUGGAGE_REQUIRED,
                                          },
                                        });
                                      } else {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            smallLuggage: false,
                                          },
                                        });
                                      }
                                    }
                                  );
                                }
                              },
                            }}
                          />
                          <span class="text_label">max upto 25</span>
                        </div>
                        <div className="form-group">
                          <Field
                            name={STRINGS.NUMBER_OF_DOORS}
                            component={Input}
                            placeholder={STRINGS.DOORS_PLACEHOLDER}
                            type={"text"}
                            meta={{
                              error:
                                this.state.validation.doors &&
                                this.state.validation.doors,
                              touched: this.state.validation.doors && true,
                            }}
                            onBlur={() => {
                              if (!this.state.savedData.doors) {
                                this.setState({
                                  validation: {
                                    ...this.state.validation,
                                    doors: VALIDATION_MESSAGES.DOORS_REQUIRED,
                                  },
                                });
                              }
                            }}
                            config={{
                              value: this.state.savedData.doors,
                              onChange: (value) => {
                                if (PHONE_REGX.test(value.target.value)) {
                                  this.setState(
                                    {
                                      savedData: {
                                        ...this.state.savedData,
                                        doors: value.target.value,
                                      },
                                    },
                                    () => {
                                      if (!this.state.savedData.doors) {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            doors:
                                              VALIDATION_MESSAGES.DOORS_REQUIRED,
                                          },
                                        });
                                      } else if (
                                        this.state.savedData.doors < 2
                                      ) {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            doors:
                                              VALIDATION_MESSAGES.MIN_VALUE_2,
                                          },
                                        });
                                      } else if (
                                        this.state.savedData.doors > 5
                                      ) {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            doors:
                                              VALIDATION_MESSAGES.MAX_VALUE_5,
                                          },
                                        });
                                      } else {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            doors: false,
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
                                        doors: value.target.value,
                                      },
                                    },
                                    () => {
                                      if (!this.state.savedData.doors) {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            doors:
                                              VALIDATION_MESSAGES.DOORS_REQUIRED,
                                          },
                                        });
                                      } else {
                                        this.setState({
                                          validation: {
                                            ...this.state.validation,
                                            doors: false,
                                          },
                                        });
                                      }
                                    }
                                  );
                                }
                              },
                            }}
                          />
                          <span class="text_label">min 2</span>
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
                            onAddNewVehicle({
                              ...this.state.savedData,
                              image: this.state.currentImages,
                            });
                          }
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                ) : (
                  <form action="">
                    {imagesforModal.map((items, index) => {
                      const { addImages } = this.props;
                      return (
                        <React.Fragment key={index + ""}>
                          <h5 className="mb-3 text-capitalize">
                            {items.name}:
                          </h5>
                          <ul className="row align-items-center compact_cars mb-5">
                            {items.urls.map((item, innerIndex) => {
                              return (
                                //
                                <li
                                  className="col-md-3 text-center"
                                  key={innerIndex + ""}
                                >
                                  <div
                                    className={`shadow_car ${
                                      item === currentImages[0] &&
                                      `border success`
                                    }`}
                                    onClick={() => {
                                      const tempUrl = [];
                                      tempUrl.push(item);
                                      addImages(tempUrl);
                                      this.setState(
                                        {
                                          currentImages: tempUrl,
                                        },
                                        () => {
                                          let imagesCount = 0;
                                          tempUrl.filter((item) => {
                                            if (!!item) {
                                              imagesCount++;
                                            }
                                          });
                                          if (!!imagesCount) {
                                            this.setState({
                                              validation: {
                                                ...this.state.validation,
                                                currentImages: false,
                                              },
                                            });
                                          }
                                          this.setState(
                                            { addImages: false },
                                            () => {
                                              if (
                                                !(
                                                  this.state.currentImages &&
                                                  this.state.currentImages
                                                    .length
                                                )
                                              ) {
                                                this.setState({
                                                  validation: {
                                                    ...this.state.validation,
                                                    currentImages:
                                                      VALIDATION_MESSAGES.UPLOAD_AT_LEAST_REQUIRED,
                                                  },
                                                });
                                              }
                                              document
                                                .getElementsByClassName(
                                                  "modal"
                                                )[0]
                                                .scrollTo(0, 0);
                                            }
                                          );
                                        }
                                      );
                                    }}
                                  >
                                    <i>
                                      <img
                                        src={item}
                                        alt="ECR"
                                        className={`img-fluid`}
                                        width="200px"
                                      />
                                    </i>
                                  </div>
                                  <p className="text-center size">
                                    Vehicle image is for illustration purpose
                                    only
                                  </p>
                                </li>
                              );
                            })}
                          </ul>
                        </React.Fragment>
                      );
                    })}

                    {/* <CustomFileDrop
                                                                                nonUpload={NON_UPLOAD}

                                                vehicleImages={vehicleImages}
                                                fileUploader={fileUploader}
                                                closeUploadder={(files, allFiles) => {
                                                    let length = allFiles && allFiles.length
                                                    let problemImages = []
                                                    allFiles.forEach((f, i) => {
                                                        const { file, meta } = f
                                                        fileUploader({ file, meta }, i, allFiles.length, (response) => {
                                                            this.setState({
                                                                snackbarData: {
                                                                    variant: response.status ? 'success' : 'error',
                                                                    message: response.msg || 'error'
                                                                }
                                                            });
                                                            this.setState({ openSnackBar: true })
                                                        }, (response, index) => {
                                                            this.setState({
                                                                snackbarData: {
                                                                    variant: response.status ? 'success' : 'error',
                                                                    message: response.msg || 'error'
                                                                }
                                                            }
                                                            );
                                                            this.setState({ openSnackBar: true })
                                                        })
                                                    })
                                                    if (problemImages && problemImages.length) {
                                                        this.setState({
                                                            snackbarData: {
                                                                variant: 'error',
                                                                message: `Image ${problemImages} is not uploaded successfully try again.`
                                                            }
                                                        });
                                                        this.setState({ openSnackBar: true })
                                                    }
                                                    if (length === 0) {
                                                        this.setState({ validation: Object.assign(this.state.validation, { currentImages: VALIDATION_MESSAGES.UPLOAD_AT_LEAST_REQUIRED }) })
                                                    }
                                                    else if (length !== 0) {
                                                        this.setState({ validation: Object.assign(this.state.validation, { currentImages: false }) })
                                                    }
                                                    this.setState({ addImages: false })
                                                }}
                                            /> */}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
