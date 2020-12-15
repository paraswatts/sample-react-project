import React from "react";
import classNames from 'classnames';
// import next from "../../../../assets/next.png";

export const InputSubmit = ({
  buttonLabel,
  buttonStyle = "btn btn-lg text-uppercase",
  disabled = false,
  buttonType = 'submit',
  loginText = 'Log In',
  buttonAction = () => { },
  containerStyle
}) => {
  return (

    <div className={classNames([containerStyle])}>
      <button
        disabled={disabled}
        type={buttonType}
        onClick={(e) => { buttonAction() }}
        className={classNames([
          buttonStyle
        ])}>
        {buttonLabel}{" "}
        {buttonLabel === loginText && <i>
          {/* <img src={next} alt="" /> */}
        </i>}
      </button>
    </div >
  );
};
