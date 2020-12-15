import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { reset } from "redux-form";
import './styles.scss';
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../config/default`);
const { STRINGS } = require(`../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`)
const { ROUTES, LABELS, LOGIN_TYPES, PASSWORD_HIDE_ICON,
    PASSWORD_EYE } = require(`../../../../../../shared/${PLATFORM}/constants`);
const { EditProfileForm } = require("./editProfileForm.js")
const { ChangePasswordForm } = require("./changePassword.js")
const { SnackbarWrapper } = require(`../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`);
export const Screen = ({ getProfile,
    getProfileInformation, changePassword, prevLocation, updateMember }) => {
    const [editProfileMode, setEditProfileMode] = useState(false);
    let history = useHistory();

    const updateProfileFunction = () => {
        getProfile(() => { }, (error) => {
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
        setFields({
            name: getProfileInformation && getProfileInformation.name,
            surname: getProfileInformation && getProfileInformation.surname,
            email: getProfileInformation && getProfileInformation.email,
            dob: getProfileInformation && getProfileInformation.dob,
            phoneNumber: getProfileInformation && getProfileInformation.phoneNumber && getProfileInformation.phoneNumber.phone,
            phoneKey: getProfileInformation && getProfileInformation.phoneNumber && getProfileInformation.phoneNumber.code,
            city: getProfileInformation && getProfileInformation.city,
            country: {
                label: capitalizeFirstLetter(getProfileInformation && getProfileInformation.country),
                value: capitalizeFirstLetter(getProfileInformation && getProfileInformation.country)
            }
        })
    }, [getProfileInformation])

    return (
        <>
            <div className="app-main_outer">
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
                                        {/* <li><label>{STRINGS.PHONE_NO}:</label>{getProfileInformation && getProfileInformation.phoneNumber ? getProfileInformation.phoneNumber.code : ''}
                                            {getProfileInformation && getProfileInformation.phoneNumber ? ` ${getProfileInformation.phoneNumber.phone}` : ''}
                                        </li> */}
                                        <li><label>{STRINGS.ADDRESS}:</label> {getProfileInformation && getProfileInformation.city ? `${capitalizeFirstLetter(getProfileInformation.city)}, ` : ''}
                                            {getProfileInformation && getProfileInformation.country ? capitalizeFirstLetter(getProfileInformation.country) : ''}</li>
                                        {/* <li><label>{STRINGS.DOB.toUpperCase()}:</label>
                                            {getProfileInformation && getProfileInformation.dob ? moment(getProfileInformation.dob).format("DD/MM/YYYY") : ''}
                                        </li> */}
                                    </ul>
                                    <a className="btn btn-sm btn-primary my-2" onClick={() => {
                                        setEditProfileMode(true)
                                    }} style={{ color: 'white' }}>{STRINGS.EDIT}</a>
                                    {(getProfileInformation && getProfileInformation.loginType) === LOGIN_TYPES.NORMAL ?
                                        <div className="form-fields my-4">
                                            <label className="mb-3">{LABELS.changePasswordheading}</label>

                                            <ChangePasswordForm
                                                passwordHideLogo={PASSWORD_HIDE_ICON}
                                                passwordEyeLogo={PASSWORD_EYE}
                                                onSubmit={(credentials, dispatch) => {
                                                    let postData = {
                                                        "currentPassword": credentials.password,
                                                        "newPassword": credentials.Password
                                                    }
                                                    changePassword(postData, (response) => {
                                                        setSnackBarData({
                                                            variant: response.status ? 'success' : 'error',
                                                            message: response.msg || 'error'
                                                        });
                                                        setOpenSnackbar(true)
                                                        dispatch(reset('ChangePasswordForm'))
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
                                </>
                                :
                                <EditProfileForm
                                    setEditProfileMode={setEditProfileMode}
                                    updateProfile={updateMember}
                                    fields={fields}
                                    setFields={setFields}
                                    onSubmit={(credentials) => {
                                        let postData
                                        const { email, name, city, country, phoneKey, phoneNumber, surname, dob } = credentials
                                        if (credentials) {
                                            postData = {
                                                name,
                                                email,
                                                city,
                                                country: country.value,
                                                surname,
                                                dob: new Date(dob)
                                            }
                                        }

                                        updateMember(postData, (response) => {
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

                        }
                    </div>

                </div>
            </div>
        </>
    )
}