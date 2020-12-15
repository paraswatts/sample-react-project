
import React, { useState, useEffect, useCallback } from "react";
import moment from 'moment'
import { DateRangePicker } from 'react-date-range';
import './style.scss';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom'
const queryString = require('query-string');
const { defaultConfig: { PLATFORM } } = require(`../../../../config/default`);
const { stopLoader, startLoader, setPaidDays, range,
    setReturnDateForVehicle, SelectedTravelDates } = require(`../../../../redux/${PLATFORM}/actions`);
const { ROUTES } = require(`../../../../shared/${PLATFORM}/constants`);

export const DateRangePick = ({ vehicle, setPaidDay, range, getRange, setReturnDateForVehicle, prevLocation, SelectedTravelDate }) => {
    const oneDay = 24 * 60 * 60 * 1000;
    let dayLag = new Date().getTime() <= new Date(vehicle && vehicle.pickupDate).getTime() ?
        Math.round(Math.abs((new Date(vehicle && vehicle.pickupDate) - new Date()) / oneDay)) + 1
        : 0
    const IntialStartDate = (new Date().getTime() <= new Date(vehicle && vehicle.pickupDate).getTime() ?
        new Date(vehicle && vehicle.pickupDate) :
        new Date(moment(vehicle && vehicle.pickupDate).add(dayLag, 'days').format("MM/DD/YYYY")))

    const IntialEndDate = new Date(vehicle && vehicle.dropoffDate)

    const TotalAvailableDay = Math.round(Math.abs((IntialStartDate - IntialEndDate) / oneDay)) + 1;
    let selectableDay;
    const [availableDayRange, setAvailableDayRange] = useState({
        startDate: getRange && Object.keys(getRange).length > 0
            ? new Date(getRange && getRange.availableStartDate) : IntialStartDate,
        endDate: getRange && Object.keys(getRange).length > 0 ?
            new Date(getRange && getRange.availableEndDate) : IntialEndDate,
        key: 'range',
        color: '#1DD1A1'
    })
    const [freeDayRange, setFreeDayRange] = useState({
        startDate: (getRange && Object.keys(getRange).length > 0 ? new Date(getRange && getRange.freeStartDate) : null),
        endDate: (getRange && Object.keys(getRange).length > 0 ? new Date(getRange && getRange.freeEndDate) : null),
        key: 'range',
        color: '#FF6B6B'
    })
    const [paidDayRange, setPaidDayRange] = useState({
        startDate: (getRange && Object.keys(getRange).length > 0 ? new Date(getRange && getRange.paidStartDate) : null),
        endDate: (getRange && Object.keys(getRange).length > 0 ? new Date(getRange && getRange.paidEndDate) : null),
        key: 'range',
        color: '#fac802'
    })
    const [NextAvailableDayRange, setNextAvailableDayRange] = useState({
        startDate: (getRange && Object.keys(getRange).length > 0 ? new Date(getRange && getRange.nextAvailableStartDate) : null),
        endDate: (getRange && Object.keys(getRange).length > 0 ? new Date(getRange && getRange.nextAvailableEndDate) : null),
        key: 'range',
        color: '#1DD1A1'
    })
    const [focusedRange, setFocusedRange] = useState(0)
    const [rangeIndex, setRangeIndex] = useState(1)

    let history = useHistory()
    useEffect(() => {

    }, [vehicle])

    const [rangeArr, setRangeArr] = useState([
        availableDayRange, freeDayRange, paidDayRange, NextAvailableDayRange
    ])

    const selectTravelDate = (ranges) => {
        let newStartDate = ranges.range.startDate
        let newEndDate = ranges.range.endDate
        SelectedTravelDate({ pickup: newStartDate, dropoff: newEndDate })
        if (newStartDate.toDateString() === newEndDate.toDateString()) {
            setRangeIndex(1)
        } else { setRangeIndex(0) }
        let freeday = vehicle && vehicle.freeDays ? vehicle.freeDays : 0

        let selecteddays = Math.round(Math.abs((newStartDate - newEndDate) / oneDay)) + 1;
        selectableDay = freeday + (vehicle.extraPaidDays ? vehicle.extraPaidDays : 0)

        let pDayRange = { ...paidDayRange }
        let fDayRange = { ...freeDayRange }

        let next = {}

        if (selecteddays < selectableDay) {
            if (freeday < selecteddays) {
                fDayRange = {
                    ...fDayRange,
                    startDate: newStartDate,
                    endDate: new Date(moment(newStartDate).add(freeday - 1, 'days').format("MM/DD/YYYY")),
                }
                vehicle && vehicle.extraPaidDays ? pDayRange = {
                    ...pDayRange,
                    startDate: new Date(moment(newStartDate).add(freeday, 'days').format("MM/DD/YYYY")),
                    endDate: new Date(moment(newStartDate).add(selecteddays - 1, 'days').format("MM/DD/YYYY")),
                } : pDayRange = {
                    ...pDayRange,
                    startDate: null,
                    endDate: null
                }
            } else {
                fDayRange = {
                    ...fDayRange,
                    startDate: newStartDate,
                    endDate: new Date(moment(newStartDate).add(selecteddays - 1, 'days').format("MM/DD/YYYY")),
                }
                pDayRange = {
                    ...pDayRange,
                    startDate: null,
                    endDate: null,
                }
            }
            next = {
                ...NextAvailableDayRange,
                startDate: pDayRange.endDate !== null ?
                    new Date(moment(pDayRange.endDate).add(1, 'days').format("MM/DD/YYYY")) : new Date(moment(fDayRange.endDate).add(1, 'days').format("MM/DD/YYYY")),
                endDate: IntialEndDate
            }
        } else if (selecteddays >= selectableDay) {
            let end = selecteddays - selectableDay
            fDayRange = {
                ...fDayRange,
                startDate: newStartDate,
                endDate: new Date(moment(newStartDate).add(freeday - 1, 'days').format("MM/DD/YYYY")),
            }
            if (freeday < selecteddays) {
                if (vehicle && vehicle.extraPaidDays) {
                    pDayRange = {
                        ...pDayRange,
                        startDate: new Date(moment(fDayRange.endDate).add(1, 'days').format("MM/DD/YYYY")),
                        endDate: new Date(moment(newEndDate).subtract(end, 'days').format("MM/DD/YYYY")),
                    }
                    next = {
                        ...NextAvailableDayRange,
                        startDate: new Date(moment(pDayRange.endDate).add(1, 'days').format("MM/DD/YYYY")),
                        endDate: IntialEndDate
                    }
                } else {
                    pDayRange = {
                        ...pDayRange,
                        startDate: null,
                        endDate: null,
                    }

                    next = {
                        ...NextAvailableDayRange,
                        startDate: new Date(moment(fDayRange.endDate).add(1, 'days').format("MM/DD/YYYY")),
                        endDate: IntialEndDate
                    }
                }
            } else {
                pDayRange = {
                    ...pDayRange,
                    startDate: null,
                    endDate: null,
                }
                next = {
                    ...NextAvailableDayRange,
                    startDate: new Date(moment(fDayRange.endDate).add(1, 'days').format("MM/DD/YYYY")),
                    endDate: IntialEndDate
                }
            }
        }

        setFreeDayRange(fDayRange)
        setPaidDayRange(pDayRange)
        setAvailableRange(newStartDate, newEndDate, fDayRange, pDayRange, next, selecteddays)
    }

    const setAvailableRange = (newStartDate, newEndDate, fRange, pRange, next, selecteddays) => {
        let aRange = {}
        let nRange = {}
        if ((newStartDate.toDateString() === IntialStartDate.toDateString())
            && (newEndDate.toDateString() === IntialEndDate.toDateString())) {
            // console.log(1)
            aRange = {
                ...availableDayRange,
                startDate: null,
                endDate: null,
            }
            setAvailableDayRange(aRange)
            if (fRange.startDate.toDateString() === newStartDate.toDateString() &&
                fRange.endDate.toDateString() === fRange.startDate.toDateString() && selecteddays !== 1) {
                nRange = next
            } else {
                nRange = {
                    ...NextAvailableDayRange,
                    startDate: null,
                    endDate: null,
                }
            }
            // console.log(2)
            setNextAvailableDayRange(nRange)
        }
        if ((newStartDate.toDateString() !== IntialStartDate.toDateString())
            && (newEndDate.toDateString() !== IntialEndDate.toDateString())) {
            // console.log(3)
            aRange = {
                ...availableDayRange,
                startDate: IntialStartDate,
                endDate: new Date(moment(newStartDate).subtract(1, 'days').format("MM/DD/YYYY")),
            }
            setAvailableDayRange(aRange)
            nRange = next
            setNextAvailableDayRange(nRange)
        }
        if ((newStartDate.toDateString() === IntialStartDate.toDateString())
            && (newEndDate.toDateString() !== IntialEndDate.toDateString())) {
            // console.log(3)
            aRange = {
                ...availableDayRange,
                startDate: null,
                endDate: null,
            }
            setAvailableDayRange(aRange)
            nRange = next
            setNextAvailableDayRange(nRange)
        }
        if ((newStartDate.toDateString() !== IntialStartDate.toDateString())
            && (newEndDate.toDateString() === IntialEndDate.toDateString())) {
            // console.log(4)
            aRange = {
                ...availableDayRange,
                startDate: IntialStartDate,
                endDate: new Date(moment(newStartDate).subtract(1, 'days').format("MM/DD/YYYY")),
            }

            if ((pRange.endDate !== null && pRange.endDate.toDateString() !== newEndDate.toDateString()) ||
                (fRange.endDate !== null && fRange.endDate.toDateString() !== newEndDate.toDateString())) {
                nRange = next
            }
            else {
                nRange = {
                    ...NextAvailableDayRange,
                    startDate: null,
                    endDate: null,
                }
            }
            setAvailableDayRange(aRange)
            setNextAvailableDayRange(nRange)
        }
        let dayObj = {
            paid: pRange.startDate === null ? 0 : Math.round(Math.abs((pRange.startDate - pRange.endDate) / oneDay)) + 1,
            free: fRange.startDate === null ? 0 : Math.round(Math.abs((fRange.startDate - fRange.endDate) / oneDay)) + 1
        }
        setPaidDay(dayObj)
        checkEmptyObj([fRange, pRange, aRange, nRange])
        range({
            paidStartDate: pRange.startDate,
            paidEndDate: pRange.endDate,
            freeStartDate: fRange.startDate,
            freeEndDate: fRange.endDate,
            availableStartDate: aRange.startDate,
            availableEndDate: aRange.endDate,
            nextAvailableStartDate: nRange.startDate,
            nextAvailableEndDate: nRange.endDate
        })
        setReturnDateForVehicle({ pickupdate: newStartDate, returnDate: pRange.endDate !== null ? pRange.endDate : fRange.endDate })
    }

    const clearSelection = () => {
        if (paidDayRange.startDate === null && freeDayRange.startDate === null && NextAvailableDayRange.startDate === null) {
            return false
        } else {
            let pRange = {
                ...paidDayRange,
                startDate: null,
                endDate: null,
            }
            let fRange = {
                ...freeDayRange,
                startDate: null,
                endDate: null,
            }
            let aRange = {
                ...availableDayRange,
                startDate: IntialStartDate,
                endDate: IntialEndDate
            }
            setFreeDayRange(fRange)
            setPaidDayRange(pRange)
            setAvailableDayRange(aRange)
            setPaidDay({ paid: 0, free: 0 })
            checkEmptyObj([aRange])
            range({})
        }
    }

    useEffect(() => {
        console.log('availableDayRange', history.location)
        const parsed = queryString.parse(history.location.search);

        if (parsed.invite) {
            clearSelection()
        } else {
            checkEmptyObj([availableDayRange, freeDayRange, paidDayRange, NextAvailableDayRange], rangeIndex)
        }
    }, [])


    const checkEmptyObj = (arr) => {

        let arr1 = arr.filter(obj => obj.startDate !== null)
        let getPaidDayIndex;
        let getFreeDayIndex;
        let getAvailIndex;

        arr1.map((x, index) => {
            if (x.color === '#FF6B6B') { getFreeDayIndex = index }
            else if (x.color === '#fac802') { getPaidDayIndex = index }
            else if (x.color === '#1DD1A1') { getAvailIndex = index }
        })

        if (getFreeDayIndex) {
            setFocusedRange(getFreeDayIndex)
        } else if (getFreeDayIndex == undefined && getPaidDayIndex) {
            setFocusedRange(getPaidDayIndex)
        } else if (getFreeDayIndex == undefined && getPaidDayIndex == undefined) {
            setFocusedRange(getAvailIndex)
        }
        setRangeArr(arr1)
    }

    return (
        <div>
            <DateRangePicker
                ranges={rangeArr}
                onChange={selectTravelDate}
                minDate={IntialStartDate}
                maxDate={IntialEndDate}
                focusedRange={[focusedRange, rangeIndex]}
            />
            <a id="clear-selection" onClick={clearSelection}>Clear Selection</a>
        </div>
    )
}
const mapStateToProps = (state, props) => {
    return {
        getRange: state.DriverReducer.range,
        prevLocation: state.CommonReducer.prevLocation,
        // vehicle: state.DriverReducer.getVehicleInformation,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        setPaidDay: (data) => dispatch(setPaidDays(data)),
        range: (data) => dispatch(range(data)),
        setReturnDateForVehicle: (data) => dispatch(setReturnDateForVehicle(data)),
        SelectedTravelDate: (data) => dispatch(SelectedTravelDates(data))
    }
}

export const DateRangePickerComponent = connect(mapStateToProps, mapDispatchToProps)(DateRangePick)