import { useCallback, useState } from "react";

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

  const resetValidForm = useCallback(
    (newErrors = {}, newIsValid = false) => {
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetValidForm };
}
