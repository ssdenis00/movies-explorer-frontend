import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({
  place,
  films,
  onLike,
  savedFilmsSearchResult,
  errorMessage,
  count,
}) {
  return (
    <section className={`movies section`}>
      <ul className="movies__list">
        {place === "saved" ? (
          savedFilmsSearchResult !== undefined &&
          savedFilmsSearchResult.length !== 0 &&
          errorMessage === "" ? (
            savedFilmsSearchResult.map((film) => {
              return (
                <MoviesCard
                  key={film.id || film.movieId}
                  film={film}
                  onLike={onLike}
                  place={place}
                />
              );
            })
          ) : savedFilmsSearchResult !== undefined &&
            savedFilmsSearchResult.length === 0 ? (
            <p className="section__error-message">{errorMessage}</p>
          ) : (
            <p className="section__error-message">{errorMessage}</p>
          )
        ) : films !== undefined && films.length !== 0 && errorMessage === "" ? (
          films.map((film, i) => {
            return (
              <MoviesCard
                key={i}
                index={i}
                count={count}
                film={film}
                onLike={onLike}
                place={place}
              />
            );
          })
        ) : films !== undefined && films.length === 0 ? (
          <p className="section__error-message">{errorMessage}</p>
        ) : (
          <p className="section__error-message">{errorMessage}</p>
        )}
      </ul>
    </section>
  );
}

export default MoviesCardList;
