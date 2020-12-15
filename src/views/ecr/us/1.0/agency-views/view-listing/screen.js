import React, { useState, useEffect } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from 'react-redux';
import moment from 'moment';
import {
    useHistory
} from 'react-router-dom';
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../config/default`);
const {
    createNewListing,
    addNewTerms,
    saveStepNo,
    addExtraItems,
    setFormStep2Data,
    setFormStep1Data,
    setFormStep3Data
} = require(`../../../../../../redux/${PLATFORM}/actions`);
const { Checkbox } = require(`../../../../../../components/${PLATFORM}/atoms/checkbox`);
const {
    ROUTES,
    SEATS_ICON,
    CHILD_SEAT,
    HEAVY_BAGS,
    MEDIUM_BAGS,
    DDORS_ICON,
    AC_ICON,
    TRANMISSION_ICON,
    ARROW_STRAIGHT_ICON,
} = require(`../../../../../../shared/${PLATFORM}/constants`);
const { onSubmitFail } = require(`../../../../../../helpers/${PLATFORM}`);
const { FREQUECY } = require(`../../../../../../shared/${PLATFORM}/constants`);
const { getCountryData } = require(`../../../../../../helpers/${PLATFORM}/prepare-country-related-data`);
const { MessagePopUp } = require(`../../../../../../components/${PLATFORM}/atoms/message-pop-up`)
let data = getCountryData();
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
    addExtraItems,
    children,
    formStep1Data,
    formStep2Data,
    formStep3Data,
    createNewListing,
    createNewTerms,
    onChange,
    setFormStep2Data,
    setFormStep1Data,
    setFormStep3Data,
    saveStepNo
}) => {

    let history = useHistory();
    const parameters = history.location.search
    const equalToExtract = parameters.indexOf("=")
    const id = parameters.slice(equalToExtract + 1)

    const [checkboxValidate, setCheckboxValidate] = useState(false)
    const [messagePopVisibility, setMessagePopVisibility] = useState(false)
    const [openSnackBar, setOpenSnackbar] = useState(false);
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
        saveStepNo(1)
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

            <div className="vehicle_lists app-main_outer">
                <div className="container">
                    <div className="rounded border">
                        <div className="row align-items-start">
                            <div className="col-md-4 col-lg-3">
                                <figure>
                                    {/* { formStep1Data && formStep1Data.vehicles && formStep1Data.vehicles.url.} */}
                                    <img src={formStep1Data && formStep1Data.vehicles && formStep1Data.vehicles.url && formStep1Data.vehicles.url[0]} alt="Hatchback car" className="img-fluid" /></figure>
                            </div>
                            <div className="col-md-8 col-lg-9">
                                <div className="vehicle_info">
                                    <h5>{formStep1Data && formStep1Data.vehicles && formStep1Data.vehicles.label}</h5>
                                    <ul className="vehicles_tools">
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


                    <div className="table_block">
                        <label>Trip Details:</label>
                        <div className="row table_div">
                            <div className="col-md-6 border-right">

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
                                    <div className="col text-right">{formStep1Data.PickUpLocation && formStep1Data.PickUpLocation.value}</div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col text-left">Kilometres allowance </div>
                                    <div className="col text-right">{formStep2Data && formStep2Data.freeDaysAvailable ? ((formStep2Data && formStep2Data.kilometresAllowed) ? (formStep2Data && formStep2Data.kilometresAllowed) : 'Unlimited') : 'Not Available'}</div>
                                </div>
                                <div className="row">
                                    <div className="col text-left">Extra Paid Day Fee</div>
                                    <div className="col text-right">{(formStep2Data && formStep2Data.ratePerDay) ? `$${formStep2Data && formStep2Data.ratePerDay}/day` : 'Not Available'}</div>
                                </div>
                                <div className="row">
                                    <div className="col text-left">Drop-off to: </div>
                                    <div className="col text-right">{moment(new Date(formStep1Data && formStep1Data.dropoffdate)).format('DD MMMM YYYY')}</div>
                                </div>
                                <div className="row">
                                    <div className="col text-left">Drop-off time</div>
                                    <div className="col text-right">{moment(new Date(formStep1Data && formStep1Data.dropofftime1)).format('hh:mm a')} to {moment(new Date(formStep1Data && formStep1Data.dropofftime2)).format('hh:mm a')}</div>
                                </div>
                                <div className="row">
                                    <div className="col text-left">Drop-off Location</div>
                                    <div className="col text-right">{formStep1Data.DropOffLocation && formStep1Data.DropOffLocation.value}</div>
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
                                <div className="col col-md-10 text-left text-md-right">
                                    <p>{formStep2Data && formStep2Data.comments || 'Not Available'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="table_block">
                        <label>Extra Items:</label>
                        <div className="table_div">
                            {formStep2Data && formStep2Data.members && formStep2Data.members.map((item, index) => {
                                if (item && item.name && item.price && item.frequency) {
                                    return (<div className="row" key={index + ''}>
                                        <div className="col text-left">{`${item.name}`}</div>
                                        <div className="col text-right">{`$${item.price} ${item.frequency.label ? item.frequency.label : FREQUECY[item.frequency - 1].label}`}</div>
                                    </div>)
                                }
                                else {
                                    return (<div className="row" key={index + ''}>
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

                    <div className="row">
                        <div className="col-md-12 text-right">
                            <button className="btn btn-md btn-primary"
                                onClick={() => {
                                    history.push(`${ROUTES.EDIT_LISTING}?id=${id}`)
                                }}>
                                Change
                        </button>
                        </div>
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
        setFormStep1Data: (data) => {
            dispatch(setFormStep1Data(data))
        },
        setFormStep2Data: (data) => {
            dispatch(setFormStep2Data(data))
        },
        setFormStep3Data: (data) => {
            dispatch(setFormStep3Data(data))
        },
    }
}

const reduxFormFunction = reduxForm({
    form: "signup",
    // fields: ['name', 'surname', 'dob', 'city', 'country', 'email', 'password', 're-enterpassword'],
    onSubmitFail,
    enableReinitialize: true
})(SignupForm);

export const ViewListing = connect(mapStateToProps, mapDispatchToProps)(reduxFormFunction);   