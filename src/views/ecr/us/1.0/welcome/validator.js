const {
    defaultConfig: { PLATFORM, LOCATION }
} = require(`../../../../../config/default`);

const { STRINGS } = require(`../../../../../shared/${PLATFORM}/constants/${LOCATION}/strings`);
const { VALIDATION_MESSAGES } = require(`../../../../../shared/${PLATFORM}/constants`)
const { store } = require(`../../../../../redux/${PLATFORM}/store`)

const validator = (values) => {
    const errors = {};
    if (!values[STRINGS.PASSWORD_INPUT_NAME]) {
        errors[STRINGS.PASSWORD_INPUT_NAME] =
            VALIDATION_MESSAGES.PASSWORD_REQUIRED;
    }

    return errors;
};

export default validator;