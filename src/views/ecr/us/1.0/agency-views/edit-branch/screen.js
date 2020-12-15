import React, { useState, useEffect } from 'react';
import { reduxForm, Field, change as changeField, initialize } from "redux-form";
import { connect } from 'react-redux';
import './styles.scss';
import { useHistory } from 'react-router-dom';
import validator from './validator';
import AddNewMember from './addNewMember';
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../config/default`);
const { onSubmitFail } = require(`../../../../../../helpers/${PLATFORM}`);
const { SnackbarWrapper } = require(`../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`)
const { ADD_ICON, NAME_REGX, REFERENCE_REGX, PHONE_REGX } = require(`../../../../../../shared/${PLATFORM}/constants`);
const { STRINGS } = require(`../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`);
const { Form } = require(`../../../../../../components/${PLATFORM}/atoms/form`);
const { FormDropDown } = require(`../../../../../../components/${PLATFORM}/atoms/formDropDown/`)
const { Input } = require(`../../../../../../components/${PLATFORM}/atoms/input`);
const { InputSubmit } = require(`../../../../../../components/${PLATFORM}/atoms/input-submit`);
const { DecisionPopup } = require(`../../../../../../components/${PLATFORM}/atoms/decision-popup`);
const { Select } = require(`../../../../../../components/${PLATFORM}/atoms/select`)
const { getCountryData } = require(`../../../../../../helpers/${PLATFORM}/prepare-country-related-data`);
const { TimePickerInput } = require(`../../../../../../components/${PLATFORM}/atoms/time-picker`);

let data = getCountryData();
let callingCodes = data.callingCodes;
let countries = data.nations;
export const Screen = ({
    handleSubmit = () => { },
    onSubmit = () => { },
    data,
    anyUpdate,
    getInsuranceList,
    getBranchManager,
    branchManagers,
    addNewMemberCall,
    changeField,
    getBranchList,
    branchDelete,
    initialValues,
    updateBranch = () => { }
}) => {
    const history = useHistory()
    const postData = (data) => {
        let req = Object.keys(data)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            ).join('&');
        return req
    }
    useEffect(() => {
        let req = postData({ limit: '99999' })
        if (anyUpdate) {
            getInsuranceList(req)
            getBranchManager()
            getBranchList()
        }
    }, [anyUpdate])

    useEffect(() => {
        let req = postData({ limit: '99999' })
        getInsuranceList(req)
        getBranchManager()
        getBranchList()
    }, [])

    useEffect(() => {
        let tempBranchMangersList = []
        tempBranchMangersList = branchManagers && branchManagers.map((item) => {
            return { value: item.name ? item.name + item.surname : " ", label: item.name ? item.name + " " + item.surname : " ", id: item._id, ...item }
        })
        setBranchManagersList(tempBranchMangersList)
        tempBranchMangersList && tempBranchMangersList.filter((item, index) => {
            if (item.id === initialValues.branchManagerId) {
                changeField("editBranch", "branchManager", tempBranchMangersList[index])
            }
        })
    }, [branchManagers])


    const [addNewMember, setAddNewMember] = useState(false)
    const [country, setCountry] = useState('')
    const [phoneKey, setPhoneKey] = useState('')
    const [confirmBox, setConfirmBox] = useState(false)
    const [deleteItemData, setDeleteItemData] = useState()
    const [branchManagersList, setBranchManagersList] = useState([])
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });


    useEffect(() => {
        let requiredIndex;
        let phoneIndex;
        countries.filter((item, index) => {
            if ((item && item.value && item.value.toLowerCase && item.value.toLowerCase()) === (initialValues && initialValues.country && initialValues.country.toLowerCase && initialValues.country.toLowerCase())) {
                requiredIndex = index
            }
        })
        changeField("editBranch", "country", countries[requiredIndex]);
        setCountry(countries[requiredIndex])

        for (let index = 0; index < callingCodes.length; index++) {
            if ((callingCodes[index].value && callingCodes[index].value.toLowerCase && callingCodes[index].value.toLowerCase()) === (initialValues.phoneKey && initialValues.phoneKey.toLowerCase && initialValues.phoneKey.toLowerCase())) {
                phoneIndex = index
                break
            }
        }
        // console.log(initialValues)
        var tempPhoneCode = initialValues && initialValues.phoneKey.split("(")[1]
        tempPhoneCode = tempPhoneCode && tempPhoneCode.split(")")[0]
        callingCodes.filter((item, index) => {
            // if ((item.value && item.value.toLowerCase && item.value.toLowerCase()) === 
            // (initialValues.phoneKey && initialValues.phoneKey.toLowerCase && initialValues.phoneKey.toLowerCase())) {
            var label = item && item.label.split("(")[1]
            label = label.split(')')[0]
            label = label.replace(/\s/g, '')
            if (tempPhoneCode) {
                tempPhoneCode = tempPhoneCode.replace(/\s/g, '')
            }
            if (tempPhoneCode === label) {
                phoneIndex = index
            }
            // }
        })

        changeField("editBranch", "phoneKey", callingCodes[phoneIndex]);
        setPhoneKey(callingCodes[phoneIndex])
        let requiredManager = []

        branchManagers && branchManagers.filter((item, index) => {

            // if(item._id)
        })
        // setBranchManagersList(tempBranchMangersList)

    }, [])


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
                dialogTitle={'Remove'}
                toggleDialogModal={() => setConfirmBox(false)}
                dialogContent={'Do you want to remove the vehicle?'}
                confirmButtonTitle={'Yes'}
                rejectButtonTitle={'No'}
                onConfirmation={() => {

                    branchDelete(deleteItemData, (response) => {
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
                        setConfirmBox(false)
                    }
                    )
                }}
                onRejection={() => {
                    setConfirmBox(false)
                }}
            />}
            {addNewMember && <AddNewMember
                onClose={() => {
                    setAddNewMember(false)
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
                            setAddNewMember(false)
                        }, (response) => {
                            setSnackBarData({
                                variant: response.status ? 'success' : 'error',
                                message: response.msg || 'error'
                            });
                            setOpenSnackbar(true)
                        })
                }}
            />}
            <div className='app-main_outer' onClick={() => {
            }}>
                <div className="container-fluid"
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                >
                    <Form onSubmit={
                        handleSubmit(() => {
                            const { branchName, phoneNumber: phone, phoneKey, email, address, branchManager, city, country, postcode, openfrom, closeby, suburb, code, pickupdropoff1, pickupdropoff2, _id } = data
                            let ptempPhoneKey = (phoneKey && phoneKey.label && phoneKey.label).replace(/\s/g, '')
                            updateBranch({
                                id: _id,
                                name: branchName.trim(),
                                phoneNumber: {
                                    code: ptempPhoneKey,
                                    phone: phone
                                },
                                email,
                                address: address.trim(),
                                suburb: suburb.trim(),
                                city: city.trim(),
                                country: country && country.value,
                                postcode,
                                code: code,
                                pickUp_dropOff_from: new Date(pickupdropoff1).getTime(),
                                pickUp_dropOff_to: new Date(pickupdropoff2).getTime(),
                                openFrom: new Date(openfrom).getTime(),
                                closeBy: new Date(closeby).getTime(),
                                branchManagerId: branchManager && branchManager.id
                            },
                                (response) => {
                                    setSnackBarData({
                                        variant: response.status ? 'success' : 'error',
                                        message: response.msg || 'error'
                                    });
                                    setOpenSnackbar(true)

                                    setTimeout(() => {
                                        history.goBack()
                                    }, 1000)
                                }, (response) => {
                                    setSnackBarData({
                                        variant: response.status ? 'success' : 'error',
                                        message: response.msg || 'error'
                                    });
                                    setOpenSnackbar(true)

                                }
                            )
                        })}>
                        <div className="form-fields">

                            <h4 className='mb-4'>Edit the branch:</h4>

                            <div className="form-row">
                                <div className="col-md-4">
                                    <Field
                                        name={STRINGS.BRANCH_NAME_INPUT}
                                        component={Input}
                                        placeholder={STRINGS.BRANCH_NAME_PLACEHOLDER}
                                        config={{
                                            type: "text",
                                        }}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <Field
                                        name={STRINGS.PHONE_NUMBER_KEY}
                                        component={Input}
                                        placeholder={STRINGS.PHONE_NO}
                                        type={'number'}
                                        normalize={(val, val1) => {
                                            if (PHONE_REGX.test(val)) {
                                                return val
                                            }
                                            else if (val === '') {
                                                return val
                                            }
                                            else {
                                                return val1
                                            }
                                        }}

                                        config={{
                                            type: "text",
                                        }}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <Field
                                        name={STRINGS.EMAIL_INPUT_NAME}
                                        component={Input}
                                        placeholder={STRINGS.EMAIL}
                                        type={'number'}
                                        config={{
                                            type: "text",
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-4">
                                    <Field
                                        name={STRINGS.ADDRESS_INPUT_NAME}
                                        component={Input}
                                        placeholder={STRINGS.ADDRESS}
                                        config={{
                                            type: "text",
                                        }}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <Field
                                        name={STRINGS.SUBURB_INPUT_NAME}
                                        component={Input}
                                        placeholder={STRINGS.SUBURB_PLACEHOLDER}
                                        normalize={(val, val1) => {
                                            if (NAME_REGX.test(val)) {
                                                return val
                                            }
                                            else if (val === '') {
                                                return val
                                            }
                                            else {
                                                return val1
                                            }
                                        }}

                                        config={{
                                            type: "text",
                                        }}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <Field
                                        name={STRINGS.CITY_INPUT}
                                        component={Input}
                                        placeholder={STRINGS.CITY}
                                        type={'number'}
                                        normalize={(val, val1) => {
                                            if (NAME_REGX.test(val)) {
                                                return val
                                            }
                                            else if (val === '') {
                                                return val
                                            }
                                            else {
                                                return val1
                                            }
                                        }}

                                        config={{
                                            type: "text",
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-4">
                                    <Field
                                        name={STRINGS.COUNTRY_INPUT}
                                        component={Select}
                                        placeholder={STRINGS.COUNTRY}
                                        options={countries}
                                        isSearchable={true}
                                        onValueChange={(value) => {
                                            changeField("editBranch", "country", value);
                                            setCountry(value)
                                            let requiredIndex;
                                            for (let index = 0; index < callingCodes.length; index++) {
                                                let position = callingCodes[index].label.indexOf(value && value.value)
                                                if (position !== -1) {
                                                    requiredIndex = index
                                                    break;
                                                }
                                            }
                                            if (value) {
                                                changeField("editBranch", STRINGS.PHONE_CODE_KEY, callingCodes[requiredIndex]);
                                                setPhoneKey(callingCodes[requiredIndex])
                                            }
                                        }
                                        }
                                        config={{
                                            value: country
                                        }
                                        }
                                    />
                                </div>
                                <div className="col-md-4">
                                    <Field
                                        name={STRINGS.POSTCODE_INPUT}
                                        component={Input}
                                        placeholder={STRINGS.POSTCODE_INPUT_PLACEHOLDER}
                                        type={'number'}
                                        normalize={(val, val1) => {
                                            if (REFERENCE_REGX.test(val)) {
                                                return val
                                            }
                                            else if (val === '') {
                                                return val
                                            }
                                            else {
                                                return val1
                                            }
                                        }}

                                        config={{
                                            type: "text",
                                        }}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <Field
                                        name={STRINGS.CODE_INPUT}
                                        component={Input}
                                        placeholder={STRINGS.CODE_PLACEHOLDER}
                                        type={'number'}
                                        normalize={(val, val1) => {
                                            if (REFERENCE_REGX.test(val)) {
                                                return val
                                            }
                                            else if (val === '') {
                                                return val
                                            }
                                            else {
                                                return val1
                                            }
                                        }}

                                        config={{
                                            type: "text",
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col-md-4">
                                    <Field
                                        name={STRINGS.PHONE_CODE_KEY}
                                        component={Select}
                                        options={callingCodes}
                                        isSearchable={true}
                                        placeholder={STRINGS.PHONE_NUMBER_PLACEHOLDER}
                                        data={phoneKey}
                                        onValueChange={(value) => {
                                            changeField("editBranch", "phoneKey", value); setPhoneKey(value)
                                        }
                                        }
                                    />
                                </div>
                                <div className="col-md-4">
                                    <Field
                                        name={STRINGS.PICK_UP_DROP_OFF1}
                                        component={TimePickerInput}
                                        placeholder={STRINGS.PICK_UP_DROP_OFF_FROM}
                                        type={'text'}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <Field
                                        name={STRINGS.OPEN_FROM}
                                        component={TimePickerInput}
                                        placeholder={STRINGS.OPEN_FROM_PLACEHOLDER}
                                        type={'text'}
                                    />
                                </div>
                            </div>
                            <div className="form-row">


                                <div className="col-md-4">
                                    <Field
                                        name={STRINGS.PICK_UP_DROP_OFF2}
                                        component={TimePickerInput}
                                        placeholder={STRINGS.PICK_UP_DROP_OFF_TO}
                                        type={'text'}

                                    />
                                </div>
                                <div className="col-md-4">
                                    <Field
                                        name={STRINGS.CLOSE_BY}
                                        component={TimePickerInput}
                                        placeholder={STRINGS.CLOSE_BY_PLACEHOLDER}
                                        type={'text'}

                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col-md-4 form-group">
                                    <Field
                                        name={STRINGS.BRANCH_MANAGER}
                                        component={FormDropDown}
                                        dataItems={branchManagersList}
                                        placeholder={STRINGS.BRANCH_MANAGER_SELECT_PLACEHOLDER}
                                    />
                                </div>
                                <div className="col-md-2 col-sm-3 col-5">

                                    <div className="add-control"
                                        onClick={() => {
                                            setAddNewMember(true)
                                        }}
                                    >
                                        Add new<i><img
                                            src={ADD_ICON}
                                            width="40" alt="ECR" className="img-fluid" /></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" my-4 d-flex align-items-center">
                            <InputSubmit buttonLabel={"Update Branch"} buttonStyle={"btn btn-sm btn-primary text-capitalize mr-4"}
                                buttonAction={() => {

                                }}
                            />
                            <button className="btn btn-sm btn-outline-blue"
                                type='button'
                                onClick={() => {
                                    history.goBack()
                                }}>
                                Cancel
                        </button>
                        </div>
                    </Form>
                </div >

            </div >
        </>
    );
}

const reduxFormFunction = reduxForm({
    form: "editBranch",
    onSubmitFail,
    validate: validator,
    enableReinitialize: true
})(Screen);

const mapStateToProps = (state, props) => {
    return {
        initialValues: state && state.BranchReducer && state.BranchReducer.editBranchData,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeField: (form, field, value) => {
            dispatch(changeField(form, field, value))
        },
        initialize: () => {
            dispatch(initialize())
        }
    }
}

export const EditBranch = connect(mapStateToProps, mapDispatchToProps)(reduxFormFunction);