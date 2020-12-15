import React from 'react';
import moment from 'moment';
import { ActionDropDown } from '../action-dropdown';
import { MessagePopUp } from '../message-pop-up';
import classNames from 'classnames';
import './style.scss';
import { useState, useEffect } from 'react';
const { defaultConfig: { PLATFORM } } = require(`../../../../config/default`);
const { StarRatingComponent } = require(`../../../../components/${PLATFORM}/atoms/star-component`)

export const CustomTable = ({
    tableHeader = [],
    visibility = false,
    onActionClick = () => { },
    commentModal = false,
    setCommentModal = () => { },
    tableData = [],
    indexToOpen,
    onEdit = () => { },
    tableType,
    setModalVisible = () => { },
    dropDownMenu,
    tablePage,
    DASHBOARD_LISTING_TABLE = [],
    BOOKING_STATUS = {},
    DATE_FORMAT = 'DD/MM/YYYY',
    changeStatusDashboard = () => { },
    onDelete = () => { },
    onRowClick = () => { },
    onFavoriteChange = () => { },
    onCopy = () => { },
    anyUpdate,
    onShareAndInvite = () => { },
    onBooking = () => { },
    settingIcon,
    sort = () => { },
    ratedByDriver = false,
    onStatusChange = () => { },
    onClickDriverDetails = () => { },
    DRIVER_RATING_STATUS
}) => {
    const getData = (statusCode) => {
        for (let index in DASHBOARD_LISTING_TABLE) {
            if (DASHBOARD_LISTING_TABLE[index] && DASHBOARD_LISTING_TABLE[index].statusCode === statusCode) {
                return DASHBOARD_LISTING_TABLE[index].elementLabel
            }
        }
    }
    const [actionMenuIndex, setActionMenuIndex] = useState(null)
    const [actionMenuItem, setActionMenuItem] = useState({})

    useEffect(() => {
        var element = document.getElementsByTagName('body')[0]
        var hs = element.scrollWidth > element.clientWidth;
        if (hs === true) {
            element.scrollLeft += 500
            element.scrollTop = element.scrollHeight;
        }
    }, [visibility])

    return (
        <div className={actionMenuIndex === indexToOpen && visibility ? "drop_scroll table-responsive table-default my-2" : "table-responsive table-default my-2"}>
            {commentModal && <MessagePopUp
                messageTitle=""
                messageDescription="Comment to be shown."
                rightButtonLabel={"OK"}
                rightButtonAction={() => {
                    setCommentModal(false)
                }}
            />}
            <table className="table table-borderless">
                <thead>
                    <tr>
                        {tableHeader.map((item, index) => {
                            return (
                                <th key={index + ''}
                                    className={!!item.class ? item.class : ''}
                                    onClick={() => {
                                        if ((tableData && tableData.length) > 1) {
                                            sort(item.id)
                                        }

                                    }}>{item.label}
                                    {/* <img src={require('../../../../assets/icons/sort.png')} alt="ECR" className="img-fluid" width="16px" /> */}
                                </th>
                            )
                        })
                        }
                    </tr>
                </thead>
                {
                    !!(tableData && tableData.length) && tableData.map((item, index) => {
                        return (
                            <tbody key={index + ''} className={!(tablePage === 'driverRating') ? "cursor" : ""}>
                                <tr onClick={() => { onRowClick(item) }}>
                                    {!(tablePage === 'driverRating') ? <td><span className={classNames(['badge badge-outline',
                                        {
                                            'border-success avail': item.status === BOOKING_STATUS.AVAILABLE
                                        },
                                        {
                                            'border-primary booked': item.status === BOOKING_STATUS.BOOKED
                                        },
                                        {
                                            'border-danger cancel': ((item.status === BOOKING_STATUS.CANCELLED_BY_DRIVER) || (item.status === BOOKING_STATUS.CANCELLED_BY_AGENCY))
                                        },
                                        {
                                            'border-secondary expire': item.status === BOOKING_STATUS.EXPIRE
                                        },
                                        {
                                            'border-complete': item.status === BOOKING_STATUS.COMPLETE
                                        },
                                        {
                                            'border-request': item.status === BOOKING_STATUS.PENDING
                                        },
                                        {
                                            'border-warning': item.status === BOOKING_STATUS.NO_SHOW
                                        },
                                    ])}>{(getData(item.status) || '--')}</span></td> :
                                        <td className="text-capitalize">{(item.driverName) || '--'}</td>
                                    }
                                    <td className="text-capitalize">{(item.vehicleData && item.vehicleData.name) || (item.vehicle) || "--"}</td>
                                    {!(tablePage === 'driverRating') ? <td>{(item.vehicleQuantity) || '--'}</td> : <td>{(item.rego) || '--'}</td>}
                                    {!(tablePage === 'driverRating') ?
                                        <td ><div onClick={() => onClickDriverDetails(item)}>
                                            {item.status === 6 || item.status === 2 || item.status === 3 ? <img src={require('../../../../assets/icons/account_icon.svg')} alt="ECR" className="img-fluid" width="16px" /> : '--'}
                                        </div></td> : ''}
                                    <td className="text-capitalize">{(item && item.pickupBranchData && item.pickupBranchData.name) || (item && item.pickupLocation) || '--'}</td>
                                    <td>{
                                        (moment(new Date(item.pickupDate)).format(DATE_FORMAT)) || '--'
                                    }</td>
                                    <td>{(item && item.dropoffBranchData && item.dropoffBranchData.name) || (item && item.dropoffLocation) || '--'}</td>
                                    <td>{
                                        (moment(new Date(item.dropoffDate)).format(DATE_FORMAT)) || '--'
                                    }</td>
                                    {!(tablePage === 'driverRating') && <>

                                        <td>{
                                            (moment(new Date(item.createdAt)).format(DATE_FORMAT)
                                            ) || '--'

                                        }</td>
                                        <td>{
                                            (moment(new Date(item.updatedAt)).format(DATE_FORMAT)) || '--'
                                        }</td>
                                    </>
                                    }
                                    {(tableType === 'ratedTable') && !ratedByDriver && < td > {(moment(new Date(item.lastUpdated)).format(DATE_FORMAT)) || '--'}</td>}
                                    {!(tablePage === 'driverRating') && <td>{(item.operator) || '--'}</td>}
                                    {!(tablePage === 'driverRating') && <td>{(item.reference) || '--'}</td>}
                                    <td>{
                                        (!!(item.bookingId) ? (item.bookingId) : (`--`)) || ("XYZ123") || '--'} </td>
                                    {
                                        (tablePage === 'driverRating') && !ratedByDriver && <td>
                                            {<div className="checkbox_block"><label className="form-checkbox"><input name="subscribe"
                                                checked={item.isFavorite}
                                                type="checkbox" className="form-check-input" value=""
                                                onChange={() => { }}
                                                onClick={() => {
                                                    onFavoriteChange({ isFavorite: !item.isFavorite, id: item._id })
                                                }}
                                            /><span className="checkmark"></span></label></div>}
                                        </td>}

                                    {
                                        tableType === 'yetToRate' ?
                                            (<td><li><a className="link_color"
                                                onClick={() => {
                                                    setModalVisible({
                                                        id: item._id,
                                                        clickedOn: "rate now"
                                                    })
                                                }}
                                            >Rate now</a></li></td>) : tableType === 'ratedTable' ?
                                                <><td>
                                                    <div className="rate_stars">
                                                        <StarRatingComponent
                                                            initialRating={item.starRating}
                                                            readonly={true}
                                                        /></div></td>
                                                    {!ratedByDriver && <td><li><a
                                                        className="link_color"
                                                        onClick={() => {
                                                            setModalVisible({
                                                                id: item._id, starRating: item.starRating,
                                                                commentTodriver: item.commentForDriver,
                                                                commentForEcr: item.commentForECRByAgency,
                                                                clickedOn: "view/edit"
                                                            })
                                                        }}
                                                    >View/edit</a></li></td>}
                                                </> : !ratedByDriver && <td>
                                                    <div className="edit_action"
                                                        id="edit_icon"
                                                        onClick={e => e.stopPropagation()}>
                                                        <i className="edit_icon"
                                                            onClick={() => {
                                                                onActionClick(index)
                                                                setActionMenuIndex(index)
                                                                setActionMenuItem(item)

                                                            }}
                                                        ><img src={settingIcon} alt="ECR" className="img-fluid" width="34px" /></i>
                                                        {index === indexToOpen && visibility && <ActionDropDown
                                                            BOOKING_STATUS={BOOKING_STATUS}
                                                            selectedId={item._id}
                                                            currentData={item}
                                                            onEdit={onEdit}
                                                            onCopy={onCopy}
                                                            anyUpdate={anyUpdate}
                                                            onShareAndInvite={onShareAndInvite}
                                                            onDelete={onDelete}
                                                            checkboxmenu={dropDownMenu}
                                                            changeStatusDashboard={changeStatusDashboard}
                                                            currentStatus={item.status}
                                                            onBooking={onBooking}
                                                        />}
                                                    </div>
                                                </td>}
                                    {ratedByDriver && <td><span className={`switchButton`}>
                                        <label className={``}>
                                            <input
                                                className={'toggle-button'}
                                                type="checkbox"
                                                onChange={() => onStatusChange(
                                                    { listingId: item._id, opKey: item && item.showRatingToDrivers === DRIVER_RATING_STATUS.accepted ? DRIVER_RATING_STATUS.rejected : DRIVER_RATING_STATUS.accepted }
                                                )}
                                                checked={item && item.showRatingToDrivers === DRIVER_RATING_STATUS.accepted ? true : false}
                                            />
                                        </label>
                                    </span></td>}
                                </tr>
                            </tbody>
                        )
                    })
                }
                {
                    !(tableData && tableData.length) && <tbody><tr><td colSpan={tableHeader.length}
                        style={{ fontSize: "1.25rem" }}
                    >No Data Found</td></tr></tbody>
                }
            </table>
        </div >
    )
}