import React, { useState } from "react";
import './style.scss';
export const TextArea = ({
    value,
    input,
    label,
    meta: { touched, error },
    config,
    placeholder,
    widthStyle
}) => {

    const [onFocus, setOnFocus] = useState(false)

    widthStyle = widthStyle ? widthStyle : "col-md-12";
    const validationSpan =
        touched && error ? (
            <span className="error_msg text-danger">{error}</span>
        ) : null;


    return (
        <div>
            <div className="form-group">
                <textarea className="form-control" {...input} style={{ color: 'black' }}  {...config}
                    placeholder={onFocus ? "" : !!placeholder ? placeholder : ''}
                    onFocus={() => {
                        setOnFocus(true)
                    }}
                    onBlur={() => {
                        setOnFocus(false)
                    }}
                />
                {<label className={onFocus || (!!(config && config.value)) || !!(input && input.value) ? "float_label floating_label" : "float_label"}>{placeholder}</label>}
                {validationSpan}
            </div>
        </div>
    );
};
