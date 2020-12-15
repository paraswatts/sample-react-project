import React, { useEffect, useState } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { BookingForm } from '../home/booking-form';
import './styles.scss';
const { defaultConfig: { PLATFORM } } = require(`../../../../../../config/default`);
const { ActionDropDown } = require(`../../../../../../components/${PLATFORM}/atoms/action-dropdown`)
const { DecisionPopup } = require(`../../../../../../components/${PLATFORM}/atoms/decision-popup`)

const {
    PAGE_TITLES,
    ROUTES,
    DASHBOARD_LISTING,
    LAYOUTS,
    ACTION_MENU,
    BOOKING_STATUS,
    DATE_FORMAT,
    LABELS,
    LIMITS,
    ELEMENT_ID,
    DASHBOARD_LISTING_TABLE,
    SETTING_ICON,
    SORT_ICON
} = require(`../../../../../../shared/${PLATFORM}/constants`);
const { CustomPagination } = require(`../../../../../../components/${PLATFORM}/atoms/pagination`)
const { SnackbarWrapper } = require(`../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`);
export const Screen = ({
    tableHeader = [],
    visibility = false,
    onActionClick = () => { },
    commentModal = false,
    setCommentModal = () => { },
    tableData = [],
    tableType,
    setModalVisible = () => { },
    dropDownMenu,
    tablePage,
    DASHBOARD_LISTING_TABLE = [],
    // BOOKING_STATUS = {},
    DATE_FORMAT = 'DD/MM/YYYY',
    changeStatusDashboard = () => { },
    onRowClick = () => { },
    onFavoriteChange = () => { },
    anyUpdate,
    onBooking = () => { },
    selectedList,
    getListing,
    listing,
    history,
    setFormStep1Data,
    setFormStep2Data,
    updateSuccess,
    setFormStep3Data,
    saveStepNo,
    insuranceData,
    ferryData,
    termsData,
    fuelOfferData,
    newListingId,
    getVehicleInformation,
    updateRequest,
    regoSet = () => { }
}) => {

    const [pageIndex, setPageIndex] = useState(0)
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [openAction, setActionOpen] = useState(false);
    const [sortKey, setSortKey] = useState(ELEMENT_ID.lastUpdated)
    const [sortType, setSortType] = useState(-1)
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });
    const [indexToOpen, setIndexToOpen] = useState()
    const [onStatusChange, setOnStatusChange] = useState(false)
    const [updateStatusData, setUpdateStatusData] = useState('')
    const [bookingModal, setBookingModal] = useState(false)

    useEffect(() => {
        getListing({ status: selectedList, index: pageIndex, limit: LIMITS && LIMITS.extendedLimitPerPage, sortKey, sortType })
    }, [])
    const sorting = (element) => {

        switch (element) {
            case ELEMENT_ID.vehicle:
                if (sortKey === ELEMENT_ID.vehicle) {
                    getListing({ status: selectedList, index: pageIndex, limit: LIMITS && LIMITS.extendedLimitPerPage, sortKey, sortType: -1 * sortType })
                    setSortType(-1 * sortType);
                }
                else {
                    getListing({ status: selectedList, index: pageIndex, limit: LIMITS && LIMITS.extendedLimitPerPage, sortKey: ELEMENT_ID.vehicle, sortType: -1 * sortType })
                    setSortType(-1 * sortType);
                    setSortKey(ELEMENT_ID.vehicle);
                }
                break;
            case ELEMENT_ID.pickUpLocation:
                if (sortKey === ELEMENT_ID.pickUpLocation) {
                    getListing({ status: selectedList, index: pageIndex, limit: LIMITS && LIMITS.extendedLimitPerPage, sortKey, sortType: -1 * sortType })
                    setSortType(-1 * sortType);
                }
                else {
                    getListing({ status: selectedList, index: pageIndex, limit: LIMITS && LIMITS.extendedLimitPerPage, sortKey: ELEMENT_ID.pickUpLocation, sortType: -1 * sortType })
                    setSortType(-1 * sortType);
                    setSortKey(ELEMENT_ID.pickUpLocation);
                }
                break;
            case ELEMENT_ID.pickUpDate:
                if (sortKey === ELEMENT_ID.pickUpDate) {
                    getListing({ status: selectedList, index: pageIndex, limit: LIMITS && LIMITS.extendedLimitPerPage, sortKey, sortType: -1 * sortType })
                    setSortType(-1 * sortType);
                }
                else {
                    getListing({ status: selectedList, index: pageIndex, limit: LIMITS && LIMITS.extendedLimitPerPage, sortKey: ELEMENT_ID.pickUpDate, sortType: -1 * sortType })
                    setSortType(-1 * sortType);
                    setSortKey(ELEMENT_ID.pickUpDate);
                }
                break;
            case ELEMENT_ID.dropOffLocation:
                if (sortKey === ELEMENT_ID.dropOffLocation) {
                    getListing({ status: selectedList, index: pageIndex, limit: LIMITS && LIMITS.extendedLimitPerPage, sortKey, sortType: -1 * sortType })
                    setSortType(-1 * sortType);
                }
                else {
                    getListing({ status: selectedList, index: pageIndex, limit: LIMITS && LIMITS.extendedLimitPerPage, sortKey: ELEMENT_ID.dropOffLocation, sortType: -1 * sortType })
                    setSortType(-1 * sortType);
                    setSortKey(ELEMENT_ID.dropOffLocation);
                }
                break;
            case ELEMENT_ID.dropOffDate:
                if (sortKey === ELEMENT_ID.dropOffDate) {
                    getListing({ status: selectedList, index: pageIndex, limit: LIMITS && LIMITS.extendedLimitPerPage, sortKey, sortType: -1 * sortType })
                    setSortType(-1 * sortType);
                }
                else {
                    getListing({ status: selectedList, index: pageIndex, limit: LIMITS && LIMITS.extendedLimitPerPage, sortKey: ELEMENT_ID.dropOffDate, sortType: -1 * sortType })
                    setSortType(-1 * sortType);
                    setSortKey(ELEMENT_ID.dropOffDate);
                }
                break;
            case ELEMENT_ID.lastUpdated:
                if (sortKey === ELEMENT_ID.lastUpdated) {
                    getListing({ status: selectedList, index: pageIndex, limit: LIMITS && LIMITS.extendedLimitPerPage, sortKey, sortType: -1 * sortType })
                    setSortType(-1 * sortType);
                }
                else {
                    getListing({ status: selectedList, index: pageIndex, limit: LIMITS && LIMITS.extendedLimitPerPage, sortKey: ELEMENT_ID.lastUpdated, sortType: -1 * sortType })
                    setSortType(-1 * sortType);
                    setSortKey(ELEMENT_ID.lastUpdated);
                }
                break;

            default: break;
        }
    }
    return (
        <div className="app-main_outer">
            <div className="container-fluid">
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
                                getListing({ status: selectedList, index: pageIndex, limit: LIMITS && LIMITS.extendedLimitPerPage, sortKey, sortType })
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
                <DecisionPopup
                    modalVisibility={onStatusChange}
                    dialogTitle={'Update Status'}
                    dialogContent={updateStatusData.status === BOOKING_STATUS.CANCELLED_BY_DRIVER || updateStatusData.status === BOOKING_STATUS.CANCELLED_BY_AGENCY
                        || BOOKING_STATUS.NO_SHOW ? `Please note, when a booking status is changed to 
                        , the listing will be close and cannot be reopened.` : 'Are you sure you want to update the status of this listing?'}
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
                <div className="table-responsive table-default my-2">

                    <table className="table table-borderless"
                        onClick={() => {
                            setActionOpen(false)
                        }}
                    >
                        <thead>
                            <tr>
                                {LAYOUTS && LAYOUTS.dashboardDataView.map((item, index) => {
                                    return (
                                        <th key={index + ''}
                                            onClick={() => {
                                                if ((listing && listing.listings && listing.listings.length) > 1) {
                                                    sorting(item.id)
                                                }
                                            }
                                            }
                                            className='for-pointer'
                                        >{item.label}
                                            {/* <img src={SORT_ICON} alt="ECR" className="img-fluid" width="16px" /> */}
                                        </th>
                                    )
                                })
                                }
                            </tr>
                        </thead>
                        {
                            !!(listing && listing.listings) && listing.listings.map((item, index) => {
                                return (
                                    <tbody key={index + ''} className="for-no-pointer">
                                        <tr>
                                            <td>
                                                {item.vehicle}
                                            </td>
                                            <td>
                                                {item.pickupLocation || "--"}
                                            </td>
                                            <td>
                                                {item.dropoffLocation || "--"}
                                            </td>
                                            <td>{
                                                (moment(new Date(item.pickupDate)).format(DATE_FORMAT)) || '--'
                                            }</td>

                                            <td>{
                                                (moment(new Date(item.dropoffDate)).format(DATE_FORMAT)) || '--'
                                            }</td>
                                            <td>{
                                                (moment(new Date(item.lastUpdated)).format(DATE_FORMAT)) || '--'
                                            }</td>
                                            <td>
                                                <div className="edit_action"
                                                    onClick={e => e.stopPropagation()}
                                                >
                                                    <i className="edit_icon"
                                                        onClick={() => {
                                                            // console.log("called");

                                                            if (index === indexToOpen)
                                                                setActionOpen(!openAction)
                                                            else
                                                                setActionOpen(true)
                                                            setIndexToOpen(index)
                                                        }}
                                                    ><img src={SETTING_ICON} alt="ECR" className="img-fluid" width="34px" /></i>
                                                    {index === indexToOpen && openAction &&
                                                        <ActionDropDown
                                                            BOOKING_STATUS={BOOKING_STATUS}
                                                            selectedId={item._id}
                                                            currentData={item}
                                                            onEdit={() => {
                                                                getVehicleInformation(item._id, (response) => {
                                                                    saveStepNo(1)
                                                                    //form step 1 data
                                                                    const { vehicleData, pickupBranchData, dropoffBranchData, pickupTime, pickupDate: pickupdate, dropoffDate: dropoffdate, vehicleQuantity: quantity, driverMinAge, transmissionData, dropoffTime, estimatedDistance, reference } = response
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
                                                                    const { expenses: details, extraPaidDays, ratePerDay, kmAllow: kilometresAllowed, comment: comments, freeDays: freeDaysAvailable, extraItemsData, insurance, ferryCost, fuelOffer } = response
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

                                                                    const { termaAndCondition } = response
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
                                                                        listId: response._id
                                                                    })
                                                                    history.push(`${ROUTES.EDIT_LISTING}?id=${response._id}`)


                                                                }, () => { })


                                                            }}
                                                            onCopy={() => { }}
                                                            anyUpdate={anyUpdate}
                                                            onShareAndInvite={() => { }}
                                                            onDelete={() => { }}
                                                            checkboxmenu={ACTION_MENU}
                                                            changeStatusDashboard={(status, id) => {
                                                                console.log(status, id)
                                                                setUpdateStatusData({ id, status })
                                                                setOnStatusChange(true)
                                                            }}
                                                            currentStatus={item.status}
                                                            onBooking={() => { }}
                                                        />}
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            })
                        }
                        {
                            !(listing && listing.listings && listing.listings.length) && <tbody
                                className="for-no-pointer"
                            ><tr><td colSpan={LAYOUTS && LAYOUTS.dashboardDataView.length}
                                style={{ fontSize: "1.25rem" }}
                            >No Data Found</td></tr></tbody>
                        }
                    </table>
                </div>
                {((listing && listing.totalCount) > (LIMITS && LIMITS.extendedLimitPerPage)) && < CustomPagination
                    limit={(LIMITS && LIMITS.extendedLimitPerPage)}
                    currentPage={pageIndex + 1}
                    totalPages={listing && listing.totalCount}
                    itemsCount={(listing && listing.listings && listing.listings.length)}
                    onPageChange={(value) => {
                        if (!window.navigator.onLine) {
                            setSnackBarData({
                                variant: 'error',
                                message: 'You appear to be offline. Please check your connection.'
                            });
                            setOpenSnackbar(true)
                        }
                        else {
                            getListing({
                                status: selectedList, index: value && value.selected, limit: LIMITS && LIMITS.extendedLimitPerPage, sortKey, sortType
                            }, () => { }, () => { })
                            setPageIndex(value && value.selected)
                        }
                    }}
                />}
            </div>
        </div>
    )
}