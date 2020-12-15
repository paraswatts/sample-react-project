import React from "react";

export const RangeInput = ({
    input,
    label,
    meta: { touched, error },
    config1,
    config2,
    placeholder,
    widthStyle,
    style,
    data,
    pattern,
    maxLength,
    minLength,
    onBlur,
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
            <div className="d-flex align-items-center"
                onBlur={onBlur}
            >
                <div className="form-control d-flex align-items-center range_opton">
                    <div className="form-row align-items-center">
                        <span className="col-7">Vehicle Year Range:</span>
                        <div className="col-2">
                            <input
                                style={{
                                    maxWidth: '100%'
                                }}
                                placesholder={"placeholder"}
                                maxLength={20}
                                minLength={4}
                                {...input}
                                autoComplete='off'
                                {...config1}
                            />
                        </div>
                        <span className="col-1">to</span>
                        <div className="col-2">
                            <input
                                style={{
                                    maxWidth: '100%'
                                }}
                                placesholder={"placeholder"}
                                maxLength={20}
                                minLength={4}
                                {...input}
                                autoComplete='off'
                                {...config2}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {validationSpan}
        </>
    );
};
