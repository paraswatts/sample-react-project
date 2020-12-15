import React, { useState, useEffect } from "react";
import {
  reduxForm,
  Field,
  change as changeField,
  initialize,
} from "redux-form";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "./styles.scss";
import validator from "./validator";
import AddNewVehicleCategory from "./addNewVehicleCategory";
const {
  defaultConfig: { PLATFORM, LOCATION },
} = require(`../../../../../../config/default`);
const { onSubmitFail } = require(`../../../../../../helpers/${PLATFORM}`);
const {
  SnackbarWrapper,
} = require(`../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`);
const {
  ADD_ICON,
  VALIDATION_MESSAGES,
  PHONE_REGX,
  ROUTES,
  EDIT_ICON,
  NO_IMG,
  CLOSE_ICON,
  ABOUT_ICON,
} = require(`../../../../../../shared/${PLATFORM}/constants`);
const {
  STRINGS,
} = require(`../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`);
const { Form } = require(`../../../../../../components/${PLATFORM}/atoms/form`);
const {
  TextArea,
} = require(`../../../../../../components/${PLATFORM}/atoms/text-area`);
const {
  FormDropDown,
} = require(`../../../../../../components/${PLATFORM}/atoms/formDropDown/`);
const {
  Input,
} = require(`../../../../../../components/${PLATFORM}/atoms/input`);
const {
  InputSubmit,
} = require(`../../../../../../components/${PLATFORM}/atoms/input-submit`);
const {
  DecisionPopup,
} = require(`../../../../../../components/${PLATFORM}/atoms/decision-popup`);
const {
  CustomFileDrop,
} = require(`../../../../../../components/${PLATFORM}/cells/custom-filedrop`);
export const Screen = ({
  params,
  handleSubmit = () => { },
  onSubmit = () => { },
  getVehicleData,
  anyUpdate,
  deleteVehicle,
  getFuelList,
  getVehicleType,
  fileUploader,
  clearVehiclesImages,
  changeOrderImages,
  getVehcileCategory,
  getVehicleTransmission,
  vehicleData,
  fualData,
  vehicleType,
  vehicleTransmissionData,
  vehicleImages,
  vehicleCategory,
  createVehicleCategory,
  values,
  data,
  addNewVehicleCall,
  initialize,
  saveEditData,
  getVehiclesImages,
  addImages,
  imagesforModal = [],
  getVehicles,
}) => {
  const history = useHistory();
  useEffect(() => {
    clearVehiclesImages();
    getVehicleData();
    getVehicleType();
    getVehicleTransmission();
    getFuelList();
    getVehcileCategory();
    getVehicles();
    // return (() => {
    //     clearVehiclesImages()
    // })
  }, []);

  useEffect(() => {
    let currentImages = [];
    for (let index = 0; index < 1; index++) {
      currentImages.push("");
    }
    setCurrentImages(currentImages);
  }, []);
  useEffect(() => {
    let currentImages = [];
    for (let index = 0; index < 1; index++) {
      if (vehicleImages[index] && vehicleImages[index]) {
        currentImages.push(vehicleImages[index]);
      } else {
        currentImages.push("");
      }
    }
    setCurrentImages(currentImages);
  }, [vehicleImages.length]);

  useEffect(() => {
    if (anyUpdate) {
      getVehicleData();
      getVehicleType();
      getVehicleTransmission();
      getFuelList();
      getVehcileCategory();
      getVehicles();
    }
  }, [anyUpdate]);
  const [openSnackBar, setOpenSnackbar] = useState(false);
  const [addNewCategory, setAddNewCategory] = useState(false);
  const [snackbarData, setSnackBarData] = useState({
    variant: "",
    message: "",
  });
  useEffect(() => {
    let tempVehicleCategory = [];
    tempVehicleCategory =
      vehicleCategory &&
      vehicleCategory.map((item) => {
        return {
          value: item.category ? item.category : " ",
          label: item.category ? item.category : " ",
          id: item._id ? item._id : "",
        };
      });
    setVehicleCategoryList(tempVehicleCategory);
  }, [vehicleCategory]);
  useEffect(() => {
    let tempVehicleOptions = [];
    tempVehicleOptions =
      vehicleData &&
      vehicleData.map((item) => {
        return {
          value: item.name ? item.name : " ",
          label: item.name ? item.name : " ",
          airConditionType: item.airConditionType,
          adultSeats: item.adultSeats,
          numberOfDoor: item.numberOfDoor,
          transmissionType: item.transmissionType,
          url: item.url,
          largeLuggageSpace: item.largeLuggageSpace,
          id: item._id ? item._id : "",
          ...item,
        };
      });
    setVehicleOptions(tempVehicleOptions);
  }, [vehicleData]);

  useEffect(() => {
    let tempVehicleTypes = [];
    tempVehicleTypes =
      vehicleType &&
      vehicleType.map((item) => {
        return {
          value: item.name ? item.name : " ",
          label: item.name ? item.name : " ",
          id: item._id ? item._id : "",
          ...item,
        };
      });
    setVehicleTypes(tempVehicleTypes);
  }, [vehicleType]);
  useEffect(() => {
    let tempVehicleTransmission = [];
    tempVehicleTransmission =
      vehicleTransmissionData &&
      vehicleTransmissionData.map((item) => {
        return {
          value: item.name ? item.name : " ",
          label: item.name ? item.name : " ",
          id: item._id ? item._id : "",
          ...item,
        };
      });

    setVehicleTransmissionList(tempVehicleTransmission);
  }, [vehicleTransmissionData]);

  useEffect(() => {
    let tempFuelList = [];
    tempFuelList =
      fualData &&
      fualData.map((item) => {
        return {
          value: item.fuelType ? item.fuelType : " ",
          label: item.fuelType ? item.fuelType : " ",
          id: item._id ? item._id : "",
        };
      });

    setFuelList(tempFuelList);
  }, [fualData]);

  // checkHover(value) {
  //     // this.setState({ ...this.state, hovered: value })
  // }

  // deleteVehicle(
  //     item._id,
  //     (response) => {
  //         setSnackBarData({
  //             variant: response.status ? 'success' : 'error',
  //             message: response.msg || 'error'
  //         });
  //         setOpenSnackbar(true)
  //         // setTimeout(() => {
  //         //     setOpenSnackbar(false)
  //         // }, 2500)
  //     }, (response) => {
  //         setSnackBarData({
  //             variant: response.status ? 'success' : 'error',
  //             message: response.msg || 'error'
  //         });
  //         setOpenSnackbar(true)
  //     }
  // )
  const [vehicleCategoryList, setVehicleCategoryList] = useState([]);

  const [vehicleOptions, setVehicleOptions] = useState();

  const [vehicleTypes, setVehicleTypes] = useState();
  const [fileUploaderModal, setFileUploader] = useState(false);
  const [vehicleTransmissionList, setVehicleTransmissionList] = useState();
  const [fuelList, setFuelList] = useState([]);
  const [confirmBox, setConfirmBox] = useState(false);
  const [deleteItemData, setDeleteItemData] = useState();
  const [currentImages, setCurrentImages] = useState([]);
  const [currentImageError, setCurrentImageError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const checkHover = (value) => {
    setHovered(value);
  };
  return (
    <div
      className="app-main_outer for_vehicle"
      onClick={() => {
        setConfirmBox(false);
      }}
    >
      <div
        className="container-fluid"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h4 className="mb-3">Vehicles</h4>
        {confirmBox && (
          <DecisionPopup
            modalVisibility={confirmBox}
            dialogTitle={"Delete vehicle"}
            toggleDialogModal={() => setConfirmBox(false)}
            dialogContent={"Are you sure, you want to delete this vehicle?"}
            confirmButtonTitle={"confirm"}
            rejectButtonTitle={"cancel"}
            onConfirmation={() => {
              deleteVehicle(
                deleteItemData,
                (response) => {
                  setSnackBarData({
                    variant: response.status ? "success" : "error",
                    message: response.msg || "error",
                  });
                  setOpenSnackbar(true);
                  setConfirmBox(false);
                },
                (response) => {
                  setSnackBarData({
                    variant: response.status ? "success" : "error",
                    message: response.msg || "error",
                  });
                  setOpenSnackbar(true);
                  setConfirmBox(false);
                }
              );
            }}
            onRejection={() => {
              setConfirmBox(false);
            }}
          />
        )}
        {addNewCategory && (
          <AddNewVehicleCategory
            createVehicleCategory={(data) => {
              createVehicleCategory(
                data,
                (response) => {
                  setSnackBarData({
                    variant: response.status ? "success" : "error",
                    message: response.msg || "error",
                  });
                  setOpenSnackbar(true);
                  setAddNewCategory(false);
                },
                (response) => {
                  setSnackBarData({
                    variant: response.status ? "success" : "error",
                    message: response.msg || "error",
                  });
                  setOpenSnackbar(true);
                }
              );
            }}
            modalVisibility={() => {
              setAddNewCategory(false);
            }}
          />
        )}

        {fileUploaderModal && (
          <div id="myModal" className="modal">
            <div className={`modal-content modal-lg`}>
              <div
                className="modal_body"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <span
                  className="close"
                  onClick={() => {
                    let flag = false;
                    currentImages.find((item, index) => {
                      if (!!item) {
                        flag = true;
                      }
                    });
                    if (!flag) {
                      setCurrentImageError("Please upload at least one image.");
                    } else {
                      setCurrentImageError(false);
                    }
                    setFileUploader(false);
                  }}
                >
                  &times;
                </span>
                <form action="">
                  {imagesforModal.map((items, index) => {
                    return (
                      <React.Fragment key={index + ""}>
                        <h5 className="mb-3 text-capitalize">{items.name}:</h5>
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
                                    let imagesCount = 0;
                                    tempUrl.filter((item) => {
                                      if (!!item) {
                                        imagesCount++;
                                      }
                                    });
                                    if (!!imagesCount) {
                                      setCurrentImageError(false);
                                    }
                                    setCurrentImages(tempUrl);
                                    setFileUploader(false);
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
                                  Vehicle image is for illustration purpose only
                                </p>
                              </li>
                            );
                          })}
                        </ul>
                      </React.Fragment>
                    );
                  })}
                  {/* <h5 className="mb-3">Add images of vehicle:</h5>
                                    <CustomFileDrop
                                                                        nonUpload={NON_UPLOAD}

                                        vehicleImages={vehicleImages}
                                        closeUploadder={(files, allFiles) => {
                                            let length = allFiles && allFiles.length

                                            let problemImages = []
                                            allFiles.forEach((f, i) => {
                                                const { file, meta } = f
                                                fileUploader({ file, meta }, i, allFiles.length, (response) => {
                                                    setSnackBarData({
                                                        variant: response.status ? 'success' : 'error',
                                                        message: response.msg || 'error'
                                                    });
                                                    setOpenSnackbar(true)
                                                    // setFileUploader(false)

                                                }, (response) => {
                                                    setSnackBarData({
                                                        variant: response.status ? 'success' : 'error',
                                                        message: response.msg || 'error'
                                                    });
                                                    setOpenSnackbar(true)
                                                }
                                                )
                                            })
                                            if (length) {
                                                setCurrentImageError(false)
                                            }
                                            else {
                                                setCurrentImageError("Please upload at least one image.")
                                            }
                                            setFileUploader(false)

                                            // if (problemImages && problemImages.length) {
                                            //     this.setState({
                                            //         snackbarData: {
                                            //             variant: 'error',
                                            //             message: `Image ${problemImages} is not uploaded successfully try again.`
                                            //         }
                                            //     });
                                            //     this.setState({ openSnackBar: true })
                                            // }
                                            // else {

                                            //     // closeUploadder()
                                            // }
                                            // if (length === 0) {
                                            //     this.setState({ validation: Object.assign(this.state.validation, { currentImages: "Please upload at least one image." }) })
                                            // }
                                            // else if (length !== 0) {
                                            //     this.setState({ validation: Object.assign(this.state.validation, { currentImages: false }) })
                                            // }
                                            // this.setState({ addImages: false })
                                            if (currentImages.length === 0) {

                                            }
                                        }}
                                    />
                                    <h6>Can add upto 10 images</h6> */}
                </form>
              </div>
            </div>
          </div>
        )}
        <div className="current_cehicles mt-2 mb-3 form-fields">
          <label className="mb-4">Here are your current vehicle(s):</label>
          {/* <span>Here are your current vehicles.</span> */}
          <div className="badges_vehicles">
            {vehicleOptions &&
              vehicleOptions.map((item, index) => {
                return (
                  <span className="badge badge-grey" key={index + ""}>
                    {item.label}
                    <i
                      className="ml-3"
                      onClick={() => {
                        // const { adultSeats, childSeats, largeLuggage, vehicleRangeFrom: rangeFrom, vehicleRangeTo: rangeTo, smallLuggage, vehicleCategory, vehicleCode, vehicleDescription: vehicleDesc, vehicleName, vehicleTransmission, vehicleType, fuelType, airConditionType: airCondition, noOfDoors: doors }

                        // let tempImages = []
                        // item && item.url.filter((item) => {
                        //     if (!!item) {
                        //         tempImages.push({
                        //             Location: item
                        //         )
                        //     }
                        // })

                        addImages(item.url);
                        saveEditData({
                          ...item,
                          doors: item.numberOfDoor,
                          largeLuggage: item.largeLuggageSpace,
                          smallLuggage: item.smallLuggageSpace,
                          adultsSeats: item.adultSeats,
                          vehicleRangeFrom: item.yearRange.from,
                          vehicleRangeTo: item.yearRange.to,
                          vehicleDescription: item.description,
                          vehicleName: item.name,
                          vehicleCategory: item.category,
                          vehicleCode: item.vehicleCode,
                          vehicleTransmission: item.transmissionType,
                          vehicleType: item.vehicleType,
                          fuelType: item.fuelType,
                          airConditionType: item.airConditionType,
                          noOfDoors: item.numberOfDoor,
                        });
                        history.push(`${ROUTES.EDIT_VEHICLE}?id=${item._id}`);
                        // history.push(ROUTES.EDIT_VEHICLE)
                      }}
                    >
                      <img src={EDIT_ICON} alt="" />
                    </i>
                    <i
                      className="ml-1"
                      onClick={() => {
                        setConfirmBox(true);
                        setDeleteItemData(item._id);
                      }}
                    >
                      <img src={CLOSE_ICON} alt="" />
                    </i>
                  </span>
                );
              })}
            {!!!(vehicleOptions && vehicleOptions.length) && (
              <label>No vehicle found</label>
            )}
          </div>
        </div>
        <label className="mb-2">Add a new vehicle:</label>

        <SnackbarWrapper
          visible={openSnackBar}
          onClose={() => setOpenSnackbar(false)}
          variant={snackbarData.variant}
          message={snackbarData.message}
        />
        <Form
          onSubmit={handleSubmit(() => {
            if (!!currentImageError) {
              // document.getElementsByClassName('vechile_pic')[0].scrollIntoView()
            } else {
              const {
                adultSeats,
                childSeats,
                largeLuggage,
                vehicleRangeFrom: rangeFrom,
                vehicleRangeTo: rangeTo,
                smallLuggage,
                vehicleCategory,
                vehicleCode,
                vehicleDescription: vehicleDesc,
                vehicleName,
                vehicleTransmission,
                vehicleType,
                fuelType,
                airConditionType: airCondition,
                noOfDoors: doors,
              } = data;
              let url = [];
              for (let index = 0; index < currentImages.length; index++) {
                if (!!currentImages[index]) {
                  url.push(currentImages[index]);
                }
              }
              addNewVehicleCall(
                {
                  vehicleType: vehicleType && vehicleType.id,
                  vehicleCode: vehicleCode.trim(),
                  category: vehicleCategory && vehicleCategory.id,
                  name: vehicleName.trim(),
                  adultSeats,
                  childSeats,
                  largeLuggageSpace: largeLuggage,
                  smallLuggageSpace: smallLuggage,
                  fuelType: fuelType && fuelType.id,
                  // manufactureYear,
                  numberOfDoor: doors,
                  yearRange: {
                    to: rangeTo,
                    from: rangeFrom,
                  },
                  description: vehicleDesc.trim(),
                  transmissionType:
                    vehicleTransmission && vehicleTransmission.id,
                  airConditionType: airCondition && airCondition.value,
                  url,
                },
                (response) => {
                  setSnackBarData({
                    variant: response.status ? "success" : "error",
                    message: response.msg || "error",
                  });
                  setOpenSnackbar(true);
                  initialize();
                  clearVehiclesImages();
                  setCurrentImages(["", "", "", "", "", "", "", "", "", ""]);
                  document.getElementsByTagName("body")[0].scrollTo(0, 0);
                },
                (response) => {
                  setSnackBarData({
                    variant: response.status ? "success" : "error",
                    message: response.msg || "error",
                  });
                  setOpenSnackbar(true);
                }
              );
            }
          })}
        >
          <div
            className={
              hovered === true ? "row tooltip_show" : "row tooltip_hide"
            }
          >
            <div className="col-lg-8 col-md-8">
              <div className="form-row">
                <div className="col-md-6">
                  <div className="form-group">
                    <Field
                      name={STRINGS.VEHICLE_TYPE_NAME}
                      component={FormDropDown}
                      dataItems={vehicleTypes}
                      isSearchable={true}
                      placeholder={STRINGS.VEHICLE_TYPE_PLACEHOLDER}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <Field
                      name={STRINGS.VEHICLE_NAME_NAME}
                      component={Input}
                      type={"text"}
                      placeholder={STRINGS.VEHICLE_NAME_PLACEHOLDER}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <Field
                      name={STRINGS.VEHICLE_CATEGORY_NAME}
                      component={FormDropDown}
                      dataItems={vehicleCategoryList}
                      isSearchable={true}
                      placeholder={STRINGS.VEHICLE_CATEGORY_PLACEHOLDER}
                    />
                  </div>
                </div>
                <div className="col-md-3 col-sm-3 col-5">
                  <div
                    className="form-group add-control"
                    onClick={() => {
                      // setAddNewModalVisibility(true)
                      setAddNewCategory(true);
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
                <div className="col-md-12">
                  <div className="form-group">
                    <Field
                      name={STRINGS.VEHICLE_DESCRIPTION_NAME}
                      component={TextArea}
                      placeholder={STRINGS.VEHICLE_DESCRIPTION_PLACEHOLDER}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 select_new_vehicle text-center">
              <div
                className={
                  hovered === true
                    ? "d-flex tooltip_show"
                    : "d-flex tooltip_hide"
                }
              >
                <div className="form-group pr-3">
                  <div
                    className="custom_drop"
                    onClick={() => {
                      setFileUploader(true);
                    }}
                  >
                    <Field
                      name={STRINGS.VEHICLE_IMAGE_NAME}
                      component={Input}
                      dataItems={[]}
                      isSearchable={false}
                      autofocus={true}
                      // meta={{
                      //     error: currentImageError && currentImageError,
                      //     touched: currentImageError && true
                      // }
                      // }
                      config={{
                        readOnly: true,
                        disabled: true,
                        // onBlur: (e) => {
                        //     e.preventDefault()
                        //     if (!this.state.savedData.vehicleType) {
                        //         this.setState({ validation: { ...this.state.validation, vehicleType: VALIDATION_MESSAGES.VEHICLE_TYPE_REQUIRED } })
                        //     }
                        // },
                      }}
                      placeholder={STRINGS.VEHICLE_IMAGE_PLACEHOLDER}
                    />
                  </div>
                  <div className="mt-3 d-flex justify-content-center align-items-center">
                    {currentImages.map((item, index) => {
                      return (
                        <img
                          src={!!item ? item : NO_IMG}
                          alt="ECR"
                          className={
                            !!item ? "img-fluid img-selected" : "img-fluid"
                          }
                          width={"100px"}
                          key={index + ""}
                        />
                      );
                    })}
                  </div>
                  {!!currentImageError && (
                    <span className="error_msg text-danger pl-0">
                      {currentImageError}
                    </span>
                  )}
                </div>
                <div
                  id={"tooltip_title_show"}
                  onMouseOut={() => checkHover(false)}
                  onMouseOver={() => checkHover(true)}
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
                  Please select the vehicle image that represent best your
                  actual vehicle
                </div>
              </div>
            </div>
            {/* <div className="col-lg-4 col-md-4"> */}
            {/* <div className="form-group">
                                            <input type="file" className="form-control" />
                                        </div> */}

            {/* <div className="form-group">
                                <div className="d-flex align-items-start justify-content-between vechile_pic">
                                    <div className="form-row">
                                        {
                                            currentImages.map((item, index) => {
                                                return (
                                                    <span className="col-3" key={index + ''}>
                                                        {!!item && <span
                                                            onClick={() => {
                                                                // tempCurrentImages
                                                                let tempCurrentImages = currentImages
                                                                tempCurrentImages.splice(index, 1)
                                                                tempCurrentImages.push('')

                                                                let tempdata = []
                                                                for (let index = 0; index < tempCurrentImages.length; index++) {
                                                                    if (!!tempCurrentImages[index]) {
                                                                        tempdata.push(tempCurrentImages[index])
                                                                    }
                                                                }

                                                                setCurrentImages(tempCurrentImages)
                                                                // this.setState({ currentImages })
                                                                changeOrderImages(tempdata)
                                                            }}
                                                        >&times;</span>}
                                                        <img src={!!item ? item : NO_IMG} alt="ECR" className={`img-fluid 
                                                                        ${!!item && (index === 0) && `primary-img`}
                                                                        `} width="134px"
                                                            id={index}
                                                            draggable={!!item ? true : false}
                                                            onDragStart={(evt) => {
                                                                evt.dataTransfer.setData("text", evt.target.id);
                                                            }}
                                                            onDrop={(ev) => {
                                                                if (!!item) {
                                                                    let tempCurrentImages = currentImages
                                                                    ev.preventDefault();
                                                                    let selectedIndex = ev.dataTransfer.getData('text')

                                                                    let droppedIndex = ev.target.id
                                                                    let deletedImg = currentImages.splice(selectedIndex, 1)
                                                                        ;

                                                                    tempCurrentImages.splice(droppedIndex, 0, ...deletedImg)
                                                                    let tempdata = []
                                                                    for (let index = 0; index < tempCurrentImages.length; index++) {

                                                                        if (!!tempCurrentImages[index]) {
                                                                            tempdata.push(currentImages[index])
                                                                        }
                                                                    }
                                                                    setCurrentImages(tempCurrentImages)
                                                                    // this.setState({ currentImages })
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
                                        <label className="px-1">Drag and Drop for reorder.</label>
                                    </div>

                                    <button className="add_btn"
                                        // onClick={() => {
                                        //     const { currentImages } = this.state
                                        //     this.setState({ addImages: true })
                                        //     let length = 0;
                                        //     for (let index = 0; index < currentImages.length; index++) {


                                        //         if (!!currentImages[index]) {
                                        //             length++
                                        //         }
                                        //     }
                                        //     if (length === 0) {
                                        //         this.setState({ validation: { ...this.state.validation, currentImages: "Please upload at least one image." } })
                                        //     }

                                        // }}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setFileUploader(true)
                                        }}
                                    >
                                        Add
                                                <i><img src={ADD_ICON} alt="ECR" className="img-fluid" width="34px" /></i>
                                    </button>
                                </div> */}

            {/* {!!currentImageError && <span className="error_msg text-danger pl-0">{currentImageError}</span>}

                            </div>
                        </div> */}
          </div>
          <div className="form-row">
            <div className="col-lg-4 col-md-6">
              <div className="form-group">
                <Field
                  name={STRINGS.FUEL_TYPE_NAME}
                  component={FormDropDown}
                  isSearchable={true}
                  dataItems={fuelList}
                  placeholder={STRINGS.FUEL_TYPE_PLACEHOLDER}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="form-group">
                <Field
                  name={STRINGS.VEHICLE_TRANSMISSION_NAME}
                  component={FormDropDown}
                  isSearchable={true}
                  dataItems={vehicleTransmissionList}
                  placeholder={STRINGS.VEHICLE_TRANSMISSION_PLACEHOLDER}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 label_float">
              <div className="form-group">
                <Field
                  name={STRINGS.ADULT_SEATS_NAME}
                  component={Input}
                  placeholder={STRINGS.ADULTS_SEATS_PLACEHOLDER}
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
                  config={{
                    type: "text",
                  }}
                />
                <span className="text_label">max upto 25</span>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 label_float">
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
                  config={{
                    type: "text",
                  }}
                />
                <span className="text_label">max upto 25</span>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 label_float">
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
                  config={{
                    type: "text",
                  }}
                />
                <span className="text_label">max upto 25</span>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 label_float">
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
                  config={{
                    type: "text",
                  }}
                />
                <span className="text_label">max upto 25</span>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="form-group">
                <Field
                  name={STRINGS.VEHICLE_RANGE_FROM}
                  component={Input}
                  placeholder={STRINGS.YEAR_RANGE_FROM_PLACEHOLDER}
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
                />
                <span className="text_label">min year 1980</span>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 label_float">
              <div className="form-group">
                <Field
                  name={STRINGS.VEHICLE_RANGE_To}
                  component={Input}
                  placeholder={STRINGS.YEAR_RANGE_TO_PLACEHOLDER}
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
                />
                <span className="text_label">min year 1980</span>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 label_float">
              <div className="form-group">
                <Field
                  name={STRINGS.VEHICLE_CODE_NAME}
                  component={Input}
                  placeholder={STRINGS.ENTER_VEHICLE_CODE_PLACEHOLDER}
                  type={"text"}
                />
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="form-group">
                <Field
                  name={STRINGS.AIR_CONDITION_TYPE}
                  component={FormDropDown}
                  isSearchable={true}
                  dataItems={[
                    { value: true, label: "AC" },
                    { value: false, label: "Non AC" },
                  ]}
                  placeholder={STRINGS.AIR_CONDITION_PLACEHOLDER}
                />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 label_float">
              <div className="form-group">
                <Field
                  name={STRINGS.NUMBER_OF_DOORS}
                  component={Input}
                  isSearchable={true}
                  placeholder={STRINGS.NUMBER_OF_DOORS_PLACEHOLDER}
                />
                <span className="text_label">min value 2</span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <InputSubmit
              buttonLabel={"Add new vehicle"}
              buttonStyle={"btn btn-lg btn-primary text-capitalize"}
              buttonAction={() => {
                let flag = false;
                currentImages.find((item, index) => {
                  if (!!item) {
                    flag = true;
                  }
                });
                if (!flag) {
                  setCurrentImageError(
                    VALIDATION_MESSAGES.UPLOAD_AT_LEAST_REQUIRED
                  );
                } else {
                  setCurrentImageError(false);
                }
              }}
            />
          </div>
        </Form>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    values: state,
    userData: state.CommonReducer.userData,
    platformType: state.CommonReducer.platformType,
    dashboardData: state.AgencyDashboardReducer.dashboardData,
    dashboardTableData: state.AgencyDashboardReducer.dashboardTableData,
    anyUpdate: state.AgencyDashboardReducer.anyUpdate,
    insuranceData:
      state.AddNewListingReducer.insuranceList &&
      state.AddNewListingReducer.insuranceList,
    ferryData:
      state.AddNewListingReducer && state.AddNewListingReducer.ferryData,
    fuelOfferData:
      state.AddNewListingReducer && state.AddNewListingReducer.fuelOffer,
    termsData:
      state && state.AddNewListingReducer && state.AddNewListingReducer.terms,
  };
};
const reduxFormFunction = reduxForm({
  form: "vehicle",
  onSubmitFail,
  validate: validator,
  enableReinitialize: true,
})(Screen);

const mapDispatchToProps = (dispatch) => {
  return {
    changeField: (form, field, value) => {
      dispatch(changeField(form, field, value));
    },
    initialize: () => {
      dispatch(initialize());
    },
  };
};
export const Vehicles = connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxFormFunction);
