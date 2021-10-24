import Authentication from "../Authentication/Authentication";
import "./Login.css";

function Login() {
  return (
    <Authentication
      title="Рады видеть!"
      btnName="Войти"
      helperText="Ещё не зарегистрированы?"
      helperLink="Регистрация"
    >
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

export default Login;
