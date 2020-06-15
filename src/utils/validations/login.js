import validator from "validator";
import isEmpty from "lodash/isEmpty";

const validateInput = (data) => {
  let errors = {};
  if (validator.isEmpty(data.username)) {
    errors.username = "Please enter your username.";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Please enter your password.";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateInput;
