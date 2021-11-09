import { useState } from "react";
import Authentication from "../Authentication/Authentication";

function Register({ onRegister }) {
  const [inputValueEmail, setInputValueEmail] = useState("");
  const [inputValuePass, setInputValuePass] = useState("");
  const [inputValueName, setInputValueName] = useState("");

  function getInputValueEmail(evt) {
    setInputValueEmail(evt.target.value);
  }

  function getInputValuePass(evt) {
    setInputValuePass(evt.target.value);
  }

  function getInputValueName(evt) {
    setInputValueName(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onRegister({
      name: inputValueName,
      email: inputValueEmail,
      password: inputValuePass,
    });
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
        placeholder="Имя"
        value={inputValueName}
        onChange={getInputValueName}
      />
      <span className="authentication__err"></span>
      <label className="authentication__label" htmlFor="register-email">
        E-mail
      </label>
      <input
        type="email"
        className="authentication__input"
        name="email"
        id="register-email"
        required
        onChange={getInputValueEmail}
        value={inputValueEmail}
        placeholder="Email"
      />
      <span className="authentication__err"></span>
      <label className="authentication__label" htmlFor="register-password">
        Пароль
      </label>
      <input
        type="password"
        className="authentication__input"
        id="register-password"
        name="password"
        required
        onChange={getInputValuePass}
        value={inputValuePass}
        placeholder="Пароль"
      />
      <span className="authentication__err"></span>
    </Authentication>
  );
}

export default Register;
