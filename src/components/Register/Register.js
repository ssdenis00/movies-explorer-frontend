import Authentication from "../Authentication/Authentication";

function Register() {
  return (
    <Authentication
      title="Добро пожаловать!"
      btnName="Зарегистрироваться"
      helperText="Уже зарегистрированы?"
      helperLink="Войти"
      type="register"
      helperLinkTo="/signin"
    >
      <label className="authentication__label" htmlFor="name">
        Имя
      </label>
      <input type="text" className="authentication__input" name="name" />
      <label className="authentication__label" htmlFor="email">
        E-mail
      </label>
      <input type="email" className="authentication__input" name="email" />
      <label className="authentication__label" htmlFor="password">
        Пароль
      </label>
      <input
        type="password"
        className="authentication__input"
        name="password"
      />
    </Authentication>
  );
}

export default Register;
