import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio section">
      <h1 className="portfolio__title">Портфолио</h1>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            href="https://ssdenis00.github.io/how-to-learn/"
            className="portfolio__link link-hover"
            target="_blank"
            rel="noreferrer"
          >
            Статичный сайт
          </a>
        </li>
        <li className="portfolio__item">
          <a
            href="https://ssdenis00.github.io/russian-travel/"
            className="portfolio__link link-hover"
            target="_blank"
            rel="noreferrer"
          >
            Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__item">
          <a
            href="https://mesto-denis-l.nomoredomains.club/"
            className="portfolio__link link-hover"
            target="_blank"
            rel="noreferrer"
          >
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
