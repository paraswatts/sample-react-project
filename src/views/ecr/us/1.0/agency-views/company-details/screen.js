import React, { useState, useEffect } from "react";
import { reduxForm, Field, change as changeField } from "redux-form";
import { connect } from 'react-redux';
import "./style.scss";
import validator from './validator';
import { useHistory } from 'react-router-dom';
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../config/default`);
const { RadioButtons } = require(`../../../../../../components/${PLATFORM}/atoms/radio-button`)
const { CustomFileDrop } = require(`../../../../../../components/${PLATFORM}/cells/custom-filedrop`)
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
} = require(`../../../../../../redux/${PLATFORM}/actions`);
const { Form } = require(`../../../../../../components/${PLATFORM}/atoms/form`);
const { ADD_ICON, NAME_REGX, REFERENCE_REGX, PHONE_REGX, ROUTES, NON_UPLOAD, NO_IMG } = require(`../../../../../../shared/${PLATFORM}/constants`);
const { LABELS } = require(`../../../../../../shared/${PLATFORM}/constants`)
const { STRINGS } = require(`../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`)
const { TextArea } = require(`../../../../../../components/${PLATFORM}/atoms/text-area`)
const { Input } = require(`../../../../../../components/${PLATFORM}/atoms/input`);
const { InputSubmit } = require(`../../../../../../components/${PLATFORM}/atoms/input-submit`);
const { onSubmitFail } = require(`../../../../../../helpers/${PLATFORM}`);
const { Select } = require(`../../../../../../components/${PLATFORM}/atoms/select`)
const { getCountryData } = require(`../../../../../../helpers/${PLATFORM}/prepare-country-related-data`);
const { SnackbarWrapper } = require(`../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`)
let data = getCountryData();

let callingCodes = data.callingCodes;
let countries = data.nations


const SignupForm = ({
    handleSubmit = () => { },
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
    changeField,
    getVehicleData,
    getBranchList,
    getFuelList,
    fileUploader,
    vehicleImages,
    getVehicleType,
    getVehicleTransmission,
    getBranchManager,
    anyUpdate,
    clearVehiclesImages,
    changeOrderImages,
    getVehcileCategory,
    initialValues,
    updateProfile,
    data,
    detailsNotFIlled,
    detailsFilled,
    addImages,
    packageId
}) => {

    const [country, setCountry] = useState('')
    const [otherThanCreditCard, setOtherThanCreditCard] = useState(1)
    const [internatinalDriver, setInternationalDriver] = useState(1)
    const [restricted, setRestricted] = useState(1)
    const [phoneKey, setPhoneKey] = useState('')
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });
    const [fileUploaderModal, setFileUploader] = useState(false)
    const [currentImages, setCurrentImages] = useState([])
    const [currentImageError, setCurrentImageError] = useState(false)
    const history = useHistory()

    useEffect(() => {

        return (() => {
            clearVehiclesImages()
            detailsNotFIlled(false)
        })
    }, [])
    useEffect(() => {
        if (vehicleImages.length) {
            let currentImages = []
            for (let index = 0; index < 1; index++) {
                if (vehicleImages[vehicleImages.length - 1] && vehicleImages[vehicleImages.length - 1]) {
                    currentImages.unshift(vehicleImages[vehicleImages.length - 1])
                }
                else {
                    currentImages.unshift('')
                }
            }
            setCurrentImages(currentImages)
        }

    }, [vehicleImages.length])

    useEffect(() => {
        if (vehicleImages.length) {
            clearVehiclesImages()
        }
        let currentImages = []
        if ((initialValues && initialValues.logo)) {
            currentImages.push(initialValues && initialValues.logo)
            addImages(currentImages)
            setCurrentImages(currentImages)
        }
        else {
            for (let index = 0; index < 1; index++) {
                currentImages.push('')
            }
            setCurrentImages(currentImages)
        }

    }, [])


    useEffect(() => {
        let requiredIndex;
        let phoneIndex;
        for (let index = 0; index < countries.length; index++) {
            let position = countries[index].label.indexOf(initialValues && initialValues.country)
            if (position !== -1) {
                requiredIndex = index
                break;
            }
        }
        changeField("companyDetails", STRINGS.COUNTRY_INPUT, countries[requiredIndex]);
        setCountry(countries[requiredIndex])
        var tempPhoneCode = ''
        if (initialValues && initialValues.phoneKey) {
            tempPhoneCode = initialValues && initialValues.phoneKey.split("(")[1]

            tempPhoneCode = tempPhoneCode && tempPhoneCode.split(")")[0]
        }
        callingCodes.filter((item, index) => {
            var label = item && item.label.split("(")[1]
            label = label.split(')')[0]
            label = label.replace(/\s/g, '')
            if (tempPhoneCode) {
                tempPhoneCode = tempPhoneCode.replace(/\s/g, '')
            }
            // console.log(tempPhoneCode,label)
            if (tempPhoneCode === label) {
                phoneIndex = index
            }
        })
        changeField("companyDetails", "phoneKey", callingCodes[phoneIndex]);
        setPhoneKey(callingCodes[phoneIndex])

        setRestricted((initialValues && initialValues.driverWithRestrictedLicense) ? 0 : 1)
        setOtherThanCreditCard((initialValues && initialValues.onlyCreditCardAllowed) ? 0 : 1)
        setInternationalDriver((initialValues && initialValues.overseasDriversAllowed) ? 0 : 1)

    }, [])




    return (
        <>
            {
                fileUploaderModal && <div id="myModal" className="modal"
                // onClick={() => {
                //     let flag = false
                //     currentImages.find((item, index) => {
                //         if (!!item) {
                //             flag = true
                //         }
                //     })
                //     setFileUploader(false)
                // }}
                >
                    <div className={`modal-content`}
                    // onClick={() => {
                    //     let flag = false
                    //     currentImages.find((item, index) => {
                    //         if (!!item) {
                    //             flag = true
                    //         }
                    //     })

                    //     setFileUploader(false)
                    // }}
                    >

                        <div className="modal_body"
                            onClick={e => {
                                e.stopPropagation()
                            }}
                        >
                            <span className="close"
                                onClick={() => {
                                    let flag = false
                                    currentImages.find((item, index) => {
                                        if (!!item) {
                                            flag = true
                                        }
                                    })

                                    setFileUploader(false)
                                }}
                            >&times;</span>
                            <form action="">
                                <h5 className="mb-3">Add company logo:</h5>
                                <CustomFileDrop
                                    nonUpload={NON_UPLOAD}
                                    vehicleImages={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']}
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

                                        setFileUploader(false)
                                        if (currentImages.length === 0) {

                                        }
                                    }}
                                />

                            </form>
                        </div>
                    </div>
                </div>
            }
            <SnackbarWrapper
                visible={openSnackBar}
                onClose={() => setOpenSnackbar(false)}
                variant={snackbarData.variant}
                message={snackbarData.message}
            />
            <Form onSubmit={handleSubmit(() => {

                const { address, name, email, suburb, city, country, phoneKey, phoneNumber, postcode, paymentConditions, requestedInformationToDriver, confirmationInformationToDriver, shortDescription, website, onlyCreditCardAllowed, driverWithRestrictedLicense,
                    overseasDriversAllowed } = data
                let tempPhoneKey = (phoneKey && phoneKey.label && phoneKey.label).replace(/\s/g, '')

                updateProfile({
                    companyName: name,
                    address,
                    email,
                    suburb,
                    "logo": currentImages[0],
                    city,
                    country: country && country.value,
                    "phoneNumber": {
                        "code": tempPhoneKey,
                        "phone": phoneNumber
                    },
                    postcode,
                    requestedInformationToDriver,
                    confirmationInformationToDriver,
                    website,
                    onlyCreditCardAllowed,
                    paymentConditions,
                    shortDescription,
                    "driverLicenseRequirement": {
                        driverWithRestrictedLicense,
                        overseasDriversAllowed
                    }
                }, (response) => {
                    setSnackBarData({
                        variant: response.status ? 'success' : 'error',
                        message: response.msg || 'error'
                    });
                    setOpenSnackbar(true)
                    if (detailsFilled) {
                        setTimeout(() => { history.replace(`${ROUTES.PAYMENT}?id=${packageId}`) }, 1000)
                    }
                    else {
                        setTimeout(() => { history.replace(`${ROUTES.DASHBOARD}`) }, 1000)

                    }
                }, (response) => {
                    setSnackBarData({
                        variant: response.status ? 'success' : 'error',
                        message: response.msg || 'error'
                    });
                    setOpenSnackbar(true)
                })
            })}>
                <div className={'app-main_outer'}>
                    <div className="container-fluid">
                        {!!detailsFilled && <div className="branch_area">
                            <h3 className="mb-4">Your profile is not complete, please complete before payment.</h3>
                        </div>}
                        <div className="branch_area">
                            <h5 className="mb-4">Company Details</h5>
                        </div>

                        <div className="form-row label_float">
                            <div className="col-md-4">
                                <Field
                                    name={STRINGS.NAME_INPUT}
                                    component={Input}
                                    placeholder={STRINGS.COMPANY_NAME_PLACEHOLDER}
                                    normalize={(val, val1) => {
                                        if (NAME_REGX.test(val)) {
                                            return val
                                        }
                                        else if (val === '') {
                                            return val
                                        }
                                        else {
                                            return val1
                                        }
                                    }}
                                />
                            </div>

                            <div className={`col-md-4 ${!!(initialValues && initialValues.email) && `disable`}`}>
                                <Field
                                    name={STRINGS.EMAIL_INPUT_NAME}
                                    component={Input}
                                    placeholder={STRINGS.EMAIL}
                                    config={{
                                        type: "email",
                                        disabled: !!(initialValues && initialValues.email) ? true : false
                                    }}
                                />
                            </div>
                            <div className="col-md-4">
                                <Field
                                    name={STRINGS.ADDRESS_INPUT_NAME}
                                    component={Input}
                                    placeholder={STRINGS.ADDRESS}
                                    config={{
                                        type: "text",
                                    }}
                                />
                            </div>
                        </div>
                        <div className="form-row label_float">

                            <div className="col-md-4">
                                <Field
                                    name={STRINGS.SUBURB_INPUT_NAME}
                                    component={Input}
                                    placeholder={STRINGS.SUBURB_PLACEHOLDER}
                                    normalize={(val, val1) => {
                                        if (NAME_REGX.test(val)) {
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
                                <span className="text_label">optional</span>

                            </div>
                            <div className="col-md-4">
                                <Field
                                    name={STRINGS.CITY_INPUT}
                                    component={Input}
                                    placeholder={STRINGS.CITY}
                                    type={'number'}
                                    normalize={(val, val1) => {
                                        if (NAME_REGX.test(val)) {
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
                            <div className="col-md-4">
                                <Field
                                    name={STRINGS.POSTCODE_INPUT}
                                    component={Input}
                                    placeholder={STRINGS.POSTCODE_INPUT_PLACEHOLDER}
                                    type={'number'}
                                    normalize={(val, val1) => {
                                        if (REFERENCE_REGX.test(val)) {
                                            return val
                                        }
                                        else if (val === '') {
                                            return val
                                        }
                                        else {
                                            return val1
                                        }
                                    }}
                                />
                                <span className="text_label">optional</span>

                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-4">
                                <Field
                                    name={STRINGS.COUNTRY_INPUT}
                                    component={Select}
                                    placeholder={STRINGS.COUNTRY}
                                    // type={'text'}
                                    options={countries}
                                    isSearchable={true}
                                    onValueChange={(value) => {
                                        changeField("companyDetails", "country", value);
                                        setCountry(value)
                                        let requiredIndex;
                                        for (let index = 0; index < callingCodes.length; index++) {
                                            let position = callingCodes[index].label.indexOf(value && value.value)
                                            if (position !== -1) {
                                                requiredIndex = index
                                                break;
                                            }
                                        }
                                        if (value) {
                                            changeField("companyDetails", STRINGS.PHONE_CODE_KEY, callingCodes[requiredIndex]);
                                            setPhoneKey(callingCodes[requiredIndex])
                                        }
                                    }
                                    }
                                    config={{
                                        value: country
                                    }
                                    }
                                />
                            </div>


                            <div className="col-md-4">
                                <Field
                                    name={STRINGS.PHONE_CODE_KEY}
                                    component={Select}
                                    options={callingCodes}
                                    isSearchable={true}
                                    placeholder={STRINGS.PHONE_NUMBER_PLACEHOLDER}
                                    data={phoneKey}
                                    onValueChange={(value) => { changeField("companyDetails", "phoneKey", value); setPhoneKey(value) }
                                    }
                                />
                            </div>
                            <div className="col-md-4 label_float">
                                <Field
                                    name={STRINGS.PHONE_NUMBER_KEY}
                                    component={Input}
                                    placeholder={STRINGS.PHONE_NO}
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
                            {/* RadioButtons */}

                            <div className="col-md-4 label_float">
                                <Field
                                    name={STRINGS.WEBSITE_INPUT_NAME}
                                    component={Input}
                                    placeholder={STRINGS.WEBSITE_PLACEHOLDER}
                                    type={'text'}
                                    config={{
                                        type: "text",
                                    }}
                                />
                                <span className="text_label">optional</span>
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-md-8">
                                <div className="form-group mb-4 text_area">
                                    <Field
                                        name={STRINGS.SHORT_DESCRIPTION}
                                        component={TextArea}
                                        placeholder={STRINGS.ABOUT_COMPANY_SHORT_DESC_PLACEHOLDER}
                                    />
                                    <span className="text_label">optional</span>

                                </div>


                                <div className="form-group mb-md-5 mb-2 text_area">
                                    <label>Requested Vehicle - Information to Driver</label>
                                    <Field
                                        name={STRINGS.REQUESTED_INFO_DRIVER_INPUT_NAME}
                                        component={TextArea}
                                        type={TextArea}

                                    />
                                    <span className="text_label">optional</span>

                                </div>
                                <div className="form-group mb-md-4 mb-2 text_area">
                                    <label>Confirmed Vehicle - Information to Driver</label>
                                    <Field
                                        name={STRINGS.CONFIRM_INFO_DRIVER_INPUT_NAME}
                                        component={TextArea}
                                        type={TextArea}


                                    />
                                    <span className="text_label">optional</span>

                                </div>
                                <div className="form-group mb-md-4 mb-2">

                                    <div className="row align-items-center no-gutters driver_licence_block">
                                        <label>Would you please allow anything other then a credit card </label>
                                        <div className="driver_licence_radio">
                                            <Field
                                                name={STRINGS.ONLY_ALLOW_CREDIT_CARD}
                                                component={RadioButtons}
                                                selectedValue={otherThanCreditCard}
                                                radioGroupItems={[{ label: "Yes" }, { label: "No" }]}
                                                handleValueChange={(value) => {

                                                    changeField("companyDetails", STRINGS.ONLY_ALLOW_CREDIT_CARD, !!!value)
                                                    setOtherThanCreditCard(value)
                                                    if (!!value) {
                                                        changeField("companyDetails", 'paymentConditions', '')
                                                    }
                                                }}
                                            />
                                        </div>
                                        <span className="text_label">optional</span>
                                    </div>
                                    <Field
                                        name={STRINGS.PAYMENT_COND_INPUT_NAME}
                                        component={TextArea}
                                        type={TextArea}
                                        config={{
                                            disabled: !!otherThanCreditCard,
                                            readOnly: !!otherThanCreditCard,
                                        }}
                                        placeholder={STRINGS.OTHER_THAN_CREDIT_CARD_DESCRIPTION_PLACEHOLDER}

                                    />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group text_area">
                                    <label className="mb-2">Upload your logo</label>

                                    <div className="row align-items-center company_logo cmp_crs_ic">

                                        {
                                            currentImages.map((item, index) => {
                                                return (
                                                    <span className="col-3 col-md-3" key={index + ''}>
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
                                                                        `} width="60px"
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

                                        {!!(vehicleImages.length === 0) && <button className="add_btn company_det_icon col-2"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setFileUploader(true)
                                            }}
                                        >
                                            Add
                                                <i><img src={ADD_ICON} alt="ECR" className="img-fluid" width="25px" /></i>
                                        </button>}
                                    </div>
                                    <span className="text_label text-left">optional</span>
                                    {!!currentImageError && <span className="error_msg text-danger">{currentImageError}</span>}

                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 driver_licence_block">
                                <h5>Driver Licence Requirements:</h5>
                                <div className="row align-items-center no-gutters ">
                                    <label>Driver with Restricted Licence allowed </label><br />
                                    <div className="driver_licence_radio">
                                        <Field
                                            name={STRINGS.RESTRICTED_LICENSE_ALLOWED}
                                            component={RadioButtons}
                                            selectedValue={restricted}
                                            radioGroupItems={[{ label: "Yes" }, { label: "No" }]}
                                            handleValueChange={(value) => {
                                                changeField("companyDetails", STRINGS.RESTRICTED_LICENSE_ALLOWED, !!!value)
                                                setRestricted(value)
                                            }}

                                        />
                                    </div>
                                    {/* <ul className="row align-items-center ml-3">
                                    <li className="radio mr-2">
                                        <input id="radio-3" name="radio" type="radio" />
                                        <label htmlFor="radio-3" className="radio-label">
                                            Yes
                                        </label>
                                    </li>
                                    <li className="radio mr-2">
                                        <input id="radio-4" name="radio" type="radio" />
                                        <label htmlFor="radio-4" className="radio-label">
                                            No
                                    </label>
                                    </li>
                                </ul> */}
                                </div>
                                <div className="row align-items-center no-gutters mb-2 mb-md-4">
                                    <label>Drivers from overseas with officialy translated drivers licence accomplished by the original drivers licence allowed </label>
                                    <div className="driver_licence_radio">
                                        <Field
                                            name={STRINGS.OVERSEAS_DRIVER_ALLOWED}
                                            component={RadioButtons}
                                            selectedValue={internatinalDriver}
                                            radioGroupItems={[{ label: "Yes" }, { label: "No" }]}
                                            handleValueChange={(value) => {
                                                changeField("companyDetails", STRINGS.OVERSEAS_DRIVER_ALLOWED, !!!value)
                                                setInternationalDriver(value)
                                            }}
                                        // type={RadioButtons}

                                        />
                                    </div>
                                    {/* <ul className="row align-items-center ml-2">
                                        <li className="radio mr-1">
                                            <input id="radio-5" name="radio" type="radio" />
                                            <label htmlFor="radio-5" className="radio-label">
                                                Yes
                                        </label>
                                        </li>
                                        <li className="radio mr-1">
                                            <input id="radio-6" name="radio" type="radio" />
                                            <label htmlFor="radio-6" className="radio-label">
                                                No
                                        </label>
                                        </li>
                                    </ul> */}

                                </div>
                                <div className="col-md-12 mt-3 mt-md-4 p-2">
                                    <p><strong>Here is what will be displayed to drivers:</strong>
                                        <em> Drivers are required to hold a full drivers licence for at least 1 year. Overseas drivers are permitted and a valid drivers licence in English is required. For a Non English licence; an official translation will be needed to be presented with the original licence.</em></p>
                                </div>
                                <InputSubmit buttonLabel={"Save"} buttonStyle={"btn btn-lg btn-primary text-capitalize my-4"}
                                />
                            </div>
                        </div>
                    </div>
                </div>


            </Form>
        </>
    )
}

