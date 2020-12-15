import React from 'react';
import './styles.scss';
// import Select from '@material-ui/core/Select';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
export const CustomDropdown = ({
    dataItems = [],
    labelText,
    selectedData = '',
    value,
    className,
    placeholder = 'Select',
    dropDataSet = () => { },
    disable = false,
    closeAltText = 'close-button',
    openAltText = 'open-button',
    ...props
}) => {
    return (
        <div className={'drop-down'}>
            <Dropdown
                options={dataItems}
                value={value}
                // disabled={disable}
                placeholder={placeholder}
                className={className}
                onChange={(e) => {
                    dropDataSet(e);
                }}

            />

        </div>
    )
}