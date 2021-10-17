import {
  isEmptyValue,
  isValidAge,
  isValidEmail,
  isValidExperience,
  isValidExpirationDate,
  isValidHasChildren,
  isValidLicenseNumber,
  isValidLicenseStates,
  isValidPhone,
  isValidYearlyIncome,
} from "./validationUtils";
import {
  formatHasChildren,
  formatLicenseStates,
  formatPhone,
  formatYearlyIncome,
} from "./formatStates";

export const validation = (data, require, unique, onError, onSuccess) => {
  if (!data || data.length < 2) {
    onError("Not correct data");
    return;
  }

  if (!hasRequiredFields(require, data[0])) {
    onError("Error Required Fields");
    return;
  }
  const { headers, body } = getSeparatedData(data);
  const requireIndex = getIndex(require, headers);

  if (!hasRequiredFieldsInRow(body, requireIndex)) {
    onError("Error Required Fields");
    return;
  }

  const transformedHeaders = headers.map((value) => {
    return value.toLowerCase().replace(/ +/g, "_");
  });
  const uniqueIndex = getIndex(unique, headers);

  const bodyAfterValidation = validateData(body, transformedHeaders);

  const newBody = findDuplicate(bodyAfterValidation, uniqueIndex);
  const newHeaders = ["ID", ...headers, "Duplicate with"];
  onSuccess({ data: newBody, headers: newHeaders });
};

const findDuplicate = (data, uniqueIndex) => {
  return data.map((currentRow, currentRowIndex) => {
    const currentId = currentRowIndex + 1;
    let newRow = [{ value: `${currentId}` }, ...currentRow, { value: "" }];

    for (let i = currentRowIndex + 1; i < data.length; i++) {
      const searchRow = data[i];

      const hasDuplicate = uniqueIndex.some((key) => {
        const current = currentRow[key].value.toLowerCase();
        const search = searchRow[key].value.toLowerCase();

        return current === search;
      });

      if (hasDuplicate) {
        const duplicatedWithIndex = newRow.length - 1;
        newRow[duplicatedWithIndex].value = `${i + 1}`;
        break;
      }
    }
    return newRow;
  });
};

const returnObject = (value, validator, formatter) => {
  if (validator(value)) {
    let data = value;
    if (formatter) {
      data = formatter(value);
    }
    return { value: data };
  } else {
    return { value: value, hasError: true };
  }
};
const validateData = (data, headerTransformed) => {
  return data.map((row) => {
    return row.map((value, index) => {
      switch (headerTransformed[index]) {
        case "phone":
          return returnObject(value, isValidPhone, formatPhone);
        case "email":
          return returnObject(value, isValidEmail);
        case "age":
          return returnObject(value, isValidAge);
        case "experience":
          const ageIndex = headerTransformed.indexOf("age");
          if (!isValidAge(row[ageIndex])) {
            return { value: value, hasError: true };
          } else {
            if (isValidExperience(+row[ageIndex], +value)) {
              return { value: value };
            } else {
              return { value: value, hasError: true };
            }
          }
        case "yearly_income":
          return returnObject(value, isValidYearlyIncome, formatYearlyIncome);
        case "has_children":
          return returnObject(value, isValidHasChildren, formatHasChildren);
        case "license_states":
          return returnObject(value, isValidLicenseStates, formatLicenseStates);
        case "expiration_date":
          return returnObject(value, isValidExpirationDate);
        case "license_number":
          return returnObject(value, isValidLicenseNumber);
        default:
          return { value: value };
      }
    });
  });
};

const hasRequiredFieldsInRow = (body, requireIndex) => {
  return body.every((bodyRow) => {
    return requireIndex.every((value1) => {
      return !isEmptyValue(bodyRow[value1]);
    });
  });
};

const getIndex = (forData, fromData) => {
  return forData.map((value) => {
    return fromData.indexOf(value);
  });
};

const getSeparatedData = (data) => {
  let headers = [];
  let body = [];

  data.forEach((value, index) => {
    if (index === 0) {
      headers = value;
    } else {
      body.push(value);
    }
  });

  return { headers, body };
};

export function hasRequiredFields(requiredFields, data) {
  const required = requiredFields.map((field) => field.toLowerCase());
  const temp = data.filter((field) => required.includes(field.toLowerCase()));
  return required.length === temp.length;
}
