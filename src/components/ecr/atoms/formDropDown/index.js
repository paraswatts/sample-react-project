import React, { useEffect, useState } from 'react';
import './styles.scss';
// import Select from '@material-ui/core/Select';
// import Dropdown from 'react-dropdown';
// import Select from "react-select";
// import { colourOptions } from "./docs/data";
import ReactSelect, { components } from "react-select";

import 'react-dropdown/style.css';
const { ValueContainer, Placeholder } = components;
const CustomValueContainer = ({ children, ...props }) => {
    return (
        <ValueContainer {...props}>
            <Placeholder {...props} isFocused={props.isFocused}>
                {props.selectProps.placeholder}
            </Placeholder>
            {React.Children.map(children, child =>
                child && child.type !== Placeholder ? child : null
            )}
        </ValueContainer>
    );
};
export const FormDropDown = ({
    dataItems = [],
    labelText,
    selectedData = '',
    value,
    clearValue,
    className,
    placeholder = 'Select',
    meta: { touched, error },
    dropDataSet = () => { },
    disable = false,
    closeAltText = 'close-button',
    openAltText = 'open-button',
    input,
    data,
    config,
    isSearchable,
    autofocus,
    disabled = false,
    provideCustomStyle,
    onValueChange = () => { },
    noOptionsMessage = () => 'No option',
    ...props
}) => {

    let selectRef;
    const customStyles = {
        container: (provided, state) => ({
            ...provided,
            marginTop: 0
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            overflow: "visible"
        }),
        placeholder: (provided, state) => ({
            ...provided,
            position: "absolute",
            top: state.hasValue || state.selectProps.inputValue ? -10 : "50%",
            transition: "top 0.1s, font-size 0.1s",
            fontSize: (state.hasValue || state.selectProps.inputValue) && 14
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: (state && state.data && state.data._id) === (input && input.value && input.value._id) ? '#2684FF' : "transparent",
            color: (state && state.data && state.data._id) === (input && input.value && input.value._id) ? 'hsl(0,0%,100%)' : "#535050",
            padding: (state && state.data && state.data._id) === (input && input.value && input.value._id) ? "8px 12px" : '8px 12px'
        })
    }


    useEffect(() => {
        if (dataItems.length === 0) {
            // selectRef && selectRef.onMenuOpen()
            // selectRef && selectRef.select && selectRef.select.clearValue()
        }
    }, [dataItems.length])
    useEffect(() => {
        // selectRef && selectRef.onMenuOpen()
    }, [input && input.value, config && config.value])

    // const [newValues, seNewValues] = useState(data)
    // config
    const [labelVisibility, setLabelVisibility] = useState(false)
    const validationSpan =
        touched && error ? (
            <span className="error_msg text-danger">{error}</span>
        ) : null;

    return (
        <>
            <div className={'drop-down'} >
                {labelVisibility && <label>{placeholder}</label>}
                <ReactSelect
                    styles={provideCustomStyle ? customStyles : {
                        container: (provided, state) => ({
                            ...provided,
                            marginTop: 0
                        }),
                        valueContainer: (provided, state) => ({
                            ...provided,
                            overflow: "visible"
                        }),
                        placeholder: (provided, state) => ({
                            ...provided,
                            position: "absolute",
                            top: state.hasValue || state.selectProps.inputValue ? -10 : "50%",
                            transition: "top 0.1s, font-size 0.1s",
                            fontSize: (state.hasValue || state.selectProps.inputValue) && 14
                        })
                    }}
                    {...input}
                    classNamePrefix={'select'}
                    options={dataItems}
                    formatGroupLabel={'hell'}
                    isSearchable={isSearchable}
                    placeholder={placeholder}
                    onMenuOpen={() => { }}
                    onBlur={event => {
                        event.preventDefault();
                    }}
                    ref={(ref) => {
                        selectRef = ref
                    }}

                    isClearable
                    components={{
                        ValueContainer: CustomValueContainer
                    }}
                    noOptionsMessage={noOptionsMessage}
                    {...config}
                />
            </div>
            {validationSpan}
        </>
    )
}