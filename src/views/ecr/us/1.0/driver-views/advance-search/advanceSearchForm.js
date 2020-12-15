import React, { useState, useEffect } from "react";
import { reduxForm, Field, initialize, reset } from "redux-form";
import Slider from '@material-ui/core/Slider';
import './style.scss';
import moment from "moment";
import { useHistory, useLocation } from "react-router-dom";
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../config/default`)
const { Form } = require(`../../../../../../components/${PLATFORM}/atoms/form`);
const { STRINGS } = require(`../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`)
const { InputSubmit } = require(`../../../../../../components/${PLATFORM}/atoms/input-submit`);
const { onSubmitFail } = require(`../../../../../../helpers/${PLATFORM}`);
const { Checkbox } = require(`../../../../../../components/${PLATFORM}/atoms/checkbox`);
const { ROUTES } = require(`../../../../../../shared/${PLATFORM}/constants`);

const AdvanceSearchForm = ({ searchVehicle,
    setAdvanceSearchValues,
    pickupData,
    setPopVisible = () => { },
    onSubmit = () => { },
    vehicleListing,
    getFuelList,
    fuelList,
    getVehicleTypeList,
    vehicleList,
    getTransmissionTypeList,
    transmissionList,
    setPickUpLocation
}) => {
    const [formField, setFormField] = useState({
        Petrol: false, Diesel: false, Electric: false,
        Cars: false, PassengerVans: false, RecreationalVans: false, TrucksAndVans: false,
        Automatic: false, Manual: false
    })
    const [adultSeats, setAdultSeats] = useState(0)
    const [childSeats, setChildSeats] = useState(0)
    const [freeDays, setFreeDays] = useState(0)
    const [fuelType, setFuelType] = useState([])
    const [vehicleType, setVehicleType] = useState([])
    const [transmissionOption, setTransmissionOption] = useState([])

    let history = useHistory();

    const setFilters = (obj) => {
        if (obj.fuel) {
            setFuelType(fuelType.concat(JSON.stringify(obj.fuel)))
        }
        if (obj.tranmission) {
            setTransmissionOption(transmissionOption.concat(JSON.stringify(obj.tranmission)))
        }
        if (obj.vehicleObj) {
            setVehicleType(vehicleType.concat(JSON.stringify(obj.vehicleObj)))
        }
    }

    const removeFilter = (obj) => {
        if (obj.fuel) {
            let arr = fuelType
            let index = arr.indexOf(JSON.stringify(obj.fuel))
            if (index !== -1) {
                arr.splice(index, 1)
                setFuelType(arr)
            }
        }
        if (obj.tranmission) {
            let arr = transmissionOption
            let index = arr.indexOf(JSON.stringify(obj.tranmission))
            if (index !== -1) {
                arr.splice(index, 1)
                setTransmissionOption(arr)
            }
        }
        if (obj.vehicleObj) {
            let arr = vehicleType
            let index = arr.indexOf(JSON.stringify(obj.vehicleObj))
            if (index !== -1) {
                arr.splice(index, 1)
                setVehicleType(arr)
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        setAdvanceSearchValues({
            ...formField, ...{ seats: { childSeats: childSeats, adultSeats: adultSeats } },
            ...{ freedays: freeDays }, ...{ fuelType: fuelType }, ...{ vehicleType: vehicleType }, ...{ transmissionOption: transmissionOption }
        })
        let postData = {
            fromCity: pickupData.City ? pickupData.City : '',
            toCity: '',
            adultSeats: adultSeats,
            childSeats: childSeats,
            freeDays: freeDays,
            fuelType: fuelType,
            vehicleType: vehicleType,
            transmissionOption: transmissionOption,
            pickupDate: pickupData.PickupDate !== null ? moment(new Date(pickupData.PickupDate)).format().split('T')[0] : null,
            limit: STRINGS.VEHICLE_LIMIT,
            index: STRINGS.INDEX
        }
        setPickUpLocation({ ...pickupData, DropOffLocation: '' })
        onSubmit(postData)
    }

    const hideadvanceSearch = () => {
        var x = document.getElementById('advance-search-vehicle');
        var y = document.getElementById('advance_btn');
        if (y.style.display === "none") {
            x.style.display = "none";
            y.style.display = "block";
        } else {
            x.style.display = "block";
            y.style.display = "none";
        }
    }

    const resetAdvanceSearch = e => {
        setFormField({
            Petrol: false, Diesel: false, Electric: false,
            Cars: false, PassengerVans: false, RecreationalVans: false, TrucksAndVans: false,
            Automatic: false, Manual: false
        })
        setAdultSeats(0)
        setChildSeats(0)
        setFreeDays(0)
    }
    useEffect(() => {
        getFuelList()
        getVehicleTypeList()
        getTransmissionTypeList()
        resetAdvanceSearch()
        setAdvanceSearchValues({ ...formField, ...{ seats: { childSeats: childSeats, adultSeats: adultSeats } }, ...{ freedays: freeDays } })
    }, [])

    return (
        <Form onSubmit={handleSubmit}>

            <a onClick={hideadvanceSearch} className="close_advance"><img src={require(`../../../../../../assets/icons/close_icon.svg`)} alt="ECR" className="img-fluid" /></a>

            <h5>Advanced Search</h5>

            <div className="row">
                <div className="col-md-6">
                    <h6><i className="mr-2"><img src={require(`../../../../../../assets/icons/Vehicle.svg`)} alt="ECR" className="img-fluid" /></i> Vehicle Type</h6>
                    <div className="d-flex flex-row justify-content-start flex-wrap pr-lg-4 advance_chk">
                        {vehicleList && vehicleList.length !== 0 ? vehicleList.map((vehicleObj, index) => {
                            return (<Field
                                name={vehicleObj.name.replace('&', 'And').replace(/\s+/g, '')}
                                component={Checkbox}
                                key={index}
                                text={vehicleObj.name}
                                config={{
                                    onChange: event => {
                                        event.persist()
                                        setFormField(prevState => ({
                                            ...prevState,
                                            [vehicleObj.name.replace('&', 'And').replace(/\s+/g, '')]: event.target.checked
                                        }))
                                        event.target.checked === true ? setFilters({ vehicleObj: vehicleObj._id }) : removeFilter({ vehicleObj: vehicleObj._id })
                                    },
                                    checked: formField[vehicleObj.name.replace('&', 'And').replace(/\s+/g, '')]
                                }}
                            />)
                        }) : ''}

                    </div>
                </div>

                <div className="col-md-6">
                    <h6><i className="mr-2"><img src={require(`../../../../../../assets/icons/Seats.svg`)} alt="ECR" className="img-fluid" /></i> Number of Seats</h6>
                    <div className="progress_bar mb-3">
                        <h6 className="d-block mb-1">{STRINGS.ADULT_SEAT_LABEL}</h6>
                        <div className="d-flex flex-row pr-lg-4">
                            <Slider value={adultSeats}
                                onChange={(e, newValue) => {
                                    setAdultSeats(newValue)
                                }} aria-labelledby="continuous-slider" max={25} />
                            <label>{adultSeats}</label>
                        </div>
                    </div>
                    <div className="progress_bar">
                        <h6 className="d-block mb-1">{STRINGS.CHILD_SEAT_LABEL}</h6>
                        <div className="d-flex flex-row pr-lg-4">
                            <Slider value={childSeats} onChange={(e, newValue) => {
                                setChildSeats(newValue)
                            }} aria-labelledby="continuous-slider" max={25} />
                            <label>{childSeats}</label>
                        </div>
                    </div>
                </div>

            </div>

            <hr />

            <div className="row">
                <div className="col-md-6">
                    <h6><i className="mr-2"><img src={require(`../../../../../../assets/icons/Fuel.svg`)} alt="ECR" className="img-fluid" /></i>Fuel Type</h6>
                    <div className="d-flex flex-row justify-content-start flex-wrap pr-lg-4 advance_chk">
                        {fuelList && fuelList.length !== 0 ? fuelList.map((fuel, index) => {
                            return <Field
                                name={fuel.fuelType}
                                component={Checkbox}
                                key={index}
                                text={fuel.fuelType}
                                config={{
                                    checked: formField[fuel.fuelType],
                                    onChange: event => {
                                        event.persist()
                                        setFormField(prevState => ({
                                            ...prevState,
                                            [fuel.fuelType]: event.target.checked
                                        }))
                                        event.target.checked === true ? setFilters({ fuel: fuel._id }) : (
                                            removeFilter({ fuel: fuel._id })
                                        )
                                    },

                                }}
                            />
                        }) : ''}

                    </div>
                </div>
                <div className="col-md-6">
                    <h6><i className="mr-2"><img src={require(`../../../../../../assets/icons/Transmission.svg`)} alt="ECR" className="img-fluid" /></i> Transmission Options</h6>
                    <div className="d-flex flex-row justify-content-start flex-wrap pr-lg-4 advance_chk">
                        {transmissionList && transmissionList.length !== 0 ? transmissionList.map((tranmission, index) => {
                            return <Field
                                name={tranmission.name}
                                component={Checkbox}
                                text={tranmission.name}
                                key={index}
                                config={{
                                    onChange: event => {
                                        event.persist()
                                        setFormField(prevState => ({
                                            ...prevState,
                                            [tranmission.name]: event.target.checked
                                        }))
                                        event.target.checked === true ? setFilters({ tranmission: tranmission._id }) : removeFilter({ tranmission: tranmission._id })
                                    },
                                    checked: formField[tranmission.name]
                                }}
                            />
                        }) : ''}
                    </div>
                </div>

            </div>

            <hr />


            <div className="row">
                <div className="col-lg-6 col-md-12 pr-lg-4">
                    <h6><i className="mr-2"><img src={require(`../../../../../../assets/icons/FreeDays.svg`)} alt="ECR" className="img-fluid" /></i> Free Days</h6>
                    <div className="d-flex progress_bar">
                        <Slider max={45} value={freeDays} onChange={(e, newValue) => {
                            setFreeDays(newValue)
                        }} aria-labelledby="continuous-slider" />
                        <label>{freeDays}</label>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 text-center text-lg-right">
                    <div className="btn-group">
                        <button type='button' className={"btn btn-lg btn-transparent mt-4"} onClick={(e) => resetAdvanceSearch(e)}>{STRINGS.ADVANCE_SEARCH_RESET_BUTTON_LABEL}</button>
                        <InputSubmit buttonLabel={STRINGS.ADVANCE_SEARCH_BUTTON_LABEL} buttonStyle={"btn btn-lg btn-primary mt-4"} />
                    </div>
                </div>
            </div>
        </Form >
    )
}

const reduxFormFunction = reduxForm({
    form: "advanceSearchVehicleForm",
    fields: ['Petrol', 'Diesel', 'LPG', 'BioDiesel', 'Cars', 'PassengerVans', 'RecreationalVans', 'TrucksAndVans', 'Automatic', 'Manual', 'seats', 'freeDays'],
    onSubmitFail,
    enableReinitialize: true,
})(AdvanceSearchForm);

export const AdvanceSearchVehicleForm = (reduxFormFunction); 