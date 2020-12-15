const {
  defaultConfig: { PLATFORM, LOCATION }
} = require(`../../../../../config/default`);

const { STRINGS } = require(`../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`);
const { VALIDATION_MESSAGES, EMAIL_REGX, PASSWORD_LENGTH } = require(`../../../../../shared/${PLATFORM}/constants`)
const { store } = require(`../../../../../redux/${PLATFORM}/store`)

const validator = (values) => {
  const captcha = store.getState().CommonReducer && store.getState().CommonReducer.captcha
  const errors = {};
  if (!values[STRINGS.EMAIL_INPUT_NAME]) {
    errors[STRINGS.EMAIL_INPUT_NAME] =
      VALIDATION_MESSAGES.EMAIL_REQUIRED;
  } else if (
    !EMAIL_REGX.test(
      values[STRINGS.EMAIL_INPUT_NAME].toLowerCase()
    )
  ) {
    errors[STRINGS.EMAIL_INPUT_NAME] =
      VALIDATION_MESSAGES.EMAIL_INVALID;
  }
  if (!values[STRINGS.PASSWORD_INPUT_NAME]) {
    errors[STRINGS.PASSWORD_INPUT_NAME] =
      VALIDATION_MESSAGES.PASSWORD_REQUIRED;
  }
  else {
    if (values[STRINGS.PASSWORD_INPUT_NAME].length < PASSWORD_LENGTH) {
      errors[STRINGS.PASSWORD_INPUT_NAME] =
        VALIDATION_MESSAGES.PASSWORD_MINLENGTH;
    }
  }
  if (!values[STRINGS.CAPTCHA_INPUT]) {
    errors[STRINGS.CAPTCHA_INPUT] =
      VALIDATION_MESSAGES.CAPTCHA_REQUIRED;
  }
  else if (values[STRINGS.CAPTCHA_INPUT] && values[STRINGS.CAPTCHA_INPUT] !== captcha) {
    errors[STRINGS.CAPTCHA_INPUT] = VALIDATION_MESSAGES.INVALID_CAPTCHA
  }
  return errors;
};

export default validator;
