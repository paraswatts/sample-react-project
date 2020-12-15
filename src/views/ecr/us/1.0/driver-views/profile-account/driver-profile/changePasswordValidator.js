const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../../config/default`);
const { STRINGS } = require(`../../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`);
const { VALIDATION_MESSAGES, EMAIL_REGX, NAME_REGX, PHONE_REGX,
    PASSWORD_LENGTH, MIN_PHONE_LENGTH, MAX_PHONE_LENGTH } = require(`../../../../../../../shared/${PLATFORM}/constants`)

const validator = values => {
    const errors = {};

    if (!values[STRINGS.PASSWORD_INPUT_NAME]) {
        errors[STRINGS.PASSWORD_INPUT_NAME] =
            VALIDATION_MESSAGES.PASSWORD_REQUIRED;
    } else {
        if (values[STRINGS.PASSWORD_INPUT_NAME].length < PASSWORD_LENGTH) {
            errors[STRINGS.PASSWORD_INPUT_NAME] =
                VALIDATION_MESSAGES.PASSWORD_MINLENGTH;
        }
    }

    if (!values[STRINGS.RE_ENTER_PASSWORD_INPUT]) {
        errors[STRINGS.RE_ENTER_PASSWORD_INPUT] =
            VALIDATION_MESSAGES.PASSWORD_REQUIRED;
    } else {
        if (values[STRINGS.RE_ENTER_PASSWORD_INPUT].length < PASSWORD_LENGTH) {
            errors[STRINGS.RE_ENTER_PASSWORD_INPUT] =
                VALIDATION_MESSAGES.PASSWORD_MINLENGTH;
        }
    }
    if (!values[STRINGS.PASSWORD]) {
        errors[STRINGS.PASSWORD] =
            VALIDATION_MESSAGES.PASSWORD_REQUIRED;
    } else {
        if (values[STRINGS.PASSWORD].length < PASSWORD_LENGTH) {
            errors[STRINGS.PASSWORD] =
                VALIDATION_MESSAGES.PASSWORD_MINLENGTH;
        }
    }
    if (!(values[STRINGS.PASSWORD] === values[STRINGS.RE_ENTER_PASSWORD_INPUT])) {
        errors[STRINGS.RE_ENTER_PASSWORD_INPUT] = VALIDATION_MESSAGES.PASSWORDS_DO_NOT_MATCH
    }
    return errors;
};

export default validator;