const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../../config/default`);
const { STRINGS } = require(`../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`);
const { VALIDATION_MESSAGES, EMAIL_REGX, NAME_REGX, PHONE_REGX, PASSWORD_LENGTH, MIN_PHONE_LENGTH, MAX_PHONE_LENGTH } = require(`../../../../../shared/${PLATFORM}/constants`)

const { getCountryPrefix } = require(`../../../../../helpers/${PLATFORM}/getCountryPrefix`);
const { getPhoneValid } = require(`../../../../../helpers/${PLATFORM}/getPhoneValid`);

const validator = values => {
    const errors = {};
    let getCountry;
    let number;
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
    } else {
        if (values[STRINGS.PASSWORD_INPUT_NAME].length < PASSWORD_LENGTH) {
            errors[STRINGS.PASSWORD_INPUT_NAME] =
                VALIDATION_MESSAGES.PASSWORD_MINLENGTH;
        }
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
    if (!values[STRINGS.RE_ENTER_PASSWORD_INPUT]) {
        errors[STRINGS.RE_ENTER_PASSWORD_INPUT] =
            VALIDATION_MESSAGES.PASSWORD_REQUIRED;
    }
    if (!(values[STRINGS.PASSWORD_INPUT_NAME] === values[STRINGS.RE_ENTER_PASSWORD_INPUT])) {
        errors[STRINGS.RE_ENTER_PASSWORD_INPUT] = VALIDATION_MESSAGES.PASSWORDS_DO_NOT_MATCH
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
    if (values[STRINGS.PHONE_CODE_KEY]) {
        let getCode = values[STRINGS.PHONE_CODE_KEY]
        if (getCode && getCode.value && getCode.label) {
            var code = getCode.value.replace("+", "")
            var label = getCode.label.split("(")[0]
            label = label.split(values[STRINGS.PHONE_CODE_KEY].value)[1]
            getCountry = getCountryPrefix(code.trim(), label.trim())
        }
    }
    if (values[STRINGS.PHONE_NUMBER_KEY]) {
        if (getCountry) {
            number = getPhoneValid(values[STRINGS.PHONE_NUMBER_KEY], getCountry)
            if(number && number === 'invalid'){
            errors[STRINGS.PHONE_NUMBER_KEY] = VALIDATION_MESSAGES.INVALID_NUMBER_FOR_COUNTRY;
            } 
        }
    }

return errors;
};

export default validator;