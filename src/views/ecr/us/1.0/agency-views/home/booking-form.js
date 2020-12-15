import React, { useState, Component } from 'react';
import { reduxForm, Field } from "redux-form";
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../config/default`);
const { Input } = require(`../../../../../../components/${PLATFORM}/atoms/input`);
const { Form } = require(`../../../../../../components/${PLATFORM}/atoms/form`);
const { InputSubmit } = require(`../../../../../../components/${PLATFORM}/atoms/input-submit`);
const { STRINGS } = require(`../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`)
const { TimePickerInput } = require(`../../../../../../components/${PLATFORM}/atoms/time-picker`);
const { ADD_ICON, VALIDATION_MESSAGES, EMAIL_REGX, NAME_REGX, REFERENCE_REGX, PHONE_REGX } = require(`../../../../../../shared/${PLATFORM}/constants`);
const { getCountryData } = require(`../../../../../../helpers/${PLATFORM}/prepare-country-related-data`);
const { Select } = require(`../../../../../../components/${PLATFORM}/atoms/select`)
const { SnackbarWrapper } = require(`../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`)
const { FormDropDown } = require(`../../../../../../components/${PLATFORM}/atoms/formDropDown/`)
const { TextArea } = require(`../../../../../../components/${PLATFORM}/atoms/text-area`)


let data = getCountryData();
let callingCodes = data.callingCodes;
let countries = data.nations;
export class BookingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            savedData: {
                name: "",
                Desc: '',
            },
            validation: { name: false, Desc: false },
            edited: false,
            modalVisibility: false,
            snackbarData: {
                variant: '',
                message: ''
            },
            openSnackBar: false
        };
    }
    validate = () => {
        const { name, Desc } = this.state.savedData
        let validation = true;
        if (!name) {
            this.setState({ validation: Object.assign(this.state.validation, { name: VALIDATION_MESSAGES.NAME_REQUIRED }) })
            validation = false
        }

        return validation
    }

    render() {
        const { modalVisibilityHandler, onAddFerryCost, onSubmit } = this.props
        const { openSnackBar } = this.state

        return (
            <>
                <SnackbarWrapper
                    visible={openSnackBar}
                    onClose={() => this.setState({ openSnackBar: false })}
                    // variant={snackbarData.variant}
                    variant={'error'}
                    message={VALIDATION_MESSAGES && VALIDATION_MESSAGES.INVALID_TIME}
                />
                {/* <DecisionPopup
                    modalVisibility={modalVisibility}
                    dialogTitle={'Close'}
                    dialogContent={'Changes you made may not be saved. Do you want to close?'}
                    confirmButtonTitle={'Yes'}
                    rejectButtonTitle={'No'}
                    onConfirmation={() => {
                        setModalVisibility(false)
                        onClose()
                    }}
                    onRejection={() => {
                        setModalVisibility(false)
                    }}
                /> */}
                <div id="myModal" className="modal"
                    onClick={() => {
                        modalVisibilityHandler()


                    }}
                    onClick={modalVisibilityHandler}>
                    <div className="modal-content"
                        onClick={() => {
                            modalVisibilityHandler()
                        }}
                    >
                        <div className="modal_body"
                            onClick={e => {
                                e.stopPropagation()
                            }}
                        >
                            <span className="close"
                                onClick={() => {
                                    modalVisibilityHandler()
                                }}
                            >&times;</span>
                            <div className="form-fields">
                                <h5 className="mb-3">Enter the vehicle registration number</h5>
                                <div className="form-row">
                                    <div className="col-md-12 col-sm-12">
                                        <Field
                                            name={"rego"}
                                            component={Input}
                                            placeholder={'Rego'}
                                            type={'text'}
                                            meta={{
                                                error: this.state.validation.name && this.state.validation.name,
                                                touched: this.state.validation.name && true
                                            }
                                            }
                                            onBlur={() => {
                                                if (!this.state.savedData.name) {
                                                    this.setState({ validation: { ...this.state.validation, name: "Rego is required." } })
                                                }
                                            }}
                                            config={{
                                                value: this.state.savedData.name,
                                                onChange: (value) => {

                                                    this.setState({ savedData: { ...this.state.savedData, name: value.target.value } }, () => {
                                                        if (!this.state.savedData.name) {
                                                            this.setState({ validation: { ...this.state.validation, name: "Rego is required." } })
                                                        }
                                                        if (this.state.savedData.name) {
                                                            this.setState({ validation: { ...this.state.validation, name: false } })
                                                        }
                                                    })

                                                }
                                            }

                                            }
                                        />
                                    </div>

                                </div>

                            </div>
                            <div className="group-btn text-center">
                                <button className="btn btn-lg btn-secondary text-capitalize" type={'text'}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (this.validate()) {
                                            onSubmit(this.state.savedData.name)
                                        }
                                    }
                                    }
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div >
                </div>
            </>
        );
    }
}