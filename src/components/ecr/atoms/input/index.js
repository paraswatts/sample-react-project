import React from "react";
import FloatingLabelInput from 'react-floating-label-input';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//       width: '25ch',
//     },
//   },
// }));
export const Input = ({
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

  // const classes = useStyles();

  //widthStyle = widthStyle ? widthStyle : "col-md-12";
  const validationSpan =
    touched && error ? (
      <span className="error_msg text-danger">{error}</span>
    ) : null;

  return (
    <>
      {label && <label>{label}</label>}
      <div className="form-group" style={style}>

        <TextField
          id={(input && input.name) || (config && config.name)}
          label={placeholder}
          // placeholder={placeholder}
          {...input}
          {...config}
          maxLength={maxLength}
          minLength={minLength}

        // autoComplete='off'
        />
        {/* </form> */}
        {validationSpan}
      </div>
    </>
  );
};
