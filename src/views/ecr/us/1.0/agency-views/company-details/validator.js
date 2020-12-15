const {
    defaultConfig: { PLATFORM, LOCATION }
} = require(`../../../../../../config/default`);
const { STRINGS } = require(`../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`);
const { VALIDATION_MESSAGES, EMAIL_REGX, NAME_REGX, PHONE_REGX, PASSWORD_LENGTH, MIN_PHONE_LENGTH, MAX_PHONE_LENGTH, WEBSITE_REGEX } = require(`../../../../../../shared/${PLATFORM}/constants`)
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const { getCountryPrefix } = require(`../../../../../../helpers/${PLATFORM}/getCountryPrefix`);
const { getPhoneValid } = require(`../../../../../../helpers/${PLATFORM}/getPhoneValid`);

const validator = (values) => {

    const errors = {};
    let getCountry;
    let number;

    if ((values && values[STRINGS.ONLY_ALLOW_CREDIT_CARD]) && (!(values && values.paymentConditions))) {
        errors[STRINGS.PAYMENT_COND_INPUT_NAME] = VALIDATION_MESSAGES.LIST_CONDITION_REQUIRED
    }
    if (!values[STRINGS.NAME_INPUT]) {
        errors[STRINGS.NAME_INPUT] = VALIDATION_MESSAGES.COMPANY_NAME_REQUIRED
    }
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
    if (!values[STRINGS.PHONE_NUMBER_KEY]) {
        errors[STRINGS.PHONE_NUMBER_KEY] = VALIDATION_MESSAGES.ENTER_PHONE_NUMBER_REQUIRED
    }

    if (!values[STRINGS.EMAIL_INPUT_NAME]) {
        errors[STRINGS.EMAIL_INPUT_NAME] = VALIDATION_MESSAGES.ENTER_EMAIL_REQUIREDL
    }
    if (!values[STRINGS.ADDRESS_INPUT_NAME]) {
        errors[STRINGS.ADDRESS_INPUT_NAME] = VALIDATION_MESSAGES.ENTER_ADDRESS_REQUIRED
    }

    if (!values[STRINGS.CITY_INPUT]) {
        errors[STRINGS.CITY_INPUT] = VALIDATION_MESSAGES.ENETR_CITY_REQUIRED
    }
    if (values[STRINGS.PHONE_NUMBER_KEY] && (values[STRINGS.PHONE_NUMBER_KEY].length < MIN_PHONE_LENGTH || values[STRINGS.PHONE_NUMBER_KEY].length > MAX_PHONE_LENGTH)) {
        errors[STRINGS.PHONE_NUMBER_KEY] =
            VALIDATION_MESSAGES.PHONE_NUMBER_CHARACTER_LENGTH;
    }


    if (!values[STRINGS.COUNTRY_INPUT]) {
        errors[STRINGS.COUNTRY_INPUT] = VALIDATION_MESSAGES.ENTER_COUNTRY_REQUIRED
    }
    if (!values[STRINGS.PHONE_NAME]) {
        errors[STRINGS.PHONE_NAME] = VALIDATION_MESSAGES.ENTER_PHONE_NUMBER_REQUIRED
    }

    if (!values[STRINGS.PHONE_CODE_KEY]) {
        errors[STRINGS.PHONE_CODE_KEY] = VALIDATION_MESSAGES.ENTER_PHONE_CODE_REQUIRED
    }
    if (values[STRINGS.PHONE_CODE_KEY]) {
        let getCode = values[STRINGS.PHONE_CODE_KEY]
        if (getCode) {
            if (getCode && getCode.value && getCode.label) {
                var code = getCode.value.replace("+", "")
                var label = getCode.label.split("(")[0]
                label = label.split(values[STRINGS.PHONE_CODE_KEY].value)[1]
                getCountry = getCountryPrefix(code.trim(), label.trim())
            }
        }
    }
    if (values[STRINGS.PHONE_NUMBER_KEY]) {
        if (getCountry) {
            number = getPhoneValid(values[STRINGS.PHONE_NUMBER_KEY], getCountry)
            if (number && number === 'invalid') {
                errors[STRINGS.PHONE_NUMBER_KEY] = VALIDATION_MESSAGES.INVALID_NUMBER_FOR_COUNTRY;
            }
        }
    }
    return errors;
};

export default validator;
