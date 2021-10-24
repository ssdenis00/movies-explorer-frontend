import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./Authentication.css";

function Authentication({ title, children, btnName, helperText, helperLink }) {
  return (
    <section className="authentication">
      <div className="authentication__header">
        <Logo />
        <h1 className="authentication__title">{title}</h1>
      </div>

      <form action="./" className="authentication__form">
        <div className="authentication__inputs">{children}</div>
        <button type="submit" className="authentication__btn">
          {btnName}
        </button>
      </form>
      <div className="authentication__helper">
        <p className="authentication__helper-text">{helperText}</p>
        <Link to="/signup" className="authentication__helper-link">
          {helperLink}
        </Link>
      </div>
    </section>
  );
}

export default Authentication;
