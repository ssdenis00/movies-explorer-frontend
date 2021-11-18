import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { SavedFilmsContext } from "../../contexts/SavedFilmsContext";
import "./MoviesCard.css";

function MoviesCard({ film, onLike, index, count, place }) {
  const films = useContext(SavedFilmsContext);
  const userData = useContext(CurrentUserContext);

  const isLiked =
    place === "all"
      ? films.some((f) => film.id === f.movieId && f.owner === userData._id)
      : films.some(
          (f) => film.movieId === f.movieId && f.owner === userData._id
        );

  function transformDuration(value) {
    if (value >= 60) {
      let hours = Math.trunc(value / 60);
      let minuts = value % 60;

      return `${hours} ч. ${minuts} мин`;
    } else {
      return `${value} мин`;
    }
  }

  function handleLikeClick() {
    let likedFilm = {};
    films.forEach((item) => {
      if (item.movieId === film.id) {
        likedFilm = item;
      }
    });
    place === "all"
      ? onLike(isLiked ? likedFilm : film, isLiked)
      : onLike(film, isLiked);
  }

  return (
    <li
      className={`movie ${
        index <= count - 1 || place === "saved" ? "" : "movie_hiden"
      }`}
    >
      <div className="movie__info">
        <div className="movie__text-block">
          <a
            href={place === "all" ? film.trailerLink : film.trailer}
            target="_blank"
            className="movie__link"
            rel="noreferrer"
          >
            <h2 className="movie__title movie__link">{film.nameRU}</h2>
          </a>
          <p className="movie__duration">{transformDuration(film.duration)}</p>
        </div>
        <button
          onClick={handleLikeClick}
          type="button"
          className={`${
            place === "all"
              ? "movie__like-btn_type_all"
              : "movie__like-btn_type_saved"
          } ${
            isLiked ? "movie__like-btn_active" : ""
          } movie__like-btn link-hover`}
          aria-label="добавить в избранное"
        ></button>
      </div>
      <a
        href={place === "all" ? film.trailerLink : film.trailer}
        target="_blank"
        className="movie__link"
        rel="noreferrer"
      >
        <img
          src={
            place === "all"
              ? `https://api.nomoreparties.co${film.image.url}`
              : film.image
          }
          alt={`${film.nameRU} постер`}
          className="movie__poster"
        />
      </a>
    </li>
  );
}

export default MoviesCard;
