import React from "react";
import ReactSelect, { components } from "react-select";
import './style.scss';
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
export const Select = ({
  value,
  label,
  config,
  meta: { touched, error },
  options,
  widthStyle,
  input,
  data,
  onChange = () => { },
  onValueChange = () => { },
  isSearchable = false,
  placeholder,
}) => {


  widthStyle = widthStyle ? widthStyle : "col-md-12";
  const validationSpan =
    touched && error ? (
      <span className="error_msg text-danger">{error}</span>
    ) : null;

  return (
    <>
      {label && <label>{label}</label>}
      <div className="form-group">
        <ReactSelect
          {...input}
          options={options}
          styles={{
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
              top: state.hasValue || state.selectProps.inputValue ? -8 : "50%",
              transition: "top 0.1s, font-size 0.1s",
              fontSize: (state.hasValue || state.selectProps.inputValue) && 13,
              backgroundColor: '#ffffff'
            })
          }}
          isSearchable={isSearchable}
          placeholder={placeholder}
          value={data}
          onChange={onValueChange}
          onBlur={event => event.preventDefault()}
          isClearable
          components={{
            ValueContainer: CustomValueContainer
          }}
          {...config}
        />
        {validationSpan}
      </div>
    </>
  );
};