import React, { useState, useEffect } from 'react';
import './styles.scss';
import classNames from 'classnames';
export const ActionDropDown = ({
    checkboxmenu,
    selectedId,
    BOOKING_STATUS,
    changeStatusDashboard,
    currentStatus,
    currentData,
    onEdit,
    onDelete,
    anyUpdate,
    onCopy = () => { },
    onShareAndInvite = () => { },
    onBooking = () => { }
}) => {

    useEffect(() => {
        console.log(currentStatus, 'currentStatus')
        Object.values(BOOKING_STATUS).map((item, index) => {
            if (currentStatus === item) {
                setCheckedIndex(index)
            }
        })
    }, [currentStatus])
    useEffect(() => {
        if (anyUpdate) {
            Object.values(BOOKING_STATUS).map((item, index) => {
                if (currentStatus === item) {
                    setCheckedIndex(index)
                }
            })
        }
    }, [anyUpdate])

    const [checkedIndex, setCheckedIndex] = useState(currentStatus)
    return (
        <ul className="drop_down" >
            {
                checkboxmenu.map((item, index) => {
                    return (
                        <li key={index + ''}>
                            <div className="form-checkbox">
                                <input type="checkbox" name='name' className="form-check-input" checked={index === checkedIndex}
                                    onChange={
                                        () => {

                                            let arr = document.getElementById(`check-box-${item.status}`).className.split(' ')
                                            console.log(arr)
                                            if (arr.includes('border-disabled')) {
                                                return
                                            } else {
                                                if ((index) !== checkedIndex) {
                                                    console.log(Object.values(BOOKING_STATUS), 'in action')
                                                    changeStatusDashboard(Object.values(BOOKING_STATUS)[index], selectedId)
                                                    setCheckedIndex(index)
                                                }
                                            }
                                        }
                                    }
                                />
                                <span id={`check-box-${item.status}`} className={classNames(["checkmark",

                                    {
                                        'border-success': (item.status == 'Available'),
                                        'border-disabled': (item.status == 'Available' && currentStatus == BOOKING_STATUS.BOOKED
                                            || item.status == 'Available' && currentStatus == BOOKING_STATUS.COMPLETE ||
                                            item.status == 'Available' && currentStatus == BOOKING_STATUS.CANCELLED_BY_DRIVER ||
                                            item.status == 'Available' && currentStatus == BOOKING_STATUS.CANCELLED_BY_AGENCY ||
                                            item.status == 'Available' && currentStatus == BOOKING_STATUS.NO_SHOW
                                        ),
                                    },
                                    {
                                        'border-request': item.status == 'Request',
                                        'border-disabled': (item.status == "Request" && currentStatus == BOOKING_STATUS.BOOKED ||
                                            item.status == "Request" && currentStatus == BOOKING_STATUS.COMPLETE ||
                                            item.status == 'Request' && currentStatus == BOOKING_STATUS.CANCELLED_BY_DRIVER ||
                                            item.status == 'Request' && currentStatus == BOOKING_STATUS.CANCELLED_BY_AGENCY) ||
                                            item.status == 'Request' && currentStatus == BOOKING_STATUS.NO_SHOW
                                    },
                                    {
                                        'border-red': item.status == "Requested"
                                    },
                                    {
                                        'border-primary': item.status == 'Booked',
                                        'border-disabled': (item.status == "Booked" && currentStatus == BOOKING_STATUS.COMPLETE ||
                                            item.status == "Booked" && currentStatus == BOOKING_STATUS.COMPLETE ||
                                            item.status == 'Booked' && currentStatus == BOOKING_STATUS.CANCELLED_BY_DRIVER ||
                                            item.status == 'Booked' && currentStatus == BOOKING_STATUS.CANCELLED_BY_AGENCY ||
                                            item.status == 'Booked' && currentStatus == BOOKING_STATUS.NO_SHOW
                                        )

                                    },
                                    {
                                        'border-danger': item.status == 'CancelByAgency',
                                        'border-disabled': (item.status == "CancelByAgency" && currentStatus == BOOKING_STATUS.COMPLETE ||
                                            item.status == 'CancelByAgency' && currentStatus == BOOKING_STATUS.CANCELLED_BY_DRIVER ||
                                            item.status == 'CancelByAgency' && currentStatus == BOOKING_STATUS.NO_SHOW

                                        )
                                    },
                                    {
                                        'border-danger': item.status == 'CancelByDriver',
                                        'border-disabled': (item.status == "CancelByDriver" && currentStatus == BOOKING_STATUS.COMPLETE ||
                                            item.status == 'CancelByDriver' && currentStatus == BOOKING_STATUS.CANCELLED_BY_AGENCY ||
                                            item.status == 'CancelByDriver' && currentStatus == BOOKING_STATUS.NO_SHOW

                                        )
                                    },
                                    {
                                        'border-secondary': item.status == 'Expired',
                                        'border-disabled': (item.status == "Expired" && currentStatus == BOOKING_STATUS.BOOKED ||
                                            item.status == "Expired" && currentStatus == BOOKING_STATUS.COMPLETE ||
                                            item.status == 'Expired' && currentStatus == BOOKING_STATUS.CANCELLED_BY_DRIVER ||
                                            item.status == 'Expired' && currentStatus == BOOKING_STATUS.CANCELLED_BY_AGENCY ||
                                            item.status == 'Expired' && currentStatus == BOOKING_STATUS.NO_SHOW
                                        )
                                    },
                                    {
                                        'border-warning': item.status == 'No show',
                                        'border-disabled': (item.status == "No show" && currentStatus == BOOKING_STATUS.COMPLETE ||
                                            item.status == 'No show' && currentStatus == BOOKING_STATUS.CANCELLED_BY_DRIVER ||
                                            item.status == 'No show' && currentStatus == BOOKING_STATUS.CANCELLED_BY_AGENCY ||
                                            item.status == 'No show' && currentStatus == BOOKING_STATUS.NO_SHOW
                                        )
                                    },
                                    {
                                        'border-complete': item.status == 'Complete',
                                        'border-disabled': (item.status == "Complete" &&
                                            item.status == 'Complete' && currentStatus == BOOKING_STATUS.CANCELLED_BY_DRIVER ||
                                            item.status == 'Complete' && currentStatus == BOOKING_STATUS.CANCELLED_BY_AGENCY ||
                                            item.status == 'Complete' && currentStatus == BOOKING_STATUS.NO_SHOW
                                        )
                                    },
                                    // {
                                    //     'border-request': item.status == 'Request'
                                    // }
                                ])}
                                ></span>
                                <span>{item.name}</span>
                            </div>
                        </li>
                    )
                })
            }
            <li className={`${(BOOKING_STATUS.EXPIRE === currentData.status) && 'disable-edit'}`}>
                <span className={`user_edit`}
                    onClick={() => {
                        if (BOOKING_STATUS.EXPIRE === currentData.status || BOOKING_STATUS.BOOKED === currentData.status ||
                            BOOKING_STATUS.NO_SHOW === currentData.status || BOOKING_STATUS.CANCELLED_BY_AGENCY === currentData.status ||
                            BOOKING_STATUS.CANCELLED_BY_DRIVER === currentData.status || BOOKING_STATUS.COMPLETE === currentData.status
                        ) {
                            return
                        }
                        onEdit(currentData)
                    }}
                >Edit</span>
            </li>
            <li>
                <span className={`user_edit`}
                    onClick={() => {
                        onCopy(currentData)
                    }}
                >Duplicate</span>
            </li>
            {(BOOKING_STATUS.AVAILABLE === currentData.status) && <li>
                <span className={`user_edit`}
                    onClick={() => {
                        onShareAndInvite(currentData)
                    }}
                >Share and Invite</span>
            </li>}
            <li>
                <span className="user_edit"
                    onClick={() => {
                        onDelete(currentData && currentData._id)
                    }}
                >Delete</span>
            </li>
        </ul >
    );
}


