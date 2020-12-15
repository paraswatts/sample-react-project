import React from "react";
import "./style.scss";

export const Checkbox = (
  { multiple, index, lastFieldIndex, text, config, input, meta: { touched, error }, widthStyle, labelText, useDefaultProps = true,
    onChange = () => { }
  }
) => {


  const validationSpan =
    touched && error ? (
      <span className={`error_msg text-danger`} style={{ top: multiple && '53%' }}>{error}</span>
    ) : null;
  // const style = widthStyle ? widthStyle : "col-sm-12"

  let defaultProps = useDefaultProps ? { ...input } : {}
  const { value } = defaultProps
  defaultProps = { ...defaultProps, checked: value }
  return (

    <>

      <label className="form-checkbox">
        <input
          {...defaultProps}
          type="checkbox"
          className="form-check-input"
          // onChange={!!(config && config.onChange) ? config.onChange : onChange}
          {...config}
        />
        {text}
        <span className="checkmark"></span>
      </label>
      {
        validationSpan
      }
    </>
  );
};

export default Checkbox;
