import React, { useState, useEffect } from "react";
import {
    reduxForm,
    Field,
    change as changeField,
    initialize,
} from "redux-form";
import { connect } from "react-redux";
import "./styles.scss";
import "../vehicles/styles.scss";
import validator from "./validator";
import AddNewMember from "./addNewMember";
const {
    defaultConfig: { PLATFORM, LOCATION },
} = require(`../../../../../../config/default`);
const { onSubmitFail } = require(`../../../../../../helpers/${PLATFORM}`);
const {
    SnackbarWrapper,
} = require(`../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`);
const {
    ADD_ICON,
    NAME_REGX,
    REFERENCE_REGX,
    PHONE_REGX,
    ROUTES,
    CLOSE_ICON,
    EDIT_ICON,
} = require(`../../../../../../shared/${PLATFORM}/constants`);
const {
    STRINGS,
} = require(`../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`);
const { Form } = require(`../../../../../../components/${PLATFORM}/atoms/form`);
const {
    FormDropDown,
} = require(`../../../../../../components/${PLATFORM}/atoms/formDropDown/`);
const {
    Input,
} = require(`../../../../../../components/${PLATFORM}/atoms/input`);
const {
    InputSubmit,
} = require(`../../../../../../components/${PLATFORM}/atoms/input-submit`);
const {
    DecisionPopup,
} = require(`../../../../../../components/${PLATFORM}/atoms/decision-popup`);
const {
    Select,
} = require(`../../../../../../components/${PLATFORM}/atoms/select`);
const {
    getCountryData,
} = require(`../../../../../../helpers/${PLATFORM}/prepare-country-related-data`);
const {
    TimePickerInput,
} = require(`../../../../../../components/${PLATFORM}/atoms/time-picker`);
let data = getCountryData();
let callingCodes = data.callingCodes;
let countries = data.nations;
export const Screen = ({
    handleSubmit = () => { },
    onSubmit = () => { },
    data,
    userData,
    anyUpdate,
    addInsurance,
    getInsuranceList,
    getBranchManager,
    branchManagers,
    addNewMemberCall,
    changeField,
    getBranchList,
    branchData,
    createBranch,
    initialize,
    branchDelete,
    history,
    saveEditBranchData,
}) => {
    const postData = (data) => {
        let req = Object.keys(data)
            .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
            .join("&");
        return req;
    };
    useEffect(() => {
        if (anyUpdate) {
            let req = postData({ limit: "99999" });
            getInsuranceList(
                req,
                () => { },
                () => { }
            );
            getBranchManager();
            getBranchList();
        }
    }, [anyUpdate]);

    useEffect(() => {
        let req = postData({ limit: "99999" });
        getInsuranceList(
            req,
            () => { },
            () => { }
        );
        getBranchManager();
        getBranchList();
    }, []);

    useEffect(() => {
        let tempBranchMangersList = [];
        tempBranchMangersList =
            branchManagers &&
            branchManagers.map((item) => {
                return {
                    value: item.name ? item.name + item.surname : " ",
                    label: item.name ? item.name + " " + item.surname : " ",
                    id: item._id,
                    ...item,
                };
            });
        setBranchManagersList(tempBranchMangersList);
    }, [branchManagers]);
    const [addNewMember, setAddNewMember] = useState(false);
    const [country, setCountry] = useState("");
    const [phoneKey, setPhoneKey] = useState("");
    const [confirmBox, setConfirmBox] = useState(false);
    const [deleteItemData, setDeleteItemData] = useState();
    const [branchManagersList, setBranchManagersList] = useState([]);
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackBarData] = useState({
        variant: "",
        message: "",
    });
    useEffect(() => {
        let requiredIndex;
        for (let index = 0; index < callingCodes.length; index++) {
            let position = callingCodes[index].label.indexOf(
                country && country.value
            );
            if (position !== -1) {
                requiredIndex = index;
                break;
            }
        }
        if (country) {
            changeField(
                "branch",
                STRINGS.PHONE_CODE_KEY,
                callingCodes[requiredIndex]
            );
            setPhoneKey(callingCodes[requiredIndex]);
        }
    }, [country]);
    return (
        <>
            <div
                className={`${
                    (snackbarData && snackbarData.variant) === "error" && `in-modal`
                    }`}
            >
                <SnackbarWrapper
                    visible={openSnackBar}
                    onClose={() => setOpenSnackbar(false)}
                    variant={snackbarData.variant}
                    message={snackbarData.message}
                />
            </div>
            {confirmBox && (
                <DecisionPopup
                    modalVisibility={confirmBox}
                    dialogTitle={"Delete Branch"}
                    toggleDialogModal={() => setConfirmBox(false)}
                    dialogContent={"Are you sure, you want to delete this branch?"}
                    confirmButtonTitle={"Confirm"}
                    rejectButtonTitle={"cancel"}
                    onConfirmation={() => {
                        branchDelete(
                            deleteItemData,
                            (response) => {
                                setSnackBarData({
                                    variant: response.status ? "success" : "error",
                                    message: response.msg || "error",
                                });
                                setOpenSnackbar(true);
                                setConfirmBox(false);
                            },
                            (response) => {
                                setSnackBarData({
                                    variant: response.status ? "success" : "error",
                                    message: response.msg || "error",
                                });
                                setOpenSnackbar(true);
                            }
                        );
                    }}
                    onRejection={() => {
                        setConfirmBox(false);
                    }}
                />
            )}
            {addNewMember && (
                <AddNewMember
                    onClose={() => {
                        setAddNewMember(false);
                    }}
                    onAddNewMember={(data) => {
                        const {
                            email,
                            password,
                            dob,
                            city,
                            country,
                            name,
                            phoneCode,
                            phoneNo,
                            surname,
                        } = data;

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
                                    phone: phoneNo,
                                },
                            },
                            (response) => {
                                setSnackBarData({
                                    variant: response.status ? "success" : "error",
                                    message: response.msg || "error",
                                });
                                setOpenSnackbar(true);
                                setAddNewMember(false);
                            },
                            (response) => {
                                setSnackBarData({
                                    variant: response.status ? "success" : "error",
                                    message: response.msg || "error",
                                });
                                setOpenSnackbar(true);
                            }
                        );
                    }}
                />
            )}
            <div className="app-main_outer" onClick={() => { }}>
                <div
                    className="container-fluid"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <Form
                        onSubmit={handleSubmit(() => {
                            const {
                                branchName,
                                phoneNumber: phone,
                                phoneKey,
                                email,
                                address,
                                branchManager,
                                city,
                                country,
                                postcode,
                                openfrom,
                                closeby,
                                suburb,
                                code,
                                pickupdropoff1,
                                pickupdropoff2,
                            } = data;
                            let ptempPhoneKey = (
                                phoneKey &&
                                phoneKey.label &&
                                phoneKey.label
                            ).replace(/\s/g, "");

                            createBranch(
                                {
                                    name: branchName.trim(),
                                    phoneNumber: {
                                        code: ptempPhoneKey,
                                        phone: phone,
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
                                    branchManagerId: branchManager && branchManager.id,
                                },
                                (response) => {
                                    setSnackBarData({
                                        variant: response.status ? "success" : "error",
                                        message: response.msg || "error",
                                    });
                                    setOpenSnackbar(true);
                                    initialize();
                                    changeField("branch", "country", "");
                                    setCountry("");
                                    changeField("branch", "phoneKey", "");
                                    setPhoneKey("");
                                },
                                (response) => {
                                    setSnackBarData({
                                        variant: response.status ? "success" : "error",
                                        message: response.msg || "error",
                                    });
                                    setOpenSnackbar(true);
                                }
                            );
                        })}
                    >
                        <div className="form-fields">
                            <div className="branch_area mb-md-4 mb-3 badges_vehicles">
                                <h4 className="mb-4">Branches</h4>
                                <label className="mb-3">
                                    Here are your current branch(es):
                                </label>

                                {branchData &&
                                    branchData.map &&
                                    branchData.map((item, index) => {
                                        return (
                                            <ul className="table-responsive" key={index + ""}>
                                                <li className="branch_list">
                                                    <div className="branch_list_area">
                                                        <span className="badge badge-grey" key={index + ""}>
                                                            {item.name} - {item.address}, {item.suburb} -{" "}
                                                            {item.city}, {item.country}{" "}
                                                            <i
                                                                className="ml-3"
                                                                onClick={() => {
                                                                    saveEditBranchData({
                                                                        ...item,
                                                                        branchName: item.name,
                                                                        phoneNumber: item.phoneNumber.phone,
                                                                        phoneKey: item.phoneNumber.code,
                                                                        pickupdropoff1: item.pickUp_dropOff_from,
                                                                        pickupdropoff2: item.pickUp_dropOff_to,
                                                                        openfrom: item.openFrom,
                                                                        closeby: item.closeBy,
                                                                    });
                                                                    history.push(
                                                                        `${ROUTES.EDIT_BRANCH}?id=${item._id}`
                                                                    );
                                                                }}
                                                            >
                                                                <img src={EDIT_ICON} alt="" />
                                                            </i>
                                                            <i
                                                                className="ml-1"
                                                                onClick={() => {
                                                                    setDeleteItemData(item._id);
                                                                    setConfirmBox(true);
                                                                }}
                                                            >
                                                                <img src={CLOSE_ICON} alt="" />
                                                            </i>
                                                        </span>
                                                    </div>
                                                </li>
                                            </ul>
                                        );
                                    })}
                                {!(branchData && branchData.length) && (
                                    <label>No branch found</label>
                                )}
                            </div>

                            <label>Add a new branch:</label>

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
                                        type={"number"}
                                        normalize={(val, val1) => {
                                            if (PHONE_REGX.test(val)) {
                                                return val;
                                            } else if (val === "") {
                                                return val;
                                            } else {
                                                return val1;
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
                                        type={"number"}
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
                                                return val;
                                            } else if (val === "") {
                                                return val;
                                            } else {
                                                return val1;
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
                                        type={"number"}
                                        normalize={(val, val1) => {
                                            if (NAME_REGX.test(val)) {
                                                return val;
                                            } else if (val === "") {
                                                return val;
                                            } else {
                                                return val1;
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
                                        // type={'text'}
                                        options={countries}
                                        isSearchable={true}
                                        onValueChange={(value) => {
                                            changeField("branch", "country", value);
                                            setCountry(value);
                                        }}
                                        config={{
                                            value: country,
                                        }}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <Field
                                        name={STRINGS.POSTCODE_INPUT}
                                        component={Input}
                                        placeholder={STRINGS.POSTCODE_INPUT_PLACEHOLDER}
                                        type={"number"}
                                        normalize={(val, val1) => {
                                            if (REFERENCE_REGX.test(val)) {
                                                return val;
                                            } else if (val === "") {
                                                return val;
                                            } else {
                                                return val1;
                                            }
                                        }}
                                        config={{
                                            type: "text",
                                        }}
                                    />
                                </div>
                                <div className="col-md-4 label_float">
                                    <Field
                                        name={STRINGS.CODE_INPUT}
                                        component={Input}
                                        placeholder={STRINGS.CODE_PLACEHOLDER}
                                        type={"number"}
                                        normalize={(val, val1) => {
                                            if (REFERENCE_REGX.test(val)) {
                                                return val;
                                            } else if (val === "") {
                                                return val;
                                            } else {
                                                return val1;
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
                                        // data={phoneCode}
                                        placeholder={STRINGS.PHONE_NUMBER_PLACEHOLDER}
                                        data={phoneKey}
                                        onValueChange={(value) => {
                                            changeField("branch", "phoneKey", value);
                                            setPhoneKey(value);
                                        }}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <Field
                                        name={STRINGS.PICK_UP_DROP_OFF1}
                                        component={TimePickerInput}
                                        placeholder={STRINGS.PICK_UP_DROP_OFF_FROM}
                                        type={"text"}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <Field
                                        name={STRINGS.OPEN_FROM}
                                        component={TimePickerInput}
                                        placeholder={STRINGS.OPEN_FROM_PLACEHOLDER}
                                        type={"text"}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-4">
                                    <Field
                                        name={STRINGS.PICK_UP_DROP_OFF2}
                                        component={TimePickerInput}
                                        placeholder={STRINGS.PICK_UP_DROP_OFF_TO}
                                        type={"text"}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <Field
                                        name={STRINGS.CLOSE_BY}
                                        component={TimePickerInput}
                                        placeholder={STRINGS.CLOSE_BY_PLACEHOLDER}
                                        type={"text"}
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
                                    <div
                                        className="add-control"
                                        onClick={() => {
                                            setAddNewMember(true);
                                        }}
                                    >
                                        {STRINGS.ADD_NEW}
                                        <i>
                                            <img
                                                src={ADD_ICON}
                                                width="40"
                                                alt="ECR"
                                                className="img-fluid"
                                            />
                                        </i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <InputSubmit
                            buttonLabel={"Add new branch"}
                            buttonStyle={"btn btn-lg btn-primary text-capitalize my-4"}
                        />
                    </Form>
                </div>
            </div>
        </>
    );
};

const reduxFormFunction = reduxForm({
    form: "branch",
    // onSubmitFail,
    validate: validator,
    enableReinitialize: true,
})(Screen);

const mapDispatchToProps = (dispatch) => {
    return {
        changeField: (form, field, value) => {
            dispatch(changeField(form, field, value));
        },
        initialize: () => {
            dispatch(initialize());
        },
    };
};

export const Branch = connect(null, mapDispatchToProps)(reduxFormFunction);
