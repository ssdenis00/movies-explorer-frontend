import "./Footer.css";

function Footer() {
  return (
    <footer className="footer app__padding">
      <h4 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h4>
      <div className="footer__block">
        <p className="footer__year">&copy; 2021</p>
        <div className="footer__links">
          <a href="https://practicum.yandex.ru" className="footer__link">
            Яндекс.Практикум
          </a>
          <a href="https://github.com/ssdenis00" className="footer__link">
            Github
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100064646079831"
            className="footer__link"
          >
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
