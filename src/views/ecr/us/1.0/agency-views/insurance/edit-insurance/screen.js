import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import { useHistory } from "react-router-dom";
import validator from '../validator';
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../../config/default`);
const { Form } = require(`../../../../../../../components/${PLATFORM}/atoms/form`);
const { Input } = require(`../../../../../../../components/${PLATFORM}/atoms/input`);
const { onSubmitFail } = require(`../../../../../../../helpers/${PLATFORM}`);
const { NAME_REGX, PRICE_REGX, ROUTES } =
    require(`../../../../../../../shared/${PLATFORM}/constants`);
const { editInsurance } = require(`../../../../../../../redux/${PLATFORM}/actions`);
const queryString = require('query-string');
const { SnackbarWrapper } = require(`../../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`)

export const Screen = ({
    editInsuranceFunc,
    getINsurance, editInsuranceData
}) => {
    const [field, setField] = useState({ insuranceName: '', excess: '', bond: '', dailyFee: '' })
    let history = useHistory();
    const parsed = queryString.parse(history.location.search);

    const [openSnackBar, setOpenSnackbar] = useState(false);

    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });

    useEffect(() => {
        setField({
            ...field, insuranceName: editInsuranceData.name, excess: editInsuranceData.excess,
            bond: editInsuranceData.bond, dailyFee: editInsuranceData.dailyFee
        })

    }, [editInsuranceData])

    return (<div>
        <div className='app-main_outer' >
            <SnackbarWrapper
                visible={openSnackBar}
                onClose={() => setOpenSnackbar(false)}
                variant={snackbarData.variant}
                message={snackbarData.message}
            />
            <Form onSubmit={(e) => {
                e.preventDefault()
                editInsuranceFunc({
                    id: parsed.id,
                    data: {
                        name: field.insuranceName, bond: field.bond,
                        excess: field.excess, dailyFee: field.dailyFee
                    }
                },
                    (response) => {
                        setSnackBarData({
                            variant: response.status ? 'success' : 'error',
                            message: response.msg || 'error'
                        });
                        setOpenSnackbar(true)
                        setTimeout(() => { history.replace(ROUTES.INSURANCE) }, 1000)

                    }, (error) => {
                        setSnackBarData({
                            variant: error.status ? 'success' : 'error',
                            message: error.msg || 'error'
                        });
                        setOpenSnackbar(true)
                    }

                )
            }}>
                <div className="col-md-12">
                    <h4 className="mb-5">Edit Insurance</h4>
                    <div className="form-row">
                        <div className="col-md-4 label_float">
                            <Field
                                name={"insuranceName"}
                                component={Input}
                                placeholder={"Insurance name"}
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
                                }
                                }
                                onChange={(e) => {
                                    if (NAME_REGX.test(e.target.value)) {
                                        setField({ ...field, insuranceName: e.target.value })
                                    }
                                    else if (e.target.value === '') {
                                        setField({ ...field, insuranceName: e.target.value })
                                    }

                                }}
                                config={{
                                    type: "text",
                                    value: field.insuranceName
                                }}
                            />
                        </div>
                        <div className="col-md-4 label_float">
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
                                onChange={(e) => {
                                    if (PRICE_REGX.test(e.target.value)) {
                                        setField({ ...field, excess: e.target.value })
                                    }
                                }
                                }
                                config={{
                                    // type: "text",
                                    value: field.excess
                                }}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-4 label_float">
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
                                onChange={(e) => {
                                    if (PRICE_REGX.test(e.target.value)) {
                                        setField({ ...field, bond: e.target.value })
                                    }
                                }
                                }
                                config={{
                                    // type: "text",
                                    value: field.bond
                                }}
                            />
                        </div>
                        <div className="col-md-4 label_float">
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
                                onChange={(e) => {
                                    if (PRICE_REGX.test(e.target.value)) {
                                        setField({ ...field, dailyFee: e.target.value }

                                        )
                                    }
                                }}
                                config={{
                                    // type: "text",
                                    value: field.dailyFee
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-12">
                            <button type='submit'
                                className="btn btn-sm btn-primary text-capitalize mr-4"
                            >
                                Save Insurance
                </button>
                            <button type='submit'
                                className="btn btn-sm btn-outline-blue text-capitalize"
                                onClick={() => history.replace(ROUTES.INSURANCE)}
                            >
                                Cancel
                </button>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    </div>)
}

const reduxFormFunction = reduxForm({
    form: "edit-insurance",
    onSubmitFail,
    validate: validator,
    enableReinitialize: true
})(Screen);

const mapStateToProps = (state) => {
    return ({
        editInsuranceData: state && state.AddNewListingReducer && state.AddNewListingReducer.editInsuranceData
    });
}

const mapDispatchToProps = (dispatch) => {
    return {
        editInsuranceFunc: (data, success, failure) => dispatch(editInsurance(data, success, failure)),
    }
}

export const EditInsuranceScreen = connect(mapStateToProps, mapDispatchToProps)(reduxFormFunction);