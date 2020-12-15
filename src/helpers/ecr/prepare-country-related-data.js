import { countries } from "countries-list";

export const getCountryData = () => {
  let nations = [];
  let callingCodes = [];
  for (const key in countries) {
    let data = countries[key];
    nations.push({
      label: data.name,
      value: data.name
    });
    if (key === "AU") {
      nations.unshift({
        label: data.name,
        value: data.name
      })
      callingCodes.unshift({
        label: `+ ${data.phone} ${data.emoji}(${data.name})`,
        value: `+ ${data.phone}`
      });
    }
    if (key === "NZ") {
      nations.unshift({
        label: data.name,
        value: data.name
      })
      callingCodes.unshift({
        label: `+ ${data.phone} ${data.emoji}(${data.name})`,
        value: `+ ${data.phone}`
      });
    }
    callingCodes.push({
      label: `+ ${data.phone} ${data.emoji}(${data.name})`,
      value: `+ ${data.phone}`
    });
  }
  nations.splice(172, 1);
  nations.splice(14, 1);
  callingCodes.splice(172, 1);
  callingCodes.splice(14, 1);

  return {
    nations: nations,
    callingCodes: callingCodes
  };
};