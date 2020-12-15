import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { reset } from "redux-form";
import './styles.scss';
import moment from 'moment'
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../../config/default`);
const { DriverDrawer } = require(`../../../../../../../components/${PLATFORM}/atoms/driver-drawer`);
const { STRINGS } = require(`../../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`)
const { StarRatingComponent } = require(`../../../../../../../components/${PLATFORM}/atoms/star-component`);
const { DRIVER_DRAWER_ITEMS, CLOSE_ICON, ALT_TEXTS, LABELS, LOGIN_TYPES } = require(`../../../../../../../shared/${PLATFORM}/constants`);
const { EditProfileForm } = require("./editProfileForm.js")
const { ChangePasswordForm } = require("./changePassword.js")
const { SnackbarWrapper } = require(`../../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`);
const { ROUTES } = require(`../../../../../../../shared/${PLATFORM}/constants`);
const { getCountryData } = require(`../../../../../../../helpers/${PLATFORM}/prepare-country-related-data`);

let data = getCountryData();
let callingCodes = data.callingCodes;

export const Screen = ({ getDriverProfile, updateDriverProfile,
    getProfileInformation, changeDriverPassword, logout, userToken, prevLocation }) => {
    const [editProfileMode, setEditProfileMode] = useState(false);
    let history = useHistory();

    const updateProfileFunction = () => {
        getDriverProfile(() => { }, (error) => {
            setSnackBarData({
                variant: error.status ? 'success' : 'error',
                message: error.msg || 'error'
            });
            setOpenSnackbar(true)
        })
    }

    useEffect(() => {
        updateProfileFunction()
    }, [])

    const [fields, setFields] = useState({
        name: '',
        surname: '',
        email: '',
        dob: '',
        phoneNumber: '',
        phoneKey: '',
        city: '',
        country: ''
    })
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });
    const [popupVisible, setPopVisible] = useState(false);
    const [openSnackBar, setOpenSnackbar] = useState(false);

    const capitalizeFirstLetter = (string) => {
        if (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }

    useEffect(() => {
        let phoneIndex
        var tempPhoneCode = getProfileInformation && getProfileInformation.phoneNumber &&
            getProfileInformation.phoneNumber.code && getProfileInformation.phoneNumber.code.split("(")[1]

        tempPhoneCode = tempPhoneCode && tempPhoneCode.split(")")[0]
 
        callingCodes.filter((item, index) => {
            var label = item && item.label.split("(")[1]
            label = label.split(')')[0]
            label = label.replace(/\s/g, '')
            if(tempPhoneCode){
            tempPhoneCode = tempPhoneCode.replace(/\s/g, '')
            }
            if (tempPhoneCode === label) {

                phoneIndex = index
            }
        })

        setFields({
            name: getProfileInformation && getProfileInformation.name,
            surname: getProfileInformation && getProfileInformation.surname,
            email: getProfileInformation && getProfileInformation.email,
            dob: getProfileInformation && getProfileInformation.dob,
            phoneNumber: getProfileInformation && getProfileInformation.phoneNumber && getProfileInformation.phoneNumber.phone,
            phoneKey: callingCodes[phoneIndex],
            city: getProfileInformation && getProfileInformation.city,
            country: {
                label: capitalizeFirstLetter(getProfileInformation && getProfileInformation.country),
                value: capitalizeFirstLetter(getProfileInformation && getProfileInformation.country)
            }
        })
    }, [getProfileInformation])

    useEffect(() => {

    },[fields])

    return (
        <>
        <div className="app-main_outer driver_head">
            <SnackbarWrapper
                visible={openSnackBar}
                onClose={() => setOpenSnackbar(false)}
                variant={snackbarData.variant}
                message={snackbarData.message}
            />
            <div className="container-fluid myProfile">
                <h5 className="mb-4"> {
                    editProfileMode === false ? 'Here is your profile'
                        : 'Edit your profile'}
                </h5>
                <div className="profile_info">
                    {
                        editProfileMode === false ?
                            <>
                            <ul className="profile_info profile_shw mb-2">
                              
                                <li><label>{STRINGS.NAME}:</label> {getProfileInformation && getProfileInformation.name ? getProfileInformation.name : ''}
                                    {getProfileInformation && getProfileInformation.surname ? ` ${getProfileInformation.surname}` : ''} </li>
                                <li><label>{STRINGS.EMAIL}:</label> {getProfileInformation && getProfileInformation.name ? getProfileInformation.email : ''}</li>
                                <li><label>{STRINGS.PHONE_NO}:</label>{fields && fields.phoneKey && fields.phoneKey.value ? fields.phoneKey.value : ''}
                                    {getProfileInformation && getProfileInformation.phoneNumber ? ` ${getProfileInformation.phoneNumber.phone}` : ''}
                                </li>
                                <li><label>{STRINGS.ADDRESS}:</label> {getProfileInformation && getProfileInformation.city ? `${capitalizeFirstLetter(getProfileInformation.city)}, ` : ''}
                                    {getProfileInformation && getProfileInformation.country ? capitalizeFirstLetter(getProfileInformation.country) : ''}</li>
                                <li><label>{STRINGS.DOB.toUpperCase()}:</label>
                                    {getProfileInformation && getProfileInformation.dob ? moment(getProfileInformation.dob).format("DD/MM/YYYY") : ''}
                                </li>
                            </ul>
                            <a className="btn btn-sm btn-primary my-2" onClick={() => {
                                setEditProfileMode(true)
                            }} style={{ color: 'white' }}>{STRINGS.EDIT}</a>
                            {getProfileInformation && getProfileInformation.loginType === LOGIN_TYPES.NORMAL ?
                                <div className="form-fields my-4">
                                    <label className="mb-3">{LABELS.changePasswordheading}</label>

                                    <ChangePasswordForm
                                        onSubmit={(credentials, dispatch) => {
                                            let postData = {
                                                "currentPassword": credentials.password,
                                                "newPassword": credentials.Password
                                            }
                                            changeDriverPassword(postData, (response) => {
                                                setSnackBarData({
                                                    variant: response.status ? 'success' : 'error',
                                                    message: response.msg || 'error'
                                                });
                                                setOpenSnackbar(true)
                                                dispatch(reset('ChangePasswordForm'))
                                                logout(userToken, () => { }, () => { })
                                                // history.replace(ROUTES.DASHBOARD)

                                            }, (error) => {
                                                setSnackBarData({
                                                    variant: error.status ? 'success' : 'error',
                                                    message: error.msg || 'error'
                                                });
                                                setOpenSnackbar(true)
                                            })
                                        }}
                                    />
                                </div>
                                : ''
                            }
                            <div className="col-md-12">
                                <div className="row align-items-start">
                                    <div className="pr-4"><span className="rated">{LABELS.overallScoreLabel} {getProfileInformation && getProfileInformation.overallRating && getProfileInformation.overallRating ?
                                        getProfileInformation.overallRating % 1 ?
                                            getProfileInformation.overallRating.toFixed(2) : getProfileInformation.overallRating : 0} {STRINGS.OUT_OF} 5</span></div>
                                    <div className="d-flex flex-column text-center">
                                        <StarRatingComponent initialRating={getProfileInformation && getProfileInformation.overallRating}
                                            readonly={true} />
                                        <a id='comment'>Find out more</a>
                                    </div>
                                </div>
                            </div>
                            </>
                            :
                            <>
                          
                            <EditProfileForm
                                setEditProfileMode={setEditProfileMode}
                                updateProfile={updateDriverProfile}
                                fields={fields}
                                setFields={setFields}
                                onSubmit={(credentials) => {
                                    let postData
                                    let ptempPhoneKey = (credentials.phoneKey && credentials.phoneKey.label &&
                                        credentials.phoneKey.label).replace(/\s/g, '')
                                    if (credentials) {
                                        postData = {
                                            name: credentials.name,
                                            email: credentials.email,
                                            city: credentials.city,
                                            country: credentials.country.value,
                                            phoneNumber: { code: credentials.phoneKey && credentials.phoneKey.label, phone: credentials.phoneNumber },
                                            surname: credentials.surname,
                                            dob: new Date(credentials.dob).getTime()
                                        }
                                    }

                                    updateDriverProfile(postData, (response) => {
                                        setSnackBarData({
                                            variant: response.status ? 'success' : 'error',
                                            message: response.msg || 'error'
                                        });
                                        setOpenSnackbar(true)
                                        updateProfileFunction()
                                        setEditProfileMode(false)
                                        if (prevLocation === ROUTES.VEHICLE_SUMMARY && (getProfileInformation.loginType === 2 ||
                                            getProfileInformation.loginType === 3)) {
                                            history.replace(ROUTES.VEHICLE_SUMMARY)
                                        }
                                    }, (error) => {
                                        setSnackBarData({
                                            variant: error.status ? 'success' : 'error',
                                            message: error.msg || 'error'
                                        });
                                        setOpenSnackbar(true)
                                    })
                                }} />

                    </>
                    }
                </div>

            </div>
        </div>
        </>
    )
}