const mapStateToProps = (state, props) => {
    let agencyData = state.CommonReducer.userData && state.CommonReducer.userData.userAgency
    return {
        initialValues: {
            ...agencyData, phoneNumber: (state.CommonReducer.userData && state.CommonReducer.userData.userAgency && state.CommonReducer.userData.userAgency.phoneNumber && state.CommonReducer.userData.userAgency.phoneNumber.phone), phoneKey: (state.CommonReducer.userData && state.CommonReducer.userData.userAgency && state.CommonReducer.userData.userAgency.phoneNumber && state.CommonReducer.userData.userAgency.phoneNumber.code), email: state.CommonReducer.userData && state.CommonReducer.userData.email, driverWithRestrictedLicense: (agencyData && agencyData.driverLicenseRequirement && agencyData.driverLicenseRequirement.driverWithRestrictedLicense),
            overseasDriversAllowed: (agencyData && agencyData.driverLicenseRequirement && agencyData.driverLicenseRequirement.overseasDriversAllowed)
        },

        vehicleImages: state.AddNewListingReducer && state.AddNewListingReducer.vehiclesImages,
        localSavedImagesArray: state.AddNewListingReducer && state.AddNewListingReducer.localSavedImages,
        anyUpdate: state.AddNewListingReducer && state.AddNewListingReducer.update,

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
        }
    }
}

const reduxFormFunction = reduxForm({
    form: "companyDetails",
    onSubmitFail,
    validate: validator,
    enableReinitialize: true
})(SignupForm);

export const Screen = connect(mapStateToProps, mapDispatchToProps)(reduxFormFunction);