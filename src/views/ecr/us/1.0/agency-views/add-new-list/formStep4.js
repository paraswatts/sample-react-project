import React, { useState, useEffect } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from 'react-redux';
import moment from 'moment';
import "./style.scss";
import validator from "./formValidatorStep1";
import {
    Route,
    Switch,
    Redirect,
    useHistory
} from 'react-router-dom';
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../config/default`);
const {
    createNewListing,
    addNewTerms,
    saveStepNo,
    addExtraItems,
    newListingId
} = require(`../../../../../../redux/${PLATFORM}/actions`);
const { Checkbox } = require(`../../../../../../components/${PLATFORM}/atoms/checkbox`);
const {
    AGENCY_DRAWER_ITEMS_ACCOUNT_SETTING,
    HAMBURGER_ICON,
    HEADER_LOGO,
    CLOSE_ICON,
    ROUTES,
    HEADER_PROFILE_ITEMS,
    SEATS_ICON,
    CHILD_SEAT,
    HEAVY_BAGS,
    MEDIUM_BAGS,
    DDORS_ICON,
    AC_ICON,
    TRANMISSION_ICON,
    ARROW_STRAIGHT_ICON
} = require(`../../../../../../shared/${PLATFORM}/constants`);
const { DatePickerInput } = require(`../../../../../../components/${PLATFORM}/atoms/date-picker`)
const { Form } = require(`../../../../../../components/${PLATFORM}/atoms/form`);
const { STRINGS } = require(`../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`)
const { Input } = require(`../../../../../../components/${PLATFORM}/atoms/input`);
const { InputSubmit } = require(`../../../../../../components/${PLATFORM}/atoms/input-submit`);
const { onSubmitFail } = require(`../../../../../../helpers/${PLATFORM}`);
const { registerUser } = require(`../../../../../../redux/${PLATFORM}/actions/auth`)
const { FREQUECY } = require(`../../../../../../shared/${PLATFORM}/constants`);
const { Select } = require(`../../../../../../components/${PLATFORM}/atoms/select`)
const { FormDropDown } = require(`../../../../../../components/${PLATFORM}/atoms/formDropDown/`)
const { getCountryData } = require(`../../../../../../helpers/${PLATFORM}/prepare-country-related-data`);
const { TextArea } = require(`../../../../../../components/${PLATFORM}/atoms/text-area`)
const { Editor } = require(`../../../../../../components/${PLATFORM}/cells/editor-text`)
const { MessagePopUp } = require(`../../../../../../components/${PLATFORM}/atoms/message-pop-up`)
let data = getCountryData();
const { SnackbarWrapper } = require(`../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`)

let callingCodes = data.callingCodes;
let countries = data.nations;


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
    addExtraItems,
    children,
    formStep1Data,
    formStep2Data,
    formStep3Data,
    createNewListing,
    createNewTerms,
    onChange,
    newListingId
}) => {

    let history = useHistory();


    const [checkboxValidate, setCheckboxValidate] = useState(false)
    const [messagePopVisibility, setMessagePopVisibility] = useState(false)
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [multipleListing, setMultipleListing] = useState(false)
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });
    useEffect(() => {
        let { templateDescription } = formStep3Data
        templateDescription = templateDescription && (templateDescription).replace && (templateDescription).replace(/&lt;/g, "<")
        templateDescription = templateDescription && (templateDescription).replace && (templateDescription).replace(/&gt;/g, ">")
        templateDescription = templateDescription && (templateDescription).replace && (templateDescription).replace(/&nbsp;/gi, " ")
        let doc = document.getElementById('commentsToShowDiv');
        doc.innerHTML = (templateDescription) || '<span>Not Available</span>'
        return (() => {
        })
    }, [])



    return (
        <>
            <SnackbarWrapper
                visible={openSnackBar}
                onClose={() => setOpenSnackbar(false)}
                variant={snackbarData.variant}
                message={snackbarData.message}
            />
            {messagePopVisibility && <MessagePopUp
                rightButtonLabel={'OK'}
                messageDescription={"Please accept the Terms and Conditions."}
                messageTitle={''}
                rightButtonAction={() => {
                    setMessagePopVisibility(false)
                }}
            />}
            <div className="summary_detail pb-3">
                <div className="page-title">
                    <label className="mb-0">7. Summary: </label>
                    <p>Please review your listing</p>
                </div>

                <div class="vehicle_lists">
                    <div class="rounded border">
                        <div class="row align-items-start">
                            <div class="col-md-4 col-lg-3">
                                <figure>
                                    {/* { formStep1Data && formStep1Data.vehicles && formStep1Data.vehicles.url.} */}
                                    <img src={formStep1Data && formStep1Data.vehicles && formStep1Data.vehicles.url && formStep1Data.vehicles.url[0]} alt="Hatchback car" class="img-fluid" /></figure>
                            </div>
                            <div class="col-md-8 col-lg-9">
                                <div class="vehicle_info">
                                    <h5>{formStep1Data && formStep1Data.vehicles && formStep1Data.vehicles.label}</h5>
                                    <ul class="vehicles_tools">
                                        <li><i><img src={SEATS_ICON} alt="ECR" className="img-fluid" width="25px" /></i>{formStep1Data && formStep1Data.vehicles && formStep1Data.vehicles.adultSeats} Adult seats</li>
                                        <li><i><img src={CHILD_SEAT} alt="ECR" className="img-fluid" width="25px" /></i>{formStep1Data && formStep1Data.vehicles && formStep1Data.vehicles.childSeats} Child seats</li>

                                        <li><i><img src={HEAVY_BAGS} alt="ECR" className="img-fluid" width="25px" /></i>{(formStep1Data && formStep1Data.vehicles && formStep1Data.vehicles.largeLuggageSpace)} Heavy bags</li>

                                        <li><i><img src={MEDIUM_BAGS} alt="ECR" className="img-fluid" width="25px" /></i>{formStep1Data && formStep1Data.vehicles && formStep1Data.vehicles.smallLuggageSpace} Small bags</li>
                                        <li><i><img src={DDORS_ICON} alt="ECR" className="img-fluid" width="25px" /></i>{formStep1Data && formStep1Data.vehicles && formStep1Data.vehicles.numberOfDoor} doors</li>
                                        <li><i><img src={AC_ICON} alt="ECR" className="img-fluid" width="25px" /></i>
                                            {`${(formStep1Data && formStep1Data.vehicles && formStep1Data.vehicles.airConditionType) ? "Air Condition" : 'No Air Cond'}`}
                                        </li>
                                        <li><i><img src={TRANMISSION_ICON} alt="ECR" className="img-fluid" width="25px" /></i> {formStep1Data && formStep1Data.vehicles && formStep1Data.vehicles.transmissionData && formStep1Data.vehicles.transmissionData.name} </li>
                                    </ul>

                                    <div className="location_vac text-uppercase">
                                        <h6>{formStep1Data && formStep1Data.PickUpLocation && formStep1Data.PickUpLocation.city}</h6>
                                        <i><img src={ARROW_STRAIGHT_ICON} alt="ECR" className="img-fluid" width="25px" /></i>
                                        <h6>{formStep1Data && formStep1Data.DropOffLocation && formStep1Data.DropOffLocation.city}</h6>
                                    </div>

                                    <div className="short_des">
                                        <h6>Short Description:</h6>
                                        <p>{!!(formStep1Data && formStep1Data.vehicles && formStep1Data.vehicles.description) ? formStep1Data && formStep1Data.vehicles && formStep1Data.vehicles.description : "Not Available"}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="table_block">
                    <label>Trip Details:</label>
                    <div className="row table_div">
                        <div className="col-lg-6 col-md-12 border-right">

                            <div className="row">
                                <div className="col text-left">Free days available:</div>
                                <div className="col text-right">{formStep2Data && formStep2Data.freeDaysAvailable || "Not Available"}</div>
                            </div>
                            <div className="row">
                                <div className="col text-left">Extra paid days available:</div>
                                <div className="col text-right">{formStep2Data && formStep2Data.extraPaidDays || 'Not Available'}</div>
                            </div>
                            <div className="row">
                                <div className="col text-left">Pick-up from:</div>
                                <div className="col text-right">{moment(new Date(formStep1Data && formStep1Data.pickupdate)).format('DD MMMM YYYY')}</div>
                            </div>
                            <div className="row">
                                <div className="col text-left">Pick-up time:</div>
                                <div className="col text-right">{moment(new Date(formStep1Data && formStep1Data.pickuptime1)).format('hh:mm a')} to {moment(new Date(formStep1Data && formStep1Data.pickuptime2)).format('hh:mm a')}</div>
                            </div>
                            <div className="row">
                                <div className="col text-left">Pick-up Location</div>
                                <div className="col text-right">{formStep1Data && formStep1Data.PickUpLocation && formStep1Data.PickUpLocation.value}</div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12">
                            <div class="row">
                                <div class="col text-left">Kilometres allowance </div>
                                <div class="col text-right">{formStep2Data && formStep2Data.freeDaysAvailable ? ((formStep2Data && formStep2Data.kilometresAllowed) ? (formStep2Data && formStep2Data.kilometresAllowed) : 'Unlimited') : 'Not Available'}</div>
                            </div>
                            <div class="row">
                                <div class="col text-left">Extra Paid Day Fee</div>
                                <div class="col text-right">{(formStep2Data && formStep2Data.ratePerDay) ? `$${formStep2Data && formStep2Data.ratePerDay}/day` : 'Not Available'}</div>
                            </div>
                            <div class="row">
                                <div class="col text-left">Drop-off to: </div>
                                <div class="col text-right">{moment(new Date(formStep1Data && formStep1Data.dropoffdate)).format('DD MMMM YYYY')}</div>
                            </div>
                            <div class="row">
                                <div class="col text-left">Drop-off time</div>
                                <div class="col text-right">{moment(new Date(formStep1Data && formStep1Data.dropofftime1)).format('hh:mm a')} to {moment(new Date(formStep1Data && formStep1Data.dropofftime2)).format('hh:mm a')}</div>
                            </div>
                            <div class="row">
                                <div class="col text-left">Drop-off Location</div>
                                <div class="col text-right">{formStep1Data && formStep1Data.DropOffLocation && formStep1Data.DropOffLocation.value}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="table_block">
                    <label>What is on offer to the driver:</label>
                    <div className="table_div">
                        <div className="row">
                            <div className="col text-left">Insurance:</div>
                            <div className="col text-right">{formStep2Data && formStep2Data.insuranceSelect && formStep2Data.insuranceSelect.value || 'Not Available'}</div>
                        </div>
                        <div className="row">
                            <div className="col text-left">Ferry Cost:</div>
                            <div className="col text-right">{formStep2Data && formStep2Data.ferryCostSelect && formStep2Data.ferryCostSelect.value || "Not Available"}</div>
                        </div>
                        <div className="row">
                            <div className="col text-left">Fuel: </div>
                            <div className="col text-right">{formStep2Data && formStep2Data.fuelSelect && formStep2Data.fuelSelect.value || "Not Available"}</div>
                        </div>
                        <div className="row">
                            <div className="col text-left">Expenses:</div>
                            <div className="col text-right">{formStep2Data && formStep2Data.details || "Not Available"}</div>
                        </div>
                        <div className="row">
                            <div className="col pr-0">Comments:</div>
                            <div className="col col-md-10 text-md-right">
                                <p>{formStep2Data && formStep2Data.comments || 'Not Available'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="table_block">
                    <label>Extra Items:</label>
                    <div className="table_div">
                        {formStep2Data && formStep2Data.members && formStep2Data.members.map((item) => {
                            if (item && item.name && item.price && item.frequency) {
                                return (<div className="row">
                                    <div className="col text-left">{`${item.name}`}</div>
                                    <div className="col text-right">{`$${item.price} ${item.frequency.label ? item.frequency.label : FREQUECY[item.frequency - 1].label}`}</div>
                                </div>)
                            }
                            else {
                                return (<div className="row">
                                    <div className="col col-12">{`No extra items.`}</div>
                                </div>
                                )
                            }
                        })}
                    </div>
                </div>

                <div className="row terms_condition">
                    <div className="col-md-12">
                        <label>Terms and Conditions:</label>
                        <div id='commentsToShowDiv'></div>
                    </div>
                </div>
                {((formStep1Data && formStep1Data.quantity) > 1) && <div className="row text-center bk_confirm">
                    <div className="agree my-4 m-auto">
                        <div class="form-checkbox">
                            <input type="checkbox" name='' className="form-check-input"
                                checked={multipleListing}
                                onClick={() => {
                                    setMultipleListing(!!!multipleListing)
                                }}
                            />
                            <span className="checkmark"></span>
                        </div>
                        <span>Do you need to show multiple listings?</span>
                    </div>
                </div>}
                <div className="row">
                    <div className="col-md-12 text-right">
                        <button className="btn btn-md btn-primary"
                            onClick={onChange}>
                            Change
                        </button>
                    </div>
                </div>

                <div className="row text-center bk_confirm">

                    <div className="col-md-12 my-4">
                        <label>You will be charged <strong >{formStep1Data && formStep1Data.quantity} Token</strong> for this listing</label>
                        <p className="mb-2">The charge will only apply once the booking has been confirmed by you and the driver</p>
                        <div className="agree my-4">
                            <div class="form-checkbox">
                                <input type="checkbox" name='' className="form-check-input"
                                    checked={checkboxValidate}
                                    onClick={() => {
                                        setCheckboxValidate(!checkboxValidate)
                                    }}
                                />
                                <span className="checkmark"></span>
                            </div>
                            <span className="term_txt">I HAVE READ AND AGREE WITH THE <a onClick={() => {
                                window.open(ROUTES.TERMS, '_blank');
                            }}>TERMS AND CONDITIONS</a></span>
                        </div>
                        <button className="btn btn-lg btn-secondary"
                            onClick={() => {
                                let extraItemData = {};

                                if (formStep2Data && formStep2Data.yourSavedLists && formStep2Data.yourSavedLists._id) {
                                    extraItemData = {
                                        id: formStep2Data.yourSavedLists._id,
                                        name: formStep2Data.new_item_description,
                                        items: [
                                            ...formStep2Data.members.map((item) => {
                                                return {
                                                    frequency: item && item.frequency && item.frequency.value,
                                                    name: item.name,
                                                    price: item.price
                                                }
                                            })
                                        ]
                                    }
                                }
                                else {
                                    extraItemData = {
                                        name: formStep2Data && formStep2Data.new_item_description,
                                        items: [
                                            ...formStep2Data.members.map((item) => {
                                                return {
                                                    frequency: item && item.frequency && item.frequency.value,
                                                    name: item.name,
                                                    price: item.price
                                                }
                                            })
                                        ]
                                    }
                                }

                                if (!checkboxValidate) {
                                    setMessagePopVisibility(true)
                                }
                                else {

                                    const { vehicles, quantity, DropOffLocation, PickUpLocation, dropoffdate, pickupdate, pickuptime1, pickuptime2, dropofftime1, dropofftime2, driverMinAge, reference, estimatedDistance } = formStep1Data;
                                    const { insuranceSelect, expenses, details, comments, freeDaysAvailable, extraPaidDays, ratePerDay, kilometresAllowed, fuelSelect, ferryCostSelect, yourSavedLists } = formStep2Data;
                                    const { name, templateDescription, templateName, listId } = formStep3Data;

                                    let termsData = {}


                                    if (!!name) {
                                        if (name.id)
                                            termsData = {
                                                id: name.id,
                                                name: templateName,
                                                description: templateDescription
                                            }
                                    }
                                    else {
                                        termsData = {
                                            name: templateName,
                                            description: templateDescription
                                        }
                                    }
                                    let tempPickupdate = moment(new Date(pickupdate)).format().split('T')[0]
                                    let tempDropoffdate = moment(new Date(dropoffdate)).format().split('T')[0]

                                    createNewListing({
                                        id: listId,
                                        vehicleId: vehicles && vehicles.id,
                                        multipleListing,
                                        vehicleQuantity: quantity,
                                        driverMinAge,
                                        pickupBranchId: PickUpLocation && PickUpLocation.id,
                                        dropoffBranchId: DropOffLocation && DropOffLocation.id,
                                        pickupDate: tempPickupdate,
                                        pickupTime: {
                                            from: new Date(pickuptime1).getTime(),
                                            to: new Date(pickuptime2).getTime()
                                        },
                                        dropoffDate: tempDropoffdate,
                                        dropoffTime: {
                                            from: new Date(dropofftime1).getTime(),
                                            to: new Date(dropofftime2).getTime()
                                        },
                                        insurance: insuranceSelect && insuranceSelect.id,
                                        ferryCost: ferryCostSelect && ferryCostSelect.id,
                                        fuelOffer: fuelSelect && fuelSelect.id,
                                        expenses: details,
                                        freeDays: freeDaysAvailable,
                                        kmAllow: kilometresAllowed,
                                        extraPaidDays: extraPaidDays,
                                        ratePerDay: ratePerDay,
                                        comment: comments,
                                        extraItemObj: extraItemData,
                                        termAndConditionObj: termsData,
                                        reference,
                                        estimatedDistance
                                    }, (response) => {

                                        let listingId;

                                        if (!!(history && history.location && history.location.pathname === ROUTES.EDIT_LISTING)) {
                                            setSnackBarData({
                                                variant: response.status ? 'success' : 'error',
                                                message: response.msg
                                            });
                                            setOpenSnackbar(true)
                                        }

                                        if (multipleListing) {
                                            listingId = response.data[0]._id
                                            newListingId(listingId)
                                        }
                                        else {
                                            listingId = response.data._id
                                            newListingId(listingId)
                                        }
                                        !(history && history.location && history.location.pathname === ROUTES.EDIT_LISTING) ? setTimeout(() => {
                                            history.replace(ROUTES.INVITE_DRIVER)
                                        }, 1000) : setTimeout(() => {
                                            history.replace(ROUTES.DASHBOARD)
                                        }, 1000)
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
                            }}
                        >
                            {history && history.location && history.location.pathname === ROUTES.EDIT_LISTING ? "UPDATE YOUR LSITING" : "SUBMIT YOUR LISTING"}
                        </button>
                    </div>
                </div>

            </div>
        </>
    )

}

const mapStateToProps = (state, props) => {

    return {
        initialValues: props.credentials,
        formStep1Data: state.AddNewListingReducer && state.AddNewListingReducer.formStep1Data,
        formStep2Data: state.AddNewListingReducer && state.AddNewListingReducer.formStep2Data,
        formStep3Data: state.AddNewListingReducer && state.AddNewListingReducer.formStep3Data
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        createNewListing: (data, success, failure) => {
            dispatch(createNewListing(data, success, failure))
        },
        createNewTerms: (data, success, failure) => {
            dispatch(addNewTerms(data, success, failure))
        },
        saveStepNo: (no) => {
            dispatch(saveStepNo(no))
        },
        addExtraItems: (data, success, failure) => {
            dispatch(addExtraItems(data, success, failure))
        },
        newListingId: (id) => {
            dispatch(newListingId(id))
        },
    }
}

const reduxFormFunction = reduxForm({
    form: "signup",
    fields: ['name', 'surname', 'dob', 'city', 'country', 'email', 'password', 're-enterpassword'],
    onSubmitFail,
    validate: validator,
    enableReinitialize: true
})(SignupForm);

export const FormStep4 = connect(mapStateToProps, mapDispatchToProps)(reduxFormFunction);   