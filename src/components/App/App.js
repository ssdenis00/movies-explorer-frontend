import { Route, Switch, Redirect, useHistory, useLocation } from "react-router";
import { createRef, useEffect, useState } from "react";
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
  const [filmsSearchResult, setFilmsSearchResult] = useState([]);
  const [filmsSearchResultWithCheckbox, setFilmsSearchResultWithCheckbox] =
    useState([]);

  const [initialCountFilms, setInitialCountFilms] = useState(7);
  const [countFilms, setCountFilms] = useState(initialCountFilms);

  const [loaderState, setLoaderState] = useState(false);
  const [checkboxState, setCheckboxState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [inputState, setInputState] = useState(true);
  const [moreBtnState, setMoreBtnState] = useState(true);

  const [savedFilms, setSavedFilms] = useState([]);
  const [savedFilmsSearchResult, setSavedFilmsSearchResult] = useState([]);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    history.push(location.pathname);
  }, [location.pathname, history]);

  const AboutProjectRef = createRef();

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
          setErrorMessage("");
        })
        .catch((err) => {
          setErrorMessage(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          );
          console.log(err);
        });

      if (localStorage.getItem("films")) {
        setInitialFilms(JSON.parse(localStorage.getItem("films")));
      } else {
        moviesApi
          .getInitialFilms()
          .then((films) => {
            localStorage.setItem("films", JSON.stringify(films));
            setInitialFilms(films);
          })
          .catch((err) => {
            setErrorMessage(
              "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
            );
            console.log(err);
          });
      }
    }
  }, [loggedIn, userData]);

  function handleRegisterSubmit(data) {
    const password = data.password;
    setInputState(false);

    mainApi
      .register(data)
      .then((userData) => {
        const email = userData.email;
        handleLoginSubmit({ email, password });
        setErrorMessage("");
      })
      .catch((err) => {
        setErrorMessage(err);
        console.log(err);
      })
      .finally(() => {
        setInputState(true);
      });
  }

  function handleLoginSubmit(data) {
    setInputState(false);

    mainApi
      .login(data)
      .then((res) => {
        localStorage.setItem("token", res.token);
        mainApi.checkToken(res.token).then((userData) => {
          setUserData(userData);
          setLoggedIn(true);
          setErrorMessage("");
          history.push("/movies");
        });
      })
      .catch((err) => {
        setErrorMessage(err);
        console.log(err);
      })
      .finally(() => {
        setInputState(true);
      });
  }

  function handleExitLink() {
    setLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("films");
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
        setErrorMessage(err);
        setMoreBtnState(false);
      });
  }

  function handleToggleCheckbox() {
    setCheckboxState((state) => !state);

    let resultFilms = filmsSearchResult.filter((film) => {
      return !checkboxState ? film.duration <= 40 : film;
    });

    setFilmsSearchResultWithCheckbox(resultFilms);
  }

  function handleSubmitSearchFormAllMovies(inputValue) {
    setLoaderState(true);
    setCountFilms(initialCountFilms);
    setMoreBtnState(true);

    let resultFilms = initialFilms.filter((film) => {
      const transformedInputValue = inputValue.toLowerCase();
      const transformedFilmName = film.nameRU.toLowerCase();

      return transformedFilmName.includes(transformedInputValue);
    });

    if (inputValue.trim() !== "") {
      if (resultFilms.length === 0) {
        setFilmsSearchResult([]);
        setErrorMessage("Ничего не найдено");
      }

      if (resultFilms.length <= countFilms) {
        setMoreBtnState(false);
      }

      setFilmsSearchResult(resultFilms);
      setFilmsSearchResultWithCheckbox(resultFilms);
    } else {
      setFilmsSearchResult([]);
      setFilmsSearchResultWithCheckbox([]);
      setErrorMessage("Нужно ввести ключевое слово");
    }

    setLoaderState(false);
  }

  function showMore() {
    setCountFilms((count) => {
      if (filmsSearchResult.length > count) {
        count += initialCountFilms;
        if (filmsSearchResult.length <= count) {
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

        return transformedFilmName.includes(transformedInputValue);
      });

      if (resultFilms.length === 0) {
        setErrorMessage("Ничего не найдено");
      }

      setSavedFilmsSearchResult(resultFilms);
    } else {
      setErrorMessage("");
      setSavedFilmsSearchResult(savedFilms);
    }
  }

  function handleSubmitUpdateUserData(userData) {
    setInputState(false);

    mainApi
      .updateUserData(userData)
      .then((userData) => {
        setUserData(userData);
        console.log(userData);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err);
      })
      .finally(() => {
        setInputState(true);
      });
  }

  function handleLearnMoreBtn() {
    AboutProjectRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }

  return (
    <CurrentUserContext.Provider value={userData}>
      <SavedFilmsContext.Provider value={savedFilms}>
        <div className="app">
          <Switch>
            <Route exact path="/">
              <Header isLogin={loggedIn} place={"landing"} />
              <Main
                AboutProjectRef={AboutProjectRef}
                onLearnMore={handleLearnMoreBtn}
              />
              <Footer />
            </Route>
            <ProtectedRoute loggedIn={loggedIn} path="/movies">
              <Header isLogin={loggedIn} />
              <Movies
                onLike={handleLikeClick}
                onSubmit={handleSubmitSearchFormAllMovies}
                initialFilms={filmsSearchResultWithCheckbox}
                loaderState={loaderState}
                onClickCheckbox={handleToggleCheckbox}
                checkboxState={checkboxState}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
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
                setErrorMessage={setErrorMessage}
              />
              <Footer />
            </ProtectedRoute>
            <ProtectedRoute loggedIn={loggedIn} path="/profile">
              <Header isLogin={loggedIn} />
              <Profile
                onExit={handleExitLink}
                onSubmit={handleSubmitUpdateUserData}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                inputState={inputState}
              />
            </ProtectedRoute>
            <Route path="/signin">
              {loggedIn ? (
                <Redirect to="/" />
              ) : (
                <Login
                  onLogin={handleLoginSubmit}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                  inputState={inputState}
                />
              )}
            </Route>
            <Route path="/signup">
              {loggedIn ? (
                <Redirect to="/" />
              ) : (
                <Register
                  onRegister={handleRegisterSubmit}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                  inputState={inputState}
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
