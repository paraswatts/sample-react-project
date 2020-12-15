import React, { useState, useEffect } from "react";
import { reduxForm, Field, change as changeField } from "redux-form";
import { connect } from 'react-redux';
import "./style.scss";
import moment from 'moment';

import validator from "./formValidatorStep1";
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../config/default`);
const {
    getVehicleData,
    getBranchList,
    getFuelList,
    startLoader,
    stopLoader,
    fileUploader,
    localSavedImages,
    getVehicleType,
    getVehicleTransmission,
    getBranchManager,
    createBranch,
    setFormStep1Data,
    clearVehiclesImages,
    changeOrderImages,
    getVehcileCategory,
    addNewVehicle,
    createVehicleCategory,
    addNewMember,
    getVehicles,
    addImages
} = require(`../../../../../../redux/${PLATFORM}/actions`);
const { DatePickerInput } = require(`../../../../../../components/${PLATFORM}/atoms/date-picker`)
const { Form } = require(`../../../../../../components/${PLATFORM}/atoms/form`);
const { ADD_ICON, VALIDATION_MESSAGES, REFERENCE_REGX, PHONE_REGX, USER_ROLES } = require(`../../../../../../shared/${PLATFORM}/constants`);
const { LABELS } = require(`../../../../../../shared/${PLATFORM}/constants`)
const { STRINGS } = require(`../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`)
const { Input } = require(`../../../../../../components/${PLATFORM}/atoms/input`);
const { InputSubmit } = require(`../../../../../../components/${PLATFORM}/atoms/input-submit`);
const { onSubmitFail } = require(`../../../../../../helpers/${PLATFORM}`);
const { FormDropDown } = require(`../../../../../../components/${PLATFORM}/atoms/formDropDown/`)
const { getCountryData } = require(`../../../../../../helpers/${PLATFORM}/prepare-country-related-data`);
const { AddNewVehicle } = require(`./addNewVehicle`);
const { AddNewBranch } = require(`./addNewBranch`)
const { InputWithSlashLabel } = require(`../../../../../../components/${PLATFORM}/atoms/input-with-slash-label`)
const { TimePickerInput } = require(`../../../../../../components/${PLATFORM}/atoms/time-picker`);
const { SnackbarWrapper } = require(`../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`)



const SignupForm = ({
    handleSubmit = () => { },
    props,
    subscribe,
    credentials = {
        CompanyName: '',
        name: '',
        surname: '',
        dob: '',
        city: '',
        country: '',
        email: '',
        phoneKey: '',
        phoneNumber: '',
        password: '',
        reenter_password: '',
        subscribe: ''
    },
    onSubmit = () => { },
    setSubscribeChange = () => { },
    setCredentials = () => { },
    children,
    maxDateForPickUp,
    minDateForDropOff,
    maxTimeForFirstPickup,
    minTimeForSecondPickup,
    maxTimeForFirstDropoff,
    minTimeForSecondDropoff,
    changeField,
    getVehicleData = () => { },
    vehicleData,
    getBranchList = () => { },
    branchData,
    getFuelList = () => { },
    startLoader,
    stopLoader,
    fileUploader = () => { },
    vehicleImages,
    savedImages,
    localSavedImagesArray,
    getVehicleType = () => { },
    vehicleType,
    getVehicleTransmission = () => { },
    vehicleTransmissionData,
    fualData,
    getBranchManager = () => { },
    branchManagers = () => { },
    createBranch = () => { },
    anyUpdate,
    setFormStep1Data,
    inputtedValues,
    clearVehiclesImages,
    changeOrderImages = () => { },
    getVehcileCategory = () => { },
    vehicleCategory,
    addNewVehicleCall,
    createVehicleCategory = () => { },
    addNewMember = () => { },
    role,
    getVehicles,
    imagesforModal,
    addImages
}) => {

    useEffect(() => {
        if (anyUpdate) {
            getVehicleData()
            getBranchList()
            getVehicleType()
            getVehicleTransmission()
            getFuelList()
            !(role === USER_ROLES.MEMBER) && getBranchManager()
            getVehcileCategory()
            getVehicles()
        }
    }, [anyUpdate])
    useEffect(() => {
        getVehicleData()
        getBranchList()
        getVehicleType()
        clearVehiclesImages()
        getVehicleTransmission()
        getFuelList()
        !(role === USER_ROLES.MEMBER) && getBranchManager()
        getVehcileCategory()
        getVehicles()
    }, [])

    useEffect(() => {
        let tempVehicleCategory = []
        tempVehicleCategory = vehicleCategory && vehicleCategory.map((item) => {
            return { value: item.category ? item.category : " ", label: item.category ? item.category : " ", id: item._id ? item._id : "" }
        })
        setVehicleCategoryList(tempVehicleCategory)
    }, [vehicleCategory])

    useEffect(() => {
        let tempVehicleOptions = []
        tempVehicleOptions = vehicleData && vehicleData.map((item) => {
            return { value: item._id ? item._id : " ", label: item.name ? item.name : " ", airConditionType: item.airConditionType, adultSeats: item.adultSeats, numberOfDoor: item.numberOfDoor, transmissionType: item.transmissionType, url: item.url, largeLuggageSpace: item.largeLuggageSpace, id: item._id ? item._id : '', ...item }
        })
        setVehicleOptions(tempVehicleOptions)
    }, [vehicleData])

    useEffect(() => {
        let tempBranchMangersList = []
        tempBranchMangersList = branchManagers && branchManagers.map((item) => {
            return { value: item.name ? item.name + item.surname : " ", label: item.name ? item.name + " " + item.surname : " ", id: item._id, ...item }
        })
        setBranchManagersList(tempBranchMangersList)
    }, [branchManagers])

    useEffect(() => {
        let tempVehicleTypes = []
        tempVehicleTypes = vehicleType && vehicleType.map((item) => {
            return { value: item.name ? item.name : " ", label: item.name ? item.name : " ", id: item._id ? item._id : "", ...item }
        })
        setVehicleTypes(tempVehicleTypes)

    }, [vehicleType])
    useEffect(() => {
        let tempVehicleTransmission = []
        tempVehicleTransmission = vehicleTransmissionData && vehicleTransmissionData.map((item) => {
            return { value: item.name ? item.name : " ", label: item.name ? item.name : " ", id: item._id ? item._id : "", ...item }
        })

        setVehicleTransmissionList(tempVehicleTransmission)

    }, [vehicleTransmissionData])

    useEffect(() => {
        let tempFuelList = []
        tempFuelList = fualData && fualData.map((item) => {
            return { value: item.fuelType ? item.fuelType : " ", label: item.fuelType ? item.fuelType : " ", id: item._id ? item._id : "" }
        })
        setFuelList(tempFuelList)
    }, [fualData])

    useEffect(() => {
        let tempBranchOptions = []
        tempBranchOptions = branchData && branchData.map((item) => {
            return { value: item.name ? item.name : " ", label: item.name ? item.name : " ", id: item._id ? item._id : "", city: item.city ? item.city : '', ...item }
        })

        setBranchOptions(tempBranchOptions)


    }, [branchData])
    useEffect(() => {

        if (!!inputtedValues) {
            const { PickUpLocation, DropOffLocation } = inputtedValues
            if (!!PickUpLocation) {
                let time1 = (moment(new Date(PickUpLocation.pickUp_dropOff_from)).format('hh:mm a'))
                let time2 = (moment(new Date(PickUpLocation.pickUp_dropOff_to)).format('hh:mm a'))
                changeField('addNewListingFormStep1', "pickuptime1", PickUpLocation.pickUp_dropOff_from)
                changeField('addNewListingFormStep1', "pickuptime2", PickUpLocation.pickUp_dropOff_to)
                setPickup1(time1)
                setPickup2(time2)
            }
            changeField('addNewListingFormStep1', STRINGS.PICK_UP_LOCATION_NAME, PickUpLocation)
            changeField('addNewListingFormStep1', STRINGS.DROP_OFF_LOCATION_NAME, DropOffLocation)
            setPickuplocation(PickUpLocation)
            if (!!DropOffLocation) {
                let time1 = (moment(new Date(DropOffLocation && DropOffLocation.pickUp_dropOff_from)).format('hh:mm a'))
                let time2 = (moment(new Date(DropOffLocation && DropOffLocation.pickUp_dropOff_to)).format('hh:mm a'))
                setDropoff1(time1)
                setDropoff2(time2)
                changeField('addNewListingFormStep1', "dropofftime1", DropOffLocation && DropOffLocation.pickUp_dropOff_from)
                changeField('addNewListingFormStep1', "dropofftime2", DropOffLocation && DropOffLocation.pickUp_dropOff_to)

            }
            setDropofflocation(DropOffLocation)

        }
    }, [inputtedValues && Object.values(inputtedValues).length])

    const [vehicleCategoryList, setVehicleCategoryList] = useState([])
    const [pickup1, setPickup1] = useState()
    const [pickup2, setPickup2] = useState()
    const [addNewVehicle, setAddNewVehicle] = useState(false)
    const [addNewModalVisibility, setAddNewModalVisibility] = useState(false)
    const [vehicleOptions, setVehicleOptions] = useState()
    const [branchOptions, setBranchOptions] = useState()
    const [vehicleTypes, setVehicleTypes] = useState()
    const [pickuplocation, setPickuplocation] = useState()
    const [dropofflocation, setDropofflocation] = useState()
    const [dropoff1, setDropoff1] = useState()
    const [dropoff2, setDropoff2] = useState()
    const [vehicleTransmissionList, setVehicleTransmissionList] = useState()
    const [fuelList, setFuelList] = useState([])
    const [branchManagersList, setBranchManagersList] = useState([])
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });
    // 
    return (
        <>
            <div className={`${((snackbarData && snackbarData.variant) === 'error') && `in-modal`}`}>
                <SnackbarWrapper
                    visible={openSnackBar}
                    onClose={() => setOpenSnackbar(false)}
                    variant={snackbarData.variant}
                    message={snackbarData.message}
                />
            </div>
            <Form onSubmit={
                handleSubmit(onSubmit)}>
                <div className="form-fields">
                    <label>1. Driver's Details:</label>
                    <div className="form-row">
                        <div className="col-md-4 col-sm-6">
                            <Field
                                name={STRINGS.DRIVER_AGE}
                                component={Input}
                                placeholder={STRINGS.MINIMUM_AGE_PLACEHOLDER}
                                type={'number'}
                                normalize={(val, val1) => {
                                    if (PHONE_REGX.test(val)) {
                                        return val
                                    }
                                    else if (val === '') {
                                        return val
                                    }
                                    else {
                                        return val1
                                    }
                                }}

                                config={{
                                    type: "text",
                                }}
                            />
                        </div>
                    </div>
                </div>
                {addNewVehicle && <AddNewVehicle
                    ADD_ICON={ADD_ICON}
                    imagesforModal={imagesforModal}
                    fileUploader={fileUploader}
                    addImages={addImages}
                    vehicleType={vehicleTypes}
                    createVehicleCategory={createVehicleCategory}
                    vehicleImages={vehicleImages}
                    clearVehiclesImages={clearVehiclesImages}
                    vehicleTransmissionList={vehicleTransmissionList}
                    changeOrderImages={changeOrderImages}
                    vehicleCategory={vehicleCategoryList}
                    onAddNewVehicle={
                        (data) => {
                            const { adultSeats, childSeats, largeLuggage, rangeFrom, rangeTo, smallLuggage, vehicleCategory, vehicleCode, vehicleDesc, vehicleName, vehicleTransmission, vehicleType, image, fuelType, airCondition, manufactureYear, doors } = data
                            let url = []
                            for (let index = 0; index < image.length; index++) {
                                if (!!image[index]) {
                                    url.push(image[index])
                                }
                            }
                            addNewVehicleCall({
                                vehicleType: vehicleType && vehicleType.id,
                                vehicleCode: vehicleCode.trim(),
                                category: vehicleCategory && vehicleCategory.id,
                                name: vehicleName.trim(),
                                adultSeats,
                                childSeats,
                                largeLuggageSpace: largeLuggage,
                                smallLuggageSpace: smallLuggage,
                                fuelType: fuelType && fuelType.id,
                                numberOfDoor: doors,
                                yearRange: {
                                    to: rangeTo,
                                    from: rangeFrom
                                },
                                description: vehicleDesc.trim(),
                                transmissionType: vehicleTransmission && vehicleTransmission.id,
                                airConditionType: airCondition && airCondition.value,
                                url
                            },
                                (response) => {
                                    setSnackBarData({
                                        variant: response.status ? 'success' : 'error',
                                        message: response.msg || 'error'
                                    });
                                    setOpenSnackbar(true)
                                    setAddNewVehicle(false)
                                },
                                (response) => {
                                    setSnackBarData({
                                        variant: response.status ? 'success' : 'error',
                                        message: response.msg || 'error'
                                    });
                                    setOpenSnackbar(true)
                                }

                            )
                        }
                    }
                    localSavedImages={(index, data) => {
                        savedImages(index, data)
                    }}
                    fuelList={fuelList}
                    localSavedImagesArray={localSavedImagesArray}
                    modalVisibilityHandler={() => setAddNewVehicle(false)}
                />}
                {addNewModalVisibility && <AddNewBranch
                    ADD_ICON={ADD_ICON}
                    onAddNewMember={addNewMember}
                    branchManagers={branchManagersList}
                    createBranch={(data) => {
                        const { address, branchManager, branchName, city, closeby, code, country, email, openfrom, phone, phoneCode, pickupdropoff1, pickupdropoff2, postcode, suburb } = data

                        createBranch({
                            name: branchName.trim(),
                            phoneNumber: {
                                code: phoneCode && phoneCode.value,
                                phone: phone
                            },
                            email,
                            address: address.trim(),
                            suburb: suburb.trim(),
                            city: city.trim(),
                            country: country && country.value,
                            postcode,
                            code: code,
                            pickUp_dropOff_from: new Date(pickupdropoff1).getTime(),
                            pickUp_dropOff_to: new Date(pickupdropoff2).getTime(),
                            openFrom: new Date(openfrom).getTime(),
                            closeBy: new Date(closeby).getTime(),
                            branchManagerId: branchManager && branchManager.id

                        }, (response) => {
                            setSnackBarData({
                                variant: response.status ? 'success' : 'error',
                                message: response.msg || 'error'
                            });
                            setOpenSnackbar(true)
                            setAddNewModalVisibility(false)
                        },
                            (response) => {

                                setSnackBarData({
                                    variant: response.status ? 'success' : 'error',
                                    message: response.msg || 'error'
                                });
                                setOpenSnackbar(true)
                            }
                        )

                    }
                    }
                    modalVisibilityHandler={() => setAddNewModalVisibility(false)}
                />}

                <div className="form-fields">
                    <label>2. Vehicle Details:</label>
                    <div className="form-row">
                        <div className="col-lg-7">
                            <div className="form-row">
                                <div className="col-sm-8">
                                    <div className="form-group">
                                        <Field
                                            name={STRINGS.VEHICLES}
                                            component={FormDropDown}
                                            dataItems={vehicleOptions}
                                            isSearchable={true}
                                            placeholder={STRINGS.YOUR_SAVED_VEHICLE}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <div className="add-control" onClick={() => { setAddNewVehicle(true) }}>
                                            {LABELS.addNew}<i><img src={ADD_ICON} width="40" alt="ECR" className="img-fluid" /></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-5">
                            <div className="form-row">
                                <div className="col-md-4">
                                    <Field
                                        name={STRINGS.QUANTITY_NAME}
                                        component={InputWithSlashLabel}
                                        label={"Quantity"}
                                        type={'number'}
                                        normalize={(val, val1) => {
                                            if (PHONE_REGX.test(val)) {
                                                return val;
                                            }
                                            else if (val === '') {
                                                return val
                                            }
                                            else {
                                                return val1;
                                            }
                                        }}

                                        config={{
                                            type: "tel",
                                        }}
                                    />
                                </div>
                                <div className="col-sm-8 string_ref">
                                    <Field
                                        name={STRINGS.REFERENCE_NAME}
                                        component={InputWithSlashLabel}
                                        label={"Reference"}
                                        type={'text'}
                                        normalize={(val, val1) => {
                                            if (REFERENCE_REGX.test(val)) {
                                                return val;
                                            }
                                            else if (val === '') {
                                                return val
                                            }
                                            else {
                                                return val1;
                                            }
                                        }}
                                        config={{
                                            type: "text",
                                        }}
                                    />
                                    <span className="text_label">Optional</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-fields">
                    <label>3. Trip Details:</label>
                    <div className="form-row drop_input">
                        <div className="col-lg-7 col-md-9">
                            <div className="form-row">
                                <div className="col-sm-8">
                                    <div className="form-group">
                                        <Field
                                            name={STRINGS.PICK_UP_LOCATION_NAME}
                                            component={FormDropDown}
                                            dataItems={branchOptions}
                                            isSearchable={true}
                                            placeholder={STRINGS.PICKUP_LOCATION_PLACEHOLDER}
                                            config={
                                                {
                                                    value: pickuplocation,
                                                    onChange: (value) => {
                                                        changeField('addNewListingFormStep1', STRINGS.PICK_UP_LOCATION_NAME, value)
                                                        setPickuplocation(value)

                                                        let time1 = (moment(new Date(value && value.pickUp_dropOff_from)).format('hh:mm a'))
                                                        let time2 = (moment(new Date(value && value.pickUp_dropOff_to)).format('hh:mm a'))
                                                        setPickup1(time1)
                                                        setPickup2(time2)
                                                        changeField('addNewListingFormStep1', "pickuptime1", value && value.pickUp_dropOff_from)
                                                        changeField('addNewListingFormStep1', "pickuptime2", value && value.pickUp_dropOff_to)
                                                    },


                                                }
                                            }
                                        />
                                    </div>
                                </div>
                                {!(role == USER_ROLES.MEMBER) && <div className="col-md-4">
                                    <div className="form-group">
                                        <div className="add-control"
                                            onClick={() => {
                                                setAddNewModalVisibility(true)
                                            }}
                                        >
                                            {LABELS.addNew}<i><img src={ADD_ICON} width="40" alt="ECR" className="img-fluid" /></i>
                                        </div>
                                    </div>
                                </div>}
                            </div>

                            <div className="form-row">
                                <div className="col-md-4">
                                    <Field
                                        asterisk={true}
                                        name={STRINGS.PICK_UP_DATE_NAME}
                                        component={DatePickerInput}
                                        placeholder={STRINGS.PICK_UP_DATE_PLACEHOLDER}
                                        maxDate={maxDateForPickUp}
                                        minDate={new Date().getTime()}
                                    />
                                </div>

                                <div className="col-md-8">
                                    <div className="form-row">
                                        <div className="col-5">
                                            <Field
                                                name={STRINGS.PICK_UP_TIME + '1'}
                                                component={TimePickerInput}
                                                VALIDATION_MESSAGES={VALIDATION_MESSAGES}
                                                placeholder={STRINGS.PICK_UP_TIME_PLACEHOLDER}
                                                widthStyle={'col-md-12'}
                                                type={'text'}
                                                config={{
                                                    readOnly: true,
                                                    disabled: true,
                                                    onClick: () => {
                                                    },
                                                }}
                                                disabled={true}
                                                maxTime={maxTimeForFirstPickup && maxTimeForFirstPickup.getTime && maxTimeForFirstPickup.getTime()}
                                            />
                                        </div>

                                        <div className="col-1 text-center">
                                            <label className="to_txt">to</label>
                                        </div>

                                        <div className="col-6">
                                            <Field
                                                name={STRINGS.PICK_UP_TIME + '2'}
                                                component={TimePickerInput}
                                                placeholder={STRINGS.PICK_UP_TIME_PLACEHOLDER}
                                                widthStyle={'col-md-12'}
                                                type={'text'}
                                                config={{
                                                    // value: pickup2,
                                                    readOnly: true,
                                                    disabled: true,
                                                    onClick: () => {
                                                    },
                                                }}
                                                disabled={true}
                                                minTime={minTimeForSecondPickup && minTimeForSecondPickup.getTime && minTimeForSecondPickup.getTime()}
                                                VALIDATION_MESSAGES={VALIDATION_MESSAGES}
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <Field
                                            name={STRINGS.DROP_OFF_LOCATION_NAME}
                                            component={FormDropDown}
                                            dataItems={branchOptions}
                                            isSearchable={true}
                                            placeholder={STRINGS.DROP_OFF_LOCATION}
                                            config={
                                                {
                                                    value: dropofflocation,
                                                    onChange: (value) => {
                                                        setDropofflocation(value)
                                                        changeField('addNewListingFormStep1', STRINGS.DROP_OFF_LOCATION_NAME, value)

                                                        let time1 = (moment(new Date(value && value.pickUp_dropOff_from)).format('hh:mm a'))
                                                        let time2 = (moment(new Date(value && value.pickUp_dropOff_to)).format('hh:mm a'))
                                                        setDropoff1(time1)
                                                        setDropoff2(time2)
                                                        changeField('addNewListingFormStep1', "dropofftime1", value && value.pickUp_dropOff_from)
                                                        changeField('addNewListingFormStep1', "dropofftime2", value && value.pickUp_dropOff_to)

                                                    }
                                                }
                                            }
                                        />
                                    </div>
                                </div>
                                {!(role == USER_ROLES.MEMBER) && <div className="col-md-4">
                                    <div className="form-group">
                                        <div className="add-control"
                                            onClick={() => {
                                                setAddNewModalVisibility(true)
                                            }}
                                        >
                                            {LABELS.addNew}<i><img src={ADD_ICON} width="40" alt="ECR" className="img-fluid" /></i>
                                        </div>

                                    </div>
                                </div>}
                            </div>

                            <div className="form-row">
                                <div className="col-md-4">
                                    <Field
                                        asterisk={true}
                                        name={STRINGS.DROP_OFF_DATE_NAME}
                                        component={DatePickerInput}
                                        placeholder={STRINGS.DROP_OFF_DATE_PLACEHOLDER}
                                        minDate={minDateForDropOff || new Date().getTime()}
                                        VALIDATION_MESSAGES={VALIDATION_MESSAGES}
                                    />
                                </div>

                                <div className="col-md-8">
                                    <div className="form-row">
                                        <div className="col-5">
                                            <Field
                                                name={STRINGS.DROP_OFF_TIME + '1'}
                                                component={TimePickerInput}
                                                type={'text'}
                                                config={{
                                                    // value: dropoff2,
                                                    readOnly: true,
                                                    disabled: true,
                                                    onClick: () => {
                                                    },
                                                }}
                                                disabled={true}
                                                placeholder={STRINGS.DROP_OFF_TIME_PLACEHOLDER}
                                                maxTime={maxTimeForFirstDropoff && maxTimeForFirstDropoff.getTime && maxTimeForFirstDropoff.getTime()}
                                                VALIDATION_MESSAGES={VALIDATION_MESSAGES}
                                            />
                                        </div>

                                        <div className="col-1 text-center">
                                            <label className="to_txt">to</label>
                                        </div>

                                        <div className="col-6">
                                            <Field
                                                name={STRINGS.DROP_OFF_TIME + '2'}
                                                component={TimePickerInput}
                                                widthStyle={'col-md-12'}
                                                config={{
                                                    readOnly: true,
                                                    disabled: true,
                                                    onClick: () => {
                                                    },
                                                }}
                                                disabled={true}
                                                placeholder={STRINGS.DROP_OFF_TIME_PLACEHOLDER}
                                                type={'text'}
                                                minTime={minTimeForSecondDropoff && minTimeForSecondDropoff.getTime && minTimeForSecondDropoff.getTime()}
                                                VALIDATION_MESSAGES={VALIDATION_MESSAGES}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="form-fields form-row">
                    <div className="col-md-4 col-sm-6">
                        <Field
                            name={STRINGS.ESTIMATED_DISTANCE}
                            component={Input}
                            placeholder={STRINGS.ESTIMATED_DISTANCE_PLACEHOLDER}
                            type={'number'}
                            normalize={(val, val1) => {
                                if (PHONE_REGX.test(val)) {
                                    return val
                                }
                                else if (val === '') {
                                    return val
                                }
                                else {
                                    return val1
                                }
                            }}

                            config={{
                                type: "text",
                            }}
                        />
                    </div>
                </div>
                {children}
                <div className="group-btn mt-3 text-right">
                    <InputSubmit buttonLabel={STRINGS.BUTTON_LABEL_NEXT} buttonStyle={"btn btn-lg btn-primary text-capitalize"}
                        buttonAction={() => {
                            setFormStep1Data(inputtedValues)
                        }}

                    />
                </div>
            </Form>
        </>
    )
}

const mapStateToProps = (state, props) => {

    return {
        role: state.CommonReducer.role,
        initialValues: state.AddNewListingReducer && state.AddNewListingReducer.formStep1Data,
        maxDateForPickUp: state && state.form && state.form.addNewListingFormStep1 && state.form.addNewListingFormStep1.values && state.form.addNewListingFormStep1.values.dropoffdate,
        minDateForDropOff: state && state.form && state.form.addNewListingFormStep1 && state.form.addNewListingFormStep1.values && state.form.addNewListingFormStep1.values.pickupdate,
        maxTimeForFirstPickup: state && state.form && state.form.addNewListingFormStep1 && state.form.addNewListingFormStep1.values && state.form.addNewListingFormStep1.values.pickuptime2,
        minTimeForSecondPickup: state && state.form && state.form.addNewListingFormStep1 && state.form.addNewListingFormStep1.values && state.form.addNewListingFormStep1.values.pickuptime1,

        maxTimeForFirstDropoff: state && state.form && state.form.addNewListingFormStep1 && state.form.addNewListingFormStep1.values && state.form.addNewListingFormStep1.values.dropofftime2,
        minTimeForSecondDropoff: state && state.form && state.form.addNewListingFormStep1 && state.form.addNewListingFormStep1.values && state.form.addNewListingFormStep1.values.dropofftime1,

        vehicleData: state.AddNewListingReducer.vehicleOptions && state.AddNewListingReducer.vehicleOptions,
        branchData: state.AddNewListingReducer.branchList && state.AddNewListingReducer.branchList.items,

        vehicleType: state.AddNewListingReducer && state.AddNewListingReducer.vehicleTypes,
        vehicleTransmissionData: state.AddNewListingReducer && state.AddNewListingReducer.vehicleTransmission,
        vehicleImages: state.AddNewListingReducer && state.AddNewListingReducer.vehiclesImages,
        localSavedImagesArray: state.AddNewListingReducer && state.AddNewListingReducer.localSavedImages,

        fualData: state.AddNewListingReducer.fuelList && state.AddNewListingReducer.fuelList,

        branchManagers: state.AddNewListingReducer && state.AddNewListingReducer.branchManager,

        anyUpdate: state.AddNewListingReducer && state.AddNewListingReducer.update,
        inputtedValues: state.form.addNewListingFormStep1 && state.form.addNewListingFormStep1.values,

        imagesforModal: state.VehicleReducer.vehicleImagesforModal,
        vehicleCategory: state.AddNewListingReducer && state.AddNewListingReducer.vehicleCategory
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getVehicleData: () => {
            dispatch(getVehicleData())
        },
        changeField: (form, field, value) => {
            dispatch(changeField(form, field, value))
        },
        getBranchList: () => {
            dispatch(getBranchList())
        },
        getFuelList: () => {
            dispatch(getFuelList())
        },
        startLoader: () => {
            dispatch(startLoader())
        },
        stopLoader: () => {
            dispatch(stopLoader())
        },
        getVehicleType: (data) => {
            dispatch(getVehicleType(data))
        },
        savedImages: (index, data) => {
            dispatch(localSavedImages(index, data))
        },
        getVehicleTransmission: (data) => {
            dispatch(getVehicleTransmission(data))
        },
        getFuelList: () => {
            dispatch(getFuelList())
        },
        getBranchManager: () => {
            dispatch(getBranchManager())
        },
        createBranch: (data, success, failure) => {
            dispatch(createBranch(data, success, failure))
        },
        setFormStep1Data: (data) => {
            dispatch(setFormStep1Data(data))
        },
        fileUploader: (data, index, length, success, failure) => {
            dispatch(fileUploader(data, index, length, success, failure))
        },
        clearVehiclesImages: () => {
            dispatch(clearVehiclesImages())
        },
        changeOrderImages: (data) => {
            dispatch(changeOrderImages(data))
        },
        getVehcileCategory: () => {
            dispatch(getVehcileCategory())
        },
        addNewVehicleCall: (data, success, failure) => {
            dispatch(addNewVehicle(data, success, failure))
        },
        createVehicleCategory: (data, success, failure) => {
            dispatch(createVehicleCategory(data, success, failure))
        },
        addNewMember: (data, success, failure) => {
            dispatch(addNewMember(data, success, failure))
        },
        getVehicles: () => {
            dispatch(getVehicles(() => { }, () => { }))
        },
        addImages: (data) => {
            dispatch(addImages(data))
        }
    }
}

const reduxFormFunction = reduxForm({
    form: "addNewListingFormStep1",
    onSubmitFail,
    validate: validator,
    enableReinitialize: true
})(SignupForm);

export const FormStep1 = connect(mapStateToProps, mapDispatchToProps)(reduxFormFunction);