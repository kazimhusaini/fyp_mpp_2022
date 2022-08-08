// import { parsePhoneNumber } from "react-phone-number-input";
import { get } from "lodash";
import { useEffect } from "react";

// ******************************
export const validator = (values, fieldName) => {
  let errors = {};
  switch (fieldName) {
    case "email":
      validateEmail(values.email, errors);
      break;
    case "password":
      validatePassword(values.password, errors);
      break;
    case "username":
      validateUsername(values.username, errors);
      break;
    case "cnic":
      validateCnic(values.cnic, errors);
      break;
    case "number":
      validateNumber(values.number, errors);
      break;
    default:
  }
  return errors;
};

// ******************************

// ******************************
function validateNumber(number, errors) {
  // let result = true;

  // if (!number) {
  //   errors.number = "Mobile Number is Required";
  //   result = false;
  // } else {
  //   const re =
  //     /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
  //   result = re.test(String(number).toLowerCase());
  //   if (!result) errors.number = "Invalid Mobile Number address";
  // }
  // return result;

  let result = true;

  if (!number) {
    errors.number = "number is Required";
    result = false;
  } else {
    var lower =
      /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
    result = lower.test(number);

    if (!result) {
      errors.number = "number format 923331234567";
      result = false;
    }
    if (number.length < 11) {
      errors.number = "Your number has less than 11 characters.";
      result = false;
    }
  }
}
// ******************************
function validateEmail(email, errors) {
  let result = true;

  if (!email) {
    errors.email = "Email is Required";
    result = false;
  } else {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    result = re.test(String(email).toLowerCase());
    if (!result) errors.email = "Invalid Email address";
  }
  return result;
}
// ******************************
function validatePassword(pass, errors) {
  let result = true;

  if (!pass) {
    errors.password = "Password is Required";
    result = false;
  } else {
    var lower = /(?=.*[a-z])/;
    result = lower.test(pass);

    if (!result) {
      errors.password = "Password must contain at least one lower case letter.";
      result = false;
    } else if (pass.length < 7) {
      errors.password = "Your password has less than 8 characters.";
      result = false;
    }
  }

  return result;
}
// ******************************
function validateUsername(username, errors) {
  let result = true;

  if (!username) {
    errors.username = "username is Required";
    result = false;
  }
  if (username.length > 24) {
    errors.username = "Your username has greater than 25 characters.";
    result = false;
  }

  return result;
}
function validateCnic(cnic, errors) {
  let result = true;

  if (!cnic) {
    errors.cnic = "Cnic is Required";
    result = false;
  } else {
    var lower = /^[0-9+]{5}[0-9+]{7}[0-9]{1}$/;
    result = lower.test(cnic);

    if (!result) {
      errors.cnic = "Cnic format 352020000009.";
      result = false;
    } else if (cnic.length <= 7) {
      errors.username = "Your Cnic has less than 13 characters.";
      result = false;
    }
  }

  return result;
}
