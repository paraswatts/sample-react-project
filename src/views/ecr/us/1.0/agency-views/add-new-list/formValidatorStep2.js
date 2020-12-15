const {
    defaultConfig: { PLATFORM, LOCATION }
} = require(`../../../../../../config/default`);

const { STRINGS } = require(`../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`);
const { VALIDATION_MESSAGES, EMAIL_REGX, PASSWORD_LENGTH } = require(`../../../../../../shared/${PLATFORM}/constants`)
const { store } = require(`../../../../../../redux/${PLATFORM}/store`)

const validator = (values) => {
    const errors = {};
    let memberIsComing = false

    if (values[STRINGS.INSURANCE_NAME] && values[STRINGS.INSURANCE_SELECT] && !values[STRINGS.INSURANCE_SELECT].value) {
        errors[STRINGS.INSURANCE_SELECT] = VALIDATION_MESSAGES.INSURANCE_REQUIRED
        errors[STRINGS.INSURANCE_NAME] = " "
    }

    if (values[STRINGS.INSURANCE_NAME] && !values[STRINGS.INSURANCE_SELECT]) {
        errors[STRINGS.INSURANCE_SELECT] = VALIDATION_MESSAGES.INSURANCE_REQUIRED
        errors[STRINGS.INSURANCE_NAME] = " "
    }
    if (values[STRINGS.INSURANCE_SELECT] && values[STRINGS.INSURANCE_SELECT].value && !values[STRINGS.INSURANCE_NAME]) {
        errors[STRINGS.INSURANCE_NAME] = VALIDATION_MESSAGES.INSURANCE_CHECKBOX_REQUIRED
    }
    if (values[STRINGS.FERRYCOST_NAME] && values[STRINGS.FERRYCOST_SELECT] && !values[STRINGS.FERRYCOST_SELECT].value) {
        errors[STRINGS.FERRYCOST_SELECT] = VALIDATION_MESSAGES.FERRY_REQUIRED
        errors[STRINGS.FERRYCOST_NAME] = " "
    }

    if (values[STRINGS.FERRYCOST_NAME] && !values[STRINGS.FERRYCOST_SELECT]) {
        errors[STRINGS.FERRYCOST_SELECT] = VALIDATION_MESSAGES.FERRY_REQUIRED
        errors[STRINGS.FERRYCOST_NAME] = " "
    }
    if (values[STRINGS.FERRYCOST_SELECT] && values[STRINGS.FERRYCOST_SELECT].value && !values[STRINGS.FERRYCOST_NAME]) {
        errors[STRINGS.FERRYCOST_NAME] = VALIDATION_MESSAGES.FERRY_CHECKBOX_REQUIRED
    }

    if (values[STRINGS.FUEL_NAME] && values[STRINGS.FUEL_NAME_SELECT] && !values[STRINGS.FUEL_NAME_SELECT].value) {
        errors[STRINGS.FUEL_NAME_SELECT] = VALIDATION_MESSAGES.FUEL_REQUIRED
        errors[STRINGS.FUEL_NAME] = " "
    }

    if (values[STRINGS.FUEL_NAME] && !values[STRINGS.FUEL_NAME_SELECT]) {
        errors[STRINGS.FUEL_NAME_SELECT] = VALIDATION_MESSAGES.FUEL_REQUIRED
        errors[STRINGS.FUEL_NAME] = " "
    }
    if (values[STRINGS.FUEL_NAME_SELECT] && values[STRINGS.FUEL_NAME_SELECT].value && !values[STRINGS.FUEL_NAME]) {
        errors[STRINGS.FUEL_NAME] = VALIDATION_MESSAGES.FUEL_CHECKBOX_REQUIRED
    }



    if (values[STRINGS.EXPENSES_NAME] && !values[STRINGS.DETAILS_NAME]) {
        errors[STRINGS.DETAILS_NAME] = VALIDATION_MESSAGES.DETAILS_REQUIRED
    }

    if (values[STRINGS.DETAILS_NAME] && !values[STRINGS.EXPENSES_NAME]) {
        errors[STRINGS.EXPENSES_NAME] = VALIDATION_MESSAGES.EXPENSES_CHECKBOX_REQUIRED
    }

    if (values[STRINGS.KILOMETRES_ALLOWED_NAME] && !values[STRINGS.FREE_DAYS_AVAILABLE_NAME]) {
        errors[STRINGS.FREE_DAYS_AVAILABLE_NAME] = VALIDATION_MESSAGES.FREE_DAYS_REQUIRED
    }
    if (values[STRINGS.FREE_DAYS_AVAILABLE_NAME] && (values[STRINGS.FREE_DAYS_AVAILABLE_NAME] > 45)) {
        errors[STRINGS.FREE_DAYS_AVAILABLE_NAME] = VALIDATION_MESSAGES.FREE_DAYS_LESS_THAN_46
    }
    if (!values[STRINGS.FREE_DAYS_AVAILABLE_NAME]) {
        errors[STRINGS.FREE_DAYS_AVAILABLE_NAME] = VALIDATION_MESSAGES.FREE_DAYS_REQUIRED
    }
    if ((values[STRINGS.FREE_DAYS_AVAILABLE_NAME] && (values[STRINGS.FREE_DAYS_AVAILABLE_NAME] < 1))) {
        errors[STRINGS.FREE_DAYS_AVAILABLE_NAME] = VALIDATION_MESSAGES.MIN_VALUE_1
    }
    if (values[STRINGS.EXTRA_PAID_DAYS_NAME] && !(values[STRINGS.RATE_PER_DAY_NAME])) {
        errors[STRINGS.RATE_PER_DAY_NAME] = VALIDATION_MESSAGES.RATE_PER_DAY_REQUIRED
        errors[STRINGS.FUEL_NAME] = " "

    }

    if (values[STRINGS.RATE_PER_DAY_NAME] && !(values[STRINGS.EXTRA_PAID_DAYS_NAME])) {
        errors[STRINGS.EXTRA_PAID_DAYS_NAME] = VALIDATION_MESSAGES.RATE_PER_DAY_REQUIRED
        errors[STRINGS.FUEL_NAME] = " "

    }

    if (values.members && values.members.length) {
        const membersArrayErrors = []
        values.members.forEach((member, memberIndex) => {
            const memberErrors = {}

            if (member.name || member.price || member.frequency) {
                memberIsComing = true
                if (!member.name) {
                    memberErrors.name = VALIDATION_MESSAGES.DESCRIPTION_REQUIRED
                }
                if (!member.price) {
                    memberErrors.price = VALIDATION_MESSAGES.PRICE_REQUIRED

                }
                if (!member.frequency) {
                    memberErrors.frequency = VALIDATION_MESSAGES.FREQUENCY_REQUIRED

                }
                membersArrayErrors[memberIndex] = memberErrors
            }
            else if (values[STRINGS.NEW_ITEM_NAME]) {
                if (!member.name) {
                    memberErrors.name = VALIDATION_MESSAGES.DESCRIPTION_REQUIRED
                }
                if (!member.price) {
                    memberErrors.price = VALIDATION_MESSAGES.PRICE_REQUIRED

                }
                if (!member.frequency) {
                    memberErrors.frequency = VALIDATION_MESSAGES.FREQUENCY_REQUIRED

                }
                membersArrayErrors[memberIndex] = memberErrors

            }
        })

        if (membersArrayErrors.length) {
            errors.members = membersArrayErrors
        }
    }

    if (memberIsComing && !values[STRINGS.NEW_ITEM_NAME]) {
        errors[STRINGS.NEW_ITEM_NAME] = VALIDATION_MESSAGES.LIST_NAME_REQUIRED
    }

    return errors;
};



export default validator;
