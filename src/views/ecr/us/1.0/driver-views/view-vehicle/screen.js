import React, { useState, useEffect } from "react";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import moment from 'moment'
import './style.scss';
import ReactGA from 'react-ga';
import { useHistory } from "react-router-dom";

const queryString = require('query-string');
const { defaultConfig: { PLATFORM } } = require(`../../../../../../config/default`);
const { AccordionComponent } = require(`../../../../../../components/${PLATFORM}/atoms/Accordin`);
const { DialogModal } = require(`../../../../../../components/${PLATFORM}/atoms/dialog-component`);
const { LABELS } = require(`../../../../../../shared/${PLATFORM}/constants`)
const { ROUTES } = require(`../../../../../../shared/${PLATFORM}/constants`);
const { DateRangePickerComponent } = require(`../../../../../../components/${PLATFORM}/atoms/multiple-date-range`)
export const Screen = ({
    vehicle,
    makeRequest, userToken,
    paidDays, getFaq, faq, range, setPaidDay, getVehicleInformation
}) => {

    const [vehicleImages, setVehicleImages] = useState([])
    let history = useHistory();
    const [popupVisible, setPopVisible] = useState(false);
    const [listingError, setListingError] = useState('')
    const [listingInformation, setListingInformation] = useState({})

    const parsed = queryString.parse(history.location.search);

    useEffect(() => {
        getVehicleInformation(parsed.id, (resp) => {
            setListingError('')
            setListingInformation(resp)
            ReactGA.pageview(`${resp.agencyId}`, ['tracker1'])
        }, (error) => {
            setListingError(error.msg)
        })
        return () => {
            setListingInformation({})
            setListingError('')
            // range({})
            // setPaidDay({ paid: 0, free: 0 })
        }
    }, [])

    useEffect(() => {

        let arr = []
        vehicle && vehicle.vehicleData && vehicle.vehicleData.url.map(image => {
            arr.push({ 'url': image })
        })
        setVehicleImages(arr)
        getFaq()
    }, [vehicle])

    const checkUserLoggedIn = () => {
        if (userToken === '' || userToken === null) {
            history.push(ROUTES.LOGIN)
        }
        else {
            history.replace(ROUTES.VEHICLE_SUMMARY)
        }
    }

    return (
        <>
            <div className="main_section vehical_head">
                {Object.keys(listingInformation).length > 0 ?
                    <div className="container">

                        <div className="vehicle_lists">
                            <h4 className='text-uppercase'>{LABELS.yourRequest}</h4>
                            {vehicle ?
                                <div className="rounded border">
                                    <div className="row align-items-start">
                                        <div className="col-md-4">

                                            <figure>
                                                <img src={vehicle && vehicle.vehicleData && vehicle.vehicleData.url[0]} alt="Recreational" className="img-fluid" />
                                                {/* <span className="enlarge_icon"><img src={require('../../../../../../assets/icons/enlarge_icon.png')} onClick={() => { setPopVisible(true) }} /></span> */}
                                            </figure>

                                            <DialogModal
                                                dialogContent={vehicleImages}
                                                modalType={'ImageSlider'}
                                                modalVisibility={popupVisible}
                                                toggleDialogModal={() => setPopVisible(!popupVisible)}
                                                onRejection={() => {
                                                    setPopVisible(false)
                                                }}
                                            />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="vehicle_info">
                                                <h5>{vehicle && vehicle.vehicleData && vehicle.vehicleData.name}</h5>
                                                <ul className="vehicles_tools">
                                                    <li>
                                                        <i><img src={require(`../../../../../../assets/icons/Fuel.svg`)} alt="Hatchback car" className="img-fluid" /></i>
                                                        {vehicle && vehicle.fuelTypeData && vehicle.fuelTypeData.fuelType} </li>

                                                    <li><i><img src={require(`../../../../../../assets/icons/Seats.svg`)} alt="ECR" className="img-fluid" width="25px" /></i>
                                                        {`${vehicle && vehicle.vehicleData && vehicle.vehicleData.adultSeats} adult`}
                                       {vehicle && vehicle.vehicleData && vehicle.vehicleData.childSeats !== 0 ? 
                                       `, ${vehicle && vehicle.vehicleData && vehicle.vehicleData.childSeats} child`: ''} 
                                                    </li>
                                                    <li><i><img src={require(`../../../../../../assets/agency/icons/luggage_icon.svg`)} alt="ECR" className="img-fluid" width="25px" /></i>
                                                    {` ${vehicle && vehicle.vehicleData && vehicle.vehicleData.largeLuggageSpace} large, ${vehicle && vehicle.vehicleData && vehicle.vehicleData.smallLuggageSpace} small`}
                                                </li>
                                                    <li><i><img src={require(`../../../../../../assets/agency/icons/doors_icon.svg`)} alt="ECR" className="img-fluid" width="25px" /></i>{vehicle && vehicle.vehicleData && vehicle.vehicleData.numberOfDoor} doors</li>
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

                                                <div className="short_des">
                                                    <h6>Short Description:</h6>
                                                    <p>{vehicle && vehicle.vehicleData && vehicle.vehicleData.description}</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div> : ''}
                        </div>

                        <div className="row my-4">
                            <div className="col-lg-7 col-md-12">
                                <h5>{LABELS.selectTravelDate}</h5>
                                <div className="row travel_calender">
                                    <div className="col-md-6">
                                        {Object.keys(listingInformation).length > 0 ? <DateRangePickerComponent vehicle={listingInformation} /> : ''}
                                    </div>
                                    <div className="col-md-6">
                                        <ul className="Badge_calendar mt-3 mt-md-0">
                                            <li>
                                                <span className="badge badge-available">&nbsp;</span>
                                                <span>{LABELS.availabledays}</span>
                                            </li>
                                            <li>
                                                <span className="badge badge-free">&nbsp;</span>
                                                <span>{LABELS.selectedFreeDays}</span>
                                            </li>
                                            <li>
                                                <span className="badge badge-paid">&nbsp;</span>
                                                <span>{LABELS.selectedPaidDays}</span>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            </div>

                            <div className="col-lg-5 col-md-12">
                                <h5>{LABELS.costSummaryLabel}</h5>
                                <div className="cost_summary bg_grey">
                                    <div className="row">
                                        <div className="col-3">
                                            <span>{LABELS.freeDaysLabel}</span>
                                        </div>
                                        <div className="col-4 text-right">
                                            <span>$0   x   {paidDays.free ? paidDays.free : 0} days</span>
                                        </div>
                                        <div className="col-2 text-right">
                                            <span>= </span>
                                        </div>
                                        <div className="col-3 text-right">
                                            <span>{0 * (paidDays && paidDays.free ? paidDays && paidDays.free : 0)}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <span>{LABELS.paidDaysLabel}</span>
                                        </div>
                                        <div className="col-4 text-right">

                                            <span>${(vehicle && vehicle.ratePerDay) ? (vehicle && vehicle.ratePerDay) : 0}   x   {paidDays.paid ? paidDays.paid : 0} days</span>
                                        </div>
                                        <div className="col-2 text-right">
                                            <span>=</span>
                                        </div>
                                        <div className="col-3 text-right">
                                            <span> {((vehicle && vehicle.ratePerDay) ? (vehicle && vehicle.ratePerDay) : 0) * (paidDays.paid ? paidDays.paid : 0)}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3">
                                            <span>{LABELS.totalLabel}</span>
                                        </div>
                                        <div className="col-4">

                                        </div>
                                        <div className="col-2 text-center">

                                        </div>
                                        <div className="col-3 text-right">
                                            <span>${((vehicle && vehicle.ratePerDay) ? (vehicle && vehicle.ratePerDay) : 0) * (paidDays.paid ? paidDays.paid : 0)}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 text-right">
                                            <button className="btn btn-lg btn-secondary text-uppercase" disabled={paidDays && paidDays.paid === 0 && paidDays && paidDays.free === 0} onClick={(e) => {
                                                e.preventDefault()
                                                checkUserLoggedIn()
                                            }}>{LABELS.makeRequestBtnLabel}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="table_block">
                            <h5>{LABELS.tripDetailsLabel}</h5>
                            <div className="row table_div">
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col text-left">{LABELS.freedaysAvailableLabel}  </div>
                                        <div className="col text-right">{(vehicle && vehicle.freeDays) ? (vehicle && vehicle.freeDays) : 0}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col text-left">{LABELS.extraPaidDaysAvailLabel}</div>
                                        <div className="col text-right">{(vehicle && vehicle.extraPaidDays) ? (vehicle && vehicle.extraPaidDays) : "Not Available"}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col text-left">{LABELS.pickupFromLabel}</div>
                                        <div className="col text-right">{(vehicle && vehicle.pickupDate) ? moment(vehicle.pickupDate).format("Do MMM YYYY") : ''}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col text-left">{LABELS.pickupTimeLabel}</div>
                                        <div className="col text-right">{(vehicle && vehicle.pickupTime) ? moment(vehicle.pickupTime.from).format('LT') : ''} to {(vehicle && vehicle.pickupTime) ? moment(vehicle.pickupTime.to).format('LT') : ''}</div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col text-left">{LABELS.kmAllowLabel} </div>
                                        <div className="col text-right">{vehicle && vehicle.kmAllow ? `${vehicle.kmAllow} Km` : 'Unlimited'}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col text-left">{LABELS.travelDistLabel} </div>
                                        <div className="col text-right">{vehicle && vehicle.estimatedDistance ? `${vehicle.estimatedDistance} Km` : 'Nil'}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col text-left">{LABELS.dropOffTimeLabel} </div>
                                        <div className="col text-right">{(vehicle && vehicle.dropoffTime) ? moment(vehicle.dropoffTime.from).format('LT') : ''} to {(vehicle && vehicle.dropoffTime) ? moment(vehicle.dropoffTime.to).format('LT') : ''}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-md-12">
                                <h5>{LABELS.additionalInfoLabel}</h5>
                            </div>

                            <div className="col-12">
                                {Object.keys(vehicle).length > 0 ? <AccordionComponent {...{ vehicle: vehicle, faq: faq }} /> : ''}
                                <div className="text-center mt-2">
                                    <button className="btn btn-lg btn-secondary text-uppercase" disabled={paidDays && paidDays.paid === 0 && paidDays && paidDays.free === 0} onClick={(e) => {
                                        e.preventDefault()
                                        checkUserLoggedIn()
                                    }}>{LABELS.makeRequestBtnLabel}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <h4 className="text-center">{listingError}</h4>}
            </div >
        </>
    )
}