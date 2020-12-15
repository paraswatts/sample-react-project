import React from 'react';

export const InputWithSlashLabel = ({
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
    const validationSpan =
        touched && error ? (
            <span className="error_msg text-danger">{error}</span>
        ) : null;
    return (
        <div className="form-group">

            <label className="float_label">{label}</label>
            <input
                placeholder={placeholder}
                {...input}
                {...config}
                // value={data}
                className={"form-control"}
                maxLength={maxLength}
                minLength={minLength}
                autoComplete='off' />

            {validationSpan}
        </div>
    );
}

