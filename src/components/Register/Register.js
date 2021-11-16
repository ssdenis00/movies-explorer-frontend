import Authentication from "../Authentication/Authentication";
import { useFormWithValidation } from "../Validate/Validate";

function Register({ onRegister }) {
  const validateForm = useFormWithValidation({}, true);

  console.log(validateForm);

  function handleSubmit(evt) {
    evt.preventDefault();

    if (validateForm.isValid) {
      onRegister({
        name: validateForm.values.name,
        email: validateForm.values.email,
        password: validateForm.values.password,
      });
    }
  }

  return (
    <Authentication
      title="Добро пожаловать!"
      btnName="Зарегистрироваться"
      helperText="Уже зарегистрированы?"
      helperLink="Войти"
      type="register"
      helperLinkTo="/signin"
      handleSubmitForm={handleSubmit}
      isValid={validateForm.isValid}
    >
      <label className="authentication__label" htmlFor="register-name">
        Имя
      </label>
      <input
        type="text"
        className="authentication__input"
        name="name"
        id="register-name"
        required
        minLength="3"
        maxLength="24"
        placeholder="Имя"
        value={validateForm.values.name || ""}
        onChange={validateForm.handleChange}
      />
      <span className="authentication__err">{validateForm.errors.name}</span>
      <label className="authentication__label" htmlFor="register-email">
        E-mail
      </label>
      <input
        type="email"
        className="authentication__input"
        name="email"
        id="register-email"
        required
        onChange={validateForm.handleChange}
        value={validateForm.values.email || ""}
        placeholder="Email"
      />
      <span className="authentication__err">{validateForm.errors.email}</span>
      <label className="authentication__label" htmlFor="register-password">
        Пароль
      </label>
      <input
        type="password"
        className="authentication__input"
        id="register-password"
        name="password"
        required
        onChange={validateForm.handleChange}
        value={validateForm.values.password || ""}
        placeholder="Пароль"
      />
      <span className="authentication__err">
        {validateForm.errors.password}
      </span>
    </Authentication>
  );
}

export default Register;
