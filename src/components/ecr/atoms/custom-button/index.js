import React from 'react';
import classNames from 'classnames';
import './style.scss';

export const CustomButton = ({
    children = 'Click here',
    buttonAction = () => { },
    buttonStyle,
    buttonId = '',
    buttonDisabled = false,
}) => {
    return (
        <button
            id={buttonId}
            className={classNames([buttonStyle, ''])}
            disabled={buttonDisabled}
            onClick={buttonAction}>
            {children}
        </button>
    )
};