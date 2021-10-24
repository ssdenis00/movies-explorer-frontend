import { Link } from "react-router-dom";
import "./NoFoundPage.css";

function NoFoundPage() {
  return (
    <div className="no-found">
      <h1 className="no-found__title">404</h1>
      <p className="no-found__subtitle">Страница не найдена</p>
      <Link to="/" className="no-found__link">
        Назад
      </Link>
    </div>
  );
}

export default NoFoundPage;
