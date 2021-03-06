import React, { useState, useEffect } from "react";
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import moment from 'moment-timezone';
import FloatingLabelInput from 'react-floating-label-input';
import TextField from '@material-ui/core/TextField';

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
} from '@material-ui/pickers';
import './style.scss';
import { SnackbarWrapper } from '../../molecules/snackbar-wrapper'
let reference;
export const TimePickerInput = ({
    value,
    input,
    label,
    meta: { touched, error },
    config,
    minDate,
    maxDate,
    widthStyle,
    disabled = false,
    onChangeTime = () => { },
    timeValue,
    maxTime,
    minTime,
    placeholder = 'Choose Time',
    VALIDATION_MESSAGES
}) => {
    const [openCalendar, setOpenCalendar] = useState(false);
    const [inputValue, setTimeInputValue] = useState('');
    const [formError, setError] = useState(false)
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [dateSelected, setDateSelected] = useState()

    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });
    widthStyle = widthStyle ? widthStyle : "col-md-6";
    const validationSpan =
        touched && error ? (
            <span className="error_msg text-danger">{error}</span>
        ) : null;

    return (<>
        <SnackbarWrapper
            visible={openSnackBar}
            onClose={() => setOpenSnackbar(false)}
            // variant={snackbarData.variant}
            variant={'error'}
            message={VALIDATION_MESSAGES && VALIDATION_MESSAGES.INVALID_TIME}
        />
        <div>

            <div className="form-group">
                {((!!config && !!config.value) || (!!input && !!input.value)) && <label className="float_label">{placeholder}</label>}
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid>
                        <KeyboardTimePicker
                            className='form-control'
                            margin="normal"
                            helperText={''}
                            error={false}
                            id="time-picker"
                            value={input.value}
                            defaultValue={new Date().getTime()}
                            keyboardIcon={<></>}
                            placeholder={placeholder}
                            onChange={(value) => {
                                value.getTime()
                                if (maxTime <= value.getTime()) {
                                    setOpenSnackbar(true)
                                }
                                else if (minTime >= value.getTime()) {
                                    setOpenSnackbar(true)
                                }
                                else {
                                    input && input.onChange(value)
                                    setOpenCalendar(false)
                                }
                            }}
                            InputProps={{
                                readOnly: true,
                                style: { color: 'black' },
                                onClick: () => {
                                    !disabled && setOpenCalendar(true)
                                },
                                value: config && config.value ? moment(config.value).format("h:mm A") : input.value ? moment(input.value).format("h:mm A") : ''
                            }}
                            onClick={() => {
                                setOpenCalendar(true)
                            }}
                            KeyboardButtonProps={{ disabled: true, style: {} }}
                            onOpen={() => { setOpenCalendar(true) }}
                            onClose={(value) => {
                                setOpenCalendar(false)
                            }}
                            open={openCalendar}
                            {...config}
                        />
                        {/* <TextField id="standard-basic" value={dateSelected} label="Standard"
                            disabled={true}
                        /> */}

                        {/* <FloatingLabelInput
                            id="example-3"
                            label={placeholder}
                            // onFocus={}
                            editable={false}
                            onClick={() => { }}


                        /> */}
                    </Grid>
                    {validationSpan}
                </MuiPickersUtilsProvider>
            </div>
        </div>
    </>
    );
};