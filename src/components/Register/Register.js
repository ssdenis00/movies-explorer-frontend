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
        placeholder="Пароль"
      />
      <span className="authentication__err"></span>
    </Authentication>
  );
}

export default Register;
