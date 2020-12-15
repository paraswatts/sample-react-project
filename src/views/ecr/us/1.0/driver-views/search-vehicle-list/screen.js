import React, { useEffect, useState } from "react";
import "./style.scss";
import Slider from '@material-ui/core/Slider';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useHistory } from "react-router-dom";

const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../config/default`);
const { STRINGS } = require(`../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`);
const { Calender_icon } = require(`../../../../../../assets/driver/icons/calender_icon.svg`);
const { ROUTES } = require(`../../../../../../shared/${PLATFORM}/constants`);
const { SnackbarWrapper } = require(`../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`);
const moment = require('moment');
const { CustomPagination } = require(`../../../../../../components/${PLATFORM}/atoms/pagination`)
const { LocationSearch } = require(`../../../../../../components/${PLATFORM}/atoms/location-picker`)
const { ScrollToTop } = require(`../../../../../../components/${PLATFORM}/atoms/scroll-top`)
const { DecisionPopup } = require(`../../../../../../components/${PLATFORM}/atoms/decision-popup`);

export const Screen = ({
    pickupData,
    advanceSearchFormValues,
    setUpPickUpLocation,
    setAdvanceSearchValues,
    currentLocation,
    searchVehicle,
    vehicleListing,
    getFuelList,
    fuelList,
    getVehicleTypeList,
    vehicleList,
    getTransmissionTypeList,
    transmissionList,
    totalCount, range, setPaidDay
}) => {
    const [openCalendar, setOpenCalendar] = useState(false);
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [pageIndex, setPageIndex] = useState(0)
    const minDate = new Date()
    const maxDate = new Date()
    let history = useHistory();
    const [fuelType, setFuelType] = useState(advanceSearchFormValues.fuelType ? advanceSearchFormValues.fuelType : [])
    const [vehicleType, setVehicleType] = useState(advanceSearchFormValues.vehicleType ? advanceSearchFormValues.vehicleType : [])
    const [transmissionOption, setTransmissionOption] = useState(advanceSearchFormValues.transmissionOption ? advanceSearchFormValues.transmissionOption : [])
    const [disable, setDisable] = useState(false)
    const [prevValue, setPrevValue] = useState({
        freedays: advanceSearchFormValues && advanceSearchFormValues.freedays,
        adultSeats: advanceSearchFormValues && advanceSearchFormValues.seats && advanceSearchFormValues.seats.adultSeats,
        childSeats: advanceSearchFormValues && advanceSearchFormValues.seats && advanceSearchFormValues.seats.childSeats
    })
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });
    const [popupVisible, setPopVisible] = useState(false);
    useEffect(() => {
        getFuelList()
        getVehicleTypeList()
        getTransmissionTypeList()
    }, [])

    useEffect(() => {
        document.getElementsByTagName('body')[0].scrollTo(0, 0)
    }, [vehicleListing])

    useEffect(() => {
        document.getElementById('pick-up-date').value = moment(pickupData.PickupDate).format('YYYY-MM-DD')
    }, [pickupData.PickupDate])

    useEffect(() => {
        checkFilterApplied(advanceSearchFormValues)
    }, [advanceSearchFormValues])

    const hideTextBox = (i, ele, className) => {
        var el = document.querySelectorAll(ele);

        if (el[i].classList.length === 2) {
            el[i].classList.remove(className);
        } else {
            if (el.classList) {
                el[i].classList.add(className);
            } else {
                el[i].className += ' ' + className;
            }
        }
    }

    const setFilters = (obj, name) => {
        if (obj.fuel) {
            let a = fuelType
            a.push(JSON.stringify(obj.fuel))
            setFuelType(a)
            setAdvanceSearchValues({ ...advanceSearchFormValues, fuelType: a, [name]: true })
            modifySearch(STRINGS.INDEX, {
                vehicleType: vehicleType,
                transmissionOption: transmissionOption,
                fuelType: a
            }, {
                childSeats: advanceSearchFormValues.seats && advanceSearchFormValues.seats.childSeats,
                adultSeats: advanceSearchFormValues.seats && advanceSearchFormValues.seats.adultSeats,
                freeDays: advanceSearchFormValues.freedays
            })
            setPageIndex(STRINGS.INDEX)
        }
        if (obj.tranmission) {
            let a = transmissionOption
            a.push(JSON.stringify(obj.tranmission))
            setTransmissionOption(a)
            setAdvanceSearchValues({ ...advanceSearchFormValues, transmissionOption: a, [name]: true })
            modifySearch(STRINGS.INDEX, {
                vehicleType: vehicleType,
                transmissionOption: a,
                fuelType: fuelType
            }, {
                childSeats: advanceSearchFormValues.seats && advanceSearchFormValues.seats.childSeats,
                adultSeats: advanceSearchFormValues.seats && advanceSearchFormValues.seats.adultSeats,
                freeDays: advanceSearchFormValues.freedays
            })
            setPageIndex(STRINGS.INDEX)
        }
        if (obj.vehicleObj) {
            let a = vehicleType
            a.push(JSON.stringify(obj.vehicleObj))
            setVehicleType(a)
            setAdvanceSearchValues({ ...advanceSearchFormValues, vehicleType: a, [name]: true })
            modifySearch(STRINGS.INDEX, {
                vehicleType: a,
                transmissionOption: transmissionOption,
                fuelType: fuelType
            }, {
                childSeats: advanceSearchFormValues.seats && advanceSearchFormValues.seats.childSeats,
                adultSeats: advanceSearchFormValues.seats && advanceSearchFormValues.seats.adultSeats,
                freeDays: advanceSearchFormValues.freedays
            })
            setPageIndex(STRINGS.INDEX)
        }

    }

    const removeFilter = (obj, name) => {
        if (obj.fuel) {
            let arr = fuelType
            let index = arr.indexOf(JSON.stringify(obj.fuel))
            if (index !== -1) {
                arr.splice(index, 1)
                setFuelType(arr)
                setAdvanceSearchValues({ ...advanceSearchFormValues, fuelType: arr, [name]: false })
                modifySearch(STRINGS.INDEX, {
                    vehicleType: vehicleType,
                    transmissionOption: transmissionOption,
                    fuelType: arr
                }, {
                    childSeats: advanceSearchFormValues.seats && advanceSearchFormValues.seats.childSeats,
                    adultSeats: advanceSearchFormValues.seats && advanceSearchFormValues.seats.adultSeats,
                    freeDays: advanceSearchFormValues.freedays
                })
                setPageIndex(STRINGS.INDEX)
            }
        }
        if (obj.tranmission) {
            let arr = transmissionOption
            let index = arr.indexOf(JSON.stringify(obj.tranmission))
            if (index !== -1) {
                arr.splice(index, 1)
                setTransmissionOption(arr)
                setAdvanceSearchValues({ ...advanceSearchFormValues, transmissionOption: arr, [name]: false })
                modifySearch(STRINGS.INDEX, {
                    vehicleType: vehicleType,
                    transmissionOption: arr,
                    fuelType: fuelType
                }, {
                    childSeats: advanceSearchFormValues.seats && advanceSearchFormValues.seats.childSeats,
                    adultSeats: advanceSearchFormValues.seats && advanceSearchFormValues.seats.adultSeats,
                    freeDays: advanceSearchFormValues.freedays
                })
                setPageIndex(STRINGS.INDEX)
            }
        }
        if (obj.vehicleObj) {
            let arr = vehicleType
            let index = arr.indexOf(JSON.stringify(obj.vehicleObj))
            if (index !== -1) {
                arr.splice(index, 1)
                setVehicleType(arr)
                setAdvanceSearchValues({ ...advanceSearchFormValues, vehicleType: arr, [name]: false })
                modifySearch(STRINGS.INDEX, {
                    vehicleType: arr,
                    transmissionOption: transmissionOption,
                    fuelType: fuelType
                }, {
                    childSeats: advanceSearchFormValues.seats && advanceSearchFormValues.seats.childSeats,
                    adultSeats: advanceSearchFormValues.seats && advanceSearchFormValues.seats.adultSeats,
                    freeDays: advanceSearchFormValues.freedays
                })
                setPageIndex(STRINGS.INDEX)
            }
        }
    }

    const modifySearch = (index, filter, slider) => {
        let postData = {
            fromCity: pickupData.City !== '' ? pickupData.City : '',
            toCity: pickupData.DropOffLocation !== '' ? pickupData.DropOffLocation : '',
            adultSeats: slider.adultSeats,
            childSeats: slider.childSeats,
            freeDays: slider.freeDays,
            pickupDate: pickupData.PickupDate !== null ? moment(new Date(pickupData.PickupDate)).format().split('T')[0] : null,
            limit: STRINGS.VEHICLE_LIMIT,
        }

        Object.keys(postData)
            .map(k => {
                if (postData[k] === "" || postData[k] === 0 || postData[k] === "Invalid date" || postData[k] === undefined) {
                    delete postData[k]
                }
            })
        let q = Object.keys(postData)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(postData[k])
            ).join('&');
        if (filter.fuelType.length !== 0) {
            q = `${q}&fuelType=[${filter.fuelType}]`
        }
        if (filter.vehicleType.length !== 0) {
            q = `${q}&vehicleType=[${filter.vehicleType}]`
        }
        if (filter.transmissionOption.length !== 0) {
            q = `${q}&transmissionType=[${filter.transmissionOption}]`
        }
        q = `${q}&index=${index}`

        searchVehicle(q, (response) => {

        }, (error) => {
            setSnackBarData({
                variant: error.status ? 'success' : 'error',
                message: error.msg || 'error'
            });
            setOpenSnackbar(true)
        })
    }

    const checkFilterApplied = (filters) => {
        let getInput = Object.keys(filters).filter(k => typeof filters[k] === 'boolean')
        let getSlider = Object.keys(filters).filter(k => typeof filters[k] === 'number')
        getSlider.push('adultSeats')
        getSlider.push('childSeats')
        let getFilter = (getInput).filter(k => filters[k] === true)
        let getFilters = (getSlider).filter(k => filters[k] > 0 || filters['seats'] && filters['seats'][k] > 0)

        if (getFilter.length === 0 && getFilters.length === 0 && vehicleType.length === 0 && fuelType.length === 0 && transmissionOption.length === 0) {

            setDisable(true)
            return true
        } else {

            setDisable(false)
            return false
        }
    }

    const vehicleTypeSearch = (vehicleObj) => {
        let arr = []
        arr.push(JSON.stringify(vehicleObj._id))
        setVehicleType(arr)
        let vehicle = ['Cars', 'PassengerVans', 'RecreationalVans', 'TrucksAndVans']
        let updated_veh = vehicle.filter(veh => veh !== vehicleObj.name.replace('&', 'And').replace(/\s+/g, '')
        )
        setAdvanceSearchValues({
            ...advanceSearchFormValues, [updated_veh[0]]: false, [updated_veh[1]]: false,
            [updated_veh[2]]: false, [vehicleObj.name.replace('&', 'And').replace(/\s+/g, '')]: true, vehicleType: arr
        })
        modifySearch(STRINGS.INDEX, {
            vehicleType: arr,
            transmissionOption: transmissionOption,
            fuelType: fuelType
        }, {
            childSeats: advanceSearchFormValues.seats && advanceSearchFormValues.seats.childSeats,
            adultSeats: advanceSearchFormValues.seats && advanceSearchFormValues.seats.adultSeats,
            freeDays: advanceSearchFormValues.freedays
        })
        setPageIndex(STRINGS.INDEX)
    }

    useEffect(() => {
        // console.log(pickupData, 'check browse')
        if (pickupData && Object.keys(pickupData).length === 0) {
            setPageIndex(0)
            setFuelType([])
            setVehicleType([])
            setTransmissionOption([])
        }
    }, [pickupData])

    useEffect(() => { }, [pageIndex])

    const checkString = (vehicle) => {
        let kmAllow = (vehicle && vehicle.kmAllow ? `Free ${vehicle.kmAllow} kms` : '')
        let fuelOffer = (vehicle && vehicle.fuelOfferData && vehicle.fuelOfferData.description ?
            vehicle && vehicle.kmAllow ? `, ${vehicle.fuelOfferData.description}` :
                `${vehicle.fuelOfferData.description}` : '')
        let expenseOffer = (vehicle && vehicle.expenses ? (vehicle.fuelOfferData || vehicle.kmAllow ? `, ${vehicle && vehicle.expenses}` : `${vehicle && vehicle.expenses}`) : '')
        let ferryOffer = (vehicle && vehicle.ferryCostData ? (vehicle.fuelOfferData || vehicle.kmAllow || vehicle.expenses ? ', Ferry Cost' : 'Ferry Cost') : '')
        let insuranceOffer = (vehicle && vehicle.insurance ? `${vehicle.fuelOfferData || vehicle.kmAllow || vehicle.expenses ? ' and ' : ''}standard insurance` : '')

        let str = (vehicle && !vehicle.kmAllow && !vehicle.fuelOfferData && !vehicle.insurance ?
            ' N/A' : ` ${kmAllow + fuelOffer + expenseOffer + ferryOffer + insuranceOffer}.`)

        return str
    }
    useEffect(() => {
        // console.log(fuelType)
    }, [fuelType])
    useEffect(() => {
        // console.log(vehicleType)
    }, [vehicleType])
    useEffect(() => {
        checkFilterApplied(advanceSearchFormValues)
    }, [transmissionOption])

    return (
        <>
            <ScrollToTop>
                <DecisionPopup
                    modalVisibility={popupVisible}
                    dialogContent={Object.keys(pickupData).length === 0 || (pickupData.PickupDate === null && pickupData.PickupLocation === '') ?
                        STRINGS.PICKUP_CONTENT : (pickupData.PickupDate === null ? STRINGS.PICKUPDATE_CONTENT :
                            (pickupData.PickupLocation === '' ? STRINGS.PICKUPDLOCATION_CONTENT : ''))}
                    confirmButtonTitle={STRINGS.OKAY}
                    dialogTitle={Object.keys(pickupData).length === 0 || (pickupData.PickupDate === null && pickupData.PickupLocation === '') ?
                        STRINGS.BOTH_PICKUP : (pickupData.PickupDate === null ? STRINGS.PICKUPDATE : (pickupData.PickupLocation === '' ? STRINGS.PICKUPLOCATION : ''))}
                    toggleDialogModal={() => setPopVisible(!popupVisible)}
                    onConfirmation={() => {
                        setPopVisible(false)
                    }}
                />
                <div className="main_section vehical_head">
                    <div className="container">
                        <SnackbarWrapper
                            visible={openSnackBar}
                            onClose={() => setOpenSnackbar(false)}
                            variant={snackbarData.variant}
                            message={snackbarData.message}
                        />
                        <div className="row">
                            <div className="col-lg-3 col-md-4">
                                <div className="Search_pref rounded ">
                                    <h6>{STRINGS.SEARCH_LABEL}</h6>
                                    <form action="">
                                        <div className="form-group">
                                            <LocationSearch
                                                intialvalue={pickupData.PickupLocation}
                                            />
                                        </div>
                                        <div className="form-group">

                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <Grid>

                                                    <KeyboardDatePicker
                                                        className="form-control"
                                                        value={pickupData.PickupDate ? pickupData.PickupDate : null}
                                                        placeholder={STRINGS.PICKUP_DATE_PLACEHOLDER}
                                                        minDate={minDate}
                                                        maxDate={maxDate.setMonth(maxDate.getMonth() + 12)}
                                                        format={'dd/MM/yyyy'}
                                                        InputProps={{
                                                            readOnly: true,
                                                            style: { color: 'black', cursor: 'pointer' },
                                                            onClick: () => {
                                                                setOpenCalendar(true)
                                                            }
                                                        }}
                                                        id="pick-up-date"
                                                        onChange={(value) => setUpPickUpLocation({ ...pickupData, PickupDate: value })}
                                                        onClose={() => { setOpenCalendar(false) }}
                                                        keyboardIcon={Calender_icon}
                                                        open={openCalendar}
                                                    />
                                                </Grid>
                                            </MuiPickersUtilsProvider>
                                        </div>

                                        <button className="btn btn-lg btn-primary" onClick={(e) => {
                                            e.preventDefault()
                                            if (Object.keys(pickupData).length === 0 || (pickupData.PickupDate === null || pickupData.PickupDate === '') || pickupData.PickupLocation === '') {
                                                setPopVisible(true)
                                            } else {
                                                modifySearch(STRINGS.INDEX, {
                                                    vehicleType: vehicleType,
                                                    transmissionOption: transmissionOption,
                                                    fuelType: fuelType
                                                }, {
                                                    childSeats: advanceSearchFormValues.seats && advanceSearchFormValues.seats.childSeats,
                                                    adultSeats: advanceSearchFormValues.seats && advanceSearchFormValues.seats.adultSeats,
                                                    freeDays: advanceSearchFormValues.freedays
                                                })
                                                setPageIndex(STRINGS.INDEX)
                                            }
                                        }
                                        }>{STRINGS.MODIFY_SEARCH_LABEL}</button>
                                    </form>
                                </div>

                                <div className="advance_filter">
                                    <h5>{STRINGS.ADVANCED_FILTERS}</h5>
                                    <div className="accordin">
                                        <div className="card" >
                                            <div className="card-header" onClick={() => hideTextBox(0, ".card", "show")}>
                                                <h5 className="mb-0">{STRINGS.FUEL_OPTIONS_LABEL}</h5>
                                            </div>
                                            <div className="collapse"  >
                                                <div className="card-body">
                                                    <ul className="check_list">
                                                        {fuelList && fuelList.length !== 0 ? fuelList.map((fuel, index) => {
                                                            return <li key={index}>
                                                                <div className="d-inline-block position-relative">
                                                                    <Checkbox checked={advanceSearchFormValues[fuel.fuelType] ? advanceSearchFormValues[fuel.fuelType] : false}
                                                                        onChange={(e) => {
                                                                            e.target.checked === true ? setFilters({ fuel: fuel._id }, fuel.fuelType) : removeFilter({ fuel: fuel._id }, fuel.fuelType)
                                                                        }} /><label>{fuel.fuelType}</label>
                                                                </div>
                                                            </li>
                                                        }) : ''}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card" >
                                            <div className="card-header" onClick={() => hideTextBox(1, ".card", "show")}>
                                                <h5 className="mb-0">{STRINGS.SEATS_LABEL}</h5>
                                            </div>
                                            <div className="collapse"  >
                                                <div className="card-body">
                                                    <ul className="check_list">
                                                        <li className="w-100">
                                                            <h6>{STRINGS.CHILD_SEAT_LABEL}</h6>
                                                            <div className="d-flex align-items-center">
                                                                <Slider value={advanceSearchFormValues.seats && advanceSearchFormValues.seats.childSeats ? advanceSearchFormValues.seats.childSeats : 0}
                                                                    max={25}
                                                                    onChange={(e, newValue) => {

                                                                        setAdvanceSearchValues({
                                                                            ...advanceSearchFormValues, seats: { childSeats: newValue, adultSeats: advanceSearchFormValues.seats && advanceSearchFormValues.seats.adultSeats ? advanceSearchFormValues.seats.adultSeats : 0 }
                                                                        })
                                                                    }}
                                                                    onChangeCommitted={(e, newValue) => {
                                                                        if (prevValue.childSeats !== newValue) {
                                                                            let sliderObj = {
                                                                                childSeats: newValue,
                                                                                adultSeats: advanceSearchFormValues.seats && advanceSearchFormValues.seats.adultSeats,
                                                                                freeDays: advanceSearchFormValues.freedays
                                                                            }
                                                                            modifySearch(STRINGS.INDEX, {
                                                                                vehicleType: vehicleType,
                                                                                transmissionOption: transmissionOption,
                                                                                fuelType: fuelType
                                                                            }, sliderObj)
                                                                            setPageIndex(STRINGS.INDEX)
                                                                            setPrevValue({ ...prevValue, childSeats: newValue })
                                                                        }
                                                                    }}
                                                                    aria-labelledby="continuous-slider" />
                                                                <span className="pl-3 value_filter"> {advanceSearchFormValues.seats && advanceSearchFormValues.seats.childSeats ? advanceSearchFormValues.seats.childSeats : 0}</span>
                                                            </div>
                                                        </li>
                                                        <li className="w-100">
                                                            <h6>{STRINGS.ADULT_SEAT_LABEL}</h6>
                                                            <div className="d-flex align-items-center">
                                                                <Slider value={advanceSearchFormValues.seats && advanceSearchFormValues.seats.adultSeats ? advanceSearchFormValues.seats.adultSeats : 0}
                                                                    max={25}
                                                                    onChange={(e, newValue) => {
                                                                        setAdvanceSearchValues({ ...advanceSearchFormValues, seats: { adultSeats: newValue, childSeats: advanceSearchFormValues.seats && advanceSearchFormValues.seats.childSeats ? advanceSearchFormValues.seats.childSeats : 0 } })
                                                                    }}
                                                                    onChangeCommitted={(e, newValue) => {
                                                                        if (prevValue.adultSeats !== newValue) {
                                                                            let sliderObj = {
                                                                                childSeats: advanceSearchFormValues.seats && advanceSearchFormValues.seats.childSeats,
                                                                                adultSeats: newValue,
                                                                                freeDays: advanceSearchFormValues.freedays
                                                                            }
                                                                            modifySearch(STRINGS.INDEX, {
                                                                                vehicleType: vehicleType,
                                                                                transmissionOption: transmissionOption,
                                                                                fuelType: fuelType
                                                                            }, sliderObj)
                                                                            setPageIndex(STRINGS.INDEX)
                                                                            setPrevValue({ ...prevValue, adultSeats: newValue })
                                                                        }
                                                                    }}
                                                                    aria-labelledby="continuous-slider" />
                                                                <span className="pl-3 value_filter"> {advanceSearchFormValues.seats && advanceSearchFormValues.seats.adultSeats ? advanceSearchFormValues.seats.adultSeats : 0}</span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card" >
                                            <div className="card-header" onClick={() => hideTextBox(2, ".card", "show")}>
                                                <h5 className="mb-0">{STRINGS.TRANSMISSION_LABEL}</h5>
                                            </div>
                                            <div className="collapse"  >
                                                <div className="card-body">
                                                    <ul className="check_list">

                                                        {transmissionList && transmissionList.length !== 0 ? transmissionList.map((tranmission, index) => {
                                                            return <li key={index}>
                                                                <div className="d-inline-block position-relative">
                                                                    <Checkbox checked={advanceSearchFormValues[tranmission.name] ? advanceSearchFormValues[tranmission.name] : false}
                                                                        onChange={(e) => {
                                                                            e.target.checked === true ? setFilters({ tranmission: tranmission._id }, tranmission.name) :
                                                                                removeFilter({ tranmission: tranmission._id }, tranmission.name)
                                                                        }} /><label>{tranmission.name}</label>
                                                                </div>
                                                            </li>
                                                        }) : ''}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card" >
                                            <div className="card-header" onClick={() => hideTextBox(3, ".card", "show")}>
                                                <h5 className="mb-0">{STRINGS.VEHICLE_TYPE_LABEL}</h5>
                                            </div>
                                            <div className="collapse" >
                                                <div className="card-body">
                                                    <ul className="check_list">
                                                        {vehicleList && vehicleList.length > 0 ? vehicleList.map((vehicleObj, index) => {
                                                            return (<li key={index}>
                                                                <div className="d-inline-block position-relative">
                                                                    <Checkbox
                                                                        checked={advanceSearchFormValues[vehicleObj.name.replace('&', 'And').replace(/\s+/g, '')] ? advanceSearchFormValues[vehicleObj.name.replace('&', 'And').replace(/\s+/g, '')] : false}
                                                                        onChange={(e) => {
                                                                            e.target.checked === true ? setFilters({ vehicleObj: vehicleObj._id }, vehicleObj.name.replace('&', 'And').replace(/\s+/g, '')) :
                                                                                removeFilter({ vehicleObj: vehicleObj._id }, vehicleObj.name.replace('&', 'And').replace(/\s+/g, ''))
                                                                        }} /><label>{vehicleObj.name}</label>
                                                                </div>
                                                            </li>)
                                                        }) : ''}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card" >
                                            <div className="card-header" onClick={() => hideTextBox(4, ".card", "show")}>
                                                <h5 className="mb-0">{STRINGS.FREE_DAYS_LABEL}</h5>
                                            </div>
                                            <div className="collapse"  >
                                                <div className="card-body">
                                                    <ul className="check_list">
                                                        <li>
                                                            <div className="d-flex align-items-center">
                                                                <Slider value={advanceSearchFormValues.freedays ? advanceSearchFormValues.freedays : 0}
                                                                    max={45}
                                                                    onChange={(e, newValue) => {

                                                                        setAdvanceSearchValues({ ...advanceSearchFormValues, freedays: newValue })
                                                                    }}
                                                                    onChangeCommitted={(e, newValue) => {
                                                                        if (prevValue.freedays !== newValue) {
                                                                            let sliderObj = {
                                                                                childSeats: advanceSearchFormValues.seats && advanceSearchFormValues.seats.childSeats,
                                                                                adultSeats: advanceSearchFormValues.seats && advanceSearchFormValues.seats.adultSeats,
                                                                                freeDays: newValue
                                                                            }

                                                                            modifySearch(STRINGS.INDEX, {
                                                                                vehicleType: vehicleType,
                                                                                transmissionOption: transmissionOption,
                                                                                fuelType: fuelType
                                                                            }, sliderObj)
                                                                            setAdvanceSearchValues({ ...advanceSearchFormValues, freedays: newValue })
                                                                            setPageIndex(STRINGS.INDEX)
                                                                            setPrevValue({ ...prevValue, freedays: newValue })
                                                                        }
                                                                    }

                                                                    }
                                                                    aria-labelledby="continuous-slider" />
                                                                <span className="pl-3 value_filter"> {advanceSearchFormValues.freedays ? advanceSearchFormValues.freedays : 0}</span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-100 text-center mb-3">
                                        <button className="btn btn-lg btn-outline-primary" disabled={disable} onClick={(e) => {
                                            e.preventDefault()

                                            setAdvanceSearchValues({
                                                Petrol: false, Diesel: false, Electric: false,
                                                Cars: false, PassengerVans: false, RecreationalVans: false, TrucksAndVans: false,
                                                Automatic: false, Manual: false, seats: { childSeats: 0, adultSeats: 0 }, freedays: 0,
                                                fuelType: [], vehicleType: [], transmissionOption: []
                                            })
                                            setFuelType([])
                                            setTransmissionOption([])
                                            setVehicleType([])
                                            modifySearch(STRINGS.INDEX, {
                                                vehicleType: [],
                                                transmissionOption: [],
                                                fuelType: []
                                            }, {
                                                childSeats: 0,
                                                adultSeats: 0,
                                                freeDays: 0
                                            })
                                            setPageIndex(STRINGS.INDEX)
                                        }}>{STRINGS.RESET_LABEL}</button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-9 col-md-8">
                                <div className="vehicle_cat rounded border">
                                    <div className="row">
                                        {vehicleList && vehicleList.length !== 0 ? vehicleList.map((vehicleObj, index) => {
                                            return (<div className="col-lg-3 col-6 text-center" key={index} onClick={() => {
                                                vehicleTypeSearch(vehicleObj)
                                            }} style={{ cursor: 'pointer' }}>
                                                <h5>{vehicleObj.name}</h5>
                                                <figure>
                                                    <img src={vehicleObj.URL} alt={vehicleObj.name} className="img-fluid" />
                                                </figure>
                                            </div>)
                                        }) : ''}
                                    </div>
                                </div>
                                {totalCount ? <h4>We have found {vehicleListing && totalCount} vehicles available {pickupData && pickupData.PickupLocation ? `from ${vehicleListing &&
                                    vehicleListing[0] && vehicleListing[0].pickupBranchData && vehicleListing[0].pickupBranchData.city}` : ''} {pickupData && pickupData.DropOffLocation ? `to ${pickupData.DropOffLocation}` : ''}</h4>
                                    : <h4>No vehicles found.</h4>}
                                <ul className="vehicle_lists">
                                    {vehicleListing && vehicleListing.length > 0 ? vehicleListing.map((vehicle, index) => {
                                        return <li className="rounded border" key={index}>
                                            <div className="row align-items-center">
                                                <div className="col-md-12 col-lg-3">
                                                    <figure>
                                                        <img src={vehicle && vehicle.vehicleData && vehicle.vehicleData.url[0]} alt="Recreational" class="img-fluid" />
                                                    </figure>
                                                </div>
                                                <div className="col-md-12 col-lg-9">
                                                    <div className="vehicle_info">
                                                        <h5>{vehicle && vehicle.vehicleData && vehicle.vehicleData.name}</h5>
                                                        <ul className="vehicles_tools">
                                                            <li>
                                                                <i><img src={require(`../../../../../../assets/icons/Fuel.svg`)} alt="Hatchback car" className="img-fluid" /></i>
                                                                {vehicle && vehicle.fuelTypeData && vehicle.fuelTypeData.fuelType} </li>

                                                            <li>
                                                                <i><img src={require(`../../../../../../assets/icons/Seats.svg`)} alt="Hatchback car" className="img-fluid" /></i>

                                                                {` ${vehicle && vehicle.vehicleData && vehicle.vehicleData.adultSeats}`} adult
                                    {vehicle && vehicle.vehicleData && vehicle.vehicleData.childSeats && vehicle.vehicleData.childSeats !== 0 ? `, ${vehicle.vehicleData.childSeats} child` : ''}
                                                            </li>

                                                            <li>
                                                                <i><img src={require(`../../../../../../assets/icons/Mediumluggage.svg`)} alt="" className="img-fluid" /></i>
                                                                {` ${vehicle && vehicle.vehicleData && vehicle.vehicleData.largeLuggageSpace}`} large,
                                                                {` ${vehicle && vehicle.vehicleData && vehicle.vehicleData.smallLuggageSpace}`} small

                                    </li>
                                                            <li><i><img src={require(`../../../../../../assets/driver/icons/doors_icon.svg`)} alt="" className="img-fluid" /></i>
                                                                {vehicle && vehicle.vehicleData && vehicle.vehicleData.numberOfDoor} doors</li>
                                                            <li><i><img src={require(`../../../../../../assets/driver/icons/ac_icon.svg`)} alt="" className="img-fluid" /></i>
                                                                {vehicle && vehicle.vehicleData && vehicle.vehicleData.airConditionType === true ? 'A/C' : 'Non A/C'}</li>
                                                            <li><i><img src={require(`../../../../../../assets/icons/Transmission.svg`)} alt="" className="img-fluid" /></i> {vehicle && vehicle.transmissionData && vehicle.transmissionData.name} </li>
                                                            <li>
                                                                <i><img src={require(`../../../../../../assets/icons/Vehicleyear.svg`)} alt="Hatchback car" className="img-fluid" /></i>
                                                                {`${vehicle && vehicle.vehicleData && vehicle.vehicleData.yearRange && vehicle.vehicleData.yearRange.from} - ${vehicle && vehicle.vehicleData && vehicle.vehicleData.yearRange && vehicle.vehicleData.yearRange.to}`}
                                                            </li>
                                                        </ul>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="reloc_info">
                                                <span><strong>This relocation includes:</strong>
                                                    {checkString(vehicle)}
                                                </span>
                                            </div>

                                            <div className="destination_info">
                                                <div className="row align-items-center">
                                                    <div className="col-lg-3 text-lg-left text-center">
                                                        <span className="btn btn-lg free_days">{STRINGS.FREE_DAYS_LABEL}: {(vehicle && vehicle.freeDays) ? (vehicle && vehicle.freeDays) : 0}</span>
                                                    </div>
                                                    <div className="col-lg-6 text-center">
                                                        <div className="dest_from">
                                                            <label></label>
                                                            <label>{vehicle && vehicle.pickupBranchData && vehicle.pickupBranchData.city} To {vehicle && vehicle.dropoffBranchData && vehicle.dropoffBranchData.city}</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 text-lg-right text-center">
                                                        <button className="btn btn-lg btn-secondary" onClick={(e) => {
                                                            e.preventDefault()
                                                            history.push(`${ROUTES.VIEW_VEHICLE}?id=${vehicle._id}`)
                                                            range({})
                                                            setPaidDay({ paid: 0, free: 0 })
                                                        }}>{STRINGS.VIEW_BTN_LABEL}</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    }) : ''}

                                </ul>
                                {
                                    vehicleListing && vehicleListing.length !== 0 ? <CustomPagination
                                        limit={STRINGS.VEHICLE_LIMIT}
                                        totalPages={totalCount}
                                        itemsCount={vehicleListing.length}
                                        currentPage={pageIndex + 1}
                                        onPageChange={(value) => {
                                            modifySearch(value && value.selected, {
                                                vehicleType: vehicleType,
                                                transmissionOption: transmissionOption,
                                                fuelType: fuelType
                                            }, {
                                                childSeats: advanceSearchFormValues.seats && advanceSearchFormValues.seats.childSeats,
                                                adultSeats: advanceSearchFormValues.seats && advanceSearchFormValues.seats.adultSeats,
                                                freeDays: advanceSearchFormValues.freedays
                                            })

                                            setPageIndex(value && value.selected)
                                            // let totalPage = document.getElementsByClassName('pagination')[0].childNodes
                                            // if(totalPage[totalPage.length-2].className === 'active'){
                                            //     totalPage[totalPage.length-1].style.dis
                                            // }
                                        }}
                                    /> : ''
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </ScrollToTop>
        </>
    )
}