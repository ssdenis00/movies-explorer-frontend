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
import { Route, Switch } from "react-router";

function App() {
  const [modalState, setModalState] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  function openModal() {
    setModalState(true);
  }

  function closeModal() {
    setModalState(false);
  }

  return (
    <div className="app">
      <Header isLogin={isLogin} />

      <Modal
        title="Редактировать профиль"
        btnName="Сохранить"
        state={modalState}
        closeModal={closeModal}
      >
        <label htmlFor="modal-name" className="modal__label"></label>
        <input
          placeholder="Имя"
          type="text"
          className="modal__input"
          id="modal-name"
          required
        />
      </Modal>

      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route path="/profile">
          <Profile openModal={openModal} />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
