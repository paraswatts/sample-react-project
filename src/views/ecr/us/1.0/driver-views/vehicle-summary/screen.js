import React, { useState, useEffect } from "react";
import './style.scss';
import moment from 'moment'
import { useHistory } from "react-router-dom";
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../config/default`);
const { LABELS, BOOKING_STATUS } = require(`../../../../../../shared/${PLATFORM}/constants`)
const { ROUTES } = require(`../../../../../../shared/${PLATFORM}/constants`);
const { SnackbarWrapper } = require(`../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`);
const { DecisionPopup } = require(`../../../../../../components/${PLATFORM}/atoms/decision-popup`);
const { STRINGS } = require(`../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`);

export const Screen = ({
    vehicle,
    paidDays,
    makeRequest,
    setVehicleDate,
    userToken,
    loginType,
    getDriverProfile, getDriverProfileData, travelDates
}) => {
    let history = useHistory();
    const [terms, setTerms] = useState(false)
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [completeProfileReminder, setCompleteProfileRemainder] = useState(false)
    useEffect(() => {
        getDriverProfile(() => { }, () => { })
    }, [])
    const submitRequest = () => {
        if (userToken !== null && (!getDriverProfileData.loginType || getDriverProfileData.loginType === 2 ||
            getDriverProfileData.loginType === 3)) {
            if (!getDriverProfileData.name || getDriverProfileData.name === "" ||
                !getDriverProfileData.surname ||
                getDriverProfileData.surname === "" || !getDriverProfileData.email ||
                getDriverProfileData.email === "" || !getDriverProfileData.phoneNumber ||
                getDriverProfileData.phoneNumber.code === "" || !getDriverProfileData.city ||
                getDriverProfileData.city === "" || !getDriverProfileData.country ||
                getDriverProfileData.country === "" || !getDriverProfileData.dob ||
                getDriverProfileData.dob === "" || !getDriverProfileData.phoneNumber ||
                getDriverProfileData.phoneNumber.phone === "") {
                setCompleteProfileRemainder(true)
            } else {
                makeLisingRequest()
            }

        } else {
            makeLisingRequest()
        }
    }
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });

    const makeLisingRequest = () => {
        let postData = {
            "startDate": setVehicleDate && setVehicleDate.pickupdate,
            "endDate": setVehicleDate && setVehicleDate.returnDate,
            // "selectedFreeDays": vehicle && vehicle.freeDays ? vehicle.freeDays : 0,
            "bookingPrice": 0,
            // "commentForAgency": "string",
            // "rateForAgency": 1,
            "status": BOOKING_STATUS.PENDING
        }
        makeRequest({ id: vehicle._id, data: postData }, (response) => {
            history.replace(ROUTES.SUCCESSFUL_BOOKING)
        }, (error) => {
            setSnackBarData({
                variant: error.status ? 'success' : 'error',
                message: error.msg || 'error'
            });
            setOpenSnackbar(true)
        })
    }

    return (
        <div className="main_section vehicle_sumary vehical_head">
            <div className="container">
            <h4 className="mb-3 mb-md-5">One last thing, please review your request details</h4>
            <h5 className="mb-3 mb-md-4">Summary</h5>
        
                <SnackbarWrapper
                    visible={openSnackBar}
                    onClose={() => setOpenSnackbar(false)}
                    variant={snackbarData.variant}
                    message={snackbarData.message}
                />
                <DecisionPopup
                    modalVisibility={completeProfileReminder}
                    dialogTitle={STRINGS.COMPLETE_PROFILE_TITLE}
                    dialogContent={STRINGS.COMPLETE_PROFILE_CONTENT}
                    confirmButtonTitle={STRINGS.CONFIRM}
                    rejectButtonTitle={STRINGS.CANCEL}
                    toggleDialogModal={() => setCompleteProfileRemainder(!completeProfileReminder)}
                    onConfirmation={() => {
                        history.replace(ROUTES.DRIVER_PROFILE)
                    }}
                    onRejection={() => setCompleteProfileRemainder(false)}
                />
                <div class="vehicle_lists">
                    <div class="rounded border">
                        <div class="row align-items-start">
                            <div class="col-md-4">
                                <figure><img src={vehicle && vehicle.vehicleData && vehicle.vehicleData.url[0]} alt="Recreational" class="img-fluid" /></figure>
                            </div>
                            <div class="col-md-8">
                                <div class="vehicle_info">
                                    <h5>{vehicle && vehicle.vehicleData && vehicle.vehicleData.name}</h5>
                                    <ul class="vehicles_tools">
                                        <li><i><img src={require(`../../../../../../assets/icons/Seats.svg`)} alt="ECR" className="img-fluid" width="25px" /></i>
                                            {`${vehicle && vehicle.vehicleData && vehicle.vehicleData.adultSeats} adult`} 
                                       {vehicle && vehicle.vehicleData && vehicle.vehicleData.childSeats !== 0 ? `, ${vehicle && vehicle.vehicleData && vehicle.vehicleData.childSeats} child`: ''}
                                        </li>
                                        <li><i><img src={require(`../../../../../../assets/agency/icons/luggage_icon.svg`)} alt="ECR" className="img-fluid" width="25px" /></i>
                                        {` ${vehicle && vehicle.vehicleData && vehicle.vehicleData.largeLuggageSpace} large, ${vehicle && vehicle.vehicleData && vehicle.vehicleData.smallLuggageSpace} small`}
                                                
                                        </li>
                                        <li><i><img src={require(`../../../../../../assets/agency/icons/doors_icon.svg`)} alt="ECR" className="img-fluid" width="25px" /></i>
                                            {vehicle && vehicle.vehicleData && vehicle.vehicleData.numberOfDoor} doors
                                        </li>
                                        <li><i><img src={require(`../../../../../../assets/agency/icons/ac_icon.svg`)} alt="ECR" className="img-fluid" width="25px" /></i>{vehicle && vehicle.vehicleData && vehicle.vehicleData.airConditionType === true ? 'A/C' : 'Non A/C'}</li>
                                        <li><i><img src={require(`../../../../../../assets/icons/Transmission.svg`)} alt="ECR" className="img-fluid" width="25px" /></i> {vehicle && vehicle.transmissionData && vehicle.transmissionData.name} </li>
                                        <li>
                                            <i><img src={require(`../../../../../../assets/icons/Vehicleyear.svg`)} alt="Hatchback car" className="img-fluid" /></i>
                                            {`${vehicle && vehicle.vehicleData && vehicle.vehicleData.yearRange && vehicle.vehicleData.yearRange.from} - ${vehicle && vehicle.vehicleData && vehicle.vehicleData.yearRange && vehicle.vehicleData.yearRange.to}`}
                                        </li>
                                    </ul>

                                    <div className="location_vac text-uppercase">
                                        <h6>{vehicle && vehicle.pickupBranchData && vehicle.pickupBranchData.city}</h6>
                                        <i><img src={require(`../../../../../../assets/icons/arrow-straight.svg`)} alt="ECR" className="img-fluid" width="25px" /></i>
                                        <h6>{vehicle && vehicle.dropoffBranchData && vehicle.dropoffBranchData.city}</h6>
                                    </div>

                                    <div className="row mt-2 veh_loc">
                                        <div className="col-md-12">
                                            Pickup Date: {moment(setVehicleDate && setVehicleDate.pickupdate ? setVehicleDate.pickupdate : null).format("Do MMM YYYY")}
                                            <br />
                                            Return Date: {moment(setVehicleDate && setVehicleDate.returnDate ? setVehicleDate.returnDate : null).format("Do MMM YYYY")}
                                        </div>
                                    </div>

                                    <div class="cost_sum my-4">
                                        <div className="row align-items-end">
                                            <div className="col-md-6">
                                                <div class="row">
                                                    <div class="col-3">
                                                        <span>Free days:</span>
                                                    </div>
                                                    <div class="col-4 text-right">
                                                        <span>$0   x   {paidDays.free ? paidDays.free : 0} days</span>
                                                    </div>
                                                    <div class="col-2 text-right">
                                                        <span>= </span>
                                                    </div>
                                                    <div class="col-3 text-right">
                                                        <span>$0.00</span>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-3">
                                                        <span>Paid days</span>
                                                    </div>
                                                    <div class="col-4 text-right">
                                                        <span>${(vehicle && vehicle.ratePerDay) ? (vehicle && vehicle.ratePerDay) : 0}   x   {paidDays.paid ? paidDays.paid : 0} days</span>
                                                    </div>
                                                    <div class="col-2 text-right">
                                                        <span>= </span>
                                                    </div>
                                                    <div class="col-3 text-right">
                                                        <span>${((vehicle && vehicle.ratePerDay) ? (vehicle && vehicle.ratePerDay) : 0) * (paidDays.paid ? paidDays.paid : 0)}</span>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-3"><span>Total:</span>
                                                    </div>
                                                    <div class="col-4">
                                                    </div>
                                                    <div class="col-2 text-center">
                                                    </div>
                                                    <div class="col-3 text-right">
                                                        <span>${((vehicle && vehicle.ratePerDay) ? (vehicle && vehicle.ratePerDay) : 0) * paidDays.paid}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6 text-right">
                                                <button className="btn btn-md btn-default" onClick={(e) => {
                                                    e.preventDefault()
                                                    history.replace(`${ROUTES.VIEW_VEHICLE}?id=${vehicle._id}`)
                                                }}>Change</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="agree my-4 text-center">
                    <br /><div class="form-checkbox">
                        <input type="checkbox" name='' className="form-check-input" checked={terms} onChange={(e) => { setTerms(e.target.checked) }} />
                        <span className="checkmark"></span>
                    </div>

                    <span className="term_txt">I HAVE READ AND AGREE WITH THE <a onClick={() => {
                        window.open(ROUTES.TERMS, '_blank');
                    }}>TERMS AND CONDITIONS</a></span>
                </div>

                <div className="text-center">
                    <button className="btn btn-lg btn-secondary text-uppercase" disabled={terms === false} onClick={(e) => {
                        e.preventDefault()
                        submitRequest()
                    }}>Submit Your Request</button>
                </div>
                
            </div>
            <div className="container">
            <div className="title_loc text-center mt-5">
                <h5>What to expect from here</h5>
            </div>
            <div className="row align-items-start justify-content-center vehicle_summ">
                <div className="col-md-4">
                    <div className="loc_block text-center">
                        <i> <img src={require(`../../../../../../assets/agency/icons/sendit.png`)} alt="ECR" class="img-fluid"  /></i>
                        <span>Your booking request will be sent to the rental vehicle agency</span>				
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="loc_block text-center">
                        <i><img src={require(`../../../../../../assets/agency/icons/time.png`)} alt="ECR" class="img-fluid" /></i>
                        <span>Within 24 to 48 hrs you should hear back from the agency confirming your booking</span>				
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="loc_block text-center">
                        <i><img src={require(`../../../../../../assets/agency/icons/deal-done.png`)} alt="ECR" class="img-fluid" /></i>
                     
                        <span>If your booking has been approved, great! In case it has been declined, please feel free to browse again for other options</span>				
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}