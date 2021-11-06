import { useState } from "react";
import "./MoviesCard.css";

function MoviesCard({ film, type }) {
  const [likeState, setLikeState] = useState(false);

  function handleLikeClick() {
    setLikeState((state) => !state);
  }

  return (
    <li className="movie">
      <div className="movie__info">
        <div className="movie__text-block">
          <h2 className="movie__title">{film.title}</h2>
          <p className="movie__duration">{film.duration}</p>
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
        src={film.poster}
        alt={`${film.title} постер`}
        className="movie__poster"
      />
    </li>
  );
}

export default MoviesCard;
