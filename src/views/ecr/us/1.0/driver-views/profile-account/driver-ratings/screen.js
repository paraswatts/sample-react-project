import React, { useEffect, useState } from 'react';
import moment from 'moment'
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../../config/default`);
const { DriverTable } = require(`../../../../../../../components/${PLATFORM}/atoms/driver-table`);
const { DRIVER_RATINGS, LABELS } = require(`../../../../../../../shared/${PLATFORM}/constants`);
const { STRINGS } = require(`../../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`)
const { StarRatingComponent } = require(`../../../../../../../components/${PLATFORM}/atoms/star-component`);
const { CustomPagination } = require(`../../../../../../../components/${PLATFORM}/atoms/pagination`)

export const Screen = ({ getDriverRatings, getDriverRatingsData, overallRating,getProfileInformation,getDriverProfile }) => {

    const [ratingsTable, setRatingsTripTable] = useState([])
    const [activeRow, setActiveRow] = useState(null)
    const [activeRowdata, setActiveRowData] = useState({})
    const [ratingIndex, setRatingIndex] = useState(0)
    let postData = { limit: 5, index: 0 }
    useEffect(() => {
        getDriverProfile(() => {},() => {})
        getRatingFunction(postData)
    }, [])

    const getRatingFunction = (postData) => {
        let data = Object.keys(postData)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(postData[k])
            ).join('&');
        getDriverRatings(data, () => { }, () => { })
    }

    useEffect(() => {
        let ratingsArray = []
        getDriverRatingsData &&
            getDriverRatingsData.data && getDriverRatingsData.data.length > 0 && getDriverRatingsData.data.map(trip => {
                ratingsArray.push({
                    agencyName: trip.agency.name,
                    vehicle: trip.vehicle.name, Rego: trip.rego ? trip.rego : 'Nil', pickupLocation: trip.pickupBranch.city, pickupdate:
                        trip.pickupDate ? moment(trip.pickupDate).format("DD/MM/YYYY") : '',
                    dropoffLocation: trip.dropoffBranch.city, dropoffdate: trip.dropoffDate ? moment(trip.dropoffDate).format("DD/MM/YYYY") : '',
                    ID: trip.bookingId ? trip.bookingId : 'Nil', rateForDriver: trip.rateForDriver, comment: 'comment'
                })
            })
        setRatingsTripTable(ratingsArray)
    }, [getDriverRatingsData])

    return (<div className="app-main_outer driver_head">
        <div className="container-fluid">
        <h5 className="row align-items-center no-gutters mb-3"><span className="pr-3">{LABELS.overallScoreLabel} {getProfileInformation && getProfileInformation.overallRating ? getProfileInformation.overallRating % 1 ? getProfileInformation.overallRating.toFixed(2) : getProfileInformation.overallRating: 0} {STRINGS.OUT_OF} 5 </span><StarRatingComponent readonly={true} initialRating={getProfileInformation && getProfileInformation.overallRating} /></h5>
        {getDriverRatingsData && getDriverRatingsData.data && getDriverRatingsData.data.length > 0 ?
            <>
            <DriverTable
                tableHeader={DRIVER_RATINGS}
                tableData={ratingsTable}
                onClickRatingActiveRow={(index) => {
                    setActiveRow(index)
                    setActiveRowData(getDriverRatingsData.data[index])
                }}
                activeRatingRow={activeRowdata}
            />
            <CustomPagination
                limit={STRINGS.TRIP_LIMIT}
                totalPages={getDriverRatingsData.totalCount}
                itemsCount={ratingsTable.length}
                currentPage={ratingIndex + 1}
                onPageChange={(value) => {
                    getRatingFunction({ limit: STRINGS.TRIP_LIMIT, index: value && value.selected })
                    setRatingIndex(value && value.selected)
                }}
            /> 
            </>
            : 'No rating received yet.'}
            </div>
    </div>)
}