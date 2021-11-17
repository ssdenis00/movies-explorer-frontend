import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({
  type,
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
          savedFilmsSearchResult.length !== 0 ? (
            savedFilmsSearchResult.map((film, i) => {
              return (
                <MoviesCard key={i} film={film} type={type} onLike={onLike} />
              );
            })
          ) : savedFilmsSearchResult !== undefined &&
            savedFilmsSearchResult.length === 0 ? (
            <p className="section__error-message">{errorMessage}</p>
          ) : (
            <></>
          )
        ) : films !== undefined && films.length !== 0 ? (
          films.map((film, i) => {
            return (
              <MoviesCard
                key={i}
                index={i}
                count={count}
                film={film}
                type={type}
                onLike={onLike}
              />
            );
          })
        ) : films !== undefined && films.length === 0 ? (
          <p className="section__error-message">{errorMessage}</p>
        ) : (
          <></>
        )}
      </ul>
    </section>
  );
}

export default MoviesCardList;
