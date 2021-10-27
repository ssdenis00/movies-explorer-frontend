import Authentication from "../Authentication/Authentication";

function Login() {
  return (
    <Authentication
      title="Рады видеть!"
      btnName="Войти"
      helperText="Ещё не зарегистрированы?"
      helperLink="Регистрация"
      type="login"
      helperLinkTo="/signup"
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
      />
      <span className="authentication__err"></span>
    </Authentication>
  );
}

export default Login;
