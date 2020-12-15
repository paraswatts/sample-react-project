import React, { useState, useEffect } from "react";
import { reduxForm, Field, FieldArray, change as changeField } from "redux-form";
import { connect } from 'react-redux';
import "./style.scss";
import validator from "./formValidatorStep2";
import classNames from 'classnames';
import Tooltip from '@material-ui/core/Tooltip';
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../config/default`);
const { Checkbox } = require(`../../../../../../components/${PLATFORM}/atoms/checkbox`);
const { DatePickerInput } = require(`../../../../../../components/${PLATFORM}/atoms/date-picker`)
const { Form } = require(`../../../../../../components/${PLATFORM}/atoms/form`);
const {
    getBranchList,
    getFuelList,
    getInsuranceList,
    getTerms,
    addInsurance,
    addFerry,
    getFerry,
    addFuelOffer,
    getFuelOffer,
    addExtraItems,
    getExtraItems,
    setFormStep2Data,
    fileUploader
} = require(`../../../../../../redux/${PLATFORM}/actions`);
const { STRINGS } = require(`../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`)
const { Input } = require(`../../../../../../components/${PLATFORM}/atoms/input`);
const { InputSubmit } = require(`../../../../../../components/${PLATFORM}/atoms/input-submit`);
const { onSubmitFail } = require(`../../../../../../helpers/${PLATFORM}`);
const { ADD_ICON, PHONE_REGX, LABELS, FREQUECY, PRICE_REGX, CLEAR_ICON, MINUS_ICON } = require(`../../../../../../shared/${PLATFORM}/constants`);
const { registerUser } = require(`../../../../../../redux/${PLATFORM}/actions/auth`)
const { Select } = require(`../../../../../../components/${PLATFORM}/atoms/select`)
const { FormDropDown } = require(`../../../../../../components/${PLATFORM}/atoms/formDropDown/`)
const { getCountryData } = require(`../../../../../../helpers/${PLATFORM}/prepare-country-related-data`);
const { TextArea } = require(`../../../../../../components/${PLATFORM}/atoms/text-area`)
const { AddNewInsurance } = require(`./addNewInsurance`)
const { AddNewFerryCost } = require(`./addFerryCost`)
const { AddNewFuel } = require(`./addNewFuel`)
const { SnackbarWrapper } = require(`../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`)

let fieldsData = [];
let data = getCountryData();
let callingCodes = data.callingCodes;
let countries = data.nations;
let onSubmition = false;
let previousLength;
const renderMembers = (props) => {
    const { fields, onAdd, onChangeField, name, extraItemsList, removeSelected } = props

    fields.length === 0 && fields.push({})
    return (

        <React.Fragment>
            {
                fields && fields.map((member, index) => {
                    return (
                        <React.Fragment key={index + ''}>

                            <div className="form-row">
                                <div className="col-md-4 col-sm-5 col-10">
                                    <Field
                                        name={`${member}.${'name'}`}
                                        component={Input}
                                        placeholder={"Description:"}
                                    />
                                </div>
                                <div className="col-md-2 col-sm-4 col-10">
                                    <div className="form-group">
                                        <Field
                                            name={`${member}.${'price'}`}
                                            component={Input}
                                            normalize={(val, val1) => {
                                                if (PRICE_REGX.test(val)) {
                                                    return val
                                                }
                                                else if (val === '') {
                                                    return val
                                                }
                                                else {
                                                    return val1
                                                }
                                            }}
                                            isSearchable={true}
                                            placeholder={"Price $"}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-2 col-sm-4 col-10">
                                    <div className="form-group">
                                        <Field
                                            name={`${member}.${'frequency'}`}
                                            component={FormDropDown}
                                            dataItems={FREQUECY}
                                            isSearchable={true}

                                            placeholder={"Frequency"}
                                        />
                                    </div>
                                </div>
                                <div className={'remove-button-wrapper'}>
                                    <Tooltip title={!(fields && fields.length === 1) ? 'Remove' : "Clear"} aria-label="add">
                                        <button type={'button'}
                                            className={'remove-admin-button'}
                                            onClick={() => {
                                                // removeSelected(fields.get(index));
                                                fields.remove(index);
                                            }}>
                                            <img src={!(fields && fields.length === 1) ? CLEAR_ICON : MINUS_ICON} alt="ECR" alt="ECR" />
                                        </button>
                                    </Tooltip>
                                </div>
                            </div>
                        </React.Fragment>
                    )
                })
            }
            <div className="form-row">
                <div className="col-md-8 col-sm-8 col-10">
                    <div className="form-row justify-content-end">
                        <div className="col-md-3 col-sm-5">
                            <div className="form-group">
                                <div className="add-control" onClick={() => {
                                    fields.push({})
                                }}>
                                    {LABELS.addNew}<i><img src={ADD_ICON} width="40" alt="ECR" className="img-fluid" /></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </React.Fragment>
    );
}
const SignupForm = ({
    handleSubmit = () => { },
    props,
    subscribe,
    credentials = {
        CompanyName: '',
        name: '',
        surname: '',
        dob: '',
        city: '',
        country: '',
        email: '',
        phoneKey: '',
        phoneNumber: '',
        password: '',
        reenter_password: '',
        subscribe: ''
    },
    onSubmit = () => { },
    setSubscribeChange = () => { },
    setCredentials = () => { },
    children,
    onBack = () => { },
    insuranceData,
    getFuelList,
    fualData,
    getInsuranceList,
    errors,
    inputtedValues,
    changeField,
    addInsurance,
    anyUpdate,
    addFerry,
    getFerry,
    ferryData,
    addFuelOffer,
    getFuelOffer,
    addExtraItems,
    getExtraItems,
    fuelOfferData,
    extraItemsData,
    setFormStep2Data,
    initialValues,
    fileUploader
}) => {
    const [checkboxOptionVisible, setCheckboxOptionVisible] = useState(new Set());
    const [insuranceList, setInsuranceList] = useState([])
    const [fuelList, setFuelList] = useState([])
    const [ferryList, setFerryList] = useState()
    const [addNewInsurance, setAddNewInsurance] = useState(false)
    const [addNewFerry, setAddNewFerry] = useState(false)
    const [addNewFual, setAddNewFual] = useState(false);
    const [extraListData, setExtraListData] = useState([]);
    const [fuelOfferList, setFuelOfferList] = useState([])
    const [extraItemsList, setExtraItemsList] = useState([]);
    const [selectedExtraList, setSelectedExtraList] = useState([]);
    const [selectedExtraItems, setSelectedExtraItems] = useState([])
    const [fieldsData, setFieldsData] = useState([])
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [clearValue, setClearValue] = useState(false)
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });
    const [insurancNameValue, setInsurancNameValue] = useState(false)
    const [ferryCostValue, setFerryCostValue] = useState(false)
    const [fuelOfferName, setFuelOfferName] = useState(false)
    const [freeDays, setFreeDays] = useState(1)
    useEffect(() => {
        let req = postData({ limit: '99999' })
        getInsuranceList(req, () => { }, () => { })
        getFuelList()
        getFerry()
        getFuelOffer()
        getExtraItems()
    }, [])


    const postData = (data) => {
        let req = Object.keys(data)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            ).join('&');
        return req
    }

    useEffect(() => {

        if (anyUpdate) {
            let req = postData({ limit: '99999' })
            getInsuranceList(req, () => { }, () => { })
            getFuelList()
            getFerry()
            getFuelOffer()
            getExtraItems()
        }
    }, [anyUpdate])

    useEffect(() => {
        let tempExtraLists = []
        tempExtraLists = extraItemsData && extraItemsData.map((item) => {
            return {
                label: item.name ? item.name : '',
                ...item
            }
        })
        setExtraListData(tempExtraLists)

    }, [extraItemsData])


    useEffect(() => {

        let tempFualOfferList = []
        tempFualOfferList = fuelOfferData && fuelOfferData.map((item) => {
            return { value: item.value ? item.value : " ", label: item.value ? item.value : '', id: item._id ? item._id : "", ...item }
        })
        setFuelOfferList(tempFualOfferList)
    }, [fuelOfferData])
    useEffect(() => {

        let tempFerryList = []
        tempFerryList = ferryData && ferryData.map((item) => {
            return { value: item.name ? item.name : " ", label: item.name ? item.name : '', description: item.description ? item.description : "", id: item._id ? item._id : "", ...item }
        })
        setFerryList(tempFerryList)
    }, [ferryData])
    useEffect(() => {
        let tempInsuranceList = []
        tempInsuranceList = insuranceData && insuranceData.map((item) => {
            return { value: item.name ? item.name : " ", label: item.name ? item.name : '', excess: item.excess ? item.excess : '', id: item._id ? item._id : "", ...item }
        })
        setInsuranceList(tempInsuranceList)
    }, [insuranceData])

    useEffect(() => {

        let tempFuelList = []
        tempFuelList = fualData && fualData.map((item) => {
            return { value: item.fuelType ? item.fuelType : " ", label: item.fuelType ? item.fuelType : " ", ...item }
        })
        setFuelList(tempFuelList)
    }, [fualData])



    useEffect(() => {
        let tempSet = new Set();
        for (let key in inputtedValues) {
            if (inputtedValues[key] === true) {
                tempSet.add(key)
            }
        }

        setCheckboxOptionVisible(tempSet)
        setInsurancNameValue(inputtedValues && inputtedValues.insurance)
        setFerryCostValue(inputtedValues && inputtedValues.ferryCost)
        setFuelOfferName(inputtedValues && inputtedValues.fuel)
    }, [inputtedValues])

    useEffect(() => {
        // setInsurancNameValue(inputtedValues && inputtedValues.insurance)
        changeField('formstep2', STRINGS.FREE_DAYS_AVAILABLE_NAME, !!(initialValues && initialValues.freeDaysAvailable) ? (initialValues && initialValues.freeDaysAvailable) : 1)
        setFreeDays(!!(initialValues && initialValues.freeDaysAvailable) ? (initialValues && initialValues.freeDaysAvailable) : 1)
        changeField('formstep2', 'new_item_description', initialValues && initialValues.new_item_description);
        changeField('formstep2', 'members', initialValues && initialValues.members);
        changeField('formstep2', 'yourSavedLists', initialValues && initialValues.yourSavedLists);
        setSelectedExtraList(initialValues && initialValues.yourSavedLists);
        let tempExtraItemsLists = []
        tempExtraItemsLists = initialValues && initialValues.yourSavedLists && initialValues.yourSavedLists.items && initialValues.yourSavedLists.items.map((item) => {
            return {
                label: item.name ? item.name : '',
                ...item
            }
        })
        setSelectedExtraItems(tempExtraItemsLists)
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

            {addNewInsurance && <AddNewInsurance
                modalVisibilityHandler={() => setAddNewInsurance(false)}
                onAddNewInsuranceClick={(data) => {
                    addInsurance(data, (response) => {
                        setSnackBarData({
                            variant: 'success',
                            message: response.msg
                        });
                        setOpenSnackbar(true)
                        setAddNewInsurance(false)
                    },
                        (response) => {
                            setSnackBarData({
                                variant: response.status ? 'success' : 'error',
                                message: response.msg || 'error'
                            });
                            setOpenSnackbar(true)
                        }
                    )
                }}

            />}
            {addNewFerry && <AddNewFerryCost
                modalVisibilityHandler={() => setAddNewFerry(false)}
                onAddFerryCost={(data) => {
                    const { name, Desc } = data
                    addFerry({ name, description: Desc }, (response) => {
                        setSnackBarData({
                            variant: 'success',
                            message: response.msg
                        });
                        setOpenSnackbar(true)
                        setAddNewFerry(false)
                    },
                        (response) => {
                            setSnackBarData({
                                variant: response.status ? 'success' : 'error',
                                message: response.msg || 'error'
                            });
                            setOpenSnackbar(true)
                        }
                    )
                }}
            />}
            {addNewFual && <AddNewFuel
                modalVisibilityHandler={() => setAddNewFual(false)}
                onAddFuelOffer={(data) => {
                    const { desc, name } = data

                    addFuelOffer({ value: name, description: desc }, (response) => {
                        setSnackBarData({
                            variant: 'success',
                            message: response.msg
                        });
                        setOpenSnackbar(true)
                        setAddNewFual(false)
                    },
                        (response) => {
                            setSnackBarData({
                                variant: response.status ? 'success' : 'error',
                                message: response.msg || 'error'
                            });
                            setOpenSnackbar(true)
                        }
                    )

                }}
            />}
            <Form onSubmit={
                handleSubmit(() => {
                    onSubmition && onSubmit()
                }
                )}>
                <div className="form-fields">
                    <label>4. What is On Offer to the Driver: </label>
                </div>

                <div className="form-row">
                    <div className="col-md-2 col-sm-3">
                        <div className="form-group chk_mdl">
                            <Field
                                name={STRINGS.INSURANCE_NAME}
                                text={'Insurance'}
                                component={Checkbox}
                                config={
                                    {
                                        checked: insurancNameValue,
                                        onChange: (value) => {
                                            setInsurancNameValue(!insurancNameValue)
                                            changeField('formstep2', STRINGS.INSURANCE_SELECT, '')
                                            setFormStep2Data({ ...inputtedValues, insurance: !insurancNameValue, insuranceSelect: "" })
                                        },
                                    }
                                }
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-5 col-sm-6">
                        <div className="form-group">
                            <Field
                                name={STRINGS.INSURANCE_SELECT}
                                component={FormDropDown}
                                // disabled={true}
                                noOptionsMessage={() => checkboxOptionVisible.has(STRINGS.INSURANCE_NAME) ? "No options" : 'Please select the checkbox'}
                                dataItems={checkboxOptionVisible.has(STRINGS.INSURANCE_NAME) ? insuranceList : []}
                                config={{
                                    styles: {},
                                    components: {},
                                }}
                                placeholder={checkboxOptionVisible.has(STRINGS.INSURANCE_NAME) ? "Please select" : 'Please select the checkbox'}
                            />
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-3 col-5">
                        <div className="form-group">
                            <div className="add-control"
                                onClick={() => {
                                    setAddNewInsurance(true)
                                }}
                            >
                                {LABELS.addNew} <i><img src={ADD_ICON} width="40" alt="ECR" className="img-fluid" /></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="col-md-2 col-sm-3">
                        <div className="form-group chk_mdl">
                            <Field
                                name={STRINGS.FERRYCOST_NAME}
                                text={"Ferry Cost"}
                                component={Checkbox}
                                config={
                                    {
                                        checked: ferryCostValue,
                                        onChange: (value) => {
                                            setFerryCostValue(!ferryCostValue)
                                            changeField('formstep2', STRINGS.FERRYCOST_SELECT, '')
                                            setFormStep2Data({ ...inputtedValues, ferryCost: !ferryCostValue, ferryCostSelect: "" })
                                        }
                                    }
                                }
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-5 col-sm-6">
                        <div className="form-group">
                            <Field
                                name={STRINGS.FERRYCOST_SELECT}
                                component={FormDropDown}
                                noOptionsMessage={() => checkboxOptionVisible.has(STRINGS.FERRYCOST_NAME) ? "No option" : 'Please select the checkbox'
                                }
                                dataItems={checkboxOptionVisible.has(STRINGS.FERRYCOST_NAME) ? ferryList : []}
                                config={{
                                    styles: {},
                                    components: {}
                                }}
                                placeholder={checkboxOptionVisible.has(STRINGS.FERRYCOST_NAME) ? "Please select" : 'Please select the checkbox'}
                            />
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-3 col-5">
                        <div className="form-group">
                            <div className="add-control"
                                onClick={() => {
                                    setAddNewFerry(true)
                                }}>
                                {LABELS.addNew}<i><img src={ADD_ICON} width="40" alt="ECR" className="img-fluid" /></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="col-md-2 col-sm-3">
                        <div className="form-group chk_mdl">
                            <Field
                                name={STRINGS.FUEL_NAME}
                                text={"Fuel"}
                                component={Checkbox}
                                config={
                                    {
                                        checked: fuelOfferName,
                                        onChange: (value) => {
                                            setFuelOfferName(!fuelOfferName)
                                            changeField('formstep2', STRINGS.FERRYCOST_SELECT, '')
                                            setFormStep2Data({ ...inputtedValues, fuel: !fuelOfferName, fuelSelect: "" })
                                        }
                                    }
                                }

                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-5 col-sm-6">
                        <div className="form-group">
                            <Field
                                name={STRINGS.FUEL_NAME_SELECT}
                                component={FormDropDown}
                                config={{
                                    styles: {},
                                    components: {}
                                }}
                                noOptionsMessage={() => checkboxOptionVisible.has(STRINGS.FUEL_NAME) ? "No options" : 'Please select the checkbox'
                                }
                                dataItems={checkboxOptionVisible.has(STRINGS.FUEL_NAME) ? fuelOfferList : []}
                                placeholder={checkboxOptionVisible.has(STRINGS.FUEL_NAME) ? "Please select" : 'Please select the checkbox'}
                            />
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-3">
                        <div className="form-group">
                            <div className="add-control"
                                onClick={() => {
                                    setAddNewFual(true)
                                }}>
                                {LABELS.addNew}<i><img src={ADD_ICON} width="40" alt="ECR" className="img-fluid" /></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="col-md-2 col-sm-3">
                        <div className="form-group chk_mdl">
                            <Field
                                name={STRINGS.EXPENSES_NAME}
                                text={"Expenses"}
                                component={Checkbox}
                            />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-5 col-sm-6">
                        <div className="form-group">
                            <Field
                                name={STRINGS.DETAILS_NAME}
                                component={Input}
                                placeholder={STRINGS.DETAILS}
                                type={'text'}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-fields">
                    <div className="form-row">
                        <div className="col-lg-3 col-md-4">
                            <Field
                                name={STRINGS.FREE_DAYS_AVAILABLE_NAME}
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
                                }
                                }
                                component={Input}
                                config={{
                                    value: freeDays,
                                    onChange: (value) => {
                                        if (PHONE_REGX.test(value.target.value)) {
                                            changeField('formstep2', STRINGS.FREE_DAYS_AVAILABLE_NAME, value.target.value)
                                            setFreeDays(value.target.value)
                                        }
                                        else if (value.target.value === '') {
                                            changeField('formstep2', STRINGS.FREE_DAYS_AVAILABLE_NAME, value.target.value)
                                            setFreeDays(value.target.value)
                                        }
                                    }
                                }}
                                placeholder={STRINGS.FREE_DAYS_PLACEHOLDER}
                                type={'text'}
                            />
                            {/* <span class="text_label">Max upto 45</span> */}
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="form-group">
                                <Field
                                    name={STRINGS.KILOMETRES_ALLOWED_NAME}
                                    component={Input}
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
                                    }
                                    }
                                    placeholder={STRINGS.KILLOWMETRE_PLACEHOLDER}
                                    type={'text'}
                                />
                                <span className="text_label">Optional</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="col-lg-3 col-md-4">
                        <div className="form-group label_float">
                            <Field
                                name={STRINGS.EXTRA_PAID_DAYS_NAME}
                                component={Input}
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
                                }
                                }
                                placeholder={STRINGS.EXTRA_PAID_DAYS_PLACEHOLDER}
                                type={'text'}
                            />
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                        <div className="form-group label_float">
                            <Field
                                name={STRINGS.RATE_PER_DAY_NAME}
                                component={Input}
                                normalize={(val, val1) => {
                                    if (PRICE_REGX.test(val)) {
                                        return val
                                    }
                                    else if (val === '') {
                                        return val
                                    }
                                    else {
                                        return val1
                                    }
                                }}
                                placeholder={STRINGS.RATE_PER_DAY_PLACEHOLDER}
                                config={{
                                    type: 'text'
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <Field
                                name={STRINGS.COMMENTS_NAME}
                                component={TextArea}
                                placeholder={STRINGS.COMMENTS}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-fields">
                    <label>5. Extra Items</label>
                    <div className="form-row">
                        <div className="col-lg-4 col-md-8 col-10">
                            <div className="form-group">
                                <Field
                                    name={STRINGS.YOUR_SAVED_LISTS__NAME}
                                    component={FormDropDown}
                                    dataItems={extraListData}
                                    isSearchable={true}
                                    provideCustomStyle={true}
                                    clearValue={clearValue}
                                    config={{
                                        changed: clearValue,
                                        isMulti: false,
                                        value: selectedExtraList,
                                        onChange: (value) => {

                                            if (value) {
                                                changeField('formstep2', 'new_item_description', value.name)
                                                changeField('formstep2', 'yourSavedLists', { ...value, value: value.name })
                                                setSelectedExtraList(value);
                                                let tempExtraItemsLists = []

                                                tempExtraItemsLists = value.items && value.items.map((item) => {
                                                    return {
                                                        label: item.name ? item.name : '',
                                                        ...item,
                                                        frequency: { value: item.frequency, label: item.frequency === 1 ? "Per Day" : "Per Hire" }
                                                    }
                                                })

                                                setSelectedExtraItems(tempExtraItemsLists)
                                                changeField('formstep2', 'members', tempExtraItemsLists)
                                            }
                                        }
                                    }}
                                    placeholder={STRINGS.YOUR_SAVED_CARD_PLACEHOLDER}
                                />
                            </div>
                        </div>
                        <div className={'remove-button-wrapper'}>
                            <Tooltip title={'Clear Selection'} aria-label="add">
                                <button type={'button'}
                                    className={'remove-admin-button rounded-circle'}
                                    onClick={() => {

                                        if (!!selectedExtraList) {
                                            changeField('formstep2', `members`, []);
                                            changeField('formstep2', 'new_item_description', '')
                                            changeField('formstep2', 'yourSavedLists', [])
                                            setSelectedExtraList(null);
                                            setSelectedExtraItems(null);
                                        }
                                    }
                                    }>
                                    <img src={CLEAR_ICON} alt="ECR" />
                                </button>
                            </Tooltip>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="col-lg-4 col-md-8 col-10">
                            <Field
                                name={STRINGS.NEW_ITEM_NAME}
                                component={Input}
                                placeholder={STRINGS.ENTER_LIST_NAME_PLACEHOLDER}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-fields">
                    <label>Included with relo:</label>
                    <FieldArray name="members" component={renderMembers}
                        rerenderOnEveryChange={true}
                        extraItemsList={selectedExtraItems}
                        removeSelected={(index) => {
                            let tempSelectedExtraItems = selectedExtraItems;
                            if (selectedExtraItems) {
                                for (let i = 0; i < selectedExtraItems.length; i++) {
                                    if (index && index.value === selectedExtraItems[i].value) {
                                        tempSelectedExtraItems.splice(i, 1)
                                    }

                                }
                                changeField('formstep2', 'yourSavedLists', tempSelectedExtraItems)
                                setSelectedExtraItems(tempSelectedExtraItems)
                                setClearValue(!clearValue)
                            }
                        }}
                        onAdd={
                            () => {
                                fieldsData.push({ members: 'members' })
                                setFieldsData([...fieldsData])
                            }
                        }
                        onChangeField={changeField}

                    />
                </div>

                {children}
                <div className='form-btn-container mt-3'>
                    <span className="group-btn text-left">
                        <InputSubmit buttonLabel={STRINGS.BUTTON_LABEL_NEXT} buttonStyle={"btn btn-lg btn-primary text-capitalize"}
                            buttonAction={() => {
                                onSubmition = true
                                setFormStep2Data(inputtedValues)
                            }}
                        />

                    </span>
                    <span className="group-btn text-right">
                        <button
                            className={"btn btn-lg btn-secondary text-capitalize"}
                            onClick={() => {
                                onSubmition = false
                                onBack()
                            }}
                        >
                            {STRINGS.BUTTON_LABEL_BACK}
                        </button>
                    </span>
                </div>
            </Form >
        </>
    )
}

const mapStateToProps = (state, props) => {
    return {
        initialValues: state.AddNewListingReducer && state.AddNewListingReducer.formStep2Data,
        insuranceData: state.AddNewListingReducer.insuranceList && state.AddNewListingReducer.insuranceList,
        fualData: state.AddNewListingReducer.fuelList && state.AddNewListingReducer.fuelList,
        errors: state.form.formstep2 && state.form.formstep2.syncErrors,
        inputtedValues: state.form.formstep2 && state.form.formstep2.values,
        anyUpdate: state.AddNewListingReducer && state.AddNewListingReducer.update,

        ferryData: state.AddNewListingReducer && state.AddNewListingReducer.ferryData,
        fuelOfferData: state.AddNewListingReducer && state.AddNewListingReducer.fuelOffer,
        extraItemsData: state.AddNewListingReducer && state.AddNewListingReducer.extraItemsData
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getFuelList: () => {
            dispatch(getFuelList())
        },
        getInsuranceList: (data, success, failure) => {
            dispatch(getInsuranceList(data, success, failure))
        },
        changeField: (form, field, value) => {
            dispatch(changeField(form, field, value))
        },
        addInsurance: (data, success, failure) => {
            dispatch(addInsurance(data, success, failure))
        },
        addFerry: (data, success, failure) => {
            dispatch(addFerry(data, success, failure))
        },
        getFerry: () => {
            dispatch(getFerry())
        },
        addFuelOffer: (data, success, failure) => {
            dispatch(addFuelOffer(data, success, failure))
        },
        getFuelOffer: () => {
            dispatch(getFuelOffer())
        },
        addExtraItems: (data, success, failure) => {
            dispatch(addExtraItems(data, success, failure))
        },
        getExtraItems: () => {
            dispatch(getExtraItems())
        },
        setFormStep2Data: (data) => {
            dispatch(setFormStep2Data(data))
        },

    }
}
const reduxFormFunction = reduxForm({
    form: "formstep2",
    fields: ['name', 'surname', 'dob', 'city', 'country', 'email', 'password', 're-enterpassword'],
    onSubmitFail,
    validate: validator,
    enableReinitialize: true
})(SignupForm);

export const FormStep2 = connect(mapStateToProps, mapDispatchToProps)(reduxFormFunction);