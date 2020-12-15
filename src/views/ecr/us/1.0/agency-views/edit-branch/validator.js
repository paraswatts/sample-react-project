const {
    defaultConfig: { PLATFORM, LOCATION }
} = require(`../../../../../../config/default`);
const { STRINGS } = require(`../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`);
const { VALIDATION_MESSAGES, EMAIL_REGX, MIN_PHONE_LENGTH, MAX_PHONE_LENGTH } = require(`../../../../../../shared/${PLATFORM}/constants`)
const { getCountryPrefix } = require(`../../../../../../helpers/${PLATFORM}/getCountryPrefix`);
const { getPhoneValid } = require(`../../../../../../helpers/${PLATFORM}/getPhoneValid`);

const validator = (values) => {

    const errors = {};
    let getCountry;
    let number;
    if (!values[STRINGS.BRANCH_NAME_INPUT]) {
        errors[STRINGS.BRANCH_NAME_INPUT] = VALIDATION_MESSAGES.ENTER_BRANCH_NAME_REQUIRED
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
        errors[STRINGS.EMAIL_INPUT_NAME] = VALIDATION_MESSAGES.ENTER_EMAIL_REQUIRED
    }
    if (!values[STRINGS.ADDRESS_INPUT_NAME]) {
        errors[STRINGS.ADDRESS_INPUT_NAME] = VALIDATION_MESSAGES.ENTER_ADDRESS_REQUIRED
    }

    if (!values[STRINGS.SUBURB_INPUT_NAME]) {
        errors[STRINGS.SUBURB_INPUT_NAME] = VALIDATION_MESSAGES.ENTER_SUBURB_REQUIRED
    }
    if (!values[STRINGS.CITY_INPUT]) {
        errors[STRINGS.CITY_INPUT] = VALIDATION_MESSAGES.ENETR_CITY_REQUIRED
    }
    if (values[STRINGS.PHONE_NUMBER_KEY] && (values[STRINGS.PHONE_NUMBER_KEY].length < MIN_PHONE_LENGTH || values[STRINGS.PHONE_NUMBER_KEY].length > MAX_PHONE_LENGTH)) {
        errors[STRINGS.PHONE_NUMBER_KEY] =
            VALIDATION_MESSAGES.PHONE_NUMBER_CHARACTER_LENGTH;
    }
    if (!values[STRINGS.POSTCODE_INPUT]) {
        errors[STRINGS.POSTCODE_INPUT] = VALIDATION_MESSAGES.ENTER_POSTCODE_REQUIRED
    }
    if (!values[STRINGS.CODE_INPUT]) {
        errors[STRINGS.CODE_INPUT] = VALIDATION_MESSAGES.ENTER_CODE_REQUIRED
    }
    if (!values[STRINGS.COUNTRY_INPUT]) {
        errors[STRINGS.COUNTRY_INPUT] = VALIDATION_MESSAGES.ENTER_COUNTRY_REQUIRED
    }
    if (!values[STRINGS.PICK_UP_DROP_OFF1]) {
        errors[STRINGS.PICK_UP_DROP_OFF1] = VALIDATION_MESSAGES.PICK_DROP_REQUIRED
    }

    if (values[STRINGS.PICK_UP_DROP_OFF1]) {
        values[STRINGS.PICK_UP_DROP_OFF1] && values[STRINGS.PICK_UP_DROP_OFF1].setSeconds && values[STRINGS.PICK_UP_DROP_OFF1].setSeconds(0)
        values[STRINGS.PICK_UP_DROP_OFF1] && values[STRINGS.PICK_UP_DROP_OFF1].setMilliseconds && values[STRINGS.PICK_UP_DROP_OFF1].setMilliseconds(0)
        values[STRINGS.OPEN_FROM] && values[STRINGS.OPEN_FROM].setSeconds && values[STRINGS.OPEN_FROM].setSeconds(0)
        values[STRINGS.OPEN_FROM] && values[STRINGS.OPEN_FROM].setMilliseconds && values[STRINGS.OPEN_FROM].setMilliseconds(0)

        if ((values[STRINGS.OPEN_FROM] && values[STRINGS.OPEN_FROM].getTime && values[STRINGS.OPEN_FROM].getTime()) > (values[STRINGS.PICK_UP_DROP_OFF1] && values[STRINGS.PICK_UP_DROP_OFF1].getTime && values[STRINGS.PICK_UP_DROP_OFF1].getTime())) {
            errors[STRINGS.PICK_UP_DROP_OFF1] = VALIDATION_MESSAGES.PICK_UP_DROP_OFF_FROM_GREATER_THAN_OPENING_TIME
        }
        if ((values[STRINGS.PICK_UP_DROP_OFF1] && values[STRINGS.PICK_UP_DROP_OFF1].getTime && values[STRINGS.PICK_UP_DROP_OFF1].getTime()) > (values[STRINGS.PICK_UP_DROP_OFF2] && values[STRINGS.PICK_UP_DROP_OFF2].getTime && values[STRINGS.PICK_UP_DROP_OFF2].getTime())) {
            errors[STRINGS.PICK_UP_DROP_OFF1] = VALIDATION_MESSAGES.PICK_UP_DROP_OFF_FROM_GREATER_THAN_PICK_UP_DROP_OFF_TO
        }
        if ((values[STRINGS.PICK_UP_DROP_OFF2] && values[STRINGS.PICK_UP_DROP_OFF2].getTime && values[STRINGS.PICK_UP_DROP_OFF2].getTime()) - (values[STRINGS.PICK_UP_DROP_OFF1] && values[STRINGS.PICK_UP_DROP_OFF1].getTime && values[STRINGS.PICK_UP_DROP_OFF1].getTime()) < 1200000) {
            errors[STRINGS.PICK_UP_DROP_OFF1] = VALIDATION_MESSAGES.PICK_UP_DROP_OFF_FROM_20MINT_GREATER_THAN_PICK_UP_DROP_OFF_TO
        }
    }

    if (values[STRINGS.OPEN_FROM]) {
        values && values[STRINGS.OPEN_FROM] && values[STRINGS.OPEN_FROM].setSeconds && values[STRINGS.OPEN_FROM].setSeconds(0)
        values && values[STRINGS.OPEN_FROM] && values[STRINGS.OPEN_FROM].setMilliseconds && values[STRINGS.OPEN_FROM].setMilliseconds(0)
        if ((values[STRINGS.PICK_UP_DROP_OFF1] && values[STRINGS.PICK_UP_DROP_OFF1].getTime && values[STRINGS.PICK_UP_DROP_OFF1].getTime()) < (values[STRINGS.OPEN_FROM] && values[STRINGS.OPEN_FROM].getTime && values[STRINGS.OPEN_FROM].getTime())) {
            errors[STRINGS.OPEN_FROM] = VALIDATION_MESSAGES.OPENING_TIME_LESS_THAN_PICK_DROP_OFF
        }
    }

    if (values[STRINGS.PICK_UP_DROP_OFF2]) {
        values[STRINGS.PICK_UP_DROP_OFF2] && values[STRINGS.PICK_UP_DROP_OFF2].setSeconds && values[STRINGS.PICK_UP_DROP_OFF2].setSeconds(0)
        values[STRINGS.PICK_UP_DROP_OFF2] && values[STRINGS.PICK_UP_DROP_OFF2].setMilliseconds && values[STRINGS.PICK_UP_DROP_OFF2].setMilliseconds(0)
        if ((values[STRINGS.CLOSE_BY] && values[STRINGS.CLOSE_BY].getTime && values[STRINGS.CLOSE_BY].getTime()) < (values[STRINGS.PICK_UP_DROP_OFF2] && values[STRINGS.PICK_UP_DROP_OFF2].getTime && values[STRINGS.PICK_UP_DROP_OFF2].getTime())) {
            errors[STRINGS.PICK_UP_DROP_OFF2] = VALIDATION_MESSAGES.PICK_DROP_TO_LESS_THAN_CLOSING_TIME
        }
        if ((values[STRINGS.OPEN_FROM] && values[STRINGS.OPEN_FROM].getTime && values[STRINGS.OPEN_FROM].getTime()) > (values[STRINGS.PICK_UP_DROP_OFF2] && values[STRINGS.PICK_UP_DROP_OFF2].getTime && values[STRINGS.PICK_UP_DROP_OFF2].getTime())) {
            errors[STRINGS.PICK_UP_DROP_OFF2] = VALIDATION_MESSAGES.PICK_UP_DROP_OFF_GREATER_THAN_OPENING_TIME
        }
        if ((values[STRINGS.PICK_UP_DROP_OFF2] && values[STRINGS.PICK_UP_DROP_OFF2].getTime && values[STRINGS.PICK_UP_DROP_OFF2].getTime()) - (values[STRINGS.OPEN_FROM] && values[STRINGS.OPEN_FROM].getTime && values[STRINGS.OPEN_FROM].getTime()) < 3600000) {
            errors[STRINGS.PICK_UP_DROP_OFF2] = VALIDATION_MESSAGES.PICK_DROP_1HOUR_GREATER_THAN_OPRNING
        }
        if ((values[STRINGS.PICK_UP_DROP_OFF2] && values[STRINGS.PICK_UP_DROP_OFF2].getTime && values[STRINGS.PICK_UP_DROP_OFF2].getTime()) < (values[STRINGS.PICK_UP_DROP_OFF1] && values[STRINGS.PICK_UP_DROP_OFF1].getTime && values[STRINGS.PICK_UP_DROP_OFF1].getTime())) {
            errors[STRINGS.PICK_UP_DROP_OFF2] = VALIDATION_MESSAGES.PICK_DROP_TO_GREATER_THAN_PICK_DROP_FROM
        }
        if ((values[STRINGS.PICK_UP_DROP_OFF2] && values[STRINGS.PICK_UP_DROP_OFF2].getTime && values[STRINGS.PICK_UP_DROP_OFF2].getTime()) - (values[STRINGS.PICK_UP_DROP_OFF1] && values[STRINGS.PICK_UP_DROP_OFF1].getTime && values[STRINGS.PICK_UP_DROP_OFF1].getTime()) < 1200000) {
            errors[STRINGS.PICK_UP_DROP_OFF2] = VALIDATION_MESSAGES.PICK_UP_DROP_OFF_TO_20MINT_GREATER_THAN_PICK_UP_DROP_OFF_FROM
        }

    }

    if (values[STRINGS.CLOSE_BY]) {
        values[STRINGS.CLOSE_BY] && values[STRINGS.CLOSE_BY].setSeconds && values[STRINGS.CLOSE_BY].setSeconds(0)
        if ((values[STRINGS.PICK_UP_DROP_OFF2] && values[STRINGS.PICK_UP_DROP_OFF2].getTime && values[STRINGS.PICK_UP_DROP_OFF2].getTime()) > (values[STRINGS.CLOSE_BY] && values[STRINGS.CLOSE_BY].getTime && values[STRINGS.CLOSE_BY].getTime())) {
            errors[STRINGS.CLOSE_BY] = VALIDATION_MESSAGES.CLOSING_TIME_GREATER_THAN_PICK_DROP_OFF_TO
        }

        if ((values[STRINGS.PICK_UP_DROP_OFF1] && values[STRINGS.PICK_UP_DROP_OFF1].getTime && values[STRINGS.PICK_UP_DROP_OFF1].getTime()) > (values[STRINGS.CLOSE_BY] && values[STRINGS.CLOSE_BY].getTime && values[STRINGS.CLOSE_BY].getTime())) {
            errors[STRINGS.CLOSE_BY] = VALIDATION_MESSAGES.CLOSING_TIME_LESS_THAN_PICK_DROP_OFF_FROM
        }

        if ((values[STRINGS.OPEN_FROM] && values[STRINGS.OPEN_FROM].getTime && values[STRINGS.OPEN_FROM].getTime()) > (values[STRINGS.CLOSE_BY] && values[STRINGS.CLOSE_BY].getTime && values[STRINGS.CLOSE_BY].getTime())) {
            errors[STRINGS.CLOSE_BY] = VALIDATION_MESSAGES.CLOSING_TIME_MUST_GREATER_THAN_OPENING_TIME
        }

        if ((values[STRINGS.CLOSE_BY] && values[STRINGS.CLOSE_BY].getTime && values[STRINGS.CLOSE_BY].getTime()) - (values[STRINGS.OPEN_FROM] && values[STRINGS.OPEN_FROM].getTime && values[STRINGS.OPEN_FROM].getTime()) < 3600000) {
            errors[STRINGS.CLOSE_BY] = VALIDATION_MESSAGES.CLOSING_TIME_1HOUR_GREATER_THAN_OPENING_TIME
        }
    }



    if (!values[STRINGS.OPEN_FROM]) {
        errors[STRINGS.OPEN_FROM] = VALIDATION_MESSAGES.OPEN_FROM_REQUIRED
    }
    if (!values[STRINGS.PICK_UP_DROP_OFF2]) {
        errors[STRINGS.PICK_UP_DROP_OFF2] = VALIDATION_MESSAGES.PICK_DROP_TO_REQUIRED
    }
    if (!values[STRINGS.CLOSE_BY]) {
        errors[STRINGS.CLOSE_BY] = VALIDATION_MESSAGES.CLOSE_BY_REQUIRED
    }
    if (!values[STRINGS.BRANCH_MANAGER]) {
        errors[STRINGS.BRANCH_MANAGER] = VALIDATION_MESSAGES.BRANCH_MANAGER_REQUIRED
    }
    if (!values[STRINGS.PHONE_CODE_KEY]) {
        errors[STRINGS.PHONE_CODE_KEY] = VALIDATION_MESSAGES.PHONE_CODE_KEY_REQUIRED
    }

    // pick - updrop - offto1
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
            if (number && number === 'invalid') {
                errors[STRINGS.PHONE_NUMBER_KEY] = VALIDATION_MESSAGES.INVALID_NUMBER_FOR_COUNTRY;
            }
        }
    }


    return errors;
};

export default validator;
