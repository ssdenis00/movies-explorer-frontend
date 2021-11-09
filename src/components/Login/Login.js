import { useState } from "react";
import Authentication from "../Authentication/Authentication";

function Login({ onLogin }) {
  const [inputValueEmail, setInputValueEmail] = useState("");
  const [inputValuePass, setInputValuePass] = useState("");

  function getInputValueEmail(evt) {
    setInputValueEmail(evt.target.value);
  }

  function getInputValuePass(evt) {
    setInputValuePass(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onLogin({
      email: inputValueEmail,
      password: inputValuePass,
    });
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
        onChange={getInputValueEmail}
        value={inputValueEmail}
      />
      <span className="authentication__err"></span>
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
        onChange={getInputValuePass}
        value={inputValuePass}
      />
      <span className="authentication__err"></span>
    </Authentication>
  );
}

export default Login;
