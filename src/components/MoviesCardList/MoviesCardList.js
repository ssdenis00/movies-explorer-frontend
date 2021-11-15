import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({
  type,
  state,
  films,
  onLike,
  savedFilmsSearchResult,
}) {
  return (
    <section className={`movies section ${state ? "movies_active" : ""}`}>
      <ul className="movies__list">
        {savedFilmsSearchResult !== undefined &&
        savedFilmsSearchResult.length !== 0
          ? savedFilmsSearchResult.map((film, i) => {
              return (
                <MoviesCard key={i} film={film} type={type} onLike={onLike} />
              );
            })
          : films.map((film, i) => {
              return (
                <MoviesCard key={i} film={film} type={type} onLike={onLike} />
              );
            })}
      </ul>
    </section>
  );
}

export default MoviesCardList;
