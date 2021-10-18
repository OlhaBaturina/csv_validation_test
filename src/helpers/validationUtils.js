import statesUSA from "./statesUSA.json";

export const isValidAge = (age) => {
  if (age) return false;
  return Number.isInteger(age) && +age >= 21;
};
export const isValidExperience = (age, experience) => {
  if (age || experience) return false;
  return experience >= 0 && experience < age;
};
export const isValidYearlyIncome = (yearlyIncome) => {
  if (yearlyIncome) return false;
  return yearlyIncome >= 0 && yearlyIncome <= 1e6;
};
export const isValidExpirationDate = (expirationDate) => {
  const reg1 = /^\d{4}-\d{2}-\d{2}$/;
  const reg2 = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!reg1.test(expirationDate) && !reg2.test(expirationDate)) {
    return false;
  }
  const inputDate = new Date(expirationDate);
  const curentDate = new Date();

  return inputDate > curentDate;
};
export const isValidPhone = (phone) => {
  const regexp = /(^\d{10}$)|(^[1]{1}\d{10}$)|(^[+][1]{1}\d{10}$)/;
  return regexp.test(phone);
};
export const isValidEmail = (email) => {
  const regexp = /^[\w-.]+@[\w-]+.+[\w-]{2,4}$/;
  return regexp.test(email);
};
export const isValidHasChildren = (hasChildren) => {
  const str = hasChildren.toLowerCase();
  return str === "true" || str === "false" || str === "";
};
export const isValidLicenseNumber = (licenseNumber) => {
  // Must have 6 digits or letters
  const regexp = /^\w{6}$/;
  return regexp.test(licenseNumber);
};
// Add rule for states
export const isValidLicenseStates = (licenseStates) => {
  const licenseStatesArray = licenseStates.trim().replace(/ +/g, "").split("|");

  return licenseStatesArray.every((stateName) => {
    let hasState = false;
    for (const [fullName, abridgementName] of Object.entries(statesUSA)) {
      if (stateName === fullName || stateName === abridgementName) {
        hasState = true;
        break;
      }
    }
    return hasState;
  });
};
export const isEmptyValue = (value) => value === "";
