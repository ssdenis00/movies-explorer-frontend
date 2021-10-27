import "./Techs.css";

function Techs() {
  return (
    <section className="techs section">
      <h2 className="section__title">Технологии</h2>
      <h3 className="techs__title">7 технологий</h3>
      <p className="techs__subtitle">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className="techs__list">
        <li className="techs__item">
          <a
            href="http://htmlbook.ru/html"
            target="_blank"
            rel="noreferrer"
            className="techs__link link-hover"
          >
            HTML
          </a>
        </li>
        <li className="techs__item">
          <a
            href="http://htmlbook.ru/css/help"
            target="_blank"
            rel="noreferrer"
            className="techs__link link-hover"
          >
            CSS
          </a>
        </li>
        <li className="techs__item">
          <a
            href="https://learn.javascript.ru/"
            target="_blank"
            rel="noreferrer"
            className="techs__link link-hover"
          >
            JS
          </a>
        </li>
        <li className="techs__item">
          <a
            href="https://ru.reactjs.org/"
            target="_blank"
            rel="noreferrer"
            className="techs__link link-hover"
          >
            React
          </a>
        </li>
        <li className="techs__item">
          <a
            href="https://git-scm.com/"
            target="_blank"
            rel="noreferrer"
            className="techs__link link-hover"
          >
            Git
          </a>
        </li>
        <li className="techs__item">
          <a
            href="https://expressjs.com/ru/"
            target="_blank"
            rel="noreferrer"
            className="techs__link link-hover"
          >
            Express.js
          </a>
        </li>
        <li className="techs__item">
          <a
            href="https://www.mongodb.com/"
            target="_blank"
            rel="noreferrer"
            className="techs__link link-hover"
          >
            mongoDB
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Techs;
