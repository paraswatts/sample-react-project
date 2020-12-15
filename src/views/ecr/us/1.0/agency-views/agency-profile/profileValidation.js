const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../../config/default`);
const { STRINGS } = require(`../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`);
const { VALIDATION_MESSAGES, EMAIL_REGX, NAME_REGX, PHONE_REGX,
    MIN_PHONE_LENGTH, MAX_PHONE_LENGTH } = require(`../../../../../../shared/${PLATFORM}/constants`)

const validator = values => {
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
    if (!values[STRINGS.NAME_INPUT]) {
        errors[STRINGS.NAME_INPUT] =
            VALIDATION_MESSAGES.NAME_REQUIRED;
    }
    else if (
        !NAME_REGX.test(
            values[STRINGS.NAME_INPUT]
        )) {
        errors[STRINGS.NAME_INPUT] = VALIDATION_MESSAGES.NAME_VALIDATION;
    }
    if (!values[STRINGS.SURNAME_INPUT]) {
        errors[STRINGS.SURNAME_INPUT] =
            VALIDATION_MESSAGES.SURNAME_REQUIRED;
    }
    else if (
        !NAME_REGX.test(
            values[STRINGS.SURNAME_INPUT]
        )) {
        errors[STRINGS.SURNAME_INPUT] = VALIDATION_MESSAGES.SURNAME_VALIDATION;
    }
    if (!values[STRINGS.DOB]) {
        errors[STRINGS.DOB] =
            VALIDATION_MESSAGES.DOB_REQUIRED;
    }
    if (!values[STRINGS.CITY_INPUT]) {
        errors[STRINGS.CITY_INPUT] =
            VALIDATION_MESSAGES.CITY_REQUIRED;
    }
    else if (
        !NAME_REGX.test(
            values[STRINGS.CITY_INPUT]
        )) {
        errors[STRINGS.CITY_INPUT] = VALIDATION_MESSAGES.CITY_NAME_VALIDATION;
    }
    if (!values[STRINGS.COUNTRY_INPUT]) {
        errors[STRINGS.COUNTRY_INPUT] =
            VALIDATION_MESSAGES.COUNTRY_REQUIRED;
    }
    if (!values[STRINGS.PHONE_NUMBER_KEY]) {
        errors[STRINGS.PHONE_NUMBER_KEY] =
            VALIDATION_MESSAGES.PHONE_NUMBER_REQUIRED;
    }
    if (!values[STRINGS.PHONE_CODE_KEY]) {
        errors[STRINGS.PHONE_CODE_KEY] =
            VALIDATION_MESSAGES.PHONE_CODE_KEY_REQUIRED;
    }
    if (values[STRINGS.PHONE_NUMBER_KEY] && !(values[STRINGS.PHONE_NUMBER_KEY].trim())) {
        errors[STRINGS.PHONE_NUMBER_KEY] =
            VALIDATION_MESSAGES.VALUE_CANNOT_BE_EMPTY_SPACES;
    }
    if (values[STRINGS.PHONE_NUMBER_KEY] && (values[STRINGS.PHONE_NUMBER_KEY].length < MIN_PHONE_LENGTH || values[STRINGS.PHONE_NUMBER_KEY].length > MAX_PHONE_LENGTH)) {
        errors[STRINGS.PHONE_NUMBER_KEY] =
            VALIDATION_MESSAGES.PHONE_NUMBER_CHARACTER_LENGTH;
    }
    if (values[STRINGS.PHONE_NUMBER_KEY] &&
        !PHONE_REGX.test(
            values[STRINGS.PHONE_NUMBER_KEY]
        )) {
        errors[STRINGS.PHONE_NUMBER_KEY] = VALIDATION_MESSAGES.PHONE_NO_VALIDATION;
    }


    return errors;
};

export default validator;