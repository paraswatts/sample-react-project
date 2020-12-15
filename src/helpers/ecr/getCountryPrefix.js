import { countries } from "countries-list";
export const getCountryPrefix = (phoneCode, prefix, type) => {

    if (phoneCode) {
        for (const key in countries) {
            if (type) {
                if (countries[key].phone === phoneCode && countries[key].name === prefix) {
                    return key
                }
            } else if (countries[key].phone === phoneCode && countries[key].emoji === prefix) {

                return key
            }

        }
    }
}