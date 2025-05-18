import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const resetForm = () => {
    setValues(initialState);
    setErrors({});
  };

  const validateForm = (validationRules) => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach((field) => {
      const value = values[field];
      const rules = validationRules[field];

      if (rules.required && (!value || value.trim() === "")) {
        newErrors[field] = rules.message || "This field is required";
        isValid = false;
      } else if (rules.minLength && value.length < rules.minLength) {
        newErrors[field] =
          rules.message || `Minimum length is ${rules.minLength}`;
        isValid = false;
      } else if (rules.pattern && !rules.pattern.test(value)) {
        newErrors[field] = rules.message || "Invalid format";
        isValid = false;
      } else if (rules.match && values[rules.match] !== value) {
        newErrors[field] = rules.message || "Fields do not match";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  return {
    values,
    errors,
    handleChange,
    resetForm,
    validateForm,
    setValues,
    setErrors,
  };
};
