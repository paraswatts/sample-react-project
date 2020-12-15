import React, { useState, useEffect } from "react";
import { Field, reduxForm, change as changeField } from "redux-form";
import { connect } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../../config/default`);
const { Form } = require(`../../../../../../../components/${PLATFORM}/atoms/form`);
const { STRINGS } = require(`../../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`)
const { TextArea } = require(`../../../../../../../components/${PLATFORM}/atoms/text-area`);
const { StarRatingComponent } = require(`../../../../../../../components/${PLATFORM}/atoms/star-component`);
const { InputSubmit } = require(`../../../../../../../components/${PLATFORM}/atoms/input-submit`);
const { onSubmitFail } = require(`../../../../../../../helpers/${PLATFORM}`);
const { createNewListing } = require(`../../../../../../../redux/${PLATFORM}/actions`);
const { SnackbarWrapper } = require(`../../../../../../../components/${PLATFORM}/molecules/snackbar-wrapper`);

const RateAgencyForm = ({
    content,
    createNewListing,
    rateAgencyByDriver,
    activeRow,
    getResponse,
    getDriverPastTrip,
    tripIndex
}) => {
    const [starReading, setStarReading] = useState(content.rateForAgency && content.rateForAgency !== 0 ? content.rateForAgency : 1)
    const [field, setFields] = useState({
        agencyComment: content.type === 'edit' && activeRow.commentForAgency ? activeRow.commentForAgency : '',
        reloComment: content.type === 'edit' && activeRow.commentForECRByDriver ? activeRow.commentForECRByDriver : ''
    })

    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const onSubmit = (e) => {
        e.preventDefault()
        let postData = {
            data: {
                rateForAgency: starReading,
                commentForECRByDriver: field.reloComment,
                commentForAgency: field.agencyComment
            },
            id: activeRow._id
        }
        rateAgencyByDriver(postData, (response) => {
            setSnackBarData({
                variant: response.status ? 'success' : 'error',
                message: `Successfully rated ${content.agencyName ? content.agencyName : ''}`
            });
            setOpenSnackbar(true)
            setTimeout(() => {
                getResponse()
                // console.log(tripIndex)
                let data = { limit: STRINGS.TRIP_LIMIT, index: tripIndex && tripIndex.past }
                let pastTripReq = Object.keys(data)
                    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
                    ).join('&');
                getDriverPastTrip(pastTripReq, () => { }, () => { })
            }, 2000);

        }, (error) => {
            setSnackBarData({
                variant: error.status ? 'success' : 'error',
                message: error.msg || 'error'
            });
            setOpenSnackbar(true)
            setTimeout(() => {
                getResponse()
            }, 2000);

        })
    }
    useEffect(() => {
        // console.log(tripIndex)
    }, [tripIndex])

    return (
        <>
            <SnackbarWrapper
                visible={openSnackBar}
                onClose={() => setOpenSnackbar(false)}
                variant={snackbarData.variant}
                message={snackbarData.message}
            />

            <Form onSubmit={onSubmit}>
                {content.type !== 'edit' ? <h5>{`How would you rate your whole experience  ${content.agencyName ? `with ${content.agencyName}` : ''}  `}</h5>
                    : <h5>{`Edit your rating  ${content.agencyName ? `for ${content.agencyName}` : ''}`}</h5>}
                <StarRatingComponent initialRating={starReading}
                    onStarChange={(value) => {
                        setStarReading(value)
                    }} />
                <p> You can leave a comment about the agency</p>
                <Field
                    name={STRINGS.COMMENT_AGENCY_NAME}
                    component={TextArea}
                    placeholder={STRINGS.COMMENT_PLACEHOLDER}
                    type={'textarea'}
                    config={{
                        value: field.agencyComment,
                        onChange: (e) => setFields({ ...field, agencyComment: e.target.value })
                    }}
                />
                <p>You can leave a comment to us about any aspect of the relocation</p>

                <Field
                    name={STRINGS.COMMENT_RELO_NAME}
                    component={TextArea}
                    placeholder={STRINGS.COMMENT_PLACEHOLDER}
                    type={'textarea'}
                    config={{
                        value: field.reloComment,
                        onChange: (e) => setFields({ ...field, reloComment: e.target.value })
                    }}
                />

                <div className="group-btn">
                    <InputSubmit buttonLabel={content.type !== 'edit' ? STRINGS.SEND_EMAIL : STRINGS.EDIT} buttonStyle={"btn btn-sm btn-primary"}
                        containerStyle={''}
                    />
                </div>
            </Form >
        </>
    )
}

const mapStateToProps = (state, props) => {
    return {
        content: props.agencyName,
        getResponse: props.getResponse
    };
}

const reduxFormFunction = reduxForm({
    form: "RateAgencyForm",
    fields: ['Name', 'Email', 'phoneKey', 'PhoneKey', 'Address', 'Dob'],
    onSubmitFail,
    // validate: validator,
    enableReinitialize: true
})(RateAgencyForm);

export const RateAgencyComponent = connect(mapStateToProps, null)(reduxFormFunction)