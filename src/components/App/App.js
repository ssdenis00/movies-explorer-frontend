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
  const [loaderState, setLoaderState] = useState(false);
  const [moviesState, setMoviesState] = useState(false);

  const history = useHistory();

  const [savedFilms, setSavedFilms] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      mainApi
        .getInitialFavoriteFilms()
        .then((films) => {
          setSavedFilms(films);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

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

  function handleRegisterSubmit(data) {
    mainApi
      .register(data)
      .then((res) => {
        setLoggedIn(true);
        history.push("/singin");
      })
      .catch((err) => console.log(err));
  }

  function handleLoginSubmit(data) {
    mainApi
      .login(data)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setLoggedIn(true);
        mainApi.checkToken(res.token).then((userData) => {
          setUserData(userData);
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

  function handleSubmitSearchFormAllMovies(evt) {
    evt.preventDefault();
    setInitialFilms([]);
    setLoaderState(true);

    moviesApi
      .getInitialFilms()
      .then((res) => {
        setInitialFilms(res);
        setLoaderState(false);
        setMoviesState(true);
        console.log(res);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoaderState(false);
      });

    /* if (inputValue !== "") {
      console.log(inputValue);
    } else {
      console.log("err");
    } */
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
              />
              <Footer />
            </ProtectedRoute>
            <ProtectedRoute loggedIn={loggedIn} path="/saved-movies">
              <Header isLogin={loggedIn} />
              <SavedMovies onLike={handleLikeClick} />
              <Footer />
            </ProtectedRoute>
            <ProtectedRoute loggedIn={loggedIn} path="/profile">
              <Header isLogin={loggedIn} />
              <Profile onExit={handleExitLink} />
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
              {loggedIn ? <NoFoundPage /> : <Redirect to="/signin" />}
            </Route>
          </Switch>
        </div>
      </SavedFilmsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
