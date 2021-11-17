import { Route, Switch, Redirect } from "react-router";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NoFoundPage from "../NoFoundPage/NoFoundPage";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { SavedFilmsContext } from "../../contexts/SavedFilmsContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const [initialFilms, setInitialFilms] = useState([]);
  const [loaderState, setLoaderState] = useState(false);
  const [moviesState, setMoviesState] = useState(false);
  const [checkboxState, setCheckboxState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [savedFilms, setSavedFilms] = useState([]);
  const [savedFilmsSearchResult, setSavedFilmsSearchResult] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      mainApi
        .checkToken(localStorage.getItem("token"))
        .then((userData) => {
          setUserData(userData);
          setLoggedIn(true);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (loggedIn && localStorage.getItem("token")) {
      mainApi
        .getInitialFavoriteFilms()
        .then((films) => {
          setSavedFilms(films);
        })
        .catch((err) => {
          setErrorMessage(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          );
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleRegisterSubmit(data) {
    const password = data.password;
    mainApi
      .register(data)
      .then((userData) => {
        const email = userData.email;
        mainApi.login({ email, password }).then((res) => {
          localStorage.setItem("token", res.token);
          mainApi.checkToken(res.token).then((userData) => {
            setUserData(userData);
            setLoggedIn(true);
          });
        });
      })
      .catch((err) => console.log(err));
  }

  function handleLoginSubmit(data) {
    mainApi
      .login(data)
      .then((res) => {
        localStorage.setItem("token", res.token);
        mainApi.checkToken(res.token).then((userData) => {
          setUserData(userData);
          setLoggedIn(true);
        });
      })
      .catch((err) => console.log(err));
  }

  function handleExitLink() {
    setLoggedIn(false);
    localStorage.removeItem("token");
  }

  function handleLikeClick(film, isLiked) {
    mainApi
      .toggleFilmInFavorite(film, isLiked)
      .then((likedFilm) => {
        setSavedFilms((state) => {
          if (isLiked) {
            return state.filter((item) => item.movieId !== likedFilm.movieId);
          } else {
            return [...state, likedFilm];
          }
        });
        setInitialFilms((state) => state);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleToggleCheckbox() {
    setCheckboxState((state) => !state);
  }

  function handleSubmitSearchFormAllMovies(inputValue) {
    if (inputValue.trim() !== "") {
      setInitialFilms([]);
      setLoaderState(true);

      moviesApi
        .getInitialFilms()
        .then((films) => {
          const resultFilms = films.filter((film) => {
            const transformedInputValue = inputValue.toLowerCase();
            const transformedFilmName = film.nameRU.toLowerCase();

            return checkboxState
              ? transformedFilmName.includes(transformedInputValue) &&
                  film.duration <= 40
              : transformedFilmName.includes(transformedInputValue);
          });
          if (resultFilms.length === 0) {
            setErrorMessage("Ничего не найдено");
          }
          setInitialFilms(resultFilms);
          setLoaderState(false);
          setMoviesState(true);
        })
        .catch((err) => {
          setErrorMessage(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          );
          console.log(err);
        })
        .finally(() => {
          setLoaderState(false);
        });
    } else {
      setErrorMessage("Нужно ввести ключевое слово");
    }
  }

  function handleSubmitSearchFormSavedFilms(inputValue) {
    if (inputValue.trim() !== "") {
      const resultFilms = savedFilms.filter((film) => {
        const transformedInputValue = inputValue.toLowerCase();
        const transformedFilmName = film.nameRU.toLowerCase();

        return checkboxState
          ? transformedFilmName.includes(transformedInputValue) &&
              film.duration <= 40
          : transformedFilmName.includes(transformedInputValue);
      });

      setSavedFilmsSearchResult(resultFilms);
    } else {
      setErrorMessage("Нужно ввести ключевое слово");
      setSavedFilmsSearchResult([]);
    }
  }

  function handleSubmitUpdateUserData(userData) {
    mainApi.updateUserData(userData).then((userData) => {
      setUserData(userData);
    });
  }

  return (
    <CurrentUserContext.Provider value={userData}>
      <SavedFilmsContext.Provider value={savedFilms}>
        <div className="app">
          <Switch>
            <Route exact path="/">
              {loggedIn ? (
                <Redirect to="/movies" />
              ) : (
                <>
                  <Header isLogin={loggedIn} />
                  <Main />
                  <Footer />
                </>
              )}
            </Route>
            <ProtectedRoute loggedIn={loggedIn} path="/movies">
              <Header isLogin={loggedIn} />
              <Movies
                onLike={handleLikeClick}
                onSubmit={handleSubmitSearchFormAllMovies}
                moviesState={moviesState}
                initialFilms={initialFilms}
                loaderState={loaderState}
                onClickCheckbox={handleToggleCheckbox}
                checkboxState={checkboxState}
                errorMessage={errorMessage}
              />
              <Footer />
            </ProtectedRoute>
            <ProtectedRoute loggedIn={loggedIn} path="/saved-movies">
              <Header isLogin={loggedIn} />
              <SavedMovies
                onLike={handleLikeClick}
                onSubmit={handleSubmitSearchFormSavedFilms}
                onClickCheckbox={handleToggleCheckbox}
                checkboxState={checkboxState}
                savedFilmsSearchResult={savedFilmsSearchResult}
                errorMessage={errorMessage}
              />
              <Footer />
            </ProtectedRoute>
            <ProtectedRoute loggedIn={loggedIn} path="/profile">
              <Header isLogin={loggedIn} />
              <Profile
                onExit={handleExitLink}
                onSubmit={handleSubmitUpdateUserData}
              />
            </ProtectedRoute>
            <Route path="/signin">
              {loggedIn ? (
                <Redirect to="/movies" />
              ) : (
                <Login onLogin={handleLoginSubmit} />
              )}
            </Route>
            <Route path="/signup">
              {loggedIn ? (
                <Redirect to="/movies" />
              ) : (
                <Register onRegister={handleRegisterSubmit} />
              )}
            </Route>
            <Route path="*">
              <NoFoundPage />
            </Route>
          </Switch>
        </div>
      </SavedFilmsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
