import { Route, Switch, Redirect, useHistory } from "react-router";
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
  const [initialCountFilms, setInitialCountFilms] = useState(7);
  const [countFilms, setCountFilms] = useState(initialCountFilms);
  const [loaderState, setLoaderState] = useState(false);
  const [checkboxState, setCheckboxState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [moreBtnState, setMoreBtnState] = useState(true);

  const [savedFilms, setSavedFilms] = useState([]);
  const [savedFilmsSearchResult, setSavedFilmsSearchResult] = useState([]);

  const [path, setPath] = useState([]);
  const getPath = document.location.pathname;

  const history = useHistory();

  useEffect(() => {
    setPath((path) => [...path, getPath]);
  }, [getPath]);

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
    const listener = () => {
      if (document.width >= 768) {
        setInitialCountFilms(7);
      } else {
        setInitialCountFilms(5);
      }
    };

    window.addEventListener("resize", listener);

    return () => {
      window.removeListener("resize", listener);
    };
  }, []);

  useEffect(() => {
    if (loggedIn && localStorage.getItem("token")) {
      mainApi
        .getInitialFavoriteFilms()
        .then((films) => {
          films = films.filter((film) => film.owner === userData._id);
          setSavedFilms(films);
          setSavedFilmsSearchResult(films);
        })
        .catch((err) => {
          setErrorMessage(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          );
          console.log(err);
        });
    }
  }, [loggedIn, userData]);

  function handleRegisterSubmit(data) {
    const password = data.password;
    mainApi
      .register(data)
      .then((userData) => {
        const email = userData.email;
        handleLoginSubmit({ email, password });
      })
      .catch((err) => {
        setErrorMessage(err);
        console.log(err);
      });
  }

  function handleLoginSubmit(data) {
    mainApi
      .login(data)
      .then((res) => {
        localStorage.setItem("token", res.token);
        mainApi.checkToken(res.token).then((userData) => {
          setUserData(userData);
          setLoggedIn(true);
          history.push("/movies");
        });
      })
      .catch((err) => {
        setErrorMessage(err);
        console.log(err);
      });
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
            return state.filter(
              (item) =>
                item.movieId !== likedFilm.movieId &&
                item.owner === userData._id
            );
          } else {
            return [...state, likedFilm];
          }
        });

        setSavedFilmsSearchResult((state) => {
          if (isLiked) {
            return state.filter(
              (item) =>
                item.movieId !== likedFilm.movieId &&
                item.owner === userData._id
            );
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
    setCountFilms(initialCountFilms);
    setMoreBtnState(true);
    if (inputValue.trim() !== "") {
      setInitialFilms([]);
      setLoaderState(true);

      moviesApi
        .getInitialFilms()
        .then((films) => {
          let resultFilms = films.filter((film) => {
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

          if (resultFilms.length <= countFilms) {
            setMoreBtnState(false);
          }

          setInitialFilms(resultFilms);
          setLoaderState(false);
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

  function showMore() {
    setCountFilms((count) => {
      if (initialFilms.length > count) {
        count += initialCountFilms;
        if (initialFilms.length <= count) {
          setMoreBtnState(false);
        }
      } else {
        setMoreBtnState(false);
      }

      return count;
    });
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

      if (resultFilms.length === 0) {
        setErrorMessage("Ничего не найдено");
      }

      setSavedFilmsSearchResult(resultFilms);
    } else {
      setSavedFilmsSearchResult(savedFilms);
    }
  }

  function handleSubmitUpdateUserData(userData) {
    mainApi
      .updateUserData(userData)
      .then((userData) => {
        setUserData(userData);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err);
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
                initialFilms={initialFilms}
                loaderState={loaderState}
                onClickCheckbox={handleToggleCheckbox}
                checkboxState={checkboxState}
                errorMessage={errorMessage}
                showMore={showMore}
                count={countFilms}
                moreBtnState={moreBtnState}
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
                errorMessage={errorMessage}
              />
            </ProtectedRoute>
            <Route path="/signin">
              {loggedIn ? (
                <Redirect to={path[0] === "/signin" ? "/movies" : path[0]} />
              ) : (
                <Login
                  onLogin={handleLoginSubmit}
                  errorMessage={errorMessage}
                />
              )}
            </Route>
            <Route path="/signup">
              {loggedIn ? (
                <Redirect to={path[0] === "/signup" ? "/movies" : path[0]} />
              ) : (
                <Register
                  onRegister={handleRegisterSubmit}
                  errorMessage={errorMessage}
                />
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
