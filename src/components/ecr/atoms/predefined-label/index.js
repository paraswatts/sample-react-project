import React from "react";
import FloatingLabelInput from 'react-floating-label-input';
import TextField from '@material-ui/core/TextField';

export const PredefinedInput = ({
    input,
    label,
    meta: { touched, error },
    config,
    placeholder,
    widthStyle,
    style,
    data,
    pattern,
    maxLength,
    minLength,
    ...props
}) => {
    //widthStyle = widthStyle ? widthStyle : "col-md-12";
    const validationSpan =
        touched && error ? (
            <span className="error_msg text-danger">{error}</span>
        ) : null;

    return (
        <>
            {label && <label>{label}</label>}
            <div className="form-group" style={style}>

                {/* <FloatingLabelInput
                    // id="example-3"
                    // className="form-control"
                    label={placeholder}
                    // onBlur={action('onBlur')}
                    // onChange={action('onChange')}
                    // onFocus={action('onFocus')}
                    // value={value}
                    // placeholder={placeholder}
                    {...input}
                    {...config}
                    maxLength={maxLength}
                    minLength={minLength}
                    autoComplete='off'
                /> */}
                <TextField id="standard-basic"
                    label={placeholder}
                    {...input}
                    {...config}
                />

                {/* <input className="form-control"
          placeholder={placeholder}
          {...input}
          {...config}
          maxLength={maxLength}
          minLength={minLength}
          autoComplete='off' /> */}
                {validationSpan}
            </div>
        </>
    );
};
