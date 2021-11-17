import Authentication from "../Authentication/Authentication";
import { useFormWithValidation } from "../Validate/Validate";

function Login({ onLogin, errorMessage }) {
  const validateForm = useFormWithValidation({}, true);

  function handleSubmit(evt) {
    evt.preventDefault();

    if (validateForm.isValid) {
      onLogin({
        email: validateForm.values.email,
        password: validateForm.values.password,
      });
    }
  }

  return (
    <Authentication
      title="Рады видеть!"
      btnName="Войти"
      helperText="Ещё не зарегистрированы?"
      helperLink="Регистрация"
      type="login"
      helperLinkTo="/signup"
      handleSubmitForm={handleSubmit}
      isValid={validateForm.isValid}
      errorMessage={errorMessage}
    >
      <label className="authentication__label" htmlFor="login-email">
        E-mail
      </label>
      <input
        type="email"
        className="authentication__input"
        name="email"
        id="login-email"
        required
        placeholder="Email"
        onChange={validateForm.handleChange}
        value={validateForm.values.email || ""}
      />
      <span className="authentication__err">{validateForm.errors.email}</span>
      <label className="authentication__label" htmlFor="login-password">
        Пароль
      </label>
      <input
        type="password"
        className="authentication__input"
        name="password"
        id="login-password"
        required
        placeholder="Пароль"
        onChange={validateForm.handleChange}
        value={validateForm.values.password || ""}
      />
      <span className="authentication__err">
        {validateForm.errors.password}
      </span>
    </Authentication>
  );
}

export default Login;
