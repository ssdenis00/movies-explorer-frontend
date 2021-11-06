import { Route, Switch } from "react-router";
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

function App() {
  const [modalState, setModalState] = useState(false);

  function openModal() {
    setModalState(true);
  }

  function closeModal() {
    setModalState(false);
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
          <Header isLogin={false} />
          <Main />
          <Footer />
        </Route>
        <Route path="/movies">
          <Header isLogin={true} />
          <Movies />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Header isLogin={true} />
          <SavedMovies />
          <Footer />
        </Route>
        <Route path="/profile">
          <Header isLogin={true} />
          <Profile openModal={openModal} />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="*">
          <NoFoundPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
