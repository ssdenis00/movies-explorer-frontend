import { Route, Switch, Redirect } from "react-router";
import { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Modal from "../Modal/Modal";
import NoFoundPage from "../NoFoundPage/NoFoundPage";
import mainApi from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [modalState, setModalState] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);

  function openModal() {
    setModalState(true);
  }

  function closeModal() {
    setModalState(false);
  }

  function register(data) {
    mainApi
      .register(data)
      .then((res) => {
        setLoggedIn(true);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  function login(data) {
    mainApi
      .login(data)
      .then((res) => {
        mainApi.checkToken(res).then((res) => {
          setLoggedIn(true);
          console.log(res);
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="app">
      <Modal
        title="Редактировать профиль"
        btnName="Сохранить"
        state={modalState}
        closeModal={closeModal}
      >
        <label htmlFor="modal-name" className="modal__label">
          Имя
        </label>
        <input
          placeholder="Имя"
          type="text"
          className="modal__input"
          id="modal-name"
          required
        />
        <span className="modal__err"></span>
      </Modal>

      <Switch>
        <Route exact path="/">
          <Header isLogin={loggedIn} />
          <Main />
          <Footer />
        </Route>
        <ProtectedRoute loggedIn={loggedIn} path="/movies">
          <Header isLogin={loggedIn} />
          <Movies />
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute loggedIn={loggedIn} path="/saved-movies">
          <Header isLogin={loggedIn} />
          <SavedMovies />
          <Footer />
        </ProtectedRoute>
        <ProtectedRoute loggedIn={loggedIn} path="/profile">
          <Header isLogin={loggedIn} />
          <Profile openModal={openModal} />
        </ProtectedRoute>
        <Route path="/signin">
          <Login onLogin={login} />
        </Route>
        <Route path="/signup">
          <Register onRegister={register} />
        </Route>
        <Route path="*">
          {loggedIn ? <NoFoundPage /> : <Redirect to="/signin" />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
