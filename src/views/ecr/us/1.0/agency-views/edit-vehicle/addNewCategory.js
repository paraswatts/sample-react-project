import React, { Component } from 'react';
import { reduxForm, Field } from "redux-form";
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../config/default`);
const { SnackbarWrapper } = require(`../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`)
const { FormDropDown } = require(`../../../../../../components/${PLATFORM}/atoms/formDropDown/`)
const { DatePickerInput } = require(`../../../../../../components/${PLATFORM}/atoms/date-picker`)
const { getCountryData } = require(`../../../../../../helpers/${PLATFORM}/prepare-country-related-data`);
const { Select } = require(`../../../../../../components/${PLATFORM}/atoms/select`)
const { Input } = require(`../../../../../../components/${PLATFORM}/atoms/input`);
const { TextArea } = require(`../../../../../../components/${PLATFORM}/atoms/text-area`)

const { STRINGS } = require(`../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`)

const { ADD_ICON, VALIDATION_MESSAGES, EMAIL_REGX, NAME_REGX, REFERENCE_REGX, PHONE_REGX } = require(`../../../../../../shared/${PLATFORM}/constants`);

let data = getCountryData();
let callingCodes = data.callingCodes;
let countries = data.nations;
class addNewVehicle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryData: {
                categoryName: "",
                categoryDescription: ""
            },
            categoryDataValidation: {
                categoryName: "",
                categoryDescription: ""
            },
        };
    }

    render() {
        const { categoryDataValidation, categoryData } = this.state
        const { modalVisibility, createVehicleCategory } = this.props
        return (

            <div id="myModal" className="modal"
                onClick={() => {
                    modalVisibility()
                }}
            >
                <div className={`modal-content`}
                    onClick={() => {
                        modalVisibility()
                    }}
                >

                    <div className="modal_body"
                        onClick={e => {
                            e.stopPropagation()
                        }}
                    >
                        <span className="close"
                            onClick={() => {
                                modalVisibility()
                            }}
                        >&times;</span>
                        <form action="">
                            <h5 className="mb-3">Add a new vehicle category</h5>
                            <div className="row">

                                {/* <div className="col-md-4"> */}

                                <div className="form-group">
                                    <Field
                                        name={"categoryName"}
                                        component={Input}
                                        onBlur={() => {
                                            if (!this.state.categoryData.categoryName) {
                                                this.setState({ categoryDataValidation: { ...this.state.categoryDataValidation, categoryName: VALIDATION_MESSAGES.CATEGORY_NAME_REQUIRED } })
                                            }
                                        }}
                                        meta={{
                                            error: categoryDataValidation.categoryName,
                                            touched: categoryDataValidation.categoryName && true
                                        }
                                        }
                                        config={{
                                            value: this.state.categoryData.categoryName,
                                            onChange: (value) => {
                                                if (NAME_REGX.test(value.target.value)) {
                                                    this.setState({ categoryData: { ...this.state.categoryData, categoryName: value.target.value } }, () => {

                                                        if (!this.state.categoryData.categoryName) {
                                                            this.setState({ categoryDataValidation: { ...this.state.categoryDataValidation, categoryName: VALIDATION_MESSAGES.CATEGORY_NAME_REQUIRED } })
                                                        }

                                                        else {
                                                            this.setState({ categoryDataValidation: { ...this.state.categoryDataValidation, categoryName: false } })
                                                        }
                                                    })
                                                }
                                                else if (value.target.value === '') {
                                                    this.setState({ categoryData: { ...this.state.categoryData, categoryName: value.target.value } },
                                                        () => {
                                                            if (!this.state.categoryData.categoryName) {
                                                                this.setState({ categoryDataValidation: { ...this.state.categoryDataValidation, categoryName: VALIDATION_MESSAGES.CATEGORY_NAME_REQUIRED } })
                                                            }
                                                            else {
                                                                this.setState({ categoryDataValidation: { ...this.state.categoryDataValidation, categoryName: false } })
                                                            }
                                                        }
                                                    )
                                                }
                                            }
                                        }}
                                        placeholder={STRINGS.CATEGORY_PLACEHOLDER}
                                    />
                                </div>
                                {/* </div> */}
                            </div>

                            <div className="row">
                                {/* <div className="col-md-4"> */}

                                <div className="form-group label_float">
                                    <Field
                                        name={STRINGS.CATEGORY_DESCRIPTION_INPUT}
                                        component={TextArea}
                                        meta={{
                                            error: this.state.categoryDataValidation.categoryDescription,
                                            touched: this.state.categoryDataValidation.categoryDescription && true
                                        }
                                        }
                                        config={{
                                            onBlur: (e) => {
                                                e.preventDefault()
                                                if (!this.state.categoryData.categoryDescription) {
                                                    this.setState({ categoryDataValidation: { ...this.state.categoryDataValidation, categoryDescription: VALIDATION_MESSAGES.CATEGORY_DESCRIPTION_REQUIRED } })
                                                }
                                            },
                                            value: this.state.categoryData.categoryDescription,
                                            onChange: (value) => {
                                                this.setState({ categoryData: { ...this.state.categoryData, categoryDescription: value.target.value } }, () => {
                                                    if (!this.state.categoryData.categoryDescription) {
                                                        this.setState({ categoryDataValidation: { ...this.state.categoryDataValidation, categoryDescription: VALIDATION_MESSAGES.CATEGORY_DESCRIPTION_REQUIRED } })
                                                    }
                                                    else {
                                                        this.setState({ categoryDataValidation: { ...this.state.categoryDataValidation, categoryDescription: false } })
                                                    }
                                                }
                                                )

                                            }
                                        }
                                        }
                                        placeholder={STRINGS.CATEGORY_DESCRIPTION_PLACEHOLDER}
                                    />
                                </div>
                                {/* </div> */}
                            </div>

                            <div className="group-btn text-center">
                                <button className="btn btn-lg btn-primary text-capitalize" type={'text'}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        let validate = true
                                        Object.values(categoryData).map((item) => {
                                            if (!item) {
                                                validate = false
                                            }
                                        })
                                        if (validate) {
                                            const { categoryName, categoryDescription } = categoryData
                                            createVehicleCategory({
                                                category: categoryName,
                                                description: categoryDescription
                                            })
                                        }
                                        else {
                                            if (!this.state.categoryData.categoryName) {
                                                this.setState({ categoryDataValidation: Object.assign(this.state.categoryDataValidation, { categoryName: VALIDATION_MESSAGES.CATEGORY_NAME_REQUIRED }) })
                                            }
                                            if (!this.state.categoryData.categoryDescription) {

                                                this.setState({ categoryDataValidation: Object.assign(this.state.categoryDataValidation, { categoryDescription: VALIDATION_MESSAGES.CATEGORY_DESCRIPTION_REQUIRED }) })
                                            }
                                        }
                                    }}
                                >
                                    Submit
                 </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default addNewVehicle;
