import { useContext } from "react";
import { SavedFilmsContext } from "../../contexts/SavedFilmsContext";
import "./MoviesCard.css";

function MoviesCard({ film, type, onLike }) {
  const films = useContext(SavedFilmsContext);

  const isLiked =
    type === "all"
      ? films.some((f) => film.id === f.movieId)
      : films.some((f) => film.movieId === f.movieId);

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
    type === "all"
      ? onLike(isLiked ? likedFilm : film, isLiked)
      : onLike(film, isLiked);
  }

  return (
    <li className="movie">
      <div className="movie__info">
        <div className="movie__text-block">
          <h2 className="movie__title">{film.nameRU}</h2>
          <p className="movie__duration">{transformDuration(film.duration)}</p>
        </div>
        <button
          onClick={handleLikeClick}
          type="button"
          className={`${
            type === "all"
              ? "movie__like-btn_type_all"
              : "movie__like-btn_type_saved"
          } ${
            isLiked ? "movie__like-btn_active" : ""
          } movie__like-btn link-hover`}
          aria-label="добавить в избранное"
        ></button>
      </div>
      <img
        src={
          type === "all"
            ? `https://api.nomoreparties.co${film.image.url}`
            : film.image
        }
        alt={`${film.nameRU} постер`}
        className="movie__poster"
      />
    </li>
  );
}

export default MoviesCard;
