import React, { useState, useEffect } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import { reduxForm, Field, change as changeField } from "redux-form";
import AddNewMember from './addNewMember';
const { defaultConfig: { PLATFORM } } = require(`../../../../../../config/default`);
const { DecisionPopup } = require(`../../../../../../components/${PLATFORM}/atoms/decision-popup`);
const { SnackbarWrapper } = require(`../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`)
const {
    ROUTES,
} = require(`../../../../../../shared/${PLATFORM}/constants`);
const { ADD_ICON, CLOSE_ICON } = require(`../../../../../../shared/${PLATFORM}/constants`);
export const EmailOptions = ({
    addReviewMember,
    getReviewMember,
    reviewMembers = [],
    anyUpdate,
    bookingMember = [],
    deleteReviewMember,
    agencyData,
    history,
    updateNotificationSetting
}) => {

    const [selectedCheckbox, setSelectedCheckbox] = useState(0)
    useEffect(() => {
        if (anyUpdate) {
            getReviewMember(1)
            getReviewMember(2)

        }
    }, [anyUpdate])
    useEffect(() => {
        if (bookingMember.length === 0) {
            setSelectedCheckbox(true)
        }
    }, [bookingMember.length])
    useEffect(() => {
        getReviewMember(1)
        getReviewMember(2)

        setSelectedCheckbox(agencyData && agencyData.userAgency && agencyData.userAgency.notificationToPickupBranch)
    }, [])
    const [modalVisible, setModalVisible] = useState(false)
    const [confirmBox, setConfirmBox] = useState(false)
    const [type, setType] = useState()
    const [editData, setEditdata] = useState({
        id: '',
        starRating: '',
        commentTodriver: "",
        commentForEcr: '',
        clickedOn: ""
    })
    const [commentModal, setCommentModal] = useState(false)
    const [deleteItemData, setDeleteItemData] = useState()

    const commentModalVisibility = (data) => {
        setEditdata(data)
        setModalVisible(true)
    }
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });






    return (
        <>
            <div className={`${((snackbarData && snackbarData.variant) === 'error') && `in-modal`}`}>
                <SnackbarWrapper
                    visible={openSnackBar}
                    onClose={() => setOpenSnackbar(false)}
                    variant={snackbarData.variant}
                    message={snackbarData.message}
                />
            </div>
            {confirmBox && <DecisionPopup
                modalVisibility={confirmBox}
                dialogTitle={'Remove Member'}
                toggleDialogModal={() => setConfirmBox(false)}
                dialogContent={'Are you sure, you want to remove this member?'}
                confirmButtonTitle={'Yes'}
                rejectButtonTitle={'No'}
                onConfirmation={() => {

                    deleteReviewMember(deleteItemData, (response) => {
                        setSnackBarData({
                            variant: response.status ? 'success' : 'error',
                            message: response.msg || 'error'
                        });
                        setOpenSnackbar(true)
                        setConfirmBox(false)

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
                    setConfirmBox(false)
                }}
            />}
            {
                modalVisible && <AddNewMember
                    modalVisibility={() => {
                        setModalVisible(false)
                    }}
                    onAddNewAgencyReviewMember={(data) => {
                        const { categoryDescription,
                            city,
                            country,
                            dob,
                            email,
                            name,
                            phone,
                            phoneCode,
                            surname,
                            address,
                        } = data
                        addReviewMember({
                            name,
                            dob: dob,
                            address,
                            city,
                            "country": country.value,
                            email,
                            type,
                            surname,
                            "phoneNumber": {
                                "code": phoneCode.value,
                                phone
                            }
                        }, (response) => {
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
                />
            }
            <div className={'app-main_outer'}>
                <div className="container-fluid">
                    <div className="branch_area">
                        <h5 className="mb-4">Email Settings</h5>
                        <label className="mb-2"><strong>Booking Request email settings</strong></label>
                        <p className="mb-4">Who should receive the email when a new booking request is made? </p>
                    </div>
                    <ul className="email_notify">
                        <li className="radio">
                            <input id="radio-1" name="radio" type="radio" checked={selectedCheckbox} onChange={() => { }} />
                            <label htmlFor="radio-1" className="radio-label"
                                onClick={() => {
                                    setSelectedCheckbox(true)
                                }}>
                                <span>The pick up branch</span>
                            </label>
                        </li>
                        <li className="radio label_add_icon">
                            <input id="radio-2" name="radio" type="radio"
                                checked={!selectedCheckbox}
                                onChange={() => { }}
                            />
                            <label htmlFor="radio-2" className="radio-label"
                                onClick={() => {
                                    (bookingMember && bookingMember.length) && setSelectedCheckbox(false)
                                }}
                            >
                                <span>Or a specific contact - Please add</span>
                            </label> <div className="add_icon mx-1 mx-md-3 p-1" >
                                <i
                                    onClick={() => {
                                        setType(1)
                                        setModalVisible(true)
                                    }}
                                ><img
                                        src={ADD_ICON}
                                        width="20" alt="ECR" className="img-fluid" /></i>
                            </div>
                        </li>
                    </ul>
                    <div className="badges_vehicles mb-5 ml-4">
                        {
                            bookingMember && bookingMember.map((item, index) => {
                                return (
                                    <span className="badge badge-grey" key={index + ''}>{item.name} {!!item.surname && item.surname}
                                        <i className="ml-1"
                                            onClick={() => {
                                                setDeleteItemData(item._id)
                                                setConfirmBox(true)
                                            }}
                                        >
                                            <img src={CLOSE_ICON} alt="" /></i>
                                    </span>
                                )
                            })
                        }
                        {!!!bookingMember.length &&
                            <span>No member found
                            </span>
                        }
                    </div>

                    <div className="branch_area mb-2">
                        <h5 className="mb-3">Review Notification</h5>
                        {/* <label className="mb-3"><strong>Booking Request email settings</strong></label> */}
                    </div>
                    <ul className="email_notify mb-3">
                        <li className="">
                            <label>Add contact to receive review notification - Please add  </label>
                            <div className="add_icon mx-1 mx-md-3 p-1"
                                onClick={() => {
                                    setType(2)
                                    setModalVisible(true)
                                }}>
                                <i><img src={ADD_ICON} width="20" alt="ECR" className="img-fluid" /></i>
                            </div>

                        </li>
                    </ul>
                    <div className="badges_vehicles mb-5">
                        {reviewMembers && reviewMembers.map((item, index) => {
                            return (
                                <span className="badge badge-grey" key={index}>{item.name} {!!item.surname && item.surname}
                                    <i className="ml-1"
                                        onClick={() => {
                                            setDeleteItemData(item._id)
                                            setConfirmBox(true)
                                        }}
                                    >
                                        <img src={CLOSE_ICON} alt="" /></i>
                                </span>
                            )
                        })}
                        {!!!reviewMembers.length &&
                            <span>No member found
                            </span>}
                        {/* 
                        {<span className="badge badge-grey">Dan Hackett
                        <i className="ml-1">
                                <img src={CLOSE_ICON} alt="" /></i>
                        </span>} */}
                    </div>
                    <button
                        className='btn btn-lg btn-primary text-capitalize'

                        onClick={() => {
                            updateNotificationSetting({
                                notificationToPickupBranch: selectedCheckbox
                            }, (response) => {
                                setSnackBarData({
                                    variant: response.status ? 'success' : 'error',
                                    message: "Email settings updated successfully."
                                });
                                setOpenSnackbar(true)
                                setModalVisible(false)
                                setTimeout(() => { history.push(ROUTES.DASHBOARD) }, 1000)
                            }, (response) => {
                                setSnackBarData({
                                    variant: response.status ? 'success' : 'error',
                                    message: response.msg || 'error'
                                });
                                setOpenSnackbar(true)

                            })
                        }}>
                        Save
                    </button>

                </div>
            </div>
        </>
    )
}
const EmailOptionsScreen = reduxForm({
    form: "emailOption",
    // onSubmitFail,
    // validate: validator,
    enableReinitialize: true
})(EmailOptions);

export const Screen = connect(null, null)(EmailOptionsScreen);
