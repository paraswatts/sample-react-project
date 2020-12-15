import React, { useEffect, useState } from 'react';
import "./style.scss";
import { BookingForm } from './booking-form';
import { DriverDetail } from './driver-detail-popup'
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../config/default`);
const {
    PAGE_TITLES,
    ROUTES,
    DASHBOARD_LISTING,
    LAYOUTS,
    ACTION_MENU,
    BOOKING_STATUS,
    DATE_FORMAT,
    LABELS,
    SETTING_ICON,
    DASHBOARD_LISTING_TABLE
} = require(`../../../../../../shared/${PLATFORM}/constants`);
const { LIMITS, ELEMENT_ID } = require(`../../../../../../shared/${PLATFORM}/constants/constants`);
const { CustomTable } = require(`../../../../../../components/${PLATFORM}/atoms/custom-table`);
const { SnackbarWrapper } = require(`../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`);
const { CustomPagination } = require(`../../../../../../components/${PLATFORM}/atoms/pagination`)
const { DecisionPopup } = require(`../../../../../../components/${PLATFORM}/atoms/decision-popup`)


export const Screen = ({
    history,
    getDashboardData,
    updateStatus,
    getDashboardTableData,
    userData,
    dashboardData,
    dashboardTableData,
    anyUpdate,
    changeStatusDashboard,
    setFormStep1Data,
    setFormStep2Data,
    insuranceData,
    setFormStep3Data,
    ferryData,
    fuelOfferData,
    getInsuranceList,
    getFerry,
    getFuelOffer,
    getTerms,
    termsData,
    deleteList,
    saveStepNo,
    getToken,
    unratedDriver = () => { },
    unratedDriverData,
    updateRequest,
    updateSuccess,
    newListingId,
    getListing,
    getPackages = () => { },
    regoSet = () => { },
    analyticData,
    agencyViews,
    selectedList
}) => {
    const postData = (data) => {
        let req = Object.keys(data)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            ).join('&');
        return req
    }
    useEffect(() => {
        if (userData) {
            let req = postData({ limit: '99999' })
            setFormStep1Data({});
            setFormStep2Data({});
            setFormStep3Data({})
            getInsuranceList(req)
            getPackages()
            getFerry()
            getToken()
            unratedDriver({ limit: LIMITS && LIMITS.limitPerPage, index: 0, sortKey: ELEMENT_ID.lastUpdated, sortType: -1 })
            getTerms()
            getFuelOffer()
            getDashboardTableData({
                agencyId: userData && userData.userAgency && userData.userAgency._id,
                limit: LIMITS && LIMITS.limitPerPage, index: 0
            }, () => { }, (response) => {
                setSnackBarData({
                    variant: response.status ? 'success' : 'error',
                    message: response.msg
                });
                setOpenSnackbar(true)
            })
            getDashboardData({ agencyId: userData && userData.userAgency && userData.userAgency._id, dashboardData: true }, () => { }, (response) => {
                setSnackBarData({
                    variant: response.status ? 'success' : 'error',
                    message: response.msg
                });
                setOpenSnackbar(true)
            })
            let requ = postData({ agencyId: userData && userData.userAgency && userData.userAgency._id })
            analyticData('', () => { }, () => { })
        }
    }, [userData])

    useEffect(() => {
        if (anyUpdate) {
            let req = postData({ limit: '99999' })
            setFormStep1Data({});
            setFormStep2Data({});
            setFormStep3Data({})
            getInsuranceList(req)
            getPackages()
            getFerry()
            getToken()
            unratedDriver({ limit: LIMITS && LIMITS.limitPerPage, index: 0, sortKey: ELEMENT_ID.lastUpdated, sortType: -1 })
            getTerms()
            getFuelOffer()
            getDashboardTableData({
                agencyId: userData && userData.userAgency && userData.userAgency._id,
                limit: LIMITS && LIMITS.limitPerPage, index: pageIndex
            }, () => { }, (response) => {
                setSnackBarData({
                    variant: response.status ? 'success' : 'error',
                    message: response.msg
                });
                setOpenSnackbar(true)
            })
            getDashboardData({ agencyId: userData && userData.userAgency && userData.userAgency._id, dashboardData: true }, () => { }, (response) => {
                setSnackBarData({
                    variant: response.status ? 'success' : 'error',
                    message: response.msg
                });
                setOpenSnackbar(true)
            })
            let requ = postData({ agencyId: userData && userData.userAgency && userData.userAgency._id })
            analyticData('', () => { }, () => { })
        }
    }, [anyUpdate])


    const [modalVisibility, setModalVisibility] = useState(false)
    const [tableData, setTableData] = useState([])
    const [onStatusChange, setOnStatusChange] = useState(false)
    const [bookingModal, setBookingModal] = useState(false)

    const [openAction, setActionOpen] = useState(false);
    const [deleteData, setDeleteData] = useState()
    const [indexToOpen, setIndexToOpen] = useState()
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [filterApplied, setFilterApplied] = useState(false);
    const [updateStatusData, setUpdateStatusData] = useState('')
    const [dialogContent, setDialogContent] = useState({
        title: 'Update Status',
        body: 'Are you sure you want to update the status of this listing?'
    })

    const [driverDetailModalVisible, setDriverModalVisible] = useState(false)
    const [driverDetailContent, setDriverModalContent] = useState({});

    const dummyUserData = {
        name: 'Test User',
        rating: 4,
        email: 'test.user@yopmail.com',
        priorRelocation: 3,
        city: 'Delhi',
        phone: '235462246246'
    }

    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });
    const [pageIndex, setPageIndex] = useState(0)

    const getData = (statusCode) => {

        for (let index in dashboardData) {
            if (dashboardData[index] && dashboardData[index]._id && dashboardData[index]._id.status === statusCode) {
                let count = 0;
                // let count = dashboardData[index] && dashboardData[index].totalCount
                if (statusCode === 5) {
                    let getCancelD = dashboardData.filter(obj => obj._id.status === 4)
                    let getCancelA = dashboardData.filter(obj => obj._id.status === 5)
                    let countA = getCancelA[0] && getCancelA[0].totalCount ? getCancelA[0].totalCount : 0
                    let countD = getCancelD[0] && getCancelD[0].totalCount ? getCancelD[0].totalCount : 0
                    count = countA + countD
                } if (statusCode === 4) {
                    return agencyViews
                }
                else {
                    count = dashboardData[index] && dashboardData[index].totalCount
                }
                return count
            } else {
                if (statusCode === 4) {
                    return agencyViews
                } else if (statusCode === 5) {
                    let getCancelD = dashboardData.filter(obj => obj._id.status === 4)
                    let getCancelA = dashboardData.filter(obj => obj._id.status === 5)
                    let countA = getCancelA[0] && getCancelA[0].totalCount ? getCancelA[0].totalCount : 0
                    let countD = getCancelD[0] && getCancelD[0].totalCount ? getCancelD[0].totalCount : 0
                    return countA + countD
                }
            }

        }
    }
    const onViewClick = () => {
        history.replace(ROUTES.PAGEVIEWS)
    }

    // const sorting = (element) => {

    //     switch (element) {
    //         case LABELS.name:
    //             if (filter === FILTER_TYPES_FOR_CHALLENGES.NAME) {
    //                 setSortType(-1 * sortType);
    //                 setSortAscending(!sortAscending);
    //             }
    //             else {
    //                 setSortType(1);
    //                 setSortAscending(!sortAscending);
    //             }
    //             setFilterType(FILTER_TYPES_FOR_CHALLENGES.NAME);
    //             setChallengePage(1);
    //             updateActivePage(1);
    //             break;
    //         case LABELS.type:
    //             if (filter === FILTER_TYPES_FOR_CHALLENGES.TYPE) {
    //                 setSortType(-1 * sortType);
    //                 setSortAscending(!sortAscending);
    //             }
    //             else {
    //                 setSortType(1);
    //                 setSortAscending(!sortAscending);
    //             }
    //             setFilterType(FILTER_TYPES_FOR_CHALLENGES.TYPE);
    //             setChallengePage(1);
    //             updateActivePage(1);
    //             break;
    //         case LABELS.startDate:
    //             if (filter === FILTER_TYPES_FOR_CHALLENGES.START_DATE) {
    //                 setSortType(-1 * sortType);
    //                 setSortAscending(!sortAscending);
    //             }
    //             else {
    //                 setSortType(1);
    //                 setSortAscending(!sortAscending);
    //             }
    //             setFilterType(FILTER_TYPES_FOR_CHALLENGES.START_DATE);
    //             setChallengePage(1);
    //             updateActivePage(1);
    //             break;
    //         case LABELS.endDate:
    //             if (filter === FILTER_TYPES_FOR_CHALLENGES.END_DATE) {
    //                 setSortType(-1 * sortType);
    //                 setSortAscending(!sortAscending);
    //             }
    //             else {
    //                 setSortType(1);
    //                 setSortAscending(!sortAscending);
    //             }
    //             setFilterType(FILTER_TYPES_FOR_CHALLENGES.END_DATE);
    //             setChallengePage(1);
    //             updateActivePage(1);
    //             break;
    //         default: break;
    //     }
    // }

    return (
        <div>
            {
                bookingModal && <BookingForm
                    setOnStatusChange={setOnStatusChange}
                    modalVisibilityHandler={() => {
                        updateRequest()
                        setBookingModal(false)
                        updateSuccess()
                        setTimeout(() => updateRequest(), 0)
                    }}
                    onSubmit={(rego) => {
                        regoSet({ a: 'adsa' }, () => { setBookingModal(false) }, () => { })
                        changeStatusDashboard({ ...updateStatusData, rego }, (response) => {
                            setSnackBarData({
                                variant: response.status ? 'success' : 'error',
                                message: response.msg || 'error'
                            });
                            setOpenSnackbar(true)
                            setActionOpen(false)
                            setOnStatusChange(false)
                        }, (response) => {
                            updateRequest()
                            setSnackBarData({
                                variant: response.status ? 'success' : 'error',
                                message: response.msg || 'error'
                            });
                            setOpenSnackbar(true)
                            updateSuccess()
                            setTimeout(() => updateRequest(), 0)
                        })
                    }}
                />
            }
            <SnackbarWrapper
                visible={openSnackBar}
                onClose={() => setOpenSnackbar(false)}
                variant={snackbarData.variant}
                message={snackbarData.message}
            />
            <DecisionPopup
                modalVisibility={modalVisibility}
                dialogTitle={'Delete Listing'}
                dialogContent={'Are you sure, you want to delete this listing?'}
                confirmButtonTitle={'Yes'}
                rejectButtonTitle={'No'}
                onConfirmation={() => {
                    let goPreviousPage = false;
                    if ((dashboardTableData && dashboardTableData.data && dashboardTableData.data.length) === 1) {
                        goPreviousPage = true
                    }
                    deleteList(deleteData, (response) => {

                        setSnackBarData({
                            variant: response.status ? 'success' : 'error',
                            message: response.msg || 'error'
                        });
                        setOpenSnackbar(true)
                        setActionOpen(false)
                        if ((pageIndex > 0) && goPreviousPage) {
                            getDashboardTableData({
                                agencyId: userData && userData.userAgency && userData.userAgency._id,
                                limit: LIMITS && LIMITS.limitPerPage, index: pageIndex - 1
                            }, () => { }, (response) => {
                                setSnackBarData({
                                    variant: response.status ? 'success' : 'error',
                                    message: response.msg
                                });
                                setOpenSnackbar(true)
                            })
                            setPageIndex(pageIndex - 1)
                        }
                        setModalVisibility(false)

                    }, (response) => {
                        setSnackBarData({
                            variant: response.status ? 'success' : 'error',
                            message: response.msg || 'error'
                        });
                        setOpenSnackbar(true)
                    }
                    )
                }}
                onRejection={() => {
                    setModalVisibility(false)
                }}
            />
            <DecisionPopup
                modalVisibility={onStatusChange}
                dialogTitle={dialogContent.title}
                dialogContent={dialogContent.body}
                confirmButtonTitle={'Confirm'}
                rejectButtonTitle={'Cancel'}
                onConfirmation={() => {
                    if ((updateStatusData && updateStatusData.status) === BOOKING_STATUS.BOOKED) {
                        setBookingModal(true)
                        setOnStatusChange(false)
                    }
                    else {
                        changeStatusDashboard(updateStatusData, (response) => {
                            setSnackBarData({
                                variant: response.status ? 'success' : 'error',
                                message: response.msg || 'error'
                            });
                            setOpenSnackbar(true)
                            setActionOpen(false)
                            setOnStatusChange(false)
                            setDialogContent({ ...dialogContent, body: 'Are you sure you want to update the status of this listing?' })
                        }, (response) => {
                            setSnackBarData({
                                variant: response.status ? 'success' : 'error',
                                message: response.msg || 'error'
                            });
                            setOpenSnackbar(true)
                        })
                    }
                }
                }
                onRejection={() => {
                    updateRequest()
                    setOnStatusChange(false)
                    updateSuccess()
                    setTimeout(() => updateRequest(), 0)
                }}
            />



            <title>{PAGE_TITLES.dashboard}</title>
            <div className="app-main_outer" onClick={() => { setActionOpen(false) }}>
                <div className="container-fluid">
                    <div className="panel-body">
                        <div className="d-flex flex-md-row flex-column-reverse justify-content-between align-items-center">
                            <h4 className="page-title my-3 my-md-0"> Welcome back, {(userData && userData.name) || '-'} from {(userData && userData.userAgency && userData.userAgency.name) || '-'}</h4>
                            <button className="btn btn-lg btn-primary" onClick={() => {
                                saveStepNo(1)
                                setFormStep1Data({})
                                setFormStep2Data({})
                                setFormStep3Data({})
                                history.push(ROUTES.ADD_NEW_LIST)
                            }}>{LABELS.addNewListing}</button>
                        </div>

                        <div className="d-flex justify-content-between align-items-center my-4">
                            <h6 className="weight-6">{LABELS.hereYourDashboard}</h6>
                            <div style={{ flexDirection: 'row' }}>
                                {filterApplied && <span style={{ marginRight: '5px' }} onClick={() => {
                                    setFilterApplied(false);
                                    getDashboardTableData({
                                        agencyId: userData && userData.userAgency && userData.userAgency._id,
                                        limit: LIMITS && LIMITS.limitPerPage, index: 0
                                    }, () => { }, (response) => {
                                        setSnackBarData({
                                            variant: response.status ? 'success' : 'error',
                                            message: response.msg
                                        });
                                        setOpenSnackbar(true)
                                    })
                                }} className="badge badge-grey">Clear Filters</span>}
                                <span style={{ marginLeft: '5px' }} className="badge badge-grey">Last 7 days</span>
                            </div>
                        </div>

                        <div className="row row-eq-height">
                            {DASHBOARD_LISTING.map((item, index) => {
                                let value = getData(item.statusCode)

                                return (<a className="col-md-4 col-sm-6 text-center mb-4 cursor" key={index + ''}
                                    onClick={() => {
                                        if (item.statusCode === 5) {
                                            selectedList(11)
                                        }
                                        else if (item.statusCode === 4) {
                                            onViewClick()
                                            return
                                        }
                                        else {
                                            selectedList(item.statusCode)
                                        }
                                        getListing({ status: item.statusCode === 5 ? 11 : item.statusCode, index: 0, limit: LIMITS && LIMITS.limitPerPage, sortKey: ELEMENT_ID.lastUpdated, sortType: -1 })
                                    }}>
                                    <div className={`card-block ${item.class}`}>
                                        <h4>{item.elementName}</h4>
                                        <h1>{value !== undefined ? value : '0'}</h1>
                                        <div className="w-100 text-right" onClick={() => setFilterApplied(true)}>
                                            <span>{LABELS.view}</span>
                                        </div>
                                    </div>
                                </a>)
                            })}
                        </div>

                        {!!(unratedDriverData && unratedDriverData.totalCount) && <div className="row mb-4 mb-md-5">
                            <div className="col-lg-6 col-md-8">
                                <div className="d-flex align-items-center justify-content-between rate_it">
                                    <span>YOU HAVE '{unratedDriverData && unratedDriverData.totalCount}' BOOKINGS TO BE RATED - PLEASE RATE IT NOW</span>
                                    <button className="btn btn-sm btn-primary"
                                        onClick={
                                            () => {
                                                history.push(ROUTES.DRIVER_RATING)
                                            }
                                        }
                                    >{LABELS.go}</button>
                                </div>
                            </div>
                        </div>}

                        {/* {table and pagination components} */}
                        {driverDetailModalVisible && <DriverDetail
                            driver={driverDetailContent}
                            onReject={(data) => {
                                changeStatusDashboard({ id: data.id, status: BOOKING_STATUS.CANCELLED_BY_AGENCY }, (response) => {
                                    setSnackBarData({
                                        variant: response.status ? 'success' : 'error',
                                        message: response.msg || 'error'
                                    });
                                    setDriverModalVisible(false)
                                    setOpenSnackbar(true)
                                    setActionOpen(false)
                                    setOnStatusChange(false)
                                    setDialogContent({ ...dialogContent, body: 'Are you sure you want to update the status of this listing?' })
                                }, (response) => {
                                    setSnackBarData({
                                        variant: response.status ? 'success' : 'error',
                                        message: response.msg || 'error'
                                    });
                                    setOpenSnackbar(true)
                                })
                            }}
                            onAccept={(data) => {
                                setUpdateStatusData({ id: data.id, status: BOOKING_STATUS.BOOKED })
                                setDriverModalVisible(false)
                                setOnStatusChange(true)
                                // setBookingModal(true)
                            }}
                            onClose={() => {
                                setDriverModalVisible(false)
                            }} />}
                        <div className='table-pagination'>
                            <CustomTable
                                settingIcon={SETTING_ICON}
                                // sorting={sorting}
                                anyUpdate={anyUpdate}
                                onRowClick={(data) => {
                                    saveStepNo(1)
                                    const { vehicleData, pickupBranchData, dropoffBranchData, pickupTime, pickupDate: pickupdate, dropoffDate: dropoffdate, vehicleQuantity: quantity, driverMinAge, transmissionData, dropoffTime, estimatedDistance, reference } = data

                                    let vehicles = {
                                        value: vehicleData._id ? vehicleData._id : " ", label: vehicleData.name ? vehicleData.name : " ", airConditionType: vehicleData.airConditionType, adultSeats: vehicleData.adultSeats, numberOfDoor: vehicleData.numberOfDoor, transmissionType: vehicleData.transmissionType, url: vehicleData.url, largeLuggageSpace: vehicleData.largeLuggageSpace, id: vehicleData._id ? vehicleData._id : '', ...vehicleData,
                                        transmissionData
                                    }
                                    let PickUpLocation = {
                                        value: pickupBranchData.name ? pickupBranchData.name : " ", label: pickupBranchData.name ? pickupBranchData.name : " ", id: pickupBranchData._id ? pickupBranchData._id : "", city: pickupBranchData.city ? pickupBranchData.city : '', ...pickupBranchData
                                    }
                                    let DropOffLocation = {
                                        value: dropoffBranchData.name ? dropoffBranchData.name : " ", label: dropoffBranchData.name ? dropoffBranchData.name : " ", id: dropoffBranchData._id ? dropoffBranchData._id : "", city: dropoffBranchData.city ? dropoffBranchData.city : '', ...dropoffBranchData
                                    }

                                    let { from: pickuptime1, to: pickuptime2 } = pickupTime
                                    let { from: dropofftime1, to: dropofftime2 } = dropoffTime
                                    setFormStep1Data({ DropOffLocation, pickuptime1, pickuptime2, pickupdate: new Date(pickupdate), vehicles, PickUpLocation, quantity, dropoffdate: new Date(dropoffdate), driverMinAge, dropofftime1, dropofftime2, estimatedDistance, reference })
                                    //end of form step 1 data

                                    //form step 2 data
                                    const { expenses: details, extraPaidDays, ratePerDay, kmAllow: kilometresAllowed, comment: comments, freeDays: freeDaysAvailable, extraItemsData, insurance, ferryCost, fuelOffer } = data
                                    let new_item_description;
                                    let yourSavedLists;
                                    let members;
                                    let insuranceSelect;
                                    let ferryCostSelect;
                                    let fuelSelect;
                                    if (!!extraItemsData) {
                                        members = extraItemsData.items.map((item, index) => {
                                            return {
                                                name: item.name,
                                                price: item.price,
                                                frequency: { value: item.frequency, label: item.frequency === 1 ? "Per Day" : "Per Hire" }
                                            }
                                        })

                                        new_item_description = extraItemsData.name
                                        yourSavedLists = { label: extraItemsData.name, value: extraItemsData.name, ...extraItemsData }
                                    }
                                    if (!!insurance) {
                                        insuranceData && insuranceData.map((item) => {
                                            if (item._id === insurance) {
                                                insuranceSelect = { value: item.name ? item.name : " ", label: item.name ? item.name : '', excess: item.excess ? item.excess : '', id: item._id ? item._id : "", ...item }
                                            }

                                        })
                                    }


                                    if (!!ferryCost) {
                                        ferryData && ferryData.map((item) => {
                                            if (item._id === ferryCost) {
                                                ferryCostSelect = { value: item.name ? item.name : " ", label: item.name ? item.name : '', description: item.description ? item.description : "", id: item._id ? item._id : "", ...item }
                                            }
                                        }
                                        )
                                    }

                                    if (!!fuelOffer) {
                                        fuelOfferData && fuelOfferData.map((item) => {
                                            if (item._id === fuelOffer) {
                                                fuelSelect = { value: item.value ? item.value : " ", label: item.value ? item.value : '', id: item._id ? item._id : "", ...item }
                                            }
                                        })
                                    }
                                    if (!members) {
                                        members = [{}]
                                    }

                                    setFormStep2Data({
                                        details,
                                        extraPaidDays,
                                        ratePerDay,
                                        kilometresAllowed,
                                        comments,
                                        freeDaysAvailable,
                                        yourSavedLists,
                                        members,
                                        new_item_description,
                                        insuranceSelect,
                                        ferryCostSelect,
                                        fuelSelect,
                                        insurance: !!insurance,
                                        ferryCost: !!ferryCost,
                                        fuel: !!fuelOffer,
                                        expenses: !!details
                                    })

                                    //end of form step 2 data

                                    const { termaAndCondition } = data
                                    let name;
                                    let templateDescription;
                                    let templateName;
                                    if (!!termaAndCondition) {
                                        termsData && termsData.map((item) => {
                                            if (item._id === termaAndCondition) {
                                                name = { value: item.name ? item.name : " ", label: item.name ? item.name : " ", description: item.description ? item.description : '', id: item._id ? item._id : "" }
                                            }
                                        })

                                    }
                                    templateDescription = name && name.description
                                    templateName = name && name.value
                                    setFormStep3Data({
                                        name,
                                        templateName,
                                        templateDescription,
                                        listId: data._id
                                    })
                                    if ((!openAction) && (Object.keys(driverDetailContent).length !== 0)) {
                                        history.push(`${ROUTES.VIEW_LISTING}?id=${data._id}`)
                                    }

                                }}
                                DATE_FORMAT={DATE_FORMAT}
                                onClickDriverDetails={(item) => {
                                    setDriverModalContent({
                                        ...item.driverData,
                                        status: item.status,
                                        id: item._id
                                    })
                                    setDriverModalVisible(true)
                                }}
                                DASHBOARD_LISTING_TABLE={DASHBOARD_LISTING_TABLE}
                                BOOKING_STATUS={BOOKING_STATUS}
                                dropDownMenu={ACTION_MENU}
                                onDelete={(id) => {
                                    setDeleteData(id)
                                    setModalVisibility(true)

                                }}
                                visibility={openAction}
                                onActionClick={(index) => {
                                    if (index === indexToOpen)
                                        setActionOpen(!openAction)
                                    else
                                        setActionOpen(true)
                                    setIndexToOpen(index)
                                }}
                                ROUTES={ROUTES}
                                indexToOpen={indexToOpen}
                                updateStatus={updateStatus}
                                onCopy={(data) => {
                                    saveStepNo(1)
                                    //form step 1 data
                                    const { vehicleData, pickupBranchData, dropoffBranchData, pickupTime, pickupDate: pickupdate, dropoffDate: dropoffdate, vehicleQuantity: quantity, driverMinAge, transmissionData, dropoffTime, estimatedDistance, reference } = data
                                    let vehicles = {
                                        value: vehicleData._id ? vehicleData._id : " ", label: vehicleData.name ? vehicleData.name : " ", airConditionType: vehicleData.airConditionType, adultSeats: vehicleData.adultSeats, numberOfDoor: vehicleData.numberOfDoor, transmissionType: vehicleData.transmissionType, url: vehicleData.url, largeLuggageSpace: vehicleData.largeLuggageSpace, id: vehicleData._id ? vehicleData._id : '', ...vehicleData,
                                        transmissionData
                                    }
                                    let PickUpLocation = {
                                        value: pickupBranchData.name ? pickupBranchData.name : " ", label: pickupBranchData.name ? pickupBranchData.name : " ", id: pickupBranchData._id ? pickupBranchData._id : "", city: pickupBranchData.city ? pickupBranchData.city : '', ...pickupBranchData
                                    }
                                    let DropOffLocation = {
                                        value: dropoffBranchData.name ? dropoffBranchData.name : " ", label: dropoffBranchData.name ? dropoffBranchData.name : " ", id: dropoffBranchData._id ? dropoffBranchData._id : "", city: dropoffBranchData.city ? dropoffBranchData.city : '', ...dropoffBranchData
                                    }

                                    let { from: pickuptime1, to: pickuptime2 } = pickupTime
                                    let { from: dropofftime1, to: dropofftime2 } = dropoffTime
                                    setFormStep1Data({ DropOffLocation, pickuptime1, pickuptime2, vehicles, PickUpLocation, quantity, driverMinAge, dropofftime1, dropofftime2, estimatedDistance, reference })
                                    //end of form step 1 data

                                    //form step 2 data
                                    const { expenses: details, extraPaidDays, ratePerDay, kmAllow: kilometresAllowed, comment: comments, freeDays: freeDaysAvailable, extraItemsData, insurance, ferryCost, fuelOffer } = data
                                    let new_item_description;
                                    let yourSavedLists;
                                    let members;
                                    let insuranceSelect;
                                    let ferryCostSelect;
                                    let fuelSelect;
                                    if (!!extraItemsData) {
                                        members = extraItemsData.items.map((item, index) => {
                                            return {
                                                name: item.name,
                                                price: item.price,
                                                frequency: { value: item.frequency, label: item.frequency === 1 ? "Per Day" : "Per Hire" }
                                            }
                                        })
                                        new_item_description = extraItemsData.name
                                        yourSavedLists = { label: extraItemsData.name, value: extraItemsData.name, ...extraItemsData }
                                    }
                                    if (!!insurance) {
                                        insuranceData && insuranceData.map((item) => {
                                            if (item._id === insurance) {
                                                insuranceSelect = { value: item.name ? item.name : " ", label: item.name ? item.name : '', excess: item.excess ? item.excess : '', id: item._id ? item._id : "", ...item }
                                            }

                                        })
                                    }


                                    if (!!ferryCost) {
                                        ferryData && ferryData.map((item) => {
                                            if (item._id === ferryCost) {
                                                ferryCostSelect = { value: item.name ? item.name : " ", label: item.name ? item.name : '', description: item.description ? item.description : "", id: item._id ? item._id : "", ...item }
                                            }
                                        }
                                        )
                                    }

                                    if (!!fuelOffer) {
                                        fuelOfferData && fuelOfferData.map((item) => {
                                            if (item._id === fuelOffer) {
                                                fuelSelect = { value: item.value ? item.value : " ", label: item.value ? item.value : '', id: item._id ? item._id : "", ...item }
                                            }
                                        })
                                    }

                                    setFormStep2Data({
                                        details,
                                        extraPaidDays,
                                        ratePerDay,
                                        kilometresAllowed,
                                        comments,
                                        freeDaysAvailable,
                                        yourSavedLists,
                                        members,
                                        new_item_description,
                                        insuranceSelect,
                                        ferryCostSelect,
                                        fuelSelect,
                                        insurance: !!insurance,
                                        ferryCost: !!ferryCost,
                                        fuel: !!fuelOffer,
                                        expenses: !!details
                                    })

                                    //end of form step 2 data

                                    const { termaAndCondition } = data
                                    let name;
                                    let templateDescription;
                                    let templateName;
                                    if (!!termaAndCondition) {
                                        termsData && termsData.map((item) => {
                                            if (item._id === termaAndCondition) {
                                                name = { value: item.name ? item.name : " ", label: item.name ? item.name : " ", description: item.description ? item.description : '', id: item._id ? item._id : "" }
                                            }
                                        })

                                    }
                                    templateDescription = name && name.description
                                    templateName = name && name.value
                                    setFormStep3Data({
                                        name,
                                        templateName,
                                        templateDescription,
                                    })
                                    history.push(`${ROUTES.COPY_LISTING}`)
                                }
                                }
                                onEdit={(data) => {
                                    saveStepNo(1)
                                    //form step 1 data
                                    const { vehicleData, pickupBranchData, dropoffBranchData, pickupTime, pickupDate: pickupdate, dropoffDate: dropoffdate, vehicleQuantity: quantity, driverMinAge, transmissionData, dropoffTime, estimatedDistance, reference } = data
                                    let vehicles = {
                                        value: vehicleData._id ? vehicleData._id : " ", label: vehicleData.name ? vehicleData.name : " ", airConditionType: vehicleData.airConditionType, adultSeats: vehicleData.adultSeats, numberOfDoor: vehicleData.numberOfDoor, transmissionType: vehicleData.transmissionType, url: vehicleData.url, largeLuggageSpace: vehicleData.largeLuggageSpace, id: vehicleData._id ? vehicleData._id : '', ...vehicleData,
                                        transmissionData
                                    }
                                    let PickUpLocation = {
                                        value: pickupBranchData.name ? pickupBranchData.name : " ", label: pickupBranchData.name ? pickupBranchData.name : " ", id: pickupBranchData._id ? pickupBranchData._id : "", city: pickupBranchData.city ? pickupBranchData.city : '', ...pickupBranchData
                                    }
                                    let DropOffLocation = {
                                        value: dropoffBranchData.name ? dropoffBranchData.name : " ", label: dropoffBranchData.name ? dropoffBranchData.name : " ", id: dropoffBranchData._id ? dropoffBranchData._id : "", city: dropoffBranchData.city ? dropoffBranchData.city : '', ...dropoffBranchData
                                    }

                                    let { from: pickuptime1, to: pickuptime2 } = pickupTime
                                    let { from: dropofftime1, to: dropofftime2 } = dropoffTime
                                    setFormStep1Data({ DropOffLocation, pickuptime1, pickuptime2, pickupdate: new Date(pickupdate), vehicles, PickUpLocation, quantity, dropoffdate: new Date(dropoffdate), driverMinAge, dropofftime1, dropofftime2, estimatedDistance, reference })
                                    //end of form step 1 data

                                    //form step 2 data
                                    const { expenses: details, extraPaidDays, ratePerDay, kmAllow: kilometresAllowed, comment: comments, freeDays: freeDaysAvailable, extraItemsData, insurance, ferryCost, fuelOffer } = data
                                    let new_item_description;
                                    let yourSavedLists;
                                    let members;
                                    let insuranceSelect;
                                    let ferryCostSelect;
                                    let fuelSelect;
                                    if (!!extraItemsData) {
                                        members = extraItemsData.items.map((item, index) => {
                                            return {
                                                name: item.name,
                                                price: item.price,
                                                frequency: { value: item.frequency, label: item.frequency === 1 ? "Per Day" : "Per Hire" }
                                            }
                                        })
                                        new_item_description = extraItemsData.name
                                        yourSavedLists = { label: extraItemsData.name, value: extraItemsData.name, ...extraItemsData }
                                    }
                                    if (!!insurance) {
                                        insuranceData && insuranceData.map((item) => {
                                            if (item._id === insurance) {
                                                insuranceSelect = { value: item.name ? item.name : " ", label: item.name ? item.name : '', excess: item.excess ? item.excess : '', id: item._id ? item._id : "", ...item }
                                            }

                                        })
                                    }


                                    if (!!ferryCost) {
                                        ferryData && ferryData.map((item) => {
                                            if (item._id === ferryCost) {
                                                ferryCostSelect = { value: item.name ? item.name : " ", label: item.name ? item.name : '', description: item.description ? item.description : "", id: item._id ? item._id : "", ...item }
                                            }
                                        }
                                        )
                                    }

                                    if (!!fuelOffer) {
                                        fuelOfferData && fuelOfferData.map((item) => {
                                            if (item._id === fuelOffer) {
                                                fuelSelect = { value: item.value ? item.value : " ", label: item.value ? item.value : '', id: item._id ? item._id : "", ...item }
                                            }
                                        })
                                    }

                                    setFormStep2Data({
                                        details,
                                        extraPaidDays,
                                        ratePerDay,
                                        kilometresAllowed,
                                        comments,
                                        freeDaysAvailable,
                                        yourSavedLists,
                                        members,
                                        new_item_description,
                                        insuranceSelect,
                                        ferryCostSelect,
                                        fuelSelect,
                                        insurance: !!insurance,
                                        ferryCost: !!ferryCost,
                                        fuel: !!fuelOffer,
                                        expenses: !!details
                                    })

                                    //end of form step 2 data

                                    const { termaAndCondition } = data
                                    let name;
                                    let templateDescription;
                                    let templateName;
                                    if (!!termaAndCondition) {
                                        termsData && termsData.map((item) => {
                                            if (item._id === termaAndCondition) {
                                                name = { value: item.name ? item.name : " ", label: item.name ? item.name : " ", description: item.description ? item.description : '', id: item._id ? item._id : "" }
                                            }
                                        })

                                    }
                                    templateDescription = name && name.description
                                    templateName = name && name.value
                                    setFormStep3Data({
                                        name,
                                        templateName,
                                        templateDescription,
                                        listId: data._id
                                    })
                                    history.push(`${ROUTES.EDIT_LISTING}?id=${data._id}`)
                                }
                                }
                                changeStatusDashboard={(status, id) => {
                                    console.log(status, id)
                                    setUpdateStatusData({ id, status })
                                    setOnStatusChange(true)
                                    if (status === BOOKING_STATUS.CANCELLED_BY_DRIVER || status === BOOKING_STATUS.CANCELLED_BY_AGENCY || status === BOOKING_STATUS.NO_SHOW) {
                                        let text = status === BOOKING_STATUS.CANCELLED_BY_DRIVER ? 'Cancelled by driver' : status === BOOKING_STATUS.CANCELLED_BY_AGENCY ? "Cancelled by us" : 'No show'
                                        setDialogContent({ ...dialogContent, body: `Please note, when a booking status is changed to ${text}, the listing will be close and cannot be reopened.` })
                                    }
                                }
                                }
                                onBooking={() => {
                                }}
                                tableHeader={LAYOUTS.dashboardTable}
                                tableData={dashboardTableData && dashboardTableData.data}
                                onShareAndInvite={async (data) => {
                                    newListingId(data && data._id)
                                    setTimeout(() => { history.push(ROUTES.INVITE_DRIVER) }, 1)
                                }}
                            />
                            {((dashboardTableData && dashboardTableData.totalCount) > (LIMITS && LIMITS.limitPerPage)) && < CustomPagination
                                limit={(LIMITS && LIMITS.limitPerPage)}
                                currentPage={pageIndex + 1}
                                totalPages={dashboardTableData && dashboardTableData.totalCount}
                                itemsCount={(dashboardTableData && dashboardTableData.data && dashboardTableData.data.length)}
                                onPageChange={(value) => {
                                    if (!window.navigator.onLine) {
                                        setSnackBarData({
                                            variant: 'error',
                                            message: 'You appear to be offline. Please check your connection.'
                                        });
                                        setOpenSnackbar(true)
                                    }
                                    else {
                                        getDashboardTableData({
                                            agencyId: userData && userData.userAgency && userData.userAgency._id,
                                            limit: (LIMITS && LIMITS.limitPerPage), index: value && value.selected
                                        }, () => { }, () => { })
                                        setPageIndex(value && value.selected)
                                    }
                                }}
                            />}
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}