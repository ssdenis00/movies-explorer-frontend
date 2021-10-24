import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project section">
      <h2 className="section__title">О проекте</h2>
      <ul className="about-project__table">
        <li className="about-project__cell">
          <h3 className="about-project__cell-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__cell-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="about-project__cell">
          <h3 className="about-project__cell-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__cell-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className="about-project__graph">
        <li className="about-project__graph-cell">
          <h3 className="about-project__graph-title about-project__graph-title_type_backend">
            1 неделя
          </h3>
          <p className="about-project__graph-text">Back-end</p>
        </li>
        <li className="about-project__graph-cell">
          <h3 className="about-project__graph-title about-project__graph-title_type_frontend">
            4 недели
          </h3>
          <p className="about-project__graph-text">Front-end</p>
        </li>
      </ul>
    </section>
  );
}

export default AboutProject;
