import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../config/default`);
const { ROUTES } = require(`../../../../../../shared/${PLATFORM}/constants`);
const { DatePickerInput } = require(`../../../../../../components/${PLATFORM}/atoms/date-picker`)
const { Form } = require(`../../../../../../components/${PLATFORM}/atoms/form`);
const { STRINGS } = require(`../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`)
const { Input } = require(`../../../../../../components/${PLATFORM}/atoms/input`);
const { InputSubmit } = require(`../../../../../../components/${PLATFORM}/atoms/input-submit`);
const { onSubmitFail } = require(`../../../../../../helpers/${PLATFORM}`);
const { LocationSearch } = require(`../../../../../../components/${PLATFORM}/atoms/location-picker`)

const SearchForm = (props) => {
    const [searchField, setSearchField] = useState({
        PickupDate: null
    })
    const [coordinate, setCoordinate] = useState({
        lat: '',
        lon: ''
    })
    const minDate = new Date()
    const maxDate = new Date()
    let history = useHistory();
    const [val, setVal] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        let postData = {
            fromCity: props.pickup_Data.City,
            toCity: '',
            adultSeats: props.advanceSearchFormValues.seats ? props.advanceSearchFormValues.seats.adultSeats : 0,
            childSeats: props.advanceSearchFormValues.seats ? props.advanceSearchFormValues.seats.childSeats : 0,
            pickupDate: searchField.PickupDate !== null ? moment(new Date(searchField.PickupDate)).format().split('T')[0] : null,
            limit: STRINGS.VEHICLE_LIMIT,
            index: STRINGS.INDEX
        }

        props.setUpPickUpLocation({
            ...props.pickup_Data,
            PickupDate: postData.pickupDate,
            DropOffLocation: ''
        })
        props.onSubmit(postData)
    }
    useEffect(() => {
        props.setUpPickUpLocation({ ...props.pickup_Data, PickupDate: null })
    },[])

    return (
        <>
            <Form onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-sm-6">
                        <LocationSearch
                            intialvalue={props.pickup_Data.PickupLocation ? props.pickup_Data.PickupLocation : ''}
                        />
                    </div>
                    <div className="col-sm-6 col-md-3" >
                        <Field
                            asterisk={true}
                            name={STRINGS.PICKUP_DATE_INPUT}
                            component={DatePickerInput}
                            placeholder={STRINGS.PICKUP_DATE_PLACEHOLDER}
                            minDate={minDate}
                            maxDate={maxDate.setMonth(maxDate.getMonth() + 12)}
                            value={searchField.PickupDate}
                            onChange={(value) => {
                                props.setUpPickUpLocation({ ...props.pickup_Data, PickupDate: value })
                                setSearchField(
                                    prevState => ({
                                        ...prevState,
                                        ['PickupDate']: value
                                    }))
                            }}
                        />
                    </div>
                    <div className="col-md-3 text-center text-md-right">
                        <InputSubmit buttonLabel={STRINGS.SEARCH_BUTTON_LABEL} buttonStyle={"btn btn-lg btn-primary text-capitalize"} />
                    </div>
                </div>
            </Form >
        </>
    )
}

const reduxFormFunction = reduxForm({
    form: "searchForm",
    fields: ['PickupLocation', 'PickupDate'],
    onSubmitFail,
    enableReinitialize: true
})(SearchForm);

export const SearchVehicleForm = (reduxFormFunction)