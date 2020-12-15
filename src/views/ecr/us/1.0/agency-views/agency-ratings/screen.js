import React, { useState, useEffect } from 'react';
const { defaultConfig: { PLATFORM } } = require(`../../../../../../config/default`);
const {
    LAYOUTS, LIMITS,
    ELEMENT_ID,
    LABELS,
    DRIVER_RATING_STATUS
} = require(`../../../../../../shared/${PLATFORM}/constants`);
const { CustomTable } = require(`../../../../../../components/${PLATFORM}/atoms/custom-table`);
const { CustomPagination } = require(`../../../../../../components/${PLATFORM}/atoms/pagination`)
const { SnackbarWrapper } = require(`../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`);

export const Screen = ({ getAgencyRatings, anyUpdate, agencyRatedData, changeStatus }) => {
    const [index, setIndex] = useState(0)
    const [sortType, setSortType] = useState(-1)
    const [sortKey, setSortKey] = useState(ELEMENT_ID.createdAt)
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });

    useEffect(() => {
        getAgencyRatings({ index, limit: LIMITS.limitPerPage, sortKey: ELEMENT_ID.createdAt, sortType }, (response) => {
            setSnackBarData({
                variant: response.status ? 'success' : 'error',
                message: response.msg || 'error'
            });
            setOpenSnackbar(true)
        }, (response) => {
            setSnackBarData({
                variant: response.status ? 'success' : 'error',
                message: response.msg || 'error'
            });
            setOpenSnackbar(true)
        })
    }, [])

    useEffect(() => {
        getAgencyRatings({ index, limit: LIMITS.limitPerPage, sortKey, sortType }, (response) => {
            setSnackBarData({
                variant: response.status ? 'success' : 'error',
                message: response.msg || 'error'
            });
            setOpenSnackbar(true)
        }, (response) => {
            setSnackBarData({
                variant: response.status ? 'success' : 'error',
                message: response.msg || 'error'
            });
            setOpenSnackbar(true)
        })
    }, [anyUpdate])

    const sort = (element) => {
        switch (element) {
            case ELEMENT_ID.starRating:
                if (sortKey === ELEMENT_ID.starRating) {
                    getAgencyRatings({ index: index, limit: LIMITS && LIMITS.limitPerPage, sortKey: sortKey, sortType: -1 * sortType })
                    setSortType(-1 * sortType);
                }
                else {
                    getAgencyRatings({ index: index, limit: LIMITS && LIMITS.limitPerPage, sortKey: ELEMENT_ID.starRating, sortType: -1 * sortType })
                    setSortType(-1 * sortType);
                    setSortKey(ELEMENT_ID.starRating);
                }
                break;

            case ELEMENT_ID.driverName:
                if (sortKey === ELEMENT_ID.driverName) {
                    getAgencyRatings({ index: index, limit: LIMITS && LIMITS.limitPerPage, sortKey: sortKey, sortType: -1 * sortType })
                    setSortType(-1 * sortType);
                }
                else {
                    getAgencyRatings({ index: index, limit: LIMITS && LIMITS.limitPerPage, sortKey: ELEMENT_ID.driverName, sortType: -1 * sortType })
                    setSortType(-1 * sortType);
                    setSortKey(ELEMENT_ID.driverName);
                }
                break;
            case ELEMENT_ID.vehicle:
                if (sortKey === ELEMENT_ID.vehicle) {
                    getAgencyRatings({ index: index, limit: LIMITS && LIMITS.limitPerPage, sortKey: sortKey, sortType: -1 * sortType })
                    setSortType(-1 * sortType);
                }
                else {
                    getAgencyRatings({ index: index, limit: LIMITS && LIMITS.limitPerPage, sortKey: ELEMENT_ID.vehicle, sortType: -1 * sortType })
                    setSortType(-1 * sortType);
                    setSortKey(ELEMENT_ID.vehicle);
                }
                break;
            case ELEMENT_ID.rego:
                if (sortKey === ELEMENT_ID.rego) {
                    getAgencyRatings({ index: index, limit: LIMITS && LIMITS.limitPerPage, sortKey: sortKey, sortType: -1 * sortType })
                    setSortType(-1 * sortType);
                }
                else {
                    getAgencyRatings({ index: index, limit: LIMITS && LIMITS.limitPerPage, sortKey: ELEMENT_ID.rego, sortType: -1 * sortType })
                    setSortType(-1 * sortType);
                    setSortKey(ELEMENT_ID.rego);
                }
                break;
            case ELEMENT_ID.pickUpLocation:
                if (sortKey === ELEMENT_ID.pickUpLocation) {
                    getAgencyRatings({ index: index, limit: LIMITS && LIMITS.limitPerPage, sortKey: sortKey, sortType: -1 * sortType })
                    setSortType(-1 * sortType);
                }
                else {
                    getAgencyRatings({ index: index, limit: LIMITS && LIMITS.limitPerPage, sortKey: ELEMENT_ID.pickUpLocation, sortType: -1 * sortType })
                    setSortType(-1 * sortType);
                    setSortKey(ELEMENT_ID.pickUpLocation);
                }
                break;
            case ELEMENT_ID.pickUpDate:
                if (sortKey === ELEMENT_ID.pickUpDate) {
                    getAgencyRatings({ index: index, limit: LIMITS && LIMITS.limitPerPage, sortKey: sortKey, sortType: -1 * sortType })
                    setSortType(-1 * sortType);
                }
                else {
                    getAgencyRatings({ index: index, limit: LIMITS && LIMITS.limitPerPage, sortKey: ELEMENT_ID.pickUpDate, sortType: -1 * sortType })
                    setSortType(-1 * sortType);
                    setSortKey(ELEMENT_ID.pickUpDate);
                }
                break;
            case ELEMENT_ID.dropOffLocation:
                if (sortKey === ELEMENT_ID.dropOffLocation) {
                    getAgencyRatings({ index: index, limit: LIMITS && LIMITS.limitPerPage, sortKey: sortKey, sortType: -1 * sortType })
                    setSortType(-1 * sortType);
                }
                else {
                    getAgencyRatings({ index: index, limit: LIMITS && LIMITS.limitPerPage, sortKey: ELEMENT_ID.dropOffLocation, sortType: -1 * sortType })
                    setSortType(-1 * sortType);
                    setSortKey(ELEMENT_ID.dropOffLocation);
                }
                break;
            case ELEMENT_ID.dropOffDate:
                if (sortKey === ELEMENT_ID.dropOffDate) {
                    getAgencyRatings({ index: index, limit: LIMITS && LIMITS.limitPerPage, sortKey: sortKey, sortType: -1 * sortType })
                    setSortType(-1 * sortType);
                }
                else {
                    getAgencyRatings({ index: index, limit: LIMITS && LIMITS.limitPerPage, sortKey: ELEMENT_ID.dropOffDate, sortType: -1 * sortType })
                    setSortType(-1 * sortType);
                    setSortKey(ELEMENT_ID.dropOffDate);
                }
                break;
            case ELEMENT_ID.lastUpdated:
                if (sortKey === ELEMENT_ID.lastUpdated) {
                    getAgencyRatings({ index: index, limit: LIMITS && LIMITS.limitPerPage, sortKey: sortKey, sortType: -1 * sortType })
                    setSortType(-1 * sortType);
                }
                else {
                    getAgencyRatings({ index: index, limit: LIMITS && LIMITS.limitPerPage, sortKey: ELEMENT_ID.lastUpdated, sortType: -1 * sortType })
                    setSortType(-1 * sortType);
                    setSortKey(ELEMENT_ID.lastUpdated);
                }
                break;

            default: break;
        }
    }
    const onStatusToggle = (data) => {
        changeStatus(data, (response) => {
            setSnackBarData({
                variant: response.status ? 'success' : 'error',
                message: response.msg || 'error'
            });
            setOpenSnackbar(true)
        }, (response) => {
            setSnackBarData({
                variant: response.status ? 'success' : 'error',
                message: response.msg || 'error'
            });
            setOpenSnackbar(true)
        })
    }

    return (
        <div className="app-main_outer">
            <SnackbarWrapper
                visible={openSnackBar}
                onClose={() => setOpenSnackbar(false)}
                variant={snackbarData.variant}
                message={snackbarData.message}
            />
            <div className="container-fluid">
                <div className="row" onClick={e => e.stopPropagation()}>
                    <div className="col-md-12">
                        <h5 className="page-title mt-3 mb-0">{LABELS.RatingByDrivers}</h5>
                    </div>
                </div>
                <div className='table-pagination mt-4'>
                    <CustomTable
                        DRIVER_RATING_STATUS={DRIVER_RATING_STATUS}
                        tableHeader={LAYOUTS.agencyRatingTable}
                        tableData={agencyRatedData && agencyRatedData.listings}
                        onStatusChange={onStatusToggle}
                        sort={sort}
                        tablePage="driverRating"
                        ratedByDriver={true}
                        tableType='ratedTable'
                    />
                </div>
                {
                    ((agencyRatedData && agencyRatedData.totalCount) > (LIMITS && LIMITS.limitPerPage)) && <CustomPagination
                        limit={(LIMITS && LIMITS.limitPerPage)}
                        currentPage={index + 1}
                        totalPages={(agencyRatedData && agencyRatedData.totalCount)}
                        itemsCount={(agencyRatedData && agencyRatedData.listings && agencyRatedData.listings.length)}
                        onPageChange={(value) => {
                            if (!window.navigator.onLine) {
                                setSnackBarData({
                                    variant: 'error',
                                    message: 'You appear to be offline. Please check your connection.'
                                });
                                setOpenSnackbar(true)
                            }
                            else {
                                getAgencyRatings({
                                    limit: (LIMITS && LIMITS.limitPerPage), index: value && value.selected, sortType: sortType, sortKey: sortKey

                                }, (response) => {
                                    setSnackBarData({
                                        variant: response.status ? 'success' : 'error',
                                        message: response.msg || 'error'
                                    });
                                    setOpenSnackbar(true)
                                }, (response) => {
                                    setSnackBarData({
                                        variant: response.status ? 'success' : 'error',
                                        message: response.msg || 'error'
                                    });
                                    setOpenSnackbar(true)
                                })
                                setIndex(value && value.selected)
                            }
                        }}
                    />
                }
            </div>
        </div>
    )
}