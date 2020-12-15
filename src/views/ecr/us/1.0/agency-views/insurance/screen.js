import React, { useState, useEffect } from 'react';
import { reduxForm, Field, change as changeField, initialize } from "redux-form";
import { connect } from 'react-redux';
import './styles.scss';
import validator from './validator';
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../config/default`);
const { onSubmitFail } = require(`../../../../../../helpers/${PLATFORM}`);
const { SnackbarWrapper } = require(`../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`)
const { ADD_ICON, VALIDATION_MESSAGES, EMAIL_REGX, NAME_REGX, REFERENCE_REGX, PHONE_REGX, PRICE_REGX, NON_UPLOAD
} = require(`../../../../../../shared/${PLATFORM}/constants`);
const { STRINGS } = require(`../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`);
const { Form } = require(`../../../../../../components/${PLATFORM}/atoms/form`);
const { TextArea } = require(`../../../../../../components/${PLATFORM}/atoms/text-area`)
const { FormDropDown } = require(`../../../../../../components/${PLATFORM}/atoms/formDropDown/`)
const { Input } = require(`../../../../../../components/${PLATFORM}/atoms/input`);
const { InputSubmit } = require(`../../../../../../components/${PLATFORM}/atoms/input-submit`);
const { DecisionPopup } = require(`../../../../../../components/${PLATFORM}/atoms/decision-popup`);
const { CustomFileDrop } = require(`../../../../../../components/${PLATFORM}/cells/custom-filedrop`)
const { InsuranceList } = require('./insuranceList')

export const Screen = ({
    handleSubmit = () => { },
    onSubmit = () => { },
    data,
    userData,
    anyUpdate,
    addInsurance,
    getInsuranceList,
    initialize,
    listIndex,
    insuranceData, deleteInsurance, insuranceCount, startLoader, stopLoader, getINsurance, setInsuranceListIndex
}) => {

    useEffect(() => {
        if (anyUpdate) {
            startLoader()
            let postData = { limit: 5, index: listIndex }

            let reqq = Object.keys(postData)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(postData[k])
                ).join('&');
            getInsuranceList(reqq, () => { stopLoader() }, () => { stopLoader() })
        }
    }, [anyUpdate])

    useEffect(() => {
    }, [listIndex])

    useEffect(() => {
        startLoader()
        let postData = { limit: 5, index: listIndex }

        let reqq = Object.keys(postData)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(postData[k])
            ).join('&');
        getInsuranceList(reqq, () => {
            stopLoader()
        }, () => {
            stopLoader()
        })
        stopLoader()
    }, [])

    useEffect(() => {
    }, [insuranceData])

    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });
    return (
        <div className='app-main_outer' onClick={() => {
        }}>
            <SnackbarWrapper
                visible={openSnackBar}
                onClose={() => setOpenSnackbar(false)}
                variant={snackbarData.variant}
                message={snackbarData.message}
            />
            <div className="container-fluid"
                onClick={(e) => {
                    e.stopPropagation()
                }}
            >
                <Form onSubmit={
                    handleSubmit(() => {
                        const { insuranceName, excess, bond, dailyFee } = data
                        addInsurance({
                            name: insuranceName,
                            excess, bond, dailyFee
                        },
                            (response) => {
                                setSnackBarData({
                                    variant: response.status ? 'success' : 'error',
                                    message: response.msg || 'error'
                                });
                                setOpenSnackbar(true)
                                initialize()
                                let postData = { limit: 5, index: listIndex }
                                let req = Object.keys(postData)
                                    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(postData[k])
                                    ).join('&');
                                getInsuranceList(req, () => { }, () => { })
                            }, (response) => {
                                setSnackBarData({
                                    variant: response.status ? 'success' : 'error',
                                    message: response.msg || 'error'
                                });
                                setOpenSnackbar(true)

                            }

                        )
                    })}>
                    <div className="form-fields" onLoad={() => {
                    }}>
                        <div className="branch_area mb-3">
                            <h4 className="mb-3">Insurance</h4>
                            <label className="mb-4">Here are your current Insurance(s):</label>
                            <InsuranceList insuranceData={insuranceData}
                                deleteInsurance={deleteInsurance}
                                insuranceCount={insuranceCount}
                                getInsuranceList={getInsuranceList} getINsurance={getINsurance}
                                listIndex={(value) => {

                                    setInsuranceListIndex(value)
                                }}
                                index={listIndex}
                            />
                        </div>
                        <div className="insurance_current my-3">
                            <label>Add a New Insurance</label>

                            <div className="form-row">
                                <div className="col-lg-5 col-md-6">
                                    <Field
                                        name={"insuranceName"}
                                        component={Input}
                                        placeholder={"Insurance name"}
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
                                <div className="col-lg-5 col-md-6">
                                    <Field
                                        name={"excess"}
                                        component={Input}
                                        placeholder={"Excess"}
                                        type={'number'}
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

                                        config={{
                                            type: "text",
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-lg-5 col-md-6">
                                    <Field
                                        name={"bond"}
                                        component={Input}
                                        placeholder={"Bond"}
                                        type={'number'}
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

                                        config={{
                                            type: "text",
                                        }}
                                    />
                                </div>
                                <div className="col-lg-5 col-md-6">
                                    <Field
                                        name={"dailyFee"}
                                        component={Input}
                                        placeholder={"Daily Fee for Excess Reduction"}
                                        type={'number'}
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

                                        config={{
                                            type: "text",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <InputSubmit buttonLabel={"Add new insurance"} buttonStyle={"btn btn-lg btn-primary text-capitalize"}
                        buttonAction={() => {

                        }}
                    />
                </Form>
            </div >

        </div >
    );
}

const reduxFormFunction = reduxForm({
    form: "insurance",
    onSubmitFail,
    validate: validator,
    enableReinitialize: true
})(Screen);

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


export const Insurance = connect(null, mapDispatchToProps)(reduxFormFunction);