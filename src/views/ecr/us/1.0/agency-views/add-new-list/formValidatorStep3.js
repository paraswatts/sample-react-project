const {
    defaultConfig: { PLATFORM, LOCATION }
} = require(`../../../../../../config/default`);

const { STRINGS } = require(`../../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`);
const { VALIDATION_MESSAGES, EMAIL_REGX, PASSWORD_LENGTH } = require(`../../../../../../shared/${PLATFORM}/constants`)
const { store } = require(`../../../../../../redux/${PLATFORM}/store`)

const validator = (values) => {
    const errors = {};

    if (!values[STRINGS.TEMPLATE_NAME]) {
        errors[STRINGS.TEMPLATE_NAME] = VALIDATION_MESSAGES.TEMPLATE_REQUIRED
    }

    if (!values[STRINGS.TEMPLATE_DESCRIPTION]) {
        errors[STRINGS.TEMPLATE_DESCRIPTION] = VALIDATION_MESSAGES.TEMPLATE_DESCRIPTION_REQUIRED
    }
    return errors;
};

export default validator;
