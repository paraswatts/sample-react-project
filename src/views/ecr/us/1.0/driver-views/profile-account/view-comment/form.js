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

const ViewCommentForm = ({
  content
}) => {
    return (
        <>
        <StarRatingComponent initialRating={content.rateForDriver} readonly={true}/>
        <Form >
           <Field
                name={STRINGS.COMMENT_AGENCY_NAME}
                component={TextArea}
                placeholder={STRINGS.COMMENT_AGENCY_NAME}
                type={'textarea'}
                config={{readOnly: true, 
                    value: content.commentForDriver ? content.commentForDriver : ' ',
                    onChange: (e) => {return false}
                }}
                disabled={true}
            />
        </Form >
        </>
    )
}

const mapStateToProps = (state, props) => {
    return {
        content: props.content
    };
}

const reduxFormFunction = reduxForm({
    form: "ViewCommentForm",
    fields: ['Name', 'Email', 'phoneKey', 'PhoneKey', 'Address', 'Dob'],
    onSubmitFail,
    // validate: validator,
    enableReinitialize: true
})(ViewCommentForm);

export const ViewCommentComponent = connect(mapStateToProps, null)(reduxFormFunction)