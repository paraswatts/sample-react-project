import React, { useEffect } from 'react';
import { createCaptcha } from './capctha-generator';
import './style.scss';
import TextField from '@material-ui/core/TextField';

export const CaptchaInput = ({
    input,
    label,
    meta: { touched, error },
    config,
    placeholder,
    widthStyle,
    style,
    data,
    REGENERATE_CAPCTHA,
    saveCaptcha = () => { },
    ...props
}) => {
    useEffect(() => {
        createCaptcha()
    }, [])
    const validationSpan =
        touched && error ? (
            <span className="error_msg text-danger">{error}</span>
        ) : null;
    const result = (text) => {
        saveCaptcha(text)
    }
    return (
        <div className='col-md-12'>
            <div className="form-group" style={style}>
                <div className="form-row">
                    <div className="col-md-6 col-sm-6 col-7">
                        {label && <label>{label}</label>}
                        <TextField
                            className="form-control"
                            label={placeholder}
                            id={placeholder}
                            {...input}
                            {...config}
                            maxLength={60}
                            autoComplete='off' />
                        {validationSpan}
                    </div>
                    <div className="col-md-6 col-sm-6 col-5">
                        <div className='captcha_field' style={{ overflow: 'visible' }}>
                            <div id={"captcha"} className='captcha_code'></div>
                            <i><img
                                src={REGENERATE_CAPCTHA}
                                height='20px'
                                onClick={() => {
                                    createCaptcha()
                                }}
                            /></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



