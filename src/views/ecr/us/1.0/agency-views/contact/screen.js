import React, { useState, useEffect } from 'react';
import './styles.scss';
import AddNewMember from './addNewMember';
import { connect } from 'react-redux';
import { reduxForm, Field, change as changeField } from "redux-form";
const { defaultConfig: { PLATFORM } } = require(`../../../../../../config/default`);
const {
    DASHBOARD_PAGE_LOGO,
    ROLE_STATS_ICONS,
    PAGE_TITLES,
    SUB_ADMIN_PLATFORM,
    ROUTES,
    DASHBOARD_LISTING,
    LAYOUTS,
    LABELS
} = require(`../../../../../../shared/${PLATFORM}/constants`);
const { DecisionPopup } = require(`../../../../../../components/${PLATFORM}/atoms/decision-popup`);
const { CustomTable } = require(`../../../../../../components/${PLATFORM}/atoms/custom-table`);
const { RatingAndComment } = require(`../../../../../../components/${PLATFORM}/molecules/rating-comment-modal`);
const { ADD_ICON, CLOSE_ICON } = require(`../../../../../../shared/${PLATFORM}/constants`);
const { InputSubmit } = require(`../../../../../../components/${PLATFORM}/atoms/input-submit`);
const { SnackbarWrapper } = require(`../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`)

export const Contact = ({
    branchManagers,
    getBranchManager,
    deleteMember,
    anyUpdate,
    addNewMemberCall,
    agencyData
}) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [editData, setEditdata] = useState()
    const [commentModal, setCommentModal] = useState(false)
    const [confirmBox, setConfirmBox] = useState(false)
    const [deleteItemData, setDeleteItemData] = useState()
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });
    const commentModalVisibility = (data) => {
        setEditdata(data)
        setModalVisible(true)
    }
    useEffect(() => {
        getBranchManager()
    }, [])
    useEffect(() => {
        if (anyUpdate) {
            getBranchManager()
        }
    }, [anyUpdate])



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
            {
                modalVisible && <AddNewMember
                    editData={editData}
                    modalVisibility={() => {
                        setModalVisible(false)
                    }}
                    onAddNewMember={(data) => {
                        const { email, password, dob, city, country, name, phoneCode, phoneNo, surname } = data
                        addNewMemberCall(
                            {
                                email,
                                password,
                                name,
                                surname,
                                dob: dob.getTime(),
                                city,
                                country: country.value,
                                phoneNumber: {
                                    code: phoneCode.value,
                                    phone: phoneNo
                                }
                            },
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
                            })
                    }}
                />
            }
            {confirmBox && <DecisionPopup
                modalVisibility={confirmBox}
                dialogTitle={'Remove Member'}
                toggleDialogModal={() => setConfirmBox(false)}
                dialogContent={'Are you sure, you want to remove this member?'}
                confirmButtonTitle={'Yes'}
                rejectButtonTitle={'No'}
                onConfirmation={() => {
                    deleteMember(deleteItemData, (response) => {
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
            <div className={'app-main_outer'}>
                <div className="container-fluid">
                    <div className="branch_area mb-3">
                        <h5 className="mb-4">Contact and Managers</h5>
                        <label>List your staff members here</label>
                    </div>
                    <div className="col-md-2 col-sm-3 col-5 add-control mb-3"
                        onClick={() => {
                            setModalVisible(true)
                        }}
                    >
                        Add new <i><img
                            src={ADD_ICON}
                            width="20" alt="ECR" className="img-fluid" /></i>
                    </div>
                    <div className="badges_vehicles mb-5">
                        {
                            branchManagers && branchManagers.map((item, index) => {
                                if (item._id !== agencyData._id) {
                                    return (
                                        <span className="badge badge-grey"
                                            key={index + ''}
                                        >{item.name} {item.surname}
                                            {/* <i className="ml-3"
                             onClick={()=>{
                                setEditdata(item)
                                setModalVisible(true)
                             }}
                             ><img src={CLOSE_ICON} alt="" /></i> */}
                                            <i className="ml-1"
                                                onClick={() => {
                                                    setConfirmBox(true)
                                                    setDeleteItemData(item._id)
                                                }}
                                            >
                                                <img src={CLOSE_ICON} alt="" /></i>
                                        </span>
                                    )
                                }

                            })
                        }
                        {
                            !!(branchManagers.length === 1) && <span>
                                No staff member
                       </span>
                        }
                    </div>
                    {/* <div className="branch_area mb-3">
                        <h5 className="mb-3">Booking request email settings</h5>
                        <p className="mb-2">who should receive the email when a new booking request is made ? </p>
                    </div> */}
                    {/* <ul className="email_notify">
                <li className="radio">
                    <input id="radio-1" name="radio" type="radio" />
                    <label htmlFor="radio-1" class="radio-label"> 
                       The pick up branch
                    </label>
                </li>
                <li className="radio">
                    <input id="radio-2" name="radio" type="radio" />
                    <label htmlFor="radio-2" class="radio-label"> 
                       Or a specific contact - please add 
                        
                    </label> <div className="add_icon mx-2">
                        <i><img
                            src={ADD_ICON}
                            width="20" alt="ECR" className="img-fluid" /></i>
                      </div>
                </li>
                </ul> */}
                    {/* <div className="badges_vehicles mb-5 ml-4">
                    { <span class="badge badge-grey">Francis silvestre
                        <i className="ml-1">
                            <img src={CLOSE_ICON} alt="" /></i>
                    </span> }
             
                    { <span class="badge badge-grey">Dan Hackett
                        <i className="ml-1">
                            <img src={CLOSE_ICON} alt="" /></i>
                    </span> }
                </div> */}

                    {/* <div className="branch_area mb-2">
                    <h5 className="mb-3">Review Notification</h5>
                </div> */}
                    {/* <ul className="email_notify mb-3">
                <li className="">
                     <label>Add contact to receive review notification - Please add  </label>
                        <div className="add_icon mx-3">
                       
                            <i><img src={ADD_ICON} width="20" alt="ECR" className="img-fluid" /></i>
                        </div>
                  
                </li>
                </ul> */}
                    {/* <div className="badges_vehicles mb-5 ml-0">
                    { <span class="badge badge-grey">Francis silvestre
                        <i className="ml-1">
                            <img src={CLOSE_ICON} alt="" /></i>
                    </span> }
             
                    { <span class="badge badge-grey">Dan Hackett
                        <i className="ml-1">
                            <img src={CLOSE_ICON} alt="" /></i>
                    </span> }
                </div> */}
                    {/* 
                    <InputSubmit buttonLabel={"Save"} buttonStyle={"btn btn-sm btn-primary text-capitalize"} /> */}
                </div>
            </div>
        </>
    )
}

const ContactScreen = reduxForm({
    form: "addNewListingFormStep1",
    // onSubmitFail,
    // validate: validator,
    enableReinitialize: true
})(Contact);

export const Screen = connect(null, null)(ContactScreen);