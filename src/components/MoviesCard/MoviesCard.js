import "./MoviesCard.css";

function MoviesCard({ film, type }) {
  return (
    <li className="movie">
      <div className="movie__info">
        <h2 className="movie__title">{film.title}</h2>
        <p className="movie__duration">{film.duration}</p>
        <button
          type="button"
          className={`${
            type === "all"
              ? "movie__like-btn_type_all"
              : "movie__like-btn_type_saved"
          } movie__like-btn`}
          aria-label="добавить в избранное"
        ></button>
      </div>
      <img src={film.poster} alt="постер" className="movie__poster" />
    </li>
  );
}

export default MoviesCard;
