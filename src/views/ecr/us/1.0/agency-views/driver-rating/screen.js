import React, { useState, useEffect } from 'react';
import './styles.scss';
const { defaultConfig: { PLATFORM } } = require(`../../../../../../config/default`);
const {
    ROUTES,
    LAYOUTS,
    LABELS,
    LIMITS,
    ELEMENT_ID
} = require(`../../../../../../shared/${PLATFORM}/constants`);
const { CustomPagination } = require(`../../../../../../components/${PLATFORM}/atoms/pagination`)

const { CustomTable } = require(`../../../../../../components/${PLATFORM}/atoms/custom-table`);
const { RatingAndComment } = require(`../../../../../../components/${PLATFORM}/molecules/rating-comment-modal`);
const { SnackbarWrapper } = require(`../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`);
export const Screen = ({
    unratedDriverData,
    unratedDriver = () => { },
    ratedDrivers = () => { },
    createNewListing = () => { },
    anyUpdate,
    ratedDriversData
}) => {

    useEffect(() => {
        unratedDriver({
            limit: LIMITS && LIMITS.limitPerPage, index: 0, sortType: unRatedSortType, sortKey: unRatedSortKey
        })
        ratedDrivers({
            limit: LIMITS && LIMITS.limitPerPage, index: 0, sortType: ratedSortType, sortKey: ratedSortKey
        })
    }, [])
    useEffect(() => {
        if (anyUpdate) {
            unratedDriver({
                limit: LIMITS && LIMITS.limitPerPage, index: unratedPageIndex, sortType: unRatedSortType, sortKey: unRatedSortKey
            })
            ratedDrivers({
                limit: LIMITS && LIMITS.limitPerPage, index: ratedPageIndex, sortType: ratedSortType, sortKey: ratedSortKey
            })
        }
    }, [anyUpdate])

    const [ratedPageIndex, setRatedPageIndex] = useState(0)
    const [unratedPageIndex, setUnRatedPageIndex] = useState(0)
    const [modalVisible, setModalVisible] = useState(false)
    const [editData, setEditdata] = useState({
        id: '',
        starRating: '',
        commentTodriver: "",
        commentForEcr: '',
        clickedOn: ""
    })
    const [commentModal, setCommentModal] = useState(false)
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [unRatedSortKey, unRatedSetSortKey] = useState(ELEMENT_ID.lastUpdated)
    const [unRatedSortType, unRatedSortSetType] = useState(-1)
    const [ratedSortType, ratedsetSortType] = useState(-1)
    const [ratedSortKey, ratedSetSortKey] = useState(ELEMENT_ID.lastUpdated)
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });
    const commentModalVisibility = (data) => {
        setEditdata(data)
        setModalVisible(true)
    }
    // unratedDriver
    const unRatedSorting = (element) => {

        switch (element) {
            case ELEMENT_ID.vehicle:
                if (unRatedSortKey === ELEMENT_ID.vehicle) {
                    unratedDriver({ index: unratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: unRatedSortKey, sortType: -1 * unRatedSortType })
                    unRatedSortSetType(-1 * unRatedSortType);
                }
                else {
                    unratedDriver({ index: unratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: ELEMENT_ID.vehicle, sortType: -1 * unRatedSortType })
                    unRatedSortSetType(-1 * unRatedSortType);
                    unRatedSetSortKey(ELEMENT_ID.vehicle);
                }
                break;
            case ELEMENT_ID.driverName:
                if (unRatedSortKey === ELEMENT_ID.driverName) {
                    unratedDriver({ index: unratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: unRatedSortKey, sortType: -1 * unRatedSortType })
                    unRatedSortSetType(-1 * unRatedSortType);
                }
                else {
                    unratedDriver({ index: unratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: ELEMENT_ID.driverName, sortType: -1 * unRatedSortType })
                    unRatedSortSetType(-1 * unRatedSortType);
                    unRatedSetSortKey(ELEMENT_ID.driverName);
                }
                break;
            case ELEMENT_ID.rego:
                if (unRatedSortKey === ELEMENT_ID.rego) {
                    unratedDriver({ index: unratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: unRatedSortKey, sortType: -1 * unRatedSortType })
                    unRatedSortSetType(-1 * unRatedSortType);
                }
                else {
                    unratedDriver({ index: unratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: ELEMENT_ID.rego, sortType: -1 * unRatedSortType })
                    unRatedSortSetType(-1 * unRatedSortType);
                    unRatedSetSortKey(ELEMENT_ID.rego);
                }
                break;
            case ELEMENT_ID.pickUpLocation:
                if (unRatedSortKey === ELEMENT_ID.pickUpLocation) {
                    unratedDriver({ index: unratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: unRatedSortKey, sortType: -1 * unRatedSortType })
                    unRatedSortSetType(-1 * unRatedSortType);
                }
                else {
                    unratedDriver({ index: unratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: ELEMENT_ID.pickUpLocation, sortType: -1 * unRatedSortType })
                    unRatedSortSetType(-1 * unRatedSortType);
                    unRatedSetSortKey(ELEMENT_ID.pickUpLocation);
                }
                break;
            case ELEMENT_ID.pickUpDate:
                if (unRatedSortKey === ELEMENT_ID.pickUpDate) {
                    unratedDriver({ index: unratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: unRatedSortKey, sortType: -1 * unRatedSortType })
                    unRatedSortSetType(-1 * unRatedSortType);
                }
                else {
                    unratedDriver({ index: unratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: ELEMENT_ID.pickUpDate, sortType: -1 * unRatedSortType })
                    unRatedSortSetType(-1 * unRatedSortType);
                    unRatedSetSortKey(ELEMENT_ID.pickUpDate);
                }
                break;
            case ELEMENT_ID.dropOffLocation:
                if (unRatedSortKey === ELEMENT_ID.dropOffLocation) {
                    unratedDriver({ index: unratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: unRatedSortKey, sortType: -1 * unRatedSortType })
                    unRatedSortSetType(-1 * unRatedSortType);
                }
                else {
                    unratedDriver({ index: unratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: ELEMENT_ID.dropOffLocation, sortType: -1 * unRatedSortType })
                    unRatedSortSetType(-1 * unRatedSortType);
                    unRatedSetSortKey(ELEMENT_ID.dropOffLocation);
                }
                break;
            case ELEMENT_ID.dropOffDate:
                if (unRatedSortKey === ELEMENT_ID.dropOffDate) {
                    unratedDriver({ index: unratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: unRatedSortKey, sortType: -1 * unRatedSortType })
                    unRatedSortSetType(-1 * unRatedSortType);
                }
                else {
                    unratedDriver({ index: unratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: ELEMENT_ID.dropOffDate, sortType: -1 * unRatedSortType })
                    unRatedSortSetType(-1 * unRatedSortType);
                    unRatedSetSortKey(ELEMENT_ID.dropOffDate);
                }
                break;
            case ELEMENT_ID.lastUpdated:
                if (unRatedSortKey === ELEMENT_ID.lastUpdated) {
                    unratedDriver({ index: unratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: unRatedSortKey, sortType: -1 * unRatedSortType })
                    unRatedSortSetType(-1 * unRatedSortType);
                }
                else {
                    unratedDriver({ index: unratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: ELEMENT_ID.lastUpdated, sortType: -1 * unRatedSortType })
                    unRatedSortSetType(-1 * unRatedSortType);
                    unRatedSetSortKey(ELEMENT_ID.lastUpdated);
                }
                break;

            default: break;
        }
    }

    const rateSorting = (element) => {

        switch (element) {
            case ELEMENT_ID.vehicle:
                if (ratedSortKey === ELEMENT_ID.vehicle) {
                    ratedDrivers({ index: ratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: ratedSortKey, sortType: -1 * ratedSortType })
                    ratedsetSortType(-1 * ratedSortType);
                }
                else {
                    ratedDrivers({ index: ratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: ELEMENT_ID.vehicle, sortType: -1 * ratedSortType })
                    ratedsetSortType(-1 * ratedSortType);
                    ratedSetSortKey(ELEMENT_ID.vehicle);
                }
                break;
            case ELEMENT_ID.driverName:
                if (ratedSortKey === ELEMENT_ID.driverName) {
                    ratedDrivers({ index: ratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: ratedSortKey, sortType: -1 * ratedSortType })
                    ratedsetSortType(-1 * ratedSortType);
                }
                else {
                    ratedDrivers({ index: ratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: ELEMENT_ID.driverName, sortType: -1 * ratedSortType })
                    ratedsetSortType(-1 * ratedSortType);
                    ratedSetSortKey(ELEMENT_ID.driverName);
                }
                break;
            case ELEMENT_ID.rego:
                if (ratedSortKey === ELEMENT_ID.rego) {
                    ratedDrivers({ index: ratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: ratedSortKey, sortType: -1 * ratedSortType })
                    ratedsetSortType(-1 * ratedSortType);
                }
                else {
                    ratedDrivers({ index: ratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: ELEMENT_ID.rego, sortType: -1 * ratedSortType })
                    ratedsetSortType(-1 * ratedSortType);
                    ratedSetSortKey(ELEMENT_ID.rego);
                }
                break;
            case ELEMENT_ID.pickUpLocation:
                if (ratedSortKey === ELEMENT_ID.pickUpLocation) {
                    ratedDrivers({ index: ratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: ratedSortKey, sortType: -1 * ratedSortType })
                    ratedsetSortType(-1 * ratedSortType);
                }
                else {
                    ratedDrivers({ index: ratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: ELEMENT_ID.pickUpLocation, sortType: -1 * ratedSortType })
                    ratedsetSortType(-1 * ratedSortType);
                    ratedSetSortKey(ELEMENT_ID.pickUpLocation);
                }
                break;
            case ELEMENT_ID.pickUpDate:
                if (ratedSortKey === ELEMENT_ID.pickUpDate) {
                    ratedDrivers({ index: ratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: ratedSortKey, sortType: -1 * ratedSortType })
                    ratedsetSortType(-1 * ratedSortType);
                }
                else {
                    ratedDrivers({ index: ratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: ELEMENT_ID.pickUpDate, sortType: -1 * ratedSortType })
                    ratedsetSortType(-1 * ratedSortType);
                    ratedSetSortKey(ELEMENT_ID.pickUpDate);
                }
                break;
            case ELEMENT_ID.dropOffLocation:
                if (ratedSortKey === ELEMENT_ID.dropOffLocation) {
                    ratedDrivers({ index: ratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: ratedSortKey, sortType: -1 * ratedSortType })
                    ratedsetSortType(-1 * ratedSortType);
                }
                else {
                    ratedDrivers({ index: ratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: ELEMENT_ID.dropOffLocation, sortType: -1 * ratedSortType })
                    ratedsetSortType(-1 * ratedSortType);
                    ratedSetSortKey(ELEMENT_ID.dropOffLocation);
                }
                break;
            case ELEMENT_ID.dropOffDate:
                if (ratedSortKey === ELEMENT_ID.dropOffDate) {
                    ratedDrivers({ index: ratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: ratedSortKey, sortType: -1 * ratedSortType })
                    ratedsetSortType(-1 * ratedSortType);
                }
                else {
                    ratedDrivers({ index: ratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: ELEMENT_ID.dropOffDate, sortType: -1 * ratedSortType })
                    ratedsetSortType(-1 * ratedSortType);
                    ratedSetSortKey(ELEMENT_ID.dropOffDate);
                }
                break;
            case ELEMENT_ID.lastUpdated:
                if (ratedSortKey === ELEMENT_ID.lastUpdated) {
                    ratedDrivers({ index: ratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: ratedSortKey, sortType: -1 * ratedSortType })
                    ratedsetSortType(-1 * ratedSortType);
                }
                else {
                    ratedDrivers({ index: ratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: ELEMENT_ID.lastUpdated, sortType: -1 * ratedSortType })
                    ratedsetSortType(-1 * ratedSortType);
                    ratedSetSortKey(ELEMENT_ID.lastUpdated);
                }
                break;
            case ELEMENT_ID.starRating:
                if (ratedSortKey === ELEMENT_ID.starRating) {
                    ratedDrivers({ index: ratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: ratedSortKey, sortType: -1 * ratedSortType })
                    ratedsetSortType(-1 * ratedSortType);
                }
                else {
                    ratedDrivers({ index: ratedPageIndex, limit: LIMITS && LIMITS.limitPerPage, sortKey: ELEMENT_ID.starRating, sortType: -1 * ratedSortType })
                    ratedsetSortType(-1 * ratedSortType);
                    ratedSetSortKey(ELEMENT_ID.starRating);
                }
                break;
            default: break;
        }
    }

    return (
        <div className={'app-main_outer'}>
            <SnackbarWrapper
                visible={openSnackBar}
                onClose={() => setOpenSnackbar(false)}
                variant={snackbarData.variant}
                message={snackbarData.message}
            />
            <div className="container-fluid">
                <div className="panel-body">
                    <div className="driver_sec">
                        <div className="row" onClick={e => e.stopPropagation()}>
                            {!!(unratedDriverData && unratedDriverData.totalCount) && <div className="col-md-12">
                                <h5 className="page-title mt-3 mb-0">{LABELS.ratePageHeader}</h5>
                            </div>}
                            {!!((unratedDriverData && unratedDriverData.totalCount)) && <div className="col-md-12 mt-3">
                                <h6>YOU HAVE '{(unratedDriverData && unratedDriverData.totalCount)}' BOOKINGS TO BE RATED - PLEASE RATE IT NOW</h6>
                            </div>}
                        </div>
                        {modalVisible && <RatingAndComment
                            editData={editData}
                            initialRating={editData && editData.starRating}
                            commentForEcr={editData && editData.commentForEcr}
                            commentTodriver={editData && editData.commentTodriver}
                            clickedOn={editData && editData.clickedOn}
                            onClose={() => {
                                setModalVisible(false)
                            }}
                            onSubmit={(data) => {
                                const { id } = editData
                                createNewListing({ ...data, id },
                                    (response) => {
                                        setSnackBarData({
                                            variant: response.status ? 'success' : 'error',
                                            message: response.msg || 'error'
                                        });
                                        setOpenSnackbar(true)
                                        setModalVisible(false)

                                    }, (response) => {
                                        setSnackBarData({
                                            variant: response.status ? 'success' : 'error',
                                            message: response.msg || 'error'
                                        });
                                        setOpenSnackbar(true)
                                    }
                                )
                            }}
                        />}
                        {!!(unratedDriverData && unratedDriverData.totalCount) &&
                            <div className='table-pagination'>
                                <CustomTable
                                    sort={unRatedSorting}
                                    setCommentModal={setCommentModal}
                                    ROUTES={ROUTES}
                                    tableType='yetToRate'
                                    tablePage='driverRating'
                                    commentModal={commentModal}
                                    setModalVisible={commentModalVisibility}
                                    tableHeader={LAYOUTS.driverYettoRate}
                                    tableData={unratedDriverData && unratedDriverData.bookings}
                                    onFavoriteChange={(data) => {
                                        const { isFavorite } = data
                                        createNewListing(data,
                                            (response) => {
                                                setSnackBarData({
                                                    variant: response.status ? 'success' : 'error',
                                                    message: isFavorite ? "Marked as favourite." : "Removed from favourites."
                                                });
                                                setOpenSnackbar(true)
                                                setModalVisible(false)

                                            }, (response) => {
                                                setSnackBarData({
                                                    variant: response.status ? 'success' : 'error',
                                                    message: response.msg || 'error'
                                                });
                                                setOpenSnackbar(true)
                                            })
                                    }}
                                />

                            </div>
                        }
                        {
                            ((unratedDriverData && unratedDriverData.totalCount) > (LIMITS && LIMITS.limitPerPage)) &&
                            <CustomPagination
                                limit={(LIMITS && LIMITS.limitPerPage)}
                                currentPage={unratedPageIndex + 1}
                                totalPages={(unratedDriverData && unratedDriverData.totalCount)}
                                itemsCount={(unratedDriverData && unratedDriverData.bookings && unratedDriverData.bookings.length)}
                                onPageChange={(value) => {
                                    if (!window.navigator.onLine) {
                                        setSnackBarData({
                                            variant: 'error',
                                            message: 'You appear to be offline. Please check your connection.'
                                        });
                                        setOpenSnackbar(true)
                                    }
                                    else {
                                        document.getElementsByTagName('body')[0].scrollTo(0, 10)

                                        unratedDriver({
                                            limit: (LIMITS && LIMITS.limitPerPage), index: value && value.selected, sortType: unRatedSortType, sortKey: unRatedSortKey
                                        }, () => { }, () => { })
                                        setUnRatedPageIndex(value && value.selected)
                                    }
                                }}
                            />}
                        <div className="row" onClick={e => e.stopPropagation()}>
                            <div className="col-md-12">
                                <h6 className="page-title mt-4">{LABELS.pastRatings}</h6>
                            </div>
                        </div>
                        <div className='table-pagination'>

                            <CustomTable
                                setCommentModal={setCommentModal}
                                ROUTES={ROUTES}
                                tableType='ratedTable'
                                sort={rateSorting}
                                tablePage='driverRating'
                                onFavoriteChange={(data) => {
                                    const { isFavorite } = data
                                    createNewListing(data,
                                        (response) => {
                                            setSnackBarData({
                                                variant: response.status ? 'success' : 'error',
                                                message: isFavorite ? "Marked as favourite." : "Removed from favourites."
                                            });
                                            setOpenSnackbar(true)
                                            setModalVisible(false)

                                        }, (response) => {
                                            setSnackBarData({
                                                variant: response.status ? 'success' : 'error',
                                                message: response.msg || 'error'
                                            });
                                            setOpenSnackbar(true)
                                        })
                                }}
                                commentModal={commentModal}
                                setModalVisible={commentModalVisibility}
                                tableHeader={LAYOUTS.driverRatedTable}
                                tableData={ratedDriversData && ratedDriversData.bookings} />


                        </div>
                        {
                            ((ratedDriversData && ratedDriversData.totalCount) > (LIMITS && LIMITS.limitPerPage)) &&
                            <CustomPagination
                                limit={(LIMITS && LIMITS.limitPerPage)}
                                currentPage={ratedPageIndex + 1}
                                totalPages={(ratedDriversData && ratedDriversData.totalCount)}
                                itemsCount={(ratedDriversData && ratedDriversData.bookings && ratedDriversData.bookings.length)}
                                onPageChange={(value) => {
                                    if (!window.navigator.onLine) {
                                        setSnackBarData({
                                            variant: 'error',
                                            message: 'You appear to be offline. Please check your connection.'
                                        });
                                        setOpenSnackbar(true)
                                    }
                                    else {
                                        ratedDrivers({
                                            limit: (LIMITS && LIMITS.limitPerPage), index: value && value.selected, sortType: ratedSortType, sortKey: ratedSortKey

                                        }, () => { }, () => { })
                                        setRatedPageIndex(value && value.selected)
                                    }
                                }}
                            />}
                    </div>
                </div>
            </div>
        </div>
    )
}