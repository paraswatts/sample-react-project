import React, { useEffect, useState } from 'react';
import './style.scss';
import { ActionDropDown } from '../action-dropdown';
import classNames from 'classnames';
const { StarRatingComponent } = require('../star-component')
const { defaultConfig: { PLATFORM, LOCATION, VERSION } } = require(`../../../../config/default`);
const { DRIVER_ACTION_MENU, BOOKING_STATUS } = require(`../../../../shared/${PLATFORM}/constants`);
const { DialogModal } = require('../dialog-component')
const { STRINGS } = require(`../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`)
const { CancelTrip } = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/driver-views/profile-account/cancel-trip`);


export const DriverTable = ({
    tableHeader,
    tableData,
    onRowClick,
    activeRow,
    upcomingActiveRow,
    onActionClick,
    visibility,
    upcomingActiveRowData,
    onClickRatingActiveRow,
    activeRatingRow,
    setvisibility,

}) => {
    const [popupVisible, setPopVisible] = useState(false);

    const onClickComment = (index) => {
        setPopVisible(true)
        onClickRatingActiveRow(index)
    }
    const [popupRateAgencyVisible, setPopRateAgencyVisible] = useState(false);
    const [popupEmailAgencyVisible, setPopEmailAgencyVisible] = useState(false);
    const [tableCellClick, setTableCellClick] = useState({})
    const [popupCancelTrip, setPopCancelTrip] = useState(false);

    useEffect(() => {
    }, [tableCellClick])


    const rateAgencyModal = (item, index, type) => {
        console.log(item)
        setPopRateAgencyVisible(true)
        setTableCellClick({ ...item, type: type })
        onRowClick(index)
    }
    const getBookingStatus = (status) => {
        let getStatus = Object.keys(BOOKING_STATUS).map(obj => {
            if (BOOKING_STATUS[obj] === status) {
                return obj
            }
        })
        return getStatus
    }
    useEffect(() => {
        if (popupEmailAgencyVisible === false || popupCancelTrip === false) {
            setvisibility && setvisibility()
        }
    }, [popupEmailAgencyVisible || popupCancelTrip])
    return (
        <div className="container-fluid table_drop_action">
            <div className="table-responsive table-default my-2">
                <table className="table table-borderless">
                    <thead>
                        <tr className="table_dropaction">
                            {tableHeader.map((item, index) => {
                                return (
                                    <th key={index}>{item}</th>
                                )
                            })
                            }
                        </tr>
                    </thead>
                    {
                        !!(tableData && tableData.length) && tableData.map((item, index) => {
                            return (
                                <>
                                    <tbody key={index}>
                                        <tr >
                                            {Object.keys(item).map((key, index1) => {
                                                return item[key] !== 'setting' ?
                                                    key === 'cancelledBy' ?
                                                        <td>
                                                            <span className={classNames(['badge badge-outline', 'border-danger'])}>
                                                                {item.cancelledBy}
                                                            </span>
                                                        </td>
                                                        : key === 'status' ?
                                                            <td>  <span className={classNames(['badge badge-outline',
                                                                {
                                                                    'border-success': item.status === BOOKING_STATUS.AVAILABLE
                                                                },
                                                                {
                                                                    'border-primary': item.status === BOOKING_STATUS.BOOKED
                                                                },
                                                                {
                                                                    'border-danger': ((item.status === BOOKING_STATUS.CANCELLED_BY_DRIVER) || (item.status === BOOKING_STATUS.CANCELLED_BY_AGENCY))
                                                                },
                                                                {
                                                                    'border-secondary': item.status === BOOKING_STATUS.EXPIRE
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
                                                            ])}>
                                                                {getBookingStatus(item.status)}
                                                            </span> </td>
                                                            : key === 'rateForDriver' || key === 'rateForAgency' ?
                                                                item[key] === 0 && key === 'rateForAgency' ?
                                                                    <td key={index1}>  <a onClick={() => rateAgencyModal(item, index, 'new')} className="btn btn-sm btn-outline-blue">Please Rate</a></td> :
                                                                    <td key={index1}> <StarRatingComponent
                                                                        initialRating={item[key]}
                                                                        readonly={true}
                                                                    /></td>
                                                                : item[key] === 'Edit' ?
                                                                    <td><a id="comment" onClick={() => rateAgencyModal(item, index, 'edit')}>Edit</a></td>
                                                                    : item[key] === 'comment' ?
                                                                        <td key={index1}>
                                                                            <a id="comment" onClick={() => onClickComment(index)} >{STRINGS.VIEW}</a></td>
                                                                        : <td key={index1}>{item[key]}</td>
                                                    : <td key={index1}> <i className="edit_icon"
                                                        onClick={() => {
                                                            onActionClick(index)
                                                        }}
                                                    ><img src={require(`../../../../assets/icons/setting_icon.svg`)} alt="ECR" className="img-fluid" width="34px" /></i>
                                                        {upcomingActiveRow === index && visibility &&
                                                            <div className="booking_action">
                                                                <a onClick={() => setPopCancelTrip(true)}>Cancel Booking</a>
                                                                <a onClick={() => setPopEmailAgencyVisible(true)}>Email Agency</a>
                                                            </div>}
                                                    </td>

                                            })}
                                        </tr>
                                    </tbody>

                                </>
                            )
                        })

                    }
                    {
                        !(tableData && tableData.length) && <td colSpan={tableHeader.length}
                            style={{ fontSize: "1.25rem" }}
                        >No Data Found</td>
                    }
                </table>
                <DialogModal
                    dialogContent={activeRatingRow}
                    dialogTitle={'Comment'}
                    modalType={'Comment'}
                    modalVisibility={popupVisible}
                    toggleDialogModal={() => setPopVisible(!popupVisible)}
                    onRejection={() => {
                        setPopVisible(false)
                    }}
                />

                <DialogModal
                    dialogContent={tableCellClick}
                    dialogTitle={'How was your Trip?'}
                    modalType={'rateAgency'}
                    modalVisibility={popupRateAgencyVisible}
                    toggleDialogModal={() => setPopRateAgencyVisible(!popupRateAgencyVisible)}
                    activeRow={activeRow}
                    onRejection={() => {
                        setPopRateAgencyVisible(false)
                    }}
                />

                <DialogModal
                    dialogContent={tableCellClick}
                    dialogTitle={'Email Agency'}
                    modalType={'emailAgency'}
                    modalVisibility={popupEmailAgencyVisible}
                    toggleDialogModal={() => setPopEmailAgencyVisible(!popupEmailAgencyVisible)}
                    upcomingActiveRowData={upcomingActiveRowData}
                    onRejection={() => {
                        setPopEmailAgencyVisible(false)
                    }}
                />
                {popupCancelTrip === true ?
                    <CancelTrip popupCancelTrip={popupCancelTrip} upcomingActiveRowData={upcomingActiveRowData} setPopCancelTrip={setPopCancelTrip} /> : ''}
            </div>
        </div>
    )
}