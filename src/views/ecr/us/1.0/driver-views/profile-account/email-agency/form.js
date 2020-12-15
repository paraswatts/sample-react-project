import React, { useState, useEffect } from "react";
import { Field, reduxForm, change as changeField } from "redux-form";
import { connect } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../../config/default`);
const { Form } = require(`../../../../../../../components/${PLATFORM}/atoms/form`);
const { STRINGS } = require(`../../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`)
const { TextArea } = require(`../../../../../../../components/${PLATFORM}/atoms/text-area`);
const { Input } = require(`../../../../../../../components/${PLATFORM}/atoms/input`);
const { StarRatingComponent } = require(`../../../../../../../components/${PLATFORM}/atoms/star-component`);
const { InputSubmit } = require(`../../../../../../../components/${PLATFORM}/atoms/input-submit`);
const { onSubmitFail } = require(`../../../../../../../helpers/${PLATFORM}`);
const { SnackbarWrapper } = require(`../../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`);

const EmailAgencyForm = ({
    emailAgencyByDriver,
    upcomingActiveRowData,
    getResponse
}) => {
    const [field, setFields] = useState({
        subject: '',
        body: ''
    })
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const onSubmit = (e) => {
        e.preventDefault()
        let postData = {
            ...field, to: upcomingActiveRowData && upcomingActiveRowData.pickupBranch &&
             upcomingActiveRowData.pickupBranch.email ? upcomingActiveRowData.pickupBranch.email : ''
        }
        emailAgencyByDriver(postData, (response) => {
            setSnackBarData({
                variant: response.status ? 'success' : 'error',
                message: response.msg || 'success'
            });
            setOpenSnackbar(true)
           setTimeout(() => {
            getResponse()
           }, 3000); 
        }, (error) => {
            setSnackBarData({
                variant: error.status ? 'success' : 'error',
                message: error.msg || 'error'
            });
            setOpenSnackbar(true)
            setTimeout(() => {
                getResponse()
               }, 3000);
        })
    }
    return (
        <>
        <SnackbarWrapper
            visible={openSnackBar}
            onClose={() => setOpenSnackbar(false)}
            variant={snackbarData.variant}
            message={snackbarData.message}
        />
        <Form onSubmit={onSubmit}>

            <Field
                name={STRINGS.SUBJECT_INPUT}
                component={Input}
                placeholder={STRINGS.SUBJECT_PLACEHOLDER}
                type={'text'}
                value={field.subject}
                onChange={(e) => setFields({ ...field, subject: e.target.value })}
            />
    
            <Field
                name={STRINGS.BODY_INPUT}
                component={TextArea}
                placeholder={STRINGS.BODY_PLACEHOLDER}
                type={'textarea'}
                config={{value: field.body}}
                onChange={(e) => setFields({ ...field, body: e.target.value })}
            />

            <div className="row align-items-center justify-content-center group-btn">
                <InputSubmit buttonLabel={STRINGS.SENDEMAIL} buttonStyle={"btn btn-sm btn-primary"}
                    containerStyle={''}
                />
                <button type={'button'} className="btn btn-sm btn-outline-blue" onClick={getResponse}>{STRINGS.CANCEL}</button>
            </div>
        </Form >
        </>
    )
}

const mapStateToProps = (state, props) => {
    return {
        upcomingActiveRowData: props.upcomingActiveRowData,
        getResponse: props.getResponse
    };
}

const reduxFormFunction = reduxForm({
    form: "EmailAgencyForm",
    fields: ['Name', 'Email', 'phoneKey', 'PhoneKey', 'Address', 'Dob'],
    onSubmitFail,
    // validate: validator,
    enableReinitialize: true
})(EmailAgencyForm);

export const EmailAgencyComponent = connect(mapStateToProps, null)(reduxFormFunction)