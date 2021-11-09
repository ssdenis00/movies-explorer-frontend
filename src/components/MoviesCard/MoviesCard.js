import { useState } from "react";
import mainApi from "../../utils/MainApi";
import "./MoviesCard.css";

function MoviesCard({ film, type }) {
  const [likeState, setLikeState] = useState(false);

  function handleLikeClick() {
    mainApi
      .addFilmInFavorite(film)
      .then((res) => {
        console.log(res);
        setLikeState((state) => !state);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function transformDuration(value) {
    if (value >= 60) {
      let hours = Math.trunc(value / 60);
      let minuts = value % 60;

      return `${hours} ч. ${minuts} мин`;
    } else {
      return `${value} мин`;
    }
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
            likeState ? "movie__like-btn_active" : ""
          } movie__like-btn link-hover`}
          aria-label="добавить в избранное"
        ></button>
      </div>
      <img
        src={`https://api.nomoreparties.co${film.image.url}`}
        alt={`${film.image.name} постер`}
        className="movie__poster"
      />
    </li>
  );
}

export default MoviesCard;
