import React from 'react';
import classNames from 'classnames';
import './style.scss';

export const FormWrapper = ({
    formLabel = '',
    children,
    formWrapperStyle = {},
    formHeadingStyle = {},
    formContentStyle = {}
}) => (
        <div className={classNames([
            formWrapperStyle,
            'form-wrapper',
        ])}>
            {/* <h3 className={classNames([
                formHeadingStyle,
                'form-heading'
            ])}>{formLabel}</h3> */}
            {children}
        </div>
    );