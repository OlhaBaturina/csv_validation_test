import statesUSA from "./statesUSA.json";

export const formatHasChildren = (hasChildren) => {
  if (hasChildren === "") {
    return "FALSE";
  } else {
    return hasChildren;
  }
};
export const formatYearlyIncome = (yearlyIncome) => {
  if (yearlyIncome || yearlyIncome.length === 0) {
    return yearlyIncome;
  }
  return yearlyIncome.toFixed(2);
};
export const formatLicenseStates = (licenseStates) => {
  const licenseStatesArray = licenseStates.trim().replace(/ +/g, "").split("|");
  const newLicenseStatesArray = [];

  licenseStatesArray.forEach((e) => {
    if (e.length > 2) {
      let reduction = JSON.parse(JSON.stringify(statesUSA))[e];
      if (reduction) {
        newLicenseStatesArray.push(reduction);
      }
    } else {
      newLicenseStatesArray.push(e);
    }
  });
  return newLicenseStatesArray.join(", ");
};
export const formatPhone = (phone) => {
  const regexp = /[0-9]{10}$/;
  const matched = phone.match(regexp);
  if (matched) {
    return `+1${matched[0]}`;
  } else {
    return phone;
  }
};
