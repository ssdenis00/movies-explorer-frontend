import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./Authentication.css";

function Authentication({
  title,
  children,
  btnName,
  helperText,
  helperLink,
  helperLinkTo,
  type,
  handleSubmitForm,
  isValid,
}) {
  return (
    <section
      className={`authentication ${
        type === "register" ? "authentication_type_register" : ""
      } `}
    >
      <div className="authentication__header">
        <Logo modifier="logo_place_authentication" />
        <h1 className="authentication__title">{title}</h1>
      </div>

      <form
        onSubmit={handleSubmitForm}
        action="./"
        className="authentication__form authentication__form_type_register"
        noValidate
      >
        <div className="authentication__inputs">{children}</div>
        <button
          type="submit"
          className={`authentication__btn ${
            isValid ? "" : "authentication__btn_disabled"
          }`}
        >
          {btnName}
        </button>
      </form>
      <div className="authentication__helper">
        <p className="authentication__helper-text">{helperText}</p>
        <Link
          to={helperLinkTo}
          className="authentication__helper-link link-hover"
        >
          {helperLink}
        </Link>
      </div>
    </section>
  );
}

export default Authentication;
