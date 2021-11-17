import { useCallback, useState } from "react";

//хук управления формой
export function useForm(initialInputValue) {
  const [values, setValues] = useState(initialInputValue);

  const handleChange = (evt) => {
    const target = evt.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}

//хук управления формой и валидации формы
export function useFormWithValidation(initialInputValue, defaultIsValid) {
  const [values, setValues] = useState(initialInputValue);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(defaultIsValid);

  const handleChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}