import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Preloader from "../Preloader/Preloader";

function App() {
  return (
    <div className="app">
      <Header />
      {/* <Main /> */}
      {/* <SavedMovies /> */}
      {/* <Profile /> */}
      <Preloader />
      {/* <Login /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
