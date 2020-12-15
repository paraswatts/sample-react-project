import React, { useEffect, useState } from 'react';
import moment from 'moment'
import { useLocation, useHistory } from 'react-router-dom'
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../../config/default`);
const { DriverTable } = require(`../../../../../../../components/${PLATFORM}/atoms/driver-table`);
const { DRIVER_TRIPS, LABELS } = require(`../../../../../../../shared/${PLATFORM}/constants`);
const { CustomPagination } = require(`../../../../../../../components/${PLATFORM}/atoms/pagination`)
const { STRINGS } = require(`../../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`);

export const Screen = ({ getDriverTrips,
    getDriverPastTrip, getDriverUpcomingTripList, tripIndex,
    getDriverPastTripList, getCancelledTrips, getCancelledTripData, pastTripListCount, tableIndex }) => {

    const [upcomingTripTable, setUpcomingTripTable] = useState([])
    const [pastTripTable, setPastTripTable] = useState([])
    const [cancelledTriptable, setCancelledTripTable] = useState([])
    const [activeRow, setActiveRow] = useState({})
    const [upcomingActiveRow, setUpcomingActiveRow] = useState(null)
    const [upcomingActiveRowData, setUpcomingActiveRowData] = useState({})
    const history = useHistory()
    let postData = { limit: STRINGS.TRIP_LIMIT, index: 0 }
    const [visibility, setVisibility] = useState(false)

    const [UpcomingpageIndex, setUpcomingpageIndex] = useState(0)
    const [PastpageIndex, setPastpageIndex] = useState(0)
    const [CancelledpageIndex, setCancelledpageIndex] = useState(0)


    useEffect(() => {
        getUpcomingTripFunction(postData)
        getPastTripFunction(postData)
        getCancelledTripFunction(postData)

    }, [])

    useEffect(() => {
        // console.log(tripIndex, 'tripIndex')
        if (tripIndex && Object.keys(tripIndex).length > 0) {
            setUpcomingpageIndex(tripIndex.upcoming)
        }
    }, [tripIndex])

    useEffect(() => {
        // console.log(UpcomingpageIndex, 'UpcomingpageIndex')
    }, [UpcomingpageIndex])

    const getUpcomingTripFunction = (data) => {
        let upcomingTripReq = Object.keys(data)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            ).join('&');
        getDriverTrips(upcomingTripReq, (response) => {

        }, (error) => { })
    }

    const getPastTripFunction = (data) => {
        let pastTripReq = Object.keys(data)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            ).join('&');
        getDriverPastTrip(pastTripReq, (response) => {

        }, (error) => { })
    }

    const getCancelledTripFunction = (data) => {
        let cancelTripReq = Object.keys(data)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            ).join('&');
        getCancelledTrips(cancelTripReq, () => { }, () => { })
    }

    useEffect(() => {
        let upcomingArray = []
        if (getDriverUpcomingTripList && getDriverUpcomingTripList.trips && getDriverUpcomingTripList.trips.length > 0) {
            getDriverUpcomingTripList.trips.map(trip => {
                upcomingArray.push({
                    status: trip && trip.status ? trip.status : '',
                    agencyName: trip && trip.agency && trip.agency.name ? trip.agency.name : '',
                    vehicle: trip && trip.vehicle && trip.vehicle.name ? trip.vehicle.name : '',
                    pickupLocation: trip && trip.pickupBranch && trip.pickupBranch.city ? trip.pickupBranch.city : '',
                    pickupdate:
                        trip && trip.pickupDate ? moment(trip.pickupDate).format("DD/MM/YYYY") : '',
                    dropoffLocation: trip && trip.dropoffBranch && trip.dropoffBranch.city ? trip.dropoffBranch.city : '',
                    dropoffdate: trip && trip.dropoffDate ? moment(trip.dropoffDate).format("DD/MM/YYYY") : '',
                    reference: trip && trip.reference ? trip.reference : 'Nil',
                    id: trip && trip.bookingId ? trip.bookingId : 'Nil', action: 'setting'
                })
            })
            setUpcomingTripTable(upcomingArray)
        }
    }, [getDriverUpcomingTripList])

    useEffect(() => {
        let pastArray = []
        if (getDriverPastTripList && getDriverPastTripList.trips && getDriverPastTripList.trips.length > 0) {

            getDriverPastTripList.trips.map(trip => {
                pastArray.push({
                    agencyName: trip && trip.agency && trip.agency.name ? trip.agency.name : '',
                    vehicle: trip && trip.vehicle && trip.vehicle.name ? trip.vehicle.name : '',
                    pickupLocation: trip && trip.pickupBranch && trip.pickupBranch.city ? trip.pickupBranch.city : '',
                    pickupdate:
                        trip.pickupDate ? moment(trip.pickupDate).format("DD/MM/YYYY") : '',
                    dropoffLocation: trip && trip.dropoffBranch && trip.dropoffBranch.city ? trip.dropoffBranch.city : '',
                    dropoffdate: trip.dropoffDate ? moment(trip.dropoffDate).format("DD/MM/YYYY") : '',
                    reference: trip && trip.reference ? trip.reference : 'Nil',
                    id: trip && trip.bookingId ? trip.bookingId : 'Nil',
                    driverRatedOn: trip && trip.driverRatedOn ? moment(trip.driverRatedOn).format("DD/MM/YYYY") : 'Nil',
                    rateForDriver: trip && trip.rateForDriver ? trip.rateForDriver : '',
                    rateForAgency: trip && trip.rateForAgency ? trip.rateForAgency : 0,
                    edit: trip && trip.rateForAgency > 0 ? 'Edit' : ''
                })
            })
            setPastTripTable(pastArray)
        }
    }, [getDriverPastTripList])



    useEffect(() => {
        let cancelledArray = []
        if (getCancelledTripData && getCancelledTripData.trips && getCancelledTripData.trips.length > 0) {
            getCancelledTripData.trips.map(trip => {
                cancelledArray.push({
                    cancelledBy: trip && trip.cancelledBy === 1 ? 'By You' : 'By Agency',
                    vehicle: trip && trip.vehicle ? trip.vehicle : '',
                    agencyName: trip && trip.agencyName ? trip.agencyName : '',
                    pickupLocation: trip && trip.pickupLocation ? trip.pickupLocation : '',
                    startDate: trip.startDate ? moment(trip.startDate).format("DD/MM/YYYY") : '',
                    dropoffLocation: trip && trip.dropoffLocation ? trip.dropoffLocation : '',
                    endDate: trip.endDate ? moment(trip.endDate).format("DD/MM/YYYY") : '',
                    rego: trip.rego ? trip.rego : 'Nil',
                    id: trip.bookingId ? trip.bookingId : 'Nil'
                })
            })
            setCancelledTripTable(cancelledArray)
        }
    }, [getCancelledTripData])

    useEffect(() => {
    }, [upcomingTripTable])

    useEffect(() => {
    }, [pastTripTable])
    useEffect(() => {
    }, [cancelledTriptable])

    return (
        <div className="app-main_outer driver_head">
            <div className="container-fluid">
                <h4 className="mb-4">{LABELS.driverTripLabel}</h4>
                <h4 className="mb-3">{LABELS.upcomingTripLabel}</h4>
                <div className="upcoming_trips">
                    {getDriverUpcomingTripList && getDriverUpcomingTripList.trips &&
                        getDriverUpcomingTripList.trips.length > 0 ?
                        <>
                            <DriverTable
                                tableHeader={DRIVER_TRIPS.upcomingTrips}
                                tableData={upcomingTripTable}
                                upcomingActiveRow={upcomingActiveRow}
                                visibility={visibility}
                                onActionClick={(index) => {
                                    if (index === upcomingActiveRow) {
                                        setVisibility(!visibility)
                                    } else {
                                        setVisibility(true)
                                    }
                                    setUpcomingActiveRow(index)
                                    setUpcomingActiveRowData(getDriverUpcomingTripList.trips[index])
                                }}
                                upcomingActiveRowData={upcomingActiveRowData}
                                setvisibility={() => { setVisibility(false) }}
                            />
                            <CustomPagination
                                limit={STRINGS.TRIP_LIMIT}
                                totalPages={getDriverUpcomingTripList.totalCount}
                                itemsCount={upcomingTripTable.length}
                                currentPage={UpcomingpageIndex + 1}
                                onPageChange={(value) => {
                                    getUpcomingTripFunction({ limit: STRINGS.TRIP_LIMIT, index: value && value.selected })
                                    setUpcomingpageIndex(value && value.selected)
                                    tableIndex({ ...tripIndex, upcoming: value && value.selected })
                                }}
                            /> </>
                        : 'No Upcoming Trip yet.'}

                    <h4 className="mt-3 mb-4 mt-md-4">{LABELS.pastTripLabel}</h4>
                    {getDriverPastTripList && getDriverPastTripList.trips && getDriverPastTripList.trips.length > 0 ?
                        <> <DriverTable
                            tableHeader={DRIVER_TRIPS.pastTrips}
                            tableData={pastTripTable}
                            onRowClick={(val) => {
                                setActiveRow(getDriverPastTripList.trips[val])
                            }}
                            activeRow={activeRow}
                            history={history}

                        />
                            <CustomPagination
                                limit={STRINGS.TRIP_LIMIT}
                                totalPages={getDriverPastTripList.totalCount}
                                itemsCount={pastTripTable.length}
                                currentPage={PastpageIndex + 1}
                                onPageChange={(value) => {
                                    getPastTripFunction({ limit: STRINGS.TRIP_LIMIT, index: value && value.selected })
                                    setPastpageIndex(value && value.selected)
                                    tableIndex({ ...tripIndex, past: value && value.selected })
                                }}
                            /> </> : 'No Past Trip yet.'}

                    <h4 className="mt-3 mb-4 mt-md-4">{LABELS.cancelledtripLabel}</h4>
                    {getCancelledTripData && getCancelledTripData.trips && getCancelledTripData.trips.length > 0 ?
                        <>  <DriverTable
                            tableHeader={DRIVER_TRIPS.cancelledTrips}
                            tableData={cancelledTriptable}
                        />
                            <CustomPagination
                                limit={STRINGS.TRIP_LIMIT}
                                totalPages={getCancelledTripData.totalCount}
                                itemsCount={cancelledTriptable.length}
                                currentPage={CancelledpageIndex + 1}
                                onPageChange={(value) => {
                                    getCancelledTripFunction({ limit: STRINGS.TRIP_LIMIT, index: value && value.selected })
                                    setCancelledpageIndex(value && value.selected)
                                }}
                            /></> : 'No Cancelled Trip yet.'}

                </div>  </div></div>)
}