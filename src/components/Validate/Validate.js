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
    const regularEmail =
      /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(() => {
      if (name === "email") {
        regularEmail.test(value)
          ? setErrors({ ...errors, email: "" })
          : setErrors({ ...errors, email: "Некорректный email" });

        return regularEmail.test(value);
      } else {
        return target.closest("form").checkValidity();
      }
    });
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
