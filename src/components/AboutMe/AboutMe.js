import "./AboutMe.css";
import aboutMeAvatar from "../../images/about-me-avatar.PNG";

function AboutMe() {
  return (
    <section className="about-me section">
      <h1 className="section__title">Студент</h1>
      <div className="about-me__container">
        <div className="about-me__info">
          <h2 className="about-me__title">Денис</h2>
          <p className="about-me__subtitle">Front-end разработчик, 28 лет</p>
          <p className="about-me__description">
            Я родился в Крыму городе Симферополе. Живу в Санкт-Петербурге. Очень
            интересно заниматься разработкой. Хочу дальше развиваться во
            frontend. Всегда изучаю новые технологии. Недостаток знаний
            компенсирую стремлением изучить что-то новое.
          </p>
          <div className="about-me__socials">
            <a
              href="https://www.facebook.com/profile.php?id=100064646079831"
              className="about-me__link"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://github.com/ssdenis00"
              className="about-me__link"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
        </div>
        <img
          src={aboutMeAvatar}
          alt="фотография автора"
          className="about-me__avatar"
        />
      </div>
    </section>
  );
}

export default AboutMe;
