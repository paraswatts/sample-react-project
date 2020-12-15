const {
    defaultConfig: { PLATFORM }
} = require(`../../../../../../config/default`);

const validator = (values) => {

    const errors = {};

    if (!values.insuranceName) {
        errors.insuranceName = "Please enter the insuarance name."
    }

    if (!values.excess) {
        errors.excess = "Please enter the excess."
    }
    if (values && values.excess && values.excess.toString() && values.excess.toString().length > 7) {
        errors.excess = "Value must be less than 8 digits."
    }
    if (!values.bond) {
        errors.bond = "Please enter the bond."
    }

    if (values && values.bond && values.bond.toString() && values.bond.toString().length > 7) {
        errors.bond = "Value must be less than 8 digits."
    }

    if (!values.dailyFee) {
        errors.dailyFee = "Please enter daily fee for excess reduction."
    }
    if (values && values.dailyFee && values.dailyFee.toString() && values.dailyFee.toString().length > 7) {
        errors.dailyFee = "Value must be less than 8 digits."
    }

    return errors;
};

export default validator;
